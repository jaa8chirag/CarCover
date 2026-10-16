'use client';

import { useCallback, useEffect, useState } from 'react';

const KEY = 'sc_cart_v1';

/** Cart that survives page changes and reloads (kept in this browser's localStorage). */
export function useCart() {
  const [items, setItems] = useState<any[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* private mode or blocked storage: the cart then lives only in memory */
    }
    setReady(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY) return;
      try {
        setItems(JSON.parse(e.newValue || '[]'));
      } catch {}
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((item: any) => setItems((prev) => [...prev, item]), []);
  const remove = useCallback((index: number) => setItems((prev) => prev.filter((_, i) => i !== index)), []);
  const clear = useCallback(() => setItems([]), []);

  return { items, add, remove, clear };
}
