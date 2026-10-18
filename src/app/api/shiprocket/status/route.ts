import { shiprocketEnabled, shiprocketUi } from '@/lib/shiprocket';

export const dynamic = 'force-dynamic';

/** Tells the cart whether to use Shiprocket's checkout or the site's own form. Nothing secret here. */
export async function GET() {
  const enabled = shiprocketEnabled();
  return Response.json({ enabled, ...(enabled ? shiprocketUi() : {}) });
}
