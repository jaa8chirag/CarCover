'use client';

import React, { useState, useEffect } from 'react';
import AstonMartinLogo from './AstonMartinLogo';
import { ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  onOpenConfigurator: () => void;
  onOpenEnquiry: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export default function Header({
  onOpenConfigurator,
  onOpenEnquiry,
  onOpenCart,
  cartCount,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="am-header-light"
        style={{
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.06)' : 'none',
        }}
      >
        <div
          className="container-am"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {/* Left Panel: Minimalist Hamburger & Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#111615',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                padding: 0,
              }}
              aria-label="Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X size={24} color="#111615" />
              ) : (
                <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="1" x2="24" y2="1" stroke="#111615" strokeWidth="1.8" />
                  <line x1="0" y1="13" x2="24" y2="13" stroke="#111615" strokeWidth="1.8" />
                </svg>
              )}
            </button>

            <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
              <a href="#models" className="am-nav-link-light">Models</a>
              <a href="#configurator" className="am-nav-link-light">Configurator</a>
              <a href="#collections" className="am-nav-link-light">Covers</a>
              <a href="#q-atelier" className="am-nav-link-light">Q by Specialised</a>
              <a href="#craftsmanship" className="am-nav-link-light">Heritage</a>
            </nav>
          </div>

          {/* Center: Official Aston Martin Winged Logo in Elegant Dark */}
          <a
            href="#"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              zIndex: 10,
            }}
            aria-label="Aston Martin Specialised Covers"
          >
            <div className="header-logo-scale">
              <AstonMartinLogo width={140} height={31} color="#111615" />
            </div>
          </a>

          {/* Right Panel: Official Buttons & Bag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={onOpenConfigurator}
              className="cta_button cta_button--primary-light hidden-mobile"
              style={{ height: '42px', minWidth: '120px', fontSize: '14px' }}
            >
              Configure
            </button>

            <button
              onClick={onOpenEnquiry}
              className="cta_button cta_button--secondary-light hidden-mobile"
              style={{ height: '42px', minWidth: '110px', fontSize: '14px' }}
            >
              Enquire
            </button>

            {/* Bag Icon */}
            <button
              onClick={onOpenCart}
              style={{
                position: 'relative',
                background: '#f2f5f5',
                border: '1px solid #dce2e2',
                color: '#111615',
                width: '42px',
                height: '42px',
                borderRadius: '2px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              aria-label="Saved Commissions"
            >
              <ShoppingBag size={18} color="#111615" />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#00665e',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 600,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Navigation */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              width: '100%',
              height: 'calc(100vh - 80px)',
              background: '#ffffff',
              zIndex: 999,
              padding: '40px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              overflowY: 'auto',
              borderTop: '1px solid #e5e8e8',
            }}
          >
            <a
              href="#models"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#111615',
                fontSize: '24px',
                fontWeight: 400,
                textDecoration: 'none',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Models
            </a>
            <a
              href="#configurator"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#111615',
                fontSize: '24px',
                fontWeight: 400,
                textDecoration: 'none',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Configurator
            </a>
            <a
              href="#collections"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#111615',
                fontSize: '24px',
                fontWeight: 400,
                textDecoration: 'none',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Tailored Covers
            </a>
            <a
              href="#q-atelier"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#111615',
                fontSize: '24px',
                fontWeight: 400,
                textDecoration: 'none',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Q by Specialised
            </a>
            <a
              href="#craftsmanship"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#111615',
                fontSize: '24px',
                fontWeight: 400,
                textDecoration: 'none',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Heritage
            </a>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConfigurator();
                }}
                className="cta_button cta_button--primary-light"
                style={{ width: '100%', height: '52px' }}
              >
                Configure
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="cta_button cta_button--secondary-light"
                style={{ width: '100%', height: '52px' }}
              >
                Enquire
              </button>
            </div>
          </div>
        )}
      </header>

      <style jsx>{`
        .am-nav-link-light {
          font-family: var(--font-main);
          font-size: 14px;
          font-weight: 500;
          color: #111615;
          text-decoration: none;
          letter-spacing: 0.8px;
          transition: color 0.2s ease;
        }
        .am-nav-link-light:hover {
          color: #00665e;
        }
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          .hidden-mobile {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .header-logo-scale {
            transform: scale(0.82);
            transform-origin: center center;
          }
        }
        @media (max-width: 370px) {
          .header-logo-scale {
            transform: scale(0.72);
            transform-origin: center center;
          }
        }
      `}</style>
    </>
  );
}
