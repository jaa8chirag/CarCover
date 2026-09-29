'use client';

import React, { useState, useEffect, useRef } from 'react';
import AstonMartinLogo from './AstonMartinLogo';
import { CAR_BRANDS } from '@/data/carData';
import {
  ShoppingBag,
  X,
  ChevronDown,
  Search,
  ShieldCheck,
  Droplets,
  SunMedium,
  Car,
  Sparkles,
  ArrowRight,
  Flame,
} from 'lucide-react';

interface HeaderProps {
  onOpenConfigurator: () => void;
  onOpenEnquiry: () => void;
  onOpenCart: () => void;
  cartCount: number;
  onSelectVehicle?: (brand: string, model: string, year: string, variant: string) => void;
  onSelectCategory?: (categoryId: string) => void;
}

const COVER_CATEGORIES = [
  {
    id: 'monsoon',
    title: 'Monsoon Stormproof',
    subtitle: '100% Waterproof • Deluge & Hail Armor',
    icon: Droplets,
    badge: 'India #1 Bestseller',
    badgeColor: '#00665e',
    startingPrice: '₹4,999',
    description: '4-Ply taped seams engineered for Mumbai & Kerala torrential rainfall.',
  },
  {
    id: 'heatshield',
    title: 'SolarReflect 48°C Heat Shield',
    subtitle: 'UV Titanium • Solar & Dust Defense',
    icon: SunMedium,
    badge: 'Extreme Summer',
    badgeColor: '#b45309',
    startingPrice: '₹4,499',
    description: 'Reflects 99.4% solar radiation, keeping cabin 18°C cooler in Delhi & Rajasthan.',
  },
  {
    id: 'indoor-velvet',
    title: 'CashmereVelvet Atelier',
    subtitle: 'Ultra-Soft Fleece • Garage Showroom Drape',
    icon: Sparkles,
    badge: 'Bespoke Luxury',
    badgeColor: '#004d47',
    startingPrice: '₹5,499',
    description: 'Zero-scratch stretch fleece that hugs every sculpted aerodynamic bodyline.',
  },
  {
    id: 'offroad-armor',
    title: 'Heavy-Duty 4x4 Off-Road Armor',
    subtitle: 'Ballistic Tear-Proof • Extreme Outdoor',
    icon: ShieldCheck,
    badge: 'Tough & Rugged',
    badgeColor: '#1e293b',
    startingPrice: '₹6,499',
    description: 'Thick reinforced canvas with reinforced spare-wheel & snorkel pockets.',
  },
];

const BODY_STYLES = [
  {
    title: 'SUVs & 4x4 Off-Roaders',
    examples: 'Thar, Fortuner, Defender, Safari, Scorpio-N, G-Wagon',
    count: '320+ CAD Patterns',
  },
  {
    title: 'Executive Sedans & Limousines',
    examples: 'Maybach S-Class, E-Class LWB, BMW 7 Series, Verna',
    count: '180+ CAD Patterns',
  },
  {
    title: 'Crossovers & Electric Vehicles',
    examples: 'Tata Curvv, Ioniq 5, Creta, Nexon.ev, Hycross',
    count: '140+ CAD Patterns',
  },
  {
    title: 'Supercars & Vintage Classics',
    examples: 'Porsche 911, Aston Martin DB12, DBX, Vintage Classics',
    count: '90+ CAD Patterns',
  },
];

