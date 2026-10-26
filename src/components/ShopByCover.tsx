'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Star, Check, Sparkles } from 'lucide-react';
import { FABRICS, PRICE_NOTE, type Fabric } from '@/data/fabrics';
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
            alt={`${f.title} car cover`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />
          <span aria-hidden className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[450%] transition-all duration-[1200ms] ease-out" />
          <span aria-hidden className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15 group-hover:ring-[#cca462]/70 transition-all duration-500" />

          {/* top row */}
          <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-start justify-between gap-2" style={{ transform: 'translateZ(30px)' }}>
            <span className="text-[9.5px] sm:text-[10px] font-bold tracking-[1.5px] sm:tracking-[2px] uppercase px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/90 text-black">{f.badge}</span>
            {f.bestseller && (
              <span className="text-[9.5px] sm:text-[10px] font-bold tracking-[1.5px] sm:tracking-[2px] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gradient-to-r from-[#cca462] to-[#f6e3b4] text-black shadow-lg">BESTSELLER</span>
            )}
          </div>

          {/* bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-5 xl:p-6 text-white" style={{ transform: 'translateZ(40px)' }}>
            {f.rating && (
              <div className="flex items-center gap-1.5 text-xs mb-2.5">
                <Star size={13} className="fill-[#f6c453] text-[#f6c453]" />
                <strong>{f.rating}</strong>
                <span className="text-white/60">({f.reviewCount?.toLocaleString('en-IN')})</span>
              </div>
            )}
            <h3 className="uppercase font-bold tracking-wide leading-tight" style={{ fontSize: wide ? 'clamp(20px, 2vw, 28px)' : 'clamp(16px, 1.35vw, 22px)' }}>{f.title}</h3>
            <p className="mt-1 text-xs sm:text-sm text-white/70 line-clamp-1">{f.subtitle}</p>

            {/* specs slide up on hover (always visible on touch) */}
            <ul className="mt-4 space-y-1.5 max-h-0 opacity-0 overflow-hidden group-hover:max-h-32 group-hover:opacity-100 max-md:hidden transition-all duration-500">
              {f.specs.slice(0, 2).map((s) => (
                <li key={s} className="flex items-start gap-2 text-[12px] text-white/85 leading-snug">
                  <Check size={13} className="mt-0.5 flex-shrink-0 text-[#cca462]" /> {s}
                </li>
              ))}
            </ul>

            <div className="mt-4 sm:mt-5 flex items-center justify-between gap-2">
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] text-white/55">Starting from</span>
                <span className="text-xl sm:text-2xl font-semibold" style={{ fontFamily: 'var(--font-hype)' }}>₹{f.price.toLocaleString('en-IN')}</span>
                <span className="block text-[10.5px] sm:text-[11px] text-white/55 mt-0.5">{PRICE_NOTE}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 pl-3.5 sm:pl-4 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full bg-white text-black text-[10px] sm:text-[11px] font-bold uppercase tracking-[1.5px] sm:tracking-[2px] group-hover:bg-[#cca462] transition-colors duration-500 whitespace-nowrap">
                Shop
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                  <ArrowRight size={13} />
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
  const outdoorCovers = FABRICS.filter((f) => f.group === 'outdoor');
  const outdoorSignature = FABRICS.find((f) => f.id === 'outdoor-signature');
  const indoor = FABRICS.filter((f) => f.group === 'indoor');
  const custom = FABRICS.filter((f) => f.group === 'custom');
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
        <MobileSlider wrapperClass="mb-8 sm:mb-10" desktopClass="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 lg:gap-6">
          {outdoorCovers.map((f, i) => (
            <CoverCard key={f.id} f={f} i={i} />
          ))}
        </MobileSlider>

        {outdoorSignature && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease }}
            className="mb-16 sm:mb-20"
          >
            <div className="relative rounded-[2.5rem] p-[2px] bg-gradient-to-r from-[#cca462] via-[#ffe5a3] to-[#b38848] shadow-[0_25px_80px_-20px_rgba(204,164,98,0.45)] hover:shadow-[0_35px_100px_-20px_rgba(204,164,98,0.65)] transition-all duration-700">
              <div className="group rounded-[2.4rem] bg-[#0c0e14] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#cca462]/10 rounded-full blur-[110px] pointer-events-none" />
                <div className="grid lg:grid-cols-12 items-stretch">
                  <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[400px] overflow-hidden bg-slate-950">
                    <img
                      src={outdoorSignature.image}
                      alt={`${outdoorSignature.title} car cover`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:via-[#0c0e14]/25 lg:to-[#0c0e14]" />
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

                  <div className="lg:col-span-5 p-7 sm:p-9 lg:p-10 flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-2 text-[#cca462] text-[11px] font-bold tracking-[3px] uppercase mb-2">
                        <span>Pinnacle Edition</span>
                        <span className="h-px w-8 bg-[#cca462]/60" />
                      </div>
                      <h3 className="text-white text-2xl sm:text-3xl font-semibold tracking-wide uppercase leading-tight" style={{ fontFamily: 'var(--font-hype)' }}>
                        {outdoorSignature.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#f6e3b4] font-medium">{outdoorSignature.subtitle}</p>
                      <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed">{outdoorSignature.description}</p>

                      <div className="mt-5 space-y-2">
                        {outdoorSignature.specs.slice(0, 4).map((s) => (
                          <div key={s} className="flex items-start gap-2.5 text-[12.5px] text-slate-200 leading-snug">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-[#cca462]/20 border border-[#cca462]/60 flex items-center justify-center flex-shrink-0">
                              <Check size={10} className="text-[#cca462]" />
                            </span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[2px] text-[#cca462]">Starting from</span>
                        <span className="text-3xl font-semibold text-white" style={{ fontFamily: 'var(--font-hype)' }}>
                          ₹{outdoorSignature.price.toLocaleString('en-IN')}
                        </span>
                        <span className="block text-[11px] text-slate-400 mt-0.5">{PRICE_NOTE}</span>
                      </div>
                      <Link
                        href={`/shop/${outdoorSignature.id}`}
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#cca462] to-[#f6e3b4] hover:brightness-110 text-black text-xs font-bold uppercase tracking-[2px] transition-all no-underline shadow-[0_12px_28px_-6px_rgba(204,164,98,0.5)] whitespace-nowrap"
                      >
                        <span>Choose Signature</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <GroupHead label="Indoor Covers" text="Showroom finish for garage and basement" />
        <MobileSlider wrapperClass="mb-16 sm:mb-20" desktopClass="md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
          {indoor.map((f, i) => (
            <CoverCard key={f.id} f={f} i={i} wide />
          ))}
        </MobileSlider>

        <GroupHead label="Bespoke Covers" text="Printed, monogrammed or branded. Made for one car only" />
        <MobileSlider wrapperClass="mb-16 sm:mb-20" desktopClass="md:grid md:grid-cols-1 md:max-w-sm md:mx-auto md:gap-6 lg:gap-8">
          {custom.map((f, i) => (
            <CoverCard key={f.id} f={f} i={i} />
          ))}
        </MobileSlider>

        <GroupHead label="Unveiling Covers" text="Reveal-night covers for launches and showrooms" />
        <MobileSlider desktopClass="md:grid md:grid-cols-1 md:max-w-sm md:mx-auto md:gap-6 lg:gap-8">
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

