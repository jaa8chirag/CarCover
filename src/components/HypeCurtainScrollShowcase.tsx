'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SlideData {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  bgSrc: string;
  tierId: string;
  ctaText: string;
  accentColor: string;
  nextPreviewName: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'bespoke-veiled',
    category: 'THE APEX OF BESPOKE PRESERVATION',
    title: 'THE FINEST CARS ARRIVE VEILED.',
    tagline: 'One vehicle. One bespoke cover. Entirely yours.',
    description:
      'Precision 3D-laser CAD tailored automotive covers engineered for India’s extreme climate. Rolls-Royce, Bentley, Porsche, Aston Martin & bespoke collections.',
    bgSrc: '/images/cover_hero.jpg',
    tierId: 'bespoke',
    ctaText: 'EXPLORE BESPOKE',
    accentColor: '#cca462',
    nextPreviewName: 'AquaShield+ Monsoon Defiance',
  },
  {
    id: 'monsoon-armor',
    category: 'AQUASHIELD MONSOON ARMOR',
    title: 'TORRENTIAL MONSOONS. ZERO PENETRATION.',
    tagline: 'At 10,000mm hydrostatic head, rain simply ceases to exist.',
    description:
      'Multi-ply nano-welded storm fabric engineered to repel India’s fiercest monsoons, acidic industrial fallout, and dust storms while micro-venting heat.',
    bgSrc: '/images/cover_monsoon.jpg',
    tierId: 'monsoon',
    ctaText: 'EXPLORE AQUASHIELD',
    accentColor: '#38bdf8',
    nextPreviewName: 'Concours Cellular Silk',
  },
  {
    id: 'indoor-silk',
    category: 'CONCOURS GARAGE SANCTUARY',
    title: 'SHOWROOM ELEGANCE. PURE VELVET EMBRACE.',
    tagline: 'Where your vehicle rests in absolute silence and velvet luxury.',
    description:
      'Form-hugging four-way micro-stretch fleece that clings sensually to every curve. Buttery underside certified 100% scratch-proof for fresh ceramic coatings.',
    bgSrc: '/images/reveal.jpg',
    tierId: 'indoor',
    ctaText: 'EXPLORE VELVET',
    accentColor: '#cca462',
    nextPreviewName: 'Titanium Thermoflect Shield',
  },
  {
    id: 'solar-heatshield',
    category: 'SOLAR THERMAL BARRIER',
    title: 'DEFLECT THE SUN. PRESERVE THE LEATHER.',
    tagline: 'Drop interior cabin heat by up to 22°C under scorching summer sun.',
    description:
      'Aerospace metallized reflective composite reflecting 99.8% of harsh solar UV rays, shielding nappa leather, touchscreens, and dash trims from thermal fatigue.',
    bgSrc: '/images/cover_heatshield.jpg',
    tierId: 'heatshield',
    ctaText: 'EXPLORE HEATSHIELD',
    accentColor: '#f59e0b',
    nextPreviewName: 'The Yorkshire Atelier',
  },
  {
    id: 'atelier-commission',
    category: 'ATELIER COMMISSION',
    title: 'NOT OFF THE SHELF. COMMISSIONED ONLY FOR YOU.',
    tagline: 'Hand-embroidered monograms, contrast piping & locking security.',
    description:
      'Tailored with your initials, vehicle registration, and custom contrast stitch in gold or silver thread with heavy-duty underbody wind-locks.',
    bgSrc: '/images/craftsmanship.jpg',
    tierId: 'atelier',
    ctaText: 'START COMMISSION',
    accentColor: '#10b981',
    nextPreviewName: 'Online 3D Configurator',
  },
];

interface HypeCurtainScrollShowcaseProps {
  onOpenConfigurator: () => void;
  onOpenEnquiry: () => void;
  onSelectTier?: (tierId: string) => void;
}

// Single Hype Slide (Matches exact Hype.luxury structure: section with fixed background, scrim, sheen beam, and staggered text glide)
function HypeSection({
  slide,
  index,
  totalSlides,
  onCtaClick,
}: {
  slide: SlideData;
  index: number;
  totalSlides: number;
  onCtaClick: (tierId: string) => void;
}) {
  return (
    <div
      id={`slide-${index}`}
      data-index={index}
      className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center cursor-default"
      style={{ minHeight: '680px', paddingTop: 'calc(var(--header-height) + 24px)', paddingBottom: '48px' }}
    >
      {/* 1. Fixed Parallax Background Image (Crystal-clear visibility) */}
      <div
        style={{
          backgroundImage: `url(${slide.bgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
        className="absolute inset-0 w-full h-full z-0 md:[background-attachment:fixed]"
      />

      {/* 2. Zero / Invisible Overlay to preserve 100% pristine image visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/60 md:bg-none md:bg-transparent z-[1] pointer-events-none" />

      {/* 3. Text Content: Glides UP into place with Crisp Staggered Motion */}
      <motion.div
        initial={index === 0 ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Category Label */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="overflow-hidden mb-4"
        >
          <div className="inline-flex items-center gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: slide.accentColor, boxShadow: `0 0 10px ${slide.accentColor}` }}
            />
            <p
              className="uppercase font-lexendpeta tracking-[0.22em] sm:tracking-[0.45em] text-[10px] sm:text-sm font-semibold"
              style={{ color: slide.accentColor }}
            >
              {slide.category}
            </p>
          </div>
        </motion.div>

        {/* Massive Headline (Glides up crisp and clear without any murky black drop-shadow cloud) */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="overflow-hidden mb-6"
        >
          <h1 className="uppercase font-lexendpeta tracking-[0.1em] sm:tracking-[0.2em] text-[21px] min-[420px]:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white break-words">
            {slide.title}
          </h1>
        </motion.div>

        {/* Golden Hairline Divider (Expands from center) */}
        <motion.div
          variants={{ hidden: { width: 0, opacity: 0 }, visible: { width: '120px', opacity: 1 } }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="h-[1px] mx-auto mb-6"
          style={{
            background: `linear-gradient(90deg, transparent, ${slide.accentColor}, transparent)`,
            boxShadow: `0 0 12px ${slide.accentColor}`,
          }}
        />

        {/* Subtitle / Tagline */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1.0, ease: [0.19, 1, 0.22, 1] }}
          className="text-white text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-3 font-normal tracking-wide"
        >
          {slide.tagline}
        </motion.p>

        {/* Description Paragraph */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="text-white/90 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed font-light"
        >
          {slide.description}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function HypeCurtainScrollShowcase({
  onOpenConfigurator,
  onOpenEnquiry,
  onSelectTier,
}: HypeCurtainScrollShowcaseProps) {
  const numSlides = SLIDES.length;

  const handleCtaClick = (tierId: string) => {
    if (onSelectTier) {
      onSelectTier(tierId);
    }
    onOpenConfigurator();
  };

  return (
    <div className="relative w-full" id="hype-showcase-container">
      {/* 5 Hype Sections */}
      {SLIDES.map((slide, index) => (
        <HypeSection
          key={slide.id}
          slide={slide}
          index={index}
          totalSlides={numSlides}
          onCtaClick={handleCtaClick}
        />
      ))}
    </div>
  );
}

