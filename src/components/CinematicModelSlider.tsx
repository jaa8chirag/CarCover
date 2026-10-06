'use client';

import React, { useState, useEffect, useRef } from 'react';
import AstonMartinLogo from './AstonMartinLogo';
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

interface ModelSlide {
  id: string;
  name: string;
  tagline: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  accentColor: string;
  recommendedCover: string;
  coverPrice: number;
}

const MODEL_SLIDES: ModelSlide[] = [
  {
    id: 'aquashield-monsoon',
    name: 'AQUASHIELD+ MONSOON',
    tagline: 'UNSTOPPABLE MONSOON DEFENSE',
    subtitle: 'Heavy-Duty 100% Waterproof SUV & Thar Edition',
    description: 'Engineered specifically for extreme Indian downpours and open street parking. 100% waterproof nano-membrane with heat-welded seams, mirror pockets, wind-lock buckles, and night-reflective neon piping.',
    specs: [
      { label: 'WATERPROOF', value: '10,000 MM+' },
      { label: 'WIND RESIST', value: '65 KM/H BUCKLES' },
      { label: 'FABRIC', value: '5-PLY NANO-SHIELD' },
      { label: 'WARRANTY', value: '3-YR REPLACEMENT' },
    ],
    image: '/images/cover_monsoon.jpg',
    accentColor: '#c5e838',
    recommendedCover: 'AquaShield+ Extreme Outdoor Monsoon Suit',
    coverPrice: 4999,
  },
  {
    id: 'prestige-indoor',
    name: 'PRESTIGE ATELIER',
    tagline: 'SCULPTED ELEGANCE. ZERO FRICTION.',
    subtitle: 'Form-Fitting Cashmere Soft Indoor Fleece',
    description: 'Form-hugging deep emerald stretch fleece that clings sensually to every contour. Cashmere-soft underside certified 100% scratch-proof for fresh ceramic coatings and delicate clear coats in basement parking.',
    specs: [
      { label: 'PAINT SAFETY', value: '100% ZERO-SCRATCH' },
      { label: 'DENSITY', value: '280 GSM FLEECE' },
      { label: 'DUST REPELLENT', value: 'ANTI-STATIC YARN' },
      { label: 'EMBROIDERY', value: 'CUSTOM MONOGRAM' },
    ],
    image: '/images/cover_hero.jpg',
    accentColor: '#00665e',
    recommendedCover: 'Prestige Velvet Indoor Cashmere Suit',
    coverPrice: 5499,
  },
  {
    id: 'heatshield-48c',
    name: 'TITANIUM 48°C SHIELD',
    tagline: 'DEFEAT 48°C INDIAN SUMMERS',
    subtitle: 'Aerospace UV-Reflective Thermal Sun Barrier',
    description: 'Multi-layer aerodynamic silver-titanium composite reflecting 99.8% of harsh solar UV rays. Drops cabin heat by up to 20°C, shielding touchscreen electronics and leather seats from thermal cracking.',
    specs: [
      { label: 'UV DEFENSE', value: '99.8% SOLAR REFLECTION' },
      { label: 'CABIN TEMP', value: 'UP TO 20°C COOLER' },
      { label: 'SUN BLISTERING', value: 'ZERO COLOR FADE' },
      { label: 'FASTENING', value: 'DUAL TIE-DOWNS' },
    ],
    image: '/images/cover_heatshield.jpg',
    accentColor: '#38bdf8',
    recommendedCover: 'Titanium Heat-Shield UV Pro Suit',
    coverPrice: 4499,
  },
  {
    id: 'obsidian-vip',
    name: 'OBSIDIAN VIP DRAPE',
    tagline: 'BESPOKE CONCOURS LUXURY',
    subtitle: 'Midnight Black Satin Showroom & Garage Shield',
    description: 'Ultra-dense midnight velvet finish with bespoke contrast ice-silver piping and custom embroidered family crest or car registration number. The ultimate statement of luxury garage preservation.',
    specs: [
      { label: 'FINISH', value: 'MIDNIGHT SATIN VELVET' },
      { label: 'TRIM', value: 'ICE-SILVER PIPING' },
      { label: 'EMBROIDERY', value: 'FRENCH LOOM CREST' },
      { label: 'ARCHIVE CAD', value: 'MILLIMETER FIT' },
    ],
    image: '/images/reveal.jpg',
    accentColor: '#cbd5e1',
    recommendedCover: 'Obsidian Velvet Concours Edition',
    coverPrice: 6999,
  },
];

interface CinematicModelSliderProps {
  onSelectModel: (modelName: string) => void;
  onOpenConfigurator: () => void;
  onOpenEnquiry: () => void;
}

