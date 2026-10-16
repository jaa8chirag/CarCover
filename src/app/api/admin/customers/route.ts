import { isAdmin } from '@/lib/adminAuth';
import { listCustomers } from '@/lib/orders';

export const dynamic = 'force-dynamic';

/** Every person who has ordered, with their latest shipping address and totals. */
export async function GET() {
  if (!(await isAdmin())) return Response.json({ ok: false }, { status: 401 });
  return Response.json({ ok: true, customers: await listCustomers() });
}
