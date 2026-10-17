'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// The same photos as the home page hero slides on laptops
const HERO_SLIDES = [
  { src: '/images/bentley_street.jpg', pos: 'center 58%' },
  { src: '/images/unveil_gold_curtains.jpg', pos: 'center 62%' },
  { src: '/images/rr_spirit_rotated.jpg', pos: 'center 50%' },
  { src: '/images/bentley_badge_rain.jpg', pos: 'center 28%' },
];

const ease = [0.16, 1, 0.3, 1] as const;

/** Hero photos that cross-fade on a timer. */
function HeroSlides() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      {HERO_SLIDES.map((sl, k) => (
        <img
          key={sl.src}
          src={sl.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: sl.pos, opacity: k === i ? 1 : 0, transform: k === i ? 'scale(1.05)' : 'scale(1)', transition: 'opacity 1600ms ease-in-out, transform 7000ms ease-out' }}
        />
      ))}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {HERO_SLIDES.map((_, k) => (
          <button key={k} aria-label={`Photo ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full cursor-pointer transition-all duration-500 ${k === i ? 'w-7 bg-white' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
    </>
  );
}

/** Page opener: the home hero photos cross-fading under a small label and one large light heading. */
export default function SlideHero({ kicker, title, offsetHeader = true }: { kicker: string; title: string; offsetHeader?: boolean }) {
  return (
    <section className={`relative overflow-hidden bg-black text-white h-[clamp(420px,76vh,768px)] ${offsetHeader ? 'mt-[var(--header-height)]' : ''}`}>
      <HeroSlides />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="block text-[11px] sm:text-xs tracking-[6px] uppercase text-white/70 mb-5">
          {kicker}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease }} style={{ fontFamily: 'var(--font-hype)', fontWeight: 300, fontSize: 'clamp(34px, 6vw, 84px)', lineHeight: 1.05 }}>
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
