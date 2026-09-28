'use client';

import React from 'react';
import { Compass, Award, Scissors, ShieldCheck } from 'lucide-react';

export default function CraftsmanshipSection() {
  return (
    <section
      id="craftsmanship"
      style={{
        padding: '120px 0 100px',
        backgroundColor: '#f6f8f8',
        borderTop: '1px solid #e5e8e8',
        position: 'relative',
      }}
    >
      <div className="container-am">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '56px',
            alignItems: 'center',
          }}
          className="craft-grid"
        >
          {/* Left: Imagery with gold/green border & atelier badge */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid #dce2e2',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
              }}
            >
              <img
                src="/images/craftsmanship.jpg"
                alt="Bespoke Handcrafted British Atelier"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>

            {/* Overlaid Certificate Stamp */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                background: '#ffffff',
                border: '1px solid #00665e',
                borderRadius: '2px',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              }}
              className="hidden-mobile"
            >
              <Award size={32} color="#00665e" />
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#00665e',
                    fontFamily: 'var(--font-main)',
                    fontWeight: 600,
                  }}
                >
                  Yorkshire Heritage
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#111615',
                    fontFamily: 'var(--font-main)',
                  }}
                >
                  Handmade In England
                </div>
              </div>
            </div>
          </div>

          {/* Right: Atelier Narrative & Process */}
          <div>
            <span className="am-kicker">YORKSHIRE MANUFACTURING ATELIER</span>
            <h2
              className="am-title-section"
              style={{
                marginBottom: '20px',
                lineHeight: 1.15,
                color: '#111615',
              }}
            >
              Where Digital Precision Meets British Savoir-Faire
            </h2>

            <p
              className="am-lead"
              style={{
                marginBottom: '28px',
                color: '#5c6462',
              }}
            >
              Every Velum commission starts with digital CAD surface models of the vehicle’s exact sheet metal. 
              Our master patternmakers cut each textile panel individually before our Yorkshire seamstresses 
              hand-stitch with twin-needle French felled seams—delivering an unmistakable bespoke fit.
            </p>

            {/* 4 Atelier Milestones */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e6e6',
                  padding: '20px',
                  borderRadius: '2px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <div
                  style={{
                    color: '#00665e',
                    fontFamily: 'var(--font-main)',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Compass size={16} /> 3D Laser Digits
                </div>
                <p style={{ fontSize: '13px', color: '#5c6462', lineHeight: 1.5 }}>
                  Sub-millimeter CAD point cloud scans capturing roof slopes and aero splitters.
                </p>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e6e6',
                  padding: '20px',
                  borderRadius: '2px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <div
                  style={{
                    color: '#00665e',
                    fontFamily: 'var(--font-main)',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Scissors size={16} /> Individual Hand-Cut
                </div>
                <p style={{ fontSize: '13px', color: '#5c6462', lineHeight: 1.5 }}>
                  No mass batch shearing. Each cover panel is hand-marked and individually cut.
                </p>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e6e6',
                  padding: '20px',
                  borderRadius: '2px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <div
                  style={{
                    color: '#00665e',
                    fontFamily: 'var(--font-main)',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <ShieldCheck size={16} /> French-Felled Seams
                </div>
                <p style={{ fontSize: '13px', color: '#5c6462', lineHeight: 1.5 }}>
                  Double lock-stitch construction guaranteeing 100% seam integrity under stress.
                </p>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e6e6',
                  padding: '20px',
                  borderRadius: '2px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <div
                  style={{
                    color: '#00665e',
                    fontFamily: 'var(--font-main)',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Award size={16} /> Rig Pre-Fitting
                </div>
                <p style={{ fontSize: '13px', color: '#5c6462', lineHeight: 1.5 }}>
                  Fitted onto a dimensional chassis rig prior to white-glove boxed packaging.
                </p>
              </div>
            </div>

            <div
              style={{
                borderLeft: '2px solid #00665e',
                paddingLeft: '18px',
              }}
            >
              <p
                style={{
                  fontSize: '15px',
                  fontStyle: 'italic',
                  color: '#111615',
                  lineHeight: 1.6,
                }}
              >
                "Our purpose is not merely to cover an automobile, but to celebrate its architecture even in repose."
              </p>
              <div
                style={{
                  fontSize: '12px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#5c6462',
                  marginTop: '6px',
                }}
              >
                Master Patternmaker • Velum Atelier Yorkshire
              </div>
            </div>

          </div>

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .craft-grid {
            grid-template-columns: 1fr !important;
          }
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
