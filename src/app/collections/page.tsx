'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Ruler, Warehouse, Car, Rocket, Wrench, Palette, Truck, ShieldCheck, RefreshCcw, BadgeCheck } from 'lucide-react';
import PageShell from '@/components/PageShell';
import { FABRICS, type Fabric } from '@/data/fabrics';
import { CAR_BRANDS, FAQS } from '@/data/carData';

const TRUST = [
  { icon: Truck, title: 'Free Delivery', text: 'Pan-India, insured' },
  { icon: ShieldCheck, title: '100% Fit Guarantee', text: 'Remade free if it does not fit' },
  { icon: RefreshCcw, title: '7-Day Returns', text: 'On unused covers' },
  { icon: BadgeCheck, title: '3–5 Year Warranty', text: 'Fabric and stitching' },
];

const OFFERS = [
  { icon: Ruler, title: 'Tailored Body Protection', text: 'CAD-patterned to your exact model, mirrors and spoilers.' },
  { icon: Car, title: 'Driving Covers', text: 'Light covers for track days, shows and short stops.' },
  { icon: Wrench, title: 'Workshop Covers', text: 'Durable covers for garages, service bays and detailers.' },
  { icon: Warehouse, title: 'Collections & Showrooms', text: 'Matching sets for showrooms, museums and fleets.' },
  { icon: Rocket, title: 'Reveal & Launch Covers', text: 'Dramatic unveil covers with custom branding.' },
  { icon: Palette, title: 'Custom Colour & Monogram', text: 'Contrast piping and embroidered monograms.' },
];

const GALLERY = [
  '/images/cover_hero.jpg', '/images/cover_monsoon.jpg', '/images/reveal.jpg', '/images/cover_install_1.jpg',
  '/images/outdoor.jpg', '/images/cover_install_3.jpg', '/images/cover_heatshield.jpg', '/images/cover_velvet.jpg',
];

const ease = [0.16, 1, 0.3, 1] as const;
const heading = { fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(26px, 3.6vw, 46px)', lineHeight: 1.08 } as const;

/** Fades and lifts into view. */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Card that tilts toward the cursor in 3D with a moving light glare. */
function Tilt({ children, className = '', max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glare = useTransform([sx, sy], ([x, y]) => `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.28), transparent 55%)`);
  const [hover, setHover] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => { setHover(false); px.set(0.5); py.set(0.5); }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full"
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{ background: glare, opacity: hover ? 1 : 0, mixBlendMode: 'soft-light' }}
        />
      </motion.div>
    </div>
  );
}

function SectionHead({ kicker, title, lead, center }: { kicker: string; title: string; lead?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-12 sm:mb-16 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <span className="block text-[11px] font-bold tracking-[4px] uppercase text-[#b38848] mb-3">{kicker}</span>
      <h2 className="uppercase text-black" style={heading}>{title}</h2>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3, ease }} style={{ transformOrigin: center ? 'center' : 'left' }} className={`mt-5 h-[2px] w-20 bg-gradient-to-r from-[#b38848] to-transparent ${center ? 'mx-auto' : ''}`} />
      {lead && <p className="mt-5 text-slate-600 leading-relaxed">{lead}</p>}
    </Reveal>
  );
}

function ProductCard({ f, i, onSelect }: { f: Fabric; i: number; onSelect: (id: string) => void }) {
  return (
    <Reveal delay={i * 0.12} className="h-full">
      <Tilt className="h-full">
        <article
          onClick={() => onSelect(f.id)}
          className="group cursor-pointer h-full flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.45)] transition-shadow duration-500"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-900" style={{ transform: 'translateZ(0)' }}>
            <img src={f.image} alt={f.title} className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* sweeping shine */}
            <span aria-hidden className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[420%] transition-all duration-[1100ms] ease-out" />
            {f.bestseller && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-[#cca462] to-[#f6e3b4] text-black text-[10px] font-bold tracking-[2px] px-4 py-2 rounded-full shadow-lg">BESTSELLER</span>
            )}
            <span className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[2.5px] uppercase px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 border border-white/20" style={{ transform: 'translateZ(40px)' }}>
              {f.group}
            </span>
          </div>
          <div className="p-7 flex flex-col flex-1">
            <h3 className="uppercase text-black font-bold tracking-wide leading-snug">{f.title}</h3>
            <p className="mt-1 text-xs text-slate-500">{f.subtitle}</p>
            <ul className="mt-5 space-y-2.5 flex-1">
              {f.specs.slice(0, 3).map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-[13px] text-slate-700 leading-snug">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-[#b38848]/15 flex items-center justify-center flex-shrink-0"><Check size={10} className="text-[#b38848]" /></span>
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-7 pt-5 border-t border-slate-200 flex items-end justify-between">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[2px] text-slate-400">Starting from</span>
                <span className="text-2xl font-semibold text-black" style={{ fontFamily: 'var(--font-hype)' }}>₹{f.price.toLocaleString('en-IN')}</span>
              </div>
              <span className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#b38848] group-hover:rotate-[-45deg] transition-all duration-500" style={{ transform: 'translateZ(30px)' }}>
                <ArrowRight size={18} />
              </span>
            </div>
          </div>
        </article>
      </Tilt>
    </Reveal>
  );
}

