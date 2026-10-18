import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Gallery: Luxury Cars Under Signature Covers',
  description:
    'See Rolls-Royce, Bentley, Ferrari, Range Rover, Porsche, BMW and more under bespoke Signature Covers, in garages, showrooms and on the road.',
  path: '/collections',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
