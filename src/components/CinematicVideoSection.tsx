'use client';

import React, { useState, useRef, useEffect } from 'react';
import AstonMartinLogo from './AstonMartinLogo';
import { Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, Sparkles, ArrowRight, Gauge, Wind, Compass } from 'lucide-react';

interface CinematicVideoSectionProps {
  onOpenConfigurator: () => void;
  onOpenEnquiry: () => void;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  telemetry: { label: string; value: string }[];
  accentColor: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'ch-1',
    number: '01',
    title: 'Aerodynamic Drape Dynamics',
    tagline: 'HIGH-VELOCITY BOUNDARY LAYER PRESERVATION',
    description: 'Filmed on the Silverstone National Circuit. Observing how our bespoke tailored contouring eliminates wind flutter, surface abrasion, and draft cavitation at wind speeds exceeding 80 mph.',
    telemetry: [
      { label: 'WIND TUNNEL DRAG', value: '0.29 Cd' },
      { label: 'FABRIC TENSION', value: '42 N/cm²' },
      { label: 'SURFACE FRICTION', value: '0.02 μ' },
    ],
    accentColor: '#00665e',
  },
  {
    id: 'ch-2',
    number: '02',
    title: 'Atmospheric Cryo-Barrier',
    tagline: 'SUB-ZERO ALPINE WEATHERPROOF TESTING',
    description: 'Documenting the dual-flow nanoporous membrane under severe freezing rain and alpine frost in the Swiss Engadin valley. Trapped engine heat escapes freely while exterior moisture is locked out.',
    telemetry: [
      { label: 'WATER RESISTANCE', value: '10,000 mm' },
      { label: 'VAPOR PERMEABILITY', value: '98.4 %' },
      { label: 'UV DEGRADATION', value: '0.00 %' },
    ],
    accentColor: '#00a896',
  },
  {
    id: 'ch-3',
    number: '03',
    title: 'The VIP Unveiling Handover',
    tagline: 'SENSORY FLUID SATIN THEATRE',
    description: 'The ceremonial unveiling of a bespoke commission. Weighted golden fringes glide effortlessly off paint-corrected bodywork, creating an unforgettable motor show experience.',
    telemetry: [
      { label: 'SATIN WEAVE DENSITY', value: '280 GSM' },
      { label: 'COEFFICIENT OF SLIP', value: 'Ultra-Low' },
      { label: 'HEM WEIGHT', value: '1.2 kg' },
    ],
    accentColor: '#dfc287',
  },
];