export default function Header({
  onOpenConfigurator,
  onOpenEnquiry,
  onOpenCart,
  cartCount,
  onSelectVehicle,
  onSelectCategory,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Desktop Mega Menus: 'brands' | 'categories' | 'bodystyles' | 'search' | null
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Search Bar State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Mobile Accordion state
  const [mobileBrandAccordion, setMobileBrandAccordion] = useState(false);
  const [mobileCategoryAccordion, setMobileCategoryAccordion] = useState(false);
  const [mobileBodyAccordion, setMobileBodyAccordion] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live Search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches: any[] = [];

    CAR_BRANDS.forEach((brand) => {
      brand.models.forEach((model) => {
        if (
          brand.name.toLowerCase().includes(q) ||
          model.name.toLowerCase().includes(q)
        ) {
          matches.push({
            brand: brand.name,
            model: model.name,
            year: model.years[0] || '2024 - 2026',
            variant: model.variants[0] || 'Standard Bespoke Spec',
            country: brand.country,
          });
        }
      });
    });

    setSearchResults(matches.slice(0, 6));
  }, [searchQuery]);

  const handleCarSelect = (brandName: string, modelName: string, year: string, variant: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setSearchQuery('');
    if (onSelectVehicle) {
      onSelectVehicle(brandName, modelName, year, variant);
    } else {
      onOpenConfigurator();
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    } else {
      const el = document.getElementById('collections');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className="am-header-light"
      style={{
        boxShadow: scrolled || activeDropdown ? '0 8px 30px rgba(0, 0, 0, 0.08)' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
        background: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
      }}
    >

      <div
        className="container-am"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '66px',
          gap: '12px',
        }}
      >
        {/* Left Panel: Minimalist Hamburger & E-Commerce Category Mega-Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 0', minWidth: 0 }}>
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
              width: '36px',
              height: '36px',
              padding: 0,
              flexShrink: 0,
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

          {/* Desktop E-Commerce Category Dropdown Triggers */}
          <nav className="desktop-nav" style={{ alignItems: 'center', gap: '18px' }}>
            {/* 1. By Car Brand Dropdown Trigger */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'brands' ? null : 'brands')}
                className="am-nav-link-light"
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  fontWeight: activeDropdown === 'brands' ? 600 : 500,
                  color: activeDropdown === 'brands' ? '#00665e' : '#111615',
                }}
              >
                <span>Car Brands</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'brands' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>
            </div>

            {/* 2. Cover Categories Dropdown Trigger */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
                className="am-nav-link-light"
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  fontWeight: activeDropdown === 'categories' ? 600 : 500,
                  color: activeDropdown === 'categories' ? '#00665e' : '#111615',
                }}
              >
                <span>Cover Types</span>
                <span
                  style={{
                    fontSize: '9px',
                    background: '#e6f4f2',
                    color: '#00665e',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                  }}
                >
                  POPULAR
                </span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'categories' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>
            </div>

            {/* 3. By Body Style Dropdown Trigger */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'bodystyles' ? null : 'bodystyles')}
                className="am-nav-link-light"
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  fontWeight: activeDropdown === 'bodystyles' ? 600 : 500,
                  color: activeDropdown === 'bodystyles' ? '#00665e' : '#111615',
                }}
              >
                <span>Body Styles</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'bodystyles' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>
            </div>

            <a href="#q-atelier" className="am-nav-link-light">Bespoke Atelier</a>
          </nav>
        </div>

        {/* Center: Official TheSignaturecovers Logo (Isolated Flex Center) */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            flex: '0 0 auto',
            zIndex: 10,
            padding: '0 4px',
          }}
          aria-label="TheSignaturecovers - Bespoke Tailored Car Covers"
        >
          <div className="header-logo-scale">
            <AstonMartinLogo width={195} height={34} color="#111615" />
          </div>
        </a>

        {/* Right Panel: E-Commerce Quick Search, Configure Button & Cart Bag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', flex: '1 1 0', minWidth: 0 }}>
          {/* Quick Search Button / Pill */}
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'search' ? null : 'search')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f4f6f6',
              border: '1px solid #dce2e2',
              padding: '7px 12px',
              borderRadius: '20px',
              color: '#556060',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            className="hidden-mobile"
            title="Search car make or model"
          >
            <Search size={14} color="#00665e" />
            <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Find Your Car...
            </span>
          </button>

          <button
            onClick={onOpenConfigurator}
            className="cta_button cta_button--primary-light hidden-mobile"
            style={{ height: '38px', minWidth: '100px', fontSize: '12px' }}
          >
            Configure
          </button>

          <button
            onClick={onOpenEnquiry}
            className="cta_button cta_button--secondary-light hidden-mobile"
            style={{ height: '38px', minWidth: '85px', fontSize: '12px' }}
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
              width: '38px',
              height: '38px',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0,
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
                  fontSize: '10px',
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

      {/* ========================================================================= */}
      {/* 🚀 DESKTOP MEGA-MENU 1: BROWSE BY CAR MAKE / BRAND */}
      {/* ========================================================================= */}
      {activeDropdown === 'brands' && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#ffffff',
            borderTop: '1px solid #ebeeee',
            borderBottom: '2px solid #00665e',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
            padding: '32px 0 36px',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <div className="container-am">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#00665e', fontWeight: 700 }}>
                  SELECT AUTOMOTIVE MANUFACTURER
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111615', marginTop: '2px' }}>
                  Choose Your Car Make for 100% 3D CAD Tailored Fit
                </h3>
              </div>
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  const el = document.getElementById('vehicle-finder') || document.getElementById('models');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#00665e',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                }}
              >
                <span>View All 50+ Global & Indian Brands</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Grid of Top Brands */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
              }}
            >
              {CAR_BRANDS.slice(0, 8).map((brand) => (
                <div
                  key={brand.id}
                  style={{
                    border: '1px solid #e5e9e9',
                    borderRadius: '4px',
                    padding: '16px',
                    background: '#fbfcfc',
                    transition: 'all 0.2s ease',
                  }}
                  className="brand-card-hover"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111615', margin: 0 }}>{brand.name}</h4>
                    <span style={{ fontSize: '10px', color: '#6e7a78', background: '#ecefef', padding: '2px 6px', borderRadius: '2px', textTransform: 'uppercase' }}>
                      {brand.country}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {brand.models.slice(0, 3).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => handleCarSelect(brand.name, m.name, m.years[0], m.variants[0])}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          fontSize: '12px',
                          color: '#4a5453',
                          cursor: 'pointer',
                          padding: '4px 6px',
                          borderRadius: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s',
                        }}
                        className="model-pill-hover"
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.name}</span>
                        <span style={{ fontSize: '10px', color: '#00665e', fontWeight: 600 }}>Configure &rarr;</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🚀 DESKTOP MEGA-MENU 2: BROWSE BY COVER PROTECTION CATEGORY */}
      {/* ========================================================================= */}
      {activeDropdown === 'categories' && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#ffffff',
            borderTop: '1px solid #ebeeee',
            borderBottom: '2px solid #00665e',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
            padding: '32px 0 36px',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <div className="container-am">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#00665e', fontWeight: 700 }}>
                  COVER PROTECTION EDITIONS
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111615', marginTop: '2px' }}>
                  Engineered For Extreme Indian Heat, Monsoons, Dust & Garage Care
                </h3>
              </div>
              <span style={{ fontSize: '12px', color: '#6e7a78' }}>
                All covers include 3-Year Pan-India Warranty &bull; Free Storage Duffle Bag
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
              }}
            >
              {COVER_CATEGORIES.map((cat) => {
                const IconComp = cat.icon;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    style={{
                      border: '1px solid #e5e9e9',
                      borderRadius: '4px',
                      padding: '20px',
                      background: '#fbfcfc',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                    className="cat-card-hover"
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '4px',
                            background: '#e6f4f2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#00665e',
                          }}
                        >
                          <IconComp size={20} />
                        </div>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            color: '#ffffff',
                            background: cat.badgeColor,
                            padding: '3px 8px',
                            borderRadius: '2px',
                            textTransform: 'uppercase',
                          }}
                        >
                          {cat.badge}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111615', marginBottom: '4px' }}>{cat.title}</h4>
                      <p style={{ fontSize: '12px', color: '#00665e', fontWeight: 600, marginBottom: '8px' }}>{cat.subtitle}</p>
                      <p style={{ fontSize: '12px', color: '#606b69', lineHeight: 1.45, marginBottom: '16px' }}>{cat.description}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #edf0f0', paddingTop: '12px' }}>
                      <div>
                        <span style={{ fontSize: '10px', color: '#828e8c', display: 'block' }}>Starting From</span>
                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#111615' }}>{cat.startingPrice}</span>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#00665e' }}>Buy Now &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🚀 DESKTOP MEGA-MENU 3: BROWSE BY BODY STYLE */}
      {/* ========================================================================= */}
      {activeDropdown === 'bodystyles' && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#ffffff',
            borderTop: '1px solid #ebeeee',
            borderBottom: '2px solid #00665e',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
            padding: '32px 0 36px',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <div className="container-am">
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#00665e', fontWeight: 700 }}>
                AUTOMOTIVE BODY SILHOUETTES
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111615', marginTop: '2px' }}>
                Select Your Body Style For Customized Mirror & Antenna Profiles
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
              }}
            >
              {BODY_STYLES.map((style) => (
                <div
                  key={style.title}
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenConfigurator();
                  }}
                  style={{
                    border: '1px solid #e5e9e9',
                    borderRadius: '4px',
                    padding: '20px',
                    background: '#fbfcfc',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  className="cat-card-hover"
                >
                  <Car size={24} color="#00665e" style={{ marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111615', marginBottom: '6px' }}>{style.title}</h4>
                  <p style={{ fontSize: '12px', color: '#606b69', lineHeight: 1.4, marginBottom: '10px' }}>{style.examples}</p>
                  <span style={{ fontSize: '11px', color: '#00665e', fontWeight: 600 }}>{style.count} &bull; Select &rarr;</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🚀 DESKTOP SEARCH POPUP BAR */}
      {/* ========================================================================= */}
      {activeDropdown === 'search' && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#ffffff',
            borderTop: '1px solid #ebeeee',
            borderBottom: '2px solid #00665e',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.14)',
            padding: '24px 0 28px',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <div className="container-am" style={{ maxWidth: '800px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#f5f7f7',
                border: '1px solid #00665e',
                borderRadius: '4px',
                padding: '10px 16px',
              }}
            >
              <Search size={20} color="#00665e" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type your car name (e.g. Thar, Fortuner, Creta, Safari, G-Wagon, BMW M4)..."
                autoFocus
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '15px',
                  fontFamily: 'var(--font-main)',
                  color: '#111615',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#889392' }}
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Quick Live Search Results */}
            {searchResults.length > 0 && (
              <div
                style={{
                  marginTop: '12px',
                  background: '#ffffff',
                  border: '1px solid #e1e6e6',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                }}
              >
                {searchResults.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => handleCarSelect(res.brand, res.model, res.year, res.variant)}
                    style={{
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: i < searchResults.length - 1 ? '1px solid #f0f2f2' : 'none',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    className="search-item-hover"
                  >
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#111615' }}>
                        {res.brand} {res.model}
                      </span>
                      <span style={{ fontSize: '11px', color: '#7a8584', marginLeft: '8px' }}>
                        ({res.year}) &bull; {res.variant}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#00665e', background: '#e6f4f2', padding: '3px 8px', borderRadius: '2px' }}>
                      Configure Cover &rarr;
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Popular quick tags when no query */}
            {!searchQuery && (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', color: '#808b8a', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Popular Indian Searches:
                </span>
                {['Mahindra Thar Roxx', 'Fortuner Legender', 'Tata Safari', 'Hyundai Creta', 'Defender 110', 'Mercedes G63'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSearchQuery(item)}
                    style={{
                      background: '#f0f3f3',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '4px 10px',
                      fontSize: '11px',
                      color: '#34403e',
                      cursor: 'pointer',
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📱 MOBILE NAVIGATION DRAWER (WITH E-COMMERCE CAR & COVER CATEGORIES) */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--header-height, 66px)',
            left: 0,
            width: '100%',
            height: 'calc(100dvh - var(--header-height, 66px))',
            background: '#ffffff',
            zIndex: 9999,
            padding: '20px 20px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
            borderTop: '1px solid #e5e8e8',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Mobile Car Search Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#f2f5f5',
                border: '1px solid #dce2e2',
                borderRadius: '4px',
                padding: '8px 12px',
              }}
            >
              <Search size={16} color="#00665e" />
              <input
                type="text"
                placeholder="Search car (Thar, Fortuner, Safari)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '13px',
                  width: '100%',
                }}
              />
            </div>

            {/* If user typed in mobile search */}
            {searchResults.length > 0 && (
              <div style={{ background: '#ffffff', border: '1px solid #e5e8e8', borderRadius: '4px', padding: '8px' }}>
                {searchResults.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => handleCarSelect(res.brand, res.model, res.year, res.variant)}
                    style={{
                      padding: '8px 4px',
                      borderBottom: i < searchResults.length - 1 ? '1px solid #f0f2f2' : 'none',
                      fontSize: '13px',
                      color: '#111615',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{res.brand} {res.model}</span>
                    <span style={{ color: '#00665e', fontWeight: 600 }}>&rarr;</span>
                  </div>
                ))}
              </div>
            )}

            {/* Accordion 1: Car Brands */}
            <div style={{ borderBottom: '1px solid #f0f2f2', paddingBottom: '12px' }}>
              <button
                onClick={() => setMobileBrandAccordion(!mobileBrandAccordion)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#111615',
                  cursor: 'pointer',
                }}
              >
                <span>Shop By Car Brand</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: mobileBrandAccordion ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>

              {mobileBrandAccordion && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', paddingTop: '10px' }}>
                  {CAR_BRANDS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handleCarSelect(b.name, b.models[0].name, b.models[0].years[0], b.models[0].variants[0])}
                      style={{
                        background: '#f7f9f9',
                        border: '1px solid #e2e8e8',
                        padding: '8px',
                        borderRadius: '4px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#111615',
                        cursor: 'pointer',
                      }}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 2: Cover Protection Types */}
            <div style={{ borderBottom: '1px solid #f0f2f2', paddingBottom: '12px' }}>
              <button
                onClick={() => setMobileCategoryAccordion(!mobileCategoryAccordion)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#111615',
                  cursor: 'pointer',
                }}
              >
                <span>Shop By Protection Type</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: mobileCategoryAccordion ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>

              {mobileCategoryAccordion && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px' }}>
                  {COVER_CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      style={{
                        background: '#f7f9f9',
                        border: '1px solid #e2e8e8',
                        padding: '10px 12px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#111615' }}>{cat.title}</div>
                        <div style={{ fontSize: '11px', color: '#687573' }}>From {cat.startingPrice}</div>
                      </div>
                      <span style={{ fontSize: '11px', color: '#00665e', fontWeight: 600 }}>Select &rarr;</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Standard Links */}
            <a
              href="#configurator"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#111615',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '6px 0',
              }}
            >
              Online 3D Configurator
            </a>
            <a
              href="#q-atelier"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#111615',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '6px 0',
              }}
            >
              Signature Atelier
            </a>
          </div>

          {/* Bottom Mobile Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '20px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfigurator();
              }}
              className="cta_button cta_button--primary-light"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Start Custom Configuration
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="cta_button cta_button--secondary-light"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Request Free Fabric Swatches
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .brand-card-hover:hover {
          border-color: #00665e !important;
          box-shadow: 0 4px 14px rgba(0, 102, 94, 0.08);
        }
        .model-pill-hover:hover {
          background-color: #eef6f5 !important;
          color: #00665e !important;
        }
        .cat-card-hover:hover {
          border-color: #00665e !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        }
        .search-item-hover:hover {
          background-color: #f7faf9 !important;
        }
      `}</style>
    </header>
  );
}
