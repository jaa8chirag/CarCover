import { listProducts, paging, toShiprocketProduct } from '@/lib/catalog';
import { shiprocketAuthorized, unauthorized } from '@/lib/shiprocketAuth';

export const dynamic = 'force-dynamic';

/** Shiprocket "Fetch Products": GET ?page=1&limit=100 */
export async function GET(req: Request) {
  if (!shiprocketAuthorized(req)) return unauthorized();
  const url = new URL(req.url);
  const { limit, skip } = paging(url);
  const { total, products } = await listProducts({ activeOnly: true, limit, skip });
  return Response.json({ data: { total, products: products.map((p) => toShiprocketProduct(p, url.origin)) } });
}
