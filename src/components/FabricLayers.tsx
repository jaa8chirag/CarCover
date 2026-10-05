'use client';

import React from 'react';
import { Droplets, Sun, Wind, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { btnPrimary } from '@/components/PageHero';

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

export default function FabricLayers({ onOpenEnquiry }: { onOpenEnquiry: () => void }) {
  const openEnquiry = onOpenEnquiry;
  return (
    <>
          <section id="technology" className="py-20 sm:py-28 bg-[#f8fafc]">
            <div className="container-am max-w-5xl">
              <div className="text-center mb-14 sm:mb-20">
                <span className="am-kicker">FROM WEATHER TO PAINT</span>
                <h2 className="uppercase text-slate-950" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(24px, 3.4vw, 42px)' }}>
                  Four Layers. One Shield.
                </h2>
              </div>

              <div className="relative">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />

                <div className="space-y-10 md:space-y-16">
                  {LAYERS.map((layer, i) => {
                    const Icon = layer.icon;
                    const right = i % 2 === 1;
                    return (
                      <motion.div
                        key={layer.number}
                        initial={{ opacity: 0, x: right ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative md:w-[calc(50%-40px)] ${right ? 'md:ml-auto' : ''}`}
                      >
                        <div
                          className={`hidden md:flex absolute top-10 w-12 h-12 rounded-full items-center justify-center text-white shadow-lg ring-8 ring-[#f8fafc] ${right ? '-left-[64px]' : '-right-[64px]'}`}
                          style={{ background: layer.color }}
                        >
                          <Icon size={22} />
                        </div>

                        <div className="relative bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 shadow-sm hover:shadow-2xl transition-shadow overflow-hidden">
                          <span
                            className="absolute -top-3 right-5 text-[110px] leading-none font-semibold select-none"
                            style={{ fontFamily: 'var(--font-hype)', color: layer.color, opacity: 0.07 }}
                          >
                            {layer.number}
                          </span>
                          <div className="relative">
                            <span className="text-[10px] font-bold tracking-[3px] uppercase" style={{ color: layer.color }}>
                              {layer.badge}
                            </span>
                            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-slate-950">{layer.title}</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">{layer.subtitle}</p>
                            <p className="mt-4 text-sm text-slate-600 leading-relaxed">{layer.description}</p>
                            <ul className="mt-5 space-y-2.5">
                              {layer.bullets.map((b) => (
                                <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700">
                                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: layer.color }} />
                                  {b}
                                </li>
                              ))}
                            </ul>
                            <div
                              className="mt-6 rounded-2xl px-4 py-3 flex items-center justify-between gap-3"
                              style={{ background: `${layer.color}12`, border: `1px solid ${layer.color}30` }}
                            >
                              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Lab Rating</span>
                              <span className="text-sm font-bold text-right" style={{ color: layer.color }}>{layer.rating}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="relative bg-[#050808] text-white py-20 sm:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,102,94,0.4),transparent_60%)]" />
            <div className="container-am max-w-4xl relative text-center">
              <ShieldCheck size={36} className="mx-auto text-[#cca462] mb-4" />
              <span className="am-kicker">LABORATORY VALIDATED</span>
              <h2 className="uppercase" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(24px, 3.6vw, 44px)' }}>
                Concours Paint-Safe Certification
              </h2>
              <p className="mt-4 text-white/70 font-light leading-relaxed">
                Every batch is tested under 5,000 continuous hours of simulated salt spray, ultraviolet arc lamps and abrasion shear testers to guarantee zero degradation.
              </p>
              <button onClick={openEnquiry} className={btnPrimary + ' mt-8'}>Request Free Sample Kit</button>
            </div>
          </section>
    </>
  );
}
