'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Truck, ShieldCheck, RefreshCcw, BadgeCheck, Star, ChevronDown, Quote } from 'lucide-react';
import PageShell from '@/components/PageShell';
import { btnGlass, btnPrimary } from '@/components/PageHero';
import CoverStudio from '@/components/CoverStudio';
import { FABRICS } from '@/data/fabrics';
import { CAR_BRANDS, TESTIMONIALS, FAQS } from '@/data/carData';

const TRUST = [
  { icon: Truck, title: 'Free Delivery', text: 'Pan-India, insured shipping' },
  { icon: ShieldCheck, title: '100% Fit Guarantee', text: 'Remade free if it does not fit' },
  { icon: RefreshCcw, title: '7-Day Returns', text: 'Unused covers, no questions' },
  { icon: BadgeCheck, title: '3–5 Year Warranty', text: 'On fabric and stitching' },
];

export default function CollectionsPage() {
  const [fabricId, setFabricId] = useState<string | null>(null);
  const modelCount = CAR_BRANDS.reduce((n, b) => n + b.models.length, 0);

  const chooseFabric = (id: string) => {
    setFabricId(id);
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageShell>
      {({ openEnquiry, addToCart }) => (
        <>
          {/* Shop header: starts straight in the store, no banner */}
          <section className="relative bg-gradient-to-b from-[#e6f0ee] to-[#f4f7f6] pt-28 sm:pt-36 pb-8 overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#cca462]/20 blur-3xl" />
            <div className="pointer-events-none absolute -top-10 -left-24 w-80 h-80 rounded-full bg-[#00665e]/15 blur-3xl" />
            <div className="container-am max-w-7xl relative">
              <nav className="text-xs text-slate-400 mb-3">
                <a href="/" className="hover:text-[#00665e] no-underline">Home</a> <span className="mx-1.5">/</span>
                <span className="text-slate-600 font-semibold">Shop Covers</span>
              </nav>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-slate-950 uppercase" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(26px, 3.6vw, 44px)', lineHeight: 1.1 }}>
                    Shop Bespoke Car Covers
                  </h1>
                  <p className="mt-2 text-sm sm:text-base text-slate-600">
                    {modelCount}+ Indian car models · 4 fabrics · Custom colours &amp; monogram · Free delivery
                  </p>
                </div>
                <div className="flex gap-2">
                  <a href="#studio" className="px-5 py-3 rounded-full bg-slate-950 hover:bg-[#00665e] text-white text-xs font-bold uppercase tracking-[1.5px] no-underline transition-colors">Build My Cover</a>
                  <a href="#fabrics" className="px-5 py-3 rounded-full bg-white border border-slate-300 hover:border-slate-950 text-slate-900 text-xs font-bold uppercase tracking-[1.5px] no-underline transition-colors">Browse Fabrics</a>
                </div>
              </div>
            </div>
          </section>

          <CoverStudio fabricId={fabricId} onFabricChange={setFabricId} onAddToCart={addToCart} />

          {/* Trust strip */}
          <section className="bg-white border-y border-slate-200">
            <div className="container-am max-w-7xl py-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
              {TRUST.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl bg-[#00665e]/10 text-[#00665e] flex items-center justify-center flex-shrink-0">
                    <Icon size={20} />
                  </span>
                  <div>
                    <span className="block text-sm font-bold text-slate-900 leading-tight">{title}</span>
                    <span className="block text-xs text-slate-500">{text}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shop by fabric */}
          <section id="fabrics" className="py-16 sm:py-24 bg-white border-t border-slate-200">
            <div className="container-am max-w-7xl">
              <div className="text-center mb-12">
                <span className="am-kicker">SHOP BY FABRIC</span>
                <h2 className="uppercase text-slate-950" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(24px, 3.4vw, 42px)' }}>
                  Four Fabrics. Every Climate.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {FABRICS.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.article
                      key={f.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="group rounded-3xl border border-slate-200 bg-white overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={f.image} alt={f.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                        <span className="absolute top-4 left-4 text-[10px] font-bold tracking-[2px] px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white border border-white/20">
                          {f.badge}
                        </span>
                        {f.bestseller && (
                          <span className="absolute top-4 right-4 text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full bg-gradient-to-r from-[#cca462] to-[#b38848] text-slate-950 shadow-lg">
                            BESTSELLER
                          </span>
                        )}
                        <span className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg" style={{ color: f.accentColor }}>
                          <Icon size={19} />
                        </span>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: f.accentColor }}>{f.subtitle}</span>
                        <h3 className="font-bold text-slate-950 mt-1.5 leading-snug">{f.title}</h3>
                        {f.rating && (
                          <p className="mt-2 flex items-center gap-1 text-xs text-slate-600">
                            <Star size={13} className="fill-amber-400 text-amber-400" />
                            <strong className="text-slate-900">{f.rating}</strong>
                            <span className="text-slate-400">({f.reviewCount?.toLocaleString('en-IN')})</span>
                          </p>
                        )}
                        <ul className="mt-4 space-y-2 flex-1">
                          {f.specs.slice(0, 3).map((s) => (
                            <li key={s} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                              <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: f.accentColor }} />
                              {s}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider text-slate-400">From</span>
                            <span className="text-2xl font-semibold text-slate-950" style={{ fontFamily: 'var(--font-hype)' }}>
                              ₹{f.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <button
                            onClick={() => chooseFabric(f.id)}
                            className="px-5 py-3 rounded-full text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md hover:-translate-y-0.5 transition-transform"
                            style={{ background: f.accentColor }}
                          >
                            Select <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="py-16 sm:py-24 bg-gradient-to-b from-[#f4f7f6] to-white">
            <div className="container-am max-w-7xl">
              <div className="text-center mb-12">
                <span className="am-kicker">LOVED ACROSS INDIA</span>
                <h2 className="uppercase text-slate-950" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(24px, 3.4vw, 42px)' }}>
                  Verified Owner Reviews
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, i) => (
                  <motion.figure
                    key={t.author}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow"
                  >
                    <Quote size={28} className="text-[#cca462]/60 mb-4" />
                    <div className="flex gap-0.5 mb-3">
                      {[0, 1, 2, 3, 4].map((n) => (
                        <Star key={n} size={15} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <blockquote className="text-sm text-slate-700 leading-relaxed">{t.quote}</blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00665e] to-[#0b2a27] text-white font-bold flex items-center justify-center">
                        {t.author[0]}
                      </span>
                      <div className="min-w-0">
                        <span className="block text-sm font-bold text-slate-900">{t.author}</span>
                        <span className="block text-xs text-slate-500 truncate">{t.car} · {t.location}</span>
                      </div>
                      {t.verified && <BadgeCheck size={18} className="ml-auto text-[#00665e] flex-shrink-0" />}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
            <div className="container-am max-w-3xl">
              <div className="text-center mb-10">
                <span className="am-kicker">BEFORE YOU BUY</span>
                <h2 className="uppercase text-slate-950" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(24px, 3.4vw, 42px)' }}>
                  Frequently Asked
                </h2>
              </div>
              <div className="space-y-3">
                {FAQS.map((f) => (
                  <details key={f.q} className="group rounded-2xl border border-slate-200 bg-[#f8fafc] open:bg-white open:shadow-lg transition-all">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 font-semibold text-slate-900">
                      {f.q}
                      <ChevronDown size={20} className="flex-shrink-0 text-[#00665e] transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="px-5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="relative bg-[#050808] text-white py-16 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(204,164,98,0.18),transparent_60%)]" />
            <div className="container-am max-w-3xl relative text-center">
              <span className="am-kicker">CAN&apos;T FIND YOUR CAR?</span>
              <h2 className="uppercase" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(22px, 3vw, 36px)' }}>
                We Pattern Any Vehicle
              </h2>
              <p className="mt-4 text-white/70 font-light">
                Modified, imported or rare? Tell us the model and we will create a one-off CAD pattern. Or request swatches to feel the fabrics first.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="/contact" className={btnPrimary + ' no-underline'}>Request Custom Fit</a>
                <button onClick={openEnquiry} className={btnGlass}>Order Swatch Kit</button>
              </div>
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