export default function CinematicModelSlider({
  onSelectModel,
  onOpenConfigurator,
  onOpenEnquiry,
}: CinematicModelSliderProps) {
  // Current active slide index
  // STRICT RULE: No automatic interval timer! The user specifically requested:
  // "slide ko hum he move karega automatic nahi hota"
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  
  // Model specs modal state for "Explore" button
  const [exploreModalOpen, setExploreModalOpen] = useState(false);

  const currentModel = MODEL_SLIDES[currentIndex];

  // Manual navigation handlers
  const handlePrev = () => {
    if (isTransitioning) return;
    setSlideDirection('prev');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + MODEL_SLIDES.length) % MODEL_SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setSlideDirection('next');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % MODEL_SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  const handleSelectSlide = (idx: number) => {
    if (idx === currentIndex || isTransitioning) return;
    setSlideDirection(idx > currentIndex ? 'next' : 'prev');
    setIsTransitioning(true);
    setCurrentIndex(idx);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  // Keyboard navigation for power users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (exploreModalOpen) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exploreModalOpen, isTransitioning]);

  // Touch swipe support (manual gesture)
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleBuildClick = () => {
    onSelectModel(currentModel.name);
    onOpenConfigurator();
  };

  return (
    <>
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '86svh',
          minHeight: '540px',
          maxHeight: '940px',
          overflow: 'hidden',
          backgroundColor: '#070a0c',
          color: '#ffffff',
          userSelect: 'none',
        }}
        className="cinematic-slider-section"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Dynamic Media Background (High-res photographic backdrop matching screenshot + optional video) */}
        {MODEL_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? 'scale(1)'
                  : slideDirection === 'next'
                  ? 'scale(1.05)'
                  : 'scale(0.97)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              {/* Image Layer (Matches Screenshot 2 Green DBX707 in Architectural Pavilion) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 45%',
                  filter: 'brightness(0.92) contrast(1.05)',
                }}
              />
            </div>
          );
        })}

        {/* Cinematic Vignette & Bottom Scrim */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 40%, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.45) 80%, rgba(0, 0, 0, 0.75) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '240px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Top Floating Brand Watermark */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'none',
          }}
        >
          <AstonMartinLogo width={120} height={28} color="#ffffff" />
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.65)',
              fontWeight: 500,
            }}
          >
            BESPOKE TAILORED CAR COVER ATELIER • INDIA
          </span>
        </div>

        {/* 🌟 ICONIC CENTER LOWER-THIRD CONTROLS & MODEL TITLE (EXACT REPLICA OF USER SCREENSHOT 2) */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 5vh, 70px)',
            left: 0,
            right: 0,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 16px',
          }}
        >
          {/* Subtitle / Kicker (e.g. "POWER. DRIVEN.") */}
          <div
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(12px, 2.8vw, 14px)',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '4px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
              transition: 'opacity 0.3s ease',
            }}
          >
            {currentModel.tagline}
          </div>

          {/* Model Name Flanked by Manual Navigation Arrows (Exact Layout of Screenshot 2) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(12px, 3.5vw, 48px)',
              margin: '2px 0 clamp(16px, 3vh, 24px) 0',
            }}
          >
            {/* Left Arrow Button (Manual Only - Long Thin Arrow) */}
            <button
              onClick={handlePrev}
              aria-label="Previous Vehicle Model"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 8px',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8))',
              }}
              className="model-slider-arrow arrow-left"
            >
              {/* Long thin arrow SVG matching screenshot */}
              <svg
                width="48"
                height="24"
                viewBox="0 0 54 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M52 12H4M4 12L15 3M4 12L15 21"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Model Title (e.g. DBX707) */}
            <h2
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(34px, 8.5vw, 76px)',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#ffffff',
                margin: 0,
                lineHeight: 1,
                textShadow: '0 4px 24px rgba(0, 0, 0, 0.9)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              {currentModel.name}
            </h2>

            {/* Right Arrow Button (Manual Only - Long Thin Arrow) */}
            <button
              onClick={handleNext}
              aria-label="Next Vehicle Model"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 8px',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8))',
              }}
              className="model-slider-arrow arrow-right"
            >
              <svg
                width="48"
                height="24"
                viewBox="0 0 54 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12H50M50 12L39 3M50 12L39 21"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Action Buttons: [ Explore ] and [ Build ] (Exact Match to Screenshot 2) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
            className="slider-btn-group"
          >
            {/* Explore Button: White pill with Aston Martin green text */}
            <button
              onClick={() => setExploreModalOpen(true)}
              style={{
                minWidth: '136px',
                height: '46px',
                backgroundColor: '#ffffff',
                color: '#00665e',
                fontFamily: 'var(--font-main)',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.8px',
                borderRadius: '2px',
                border: '1px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="slider-cta-explore"
            >
              Explore
            </button>

            {/* Build Button: Dark frosted charcoal pill with white text */}
            <button
              onClick={handleBuildClick}
              style={{
                minWidth: '136px',
                height: '46px',
                backgroundColor: 'rgba(28, 33, 36, 0.85)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
                fontFamily: 'var(--font-main)',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.8px',
                borderRadius: '2px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="slider-cta-build"
            >
              Build
            </button>
          </div>

          {/* Model Pagination Indicators (Manual click only) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: 'clamp(14px, 3vh, 24px)',
            }}
          >
            {MODEL_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  aria-label={`Select ${slide.name}`}
                  style={{
                    height: '3px',
                    width: isActive ? '36px' : '16px',
                    backgroundColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
                    border: 'none',
                    padding: 0,
                    borderRadius: '1.5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Discreet Corner Quick Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: 'clamp(16px, 4vw, 40px)',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            letterSpacing: '1.5px',
            color: 'rgba(255, 255, 255, 0.6)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          <span style={{ color: '#ffffff', fontWeight: 700 }}>
            0{currentIndex + 1}
          </span>
          <span>/</span>
          <span>0{MODEL_SLIDES.length}</span>
          <span className="hidden-mobile" style={{ marginLeft: '8px', color: 'rgba(255,255,255,0.4)' }}>•</span>
          <span className="hidden-mobile" style={{ color: 'rgba(255,255,255,0.85)' }}>{currentModel.recommendedCover}</span>
        </div>
      </section>

      {/* Explore Specification & Protection Drawer Modal */}
      {exploreModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setExploreModalOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '860px',
              width: '100%',
              backgroundColor: '#0c1114',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              padding: '48px',
              maxHeight: '90vh',
              overflowY: 'auto',
              color: '#ffffff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setExploreModalOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'transparent',
                border: 'none',
                color: '#8b9696',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              ✕
            </button>

            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '2.5px',
                color: '#00a896',
                textTransform: 'uppercase',
              }}
            >
              THE SIGNATURE COVERS ARCHIVE • {currentModel.tagline}
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(32px, 4vw, 44px)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '8px 0 4px 0',
              }}
            >
              {currentModel.name}
            </h2>
            <div style={{ fontSize: '16px', color: '#b5bab8', marginBottom: '24px' }}>
              {currentModel.subtitle}
            </div>

            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#e0e5e4', marginBottom: '32px' }}>
              {currentModel.description}
            </p>

            {/* Vehicle Specs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                padding: '20px 0',
                borderTop: '1px solid rgba(255,255,255,0.12)',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                marginBottom: '32px',
              }}
              className="slider-modal-specs"
            >
              {currentModel.specs.map((spec, i) => (
                <div key={i}>
                  <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: '#8b9696' }}>
                    {spec.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '18px',
                      fontWeight: 700,
                      marginTop: '4px',
                      color: '#ffffff',
                    }}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Tailored Protection */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '24px',
                borderRadius: '2px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <ShieldCheck size={16} color="#00a896" />
                  <span style={{ fontSize: '12px', letterSpacing: '1.5px', color: '#00a896', fontWeight: 600 }}>
                    RECOMMENDED TAILORED SUIT
                  </span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600 }}>{currentModel.recommendedCover}</div>
                <div style={{ fontSize: '13px', color: '#8b9696', marginTop: '4px' }}>
                  Includes hand-cut mirror pockets and underbody silicone-sheathed anchor points.
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: '#8b9696' }}>Atelier Commission</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>
                  ₹{currentModel.coverPrice.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setExploreModalOpen(false);
                  handleBuildClick();
                }}
                className="cta_button cta_button--primary-light"
                style={{ flex: 1, minWidth: '220px' }}
              >
                Configure Cover for {currentModel.name}
              </button>
              <button
                onClick={() => {
                  setExploreModalOpen(false);
                  onOpenEnquiry();
                }}
                className="cta_button cta_button--secondary-dark"
                style={{ flex: 1, minWidth: '220px' }}
              >
                Request Material Swatches
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .model-slider-arrow {
          opacity: 0.85;
        }
        .model-slider-arrow:hover {
          opacity: 1;
        }
        .arrow-left:hover {
          transform: translateX(-6px);
        }
        .arrow-right:hover {
          transform: translateX(6px);
        }
        .slider-cta-explore:hover {
          background-color: #f0f5f4 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5) !important;
        }
        .slider-cta-build:hover {
          background-color: rgba(45, 52, 56, 0.95) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5) !important;
        }
        @media (max-width: 640px) {
          .slider-btn-group {
            width: 100% !important;
            max-width: 300px !important;
          }
          .slider-cta-explore,
          .slider-cta-build {
            flex: 1 1 0 !important;
            min-width: 110px !important;
            height: 44px !important;
            font-size: 13px !important;
            padding: 0 12px !important;
          }
          .model-slider-arrow svg {
            width: 32px !important;
            height: 18px !important;
          }
          .slider-modal-specs {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </>
  );
}
