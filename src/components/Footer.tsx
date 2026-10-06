'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type IconProps = { size?: number };
const svg = (size: number, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
const Instagram = ({ size = 18 }: IconProps) =>
  svg(size, <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></>);
const Facebook = ({ size = 18 }: IconProps) =>
  svg(size, <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1z" fill="currentColor" stroke="none" />);
const Youtube = ({ size = 18 }: IconProps) =>
  svg(size, <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3z" fill="currentColor" /></>);

const ZONES = [
  { label: 'India', tz: 'Asia/Kolkata' },
  { label: 'London', tz: 'Europe/London' },
  { label: 'Dubai', tz: 'Asia/Dubai' },
];

const LINKS = [
  { label: 'Collections', href: '/collections' },
  { label: 'Technology', href: '/technology' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const SOCIALS = [
  { icon: Instagram, href: 'https://www.instagram.com/thesignaturecovers/', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

const GOLD = '#cca462';
const WORD = 'Signaturecovers'.split('');
// Each letter leans a different way when you touch it.
const LEAN = [-7, 5, -4, 7, -6, 4, -8, 6, -5, 7, -4, 5, -7, 4, -6];

export default function Footer() {
  const [now, setNow] = useState<Date | null>(null);
  const [overWord, setOverWord] = useState(false);
  const [inside, setInside] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Custom cursor ring that trails the pointer inside the footer
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 500, damping: 35, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 500, damping: 35, mass: 0.4 });

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    setInside(true);
  };

  const time = (tz: string) =>
    now ? now.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit' }) : '--:--';

  return (
    <footer
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setInside(false)}
      className="relative bg-black text-white overflow-hidden lg:cursor-none"
    >
      {/* Cursor ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-20 hidden lg:flex items-center justify-center rounded-full border border-white/80"
        style={{ x: sx, y: sy, width: 36, height: 36, marginLeft: -18, marginTop: -18, opacity: inside ? 1 : 0 }}
        animate={{ scale: overWord ? 2.6 : 1, borderColor: overWord ? GOLD : 'rgba(255,255,255,0.8)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
      </motion.div>

      {/* World clocks */}
      <div className="bg-black border-y border-white/5">
        <div className="container-am max-w-7xl py-5 flex flex-wrap justify-center gap-4">
          {ZONES.map((z) => (
            <span key={z.label} className="px-7 py-2.5 rounded-full border border-white/15 font-mono text-[15px] text-white/55">
              <strong className="text-white/80 font-bold">{z.label}:</strong> {time(z.tz)}
            </span>
          ))}
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="relative px-3 sm:px-6 pt-6 sm:pt-10 pb-14 sm:pb-20">
        <div
          aria-label="Signaturecovers"
          onPointerEnter={() => setOverWord(true)}
          onPointerLeave={() => setOverWord(false)}
          className="relative flex justify-center whitespace-nowrap select-none"
          style={{ fontFamily: "'Plus Jakarta Sans', var(--font-main), sans-serif", fontWeight: 800, fontSize: 'clamp(46px, 11.4vw, 230px)', letterSpacing: '-0.06em', lineHeight: 1 }}
        >
          {WORD.map((c, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block origin-bottom"
              initial={{ color: '#ffffff' }}
              whileHover={{ rotate: LEAN[i], y: -10, scale: 1.04, color: GOLD, textShadow: '0 0 50px rgba(204,164,98,0.55)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 16 }}
            >
              {c}
            </motion.span>
          ))}
        </div>
        <p className="relative mt-8 text-center font-mono text-[11px] sm:text-xs tracking-[6px] uppercase text-white/35">
          Bespoke Tailored Car Covers · India
        </p>
      </div>

      {/* Bottom bar */}
      <div className="container-am max-w-7xl">
        <div className="border-t border-white/10 py-8 grid gap-7 md:grid-cols-3 items-center">
          <div className="flex justify-center md:justify-start gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-lg border border-white/15 bg-white/5 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-sm">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-white/60 hover:text-white no-underline transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="text-center md:text-right font-mono text-xs leading-relaxed">
            <div className="font-bold text-white/85">Proudly created in India.</div>
            <div className="text-white/40">© 2026 Signaturecovers. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
