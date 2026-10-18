import { applyShiprocketDetails } from '@/lib/orders';
import { fetchOrderDetails, shiprocketEnabled } from '@/lib/shiprocket';

export const dynamic = 'force-dynamic';

/** Called by the thank-you page, as a back-up in case the webhook is late. Same rule: trust Shiprocket's answer only. */
export async function GET(req: Request) {
  const oid = new URL(req.url).searchParams.get('oid') || '';
  if (!oid || !shiprocketEnabled()) return Response.json({ ok: false }, { status: 400 });
  try {
    const result = await applyShiprocketDetails(oid, await fetchOrderDetails(oid));
    if (!result) return Response.json({ ok: false }, { status: 404 });
    return Response.json({ ok: true, orderNumber: result.orderNumber, status: result.status });
  } catch (e) {
    console.error('shiprocket sync failed', e);
    return Response.json({ ok: false }, { status: 502 });
  }
}
