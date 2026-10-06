'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  X,
  Search,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
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
        setMobileMenuOpen(false);
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

  const closeMenu = () => setMobileMenuOpen(false);

  // Lock page scroll while the sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close the sidebar after navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const SIDEBAR_EASE = [0.16, 1, 0.3, 1] as const;

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-auto"
        style={{
          background: '#000000',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: scrolled ? '0 12px 40px -12px rgba(0, 0, 0, 0.6)' : 'none',
        }}
      >
        <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#cca462]/60 to-transparent pointer-events-none" />

        <div className="container-am relative h-[86px] sm:h-[104px] flex items-center justify-between gap-4 px-5 sm:px-12">
          {/* LEFT: sidebar menu button */}
          <div className="flex items-center flex-1 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="group flex items-center gap-3.5 -ml-2 px-2.5 py-2.5 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="w-6 h-[18px] flex flex-col justify-between">
                <span className="w-full h-[2px] bg-white rounded-full transition-all group-hover:bg-[#cca462]" />
                <span className="w-2/3 h-[2px] bg-white rounded-full transition-all group-hover:w-full group-hover:bg-[#cca462]" />
                <span className="w-full h-[2px] bg-white rounded-full transition-all group-hover:bg-[#cca462]" />
              </span>
              <span className="hidden sm:block text-[13px] font-semibold uppercase tracking-[0.3em]">Menu</span>
            </button>
          </div>

          {/* CENTER: logo over name */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <Link href="/" className="group block transition-all no-underline" aria-label="Signature Covers Home">
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }} className="py-1">
                <span className="flex flex-col items-center gap-1 sm:gap-1.5 text-white" style={{ fontFamily: 'var(--font-main)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-white.png" alt="" aria-hidden className="h-9 sm:h-[50px] w-auto" />
                  <span className="font-bold uppercase tracking-[0.3em] sm:tracking-[0.42em] text-[10px] sm:text-[15px] whitespace-nowrap pl-[0.3em] sm:pl-[0.42em]">Signature Covers</span>
                </span>
              </motion.div>
            </Link>
          </div>

          {/* RIGHT: cart */}
          <div className="flex items-center justify-end gap-3.5 flex-1 min-w-0">
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
      </header>

      {/* SIDEBAR */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[70]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={closeMenu}
              className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.7, ease: SIDEBAR_EASE }}
              className="absolute left-0 top-0 h-full w-full sm:w-[56vw] lg:w-[42vw] lg:min-w-[520px] bg-black/75 backdrop-blur-2xl text-white flex flex-col overflow-hidden border-r border-white/10"
            >
              <div className="pointer-events-none absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-[#cca462]/10 blur-[110px]" />

              {/* close */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: SIDEBAR_EASE }}
                className="relative px-7 sm:px-14 pt-8 sm:pt-12"
              >
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="group flex items-center gap-4 text-white hover:text-[#cca462] transition-colors cursor-pointer"
                >
                  <X size={20} className="transition-transform duration-500 group-hover:rotate-90" />
                  <span className="text-[13px] font-semibold uppercase tracking-[0.22em]">Close</span>
                </button>
              </motion.div>

              {/* links, right aligned, arriving one by one from the left */}
              <nav className="relative flex-1 flex flex-col justify-center px-7 sm:pl-14 sm:pr-[22%] py-10">
                <ul className="flex flex-col items-end gap-1">
                  {navLinks.map((link, i) => {
                    const active = pathname === link.href;
                    return (
                      <motion.li
                        key={link.id}
                        initial={{ opacity: 0, x: -90 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease: SIDEBAR_EASE }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className={`group relative block py-[clamp(8px,2.2vh,16px)] no-underline whitespace-nowrap text-[17px] sm:text-[19px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 hover:text-white ${active ? 'text-[#cca462]' : 'text-white/55'}`}
                        >
                          {link.label}
                          <span className="absolute bottom-2 right-0 h-px w-0 bg-[#cca462] group-hover:w-full transition-all duration-500" />
                        </Link>
                      </motion.li>
                    );
                  })}
                  <motion.li
                    initial={{ opacity: 0, x: -90 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 + navLinks.length * 0.12, ease: SIDEBAR_EASE }}
                  >
                    <Link
                      href="/shop"
                      onClick={closeMenu}
                      className="group relative block py-[clamp(8px,2.2vh,16px)] no-underline whitespace-nowrap text-[17px] sm:text-[19px] font-semibold uppercase tracking-[0.2em] text-[#cca462] hover:text-white transition-colors duration-500"
                    >
                      Shop Car Covers
                    </Link>
                  </motion.li>
                </ul>
              </nav>

              {/* contact */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: SIDEBAR_EASE }}
                className="relative px-7 sm:pl-14 sm:pr-[22%] pb-9 text-[12px] text-white/50 flex flex-col items-end gap-2.5 text-right"
              >
                <a href="mailto:contact@thesignaturecovers.com" className="flex items-center gap-3 no-underline text-inherit hover:text-white transition-colors">
                  contact@thesignaturecovers.com <Mail size={14} className="text-[#cca462]" />
                </a>
                <a href="tel:+9118008892683" className="flex items-center gap-3 no-underline text-inherit hover:text-white transition-colors">
                  +91 1800 889 2683 <Phone size={14} className="text-[#cca462]" />
                </a>
                <div className="flex items-center gap-3">
                  BKC, Mumbai · DLF Horizon, Gurugram <MapPin size={14} className="text-[#cca462]" />
                </div>
                <a
                  href="https://www.instagram.com/thesignaturecovers/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 pt-1 text-[#cca462] no-underline font-semibold uppercase tracking-[0.22em] hover:text-white transition-colors"
                >
                  Instagram <ArrowRight size={13} />
                </a>
              </motion.div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

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
