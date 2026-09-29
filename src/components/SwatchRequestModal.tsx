'use client';

import React, { useState } from 'react';
import { X, Check, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SwatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SwatchRequestModal({ isOpen, onClose }: SwatchModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([
    'Prestige Indoor Fleece',
    'Stormshield+ Outdoor',
  ]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
    country: 'India',
    vehicleModel: '',
  });

  if (!isOpen) return null;

  const toggleFabric = (fabric: string) => {
    if (selectedFabrics.includes(fabric)) {
      setSelectedFabrics(selectedFabrics.filter((f) => f !== fabric));
    } else {
      setSelectedFabrics([...selectedFabrics, fabric]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#00665e', '#004d47', '#ffffff', '#dfc287'],
      });
    } catch (err) {}
    setSubmitted(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '580px',
          width: '100%',
          backgroundColor: '#ffffff',
          border: '1px solid #dce2e2',
          padding: 'clamp(24px, 5vw, 40px)',
          borderRadius: '3px',
          position: 'relative',
          boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: '#5c6462',
            cursor: 'pointer',
            padding: '4px',
          }}
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <span className="am-kicker">COMPLIMENTARY SAMPLE PRESENTATION</span>
            <h3
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '24px',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#111615',
                marginBottom: '8px',
              }}
            >
              Request Fabric Swatches
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: '#5c6462',
                lineHeight: 1.6,
                marginBottom: '28px',
              }}
            >
              Feel the velvet softness and inspect the technical weather barriers first-hand. 
              Our complimentary box contains physical fabric swatches and contrast piping samples.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Select Materials */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#00665e',
                    marginBottom: '10px',
                    fontWeight: 600,
                  }}
                >
                  Select Fabric Swatches to Include
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {[
                    'AquaShield Monsoon Outdoor',
                    'Prestige Indoor Velvet Fleece',
                    'Titanium 48°C Heat Shield',
                    'Atelier Silk Reveal Drape',
                  ].map((fabric) => {
                    const isChecked = selectedFabrics.includes(fabric);
                    return (
                      <div
                        key={fabric}
                        onClick={() => toggleFabric(fabric)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          background: isChecked ? 'var(--color-brand-green-subtle)' : '#f8faf9',
                          border: isChecked ? '1px solid #00665e' : '1px solid #dce2e2',
                          padding: '10px 14px',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: isChecked ? '#00665e' : '#111615',
                          fontWeight: isChecked ? 600 : 400,
                        }}
                      >
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '2px',
                            border: isChecked ? '1px solid #00665e' : '1px solid #9aa2a0',
                            background: isChecked ? '#00665e' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {isChecked && <Check size={12} color="#ffffff" strokeWidth={3} />}
                        </div>
                        <span>{fabric}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Client Information Form */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#5c6462', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Lord Sterling"
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #d4dedd',
                      padding: '10px 12px',
                      color: '#111615',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#5c6462', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@luxury.co.uk"
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #d4dedd',
                      padding: '10px 12px',
                      color: '#111615',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '11px', color: '#5c6462', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Intended Vehicle (Make & Model)
                </label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                  placeholder="e.g. Aston Martin DB12 Volante"
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #d4dedd',
                    padding: '10px 12px',
                    color: '#111615',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '11px', color: '#5c6462', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Postal Delivery Address
                </label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street Address, Estate or Dealership"
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #d4dedd',
                    padding: '10px 12px',
                    color: '#111615',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '28px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#5c6462', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>City</label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="London"
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #d4dedd',
                      padding: '10px 12px',
                      color: '#111615',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#5c6462', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Postcode</label>
                  <input
                    required
                    type="text"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    placeholder="SW1A 1AA"
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #d4dedd',
                      padding: '10px 12px',
                      color: '#111615',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#5c6462', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Country</label>
                  <input
                    required
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="UK"
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #d4dedd',
                      padding: '10px 12px',
                      color: '#111615',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="cta_button cta_button--primary-light"
                style={{ width: '100%', height: '52px' }}
              >
                <span>Dispatch Complimentary Swatch Pack</span>
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 8px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--color-brand-green-subtle)',
                border: '2px solid #00665e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <PackageCheck size={32} color="#00665e" />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '22px',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#111615',
                marginBottom: '10px',
              }}
            >
              Swatch Pack Dispatched
            </h3>

            <p
              style={{
                fontSize: '14px',
                color: '#5c6462',
                lineHeight: 1.6,
                marginBottom: '28px',
                maxWidth: '420px',
                margin: '0 auto 28px',
              }}
            >
              Thank you, {formData.fullName || 'Client'}. Your tactile fabric sample box is being prepared 
              at our Yorkshire atelier and will be delivered via priority tracked courier.
            </p>

            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="cta_button cta_button--primary-light"
              style={{ padding: '0 32px' }}
            >
              Return to Atelier
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
