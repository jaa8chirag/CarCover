'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  kicker: string;
  title: string;
  accent?: string;
  lead: string;
  image: string;
  stats?: { value: string; label: string }[];
  children?: React.ReactNode;
}

/** Cinematic full-bleed hero shared by every inner page, matching the home page mood. */
export default function PageHero({ kicker, title, accent, lead, image, stats, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#050808] text-white">
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-[#050808]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,102,94,0.35),transparent_60%)]" />

      <div className="container-am relative pt-40 sm:pt-52 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <span className="am-kicker">{kicker}</span>
          <h1
            className="uppercase text-white"
            style={{
              fontFamily: 'var(--font-hype)',
              fontWeight: 500,
              fontSize: 'clamp(30px, 5.4vw, 72px)',
              lineHeight: 1.08,
              letterSpacing: '-0.5px',
            }}
          >
            {title}
            {accent && (
              <>
                <br />
                <span style={{ color: '#cca462' }}>{accent}</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/75 font-light leading-relaxed">{lead}</p>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </motion.div>

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-md"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-black/35 px-5 py-5 sm:px-7 sm:py-6">
                <div className="text-2xl sm:text-3xl font-semibold text-white" style={{ fontFamily: 'var(--font-hype)' }}>
                  {s.value}
                </div>
                <div className="mt-1 text-[10px] sm:text-[11px] tracking-[2px] uppercase text-white/55">{s.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export const btnPrimary =
  'px-7 py-3.5 rounded-full bg-[#00665e] hover:bg-[#00796b] text-white text-xs font-bold uppercase tracking-[1.5px] transition-all cursor-pointer shadow-lg shadow-[#00665e]/30';
export const btnGlass =
  'px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md text-xs font-bold uppercase tracking-[1.5px] transition-all cursor-pointer';
