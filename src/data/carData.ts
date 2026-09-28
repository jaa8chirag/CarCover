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
    id: 'aston-martin',
    name: 'Aston Martin',
    country: 'United Kingdom',
    models: [
      { id: 'db12', name: 'DB12 Super Tourer', years: ['2024 - 2026', '2023'], variants: ['Coupe', 'Volante'], silhouette: 'super-tourer' },
      { id: 'vantage', name: 'Vantage F1 Edition', years: ['2024 - 2026', '2019 - 2023'], variants: ['Coupe', 'Roadster', 'F1 Edition Track Wing'], silhouette: 'coupe' },
      { id: 'dbs', name: 'DBS 770 Ultimate', years: ['2023 - 2024', '2018 - 2022'], variants: ['Coupe', 'Volante'], silhouette: 'super-tourer' },
      { id: 'valkyrie', name: 'Valkyrie Hypercar', years: ['2021 - 2025'], variants: ['Coupe', 'Spider', 'AMR Pro'], silhouette: 'hypercar' },
      { id: 'dbx707', name: 'DBX707 Luxury SUV', years: ['2022 - 2026'], variants: ['SUV / Standard Roof', 'SUV / Roof Rails'], silhouette: 'suv' },
      { id: 'db5', name: 'DB5 Heritage Classic', years: ['1963 - 1965 (Classic)'], variants: ['Saloon Coupe', 'Convertible'], silhouette: 'heritage' },
    ]
  },
  {
    id: 'porsche',
    name: 'Porsche',
    country: 'Germany',
    models: [
      { id: '911-gt3rs', name: '911 (992) GT3 RS', years: ['2023 - 2026'], variants: ['With High Downforce Wing', 'Weissach Package'], silhouette: 'hypercar' },
      { id: '911-turbo', name: '911 Turbo S', years: ['2020 - 2026'], variants: ['Coupe', 'Cabriolet', 'Targa'], silhouette: 'coupe' },
      { id: 'taycan', name: 'Taycan Turbo GT', years: ['2020 - 2026'], variants: ['Sport Saloon', 'Cross Turismo'], silhouette: 'super-tourer' },
      { id: 'cayman-gt4', name: '718 Cayman GT4 RS', years: ['2022 - 2026'], variants: ['Coupe with Wing'], silhouette: 'coupe' },
    ]
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    country: 'Italy',
    models: [
      { id: 'sf90', name: 'SF90 Stradale & XX', years: ['2020 - 2026'], variants: ['Stradale', 'Spider', 'XX High Downforce'], silhouette: 'hypercar' },
      { id: '296gtb', name: '296 GTB / GTS', years: ['2022 - 2026'], variants: ['GTB Coupe', 'GTS Spider', 'Assetto Fiorano'], silhouette: 'coupe' },
      { id: 'purosangue', name: 'Purosangue V12', years: ['2023 - 2026'], variants: ['Standard V12 Body'], silhouette: 'suv' },
      { id: 'daytona-sp3', name: 'Daytona SP3 Icona', years: ['2022 - 2025'], variants: ['Targa Roadster'], silhouette: 'hypercar' },
    ]
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    country: 'United Kingdom',
    models: [
      { id: '750s', name: '750S Supercar', years: ['2024 - 2026'], variants: ['Coupe', 'Spider'], silhouette: 'coupe' },
      { id: 'artura', name: 'Artura Hybrid', years: ['2022 - 2026'], variants: ['Coupe', 'Spider'], silhouette: 'coupe' },
      { id: 'senna', name: 'Senna Ultimate', years: ['2018 - 2020'], variants: ['Track Aerodynamic Spec'], silhouette: 'hypercar' },
    ]
  },
  {
    id: 'bentley',
    name: 'Bentley',
    country: 'United Kingdom',
    models: [
      { id: 'continental-gt', name: 'Continental GT Speed', years: ['2024 - 2026', '2018 - 2023'], variants: ['Coupe', 'Convertible'], silhouette: 'super-tourer' },
      { id: 'flying-spur', name: 'Flying Spur Mulliner', years: ['2020 - 2026'], variants: ['Extended Wheelbase Saloon'], silhouette: 'super-tourer' },
    ]
  },
  {
    id: 'rolls-royce',
    name: 'Rolls-Royce',
    country: 'United Kingdom',
    models: [
      { id: 'spectre', name: 'Spectre Electric Coupe', years: ['2024 - 2026'], variants: ['Coupe'], silhouette: 'super-tourer' },
      { id: 'cullinan', name: 'Cullinan Black Badge', years: ['2019 - 2026'], variants: ['Full Size Luxury SUV'], silhouette: 'suv' },
    ]
  }
];

