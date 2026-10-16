import { isAdmin } from '@/lib/adminAuth';
import { listProducts } from '@/lib/catalog';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdmin())) return Response.json({ ok: false }, { status: 401 });
  const { products } = await listProducts();
  return Response.json({ ok: true, products });
}
