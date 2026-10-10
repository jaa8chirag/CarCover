'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const GALLERY = [
  '/images/cover_hero.jpg', '/images/cover_monsoon.jpg', '/images/reveal.jpg', '/images/cover_install_1.jpg',
  '/images/outdoor.jpg', '/images/cover_install_3.jpg', '/images/cover_heatshield.jpg', '/images/cover_velvet.jpg',
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

export default function CollectionsPage() {
  return (
    <PageShell>
      {() => (
        <>
          {/* HERO: photo, dark wash, small label and one large light heading */}
          <section className="relative overflow-hidden bg-black text-white h-[clamp(420px,76vh,768px)] mt-[var(--header-height)]">
            <img src="/images/lambo_aventador_j.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 62%' }} />
            <div className="absolute inset-0 bg-black/55" />
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
