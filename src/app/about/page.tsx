'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutDrawer from '@/components/CheckoutDrawer';
import SwatchRequestModal from '@/components/SwatchRequestModal';
import { Award, Compass, Shield, Users, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    title: 'Laser-CAD Precision',
    subtitle: 'Millimeter-Accurate Digital Patterns',
    image: '/images/slider_dbx707.jpg',
    icon: Compass,
    badge: '800+ CAD BLUEPRINTS',
    description: 'Over 800+ 3D-laser scanned chassis patterns ensure every mirror pocket, antenna contour, and rear spoiler profile fits with zero billowing or fabric stress.',
    points: [
      'Tailored mirror ear contouring without excess sag',
      'Accommodates shark-fin antennas and tow hooks',
      'Laser-cut fabric panels with zero fraying seams',
    ],
  },
  {
    title: 'Indian Climate Defense',
    subtitle: 'Tested Against Subcontinent Extremes',
    image: '/images/cover_hero.jpg',
    icon: Shield,
    badge: 'ALL-WEATHER ARCHITECTURE',
    description: 'Our textiles are tested against the harshest Indian conditions: 10,000mm coastal cloudbursts in Mumbai and 48°C thermal solar radiation in Rajasthan.',
    points: [
      '10,000mm waterproof hydrostatic head rating',
      'Dual-layer micro-fleece scratch-free underside',
      'Underbody dual storm straps for gale wind resistance',
    ],
  },
  {
    title: 'Concours Atelier Standards',
    subtitle: 'Hand-Finished Artisan Tailoring',
    image: '/images/craftsmanship.jpg',
    icon: Sparkles,
    badge: 'HANDCRAFTED HERITAGE',
    description: 'Each bespoke commission undergoes hand-finished blind-stitching, individual serial number stamping, and is certified safe for freshly applied ceramic coatings.',
    points: [
      'Individually inspected by master craftsmen',
      'Laser-embroidered monogramming & contrast piping',
      'Complimentary heavy-duty storage duffle bag included',
    ],
  },
];

export default function AboutPage() {
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
              <Award size={14} /> CRAFTSMANSHIP & BESPOKE HERITAGE
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight mb-4 leading-tight">
              Preserving Automotive Artistry
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              TheSignaturecovers was founded on a singular conviction: extraordinary motor cars deserve protection engineered with the same level of obsessive precision as the vehicles themselves.
            </p>
          </div>
        </section>

        {/* 3 Rich Visual Pillar Cards */}
        <section className="px-6 sm:px-12">
          <div className="container-am max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {PILLARS.map((pillar, idx) => {
                const IconComp = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Visual Header Image */}
                      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                        <img
                          src={pillar.image}
                          alt={pillar.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        <div className="absolute top-4 left-4">
                          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 tracking-wider">
                            {pillar.badge}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                          <h3 className="text-lg font-bold">
                            {pillar.title}
                          </h3>
                          <div className="w-8 h-8 rounded-full bg-white/90 text-[#00665e] flex items-center justify-center shadow-md">
                            <IconComp size={16} />
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <p className="text-xs font-semibold text-[#00665e] mb-3">
                          {pillar.subtitle}
                        </p>
                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-6 font-normal">
                          {pillar.description}
                        </p>

                        <div className="space-y-2.5">
                          {pillar.points.map((pt, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                              <CheckCircle2 size={15} className="text-[#00665e] mt-0.5 flex-shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="pt-4 border-t border-slate-100 text-[11px] font-mono text-[#00665e] font-bold tracking-wider uppercase">
                        &bull; Certified Bespoke Standard
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Atelier Commitment Card (Spacious, Beautiful & Fixed Alignment) */}
            <div className="bg-gradient-to-r from-[#00665e] to-[#04433e] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-200 block mb-2">
                  THE ATELIER PROMISE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
                  100% Fit & Preservation Guarantee
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                  If your bespoke commission does not seat perfectly over your vehicle’s mirrors, antenna, and bumpers, our master tailors will alter or remanufacture it at no charge. Guaranteed.
                </p>
              </div>

              <button
                onClick={() => setIsSwatchOpen(true)}
                className="px-8 py-3.5 rounded-full bg-white text-[#00665e] hover:bg-emerald-50 text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 cursor-pointer shadow-md"
              >
                Request Consultation
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
