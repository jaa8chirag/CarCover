import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us: Talk to Us on WhatsApp',
  description:
    'Questions about a car cover, your car or a bespoke order? Message Signature Covers on WhatsApp, call, or email. Studio in Delhi, India - 110017.',
  path: '/contact',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
