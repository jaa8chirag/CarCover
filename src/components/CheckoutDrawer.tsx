'use client';

import { gstOn } from '@/data/fabrics';
import React, { useEffect, useState } from 'react';
import { X, Trash2, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemoveItem: (index: number) => void;
  currencySymbol: string;
  /** Called once the order is saved, so the cart can be emptied. */
  onOrderPlaced?: () => void;
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  minWidth: 0,
  background: '#ffffff',
  border: '1px solid #d4dedd',
  padding: '10px 12px',
  color: '#111615',
  fontSize: '13px',
  outline: 'none',
  borderRadius: '2px',
};

export default function CheckoutDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  currencySymbol,
  onOrderPlaced,
}: CheckoutDrawerProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [clientDetails, setClientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    chassisVin: '',
  });

  // When Shiprocket is switched on, it collects the address and takes the payment; otherwise the form below is used.
  const [sr, setSr] = useState<{ enabled: boolean; scriptUrl?: string; cssUrl?: string }>({ enabled: false });
  useEffect(() => {
    if (!isOpen) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/shiprocket/status')
      .then((r) => r.json())
      .then((d) => setSr(d))
      .catch(() => setSr({ enabled: false }));
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + (item.price || 0), 0);
  const gst = gstOn(subtotal);
  const total = subtotal + gst;

  const loadShiprocket = () =>
    new Promise<void>((resolve, reject) => {
      if ((window as any).HeadlessCheckout) return resolve();
      if (sr.cssUrl && !document.querySelector(`link[href="${sr.cssUrl}"]`)) {
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = sr.cssUrl;
        document.head.appendChild(l);
      }
      const t = document.createElement('script');
      t.src = sr.scriptUrl || '';
      t.onload = () => resolve();
      t.onerror = () => reject(new Error('script'));
      document.body.appendChild(t);
    });

  const payWithShiprocket = async (event: Event) => {
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/shiprocket/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.message || 'We could not start the payment page. Please try again.');
        return;
      }
      await loadShiprocket();
      (window as any).HeadlessCheckout.addToCart(event, data.token, { fallbackUrl: `${window.location.origin}/shop`, isInitiatedFromApp: false });
    } catch {
      setError('Could not open the payment page. Check your internet and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmCommission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (sr.enabled) return payWithShiprocket(e.nativeEvent);
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name: clientDetails.name, email: clientDetails.email, phone: clientDetails.phone },
          shipping: {
            address: clientDetails.address,
            city: clientDetails.city,
            state: clientDetails.state,
            pincode: clientDetails.pincode,
            landmark: clientDetails.landmark,
          },
          vin: clientDetails.chassisVin,
          items,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.message || 'Something went wrong. Please try again.');
        return;
      }
      setOrderNumber(data.orderNumber);
      onOrderPlaced?.();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#00665e', '#004d47', '#ffffff', '#dfc287'],
        });
      } catch (err) {}
      setIsSuccess(true);
    } catch {
      setError('Could not reach the server. Check your internet and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(8px)',
        overscrollBehavior: 'contain',
      }}
    >
      <div 
        onClick={onClose} 
        onTouchMove={(e) => e.preventDefault()}
        style={{ position: 'absolute', inset: 0 }} 
      />

      {/* Drawer Panel */}
      <div
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '540px',
          height: '100%',
          maxHeight: '100dvh',
          backgroundColor: '#ffffff',
          borderLeft: '1px solid #dce2e2',
          padding: '40px 32px 80px',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 50px rgba(0,0,0,0.15)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #eef2f2',
            paddingBottom: '20px',
            marginBottom: '32px',
          }}
        >
          <div>
            <span className="am-kicker" style={{ margin: 0 }}>ATELIER ALLOCATION</span>
            <h3
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '22px',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#111615',
              }}
            >
              Your Bespoke Commissions
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#5c6462',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {!isSuccess ? (
          <>
            {items.length === 0 ? (
              <div
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: '#5c6462',
                }}
              >
                <p style={{ fontSize: '15px', marginBottom: '24px', fontFamily: 'var(--font-main)' }}>
                  Your atelier bag is currently unoccupied.
                </p>
                <button
                  onClick={onClose}
                  className="cta_button cta_button--primary-light"
                  style={{ height: '44px', padding: '0 24px', fontSize: '14px' }}
                >
                  Configure A Cover
                </button>
              </div>
            ) : (
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#f8faf9',
                        border: '1px solid #e2e6e6',
                        borderRadius: '2px',
                        padding: '20px',
                        position: 'relative',
                      }}
                    >
                      <button
                        onClick={() => onRemoveItem(idx)}
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          background: 'transparent',
                          border: 'none',
                          color: '#828c8a',
                          cursor: 'pointer',
                        }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div
                        style={{
                          fontSize: '11px',
                          letterSpacing: '1.5px',
                          textTransform: 'uppercase',
                          color: '#00665e',
                          fontFamily: 'var(--font-main)',
                          fontWeight: 600,
                          marginBottom: '4px',
                        }}
                      >
                        {item.tier}
                      </div>

                      <div
                        style={{
                          fontSize: '17px',
                          fontWeight: 600,
                          color: '#111615',
                          fontFamily: 'var(--font-main)',
                          marginBottom: '12px',
                        }}
                      >
                        {item.vehicle}
                        {item.quantity && item.quantity > 1 && (
                          <span
                            style={{
                              marginLeft: '8px',
                              fontSize: '11px',
                              fontWeight: 700,
                              background: '#cca462',
                              color: '#000000',
                              padding: '2px 8px',
                              borderRadius: '999px',
                              verticalAlign: 'middle',
                              display: 'inline-block',
                            }}
                          >
                            Qty: {item.quantity}
                          </span>
                        )}
                      </div>

                      {/* Specs */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '8px',
                          fontSize: '13px',
                          color: '#5c6462',
                          borderTop: '1px solid #eef2f2',
                          paddingTop: '12px',
                          marginBottom: '12px',
                        }}
                      >
                        <div>
                          <span>Fabric: </span>
                          <span style={{ color: '#111615', fontWeight: 600 }}>{item.fabricColor}</span>
                        </div>
                        <div>
                          <span>Piping: </span>
                          <span style={{ color: '#111615', fontWeight: 600 }}>{item.pipingColor}</span>
                        </div>
                        <div>
                          <span>Notes: </span>
                          <span style={{ color: '#00665e', fontWeight: 600 }}>{item.notes ?? item.monogram}</span>
                        </div>
                        <div>
                          <span>Warranty: </span>
                          <span style={{ color: '#00665e', fontWeight: 600 }}>5-Year Master</span>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderTop: '1px solid #eef2f2',
                          paddingTop: '12px',
                        }}
                      >
                        <span style={{ fontSize: '13px', color: '#5c6462' }}>Commission Investment</span>
                        <span
                          style={{
                            fontFamily: 'var(--font-main)',
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#111615',
                          }}
                        >
                          {currencySymbol}{item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Booking Form */}
                <form
                  onSubmit={handleConfirmCommission}
                  style={{
                    borderTop: '1px solid #e5e8e8',
                    paddingTop: '24px',
                  }}
                >
                  {!sr.enabled && (
                  <>
                  <span className="am-kicker">CLIENT & DELIVERY VERIFICATION</span>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '12px' }}>
                    <input
                      required
                      type="text"
                      placeholder="Client Full Name"
                      value={clientDetails.name}
                      onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #d4dedd',
                        padding: '10px 12px',
                        color: '#111615',
                        fontSize: '13px',
                        outline: 'none',
                        borderRadius: '2px',
                      }}
                    />
                    <input
                      required
                      type="email"
                      placeholder="Official Email"
                      value={clientDetails.email}
                      onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #d4dedd',
                        padding: '10px 12px',
                        color: '#111615',
                        fontSize: '13px',
                        outline: 'none',
                        borderRadius: '2px',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      placeholder="Mobile Number (WhatsApp)"
                      value={clientDetails.phone}
                      onChange={(e) => setClientDetails({ ...clientDetails, phone: e.target.value })}
                      style={fieldStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <input
                      required
                      type="text"
                      placeholder="Shipping Address (house, street, area)"
                      value={clientDetails.address}
                      onChange={(e) => setClientDetails({ ...clientDetails, address: e.target.value })}
                      style={fieldStyle}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
                    <input
                      required
                      type="text"
                      placeholder="City"
                      value={clientDetails.city}
                      onChange={(e) => setClientDetails({ ...clientDetails, city: e.target.value })}
                      style={fieldStyle}
                    />
                    <input
                      required
                      type="text"
                      placeholder="State"
                      value={clientDetails.state}
                      onChange={(e) => setClientDetails({ ...clientDetails, state: e.target.value })}
                      style={fieldStyle}
                    />
                    <input
                      required
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Pincode"
                      value={clientDetails.pincode}
                      onChange={(e) => setClientDetails({ ...clientDetails, pincode: e.target.value.replace(/\D/g, '') })}
                      style={fieldStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <input
                      type="text"
                      placeholder="Landmark (optional)"
                      value={clientDetails.landmark}
                      onChange={(e) => setClientDetails({ ...clientDetails, landmark: e.target.value })}
                      style={fieldStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <input
                      type="text"
                      placeholder="Vehicle Chassis / VIN / Registration (Optional for CAD check)"
                      value={clientDetails.chassisVin}
                      onChange={(e) => setClientDetails({ ...clientDetails, chassisVin: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#ffffff',
                        border: '1px solid #d4dedd',
                        padding: '10px 12px',
                        color: '#111615',
                        fontSize: '13px',
                        outline: 'none',
                        borderRadius: '2px',
                      }}
                    />
                  </div>

                  </>
                  )}

                  {/* Price breakdown */}
                  <div style={{ fontSize: '13px', color: '#5c6462', marginBottom: '14px', borderTop: '1px solid #e4e8e7', paddingTop: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span>Subtotal</span>
                      <span>{currencySymbol}{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span>Shipping</span>
                      <span style={{ color: '#00665e', fontWeight: 600 }}>Free</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>GST (18%)</span>
                      <span>{currencySymbol}{gst.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Summary Total */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '20px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', color: '#5c6462', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Total (incl. GST)
                      </div>
                      <div style={{ fontSize: '12px', color: '#00665e', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px', fontWeight: 600 }}>
                        <Lock size={12} /> {sr.enabled ? 'Secure payment by Shiprocket · address next' : 'Free Pan-India Insured Express + COD/UPI'}
                      </div>
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '28px',
                        fontWeight: 600,
                        color: '#111615',
                      }}
                    >
                      {currencySymbol}{total.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {error && (
                    <div role="alert" style={{ marginBottom: '12px', padding: '10px 12px', background: '#fdecec', border: '1px solid #f5b5b5', color: '#a11d1d', fontSize: '13px', borderRadius: '2px' }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="cta_button cta_button--primary-light"
                    style={{ width: '100%', height: '52px', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'wait' : 'pointer' }}
                  >
                    <span>{submitting ? (sr.enabled ? 'Opening payment...' : 'Placing your order...') : sr.enabled ? 'Pay securely' : 'Reserve Production Slot'}</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '24px 8px',
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'var(--color-brand-green-subtle)',
                border: '2px solid #00665e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <CheckCircle2 size={36} color="#00665e" />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '24px',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: '#111615',
                marginBottom: '10px',
              }}
            >
              Commission Confirmed
            </h3>

            <p
              style={{
                fontSize: '14px',
                color: '#5c6462',
                lineHeight: 1.6,
                marginBottom: '24px',
                maxWidth: '380px',
              }}
            >
              Thank you, {clientDetails.name || 'Client'}. Your order has been received. Our team will contact you on {clientDetails.phone || 'your phone'} to confirm the details of your cover and your delivery.</p>

            <div
              style={{
                background: 'var(--color-brand-green-subtle)',
                border: '1px solid #00665e',
                padding: '16px',
                borderRadius: '2px',
                marginBottom: '28px',
                width: '100%',
                fontSize: '13px',
                color: '#00665e',
                fontFamily: 'var(--font-main)',
                fontWeight: 600,
              }}
            >
              Order Number: {orderNumber}
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="cta_button cta_button--primary-light"
              style={{ padding: '0 32px' }}
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
