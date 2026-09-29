'use client';

import React, { useState } from 'react';
import { Sparkles, Layers, ShieldCheck, ArrowRight, Wand2 } from 'lucide-react';

interface KineticShowcaseProps {
  onOpenConfigurator: () => void;
  onOpenEnquiry: () => void;
}

export default function KineticShowcaseSection({
  onOpenConfigurator,
  onOpenEnquiry,
}: KineticShowcaseProps) {
  // Card 1 Live Stitcher State
  const [initials, setInitials] = useState('THAR-4X4');
  const [threadColor, setThreadColor] = useState<'gold' | 'lime' | 'silver'>('gold');

  // Card 2 Layer expansion state
  const [isLayersExpanded, setIsLayersExpanded] = useState(false);

  // Card 3 Ripple state
  const [isWaving, setIsWaving] = useState(false);

  return (
    <section
      style={{
        padding: '120px 0 100px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e8e8',
        position: 'relative',
      }}
    >
      <div className="container-am">
        {/* Section Header */}
        <div style={{ marginBottom: '60px' }}>
          <span className="am-kicker">CAR COVER ATELIER KINETIC STORIES</span>
          <h2 className="am-title-section">The Art of Custom Cover Craft</h2>
          <p className="am-lead" style={{ marginTop: '8px' }}>
            Three interactive explorations into personalized Indian registration embroidery, 
            5-layer nanofiber weather science, and fluid satin unveilings that define TheSignaturecovers.
          </p>
        </div>

        {/* 3 Asymmetric Interactive Editorial Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '32px',
          }}
          className="kinetic-trio-grid"
        >
          {/* CARD 1: THE MONOGRAM ATELIER (Live Embroidery Simulator Motion) */}
          <div
            className="am-card"
            style={{
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '520px',
              backgroundColor: '#f8faf9',
              border: '1px solid #e2e6e6',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div>
              <span className="am-kicker">INTERACTIVE MOTION 01</span>
              <h3 className="am-title-card" style={{ marginBottom: '12px' }}>
                Atelier Monogram Studio
              </h3>
              <p style={{ fontSize: '14px', color: '#5c6462', lineHeight: 1.6, marginBottom: '24px' }}>
                Every crest is hand-guided under French embroidery looms using continuous metallic core threads.
              </p>

              {/* Interactive Embroidery Canvas */}
              <div
                style={{
                  background: '#0d1318',
                  border: '1px solid rgba(0, 102, 94, 0.25)',
                  borderRadius: '3px',
                  padding: '28px 20px',
                  textAlign: 'center',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)',
                  position: 'relative',
                }}
              >
                {/* Background leather grain texture */}
                <div
                  style={{
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#00a896',
                    marginBottom: '16px',
                  }}
                >
                  LIVE STITCH PREVIEW
                </div>

                {/* Stitched Monogram Badge */}
                <div
                  style={{
                    display: 'inline-block',
                    padding: '16px 28px',
                    border: `1.5px dashed ${
                      threadColor === 'gold' ? '#dfc287' : threadColor === 'lime' ? '#c5e838' : '#ffffff'
                    }`,
                    background: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '2px',
                    boxShadow: `0 0 20px ${
                      threadColor === 'gold' ? 'rgba(223, 194, 135, 0.2)' : 'rgba(0, 102, 94, 0.2)'
                    }`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '28px',
                      fontWeight: 700,
                      letterSpacing: '4px',
                      textTransform: 'uppercase',
                      color: threadColor === 'gold' ? '#dfc287' : threadColor === 'lime' ? '#c5e838' : '#ffffff',
                      textShadow: `0 0 10px ${
                        threadColor === 'gold' ? '#dfc287' : threadColor === 'lime' ? '#c5e838' : '#ffffff'
                      }`,
                    }}
                  >
                    {initials || 'ASTON'}
                  </span>
                </div>

                {/* Thread Color Switches */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                  {[
                    { id: 'gold', label: 'Gold Thread', hex: '#dfc287' },
                    { id: 'lime', label: 'Aston Lime', hex: '#c5e838' },
                    { id: 'silver', label: 'Ice Silver', hex: '#ffffff' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setThreadColor(t.id as any)}
                      style={{
                        padding: '4px 10px',
                        fontSize: '11px',
                        background: threadColor === t.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                        border: `1px solid ${t.hex}`,
                        color: t.hex,
                        borderRadius: '2px',
                        cursor: 'pointer',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input to change Monogram */}
              <div style={{ marginTop: '16px' }}>
                <input
                  type="text"
                  maxLength={10}
                  value={initials}
                  onChange={(e) => setInitials(e.target.value.toUpperCase())}
                  placeholder="Type Your Monogram"
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #d4dedd',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: '#111615',
                    borderRadius: '2px',
                    outline: 'none',
                    letterSpacing: '1px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-main)',
                  }}
                />
              </div>
            </div>

            <div style={{ borderTop: '1px solid #eef2f2', paddingTop: '20px', marginTop: '24px' }}>
              <button onClick={onOpenConfigurator} className="am-sublink">
                <span>Commission Custom Monogram</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* CARD 2: 3D EXPLODED TEXTILE LAYERS (Motion: Stack Expand Physics) */}
          <div
            className="am-card"
            onMouseEnter={() => setIsLayersExpanded(true)}
            onMouseLeave={() => setIsLayersExpanded(false)}
            style={{
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '520px',
              backgroundColor: '#f8faf9',
              border: '1px solid #e2e6e6',
              perspective: '800px',
            }}
          >
            <div>
              <span className="am-kicker">INTERACTIVE MOTION 02</span>
              <h3 className="am-title-card" style={{ marginBottom: '12px' }}>
                3D Exploded Nano-Membrane
              </h3>
              <p style={{ fontSize: '14px', color: '#5c6462', lineHeight: 1.6, marginBottom: '24px' }}>
                Hover to expand the four microscopic layers that form our storm-shield composite.
              </p>

              {/* 3D Stack Visualization */}
              <div
                style={{
                  height: '220px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Layer 1: Hydrophobic Shield */}
                <div
                  style={{
                    width: '85%',
                    height: '42px',
                    background: 'linear-gradient(90deg, #00665e 0%, #004d47 100%)',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 600,
                    boxShadow: '0 8px 20px rgba(0, 102, 94, 0.3)',
                    transform: isLayersExpanded ? 'translateY(-48px) rotateX(15deg)' : 'translateY(0px)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span>01. Hydrophobic Weather Guard</span>
                  <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.2)', padding: '2px 6px' }}>10,000mm</span>
                </div>

                {/* Layer 2: Vapor Core */}
                <div
                  style={{
                    width: '85%',
                    height: '42px',
                    background: '#1b232a',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    color: '#c5c9c9',
                    fontSize: '12px',
                    transform: isLayersExpanded ? 'translateY(-16px) rotateX(15deg)' : 'translateY(0px)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span>02. Microporous Breathable Core</span>
                  <span style={{ fontSize: '10px', color: '#00a896' }}>Anti-Condense</span>
                </div>

                {/* Layer 3: Impact Dissipation */}
                <div
                  style={{
                    width: '85%',
                    height: '42px',
                    background: '#242e37',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    color: '#c5c9c9',
                    fontSize: '12px',
                    transform: isLayersExpanded ? 'translateY(16px) rotateX(15deg)' : 'translateY(0px)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span>03. Shock Absorption Cushion</span>
                  <span style={{ fontSize: '10px', color: '#ffffff' }}>280gsm</span>
                </div>

                {/* Layer 4: Cashmere Underside */}
                <div
                  style={{
                    width: '85%',
                    height: '42px',
                    background: 'linear-gradient(90deg, #dfc287 0%, #b3924e 100%)',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    color: '#07090c',
                    fontSize: '12px',
                    fontWeight: 700,
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    transform: isLayersExpanded ? 'translateY(48px) rotateX(15deg)' : 'translateY(0px)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span>04. Cashmere Zero-Scratch Fleece</span>
                  <span style={{ fontSize: '10px', background: '#000000', color: '#ffffff', padding: '2px 6px' }}>Ceramic Safe</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #eef2f2', paddingTop: '20px', marginTop: '24px' }}>
              <button onClick={onOpenEnquiry} className="am-sublink">
                <span>Request Tactile Swatch Pack</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* CARD 3: CONCOURS SHOWROOM REVEAL (Motion: Silk Drape Wave Shimmer) */}
          <div
            className="am-card"
            onMouseEnter={() => setIsWaving(true)}
            onMouseLeave={() => setIsWaving(false)}
            style={{
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '520px',
              backgroundColor: '#f8faf9',
              border: '1px solid #e2e6e6',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div>
              <span className="am-kicker">INTERACTIVE MOTION 03</span>
              <h3 className="am-title-card" style={{ marginBottom: '12px' }}>
                Concours Silk Reveal
              </h3>
              <p style={{ fontSize: '14px', color: '#5c6462', lineHeight: 1.6, marginBottom: '24px' }}>
                Used by official factory handovers and Concours d’Elegance. Slides like liquid water.
              </p>

              {/* Silk Reveal Visual Preview with Shimmer */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  backgroundColor: '#000000',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                }}
              >
                <img
                  src="/images/reveal.jpg"
                  alt="Silk Reveal Drape"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: isWaving ? 'scale(1.06)' : 'scale(1)',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Silk Fluid Cascade Shimmer Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isWaving
                      ? 'linear-gradient(60deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%)'
                      : 'transparent',
                    animation: isWaving ? 'shimmerWave 1.2s infinite' : 'none',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    background: 'rgba(0, 0, 0, 0.85)',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    fontSize: '11px',
                    color: '#ffffff',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Weighted Golden Fringe Hem
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #eef2f2', paddingTop: '20px', marginTop: '24px' }}>
              <button onClick={onOpenConfigurator} className="am-sublink">
                <span>Configure Reveal Drape</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmerWave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @media (max-width: 768px) {
          .kinetic-trio-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
