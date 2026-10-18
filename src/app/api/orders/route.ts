import { FABRICS } from '@/data/fabrics';
import { CAR_BRANDS, FABRIC_COLORS, getSizeTier } from '@/data/carData';
import { ensureCatalog, priceFor } from '@/lib/catalog';
import { createOrder, type OrderItem } from '@/lib/orders';
import { gstOn } from '@/data/fabrics';

export const dynamic = 'force-dynamic';

const str = (v: unknown, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const digits = (v: unknown) => str(v, 30).replace(/\D/g, '');

/** Public: the checkout form posts the customer, the shipping address and the cart here. */
export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: 'Invalid request' }, { status: 400 });
  }

  const name = str(body?.customer?.name, 100);
  const email = str(body?.customer?.email, 150).toLowerCase();
  let phone = digits(body?.customer?.phone);
  if (phone.length === 12 && phone.startsWith('91')) phone = phone.slice(2);
  const shipping = {
    address: str(body?.shipping?.address, 400),
    city: str(body?.shipping?.city, 80),
    state: str(body?.shipping?.state, 80),
    pincode: digits(body?.shipping?.pincode),
    landmark: str(body?.shipping?.landmark, 120),
    country: 'India',
  };
  const rawItems: any[] = Array.isArray(body?.items) ? body.items.slice(0, 20) : [];

  const errors: string[] = [];
  if (name.length < 2) errors.push('Name is required');
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('A valid email is required');
  if (!/^[6-9]\d{9}$/.test(phone)) errors.push('A valid 10 digit mobile number is required');
  if (shipping.address.length < 6) errors.push('Shipping address is required');
  if (!shipping.city) errors.push('City is required');
  if (!shipping.state) errors.push('State is required');
  if (!/^\d{6}$/.test(shipping.pincode)) errors.push('A 6 digit pincode is required');
  if (rawItems.length === 0) errors.push('Your cart is empty');
  if (errors.length) return Response.json({ ok: false, message: errors[0], errors }, { status: 400 });

  try {
    await ensureCatalog();
    const items: OrderItem[] = [];
    for (const it of rawItems) {
      const fabric = FABRICS.find((f) => f.id === it?.fabricId);
      const brand = CAR_BRANDS.find((b) => b.id === it?.brandId);
      const model = brand?.models.find((m) => m.id === it?.modelId);
      const tier = brand && model ? getSizeTier(brand.id, model) : null;
      const serverPrice = await priceFor(fabric, tier);
      const color = FABRIC_COLORS.find((c) => c.name === it?.fabricColor)?.name ?? str(it?.fabricColor, 60);
      items.push({
        fabricId: fabric?.id,
        brandId: brand?.id,
        modelId: model?.id,
        vehicle: str(it?.vehicle, 120),
        variant: str(it?.variant, 120),
        product: fabric?.title ?? str(it?.tier, 80),
        coverColor: color,
        piping: str(it?.pipingColor, 60),
        notes: str(it?.notes, 500) === 'None' ? '' : str(it?.notes, 500),
        price: (serverPrice !== null
          ? (serverPrice +
              (fabric && ['outdoor-elite', 'indoor-elite'].includes(fabric.id) &&
              it?.pipingColor &&
              it?.pipingColor !== 'No piping' &&
              !String(it?.pipingColor).toLowerCase().includes('none')
                ? 1999
                : 0)) * Math.min(10, Math.max(1, Number(it?.quantity) || 1))
          : Math.max(0, Number(it?.price) || 0)),
        priceVerified: serverPrice !== null && !!tier,
      });
    }

    const subtotal = items.reduce((n, i) => n + i.price, 0);
    const gst = gstOn(subtotal);
    const doc = await createOrder({
      status: 'new',
      customer: { name, email, phone },
      shipping,
      vin: str(body?.vin, 40).toUpperCase(),
      items,
      subtotal,
      gst,
      total: subtotal + gst,
      tracking: { courier: '', awb: '' },
      adminNote: '',
    });
    return Response.json({ ok: true, orderNumber: doc.orderNumber, total: doc.total });
  } catch (e) {
    console.error('order save failed', e);
    return Response.json({ ok: false, message: 'We could not save your order right now. Please try again or message us on WhatsApp.' }, { status: 500 });
  }
}
