import { FABRICS, gstOn } from '@/data/fabrics';
import { getProduct } from '@/lib/catalog';
import { createAwaitingOrder, type OrderItem } from '@/lib/orders';
import { createCheckoutToken, shiprocketEnabled, type CheckoutLine } from '@/lib/shiprocket';

export const dynamic = 'force-dynamic';

const str = (v: unknown, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function siteOrigin(req: Request) {
  return (process.env.SITE_URL || new URL(req.url).origin).replace(/\/$/, '');
}

/** The cart posts its items; we re-price them here, ask Shiprocket for a token and remember the order as awaiting payment. */
export async function POST(req: Request) {
  if (!shiprocketEnabled()) return Response.json({ ok: false, notConfigured: true, message: 'Online payment is not switched on yet.' }, { status: 503 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: 'Invalid request' }, { status: 400 });
  }
  const raw: any[] = Array.isArray(body?.items) ? body.items.slice(0, 20) : [];
  if (raw.length === 0) return Response.json({ ok: false, message: 'Your cart is empty' }, { status: 400 });

  try {
    const origin = siteOrigin(req);
    const items: OrderItem[] = [];
    const perFabric = new Map<string, CheckoutLine>();

    for (const it of raw) {
      const fabric = FABRICS.find((f) => f.id === it?.fabricId);
      const product = fabric ? await getProduct(fabric.id) : null;
      if (!fabric || !product || product.status !== 'active') {
        return Response.json({ ok: false, message: 'One of the covers in your cart is no longer available.' }, { status: 400 });
      }
      const price = product.basePrice;
      items.push({
        fabricId: fabric.id,
        vehicle: str(it?.vehicle, 120),
        variant: str(it?.variant, 120),
        product: fabric.title,
        coverColor: str(it?.fabricColor, 60),
        piping: str(it?.pipingColor, 60),
        notes: str(it?.notes, 500) === 'None' ? '' : str(it?.notes, 500),
        price,
        priceVerified: true,
      });
      // Shiprocket wants one line per variant, so identical covers are merged into a quantity.
      const line = perFabric.get(fabric.id);
      if (line) line.quantity += 1;
      else
        perFabric.set(fabric.id, {
          variantId: product.id * 100 + 1,
          quantity: 1,
          price: price + gstOn(price),
          name: `${fabric.title} (GST included)`,
          imageUrl: `${origin}${product.image}`,
        });
    }

    const subtotal = items.reduce((n, i) => n + i.price, 0);
    const gst = gstOn(subtotal);
    const { token, orderId } = await createCheckoutToken([...perFabric.values()], `${origin}/order-complete`);
    const orderNumber = await createAwaitingOrder({ srOrderId: orderId, items, subtotal, gst, total: subtotal + gst });
    return Response.json({ ok: true, token, orderId, orderNumber });
  } catch (e) {
    console.error('shiprocket checkout failed', e);
    return Response.json({ ok: false, message: 'We could not start the payment page. Please try again or message us on WhatsApp.' }, { status: 502 });
  }
}
