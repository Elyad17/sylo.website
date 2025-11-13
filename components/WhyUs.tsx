'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Playfair_Display, Manrope, IBM_Plex_Mono } from 'next/font/google';

/* ============================== FONTS ============================== */
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const manrope = Manrope({ subsets: ['latin'], weight: ['700', '800'] });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] });

/* ============================== THEME ============================== */
const ORANGE = '#FF6A00';
const MINT = '#22D3A6';

/* ======== Helper: satisfy Framer’s template-literal offset type ======== */
type FramerOffset = NonNullable<Parameters<typeof useScroll>[0]>['offset'];
const asFramerOffset = (t: readonly [string, string]) => t as unknown as FramerOffset;

/* ---------- Single bullet row with bar segment + label ---------- */
interface BulletRowProps {
  label: string;
}

const BulletRow: React.FC<BulletRowProps> = ({ label }) => {
  const liRef = useRef<HTMLLIElement | null>(null);

  // This single flag controls BOTH the label and the bar segment
  const inView = useInView(liRef, {
    amount: 0.55,
    margin: '0px 0px -20% 0px',
  });

  return (
    <li ref={liRef} className="flex items-center gap-4">
      {/* bar segment that lines up exactly with this word */}
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

      {/* label – driven by the SAME inView flag */}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className={`${manrope.className} block select-none text-[22px] md:text-[28px] font-extrabold tracking-[-0.02em] text-slate-900`}
      >
        {label}
      </motion.span>
    </li>
  );
};

/* =============================== MAIN =============================== */
export default function WhyUs() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle transform for the hero block
  const HERO_OFFSET = asFramerOffset(['start end', 'end start']);
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: HERO_OFFSET });
  const skew = useTransform(heroProg, [0, 1], [0, -6]);
  const fade = useTransform(heroProg, [0, 1], [1, 0.94]);

  const words = useMemo(
    () => ['Design', 'Animation', 'SEO', 'Performance', 'CRO', 'CMS', 'Support'],
    []
  );

  return (
    <section id="why-us" className="relative w-full overflow-hidden bg-white text-slate-900">
      <div ref={heroRef} className="relative mx-auto max-w-[1400px] px-6 py-[12vh]">
        {/* ===================== HERO ===================== */}
        <motion.div style={{ skewY: skew, opacity: fade }} className="relative">
          <div className="relative">
            {/* DIGITAL */}
            <div className="relative w-fit">
              <span
                className={`${manrope.className} block select-none text-[15vw] leading-[0.82] font-extrabold tracking-[-0.055em]`}
              >
                <span className="relative inline-block">
                  <span
                    className="relative"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(15,23,42,1), rgba(15,23,42,0.9))',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Digital
                  </span>
                </span>
              </span>
            </div>

            {/* PRESENCE */}
            <div
              className={`${manrope.className} mt-[1.6vw] select-none text-[16.5vw] leading-[0.84] font-extrabold tracking-[-0.055em] text-[#0f1b31] relative w-fit`}
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
            className={`${playfair.className} pointer-events-none absolute right-[15%] top-[6%] z-10 -rotate-6 text-[6vw] italic text-slate-800/85`}
          >
            why&nbsp;us?
          </motion.div>

          {/* chip */}
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className={`${mono.className} absolute right-[12.2%] top-[18.6%] z-20 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/95 px-4 py-2 text-[0.9rem] text-slate-800 shadow-[0_10px_30px_rgba(2,6,23,0.06)] backdrop-blur -rotate-6`}
          >
            <span>*because we put</span>
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold text-white"
              style={{
                backgroundColor: ORANGE,
                boxShadow: '0 8px 20px rgba(255,106,0,0.35)',
                letterSpacing: '0.04em',
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
                  className={`${manrope.className} text-[9.2vw] leading-[0.9] md:text-[4.6vw] md:leading-[0.9] font-extrabold tracking-[-0.045em] text-slate-900 text-left md:text-right`}
                >
                  What
                  <br className="hidden md:block" />
                  we&nbsp;offer
                </h3>
              </div>

              {/* right: list with perfectly synced segments */}
              <div className="relative">
                <ul className="flex flex-col gap-4">
                  {words.map((label) => (
                    <BulletRow key={label} label={label} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