export interface CoverTier {
  id: string;
  name: string;
  environment: 'Indoor' | 'Outdoor' | 'Reveal' | 'All-Weather';
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
    id: 'prestige-indoor',
    name: 'Prestige Tailored Indoor',
    environment: 'Indoor',
    tagline: 'Cashmere-soft sculpted fleece designed to accentuate every sensual line of your vehicle.',
    price: 389,
    rating: 4.96,
    reviewCount: 428,
    popular: true,
    warranty: '5-Year Guarantee',
    description: 'Our flagship bespoke indoor cover, crafted from heavy-gauge Italian stretch microfiber with deep fleece reverse. Protects against dust, accidental bumps, and humidity condensation while emphasizing the muscular contours of your machine.',
    features: [
      'Tailored mirror pockets and optional wing profile',
      'Ultra-dense 280gsm stretch poly-blend fleece',
      'Zero-scratch guaranteed, safe for fresh ceramic coat',
      'Anti-static yarn repels atmospheric dust particles',
      'Handcrafted contrast piping in 12 bespoke colors',
      'Embossed commemorative carrying holdall included'
    ],
    fabricSpecs: {
      material: '280gsm Italian Lycra & Brushed Microfleece',
      breathability: '100% Optimal Vapor Breathable',
      waterResistance: 'Indoor Moisture & Dust Repellent',
      lining: 'Ultra-Soft Brushed Fleece',
      stretch: '4-Way Dynamic Memory Stretch'
    },
    image: '/images/hero.jpg'
  },
  {
    id: 'stormshield-outdoor',
    name: 'Stormshield+ Bespoke All-Weather',
    environment: 'Outdoor',
    tagline: 'Extreme weather defense engineered to withstand torrential rain, UV radiation and icy conditions.',
    price: 529,
    rating: 4.94,
    reviewCount: 312,
    warranty: '5-Year Guarantee',
    description: 'Constructed from a four-layer nanofiber membrane that is 100% waterproof yet completely breathable. Prevents paint blistering from trapped condensation and shields against harsh UV, bird lime, tree sap, and sea spray.',
    features: [
      'Welded ultrasonically sealed water-tight seams',
      'Silver UV-reflective exterior deflects heat buildup',
      'Super-soft anti-scuff non-woven inner membrane',
      'Underbody securing straps with silicone buckle guards',
      'Reinforced front & rear elasticated hems with eyelets',
      'Tested in Scottish Highlands and Mojave Desert extremes'
    ],
    fabricSpecs: {
      material: '4-Layer Nanoporous Weather-Tech Composite',
      breathability: 'High-Flow Microporous Moisture Diffusion',
      waterResistance: '100% Hydrostatic Head > 10,000mm',
      lining: 'Non-Abrasive Micro-Fiber Barrier',
      stretch: 'Reinforced Dimensional Stability'
    },
    image: '/images/outdoor.jpg'
  },
  {
    id: 'reveal-showroom',
    name: 'Atelier Silk Reveal Drape',
    environment: 'Reveal',
    tagline: 'The theatrical unveiling cover chosen by prestigious marque dealerships and Concours d’Elegance.',
    price: 449,
    rating: 4.98,
    reviewCount: 189,
    warranty: '3-Year Guarantee',
    description: 'A liquid-gloss satin reveal drape designed to slide effortlessly off the vehicle during automotive launches, private deliveries, and museum presentations. Features weighted perimeter hem for exquisite dramatic cascades.',
    features: [
      'Lustrous liquid satin sheen under gallery spotlights',
      'Weighted golden fringe perimeter for controlled unveiling',
      'Zero static cling, cascades off like silk water',
      'Generous drape cut fits any supercar geometry',
      'Custom gold embroidery for crest or client initials',
      'Preserves factory finish without microfiber friction'
    ],
    fabricSpecs: {
      material: '100% High-Lustre Polished Drape Satin',
      breathability: 'Silky Air-Flow Permeable',
      waterResistance: 'Indoor Showroom Ambient Barrier',
      lining: 'Self-Faced Satin Zero-Friction Glaze',
      stretch: 'Fluid Gravity-Cascading Drape'
    },
    image: '/images/reveal.jpg'
  },
  {
    id: 'track-heritage',
    name: 'Diamond Weave Heritage & Paddock',
    environment: 'All-Weather',
    tagline: 'Tailored protection for classic collectors and track enthusiasts with specialized aerodynamic cutouts.',
    price: 489,
    rating: 4.92,
    reviewCount: 145,
    warranty: '5-Year Guarantee',
    description: 'Designed specifically for vehicles with aggressive aero splitters, high swan-neck wings, or vintage exterior mirrors. Built with ripstop diamond-weave fabric and heat-resistant rear exhaust panels.',
    features: [
      'Heat-resistant exhaust panels for trackside cool-down',
      'Accommodates bespoke track splitters & rear diffusers',
      'Rip-stop diamond weave exterior prevents tears',
      'Integrated lockable security cable eyelets',
      'Quick-release central belly strap',
      'Custom cutouts for battery tender charging port'
    ],
    fabricSpecs: {
      material: 'Ripstop Diamond-Weave Poly-Carbon Grid',
      breathability: 'Active Multi-Vent Channeling',
      waterResistance: 'Weather-Resistant Hydrophobic Coating',
      lining: 'Soft-Shield Laminated Cotton Fleece',
      stretch: 'Bi-Directional High-Tensile Weave'
    },
    image: '/images/craftsmanship.jpg'
  }
];

