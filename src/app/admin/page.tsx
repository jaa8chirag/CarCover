'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

const STATUSES = ['new', 'confirmed', 'in_production', 'shipped', 'delivered', 'cancelled'] as const;
const STATUS_LABEL: Record<string, string> = {
  new: 'New',
  confirmed: 'Confirmed',
  in_production: 'In production',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};
const STATUS_COLOR: Record<string, string> = {
  new: '#b45309',
  confirmed: '#1d4ed8',
  in_production: '#7c3aed',
  shipped: '#0e7490',
  delivered: '#15803d',
  cancelled: '#b91c1c',
};

const inr = (n: number) => '₹' + Math.round(n || 0).toLocaleString('en-IN');
const when = (d: string) =>
  new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

async function api(path: string, init?: RequestInit) {
  const res = await fetch(path, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

const field = 'w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-black focus:outline-none focus:border-black';
const btn = 'px-4 py-2.5 rounded-lg bg-black hover:bg-[#b38848] text-white text-sm font-semibold cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
const btnGhost = 'px-4 py-2.5 rounded-lg border border-slate-300 hover:border-black text-sm font-semibold cursor-pointer transition-colors';

function Badge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap" style={{ background: STATUS_COLOR[status] || '#475569' }}>
      {STATUS_LABEL[status] || status}
    </span>
  );
}

/* ------------------------------------------------------------------ login */

