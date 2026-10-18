import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Technology: Fabrics, Fit and Weather Protection',
  description:
    'How Signature Covers are made: multi-layer weather fabrics, soft scratch-free linings, 3D-scanned patterns and lab tests for rain, UV and dust. Compare every cover fabric.',
  path: '/technology',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
