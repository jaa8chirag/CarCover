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
      viewBox="0 0 280 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Signaturecovers - Bespoke Tailored Car Covers"
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      {/* Brand Name: SIGNATURECOVERS (y: 19 to 28, baseline 28) */}
      <text
        x="140"
        y="19"
        textAnchor="middle"
        fill={color}
        style={{
          fontFamily: 'var(--font-main), "Optima", "Cinzel", "Cinzel Decorative", "Montserrat", sans-serif',
          fontSize: '17px',
          fontWeight: 700,
          letterSpacing: '4px',
        }}
      >
        SIGNATURECOVERS
      </text>

    </svg>
  );
}

