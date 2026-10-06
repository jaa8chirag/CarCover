'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AstonMartinLogo from './AstonMartinLogo';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  X,
  Search,
  Command,
  ArrowRight,
} from 'lucide-react';
import { CAR_BRANDS } from '@/data/carData';

interface HeaderProps {
  onOpenConfigurator?: () => void;
  onOpenEnquiry?: () => void;
  onOpenCart: () => void;
  cartCount: number;
  onSelectVehicle?: (brand: string, model: string, year: string, variant: string) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export default function Header({
  onOpenConfigurator,
  onOpenEnquiry,
  onOpenCart,
  cartCount,
  onSelectVehicle,
  onSelectCategory,
}: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredNavRight, setHoveredNavRight] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Scroll listener for subtle glass opacity enhancement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl/Cmd + K to toggle search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search filter
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

  interface NavLinkItem {
    label: string;
    href: string;
    id: string;
    badge?: string;
  }

  const navLinks: NavLinkItem[] = [
    { label: 'Collections', href: '/collections', id: 'collections' },
    { label: 'Technology', href: '/technology', id: 'technology' },
    { label: 'About Us', href: '/about', id: 'about' },
    { label: 'Contact Us', href: '/contact', id: 'contact' },
  ];

  const leftLinks = navLinks.filter((l) => l.id === 'collections' || l.id === 'technology');
  const rightLinks = navLinks.filter((l) => l.id === 'about' || l.id === 'contact');

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-auto"
        style={{
          background: '#000000',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: scrolled ? '0 12px 40px -12px rgba(0, 0, 0, 0.6)' : 'none',
        }}      >
        {/* Subtle Specular Top Luxury Hairline */}
        <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#cca462]/60 to-transparent pointer-events-none" />

