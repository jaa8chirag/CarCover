import type { Metadata } from 'next';
import { FABRICS } from '@/data/fabrics';
import { BUSINESS, SITE_URL, absolute, jsonLd, pageMetadata } from '@/lib/seo';

type Params = { params: Promise<{ fabric: string }> };

export function generateStaticParams() {
  return FABRICS.map((f) => ({ fabric: f.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { fabric } = await params;
  const f = FABRICS.find((x) => x.id === fabric);
  if (!f) return { title: 'Cover not found', robots: { index: false, follow: false } };
  return pageMetadata({
    title: `${f.title}: ${f.subtitle}`,
    description: `${f.description} From ₹${f.price.toLocaleString('en-IN')} plus GST, free shipping across India. Made to measure for your car.`,
    path: `/shop/${f.id}`,
    image: f.image,
  });
}

export default async function Layout({ children, params }: Params & { children: React.ReactNode }) {
  const { fabric } = await params;
  const f = FABRICS.find((x) => x.id === fabric);
  if (!f) return children;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${SITE_URL}/shop/${f.id}#product`,
        name: f.title,
        description: f.description,
        image: absolute(f.image),
        sku: f.id,
        category: 'Car covers',
        brand: { '@type': 'Brand', name: BUSINESS.name },
        additionalProperty: f.specs.map((s) => ({ '@type': 'PropertyValue', name: 'Feature', value: s })),
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}/shop/${f.id}`,
          priceCurrency: 'INR',
          price: f.price,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: BUSINESS.name },
          priceSpecification: { '@type': 'PriceSpecification', price: f.price, priceCurrency: 'INR', valueAddedTaxIncluded: false },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'INR' },
            shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
          { '@type': 'ListItem', position: 3, name: f.title, item: `${SITE_URL}/shop/${f.id}` },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      {children}
    </>
  );
}
