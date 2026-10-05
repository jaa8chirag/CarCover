'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutDrawer from '@/components/CheckoutDrawer';
import SwatchRequestModal from '@/components/SwatchRequestModal';
import { Droplets, SunMedium, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    id: 'monsoon',
    title: 'Monsoon Stormproof 10,000mm',
    subtitle: '100% Waterproof Deluge Armor',
    badge: 'MONSOON DEFENSE',
    price: '₹4,999',
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
    title: 'SolarReflect 48°C Heat Shield',
    subtitle: 'Titanium-Infused UV Solar Armor',
    badge: 'UV & HEAT DEFENSE',
    price: '₹4,499',
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
    title: 'CashmereVelvet Atelier Showroom Drape',
    subtitle: 'Ultra-Soft Scratch-Proof Sanctuary',
    badge: 'CONCOURS INDOOR',
    price: '₹5,499',
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
    price: '₹6,499',
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

export default function CollectionsPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSwatchOpen, setIsSwatchOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleOrderCollection = (col: typeof COLLECTIONS[0]) => {
    const newItem = {
      vehicle: 'Bespoke CAD Allocation',
      tier: col.title,
      fabricColor: 'Obsidian Midnight Black',
      fabricHex: '#0a0d10',
      pipingColor: 'Champagne Gold',
      pipingHex: '#cca462',
      monogram: 'SIGNATURE',
      monogramColor: 'gold',
      addons: { mirrorPockets: true, heavyDutyHoldall: true, lockingUnderbodyStraps: true },
      price: parseInt(col.price.replace(/[^\d]/g, '')),
      currency: '₹',
    };
    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onOpenEnquiry={() => setIsSwatchOpen(true)}
      />

      {/* Main Page Container with generous top clearance */}
      <main className="pt-36 sm:pt-44 pb-24">
        {/* Page Hero Section */}
        <section className="px-6 sm:px-12 mb-16">
          <div className="container-am max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest text-[#00665e] bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Shield size={14} /> FOUR SPECIALIZED CLIMATIC SANCTUARIES
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight mb-4 leading-tight">
              Bespoke Cover Collections
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              Every cover is individually 3D-CAD patterned to your vehicle's millimeter profile. Choose from our 4 specialized formulations engineered for India's extreme environments.
            </p>

            <button
              onClick={() => setIsSwatchOpen(true)}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-[#00665e] hover:text-[#00665e] text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              Order Complimentary Material Swatch Kit
            </button>
          </div>
        </section>

        {/* Collections 2x2 Grid with Real Photography & High-End Cards */}
        <section className="px-6 sm:px-12">
          <div className="container-am max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {COLLECTIONS.map((col) => {
                const IconComp = col.icon;
                return (
                  <motion.div
                    key={col.id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Visual Photography Window */}
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                        <img
                          src={col.image}
                          alt={col.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Elegant Dark Gradient Vignette for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 tracking-wider">
                            {col.badge}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#00665e] flex items-center justify-center shadow-md">
                            <IconComp size={20} />
                          </div>
                        </div>

                        {/* Title over image bottom */}
                        <div className="absolute bottom-4 left-5 right-5 text-white">
                          <span className="text-xs font-semibold text-emerald-300 block mb-0.5">
                            {col.subtitle}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                            {col.title}
                          </h3>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-7 sm:p-8">
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                          {col.description}
                        </p>

                        <div className="space-y-3 mb-6">
                          {col.specs.map((spec, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-medium">
                              <CheckCircle2 size={16} className="text-[#00665e] mt-0.5 flex-shrink-0" />
                              <span className="leading-snug">{spec}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                            Engineered For
                          </span>
                          <p className="text-xs font-medium text-slate-800 leading-relaxed">
                            {col.idealFor}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-6 sm:p-8 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                      <div>
                        <span className="text-[11px] text-slate-400 block uppercase font-medium">
                          Starting from
                        </span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                          {col.price}
                        </span>
                      </div>

                      <button
                        onClick={() => handleOrderCollection(col)}
                        className="px-6 py-3.5 rounded-full bg-[#00665e] hover:bg-[#004e48] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
                      >
                        <span>Reserve Commission</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={(idx) => setCartItems(cartItems.filter((_, i) => i !== idx))}
        currencySymbol="₹"
      />

      <SwatchRequestModal
        isOpen={isSwatchOpen}
        onClose={() => setIsSwatchOpen(false)}
      />
    </div>
  );
}
