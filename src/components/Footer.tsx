'use client';

import React from 'react';
import AstonMartinLogo from './AstonMartinLogo';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#f6f8f8',
        borderTop: '1px solid #e5e8e8',
        padding: '80px 0 40px',
      }}
    >
      <div className="container-am">
        {/* Top: Logo & Language */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e2e6e6',
            paddingBottom: '40px',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <AstonMartinLogo width={160} height={36} color="#111615" />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#111615',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <Globe size={16} color="#00665e" />
            <span>India (English) • ₹ INR</span>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '64px',
          }}
        >
          {/* Col 1 */}
          <div>
            <div
              style={{
                fontSize: '12px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#111615',
                marginBottom: '20px',
                fontWeight: 600,
              }}
            >
              Popular Indian Models
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Mahindra Thar Roxx & 4x4', 'Toyota Fortuner Legender', 'Mahindra Scorpio-N', 'Tata Safari & Curvv', 'Hyundai Creta N-Line', 'Land Rover Defender', 'BMW M4 & 3 Series', 'Aston Martin DB12'].map((item) => (
                <li key={item}>
                  <a href="#models" className="footer-link-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <div
              style={{
                fontSize: '12px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#111615',
                marginBottom: '20px',
                fontWeight: 600,
              }}
            >
              Tailored Covers
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['AquaShield Monsoon Outdoor', 'Prestige Indoor Velvet Fleece', 'Titanium 48°C Heat Shield', 'Atelier Liquid Silk Reveal', 'CAD 3D Pattern Matcher'].map((item) => (
                <li key={item}>
                  <a href="#collections" className="footer-link-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <div
              style={{
                fontSize: '12px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#111615',
                marginBottom: '20px',
                fontWeight: 600,
              }}
            >
              Indian Climate Defense
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['10,000mm Monsoon Waterproof', '48°C UV Solar Heat Barrier', 'Delhi Dust & Smog Shield', 'Stray Animal Scratch Matrix', 'Wind-Lock Buckle Systems'].map((item) => (
                <li key={item}>
                  <a href="#material-science" className="footer-link-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <div
              style={{
                fontSize: '12px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#111615',
                marginBottom: '20px',
                fontWeight: 600,
              }}
            >
              Atelier India
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#5c6462', lineHeight: 1.6 }}>
              <div>TheSignaturecovers India Pvt. Ltd.</div>
              <div>Studios: BKC, Mumbai • DLF Horizon, Gurugram</div>
              <div>Helpline: +91 1800 889 2683</div>
              <div>Email: contact@thesignaturecovers.com</div>
              <div style={{ color: '#00665e', marginTop: '4px', fontWeight: 600 }}>Free Pan-India Delivery + COD</div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div
          style={{
            borderTop: '1px solid #e2e6e6',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
            color: '#828c8a',
          }}
        >
          <div>
            © 2026 TheSignaturecovers India. Handcrafted Bespoke Tailored Car Covers. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" className="footer-sublink-light">Privacy Policy</a>
            <a href="#" className="footer-sublink-light">Terms & Conditions</a>
            <a href="#" className="footer-sublink-light">Cookie Policy</a>
            <a href="#" className="footer-sublink-light">Craftsmanship Warranty</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-link-light {
          font-family: var(--font-main);
          font-size: 14px;
          color: #5c6462;
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: color 0.2s ease;
        }
        .footer-link-light:hover {
          color: #00665e;
        }
        .footer-sublink-light {
          color: #828c8a;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-sublink-light:hover {
          color: #00665e;
        }
      `}</style>
    </footer>
  );
}
