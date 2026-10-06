import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'THESIGNATURECOVERS | Bespoke Tailored Car Covers | India',
  description: 'Precision 3D-laser CAD tailored luxury automotive covers engineered for Indian weather by TheSignaturecovers. 100% Waterproof monsoon shield, 48°C UV heat deflection & zero-scratch cashmere fleece. Free delivery across India.',
  keywords: 'TheSignaturecovers, bespoke car covers India, luxury car covers, tailored car cover, Mahindra Thar car cover, Fortuner car cover, Creta car cover, waterproof car cover India, specialized covers',
  openGraph: {
    title: 'THESIGNATURECOVERS | India\'s #1 Bespoke Tailored Car Covers',
    description: 'Precision 3D-laser CAD tailored luxury automotive covers engineered for Indian weather by TheSignaturecovers. 100% Waterproof & zero-scratch fleece.',
    type: 'website',
    locale: 'en_IN',
  },
};

import SmoothScrollProvider from '@/components/SmoothScrollProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
