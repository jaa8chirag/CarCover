import { applyShiprocketDetails } from '@/lib/orders';
import { fetchOrderDetails, shiprocketEnabled } from '@/lib/shiprocket';

export const dynamic = 'force-dynamic';

/**
 * Register this URL with Shiprocket as the order webhook.
 * The body is only used to learn the order id. The real status, address and payment are fetched
 * from Shiprocket with our signed key, so a forged request cannot mark anything as paid.
 */
export async function POST(req: Request) {
  const body: any = await req.json().catch(() => null);
  const orderId = typeof body?.order_id === 'string' ? body.order_id : '';
  if (!orderId) return Response.json({ ok: true }); // nothing to do, but never make Shiprocket retry junk
  if (!shiprocketEnabled()) return Response.json({ ok: false }, { status: 503 });

  try {
    const details = await fetchOrderDetails(orderId);
    await applyShiprocketDetails(orderId, details);
    return Response.json({ ok: true });
  } catch (e) {
    console.error('shiprocket webhook failed', e);
    return Response.json({ ok: false }, { status: 502 }); // lets Shiprocket try again
  }
}
