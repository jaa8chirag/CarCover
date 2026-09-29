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
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e8e8',
        position: 'relative',
      }}
    >
      <div className="container-am">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <span className="am-kicker">50,000+ PRECISION 3D CAD PATTERNS</span>
          <h2 className="am-title-section">Custom Tailored Vehicle Match</h2>
          <p className="am-lead" style={{ marginTop: '12px' }}>
            Select your car brand, generation, and exact body styling. From Mahindra Thar, Fortuner, Creta, 
            and Safari to Mercedes, BMW, Porsche, and Aston Martin—our atelier cuts every cover with exact 
            mirror pockets and aerodynamic clearances.
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
                  background: isSelected ? '#00665e' : '#f2f5f5',
                  border: isSelected ? '1px solid #00665e' : '1px solid #dce2e2',
                  color: isSelected ? '#ffffff' : '#111615',
                  padding: '10px 20px',
                  borderRadius: '2px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-main)',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.2s ease',
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
            padding: 'clamp(20px, 4vw, 40px)',
            maxWidth: '1080px',
            margin: '0 auto',
            backgroundColor: '#f8faf9',
            border: '1px solid #e2e6e6',
            borderRadius: '2px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
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
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#00665e', marginBottom: '8px', fontWeight: 600 }}>
                1. Selected Marque
              </label>
              <select
                value={selectedBrandId}
                onChange={(e) => handleBrandChange(e.target.value)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #d4dedd',
                  color: '#111615',
                  padding: '12px 14px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-main)',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {CAR_BRANDS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Model */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#00665e', marginBottom: '8px', fontWeight: 600 }}>
                2. Model Series
              </label>
              <select
                value={selectedModelId}
                onChange={(e) => handleModelChange(e.target.value)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #d4dedd',
                  color: '#111615',
                  padding: '12px 14px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-main)',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {currentBrand.models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Year */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#00665e', marginBottom: '8px', fontWeight: 600 }}>
                3. Generation / Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #d4dedd',
                  color: '#111615',
                  padding: '12px 14px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-main)',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {currentModel.years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Body Variant */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#00665e', marginBottom: '8px', fontWeight: 600 }}>
                4. Aerodynamic Body
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #d4dedd',
                  color: '#111615',
                  padding: '12px 14px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-main)',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {currentModel.variants.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Vehicle Match Result Bar */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #c8d8d6',
              borderRadius: '2px',
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
                  width: '44px',
                  height: '44px',
                  borderRadius: '2px',
                  background: 'var(--color-brand-green-subtle)',
                  border: '1px solid #00665e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Cpu size={22} color="#00665e" />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#00665e', fontWeight: 600 }}>
                    CAD Scan Status: 100% Certified
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#00665e', fontWeight: 500 }}>
                    <CheckCircle2 size={13} /> Active In Archive
                  </span>
                </div>
                <div style={{ fontSize: 'clamp(15px, 3.5vw, 18px)', fontWeight: 600, color: '#111615', wordBreak: 'break-word', lineHeight: 1.3 }}>
                  {currentBrand.name} {currentModel.name} • {selectedVariant} ({selectedYear})
                </div>
                <div style={{ fontSize: '12px', color: '#5c6462', marginTop: '2px', lineHeight: 1.4 }}>
                  Includes precision mirror pockets, contoured roofline & sculpted splitter tolerances.
                </div>
              </div>
            </div>

            {/* Launch Configurator Button */}
            <button
              onClick={handleConfigureNow}
              className="cta_button cta_button--primary-light vehicle-launch-btn"
              style={{ height: '46px', padding: '0 20px', fontSize: '14px' }}
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
          }
        }
      `}</style>
    </section>
  );
}
