'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Search, Check, ArrowLeft, ArrowRight, ShoppingBag, Car, Palette, Type, Layers, ClipboardCheck, Sparkles, Flame } from 'lucide-react';
import { CAR_BRANDS, FABRIC_COLORS, PIPING_COLORS, SIZE_TIERS, brandLogoSrc, getSizeTier, priceForTier } from '@/data/carData';
import { FABRICS } from '@/data/fabrics';

interface Props {
  fabricId: string | null;
  onFabricChange: (id: string) => void;
  onAddToCart: (item: any) => void;
}

const STEPS = [
  { label: 'Brand', icon: Car },
  { label: 'Model', icon: Car },
  { label: 'Fabric', icon: Layers },
  { label: 'Design', icon: Palette },
  { label: 'Personalise', icon: Type },
  { label: 'Review', icon: ClipboardCheck },
];

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

const COVER_PATHS: Record<string, string> = {
  suv: 'M40 200 L40 150 Q45 120 90 112 L170 100 Q200 60 260 52 L430 52 Q480 56 500 100 L545 112 Q565 125 565 160 L565 200 Z',
  'super-tourer': 'M35 200 L35 160 Q40 138 85 130 L190 112 Q230 78 290 74 L390 74 Q440 80 470 112 L545 128 Q570 140 570 165 L570 200 Z',
  coupe: 'M45 200 L45 155 Q50 125 95 115 L180 105 Q215 62 275 58 L400 58 Q450 62 478 108 L535 120 Q558 132 558 165 L558 200 Z',
  hypercar: 'M30 200 L30 168 Q40 148 100 138 L210 120 Q260 92 330 88 L420 90 Q480 100 520 130 L560 142 Q575 152 575 170 L575 200 Z',
};

const POPULAR = [
  ['mahindra', 'thar-roxx', 'Thar Roxx'],
  ['toyota', 'fortuner', 'Fortuner'],
  ['hyundai', 'creta', 'Creta'],
  ['mahindra', 'scorpio-n', 'Scorpio-N'],
  ['tata', 'nexon', 'Nexon'],
  ['maruti-suzuki', 'swift', 'Swift'],
  ['mahindra', 'xuv700', 'XUV700'],
  ['toyota', 'innova-hycross', 'Innova Hycross'],
] as const;

const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');

const FIELD =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#00665e]/10 focus:border-[#00665e]';

