import { FABRICS, gstOn, gstIncluded } from '@/data/fabrics';
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
      const hasPipingFee =
        ['outdoor-signature', 'outdoor-elite', 'indoor-elite'].includes(fabric.id) &&
        it?.pipingColor &&
        it?.pipingColor !== 'No piping' &&
        !String(it?.pipingColor).toLowerCase().includes('none');
      const isCustomBespoke = fabric.id === 'custom-printed';
      const qty = Math.min(10, Math.max(1, Number(it?.quantity) || 1));
      const pipingFee = hasPipingFee ? 1999 : 0;
      const unitPrice = isCustomBespoke ? 1000 : (product.basePrice + pipingFee);
      const price = unitPrice * qty;
      const vehicle = str(it?.vehicle, 120);
      const variant = str(it?.variant, 120);
      const coverColor = str(it?.fabricColor, 60);
      const piping = str(it?.pipingColor, 60);
      const notes = str(it?.notes, 500) === 'None' ? '' : str(it?.notes, 500);

      items.push({
        fabricId: fabric.id,
        vehicle,
        variant,
        product: isCustomBespoke ? 'Bespoke Printed Cover — ₹1,000 Design Booking Advance' : fabric.title,
        coverColor,
        piping,
        notes,
        price,
        priceVerified: true,
      });

      const carDesc = [vehicle, variant].filter(Boolean).join(' ');
      const styleDesc = [
        coverColor ? `Color: ${coverColor}` : '',
        piping && !['none', 'no piping'].includes(piping.toLowerCase()) ? `Piping: ${piping}` : '',
      ].filter(Boolean).join(', ');

      let lineName: string;
      if (isCustomBespoke) {
        lineName = 'Bespoke Advance (₹1,000)';
        if (carDesc) lineName += ` — ${carDesc}`;
        if (notes) lineName += ` [Req: ${notes.slice(0, 45)}]`;
      } else {
        lineName = fabric.title;
        if (carDesc) lineName += ` — ${carDesc}`;
        if (styleDesc) lineName += ` [${styleDesc}]`;
        if (notes) lineName += ` [Req: ${notes.slice(0, 45)}]`;
      }
      if (lineName.length > 200) lineName = lineName.slice(0, 197) + '...';

      // Group identical custom configs together
      const lineKey = `${fabric.id}__${carDesc}__${styleDesc}__${unitPrice}__${notes}`;
      const line = perFabric.get(lineKey);
      if (line) {
        line.quantity += qty;
      } else {
        const variantIndex = (perFabric.size % 5) + 1;
        perFabric.set(lineKey, {
          variantId: product.id * 100 + variantIndex,
          quantity: qty,
          price: unitPrice,
          name: lineName,
          imageUrl: `${origin}${product.image}`,
        });
      }
    }

    const total = items.reduce((n, i) => n + i.price, 0);
    const gst = gstIncluded(total);
    const subtotal = total - gst;
    const { token, orderId } = await createCheckoutToken([...perFabric.values()], `${origin}/order-complete`);
    const orderNumber = await createAwaitingOrder({ srOrderId: orderId, items, subtotal, gst, total });
    return Response.json({ ok: true, token, orderId, orderNumber });
  } catch (e) {
    console.error('shiprocket checkout failed', e);
    return Response.json({ ok: false, message: 'We could not start the payment page. Please try again or message us on WhatsApp.' }, { status: 502 });
  }
}
