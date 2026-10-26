'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, ArrowUpRight, RotateCw, Sparkles } from 'lucide-react';
import PageShell from '@/components/PageShell';
import MobileSlider from '@/components/MobileSlider';
import { FABRICS, PRICE_NOTE, type CoverGroup, type Fabric } from '@/data/fabrics';
import { SITE_URL, absolute, jsonLd } from '@/lib/seo';
import { FABRIC_SHEETS } from '@/data/technology';

const GROUPS: { id: CoverGroup | 'custom'; label: string; text: string; kicker: string; after?: string; afterPos?: string }[] = [
  { id: 'outdoor', label: 'Outdoor Covers', text: 'Built for rain, sun and dust. For cars parked outside.', kicker: 'For the open road', after: '/images/rr_black_wide.jpg', afterPos: 'center 0%'},
  { id: 'indoor', label: 'Indoor Covers', text: 'Soft, breathable covers for the garage or showroom.', kicker: 'For the garage', after: '/images/bespoke_slide_2.jpg', afterPos: 'center 55%'},
  { id: 'custom', label: 'Bespoke Covers', text: 'Printed, monogrammed or branded. Made for one car only.', kicker: 'Made for one car', after: '/images/unveil_gold_wide.jpg', afterPos: 'center 50%'},
  { id: 'unveiling', label: 'Unveiling Covers', text: 'Reveal-night covers for launches and handovers.', kicker: 'For the big reveal'},
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
  { id: 'custom-printed', title: 'Custom Printed Cover', text: 'Your artwork, livery or branding printed edge to edge on premium stretch fabric.', image: '/images/cover_custom_printed.jpg', points: ['Any artwork, logo or livery', 'Sharp, fade-resistant printing', 'Cut to your exact car'] },
];

/** Full-width photo between two sections. */
function PhotoBreak({ src, pos = 'center 58%' }: { src: string; pos?: string }) {
  return (
    <div className="relative w-full h-[56vh] sm:h-[68vh] min-h-[320px] overflow-hidden bg-black">
      <img src={src} alt="Bespoke car cover" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: pos }} />
    </div>
  );
}

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
        <span className="text-2xl font-semibold text-black" style={{ fontFamily: 'var(--font-hype)' }}>₹26,999</span>
        <span className="block text-[11px] text-slate-500 mt-0.5">{PRICE_NOTE}</span>
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

/** A woven-cloth look, tinted per cover. Swap for a real fabric photo whenever one is available. */
function weave(hex: string): React.CSSProperties {
  return {
    backgroundColor: hex,
    backgroundImage:
      'repeating-linear-gradient(45deg, rgba(255,255,255,0.13) 0 2px, transparent 2px 7px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.22) 0 2px, transparent 2px 7px), radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 60%)',
  };
}

function sheetFor(id: string) {
  return FABRIC_SHEETS.find((x) => x.id === id);
}

const SPEC_LABELS: [keyof NonNullable<ReturnType<typeof sheetFor>>['specs'], string][] = [
  ['material', 'Material'],
  ['waterResistance', 'Water'],
  ['uvProtection', 'UV Protection'],
  ['breathability', 'Breathability'],
  ['lining', 'Lining'],
];

/** Colour of each cover's cloth. Add an `image` (a real fabric photo) to any entry and it replaces the drawn weave. */
const FABRIC_TONES: Record<string, { tone: string; image?: string }> = {
  'outdoor-standard': { tone: '#6b7686', image: '/images/fabric_outdoor_standard.jpg' },
  'outdoor-pro': { tone: '#8a5a1f', image: '/images/fabric_outdoor_pro.jpg' },
  'outdoor-elite': { tone: '#1d2430', image: '/images/fabric_outdoor_elite.jpg' },
  'outdoor-signature': { tone: '#0b0c0e', image: '/images/fabric_outdoor_elite.jpg' },
  'indoor-standard': { tone: '#3b4250', image: '/images/fabric_indoor_standard.jpg' },
  'indoor-elite': { tone: '#15171c', image: '/images/fabric_indoor_elite.jpg' },
  'custom-printed': { tone: '#1a1a1a', image: '/images/cover_custom_printed.jpg' },
  'unveil-showroom': { tone: '#4a4038', image: '/images/fabric_unveiling.jpg' },
};

