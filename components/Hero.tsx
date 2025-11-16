'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { HOVER_TRANSITION } from './hoverTheme';

type HeroProps = {
  hovered: boolean;
  setHovered: (value: boolean) => void;
};

export default function Hero({ hovered, setHovered }: HeroProps) {
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
    <section className="relative min-h-[88vh] overflow-hidden">
      {/* LIGHT background – same as WhyUs default */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: '#f8fafc',
        }}
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={HOVER_TRANSITION}
      />

      {/* DARK background – same as WhyUs hovered */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: '#020617',
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={HOVER_TRANSITION}
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* Navbar */}
        <header className="absolute top-0 w-full z-50 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div
              animate={{ color: hovered ? '#ffffff' : '#0f172a' }}
              transition={HOVER_TRANSITION}
              className="text-2xl font-semibold tracking-tight"
            >
              Sylo
            </motion.div>

            <nav className="hidden md:flex space-x-8">
              {['Services', 'Process', 'Contact'].map((label) => (
                <motion.a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  animate={{ color: hovered ? '#f1f5f9' : '#0f172a' }}
                  whileHover={{
                    color: hovered ? '#5eead4' : '#0d9488',
                  }}
                  transition={HOVER_TRANSITION}
                  className="transition-colors"
                >
                  {label}
                </motion.a>
              ))}
            </nav>
          </div>
        </header>

        <div className="pt-24 min-h-[88vh] flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            {/* Text column */}
            <div className="text-center md:text-left">
              {lines.map((text) => (
                <motion.h1
                  key={text}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="font-display text-5xl md:text-7xl font-black leading-tight tracking-tight"
                >
                  <motion.span
                    animate={{ color: hovered ? '#e6fffb' : '#0f172a' }}
                    transition={HOVER_TRANSITION}
                  >
                    {text}
                  </motion.span>
                </motion.h1>
              ))}

              <motion.p
                animate={{
                  color: hovered ? 'rgba(226,232,240,0.9)' : '#475569',
                }}
                transition={HOVER_TRANSITION}
                className="mt-6 text-base md:text-lg max-w-lg mx-auto md:mx-0"
              >
                We build immersive, high-performance sites where motion,
                interaction, and speed work together.
              </motion.p>

              <motion.a
                href="#contact"
                whileHover={{
                  backgroundColor: hovered ? '#14b8a6' : '#0d9488',
                }}
                transition={{ duration: 0.3 }}
                className="inline-block mt-8 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-7 rounded-full shadow-lg transition-colors"
              >
                Get Started
              </motion.a>
            </div>

            {/* Orb + HUD */}
            <div className="relative flex justify-center items-center">
              {/* Rings */}
              <svg
                width="440"
                height="440"
                viewBox="0 0 440 440"
                className="pointer-events-none absolute -z-10"
                style={{ opacity: hovered ? 0.85 : 0.4 }}
              >
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

              {/* Rotating ticks */}
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
                      transform: `rotate(${i * 10}deg) translateY(-${
                        hovered ? ringRadius : ringRadius
                      }px)`,
                      opacity: i % 2 === 0 ? 0.85 : 0.55,
                    }}
                  />
                ))}
              </motion.div>

              {/* Corners */}
              <CornerBracket side="tl" active={hovered} />
              <CornerBracket side="tr" active={hovered} />
              <CornerBracket side="bl" active={hovered} />
              <CornerBracket side="br" active={hovered} />

              {/* Orb (controls hover) */}
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
                <motion.span
                  animate={{
                    color: hovered ? '#e0f2f1' : '#0f172a',
                  }}
                  transition={HOVER_TRANSITION}
                  className="relative z-10 text-sm font-mono uppercase tracking-widest"
                >
                  hover over me
                </motion.span>
              </motion.div>

              {/* Small metric pills */}
              <motion.div
                className="absolute -top-7 left-8"
                animate={{ opacity: hovered ? 1 : 0.75 }}
                transition={HOVER_TRANSITION}
              >
                <Pill label="Lighthouse" value="98" active={hovered} />
              </motion.div>
              <motion.div
                className="absolute top-10 -right-4"
                animate={{ opacity: hovered ? 1 : 0.75 }}
                transition={HOVER_TRANSITION}
              >
                <Pill label="Core Web Vitals" value="Pass" active={hovered} />
              </motion.div>
              <motion.div
                className="absolute -bottom-5 right-10"
                animate={{ opacity: hovered ? 1 : 0.75 }}
                transition={HOVER_TRANSITION}
              >
                <Pill label="WCAG" value="AA" active={hovered} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <motion.div
      animate={{
        backgroundColor: active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.7)',
        borderColor: active ? 'rgba(94,234,212,0.6)' : 'rgba(203,213,225,0.6)',
        color: active ? '#0f172a' : '#334155',
      }}
      transition={HOVER_TRANSITION}
      className="flex items-center gap-2 rounded-full px-3 py-1.5 shadow-sm border backdrop-blur"
    >
      <motion.span
        animate={{ backgroundColor: active ? '#14b8a6' : '#94a3b8' }}
        transition={HOVER_TRANSITION}
        className="h-1.5 w-1.5 rounded-full"
      />
      <span className="font-mono text-[11px]">{label}</span>
      <span className="text-[12px] font-semibold">{value}</span>
    </motion.div>
  );
}

function CornerBracket({
  side,
  active,
}: {
  side: 'tl' | 'tr' | 'bl' | 'br';
  active: boolean;
}) {
  const base = 'pointer-events-none absolute h-8 w-8 opacity-60 md:opacity-70';
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
