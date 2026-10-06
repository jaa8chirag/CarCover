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
      { id: 'xuv3xo', name: 'XUV 3XO', years: ['2024 - 2026'], variants: ['AX7 L', 'MX3'], silhouette: 'coupe' },
      { id: 'bolero', name: 'Bolero & Bolero Neo', years: ['2019 - 2026'], variants: ['Neo N10(O)', 'B6'], silhouette: 'suv' },
      { id: 'xuv400', name: 'XUV400 EV', years: ['2023 - 2026'], variants: ['EL Pro', 'EC Pro'], silhouette: 'suv' },
      { id: 'be6', name: 'BE 6 & XEV 9e', years: ['2025 - 2026'], variants: ['Pack Three', 'Pack Two'], silhouette: 'coupe' },
      { id: 'marazzo', name: 'Marazzo', years: ['2018 - 2022'], variants: ['M8', 'M4+'], silhouette: 'suv' },
      { id: 'xuv300', name: 'XUV300', years: ['2019 - 2024'], variants: ['W8(O)', 'W6'], silhouette: 'coupe' },
      { id: 'xuv500', name: 'XUV500', years: ['2011 - 2021'], variants: ['W11(O)', 'W8'], silhouette: 'suv' },
      { id: 'kuv100', name: 'KUV100 NXT', years: ['2016 - 2022'], variants: ['K8', 'K6+'], silhouette: 'coupe' },
      { id: 'bolero-camper', name: 'Bolero Camper & Pik-Up', years: ['2018 - 2026'], variants: ['Camper Gold', 'Pik-Up'], silhouette: 'suv' },
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
      { id: 'innova-crysta', name: 'Innova Crysta', years: ['2016 - 2026'], variants: ['ZX 7-Seater', 'GX'], silhouette: 'suv' },
      { id: 'glanza', name: 'Glanza', years: ['2022 - 2026'], variants: ['V', 'G'], silhouette: 'coupe' },
      { id: 'rumion', name: 'Rumion', years: ['2023 - 2026'], variants: ['V', 'S'], silhouette: 'suv' },
      { id: 'camry', name: 'Camry Hybrid', years: ['2019 - 2026'], variants: ['Elegance'], silhouette: 'super-tourer' },
      { id: 'vellfire', name: 'Vellfire', years: ['2023 - 2026'], variants: ['Executive Lounge'], silhouette: 'suv' },
      { id: 'taisor', name: 'Urban Cruiser Taisor', years: ['2024 - 2026'], variants: ['V Turbo', 'G'], silhouette: 'coupe' },
      { id: 'legender', name: 'Fortuner Legend (Old Gen)', years: ['2012 - 2015'], variants: ['4x4 AT'], silhouette: 'suv' },
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
      { id: 'punch', name: 'Punch & Punch.ev', years: ['2021 - 2026'], variants: ['Empowered+ Sunroof', 'Adventure'], silhouette: 'coupe' },
      { id: 'tiago', name: 'Tiago & Tiago.ev', years: ['2020 - 2026'], variants: ['XZ+', 'XT'], silhouette: 'coupe' },
      { id: 'tigor', name: 'Tigor & Tigor.ev', years: ['2020 - 2026'], variants: ['XZ+', 'XM'], silhouette: 'super-tourer' },
      { id: 'altroz', name: 'Altroz', years: ['2020 - 2026'], variants: ['Racer', 'XZ+ S'], silhouette: 'coupe' },
      { id: 'nexon-ev', name: 'Nexon.ev Empowered', years: ['2023 - 2026'], variants: ['Long Range', 'Medium Range'], silhouette: 'suv' },
      { id: 'sierra', name: 'Sierra (Reborn)', years: ['2025 - 2026'], variants: ['Accomplished+', 'Adventure'], silhouette: 'suv' },
      { id: 'harrier-ev', name: 'Harrier.ev', years: ['2025 - 2026'], variants: ['Empowered AWD', 'Adventure'], silhouette: 'suv' },
      { id: 'curvv-ev', name: 'Curvv.ev', years: ['2024 - 2026'], variants: ['Empowered+ A', 'Creative'], silhouette: 'coupe' },
      { id: 'indica', name: 'Indigo & Indica (Legacy)', years: ['2005 - 2018'], variants: ['Standard'], silhouette: 'super-tourer' },
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
      { id: 'i20', name: 'i20 & i20 N Line', years: ['2020 - 2026'], variants: ['N8', 'Asta (O)'], silhouette: 'coupe' },
      { id: 'venue', name: 'Venue & Venue N Line', years: ['2022 - 2026'], variants: ['SX(O)', 'N10'], silhouette: 'coupe' },
      { id: 'exter', name: 'Exter', years: ['2023 - 2026'], variants: ['SX Connect', 'SX'], silhouette: 'suv' },
      { id: 'alcazar', name: 'Alcazar', years: ['2021 - 2026'], variants: ['Signature (O) 7S', 'Prestige'], silhouette: 'suv' },
      { id: 'aura', name: 'Aura', years: ['2020 - 2026'], variants: ['SX+', 'S'], silhouette: 'super-tourer' },
      { id: 'grand-i10', name: 'Grand i10 Nios', years: ['2019 - 2026'], variants: ['Asta', 'Sportz'], silhouette: 'coupe' },
      { id: 'santro', name: 'Santro', years: ['2018 - 2022'], variants: ['Asta', 'Sportz'], silhouette: 'coupe' },
      { id: 'creta-ev', name: 'Creta Electric', years: ['2025 - 2026'], variants: ['Excellence LR', 'Smart'], silhouette: 'suv' },
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
      { id: 'defender', name: 'Defender 90 / 110 / 130', years: ['2021 - 2026'], variants: ['Defender 110', 'Defender 90'], silhouette: 'suv' },
      { id: 'evoque-disco', name: 'Evoque & Discovery Sport', years: ['2021 - 2026'], variants: ['Evoque', 'Discovery Sport'], silhouette: 'suv' },
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
      { id: 'gla-glb', name: 'GLA, GLB & GLC', years: ['2021 - 2026'], variants: ['GLA 200', 'GLC 300'], silhouette: 'suv' },
      { id: 'c-class', name: 'C-Class & E-Class', years: ['2021 - 2026'], variants: ['C 200', 'E 220d'], silhouette: 'super-tourer' },
      { id: 'eqs', name: 'EQS, EQE & EQB', years: ['2022 - 2026'], variants: ['EQS 580', 'EQB 350'], silhouette: 'super-tourer' },
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
      { id: 'x1-x3', name: 'X1, X3 & X5', years: ['2021 - 2026'], variants: ['X1 sDrive', 'X5 xDrive'], silhouette: 'suv' },
      { id: '3-5-series', name: '3, 5 & 7 Series', years: ['2021 - 2026'], variants: ['330Li', '530Li'], silhouette: 'super-tourer' },
      { id: 'ix', name: 'iX, i4 & i7', years: ['2022 - 2026'], variants: ['iX xDrive40', 'i4 eDrive40'], silhouette: 'super-tourer' },
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
    name: 'Maruti Suzuki',
    country: 'India',
    models: [
      { id: 'jimny', name: 'Jimny 5-Door 4x4', years: ['2023 - 2026'], variants: ['Alpha with Spare Wheel', 'Zeta Standard'], silhouette: 'suv' },
      { id: 'grand-vitara', name: 'Grand Vitara AllGrip', years: ['2022 - 2026'], variants: ['Strong Hybrid Sunroof', 'AllGrip AWD Spec'], silhouette: 'suv' },
      { id: 'swift', name: 'Swift 2024 (Z-Series)', years: ['2024 - 2026', '2018 - 2023'], variants: ['ZXi+ Sport Roof Spoiler', 'VXi Standard'], silhouette: 'coupe' },
      { id: 'baleno', name: 'Baleno', years: ['2022 - 2026'], variants: ['Alpha', 'Zeta'], silhouette: 'coupe' },
      { id: 'fronx', name: 'Fronx', years: ['2023 - 2026'], variants: ['Alpha Turbo', 'Delta+'], silhouette: 'coupe' },
      { id: 'xl6', name: 'XL6', years: ['2022 - 2026'], variants: ['Alpha+', 'Zeta'], silhouette: 'suv' },
      { id: 'ignis', name: 'Ignis', years: ['2020 - 2026'], variants: ['Alpha', 'Zeta'], silhouette: 'coupe' },
      { id: 'ciaz', name: 'Ciaz', years: ['2018 - 2026'], variants: ['Alpha', 'Delta'], silhouette: 'super-tourer' },
      { id: 'invicto', name: 'Invicto', years: ['2023 - 2026'], variants: ['Alpha+ 7S', 'Zeta+'], silhouette: 'suv' },
      { id: 'brezza', name: 'Brezza', years: ['2022 - 2026'], variants: ['ZXi+ Sunroof', 'VXi'], silhouette: 'suv' },
      { id: 'ertiga', name: 'Ertiga', years: ['2022 - 2026'], variants: ['ZXi+', 'VXi'], silhouette: 'suv' },
      { id: 'wagonr', name: 'Wagon R', years: ['2019 - 2026'], variants: ['ZXi+', 'LXi'], silhouette: 'coupe' },
      { id: 'dzire', name: 'Dzire', years: ['2024 - 2026', '2017 - 2023'], variants: ['ZXi+', 'VXi'], silhouette: 'super-tourer' },
      { id: 'alto-k10', name: 'Alto K10', years: ['2022 - 2026'], variants: ['VXi+', 'Std'], silhouette: 'coupe' },
      { id: 's-presso', name: 'S-Presso', years: ['2022 - 2026'], variants: ['VXi+', 'Std'], silhouette: 'coupe' },
      { id: 'celerio', name: 'Celerio', years: ['2021 - 2026'], variants: ['ZXi+', 'VXi'], silhouette: 'coupe' },
      { id: 'eeco', name: 'Eeco', years: ['2019 - 2026'], variants: ['5-Seater AC', '7-Seater'], silhouette: 'suv' },
      { id: 'victoris', name: 'Victoris', years: ['2025 - 2026'], variants: ['ZXi+ AWD', 'VXi'], silhouette: 'suv' },
      { id: 'eritiga-tour', name: 'Ertiga Tour & Dzire Tour', years: ['2020 - 2026'], variants: ['Fleet', 'Std'], silhouette: 'super-tourer' },
      { id: 'swift-dzire-old', name: 'Swift (2011 - 2017)', years: ['2011 - 2017'], variants: ['VXi', 'ZXi'], silhouette: 'coupe' },
      { id: 'omni-eeco', name: 'Omni (Legacy)', years: ['2005 - 2019'], variants: ['5-Seater', 'Cargo'], silhouette: 'suv' },
      { id: 'gypsy', name: 'Gypsy King', years: ['1995 - 2018'], variants: ['Hard Top', 'Soft Top'], silhouette: 'suv' },
    ]
  },
  {
    id: 'honda',
    name: 'Honda',
    country: 'Japan',
    models: [
      { id: 'city', name: 'City & City e:HEV', years: ['2023 - 2026', '2020 - 2022'], variants: ['ZX CVT', 'V MT'], silhouette: 'super-tourer' },
      { id: 'elevate', name: 'Elevate', years: ['2023 - 2026'], variants: ['ZX', 'V'], silhouette: 'suv' },
      { id: 'amaze', name: 'Amaze', years: ['2024 - 2026'], variants: ['ZX CVT', 'VX'], silhouette: 'super-tourer' },
      { id: 'wr-v', name: 'WR-V & Jazz (Legacy)', years: ['2017 - 2023'], variants: ['VX', 'S'], silhouette: 'coupe' },
      { id: 'civic-accord', name: 'Civic & Accord (Legacy)', years: ['2006 - 2022'], variants: ['ZX', 'VX'], silhouette: 'super-tourer' },
    ]
  },
  {
    id: 'kia',
    name: 'Kia',
    country: 'South Korea',
    models: [
      { id: 'seltos', name: 'Seltos', years: ['2023 - 2026'], variants: ['GTX+ Sunroof', 'HTX'], silhouette: 'suv' },
      { id: 'sonet', name: 'Sonet', years: ['2024 - 2026'], variants: ['GTX+', 'HTK+'], silhouette: 'suv' },
      { id: 'carens', name: 'Carens', years: ['2022 - 2026'], variants: ['Luxury Plus', 'Prestige'], silhouette: 'suv' },
      { id: 'ev9', name: 'EV9', years: ['2024 - 2026'], variants: ['GT-Line AWD'], silhouette: 'suv' },
    ]
  },
  {
    id: 'skoda',
    name: 'Skoda',
    country: 'Czech Republic',
    models: [
      { id: 'kushaq', name: 'Kushaq', years: ['2021 - 2026'], variants: ['Monte Carlo', 'Style'], silhouette: 'suv' },
      { id: 'slavia', name: 'Slavia', years: ['2022 - 2026'], variants: ['Style', 'Monte Carlo'], silhouette: 'super-tourer' },
      { id: 'kodiaq', name: 'Kodiaq', years: ['2022 - 2026'], variants: ['L&K', 'Sportline'], silhouette: 'suv' },
      { id: 'kylaq', name: 'Kylaq', years: ['2025 - 2026'], variants: ['Prestige', 'Signature+'], silhouette: 'suv' },
    ]
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen',
    country: 'Germany',
    models: [
      { id: 'taigun', name: 'Taigun', years: ['2021 - 2026'], variants: ['GT Line', 'Topline'], silhouette: 'suv' },
      { id: 'virtus', name: 'Virtus', years: ['2022 - 2026'], variants: ['GT Plus', 'Topline'], silhouette: 'super-tourer' },
      { id: 'tiguan', name: 'Tiguan', years: ['2021 - 2026'], variants: ['R-Line', 'Elegance'], silhouette: 'suv' },
      { id: 'polo-vento', name: 'Polo & Vento (Legacy)', years: ['2010 - 2022'], variants: ['GT TSI', 'Highline'], silhouette: 'coupe' },
    ]
  },
  {
    id: 'mg',
    name: 'MG Motor',
    country: 'UK / India',
    models: [
      { id: 'hector', name: 'Hector & Hector Plus', years: ['2019 - 2026'], variants: ['Sharp Pro', 'Smart'], silhouette: 'suv' },
      { id: 'astor', name: 'Astor', years: ['2021 - 2026'], variants: ['Savvy Pro', 'Sharp'], silhouette: 'suv' },
      { id: 'gloster', name: 'Gloster', years: ['2020 - 2026'], variants: ['Savvy 4x4', 'Sharp 2WD'], silhouette: 'suv' },
      { id: 'windsor', name: 'Windsor EV', years: ['2024 - 2026'], variants: ['Exclusive', 'Excite'], silhouette: 'suv' },
      { id: 'zs-ev', name: 'ZS EV', years: ['2022 - 2026'], variants: ['Exclusive Plus', 'Excite'], silhouette: 'suv' },
    ]
  },
  {
    id: 'renault',
    name: 'Renault',
    country: 'France',
    models: [
      { id: 'kiger', name: 'Kiger', years: ['2021 - 2026'], variants: ['RXZ Turbo', 'RXT'], silhouette: 'coupe' },
      { id: 'triber', name: 'Triber', years: ['2019 - 2026'], variants: ['RXZ', 'RXL'], silhouette: 'suv' },
      { id: 'kwid', name: 'Kwid', years: ['2019 - 2026'], variants: ['Climber', 'RXT'], silhouette: 'coupe' },
    ]
  },
  {
    id: 'nissan',
    name: 'Nissan',
    country: 'Japan',
    models: [
      { id: 'magnite', name: 'Magnite', years: ['2020 - 2026'], variants: ['Tekna+', 'XV'], silhouette: 'suv' },
      { id: 'x-trail', name: 'X-Trail', years: ['2024 - 2026'], variants: ['e-Power'], silhouette: 'suv' },
    ]
  },
  {
    id: 'jeep',
    name: 'Jeep',
    country: 'USA',
    models: [
      { id: 'compass', name: 'Compass', years: ['2021 - 2026'], variants: ['Model S 4x4', 'Sport'], silhouette: 'suv' },
      { id: 'meridian', name: 'Meridian', years: ['2022 - 2026'], variants: ['Limited (O) 4x4', 'Limited'], silhouette: 'suv' },
      { id: 'wrangler', name: 'Wrangler', years: ['2021 - 2026'], variants: ['Rubicon 4-Door', 'Unlimited'], silhouette: 'suv' },
      { id: 'grand-cherokee', name: 'Grand Cherokee', years: ['2022 - 2026'], variants: ['Summit Reserve', 'Limited'], silhouette: 'suv' },
    ]
  },
  {
    id: 'citroen',
    name: 'Citroën',
    country: 'France',
    models: [
      { id: 'c3', name: 'C3', years: ['2022 - 2026'], variants: ['Shine', 'Feel'], silhouette: 'coupe' },
      { id: 'c3-aircross', name: 'C3 Aircross', years: ['2023 - 2026'], variants: ['Max 5+2', 'You'], silhouette: 'suv' },
      { id: 'basalt', name: 'Basalt', years: ['2024 - 2026'], variants: ['Max Turbo', 'Plus'], silhouette: 'coupe' },
      { id: 'ec3', name: 'eC3', years: ['2023 - 2026'], variants: ['Shine', 'Live'], silhouette: 'coupe' },
    ]
  },
  {
    id: 'audi',
    name: 'Audi',
    country: 'Germany',
    models: [
      { id: 'a4', name: 'A4', years: ['2021 - 2026'], variants: ['Technology', 'Premium Plus'], silhouette: 'super-tourer' },
      { id: 'a6', name: 'A6', years: ['2020 - 2026'], variants: ['Technology', 'Premium Plus'], silhouette: 'super-tourer' },
      { id: 'q3', name: 'Q3 & Q3 Sportback', years: ['2022 - 2026'], variants: ['Technology', 'Premium'], silhouette: 'suv' },
      { id: 'q5', name: 'Q5', years: ['2021 - 2026'], variants: ['Technology', 'Premium Plus'], silhouette: 'suv' },
      { id: 'q7', name: 'Q7 & Q8', years: ['2022 - 2026'], variants: ['Technology', 'Premium Plus'], silhouette: 'suv' },
      { id: 'etron-gt', name: 'e-tron GT & RS e-tron GT', years: ['2021 - 2026'], variants: ['quattro'], silhouette: 'super-tourer' },
    ]
  },
  {
    id: 'volvo',
    name: 'Volvo',
    country: 'Sweden',
    models: [
      { id: 'xc40', name: 'XC40 Recharge', years: ['2022 - 2026'], variants: ['Ultimate', 'Core'], silhouette: 'suv' },
      { id: 'xc60', name: 'XC60', years: ['2021 - 2026'], variants: ['Ultimate B5', 'Plus'], silhouette: 'suv' },
      { id: 'xc90', name: 'XC90', years: ['2022 - 2026'], variants: ['Ultimate B6', 'Plus'], silhouette: 'suv' },
      { id: 'ex90', name: 'EX90', years: ['2025 - 2026'], variants: ['Twin Motor'], silhouette: 'suv' },
    ]
  },
  {
    id: 'lexus',
    name: 'Lexus',
    country: 'Japan',
    models: [
      { id: 'nx', name: 'NX 350h', years: ['2022 - 2026'], variants: ['Luxury', 'F-Sport'], silhouette: 'suv' },
      { id: 'rx', name: 'RX 350h', years: ['2023 - 2026'], variants: ['Luxury'], silhouette: 'suv' },
      { id: 'es', name: 'ES 300h', years: ['2021 - 2026'], variants: ['Luxury'], silhouette: 'super-tourer' },
      { id: 'lx', name: 'LX 500d', years: ['2022 - 2026'], variants: ['Urban', 'Overtrail'], silhouette: 'suv' },
    ]
  },
  {
    id: 'jaguar',
    name: 'Jaguar',
    country: 'UK',
    models: [
      { id: 'f-pace', name: 'F-Pace', years: ['2021 - 2026'], variants: ['R-Dynamic'], silhouette: 'suv' },
      { id: 'xf', name: 'XF', years: ['2018 - 2024'], variants: ['R-Dynamic'], silhouette: 'super-tourer' },
      { id: 'f-type', name: 'F-Type', years: ['2018 - 2024'], variants: ['R-Dynamic Coupe', 'Convertible'], silhouette: 'coupe' },
      { id: 'i-pace', name: 'I-Pace', years: ['2020 - 2024'], variants: ['HSE'], silhouette: 'suv' },
    ]
  },
  {
    id: 'mini',
    name: 'MINI',
    country: 'UK',
    models: [
      { id: 'cooper', name: 'Cooper S & Countryman', years: ['2021 - 2026'], variants: ['Cooper S 3-Door', 'Countryman'], silhouette: 'coupe' },
      { id: 'cooper-se', name: 'Cooper SE (Electric)', years: ['2022 - 2026'], variants: ['Classic'], silhouette: 'coupe' },
    ]
  },
  {
    id: 'isuzu',
    name: 'Isuzu',
    country: 'Japan',
    models: [
      { id: 'd-max', name: 'D-Max V-Cross', years: ['2019 - 2026'], variants: ['Z Prestige 4x4', 'High Lander'], silhouette: 'suv' },
      { id: 'mu-x', name: 'MU-X', years: ['2021 - 2026'], variants: ['4x4 AT', '4x2'], silhouette: 'suv' },
      { id: 'hi-lander', name: 'D-Max Hi-Lander', years: ['2021 - 2026'], variants: ['Std'], silhouette: 'suv' },
    ]
  },
  {
    id: 'force',
    name: 'Force Motors',
    country: 'India',
    models: [
      { id: 'gurkha', name: 'Gurkha 5-Door', years: ['2024 - 2026'], variants: ['Diesel 4x4', 'Std'], silhouette: 'suv' },
      { id: 'trax', name: 'Traveller & Trax', years: ['2018 - 2026'], variants: ['Std'], silhouette: 'suv' },
    ]
  },
  {
    id: 'byd',
    name: 'BYD',
    country: 'China',
    models: [
      { id: 'atto3', name: 'Atto 3', years: ['2022 - 2026'], variants: ['Superior', 'Dynamic'], silhouette: 'suv' },
      { id: 'seal', name: 'Seal', years: ['2024 - 2026'], variants: ['Performance AWD', 'Premium'], silhouette: 'super-tourer' },
      { id: 'emax7', name: 'eMAX 7', years: ['2024 - 2026'], variants: ['Superior 6S', 'Premium'], silhouette: 'suv' },
    ]
  },
  {
    id: 'tesla',
    name: 'Tesla',
    country: 'USA',
    models: [
      { id: 'tesla-3', name: 'Model 3 / Model Y', years: ['2025 - 2026'], variants: ['Long Range', 'RWD'], silhouette: 'super-tourer' },
    ]
  },
  {
    id: 'vinfast',
    name: 'VinFast',
    country: 'Vietnam',
    models: [
      { id: 'vf6-7', name: 'VF 6 / VF 7', years: ['2025 - 2026'], variants: ['Plus', 'Eco'], silhouette: 'suv' },
    ]
  },
  {
    id: 'rolls-royce',
    name: 'Rolls-Royce',
    country: 'UK',
    models: [
      { id: 'ghost-cullinan', name: 'Ghost & Cullinan', years: ['2020 - 2026'], variants: ['Ghost EWB', 'Cullinan Black Badge'], silhouette: 'super-tourer' },
    ]
  },
  {
    id: 'bentley',
    name: 'Bentley',
    country: 'UK',
    models: [
      { id: 'continental-bentayga', name: 'Continental GT & Bentayga', years: ['2019 - 2026'], variants: ['Continental GT', 'Bentayga'], silhouette: 'coupe' },
    ]
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    country: 'Italy',
    models: [
      { id: 'urus-huracan', name: 'Urus & Huracan', years: ['2019 - 2026'], variants: ['Urus S', 'Huracan EVO'], silhouette: 'hypercar' },
    ]
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    country: 'Italy',
    models: [
      { id: 'roma-296', name: 'Roma & 296 GTB', years: ['2020 - 2026'], variants: ['Roma', '296 GTB'], silhouette: 'hypercar' },
    ]
  },
  {
    id: 'maserati',
    name: 'Maserati',
    country: 'Italy',
    models: [
      { id: 'grecale-mc20', name: 'Grecale & MC20', years: ['2022 - 2026'], variants: ['Grecale', 'MC20'], silhouette: 'coupe' },
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
    image: '/images/reveal.jpg'
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

/**
 * Size-based pricing: each fabric has a base ("starting from") price that applies to the
 * compact tier. Larger bodies need more fabric, so the multiplier scales up.
 */
export type SizeTier = 'compact' | 'sedan' | 'suv' | 'large' | 'luxury' | 'ultra';

export const SIZE_TIERS: Record<SizeTier, { label: string; multiplier: number }> = {
  compact: { label: 'Hatchback / Compact', multiplier: 1 },
  sedan: { label: 'Sedan', multiplier: 1.1 },
  suv: { label: 'SUV / Crossover', multiplier: 1.2 },
  large: { label: 'Large SUV / MPV', multiplier: 1.4 },
  luxury: { label: 'Luxury', multiplier: 1.7 },
  ultra: { label: 'Ultra Luxury', multiplier: 2.2 },
};

const LUXURY_BRANDS = ['land-rover', 'mercedes-benz', 'bmw', 'porsche', 'audi', 'volvo', 'lexus', 'jaguar', 'mini', 'tesla'];
const ULTRA_BRANDS = ['aston-martin', 'rolls-royce', 'bentley', 'lamborghini', 'ferrari', 'maserati'];
const LARGE_MODEL_IDS = [
  'fortuner', 'innova-hycross', 'innova-crysta', 'land-cruiser', 'hilux', 'safari', 'scorpio-n', 'scorpio-classic',
  'xuv700', 'gloster', 'meridian', 'alcazar', 'kodiaq', 'invicto', 'vellfire', 'xl6', 'ertiga', 'carens', 'marazzo',
  'xuv500', 'd-max', 'mu-x', 'hi-lander', 'bolero-camper', 'gurkha', 'trax', 'thar-roxx', 'wrangler', 'grand-cherokee',
  'hector', 'harrier', 'sierra', 'victoris', 'emax7',
];

export function getSizeTier(brandId: string, model: CarModel): SizeTier {
  if (ULTRA_BRANDS.includes(brandId)) return 'ultra';
  if (LUXURY_BRANDS.includes(brandId)) return 'luxury';
  if (LARGE_MODEL_IDS.includes(model.id)) return 'large';
  if (model.silhouette === 'coupe') return 'compact';
  if (model.silhouette === 'super-tourer') return 'sedan';
  return 'suv';
}

/** Price in rupees, rounded to the "...99" style used across the site. */
export function priceForTier(basePrice: number, tier: SizeTier): number {
  return Math.round((basePrice * SIZE_TIERS[tier].multiplier) / 100) * 100 - 1;
}

/** Logo file (in /public/brands) for each brand id. */
export const BRAND_LOGOS: Record<string, string> = {
  'mahindra': 'mahindra', 'toyota': 'toyota', 'tata': 'tata', 'hyundai': 'hyundai', 'land-rover': 'land-rover',
  'mercedes-benz': 'mercedes-benz', 'bmw': 'bmw', 'porsche': 'porsche', 'aston-martin': 'aston-martin',
  'maruti-suzuki': 'suzuki', 'honda': 'honda', 'kia': 'kia', 'skoda': 'skoda', 'volkswagen': 'volkswagen', 'mg': 'mg',
  'renault': 'renault', 'nissan': 'nissan', 'jeep': 'jeep', 'citroen': 'citroen', 'audi': 'audi', 'volvo': 'volvo',
  'lexus': 'lexus', 'jaguar': 'jaguar', 'mini': 'mini', 'isuzu': 'isuzu', 'force': 'force-motors', 'byd': 'byd',
  'tesla': 'tesla', 'vinfast': 'vinfast', 'rolls-royce': 'rolls-royce', 'bentley': 'bentley',
  'lamborghini': 'lamborghini', 'ferrari': 'ferrari', 'maserati': 'maserati',
};

export const brandLogoSrc = (brandId: string): string | null =>
  BRAND_LOGOS[brandId] ? `/brands/${BRAND_LOGOS[brandId]}.png` : null;
