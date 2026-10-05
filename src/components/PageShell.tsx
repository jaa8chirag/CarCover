'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutDrawer from '@/components/CheckoutDrawer';
import SwatchRequestModal from '@/components/SwatchRequestModal';

export interface PageShellApi {
  openEnquiry: () => void;
  addToCart: (item: any) => void;
}

/** Shared chrome for inner pages: header, footer, cart drawer and swatch modal. */
export default function PageShell({ children }: { children: (api: PageShellApi) => React.ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSwatchOpen, setIsSwatchOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onOpenEnquiry={() => setIsSwatchOpen(true)}
      />

      <main>
        {children({
          openEnquiry: () => setIsSwatchOpen(true),
          addToCart: (item) => {
            setCartItems((prev) => [...prev, item]);
            setIsCartOpen(true);
          },
        })}
      </main>

      <Footer />

      <CheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={(idx) => setCartItems((prev) => prev.filter((_, i) => i !== idx))}
        currencySymbol="₹"
      />
      <SwatchRequestModal isOpen={isSwatchOpen} onClose={() => setIsSwatchOpen(false)} />
    </div>
  );
}
