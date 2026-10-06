'use client';

import React from 'react';

const ROW_ONE = [
  ['Rolls-Royce', 'rolls-royce.png'], ['Bentley', 'bentley.png'], ['Ferrari', 'ferrari.png'],
  ['Lamborghini', 'lamborghini.png'], ['Aston Martin', 'aston-martin.png'], ['McLaren', 'mclaren.svg'],
  ['Bugatti', 'bugatti.svg'], ['Koenigsegg', 'koenigsegg.svg'], ['Maserati', 'maserati.png'],
  ['Porsche', 'porsche.png'], ['Mercedes-Benz', 'mercedes-benz.png'], ['BMW', 'bmw.png'],
  ['Audi', 'audi.png'], ['Land Rover', 'land-rover.png'], ['Jaguar', 'jaguar.png'],
  ['Lexus', 'lexus.png'], ['Volvo', 'volvo.png'], ['Tesla', 'tesla.png'],
  ['Alfa Romeo', 'alfaromeo.svg'], ['Cadillac', 'cadillac.svg'], ['Infiniti', 'infiniti.svg'],
  ['Acura', 'acura.svg'], ['MINI', 'mini.png'],
];

const ROW_TWO = [
  ['Mahindra', 'mahindra.png'], ['Tata', 'tata.png'], ['Maruti Suzuki', 'suzuki.png'],
  ['Hyundai', 'hyundai.png'], ['Kia', 'kia.png'], ['Toyota', 'toyota.png'],
  ['Honda', 'honda.png'], ['MG', 'mg.png'], ['Skoda', 'skoda.png'],
  ['Volkswagen', 'volkswagen.png'], ['Jeep', 'jeep.png'], ['Renault', 'renault.png'],
  ['Nissan', 'nissan.png'], ['Citroën', 'citroen.png'], ['Force Motors', 'force-motors.png'],
  ['Isuzu', 'isuzu.png'], ['BYD', 'byd.png'], ['VinFast', 'vinfast.png'],
  ['Ford', 'ford.svg'], ['Chevrolet', 'chevrolet.svg'], ['Subaru', 'subaru.svg'],
  ['Mazda', 'mazda.svg'], ['Mitsubishi', 'mitsubishi.svg'], ['Peugeot', 'peugeot.svg'],
  ['Fiat', 'fiat.svg'], ['Ram', 'ram.svg'], ['Dacia', 'dacia.svg'], ['Opel', 'opel.svg'],
];

const ALL = [...ROW_ONE, ...ROW_TWO];

function Row({ items }: { items: string[][] }) {
  const loop = [...items, ...items];
  const mask = 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)';
  return (
    <div className="brand-row overflow-hidden" style={{ maskImage: mask, WebkitMaskImage: mask }}>
      <div
        className="brand-track flex items-center w-max"
        style={{ animation: `brand-marquee ${items.length * 5}s linear infinite` }}
      >
        {loop.map(([name, file], i) => (
          <div key={i} className="brand-logo flex items-center justify-center mx-8 sm:mx-12 h-20 sm:h-28 w-36 sm:w-52 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/brands/${file}`} alt={name} title={name} loading="lazy" className="max-h-full max-w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section className="bg-white py-20 sm:py-28 overflow-hidden">
      <style>{`
        @keyframes brand-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .brand-row:hover .brand-track { animation-play-state: paused !important; }
        .brand-logo img { transition: transform .4s ease; }
        .brand-logo:hover img { transform: scale(1.12); }
      `}</style>
      <div className="text-center px-6 mb-14">
        <div className="mx-auto mb-5 h-px w-12 bg-[#cca462]" />
        <p className="text-[11px] font-semibold tracking-[5px] uppercase text-slate-500">Tailored For Every Marque</p>
        <h2 className="mt-4 text-2xl sm:text-4xl font-light tracking-tight text-slate-900">Luxury, Performance &amp; Indian Favourites</h2>
      </div>
      <Row items={ALL} />
    </section>
  );
}
