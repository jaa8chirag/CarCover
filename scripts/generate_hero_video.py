import os
import math
import numpy as np
from PIL import Image
import imageio
import imageio_ffmpeg
import subprocess

# Four bespoke stages of fitting
images_info = [
    {
        "path": r"c:\Users\chira\CarCover\public\images\cover_install_1.jpg",
        "zoom": (1.00, 1.03),
        "duration": 4.5
    },
    {
        "path": r"c:\Users\chira\CarCover\public\images\cover_install_2.jpg",
        "zoom": (1.03, 1.00),
        "duration": 4.5
    },
    {
        "path": r"c:\Users\chira\CarCover\public\images\cover_install_3.jpg",
        "zoom": (1.00, 1.03),
        "duration": 4.5
    },
    {
        "path": r"c:\Users\chira\CarCover\public\images\cover_install_4.jpg",
        "zoom": (1.03, 1.00),
        "duration": 5.0
    }
]

FPS = 60
WIDTH = 1920
HEIGHT = 1080
CROSSFADE_SEC = 1.4
CROSSFADE_FRAMES = int(FPS * CROSSFADE_SEC)

os.makedirs(r"c:\Users\chira\CarCover\public\videos", exist_ok=True)
raw_output = r"c:\Users\chira\CarCover\public\videos\hero_cover_install_raw.mp4"
final_output = r"c:\Users\chira\CarCover\public\videos\hero_cover_install.mp4"

def get_shot_frames(info):
    img = Image.open(info["path"]).convert("RGB")
    orig_w, orig_h = img.size
    
    total_frames = int(info["duration"] * FPS)
    frames = []
    
    z_start, z_end = info["zoom"]
    
    for i in range(total_frames):
        # Ultra-smooth ease-in-out curve
        progress = i / max(1, total_frames - 1)
        smooth_t = 0.5 * (1.0 - math.cos(progress * math.pi))
        z = z_start + (z_end - z_start) * smooth_t
        
        # Sub-pixel floating point extent
        crop_w = orig_w / z
        crop_h = orig_h / z
        
        center_x = orig_w / 2.0
        center_y = orig_h / 2.0
        
        left = center_x - crop_w / 2.0
        top = center_y - crop_h / 2.0
        right = left + crop_w
        bottom = top + crop_h
        
        # Sub-pixel bicubic transform - ZERO integer snapping, ZERO shake!
        frame_img = img.transform(
            (WIDTH, HEIGHT),
            Image.Transform.EXTENT,
            (left, top, right, bottom),
            resample=Image.Resampling.BICUBIC
        )
        
        frames.append(np.array(frame_img))
    return frames

print("Rendering silky smooth 60fps frames with sub-pixel interpolation...")
all_shots = [get_shot_frames(info) for info in images_info]

# Stitch with smooth sinusoidal crossfades
final_frames = []

for shot_idx in range(len(all_shots)):
    curr_shot = all_shots[shot_idx]
    next_shot = all_shots[(shot_idx + 1) % len(all_shots)]
    
    body_count = len(curr_shot) - CROSSFADE_FRAMES
    for f in range(body_count):
        final_frames.append(curr_shot[f])
        
    for f in range(CROSSFADE_FRAMES):
        alpha = f / float(CROSSFADE_FRAMES)
        # Cosine ease for crossfade
        alpha_smooth = 0.5 * (1.0 - math.cos(alpha * math.pi))
        
        frame_curr = curr_shot[body_count + f].astype(np.float32)
        frame_next = next_shot[f].astype(np.float32)
        
        blended = (1.0 - alpha_smooth) * frame_curr + alpha_smooth * frame_next
        final_frames.append(blended.astype(np.uint8))

print(f"Total frames: {len(final_frames)} (~{len(final_frames)/FPS:.1f}s at {FPS}fps)")
print("Writing smooth MP4...")

writer = imageio.get_writer(
    raw_output,
    fps=FPS,
    codec='libx264',
    quality=8,
    pixelformat='yuv420p',
    macro_block_size=1
)

for frame in final_frames:
    writer.append_data(frame)

writer.close()
print("Raw video written. Now optimizing with faststart...")

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
subprocess.run([
    ffmpeg_exe, '-y',
    '-i', raw_output,
    '-vcodec', 'libx264',
    '-crf', '22',
    '-preset', 'fast',
    '-movflags', '+faststart',
    final_output
], check=True)

# Also copy to stream version
subprocess.run([
    ffmpeg_exe, '-y',
    '-i', final_output,
    '-c', 'copy',
    r"c:\Users\chira\CarCover\public\videos\hero_cover_install_stream.mp4"
], check=True)

if os.path.exists(raw_output):
    os.remove(raw_output)

print("Video successfully generated and ultra-stabilized!")
