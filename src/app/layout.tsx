import type { Metadata, Viewport } from 'next';
import { SITE_URL, SITE_NAME, OG_IMAGE, BUSINESS, absolute, jsonLd } from '@/lib/seo';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Bespoke Car Covers India | Signature Covers', template: '%s | Signature Covers' },
  description:
    'Bespoke, made-to-measure car covers for luxury and performance cars in India. Outdoor, indoor and unveiling covers cut to your exact model. Free delivery across India.',
  applicationName: SITE_NAME,
  keywords: [
    'car covers India', 'bespoke car covers', 'custom car cover', 'luxury car cover', 'waterproof car cover India',
    'tailored car cover', 'unveiling cover', 'indoor car cover', 'outdoor car cover', 'Rolls-Royce car cover',
    'Bentley car cover', 'Porsche car cover', 'Ferrari car cover', 'Signature Covers',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Automotive accessories',
  alternates: { canonical: SITE_URL, languages: { 'en-IN': SITE_URL } },
  openGraph: {
    title: 'Bespoke Car Covers India | Signature Covers',
    description: 'Made-to-measure covers for luxury and performance cars. Outdoor, indoor and unveiling covers. Free delivery across India.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_IN',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Signature Covers: a luxury car under a bespoke cover' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bespoke Car Covers India | Signature Covers',
    description: 'Made-to-measure covers for luxury and performance cars. Free delivery across India.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  formatDetection: { telephone: true, email: true, address: false },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BUSINESS.name,
      legalName: BUSINESS.legalName,
      url: SITE_URL,
      logo: absolute('/logo-white.png'),
      image: absolute(OG_IMAGE),
      email: BUSINESS.email,
      telephone: BUSINESS.phone,
      sameAs: [BUSINESS.instagram],
      contactPoint: [{ '@type': 'ContactPoint', telephone: BUSINESS.phone, contactType: 'customer service', areaServed: 'IN', availableLanguage: ['en', 'hi'] }],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: BUSINESS.name,
      url: SITE_URL,
      image: absolute(OG_IMAGE),
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      priceRange: '₹₹',
      areaServed: { '@type': 'Country', name: 'India' },
      address: BUSINESS.locations.map((l) => ({ '@type': 'PostalAddress', addressLocality: l.city, addressRegion: l.region, streetAddress: l.area, addressCountry: 'IN' })),
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, inLanguage: 'en-IN', publisher: { '@id': `${SITE_URL}/#organization` } },
  ],
};

import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Analytics from '@/components/Analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationLd)} />
        <Analytics />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
