'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import MobileSlider from '@/components/MobileSlider';
import { FABRICS, type CoverGroup, type Fabric } from '@/data/fabrics';

const GROUPS: { id: CoverGroup | 'custom'; label: string; text: string; kicker: string; band: string; theme: 'light' | 'dark'; image: string }[] = [
  { id: 'outdoor', label: 'Outdoor Covers', text: 'Built for rain, sun and dust. For cars parked outside.', kicker: 'For the open road', band: 'bg-white', theme: 'light', image: '/images/outdoor.jpg' },
  { id: 'indoor', label: 'Indoor Covers', text: 'Soft, breathable covers for the garage or showroom.', kicker: 'For the garage', band: 'bg-[#eceef1]', theme: 'light', image: '/images/cover_velvet.jpg' },
  { id: 'unveiling', label: 'Unveiling Covers', text: 'Reveal-night covers for launches and handovers.', kicker: 'For the big reveal', band: 'bg-[#ece3d2]', theme: 'light', image: '/images/unveil_gold_curtains.jpg' },
  { id: 'custom', label: 'Custom Covers', text: 'Printed, monogrammed or branded. Made for one car only.', kicker: 'Made for one car', band: 'bg-white', theme: 'light', image: '/images/reveal.jpg' },
];

/** Full-width photo banner. */
function Banner() {
  return (
    <div className="relative w-full h-[56vh] sm:h-[68vh] min-h-[320px] overflow-hidden bg-black">
      <img src="/images/bentley_street.jpg" alt="Bentley under a bespoke cover" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 58%' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
    </div>
  );
}

const CUSTOM = [
  { id: 'custom-printed', title: 'Custom Printed Cover', text: 'Your artwork, livery or branding printed edge to edge on premium stretch fabric.', image: '/images/cover_install_2.jpg', points: ['Any artwork, logo or livery', 'Sharp, fade-resistant printing', 'Cut to your exact car'] },
  { id: 'custom-monogram', title: 'Monogram & Piping Cover', text: 'Contrast piping, an embroidered monogram and your choice of colours on any of our fabrics.', image: '/images/cover_install_3.jpg', points: ['Embroidered monogram or crest', 'Contrast piping in any colour', 'Works on every fabric we make'] },
];

function CustomCard({ c }: { c: (typeof CUSTOM)[number] }) {
  return (
    <Link
      href="/contact"
      className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden no-underline text-inherit border border-slate-200 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
      </div>
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-[2px] text-slate-400">Starting from</span>
        <span className="text-2xl font-semibold text-black" style={{ fontFamily: 'var(--font-hype)' }}>Price on application</span>
        <h3 className="mt-3 uppercase font-bold tracking-wide text-black leading-snug">{c.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{c.text}</p>
        <ul className="mt-4 space-y-2 flex-1">
          {c.points.map((x) => (
            <li key={x} className="flex items-start gap-2.5 text-[13px] text-slate-700 leading-snug">
              <span className="mt-0.5 w-4 h-4 rounded-full bg-[#b38848]/15 flex items-center justify-center flex-shrink-0"><Check size={10} className="text-[#b38848]" /></span>
              {x}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-black group-hover:bg-[#b38848] text-white text-xs font-bold uppercase tracking-[2px] transition-colors">
          Enquire now <ArrowRight size={14} />
        </span>
      </div>
    </Link>
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
            <div className="container-am max-w-5xl text-center">
              <span className="block text-[11px] sm:text-xs tracking-[6px] uppercase text-slate-400 mb-5">Unparalleled Protection</span>
              <h1 className="text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 400, fontSize: 'clamp(32px, 4.6vw, 58px)', lineHeight: 1.1 }}>
                Car Covers
              </h1>
              <p className="mt-7 text-slate-700 leading-[1.9] text-[15px] sm:text-base">
                Every Signature Covers cover is tailor-made to fit your car&apos;s exact make, model and year. Our range includes soft indoor covers for dust protection, UV-protective outdoor covers, and fully waterproof, breathable options for all-weather defence. We also make unveiling covers for launch events, with a choice of colours, materials and customisation, so every cover gives the perfect blend of protection and style.
              </p>
              <div className="mt-9 grid grid-cols-2 sm:flex sm:flex-nowrap items-stretch justify-center gap-3 sm:gap-4">
                {GROUPS.map((g) => (
                  <a key={g.id} href={`#${g.id}`} className="inline-flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-4 bg-black hover:bg-[#b38848] text-white text-[13px] sm:text-sm font-medium no-underline transition-colors whitespace-nowrap">
                    {g.label} <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <Banner />

          {GROUPS.map((g, gi) => {
            const dark = g.theme === 'dark';
            return (
              <section
                key={g.id}
                id={g.id}
                className={`relative scroll-mt-20 pt-16 sm:pt-24 pb-20 sm:pb-28 ${g.band} ${gi > 0 ? 'rounded-t-[3rem] -mt-10 sm:-mt-12 shadow-[0_-30px_70px_-30px_rgba(0,0,0,0.45)]' : ''}`}
                style={{ zIndex: gi + 1 }}
              >
                {dark && <div aria-hidden className="pointer-events-none absolute -top-20 right-0 w-[420px] h-[420px] rounded-full bg-[#cca462]/15 blur-[110px]" />}
                <div className="container-am max-w-7xl relative">
                  {/* section header: photo band with the title on it */}
                  <div className="relative overflow-hidden rounded-[2rem] aspect-video mb-10 sm:mb-14 bg-black">
                    <img src={g.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
                    <div className="absolute inset-0 flex items-center px-6 sm:px-12">
                      <span className="hidden sm:block mr-8 text-7xl font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(204,164,98,0.9)]" style={{ fontFamily: 'var(--font-hype)' }}>0{gi + 1}</span>
                      <div>
                        <span className="block text-[11px] font-bold tracking-[4px] uppercase text-[#cca462] mb-2">0{gi + 1} · {g.kicker}</span>
                        <h2 className="uppercase text-white font-semibold" style={{ fontFamily: 'var(--font-hype)', fontSize: 'clamp(24px, 3.2vw, 44px)', lineHeight: 1.05 }}>{g.label}</h2>
                        <p className="mt-2 max-w-md text-sm sm:text-base text-white/75">{g.text}</p>
                      </div>
                    </div>
                  </div>

                  <MobileSlider desktopClass={`md:grid md:gap-8 ${g.id === 'indoor' || g.id === 'custom' ? 'md:grid-cols-2 max-w-4xl' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
                    {g.id === 'custom'
                      ? CUSTOM.map((c) => <CustomCard key={c.id} c={c} />)
                      : FABRICS.filter((f) => f.group === g.id).map((f) => <RangeCard key={f.id} f={f} />)}
                  </MobileSlider>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
