import type { Metadata } from 'next';

export const SITE_URL = (process.env.SITE_URL || 'https://thesignaturecovers.com').replace(/\/$/, '');
export const SITE_NAME = 'Signature Covers';
export const OG_IMAGE = '/og-image.jpg';

export const BUSINESS = {
  name: 'Signature Covers',
  legalName: 'TheSignaturecovers',
  phone: '+91 85859 96669',
  email: 'contact@thesignaturecovers.com',
  instagram: 'https://www.instagram.com/thesignaturecovers/',
  whatsapp: 'https://wa.me/918585996669',
  locations: [
    { city: 'Mumbai', area: 'BKC', region: 'Maharashtra' },
    { city: 'Gurugram', area: 'DLF Horizon', region: 'Haryana' },
  ],
};

/** Title, description, canonical and social cards for one page. */
export function pageMetadata(o: { title: string; description: string; path: string; image?: string; noindex?: boolean }): Metadata {
  const url = `${SITE_URL}${o.path}`;
  const image = o.image || OG_IMAGE;
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: url },
    robots: o.noindex ? { index: false, follow: false } : undefined,
    openGraph: { title: o.title, description: o.description, url, siteName: SITE_NAME, locale: 'en_IN', type: 'website', images: [{ url: image, width: 1200, height: 630, alt: o.title }] },
    twitter: { card: 'summary_large_image', title: o.title, description: o.description, images: [image] },
  };
}

export const absolute = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

/** Renders structured data for Google. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\u003c') };
}
