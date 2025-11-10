'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function Hero() {
  const [hovered, setHovered] = useState(false);
  const ticks = useAnimation();

  useEffect(() => {
    ticks.start({
      rotate: 360,
      transition: { duration: 18, ease: 'linear', repeat: Infinity },
    });
  }, [ticks]);

  const ringRadius = hovered ? 145 : 115;
  const lines = ['WEBSITE DESIGN', 'THAT', 'STANDS OUT'];

  return (
    // ↓ shorter than full screen so the marquee is visible without scrolling
    <section className="relative min-h-[88vh] overflow-hidden">
      {/* Light / Dark crossfade on hover */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-white to-gray-50"
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px at 50% 40%, #0b1323 0%, #020617 60%)',
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-teal-400 mix-blend-soft-light"
        animate={{ opacity: hovered ? 0.18 : 0 }}
        transition={{ duration: 0.45 }}
      />

      <div className="relative z-10 pt-24 min-h-[88vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Copy */}
          <div className="text-center md:text-left">
            {lines.map((text, i) => (
              <motion.h1
                key={text}
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  color: hovered ? '#e6fffb' : '#0f172a',
                }}
                transition={{ delay: 0.15 * i, duration: 0.7, ease: 'easeOut' }}
                className="font-display text-5xl md:text-7xl font-black leading-tight tracking-tight"
              >
                {text}
              </motion.h1>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                color: hovered ? 'rgba(226, 232, 240, 0.9)' : '#475569',
              }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-6 text-base md:text-lg max-w-lg mx-auto md:mx-0"
            >
              We build immersive, high-performance sites where motion,
              interaction, and speed work together.
            </motion.p>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="inline-block mt-8 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-7 rounded-full shadow-lg transition-colors"
            >
              Get Started
            </motion.a>
          </div>

          {/* Orb + subtle HUD details (your orb untouched) */}
          <div className="relative flex justify-center items-center">
            {/* --- Decorative: concentric rings behind the orb --- */}
            <svg
              width="440"
              height="440"
              viewBox="0 0 440 440"
              className="pointer-events-none absolute -z-10"
              style={{ opacity: hovered ? 0.85 : 0.4 }}
            >
              {/* Outer dashed */}
              <circle
                cx="220"
                cy="220"
                r="190"
                fill="none"
                stroke={hovered ? '#9fbad1' : '#cbd5e1'}
                strokeWidth="1.5"
                strokeDasharray="6 10"
                strokeOpacity="0.7"
              />
              {/* Mid dotted */}
              <circle
                cx="220"
                cy="220"
                r="158"
                fill="none"
                stroke={hovered ? '#97d6cc' : '#a8c5bf'}
                strokeWidth="1"
                strokeDasharray="2 8"
                strokeOpacity="0.6"
              />
              {/* Inner thin */}
              <circle
                cx="220"
                cy="220"
                r="126"
                fill="none"
                stroke={hovered ? '#5eead4' : '#86efac'}
                strokeWidth="1"
                strokeOpacity="0.45"
              />
            </svg>

            {/* Rotating tick ring (kept) */}
            <motion.div
              className="absolute"
              animate={ticks}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 rounded-full"
                  style={{
                    height: i % 6 === 0 ? 10 : 6,
                    backgroundColor: hovered ? '#94a3b8' : '#cbd5e1',
                    transform: `rotate(${i * 10}deg) translateY(-${ringRadius}px)`,
                    opacity: i % 2 === 0 ? 0.85 : 0.55,
                  }}
                />
              ))}
            </motion.div>

            {/* --- corner brackets for a subtle “targeting” feel --- */}
            <CornerBracket side="tl" active={hovered} />
            <CornerBracket side="tr" active={hovered} />
            <CornerBracket side="bl" active={hovered} />
            <CornerBracket side="br" active={hovered} />

            {/* Orb (unchanged behavior) */}
            <motion.div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="w-56 h-56 md:w-72 md:h-72 rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden z-10"
              whileHover={{
                scale: 1.12,
                boxShadow:
                  '0 0 0 8px rgba(20,184,166,0.15), 0 25px 60px rgba(0,0,0,0.25)',
              }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(20,184,166,0.95))',
                }}
                animate={{
                  filter: hovered
                    ? 'blur(2px) brightness(1.05)'
                    : 'blur(0px) brightness(1)',
                }}
                transition={{ duration: 0.35 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: hovered
                    ? [
                        '0 0 0 0 rgba(45,212,191,0.0)',
                        '0 0 0 25px rgba(45,212,191,0.15)',
                        '0 0 0 35px rgba(45,212,191,0.0)',
                      ]
                    : '0 0 0 0 rgba(45,212,191,0)',
                }}
                transition={{ duration: 1.4, repeat: hovered ? Infinity : 0 }}
              />
              <span className="relative z-10 text-sm font-mono uppercase tracking-widest text-slate-800">
                hover over me
              </span>
            </motion.div>

            {/* --- small metric chips that “make sense” for a dev agency --- */}
            <motion.div
              className="absolute -top-7 left-8"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: hovered ? 1 : 0.75, y: hovered ? 0 : -2 }}
              transition={{ duration: 0.3 }}
            >
              <Pill label="Lighthouse" value="98" active={hovered} />
            </motion.div>

            <motion.div
              className="absolute top-10 -right-4"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: hovered ? 1 : 0.75, x: hovered ? 0 : 2 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <Pill label="Core Web Vitals" value="Pass" active={hovered} />
            </motion.div>

            <motion.div
              className="absolute -bottom-5 right-10"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: hovered ? 1 : 0.75, y: hovered ? 0 : 2 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Pill label="WCAG" value="AA" active={hovered} />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-0.5 h-5 ${hovered ? 'bg-teal-300' : 'bg-slate-400'}`}
          />
          <span
            className={`text-xs font-mono tracking-widest ${
              hovered ? 'text-slate-200' : 'text-slate-400'
            }`}
          >
            SCROLL
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- tiny presentational helpers (used around the orb) ---------- */

function Pill({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div
      className={[
        'flex items-center gap-2 rounded-full px-3 py-1.5 shadow-sm border backdrop-blur',
        active
          ? 'bg-white/85 border-teal-300/60'
          : 'bg-white/70 border-slate-300/60',
      ].join(' ')}
    >
      <span
        className={[
          'h-1.5 w-1.5 rounded-full',
          active ? 'bg-teal-500' : 'bg-slate-400',
        ].join(' ')}
      />
      <span
        className={[
          'font-mono text-[11px]',
          active ? 'text-slate-600' : 'text-slate-500',
        ].join(' ')}
      >
        {label}
      </span>
      <span
        className={[
          'text-[12px] font-semibold',
          active ? 'text-slate-800' : 'text-slate-700',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * Four minimal “corner brackets” around the orb area.
 * side: tl | tr | bl | br
 */
function CornerBracket({ side, active }: { side: 'tl' | 'tr' | 'bl' | 'br'; active: boolean }) {
  const base =
    'pointer-events-none absolute h-8 w-8 opacity-60 md:opacity-70';
  const color = active ? 'border-teal-300' : 'border-slate-300';
  const pos =
    side === 'tl'
      ? '-top-8 -left-8'
      : side === 'tr'
      ? '-top-8 -right-8'
      : side === 'bl'
      ? '-bottom-8 -left-8'
      : '-bottom-8 -right-8';

  const borders =
    side === 'tl'
      ? 'border-t border-l rounded-tl-lg'
      : side === 'tr'
      ? 'border-t border-r rounded-tr-lg'
      : side === 'bl'
      ? 'border-b border-l rounded-bl-lg'
      : 'border-b border-r rounded-br-lg';

  return <div className={`${base} ${pos} ${color} ${borders}`} />;
}
