'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, ShoppingBag } from 'lucide-react';
import { CAR_BRANDS, FABRIC_COLORS, PIPING_COLORS, getSizeTier, priceForTier } from '@/data/carData';
import { FABRICS } from '@/data/fabrics';

interface Props {
  fabricId: string | null;
  onFabricChange: (id: string) => void;
  onAddToCart: (item: any) => void;
}

const TEXT_COLORS = [
  { id: 'gold', name: 'Gold', hex: '#cca462' },
  { id: 'silver', name: 'Silver', hex: '#d8dee6' },
  { id: 'white', name: 'White', hex: '#ffffff' },
  { id: 'black', name: 'Black', hex: '#0a0d10' },
];

const ADDONS = [
  { id: 'mirrorPockets', label: 'Tailored mirror pockets', price: 0, note: 'Included' },
  { id: 'heavyDutyHoldall', label: 'Heavy-duty storage duffle bag', price: 0, note: 'Included' },
  { id: 'lockingUnderbodyStraps', label: 'Locking underbody wind straps', price: 399, note: '' },
  { id: 'batteryChargerFlap', label: 'Battery charger access flap', price: 299, note: '' },
] as const;

const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');

const FIELD =
  'w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-sm text-black focus:outline-none focus:border-black disabled:bg-slate-100 disabled:text-slate-400';