export default function CinematicVideoSection({
  onOpenConfigurator,
  onOpenEnquiry,
}: CinematicVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [timecode, setTimecode] = useState('00:04:18');
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeChapter = CHAPTERS[activeChapterIndex];

  // Update timecode animation ticker
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      if (isPlaying) {
        frame++;
        const secs = Math.floor(frame / 2) % 60;
        const mins = Math.floor(frame / 120);
        const ms = (frame % 24).toString().padStart(2, '0');
        setTimecode(`00:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${ms}`);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen?.();
    }
  };

  return (
    <section
      id="cinema-experience"
      style={{
        padding: 'clamp(60px, 8vw, 120px) 0 clamp(48px, 6vw, 100px)',
        backgroundColor: '#0a0d10',
        color: '#ffffff',
        borderTop: '1px solid #1a2327',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Ambient Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70vw',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 102, 94, 0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-am" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 40px' }}>
          <span
            className="am-kicker"
            style={{
              color: '#00a896',
              letterSpacing: '3px',
              fontSize: '12px',
              marginBottom: '10px',
            }}
          >
            CINEMATIC EXPERIENCE • SPECIALISED COVERS ATELIER
          </span>
          <h2
            className="am-title-section"
            style={{
              color: '#ffffff',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              lineHeight: 1.15,
            }}
          >
            The Art of Motion & Preservation
          </h2>
          <p
            className="am-lead"
            style={{
              marginTop: '12px',
              color: '#9aa2a0',
              fontSize: 'clamp(14px, 3vw, 17px)',
            }}
          >
            Experience the motion and aerodynamic engineering behind our bespoke tailored suits. 
            Crafted for speed, tested against the elements, and finished to museum standard.
          </p>
        </div>

        {/* 🎬 THE MAIN 2.39:1 CINEMATIC ANAMORPHIC VIDEO PLAYER */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '21 / 9',
            minHeight: '340px',
            maxHeight: '660px',
            backgroundColor: '#000000',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 102, 94, 0.25)',
          }}
          className="cinema-player-frame"
        >
          {/* Real Background Video Loop (Plays continuously with zero lag) */}
          <video
            ref={videoRef}
            src="/videos/cinema_car.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.85) contrast(1.1)',
            }}
          />

          {/* Letterbox Cinema Overlay Gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.8) 100%)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* Top HUD Bar: Aston Martin Watermark & Telemetry */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: 'clamp(16px, 3vw, 32px)',
              right: 'clamp(16px, 3vw, 32px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 4,
            }}
          >
            {/* Live Rec Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                  animation: 'pulse 1.5s infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  color: '#ffffff',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                LIVE CINEMA • 24 FPS
              </span>
            </div>

            {/* Center Aston Martin Emblem Watermark */}
            <div style={{ opacity: 0.9 }}>
              <AstonMartinLogo width={110} height={24} color="#ffffff" />
            </div>

            {/* Timecode Ticker */}
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.85)',
                letterSpacing: '1px',
              }}
              className="hidden-mobile"
            >
              {timecode}
            </div>
          </div>

          {/* Center Play/Pause Floating Action on Hover */}
          <div
            onClick={togglePlay}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 3,
            }}
          >
            {!isPlaying && (
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 102, 94, 0.9)',
                  border: '2px solid #ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
                  transform: 'scale(1)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <Play size={28} color="#ffffff" style={{ marginLeft: '4px' }} />
              </div>
            )}
          </div>

          {/* Bottom HUD Bar: Chapter Info & Controls */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: 'clamp(16px, 3vw, 32px)',
              right: 'clamp(16px, 3vw, 32px)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              zIndex: 4,
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {/* Active Chapter Details */}
            <div>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  color: activeChapter.accentColor,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                {activeChapter.tagline}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: 'clamp(18px, 3vw, 26px)',
                  fontWeight: 600,
                  color: '#ffffff',
                }}
              >
                {activeChapter.number}. {activeChapter.title}
              </div>
            </div>

            {/* Player Controls (Play, Audio, Fullscreen) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                className="cinema-ctrl-btn"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
              </button>

              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                style={{
                  padding: '0 14px',
                  height: '38px',
                  borderRadius: '19px',
                  background: isMuted ? 'rgba(0, 0, 0, 0.6)' : '#00665e',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  transition: 'all 0.2s',
                }}
                className="cinema-ctrl-btn"
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                <span>{isMuted ? 'Unmute' : 'Audio On'}</span>
              </button>

              <button
                onClick={handleFullscreen}
                aria-label="Fullscreen"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                className="cinema-ctrl-btn hidden-mobile"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 🎬 3 CHAPTER SWITCHERS & LIVE TELEMETRY DASHBOARD */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '28px',
          }}
          className="cinema-chapters-grid"
        >
          {CHAPTERS.map((ch, idx) => {
            const isActive = idx === activeChapterIndex;
            return (
              <div
                key={ch.id}
                onClick={() => setActiveChapterIndex(idx)}
                style={{
                  background: isActive ? '#141c20' : '#0e1215',
                  border: isActive ? `1.5px solid ${ch.accentColor}` : '1px solid #1f272b',
                  borderRadius: '2px',
                  padding: '22px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="chapter-card"
              >
                {/* Active Indicator Top Line */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: ch.accentColor,
                    }}
                  />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      letterSpacing: '1.5px',
                      color: isActive ? ch.accentColor : '#6c7775',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    CHAPTER {ch.number}
                  </span>
                  {isActive && <Sparkles size={14} color={ch.accentColor} />}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '6px',
                  }}
                >
                  {ch.title}
                </div>

                <p style={{ fontSize: '13px', color: '#889391', lineHeight: 1.5, marginBottom: '16px' }}>
                  {ch.description}
                </p>

                {/* Telemetry Micro Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '6px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '12px',
                  }}
                >
                  {ch.telemetry.map((t, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '9px', letterSpacing: '1px', color: '#6c7775', textTransform: 'uppercase' }}>
                        {t.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>
                        {t.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '44px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={onOpenConfigurator}
            className="cta_button cta_button--primary-light"
            style={{ minWidth: '200px' }}
          >
            <span>Commission Bespoke Cover</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onOpenEnquiry}
            className="cta_button cta_button--secondary-dark"
            style={{ minWidth: '180px' }}
          >
            <span>Request Swatch Portfolio</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.2);
          }
        }
        .chapter-card:hover {
          background: #141c20 !important;
          border-color: #2b393e !important;
        }
        .cinema-ctrl-btn:hover {
          background: rgba(255, 255, 255, 0.25) !important;
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          .cinema-player-frame {
            aspect-ratio: 16 / 9 !important;
          }
          .cinema-chapters-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
