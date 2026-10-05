'use client';

import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';

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
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 102, 94, 0.05) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-am" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <span className="am-kicker">INTERACTIVE REVEAL MOTION</span>
          <h2 className="am-title-section" style={{ color: '#0f172a' }}>
            Millimeter CAD Precision. Nothing Less.
          </h2>
          <p className="am-lead" style={{ marginTop: '14px', color: '#475569' }}>
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
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: isDragging ? 'ew-resize' : 'default',
            userSelect: 'none',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
            touchAction: 'none',
          }}
          className="unveiling-frame"
        >
          {/* UNDERNEATH LAYER: The Cloaked Vehicle under Tailored Cover (hero.jpg) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/images/cover_hero.jpg)',
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
                background: 'rgba(7, 9, 12, 0.85)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(204, 164, 98, 0.4)',
                color: '#cca462',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontFamily: "'Lexend Peta', sans-serif",
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
              className="unveil-badge unveil-badge-right"
            >
              TAILORED SIGNATURE SUIT
            </div>
          </div>

          {/* TOP LAYER (CLIPPED): The Bare Machine (thar_unveiled.jpg) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/images/thar_unveiled.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 45%',
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          >
            {/* Label Badge */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                background: 'rgba(7, 9, 12, 0.85)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontFamily: "'Lexend Peta', sans-serif",
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
              className="unveil-badge unveil-badge-left"
            >
              UNVEILED SHOWROOM FINISH
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
              backgroundColor: '#cca462',
              boxShadow: '0 0 20px rgba(204, 164, 98, 0.8)',
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
                backgroundColor: '#cca462',
                border: '2px solid #ffffff',
                boxShadow: '0 0 24px rgba(204, 164, 98, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#07090c',
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
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(16px)',
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: '#0f172a',
              fontWeight: 600,
              pointerEvents: 'none',
              zIndex: 10,
              border: '1px solid rgba(0, 0, 0, 0.12)',
              fontFamily: "'Lexend Peta', sans-serif",
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '28px',
              borderRadius: '6px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ fontSize: '11px', color: '#00665e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Lexend Peta', sans-serif" }}>
              <CheckCircle2 size={15} color="#00665e" /> ZERO BILLOWING
            </div>
            <div style={{ fontSize: '17px', color: '#0f172a', fontWeight: 600, marginTop: '8px', fontFamily: "'Cinzel', serif" }}>
              Sculpted 3D Drape Index
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', lineHeight: 1.6 }}>
              Elasticated perimeter hems anchor the fabric flush against wheel arches and splitters.
            </div>
          </div>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '28px',
              borderRadius: '6px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ fontSize: '11px', color: '#00665e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Lexend Peta', sans-serif" }}>
              <CheckCircle2 size={15} color="#00665e" /> ZERO BUFF MARKS
            </div>
            <div style={{ fontSize: '17px', color: '#0f172a', fontWeight: 600, marginTop: '8px', fontFamily: "'Cinzel', serif" }}>
              Cashmere-Fleece Contact
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', lineHeight: 1.6 }}>
              Inner plush lining acts as an optical buffer, polishing rather than rubbing the paint coat.
            </div>
          </div>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '28px',
              borderRadius: '6px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ fontSize: '11px', color: '#00665e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Lexend Peta', sans-serif" }}>
              <CheckCircle2 size={15} color="#00665e" /> MIRROR PODS
            </div>
            <div style={{ fontSize: '17px', color: '#0f172a', fontWeight: 600, marginTop: '8px', fontFamily: "'Cinzel', serif" }}>
              Aero-Glove Pocketing
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', lineHeight: 1.6 }}>
              Precision 3D-molded ear pockets keep wing mirrors safe from dust and friction marks.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
