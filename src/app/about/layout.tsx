import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About Us: Laser-Cut Bespoke Car Covers',
  description:
    'Signature Covers makes car covers to the millimetre, from 3D-scanned patterns and hand-finished stitching, tested against Indian rain and 48°C heat. Studio in Delhi, India - 110017.',
  path: '/about',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
