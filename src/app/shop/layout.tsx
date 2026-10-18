import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Shop Car Covers: Outdoor, Indoor, Bespoke and Unveiling',
  description:
    'Shop made-to-measure car covers in India. Outdoor covers for rain and sun, soft indoor covers for the garage, bespoke printed covers and unveiling covers. Prices include free shipping; GST extra.',
  path: '/shop',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
