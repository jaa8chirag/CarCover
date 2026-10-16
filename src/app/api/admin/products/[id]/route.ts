import { isAdmin } from '@/lib/adminAuth';
import { updateProduct } from '@/lib/catalog';

export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return Response.json({ ok: false }, { status: 401 });
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const set: { title?: string; description?: string; basePrice?: number; quantity?: number; status?: 'active' | 'draft' } = {};

  if (body.title !== undefined) {
    const t = String(body.title).trim().slice(0, 120);
    if (!t) return Response.json({ ok: false, message: 'Title cannot be empty' }, { status: 400 });
    set.title = t;
  }
  if (body.description !== undefined) set.description = String(body.description).trim().slice(0, 1500);
  if (body.basePrice !== undefined) {
    const n = Math.round(Number(body.basePrice));
    if (!Number.isFinite(n) || n <= 0 || n > 10_000_000) return Response.json({ ok: false, message: 'Enter a valid price' }, { status: 400 });
    set.basePrice = n;
  }
  if (body.quantity !== undefined) {
    const n = Math.round(Number(body.quantity));
    if (!Number.isFinite(n) || n < 0 || n > 1_000_000) return Response.json({ ok: false, message: 'Enter a valid stock number' }, { status: 400 });
    set.quantity = n;
  }
  if (body.status !== undefined) {
    if (body.status !== 'active' && body.status !== 'draft') return Response.json({ ok: false, message: 'Unknown status' }, { status: 400 });
    set.status = body.status;
  }

  const product = await updateProduct(id, set);
  if (!product) return Response.json({ ok: false, message: 'Product not found' }, { status: 404 });
  return Response.json({ ok: true, product });
}