export const FABRIC_COLORS = [
  { id: 'racing-green', name: 'British Racing Green', hex: '#003831', accentHex: '#002621' },
  { id: 'obsidian-black', name: 'Obsidian Midnight', hex: '#0a0d10', accentHex: '#050708' },
  { id: 'silverstone-grey', name: 'Silverstone Liquid Silver', hex: '#8a939e', accentHex: '#6c747e' },
  { id: 'monaco-navy', name: 'Monaco Royal Navy', hex: '#0f2137', accentHex: '#091523' },
  { id: 'maranello-red', name: 'Maranello Corsa Red', hex: '#821419', accentHex: '#5c0c10' },
  { id: 'champagne-gold', name: 'Champagne Bronze Gold', hex: '#b3904e', accentHex: '#886b32' },
  { id: 'chalk-white', name: 'Chalk Ice White', hex: '#e2e8f0', accentHex: '#cbd5e1' },
];

export const PIPING_COLORS = [
  { id: 'piping-gold', name: 'Champagne Gold', hex: '#dfc287' },
  { id: 'piping-silver', name: 'Ice Silver Platinum', hex: '#f1f5f9' },
  { id: 'piping-green', name: 'Emerald British Green', hex: '#00624a' },
  { id: 'piping-red', name: 'Scuderia Red', hex: '#dc2626' },
  { id: 'piping-amber', name: 'Aston Racing Lime', hex: '#c5e838' },
  { id: 'piping-black', name: 'Stealth Black', hex: '#111827' },
];

export const TESTIMONIALS = [
  {
    quote: "When caring for a bespoke DB12 and vintage DB5, you do not compromise. The fit of this indoor prestige cover matches the millimeter perfection of the factory sheet metal.",
    author: "Lord Alistair Sterling",
    location: "Cotswolds, UK",
    car: "Aston Martin DB12 & DB5 Heritage",
    verified: true,
  },
  {
    quote: "The Stormshield+ survived severe Alpine winter storms at my chalet in Gstaad. Not a droplet pierced through, and the paintwork remained completely pristine with zero micro-swirls.",
    author: "Maximilian Von Berg",
    location: "Zurich, Switzerland",
    car: "Porsche 911 GT3 RS",
    verified: true,
  },
  {
    quote: "We used their atelier silk reveal covers for the private VIP unveiling of our hypercar clients in Mayfair. The dramatic fluid glide of the fabric under soft lighting is unmatched in the industry.",
    author: "G. Thorne",
    location: "Special Projects Curator, London",
    car: "McLaren & Aston Martin Bespoke Fleet",
    verified: true,
  }
];

export const FAQS = [
  {
    q: "Will the tailored cover cause swirl marks or micro-scratches on delicate clear coats?",
    a: "Never. All our covers utilize an ultra-plush, non-abrasive brushed fleece or silk-smooth inner layer that is tested and certified for delicate multi-stage paint corrections and fresh ceramic coatings. As with any fine tailored cover, we recommend the car is washed prior to fitting."
  },
  {
    q: "How does your 3D laser precision pattern ensure an exact tailored fit?",
    a: "Unlike generic car covers that sag or billow in the wind, every pattern in our archive of 50,000+ vehicles is generated via precision 3D CAD surface scans of the physical car. Every curve, rear wing, splitter, and side mirror pocket is mirrored down to the millimeter."
  },
  {
    q: "Is the outdoor cover truly breathable as well as 100% waterproof?",
    a: "Yes. Our Stormshield+ uses a specialized four-layer microporous membrane. The pores are small enough to prevent liquid water molecules from entering (hydrostatic head > 10,000mm), yet large enough to allow rising vapor and moisture from the warm engine or ambient air to escape outward."
  },
  {
    q: "Can I customize the cover with my car's chassis initials or personal emblem?",
    a: "Absolutely. Our British atelier offers fine silk-thread embroidery or precision heat-bonded foil embossing for personal monograms, vehicle registration, chassis numbers, or bespoke racing crests."
  },
  {
    q: "What is your warranty and lead time?",
    a: "All bespoke covers carry a comprehensive 5-Year Craftsmanship Guarantee against seam failure and fabric breakdown. Custom tailored commissions are handcrafted in Yorkshire and typically dispatch within 7 to 12 working days with tracked global priority freight."
  }
];
