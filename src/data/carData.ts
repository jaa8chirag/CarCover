export interface CarModel {
  id: string;
  name: string;
  years: string[];
  variants: string[];
  silhouette: string;
}

export interface CarBrand {
  id: string;
  name: string;
  country: string;
  models: CarModel[];
}

export const CAR_BRANDS: CarBrand[] = [
  {
    id: 'mahindra',
    name: 'Mahindra',
    country: 'India',
    models: [
      { id: 'thar', name: 'Thar 4x4 & Earth Edition', years: ['2020 - 2026'], variants: ['Hard Top (With Spare Wheel)', 'Convertible Soft Top'], silhouette: 'suv' },
      { id: 'thar-roxx', name: 'Thar Roxx (5-Door)', years: ['2024 - 2026'], variants: ['Panoramic Roof / Spare Wheel', 'AX7L Luxury 4x4'], silhouette: 'suv' },
      { id: 'scorpio-n', name: 'Scorpio-N', years: ['2022 - 2026'], variants: ['Z8L 4xplor with Roof Rails', 'Standard Z8'], silhouette: 'suv' },
      { id: 'xuv700', name: 'XUV700 AX7', years: ['2021 - 2026'], variants: ['With Shark Fin & Flush Handles', 'Panoramic Sunroof Spec'], silhouette: 'suv' },
      { id: 'scorpio-classic', name: 'Scorpio Classic', years: ['2022 - 2026', '2014 - 2021'], variants: ['S11 with Roof Rails', 'S Standard'], silhouette: 'suv' },
    ]
  },
  {
    id: 'toyota',
    name: 'Toyota',
    country: 'Japan',
    models: [
      { id: 'fortuner', name: 'Fortuner Legender & GR-S', years: ['2021 - 2026', '2016 - 2020'], variants: ['Legender Aero Kit', '4x4 Standard High-Rider'], silhouette: 'suv' },
      { id: 'innova-hycross', name: 'Innova Hycross MPV', years: ['2023 - 2026'], variants: ['ZX(O) Ottoman Roof Spec', 'GX Fleet Spec'], silhouette: 'suv' },
      { id: 'land-cruiser', name: 'Land Cruiser LC300', years: ['2022 - 2026'], variants: ['ZX Luxury V6 Body'], silhouette: 'suv' },
      { id: 'hilux', name: 'Hilux Lifestyle 4x4', years: ['2022 - 2026'], variants: ['Double Cab with Open Bed', 'Double Cab with Canopy'], silhouette: 'suv' },
      { id: 'hyryder', name: 'Urban Cruiser Hyryder', years: ['2022 - 2026'], variants: ['Strong Hybrid Panoramic', 'NeoDrive'], silhouette: 'suv' },
    ]
  },
  {
    id: 'tata',
    name: 'Tata Motors',
    country: 'India',
    models: [
      { id: 'safari', name: 'Safari Dark & Stealth Edition', years: ['2023 - 2026', '2021 - 2023'], variants: ['Accomplished+ (With Roof Spoiler)', 'Dark Edition Spec'], silhouette: 'suv' },
      { id: 'harrier', name: 'Harrier Facelift', years: ['2023 - 2026', '2019 - 2023'], variants: ['Fearless+ Yellow/Dark', 'Adventure Spec'], silhouette: 'suv' },
      { id: 'curvv', name: 'Curvv Coupe SUV', years: ['2024 - 2026'], variants: ['EV Aerodynamic Body', 'ICE Turbo Aero Spoiler'], silhouette: 'coupe' },
      { id: 'nexon', name: 'Nexon & Nexon.ev', years: ['2023 - 2026', '2020 - 2023'], variants: ['Creative+ Sunroof Spec', 'Fearless+ Dark'], silhouette: 'suv' },
    ]
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    country: 'South Korea',
    models: [
      { id: 'creta', name: 'Creta & Creta N-Line', years: ['2024 - 2026', '2020 - 2023'], variants: ['N-Line Twin Exhaust Wing', 'SX(O) Panoramic Sunroof'], silhouette: 'suv' },
      { id: 'tucson', name: 'Tucson Signature HTRAC', years: ['2022 - 2026'], variants: ['AWD Signature AWD'], silhouette: 'suv' },
      { id: 'verna', name: 'Verna Turbo Fastback', years: ['2023 - 2026'], variants: ['SX(O) Turbo Black Alloys', 'Standard SX'], silhouette: 'super-tourer' },
      { id: 'ioniq5', name: 'Ioniq 5 Parametric Pixel', years: ['2023 - 2026'], variants: ['Retro-Futuristic EV Body'], silhouette: 'suv' },
    ]
  },
  {
    id: 'land-rover',
    name: 'Land Rover',
    country: 'United Kingdom',
    models: [
      { id: 'defender-110', name: 'Defender 110 & 130', years: ['2020 - 2026'], variants: ['Standard Roof with Spare Wheel', 'Expedition Roof Rack & Ladder'], silhouette: 'suv' },
      { id: 'range-rover', name: 'Range Rover Autobiography', years: ['2022 - 2026'], variants: ['Standard Wheelbase', 'LWB 7-Seater Extended'], silhouette: 'suv' },
      { id: 'defender-90', name: 'Defender 90 (3-Door)', years: ['2020 - 2026'], variants: ['Compact SWB with Rear Wheel'], silhouette: 'suv' },
      { id: 'rr-sport', name: 'Range Rover Sport Dynamic', years: ['2023 - 2026'], variants: ['Dynamic SE / HSE Body'], silhouette: 'suv' },
    ]
  },
  {
    id: 'mercedes-benz',
    name: 'Mercedes-Benz',
    country: 'Germany',
    models: [
      { id: 'g-wagon', name: 'G-Class (G63 AMG & G400d)', years: ['2019 - 2026'], variants: ['AMG Twin Side-Exhaust Spec', 'Night Package with Spare Wheel'], silhouette: 'suv' },
      { id: 's-class', name: 'S-Class & Maybach S680', years: ['2021 - 2026'], variants: ['Maybach Extended Saloon', 'S450 Long Wheelbase'], silhouette: 'super-tourer' },
      { id: 'e-class', name: 'E-Class LWB (V214)', years: ['2024 - 2026', '2017 - 2023'], variants: ['Exclusive Long Wheelbase', 'AMG Line Sport'], silhouette: 'super-tourer' },
      { id: 'glc', name: 'GLC Luxury SUV', years: ['2023 - 2026'], variants: ['GLC 300 4MATIC', 'AMG Line Coupe'], silhouette: 'suv' },
    ]
  },
  {
    id: 'bmw',
    name: 'BMW',
    country: 'Germany',
    models: [
      { id: 'm4', name: 'M4 Competition / M340i', years: ['2021 - 2026'], variants: ['Coupe Carbon Roof', 'Gran Limousine M Sport'], silhouette: 'coupe' },
      { id: 'x7', name: 'X7 M60i Luxury 7-Seater', years: ['2023 - 2026'], variants: ['M Sport Split Headlamp Body'], silhouette: 'suv' },
      { id: 'z4', name: 'Z4 M40i Roadster', years: ['2020 - 2026'], variants: ['Soft-Top Roadster'], silhouette: 'coupe' },
      { id: 'i7', name: 'i7 & 7 Series Sedan', years: ['2023 - 2026'], variants: ['Executive Theatre Screen Spec'], silhouette: 'super-tourer' },
    ]
  },
  {
    id: 'porsche',
    name: 'Porsche',
    country: 'Germany',
    models: [
      { id: '911-gt3rs', name: '911 (992) GT3 RS / Turbo', years: ['2022 - 2026'], variants: ['With Swan-Neck Wing Spec', 'Turbo S Aerokit Body'], silhouette: 'hypercar' },
      { id: 'cayenne', name: 'Cayenne & Coupe Turbo GT', years: ['2024 - 2026', '2018 - 2023'], variants: ['Coupe Active Spoiler', 'Standard Luxury SUV'], silhouette: 'suv' },
      { id: 'macan', name: 'Macan EV & GTS', years: ['2024 - 2026', '2019 - 2023'], variants: ['Electric Aerodynamic Body', 'GTS Sport Chrono'], silhouette: 'suv' },
    ]
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin',
    country: 'United Kingdom',
    models: [
      { id: 'db12', name: 'DB12 Super Tourer', years: ['2024 - 2026'], variants: ['Coupe', 'Volante'], silhouette: 'super-tourer' },
      { id: 'vantage', name: 'Vantage Sports Coupe', years: ['2024 - 2026'], variants: ['Coupe Widebody Spec'], silhouette: 'coupe' },
      { id: 'dbx707', name: 'DBX707 Super SUV', years: ['2022 - 2026'], variants: ['High-Performance Rear Diffuser'], silhouette: 'suv' },
      { id: 'vanquish', name: 'Vanquish V12 Reborn', years: ['2025 - 2026'], variants: ['Flagship Carbon Fibre Coupe'], silhouette: 'super-tourer' },
    ]
  },
  {
    id: 'maruti-suzuki',
    name: 'Maruti Suzuki (Nexa)',
    country: 'India',
    models: [
      { id: 'jimny', name: 'Jimny 5-Door 4x4', years: ['2023 - 2026'], variants: ['Alpha with Spare Wheel', 'Zeta Standard'], silhouette: 'suv' },
      { id: 'grand-vitara', name: 'Grand Vitara AllGrip', years: ['2022 - 2026'], variants: ['Strong Hybrid Sunroof', 'AllGrip AWD Spec'], silhouette: 'suv' },
      { id: 'swift', name: 'Swift 2024 (Z-Series)', years: ['2024 - 2026', '2018 - 2023'], variants: ['ZXi+ Sport Roof Spoiler', 'VXi Standard'], silhouette: 'coupe' },
    ]
  }
];

