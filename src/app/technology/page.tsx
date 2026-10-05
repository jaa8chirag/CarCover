'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ScanLine, Ruler, Scissors, Zap, Brush, ClipboardCheck, Cpu, Flame, Droplets, Sun, Wind, Layers, Thermometer, FlaskConical, Package,
} from 'lucide-react';
import PageShell from '@/components/PageShell';
import PageHero, { btnGlass, btnPrimary } from '@/components/PageHero';
import FabricLayers from '@/components/FabricLayers';

const PROCESS = [
  {
    icon: ScanLine,
    title: '3D Laser Scan',
    text: 'The vehicle is scanned with a handheld 3D laser scanner. Mirrors, antennas, spoilers and roof racks are captured to the millimetre.',
    tag: '800+ chassis profiles',
  },
  {
    icon: Ruler,
    title: 'CAD Pattern Design',
    text: 'The scan becomes a flat 2D pattern in CAD. Seam lines are placed along natural body creases so the cover sits without billowing.',
    tag: 'Zero-sag fit',
  },
  {
    icon: Scissors,
    title: 'CNC Laser Cutting',
    text: 'Fabric panels are cut by a computer-controlled laser. The heat seals each edge, so nothing frays and every panel is identical.',
    tag: '±1 mm tolerance',
  },
  {
    icon: Zap,
    title: 'Ultrasonic Welding',
    text: 'On waterproof fabrics, seams are fused with ultrasound and heat-taped instead of simply stitched, closing every needle hole.',
    tag: 'Zero leakage seams',
  },
  {
    icon: Brush,
    title: 'Hand Finishing',
    text: 'Master tailors add contrast piping, elasticated hems, mirror pockets and your embroidered monogram by hand.',
    tag: 'Hand-finished',
  },
  {
    icon: ClipboardCheck,
    title: 'Fit Trial & QC',
    text: 'Each cover is tried on a vehicle jig, inspected, serial-stamped and packed in its own heavy-duty storage bag.',
    tag: '100% inspected',
  },
];

const MATERIALS = [
  { icon: Droplets, name: 'Nano-polymer membrane', use: 'Waterproof core of the Monsoon cover', spec: '10,000mm hydrostatic head', color: '#0284c7' },
  { icon: Sun, name: 'Metallised titanium composite', use: 'Reflective outer of the Heat-Shield cover', spec: '99.8% UV reflection', color: '#b45309' },
  { icon: Wind, name: 'Microporous vapour film', use: 'Lets trapped heat and moisture escape', spec: 'Breathable, condensation-free', color: '#0f766e' },
  { icon: Layers, name: 'Brushed microfibre fleece', use: 'Paint-contact lining on every cover', spec: 'Scratch-safe for PPF & ceramic', color: '#854d0e' },
  { icon: Flame, name: '600D ripstop canvas', use: 'Heavy-duty 4x4 and overland cover', spec: 'Tear-proof ballistic weave', color: '#334155' },
  { icon: Thermometer, name: 'UV-stable bonded thread', use: 'All stitching and piping', spec: 'Does not rot or fade in sun', color: '#be123c' },
];

