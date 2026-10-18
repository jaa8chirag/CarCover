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

interface StudioCar {
  id: string;
  brand: string;
  model: string;
  year: string;
  colorId: string;
  pipingId: string;
  quantity: number;
}

/** Order form for one chosen cover: configure one or multiple vehicles and quantities. */
export default function CoverStudio({ fabric, onAddToCart }: Props) {
  const isUnveiling = fabric.group === 'unveiling';
  const isBespoke = fabric.group === 'custom';
  const hasPiping = PIPING_FABRICS.includes(fabric.id);
  const PIPING_PRICE = 1999;

  // Multi-vehicle & quantity state across all covers (max 10 covers per vehicle)
  const [cars, setCars] = useState<StudioCar[]>([
    {
      id: '1',
      brand: '',
      model: '',
      year: '',
      colorId: FABRIC_COLORS[1].id,
      pipingId: 'none',
      quantity: 1,
    },
  ]);
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  const updateCar = (id: string, patch: Partial<StudioCar>) => {
    setCars((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const addCar = () => {
    setCars((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        brand: '',
        model: '',
        year: '',
        colorId: FABRIC_COLORS[1].id,
        pipingId: 'none',
        quantity: 1,
      },
    ]);
  };

  const removeCar = (id: string) => {
    if (cars.length <= 1) return;
    setCars((prev) => prev.filter((c) => c.id !== id));
  };

  const totalCovers = cars.reduce((s, c) => s + c.quantity, 0);

  const subtotal = cars.reduce((sum, c) => {
    const pipingCost = hasPiping && c.pipingId !== 'none' ? PIPING_PRICE : 0;
    const unitPrice = fabric.price + pipingCost;
    return sum + unitPrice * c.quantity;
  }, 0);

  const gst = gstOn(subtotal);
  const total = subtotal + gst;

  const ready = cars.length > 0 && cars.every((c) => c.brand.trim() && c.model.trim() && c.year.trim());

  const addToCart = () => {
    if (!ready) return;
    cars.forEach((c) => {
      const cColor = FABRIC_COLORS.find((fc) => fc.id === c.colorId) || FABRIC_COLORS[1];
      const cPiping = hasPiping ? PIPING_OPTIONS.find((p) => p.id === c.pipingId) || PIPING_OPTIONS[0] : PIPING_OPTIONS[0];
      const pipingCost = hasPiping && cPiping.id !== 'none' ? PIPING_PRICE : 0;
      const unitPrice = fabric.price + pipingCost;
      const itemPrice = unitPrice * c.quantity;

      onAddToCart({
        fabricId: fabric.id,
        vehicle: `${c.brand.trim()} ${c.model.trim()}`,
        variant: `${c.year.trim()}${c.quantity > 1 ? ` · Qty: ${c.quantity}` : ''}`,
        quantity: c.quantity,
        unitPrice,
        tier: fabric.title,
        fabricColor: isBespoke ? 'Custom Printed Design' : cColor.name,
        fabricHex: isBespoke ? '#cca462' : cColor.hex,
        pipingColor: hasPiping && cPiping.id !== 'none' ? `${cPiping.name} (+₹1,999)` : cPiping.name,
        pipingHex: cPiping.hex,
        notes: notes.trim() || 'None',
        addons: {
          ...(c.quantity > 1 ? { quantity: c.quantity } : {}),
          ...(pipingCost > 0 ? { piping: pipingCost } : {}),
        },
        price: itemPrice,
        currency: '₹',
      });
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

  const previewColor = FABRIC_COLORS.find((fc) => fc.id === cars[0]?.colorId) || FABRIC_COLORS[1];
  const previewPiping = hasPiping ? PIPING_OPTIONS.find((p) => p.id === cars[0]?.pipingId) || PIPING_OPTIONS[0] : PIPING_OPTIONS[0];

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
      {/* OPTIONS */}
      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] px-6 sm:px-10">
        <Block
          n={1}
          title={isUnveiling ? 'Reveal vehicles & quantities' : 'Your vehicles & quantities'}
          hint={
            isUnveiling
              ? 'Add your car models, select fabric colour and quantity (max 10 covers per vehicle). Perfect for showroom launches and handovers.'
              : isBespoke
              ? 'Tell us your car brand, model, year and quantity. You can add multiple vehicles in one order.'
              : hasPiping
              ? 'Tell us your car brand, model, year, colour, piping and quantity. You can add multiple vehicles in one order.'
              : 'Tell us your car brand, model, year, colour and quantity. You can add multiple vehicles in one order.'
          }
        >
          <div className="space-y-6">
            {cars.map((car, idx) => {
              const carColor = FABRIC_COLORS.find((fc) => fc.id === car.colorId) || FABRIC_COLORS[1];
              const carPiping = hasPiping ? PIPING_OPTIONS.find((p) => p.id === car.pipingId) || PIPING_OPTIONS[0] : PIPING_OPTIONS[0];
              const pipingCost = hasPiping && carPiping.id !== 'none' ? PIPING_PRICE : 0;
              const unitPrice = fabric.price + pipingCost;
              const lineTotal = unitPrice * car.quantity;

              return (
                <div
                  key={car.id}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/80 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-[2px] text-[#b38848]">
                      Vehicle #{idx + 1}
                    </span>
                    {cars.length > 1 && (
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

                  {/* Colour for this car (hidden for Bespoke) */}
                  {!isBespoke && (
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
                  )}

                  {/* Piping for this car (if Elite) */}
                  {hasPiping && (
                    <div className="mb-5 pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="block text-[11px] font-bold tracking-[2px] uppercase text-slate-600">
                          Contrast Piping:{' '}
                          <span className="font-semibold text-slate-900">
                            {carPiping.name}
                            {carPiping.id !== 'none' ? ' (+₹1,999)' : ''}
                          </span>
                        </span>
                        <span className="text-[11px] text-[#cca462] font-semibold bg-[#cca462]/10 px-2 py-0.5 rounded-full">
                          +₹1,999 optional trim
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {PIPING_OPTIONS.map((o) => {
                          const on = o.id === car.pipingId;
                          const isPaid = o.id !== 'none';
                          return (
                            <button
                              key={o.id}
                              type="button"
                              onClick={() => updateCar(car.id, { pipingId: o.id })}
                              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs cursor-pointer transition-colors ${
                                on ? 'border-black bg-black text-white font-medium' : 'border-slate-300 hover:border-black text-black bg-white'
                              }`}
                            >
                              {o.id !== 'none' && (
                                <span className="w-3.5 h-3.5 rounded-full border border-slate-400" style={{ background: o.hex }} />
                              )}
                              <span>{o.name}</span>
                              {isPaid && (
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
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
                    </div>
                  )}

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
                      {car.quantity} × {formatINR(unitPrice)} = {formatINR(lineTotal)}
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

        <Block
          n={2}
          title="Additional information"
          hint={
            isUnveiling
              ? 'Optional. Tell us anything else we should know about your launch date, showroom or reveal event.'
              : 'Optional. Tell us anything else we should know about your car or your cover.'
          }
        >
          <textarea
            className={`${FIELD} min-h-[130px] resize-y`}
            maxLength={500}
            placeholder={
              isUnveiling
                ? 'e.g. dealership name, reveal date, logo or monogram embroidery requirements...'
                : 'e.g. custom text or logo, any body kit or spoiler...'
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
                style={{ background: previewColor.hex }}
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            {hasPiping && previewPiping.id !== 'none' && (
              <span className="absolute bottom-0 inset-x-0 h-[3px]" style={{ background: previewPiping.hex }} />
            )}
            <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white/90">Live preview</span>
          </div>
        </div>
        <div className="p-7">
          <span className="block text-[11px] font-bold tracking-[3px] uppercase text-[#cca462] mb-3">Your order</span>
          <Row k="Cover" v={fabric.title} />

          <div className="py-2.5 border-b border-white/10 text-xs">
            <div className="flex justify-between text-white/50 mb-1.5 uppercase tracking-wider text-[10px] font-bold">
              <span>Vehicles ({cars.length})</span>
              <span>Subtotal</span>
            </div>
            <div className="space-y-1.5">
              {cars.map((c, i) => {
                const cName = c.brand.trim() || c.model.trim() ? `${c.brand.trim()} ${c.model.trim()}` : `Vehicle #${i + 1}`;
                const cCol = isBespoke ? 'Custom' : FABRIC_COLORS.find((fc) => fc.id === c.colorId)?.name || '';
                const cPiping = hasPiping && c.pipingId !== 'none' ? ` · Piping: ${c.pipingId}` : '';
                const pCost = hasPiping && c.pipingId !== 'none' ? PIPING_PRICE : 0;
                const uPrice = fabric.price + pCost;
                return (
                  <div key={c.id} className="flex justify-between items-center text-white/90">
                    <span className="truncate max-w-[210px] text-[13px]">
                      {c.quantity}× {cName} <span className="text-white/40 text-[11px]">({cCol}{cPiping})</span>
                    </span>
                    <span className="font-mono text-white">{formatINR(uPrice * c.quantity)}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Row k="Total covers" v={`${totalCovers} ${totalCovers === 1 ? 'cover' : 'covers'}`} />
          <Row k="Notes" v={notes.trim() ? (notes.trim().length > 28 ? notes.trim().slice(0, 28) + '...' : notes.trim()) : 'None'} />
          <Row k="Subtotal" v={formatINR(subtotal)} />
          <Row k="Shipping" v="Free" />
          <Row k="GST (18%)" v={formatINR(gst)} />

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
              ? `Add ${totalCovers} ${totalCovers === 1 ? 'cover' : 'covers'} to cart`
              : 'Enter all vehicle details'}
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
