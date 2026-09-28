'use client';

import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight, BookOpen, Sparkles, X } from 'lucide-react';

interface EditorialSplitSectionProps {
  onOpenEnquiry: () => void;
  onOpenConfigurator: () => void;
}

interface MagazineIssue {
  id: string;
  issueCode: string;
  kicker: string;
  title: string;
  subtitle: string;
  coverImage: string;
  bgGradient: string;
  accentColor: string;
  leadArticle: string;
  features: { tag: string; title: string; desc: string }[];
  configureModel: string;
}

const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: 'v44',
    issueCode: 'ISSUE V44',
    kicker: 'ASTON MARTIN MAGAZINE • ISSUE V44',
    title: 'The Essence of Speed & Protection',
    subtitle: 'London nocturnal preservation, ceramic coat shield, and bespoke 3D CAD coordinate scans safeguarding DBS Superleggera aluminum bodywork.',
    coverImage: '/images/magazine.jpg',
    bgGradient: 'radial-gradient(ellipse at 80% 30%, #00564d 0%, #003630 60%, #00231f 100%)',
    accentColor: '#00a896',
    leadArticle: 'Night Moves: Preserving the DBS Superleggera under London Skies',
    features: [
      {
        tag: 'FEATURE 01',
        title: 'Nanofiber Vapor Barrier',
        desc: 'Micro-porous physics preventing heat-soak condensation in subterranean collector garages.',
      },
      {
        tag: 'FEATURE 02',
        title: 'Zero-Scratch Guarantee',
        desc: 'Certified laboratory testing on multi-stage paint-corrected supercars.',
      },
    ],
    configureModel: 'DBS Superleggera',
  },
  {
    id: 'v43',
    issueCode: 'ISSUE V43',
    kicker: 'ASTON MARTIN MAGAZINE • ISSUE V43',
    title: 'Valkyrie: Extreme Downforce',
    subtitle: 'Mastery of wet weather, ground effects aerodynamics, and ultra-lightweight bespoke carbon-safe fleece engineered for track weapons.',
    coverImage: '/images/magazine_v43.jpg',
    bgGradient: 'radial-gradient(ellipse at 80% 30%, #0a463c 0%, #062b25 60%, #031b17 100%)',
    accentColor: '#30c79e',
    leadArticle: 'The Science of Downforce: Handcrafted Protection for Carbon Aerodynamics',
    features: [
      {
        tag: 'FEATURE 01',
        title: 'Aero Wing Contour Cutouts',
        desc: 'Dual venturi channel tailoring preventing lift and wind flutter under 80mph gusts.',
      },
      {
        tag: 'FEATURE 02',
        title: 'Formula 1 Heritage Tech',
        desc: 'Antistatic woven filaments that discharge static charge from dry track tires.',
      },
    ],
    configureModel: 'Valkyrie AMR Pro',
  },
  {
    id: 'v42',
    issueCode: 'ISSUE V42',
    kicker: 'ASTON MARTIN MAGAZINE • ISSUE V42',
    title: 'DB12: The First Super Tourer',
    subtitle: 'Alpine Grand Touring, Swiss mountain pass storage, and all-weather Stormshield+ multi-layer protection in sub-zero climates.',
    coverImage: '/images/magazine_v42.jpg',
    bgGradient: 'radial-gradient(ellipse at 80% 30%, #173847 0%, #0d232e 60%, #07151c 100%)',
    accentColor: '#00b4d8',
    leadArticle: 'Alpine Expedition: Weatherproof Tailoring in the High Passes',
    features: [
      {
        tag: 'FEATURE 01',
        title: 'Cryo-Thermal Insulation',
        desc: 'Multi-layer thermal barrier maintaining battery conditioning in alpine frost.',
      },
      {
        tag: 'FEATURE 02',
        title: 'Hydrophobic Nanotech',
        desc: 'Lotus-leaf effect water repellency that sheds torrential mountain snowfall.',
      },
    ],
    configureModel: 'DB12 Super Tourer',
  },
];

