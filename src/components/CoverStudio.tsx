'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, ShoppingBag } from 'lucide-react';
import { CAR_BRANDS, FABRIC_COLORS, getSizeTier, priceForTier } from '@/data/carData';
import type { Fabric } from '@/data/fabrics';

interface Props {
  fabric: Fabric;
  onAddToCart: (item: any) => void;
}

/** Piping is only offered on the two Elite covers. */
const PIPING_OPTIONS = [
  { id: 'none', name: 'No piping', hex: 'transparent' },
  { id: 'black', name: 'Black', hex: '#0a0a0a' },
  { id: 'white', name: 'White', hex: '#ffffff' },
];
const PIPING_FABRICS = ['outdoor-elite', 'indoor-elite'];

const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');

const FIELD =
  'w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-sm text-black focus:outline-none focus:border-black disabled:bg-slate-100 disabled:text-slate-400';

function Block({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="py-7 border-b border-slate-200 last:border-b-0">
      <h3 className="flex items-center gap-3 uppercase font-bold tracking-wide text-black">
        <span className="w-8 h-8 rounded-full bg-black text-[#cca462] text-xs flex items-center justify-center">{n}</span>
        {title}
      </h3>
      {hint && <p className="mt-2 mb-5 ml-11 text-sm text-slate-500">{hint}</p>}
      {!hint && <div className="mb-5" />}
      {children}
    </div>
  );
}

