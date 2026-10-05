import { Droplets, Sun, Wind, Sparkles, ShieldCheck, Gem, SunMedium, type LucideIcon } from 'lucide-react';
import { COVER_TIERS } from '@/data/carData';

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
  idealFor: string;
  rating?: number;
  reviewCount?: number;
  inShop: boolean;
}

const tier = (id: string) => COVER_TIERS.find((t) => t.id === id)!;

const fromTier = (
  id: string,
  extra: Pick<FabricSheet, 'id' | 'short' | 'accent' | 'icon' | 'environment' | 'idealFor' | 'inShop'>,
): FabricSheet => {
  const t = tier(id);
  return {
    ...extra,
    name: t.name,
    tagline: t.tagline,
    price: t.price,
    warranty: t.warranty,
    image: t.image,
    description: t.description,
    features: t.features,
    specs: t.fabricSpecs,
    rating: t.rating,
    reviewCount: t.reviewCount,
  };
};

/** Every fabric we make, with its full specification. */
export const FABRIC_SHEETS: FabricSheet[] = [
  fromTier('stormshield-outdoor', {
    id: 'monsoon', short: 'Monsoon', accent: '#0284c7', icon: Droplets, environment: 'Outdoor · Rain',
    idealFor: 'Mumbai, Kerala, Goa, coastal regions and outdoor monsoon street parking', inShop: true,
  }),
  fromTier('heatshield-pro', {
    id: 'heatshield', short: 'Heat-Shield', accent: '#b45309', icon: SunMedium, environment: 'Outdoor · Heat',
    idealFor: 'Delhi NCR, Rajasthan, Gujarat and open-sun summer parking', inShop: true,
  }),
  fromTier('prestige-indoor', {
    id: 'indoor-velvet', short: 'Velvet Indoor', accent: '#854d0e', icon: Sparkles, environment: 'Indoor · Garage',
    idealFor: 'Private garages, basements, detailing studios and ceramic-coated supercars', inShop: true,
  }),
  {
    id: 'offroad-armor',
    name: 'Heavy-Duty 4x4 Off-Road Overland Canvas',
    short: 'Off-Road Canvas',
    tagline: 'Ballistic tear-proof expedition guard for 4x4s with spare wheels and roof racks.',
    price: 6499,
    warranty: '3-Year Guarantee',
    image: '/images/outdoor.jpg',
    accent: '#334155',
    icon: ShieldCheck,
    environment: 'Outdoor · Overland',
    description: 'Thick reinforced 600D ballistic canvas with custom CAD contours for exterior spare tyres, roof luggage racks and overland recovery gear.',
    features: [
      'High-density ripstop ballistic weave resistant to thorns and scratches',
      'Tailored rear spare-wheel and roof-rack clearance pockets',
      'Mud, grease and acid-rain impervious exterior (easy pressure wash)',
      'Industrial tension ratchet buckles for mountain gale winds',
    ],
    specs: {
      material: '600D Ballistic Ripstop Canvas',
      breathability: 'Vented Seams with Moisture Release',
      waterResistance: 'Water-Repellent Coated Exterior',
      lining: 'Soft Brushed Paint-Safe Underlay',
      stretch: 'Rigid Tailored Fit with Ratchet Tie-Downs',
    },
    idealFor: 'Mahindra Thar Roxx, Toyota Fortuner, Defender, Hilux and overland 4x4s',
    inShop: true,
  },
  fromTier('reveal-showroom', {
    id: 'reveal-showroom', short: 'Reveal Drape', accent: '#9d174d', icon: Gem, environment: 'Showroom · Reveal',
    idealFor: 'Dealership unveilings, car clubs and VIP delivery presentations', inShop: false,
  }),
];
