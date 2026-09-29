'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onOpenConfigurator: () => void;
  onOpenEnquiry: () => void;
}

export default function Hero({ onOpenConfigurator, onOpenEnquiry }: HeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        paddingTop: '90px',
        paddingBottom: 'clamp(32px, 6vw, 80px)',
      }}
      className="hero-section-am"
    >
      {/* Background Bespoke Car Cover Fitting Video - Native, Ultra-Smooth & High Clarity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0,
          backgroundColor: '#0a0d10',
        }}
      >
        <video
          src="/videos/hero_cover_install.mp4"
          poster="/images/cover_install_1.jpg"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.77vh',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            border: 'none',
            opacity: 0.95,
          }}
        />
      </div>

      {/* Subtle Luxury Gradient Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.08) 45%, rgba(0, 0, 0, 0.85) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.4) 45%, rgba(0, 0, 0, 0.05) 85%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Foreground Content */}
      <div
        className="container-am"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '840px' }}>
          {/* Kicker tag */}
          <span
            className="am-kicker"
            style={{
              fontSize: 'clamp(11px, 2.5vw, 13px)',
              letterSpacing: '2px',
              marginBottom: '10px',
            }}
          >
            THESIGNATURECOVERS • BESPOKE TAILORED CAR COVERS FOR INDIA
          </span>

          {/* Hero Main Headline */}
          <h1
            className="am-title-hero"
            style={{
              fontSize: 'clamp(32px, 7.5vw, 76px)',
              marginBottom: '16px',
              lineHeight: 1.05,
            }}
          >
            Sculpted Protection. Engineered To Endure.
          </h1>

          {/* Subtitle */}
          <p
            className="am-lead"
            style={{
              fontSize: 'clamp(14px, 3.2vw, 18px)',
              color: '#c5c9c9',
              maxWidth: '660px',
              marginBottom: 'clamp(24px, 4vw, 36px)',
              lineHeight: 1.55,
            }}
          >
            Precision 3D-laser CAD tailored automotive covers engineered for extreme Indian weather. 
            Defeating 48°C scorching solar heat, torrential monsoon deluges, stray animal scratches, 
            and Delhi dust storms with zero-scratch cashmere fleece.
          </p>

          {/* CTA Buttons in exact Aston Martin styling */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
            }}
            className="hero-cta-group"
          >
            <button
              onClick={onOpenConfigurator}
              className="cta_button cta_button--primary-light hero-btn"
            >
              Customise Your Cover
            </button>

            <a
              href="#models"
              className="cta_button cta_button--secondary-dark hero-btn"
            >
              Explore Cover Editions
            </a>
          </div>
        </div>

        {/* Bottom Technical Indicators */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            marginTop: 'clamp(28px, 5vw, 56px)',
            paddingTop: '16px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
          className="hero-stats-bar"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              width: '100%',
              maxWidth: '600px',
            }}
            className="hero-stats-grid"
          >
            <div>
              <div style={{ fontSize: '10px', color: '#959696', letterSpacing: '1px', textTransform: 'uppercase' }}>Indian & Global CAD</div>
              <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>50,000+ Patterns</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#959696', letterSpacing: '1px', textTransform: 'uppercase' }}>Monsoon Defense</div>
              <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>100% Waterproof</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#959696', letterSpacing: '1px', textTransform: 'uppercase' }}>Pan-India Delivery</div>
              <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>Free Express + COD</div>
            </div>
          </div>

          <a
            href="#models"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#959696',
              fontSize: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            className="hidden-mobile"
          >
            <span>Scroll</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 520px) {
          .hero-cta-group {
            width: 100%;
          }
          .hero-btn {
            flex: 1 1 calc(50% - 6px) !important;
            min-width: 130px !important;
            padding: 0 16px !important;
            font-size: 14px !important;
          }
          .hero-stats-grid {
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
