'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, animate, useInView, useScroll, useSpring } from 'framer-motion';
import {
  ScanLine, Ruler, Scissors, Zap, Brush, ClipboardCheck, Cpu, Flame, Droplets, Sun, Wind, Layers, Thermometer,
  FlaskConical, Package, CheckCircle2, ArrowRight, ChevronDown, Star, MapPin, ShieldCheck, Gauge, Shirt, Waves, Expand, Clock,
} from 'lucide-react';
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
  { icon: Droplets, name: 'Nano-polymer membrane', use: 'Waterproof core of the Monsoon cover', metric: 'Water resistance', value: 100, label: '10,000mm head', color: '#38bdf8' },
  { icon: Sun, name: 'Metallised titanium composite', use: 'Reflective outer of the Heat-Shield cover', metric: 'UV reflection', value: 99.8, label: '99.8%', color: '#fbbf24' },
  { icon: Wind, name: 'Microporous vapour film', use: 'Lets trapped heat and moisture escape', metric: 'Breathability', value: 92, label: 'Condensation-free', color: '#2dd4bf' },
  { icon: Layers, name: 'Brushed microfibre fleece', use: 'Paint-contact lining on every cover', metric: 'Softness', value: 98, label: 'Scratch-safe', color: '#f0abfc' },
  { icon: Flame, name: '600D ripstop canvas', use: 'Heavy-duty 4x4 and overland cover', metric: 'Tear strength', value: 95, label: 'Ballistic weave', color: '#fb923c' },
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
          className="inline-block text-shimmer whitespace-nowrap"
        >
          {HERO_WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Hero({ onEnquiry }: { onEnquiry: () => void }) {
  return (
    <section className="relative min-h-[90vh] flex items-end overflow-hidden bg-[#050808] text-white">
      <video className="absolute inset-0 w-full h-full object-cover opacity-50" src="/videos/hero_cover_install.mp4" poster="/images/craftsmanship.jpg" autoPlay muted loop playsInline />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/30 to-[#050808]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_30%,rgba(0,102,94,0.45),transparent_60%)]" />

      <div className="container-am relative w-full pt-44 pb-16 sm:pb-24">
        <div className="max-w-5xl">
          <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="am-kicker">
            TECHNOLOGY &amp; CRAFT
          </motion.span>
          <h1 className="uppercase" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(32px, 6vw, 82px)', lineHeight: 1.08, letterSpacing: '-0.5px' }}>
            <WordReveal immediate text="How Your Cover Is" />
            <br />
            <RotatingWord />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }} className="mt-6 max-w-2xl text-base sm:text-lg text-white/75 font-light leading-relaxed">
            From a 3D scan of your car to the last hand-stitched seam. See our fabrics, process, materials and machines in detail.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1 }} className="mt-9 flex flex-wrap gap-3">
            <a href="#fabrics" className={btnPrimary + ' no-underline'}>Explore Our Fabrics</a>
            <a href="#process" className={btnGlass + ' no-underline'}>See The Process</a>
            <button onClick={onEnquiry} className={btnGlass}>Order Swatch Kit</button>
          </motion.div>
        </div>

        <motion.a href="#fabrics" aria-label="Scroll down" className="hidden sm:flex absolute right-12 bottom-24 w-12 h-12 rounded-full border border-white/30 items-center justify-center text-white/80 no-underline" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={22} />
        </motion.a>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- fabrics */

