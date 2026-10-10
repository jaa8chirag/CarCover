'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, animate, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ScanLine, Ruler, Scissors, Zap, Brush, ClipboardCheck, Cpu, Flame, Droplets, Sun, Wind, Layers, Thermometer,
  FlaskConical, Package, CheckCircle2, ArrowRight, ChevronDown, Star, MapPin, ShieldCheck, Gauge, Shirt, Waves, Expand, Clock,
} from 'lucide-react';
import BrandMarquee from '@/components/BrandMarquee';
import PageShell from '@/components/PageShell';
import ProcessIllustration from '@/components/TechIllustrations';
import { btnGlass, btnPrimary } from '@/components/PageHero';
import { LAYERS, FABRIC_SHEETS } from '@/data/technology';

/* ------------------------------------------------------------------ data */

const PROCESS = [
  { icon: ScanLine, title: '3D Laser Scan', tag: '800+ chassis profiles', text: 'Your vehicle is scanned with a handheld 3D laser scanner. Mirrors, antennas, spoilers and roof racks are captured to the millimetre.' },
  { icon: Ruler, title: 'CAD Pattern Design', tag: 'Zero-sag fit', text: 'The scan becomes a flat 2D pattern in CAD. Seam lines are placed along natural body creases so the cover sits without billowing.' },
  { icon: Scissors, title: 'CNC Laser Cutting', tag: '±1 mm tolerance', text: 'Panels are cut by a computer-controlled laser. The heat seals every edge, so nothing frays and each panel is identical.' },
  { icon: Zap, title: 'Ultrasonic Welding', tag: 'Zero-leak seams', text: 'On waterproof fabrics, seams are fused with ultrasound and heat-taped instead of simply stitched, closing every needle hole.' },
  { icon: Brush, title: 'Hand Finishing', tag: 'Master-tailored', text: 'Master tailors add contrast piping, elasticated hems, mirror pockets and your embroidered monogram by hand.' },
  { icon: ClipboardCheck, title: 'Fit Trial & QC', tag: '100% inspected', text: 'Every cover is tried on a vehicle jig, inspected, serial-stamped and packed in its own heavy-duty storage bag.' },
];

const MATERIALS = [
  { icon: Droplets, name: 'Nano-polymer membrane', use: 'Waterproof core of the Outdoor Elite cover', metric: 'Water resistance', value: 100, label: '10,000mm head', color: '#38bdf8' },
  { icon: Sun, name: 'Metallised titanium composite', use: 'Reflective outer of the Outdoor Pro cover', metric: 'UV reflection', value: 99.8, label: '99.8%', color: '#fbbf24' },
  { icon: Wind, name: 'Microporous vapour film', use: 'Lets trapped heat and moisture escape', metric: 'Breathability', value: 92, label: 'Condensation-free', color: '#2dd4bf' },
  { icon: Layers, name: 'Brushed microfibre fleece', use: 'Paint-contact lining on every cover', metric: 'Softness', value: 98, label: 'Scratch-safe', color: '#f0abfc' },
  { icon: Flame, name: '600D ripstop canvas', use: 'Heavy-duty ripstop for tough outdoor use', metric: 'Tear strength', value: 95, label: 'Ballistic weave', color: '#fb923c' },
  { icon: Thermometer, name: 'UV-stable bonded thread', use: 'All stitching and piping', metric: 'Fade resistance', value: 96, label: 'Sun-proof', color: '#f87171' },
];

const MACHINES = [
  { icon: ScanLine, name: '3D Laser Scanner' },
  { icon: Cpu, name: 'CAD / CAM Software' },
  { icon: Scissors, name: 'CNC Laser Cutter' },
  { icon: Zap, name: 'Ultrasonic Welder' },
  { icon: FlaskConical, name: 'Hydrostatic Tester' },
  { icon: Package, name: 'Embroidery Machines' },
  { icon: Thermometer, name: 'UV Arc Chamber' },
];