const MACHINES = [
  { icon: ScanLine, name: '3D Laser Scanner', note: 'Captures the true shape of each car' },
  { icon: Cpu, name: 'CAD / CAM Software', note: 'Pattern design and nesting' },
  { icon: Scissors, name: 'CNC Laser Cutter', note: 'Sealed, fray-free panels' },
  { icon: Zap, name: 'Ultrasonic Welder', note: 'Leak-proof seam fusing' },
  { icon: FlaskConical, name: 'Hydrostatic Tester', note: 'Verifies waterproof rating' },
  { icon: Package, name: 'Embroidery Machines', note: 'Monograms and logos' },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

function SectionHead({ kicker, title, sub, light }: { kicker: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
      <span className="am-kicker">{kicker}</span>
      <h2
        className={`uppercase ${light ? 'text-white' : 'text-slate-950'}`}
        style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(24px, 3.4vw, 42px)', lineHeight: 1.15 }}
      >
        {title}
      </h2>
      {sub && <p className={`mt-4 ${light ? 'text-white/65' : 'text-slate-600'}`}>{sub}</p>}
    </div>
  );
}

export default function TechnologyPage() {
  return (
    <PageShell>
      {({ openEnquiry }) => (
        <>
          <PageHero
            kicker="TECHNOLOGY & CRAFT"
            title="How Your Cover"
            accent="Is Made"
            lead="From a 3D scan of your car to the final hand-stitched seam. See the materials, machines and people behind every cover."
            image="/images/craftsmanship.jpg"
            stats={[
              { value: '6', label: 'Production Steps' },
              { value: '±1mm', label: 'Cutting Accuracy' },
              { value: '99.8%', label: 'UV Rays Blocked' },
              { value: '5,000h', label: 'Lab Stress Tested' },
            ]}
          >
            <a href="#process" className={btnPrimary + ' no-underline'}>See How It&apos;s Made</a>
            <button onClick={openEnquiry} className={btnGlass}>Order Swatch Kit</button>
          </PageHero>

          {/* Process timeline */}
          <section id="process" className="py-20 sm:py-28 bg-[#f8fafc]">
            <div className="container-am max-w-6xl">
              <SectionHead kicker="THE PROCESS" title="From Scan To Your Doorstep" sub="Six steps, one standard. Nothing is off the shelf." />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROCESS.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div
                      key={p.title}
                      {...fadeUp}
                      transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }}
                      className="group relative bg-white rounded-3xl p-8 border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                    >
                      <span
                        className="absolute -top-2 right-4 text-[88px] leading-none font-semibold text-slate-950/[0.045] select-none"
                        style={{ fontFamily: 'var(--font-hype)' }}
                      >
                        0{i + 1}
                      </span>
                      <span className="relative w-14 h-14 rounded-2xl bg-slate-950 text-[#cca462] flex items-center justify-center mb-6 group-hover:bg-[#00665e] group-hover:text-white transition-colors">
                        <Icon size={26} />
                      </span>
                      <h3 className="relative text-lg font-bold text-slate-950">{p.title}</h3>
                      <p className="relative mt-3 text-sm text-slate-600 leading-relaxed">{p.text}</p>
                      <span className="relative inline-block mt-5 text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full bg-[#00665e]/10 text-[#00665e]">
                        {p.tag}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Materials */}
          <section className="py-20 sm:py-28 bg-[#050808] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(0,102,94,0.35),transparent_55%)]" />
            <div className="container-am max-w-6xl relative">
              <SectionHead light kicker="WHAT WE USE" title="Materials Engineered For India" sub="Each material is chosen for one job and tested against Indian heat, rain and dust." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {MATERIALS.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <motion.div
                      key={m.name}
                      {...fadeUp}
                      transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }}
                      className="rounded-3xl p-7 bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/25 transition-all"
                    >
                      <span className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${m.color}33`, color: '#fff' }}>
                        <Icon size={22} />
                      </span>
                      <h3 className="font-bold">{m.name}</h3>
                      <p className="text-sm text-white/60 mt-1.5">{m.use}</p>
                      <div className="mt-5 pt-4 border-t border-white/10 text-xs font-semibold tracking-wide text-[#cca462]">{m.spec}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Machines */}
          <section className="py-20 sm:py-28 bg-white">
            <div className="container-am max-w-6xl">
              <SectionHead kicker="THE ATELIER FLOOR" title="Machines & Tools" sub="Precision equipment, run by experienced craftspeople." />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {MACHINES.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <motion.div
                      key={m.name}
                      {...fadeUp}
                      transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}
                      className="rounded-2xl p-6 border border-slate-200 bg-[#f8fafc] hover:bg-white hover:shadow-xl transition-all text-center"
                    >
                      <span className="w-14 h-14 mx-auto rounded-full bg-white border border-slate-200 text-[#00665e] flex items-center justify-center mb-4 shadow-sm">
                        <Icon size={24} />
                      </span>
                      <h3 className="font-bold text-slate-950 text-sm sm:text-base">{m.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">{m.note}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Four layers + certification */}
          <FabricLayers onOpenEnquiry={openEnquiry} />
        </>
      )}
    </PageShell>
  );
}
