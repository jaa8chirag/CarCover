import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VELUM ATELIER | Bespoke Tailored Car Covers | Handcrafted in England',
  description: 'Precision 3D-laser tailored bespoke automotive covers engineered for Aston Martin, Porsche, Ferrari, McLaren, and high-performance marques. Handcrafted in Yorkshire, England.',
  keywords: 'bespoke car covers, luxury car covers, tailored indoor car cover, Aston Martin car cover, stormproof outdoor car cover, specialised covers',
  openGraph: {
    title: 'VELUM ATELIER | Bespoke Tailored Car Covers',
    description: 'Precision 3D-laser tailored bespoke automotive covers engineered for luxury and high-performance marques.',
    type: 'website',
    locale: 'en_GB',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
