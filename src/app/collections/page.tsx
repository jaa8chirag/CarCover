'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const GALLERY = [
  '/images/cover_hero.jpg', '/images/cover_monsoon.jpg', '/images/reveal.jpg', '/images/cover_install_1.jpg',
  '/images/outdoor.jpg', '/images/cover_install_3.jpg', '/images/cover_heatshield.jpg', '/images/cover_velvet.jpg',
];

// The same photos as the home page hero slides on laptops
const HERO_SLIDES = [
  { src: '/images/bentley_street.jpg', pos: 'center 58%' },
  { src: '/images/unveil_gold_curtains.jpg', pos: 'center 62%' },
  { src: '/images/rr_spirit_rotated.jpg', pos: 'center 50%' },
  { src: '/images/bentley_badge_rain.jpg', pos: 'center 28%' },
];

const ease = [0.16, 1, 0.3, 1] as const;
const heading = { fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(26px, 3.6vw, 46px)', lineHeight: 1.08 } as const;

/** Slow endless strip of rounded photos at alternating heights. */
function GalleryStrip() {
  const loop = [...GALLERY, ...GALLERY];
  return (
    <div className="gallery-strip overflow-hidden py-4" style={{ maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)' }}>
      <style>{`
        @keyframes gal-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .gallery-strip { touch-action: pan-y; }
        @media (hover: hover) and (pointer: fine) { .gallery-strip:hover .gal-track { animation-play-state: paused; } }
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

export default function CollectionsPage() {
  return (
    <PageShell>
      {() => (
        <>
          {/* HERO: photo, dark wash, small label and one large light heading */}
          <section className="relative overflow-hidden bg-black text-white h-[clamp(420px,76vh,768px)] mt-[var(--header-height)]">
            <HeroSlides />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="block text-[11px] sm:text-xs tracking-[6px] uppercase text-white/70 mb-5">
                Collections
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease }} style={{ fontFamily: 'var(--font-hype)', fontWeight: 300, fontSize: 'clamp(34px, 6vw, 84px)', lineHeight: 1.05 }}>
                See It For Yourself
              </motion.h1>
            </div>
          </section>

          {/* IN THE WILD */}
          <section className="py-24 sm:py-32 bg-black text-white overflow-hidden">
            <div className="container-am max-w-7xl mb-10">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease }}>
                <span className="block text-[11px] font-bold tracking-[4px] uppercase text-[#cca462] mb-3">In The Wild</span>
                <h2 className="uppercase" style={heading}>Covered, Not Compromised</h2>
              </motion.div>
            </div>
            <GalleryStrip />
          </section>
        </>
      )}
    </PageShell>
  );
}
