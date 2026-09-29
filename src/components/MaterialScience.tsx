'use client';

import React, { useState } from 'react';
import { Layers, Shield, Droplets, Wind, Sparkles, Check, X } from 'lucide-react';

const LAYERS = [
  {
    id: 'layer-1',
    number: '01',
    title: 'Hydrophobic & UV 50+ Shield',
    tagline: 'Exterior High-Tensile Weather Barrier',
    description: 'Fluorocarbon-free hydrophobic nanocoating repels continuous downpours, bird lime acidity, industrial fallout, and blistering solar radiation while preventing fabric fade.',
    stats: '10,000mm+ Hydrostatic Head',
    icon: Droplets,
  },
  {
    id: 'layer-2',
    number: '02',
    title: 'Microporous Vapor Membrane',
    tagline: 'Dual-Flow Moisture Evaporation',
    description: 'Engineered with billions of microscopic pores per square inch. Pores are 20,000 times smaller than a water droplet, yet 700 times larger than a water vapor molecule—allowing trapped engine heat and humidity to escape freely.',
    stats: '100% Condensation Free',
    icon: Wind,
  },
  {
    id: 'layer-3',
    number: '03',
    title: 'Impact Dissipation Core',
    tagline: 'Micro-Cellular Shock Absorption',
    description: 'High-density poly-mesh matrix cushions accidental garage impacts, zippers, bicycle handles, and stray gravel during storage or transportation.',
    stats: '280gsm High-Density Weave',
    icon: Shield,
  },
  {
    id: 'layer-4',
    number: '04',
    title: 'Cashmere-Soft Fleece Lining',
    tagline: 'Zero-Scratch Ceramic Paint Protector',
    description: 'Ultra-plush brushed microfiber underside creates zero surface friction. Safe for freshly painted concours restorations and ultra-delicate hydrophobic ceramic coatings.',
    stats: 'Lab Certified Scratch-Proof',
    icon: Sparkles,
  },
];

