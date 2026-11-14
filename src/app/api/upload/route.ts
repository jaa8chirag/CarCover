import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ ok: false, error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const mime = file.type || 'application/octet-stream';
    if (!ALLOWED_TYPES.includes(mime) && !file.name.match(/\.(png|jpe?g|webp|svg|pdf)$/i)) {
      return NextResponse.json(
        { ok: false, error: 'Unsupported file type. Please upload PNG, JPG, WebP, SVG, or PDF.' },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'logos');
    await fs.mkdir(uploadDir, { recursive: true });

    // Clean filename
    const ext = path.extname(file.name) || (mime === 'image/png' ? '.png' : '.jpg');
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40);
    const safeFilename = `logo_${Date.now()}_${baseName}${ext}`;
    const filePath = path.join(uploadDir, safeFilename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/logos/${safeFilename}`;

    return NextResponse.json({
      ok: true,
      url: publicUrl,
      filename: file.name,
      size: file.size,
    });
  } catch (error: any) {
    console.error('Error handling logo upload:', error);
    return NextResponse.json(
      { ok: false, error: error?.message || 'Failed to upload logo' },
      { status: 500 }
    );
  }
}
