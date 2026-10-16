import { checkPassword, isAdmin, setAdminCookie } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ admin: await isAdmin() });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (!checkPassword(String(body?.password ?? ''))) {
    await new Promise((r) => setTimeout(r, 800)); // slows down guessing
    return Response.json({ ok: false, message: 'Wrong password' }, { status: 401 });
  }
  await setAdminCookie();
  return Response.json({ ok: true });
}
