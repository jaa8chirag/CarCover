'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Check, Sparkles, Layers } from 'lucide-react';
import PageShell from '@/components/PageShell';
import CoverStudio from '@/components/CoverStudio';
import { FABRICS, PRICE_NOTE } from '@/data/fabrics';

const FABRIC_TEXTURES: Record<string, string> = {
  'outdoor-standard': '/images/fabric_outdoor_standard.jpg',
  'outdoor-pro': '/images/fabric_outdoor_standard.jpg',
  'outdoor-elite': '/images/fabric_outdoor_elite.jpg',
  'outdoor-signature': '/images/fabric_outdoor_signature.jpg',
  'indoor-standard': '/images/fabric_indoor_standard.jpg',
  'indoor-elite': '/images/fabric_indoor_elite.jpg',
  'unveil-showroom': '/images/fabric_unveiling.jpg',
  'custom-printed': '/images/cover_custom_printed.jpg',
};

export default function ProductPage() {
  const params = useParams<{ fabric: string }>();
  const fabricKey = params?.fabric === 'outdoor-standard' ? 'outdoor-pro' : params?.fabric;
  const fabric = FABRICS.find((f) => f.id === fabricKey);
  const [activeView, setActiveView] = useState<'car' | 'fabric'>('car');

  const fabricTexture = fabric ? FABRIC_TEXTURES[fabric.id] : null;
  const currentImage = activeView === 'fabric' && fabricTexture ? fabricTexture : fabric?.image;

  return (
    <PageShell>
      {({ addToCart, openCart }) => (
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
                  <div>
                    <div className={`relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-slate-900 ${fabric.id === 'outdoor-signature' ? 'p-[2.5px] bg-gradient-to-br from-[#cca462] via-[#ffe5a3] to-[#b38848] shadow-[0_30px_90px_-25px_rgba(204,164,98,0.55)]' : 'shadow-[0_30px_80px_-35px_rgba(0,0,0,0.5)]'}`}>
                      <div className="relative w-full h-full overflow-hidden rounded-[1.85rem]">
                        <img
                          src={currentImage}
                          alt={`${fabric.title} car cover ${activeView === 'fabric' ? 'fabric texture' : ''}`}
                          className="w-full h-full object-cover transition-opacity duration-300"
                        />
                        {fabric.id === 'outdoor-signature' ? (
                          <span className="absolute top-4 left-4 bg-gradient-to-r from-[#cca462] via-[#faecc7] to-[#cca462] text-black text-[10px] font-extrabold tracking-[2px] px-4 py-2 rounded-full shadow-2xl flex items-center gap-1.5">
                            👑 OUR FLAGSHIP OUTDOOR
                          </span>
                        ) : fabric.bestseller ? (
                          <span className="absolute top-4 left-4 bg-gradient-to-r from-[#cca462] to-[#f6e3b4] text-black text-[10px] font-bold tracking-[2px] px-4 py-2 rounded-full shadow-lg">BESTSELLER</span>
                        ) : null}

                        {activeView === 'fabric' && (
                          <span className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md text-[#faecc7] text-[9.5px] font-bold tracking-[2px] uppercase px-3.5 py-1.5 rounded-full border border-white/10">
                            Ultra-Close Fabric Texture
                          </span>
                        )}
                      </div>
                    </div>

                    {fabricTexture && (
                      <div className="flex items-center justify-center gap-3 mt-4">
                        <button
                          type="button"
                          onClick={() => setActiveView('car')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[1.5px] transition-all cursor-pointer ${
                            activeView === 'car'
                              ? 'bg-black text-white shadow-md'
                              : 'bg-white text-slate-700 hover:text-black border border-slate-200'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${activeView === 'car' ? 'bg-[#cca462]' : 'bg-slate-300'}`} />
                          Vehicle Fit
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveView('fabric')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[1.5px] transition-all cursor-pointer ${
                            activeView === 'fabric'
                              ? 'bg-black text-white shadow-md'
                              : 'bg-white text-slate-700 hover:text-black border border-slate-200'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${activeView === 'fabric' ? 'bg-[#cca462]' : 'bg-slate-300'}`} />
                          Fabric Weave
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    {fabric.id === 'outdoor-signature' ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-[3px] uppercase text-black bg-gradient-to-r from-[#cca462] to-[#f6e3b4] px-3.5 py-1.5 rounded-full mb-3 shadow-sm">
                        👑 PINNACLE ALL-WEATHER SERIES
                      </span>
                    ) : (
                      <span className="block text-[11px] font-bold tracking-[4px] uppercase text-[#b38848] mb-3">{fabric.badge}</span>
                    )}
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
                      <span className="block text-xs text-slate-500 mt-0.5">{PRICE_NOTE}</span>
                    </div>
                  </div>
                </div>

                <h2 className="uppercase text-black font-semibold mb-6" style={{ fontFamily: 'var(--font-hype)', fontSize: 'clamp(22px, 2.6vw, 34px)' }}>Order this cover</h2>
                <CoverStudio fabric={fabric} onAddToCart={addToCart} onOpenCart={openCart} />
              </>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}

