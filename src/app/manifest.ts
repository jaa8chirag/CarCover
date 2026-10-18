import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Signature Covers',
    short_name: 'Signature Covers',
    description: 'Bespoke, made-to-measure car covers for luxury and performance cars in India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [{ src: '/icon.png', sizes: 'any', type: 'image/png' }],
  };
}
