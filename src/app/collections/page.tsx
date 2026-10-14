'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';
import SlideHero from '@/components/SlideHero';

const GALLERY = [
  '/images/cover_showroom.jpg', '/images/cover_rr_garage_portrait.jpg', '/images/cover_rangerover.jpg', '/images/cover_landrover_portrait.jpg', '/images/cover_ferrari.jpg',
  '/images/outdoor.jpg', '/images/cover_mini.jpg', '/images/cover_heatshield.jpg', '/images/cover_bmw.jpg', '/images/cover_logo_horse.jpg',
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
            className={`group relative flex-shrink-0 w-[70vw] sm:w-[34vw] lg:w-[26vw] overflow-hidden rounded-[2rem] border border-white/10 aspect-[4/5] ${(i % GALLERY.length) % 2 ? 'translate-y-6' : '-translate-y-2'}`}
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
          <SlideHero kicker="Collections" title="See It For Yourself" />

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
