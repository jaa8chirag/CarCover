'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import PageShell from '@/components/PageShell';

type State = 'checking' | 'paid' | 'pending' | 'failed';

/** Shiprocket sends the customer back here as /order-complete?oid=...&ost=SUCCESS. */
export default function OrderCompletePage() {
  const [state, setState] = useState<State>('checking');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const oid = q.get('oid') || '';
    const ost = (q.get('ost') || '').toUpperCase();
    if (ost === 'SUCCESS') {
      try {
        localStorage.removeItem('sc_cart_v1'); // the cart is paid for
      } catch {}
    }
    if (!oid) {
      setState('pending');
      return;
    }
    // Ask our server to confirm with Shiprocket; the address bar alone is never trusted.
    fetch(`/api/shiprocket/sync?oid=${encodeURIComponent(oid)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.orderNumber) setOrderNumber(d.orderNumber);
        if (d?.ok && d.status === 'cancelled') setState('failed');
        else if (d?.ok && d.status !== 'awaiting_payment') setState('paid');
        else setState(ost === 'SUCCESS' ? 'paid' : 'pending');
      })
      .catch(() => setState(ost === 'SUCCESS' ? 'paid' : 'pending'));
  }, []);

  const Icon = state === 'failed' ? XCircle : state === 'paid' ? CheckCircle2 : Clock;
  const title = state === 'paid' ? 'Thank you, your order is placed' : state === 'failed' ? 'Payment did not go through' : 'We are confirming your order';
  const text =
    state === 'paid'
      ? 'We have received your order and will message you on WhatsApp to confirm the fit before we start cutting your cover.'
      : state === 'failed'
        ? 'No money has been taken. You can go back to your cart and try again, or message us on WhatsApp and we will help.'
        : 'This usually takes a few seconds. If you have paid, your order is safe and we will message you shortly.';

  return (
    <PageShell>
      {() => (
        <section className="min-h-[70vh] pt-[var(--header-height)] flex items-center justify-center bg-[#f3f1ed]">
          <div className="max-w-lg w-full mx-auto px-6 py-20 text-center">
            <Icon size={56} className={`mx-auto ${state === 'failed' ? 'text-red-600' : state === 'paid' ? 'text-[#00665e]' : 'text-[#b38848]'}`} />
            <h1 className="mt-6 text-3xl text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 400 }}>{title}</h1>
            {orderNumber && state !== 'failed' && <p className="mt-3 text-sm tracking-[2px] uppercase text-slate-500">Order {orderNumber}</p>}
            <p className="mt-5 text-slate-600 leading-relaxed">{text}</p>
            <Link href="/shop" className="mt-9 inline-flex px-8 py-4 rounded-full bg-black hover:bg-[#b38848] text-white text-xs font-bold uppercase tracking-[2px] no-underline transition-colors">
              Back to shop
            </Link>
          </div>
        </section>
      )}
    </PageShell>
  );
}
