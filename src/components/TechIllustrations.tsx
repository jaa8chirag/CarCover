'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CAR = 'M24 150 L24 112 Q28 92 64 86 L114 78 Q139 46 179 42 L254 42 Q286 46 300 78 L316 86 Q326 94 326 118 L326 150 Z';
const GOLD = '#cca462';
const TEAL = '#2dd4bf';

const draw = (delay = 0, duration = 1.6) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration, delay, ease: 'easeInOut' as const },
});

function Wheels() {
  return (
    <>
      {[104, 250].map((cx) => (
        <circle key={cx} cx={cx} cy="150" r="22" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="2" />
      ))}
    </>
  );
}

/** 1 · 3D laser scan: a scan beam sweeps the car while the outline is traced */
function Scan() {
  return (
    <g>
      <motion.path d={CAR} fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinejoin="round" {...draw()} />
      <Wheels />
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.circle
          key={i}
          cx={30 + ((i * 53) % 290)}
          cy={50 + ((i * 37) % 100)}
          r="1.8"
          fill={TEAL}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: (i % 9) * 0.25 }}
        />
      ))}
      <motion.rect
        y="30"
        width="3"
        height="140"
        fill={TEAL}
        initial={{ x: 14 }}
        animate={{ x: [14, 330, 14] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: `drop-shadow(0 0 8px ${TEAL})` }}
      />
    </g>
  );
}

/** 2 · CAD pattern: the car unfolds into labelled flat panels */
function Cad() {
  const panels = [
    'M30 40 L150 40 L160 80 L40 80 Z',
    'M170 40 L300 40 L310 80 L180 80 Z',
    'M30 96 L120 96 L120 160 L30 160 Z',
    'M136 96 L230 96 L230 160 L136 160 Z',
    'M246 96 L316 96 L316 160 L246 160 Z',
  ];
  return (
    <g>
      {panels.map((d, i) => (
        <motion.path key={i} d={d} fill={GOLD} fillOpacity="0.08" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" {...draw(i * 0.25, 1.1)} />
      ))}
      <motion.path d="M30 176 L316 176 M30 170 L30 182 M316 170 L316 182" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.4" fill="none" {...draw(1.6, 0.8)} />
      <motion.text
        x="173"
        y="194"
        textAnchor="middle"
        fontSize="11"
        fill="#fff"
        fillOpacity="0.7"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.8 }}
      >
        ±1 mm tolerance
      </motion.text>
    </g>
  );
}

/** 3 · CNC laser cutting: a spark runs along the cut line */
function Cut() {
  const d = 'M50 50 L270 50 Q300 50 300 80 L300 130 Q300 160 270 160 L90 160 Q50 160 50 130 Z';
  return (
    <g>
      <path d={d} fill="#fff" fillOpacity="0.05" stroke="#fff" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 6" />
      <motion.path d={d} fill="none" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.7, 0.9, 1] }} />
      <motion.circle
        r="7"
        fill="#fff"
        style={{ offsetPath: `path("${d}")`, filter: 'drop-shadow(0 0 10px #fb923c) drop-shadow(0 0 4px #fff)' }}
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: ['0%', '100%', '100%', '0%'] }}
        transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.7, 0.9, 1], ease: 'linear' }}
      />
    </g>
  );
}

/** 4 · Ultrasonic welding: two fabric layers fuse at the seam */
function Weld() {
  return (
    <g>
      <motion.rect x="40" y="70" width="150" height="46" rx="8" fill="#38bdf8" fillOpacity="0.55" initial={{ x: 20 }} animate={{ x: [20, 40, 40, 20] }} transition={{ duration: 4, repeat: Infinity }} />
      <motion.rect x="150" y="84" width="150" height="46" rx="8" fill="#0ea5e9" fillOpacity="0.55" initial={{ x: 170 }} animate={{ x: [170, 150, 150, 170] }} transition={{ duration: 4, repeat: Infinity }} />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="170"
          cy="100"
          r="10"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          initial={{ scale: 0.4, opacity: 0.9 }}
          animate={{ scale: [0.4, 4], opacity: [0.9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: '170px 100px' }}
        />
      ))}
      <rect x="160" y="30" width="20" height="40" rx="4" fill="#fff" fillOpacity="0.85" />
      <path d="M170 70 L170 92" stroke="#fff" strokeWidth="3" />
    </g>
  );
}

/** 5 · Hand finishing: stitching with contrast piping */
function Stitch() {
  return (
    <g>
      <rect x="30" y="50" width="280" height="110" rx="14" fill="#fff" fillOpacity="0.06" stroke="#fff" strokeOpacity="0.2" />
      <path d="M30 105 L310 105" stroke={GOLD} strokeWidth="6" strokeLinecap="round" opacity="0.9" />
      <motion.path
        d="M44 105 L296 105"
        stroke="#fff"
        strokeWidth="3"
        strokeDasharray="10 9"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.7, 0.9, 1], ease: 'easeInOut' }}
        fill="none"
      />
      <motion.g initial={{ x: 0 }} animate={{ x: [0, 250, 250, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.7, 0.9, 1], ease: 'easeInOut' }}>
        <path d="M44 70 L50 112" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round" />
        <circle cx="44" cy="68" r="4" fill="none" stroke="#e5e7eb" strokeWidth="2" />
      </motion.g>
    </g>
  );
}

/** 6 · Fit trial & QC: a check mark is drawn when the cover passes */
function Qc() {
  return (
    <g>
      <motion.path d={CAR} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" {...draw(0, 1.2)} />
      <Wheels />
      <motion.circle cx="170" cy="100" r="46" fill="#16a34a" fillOpacity="0.2" stroke="#22c55e" strokeWidth="3.5" initial={{ pathLength: 0, scale: 0.8 }} animate={{ pathLength: 1, scale: 1 }} transition={{ duration: 1, delay: 1.1 }} style={{ transformOrigin: '170px 100px' }} />
      <motion.path d="M148 102 L166 120 L196 82" fill="none" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" {...draw(1.8, 0.7)} />
    </g>
  );
}

const SCENES = [Scan, Cad, Cut, Weld, Stitch, Qc];

/** Animated illustration for a process step; remounts on step change to replay. */
export default function ProcessIllustration({ index, className = '' }: { index: number; className?: string }) {
  const Scene = SCENES[index] ?? Scan;
  return (
    <svg viewBox="0 0 340 200" className={className} role="img" aria-hidden="true">
      <Scene key={index} />
    </svg>
  );
}
