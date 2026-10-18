import type { MetadataRoute } from 'next';
import { FABRICS } from '@/data/fabrics';

const SITE = (process.env.SITE_URL || 'https://thesignaturecovers.com').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/shop', '/collections', '/technology', '/about', '/contact'];
  return [
    ...pages.map((p) => ({ url: `${SITE}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.8 })),
    ...FABRICS.map((f) => ({ url: `${SITE}/shop/${f.id}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
