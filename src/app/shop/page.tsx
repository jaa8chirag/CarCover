'use client';

import React, { useEffect, useState } from 'react';
import PageShell from '@/components/PageShell';
import CoverStudio from '@/components/CoverStudio';
import { FABRICS } from '@/data/fabrics';

export default function ShopPage() {
  const [fabricId, setFabricId] = useState<string | null>(null);

  // Preselect a fabric when arriving from a Collections card (/shop?fabric=id)
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('fabric');
    if (id && FABRICS.some((f) => f.id === id)) setFabricId(id);
  }, []);

  return (
    <PageShell>
      {({ addToCart }) => (
        <div className="bg-[#f3f1ed] pt-28 sm:pt-36 min-h-screen">
          <CoverStudio fabricId={fabricId} onFabricChange={setFabricId} onAddToCart={addToCart} />
        </div>
      )}
    </PageShell>
  );
}
