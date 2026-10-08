import { Droplets, Sun, Wind, Sparkles, type LucideIcon } from 'lucide-react';
import { FABRICS, type CoverGroup } from '@/data/fabrics';

export const LAYERS = [
  {
    number: '01',
    title: 'Nano-Armor Outer Shell',
    subtitle: 'Fluorocarbon Water & Smog Repellent',
    rating: '10,000mm Submersion Proof',
    badge: 'LAYER 01 / 04',
    icon: Droplets,
    color: '#00665e',
    description: 'Fluorocarbon-infused high-density surface weave causes torrential monsoon downpours to pearl into tight beads and cascade off immediately.',
    bullets: [
      'Repels corrosive acidic bird droppings & tree resin',
      'High tear-strength ballistic ripstop construction',
      'Ultrasonic nano-welded heat-taped seams',
    ],
  },
  {
    number: '02',
    title: 'SolarReflect Titanium Membrane',
    subtitle: 'Aerospace UV & Heat Deflector',
    rating: '99.8% UV Block & 22°C Cabin Drop',
    badge: 'LAYER 02 / 04',
    icon: Sun,
    color: '#b45309',
    description: 'Microscopic metallized titanium particles deflect 99.8% of destructive ultraviolet rays, preventing interior dashboard warping and clear-coat burn.',
    bullets: [
      'Drops cabin temperature by up to 22°C in open summer sun',
      'Shields delicate leather upholstery from cracking',
      'Reflective nighttime safety corner indicators',
    ],
  },
  {
    number: '03',
    title: 'Microporous Vapor Matrix',
    subtitle: 'Dual-Flow Condensation Evaporator',
    rating: '100% Condensation Free',
    badge: 'LAYER 03 / 04',
    icon: Wind,
    color: '#0284c7',
    description: 'Over 1 billion microscopic pores per square inch allow trapped engine heat and humidity to escape freely while stopping rain droplets from entering.',
    bullets: [
      'Prevents under-cover moisture buildup and mildew',
      'Eliminates clear-coat paint blistering in humid heat',
      'Continuous thermal equilibrium airflow',
    ],
  },
  {
    number: '04',
    title: 'Cashmere-Soft Fleece Lining',
    subtitle: 'Optical Zero-Friction Paint Contact',
    rating: '100% Scratch-Proof Certified',
    badge: 'LAYER 04 / 04',
    icon: Sparkles,
    color: '#854d0e',
    description: 'Ultra-dense brushed microfiber underside creates zero surface friction. Certified safe for concours restorations, delicate PPF wraps, and fresh ceramic coatings.',
    bullets: [
      'Acts as an optical buffer polishing paint on contact',
      'Certified 100% scratch-free for fresh ceramic coatings',
      'Static-dissipating weave that actively repels settling dust',
    ],
  },
];

export interface FabricSheet {
  id: string;
  group: CoverGroup;
  name: string;
  short: string;
  tagline: string;
  price: number;
  warranty: string;
  image: string;
  accent: string;
  icon: LucideIcon;
  environment: string;
  description: string;
  features: string[];
  specs: { material: string; breathability: string; waterResistance: string; lining: string; stretch: string };
  /** Protection levels out of 100, drawn as animated bars. */
  bars: { water: number; uv: number; scratch: number; breath: number };
  idealFor: string;
  rating?: number;
  reviewCount?: number;
}

