'use client';

import React, { useState } from 'react';
import { COVER_TIERS, FABRIC_COLORS, PIPING_COLORS } from '@/data/carData';
import { Check, ShieldCheck, Sun, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BespokeConfiguratorProps {
  selectedVehicle: {
    brand: string;
    model: string;
    year: string;
    variant: string;
  };
  onAddToCommission: (commissionItem: any) => void;
  currencySymbol: string;
  currencyRate: number;
}

export default function BespokeConfigurator({
  selectedVehicle,
  onAddToCommission,
  currencySymbol,
  currencyRate,
}: BespokeConfiguratorProps) {
  const [selectedTierId, setSelectedTierId] = useState<string>('prestige-indoor');
  const [selectedColor, setSelectedColor] = useState(FABRIC_COLORS[0]);
  const [selectedPiping, setSelectedPiping] = useState(PIPING_COLORS[0]);
  const [monogramText, setMonogramText] = useState<string>('AM-007');
  const [hasMonogram, setHasMonogram] = useState<boolean>(true);
  const [monogramColor, setMonogramColor] = useState<'gold' | 'silver'>('gold');

  const [addons, setAddons] = useState({
    mirrorPockets: true,
    heavyDutyHoldall: true,
    lockingUnderbodyStraps: false,
    batteryChargerFlap: true,
  });

  const [viewEnvironment, setViewEnvironment] = useState<'studio' | 'night'>('studio');

  const currentTier = COVER_TIERS.find((t) => t.id === selectedTierId) || COVER_TIERS[0];

  const basePrice = currentTier.price;
  const monogramPrice = hasMonogram ? 45 : 0;
  const strapsPrice = addons.lockingUnderbodyStraps ? 35 : 0;
  const flapPrice = addons.batteryChargerFlap ? 40 : 0;
  const totalPrice = Math.round((basePrice + monogramPrice + strapsPrice + flapPrice) * currencyRate);

  const handleCommissionClick = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#00665e', '#005750', '#ffffff', '#dfc287'],
      });
    } catch (e) {}

    const commissionData = {
      vehicle: `${selectedVehicle.brand} ${selectedVehicle.model} (${selectedVehicle.variant})`,
      tier: currentTier.name,
      fabricColor: selectedColor.name,
      fabricHex: selectedColor.hex,
      pipingColor: selectedPiping.name,
      pipingHex: selectedPiping.hex,
      monogram: hasMonogram ? monogramText : 'None',
      monogramColor: monogramColor,
      addons: addons,
      price: totalPrice,
      currency: currencySymbol,
    };

    onAddToCommission(commissionData);
  };

  return (
    <section
      id="configurator"
      style={{
        padding: '120px 0 100px',
        backgroundColor: '#f6f8f8',
        borderTop: '1px solid #e5e8e8',
      }}
    >
      <div className="container-am">
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <span className="am-kicker">ONLINE CONFIGURATOR</span>
          <h2 className="am-title-section">Customise Your Commission</h2>
          <p className="am-lead" style={{ marginTop: '8px' }}>
            Allocated vehicle chassis:{' '}
            <span style={{ color: '#111615', fontWeight: 600 }}>
              {selectedVehicle.brand} {selectedVehicle.model} ({selectedVehicle.variant})
            </span>
          </p>
        </div>

        {/* 2-Column Configurator Workspace */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr',
            gap: '40px',
            alignItems: 'start',
          }}
          className="config-grid"
        >
          {/* Left: Interactive Car Silhouette Canvas */}
          <div
            style={{
              position: 'sticky',
              top: '110px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
            className="config-preview-panel"
          >
            {/* Visualizer Display */}
            <div
              style={{
                background: viewEnvironment === 'studio'
                  ? 'radial-gradient(circle at 50% 50%, #ffffff 0%, #e8eeed 100%)'
                  : 'radial-gradient(circle at 50% 45%, #181d25 0%, #080a0d 80%)',
                border: '1px solid #d4dfdd',
                borderRadius: '2px',
                padding: '36px 28px',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '440px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              }}
              className="config-visualizer-box"
            >
              {/* Top Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                <span
                  style={{
                    fontSize: '12px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: viewEnvironment === 'studio' ? '#5c6462' : '#959696',
                    fontWeight: 600,
                  }}
                >
                  3D Studio Preview
                </span>

                <div
                  style={{
                    display: 'flex',
                    background: viewEnvironment === 'studio' ? '#e2ecea' : 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(0, 102, 94, 0.15)',
                    borderRadius: '2px',
                    padding: '2px',
                  }}
                >
                  <button
                    onClick={() => setViewEnvironment('studio')}
                    style={{
                      background: viewEnvironment === 'studio' ? '#00665e' : 'transparent',
                      color: viewEnvironment === 'studio' ? '#ffffff' : '#5c6462',
                      border: 'none',
                      padding: '4px 10px',
                      fontSize: '11px',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Sun size={12} /> Gallery
                  </button>
                  <button
                    onClick={() => setViewEnvironment('night')}
                    style={{
                      background: viewEnvironment === 'night' ? '#00665e' : 'transparent',
                      color: viewEnvironment === 'night' ? '#ffffff' : '#5c6462',
                      border: 'none',
                      padding: '4px 10px',
                      fontSize: '11px',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Moon size={12} /> Night
                  </button>
                </div>
              </div>

              {/* Draped Car Graphic */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '20px 0',
                }}
              >
                {/* Floor glow */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    width: '85%',
                    height: '20px',
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />

                <svg
                  viewBox="0 0 600 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: '100%',
                    height: '100%',
                    filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.35))',
                  }}
                >
                  <defs>
                    <linearGradient id="fabricGradient" x1="50" y1="50" x2="550" y2="200" gradientUnits="userSpaceOnUse">
                      <stop stopColor={selectedColor.hex} />
                      <stop offset="0.45" stopColor={selectedColor.accentHex || selectedColor.hex} />
                      <stop offset="0.8" stopColor={selectedColor.hex} />
                      <stop offset="1" stopColor="#040608" />
                    </linearGradient>

                    <linearGradient id="satinSheen" x1="200" y1="30" x2="400" y2="180" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#ffffff" stopOpacity="0.25" />
                      <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.05" />
                      <stop offset="1" stopColor="#000000" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Body Silhouette */}
                  <path
                    d="M 50 185
                       C 55 175, 75 160, 110 158
                       C 140 157, 160 145, 195 110
                       C 235 72, 280 62, 340 62
                       C 400 62, 455 85, 495 125
                       C 530 160, 545 172, 560 185
                       C 550 190, 500 192, 440 192
                       C 380 192, 220 192, 160 192
                       C 100 192, 55 190, 50 185 Z"
                    fill="url(#fabricGradient)"
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M 50 185
                       C 55 175, 75 160, 110 158
                       C 140 157, 160 145, 195 110
                       C 235 72, 280 62, 340 62
                       C 400 62, 455 85, 495 125
                       C 530 160, 545 172, 560 185 Z"
                    fill="url(#satinSheen)"
                    style={{ mixBlendMode: 'overlay' }}
                  />

                  {/* Folds */}
                  <path d="M 110 158 Q 140 175 160 192" stroke="rgba(0,0,0,0.5)" strokeWidth="2.5" />
                  <path d="M 195 110 Q 230 155 250 192" stroke="rgba(0,0,0,0.4)" strokeWidth="2" />
                  <path d="M 340 62 Q 350 130 365 192" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                  <path d="M 455 85 Q 470 145 490 192" stroke="rgba(0,0,0,0.4)" strokeWidth="2" />

                  {/* Contrast Piping Trim */}
                  <path
                    d="M 85 165 C 135 150 185 105 235 74 C 285 58 355 58 410 70 C 465 88 510 135 545 180"
                    stroke={selectedPiping.hex}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    style={{
                      filter: `drop-shadow(0 0 6px ${selectedPiping.hex}88)`,
                      transition: 'stroke 0.3s ease',
                    }}
                  />

                  <path
                    d="M 52 188 Q 300 195 558 188"
                    stroke={selectedPiping.hex}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Mirror Pocket */}
                  {addons.mirrorPockets && (
                    <g>
                      <path
                        d="M 230 102 C 220 95 208 98 206 108 C 205 116 216 122 228 116 Z"
                        fill="url(#fabricGradient)"
                        stroke={selectedPiping.hex}
                        strokeWidth="2"
                      />
                    </g>
                  )}

                  {/* Monogram Crest on Hood */}
                  {hasMonogram && monogramText && (
                    <g transform="translate(145, 142) rotate(-8)">
                      <rect
                        x="-32"
                        y="-13"
                        width="64"
                        height="26"
                        rx="2"
                        fill="rgba(0,0,0,0.4)"
                        stroke={monogramColor === 'gold' ? '#dfc287' : '#ffffff'}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <text
                        x="0"
                        y="5"
                        textAnchor="middle"
                        fill={monogramColor === 'gold' ? '#dfc287' : '#ffffff'}
                        fontFamily="var(--font-main)"
                        fontSize="11"
                        fontWeight="700"
                        letterSpacing="1.5"
                      >
                        {monogramText.toUpperCase()}
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Bottom spec bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  borderTop: '1px solid #d4dfdd',
                  paddingTop: '14px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#5c6462', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Specification
                  </div>
                  <div style={{ fontSize: '15px', color: '#111615', fontWeight: 600, marginTop: '2px' }}>
                    {selectedVehicle.brand} • {selectedVehicle.model}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#5c6462', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Fabric / Trim
                  </div>
                  <div style={{ fontSize: '14px', color: '#00665e', fontWeight: 600, marginTop: '2px' }}>
                    {selectedColor.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Aston Martin Style Configurator Steps */}
          <div
            style={{
              padding: '36px',
              borderRadius: '2px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e6e6',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            }}
            className="config-options-panel"
          >
            {/* Step 1: Cover Tier */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="am-kicker" style={{ margin: 0 }}>1. Cover Performance Tier</span>
                <span style={{ fontSize: '12px', color: '#5c6462' }}>{currentTier.environment} Protection</span>
              </div>

              <div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}
                className="config-tier-grid"
              >
                {COVER_TIERS.map((tier) => {
                  const isSelected = tier.id === selectedTierId;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      style={{
                        background: isSelected ? 'var(--color-brand-green-subtle)' : '#f9fbfa',
                        border: isSelected ? '1px solid #00665e' : '1px solid #dce2e2',
                        padding: '14px',
                        borderRadius: '2px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: 600, color: isSelected ? '#00665e' : '#111615', marginBottom: '4px' }}>
                        {tier.name}
                      </div>
                      <div style={{ fontSize: '13px', color: isSelected ? '#00665e' : '#5c6462' }}>
                        {currencySymbol}{Math.round(tier.price * currencyRate)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Exterior Fabric Shade */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="am-kicker" style={{ margin: 0 }}>2. Exterior Fabric Finish</span>
                <span style={{ fontSize: '13px', color: '#111615', fontWeight: 600 }}>{selectedColor.name}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {FABRIC_COLORS.map((color) => {
                  const isSelected = color.id === selectedColor.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '2px',
                        background: color.hex,
                        border: isSelected ? '2px solid #00665e' : '1px solid #c2caca',
                        boxShadow: isSelected ? '0 0 10px rgba(0, 102, 94, 0.5)' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title={color.name}
                    >
                      {isSelected && <Check size={16} color="#ffffff" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Contrast Seam Piping */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="am-kicker" style={{ margin: 0 }}>3. Contrast Piping Livery</span>
                <span style={{ fontSize: '13px', color: '#111615', fontWeight: 600 }}>{selectedPiping.name}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {PIPING_COLORS.map((piping) => {
                  const isSelected = piping.id === selectedPiping.id;
                  return (
                    <button
                      key={piping.id}
                      onClick={() => setSelectedPiping(piping)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: isSelected ? 'var(--color-brand-green-subtle)' : '#f9fbfa',
                        border: isSelected ? '1px solid #00665e' : '1px solid #dce2e2',
                        padding: '8px 12px',
                        borderRadius: '2px',
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: piping.hex,
                          border: '1px solid rgba(0,0,0,0.15)',
                        }}
                      />
                      <span style={{ fontSize: '12px', color: isSelected ? '#00665e' : '#111615', fontWeight: 500 }}>
                        {piping.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Monogram & Bonnet Crest */}
            <div
              style={{
                marginBottom: '32px',
                background: '#f8faf9',
                border: '1px solid #e2e6e6',
                padding: '16px',
                borderRadius: '2px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <span className="am-kicker" style={{ margin: 0 }}>4. Personal Monogram</span>
                  <div style={{ fontSize: '12px', color: '#5c6462', marginTop: '2px' }}>
                    Embroidered thread on bonnet (+{currencySymbol}{Math.round(45 * currencyRate)})
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={hasMonogram}
                  onChange={(e) => setHasMonogram(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#00665e', cursor: 'pointer' }}
                />
              </div>

              {hasMonogram && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                  <input
                    type="text"
                    maxLength={8}
                    value={monogramText}
                    onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                    placeholder="E.G. DB12, 007"
                    style={{
                      background: '#ffffff',
                      border: '1px solid #d4dedd',
                      color: '#111615',
                      fontFamily: 'var(--font-main)',
                      letterSpacing: '1px',
                      padding: '10px 14px',
                      fontSize: '14px',
                      borderRadius: '2px',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => setMonogramColor('gold')}
                      style={{
                        background: monogramColor === 'gold' ? '#dfc287' : '#ffffff',
                        color: monogramColor === 'gold' ? '#000000' : '#886d34',
                        border: '1px solid #dfc287',
                        padding: '0 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        borderRadius: '2px',
                        fontWeight: 600,
                      }}
                    >
                      Gold
                    </button>
                    <button
                      onClick={() => setMonogramColor('silver')}
                      style={{
                        background: monogramColor === 'silver' ? '#111615' : '#ffffff',
                        color: monogramColor === 'silver' ? '#ffffff' : '#111615',
                        border: '1px solid #111615',
                        padding: '0 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        borderRadius: '2px',
                        fontWeight: 600,
                      }}
                    >
                      Silver
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Price & Primary Action */}
            <div style={{ borderTop: '1px solid #e5e8e8', paddingTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#5c6462', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Total Commission Investment
                  </div>
                  <div style={{ fontSize: '13px', color: '#00665e', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                    <ShieldCheck size={14} /> 5-Year Craftsmanship Guarantee Included
                  </div>
                </div>

                <div style={{ fontSize: '32px', fontWeight: 600, color: '#111615' }}>
                  {currencySymbol}{totalPrice}
                </div>
              </div>

              <button
                onClick={handleCommissionClick}
                className="cta_button cta_button--primary-light"
                style={{ width: '100%', height: '56px', fontSize: '16px' }}
              >
                Commission Specification
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .config-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .config-preview-panel {
            position: relative !important;
            top: 0 !important;
          }
          .config-visualizer-box {
            min-height: 320px !important;
            padding: 24px 16px !important;
          }
          .config-options-panel {
            padding: 24px 16px !important;
          }
        }
        @media (max-width: 480px) {
          .config-visualizer-box {
            min-height: 250px !important;
          }
          .config-tier-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
