'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutDrawer from '@/components/CheckoutDrawer';
import SwatchRequestModal from '@/components/SwatchRequestModal';
import { useCart } from '@/lib/useCart';

export interface PageShellApi {
  openEnquiry: () => void;
  addToCart: (item: any, openDrawer?: boolean) => void;
  openCart: () => void;
}

/** Shared chrome for inner pages: header, footer, cart drawer and swatch modal. */
export default function PageShell({ children }: { children: (api: PageShellApi) => React.ReactNode }) {
  const cart = useCart();
  const cartItems = cart.items;
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
          addToCart: (item, openDrawer = false) => {
            cart.add(item);
            if (openDrawer) setIsCartOpen(true);
          },
          openCart: () => setIsCartOpen(true),
        })}
      </main>

      <Footer />

      <CheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={cart.remove}
        onOrderPlaced={cart.clear}
        currencySymbol="₹"
      />
      <SwatchRequestModal isOpen={isSwatchOpen} onClose={() => setIsSwatchOpen(false)} />
    </div>
  );
}