        {/* Spacious, Breathable Header Container (Height 76px - 82px) */}
        <div className="container-am h-[76px] sm:h-[82px] flex items-center justify-between gap-6 px-6 sm:px-12">
          {/* ========================================================================= */}
          {/* LEFT: Spacious, Airy, Animated Nav Links */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-6 lg:gap-10 flex-1 min-w-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className="w-full h-[2px] bg-white rounded-full" />
                  <span className="w-3/4 h-[2px] bg-white rounded-full" />
                  <span className="w-full h-[2px] bg-white rounded-full" />
                </div>
              )}
            </button>

            {/* Desktop Navigation Links with Generous Spacing & Smooth Interactive Pill */}
            <nav
              onMouseLeave={() => setHoveredNav(null)}
              className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold tracking-wide text-white relative"
            >
              {leftLinks.map((link) => {
                const isHovered = hoveredNav === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={handleNavClick}
                    onMouseEnter={() => setHoveredNav(link.id)}
                    className="relative flex items-center gap-2 py-2.5 px-3.5 transition-colors cursor-pointer text-white hover:text-white no-underline"
                  >
                    {/* Smooth Animated Background Pill */}
                    {isHovered && (
                      <motion.div
                        layoutId="navHoverPill"
                        className="absolute inset-0 bg-white/15 rounded-full border border-white/25 pointer-events-none"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {link.badge && (
                      <span className="relative z-10 text-[9px] px-2 py-0.5 rounded-full font-bold tracking-widest bg-emerald-500/20 text-[#00665e] border border-emerald-500/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ========================================================================= */}
          {/* CENTER: Aston Martin Crest Logo */}
          {/* ========================================================================= */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link
              href="/"
              className="group block transition-all no-underline"
              aria-label="TheSignaturecovers Home"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="py-1"
              >
                <AstonMartinLogo width={195} height={34} color="#ffffff" />
              </motion.div>
            </Link>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: Search Pill, Free Swatches & Cart Bag */}
          {/* ========================================================================= */}
          <div className="flex items-center justify-end gap-3.5 flex-1 min-w-0">
            <nav
              onMouseLeave={() => setHoveredNavRight(null)}
              className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold tracking-wide text-white relative"
            >
              {rightLinks.map((link) => {
                const isHovered = hoveredNavRight === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={handleNavClick}
                    onMouseEnter={() => setHoveredNavRight(link.id)}
                    className="relative flex items-center gap-2 py-2.5 px-3.5 transition-colors cursor-pointer text-white hover:text-white no-underline"
                  >
                    {/* Smooth Animated Background Pill */}
                    {isHovered && (
                      <motion.div
                        layoutId="navHoverPillRight"
                        className="absolute inset-0 bg-white/15 rounded-full border border-white/25 pointer-events-none"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {link.badge && (
                      <span className="relative z-10 text-[9px] px-2 py-0.5 rounded-full font-bold tracking-widest bg-emerald-500/20 text-[#00665e] border border-emerald-500/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Saved Commissions Cart Bag */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 flex items-center justify-center text-white transition-all cursor-pointer flex-shrink-0"
              aria-label="Saved Commissions"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#00665e] text-white text-[10px] font-bold flex items-center justify-center border-2 border-black">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 📱 MOBILE NAVIGATION DRAWER */}
        {/* ========================================================================= */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed top-[76px] left-0 w-full h-[calc(100dvh-76px)] z-50 p-6 flex flex-col justify-between overflow-y-auto border-t border-white/15"
            style={{
              background: '#000000',
            }}
          >
            <div className="flex flex-col gap-4">
              <nav className="flex flex-col gap-2 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3.5 rounded-xl border border-white/20 bg-white/5 flex items-center justify-between text-sm font-bold text-white no-underline hover:border-white/60"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={16} className="text-[#00665e]" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/15">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/10 border border-white/30 cursor-pointer"
              >
                Request Free Fabric Swatches & Enquiry
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 🔍 CLEAN QUICK SEARCH MODAL (Command Palette) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {searchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-xl rounded-3xl border border-white/80 p-6 shadow-2xl z-10"
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(40px) saturate(190%)',
                WebkitBackdropFilter: 'blur(40px) saturate(190%)',
              }}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                <span className="text-xs font-mono font-bold tracking-[2px] uppercase text-[#00665e]">
                  SEARCH BESPOKE CAD DATABASE
                </span>
                <button
                  onClick={() => setSearchModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative flex items-center rounded-2xl border border-slate-200/90 focus-within:border-[#00665e] focus-within:ring-4 focus-within:ring-emerald-500/10 px-4 py-3 bg-white shadow-xs mt-4">
                <Search size={18} className="text-[#00665e] mr-3 flex-shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search car (Thar Roxx, Fortuner, Creta, Safari, Defender)..."
                  className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Results */}
              {searchResults.length > 0 && (
                <div className="mt-3.5 rounded-2xl border border-slate-200 bg-white overflow-hidden divide-y divide-slate-100 max-h-60 overflow-y-auto">
                  {searchResults.map((res, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSearchModalOpen(false);
                        if (onSelectVehicle) {
                          onSelectVehicle(res.brand, res.model, res.year, res.variant);
                        }
                        const el = document.getElementById('configurator');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full p-3.5 flex items-center justify-between hover:bg-emerald-50/70 transition-colors text-left cursor-pointer"
                    >
                      <div>
                        <span className="text-sm font-bold text-slate-900">
                          {res.brand} {res.model}
                        </span>
                        <span className="text-xs text-slate-500 ml-2 font-medium">
                          ({res.year}) &bull; {res.variant}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#00665e]">
                        Configure &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Popular quick tags */}
              {!searchQuery && (
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
                    Popular:
                  </span>
                  {['Mahindra Thar Roxx', 'Fortuner Legender', 'Tata Safari', 'Hyundai Creta', 'Defender 110'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setSearchQuery(item)}
                      className="text-xs font-semibold text-slate-700 bg-white hover:text-[#00665e] px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
