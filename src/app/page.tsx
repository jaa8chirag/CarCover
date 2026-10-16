'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HypeCurtainScrollShowcase from '@/components/HypeCurtainScrollShowcase';
import SwatchRequestModal from '@/components/SwatchRequestModal';
import CheckoutDrawer from '@/components/CheckoutDrawer';
import BrandMarquee from '@/components/BrandMarquee';
import ShopByCover from '@/components/ShopByCover';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/useCart';

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState({
    brand: 'Mahindra',
    model: 'Thar Roxx (5-Door)',
    year: '2024 - 2026',
    variant: 'AX7L Luxury 4x4 (With Spare Wheel)',
  });

  const cart = useCart();
  const cartItems = cart.items;

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
    cart.add(newItem);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (index: number) => {
    cart.remove(index);
  };

  const handleSelectTierFromCollection = (tierId: string) => {
    const el = document.getElementById('configurator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      {/* TheSignaturecovers Global Light Header */}
      <Header
        onOpenConfigurator={handleOpenConfigurator}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onSelectVehicle={(brand, model, year, variant) => {
          setSelectedVehicle({ brand, model, year, variant });
          const el = document.getElementById('configurator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectCategory={(categoryId) => {
          handleSelectTierFromCollection(categoryId);
        }}
      />

      {/* 🌟 HYPE.LUXURY STACKED CURTAIN SCROLL SHOWCASE */}
      <HypeCurtainScrollShowcase
        onOpenConfigurator={handleOpenConfigurator}
        onOpenEnquiry={handleOpenEnquiry}
        onSelectTier={(tierId) => {
          handleSelectTierFromCollection(tierId);
        }}
      />

      <BrandMarquee />

      <ShopByCover />

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
        onOrderPlaced={cart.clear}
        currencySymbol="₹"
      />
    </main>
  );
}
