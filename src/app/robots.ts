import type { MetadataRoute } from 'next';

const SITE = (process.env.SITE_URL || 'https://thesignaturecovers.com').replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/order-complete'] },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