/** Slow endless strip of rounded photos at alternating heights. */
function GalleryStrip() {
  const loop = [...GALLERY, ...GALLERY];
  return (
    <div className="gallery-strip overflow-hidden py-4" style={{ maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)' }}>
      <style>{`
        @keyframes gal-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .gallery-strip:hover .gal-track { animation-play-state: paused; }
      `}</style>
      <div className="gal-track flex items-center gap-5 w-max" style={{ animation: 'gal-scroll 70s linear infinite' }}>
        {loop.map((src, i) => (
          <div
            key={i}
            className={`group relative flex-shrink-0 w-[70vw] sm:w-[34vw] lg:w-[26vw] overflow-hidden rounded-[2rem] border border-white/10 ${i % 2 ? 'aspect-[4/3] translate-y-6' : 'aspect-[4/5] -translate-y-2'}`}
          >
            <img src={src} alt="Bespoke covered car" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Orb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full blur-[110px] pointer-events-none ${className}`}
      animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

export default function CollectionsPage() {
  const router = useRouter();
  const [subscribed, setSubscribed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const modelCount = CAR_BRANDS.reduce((n, b) => n + b.models.length, 0);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const outdoor = FABRICS.filter((f) => f.group === 'outdoor');
  const indoor = FABRICS.filter((f) => f.group === 'indoor');
  const unveiling = FABRICS.filter((f) => f.group === 'unveiling');

  const chooseFabric = (id: string) => {
    router.push(`/shop?fabric=${id}`);
  };

  return (
    <PageShell>
      {({ openEnquiry }) => (
        <>
          {/* HERO: looping film, parallax and floating light */}
          <section ref={heroRef} className="relative bg-black text-white pt-40 sm:pt-52 pb-36 sm:pb-44 overflow-hidden rounded-b-[3rem]">
            <motion.div style={{ y: heroY }} className="absolute inset-0">
              <video className="w-full h-[125%] object-cover opacity-60" src="/videos/hero_cover_install.mp4" poster="/images/reveal.jpg" autoPlay muted loop playsInline />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />
            <Orb className="w-[520px] h-[520px] -top-32 -right-24 bg-[#cca462]/25" />
            <Orb className="w-[420px] h-[420px] bottom-0 -left-24 bg-[#cca462]/15" delay={4} />

            <motion.div style={{ opacity: heroFade }} className="container-am max-w-6xl relative">
              <motion.span initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease }} className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[5px] uppercase text-[#cca462] mb-6">
                <span className="w-10 h-px bg-[#cca462]" /> The Collection
              </motion.span>
              <h1 className="uppercase max-w-4xl" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(24px, min(8vw, 9.4vh), 88px)', lineHeight: 1.02 }}>
                {['Unparalleled', 'Protection'].map((w, i) => (
                  <span key={w} className="block overflow-hidden pb-[0.1em]">
                    <motion.span className="block" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, delay: 0.2 + i * 0.15, ease }}>
                      {w}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }} className="mt-7 max-w-xl text-white/75 font-light text-base sm:text-lg leading-relaxed">
                Bespoke, CAD-tailored covers for {modelCount}+ cars on Indian roads. Eight covers, made to measure and delivered free across India.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9 }} className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
                <span className="text-[11px] uppercase tracking-[3px] text-white/50 mr-2">Jump to</span>
                {[['outdoor', 'Outdoor Covers'], ['indoor', 'Indoor Covers'], ['unveiling', 'Unveiling Covers'], ['bespoke', 'Bespoke Covers']].map(([id, label]) => (
                  <a key={id} href={`#${id}`} className="px-6 py-3 rounded-full border border-white/35 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black text-xs font-bold uppercase tracking-[2px] no-underline text-white transition-all hover:-translate-y-0.5">
                    {label}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            <motion.a href="#outdoor" aria-label="Scroll down" className="hidden sm:flex absolute left-1/2 -translate-x-1/2 bottom-28 w-11 h-16 rounded-full border border-white/40 justify-center pt-3 no-underline" >
              <motion.span className="w-1.5 h-3 rounded-full bg-[#cca462]" animate={{ y: [0, 18, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            </motion.a>
          </section>

          {/* TRUST: floating glass card over the hero edge */}
          <section className="relative z-10 -mt-16 px-4">
            <Reveal className="container-am max-w-6xl">
              <div className="rounded-[2rem] bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] border border-slate-100 p-4 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-5 sm:gap-6">
                {TRUST.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="group flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                    <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black text-[#cca462] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                      <Icon size={21} />
                    </span>
                    <div>
                      <span className="block text-[13px] sm:text-sm font-bold text-black leading-tight">{title}</span>
                      <span className="block text-xs text-slate-500">{text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* OUTDOOR */}
          <section id="outdoor" className="relative py-24 sm:py-32 bg-white scroll-mt-20 overflow-hidden">
            <Orb className="w-[420px] h-[420px] top-10 -right-32 bg-[#cca462]/10" />
            <div className="container-am max-w-7xl relative">
              <SectionHead kicker="Outdoor Covers" title="Built For The Elements" lead="Monsoon, desert sun or off-road trails. Choose the fabric that matches where your car actually lives." />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {outdoor.map((f, i) => (
                  <ProductCard key={f.id} f={f} i={i} onSelect={chooseFabric} />
                ))}
              </div>
            </div>
          </section>

          {/* INDOOR */}
          <section id="indoor" className="relative py-24 sm:py-32 bg-[#f3f1ed] scroll-mt-20 rounded-[3rem] overflow-hidden">
            <Orb className="w-[420px] h-[420px] -bottom-24 -left-24 bg-[#cca462]/15" delay={3} />
            <div className="container-am max-w-7xl relative">
              <SectionHead kicker="Indoor Covers" title="Showroom Finish, Garage Safe" lead="Soft, breathable covers that keep dust and scratches off your car while it rests indoors." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                {indoor.map((f, i) => (
                  <ProductCard key={f.id} f={f} i={i} onSelect={chooseFabric} />
                ))}
              </div>
            </div>
          </section>

          {/* UNVEILING */}
          <section id="unveiling" className="relative py-24 sm:py-32 bg-white scroll-mt-20 overflow-hidden">
            <Orb className="w-[420px] h-[420px] top-10 -left-32 bg-[#cca462]/10" delay={2} />
            <div className="container-am max-w-7xl relative">
              <SectionHead kicker="Unveiling Covers" title="Made For The Big Reveal" lead="Launch nights, showroom reveals and private handovers. Pick a finish, add your branding and make the moment unforgettable." />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {unveiling.map((f, i) => (
                  <ProductCard key={f.id} f={f} i={i} onSelect={chooseFabric} />
                ))}
              </div>
            </div>
          </section>

          {/* GALLERY */}
          <section className="py-24 sm:py-32 bg-black text-white overflow-hidden">
            <div className="container-am max-w-7xl mb-10">
              <Reveal>
                <span className="block text-[11px] font-bold tracking-[4px] uppercase text-[#cca462] mb-3">In The Wild</span>
                <h2 className="uppercase" style={heading}>Covered, Not Compromised</h2>
              </Reveal>
            </div>
            <GalleryStrip />
          </section>

          {/* BESPOKE */}
          <section id="bespoke" className="py-24 sm:py-32 bg-white scroll-mt-20">
            <div className="container-am max-w-7xl">
              <SectionHead kicker="Bespoke Covers" title="Made For One Car Only" lead="Custom printed, monogrammed or branded. Priced on application, since every pattern is cut to order." />
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { title: 'Custom Printed Cover', text: 'Your artwork, livery or branding printed edge to edge on premium stretch fabric.', image: '/images/cover_install_2.jpg' },
                  { title: 'Monogram & Piping Cover', text: 'Contrast piping, embroidered monogram and your choice of colours on any of our fabrics.', image: '/images/cover_install_3.jpg' },
                ].map((b, i) => (
                  <Reveal key={b.title} delay={i * 0.12}>
                    <Tilt max={5}>
                      <a href="/contact" className="group relative block aspect-[16/10] overflow-hidden rounded-[2rem] bg-black no-underline">
                        <img src={b.image} alt={b.title} className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-65 group-hover:scale-110 transition-all duration-[1400ms]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <span aria-hidden className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15 group-hover:ring-[#cca462]/60 transition-all duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9 text-white" style={{ transform: 'translateZ(30px)' }}>
                          <h3 className="uppercase font-bold text-xl sm:text-2xl">{b.title}</h3>
                          <p className="mt-2 text-sm text-white/75 max-w-md">{b.text}</p>
                          <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-[#cca462]">
                            Price on application <ArrowRight size={15} className="group-hover:translate-x-2 transition-transform" />
                          </span>
                        </div>
                      </a>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT WE OFFER */}
          <section className="py-24 sm:py-32 bg-white">
            <div className="container-am max-w-7xl">
              <SectionHead center kicker="What We Offer" title="A Cover For Every Need" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {OFFERS.map(({ icon: Icon, title, text }, i) => (
                  <Reveal key={title} delay={(i % 3) * 0.1}>
                    <div className="group relative h-full rounded-[2rem] p-8 bg-[#f7f5f1] overflow-hidden hover:bg-black transition-colors duration-500 hover:-translate-y-2 hover:shadow-2xl">
                      <span aria-hidden className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#cca462]/0 group-hover:bg-[#cca462]/20 blur-2xl transition-all duration-700" />
                      <span className="relative w-14 h-14 rounded-2xl bg-black group-hover:bg-[#cca462] text-[#cca462] group-hover:text-black flex items-center justify-center transition-colors duration-500 group-hover:rotate-[360deg] [transition-property:background,color,transform] duration-[900ms]">
                        <Icon size={24} />
                      </span>
                      <h3 className="relative mt-6 uppercase font-bold tracking-wide text-black group-hover:text-white transition-colors duration-500">{title}</h3>
                      <p className="relative mt-2 text-sm text-slate-600 group-hover:text-white/70 leading-relaxed transition-colors duration-500">{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-24 sm:py-32 bg-[#f3f1ed] rounded-t-[3rem]">
            <div className="container-am max-w-3xl">
              <SectionHead center kicker="Before You Buy" title="Frequently Asked" />
              <div className="space-y-3">
                {FAQS.map((f) => (
                  <details key={f.q} className="group rounded-3xl bg-white border border-transparent open:border-[#cca462]/40 open:shadow-xl transition-all">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-7 py-5 font-semibold text-black">
                      {f.q}
                      <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 group-open:rotate-180 group-open:bg-[#cca462] group-open:text-black transition-all duration-500">
                        <ChevronDown size={18} />
                      </span>
                    </summary>
                    <p className="px-7 pb-6 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* NEWSLETTER */}
          <section className="relative py-24 bg-black text-white overflow-hidden rounded-t-[3rem] -mt-10">
            <Orb className="w-[500px] h-[500px] left-1/2 -translate-x-1/2 -top-40 bg-[#cca462]/15" />
            <div className="container-am max-w-3xl text-center relative">
              <Reveal>
                <h2 className="uppercase" style={{ ...heading, fontSize: 'clamp(24px, 3vw, 38px)' }}>Join The Signature List</h2>
                <p className="mt-4 text-white/70 font-light">New fabrics, launch offers and care guides. Or <button onClick={openEnquiry} className="underline cursor-pointer text-[#cca462]">order a free swatch kit</button>.</p>
                {subscribed ? (
                  <p className="mt-8 text-[#cca462] font-semibold">Thank you, you are on the list.</p>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="mt-8 flex flex-col sm:flex-row gap-3 p-2 rounded-3xl sm:rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                    <input type="email" required placeholder="Your email address" className="flex-1 min-w-0 px-6 py-4 bg-transparent text-white placeholder:text-white/40 outline-none" />
                    <button type="submit" className="px-9 py-4 rounded-full bg-white hover:bg-[#cca462] text-black text-xs font-bold uppercase tracking-[2px] cursor-pointer transition-colors">Subscribe</button>
                  </form>
                )}
              </Reveal>
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
