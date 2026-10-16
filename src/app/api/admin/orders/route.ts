import { isAdmin } from '@/lib/adminAuth';
import { listOrders } from '@/lib/orders';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await isAdmin())) return Response.json({ ok: false }, { status: 401 });
  const url = new URL(req.url);
  const status = url.searchParams.get('status') || '';
  const q = (url.searchParams.get('q') || '').trim();
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1);
  const limit = 50;

  const { total, orders, counts, revenue } = await listOrders({ status, q, page, limit });
  return Response.json({ ok: true, total, page, limit, orders, counts, revenue });
}
