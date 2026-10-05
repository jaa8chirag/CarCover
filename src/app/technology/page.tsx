'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutDrawer from '@/components/CheckoutDrawer';
import SwatchRequestModal from '@/components/SwatchRequestModal';
import { Layers, Droplets, Sun, Wind, Sparkles, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LAYERS = [
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

export default function TechnologyPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSwatchOpen, setIsSwatchOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

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
              <Layers size={14} /> TEXTILE NANOTECHNOLOGY & ENGINEERING
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight mb-4 leading-tight">
              Multi-Layer Fabric Anatomy
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              A bespoke cover is not just fabric—it is an aerospace-engineered climatic barrier designed to shield rare automotive paintwork against heat, torrential rain, and micro-scratches.
            </p>

            <button
              onClick={() => setIsSwatchOpen(true)}
              className="px-6 py-3.5 rounded-full bg-[#00665e] hover:bg-[#004e48] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              Order Complimentary Material Swatch Kit
            </button>
          </div>
        </section>

        {/* 4 Layers Grid: High-End Visual Cards */}
        <section className="px-6 sm:px-12">
          <div className="container-am max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {LAYERS.map((layer) => {
                const IconComp = layer.icon;
                return (
                  <motion.div
                    key={layer.number}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#00665e] flex items-center justify-center">
                            <IconComp size={24} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 block">
                              {layer.badge}
                            </span>
                            <h3 className="text-xl font-bold text-slate-900">
                              {layer.title}
                            </h3>
                          </div>
                        </div>

                        <span className="text-3xl font-extrabold font-mono text-slate-200">
                          {layer.number}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-[#00665e] mb-3">
                        {layer.subtitle}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                        {layer.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {layer.bullets.map((b, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-medium">
                            <CheckCircle2 size={16} className="text-[#00665e] mt-0.5 flex-shrink-0" />
                            <span className="leading-snug">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Performance Pill */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-2 w-full flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase text-slate-500 font-semibold">
                          Lab Certified Rating:
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#00665e]">
                          {layer.rating}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Lab Certification Banner */}
            <div className="mt-16 bg-gradient-to-r from-[#00665e] to-[#04433e] rounded-3xl p-10 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-200 block mb-2">
                  LABORATORY VALIDATED
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  Concours Paint-Safe Certification
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                  Every batch of our 4-ply composite textile is tested under 5,000 continuous hours of simulated salt spray, ultraviolet arc lamps, and abrasion shear testers to guarantee zero degradation.
                </p>
              </div>

              <button
                onClick={() => setIsSwatchOpen(true)}
                className="px-8 py-3.5 rounded-full bg-white text-[#00665e] text-xs font-bold uppercase tracking-wider hover:bg-emerald-50 transition-colors flex-shrink-0 cursor-pointer shadow-md"
              >
                Request Free Sample Kit
              </button>
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
