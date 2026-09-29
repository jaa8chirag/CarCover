'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface QAtelierProps {
  onOpenEnquiry: () => void;
}

export default function QAtelier({ onOpenEnquiry }: QAtelierProps) {
  return (
    <section
      id="q-atelier"
      style={{
        padding: '120px 0',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e8e8',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-am">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
          className="q-grid"
        >
          {/* Left: Atelier Story */}
          <div>
            <span className="am-kicker">PRIVATE COMMISSIONS • INDIA</span>
            <h2 className="am-title-section" style={{ marginBottom: '24px', color: '#111615' }}>
              The Signature Private Atelier
            </h2>

            <p className="am-lead" style={{ marginBottom: '24px', color: '#5c6462' }}>
              For enthusiasts and collectors who demand absolute individuality. TheSignaturecovers Private Atelier is our pinnacle 
              custom commission service—offering fabric dye-matching to your vehicle's factory paint code, 
              hand-embroidered personalized license plates, club insignia, and rare velvet materials.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              <div style={{ borderLeft: '2px solid #00665e', paddingLeft: '16px' }}>
                <div style={{ fontSize: '15px', color: '#111615', fontWeight: 600 }}>
                  Factory Paint Code Fabric Matching
                </div>
                <div style={{ fontSize: '13px', color: '#5c6462', marginTop: '4px' }}>
                  Naples Black, British Racing Green, Desert Gold, Tango Red, and bespoke Concours shades.
                </div>
              </div>

              <div style={{ borderLeft: '2px solid #00665e', paddingLeft: '16px' }}>
                <div style={{ fontSize: '15px', color: '#111615', fontWeight: 600 }}>
                  Metallic Silk-Thread Monograms & Number Plates
                </div>
                <div style={{ fontSize: '13px', color: '#5c6462', marginTop: '4px' }}>
                  Hand-embroidered Indian registration plate number, chassis VIN, family initials, or club crests.
                </div>
              </div>

              <div style={{ borderLeft: '2px solid #00665e', paddingLeft: '16px' }}>
                <div style={{ fontSize: '15px', color: '#111615', fontWeight: 600 }}>
                  Showroom VIP Delivery Drapes
                </div>
                <div style={{ fontSize: '13px', color: '#5c6462', marginTop: '4px' }}>
                  Fluid liquid-satin unveilings commissioned by luxury dealership handovers and private supercar collections.
                </div>
              </div>
            </div>

            <button
              onClick={onOpenEnquiry}
              className="cta_button cta_button--primary-light"
            >
              <span>Enquire With Signature Atelier India</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Right: Atelier Visual */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid #d8e2e0',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              }}
            >
              <img
                src="/images/cover_velvet.jpg"
                alt="TheSignaturecovers Private Atelier Commission"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid #dce2e2',
                padding: '16px 20px',
                borderRadius: '2px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ fontSize: '11px', color: '#00665e', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                Handmade in England
              </div>
              <div style={{ fontSize: '15px', color: '#111615', fontWeight: 600, marginTop: '2px' }}>
                Yorkshire Atelier • Established 1981
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .q-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