export interface CoverTier {
  id: string;
  name: string;
  environment: 'Outdoor' | 'Indoor' | 'HeatShield' | 'Reveal';
  tagline: string;
  price: number;
  rating: number;
  reviewCount: number;
  popular?: boolean;
  warranty: string;
  description: string;
  features: string[];
  fabricSpecs: {
    material: string;
    breathability: string;
    waterResistance: string;
    lining: string;
    stretch: string;
  };
  image: string;
}

export const COVER_TIERS: CoverTier[] = [
  {
    id: 'stormshield-outdoor',
    name: 'AquaShield+ Extreme Monsoon Outdoor',
    environment: 'Outdoor',
    tagline: '100% Waterproof & Windproof protection designed for severe Indian monsoons and outdoor street parking.',
    price: 4999,
    rating: 4.96,
    reviewCount: 1240,
    popular: true,
    warranty: '3-Year Replacement Guarantee',
    description: 'Constructed from a multi-layer heavy-duty polymer nano-membrane with ultrasonically welded seams. Designed to survive non-stop Mumbai monsoons, torrential downpours, high winds, and stray street scratches.',
    features: [
      '100% Waterproof with 10,000mm+ hydrostatic water head',
      'Dual heavy-duty underbody wind-lock buckles (cannot fly off)',
      'High-visibility neon reflective piping for nighttime street safety',
      'Integrated tailored mirror pockets and elasticized grip hems',
      'Stray dog & cat scratch-resistant ballistic matrix weave',
      'Free heavy-duty water-sealed travel holdall bag included'
    ],
    fabricSpecs: {
      material: '5-Layer Hydrophobic Nano-Polymer Composite',
      breathability: 'Dual-Flow Moisture Evaporation Core',
      waterResistance: '100% Impermeable Hydrostatic Head > 10,000mm',
      lining: 'Non-Abrasive Soft Micro-Cellular Fleece',
      stretch: 'Reinforced High-Tensile Ripstop Stability'
    },
    image: '/images/cover_monsoon.jpg'
  },
  {
    id: 'prestige-indoor',
    name: 'Prestige Velvet Satin Indoor Fleece',
    environment: 'Indoor',
    tagline: 'Cashmere-soft sculpted stretch fleece tailored to protect delicate ceramic coatings in basement garages.',
    price: 5499,
    rating: 4.98,
    reviewCount: 890,
    popular: false,
    warranty: '5-Year Guarantee',
    description: 'Our pinnacle luxury indoor cover crafted from 280gsm Italian Lycra and brushed cashmere-soft microfiber. Clings sensually to every muscular contour of your vehicle while deflecting Delhi/NCR basement dust and atmospheric smog.',
    features: [
      'Ultra-plush cashmere-soft lining, 100% zero-scratch certified',
      'Safe for fresh multi-stage paint correction and ceramic coatings',
      'Anti-static yarn permanently repels abrasive fine dust particles',
      'Tailored mirror pockets and contrast racing piping in 6 colors',
      'Complimentary custom metallic thread monogram embroidery',
      'Preserves showroom gloss between weekend drives'
    ],
    fabricSpecs: {
      material: '280gsm Italian Lycra & Ultra-Dense Brushed Microfleece',
      breathability: '100% Active Vapor Evaporation Permeability',
      waterResistance: 'Indoor Garage Ambient & Dust Barrier',
      lining: 'Ultra-Soft Zero-Friction Cashmere Fleece',
      stretch: '4-Way Form-Fitting Dynamic Memory Stretch'
    },
    image: '/images/cover_hero.jpg'
  },
  {
    id: 'heatshield-pro',
    name: 'Titanium Heat-Shield 48°C UV Defense',
    environment: 'HeatShield',
    tagline: 'Defeats scorching 48°C Indian summer sun, reducing vehicle cabin heat by up to 20°C.',
    price: 4499,
    rating: 4.93,
    reviewCount: 654,
    popular: false,
    warranty: '3-Year Guarantee',
    description: 'Engineered with aerodynamic aerospace silver-titanium composite that reflects 99.8% of harsh ultraviolet rays. Protects dashboard electronics, leather upholstery from cracking, and paint from severe UV sun fading.',
    features: [
      '99.8% UV-A and UV-B solar radiation reflection',
      'Multi-layer thermal insulation drops cabin temps by up to 20°C',
      'Prevents leather seat cracking and digital dashboard LCD damage',
      'Resistant to industrial chemical fallout and acidic bird droppings',
      'Elasticized double-stitched front and rear bumpers with tie-downs',
      'Lightweight and easily folded away into complimentary storage pouch'
    ],
    fabricSpecs: {
      material: 'Aerospace Silver-Titanium Multi-Reflective Foil Layer',
      breathability: 'Micro-Vented Thermal Air Expulsion',
      waterResistance: 'Weather-Resistant Hydrophobic Barrier',
      lining: 'Soft Laminated Scratch-Proof Cotton Underlay',
      stretch: 'Thermal Heat-Stabilized Poly-Grid'
    },
    image: '/images/cover_heatshield.jpg'
  },
  {
    id: 'reveal-showroom',
    name: 'Atelier Liquid Silk Reveal Drape',
    environment: 'Reveal',
    tagline: 'The theatrical unveiling cover chosen by exotic dealerships, car clubs and VIP delivery presentations.',
    price: 6999,
    rating: 4.99,
    reviewCount: 340,
    popular: false,
    warranty: '3-Year Guarantee',
    description: 'A lustrous liquid-satin unveiling drape designed to slide effortlessly off the car with cinematic dramatic flair. Features weighted hem perimeter that cascades off the vehicle like liquid water under showroom lighting.',
    features: [
      'Glossy liquid satin finish under spotlight and natural sun',
      'Weighted golden border hem for controlled dramatic unveilings',
      'Zero static cling, effortlessly glides off during vehicle handover',
      'Generous drape cut custom tailored to fit any sports car or SUV',
      'Complimentary custom embroidered family crest, name, or VIN',
      'Delivered in an embroidered velvet keepsake collector case'
    ],
    fabricSpecs: {
      material: '100% High-Lustre Polished Liquid Drape Satin',
      breathability: 'Silky Air-Flow Permeable',
      waterResistance: 'Indoor Showroom & Exhibition Shield',
      lining: 'Self-Faced Satin Zero-Friction Glaze',
      stretch: 'Fluid Gravity-Cascading Drape Cut'
    },
    image: '/images/cover_velvet.jpg'
  }
];

