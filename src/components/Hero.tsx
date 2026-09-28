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
      {/* Background Image with Aston Martin cinematic grading */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          zIndex: 0,
        }}
      />

      {/* Aston Martin Vignette & Gradient Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 35%, rgba(0, 0, 0, 0.88) 100%)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.35) 60%, rgba(0, 0, 0, 0.65) 100%)',
          zIndex: 1,
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
        <div style={{ maxWidth: '820px' }}>
          {/* Kicker tag */}
          <span
            className="am-kicker"
            style={{
              fontSize: 'clamp(11px, 2.5vw, 13px)',
              letterSpacing: '2px',
              marginBottom: '10px',
            }}
          >
            SPECIALISED COVERS • BESPOKE AUTOMOTIVE ATELIER
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
            Vanquish The Elements.
          </h1>

          {/* Subtitle */}
          <p
            className="am-lead"
            style={{
              fontSize: 'clamp(14px, 3.2vw, 18px)',
              color: '#c5c9c9',
              maxWidth: '620px',
              marginBottom: 'clamp(24px, 4vw, 36px)',
              lineHeight: 1.55,
            }}
          >
            Precision 3D-laser tailored bespoke car covers. Sculpted to mirror every muscular contour 
            and aerodynamic profile down to the millimeter. Handcrafted in Yorkshire, England.
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
              style={{ minWidth: '150px' }}
            >
              Configure
            </button>

            <a
              href="#models"
              className="cta_button cta_button--secondary-dark hero-btn"
              style={{ minWidth: '150px' }}
            >
              Explore Range
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
              maxWidth: '560px',
            }}
            className="hero-stats-grid"
          >
            <div>
              <div style={{ fontSize: '10px', color: '#959696', letterSpacing: '1px', textTransform: 'uppercase' }}>CAD Patterns</div>
              <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>50,000+</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#959696', letterSpacing: '1px', textTransform: 'uppercase' }}>Paint Safety</div>
              <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>100% Zero-Scratch</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#959696', letterSpacing: '1px', textTransform: 'uppercase' }}>Craftsmanship</div>
              <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>5-Yr Guarantee</div>
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
