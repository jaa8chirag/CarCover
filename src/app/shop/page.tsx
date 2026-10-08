'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import MobileSlider from '@/components/MobileSlider';
import { FABRICS, type CoverGroup, type Fabric } from '@/data/fabrics';

const GROUPS: { id: CoverGroup; label: string; text: string }[] = [
  { id: 'outdoor', label: 'Outdoor Covers', text: 'Built for rain, sun and dust. For cars parked outside.' },
  { id: 'indoor', label: 'Indoor Covers', text: 'Soft, breathable covers for the garage or showroom.' },
  { id: 'unveiling', label: 'Unveiling Covers', text: 'Reveal-night covers for launches and handovers.' },
];

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
        <div className="bg-[#f3f1ed] pt-32 sm:pt-44 pb-24">
          <div className="container-am max-w-7xl">
            <span className="block text-[11px] font-bold tracking-[4px] uppercase text-[#b38848] mb-3">Shop Car Covers</span>
            <h1 className="uppercase text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.08 }}>
              Choose Your Cover
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">Pick the type of cover first. On the next page you tell us your car and we cut it to fit.</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-[11px] uppercase tracking-[3px] text-slate-400 mr-1">Jump to</span>
              {GROUPS.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="px-5 py-2.5 rounded-full border border-slate-300 hover:bg-black hover:text-white hover:border-black text-xs font-bold uppercase tracking-[2px] no-underline text-black transition-colors">
                  {g.label}
                </a>
              ))}
            </div>

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
