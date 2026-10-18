import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us: Talk to Us on WhatsApp',
  description:
    'Questions about a car cover, your car or a bespoke order? Message Signature Covers on WhatsApp, call, or email. Studios in BKC Mumbai and DLF Horizon Gurugram.',
  path: '/contact',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
