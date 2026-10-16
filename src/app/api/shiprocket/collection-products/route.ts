import { listProducts, paging, toShiprocketProduct } from '@/lib/catalog';
import { shiprocketAuthorized, unauthorized } from '@/lib/shiprocketAuth';

export const dynamic = 'force-dynamic';

/** Shiprocket "Fetch Products by Collection": GET ?collection_id=1234&page=1&limit=100 */
export async function GET(req: Request) {
  if (!shiprocketAuthorized(req)) return unauthorized();
  const url = new URL(req.url);
  const collectionId = Number(url.searchParams.get('collection_id'));
  if (!Number.isFinite(collectionId) || collectionId <= 0) {
    return Response.json({ ok: false, message: 'collection_id is required and must be a number' }, { status: 400 });
  }
  const { limit, skip } = paging(url);
  const { total, products } = await listProducts({ activeOnly: true, collectionId, limit, skip });
  return Response.json({ data: { total, products: products.map((p) => toShiprocketProduct(p, url.origin)) } });
}