function FabricSpecs({ onEnquiry }: { onEnquiry: () => void }) {
  const [idx, setIdx] = useState(0);
  const f = FABRIC_SHEETS[idx];
  const Icon = f.icon;

  return (
    <section id="fabrics" className="relative py-24 sm:py-32 bg-[#f4f7f6] scroll-mt-16">
      <div className="container-am max-w-7xl">
        <SectionHead kicker="OUR FABRICS" title="Every Fabric, Fully Explained" sub="Five fabrics. One for every climate, parking spot and purpose. Tap a fabric to see its complete specification." />

        {/* tabs */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-8 lg:justify-center [scrollbar-width:none]">
          {FABRIC_SHEETS.map((s, i) => {
            const TabIcon = s.icon;
            const on = i === idx;
            return (
              <button
                key={s.id}
                onClick={() => setIdx(i)}
                className={`relative flex items-center gap-3 pl-3 pr-5 py-3 rounded-2xl border-2 whitespace-nowrap transition-all cursor-pointer ${on ? 'bg-white shadow-xl -translate-y-0.5' : 'bg-white/60 border-slate-200 hover:bg-white'}`}
                style={on ? { borderColor: s.accent } : undefined}
              >
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: s.accent }}>
                  <TabIcon size={18} />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold text-slate-950 leading-tight">{s.short}</span>
                  <span className="block text-[11px] text-slate-500">from {inr(s.price)}</span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease }}
            className="glow-border rounded-[2rem] bg-white shadow-2xl shadow-slate-300/50 overflow-hidden"
          >
            <div className="grid lg:grid-cols-12">
              {/* visual + headline */}
              <div className="relative lg:col-span-5 min-h-[320px] lg:min-h-full overflow-hidden">
                <motion.img key={f.image} src={f.image} alt={f.name} initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease }} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                <div className="absolute top-5 left-5 flex gap-2 flex-wrap">
                  <span className="text-[10px] font-bold tracking-[2px] px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white border border-white/20 uppercase">{f.environment}</span>
                </div>
                <span className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg" style={{ color: f.accent }}>
                  <Icon size={21} />
                </span>
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold leading-tight">{f.name}</h3>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">{f.tagline}</p>
                  <div className="mt-5 flex items-center gap-4 flex-wrap">
                    <span className="text-3xl font-semibold text-[#cca462]" style={{ fontFamily: 'var(--font-hype)' }}>{inr(f.price)}</span>
                    {f.rating && (
                      <span className="flex items-center gap-1 text-sm">
                        <Star size={15} className="fill-amber-400 text-amber-400" />
                        <strong>{f.rating}</strong>
                        <span className="text-white/60">({f.reviewCount?.toLocaleString('en-IN')})</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* full spec sheet */}
              <div className="lg:col-span-7 p-6 sm:p-10">
                <p className="text-slate-600 leading-relaxed">{f.description}</p>

                <h4 className="mt-8 mb-4 text-[11px] font-bold tracking-[3px] uppercase" style={{ color: f.accent }}>Specification</h4>
                <dl className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                  {SPEC_ROWS.map(({ key, label, icon: RowIcon }, i) => (
                    <motion.div key={key} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }} className="flex items-start gap-4 px-5 py-4 bg-white even:bg-slate-50/70">
                      <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${f.accent}14`, color: f.accent }}>
                        <RowIcon size={17} />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
                        <dd className="text-sm font-semibold text-slate-900 mt-0.5">{f.specs[key]}</dd>
                      </div>
                    </motion.div>
                  ))}
                </dl>

                <h4 className="mt-8 mb-4 text-[11px] font-bold tracking-[3px] uppercase" style={{ color: f.accent }}>Key features</h4>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {f.features.map((feat, i) => (
                    <motion.li key={feat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }} className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug">
                      <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0" style={{ color: f.accent }} />
                      {feat}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl p-4 bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 flex-shrink-0" style={{ color: f.accent }} />
                    <div>
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Best for</span>
                      <span className="text-sm font-medium text-slate-800 leading-snug">{f.idealFor}</span>
                    </div>
                  </div>
                  <div className="rounded-2xl p-4 bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <ShieldCheck size={18} className="mt-0.5 flex-shrink-0" style={{ color: f.accent }} />
                    <div>
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Warranty</span>
                      <span className="text-sm font-medium text-slate-800">{f.warranty}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {f.inShop ? (
                    <Link href="/collections#studio" className="px-7 py-3.5 rounded-full text-white text-xs font-bold uppercase tracking-[1.5px] no-underline flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-transform" style={{ background: f.accent }}>
                      Shop This Fabric <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <Link href="/contact" className="px-7 py-3.5 rounded-full text-white text-xs font-bold uppercase tracking-[1.5px] no-underline flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-transform" style={{ background: f.accent }}>
                      Enquire For Reveal Drapes <ArrowRight size={14} />
                    </Link>
                  )}
                  <button onClick={onEnquiry} className="px-7 py-3.5 rounded-full border-2 border-slate-300 hover:border-slate-950 text-slate-900 text-xs font-bold uppercase tracking-[1.5px] transition-colors cursor-pointer">
                    Order Swatch
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <Comparison activeId={f.id} onPick={(id) => setIdx(FABRIC_SHEETS.findIndex((s) => s.id === id))} />
      </div>
    </section>
  );
}

function Comparison({ activeId, onPick }: { activeId: string; onPick: (id: string) => void }) {
  const rows: { label: string; icon: React.ElementType; get: (f: (typeof FABRIC_SHEETS)[number]) => string }[] = [
    { label: 'Best environment', icon: MapPin, get: (f) => f.environment },
    { label: 'Material', icon: Shirt, get: (f) => f.specs.material },
    { label: 'Weather protection', icon: Waves, get: (f) => f.specs.waterResistance },
    { label: 'Breathability', icon: Wind, get: (f) => f.specs.breathability },
    { label: 'Lining', icon: Layers, get: (f) => f.specs.lining },
    { label: 'Fit', icon: Expand, get: (f) => f.specs.stretch },
    { label: 'Warranty', icon: Clock, get: (f) => f.warranty },
    { label: 'Starting price', icon: Gauge, get: (f) => inr(f.price) },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease }} className="mt-16 sm:mt-24">
      <h3 className="text-center uppercase text-slate-950 mb-8" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(20px, 2.6vw, 30px)' }}>
        <WordReveal text="Compare All Fabrics" />
      </h3>
      <div className="grad-border rounded-3xl bg-white shadow-xl overflow-hidden">
        <div className="overflow-x-auto" data-lenis-prevent>
          <table className="w-full min-w-[960px] text-sm border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-white p-4 text-left w-44" />
                {FABRIC_SHEETS.map((f) => {
                  const on = f.id === activeId;
                  const I = f.icon;
                  return (
                    <th key={f.id} className="p-3 align-bottom">
                      <button onClick={() => onPick(f.id)} className={`w-full rounded-2xl p-3 text-center transition-all cursor-pointer ${on ? 'text-white shadow-lg' : 'bg-slate-50 hover:bg-slate-100 text-slate-900'}`} style={on ? { background: f.accent } : undefined}>
                        <I size={20} className="mx-auto mb-1.5" style={on ? undefined : { color: f.accent }} />
                        <span className="block text-xs font-bold leading-tight">{f.short}</span>
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ label, icon: RI, get }) => (
                <tr key={label} className="border-t border-slate-100">
                  <th className="sticky left-0 z-10 bg-white p-4 text-left align-top">
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <RI size={14} className="text-[#00665e]" /> {label}
                    </span>
                  </th>
                  {FABRIC_SHEETS.map((f) => (
                    <td key={f.id} className={`p-4 align-top text-[13px] leading-snug transition-colors ${f.id === activeId ? 'bg-[#00665e]/5 font-semibold text-slate-900' : 'text-slate-600'} ${label === 'Starting price' ? 'font-bold text-slate-950 text-base' : ''}`}>
                      {get(f)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    <section id="process" className="relative py-24 sm:py-32 bg-white scroll-mt-20">
      <div className="container-am max-w-7xl">
        <SectionHead kicker="THE PROCESS" title="From Scan To Your Doorstep" sub="Six precise steps. Nothing is off the shelf." />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-32">
              <div className="glow-border relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#0e2220] to-[#050808] p-8 shadow-2xl shadow-[#00665e]/25">
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
            <motion.div className="absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-[3px] rounded bg-gradient-to-b from-[#00665e] to-[#cca462] origin-top" style={{ scaleY: progress }} />
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
      <span className={`absolute -left-10 sm:-left-14 top-6 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500 ring-4 ring-white ${active ? 'bg-[#00665e] text-white scale-110 shadow-lg shadow-[#00665e]/40' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
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
            <span className="inline-block mt-4 text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full bg-[#00665e]/10 text-[#00665e]">{step.tag}</span>
          </div>
        </div>
        <div className="lg:hidden mt-5 rounded-2xl bg-gradient-to-br from-[#0e2220] to-[#050808] p-3">
          <ProcessIllustration index={index} className="w-full" />
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------- materials */

function Materials() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#050808] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(0,102,94,0.4),transparent_55%),radial-gradient(ellipse_at_90%_100%,rgba(204,164,98,0.16),transparent_55%)]" />
      <div className="container-am max-w-7xl relative">
        <SectionHead light kicker="WHAT WE USE" title="Materials Engineered For India" sub="Each material has one job and is tested against Indian heat, rain and dust." />
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
                className="group grad-border grad-border-light relative rounded-3xl p-7 bg-white/[0.04] overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-55 transition-opacity duration-500" style={{ background: m.color }} />
                <span className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" style={{ background: `${m.color}26`, color: m.color }}>
                  <Icon size={26} />
                </span>
                <h3 className="relative text-lg font-bold">{m.name}</h3>
                <p className="relative text-sm text-white/55 mt-1.5 min-h-[40px]">{m.use}</p>
                <div className="relative mt-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white/45 uppercase tracking-wider">{m.metric}</span>
                    <span className="font-semibold" style={{ color: m.color }}>{m.label}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
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
    <section className="py-24 sm:py-32 bg-[#f4f7f6]">
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
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: index * 0.1, ease }} className="grad-border grad-border-light rounded-3xl p-6 sm:p-8 bg-white/[0.05] text-center">
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto">
        <svg viewBox="0 0 130 130" className="w-full h-full -rotate-90">
          <circle cx="65" cy="65" r={R} fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="9" />
          <motion.circle cx="65" cy="65" r={R} fill="none" stroke={t.color} strokeWidth="9" strokeLinecap="round" strokeDasharray={C} initial={{ strokeDashoffset: C }} whileInView={{ strokeDashoffset: C * (1 - t.ring) }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 0.2 + index * 0.1, ease: 'easeOut' }} style={{ filter: `drop-shadow(0 0 8px ${t.color}88)` }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-semibold" style={{ fontFamily: 'var(--font-hype)' }}>
          <CountUp to={t.value} decimals={t.decimals} suffix={t.suffix} />
        </div>
      </div>
      <h3 className="mt-5 font-bold">{t.label}</h3>
      <p className="text-xs text-white/50 mt-1">{t.note}</p>
    </motion.div>
  );
}

