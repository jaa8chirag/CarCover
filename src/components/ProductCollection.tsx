'use client';

import React, { useState } from 'react';
import { COVER_TIERS } from '@/data/carData';
import { CheckCircle2, ArrowUpRight, Star } from 'lucide-react';

interface ProductCollectionProps {
  onSelectTier: (tierId: string) => void;
  currencySymbol: string;
  currencyRate: number;
}

export default function ProductCollection({
  onSelectTier,
  currencySymbol,
  currencyRate,
}: ProductCollectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredTiers = activeTab === 'all' 
    ? COVER_TIERS 
    : COVER_TIERS.filter((t) => t.environment.toLowerCase() === activeTab.toLowerCase());

  return (
    <section
      id="collections"
      style={{
        padding: '120px 0 100px',
        backgroundColor: '#f6f8f8',
        borderTop: '1px solid #e5e8e8',
        position: 'relative',
      }}
    >
      <div className="container-am">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
          <span className="am-kicker">EXCELLENCE IN EVERY THREAD</span>
          <h2 className="am-title-section" style={{ color: '#111615' }}>
            The Bespoke Collections
          </h2>
          <p className="am-lead" style={{ marginTop: '12px', color: '#5c6462' }}>
            Engineered across four distinct performance tiers—from climate-controlled collector garaging 
            to alpine storm protection and dramatic VIP showroom reveals.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'all', label: 'Complete Collection' },
            { id: 'indoor', label: 'Indoor Prestige' },
            { id: 'outdoor', label: 'Stormshield+ Outdoor' },
            { id: 'reveal', label: 'Silk Reveal Drapes' },
            { id: 'all-weather', label: 'Track & Heritage' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? '#00665e' : '#ffffff',
                  border: isActive ? '1px solid #00665e' : '1px solid #dce2e2',
                  color: isActive ? '#ffffff' : '#111615',
                  padding: '10px 20px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-main)',
                  fontSize: '13px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Collection Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
          }}
          className="collection-grid"
        >
          {filteredTiers.map((tier) => (
            <div
              key={tier.id}
              className="am-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                border: tier.popular ? '1px solid #00665e' : '1px solid #e2e6e6',
                position: 'relative',
                borderRadius: '2px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              }}
            >
              {/* Featured Tag */}
              {tier.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: '#00665e',
                    color: '#ffffff',
                    fontFamily: 'var(--font-main)',
                    fontWeight: 600,
                    fontSize: '11px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    zIndex: 2,
                  }}
                >
                  Atelier Choice
                </div>
              )}

              {/* Product Visual */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  width: '100%',
                  overflow: 'hidden',
                  backgroundColor: '#0a0d11',
                }}
              >
                <img
                  src={tier.image}
                  alt={tier.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                
                {/* Environment Pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #dce2e2',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#111615',
                    fontWeight: 600,
                  }}
                >
                  {tier.environment} Grade
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    className="am-title-card"
                    style={{
                      marginBottom: '8px',
                      color: '#111615',
                    }}
                  >
                    {tier.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '14px',
                      color: '#5c6462',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                    }}
                  >
                    {tier.tagline}
                  </p>

                  {/* Rating & Guarantee */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '20px',
                      fontSize: '12px',
                      color: '#111615',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                      <Star size={13} fill="#00665e" color="#00665e" /> {tier.rating} ({tier.reviewCount} Reviews)
                    </span>
                    <span style={{ opacity: 0.3 }}>•</span>
                    <span style={{ color: '#00665e', fontWeight: 600 }}>
                      {tier.warranty}
                    </span>
                  </div>

                  {/* Bullet Highlights */}
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginBottom: '24px',
                    }}
                  >
                    {tier.features.slice(0, 3).map((feat, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '13px',
                          color: '#444c4a',
                        }}
                      >
                        <CheckCircle2 size={15} color="#00665e" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer: Price & Configure Button */}
                <div
                  style={{
                    borderTop: '1px solid #eef2f2',
                    paddingTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: '#828c8a',
                        display: 'block',
                      }}
                    >
                      From
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '22px',
                        fontWeight: 600,
                        color: '#111615',
                      }}
                    >
                      {currencySymbol}{Math.round(tier.price * currencyRate)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectTier(tier.id);
                      const el = document.getElementById('configurator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="cta_button cta_button--secondary-light"
                    style={{
                      height: '42px',
                      padding: '0 16px',
                      fontSize: '13px',
                    }}
                  >
                    <span>Configure</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
