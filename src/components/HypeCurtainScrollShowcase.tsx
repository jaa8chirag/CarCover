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
  /** Phone-only photo; laptops keep bgSrc. */
  bgSrcMobile?: string;
  bgPos?: string;
  /** Extra scrim for light photos so white text stays readable. */
  bright?: boolean;
  /** Desktop-only zoom and focal point, used to keep the subject clear of the headline. */
  bgSizeMd?: string;
  bgPosMd?: string;
  tierId: string;
  ctaText: string;
  accentColor: string;
  nextPreviewName: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'signature-fit',
    category: 'THE SIGNATURE FIT',
    title: 'EVERY CURVE. TAILORED TO THE MILLIMETRE.',
    tagline: 'A cover that fits your car like a second skin.',
    description:
      'Cut from a 3D scan of your exact model, with mirror pockets and sculpted contours. Four-way stretch fleece that follows every body line without a single wrinkle.',
    bgSrc: '/images/ferrari_red_cover.jpg',
    bgPos: 'center 45%',
    bgPosMd: 'center 58%',
    bright: true,
    tierId: 'indoor',
    ctaText: 'EXPLORE INDOOR',
    accentColor: '#ef4444',
    nextPreviewName: 'Showroom Presentation',
  },
  {
    id: 'showroom-unveil',
    category: 'SHOWROOM PRESENTATION',
    title: 'WHERE EVERY UNVEILING BEGINS.',
    tagline: 'Your monogram. Your colours. Your car.',
    description:
      'Custom embroidery and contrast piping on premium stretch fabric, made for collectors, showrooms and launch events.',
    bgSrc: '/images/cover_hero.jpg',
    bgSrcMobile: '/images/rr_cullinan_cover.jpg',
    bgPos: 'center 40%',
    bgPosMd: 'center 55%',
    tierId: 'bespoke',
    ctaText: 'EXPLORE BESPOKE',
    accentColor: '#cca462',
    nextPreviewName: 'The Apex of Bespoke Preservation',
  },
  {
    id: 'bespoke-veiled',
    category: 'THE APEX OF BESPOKE PRESERVATION',
    title: 'THE FINEST CARS ARRIVE VEILED.',
    tagline: 'One vehicle. One bespoke cover. Entirely yours.',
    description:
      'Precision 3D-laser CAD tailored automotive covers engineered for India’s extreme climate. Rolls-Royce, Bentley, Porsche, Aston Martin & bespoke collections.',
    bgSrc: '/images/rr_cullinan_cover.jpg',
    bgPos: 'center 40%',
    bgPosMd: 'center 38%',
    bright: true,
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
    bgSrc: '/images/porsche_speedster.jpg',
    bgPos: 'center 38%',
    bgPosMd: 'center 30%',
    bright: true,
    tierId: 'monsoon',
    ctaText: 'EXPLORE AQUASHIELD',
    accentColor: '#38bdf8',
    nextPreviewName: 'Concours Cellular Silk',
  },
  {
    id: 'atelier-commission',
    category: 'ATELIER COMMISSION',
    title: 'NOT OFF THE SHELF. COMMISSIONED ONLY FOR YOU.',
    tagline: 'Hand-embroidered monograms, contrast piping & locking security.',
    description:
      'Tailored with your initials, vehicle registration, and custom contrast stitch in gold or silver thread with heavy-duty underbody wind-locks.',
    bgSrc: '/images/reveal.jpg',
    bgPos: 'center 86%',
    bright: true,
    tierId: 'atelier',
    ctaText: 'START COMMISSION',
    accentColor: '#10b981',
    nextPreviewName: 'Online 3D Configurator',
  },
  {
    id: 'indoor-silk',
    category: 'CONCOURS GARAGE SANCTUARY',
    title: 'SHOWROOM ELEGANCE. PURE VELVET EMBRACE.',
    tagline: 'Where your vehicle rests in absolute silence and velvet luxury.',
    description:
      'Form-hugging four-way micro-stretch fleece that clings sensually to every curve. Buttery underside certified 100% scratch-proof for fresh ceramic coatings.',
    bgSrc: '/images/rr_garage.jpg',
    bgPos: 'center 64%',
    tierId: 'indoor',
    ctaText: 'EXPLORE VELVET',
    accentColor: '#cca462',
    nextPreviewName: 'Titanium Thermoflect Shield',
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
      className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center cursor-default max-md:block max-md:!pt-0 max-md:!pb-0 max-md:bg-[#0a0a0a]"
      style={{ minHeight: '680px', paddingTop: 'calc(var(--header-height) + 24px)', paddingBottom: 'clamp(96px, 16vh, 170px)' }}
    >
      {/* 1. Fixed Parallax Background Image (Crystal-clear visibility) */}
      <div
        style={{
          ['--bgi' as string]: `url(${slide.bgSrcMobile ?? slide.bgSrc})`,
          ['--bgi-md' as string]: `url(${slide.bgSrc})`,
          filter: 'brightness(1.18) contrast(1.05) saturate(1.1)',
          ['--bgp' as string]: slide.bgPos ?? 'center center',
          ['--bgs-md' as string]: slide.bgSizeMd ?? 'cover',
          ['--bgp-md' as string]: slide.bgPosMd ?? slide.bgPos ?? 'center center',
        }}
        className={`absolute inset-0 w-full h-full z-0 bg-no-repeat max-md:[animation:kenburns_16s_ease-in-out_infinite_alternate] [background-image:var(--bgi)] md:[background-image:var(--bgi-md)] [background-size:cover] [background-position:var(--bgp)] md:[background-size:var(--bgs-md)] md:[background-position:var(--bgp-md)] md:[background-attachment:fixed]`}
      />


      {/* 2. Zero / Invisible Overlay to preserve 100% pristine image visibility */}
      <div className={`absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15 z-[1] pointer-events-none ${slide.bright ? 'md:from-black/30 md:via-black/20 md:to-black/35' : 'md:from-black/10 md:via-black/0 md:to-black/25'}`} />

      {/* 3. Text Content: Glides UP into place with Crisp Staggered Motion */}
      <motion.div
        initial={index === 0 ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className={`relative z-10 text-center text-white px-6 max-w-4xl mx-auto flex flex-col items-center [text-shadow:0_2px_20px_rgba(0,0,0,0.55)] max-md:absolute max-md:inset-x-0 max-md:bottom-0 max-md:max-w-none max-md:items-start max-md:text-left max-md:bg-gradient-to-t max-md:from-black/80 max-md:via-black/45 max-md:to-transparent max-md:pt-32 max-md:pb-10`}
      >
        <span className="md:hidden mb-3 font-lexendpeta text-[11px] font-semibold tracking-[3px]" style={{ color: slide.accentColor }}>
          {String(index + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>

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
          <h1 className={`uppercase font-lexendpeta tracking-[0.1em] sm:tracking-[0.2em] text-[21px] min-[420px]:text-2xl sm:text-4xl md:text-4xl lg:text-[clamp(30px,min(4.4vw,7.2vh),60px)] font-bold leading-tight text-white break-words`}>
            {slide.title}
          </h1>
        </motion.div>

        {/* Golden Hairline Divider (Expands from center) */}
        <motion.div
          variants={{ hidden: { width: 0, opacity: 0 }, visible: { width: '120px', opacity: 1 } }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className={`h-[1px] mx-auto mb-6 max-md:mx-0`}
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
          className={`text-white text-base sm:text-lg md:text-lg lg:text-[clamp(15px,2.6vh,20px)] max-w-3xl mx-auto mb-3 font-normal tracking-wide max-md:mx-0`}
        >
          {slide.tagline}
        </motion.p>

        {/* Description Paragraph */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className={`text-white/80 text-[13px] sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed font-light max-md:mx-0`}
        >
          {slide.description}
        </motion.p>

        {index === 0 && (
          <motion.a
            href="/collections"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-[#cca462] text-black text-xs font-bold uppercase tracking-[2.5px] no-underline transition-colors shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
          >
            Shop Car Covers <span aria-hidden>→</span>
          </motion.a>
        )}
      </motion.div>
    </div>
  );
}

const KENBURNS_CSS = `@keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.14) translateY(-2%); } }`;

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
      <style>{KENBURNS_CSS}</style>
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