function LabTests() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#050808] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,102,94,0.35),transparent_60%)]" />
      <div className="container-am max-w-6xl relative">
        <SectionHead light kicker="LABORATORY VALIDATED" title="Proven, Not Promised" sub="Every batch is tested before it becomes a cover." />
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
    <section className="py-20 sm:py-24 bg-[#f4f7f6] overflow-hidden">
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
          <FabricSpecs onEnquiry={openEnquiry} />
          <Process />
          <Materials />
          <LayerExplorer />
          <LabTests />
          <Machines />

          <section className="relative bg-gradient-to-br from-[#00665e] to-[#04312d] text-white py-20 sm:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(204,164,98,0.3),transparent_55%)]" />
            <div className="container-am max-w-4xl relative text-center">
              <h2 className="uppercase" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(24px, 3.6vw, 44px)' }}>
                <WordReveal text="Feel The Difference" />
              </h2>
              <p className="mt-4 text-white/75 font-light">Get a free swatch kit, or design your own cover now.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button onClick={openEnquiry} className="px-7 py-3.5 rounded-full bg-white text-[#00665e] text-xs font-bold uppercase tracking-[1.5px] hover:bg-emerald-50 transition-colors cursor-pointer shadow-lg">
                  Request Free Swatch Kit
                </button>
                <Link href="/collections" className={btnGlass + ' no-underline inline-flex items-center gap-2'}>
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