export const FABRIC_COLORS = [
  { id: 'racing-green', name: 'British Racing Green', hex: '#003831', accentHex: '#002621' },
  { id: 'obsidian-black', name: 'Obsidian Midnight Black', hex: '#0a0d10', accentHex: '#050708' },
  { id: 'silverstone-grey', name: 'Silverstone Liquid Silver', hex: '#8a939e', accentHex: '#6c747e' },
  { id: 'monaco-navy', name: 'Monaco Royal Navy', hex: '#0f2137', accentHex: '#091523' },
  { id: 'maranello-red', name: 'Corsa Crimson Red', hex: '#821419', accentHex: '#5c0c10' },
  { id: 'champagne-gold', name: 'Champagne Desert Gold', hex: '#b3904e', accentHex: '#886b32' },
  { id: 'titanium-silver', name: 'Titanium UV Shield', hex: '#cbd5e1', accentHex: '#94a3b8' },
];

export const PIPING_COLORS = [
  { id: 'piping-gold', name: 'Champagne Gold', hex: '#dfc287' },
  { id: 'piping-lime', name: 'Neon Acid Lime (High-Vis)', hex: '#c5e838' },
  { id: 'piping-silver', name: 'Ice Silver Platinum', hex: '#f1f5f9' },
  { id: 'piping-green', name: 'Emerald Racing Green', hex: '#00624a' },
  { id: 'piping-red', name: 'Scuderia Red', hex: '#dc2626' },
  { id: 'piping-black', name: 'Stealth Black', hex: '#111827' },
];