function Swatches({ items, value, onChange }: { items: { id: string; name: string; hex: string }[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((c) => {
        const on = c.id === value;
        return (
          <button
            key={c.id}
            type="button"
            title={c.name}
            aria-label={c.name}
            onClick={() => onChange(c.id)}
            className={`w-10 h-10 rounded-full cursor-pointer border border-slate-300 flex items-center justify-center ${on ? 'ring-2 ring-offset-2 ring-black' : ''}`}
            style={{ background: c.hex }}
          >
            {on && <Check size={15} className={c.hex.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'} />}
          </button>
        );
      })}
    </div>
  );
}

/** Order form for one chosen cover: pick the car, then optional colour and any extra details. */
export default function CoverStudio({ fabric, onAddToCart }: Props) {
  const [brandId, setBrandId] = useState('');
  const [modelId, setModelId] = useState('');
  const [year, setYear] = useState('');
  const [variant, setVariant] = useState('');
  const [colorId, setColorId] = useState(FABRIC_COLORS[1].id);
  const [pipingId, setPipingId] = useState('none');
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  const brand = CAR_BRANDS.find((b) => b.id === brandId) ?? null;
  const model = brand?.models.find((m) => m.id === modelId) ?? null;
  const color = FABRIC_COLORS.find((c) => c.id === colorId)!;
  const hasPiping = PIPING_FABRICS.includes(fabric.id);
  const piping = hasPiping ? PIPING_OPTIONS.find((c) => c.id === pipingId)! : PIPING_OPTIONS[0];
  const tier = brand && model ? getSizeTier(brand.id, model) : null;

  const basePrice = tier ? priceForTier(fabric.price, tier) : fabric.price;
  const total = basePrice;
  const ready = !!(brand && model);

  const pickBrand = (id: string) => {
    setBrandId(id);
    setModelId('');
    setYear('');
    setVariant('');
  };

  const pickModel = (id: string) => {
    setModelId(id);
    const m = brand?.models.find((x) => x.id === id);
    setYear(m?.years[0] ?? '');
    setVariant(m?.variants[0] ?? '');
  };

  const addToCart = () => {
    if (!brand || !model) return;
    onAddToCart({
      vehicle: `${brand.name} ${model.name}`,
      variant: `${year} · ${variant}`,
      tier: fabric.title,
      fabricColor: color.name,
      fabricHex: color.hex,
      pipingColor: piping.name,
      pipingHex: piping.hex,
      notes: notes.trim() || 'None',
      addons: {},
      price: total,
      currency: '₹',
    });
    setAdded(true);
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors: ['#cca462', '#000000', '#ffffff'] });
    setTimeout(() => setAdded(false), 2500);
  };

  const Row = ({ k, v }: { k: string; v: string }) => (
    <div className="flex justify-between gap-4 py-2.5 border-b border-white/10 text-sm">
      <span className="text-white/50">{k}</span>
      <span className="text-right text-white">{v}</span>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
      {/* OPTIONS */}
      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] px-6 sm:px-10">
        <Block n={1} title="Select your car" hint="We cut the cover to your exact model, so the fit is perfect.">
          <div className="grid sm:grid-cols-2 gap-4">
            <select className={FIELD} value={brandId} onChange={(e) => pickBrand(e.target.value)}>
              <option value="">Select brand</option>
              {CAR_BRANDS.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            <select className={FIELD} value={modelId} disabled={!brand} onChange={(e) => pickModel(e.target.value)}>
              <option value="">Select model</option>
              {brand?.models.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <select className={FIELD} value={year} disabled={!model} onChange={(e) => setYear(e.target.value)}>
              {!model && <option value="">Year</option>}
              {model?.years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <select className={FIELD} value={variant} disabled={!model} onChange={(e) => setVariant(e.target.value)}>
              {!model && <option value="">Variant</option>}
              {model?.variants.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </Block>

        <Block n={2} title="Choose colours" hint={hasPiping ? 'Optional. Pick a cover colour and your piping.' : 'Optional. Pick a cover colour.'}>
          <span className="block text-[11px] font-bold tracking-[3px] uppercase text-[#b38848] mb-3">Cover colour</span>
          <Swatches items={FABRIC_COLORS} value={colorId} onChange={setColorId} />
          <p className="mt-3 text-sm text-slate-500">{color.name}</p>
          {hasPiping && (
            <>
              <span className="block text-[11px] font-bold tracking-[3px] uppercase text-[#b38848] mt-7 mb-3">Piping</span>
              <div className="flex flex-wrap gap-3">
                {PIPING_OPTIONS.map((o) => {
                  const on = o.id === pipingId;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setPipingId(o.id)}
                      className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-full border text-sm cursor-pointer transition-colors ${on ? 'border-black bg-black text-white' : 'border-slate-300 hover:border-black text-black'}`}
                    >
                      {o.id !== 'none' && <span className="w-4 h-4 rounded-full border border-slate-400" style={{ background: o.hex }} />}
                      {o.name}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </Block>

        <Block n={3} title="Additional information" hint="Optional. Tell us anything else we should know about your car or your cover.">
          <textarea
            className={`${FIELD} min-h-[130px] resize-y`}
            maxLength={500}
            placeholder="e.g. custom text or logo, delivery notes, parking conditions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <p className="mt-2 text-right text-xs text-slate-400">{notes.length}/500</p>
        </Block>
      </div>

      {/* SUMMARY */}
      <aside className="lg:sticky lg:top-28 bg-black text-white rounded-[2rem] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]">
        <div className="aspect-[16/10] overflow-hidden bg-slate-900">
          <div className="relative w-full h-full">
            <img src={fabric.image} alt="" className="w-full h-full object-cover" />
            <span className="absolute inset-0 mix-blend-multiply opacity-40" style={{ background: color.hex }} />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            {piping.id !== 'none' && <span className="absolute bottom-0 inset-x-0 h-[3px]" style={{ background: piping.hex }} />}
            <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white/90">Live preview</span>
          </div>
        </div>
        <div className="p-7">
          <span className="block text-[11px] font-bold tracking-[3px] uppercase text-[#cca462] mb-3">Your order</span>
          <Row k="Cover" v={fabric.title} />
          <Row k="Car" v={brand && model ? `${brand.name} ${model.name}` : 'Not selected'} />
          <Row k="Colour" v={color.name} />
          {hasPiping && <Row k="Piping" v={piping.name} />}
          <Row k="Notes" v={notes.trim() ? (notes.trim().length > 28 ? notes.trim().slice(0, 28) + '...' : notes.trim()) : 'None'} />
          <div className="flex items-end justify-between pt-6">
            <span className="text-xs uppercase tracking-[2px] text-white/50">Total</span>
            <span className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-hype)' }}>{formatINR(total)}</span>
          </div>
          <button
            onClick={addToCart}
            disabled={!ready}
            className="mt-6 w-full py-4 rounded-full bg-white hover:bg-[#cca462] text-black text-xs font-bold uppercase tracking-[2px] flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {added ? <Check size={15} /> : <ShoppingBag size={15} />}
            {added ? 'Added to cart' : ready ? 'Add to cart' : 'Select your car first'}
          </button>
          <p className="mt-4 text-xs text-white/50 text-center">Free delivery · 100% fit guarantee · 7-day returns</p>
        </div>
      </aside>
    </div>
  );
}
