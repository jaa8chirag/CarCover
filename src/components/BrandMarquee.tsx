'use client';

import React from 'react';

import { ALL } from '@/data/brands';

function Row({ items }: { items: string[][] }) {
  const loop = [...items, ...items];
  const mask = 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)';
  return (
    <div className="brand-row overflow-hidden" style={{ maskImage: mask, WebkitMaskImage: mask }}>
      <div
        className="brand-track flex items-center w-max"
        style={{ animation: `brand-marquee ${items.length * 5}s linear infinite` }}
      >
        {loop.map(([name, file], i) => (
          <div key={i} className="brand-logo flex items-center justify-center mx-8 sm:mx-12 h-20 sm:h-28 w-36 sm:w-52 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/brands/${file}`} alt={name} title={name} loading="lazy" className="max-h-full max-w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** `flat` drops the rounded overlap with the section above, for pages where it sits under a plain hero. */
export default function BrandMarquee({ flat = false }: { flat?: boolean }) {
  return (
    <section className={`relative z-10 bg-[#efeae1] pb-10 sm:pb-14 overflow-hidden ${flat ? 'pt-12 sm:pt-16' : '-mt-12 rounded-t-[3rem] pt-16 sm:pt-20 shadow-[0_-30px_80px_-30px_rgba(0,0,0,0.55)]'}`}>
      <style>{`
        @keyframes brand-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .brand-row { touch-action: pan-y; -webkit-tap-highlight-color: transparent; }
        .brand-logo img { transition: transform .4s ease; -webkit-user-drag: none; user-select: none; }
        @media (hover: hover) and (pointer: fine) {
          .brand-row:hover .brand-track { animation-play-state: paused !important; }
          .brand-logo:hover img { transform: scale(1.12); }
        }
        @media (hover: none) { .brand-logo img { pointer-events: none; } }
      `}</style>
      <div className="text-center px-6 mb-8">
        <div className="mx-auto mb-5 h-px w-12 bg-[#cca462]" />
        <p className="text-[11px] font-semibold tracking-[5px] uppercase text-slate-500">Tailored For Every Marque</p>
        <h2 className="mt-4 text-2xl sm:text-4xl font-light tracking-tight text-slate-900">Luxury, Performance &amp; Indian Favourites</h2>
      </div>
      <Row items={ALL} />
    </section>
  );
}