export default function EditorialSplitSection({
  onOpenEnquiry,
  onOpenConfigurator,
}: EditorialSplitSectionProps) {
  // Current Magazine Issue Index
  const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
  const currentIssue = MAGAZINE_ISSUES[currentIssueIndex];

  // 3D Tilt State for the Magazine
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const magazineRef = useRef<HTMLDivElement>(null);

  // Parallax for the left panel
  const [leftParallax, setLeftParallax] = useState({ x: 0, y: 0 });

  // Modal to read magazine preview
  const [magazineModalOpen, setMagazineModalOpen] = useState(false);

  // Smooth slide change with directional transition
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleMagazineMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magazineRef.current) return;
    const rect = magazineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 14;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMagazineMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleLeftMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    setLeftParallax({ x, y });
  };

  const handleNextIssue = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIssueIndex((prev) => (prev + 1) % MAGAZINE_ISSUES.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handlePrevIssue = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIssueIndex((prev) => (prev - 1 + MAGAZINE_ISSUES.length) % MAGAZINE_ISSUES.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleSelectIssue = (index: number) => {
    if (index === currentIssueIndex || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIssueIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <>
      <section
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '740px',
          overflow: 'hidden',
          backgroundColor: '#000000',
        }}
        className="split-editorial-grid"
      >
        {/* LEFT PANEL: TIMELESS HERITAGE (Exact Replica of Screenshot Left Side) */}
        <div
          onMouseMove={handleLeftMouseMove}
          onMouseLeave={() => setLeftParallax({ x: 0, y: 0 })}
          style={{
            position: 'relative',
            height: '100%',
            minHeight: '560px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '48px 56px',
            cursor: 'pointer',
          }}
          className="split-panel-left"
          onClick={onOpenConfigurator}
        >
          {/* Background Image with Parallax Movement */}
          <div
            style={{
              position: 'absolute',
              inset: '-20px',
              backgroundImage: 'url(/images/timeless.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translate(${leftParallax.x}px, ${leftParallax.y}px) scale(1.05)`,
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 0,
            }}
          />

          {/* Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.65) 100%)',
              zIndex: 1,
            }}
          />

          {/* Top Kicker Header */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <span
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              SPECIALISED TIMELESS ARCHIVE
            </span>
          </div>

          {/* Center Iconic Typography Overlay (Exact Match to TIMELESS in Screenshot) */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              margin: 'auto 0',
              padding: '24px 0',
            }}
          >
            <div
              className="timeless-title"
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(28px, 4.5vw, 54px)',
                fontWeight: 300,
                letterSpacing: 'clamp(8px, 2vw, 14px)',
                textTransform: 'uppercase',
                color: '#ffffff',
                textShadow: '0 4px 20px rgba(0,0,0,0.9)',
                lineHeight: 1.1,
              }}
            >
              T I M E L E S S
            </div>
            <div
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '15px',
                fontWeight: 400,
                letterSpacing: '1.5px',
                color: '#e5e8e8',
                marginTop: '10px',
                textShadow: '0 2px 12px rgba(0,0,0,0.8)',
              }}
            >
              Certified Bespoke Preservation
            </div>
          </div>

          {/* Bottom Action: Explore → */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div
              className="split-explore-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-main)',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '1px',
                color: '#ffffff',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              <span>Explore</span>
              <ArrowRight size={18} className="arrow-motion" />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: ASTON MARTIN MAGAZINE MULTI-ITEM CAROUSEL (Upgraded with Multiple Issues & Manual Switching) */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            minHeight: '560px',
            background: currentIssue.bgGradient,
            transition: 'background 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '44px 56px',
            perspective: '1200px',
            overflow: 'hidden',
          }}
          className="split-panel-right"
        >
          {/* Top Header Row with Kicker, Issue Indicator and Manual Prev/Next Controls */}
          <div
            style={{
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
              paddingBottom: '16px',
            }}
            className="magazine-header-row"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}
              >
                {currentIssue.kicker}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  padding: '2px 8px',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
              >
                {currentIssueIndex + 1} / {MAGAZINE_ISSUES.length}
              </span>
            </div>

            {/* Manual Slide Arrows for Magazine Carousel */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handlePrevIssue}
                aria-label="Previous Magazine Issue"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                className="issue-nav-btn"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNextIssue}
                aria-label="Next Magazine Issue"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                className="issue-nav-btn"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Center 3D Floating Book / Magazine with Mouse Perspective Tilt & Smooth Carousel Fade */}
          <div
            ref={magazineRef}
            onMouseMove={(e) => {
              setIsHovered(true);
              handleMagazineMouseMove(e);
            }}
            onMouseLeave={handleMagazineMouseLeave}
            onClick={() => setMagazineModalOpen(true)}
            style={{
              margin: 'auto',
              width: '100%',
              maxWidth: '360px',
              cursor: 'pointer',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.04 : 1})`,
              transition: isHovered
                ? 'transform 0.1s ease-out'
                : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
              opacity: isTransitioning ? 0.4 : 1,
              position: 'relative',
              zIndex: 3,
            }}
            className="magazine-3d-wrap"
          >
            {/* 3D Book Frame */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1.15',
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: isHovered
                  ? '0 32px 64px rgba(0, 0, 0, 0.75), -12px 18px 36px rgba(0,0,0,0.55)'
                  : '0 20px 45px rgba(0, 0, 0, 0.55), -6px 12px 24px rgba(0,0,0,0.35)',
                transition: 'box-shadow 0.3s ease',
                borderLeft: '5px solid #0f1614',
              }}
            >
              <img
                src={currentIssue.coverImage}
                alt={currentIssue.kicker}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Gloss Gradient Reflection */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 45%, rgba(0,0,0,0.45) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Interactive Hover "Read Feature" Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '7px 14px',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11px',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  opacity: isHovered ? 1 : 0.9,
                  transition: 'opacity 0.2s',
                  border: `1px solid ${currentIssue.accentColor}55`,
                }}
              >
                <BookOpen size={13} color={currentIssue.accentColor} />
                <span>Read Feature</span>
              </div>
            </div>

            {/* Book Spine Shadow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '-8px',
                width: '8px',
                height: '100%',
                background: 'linear-gradient(to right, rgba(0,0,0,0.7), transparent)',
              }}
            />
          </div>

          {/* Bottom Area: Multi-Issue Switcher Tabs + Explore Link */}
          <div
            style={{
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {/* Direct Issue Selector Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {MAGAZINE_ISSUES.map((issue, idx) => {
                const isActive = idx === currentIssueIndex;
                return (
                  <button
                    key={issue.id}
                    onClick={() => handleSelectIssue(idx)}
                    style={{
                      padding: '5px 12px',
                      fontSize: '11px',
                      letterSpacing: '1px',
                      fontWeight: isActive ? 600 : 500,
                      textTransform: 'uppercase',
                      borderRadius: '2px',
                      border: isActive
                        ? '1px solid #ffffff'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: isActive ? '#ffffff' : 'transparent',
                      color: isActive ? '#111615' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {issue.issueCode}
                  </button>
                );
              })}
            </div>

            {/* Bottom Action: Explore → */}
            <div
              onClick={() => setMagazineModalOpen(true)}
              className="split-explore-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-main)',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '1px',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              <span>Explore</span>
              <ArrowRight size={18} className="arrow-motion" />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Magazine Reader Modal (Syncs with Current Selected Issue) */}
      {magazineModalOpen && (
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
          onClick={() => setMagazineModalOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '840px',
              width: '100%',
              background: '#0a0e12',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              padding: '40px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMagazineModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: '#959696',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>

            <span className="am-kicker">EDITORIAL ARCHIVE • {currentIssue.issueCode}</span>
            <h2 className="am-title-section" style={{ color: '#ffffff', marginBottom: '16px' }}>
              {currentIssue.title}
            </h2>
            <p className="am-lead" style={{ marginBottom: '24px' }}>
              {currentIssue.subtitle}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginBottom: '32px',
              }}
            >
              {currentIssue.features.map((feat, i) => (
                <div
                  key={i}
                  style={{
                    background: '#12171e',
                    padding: '20px',
                    borderLeft: `3px solid ${currentIssue.accentColor}`,
                  }}
                >
                  <div style={{ fontSize: '13px', color: currentIssue.accentColor, fontWeight: 600 }}>
                    {feat.tag}
                  </div>
                  <div style={{ fontSize: '16px', color: '#ffffff', fontWeight: 500, marginTop: '4px' }}>
                    {feat.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#959696', marginTop: '4px' }}>
                    {feat.desc}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setMagazineModalOpen(false);
                  onOpenConfigurator();
                }}
                className="cta_button cta_button--primary-light"
              >
                Configure {currentIssue.configureModel} Cover
              </button>
              <button
                onClick={() => {
                  setMagazineModalOpen(false);
                  onOpenEnquiry();
                }}
                className="cta_button cta_button--secondary-dark"
              >
                Request Print Copy & Swatches
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .split-explore-link:hover .arrow-motion {
          transform: translateX(6px);
        }
        .arrow-motion {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .issue-nav-btn:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          border-color: #ffffff !important;
          transform: scale(1.06);
        }
        @media (max-width: 900px) {
          .split-editorial-grid {
            grid-template-columns: 1fr !important;
          }
          .split-panel-left,
          .split-panel-right {
            padding: 36px 20px !important;
            min-height: 480px !important;
          }
          .magazine-3d-wrap {
            max-width: 280px !important;
          }
        }
        @media (max-width: 480px) {
          .timeless-title {
            font-size: 26px !important;
            letter-spacing: 6px !important;
          }
          .magazine-3d-wrap {
            max-width: 250px !important;
          }
          .magazine-header-row {
            gap: 8px !important;
          }
        }
      `}</style>
    </>
  );
}
