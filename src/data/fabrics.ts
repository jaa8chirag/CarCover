import { Droplets, SunMedium, ShieldCheck, Layers, Sparkles, Rocket, type LucideIcon } from 'lucide-react';

export type CoverGroup = 'outdoor' | 'indoor' | 'unveiling' | 'custom';

export interface Fabric {
  id: string;
  group: CoverGroup;
  title: string;
  subtitle: string;
  badge: string;
  price: number;
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
export const PRICE_NOTE = 'Includes shipping. GST 18% extra.';

export const GST_RATE = 0.18;
export const gstOn = (amount: number) => Math.round(amount * GST_RATE);

export const FABRICS: Fabric[] = [
  {
    id: 'outdoor-standard',
    group: 'outdoor',
    title: 'Outdoor Standard',
    subtitle: 'Everyday Protection',
    badge: 'OUTDOOR',
    price: 3899,
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
  },
  {
    id: 'outdoor-pro',
    group: 'outdoor',
    title: 'Outdoor Pro',
    subtitle: 'Heavy-Duty Sun & Rain Defence',
    badge: 'OUTDOOR PRO',
    price: 5499,
    accentColor: '#b45309',
    image: '/images/outdoor_pro_card.jpg',
    icon: SunMedium,
    description: 'Thicker, reflective multi-layer fabric that deflects heat and UV while shedding heavy rain.',
    specs: [
      'Heavy-rain resistant',
      'Heat and UV reflective outer surface',
      'Anti-abrasive microfibre lining',
      'Car brand logo printed on the cover',
    ],
    idealFor: 'Open parking in hot or rainy cities',
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
    bestseller: true,
  },
  {
    id: 'indoor-standard',
    group: 'indoor',
    title: 'Indoor Standard',
    subtitle: 'Dust & Scratch Protection',
    badge: 'INDOOR',
    price: 2499,
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
    price: 5499,
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
    price: 26999,
    accentColor: '#cca462',
    image: '/images/cover_custom_printed.jpg',
    icon: Sparkles,
    description: 'Your artwork, livery, stripes or branding printed edge-to-edge on premium four-way stretch indoor fabric. Tailored for your exact car.',
    specs: [
      'Edge-to-edge sublimation printing for any livery or artwork',
      'Ultra-dense soft fleece backing protecting gloss paint and PPF',
      'Tailored mirror pockets and sculpted contour cut',
      'Washable and fade-resistant pigment technology',
    ],
    idealFor: 'Collectors, liveried supercars, brand promotions & custom builds',
  },
];
