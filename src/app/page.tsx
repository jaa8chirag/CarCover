'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CinematicModelSlider from '@/components/CinematicModelSlider';
import CinematicVideoSection from '@/components/CinematicVideoSection';
import UnveilingSliderSection from '@/components/UnveilingSliderSection';
import KineticShowcaseSection from '@/components/KineticShowcaseSection';
import VehicleSelector from '@/components/VehicleSelector';
import BespokeConfigurator from '@/components/BespokeConfigurator';
import QAtelier from '@/components/QAtelier';
import ProductCollection from '@/components/ProductCollection';
import MaterialScience from '@/components/MaterialScience';
import CraftsmanshipSection from '@/components/CraftsmanshipSection';
import SwatchRequestModal from '@/components/SwatchRequestModal';
import CheckoutDrawer from '@/components/CheckoutDrawer';
import TestimonialsFaq from '@/components/TestimonialsFaq';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState({
    brand: 'Aston Martin',
    model: 'Vanquish',
    year: '2025 - 2026',
    variant: 'Coupe',
  });

  const [cartItems, setCartItems] = useState<any[]>([
    {
      vehicle: 'Aston Martin Vanquish (Coupe)',
      tier: 'Prestige Tailored Indoor',
      fabricColor: 'Silverstone Liquid Silver',
      fabricHex: '#8a939e',
      pipingColor: 'Emerald British Green',
      pipingHex: '#00624a',
      monogram: 'VANQUISH',
      monogramColor: 'silver',
      addons: { mirrorPockets: true, heavyDutyHoldall: true, lockingUnderbodyStraps: false, batteryChargerFlap: true },
      price: 434,
      currency: '£',
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSwatchModalOpen, setIsSwatchModalOpen] = useState(false);

  const handleSelectModelFromRange = (modelName: string) => {
    setSelectedVehicle({
      brand: 'Aston Martin',
      model: modelName,
      year: '2024 - 2026',
      variant: 'Coupe',
    });
  };

  const handleSelectVehicleFromFinder = (brand: string, model: string, year: string, variant: string) => {
    setSelectedVehicle({ brand, model, year, variant });
  };

  const handleOpenConfigurator = () => {
    const el = document.getElementById('configurator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenEnquiry = () => {
    setIsSwatchModalOpen(true);
  };

  const handleAddToCommission = (newItem: any) => {
    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleSelectTierFromCollection = (tierId: string) => {
    const el = document.getElementById('configurator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#111615' }}>
      {/* Aston Martin Global Light Header */}
      <Header
        onOpenConfigurator={handleOpenConfigurator}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
      />

      {/* Cinematic 100vh Hero Banner */}
      <Hero
        onOpenConfigurator={handleOpenConfigurator}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* 🌟 CINEMATIC FULL-WIDTH MODEL SLIDER (Matching User Screenshot 2: DBX707 "POWER. DRIVEN." - Manual Navigation Only) */}
      <CinematicModelSlider
        onSelectModel={handleSelectModelFromRange}
        onOpenConfigurator={handleOpenConfigurator}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* 🎬 DEDICATED CINEMATIC FILM SECTION: The Art of Motion & Preservation (Pure Standalone Automotive Video Theater) */}
      <CinematicVideoSection
        onOpenConfigurator={handleOpenConfigurator}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* 🌟 SECTION VARIATION 2: Interactive Before/After Reveal Curtain Slider */}
      <UnveilingSliderSection
        onOpenConfigurator={handleOpenConfigurator}
      />

      {/* 🌟 SECTION VARIATION 3: 3-Card Kinetic Editorial Trio (Live Monogram Stitcher + 3D Exploded Layers + Silk Shimmer) */}
      <KineticShowcaseSection
        onOpenConfigurator={handleOpenConfigurator}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Specialised Covers CAD Vehicle Finder */}
      <VehicleSelector
        onSelectVehicle={handleSelectVehicleFromFinder}
        onOpenConfigurator={handleOpenConfigurator}
      />

      {/* Aston Martin Online Configurator Studio */}
      <BespokeConfigurator
        selectedVehicle={selectedVehicle}
        onAddToCommission={handleAddToCommission}
        currencySymbol="£"
        currencyRate={1}
      />

      {/* Q by Specialised Covers (Bespoke Atelier) */}
      <QAtelier onOpenEnquiry={handleOpenEnquiry} />

      {/* 4 Performance Collections */}
      <ProductCollection
        onSelectTier={handleSelectTierFromCollection}
        currencySymbol="£"
        currencyRate={1}
      />

      {/* 4-Layer Nanotechnology & Material Science */}
      <MaterialScience />

      {/* Yorkshire Craftsmanship Heritage */}
      <CraftsmanshipSection />

      {/* Collector Endorsements & FAQ */}
      <TestimonialsFaq />

      {/* Aston Martin Official Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <SwatchRequestModal
        isOpen={isSwatchModalOpen}
        onClose={() => setIsSwatchModalOpen(false)}
      />

      <CheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        currencySymbol="£"
      />
    </main>
  );
}