// Technical sheet copy is placeholder until the client supplies final lab figures.
const EXTRA: Record<string, Pick<FabricSheet, 'short' | 'environment' | 'warranty' | 'specs' | 'bars'>> = {
  'outdoor-standard': {
    short: 'Outdoor Standard',
    environment: 'Outdoor · Daily',
    warranty: '2-Year Guarantee',
    specs: {
      material: 'Multi-layer polyester with UV-stable coating',
      breathability: 'Breathable weave, releases trapped moisture',
      waterResistance: 'Water-resistant, sheds light to moderate rain',
      lining: 'Soft non-abrasive inner layer',
      stretch: 'Tailored fit with elasticated hem',
    },
    bars: { water: 60, uv: 65, scratch: 60, breath: 80 },
  },
  'outdoor-pro': {
    short: 'Outdoor Pro',
    environment: 'Outdoor · Heat & Rain',
    warranty: '3-Year Guarantee',
    specs: {
      material: 'Heat-reflective multi-layer composite',
      breathability: 'Microporous film, condensation-free',
      waterResistance: 'Heavy-rain resistant with sealed seams',
      lining: 'Anti-abrasive microfibre paint-contact lining',
      stretch: 'Tailored fit with wind-lock buckles',
    },
    bars: { water: 82, uv: 92, scratch: 78, breath: 85 },
  },
  'outdoor-elite': {
    short: 'Outdoor Elite',
    environment: 'Outdoor · Extreme',
    warranty: '5-Year Guarantee',
    specs: {
      material: 'Four-layer nano-coated storm fabric',
      breathability: 'Microporous vapour matrix, fully breathable',
      waterResistance: 'Fully waterproof, ultrasonically sealed and heat-taped seams',
      lining: 'Cashmere-soft fleece, certified scratch-safe',
      stretch: 'Tailored fit with underbody tie-down straps',
    },
    bars: { water: 100, uv: 98, scratch: 90, breath: 88 },
  },
  'indoor-standard': {
    short: 'Indoor Standard',
    environment: 'Indoor · Garage',
    warranty: '2-Year Guarantee',
    specs: {
      material: 'Soft breathable stretch fabric',
      breathability: 'Fully breathable, prevents trapped humidity',
      waterResistance: 'Not rain-proof, made for indoor use only',
      lining: 'Soft brushed underside',
      stretch: 'Four-way stretch, snug tailored fit',
    },
    bars: { water: 10, uv: 30, scratch: 82, breath: 95 },
  },
  'indoor-elite': {
    short: 'Indoor Elite',
    environment: 'Indoor · Showroom',
    warranty: '5-Year Guarantee',
    specs: {
      material: 'Four-way micro-stretch velvet fleece',
      breathability: 'Fully breathable, static-dissipating weave',
      waterResistance: 'Not rain-proof, made for indoor use only',
      lining: 'Ultra-dense brushed microfibre, zero friction',
      stretch: 'Sculpted 3D drape over every body line',
    },
    bars: { water: 10, uv: 35, scratch: 100, breath: 96 },
  },
  'unveil-showroom': {
    short: 'Unveiling Showroom',
    environment: 'Indoor · Reveal',
    warranty: '1-Year Guarantee',
    specs: {
      material: 'Light satin stretch fabric',
      breathability: 'Breathable, made for short-term use',
      waterResistance: 'Not rain-proof, made for indoor events',
      lining: 'Smooth non-abrasive inner layer',
      stretch: 'Tailored silhouette, clean release at the reveal',
    },
    bars: { water: 8, uv: 25, scratch: 80, breath: 85 },
  },
  'unveil-gala': {
    short: 'Unveiling Gala',
    environment: 'Indoor · Launch',
    warranty: '2-Year Guarantee',
    specs: {
      material: 'Heavy satin-finish stretch fabric in custom colours',
      breathability: 'Breathable, made for event use',
      waterResistance: 'Not rain-proof, made for indoor events',
      lining: 'Soft brushed underside, paint-safe',
      stretch: 'Weighted hem for a controlled, graceful reveal',
    },
    bars: { water: 10, uv: 30, scratch: 90, breath: 88 },
  },
  'unveil-signature': {
    short: 'Unveiling Signature',
    environment: 'Indoor · Collector',
    warranty: '5-Year Guarantee',
    specs: {
      material: 'Premium four-way stretch fabric, fully custom',
      breathability: 'Breathable, static-dissipating weave',
      waterResistance: 'Not rain-proof, made for indoor use',
      lining: 'Ultra-dense brushed microfibre, zero friction',
      stretch: 'Hand-finished 3D fit with embroidered crest',
    },
    bars: { water: 10, uv: 35, scratch: 98, breath: 94 },
  },
};

/** Every cover we make, with its full specification. Prices, images and features come from the shop data. */
export const FABRIC_SHEETS: FabricSheet[] = FABRICS.map((f) => ({
  id: f.id,
  group: f.group,
  name: f.title,
  tagline: f.subtitle,
  price: f.price,
  image: f.image,
  accent: f.accentColor,
  icon: f.icon,
  description: f.description,
  features: f.specs,
  idealFor: f.idealFor,
  rating: f.rating,
  reviewCount: f.reviewCount,
  ...EXTRA[f.id],
}));
