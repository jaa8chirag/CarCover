import { Droplets, SunMedium, ShieldCheck, Layers, Sparkles, type LucideIcon } from 'lucide-react';

export type CoverGroup = 'outdoor' | 'indoor';

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

// Product range as confirmed by the client: Outdoor (Standard, Pro, Elite) and Indoor (Standard, Elite).
// NOTE: prices and spec copy are placeholders until the client supplies final figures.
export const FABRICS: Fabric[] = [
  {
    id: 'outdoor-standard',
    group: 'outdoor',
    title: 'Outdoor Standard',
    subtitle: 'Everyday All-Weather Protection',
    badge: 'OUTDOOR',
    price: 2999,
    accentColor: '#334155',
    image: '/images/outdoor.jpg',
    icon: ShieldCheck,
    description: 'A dependable water-resistant, UV-stable cover for daily outdoor parking. Tailored to your exact model.',
    specs: [
      'Water-resistant, breathable multi-layer fabric',
      'UV-stabilised against fading and dashboard heat',
      'Soft inner lining, tailored fit with mirror pockets',
    ],
    idealFor: 'Daily outdoor and society parking',
  },
  {
    id: 'outdoor-pro',
    group: 'outdoor',
    title: 'Outdoor Pro',
    subtitle: 'Heavy-Duty Sun & Rain Defence',
    badge: 'OUTDOOR PRO',
    price: 4499,
    accentColor: '#b45309',
    image: '/images/cover_heatshield.jpg',
    icon: SunMedium,
    description: 'Thicker, reflective multi-layer fabric that deflects heat and UV while shedding heavy rain.',
    specs: [
      'Heat and UV reflective outer surface',
      'Heavy-rain resistant with sealed seams',
      'Anti-abrasive microfibre paint-contact lining',
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
    price: 6499,
    accentColor: '#00665e',
    image: '/images/cover_monsoon.jpg',
    icon: Droplets,
    description: 'Our flagship outdoor cover. Fully waterproof, heat-reflective and built to last years in harsh weather.',
    specs: [
      'Fully waterproof with heat-taped seams',
      'Premium UV and heat reflective multi-layer shell',
      'Underbody tie-down straps and lockable wind buckles',
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
    image: '/images/cover_velvet.jpg',
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
    image: '/images/reveal.jpg',
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
];
