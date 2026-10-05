'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';

const INFO = [
  { icon: Phone, label: 'Concierge Direct', value: '+91 (0) 98765 43210', href: 'tel:+919876543210', note: 'Mon – Sat, 9:00 AM – 8:00 PM IST' },
  { icon: Mail, label: 'Bespoke Inquiries', value: 'concierge@thesignaturecovers.com', href: 'mailto:concierge@thesignaturecovers.com' },
  { icon: MapPin, label: 'Atelier & Studio', value: 'Industrial Area Phase 2, New Delhi, India 110020' },
];

const FIELD =
  'w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#00665e]/10 focus:border-[#00665e]';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', vehicle: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [k]: e.target.value });

  return (
    <PageShell>
      {() => (
        <>
          <PageHero
            kicker="CLIENT CONCIERGE & ATELIER ADVISORY"
            title="Contact"
            accent="Our Atelier"
            lead="Questions about a custom pattern, modified vehicle clearances, fabric suitability or fleet commissions? Our specialists are at your disposal."
            image="/images/cover_install_2.jpg"
          />

          <section className="relative bg-[#f8fafc] pb-24 sm:pb-32">
            <div className="container-am max-w-6xl -mt-10 sm:-mt-14 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <motion.aside
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 space-y-6"
                >
                  <div className="rounded-3xl p-8 sm:p-9 text-white bg-gradient-to-br from-[#0b1514] via-[#0a2b28] to-[#00665e] shadow-2xl shadow-[#00665e]/20">
                    <span className="am-kicker">CONCIERGE CONTACTS</span>
                    <div className="space-y-7 mt-6">
                      {INFO.map(({ icon: Icon, label, value, href, note }) => (
                        <div key={label} className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 text-[#cca462] flex items-center justify-center flex-shrink-0">
                            <Icon size={19} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] tracking-[2px] uppercase text-white/50 block mb-1">{label}</span>
                            {href ? (
                              <a href={href} className="font-semibold text-white hover:text-[#cca462] transition-colors no-underline break-words">
                                {value}
                              </a>
                            ) : (
                              <p className="font-medium text-white/90 leading-relaxed">{value}</p>
                            )}
                            {note && <span className="text-xs text-white/55 block mt-1">{note}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#00665e]/10 text-[#00665e] flex items-center justify-center flex-shrink-0">
                      <Clock size={19} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">4-hour response</span>
                      <p className="text-sm text-slate-600 leading-relaxed mt-1">
                        Every digital inquiry gets a personal reply from a bespoke tailor within 4 business hours.
                      </p>
                    </div>
                  </div>
                </motion.aside>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-11 border border-slate-200/80 shadow-xl"
                >
                  <h2 className="text-slate-950 uppercase" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(20px, 2.4vw, 28px)' }}>
                    Send an Advisory Request
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 mb-8">
                    Share your vehicle details and we will prepare tailored recommendations.
                  </p>

                  {submitted ? (
                    <div className="py-14 text-center">
                      <div className="w-20 h-20 rounded-full bg-[#00665e]/10 text-[#00665e] flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 size={38} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Inquiry Received</h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto mt-3 leading-relaxed">
                        Thank you for contacting TheSignaturecovers. A senior bespoke advisor will reach out shortly via WhatsApp and email.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <label className="block">
                          <span className="text-xs font-semibold text-slate-700 block mb-1.5">Full Name *</span>
                          <input type="text" required value={formData.name} onChange={set('name')} placeholder="e.g. Vikram Singhania" className={FIELD} />
                        </label>
                        <label className="block">
                          <span className="text-xs font-semibold text-slate-700 block mb-1.5">Phone (WhatsApp) *</span>
                          <input type="tel" required value={formData.phone} onChange={set('phone')} placeholder="+91 98765 43210" className={FIELD} />
                        </label>
                        <label className="block">
                          <span className="text-xs font-semibold text-slate-700 block mb-1.5">Email *</span>
                          <input type="email" required value={formData.email} onChange={set('email')} placeholder="vikram@example.com" className={FIELD} />
                        </label>
                        <label className="block">
                          <span className="text-xs font-semibold text-slate-700 block mb-1.5">Vehicle Make &amp; Model</span>
                          <input type="text" value={formData.vehicle} onChange={set('vehicle')} placeholder="e.g. Thar Roxx, Porsche 911" className={FIELD} />
                        </label>
                      </div>
                      <label className="block">
                        <span className="text-xs font-semibold text-slate-700 block mb-1.5">Message or Custom Requirements</span>
                        <textarea
                          rows={5}
                          value={formData.message}
                          onChange={set('message')}
                          placeholder="Roof rack, spare wheel, parking environment, or any custom modifications..."
                          className={FIELD + ' resize-none'}
                        />
                      </label>
                      <button
                        type="submit"
                        className="w-full py-4 rounded-full bg-[#00665e] hover:bg-[#00796b] text-white text-xs font-bold uppercase tracking-[1.5px] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00665e]/25 hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Send size={14} /> Send Advisory Request
                      </button>
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
