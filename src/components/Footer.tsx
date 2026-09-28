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
            <span>International (English)</span>
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
              Models
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Vanquish', 'Vantage', 'DB12', 'DBX707', 'Valhalla', 'Valkyrie', 'Heritage DB5'].map((item) => (
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
              {['Prestige Indoor Fleece', 'Stormshield+ Outdoor', 'Atelier Silk Reveal', 'Heritage & Track', 'CAD Pattern Finder'].map((item) => (
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
              Bespoke Services
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Q by Specialised Covers', 'Paint Code Dye-Match', 'Crest Embroidery', 'Fabric Swatches', 'Dealership Commissions'].map((item) => (
                <li key={item}>
                  <a href="#q-atelier" className="footer-link-light">
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
              Atelier & Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#5c6462', lineHeight: 1.6 }}>
              <div>Specialised Covers Atelier</div>
              <div>Mill House, Innovation Way, Yorkshire, UK</div>
              <div>Tel: +44 (0) 1943 864 646</div>
              <div>Email: bespoke@specialisedcovers.com</div>
              <div style={{ color: '#00665e', marginTop: '4px', fontWeight: 600 }}>5-Year Craftsmanship Guarantee</div>
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
            © 2026 Aston Martin Lagonda / Specialised Covers Ltd. Handcrafted in Yorkshire, England.
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
