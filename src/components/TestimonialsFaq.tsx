'use client';

import React, { useState } from 'react';
import { TESTIMONIALS, FAQS } from '@/data/carData';
import { ChevronDown, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section
      style={{
        padding: '120px 0 100px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e8e8',
        position: 'relative',
      }}
    >
      <div className="container-am">
        {/* Testimonials Section */}
        <div style={{ marginBottom: '96px' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
            <span className="am-kicker">COLLECTOR ENDORSEMENTS</span>
            <h2 className="am-title-section" style={{ color: '#111615' }}>
              Trusted by the World's Finest Garages
            </h2>
            <p className="am-lead" style={{ marginTop: '12px', color: '#5c6462' }}>
              From private Alpine collections to factory racing teams and historic concours lawns.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="am-card"
                style={{
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e6e6',
                  borderRadius: '2px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div>
                  <Quote size={28} color="#00665e" style={{ opacity: 0.8, marginBottom: '16px' }} />
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#111615',
                      lineHeight: 1.7,
                      fontStyle: 'italic',
                      marginBottom: '24px',
                    }}
                  >
                    "{t.quote}"
                  </p>
                </div>

                <div
                  style={{
                    borderTop: '1px solid #eef2f2',
                    paddingTop: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#111615',
                      }}
                    >
                      {t.author}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: '#00665e',
                        fontWeight: 500,
                      }}
                    >
                      <CheckCircle2 size={13} /> Verified Owner
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '13px',
                      color: '#5c6462',
                    }}
                  >
                    {t.car} • {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="am-kicker">KNOWLEDGE & ASSURANCE</span>
            <h2 className="am-title-section" style={{ color: '#111615' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: isOpen ? '1px solid #00665e' : '1px solid #e2e6e6',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    boxShadow: isOpen ? '0 4px 15px rgba(0, 102, 94, 0.06)' : 'none',
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      color: '#111615',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-main)',
                      fontSize: '15px',
                      fontWeight: 600,
                      letterSpacing: '0.4px',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      color="#00665e"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        flexShrink: 0,
                        marginLeft: '16px',
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 24px 20px',
                        color: '#5c6462',
                        fontSize: '14px',
                        lineHeight: 1.7,
                        borderTop: '1px solid #f0f4f4',
                        paddingTop: '16px',
                        fontFamily: 'var(--font-main)',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
