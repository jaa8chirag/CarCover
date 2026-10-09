'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import PageShell from '@/components/PageShell';
import CoverStudio from '@/components/CoverStudio';
import { FABRICS } from '@/data/fabrics';

export default function ProductPage() {
  const params = useParams<{ fabric: string }>();
  const fabric = FABRICS.find((f) => f.id === params?.fabric);

  return (
    <PageShell>
      {({ addToCart }) => (
        <div className="bg-[#f3f1ed] pt-28 sm:pt-40 pb-24 min-h-screen">
          <div className="container-am max-w-7xl">
            <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-slate-500 hover:text-black no-underline mb-8">
              <ArrowLeft size={14} /> All covers
            </Link>

            {!fabric ? (
              <div className="py-24 text-center">
                <h1 className="text-2xl font-semibold text-black">We could not find that cover</h1>
                <Link href="/shop" className="mt-6 inline-block px-8 py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-[2px] no-underline">See all covers</Link>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center mb-14">
                  <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-slate-900 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.5)]">
                    <img src={fabric.image} alt={fabric.title} className="w-full h-full object-cover" />
                    {fabric.bestseller && (
                      <span className="absolute top-4 left-4 bg-gradient-to-r from-[#cca462] to-[#f6e3b4] text-black text-[10px] font-bold tracking-[2px] px-4 py-2 rounded-full shadow-lg">BESTSELLER</span>
                    )}
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold tracking-[4px] uppercase text-[#b38848] mb-3">{fabric.badge}</span>
                    <h1 className="uppercase text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.08 }}>{fabric.title}</h1>
                    <p className="mt-2 text-slate-500">{fabric.subtitle}</p>
                    <p className="mt-5 text-slate-700 leading-relaxed">{fabric.description}</p>
                    <ul className="mt-6 space-y-2.5">
                      {fabric.specs.map((s) => (
                        <li key={s} className="flex items-start gap-3 text-[14px] text-slate-700 leading-snug">
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-[#b38848]/15 flex items-center justify-center flex-shrink-0"><Check size={11} className="text-[#b38848]" /></span>
                          {s}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-sm text-slate-500"><strong className="text-black">Best for:</strong> {fabric.idealFor}</p>
                    <div className="mt-6">
                      <span className="block text-[10px] font-bold uppercase tracking-[2px] text-slate-400">Starting from</span>
                      <span className="text-3xl font-semibold text-black" style={{ fontFamily: 'var(--font-hype)' }}>₹{fabric.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <h2 className="uppercase text-black font-semibold mb-6" style={{ fontFamily: 'var(--font-hype)', fontSize: 'clamp(22px, 2.6vw, 34px)' }}>Order this cover</h2>
                <CoverStudio fabric={fabric} onAddToCart={addToCart} />
              </>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}

