import { timingSafeEqual } from 'node:crypto';

/**
 * Shiprocket calls these catalog endpoints with the API key it was given.
 * Set SHIPROCKET_API_KEY to lock them; leave it empty while testing in Postman.
 */
export function shiprocketAuthorized(req: Request): boolean {
  const expected = process.env.SHIPROCKET_API_KEY;
  if (!expected) return true;
  const got = req.headers.get('x-api-key') || '';
  const a = Buffer.from(got);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const unauthorized = () =>
  Response.json({ ok: false, errorCode: 511, message: 'Invalid X-Api-Key' }, { status: 511 });