/** Every cover card: hover (or tap the button on touch) flips it over. The back opens with a fabric picture, then the details. */
function FlipCard({ f }: { f: Fabric }) {
  const [flipped, setFlipped] = useState(false);
  const sheet = sheetFor(f.id);
  const fab = FABRIC_TONES[f.id] ?? { tone: '#444' };
  return (
    <div
      className="h-full [perspective:1400px]"
      onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setFlipped(true); }}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="relative h-full grid transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d]" style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}>
        {/* FRONT */}
        <div className="[grid-area:1/1] [backface-visibility:hidden] flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)]">
          <div className="relative aspect-[5/4] overflow-hidden bg-slate-900">
            <img src={f.image} alt={`${f.title} car cover`} loading="lazy" className="w-full h-full object-cover" />
            {f.bestseller && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-[#cca462] to-[#f6e3b4] text-black text-[10px] font-bold tracking-[2px] px-4 py-2 rounded-full shadow-lg">BESTSELLER</span>
            )}
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className="absolute bottom-4 right-4 hidden [@media(hover:none)]:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[2px] cursor-pointer"
            >
              <RotateCw size={12} /> See the fabric
            </button>
          </div>
          <div className="p-6 sm:p-7 flex flex-col flex-1">
            <span className="block text-[10px] font-bold uppercase tracking-[2px] text-slate-400">Starting from</span>
            <span className="text-2xl font-semibold text-black" style={{ fontFamily: 'var(--font-hype)' }}>₹{f.price.toLocaleString('en-IN')}</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">{PRICE_NOTE}</span>
            <h3 className="mt-3 uppercase font-bold tracking-wide text-black leading-snug">{f.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{f.subtitle}</p>
            <ul className="mt-4 space-y-2 flex-1">
              {f.specs.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[13px] text-slate-700 leading-snug">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-[#b38848]/15 flex items-center justify-center flex-shrink-0"><Check size={10} className="text-[#b38848]" /></span>
                  {x}
                </li>
              ))}
            </ul>
            <Link href={`/shop/${f.id}`} className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-black hover:bg-[#b38848] text-white text-xs font-bold uppercase tracking-[2px] no-underline transition-colors">
              Choose this cover <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* BACK: fabric picture on top, details below */}
        <div className="[grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-[5/4] overflow-hidden" style={fab.image ? undefined : weave(fab.tone)}>
            {fab.image && <img src={fab.image} alt={`${f.title} fabric`} className="absolute inset-0 w-full h-full object-cover" />}
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <span className="absolute bottom-4 left-5 text-[10px] font-bold tracking-[4px] uppercase text-[#f6e3b4]">The fabric</span>
            <button type="button" onClick={() => setFlipped(false)} className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[2px] cursor-pointer">
              <RotateCw size={12} /> Back
            </button>
          </div>
          <div className="p-6 sm:p-7 flex flex-col flex-1">
            <h3 className="uppercase font-bold tracking-wide text-black leading-snug">{f.title}</h3>
            <dl className="mt-4 space-y-3 flex-1">
              {sheet && SPEC_LABELS.filter(([k]) => Boolean(sheet.specs[k])).map(([k, label]) => (
                <div key={k}>
                  <dt className="text-[10px] tracking-[2px] uppercase text-slate-400">{label}</dt>
                  <dd className="text-[13px] leading-snug text-slate-800">{sheet.specs[k]}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex gap-3">
              <Link href={`/shop/${f.id}`} className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-black hover:bg-[#b38848] text-white text-xs font-bold uppercase tracking-[2px] no-underline transition-colors">
                Choose <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Outdoor Pro: a normal photo card. Hover it (or tap the button on touch screens) and the fabric slides in over one half of the picture. */
function SplitCard({ f }: { f: Fabric }) {
  const [show, setShow] = useState(false);
  const sheet = sheetFor(f.id);
  const fab = FABRIC_TONES[f.id] ?? { tone: '#444' };
  return (
    <Link
      href={`/shop/${f.id}`}
      onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setShow(true); }}
      onMouseLeave={() => setShow(false)}
      className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden no-underline text-inherit border border-slate-200 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-500"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-slate-900">
        <img src={f.image} alt={`${f.title} car cover`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        {/* fabric: slides in over the left half */}
        <div
          className="absolute inset-0 transition-[clip-path] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ ...(fab.image ? { backgroundImage: `url(${fab.image})`, backgroundSize: 'cover' } : weave(fab.tone)), clipPath: show ? 'inset(0 50% 0 0)' : 'inset(0 100% 0 0)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/20 to-black/60" />
          <div className={`absolute inset-0 py-4 flex flex-col justify-center items-center text-center pr-[54%] pl-4 transition-opacity duration-500 ${show ? 'opacity-100 delay-300' : 'opacity-0'}`}>
            <span className="text-[9px] font-bold tracking-[3px] uppercase text-[#f6e3b4]">The fabric</span>
            <span className="mt-1 text-[11px] sm:text-[12px] leading-snug text-white font-medium line-clamp-3">{sheet?.specs.material}</span>
            <span className="mt-1.5 text-[10px] leading-snug text-white/75 line-clamp-2">{sheet?.specs.waterResistance}</span>
          </div>
        </div>
        <span aria-hidden className={`absolute inset-y-0 left-1/2 w-px bg-[#cca462] transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`} />
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShow((v) => !v); }}
          className="absolute bottom-4 right-4 hidden [@media(hover:none)]:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[2px] cursor-pointer"
        >
          <RotateCw size={12} /> {show ? 'Hide fabric' : 'See the fabric'}
        </button>
      </div>
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-[2px] text-slate-400">Starting from</span>
        <span className="text-2xl font-semibold text-black" style={{ fontFamily: 'var(--font-hype)' }}>₹{f.price.toLocaleString('en-IN')}</span>
        <span className="block text-[11px] text-slate-500 mt-0.5">{PRICE_NOTE}</span>
        <h3 className="mt-3 uppercase font-bold tracking-wide text-black leading-snug">{f.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{f.subtitle}</p>
        <ul className="mt-4 space-y-2 flex-1">
          {f.specs.map((x) => (
            <li key={x} className="flex items-start gap-2.5 text-[13px] text-slate-700 leading-snug">
              <span className="mt-0.5 w-4 h-4 rounded-full bg-[#b38848]/15 flex items-center justify-center flex-shrink-0"><Check size={10} className="text-[#b38848]" /></span>
              {x}
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

function RangeCard({ f }: { f: Fabric }) {
  return (
    <Link
      href={`/shop/${f.id}`}
      className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden no-underline text-inherit border border-slate-200 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-500"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-slate-900">
        <img src={f.image} alt={`${f.title} car cover`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
        {f.bestseller && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-[#cca462] to-[#f6e3b4] text-black text-[10px] font-bold tracking-[2px] px-4 py-2 rounded-full shadow-lg">BESTSELLER</span>
        )}
      </div>
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-[2px] text-slate-400">Starting from</span>
        <span className="text-2xl font-semibold text-black" style={{ fontFamily: 'var(--font-hype)' }}>₹{f.price.toLocaleString('en-IN')}</span>
        <span className="block text-[11px] text-slate-500 mt-0.5">{PRICE_NOTE}</span>
        <h3 className="mt-3 uppercase font-bold tracking-wide text-black leading-snug">{f.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{f.subtitle}</p>
        <ul className="mt-4 space-y-2 flex-1">
          {f.specs.map((s) => (
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

/** Featured full-width luxury showcase for our top pinnacle Outdoor Signature cover. */
function SignatureFeatureCard({ f }: { f: Fabric }) {
  return (
    <div className="mt-12 sm:mt-16 relative rounded-[2.5rem] p-[2px] bg-gradient-to-r from-[#cca462] via-[#ffe5a3] to-[#b38848] shadow-[0_25px_80px_-20px_rgba(204,164,98,0.45)] hover:shadow-[0_35px_100px_-20px_rgba(204,164,98,0.65)] transition-all duration-700">
      <div className="group rounded-[2.4rem] bg-[#0c0e14] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#cca462]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="grid lg:grid-cols-12 items-stretch">
          {/* IMAGE */}
          <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] lg:min-h-[480px] overflow-hidden bg-slate-950">
            <img
              src={f.image}
              alt={`${f.title} car cover`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-black/20 to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:via-[#0c0e14]/25 lg:to-[#0c0e14]" />

            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="bg-gradient-to-r from-[#cca462] via-[#faecc7] to-[#cca462] text-black text-[10px] sm:text-[11px] font-extrabold tracking-[2px] uppercase px-4 py-2 rounded-full shadow-2xl flex items-center gap-1.5">
                <Sparkles size={13} className="text-black" />
                OUR FLAGSHIP OUTDOOR
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-2 text-xs text-white/90 backdrop-blur-md bg-black/55 px-4 py-2.5 rounded-full border border-[#cca462]/35">
              <span className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#cca462] animate-pulse" />
                Hand-finished signature contrast piping
              </span>
              <span className="text-[#f6e3b4] font-semibold text-[11px] tracking-wider uppercase">10,000mm Waterproof</span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-5 p-7 sm:p-9 lg:p-11 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 text-[#cca462] text-[11px] font-bold tracking-[3px] uppercase mb-2">
                <span>The Pinnacle Tier</span>
                <span className="h-px w-8 bg-[#cca462]/60" />
              </div>
              <h3 className="text-white text-3xl sm:text-4xl font-semibold tracking-wide uppercase leading-tight" style={{ fontFamily: 'var(--font-hype)' }}>
                {f.title}
              </h3>
              <p className="mt-1 text-sm text-[#f6e3b4] font-medium">{f.subtitle}</p>
              <p className="mt-3.5 text-slate-300 text-sm leading-relaxed">{f.description}</p>

              <div className="mt-6 space-y-2.5">
                {f.specs.map((s) => (
                  <div key={s} className="flex items-start gap-2.5 text-[13px] text-slate-200 leading-snug">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-[#cca462]/20 border border-[#cca462]/60 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#cca462]" />
                    </span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[2px] text-[#cca462]">Starting from</span>
                <span className="text-3xl font-semibold text-white" style={{ fontFamily: 'var(--font-hype)' }}>
                  ₹{f.price.toLocaleString('en-IN')}
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5">{PRICE_NOTE}</span>
              </div>
              <Link
                href={`/shop/${f.id}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#cca462] to-[#f6e3b4] hover:brightness-110 text-black text-xs font-bold uppercase tracking-[2px] transition-all no-underline shadow-[0_12px_28px_-6px_rgba(204,164,98,0.5)] whitespace-nowrap"
              >
                <span>Choose Signature</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SHOP_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'ItemList', name: 'Signature Covers range', itemListElement: FABRICS.map((f, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/shop/${f.id}`, name: f.title, image: absolute(f.image) })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` }] },
  ],
};

export default function ShopPage() {
  return (
    <PageShell>
      {() => (
        <div className="bg-[#f3f1ed]">
          <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(SHOP_LD)} />
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

          {GROUPS.map((g, gi) => (
            <React.Fragment key={g.id}>
              <section id={g.id} className={`scroll-mt-20 py-16 sm:py-24 ${gi % 2 === 0 ? 'bg-white' : 'bg-[#f3f1ed]'}`}>
                <div className="container-am max-w-7xl">
                  <div className="mb-10 sm:mb-14 text-center">
                    <span className="block text-[11px] sm:text-xs tracking-[6px] uppercase text-slate-400 mb-3">{g.kicker}</span>
                    <h2 className="text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 400, fontSize: 'clamp(28px, 3.6vw, 46px)', lineHeight: 1.1 }}>{g.label}</h2>
                    <p className="mt-4 mx-auto max-w-xl text-slate-600">{g.text}</p>
                  </div>

                  {/* Core cards in row 1 */}
                  <MobileSlider desktopClass={`md:grid md:gap-8 md:mx-auto ${g.id === 'unveiling' || g.id === 'custom' ? 'md:grid-cols-1 max-w-md' : g.id === 'indoor' ? 'md:grid-cols-2 max-w-4xl' : 'md:grid-cols-3 max-w-7xl'}`}>
                    {FABRICS.filter((f) => f.group === g.id && (g.id !== 'outdoor' || f.id !== 'outdoor-signature')).map((f) => <FlipCard key={f.id} f={f} />)}
                  </MobileSlider>

                  {/* Agli row: Highlighted Flagship Outdoor Signature */}
                  {g.id === 'outdoor' && (() => {
                    const sig = FABRICS.find((f) => f.id === 'outdoor-signature');
                    return sig ? <SignatureFeatureCard f={sig} /> : null;
                  })()}

                  {g.id === 'custom' && (
                    <div className="mt-10 sm:mt-12 text-center max-w-xl mx-auto p-5 rounded-2xl bg-black/[0.03] border border-black/10">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Have questions about custom artwork, livery or monogramming? Call our atelier at{' '}
                        <a href="tel:+918585996669" className="font-semibold text-black underline whitespace-nowrap">+91 85859 96669</a>
                        {' '}or{' '}
                        <a href="https://wa.me/918585996669?text=Hello%20Signature%20Covers%2C%20I%20have%20questions%20about%20ordering%20a%20Bespoke%20Cover." target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1ebe5b] underline whitespace-nowrap">chat with us on WhatsApp</a>.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {g.after && <PhotoBreak src={g.after} pos={g.afterPos} />}
            </React.Fragment>
          ))}
        </div>
      )}
    </PageShell>
  );
}