export default function MaterialScience() {
  const [activeLayer, setActiveLayer] = useState(LAYERS[0]);

  return (
    <section
      id="material-science"
      style={{
        padding: '120px 0 100px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e8e8',
        position: 'relative',
      }}
    >
      <div className="container-am">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
          <span className="am-kicker">TEXTILE NANOTECHNOLOGY</span>
          <h2 className="am-title-section" style={{ color: '#111615' }}>
            Multi-Layer Anatomy
          </h2>
          <p className="am-lead" style={{ marginTop: '12px', color: '#5c6462' }}>
            Beneath the tailored elegance lies advanced automotive engineering. Explore our proprietary 
            4-layer textile composite developed to shield luxury vehicles in the harshest Indian climates—from 
            48°C scorching solar heat and torrential monsoon deluges to Delhi dust storms and stray animal scratches.
          </p>
        </div>

        {/* Interactive Layer Explorer */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px',
            marginBottom: '72px',
            alignItems: 'center',
          }}
          className="material-grid"
        >
          {/* Left: Layer Selector Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {LAYERS.map((layer) => {
              const isActive = activeLayer.id === layer.id;
              const Icon = layer.icon;
              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px',
                    background: isActive ? 'var(--color-brand-green-subtle)' : '#f9fbfa',
                    border: isActive ? '1px solid #00665e' : '1px solid #e2e6e6',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 15px rgba(0, 102, 94, 0.1)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: isActive ? '#00665e' : '#828c8a',
                      }}
                    >
                      {layer.number}
                    </span>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-main)',
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#111615',
                        }}
                      >
                        {layer.title}
                      </h4>
                      <div
                        style={{
                          fontSize: '13px',
                          color: '#5c6462',
                          marginTop: '2px',
                        }}
                      >
                        {layer.tagline}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isActive ? '#00665e' : '#eef2f2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={16} color={isActive ? '#ffffff' : '#5c6462'} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Focused Technical Deep-Dive Card */}
          <div
            style={{
              padding: '36px',
              backgroundColor: '#f8faf9',
              border: '1px solid #dce4e4',
              borderRadius: '2px',
              minHeight: '360px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div>
              <span className="am-kicker">TECHNICAL SPECIFICATION • LAYER {activeLayer.number}</span>

              <h3
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#111615',
                  marginBottom: '12px',
                }}
              >
                {activeLayer.title}
              </h3>

              <p
                style={{
                  fontSize: '15px',
                  color: '#5c6462',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                }}
              >
                {activeLayer.description}
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid #c8d8d6',
                borderRadius: '2px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#828c8a',
                  }}
                >
                  Performance Index
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#00665e',
                    marginTop: '2px',
                  }}
                >
                  {activeLayer.stats}
                </div>
              </div>

              <span
                style={{
                  fontSize: '13px',
                  color: '#00665e',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 600,
                }}
              >
                <Check size={16} /> Certified
              </span>
            </div>
          </div>
        </div>

        {/* Comparison: Velum Bespoke vs Generic Covers */}
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '20px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: '#111615',
              }}
            >
              TheSignaturecovers vs Generic Universal Covers
            </h3>
          </div>

          <div
            style={{
              overflowX: 'auto',
              background: '#ffffff',
              border: '1px solid #e2e6e6',
              borderRadius: '2px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            }}
          >
            <table
              style={{
                width: '100%',
                minWidth: '540px',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: '1px solid #e2e6e6',
                    background: '#f6f8f8',
                  }}
                >
                  <th style={{ padding: '16px 20px', color: '#5c6462', fontFamily: 'var(--font-main)', letterSpacing: '0.5px' }}>Protection Criterion</th>
                  <th style={{ padding: '16px 20px', color: '#00665e', fontFamily: 'var(--font-main)', letterSpacing: '0.5px', fontWeight: 600 }}>THESIGNATURECOVERS BESPOKE</th>
                  <th style={{ padding: '16px 20px', color: '#828c8a', fontFamily: 'var(--font-main)', letterSpacing: '0.5px' }}>Off-The-Shelf Universal</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eef2f2' }}>
                  <td style={{ padding: '14px 20px', color: '#111615', fontWeight: 500 }}>Chassis Tailoring Fit</td>
                  <td style={{ padding: '14px 20px', color: '#00665e', fontWeight: 500 }}>
                    <Check size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Individual 3D CAD Laser Match
                  </td>
                  <td style={{ padding: '14px 20px', color: '#dc2626' }}>
                    <X size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Loose baggy sizing (flaps in wind)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eef2f2' }}>
                  <td style={{ padding: '14px 20px', color: '#111615', fontWeight: 500 }}>Paintwork & Ceramic Coat Safety</td>
                  <td style={{ padding: '14px 20px', color: '#00665e', fontWeight: 500 }}>
                    <Check size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    100% Zero-Scratch Brushed Fleece
                  </td>
                  <td style={{ padding: '14px 20px', color: '#dc2626' }}>
                    <X size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Rough synthetic back causes swirls
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eef2f2' }}>
                  <td style={{ padding: '14px 20px', color: '#111615', fontWeight: 500 }}>Vapor Breathability</td>
                  <td style={{ padding: '14px 20px', color: '#00665e', fontWeight: 500 }}>
                    <Check size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Bi-directional nanoporous membrane
                  </td>
                  <td style={{ padding: '14px 20px', color: '#dc2626' }}>
                    <X size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Traps moisture, causing paint blisters
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eef2f2' }}>
                  <td style={{ padding: '14px 20px', color: '#111615', fontWeight: 500 }}>Indian Monsoon & Storm Defense</td>
                  <td style={{ padding: '14px 20px', color: '#00665e', fontWeight: 500 }}>
                    <Check size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    10,000mm+ Waterproof + Dual Wind Buckles
                  </td>
                  <td style={{ padding: '14px 20px', color: '#dc2626' }}>
                    <X size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Seeps at stitches, blows away in storms
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eef2f2' }}>
                  <td style={{ padding: '14px 20px', color: '#111615', fontWeight: 500 }}>48°C Summer Heat & UV Block</td>
                  <td style={{ padding: '14px 20px', color: '#00665e', fontWeight: 500 }}>
                    <Check size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    99.8% UV Deflection (Cabin 20°C Cooler)
                  </td>
                  <td style={{ padding: '14px 20px', color: '#dc2626' }}>
                    <X size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Cracks leather & damages dashboard LCDs
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 20px', color: '#111615', fontWeight: 500 }}>Guarantee & Free Delivery</td>
                  <td style={{ padding: '14px 20px', color: '#00665e', fontWeight: 500 }}>
                    <Check size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    3 to 5 Year Warranty + Free Pan-India Shipping
                  </td>
                  <td style={{ padding: '14px 20px', color: '#dc2626' }}>
                    <X size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    No warranty, cheap plastic fabric
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .material-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
