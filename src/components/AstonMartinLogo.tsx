'use client';

import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export default function AstonMartinLogo({
  width = 240,
  height = 42,
  color = '#111615',
  className = '',
}: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Signaturecovers - Bespoke Tailored Car Covers"
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      {/* Luxury Tailored Automotive Wing Crest (y: 2 to 13) */}
      <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Upper wing arcs */}
        <path d="M72 10 C96 3, 122 2, 134 4" opacity="0.85" />
        <path d="M208 10 C184 3, 158 2, 146 4" opacity="0.85" />
        {/* Lower wing sweeps */}
        <path d="M58 13 C86 6, 116 5, 134 7" opacity="0.5" />
        <path d="M222 13 C194 6, 164 5, 146 7" opacity="0.5" />
        {/* Central Bespoke Diamond Shield */}
        <polygon points="140,2 144,7 140,12 136,7" fill={color} stroke={color} strokeWidth="0.8" />
      </g>

      {/* Brand Name: SIGNATURECOVERS (y: 19 to 28, baseline 28) */}
      <text
        x="140"
        y="27"
        textAnchor="middle"
        fill={color}
        style={{
          fontFamily: 'var(--font-main), "Optima", "Cinzel", "Cinzel Decorative", "Montserrat", sans-serif',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '3.5px',
        }}
      >
        SIGNATURECOVERS
      </text>

      {/* Atelier Subtitle (y: 33 to 39, baseline 39) */}
      <text
        x="140"
        y="39"
        textAnchor="middle"
        fill={color}
        opacity="0.65"
        style={{
          fontFamily: 'var(--font-main), sans-serif',
          fontSize: '6.5px',
          fontWeight: 500,
          letterSpacing: '2.5px',
        }}
      >
        BESPOKE TAILORED CAR COVERS • INDIA
      </text>
    </svg>
  );
}

