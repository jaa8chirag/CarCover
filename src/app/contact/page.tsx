'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const WHATSAPP_NUMBER = '918585996669';
const WHATSAPP_DISPLAY = '+91 85859 96669';

const COVER_TYPES = ['Outdoor cover', 'Indoor cover', 'Unveiling cover', 'Custom cover', 'Not sure yet'];

const ease = [0.16, 1, 0.3, 1] as const;

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.8 9.8 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.45z" />
    </svg>
  );
}

const FIELD =
  'w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-sm text-black placeholder:text-slate-400 focus:outline-none focus:border-black';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', vehicle: '', type: COVER_TYPES[0], message: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const waLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      'Hello Signature Covers,',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.vehicle && `Car: ${form.vehicle}`,
      `Interested in: ${form.type}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean) as string[];
    window.open(waLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  return (
    <PageShell>
      {() => (
        <div className="bg-[#f3f1ed]">
          {/* HERO */}
          <section className="relative overflow-hidden bg-black text-white">
            <img src="/images/bentley_street.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-45" style={{ objectPosition: 'center 58%' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
            <div className="container-am max-w-5xl relative pt-36 sm:pt-48 pb-28 sm:pb-36 text-center">
              <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="block text-[11px] sm:text-xs tracking-[6px] uppercase text-[#cca462] mb-5">
                Get in touch
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease }} style={{ fontFamily: 'var(--font-hype)', fontWeight: 400, fontSize: 'clamp(36px, 6vw, 76px)', lineHeight: 1.05 }}>
                Contact Us
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease }} className="mt-6 mx-auto max-w-xl text-white/75 text-base sm:text-lg font-light leading-relaxed">
                Questions about a cover, your car or a custom order? Message us on WhatsApp and a real person replies, usually within minutes.
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
                href={waLink('Hello Signature Covers, I would like to know more about your car covers.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-black text-xs font-bold uppercase tracking-[2px] no-underline transition-colors shadow-[0_20px_50px_-15px_rgba(37,211,102,0.6)]"
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </motion.a>
            </div>
          </section>

          {/* CONTENT */}
          <section className="relative pb-24 sm:pb-32">
            <div className="container-am max-w-6xl -mt-14 sm:-mt-16 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* CONTACT CARDS */}
                <motion.aside
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease }}
                  className="lg:col-span-5 space-y-5"
                >
                  <a
                    href={waLink('Hello Signature Covers, I would like to know more about your car covers.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 rounded-[2rem] bg-black text-white p-7 no-underline shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-transform duration-500"
                  >
                    <span className="w-14 h-14 rounded-2xl bg-[#25D366] text-black flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-500">
                      <WhatsAppIcon size={28} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] tracking-[3px] uppercase text-[#cca462] mb-1">WhatsApp, fastest reply</span>
                      <span className="block text-xl font-semibold" style={{ fontFamily: 'var(--font-hype)' }}>{WHATSAPP_DISPLAY}</span>
                    </span>
                    <ArrowUpRight className="text-white/50 group-hover:text-[#cca462] transition-colors flex-shrink-0" size={22} />
                  </a>

                  <div className="rounded-[2rem] bg-white border border-slate-200 p-7 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.2)] space-y-6">
                    {[
                      { icon: Phone, label: 'Call us', value: WHATSAPP_DISPLAY, href: `tel:+${WHATSAPP_NUMBER}`, note: 'Mon – Sat, 9:00 AM – 8:00 PM IST' },
                      { icon: Mail, label: 'Email', value: 'contact@thesignaturecovers.com', href: 'mailto:contact@thesignaturecovers.com' },
                      { icon: MapPin, label: 'Studios', value: 'BKC, Mumbai · DLF Horizon, Gurugram' },
                    ].map(({ icon: Icon, label, value, href, note }) => (
                      <div key={label} className="flex items-start gap-4">
                        <span className="w-11 h-11 rounded-xl bg-black text-[#cca462] flex items-center justify-center flex-shrink-0">
                          <Icon size={19} />
                        </span>
                        <div className="min-w-0">
                          <span className="text-[10px] tracking-[3px] uppercase text-slate-400 block mb-1">{label}</span>
                          {href ? (
                            <a href={href} className="font-semibold text-black hover:text-[#b38848] transition-colors no-underline break-words">{value}</a>
                          ) : (
                            <p className="font-semibold text-black leading-relaxed">{value}</p>
                          )}
                          {note && <span className="text-xs text-slate-500 block mt-1">{note}</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[2rem] bg-[#ece3d2] p-6 flex items-start gap-4">
                    <span className="w-11 h-11 rounded-xl bg-black text-[#cca462] flex items-center justify-center flex-shrink-0">
                      <Clock size={19} />
                    </span>
                    <div>
                      <span className="text-sm font-bold text-black block">Quick replies</span>
                      <p className="text-sm text-slate-700 leading-relaxed mt-1">
                        We answer every WhatsApp message personally, and enquiries sent by email within 4 business hours.
                      </p>
                    </div>
                  </div>
                </motion.aside>

                {/* FORM */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease }}
                  className="lg:col-span-7 bg-white rounded-[2rem] p-7 sm:p-11 border border-slate-200 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.35)]"
                >
                  <h2 className="text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 400, fontSize: 'clamp(24px, 2.8vw, 36px)', lineHeight: 1.1 }}>
                    Send us a message
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 mb-8">Fill this in and it opens WhatsApp with your message ready to send.</p>

                  <form onSubmit={send} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <label className="block">
                        <span className="text-xs font-semibold text-slate-700 block mb-1.5">Full name *</span>
                        <input type="text" required value={form.name} onChange={set('name')} placeholder="Your name" className={FIELD} />
                      </label>
                      <label className="block">
                        <span className="text-xs font-semibold text-slate-700 block mb-1.5">Phone *</span>
                        <input type="tel" required value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" className={FIELD} />
                      </label>
                      <label className="block">
                        <span className="text-xs font-semibold text-slate-700 block mb-1.5">Your car</span>
                        <input type="text" value={form.vehicle} onChange={set('vehicle')} placeholder="e.g. Porsche 911, Thar Roxx" className={FIELD} />
                      </label>
                      <label className="block">
                        <span className="text-xs font-semibold text-slate-700 block mb-1.5">Interested in</span>
                        <select value={form.type} onChange={set('type')} className={FIELD}>
                          {COVER_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700 block mb-1.5">Message</span>
                      <textarea rows={5} value={form.message} onChange={set('message')} placeholder="Tell us what you need..." className={FIELD + ' resize-none'} />
                    </label>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-black text-xs font-bold uppercase tracking-[2px] transition-colors flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <WhatsAppIcon size={18} /> Send on WhatsApp
                    </button>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      )}
    </PageShell>
  );
}
