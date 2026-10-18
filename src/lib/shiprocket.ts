import { createHmac } from 'node:crypto';

/**
 * Shiprocket Checkout, server side.
 * Everything here needs SHIPROCKET_API_KEY and SHIPROCKET_API_SECRET; without them the site keeps its own checkout form.
 * The secret never leaves the server.
 */

const API_BASE = (process.env.SHIPROCKET_API_BASE || 'https://checkout-api.shiprocket.com').replace(/\/$/, '');
const UI_BASE = (process.env.SHIPROCKET_UI_BASE || 'https://checkout-ui.shiprocket.com').replace(/\/$/, '');

export function shiprocketEnabled(): boolean {
  return !!(process.env.SHIPROCKET_API_KEY && process.env.SHIPROCKET_API_SECRET);
}

export function shiprocketUi() {
  return { scriptUrl: `${UI_BASE}/assets/js/channels/shopify.js`, cssUrl: `${UI_BASE}/assets/styles/shopify.css` };
}

/** Base64 HMAC-SHA256 of the exact request body, signed with the API secret. */
export function sign(body: string): string {
  return createHmac('sha256', process.env.SHIPROCKET_API_SECRET || '').update(body).digest('base64');
}

async function post(path: string, payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': process.env.SHIPROCKET_API_KEY || '',
      'X-Api-HMAC-SHA256': sign(body),
    },
    body,
    cache: 'no-store',
  });
  const json: any = await res.json().catch(() => null);
  if (!res.ok || !json || json.ok === false) {
    throw new Error(`Shiprocket ${path} failed (${res.status}): ${JSON.stringify(json?.error ?? json ?? '').slice(0, 300)}`);
  }
  return json;
}

export interface CheckoutLine {
  variantId: number;
  quantity: number;
  /** Unit price the customer pays, GST included. */
  price: number;
  name: string;
  imageUrl: string;
}

/** Asks Shiprocket for a checkout token for this cart. Prices come from us, not from the browser. */
export async function createCheckoutToken(lines: CheckoutLine[], redirectUrl: string): Promise<{ token: string; orderId: string }> {
  const json = await post('/api/v1/access-token/checkout', {
    cart_data: {
      items: lines.map((l) => ({
        variant_id: String(l.variantId),
        quantity: l.quantity,
        catalog_data: { price: l.price, name: l.name, image_url: l.imageUrl },
      })),
      mobile_app: false,
    },
    redirect_url: redirectUrl,
    timestamp: new Date().toISOString(),
  });
  const token = json?.result?.token;
  const orderId = json?.result?.data?.order_id;
  if (!token || !orderId) throw new Error('Shiprocket did not return a token');
  return { token: String(token), orderId: String(orderId) };
}

/** The one source we trust for an order's address, payment and status. */
export async function fetchOrderDetails(orderId: string): Promise<any> {
  const json = await post('/api/v1/custom-platform-order/details', { order_id: orderId, timestamp: new Date().toISOString() });
  return json.result;
}

/** Starts a refund. Amount is in rupees; orderId is Shiprocket's order id. */
export async function initiateRefund(orderId: string, amount: number) {
  return post('/api/v1/external/refund/initiate', { order_id: orderId, amount });
}
