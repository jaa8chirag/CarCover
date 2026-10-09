'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Star, Check } from 'lucide-react';
import { FABRICS, type Fabric } from '@/data/fabrics';
import MobileSlider from '@/components/MobileSlider';

const ease = [0.16, 1, 0.3, 1] as const;

/** Card that leans toward the cursor in 3D with a moving glare. */
function Tilt({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 20 });
  const sy = useSpring(py, { stiffness: 180, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-6, 6]);
  const rotateX = useTransform(sy, [0, 1], [6, -6]);
  const glare = useTransform([sx, sy], ([x, y]) => `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.3), transparent 55%)`);
  const [hover, setHover] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  return (
    <div style={{ perspective: 1200 }} className={className}>
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

function CoverCard({ f, i, wide }: { f: Fabric; i: number; wide?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: i * 0.1, ease }}
      className="h-full"
    >
      <Tilt className="h-full">
        <Link
          href={`/collections#${f.group}`}
          className={`group relative block overflow-hidden rounded-[2rem] no-underline bg-black shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)] hover:shadow-[0_50px_100px_-35px_rgba(0,0,0,0.65)] transition-shadow duration-500 aspect-square`}
        >
          <img
            src={f.image}
            alt={f.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />
          <span aria-hidden className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[450%] transition-all duration-[1200ms] ease-out" />
          <span aria-hidden className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15 group-hover:ring-[#cca462]/70 transition-all duration-500" />

          {/* top row */}
          <div className="absolute top-5 left-5 right-5 flex items-start justify-between gap-3" style={{ transform: 'translateZ(30px)' }}>
            <span className="text-[10px] font-bold tracking-[2px] uppercase px-3.5 py-1.5 rounded-full bg-white/90 text-black">{f.badge}</span>
            {f.bestseller && (
              <span className="text-[10px] font-bold tracking-[2px] px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#cca462] to-[#f6e3b4] text-black shadow-lg">BESTSELLER</span>
            )}
          </div>

          {/* bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white" style={{ transform: 'translateZ(40px)' }}>
            {f.rating && (
              <div className="flex items-center gap-1.5 text-xs mb-2.5">
                <Star size={14} className="fill-[#f6c453] text-[#f6c453]" />
                <strong>{f.rating}</strong>
                <span className="text-white/60">({f.reviewCount?.toLocaleString('en-IN')})</span>
              </div>
            )}
            <h3 className="uppercase font-bold tracking-wide leading-tight" style={{ fontSize: wide ? 'clamp(20px, 2vw, 28px)' : 'clamp(18px, 1.6vw, 24px)' }}>{f.title}</h3>
            <p className="mt-1.5 text-sm text-white/70">{f.subtitle}</p>

            {/* specs slide up on hover (always visible on touch) */}
            <ul className="mt-4 space-y-1.5 max-h-0 opacity-0 overflow-hidden group-hover:max-h-32 group-hover:opacity-100 max-md:hidden transition-all duration-500">
              {f.specs.slice(0, 2).map((s) => (
                <li key={s} className="flex items-start gap-2 text-[12.5px] text-white/85 leading-snug">
                  <Check size={14} className="mt-0.5 flex-shrink-0 text-[#cca462]" /> {s}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <span className="block text-[10px] uppercase tracking-[2px] text-white/55">Starting from</span>
                <span className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-hype)' }}>₹{f.price.toLocaleString('en-IN')}</span>
              </div>
              <span className="inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-[2px] group-hover:bg-[#cca462] transition-colors duration-500">
                Shop
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                  <ArrowRight size={14} />
                </span>
              </span>
            </div>
          </div>
        </Link>
      </Tilt>
    </motion.div>
  );
}

function GroupHead({ label, text }: { label: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className="flex items-center gap-5 mb-7"
    >
      <h3 className="uppercase font-bold tracking-[3px] text-black text-sm sm:text-base whitespace-nowrap">{label}</h3>
      <span className="h-px flex-1 bg-gradient-to-r from-[#b38848]/60 to-transparent" />
      <span className="hidden sm:block text-sm text-slate-500">{text}</span>
    </motion.div>
  );
}

/** Light, colourful product section that breaks up the dark hero slides and gives shoppers a direct way in. */
export default function ShopByCover() {
  const outdoor = FABRICS.filter((f) => f.group === 'outdoor');
  const indoor = FABRICS.filter((f) => f.group === 'indoor');
  const unveiling = FABRICS.filter((f) => f.group === 'unveiling');

  return (
    <section className="relative bg-[#f8f6f1] pt-20 sm:pt-28 pb-20 sm:pb-28 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-[#cca462]/25 blur-[110px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-[#cca462]/15 blur-[110px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <div className="container-am max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-20"
        >
          <span className="block text-[11px] font-bold tracking-[4px] uppercase text-[#b38848] mb-3">Shop Car Covers</span>
          <h2 className="uppercase text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(24px, 3.6vw, 48px)', lineHeight: 1.1 }}>
            Find The Cover That Fits Your Life
          </h2>
          <div className="mx-auto mt-5 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#b38848] to-transparent" />
          <p className="mt-5 text-slate-600 leading-relaxed">Eight tailored covers. Pick the one that matches where your car lives, then we cut it to your exact model.</p>
        </motion.div>

        <GroupHead label="Outdoor Covers" text="Rain, sun and everything in between" />
        <MobileSlider desktopClass="md:grid md:grid-cols-3 md:gap-6 lg:gap-8 mb-16 sm:mb-20">
          {outdoor.map((f, i) => (
            <CoverCard key={f.id} f={f} i={i} />
          ))}
        </MobileSlider>

        <GroupHead label="Indoor Covers" text="Showroom finish for garage and basement" />
        <MobileSlider desktopClass="md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
          {indoor.map((f, i) => (
            <CoverCard key={f.id} f={f} i={i} wide />
          ))}
        </MobileSlider>

        <GroupHead label="Unveiling Covers" text="Reveal-night covers for launches and showrooms" />
        <MobileSlider desktopClass="md:grid md:grid-cols-3 md:gap-6 lg:gap-8 mt-16 sm:mt-20">
          {unveiling.map((f, i) => (
            <CoverCard key={f.id} f={f} i={i} />
          ))}
        </MobileSlider>

        <div className="text-center mt-14 sm:mt-16">
          <Link href="/shop" className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-black hover:bg-[#b38848] text-white text-xs font-bold uppercase tracking-[2.5px] no-underline transition-colors shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
            View All Covers <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