export default function CoverStudio({ fabricId, onFabricChange, onAddToCart }: Props) {
  const [step, setStep] = useState(0);
  const [brandId, setBrandId] = useState<string | null>(null);
  const [modelId, setModelId] = useState<string | null>(null);
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
  const [brandQuery, setBrandQuery] = useState('');
  const [modelQuery, setModelQuery] = useState('');
  const [added, setAdded] = useState(false);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

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

  const brands = useMemo(() => {
    const q = brandQuery.trim().toLowerCase();
    return CAR_BRANDS.filter((b) => !q || b.name.toLowerCase().includes(q));
  }, [brandQuery]);

  const models = useMemo(() => {
    const q = modelQuery.trim().toLowerCase();
    return (brand?.models ?? []).filter((m) => !q || m.name.toLowerCase().includes(q));
  }, [brand, modelQuery]);

  const canNext = [!!brand, !!model && !!year && !!variant, !!fabric, true, true, true][step];

  const pickBrand = (id: string) => {
    if (id !== brandId) {
      setBrandId(id);
      setModelId(null);
      setModelQuery('');
    }
    setStep(1);
  };

  const quickPick = (bId: string, mId: string) => {
    const b = CAR_BRANDS.find((x) => x.id === bId);
    const m = b?.models.find((x) => x.id === mId);
    if (!b || !m) return;
    setBrandId(b.id);
    setModelId(m.id);
    setYear(m.years[0]);
    setVariant(m.variants[0]);
    setStep(2);
  };

  const pickModel = (id: string) => {
    const m = brand!.models.find((x) => x.id === id)!;
    setModelId(id);
    setYear(m.years[0]);
    setVariant(m.variants[0]);
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
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors: ['#cca462', '#00665e', '#ffffff'] });
    setTimeout(() => setAdded(false), 2500);
  };

  const primaryAction =
    step < STEPS.length - 1 ? (
      <button
        onClick={() => setStep((st) => st + 1)}
        disabled={!canNext}
        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0b1514] to-[#00665e] text-white text-xs font-bold uppercase tracking-[1.5px] flex items-center gap-2 shadow-lg shadow-[#00665e]/25 disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-125 hover:-translate-y-0.5 transition-all cursor-pointer"
      >
        Continue <ArrowRight size={14} />
      </button>
    ) : (
      <button
        onClick={addToCart}
        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00665e] to-[#00a396] text-white text-xs font-bold uppercase tracking-[1.5px] flex items-center gap-2 shadow-xl shadow-[#00665e]/40 hover:brightness-110 hover:-translate-y-0.5 transition-all cursor-pointer"
      >
        {added ? <Check size={15} /> : <ShoppingBag size={15} />}
        {added ? 'Added to cart' : `Add to cart · ${formatINR(total)}`}
      </button>
    );

  const coverPath = COVER_PATHS[model?.silhouette ?? 'suv'] ?? COVER_PATHS.suv;

  return (
    <section id="studio" className="scroll-mt-24 pt-6 pb-28 lg:pb-24 bg-gradient-to-b from-[#f4f7f6] via-[#eaf1ef] to-[#f8fafc]">
      <div className="container-am max-w-7xl">
        {/* Stepper */}
        <ol className="flex items-center justify-between max-w-3xl mx-auto mb-10 sm:mb-12">
          {STEPS.map((s, i) => {
            const done = i < step;
            const active = i === step;
            const Icon = s.icon;
            return (
              <li key={s.label} className="flex-1 flex items-center last:flex-none">
                <button
                  onClick={() => i <= step && setStep(i)}
                  disabled={i > step}
                  className="flex flex-col items-center gap-1.5 cursor-pointer disabled:cursor-default"
                  aria-current={active ? 'step' : undefined}
                >
                  <span
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 transition-all ${
                      done
                        ? 'bg-[#00665e] border-[#00665e] text-white'
                        : active
                          ? 'bg-slate-950 border-slate-950 text-[#cca462] scale-110 shadow-lg'
                          : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    {done ? <Check size={17} /> : <Icon size={17} />}
                  </span>
                  <span className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase ${active ? 'text-slate-950' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <span className="flex-1 h-0.5 mx-1 sm:mx-2 mb-5 rounded bg-slate-200 overflow-hidden">
                    <motion.span
                      className="block h-full bg-[#00665e]"
                      initial={false}
                      animate={{ width: done ? '100%' : '0%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: steps */}
          <div className="relative overflow-hidden lg:col-span-7 bg-white rounded-3xl border border-slate-200/70 shadow-xl shadow-slate-300/40 p-6 sm:p-9 min-h-[520px] flex flex-col">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00665e] via-[#cca462] to-[#00665e]" />
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.28 }}
                >
                  {step === 0 && (
                    <>
                      <StepTitle n={1} title="Choose your car brand" sub={`${CAR_BRANDS.length} brands sold in India`} />
                      <div className="mb-5">
                        <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5 mb-2.5">
                          <Flame size={13} className="text-orange-500" /> Popular in India · quick pick
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {POPULAR.map(([b, m, label]) => (
                            <button
                              key={m}
                              onClick={() => quickPick(b, m)}
                              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-gradient-to-b from-white to-slate-50 border border-slate-200 text-slate-700 hover:border-[#00665e] hover:text-[#00665e] hover:shadow-md transition-all cursor-pointer"
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <SearchBox value={brandQuery} onChange={setBrandQuery} placeholder="Or search any brand, e.g. Hyundai" />
                      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                        {brands.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => pickBrand(b.id)}
                            className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                              brandId === b.id ? 'border-[#00665e] bg-[#00665e]/5 shadow-md' : 'border-slate-200 hover:border-[#00665e]/50 hover:shadow-lg hover:-translate-y-0.5 bg-white'
                            }`}
                          >
                            <BrandLogo id={b.id} name={b.name} className="w-14 h-14 mb-3 group-hover:scale-105 transition-transform" />
                            <span className="block font-bold text-sm text-slate-950 leading-tight">{b.name}</span>
                            <span className="block text-xs text-slate-500 mt-0.5">{b.models.length} models</span>
                          </button>
                        ))}
                        {brands.length === 0 && <p className="col-span-full text-sm text-slate-500 py-8 text-center">No brand found.</p>}
                      </div>
                    </>
                  )}

                  {step === 1 && brand && (
                    <>
                      <div className="flex items-center gap-4 mb-1">
                        <BrandLogo id={brand.id} name={brand.name} className="w-16 h-16 flex-shrink-0" />
                        <div className="flex-1"><StepTitle n={2} title={`Select your ${brand.name} model`} sub="Then confirm year and variant" /></div>
                      </div>
                      <SearchBox value={modelQuery} onChange={setModelQuery} placeholder="Search model" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {models.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => pickModel(m.id)}
                            className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                              modelId === m.id ? 'border-[#00665e] bg-[#00665e]/5' : 'border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            <span className="block font-bold text-sm text-slate-950">{m.name}</span>
                            <span className="block text-xs text-slate-500 mt-0.5">{m.years.join(' · ')}</span>
                          </button>
                        ))}
                      </div>
                      {model && (
                        <div className="grid sm:grid-cols-2 gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                          <div>
                            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 block mb-2">Year</span>
                            <div className="flex flex-wrap gap-2">
                              {model.years.map((y) => (
                                <Chip key={y} active={year === y} onClick={() => setYear(y)}>{y}</Chip>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 block mb-2">Variant</span>
                            <div className="flex flex-wrap gap-2">
                              {model.variants.map((v) => (
                                <Chip key={v} active={variant === v} onClick={() => setVariant(v)}>{v}</Chip>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <StepTitle
                        n={3}
                        title="Choose your fabric"
                        sub={tier ? `Priced for ${SIZE_TIERS[tier].label}` : 'Starting prices'}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FABRICS.map((f) => {
                          const Icon = f.icon;
                          const active = f.id === fabricId;
                          return (
                            <button
                              key={f.id}
                              onClick={() => onFabricChange(f.id)}
                              className="text-left rounded-2xl border-2 overflow-hidden transition-all cursor-pointer bg-white hover:shadow-lg"
                              style={{ borderColor: active ? f.accentColor : '#e2e8f0' }}
                            >
                              <div className="relative h-28 overflow-hidden">
                                <img src={f.image} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <span className="absolute bottom-2 left-3 text-[10px] font-bold tracking-[2px] text-white">{f.badge}</span>
                                {f.bestseller && (
                                  <span className="absolute top-2 left-2 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-[#cca462] to-[#b38848] text-slate-950 shadow">
                                    BESTSELLER
                                  </span>
                                )}
                                {active && (
                                  <span className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ background: f.accentColor }}>
                                    <Check size={15} />
                                  </span>
                                )}
                              </div>
                              <div className="p-4">
                                <div className="flex items-center gap-2" style={{ color: f.accentColor }}>
                                  <Icon size={16} />
                                  <span className="text-xs font-bold">{f.subtitle}</span>
                                </div>
                                <h4 className="font-bold text-sm text-slate-950 mt-1 leading-snug">{f.title}</h4>
                                {f.rating && (
                                  <p className="text-xs text-slate-600 mt-2 flex items-center gap-1">
                                    <span className="text-amber-500">★</span>
                                    <strong>{f.rating}</strong>
                                    <span className="text-slate-400">({f.reviewCount?.toLocaleString('en-IN')} reviews)</span>
                                  </p>
                                )}
                                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{f.specs[0]}</p>
                                <span className="block mt-3 text-xl font-semibold text-slate-950" style={{ fontFamily: 'var(--font-hype)' }}>
                                  {formatINR(tier ? priceForTier(f.price, tier) : f.price)}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <StepTitle n={4} title="Design your cover" sub="Body colour and contrast piping" />
                      <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 block mb-3">Body colour · {color.name}</span>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {FABRIC_COLORS.map((c) => (
                          <Swatch key={c.id} hex={c.hex} name={c.name} active={c.id === colorId} onClick={() => setColorId(c.id)} />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 block mb-3">Contrast piping · {piping.name}</span>
                      <div className="flex flex-wrap gap-3">
                        {PIPING_COLORS.map((c) => (
                          <Swatch key={c.id} hex={c.hex} name={c.name} active={c.id === pipingId} onClick={() => setPipingId(c.id)} />
                        ))}
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <StepTitle n={5} title="Make it yours" sub="Embroidered name and extras" />
                      <label className="block mb-5">
                        <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 block mb-2">Name / monogram (optional)</span>
                        <input
                          value={monogram}
                          maxLength={14}
                          onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                          placeholder="e.g. SINGHANIA"
                          className={FIELD + ' tracking-[0.25em] font-semibold'}
                        />
                        <span className="text-xs text-slate-400 mt-1 block">{monogram.length}/14 characters</span>
                      </label>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 block mb-3">Thread colour</span>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {TEXT_COLORS.map((t) => (
                          <Chip key={t.id} active={t.id === textColorId} onClick={() => setTextColorId(t.id)}>
                            <span className="inline-block w-3 h-3 rounded-full mr-2 border border-slate-300 align-middle" style={{ background: t.hex }} />
                            {t.name}
                          </Chip>
                        ))}
                      </div>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 block mb-3">Add-ons</span>
                      <div className="space-y-2.5">
                        {ADDONS.map((a) => {
                          const on = addons[a.id];
                          const locked = a.price === 0;
                          return (
                            <button
                              key={a.id}
                              disabled={locked}
                              onClick={() => setAddons({ ...addons, [a.id]: !on })}
                              className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                                on ? 'border-[#00665e] bg-[#00665e]/5' : 'border-slate-200'
                              } ${locked ? 'cursor-default' : 'cursor-pointer hover:border-slate-400'}`}
                            >
                              <span className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${on ? 'bg-[#00665e] text-white' : 'border-2 border-slate-300'}`}>
                                {on && <Check size={14} />}
                              </span>
                              <span className="flex-1 text-sm font-semibold text-slate-900">{a.label}</span>
                              <span className="text-xs font-bold text-slate-500">{a.price === 0 ? a.note : `+${formatINR(a.price)}`}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {step === 5 && brand && model && fabric && (
                    <>
                      <StepTitle n={6} title="Review your commission" sub="Everything look right?" />
                      <dl className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden text-sm">
                        {[
                          ['Vehicle', `${brand.name} ${model.name}`],
                          ['Year · Variant', `${year} · ${variant}`],
                          ['Fabric', fabric.title],
                          ['Body colour', color.name],
                          ['Piping', piping.name],
                          ['Monogram', monogram ? `${monogram} (${textColor.name})` : 'None'],
                          ['Size class', tier ? SIZE_TIERS[tier].label : '—'],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-6 px-5 py-3.5 bg-white">
                            <dt className="text-slate-500">{k}</dt>
                            <dd className="font-semibold text-slate-950 text-right">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="text-xs text-slate-500 mt-4 flex items-start gap-2">
                        <Sparkles size={14} className="text-[#b38848] mt-0.5 flex-shrink-0" />
                        Covered by our 100% fit guarantee. If it does not seat perfectly, we remake it free.
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 pt-8 mt-8 border-t border-slate-100">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-100 disabled:opacity-0 transition cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft size={14} /> Back
              </button>
              {primaryAction}
            </div>
          </div>

          {/* RIGHT: live preview - shows only what has been chosen */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#12302c] via-[#0a1413] to-[#050808] text-white shadow-2xl shadow-[#00665e]/20 ring-1 ring-white/10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(255,255,255,0.14),transparent_62%)]" />
              <div className="relative px-6 pt-5 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#cca462]">Live Preview</span>
                {tier && <span className="text-[10px] tracking-wider uppercase text-white/50">{SIZE_TIERS[tier].label}</span>}
              </div>

              <CoverPreview
                silhouette={model?.silhouette ?? 'suv'}
                fabricId={fabricId}
                bodyHex={color.hex}
                pipingHex={piping.hex}
                textHex={textColor.hex}
                monogram={monogram}
                mirrorPockets={addons.mirrorPockets}
                straps={addons.lockingUnderbodyStraps}
                chargerFlap={addons.batteryChargerFlap}
              />

              <div className="relative px-6 pb-6">
                <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-5">
                  <dl className="space-y-3 text-sm">
                    <Row label="Car">
                      {brand ? (
                        <span className="flex items-center gap-2 justify-end">
                          <BrandLogo id={brand.id} name={brand.name} className="w-7 h-7" />
                          <span className="font-semibold">{model ? `${brand.name} ${model.name}` : brand.name}</span>
                        </span>
                      ) : (
                        <span className="text-white/40">Not selected</span>
                      )}
                    </Row>
                    {model && year && <Row label="Variant"><span className="font-semibold">{year} · {variant}</span></Row>}
                    <Row label="Fabric">
                      {fabric ? <span className="font-semibold">{fabric.title}</span> : <span className="text-white/40">Not selected</span>}
                    </Row>
                    {step >= 3 && (
                      <>
                        <Row label="Colour">
                          <span className="flex items-center gap-2 justify-end font-semibold">
                            <i className="w-4 h-4 rounded-full border border-white/40" style={{ background: color.hex }} />
                            {color.name}
                          </span>
                        </Row>
                        <Row label="Piping">
                          <span className="flex items-center gap-2 justify-end font-semibold">
                            <i className="w-4 h-4 rounded-full border border-white/40" style={{ background: piping.hex }} />
                            {piping.name}
                          </span>
                        </Row>
                      </>
                    )}
                    {monogram.trim() && (
                      <Row label="Monogram">
                        <span className="font-semibold tracking-[0.2em]" style={{ color: textColor.hex }}>{monogram}</span>
                      </Row>
                    )}
                  </dl>

                  {fabric && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5 text-xs text-white/70">
                      <div className="flex justify-between"><span>Cover</span><span>{formatINR(basePrice)}</span></div>
                      {ADDONS.filter((a) => addons[a.id] && a.price > 0).map((a) => (
                        <div key={a.id} className="flex justify-between"><span>{a.label}</span><span>+{formatINR(a.price)}</span></div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-end justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/50">Total</span>
                    <span className="text-3xl font-semibold text-[#cca462]" style={{ fontFamily: 'var(--font-hype)' }}>
                      {fabric ? formatINR(total) : '—'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky buy bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-4 py-3 bg-white/85 backdrop-blur-xl border-t border-slate-200 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.15)] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[10px] uppercase tracking-wider text-slate-400">Step {step + 1} of 6 · Total</span>
          <span className="text-xl font-semibold text-slate-950" style={{ fontFamily: 'var(--font-hype)' }}>{fabric ? formatINR(total) : '—'}</span>
        </div>
        {primaryAction}
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-xs uppercase tracking-wider text-white/45 flex-shrink-0">{label}</dt>
      <dd className="text-right min-w-0">{children}</dd>
    </div>
  );
}

const SILHOUETTE_GEOMETRY: Record<string, { left: number; right: number; mirror: [number, number]; roofY: number }> = {
  suv: { left: 40, right: 565, mirror: [176, 108], roofY: 52 },
  'super-tourer': { left: 35, right: 570, mirror: [196, 122], roofY: 74 },
  coupe: { left: 45, right: 558, mirror: [184, 112], roofY: 58 },
  hypercar: { left: 30, right: 575, mirror: [214, 130], roofY: 88 },
};

/** Draws the cover on the car. Every visual here reflects an actual choice. */
function CoverPreview({
  silhouette, fabricId, bodyHex, pipingHex, textHex, monogram, mirrorPockets, straps, chargerFlap,
}: {
  silhouette: string;
  fabricId: string | null;
  bodyHex: string;
  pipingHex: string;
  textHex: string;
  monogram: string;
  mirrorPockets: boolean;
  straps: boolean;
  chargerFlap: boolean;
}) {
  const d = COVER_PATHS[silhouette] ?? COVER_PATHS.suv;
  const g = SILHOUETTE_GEOMETRY[silhouette] ?? SILHOUETTE_GEOMETRY.suv;
  const text = monogram.trim();
  const fontSize = text.length > 10 ? 15 : text.length > 6 ? 19 : 24;
  const midX = (g.left + g.right) / 2;

  return (
    <svg viewBox="0 0 600 260" className="relative w-full" role="img" aria-label="Live preview of your car cover">
      <defs>
        <linearGradient id="cs-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </linearGradient>
        {/* one texture per fabric, so changing fabric visibly changes the cover */}
        <pattern id="cs-tex-monsoon" width="26" height="26" patternUnits="userSpaceOnUse">
          <ellipse cx="6" cy="7" rx="2.2" ry="3.2" fill="#fff" opacity="0.38" />
          <ellipse cx="19" cy="16" rx="1.6" ry="2.4" fill="#fff" opacity="0.3" />
          <ellipse cx="9" cy="21" rx="1.2" ry="1.8" fill="#fff" opacity="0.25" />
        </pattern>
        <pattern id="cs-tex-heatshield" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="7" height="14" fill="#fff" opacity="0.22" />
        </pattern>
        <pattern id="cs-tex-indoor-velvet" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.9" fill="#fff" opacity="0.2" />
          <circle cx="4.5" cy="4.5" r="0.9" fill="#000" opacity="0.18" />
        </pattern>
        <pattern id="cs-tex-offroad-armor" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 0H12M0 0V12" stroke="#000" strokeWidth="1.2" opacity="0.32" />
          <path d="M6 0V12M0 6H12" stroke="#fff" strokeWidth="0.6" opacity="0.18" />
        </pattern>
        <clipPath id="cs-clip"><path d={d} /></clipPath>
      </defs>

      <ellipse cx={midX} cy="224" rx="265" ry="13" fill="#000" opacity="0.55" />

      {[140, 470].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="200" r="38" fill="#0b0b0c" />
          <circle cx={cx} cy="200" r="20" fill="#30343a" />
          <circle cx={cx} cy="200" r="6" fill="#0b0b0c" />
        </g>
      ))}

      {/* locking underbody straps hang below the hem */}
      {straps &&
        [midX - 70, midX + 70].map((x) => (
          <g key={x}>
            <rect x={x - 5} y="194" width="10" height="34" rx="2" fill={pipingHex} />
            <rect x={x - 8} y="220" width="16" height="9" rx="2" fill="#9ca3af" stroke="#4b5563" strokeWidth="1.2" />
          </g>
        ))}

      <path d={d} fill={bodyHex} style={{ transition: 'fill 0.35s ease' }} />
      {fabricId && (
        <g clipPath="url(#cs-clip)">
          <rect x="0" y="0" width="600" height="230" fill={`url(#cs-tex-${fabricId})`} />
        </g>
      )}
      <path d={d} fill="url(#cs-sheen)" />

      {/* hem piping + outline piping: both follow the chosen piping colour */}
      <line x1={g.left + 6} y1="190" x2={g.right - 6} y2="190" stroke={pipingHex} strokeWidth="4" strokeLinecap="round" style={{ transition: 'stroke 0.35s ease' }} />
      <path d={d} fill="none" stroke={pipingHex} strokeWidth="5" strokeLinejoin="round" style={{ transition: 'stroke 0.35s ease' }} />

      {mirrorPockets && (
        <g>
          <ellipse cx={g.mirror[0]} cy={g.mirror[1]} rx="19" ry="10" fill={bodyHex} stroke={pipingHex} strokeWidth="3" />
          <ellipse cx={g.mirror[0]} cy={g.mirror[1]} rx="19" ry="10" fill="url(#cs-sheen)" />
        </g>
      )}

      {chargerFlap && (
        <g>
          <rect x={g.left + 10} y="160" width="30" height="22" rx="4" fill="#000" opacity="0.28" />
          <rect x={g.left + 10} y="160" width="30" height="22" rx="4" fill="none" stroke={pipingHex} strokeWidth="2.5" />
          <circle cx={g.left + 36} cy="171" r="2.2" fill={pipingHex} />
        </g>
      )}

      {text && (
        <text
          x={midX + 20}
          y="156"
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight="700"
          letterSpacing="4"
          fill={textHex}
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="0.6"
          paintOrder="stroke"
          style={{ fontFamily: 'var(--font-hype)' }}
        >
          {text}
        </text>
      )}
    </svg>
  );
}

function BrandLogo({ id, name, className = '' }: { id: string; name: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const src = brandLogoSrc(id);
  return (
    <span className={`rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden p-1.5 ${className}`}>
      {src && !failed ? (
        <img src={src} alt={`${name} logo`} loading="lazy" onError={() => setFailed(true)} className="max-w-full max-h-full object-contain" />
      ) : (
        <span className="font-bold text-slate-700">{name[0]}</span>
      )}
    </span>
  );
}

function StepTitle({ n, title, sub }: { n: number; title: string; sub: string }) {
  return (
    <div className="mb-6">
      <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#b38848]">Step {n} of 6</span>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1">{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{sub}</p>
    </div>
  );
}

function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative mb-4">
      <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={FIELD + ' pl-11'} />
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all cursor-pointer ${
        active ? 'border-[#00665e] bg-[#00665e] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
      }`}
    >
      {children}
    </button>
  );
}

function Swatch({ hex, name, active, onClick }: { hex: string; name: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} title={name} aria-label={name} className="group relative cursor-pointer">
      <span
        className={`block w-12 h-12 rounded-full border-2 transition-all ${active ? 'border-[#00665e] scale-110 shadow-lg' : 'border-slate-200 group-hover:scale-105'}`}
        style={{ background: hex, boxShadow: active ? `0 0 0 4px #fff inset` : undefined }}
      />
      {active && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00665e] text-white flex items-center justify-center">
          <Check size={11} />
        </span>
      )}
    </button>
  );
}