function Login({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const r = await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }) });
    setBusy(false);
    if (r.ok) onDone();
    else setError(r.data.message || 'Could not sign in');
  };

  return (
    <div className="min-h-screen bg-[#f3f1ed] flex items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] border border-slate-200">
        <span className="block text-[11px] font-bold tracking-[4px] uppercase text-[#b38848] mb-2">Signature Covers</span>
        <h1 className="text-2xl font-semibold text-black mb-6">Admin panel</h1>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password</label>
        <input autoFocus type="password" className={field} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" />
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={busy || !password} className={btn + ' w-full mt-5'}>
          {busy ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

/* ----------------------------------------------------------------- orders */

function OrderDetail({ order, onClose, onSaved }: { order: any; onClose: () => void; onSaved: (o: any) => void }) {
  const [status, setStatus] = useState(order.status);
  const [courier, setCourier] = useState(order.tracking?.courier || '');
  const [awb, setAwb] = useState(order.tracking?.awb || '');
  const [note, setNote] = useState(order.adminNote || '');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const s = order.shipping;
  const addressText = `${order.customer.name}\n${s.address}${s.landmark ? ', ' + s.landmark : ''}\n${s.city}, ${s.state} - ${s.pincode}\nIndia\nPhone: ${order.customer.phone}`;

  const save = async () => {
    setBusy(true);
    setMsg('');
    const r = await api(`/api/admin/orders/${order.orderNumber}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, tracking: { courier, awb }, adminNote: note }),
    });
    setBusy(false);
    if (r.ok) {
      onSaved(r.data.order);
      setMsg('Saved');
    } else setMsg(r.data.message || 'Could not save');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={onClose}>
      <div className="w-full max-w-xl h-full bg-white overflow-y-auto p-6 sm:p-8" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-black">{order.orderNumber}</h2>
            <p className="text-sm text-slate-500 mt-1">{when(order.createdAt)}</p>
          </div>
          <button onClick={onClose} className={btnGhost}>Close</button>
        </div>

        <section className="mt-6">
          <h3 className="text-xs font-bold tracking-[2px] uppercase text-[#b38848] mb-2">Customer</h3>
          <p className="text-black font-medium">{order.customer.name}</p>
          <p className="text-sm text-slate-600">
            <a className="underline" href={`tel:+91${order.customer.phone}`}>{order.customer.phone}</a> ·{' '}
            <a className="underline" href={`mailto:${order.customer.email}`}>{order.customer.email}</a>
          </p>
          <a
            className="inline-block mt-2 text-sm font-semibold text-emerald-700 underline"
            target="_blank"
            rel="noreferrer"
            href={`https://wa.me/91${order.customer.phone}?text=${encodeURIComponent(`Hello ${order.customer.name}, this is Signature Covers about your order ${order.orderNumber}.`)}`}
          >
            Message on WhatsApp
          </a>
        </section>

        <section className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold tracking-[2px] uppercase text-[#b38848]">Shipping address</h3>
            <button className="text-xs font-semibold underline cursor-pointer" onClick={() => navigator.clipboard?.writeText(addressText)}>Copy address</button>
          </div>
          <div className="rounded-xl bg-[#f7f5f1] p-4 text-sm text-slate-800 whitespace-pre-line">{addressText}</div>
          {order.vin && <p className="mt-2 text-sm text-slate-600">Vehicle ref / VIN: <strong>{order.vin}</strong></p>}
        </section>

        <section className="mt-6">
          <h3 className="text-xs font-bold tracking-[2px] uppercase text-[#b38848] mb-2">Items</h3>
          <div className="space-y-3">
            {order.items.map((it: any, i: number) => (
              <div key={i} className="rounded-xl border border-slate-200 p-4 text-sm">
                <div className="flex justify-between gap-3">
                  <strong className="text-black">{it.product}</strong>
                  <strong>{inr(it.price)}</strong>
                </div>
                <p className="text-slate-600 mt-1">{it.vehicle}{it.variant ? ` · ${it.variant}` : ''}</p>
                <p className="text-slate-600">Colour: {it.coverColor || '-'}{it.piping && it.piping !== 'No piping' ? ` · Piping: ${it.piping}` : ''}</p>
                {it.notes && <p className="text-slate-800 mt-1">Note: {it.notes}</p>}
                {!it.priceVerified && <p className="text-xs text-amber-700 mt-1">Price could not be matched to a car size, check it.</p>}
              </div>
            ))}
          </div>
          <p className="mt-3 text-right text-lg font-semibold">Total {inr(order.total)}</p>
        </section>

        <section className="mt-6 space-y-3">
          <h3 className="text-xs font-bold tracking-[2px] uppercase text-[#b38848]">Update order</h3>
          <select className={field} value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((st) => <option key={st} value={st}>{STATUS_LABEL[st]}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input className={field} placeholder="Courier (e.g. Delhivery)" value={courier} onChange={(e) => setCourier(e.target.value)} />
            <input className={field} placeholder="Tracking / AWB number" value={awb} onChange={(e) => setAwb(e.target.value)} />
          </div>
          <textarea className={field + ' min-h-[90px]'} placeholder="Private note (only you can see this)" value={note} onChange={(e) => setNote(e.target.value)} />
          <div className="flex items-center gap-3">
            <button className={btn} onClick={save} disabled={busy}>{busy ? 'Saving...' : 'Save changes'}</button>
            {msg && <span className="text-sm text-slate-600">{msg}</span>}
          </div>
        </section>
      </div>
    </div>
  );
}

function Orders() {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<any>(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (query) params.set('q', query);
    const r = await api('/api/admin/orders?' + params.toString());
    if (r.ok) setData(r.data);
    else setError('Could not load orders. Check that the database is connected.');
  }, [status, query]);

  useEffect(() => {
    load();
  }, [load]);

  const counts = data?.counts || {};
  const all = Object.values(counts).reduce((a: number, b: any) => a + b, 0) as number;

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          ['All orders', all],
          ['New', counts.new || 0],
          ['In production / shipped', (counts.in_production || 0) + (counts.shipped || 0)],
          ['Revenue (not cancelled)', inr(data?.revenue || 0)],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-2xl bg-white border border-slate-200 p-4">
            <div className="text-xs uppercase tracking-[2px] text-slate-500">{label}</div>
            <div className="mt-1 text-2xl font-semibold text-black">{value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {['', ...STATUSES].map((st) => (
          <button
            key={st || 'all'}
            onClick={() => setStatus(st)}
            className={`px-3.5 py-2 rounded-full text-sm font-semibold border cursor-pointer ${status === st ? 'bg-black text-white border-black' : 'bg-white border-slate-300 hover:border-black'}`}
          >
            {st ? STATUS_LABEL[st] : 'All'} {st ? `(${counts[st] || 0})` : ''}
          </button>
        ))}
        <form
          className="ml-auto flex gap-2 w-full sm:w-auto"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(q);
          }}
        >
          <input className={field + ' sm:w-72'} placeholder="Search name, phone, order, city, pincode" value={q} onChange={(e) => setQ(e.target.value)} />
          <button className={btn}>Search</button>
        </form>
      </div>

      {error && <p className="text-red-700 mb-4">{error}</p>}
      {!data && !error && <p className="text-slate-500">Loading...</p>}

      {data && (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[1.5px] text-slate-500 border-b border-slate-200">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Ship to</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-500">No orders yet.</td></tr>
              )}
              {data.orders.map((o: any) => (
                <tr key={o.orderNumber} onClick={() => setOpen(o)} className="border-b border-slate-100 hover:bg-[#faf8f4] cursor-pointer">
                  <td className="px-4 py-3 font-semibold text-black whitespace-nowrap">{o.orderNumber}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{when(o.createdAt)}</td>
                  <td className="px-4 py-3"><div className="text-black">{o.customer.name}</div><div className="text-slate-500">{o.customer.phone}</div></td>
                  <td className="px-4 py-3 text-slate-600">{o.shipping.city}, {o.shipping.state} {o.shipping.pincode}</td>
                  <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">{inr(o.total)}</td>
                  <td className="px-4 py-3"><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <OrderDetail
          order={open}
          onClose={() => setOpen(null)}
          onSaved={(o) => {
            setOpen(o);
            load();
          }}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------- customers */

function Customers() {
  const [rows, setRows] = useState<any[] | null>(null);
  const [q, setQ] = useState('');
  useEffect(() => {
    api('/api/admin/customers').then((r) => setRows(r.ok ? r.data.customers : []));
  }, []);
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!rows) return [];
    return t ? rows.filter((c) => `${c.name} ${c.phone} ${c.email} ${c.shipping?.city} ${c.shipping?.pincode}`.toLowerCase().includes(t)) : rows;
  }, [rows, q]);

  return (
    <div>
      <input className={field + ' sm:w-80 mb-4'} placeholder="Search customers" value={q} onChange={(e) => setQ(e.target.value)} />
      {!rows && <p className="text-slate-500">Loading...</p>}
      {rows && (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[1.5px] text-slate-500 border-b border-slate-200">
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Last shipping address</th>
                <th className="px-4 py-3 text-right">Orders</th>
                <th className="px-4 py-3 text-right">Spent</th>
                <th className="px-4 py-3">Last order</th>
              </tr>
            </thead>
            <tbody>
              {shown.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-500">No customers yet.</td></tr>}
              {shown.map((c) => (
                <tr key={c.phone} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-semibold text-black">{c.name}</td>
                  <td className="px-4 py-3 text-slate-600"><div>{c.phone}</div><div>{c.email}</div></td>
                  <td className="px-4 py-3 text-slate-600">{c.shipping?.address}, {c.shipping?.city}, {c.shipping?.state} {c.shipping?.pincode}</td>
                  <td className="px-4 py-3 text-right">{c.orders}</td>
                  <td className="px-4 py-3 text-right font-semibold">{inr(c.spent)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{when(c.lastOrder)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- products */

function ProductRow({ p, onSaved }: { p: any; onSaved: () => void }) {
  const [title, setTitle] = useState(p.title);
  const [price, setPrice] = useState(String(p.basePrice));
  const [qty, setQty] = useState(String(p.quantity));
  const [status, setStatus] = useState(p.status);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const dirty = title !== p.title || Number(price) !== p.basePrice || Number(qty) !== p.quantity || status !== p.status;

  const save = async () => {
    setBusy(true);
    setMsg('');
    const r = await api(`/api/admin/products/${p.handle}`, { method: 'PATCH', body: JSON.stringify({ title, basePrice: Number(price), quantity: Number(qty), status }) });
    setBusy(false);
    if (r.ok) {
      setMsg('Saved');
      onSaved();
    } else setMsg(r.data.message || 'Could not save');
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-4 flex flex-col md:flex-row md:items-center gap-4">
      <img src={p.image} alt="" className="w-20 h-20 rounded-xl object-cover bg-slate-100 flex-shrink-0" />
      <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-[1.4fr_0.8fr_0.7fr_0.8fr] gap-3">
        <label className="col-span-2 md:col-span-1 text-xs font-semibold text-slate-500">Name
          <input className={field + ' mt-1'} value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="text-xs font-semibold text-slate-500">Price from (₹)
          <input className={field + ' mt-1'} inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ''))} />
        </label>
        <label className="text-xs font-semibold text-slate-500">Stock
          <input className={field + ' mt-1'} inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value.replace(/\D/g, ''))} />
        </label>
        <label className="text-xs font-semibold text-slate-500">Status
          <select className={field + ' mt-1'} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="draft">Hidden (draft)</option>
          </select>
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button className={btn} disabled={!dirty || busy} onClick={save}>{busy ? 'Saving...' : 'Save'}</button>
        {msg && <span className="text-xs text-slate-500">{msg}</span>}
      </div>
    </div>
  );
}

function Products() {
  const [rows, setRows] = useState<any[] | null>(null);
  const load = useCallback(() => {
    api('/api/admin/products').then((r) => setRows(r.ok ? r.data.products : []));
  }, []);
  useEffect(load, [load]);
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600 max-w-3xl">
        These are the covers in the catalogue that is shared with Shiprocket. The price is the starting price for a hatchback; the price for bigger cars is worked out from it.
      </p>
      {!rows && <p className="text-slate-500">Loading...</p>}
      {rows?.map((p) => <ProductRow key={p.handle + p.updatedAt} p={p} onSaved={load} />)}
    </div>
  );
}

/* ------------------------------------------------------------ shiprocket */

function Shiprocket() {
  const [origin, setOrigin] = useState('');
  const [colls, setColls] = useState<any[]>([]);
  useEffect(() => {
    setOrigin(window.location.origin);
    fetch('/api/shiprocket/collections').then((r) => r.json()).then((d) => setColls(d?.data?.collections || [])).catch(() => {});
  }, []);
  const rows = [
    ['Product API', `${origin}/api/shiprocket/products?page=1&limit=100`],
    ['Collection API', `${origin}/api/shiprocket/collections?page=1&limit=100`],
    ['Product by collection API', `${origin}/api/shiprocket/collection-products?collection_id=${colls[0]?.id || '700000100'}&page=1&limit=100`],
  ];
  return (
    <div className="max-w-4xl space-y-4">
      <p className="text-sm text-slate-600">Share these three URLs with Shiprocket. They return the catalogue in the format Shiprocket Checkout asks for.</p>
      {rows.map(([label, url]) => (
        <div key={label} className="rounded-2xl bg-white border border-slate-200 p-4">
          <div className="text-xs font-bold tracking-[2px] uppercase text-[#b38848]">{label}</div>
          <div className="mt-2 flex gap-2 items-center">
            <code className="flex-1 min-w-0 break-all text-sm bg-[#f7f5f1] rounded-lg px-3 py-2">GET {url}</code>
            <button className={btnGhost} onClick={() => navigator.clipboard?.writeText(url)}>Copy</button>
          </div>
        </div>
      ))}
      <div className="rounded-2xl bg-white border border-slate-200 p-4">
        <div className="text-xs font-bold tracking-[2px] uppercase text-[#b38848] mb-2">Collection ids</div>
        {colls.map((c) => <div key={c.id} className="text-sm text-slate-700">{c.title}: <strong>{c.id}</strong></div>)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- page */

const TABS = ['Orders', 'Customers', 'Products', 'Shiprocket'] as const;

export default function AdminPage() {
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]>('Orders');

  useEffect(() => {
    api('/api/admin/login').then((r) => setAdmin(!!r.data.admin));
  }, []);

  if (admin === null) return <div className="min-h-screen bg-[#f3f1ed]" />;
  if (!admin) return <Login onDone={() => setAdmin(true)} />;

  return (
    <div className="min-h-screen bg-[#f3f1ed] text-slate-900">
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-5 py-4 flex flex-wrap items-center gap-4">
          <div>
            <span className="block text-[10px] font-bold tracking-[4px] uppercase text-[#cca462]">Signature Covers</span>
            <span className="text-lg font-semibold">Admin panel</span>
          </div>
          <nav className="flex gap-1 ml-0 sm:ml-8 flex-wrap">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer ${tab === t ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex gap-2">
            <a href="/" className="px-3 py-2 rounded-lg border border-white/30 text-sm no-underline text-white hover:bg-white/10" target="_blank" rel="noreferrer">View site</a>
            <button
              className="px-3 py-2 rounded-lg border border-white/30 text-sm hover:bg-white/10 cursor-pointer"
              onClick={async () => {
                await api('/api/admin/logout', { method: 'POST' });
                setAdmin(false);
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-8" style={{ background: "transparent" }}>
        <h1 className="sr-only">{tab}</h1>
        {tab === 'Orders' && <Orders />}
        {tab === 'Customers' && <Customers />}
        {tab === 'Products' && <Products />}
        {tab === 'Shiprocket' && <Shiprocket />}
      </main>
    </div>
  );
}
