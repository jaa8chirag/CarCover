'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import MobileSlider from '@/components/MobileSlider';
import { FABRICS, type CoverGroup, type Fabric } from '@/data/fabrics';

const GROUPS: { id: CoverGroup; label: string; text: string }[] = [
  { id: 'outdoor', label: 'Outdoor Covers', text: 'Built for rain, sun and dust. For cars parked outside.' },
  { id: 'indoor', label: 'Indoor Covers', text: 'Soft, breathable covers for the garage or showroom.' },
  { id: 'unveiling', label: 'Unveiling Covers', text: 'Reveal-night covers for launches and handovers.' },
];

const BANNER = [
  '/images/rr_cullinan_cover.jpg', '/images/ferrari_red_cover.jpg', '/images/bentley_street.jpg',
  '/images/unveil_gold_curtains.jpg', '/images/porsche_speedster.jpg',
];

/** Full-width photo banner that cross-fades slowly. */
function Banner() {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(-1);
  useEffect(() => {
    const t = setInterval(() => setI((v) => { setPrev(v); return (v + 1) % BANNER.length; }), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-full h-[56vh] sm:h-[68vh] min-h-[320px] overflow-hidden bg-black">
      {BANNER.map((src, k) => (
        <img
          key={src}
          src={src}
          alt="Bespoke car cover"
          className={`absolute inset-0 w-full h-full object-cover ${k === i ? 'z-10 opacity-100' : k === prev ? 'z-0 opacity-100' : 'z-0 opacity-0'}`}
          style={{ transform: k === i ? 'scale(1.06)' : 'scale(1)', transition: 'opacity 1600ms ease-in-out, transform 7000ms ease-out' }}
        />
      ))}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute z-30 bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {BANNER.map((_, k) => (
          <button key={k} aria-label={`Photo ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full cursor-pointer transition-all duration-500 ${k === i ? 'w-7 bg-white' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}

function RangeCard({ f }: { f: Fabric }) {
  return (
    <Link
      href={`/shop/${f.id}`}
      className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden no-underline text-inherit border border-slate-200 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        <img src={f.image} alt={f.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
        {f.bestseller && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-[#cca462] to-[#f6e3b4] text-black text-[10px] font-bold tracking-[2px] px-4 py-2 rounded-full shadow-lg">BESTSELLER</span>
        )}
      </div>
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-[2px] text-slate-400">Starting from</span>
        <span className="text-2xl font-semibold text-black" style={{ fontFamily: 'var(--font-hype)' }}>₹{f.price.toLocaleString('en-IN')}</span>
        <h3 className="mt-3 uppercase font-bold tracking-wide text-black leading-snug">{f.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{f.subtitle}</p>
        <ul className="mt-4 space-y-2 flex-1">
          {f.specs.slice(0, 3).map((s) => (
            <li key={s} className="flex items-start gap-2.5 text-[13px] text-slate-700 leading-snug">
              <span className="mt-0.5 w-4 h-4 rounded-full bg-[#b38848]/15 flex items-center justify-center flex-shrink-0"><Check size={10} className="text-[#b38848]" /></span>
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-black group-hover:bg-[#b38848] text-white text-xs font-bold uppercase tracking-[2px] transition-colors">
          Choose this cover <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export default function ShopPage() {
  return (
    <PageShell>
      {() => (
        <div className="bg-[#f3f1ed]">
          {/* INTRO */}
          <div className="bg-white pt-32 sm:pt-40 pb-14 sm:pb-20">
            <div className="container-am max-w-4xl text-center">
              <span className="block text-[11px] sm:text-xs tracking-[6px] uppercase text-slate-400 mb-5">Unparalleled Protection</span>
              <h1 className="text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 400, fontSize: 'clamp(32px, 4.6vw, 58px)', lineHeight: 1.1 }}>
                Car Covers
              </h1>
              <p className="mt-7 text-slate-700 leading-[1.9] text-[15px] sm:text-base">
                Every Signature Covers cover is tailor-made to fit your car&apos;s exact make, model and year. Our range includes soft indoor covers for dust protection, UV-protective outdoor covers, and fully waterproof, breathable options for all-weather defence. We also make unveiling covers for launch events, with a choice of colours, materials and customisation, so every cover gives the perfect blend of protection and style.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                {GROUPS.map((g) => (
                  <a key={g.id} href={`#${g.id}`} className="inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-black hover:bg-[#b38848] text-white text-sm font-medium no-underline transition-colors">
                    {g.label} <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <Banner />

          <div className="container-am max-w-7xl pt-4 pb-24">
            {GROUPS.map((g) => (
              <section key={g.id} id={g.id} className="mt-16 sm:mt-20 scroll-mt-28">
                <div className="mb-8">
                  <h2 className="uppercase text-black font-semibold" style={{ fontFamily: 'var(--font-hype)', fontSize: 'clamp(22px, 2.6vw, 34px)' }}>{g.label}</h2>
                  <p className="mt-2 text-slate-600">{g.text}</p>
                </div>
                <MobileSlider desktopClass={`md:grid md:gap-8 ${g.id === 'indoor' ? 'md:grid-cols-2 max-w-4xl' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
                  {FABRICS.filter((f) => f.group === g.id).map((f) => (
                    <RangeCard key={f.id} f={f} />
                  ))}
                </MobileSlider>
              </section>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}
