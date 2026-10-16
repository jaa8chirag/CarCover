import { isAdmin } from '@/lib/adminAuth';
import { ORDER_STATUSES, updateOrder, type OrderStatus } from '@/lib/orders';

export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return Response.json({ ok: false }, { status: 401 });
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const set: { status?: OrderStatus; tracking?: { courier: string; awb: string }; adminNote?: string } = {};

  if (body.status !== undefined) {
    if (!(ORDER_STATUSES as readonly string[]).includes(body.status)) {
      return Response.json({ ok: false, message: 'Unknown status' }, { status: 400 });
    }
    set.status = body.status as OrderStatus;
  }
  if (body.tracking) {
    set.tracking = { courier: String(body.tracking.courier ?? '').slice(0, 80), awb: String(body.tracking.awb ?? '').slice(0, 80) };
  }
  if (body.adminNote !== undefined) set.adminNote = String(body.adminNote).slice(0, 1000);

  const order = await updateOrder(id, set);
  if (!order) return Response.json({ ok: false, message: 'Order not found' }, { status: 404 });
  return Response.json({ ok: true, order });
}
