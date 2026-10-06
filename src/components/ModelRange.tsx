'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ModelRangeProps {
  onSelectModel: (modelName: string) => void;
  onOpenConfigurator: () => void;
}

const MODELS_DATA = [
  {
    id: 'vanquish',
    name: 'Vanquish',
    tagline: 'ALL OUT. ALL ROADS.',
    description: 'Bespoke liquid titanium tailored indoor cover with Aston Martin Racing green contour piping.',
    specs: 'Lycra-Fleece • Mirror Pockets • Anti-Static',
    image: '/images/lux/sclass.jpg',
    tierName: 'Prestige Tailored Indoor',
  },
  {
    id: 'vantage',
    name: 'Vantage S',
    tagline: 'THRILL. DRIVEN.',
    description: 'Precision sculpted British Racing Green cover engineered for aggressive aerodynamics and rear splitters.',
    specs: '280gsm Fleece • Zero-Scratch • 5-Yr Guarantee',
    image: '/images/lux/studio.jpg',
    tierName: 'Prestige Tailored Indoor',
  },
  {
    id: 'db12',
    name: 'DB12 Volante',
    tagline: 'THE WORLD’S FIRST SUPER TOURER.',
    description: 'Handcrafted in Yorkshire with individual pattern cutouts for both Coupe and Volante roof silhouettes.',
    specs: 'CAD Point-Cloud Scan • Hand-Felled Seams',
    image: '/images/craftsmanship.jpg',
    tierName: 'Bespoke Commission Atelier',
  },
  {
    id: 'dbx707',
    name: 'DBX707',
    tagline: 'POWER. DRIVEN.',
    description: 'Extreme all-weather Stormshield+ 4-layer nano-membrane with fluorescent lime aerodynamic piping.',
    specs: '100% Waterproof • Breathable • UV 50+ Shield',
    image: '/images/lux/rr_hill.jpg',
    tierName: 'Stormshield+ All-Weather',
  },
  {
    id: 'reveal',
    name: 'Atelier Silk Reveal',
    tagline: 'THE UNVEILING.',
    description: 'Liquid satin reveal drapes tailored for VIP vehicle handovers, motor shows, and private garages.',
    specs: 'Low-Friction Satin • Weighted Perimeter Hem',
    image: '/images/reveal.jpg',
    tierName: 'Silk Reveal Drape',
  },
];

export default function ModelRange({ onSelectModel, onOpenConfigurator }: ModelRangeProps) {
  const handleConfigureClick = (modelName: string) => {
    onSelectModel(modelName);
    onOpenConfigurator();
    const configEl = document.getElementById('configurator');
    if (configEl) configEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="models"
      style={{
        padding: '120px 0 100px',
        backgroundColor: '#f6f8f8',
        borderTop: '1px solid #e5e8e8',
      }}
    >
      <div className="container-am">
        {/* Section Header */}
        <div style={{ marginBottom: '60px' }}>
          <span className="am-kicker">MODEL RANGE</span>
          <h2 className="am-title-section">Tailored For Every Icon</h2>
        </div>

        {/* Model Range Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '24px',
          }}
          className="model-grid"
        >
          {MODELS_DATA.map((model) => (
            <div
              key={model.id}
              className="am-card"
              style={{
                borderRadius: '2px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#ffffff',
                border: '1px solid #e2e6e6',
              }}
            >
              {/* Image Frame */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  backgroundColor: '#0a0d11',
                }}
              >
                <img
                  src={model.image}
                  alt={model.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    fontSize: '11px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    background: 'rgba(0, 0, 0, 0.75)',
                    padding: '4px 10px',
                    borderRadius: '2px',
                  }}
                >
                  {model.tierName}
                </span>
              </div>

              {/* Card Content */}
              <div style={{ padding: '28px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 className="am-title-card" style={{ marginBottom: '6px' }}>
                    {model.name}
                  </h3>
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#00665e',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      marginBottom: '12px',
                    }}
                  >
                    {model.tagline}
                  </div>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#5c6462',
                      lineHeight: 1.6,
                      marginBottom: '16px',
                    }}
                  >
                    {model.description}
                  </p>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#828c8a',
                      letterSpacing: '0.5px',
                      marginBottom: '24px',
                    }}
                  >
                    {model.specs}
                  </div>
                </div>

                {/* Sublinks Container */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    borderTop: '1px solid #eef2f2',
                    paddingTop: '20px',
                  }}
                >
                  <button
                    onClick={() => handleConfigureClick(model.name)}
                    className="am-sublink"
                  >
                    <span>Configure</span>
                    <ChevronRight size={16} color="#00665e" />
                  </button>

                  <a
                    href="#configurator"
                    className="am-sublink"
                    style={{ color: '#5c6462' }}
                    onClick={() => onSelectModel(model.name)}
                  >
                    <span>View CAD Match</span>
                    <ChevronRight size={16} color="#5c6462" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 820px) {
          .model-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
