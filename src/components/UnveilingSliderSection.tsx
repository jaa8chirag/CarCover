'use client';

import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface UnveilingSliderSectionProps {
  onOpenConfigurator: () => void;
}

export default function UnveilingSliderSection({ onOpenConfigurator }: UnveilingSliderSectionProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section
      style={{
        padding: '120px 0 100px',
        backgroundColor: '#f6f8f8',
        borderTop: '1px solid #e5e8e8',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-am">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <span className="am-kicker">INTERACTIVE REVEAL MOTION</span>
          <h2 className="am-title-section" style={{ color: '#111615' }}>
            Millimeter CAD Precision. Nothing Less.
          </h2>
          <p className="am-lead" style={{ marginTop: '12px', color: '#5c6462' }}>
            Drag the interactive slider to unveil how our bespoke tailored fleece hugs every muscular 
            haunch, aerodynamic mirror, and rear diffuser without a millimeter of excess material.
          </p>
        </div>

        {/* The Interactive Before/After Split Viewer Frame */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={(e) => {
            setIsDragging(true);
            if (e.touches[0]) handleMove(e.touches[0].clientX);
          }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            maxHeight: '620px',
            borderRadius: '3px',
            overflow: 'hidden',
            cursor: isDragging ? 'ew-resize' : 'default',
            userSelect: 'none',
            border: '1px solid #d8e0e0',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
            touchAction: 'none',
          }}
          className="unveiling-frame"
        >
          {/* UNDERNEATH LAYER: The Cloaked Vehicle under Tailored Cover (hero.jpg) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/images/hero.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 45%',
            }}
          >
            {/* Label Badge */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(0, 102, 94, 0.9)',
                backdropFilter: 'blur(15px)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '2px',
                fontSize: '12px',
                fontFamily: 'var(--font-main)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
              className="unveil-badge unveil-badge-right"
            >
              TAILORED PRESTIGE FLEECE
            </div>
          </div>

          {/* TOP LAYER (CLIPPED): The Bare Supercar Grille / Machine (timeless.jpg) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/images/timeless.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          >
            {/* Label Badge */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: '1px solid #dce2e2',
                color: '#111615',
                padding: '8px 16px',
                borderRadius: '2px',
                fontSize: '12px',
                fontFamily: 'var(--font-main)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
              className="unveil-badge unveil-badge-left"
            >
              FACTORY CHASSIS
            </div>
          </div>

          {/* Interactive Sliding Divider Line & Center Grabber */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              width: '2px',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.3), 0 0 20px #00665e',
              zIndex: 20,
              transform: 'translateX(-50%)',
              cursor: 'ew-resize',
            }}
          >
            {/* Center Pill Grabber Handle */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#00665e',
                border: '2px solid #ffffff',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <ArrowLeftRight size={18} />
            </div>
          </div>

          {/* Bottom Floating Hint */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '11px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#111615',
              fontWeight: 600,
              pointerEvents: 'none',
              zIndex: 10,
              border: '1px solid #dce2e2',
            }}
          >
            Drag or slide to unveil contour match
          </div>
        </div>

        {/* 3 Metric Pills Underneath */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginTop: '40px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e6e6',
              padding: '28px',
              borderRadius: '2px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ fontSize: '13px', color: '#00665e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> ZERO BILLOWING
            </div>
            <div style={{ fontSize: '16px', color: '#111615', fontWeight: 600, marginTop: '6px' }}>
              Sculpted 3D Drape Index
            </div>
            <div style={{ fontSize: '13px', color: '#5c6462', marginTop: '4px' }}>
              Elasticated perimeter hems anchor the fabric flush against wheel arches and splitters.
            </div>
          </div>

          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e6e6',
              padding: '28px',
              borderRadius: '2px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ fontSize: '13px', color: '#00665e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> CERAMIC SAFE
            </div>
            <div style={{ fontSize: '16px', color: '#111615', fontWeight: 600, marginTop: '6px' }}>
              Cashmere Underside Fleece
            </div>
            <div style={{ fontSize: '13px', color: '#5c6462', marginTop: '4px' }}>
              Tested zero paint swirls on multi-layer corrected Aston Martin lacquer.
            </div>
          </div>

          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e6e6',
              padding: '28px',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', color: '#00665e', fontWeight: 600 }}>COMMISSION YOUR SPEC</div>
              <div style={{ fontSize: '16px', color: '#111615', fontWeight: 600, marginTop: '6px' }}>
                Tailored To Your VIN / Spec
              </div>
            </div>
            <button
              onClick={onOpenConfigurator}
              className="cta_button cta_button--primary-light"
              style={{ width: '100%', height: '44px', marginTop: '16px' }}
            >
              <span>Launch Studio</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          .unveiling-frame {
            aspect-ratio: 4/3 !important;
            min-height: 280px !important;
          }
          .unveil-badge {
            padding: 5px 10px !important;
            font-size: 10px !important;
            top: 14px !important;
          }
          .unveil-badge-right {
            right: 12px !important;
          }
          .unveil-badge-left {
            left: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
