import fs from 'fs';

const html = fs.readFileSync('C:/Users/chira/.gemini/antigravity-ide/brain/4f4c7baa-cbf3-42a9-99ed-68ac1c148983/.system_generated/steps/104/content.md', 'utf8');

const mp4s = html.match(/https?:\/\/[^\s"'<>]+\.mp4[^\s"'<>]*/gi) || [];
console.log('MP4 count:', mp4s.length);
mp4s.slice(0, 10).forEach(u => console.log('MP4:', u));

const videoTags = html.match(/<video[\s\S]*?<\/video>/gi) || [];
console.log('Video tags count:', videoTags.length);
videoTags.slice(0, 3).forEach(v => console.log('TAG:', v.slice(0, 300)));