export const TESTIMONIALS = [
  {
    quote: "During Mumbai's heavy monsoon, my Thar Roxx was parked right on the open street. Not a single drop pierced the AquaShield cover, and the wind buckles held strong against 50 km/h wind gusts!",
    author: "Kabir Malhotra",
    location: "Bandra West, Mumbai",
    car: "Mahindra Thar Roxx 4x4",
    verified: true,
  },
  {
    quote: "Delhi summer temperatures hit 47°C in June. The Titanium Heat-Shield dropped my Fortuner's interior cabin temp noticeably, and the leather seats didn't burn my hands. Essential for North India.",
    author: "Rajeshwar Singh",
    location: "Vasant Vihar, New Delhi",
    car: "Toyota Fortuner Legender",
    verified: true,
  },
  {
    quote: "Got the Prestige Velvet indoor cover for my Defender 110 in our Bengaluru apartment basement. The soft fleece lining is completely scratch-proof, and the custom gold monogram looks insanely premium!",
    author: "Vikramaditya Rao",
    location: "Indiranagar, Bengaluru",
    car: "Land Rover Defender 110",
    verified: true,
  }
];

export const FAQS = [
  {
    q: "Will this car cover cause scratches, swirl marks, or paint damage?",
    a: "Never. Every TheSignaturecovers bespoke tailored cover is engineered with an ultra-plush, non-abrasive soft cashmere fleece inner lining that is certified 100% scratch-proof. It protects fresh ceramic coatings, paint protection film (PPF), and showroom gloss paint from swirl marks."
  },
  {
    q: "How does the cover survive heavy Indian monsoon rains and high winds?",
    a: "Our AquaShield+ Outdoor cover features a 10,000mm+ hydrostatic head waterproof nano-membrane with heat-sealed seams. It is equipped with dual heavy-duty underbody snap-lock buckle straps and high-elastic hems that lock tightly around the tires so it cannot blow away in storms."
  },
  {
    q: "How does it protect against 48°C scorching Indian summer heat?",
    a: "Our Titanium Heat-Shield and Outdoor covers feature multi-layer silver UV-reflective foil layers that deflect 99.8% of solar UV radiation. This keeps your car's interior up to 20°C cooler and prevents dashboard LCD cracking and leather upholstery deterioration."
  },
  {
    q: "Is it tailored specifically to my exact car model with mirror pockets?",
    a: "Yes! We maintain precision 3D CAD coordinate patterns for over 50,000 Indian and international cars—from Mahindra Thar, Scorpio-N, Fortuner, Creta, and Safari to Mercedes, BMW, Porsche, and Aston Martin. Each cover features tailored mirror pockets, antenna cutouts, and spoiler allowances."
  },
  {
    q: "What are the shipping times across India and warranty policy?",
    a: "We provide 100% Free Express Shipping across all 19,000+ PIN codes in India (typically delivering within 3 to 5 business days). Every cover comes with a hassle-free 3 to 5 Year Replacement Guarantee against seam failure or fabric breakdown."
  }
];
