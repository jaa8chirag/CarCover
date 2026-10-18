'use client';

import { gstOn } from '@/data/fabrics';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, ShoppingBag, Plus, Trash2, PhoneCall } from 'lucide-react';
import { FABRIC_COLORS } from '@/data/carData';
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
  const isUnveiling = fabric.group === 'unveiling';
  const isBespoke = fabric.group === 'custom';

  // Standard single car state
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [colorId, setColorId] = useState(FABRIC_COLORS[1].id);
  const [pipingId, setPipingId] = useState('none');
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  // Unveiling multi-car & quantity state (max 10 per car)
  const [unveilCars, setUnveilCars] = useState<
    { id: string; brand: string; model: string; year: string; colorId: string; quantity: number }[]
  >([{ id: '1', brand: '', model: '', year: '', colorId: FABRIC_COLORS[1].id, quantity: 1 }]);

  const updateCar = (id: string, patch: Partial<{ brand: string; model: string; year: string; colorId: string; quantity: number }>) => {
    setUnveilCars((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const addCar = () => {
    setUnveilCars((prev) => [
      ...prev,
      { id: String(Date.now()), brand: '', model: '', year: '', colorId: FABRIC_COLORS[1].id, quantity: 1 },
    ]);
  };

  const removeCar = (id: string) => {
    if (unveilCars.length <= 1) return;
    setUnveilCars((prev) => prev.filter((c) => c.id !== id));
  };

  const color = FABRIC_COLORS.find((c) => c.id === colorId)!;
  const hasPiping = PIPING_FABRICS.includes(fabric.id);
  const piping = hasPiping ? PIPING_OPTIONS.find((c) => c.id === pipingId)! : PIPING_OPTIONS[0];

  const PIPING_PRICE = 1999;
  const pipingPrice = hasPiping && piping.id !== 'none' ? PIPING_PRICE : 0;
  const basePrice = fabric.price;

  const totalCovers = isUnveiling ? unveilCars.reduce((s, c) => s + c.quantity, 0) : 1;
  const subtotal = isUnveiling ? fabric.price * totalCovers : basePrice + pipingPrice;
  const gst = gstOn(subtotal);
  const total = subtotal + gst;

  const ready = isUnveiling
    ? unveilCars.length > 0 && unveilCars.every((c) => c.brand.trim() && c.model.trim() && c.year.trim())
    : !!(brand.trim() && model.trim() && year.trim());

  const addToCart = () => {
    if (!ready) return;
    if (isUnveiling) {
      unveilCars.forEach((c) => {
        const cColor = FABRIC_COLORS.find((fc) => fc.id === c.colorId) || FABRIC_COLORS[1];
        const unitPrice = fabric.price;
        const itemPrice = unitPrice * c.quantity;
        onAddToCart({
          fabricId: fabric.id,
          vehicle: `${c.brand.trim()} ${c.model.trim()}`,
          variant: `${c.year.trim()}${c.quantity > 1 ? ` · Qty: ${c.quantity}` : ''}`,
          quantity: c.quantity,
          unitPrice,
          tier: fabric.title,
          fabricColor: cColor.name,
          fabricHex: cColor.hex,
          pipingColor: 'No piping',
          pipingHex: 'transparent',
          notes: notes.trim() || 'None',
          addons: { quantity: c.quantity },
          price: itemPrice,
          currency: '₹',
        });
      });
    } else {
      onAddToCart({
        fabricId: fabric.id,
        vehicle: `${brand.trim()} ${model.trim()}`,
        variant: year.trim(),
        quantity: 1,
        tier: fabric.title,
        fabricColor: isBespoke ? 'Custom Printed Design' : color.name,
        fabricHex: isBespoke ? '#cca462' : color.hex,
        pipingColor: piping.id !== 'none' ? `${piping.name} (+₹1,999)` : piping.name,
        pipingHex: piping.hex,
        notes: notes.trim() || 'None',
        addons: pipingPrice > 0 ? { piping: pipingPrice } : {},
        price: subtotal,
        currency: '₹',
      });
    }
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
        {isUnveiling ? (
          <Block
            n={1}
            title="Reveal vehicles & quantities"
            hint="Add your car models, select fabric colour and quantity (max 10 covers per vehicle). Perfect for showroom launches and handovers."
          >
            <div className="space-y-6">
              {unveilCars.map((car, idx) => {
                const carColor = FABRIC_COLORS.find((fc) => fc.id === car.colorId) || FABRIC_COLORS[1];
                return (
                  <div
                    key={car.id}
                    className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/80 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                      <span className="text-xs font-bold uppercase tracking-[2px] text-[#b38848]">
                        Vehicle #{idx + 1}
                      </span>
                      {unveilCars.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCar(car.id)}
                          className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer transition-colors"
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3 mb-5">
                      <input
                        className={FIELD}
                        placeholder="Brand (e.g. Porsche)"
                        maxLength={60}
                        value={car.brand}
                        onChange={(e) => updateCar(car.id, { brand: e.target.value })}
                      />
                      <input
                        className={FIELD}
                        placeholder="Model (e.g. 911 GT3)"
                        maxLength={60}
                        value={car.model}
                        onChange={(e) => updateCar(car.id, { model: e.target.value })}
                      />
                      <input
                        className={FIELD}
                        placeholder="Year (e.g. 2024)"
                        maxLength={10}
                        value={car.year}
                        onChange={(e) => updateCar(car.id, { year: e.target.value })}
                      />
                    </div>

                    {/* Colour for this car */}
                    <div className="mb-5">
                      <span className="block text-[11px] font-bold tracking-[2px] uppercase text-slate-600 mb-2.5">
                        Cover colour: <span className="font-semibold text-slate-900">{carColor.name}</span>
                      </span>
                      <Swatches
                        items={FABRIC_COLORS}
                        value={car.colorId}
                        onChange={(cid) => updateCar(car.id, { colorId: cid })}
                      />
                    </div>

                    {/* Quantity for this car */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Quantity:</span>
                        <div className="inline-flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white shadow-sm">
                          <button
                            type="button"
                            onClick={() => updateCar(car.id, { quantity: Math.max(1, car.quantity - 1) })}
                            disabled={car.quantity <= 1}
                            className="w-9 h-9 flex items-center justify-center text-base font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-sm font-bold text-black select-none">
                            {car.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCar(car.id, { quantity: Math.min(10, car.quantity + 1) })}
                            disabled={car.quantity >= 10}
                            className="w-9 h-9 flex items-center justify-center text-base font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">(Max 10 per car)</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-800">
                        {car.quantity} × {formatINR(fabric.price)} = {formatINR(fabric.price * car.quantity)}
                      </span>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={addCar}
                className="w-full py-3.5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-black text-slate-700 hover:text-black text-xs font-bold uppercase tracking-[2px] flex items-center justify-center gap-2 transition-colors cursor-pointer bg-white hover:bg-slate-50"
              >
                <Plus size={16} /> Add Another Vehicle
              </button>
            </div>
          </Block>
        ) : (
          <>
            <Block n={1} title="Your car" hint="Tell us your brand, model and year, and we'll confirm the exact fit with you.">
              <div className="grid sm:grid-cols-3 gap-4">
                <input className={FIELD} placeholder="Brand (e.g. Rolls-Royce)" maxLength={60} value={brand} onChange={(e) => setBrand(e.target.value)} />
                <input className={FIELD} placeholder="Model (e.g. Cullinan)" maxLength={60} value={model} onChange={(e) => setModel(e.target.value)} />
                <input className={FIELD} placeholder="Year (e.g. 2023)" maxLength={10} value={year} onChange={(e) => setYear(e.target.value)} />
              </div>
            </Block>

            {!isBespoke && (
              <Block n={2} title="Choose colours" hint={hasPiping ? 'Optional. Pick a cover colour and your piping.' : 'Optional. Pick a cover colour.'}>
                <span className="block text-[11px] font-bold tracking-[3px] uppercase text-[#b38848] mb-3">Cover colour</span>
                <Swatches items={FABRIC_COLORS} value={colorId} onChange={setColorId} />
                <p className="mt-3 text-sm text-slate-500">{color.name}</p>
                {hasPiping && (
                  <>
                    <div className="flex items-center justify-between mt-7 mb-3">
                      <span className="block text-[11px] font-bold tracking-[3px] uppercase text-[#b38848]">Piping</span>
                      <span className="text-xs text-slate-500 font-medium">+₹1,999 extra</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {PIPING_OPTIONS.map((o) => {
                        const on = o.id === pipingId;
                        const isPaid = o.id !== 'none';
                        return (
                          <button
                            key={o.id}
                            type="button"
                            onClick={() => setPipingId(o.id)}
                            className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-full border text-sm cursor-pointer transition-colors ${
                              on ? 'border-black bg-black text-white' : 'border-slate-300 hover:border-black text-black'
                            }`}
                          >
                            {o.id !== 'none' && <span className="w-4 h-4 rounded-full border border-slate-400" style={{ background: o.hex }} />}
                            <span>{o.name}</span>
                            {isPaid && (
                              <span
                                className={`text-[11px] px-2 py-0.5 rounded-full font-semibold transition-colors ${
                                  on ? 'bg-[#cca462] text-black' : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                +₹1,999
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </Block>
            )}
          </>
        )}

        <Block
          n={isUnveiling || isBespoke ? 2 : 3}
          title="Additional information"
          hint={
            isBespoke
              ? "Optional. Tell us about your custom artwork, livery, logo, preferred colours or monogramming."
              : isUnveiling
              ? "Optional. Tell us anything else we should know about your launch date, showroom or reveal event."
              : "Optional. Tell us anything else we should know about your car or your cover."
          }
        >
          <textarea
            className={`${FIELD} min-h-[130px] resize-y`}
            maxLength={500}
            placeholder={
              isBespoke
                ? "e.g. description of your artwork or livery, custom text or monogram, sponsor logos, launch date..."
                : isUnveiling
                ? "e.g. dealership name, reveal date, logo or monogram embroidery requirements, delivery location..."
                : "e.g. custom text or logo, any body kit or spoiler, delivery notes, parking conditions..."
            }
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <p className="mt-2 text-right text-xs text-slate-400">{notes.length}/500</p>
        </Block>

        {/* Contact atelier assistance banner */}
        <div className="my-7 p-5 sm:p-6 rounded-2xl bg-[#faf7f2] border border-[#cca462]/35 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#cca462]/15 text-[#b38848] flex items-center justify-center flex-shrink-0">
              <PhoneCall size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {isBespoke
                  ? 'Have questions about your bespoke design or artwork?'
                  : 'Have questions about your car cover or exact fit?'}
              </p>
              <p className="text-xs text-slate-500">
                Contact our team directly at <a href="tel:+918585996669" className="font-semibold text-black underline">+91 85859 96669</a> or chat on WhatsApp.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/918585996669?text=Hello%20Signature%20Covers%2C%20I%20have%20questions%20about%20ordering%20a%20car%20cover."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-black text-xs font-bold uppercase tracking-wider transition-colors no-underline whitespace-nowrap shadow-sm"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* SUMMARY */}
      <aside className="lg:sticky lg:top-28 bg-black text-white rounded-[2rem] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]">
        <div className="aspect-[16/10] overflow-hidden bg-slate-900">
          <div className="relative w-full h-full">
            <img src={fabric.image} alt={`${fabric.title} car cover preview`} className="w-full h-full object-cover" />
            {!isBespoke && (
              <span
                className="absolute inset-0 mix-blend-multiply opacity-40"
                style={{ background: isUnveiling ? (FABRIC_COLORS.find(f => f.id === unveilCars[0]?.colorId)?.hex || '#111827') : color.hex }}
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            {!isUnveiling && piping.id !== 'none' && <span className="absolute bottom-0 inset-x-0 h-[3px]" style={{ background: piping.hex }} />}
            <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white/90">Live preview</span>
          </div>
        </div>
        <div className="p-7">
          <span className="block text-[11px] font-bold tracking-[3px] uppercase text-[#cca462] mb-3">Your order</span>
          <Row k="Cover" v={fabric.title} />

          {isUnveiling ? (
            <>
              <div className="py-2.5 border-b border-white/10 text-xs">
                <div className="flex justify-between text-white/50 mb-1.5 uppercase tracking-wider text-[10px] font-bold">
                  <span>Vehicles ({unveilCars.length})</span>
                  <span>Subtotal</span>
                </div>
                <div className="space-y-1.5">
                  {unveilCars.map((c, i) => {
                    const cName = c.brand.trim() || c.model.trim() ? `${c.brand.trim()} ${c.model.trim()}` : `Vehicle #${i + 1}`;
                    const cCol = FABRIC_COLORS.find((fc) => fc.id === c.colorId)?.name || '';
                    return (
                      <div key={c.id} className="flex justify-between items-center text-white/90">
                        <span className="truncate max-w-[210px] text-[13px]">
                          {c.quantity}× {cName} <span className="text-white/40 text-[11px]">({cCol})</span>
                        </span>
                        <span className="font-mono text-white">{formatINR(fabric.price * c.quantity)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Row k="Total covers" v={`${totalCovers} ${totalCovers === 1 ? 'cover' : 'covers'}`} />
              <Row k="Rate per cover" v={formatINR(fabric.price)} />
              <Row k="Notes" v={notes.trim() ? (notes.trim().length > 28 ? notes.trim().slice(0, 28) + '...' : notes.trim()) : 'None'} />
              <Row k="Subtotal" v={formatINR(subtotal)} />
              <Row k="Shipping" v="Free" />
              <Row k="GST (18%)" v={formatINR(gst)} />
            </>
          ) : (
            <>
              <Row k="Car" v={brand.trim() && model.trim() ? `${brand.trim()} ${model.trim()}${year.trim() ? ` (${year.trim()})` : ''}` : 'Not entered'} />
              {isBespoke ? (
                <Row k="Design" v="Custom printed livery / artwork" />
              ) : (
                <Row k="Colour" v={color.name} />
              )}
              {hasPiping && (
                <Row
                  k="Piping"
                  v={piping.id !== 'none' ? `${piping.name} (+${formatINR(pipingPrice)})` : 'No piping'}
                />
              )}
              <Row k="Notes" v={notes.trim() ? (notes.trim().length > 28 ? notes.trim().slice(0, 28) + '...' : notes.trim()) : 'None'} />
              <Row k="Cover price" v={formatINR(basePrice)} />
              {hasPiping && pipingPrice > 0 && <Row k="Piping trim" v={`+${formatINR(pipingPrice)}`} />}
              <Row k="Shipping" v="Free" />
              <Row k="GST (18%)" v={formatINR(gst)} />
            </>
          )}

          <div className="flex items-end justify-between pt-6">
            <span className="text-xs uppercase tracking-[2px] text-white/50">Total (incl. GST)</span>
            <span className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-hype)' }}>{formatINR(total)}</span>
          </div>
          <button
            onClick={addToCart}
            disabled={!ready}
            className="mt-6 w-full py-4 rounded-full bg-white hover:bg-[#cca462] text-black text-xs font-bold uppercase tracking-[2px] flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {added ? (
              <Check size={15} />
            ) : (
              <ShoppingBag size={15} />
            )}
            {added
              ? 'Added to cart'
              : ready
              ? isUnveiling
                ? `Add ${totalCovers} ${totalCovers === 1 ? 'cover' : 'covers'} to cart`
                : 'Add to cart'
              : isUnveiling
              ? 'Enter all vehicle details'
              : 'Enter your car first'}
          </button>
          <p className="mt-4 text-xs text-white/50 text-center">Free delivery · 100% fit guarantee · 7-day returns</p>
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-white/70">
              Have questions? Call <a href="tel:+918585996669" className="text-[#cca462] underline font-semibold">+91 85859 96669</a> or <a href="https://wa.me/918585996669?text=Hello%20Signature%20Covers%2C%20I%20have%20questions%20about%20ordering%20a%20car%20cover." target="_blank" rel="noopener noreferrer" className="text-[#25D366] underline font-semibold">WhatsApp us</a>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
