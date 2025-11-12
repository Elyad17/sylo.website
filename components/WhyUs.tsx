'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Playfair_Display, Manrope, IBM_Plex_Mono } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const manrope = Manrope({ subsets: ['latin'], weight: ['700', '800'] });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'] });

export default function WhyUs() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // subtle section skew/fade
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] });
  const skew = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // card motion
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-1.8, -4]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -6]);

  return (
    <section id="why-us" className="relative min-h-[120vh] w-full overflow-hidden bg-white text-neutral-900">
      {/* monochrome sheen keyframes */}
      <style jsx global>{`
        @keyframes monoSheen {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>

      <div ref={wrapRef} className="relative mx-auto max-w-[1400px] px-6 py-[12vh]">
        <motion.div style={{ skewY: skew, opacity: fade }} className="relative">
          {/* Huge title */}
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`${manrope.className} relative z-10 select-none text-[22vw] leading-[0.75] font-extrabold tracking-[-0.065em]`}
          >
            Your
            <span className="block">BRAND</span>
          </motion.h2>

          {/* serif accent */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${playfair.className} pointer-events-none absolute right-[10%] top-[14%] z-20 rotate-[-6deg] text-[7vw] italic`}
          >
            why&nbsp;us?
          </motion.div>

          {/* CHIP — monochrome “YOU FIRST” with metallic sheen + underline */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className={`${mono.className} absolute right-0 top-[46%] z-20 rounded-md bg-black/95 px-4 py-2 text-[0.9rem] text-white shadow-md`}
          >
            *because we put{' '}
            <span className="relative inline-block font-extrabold uppercase tracking-wide leading-none">
              {/* metallic grayscale sheen (no colors) */}
              <span
                className="bg-[linear-gradient(90deg,#ffffff_0%,#e7e7e7_35%,#ffffff_70%)] bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'monoSheen 3s linear infinite',
                }}
              >
                YOU&nbsp;FIRST
              </span>
              {/* subtle underline that draws in */}
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left rounded-full bg-white/90"
              />
            </span>
          </motion.span>

          {/* ===== GUARANTEE CARD (centered headline, keeps label, rotates on scroll) ===== */}
          <motion.div
            style={{ rotate: cardRotate, y: cardY }}
            initial={{ opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="relative mt-[6vh] max-w-3xl"
          >
            <div className="relative w-full overflow-hidden rounded-xl border border-neutral-200/80 bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur">
              <div className="relative h-[130px]">
                {/* label pinned to top */}
                <span
                  className={`${mono.className} pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 text-[11px] uppercase tracking-[0.25em] text-neutral-400`}
                >
                  Not happy?
                </span>

                {/* headline perfectly centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-wrap items-baseline justify-center gap-3 text-center">
                    <span className={`${manrope.className} text-[34px] font-extrabold leading-none`}>
                      100% MONEY-BACK
                    </span>
                    <span
                      className={`${manrope.className} text-[30px] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px] [-webkit-text-stroke-color:#0a0a0a]`}
                    >
                      GUARANTEE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* ===== /GUARANTEE CARD ===== */}
        </motion.div>
      </div>
    </section>
  );
}
