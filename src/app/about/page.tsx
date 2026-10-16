'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Shield, Sparkles, CheckCircle2, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';
import SlideHero from '@/components/SlideHero';

const PILLARS = [
  {
    title: 'Laser-CAD Precision',
    subtitle: 'Millimeter-Accurate Digital Patterns',
    image: '/images/about_pattern.jpg',
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
    image: '/images/about_craft.jpg',
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
  return (
    <PageShell>
      {({ openEnquiry }) => (
        <>
          <SlideHero kicker="About Us" title="Preserving Automotive Artistry" />

          <section className="bg-white">
            <div className="container-am max-w-6xl py-10 sm:py-14 text-center">
              <p className="mx-auto max-w-3xl text-slate-700 leading-[1.9] text-[15px] sm:text-base">
                TheSignaturecovers was founded on a singular conviction: extraordinary motor cars deserve protection engineered with the same obsessive precision as the cars themselves.
              </p>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: '800+', label: 'CAD Blueprints' },
                  { value: '100%', label: 'Hand Finished' },
                  { value: '48°C', label: 'Heat Tested' },
                  { value: 'Pan-India', label: 'Free Delivery' },
                ].map((st) => (
                  <div key={st.label}>
                    <div className="text-2xl sm:text-3xl font-semibold text-black" style={{ fontFamily: 'var(--font-hype)' }}>{st.value}</div>
                    <div className="mt-1 text-[10px] sm:text-[11px] tracking-[2px] uppercase text-slate-500">{st.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <button onClick={openEnquiry} className="px-8 py-4 bg-black hover:bg-[#b38848] text-white text-sm font-medium transition-colors cursor-pointer">Request Consultation</button>
                <Link href="/shop" className="px-8 py-4 border border-black hover:bg-black hover:text-white text-black text-sm font-medium no-underline transition-colors">Shop Car Covers</Link>
              </div>
            </div>
          </section>

          <section className="py-20 sm:py-28 bg-[#f8fafc]">
            <div className="container-am max-w-6xl space-y-16 sm:space-y-28">
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                const flip = i % 2 === 1;
                return (
                  <motion.article
                    key={p.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                  >
                    <div className={`relative group ${flip ? 'lg:order-2' : ''}`}>
                      <div className="absolute -inset-3 rounded-[2rem] bg-[#00665e] opacity-15 blur-2xl group-hover:opacity-30 transition-opacity" />
                      <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden shadow-2xl">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <span className="absolute top-5 left-5 text-[10px] font-bold tracking-[2px] px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white border border-white/20">
                          {p.badge}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#00665e]/10 text-[#00665e] flex items-center justify-center mb-5">
                        <Icon size={24} />
                      </div>
                      <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#b38848]">
                        {String(i + 1).padStart(2, '0')} — {p.subtitle}
                      </span>
                      <h2 className="mt-3 text-slate-950 uppercase" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.15 }}>
                        {p.title}
                      </h2>
                      <p className="mt-5 text-slate-600 leading-relaxed">{p.description}</p>
                      <ul className="mt-6 space-y-3">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-3 text-sm text-slate-700">
                            <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-[#00665e]" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>

          <div className="relative w-full h-[56vh] sm:h-[68vh] min-h-[320px] overflow-hidden bg-black">
            <img src="/images/about_workshop.jpg" alt="A bespoke cover being made ready in the workshop" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 60%' }} />
          </div>

          <section className="relative bg-[#050808] text-white py-20 sm:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(204,164,98,0.2),transparent_60%)]" />
            <div className="container-am max-w-3xl relative text-center">
              <Quote size={34} className="mx-auto text-[#cca462] mb-5" />
              <span className="am-kicker">THE ATELIER PROMISE</span>
              <h2 className="uppercase" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(24px, 3.6vw, 44px)' }}>
                100% Fit &amp; Preservation Guarantee
              </h2>
              <p className="mt-5 text-white/70 font-light leading-relaxed">
                If your commission does not seat perfectly over your vehicle&apos;s mirrors, antenna and bumpers, our master tailors will alter or remanufacture it at no charge. Guaranteed.
              </p>
              <button onClick={openEnquiry} className="mt-8 px-8 py-4 bg-black hover:bg-[#b38848] text-white text-sm font-medium transition-colors cursor-pointer">Request Consultation</button>
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
