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

          {/* Orb */}
          <div className="relative flex justify-center items-center">
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

            <motion.div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="w-56 h-56 md:w-72 md:h-72 rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden"
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