const TESTS = [
  { label: 'Waterproof head', value: 10000, suffix: 'mm', ring: 1, color: '#38bdf8', note: 'Hydrostatic head test' },
  { label: 'UV rays blocked', value: 99.8, suffix: '%', decimals: 1, ring: 0.998, color: '#fbbf24', note: 'Solar reflectance test' },
  { label: 'Cabin heat drop', value: 22, suffix: '°C', ring: 22 / 30, color: '#2dd4bf', note: 'Open-sun parking test' },
  { label: 'Stress-test hours', value: 5000, suffix: 'h', ring: 1, color: '#f0abfc', note: 'Salt spray + UV arc' },
];

const SPEC_ROWS = [
  { key: 'material', label: 'Material', icon: Shirt },
  { key: 'waterResistance', label: 'Weather protection', icon: Waves },
  { key: 'breathability', label: 'Breathability', icon: Wind },
  { key: 'lining', label: 'Paint-contact lining', icon: Layers },
  { key: 'stretch', label: 'Fit & stretch', icon: Expand },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;
const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

/* --------------------------------------------------------------- helpers */

function CountUp({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/** Words slide up from behind a mask, one after another. */
function WordReveal({ text, className = '', delay = 0, shimmer = false, immediate = false }: { text: string; className?: string; delay?: number; shimmer?: boolean; immediate?: boolean }) {
  const words = text.split(' ');
  const motionProps = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '-60px' } };
  return (
    <motion.span initial="hidden" {...motionProps} className={`inline ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden="true">
          <motion.span
            className={`inline-block ${shimmer ? 'text-shimmer' : ''}`}
            variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: '0%', rotate: 0 } }}
            transition={{ duration: 0.75, delay: delay + i * 0.07, ease }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function SectionHead({ kicker, title, sub, light }: { kicker: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto">
      <motion.span initial={{ opacity: 0, letterSpacing: '0.1em' }} whileInView={{ opacity: 1, letterSpacing: '0.3em' }} viewport={{ once: true }} transition={{ duration: 1 }} className="am-kicker">
        {kicker}
      </motion.span>
      <h2
        className={`uppercase ${light ? 'text-white' : 'text-slate-950'}`}
        style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(26px, 3.8vw, 46px)', lineHeight: 1.15 }}
      >
        <WordReveal text={title} />
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4, ease }}
        className="mx-auto mt-5 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#cca462] to-transparent"
      />
      {sub && (
        <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className={`mt-5 text-base sm:text-lg font-light ${light ? 'text-white/65' : 'text-slate-600'}`}>
          {sub}
        </motion.p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ hero */

const HERO_WORDS = ['Engineered', 'Laser-Cut', 'Hand-Finished', 'Lab-Tested', 'Built For India'];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % HERO_WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden align-bottom h-[1.2em] min-w-[6ch]">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          className="inline-block text-[#a47a2e] whitespace-nowrap"
        >
          {HERO_WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const HERO_STATS = [
  { value: 800, suffix: '+', label: 'Chassis profiles' },
  { value: 1, prefix: '±', suffix: ' mm', label: 'Cutting tolerance' },
  { value: 10000, suffix: 'mm', label: 'Waterproof head' },
  { value: 5000, suffix: 'h', label: 'Stress-tested' },
];

function HeroStats() {
  return (
    <section className="relative bg-white">
      <div className="container-am max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 py-6 sm:py-8">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="py-3 min-w-0">
              <div className="whitespace-nowrap font-semibold text-black leading-none" style={{ fontFamily: 'var(--font-hype)', fontSize: 'clamp(22px, 2.5vw, 38px)' }}>
                {s.prefix}<CountUp to={s.value} />
                <span className="ml-1 text-[0.5em] font-medium text-[#b38848]">{s.suffix.trim()}</span>
              </div>
              <div className="mt-3 text-[10px] sm:text-[11px] uppercase tracking-[2px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero({ onEnquiry }: { onEnquiry: () => void }) {
  return (
    <>
      {/* INTRO: short text and the three entry buttons, like the shop page */}
      <div className="bg-white pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="container-am max-w-4xl text-center">
          <span className="block text-[11px] sm:text-xs tracking-[6px] uppercase text-slate-400 mb-5">Technology &amp; Craft</span>
          <h1 className="text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 400, fontSize: 'clamp(30px, 4.2vw, 54px)', lineHeight: 1.1 }}>
            How Your Cover Is Engineered
          </h1>
          <p className="mt-6 text-slate-700 leading-[1.9] text-[15px] sm:text-base">
            From a 3D scan of your car to the last hand-stitched seam. Explore every cover, fabric, process and machine behind it.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:flex sm:flex-nowrap items-stretch justify-center gap-3 sm:gap-4">
            <a href="#fabrics" className="inline-flex items-center justify-center px-5 sm:px-6 py-4 bg-black hover:bg-[#b38848] text-white text-[13px] sm:text-sm font-medium no-underline transition-colors whitespace-nowrap">Explore The Covers</a>
            <a href="#process" className="inline-flex items-center justify-center px-5 sm:px-6 py-4 bg-black hover:bg-[#b38848] text-white text-[13px] sm:text-sm font-medium no-underline transition-colors whitespace-nowrap">See The Process</a>
            <button onClick={onEnquiry} className="col-span-2 sm:col-span-1 inline-flex items-center justify-center px-5 sm:px-6 py-4 bg-black hover:bg-[#b38848] text-white text-[13px] sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer">Order Swatch Kit</button>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div className="relative w-full h-[56vh] sm:h-[68vh] min-h-[320px] overflow-hidden bg-black">
        <img src="/images/porsche_wheel_cover.jpg" alt="Porsche under a bespoke cover" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 84%' }} />
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- fabrics */

const BAR_LABELS = [
  ['water', 'Waterproofing'],
  ['uv', 'UV & heat defence'],
  ['scratch', 'Scratch safety'],
  ['breath', 'Breathability'],
] as const;

function FabricDetail({ f, onEnquiry }: { f: (typeof FABRIC_SHEETS)[number]; onEnquiry: () => void }) {
  return (
    <>
      <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#cca462]">{f.environment}</span>
      <h3 className="mt-3 uppercase font-bold leading-tight" style={{ fontFamily: 'var(--font-hype)', fontSize: 'clamp(24px, 2.8vw, 40px)' }}>{f.name}</h3>
      <p className="mt-2 text-white/70 text-sm sm:text-base">{f.tagline}</p>

      <div className="mt-6 space-y-3.5 max-w-md">
        {BAR_LABELS.map(([k, label], i) => (
          <div key={k}>
            <div className="flex justify-between text-[11px] uppercase tracking-[2px] text-white/60 mb-1.5">
              <span>{label}</span>
              <span className="text-white">{f.bars[k]}%</span>
            </div>
            <div className="h-[3px] bg-white/15 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${f.bars[k]}%` }}
                transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease }}
                className="h-full bg-gradient-to-r from-[#8a6a2f] to-[#f6e3b4]"
              />
            </div>
          </div>
        ))}
      </div>

      <dl className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl">
        {SPEC_ROWS.slice(0, 4).map(({ key, label }, i) => (
          <motion.div key={key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }} className="border-t border-white/15 pt-3">
            <dt className="text-[10px] uppercase tracking-[2.5px] text-[#cca462]">{label}</dt>
            <dd className="mt-1 text-[13px] text-white/85 leading-snug">{f.specs[key]}</dd>
          </motion.div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <div>
          <span className="block text-[10px] uppercase tracking-[2px] text-white/45">Starting from</span>
          <span className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-hype)' }}>{inr(f.price)}</span>
        </div>
        <div className="text-xs text-white/60 leading-relaxed max-w-[200px]">
          <span className="text-white/85">{f.warranty}</span><br />{f.idealFor}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/collections#studio" className="px-7 py-3.5 bg-white hover:bg-[#cca462] text-black text-xs font-bold uppercase tracking-[2px] no-underline flex items-center gap-2 transition-colors">
          Shop This Cover <ArrowRight size={14} />
        </Link>
        <button onClick={onEnquiry} className="px-7 py-3.5 border border-white/40 hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-[2px] cursor-pointer transition-colors">
          Order Swatch
        </button>
      </div>
    </>
  );
}

