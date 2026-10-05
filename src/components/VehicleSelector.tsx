'use client';

import React, { useState } from 'react';
import { CAR_BRANDS } from '@/data/carData';
import { CheckCircle2, ChevronRight, Cpu } from 'lucide-react';

interface VehicleSelectorProps {
  onSelectVehicle: (brandName: string, modelName: string, year: string, variant: string) => void;
  onOpenConfigurator: () => void;
}

export default function VehicleSelector({ onSelectVehicle, onOpenConfigurator }: VehicleSelectorProps) {
  const [selectedBrandId, setSelectedBrandId] = useState<string>('mahindra');
  const [selectedModelId, setSelectedModelId] = useState<string>('thar-roxx');
  const [selectedYear, setSelectedYear] = useState<string>('2024 - 2026');
  const [selectedVariant, setSelectedVariant] = useState<string>('AX7L Luxury 4x4');

  const currentBrand = CAR_BRANDS.find((b) => b.id === selectedBrandId) || CAR_BRANDS[0];
  const currentModel = currentBrand.models.find((m) => m.id === selectedModelId) || currentBrand.models[0];

  const handleBrandChange = (brandId: string) => {
    setSelectedBrandId(brandId);
    const newBrand = CAR_BRANDS.find((b) => b.id === brandId) || CAR_BRANDS[0];
    const newModel = newBrand.models[0];
    setSelectedModelId(newModel.id);
    setSelectedYear(newModel.years[0]);
    setSelectedVariant(newModel.variants[0]);
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
    const newModel = currentBrand.models.find((m) => m.id === modelId);
    if (newModel) {
      setSelectedYear(newModel.years[0]);
      setSelectedVariant(newModel.variants[0]);
    }
  };

  const handleConfigureNow = () => {
    onSelectVehicle(currentBrand.name, currentModel.name, selectedYear, selectedVariant);
    onOpenConfigurator();
    const configEl = document.getElementById('configurator');
    if (configEl) configEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="vehicle-selector"
      style={{
        padding: '120px 0 100px',
        backgroundColor: '#f8fafc',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 102, 94, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-am" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <span className="am-kicker">50,000+ PRECISION 3D CAD ARCHIVE</span>
          <h2 className="am-title-section" style={{ color: '#0f172a' }}>
            Tailored Vehicle Architecture
          </h2>
          <p className="am-lead" style={{ marginTop: '14px', color: '#475569' }}>
            Select your car brand, generation, and exact body styling. From Mahindra Thar, Fortuner, Creta, 
            and Safari to Mercedes, BMW, Porsche, and Aston Martin—every cut preserves exact mirror pockets and aerodynamic clearances.
          </p>
        </div>

        {/* Brand Selector Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          {CAR_BRANDS.map((brand) => {
            const isSelected = brand.id === selectedBrandId;
            return (
              <button
                key={brand.id}
                onClick={() => handleBrandChange(brand.id)}
                style={{
                  background: isSelected ? '#00665e' : '#ffffff',
                  border: isSelected ? '1px solid #00665e' : '1px solid #cbd5e1',
                  color: isSelected ? '#ffffff' : '#334155',
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontFamily: "'Lexend Peta', 'AstonMartinSans', sans-serif",
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(0, 102, 94, 0.25)' : '0 2px 6px rgba(0, 0, 0, 0.03)',
                }}
              >
                {brand.name}
              </button>
            );
          })}
        </div>

        {/* The Digital CAD Selector Card */}
        <div
          style={{
            padding: 'clamp(24px, 4vw, 44px)',
            maxWidth: '1080px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Dropdown Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              marginBottom: '36px',
            }}
          >
            {/* Step 1: Marque */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#00665e', marginBottom: '10px', fontWeight: 600, fontFamily: "'Lexend Peta', sans-serif" }}>
                1. Selected Marque
              </label>
              <select
                value={selectedBrandId}
                onChange={(e) => handleBrandChange(e.target.value)}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  padding: '12px 14px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-main)',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {CAR_BRANDS.map((b) => (
                  <option key={b.id} value={b.id} style={{ background: '#ffffff', color: '#0f172a' }}>
                    {b.name} ({b.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Model */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#00665e', marginBottom: '10px', fontWeight: 600, fontFamily: "'Lexend Peta', sans-serif" }}>
                2. Model Series
              </label>
              <select
                value={selectedModelId}
                onChange={(e) => handleModelChange(e.target.value)}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  padding: '12px 14px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-main)',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {currentBrand.models.map((m) => (
                  <option key={m.id} value={m.id} style={{ background: '#ffffff', color: '#0f172a' }}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Year */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#00665e', marginBottom: '10px', fontWeight: 600, fontFamily: "'Lexend Peta', sans-serif" }}>
                3. Generation / Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  padding: '12px 14px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-main)',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {currentModel.years.map((y) => (
                  <option key={y} value={y} style={{ background: '#ffffff', color: '#0f172a' }}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Body Variant */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#00665e', marginBottom: '10px', fontWeight: 600, fontFamily: "'Lexend Peta', sans-serif" }}>
                4. Aerodynamic Body
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  padding: '12px 14px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-main)',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {currentModel.variants.map((v) => (
                  <option key={v} value={v} style={{ background: '#ffffff', color: '#0f172a' }}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Vehicle Match Result Bar */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 240px', minWidth: 0 }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '6px',
                  background: 'rgba(0, 102, 94, 0.1)',
                  border: '1px solid #00665e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Cpu size={24} color="#00665e" />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#00665e', fontWeight: 600 }}>
                    CAD Scan Status: 100% Certified
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#059669', fontWeight: 600 }}>
                    <CheckCircle2 size={13} /> Active In Archive
                  </span>
                </div>
                <div style={{ fontSize: 'clamp(16px, 3.5vw, 20px)', fontWeight: 600, color: '#0f172a', wordBreak: 'break-word', lineHeight: 1.3, fontFamily: "'Cinzel', serif" }}>
                  {currentBrand.name} {currentModel.name} • {selectedVariant} ({selectedYear})
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', lineHeight: 1.4 }}>
                  Includes precision mirror pockets, contoured roofline & sculpted splitter tolerances.
                </div>
              </div>
            </div>

            {/* Launch Configurator Button */}
            <button
              onClick={handleConfigureNow}
              className="cta_button vehicle-launch-btn"
              style={{
                height: '48px',
                padding: '0 26px',
                fontSize: '12px',
                backgroundColor: '#00665e',
                color: '#ffffff',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 14px rgba(0, 102, 94, 0.3)',
              }}
            >
              <span>Customise in Studio</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .vehicle-launch-btn {
            width: 100% !important;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
