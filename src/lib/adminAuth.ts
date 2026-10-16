import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'sc_admin';
const MAX_AGE_S = 60 * 60 * 12; // 12 hours

function secret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || '';
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function checkPassword(input: string): boolean {
  const real = process.env.ADMIN_PASSWORD || '';
  if (!real || !input) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(real);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function makeToken(): string {
  const exp = String(Date.now() + MAX_AGE_S * 1000);
  return `${exp}.${sign(exp)}`;
}

function validToken(token: string | undefined): boolean {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = sign(exp);
  const a = Buffer.from(sig);
  const b = Buffer.from(good);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  return validToken((await cookies()).get(ADMIN_COOKIE)?.value);
}

export async function setAdminCookie() {
  (await cookies()).set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_S,
  });
}

export async function clearAdminCookie() {
  (await cookies()).delete(ADMIN_COOKIE);
}