function Block({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-b border-slate-200 last:border-b-0">
      <h3 className="flex items-center gap-3 uppercase font-bold tracking-wide text-black mb-5">
        <span className="w-8 h-8 rounded-full bg-black text-[#cca462] text-xs flex items-center justify-center">{n}</span>
        {title}
      </h3>
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

export default function CoverStudio({ fabricId, onFabricChange, onAddToCart }: Props) {
  const [brandId, setBrandId] = useState('');
  const [modelId, setModelId] = useState('');
  const [year, setYear] = useState('');
  const [variant, setVariant] = useState('');
  const [colorId, setColorId] = useState(FABRIC_COLORS[1].id);
  const [pipingId, setPipingId] = useState(PIPING_COLORS[0].id);
  const [monogram, setMonogram] = useState('');
  const [textColorId, setTextColorId] = useState('gold');
  const [addons, setAddons] = useState<Record<string, boolean>>({
    mirrorPockets: true,
    heavyDutyHoldall: true,
    lockingUnderbodyStraps: false,
    batteryChargerFlap: false,
  });
  const [added, setAdded] = useState(false);

  const brand = CAR_BRANDS.find((b) => b.id === brandId) ?? null;
  const model = brand?.models.find((m) => m.id === modelId) ?? null;
  const fabric = FABRICS.find((f) => f.id === fabricId) ?? null;
  const color = FABRIC_COLORS.find((c) => c.id === colorId)!;
  const piping = PIPING_COLORS.find((c) => c.id === pipingId)!;
  const textColor = TEXT_COLORS.find((c) => c.id === textColorId)!;
  const tier = brand && model ? getSizeTier(brand.id, model) : null;

  const basePrice = fabric ? (tier ? priceForTier(fabric.price, tier) : fabric.price) : 0;
  const addonsPrice = ADDONS.reduce((n, a) => n + (addons[a.id] ? a.price : 0), 0);
  const total = basePrice + addonsPrice;
  const ready = !!(brand && model && fabric);

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
    if (!brand || !model || !fabric) return;
    onAddToCart({
      vehicle: `${brand.name} ${model.name}`,
      variant: `${year} · ${variant}`,
      tier: fabric.title,
      fabricColor: color.name,
      fabricHex: color.hex,
      pipingColor: piping.name,
      pipingHex: piping.hex,
      monogram: monogram.trim() || 'No monogram',
      monogramColor: textColor.id,
      addons,
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
    <section id="studio" className="scroll-mt-20 pt-4 pb-20 sm:pb-28 bg-[#f3f1ed]">
      <div className="container-am max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <span className="block text-[11px] font-bold tracking-[4px] uppercase text-[#b38848] mb-3">Order Your Cover</span>
          <h2 className="uppercase text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(26px, 3.6vw, 46px)', lineHeight: 1.08 }}>
            Tailored To Your Car
          </h2>
          <p className="mt-4 text-slate-600">Start with the fabric, then tell us your car. Everything else is optional and the price updates as you go.</p>
        </div>

        <div className="mb-8 flex items-center gap-3 sm:gap-5 text-[11px] font-bold uppercase tracking-[2px]">
          {([['Fabric', !!fabric], ['Car', !!(brand && model)], ['Make it yours', ready]] as [string, boolean][]).map(([label, done], i) => (
            <React.Fragment key={label}>
              {i > 0 && <span className={`flex-1 h-px max-w-16 ${done ? 'bg-[#b38848]' : 'bg-slate-300'}`} />}
              <span className={`flex items-center gap-2 ${done ? 'text-black' : 'text-slate-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-colors duration-500 ${done ? 'bg-[#cca462] text-black' : 'bg-slate-200 text-slate-500'}`}>{done ? <Check size={12} /> : i + 1}</span>
                {label}
              </span>
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* OPTIONS */}
          <div className="bg-white border border-slate-200 rounded-[2rem] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] px-6 sm:px-10">
            <Block n={1} title="Choose your fabric">
              {(['outdoor', 'indoor'] as const).map((g) => (
                <div key={g} className="mb-7 last:mb-0">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[11px] font-bold tracking-[4px] uppercase text-[#b38848]">{g === 'outdoor' ? 'Outdoor covers' : 'Indoor covers'}</span>
                    <span className="flex-1 h-px bg-gradient-to-r from-[#b38848]/50 to-transparent" />
                  </div>
                  <div className={`grid gap-3 sm:gap-4 grid-cols-2 ${g === 'outdoor' ? 'sm:grid-cols-3' : ''}`}>
                    {FABRICS.filter((f) => f.group === g).map((f) => {
                      const on = f.id === fabricId;
                      const price = tier ? priceForTier(f.price, tier) : f.price;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => onFabricChange(f.id)}
                          aria-pressed={on}
                          className={`group relative text-left overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer bg-black transition-all duration-500 hover:-translate-y-1.5 ${on ? 'ring-2 ring-[#cca462] ring-offset-4 ring-offset-white shadow-[0_30px_60px_-25px_rgba(204,164,98,0.7)]' : fabricId ? 'opacity-60 hover:opacity-100' : 'hover:shadow-2xl'}`}
                        >
                          <img src={f.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                          <span className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                          <span aria-hidden className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[450%] transition-all duration-[1100ms] ease-out" />
                          {f.bestseller && (
                            <span className="absolute top-3 left-3 bg-gradient-to-r from-[#cca462] to-[#f6e3b4] text-black text-[9px] font-bold tracking-[2px] px-3 py-1.5 rounded-full">BESTSELLER</span>
                          )}
                          <span className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${on ? 'bg-[#cca462] text-black scale-100' : 'bg-white/15 backdrop-blur-md text-transparent scale-90 group-hover:scale-100'}`}>
                            <Check size={16} />
                          </span>
                          <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                            <span className="block text-sm sm:text-base font-bold uppercase tracking-wide leading-tight">{f.title}</span>
                            <span className="block text-[11px] text-white/65 mt-1 leading-snug line-clamp-2">{f.subtitle}</span>
                            <span className="flex items-baseline gap-1.5 mt-3">
                              <span className="text-[10px] uppercase tracking-[2px] text-white/50">{tier ? 'For you' : 'From'}</span>
                              <span className="text-xl font-semibold text-[#cca462]" style={{ fontFamily: 'var(--font-hype)' }}>{formatINR(price)}</span>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {fabric && (
                <div className="mt-6 rounded-2xl bg-[#f7f5f1] p-5 border border-[#b38848]/25">
                  <span className="block text-[10px] font-bold tracking-[3px] uppercase text-[#b38848] mb-2">Best for · {fabric.idealFor}</span>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                    {fabric.specs.map((sp) => (
                      <li key={sp} className="flex items-start gap-2 text-[13px] text-slate-700"><Check size={13} className="mt-0.5 text-[#b38848] flex-shrink-0" />{sp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Block>

            <Block n={2} title="Your car">
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

            <Block n={3} title="Cover colour">
              <Swatches items={FABRIC_COLORS} value={colorId} onChange={setColorId} />
              <p className="mt-3 text-sm text-slate-500">{color.name}</p>
            </Block>

            <Block n={4} title="Piping colour">
              <Swatches items={PIPING_COLORS} value={pipingId} onChange={setPipingId} />
              <p className="mt-3 text-sm text-slate-500">{piping.name}</p>
            </Block>

            <Block n={5} title="Monogram (optional)">
              <div className="grid sm:grid-cols-[1fr_auto] gap-5 items-center">
                <input
                  className={FIELD}
                  maxLength={14}
                  placeholder="e.g. THAR-4X4"
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                />
                <div className="flex gap-3">
                  {TEXT_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      title={c.name}
                      aria-label={c.name}
                      onClick={() => setTextColorId(c.id)}
                      className={`w-9 h-9 rounded-full border border-slate-300 cursor-pointer ${c.id === textColorId ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </Block>

            <Block n={6} title="Extras">
              <div className="space-y-3">
                {ADDONS.map((a) => (
                  <label key={a.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 hover:border-black cursor-pointer transition-colors">
                    <span className="flex items-center gap-3 text-sm text-black">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-black"
                        checked={!!addons[a.id]}
                        onChange={(e) => setAddons((p) => ({ ...p, [a.id]: e.target.checked }))}
                      />
                      {a.label}
                    </span>
                    <span className="text-sm text-slate-500">{a.price ? `+${formatINR(a.price)}` : a.note}</span>
                  </label>
                ))}
              </div>
            </Block>
          </div>

          {/* SUMMARY */}
          <aside className="lg:sticky lg:top-28 bg-black text-white rounded-[2rem] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]">
            <div className="aspect-[16/10] overflow-hidden bg-slate-900">
              <div className="relative w-full h-full">
                <img src={fabric?.image ?? '/images/cover_hero.jpg'} alt="" className="w-full h-full object-cover" />
                <span className="absolute inset-0 mix-blend-multiply opacity-40" style={{ background: color.hex }} />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <span className="absolute bottom-0 inset-x-0 h-[3px]" style={{ background: piping.hex }} />
                {monogram.trim() && (
                  <span className="absolute inset-x-0 bottom-5 text-center text-xl tracking-[0.35em] font-bold" style={{ color: textColor.hex, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{monogram.trim()}</span>
                )}
                <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white/90">Live preview</span>
              </div>
            </div>
            <div className="p-7">
              <span className="block text-[11px] font-bold tracking-[3px] uppercase text-[#cca462] mb-3">Your order</span>
              <Row k="Car" v={brand && model ? `${brand.name} ${model.name}` : 'Not selected'} />
              <Row k="Fabric" v={fabric ? fabric.title : 'Not selected'} />
              <Row k="Colour" v={color.name} />
              <Row k="Piping" v={piping.name} />
              <Row k="Monogram" v={monogram.trim() || 'None'} />
              <div className="flex items-end justify-between pt-6">
                <span className="text-xs uppercase tracking-[2px] text-white/50">Total</span>
                <span className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-hype)' }}>{ready ? formatINR(total) : '—'}</span>
              </div>
              <button
                onClick={addToCart}
                disabled={!ready}
                className="mt-6 w-full py-4 rounded-full bg-white hover:bg-[#cca462] text-black text-xs font-bold uppercase tracking-[2px] flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {added ? <Check size={15} /> : <ShoppingBag size={15} />}
                {added ? 'Added to cart' : ready ? 'Add to cart' : 'Select car and fabric'}
              </button>
              <p className="mt-4 text-xs text-white/50 text-center">Free delivery · 100% fit guarantee · 7-day returns</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
