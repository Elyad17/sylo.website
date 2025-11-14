'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Playfair_Display, Manrope, IBM_Plex_Mono } from 'next/font/google';

/* ============================== FONTS ============================== */
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const manrope = Manrope({ subsets: ['latin'], weight: ['700', '800'] });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] });

/* ============================== THEME ============================== */
const ACCENT_BLUE = '#2563eb';
const MINT = '#22D3A6';
const ORANGE = '#FF6A00';

/* ======== Helper: satisfy Framer’s template-literal offset type ======== */
type FramerOffset = NonNullable<Parameters<typeof useScroll>[0]>['offset'];
const asFramerOffset = (t: readonly [string, string]) => t as unknown as FramerOffset;

/* ---------- Single bullet row with bar segment + label ---------- */
interface BulletRowProps {
  label: string;
  heroHovered: boolean;
}

const BulletRow: React.FC<BulletRowProps> = ({ label, heroHovered }) => {
  const liRef = useRef<HTMLLIElement | null>(null);

  const inView = useInView(liRef, {
    amount: 0.55,
    margin: '0px 0px -20% 0px',
  });

  return (
    <li ref={liRef} className="flex items-center gap-4">
      {/* bar segment lined up with this word */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0.4 }}
        animate={{ opacity: inView ? 1 : 0, scaleY: inView ? 1 : 0.4 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="h-[42px] w-[6px] origin-center flex-shrink-0 rounded-full"
        style={{
          background: `linear-gradient(180deg, ${MINT}, ${MINT}CC)`,
          boxShadow: inView ? '0 8px 24px rgba(34,211,166,0.35)' : 'none',
        }}
      />

      {/* label */}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className={`${manrope.className} block select-none text-[22px] md:text-[28px] font-extrabold tracking-[-0.02em]`}
        style={{ color: heroHovered ? '#e2e8f0' : '#020617' }}
      >
        {label}
      </motion.span>
    </li>
  );
};

/* =============================== MAIN =============================== */

export default function WhyUs({ heroHovered = false }: { heroHovered?: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null);

  const HERO_OFFSET = asFramerOffset(['start end', 'end start']);
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: HERO_OFFSET });
  const skew = useTransform(heroProg, [0, 1], [0, -4]);
  const fade = useTransform(heroProg, [0, 1], [1, 0.96]);

  const words = useMemo(
    () => ['Design', 'Animation', 'SEO', 'Performance', 'CRO', 'CMS', 'Support'],
    []
  );

  const bgLight = '#f4f4f5';
  const bgDark = '#020617';

  return (
    <motion.section
      id="why-us"
      className="relative w-full overflow-hidden"
      animate={{
        backgroundColor: heroHovered ? bgDark : bgLight,
      }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div
        ref={heroRef}
        className="relative mx-auto max-w-[1400px] px-6 py-[12vh]"
      >
        {/* ===================== HEADLINE BLOCK ===================== */}
        <motion.div style={{ skewY: skew, opacity: fade }} className="relative">
          <div className="relative">
            {/* DIGITAL – split color: 'Dig' dark, 'ital' blue */}
            <div className="relative w-fit">
              <span
                className={`${manrope.className} block select-none leading-[0.85] font-extrabold tracking-[-0.06em] text-[13vw] md:text-[8.2vw]`}
                style={{ color: heroHovered ? '#f9fafb' : '#020617' }}
              >
                <span className="relative inline-block">
                  <span>Dig</span>
                  <span
                    style={{
                      color: heroHovered ? '#60a5fa' : ACCENT_BLUE,
                      marginLeft: '0.04em',
                    }}
                  >
                    ital
                  </span>
                </span>
              </span>
            </div>

            {/* PRESENCE */}
            <div
              className={`${manrope.className} mt-[1.4vw] select-none leading-[0.86] font-extrabold tracking-[-0.07em] text-[17vw] md:text-[10.6vw] relative w-fit`}
              style={{ color: heroHovered ? '#f9fafb' : '#020617' }}
            >
              <span className="block">PRESENCE</span>
            </div>
          </div>

          {/* why us? */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.45 }}
            className={`${playfair.className} absolute right-[15%] top-[5%] z-10 -rotate-6 italic`}
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              color: heroHovered ? '#e5e7eb' : '#111827',
              letterSpacing: '0.02em',
            }}
          >
            why&nbsp;us?
          </motion.div>

          {/* white pill + orange "YOU FIRST" badge */}
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className={`${mono.className} absolute right-[10.5%] top-[18.5%] z-20 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[0.9rem] -rotate-3`}
            style={{
              backgroundColor: '#ffffff',
              color: '#0f172a',
              boxShadow: '0 18px 40px rgba(15,23,42,0.2)',
              letterSpacing: '0.03em',
            }}
          >
            <span className="text-[0.82rem] text-slate-700">
              *because we put
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[0.78rem] font-bold uppercase tracking-[0.18em]"
              style={{
                backgroundColor: ORANGE,
                color: '#ffffff',
                boxShadow: '0 10px 25px rgba(248,113,113,0.6)',
              }}
            >
              YOU&nbsp;FIRST
            </span>
          </motion.span>

          {/* ===================== WHAT WE OFFER ===================== */}
          <div className="relative mt-[8.2vh] md:mt-[8.8vh]">
            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[0.92fr_1.08fr]">
              {/* left heading */}
              <div className="flex items-start md:justify-end">
                <h3
                  className={`${manrope.className} text-[9.2vw] leading-[0.9] md:text-[4.8vw] md:leading-[0.9] font-extrabold tracking-[-0.045em] text-left md:text-right`}
                  style={{ color: heroHovered ? '#e5e7eb' : '#020617' }}
                >
                  What
                  <br className="hidden md:block" />
                  we&nbsp;offer
                </h3>
              </div>

              {/* right: list with synced segmented bar */}
              <div className="relative">
                <ul className="flex flex-col gap-4">
                  {words.map((label) => (
                    <BulletRow key={label} label={label} heroHovered={heroHovered} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
