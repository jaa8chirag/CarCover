import { listCollections, paging, toShiprocketCollection } from '@/lib/catalog';
import { shiprocketAuthorized, unauthorized } from '@/lib/shiprocketAuth';

export const dynamic = 'force-dynamic';

/** Shiprocket "Fetch Collections": GET ?page=1&limit=100 */
export async function GET(req: Request) {
  if (!shiprocketAuthorized(req)) return unauthorized();
  const url = new URL(req.url);
  const { limit, skip } = paging(url);
  const { total, collections } = await listCollections({ limit, skip });
  return Response.json({ data: { total, collections: collections.map((c) => toShiprocketCollection(c, url.origin)) } });
}
