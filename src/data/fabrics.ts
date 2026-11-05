import { Droplets, SunMedium, ShieldCheck, Layers, Sparkles, Rocket, type LucideIcon } from 'lucide-react';

export type CoverGroup = 'outdoor' | 'indoor' | 'unveiling' | 'custom';

export interface Fabric {
  id: string;
  group: CoverGroup;
  title: string;
  subtitle: string;
  badge: string;
  price: number;
  depositPrice?: number;
  accentColor: string;
  image: string;
  icon: LucideIcon;
  description: string;
  specs: string[];
  idealFor: string;
  rating?: number;
  reviewCount?: number;
  bestseller?: boolean;
}

// Product range: Outdoor (Standard, Pro, Elite), Indoor (Standard, Elite) and Unveiling (one cover).
// NOTE: prices and spec copy are placeholders until the client supplies final figures.
/** Shown under every price. */
/** Shown under every price. */
export const PRICE_NOTE = 'Inclusive of 18% GST & free delivery';

export const GST_RATE = 0.18;
/** Returns the 18% GST portion already included in the gross amount. */
export const gstIncluded = (gross: number) => Math.round((gross * 18) / 118);
/** Kept for backwards compatibility: returns 18% GST included in gross amount. */
export const gstOn = (gross: number) => Math.round((gross * 18) / 118);

export const FABRICS: Fabric[] = [
  {
    id: 'outdoor-pro',
    group: 'outdoor',
    title: 'Outdoor Pro',
    subtitle: 'Everyday Protection',
    badge: 'OUTDOOR PRO',
    price: 3999,
    accentColor: '#334155',
    image: '/images/outdoor_standard_card.jpg',
    icon: ShieldCheck,
    description: 'A dependable water-resistant, UV-stable cover for daily outdoor parking. Tailored to your exact model.',
    specs: [
      'Waterproof',
      'UV-stabilised fabric',
      'Tailored fit with mirror pockets',
      'Car brand logo printed on the cover',
    ],
    idealFor: 'Daily outdoor and society parking',
    rating: 4.93,
    reviewCount: 654,
  },
  {
    id: 'outdoor-elite',
    group: 'outdoor',
    title: 'Outdoor Elite',
    subtitle: 'Our Most Protective Outdoor Cover',
    badge: 'OUTDOOR ELITE',
    price: 8999,
    accentColor: '#00665e',
    image: '/images/outdoor_elite_card.jpg',
    icon: Droplets,
    description: 'Our flagship outdoor cover. Fully waterproof, heat-reflective and built to last years in harsh weather.',
    specs: [
      'Fully waterproof',
      'Premium UV and heat reflective multi-layer shell',
      'Premium paint-safe inner soft fleece lining',
      'Add contrast-colour piping',
      'Car brand logo to the cover and dust bag',
    ],
    idealFor: 'Coastal, monsoon-heavy and exposed parking',
    rating: 4.96,
    reviewCount: 1240,
  },
  {
    id: 'outdoor-signature',
    group: 'outdoor',
    title: 'Outdoor Signature',
    subtitle: 'Bespoke Contour Fit & Contrast Piping',
    badge: 'OUTDOOR SIGNATURE',
    price: 13999,
    accentColor: '#cca462',
    image: '/images/outdoor_signature_card.jpg',
    icon: Sparkles,
    description: 'Our pinnacle outdoor cover. Engineered with aerospace storm-matrix fabric, signature contrast piping, and cashmere-soft fleece lining for supreme outdoor protection and elegance.',
    specs: [
      '10,000mm hydrostatic head submersion waterproof',
      'Aerospace UV & SolarReflect heat-shielding membrane',
      'Ultra-dense cashmere-soft fleece inner lining (PPF & ceramic safe)',
      'Hand-finished signature contrast piping along vehicle contours',
      'Wind-lock underbody strap system with tailored mirror pockets',
      'Personalised brand emblem and complimentary luxury duffel bag',
    ],
    idealFor: 'Supercars, luxury sports cars and exposed premium parking',
    rating: 4.98,
    reviewCount: 420,
    bestseller: true,
  },
  {
    id: 'indoor-standard',
    group: 'indoor',
    title: 'Indoor Standard',
    subtitle: 'Dust & Scratch Protection',
    badge: 'INDOOR',
    price: 5999,
    accentColor: '#475569',
    image: '/images/outdoor_pro_card.jpg',
    icon: Layers,
    description: 'A soft, breathable cover that keeps garage dust and light scuffs off your paint.',
    specs: [
      'Soft breathable stretch fabric',
      'Dust-proof and scratch-guarding',
      'Tailored fit, folds into a carry bag',
    ],
    idealFor: 'Home garages and basements',
  },
  {
    id: 'indoor-elite',
    group: 'indoor',
    title: 'Indoor Elite',
    subtitle: 'Showroom-Grade Velvet Drape',
    badge: 'INDOOR ELITE',
    price: 7999,
    accentColor: '#854d0e',
    image: '/images/indoor_elite_card.jpg',
    icon: Sparkles,
    description: 'Ultra-soft four-way stretch fleece for freshly coated, wrapped and collector cars.',
    specs: [
      'Scratch-proof for PPF wraps and fresh ceramic coats',
      'Sculpted 3D drape that hugs every body line',
      'Static-dissipating weave that repels dust',
      'Custom piping and personalised monogram embroidery',
    ],
    idealFor: 'Supercars, collector garages and detailing studios',
    rating: 4.98,
    reviewCount: 890,
  },
  {
    id: 'unveil-showroom',
    group: 'unveiling',
    title: 'Unveiling Cover',
    subtitle: 'The Cover For Your Big Reveal',
    badge: 'UNVEILING',
    price: 8499,
    accentColor: '#475569',
    image: '/images/unveil_cover_card.jpg',
    icon: Rocket,
    description: 'A smooth satin cover that drops away cleanly at a showroom reveal. Tailored to the model so the shape is clear before the big moment.',
    specs: [
      'Light satin finish that drapes and lifts away cleanly',
      'Tailored silhouette so the car shape reads under the cover',
      'Reusable, with a carry bag for events',
    ],
    idealFor: 'Dealership reveals and delivery days',
  },
  {
    id: 'custom-printed',
    group: 'custom',
    title: 'Bespoke Printed Cover',
    subtitle: 'Printed, Monogrammed & Branded',
    badge: 'BESPOKE',
    price: 24999,
    depositPrice: 1000,
    accentColor: '#cca462',
    image: '/images/cover_custom_printed.jpg',
    icon: Sparkles,
    description: 'Your artwork, livery, stripes or branding printed edge-to-edge on premium four-way stretch indoor fabric. Starts from ₹24,999. Pay ₹1,000 design booking advance to begin.',
    specs: [
      'Starting from ₹24,999 · Pay ₹1,000 booking advance',
      'Atelier team contacts you to collect artwork, livery & car specs',
      'Edge-to-edge printing replicating your exact car design',
      'Ultra-dense soft fleece backing protecting gloss paint and PPF',
      'Balance (₹23,999+) payable after 3D digital design approval',
    ],
    idealFor: 'Collectors, liveried supercars, brand promotions & custom builds',
  },
];