function FabricSpecs({ onEnquiry }: { onEnquiry: () => void }) {
  const [idx, setIdx] = useState(2);
  const f = FABRIC_SHEETS[idx];

  return (
    <section id="fabrics" className="relative py-24 sm:py-32 bg-black text-white scroll-mt-16">
      <div className="container-am max-w-[1500px]">
        <SectionHead light kicker="THE RANGE" title="Six Covers. Every Need." sub="Three for the outdoors, two for the garage and one for the big reveal. Hover or tap a cover to see its full specification." />

        {/* desktop: expanding panels */}
        <div className="hidden lg:flex gap-3 h-[720px]">
          {FABRIC_SHEETS.map((s, i) => {
            const on = i === idx;
            return (
              <motion.div
                key={s.id}
                layout
                onMouseEnter={() => setIdx(i)}
                onClick={() => setIdx(i)}
                animate={{ flexGrow: on ? 5.2 : 1 }}
                transition={{ duration: 0.7, ease }}
                className="relative basis-0 min-w-0 overflow-hidden cursor-pointer border border-white/10"
              >
                <motion.img
                  src={s.image}
                  alt={s.name}
                  animate={{ scale: on ? 1 : 1.12, filter: on ? 'brightness(1.12) saturate(1.1)' : 'grayscale(0.55) brightness(1.1)' }}
                  transition={{ duration: 0.9, ease }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className={`absolute inset-0 transition-colors duration-700 ${on ? 'bg-gradient-to-r from-black/70 via-black/30 to-transparent' : 'bg-black/25'}`} />

                {/* collapsed label */}
                <motion.div
                  animate={{ opacity: on ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-between py-8 pointer-events-none"
                >
                  <span className="text-sm font-bold text-[#cca462]" style={{ fontFamily: 'var(--font-hype)' }}>0{i + 1}</span>
                  <span className="uppercase font-bold tracking-[3px] text-white/85 text-lg" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{s.short}</span>
                  <span className="text-[10px] tracking-[2px] uppercase text-white/50">{s.group}</span>
                </motion.div>

                {/* expanded detail */}
                <AnimatePresence>
                  {on && (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.25, ease }}
                      className="absolute inset-0 p-10 xl:p-12 flex flex-col justify-end [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]"
                    >
                      <FabricDetail f={s} onEnquiry={onEnquiry} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* mobile / tablet: pills + one card */}
        <div className="lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-4 [scrollbar-width:none]">
            {FABRIC_SHEETS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIdx(i)}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-[1.5px] whitespace-nowrap border cursor-pointer transition-colors ${i === idx ? 'bg-white text-black border-white' : 'border-white/30 text-white/80'}`}
              >
                {s.short}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={f.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="relative overflow-hidden border border-white/10">
              <img src={f.image} alt={f.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75" />
              <div className="relative p-6 sm:p-8">
                <FabricDetail f={f} onEnquiry={onEnquiry} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Comparison activeId={f.id} onPick={(id) => setIdx(FABRIC_SHEETS.findIndex((s) => s.id === id))} />
      </div>
    </section>
  );
}

function Comparison({ activeId, onPick }: { activeId: string; onPick: (id: string) => void }) {
  const rows: { label: string; get: (f: (typeof FABRIC_SHEETS)[number]) => string }[] = [
    { label: 'Best environment', get: (f) => f.environment },
    { label: 'Material', get: (f) => f.specs.material },
    { label: 'Weather protection', get: (f) => f.specs.waterResistance },
    { label: 'Breathability', get: (f) => f.specs.breathability },
    { label: 'Lining', get: (f) => f.specs.lining },
    { label: 'Fit', get: (f) => f.specs.stretch },
    { label: 'Warranty', get: (f) => f.warranty },
    { label: 'Starting price', get: (f) => inr(f.price) },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease }} className="mt-20 sm:mt-28">
      <h3 className="text-center uppercase text-white mb-10" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(22px, 2.8vw, 34px)' }}>
        <WordReveal text="Compare All Covers" />
      </h3>
      <div className="border border-white/15 overflow-x-auto" data-lenis-prevent>
        <table className="w-full min-w-[980px] text-sm border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-black p-4 text-left w-44" />
              {FABRIC_SHEETS.map((f) => {
                const on = f.id === activeId;
                return (
                  <th key={f.id} className="p-3 align-bottom">
                    <button onClick={() => onPick(f.id)} className={`w-full py-3 px-2 text-center text-xs font-bold uppercase tracking-[1.5px] cursor-pointer transition-colors ${on ? 'bg-[#cca462] text-black' : 'border border-white/20 text-white/80 hover:border-white'}`}>
                      {f.short}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, get }) => (
              <tr key={label} className="border-t border-white/10">
                <th className="sticky left-0 z-10 bg-black p-4 text-left align-top text-[11px] font-bold uppercase tracking-[2px] text-[#cca462]">{label}</th>
                {FABRIC_SHEETS.map((f) => (
                  <td key={f.id} className={`p-4 align-top text-[13px] leading-snug transition-colors ${f.id === activeId ? 'bg-white/[0.07] text-white' : 'text-white/55'} ${label === 'Starting price' ? 'font-bold text-white text-base' : ''}`}>
                    {get(f)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}


/* --------------------------------------------------------------- process */

function Process() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-[#f8f6f1] scroll-mt-20">
      <div className="container-am max-w-7xl">
        <SectionHead kicker="THE PROCESS" title="From Scan To Your Doorstep" sub="Six precise steps. Nothing is off the shelf." />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-32">
              <div className="glow-border relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#1a1710] to-black p-8 shadow-2xl shadow-[#b38848]/25">
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
                <div className="relative flex items-center justify-between text-white">
                  <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#cca462]">Step {active + 1} / 6</span>
                  <span className="text-[10px] tracking-wider uppercase text-white/50">Live demo</span>
                </div>
                <div className="relative mt-4 aspect-[17/10]">
                  <AnimatePresence mode="wait">
                    <motion.div key={active} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.35 }} className="absolute inset-0">
                      <ProcessIllustration index={active} className="w-full h-full" />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative mt-4 text-white">
                  <AnimatePresence mode="wait">
                    <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <h3 className="text-xl font-bold">{PROCESS[active].title}</h3>
                      <span className="inline-block mt-2 text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full bg-[#cca462]/15 text-[#cca462] border border-[#cca462]/30">{PROCESS[active].tag}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative mt-6 flex gap-1.5">
                  {PROCESS.map((_, i) => (
                    <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? 'bg-[#cca462]' : 'bg-white/15'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div ref={listRef} className="relative lg:col-span-7 pl-10 sm:pl-14">
            <div className="absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-[3px] rounded bg-slate-200" />
            <motion.div className="absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-[3px] rounded bg-gradient-to-b from-[#b38848] to-[#cca462] origin-top" style={{ scaleY: progress }} />
            <div className="space-y-8 lg:space-y-[18vh]">
              {PROCESS.map((p, i) => (
                <ProcessStep key={p.title} step={p} index={i} active={active === i} onActive={() => setActive(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index, active, onActive }: { step: (typeof PROCESS)[number]; index: number; active: boolean; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const centred = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => {
    if (centred) onActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centred]);
  const Icon = step.icon;

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }} className="relative">
      <span className={`absolute -left-10 sm:-left-14 top-6 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500 ring-4 ring-white ${active ? 'bg-[#b38848] text-white scale-110 shadow-lg shadow-[#b38848]/40' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
        {index + 1}
      </span>
      <div className={`rounded-3xl bg-white p-6 sm:p-8 transition-all duration-500 ${active ? 'glow-border shadow-2xl -translate-y-1' : 'grad-border shadow-sm'}`}>
        <div className="flex items-start gap-4">
          <span className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${active ? 'bg-slate-950 text-[#cca462]' : 'bg-slate-100 text-slate-500'}`}>
            <Icon size={22} />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-950">{step.title}</h3>
            <p className="mt-2 text-sm sm:text-[15px] text-slate-600 leading-relaxed">{step.text}</p>
            <span className="inline-block mt-4 text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full bg-[#b38848]/10 text-[#b38848]">{step.tag}</span>
          </div>
        </div>
        <div className="lg:hidden mt-5 rounded-2xl bg-gradient-to-br from-[#1a1710] to-black p-3">
          <ProcessIllustration index={index} className="w-full" />
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------- materials */

function Materials() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#efeae1] text-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(204,164,98,0.18),transparent_55%)]" />
      <div className="container-am max-w-7xl relative">
        <SectionHead kicker="WHAT WE USE" title="Materials Engineered For India" sub="Each material has one job and is tested against Indian heat, rain and dust." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {MATERIALS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl p-7 bg-white shadow-[0_12px_40px_-20px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.3)] transition-shadow overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-55 transition-opacity duration-500" style={{ background: m.color }} />
                <span className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" style={{ background: `${m.color}26`, color: m.color }}>
                  <Icon size={26} />
                </span>
                <h3 className="relative text-lg font-bold">{m.name}</h3>
                <p className="relative text-sm text-slate-500 mt-1.5 min-h-[40px]">{m.use}</p>
                <div className="relative mt-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">{m.metric}</span>
                    <span className="font-semibold" style={{ color: m.color }}>{m.label}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${m.color}88, ${m.color})` }} initial={{ width: 0 }} whileInView={{ width: `${m.value}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 + (i % 3) * 0.1, ease: 'easeOut' }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- layer stack */

function LayerExplorer() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setActive((a) => (a + 1) % LAYERS.length), 4500);
    return () => clearInterval(t);
  }, [auto]);

  const layer = LAYERS[active];
  const Icon = layer.icon;
  const pick = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#efeae1]">
      <div className="container-am max-w-7xl">
        <SectionHead kicker="FABRIC ANATOMY" title="Four Layers. One Shield." sub="Tap a layer to see what it does. We have stacked them apart so you can see each one." />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative h-[380px] sm:h-[460px] flex items-center justify-center" style={{ perspective: 1200 }}>
            <div className="absolute inset-x-10 bottom-10 h-24 rounded-full bg-slate-900/10 blur-2xl" />
            <div className="relative w-[240px] h-[150px] sm:w-[290px] sm:h-[180px]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(58deg) rotateZ(-38deg)' }}>
              {LAYERS.map((l, i) => {
                const z = (LAYERS.length - 1 - i) * 52;
                const on = i === active;
                return (
                  <motion.button
                    key={l.number}
                    onClick={() => pick(i)}
                    aria-label={`Show layer ${l.number}: ${l.title}`}
                    className="absolute inset-0 rounded-2xl cursor-pointer border"
                    style={{ background: `linear-gradient(135deg, ${l.color}, ${l.color}bb)`, borderColor: 'rgba(255,255,255,0.45)', transformStyle: 'preserve-3d' }}
                    animate={{ z: on ? z + 36 : z, opacity: on ? 1 : 0.62, boxShadow: on ? `0 30px 50px -10px ${l.color}99` : '0 12px 20px -10px rgba(0,0,0,0.3)' }}
                    transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <span className="absolute inset-0 rounded-2xl opacity-30 [background-image:radial-gradient(circle,#fff_1px,transparent_1.5px)] [background-size:14px_14px]" />
                    <span className="absolute left-4 top-3 text-white text-[10px] sm:text-xs font-bold tracking-[3px]">LAYER {l.number}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="grad-border rounded-3xl bg-white p-6 sm:p-9 shadow-xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {LAYERS.map((l, i) => (
                <button key={l.number} onClick={() => pick(i)} className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer border-2 ${i === active ? 'text-white shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`} style={i === active ? { background: l.color, borderColor: l.color } : undefined}>
                  {l.number}
                </button>
              ))}
              {auto && (
                <span className="ml-auto self-center text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <motion.i className="w-1.5 h-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                  Auto-playing
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                <div className="flex items-center gap-4">
                  <span className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ background: layer.color }}>
                    <Icon size={26} />
                  </span>
                  <div>
                    <span className="text-[11px] font-bold tracking-[3px] uppercase" style={{ color: layer.color }}>{layer.badge}</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 leading-tight">{layer.title}</h3>
                  </div>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-500">{layer.subtitle}</p>
                <p className="mt-5 text-slate-600 leading-relaxed">{layer.description}</p>
                <ul className="mt-6 space-y-3">
                  {layer.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" style={{ color: layer.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 rounded-2xl px-5 py-4 flex items-center justify-between gap-4" style={{ background: `${layer.color}12`, border: `1px solid ${layer.color}33` }}>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Lab rating</span>
                  <span className="font-bold text-right" style={{ color: layer.color }}>{layer.rating}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- lab tests */

function RingGauge({ t, index }: { t: (typeof TESTS)[number]; index: number }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: index * 0.1, ease }} className="rounded-3xl p-6 sm:p-8 bg-white shadow-[0_12px_40px_-20px_rgba(0,0,0,0.2)] text-center">
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto">
        <svg viewBox="0 0 130 130" className="w-full h-full -rotate-90">
          <circle cx="65" cy="65" r={R} fill="none" stroke="#0f172a" strokeOpacity="0.1" strokeWidth="9" />
          <motion.circle cx="65" cy="65" r={R} fill="none" stroke={t.color} strokeWidth="9" strokeLinecap="round" strokeDasharray={C} initial={{ strokeDashoffset: C }} whileInView={{ strokeDashoffset: C * (1 - t.ring) }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 0.2 + index * 0.1, ease: 'easeOut' }} style={{ filter: `drop-shadow(0 0 8px ${t.color}88)` }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[17px] min-[420px]:text-xl sm:text-3xl font-semibold" style={{ fontFamily: 'var(--font-hype)' }}>
          <CountUp to={t.value} decimals={t.decimals} suffix={t.suffix} />
        </div>
      </div>
      <h3 className="mt-5 font-bold">{t.label}</h3>
      <p className="text-xs text-slate-500 mt-1">{t.note}</p>
    </motion.div>
  );
}

function LabTests() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#f8f6f1] text-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(204,164,98,0.14),transparent_60%)]" />
      <div className="container-am max-w-6xl relative">
        <SectionHead kicker="LABORATORY VALIDATED" title="Proven, Not Promised" sub="Every batch is tested before it becomes a cover." />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TESTS.map((t, i) => (
            <RingGauge key={t.label} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- machines */

function Machines() {
  const row = [...MACHINES, ...MACHINES];
  return (
    <section className="py-20 sm:py-24 bg-[#efeae1] overflow-hidden">
      <SectionHead kicker="THE ATELIER FLOOR" title="Machines & Tools" sub="Precision equipment, run by experienced craftspeople." />
      <div className="relative [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <motion.div className="flex gap-5 w-max" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}>
          {row.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="grad-border flex items-center gap-4 pl-5 pr-8 py-5 rounded-2xl bg-white shadow-sm min-w-[260px]">
                <span className="w-12 h-12 rounded-xl bg-slate-950 text-[#cca462] flex items-center justify-center flex-shrink-0">
                  <Icon size={22} />
                </span>
                <span className="font-bold text-slate-900 whitespace-nowrap">{m.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- page */

export default function TechnologyPage() {
  return (
    <PageShell>
      {({ openEnquiry }) => (
        <>
          <Hero onEnquiry={openEnquiry} />
          <HeroStats />
          <BrandMarquee flat />
          <FabricSpecs onEnquiry={openEnquiry} />
          <Process />
          <Materials />
          <LayerExplorer />
          <LabTests />
          <Machines />

          <section className="relative bg-[#f8f6f1] text-slate-950 py-24 sm:py-32 overflow-hidden">
            <motion.div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#cca462]/25 blur-[130px]" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
            <div className="container-am max-w-4xl relative text-center">
              <span className="block text-[11px] font-bold tracking-[5px] uppercase text-[#b38848] mb-5">Ready When You Are</span>
              <h2 className="uppercase" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(30px, 5vw, 64px)', lineHeight: 1.05 }}>
                <WordReveal text="Feel The Difference" />
              </h2>
              <p className="mt-5 text-slate-600 font-light text-lg">Get a free swatch kit, or order your tailored cover now.</p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <button onClick={openEnquiry} className="px-8 py-4 rounded-full bg-black hover:bg-[#b38848] text-white text-xs font-bold uppercase tracking-[2px] transition-colors cursor-pointer">
                  Request Free Swatch Kit
                </button>
                <Link href="/collections" className="px-8 py-4 rounded-full border border-slate-400 hover:bg-black hover:text-white text-slate-900 text-xs font-bold uppercase tracking-[2px] no-underline inline-flex items-center gap-2 transition-colors">
                  Shop Covers <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
