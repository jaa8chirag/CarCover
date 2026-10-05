import { Droplets, SunMedium, Sparkles, ShieldCheck, type LucideIcon } from 'lucide-react';

export interface Fabric {
  id: string;
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

export const FABRICS: Fabric[] = [
  {
    id: 'monsoon',
    rating: 4.96,
    reviewCount: 1240,
    bestseller: true,
    title: 'Monsoon Stormproof 10,000mm',
    subtitle: '100% Waterproof Deluge Armor',
    badge: 'MONSOON DEFENSE',
    price: 4999,
    accentColor: '#00665e',
    image: '/images/cover_monsoon.jpg',
    icon: Droplets,
    description: '4-Ply nano-welded storm fabric engineered for torrential Mumbai, Kerala & coastal cloudbursts. Causes water to bead into tight pearls and roll off instantaneously.',
    specs: [
      '10,000mm Hydrostatic Head submersion-grade resistance',
      'Ultrasonically sealed heat-taped seams (Zero leakage)',
      'Breathable micro-porous core preventing paint blistering',
      'Dual hurricane underbody tie-down tension straps',
    ],
    idealFor: 'Mumbai, Kerala, Goa, Coastal regions & Outdoor Monsoon Street Parking',
  },
  {
    id: 'heatshield',
    rating: 4.93,
    reviewCount: 654,
    title: 'SolarReflect 48°C Heat Shield',
    subtitle: 'Titanium-Infused UV Solar Armor',
    badge: 'UV & HEAT DEFENSE',
    price: 4499,
    accentColor: '#b45309',
    image: '/images/cover_heatshield.jpg',
    icon: SunMedium,
    description: 'Aerospace metallized composite designed to deflect 99.8% of searing UV solar rays in Delhi NCR, Rajasthan & open summer parking. Keeps cabin cool.',
    specs: [
      'Lowers interior cabin temperature by up to 22°C',
      'Prevents dashboard cracking, leather fading & clear-coat burn',
      'Anti-abrasive soft microfiber inner paint contact lining',
      'High-visibility nighttime reflective corner safety markers',
    ],
    idealFor: 'Delhi NCR, Rajasthan, Gujarat & Open Sun Summer Parking',
  },
  {
    id: 'indoor-velvet',
    rating: 4.98,
    reviewCount: 890,
    title: 'CashmereVelvet Atelier Showroom Drape',
    subtitle: 'Ultra-Soft Scratch-Proof Sanctuary',
    badge: 'CONCOURS INDOOR',
    price: 5499,
    accentColor: '#854d0e',
    image: '/images/cover_velvet.jpg',
    icon: Sparkles,
    description: 'Four-way micro-stretch fleece certified 100% scratch-proof for freshly ceramic-coated supercars, collector garages & detailing studios.',
    specs: [
      '100% scratch-proof certified for PPF wraps & fresh ceramic coats',
      'Sculpted 3D drape hugging bodylines, mirrors and spoilers',
      'Static-dissipating weave that actively repels settling garage dust',
      'Custom contrast piping & personalized monogram embroidery',
    ],
    idealFor: 'Private Garages, Basements, Detailing Studios & Luxury Supercars',
  },
  {
    id: 'offroad-armor',
    title: 'Heavy-Duty 4x4 Off-Road Overland Canvas',
    subtitle: 'Ballistic Tear-Proof Expedition Guard',
    badge: '4X4 OVERLAND',
    price: 6499,
    accentColor: '#334155',
    image: '/images/outdoor.jpg',
    icon: ShieldCheck,
    description: 'Thick reinforced 600D ballistic canvas with custom CAD contours for exterior spare tires, roof luggage racks, and overland recovery gear.',
    specs: [
      'High-density ripstop ballistic weave resistant to sharp thorns & scratches',
      'Tailored rear spare wheel and roof-rack clearance pockets',
      'Mud, grease and acid-rain impervious exterior (easy pressure wash)',
      'Industrial tension ratchet buckles for mountain gale winds',
    ],
    idealFor: 'Mahindra Thar Roxx, Toyota Fortuner, Defender, Hilux & Overland 4x4s',
  },
];
