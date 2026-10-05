'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutDrawer from '@/components/CheckoutDrawer';
import SwatchRequestModal from '@/components/SwatchRequestModal';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSwatchOpen, setIsSwatchOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onOpenEnquiry={() => setIsSwatchOpen(true)}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
      {/* Main Page Container with generous top clearance */}
      <main className="pt-36 sm:pt-44 pb-24">
        {/* Page Hero */}
        <section className="px-6 sm:px-12 mb-16">
          <div className="container-am max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest text-[#00665e] bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <MessageSquare size={14} /> CLIENT CONCIERGE & ATELIER ADVISORY
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight mb-4 leading-tight">
              Contact Our Atelier
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-4 font-medium leading-relaxed">
              Have questions regarding a custom pattern, modified vehicle clearances, fabric suitability, or fleet commissions? Our specialists are at your disposal.
            </p>
          </div>
        </section>

        {/* Contact Form & Information Split */}
        <section className="py-20 px-6 sm:px-12">
          <div className="container-am max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              {/* Left Column: Contact Cards */}
              <div className="md:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-950 mb-6">Concierge Contacts</h2>

                  <div className="space-y-6 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#00665e] flex items-center justify-center flex-shrink-0">
                        <Phone size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">Concierge Direct</span>
                        <a href="tel:+919876543210" className="font-bold text-slate-900 hover:text-[#00665e] transition-colors no-underline">
                          +91 (0) 98765 43210
                        </a>
                        <span className="text-[11px] text-slate-500 block mt-0.5">Mon – Sat, 9:00 AM – 8:00 PM IST</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#00665e] flex items-center justify-center flex-shrink-0">
                        <Mail size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">Bespoke Inquiries</span>
                        <a href="mailto:concierge@thesignaturecovers.com" className="font-bold text-slate-900 hover:text-[#00665e] transition-colors no-underline">
                          concierge@thesignaturecovers.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#00665e] flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">Atelier & Studio</span>
                        <p className="font-medium text-slate-800 leading-relaxed">
                          TheSignaturecovers Atelier<br />
                          Industrial Area Phase 2, New Delhi, India 110020
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80">
                  <div className="flex items-center gap-2 mb-2 text-[#00665e]">
                    <Clock size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Fast Turnaround</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    All digital inquiries receive a personal response from a bespoke tailor within 4 business hours.
                  </p>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="md:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-950 mb-2">Send an Advisory Request</h2>
                <p className="text-xs text-slate-500 mb-6">
                  Fill in your vehicle details below and we will prepare tailored recommendations.
                </p>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00665e] flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Inquiry Received</h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Thank you for contacting TheSignaturecovers. A senior bespoke advisor will reach out to you shortly via WhatsApp and email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikram Singhania"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00665e]/30 focus:border-[#00665e]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number (WhatsApp) *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00665e]/30 focus:border-[#00665e]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vikram@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00665e]/30 focus:border-[#00665e]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Vehicle Make & Model</label>
                        <input
                          type="text"
                          value={formData.vehicle}
                          onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                          placeholder="e.g. Thar Roxx, Porsche 911, Fortuner"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00665e]/30 focus:border-[#00665e]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Message or Custom Requirements</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Specify any custom modifications, roof rack, spare wheel, or specific parking environment..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00665e]/30 focus:border-[#00665e] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#00665e] hover:bg-[#004e48] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Send size={14} /> Send Advisory Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
        </main>
      </motion.div>

      <Footer />

      <CheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={(idx) => setCartItems(cartItems.filter((_, i) => i !== idx))}
        currencySymbol="₹"
      />

      <SwatchRequestModal
        isOpen={isSwatchOpen}
        onClose={() => setIsSwatchOpen(false)}
      />
    </div>
  );
}
