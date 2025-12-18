'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { m, useScroll, useTransform, useInView } from 'framer-motion';
import { Playfair_Display, Manrope, IBM_Plex_Mono, Orbitron, Alatsi } from 'next/font/google';
import { HOVER_TRANSITION } from './hoverTheme';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], preload: false });
const manrope = Manrope({ subsets: ['latin'], weight: ['700', '800'], preload: false });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'], preload: false });
const orbitron = Orbitron({ subsets: ['latin'], weight: ['700'], preload: false });
const alatsi = Alatsi({ subsets: ['latin'], weight: ['400'], preload: false });

const ORANGE = '#FF6A00';

type FramerOffset = NonNullable<Parameters<typeof useScroll>[0]>['offset'];
const asFramerOffset = (t: readonly [string, string]) => t as unknown as FramerOffset;

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
    <li ref={liRef} className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <m.div
          initial={{ opacity: 0, scaleY: 0.4 }}
          animate={{ opacity: inView ? 1 : 0, scaleY: inView ? 1 : 0.4 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="h-[42px] w-[6px] origin-center flex-shrink-0 rounded-full"
          style={{
            background: 'linear-gradient(180deg, #22D3A6, #22D3A6CC)',
            boxShadow: inView ? '0 8px 24px rgba(34,211,166,0.35)' : 'none',
          }}
        />

        <m.span
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 8,
            color: heroHovered ? '#e5f3ff' : '#020617',
          }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className={`${alatsi.className} block select-none text-[22px] md:text-[28px] font-bold tracking-[-0.02em]`}
        >
          {label}
        </m.span>
      </div>

      {label === 'Support' && null}
    </li>
  );
};

export default function WhyUs({ heroHovered = false }: { heroHovered?: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null);

  const HERO_OFFSET = asFramerOffset(['start end', 'end start']);
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: HERO_OFFSET });
  const skew = useTransform(heroProg, [0, 1], [0, -4]);
  const fade = useTransform(heroProg, [0, 1], [1, 0.96]);
  const scrambleActive = useInView(heroRef, { amount: 0, margin: '600px 0px' });

  const words = useMemo(
    () => [
      'Design',
      'Animation',
      'Google Optimization',
      'Performance',
      'Sales-Focused Design',
      'Content Management',
      'Support',
    ],
    []
  );

  return (
    <section id="why-us" className="relative w-full overflow-hidden pt-36 md:pt-48 pb-32 md:pb-44">
      {/* light background – same as hero default */}
      <m.div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: '#ffffff' }}
        animate={{ opacity: heroHovered ? 0 : 1 }}
        transition={HOVER_TRANSITION}
      />

      {/* dark background – same as hero hovered */}
      <m.div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: '#020617' }}
        animate={{ opacity: heroHovered ? 1 : 0 }}
        transition={HOVER_TRANSITION}
      />

      <div ref={heroRef} className="relative mx-auto max-w-[1400px] px-6 py-[12vh]">
        <m.div style={{ skewY: skew, opacity: fade }} className="relative">
          {/* DIGITAL / PRESENCE headline */}
          <div className="relative">
            {/* DIGITAL with glitch */}
            <div className="relative w-fit">
              <m.h2
                className={`${manrope.className} block select-none leading-[0.85] font-extrabold tracking-[-0.06em] text-[13vw] md:text-[8.2vw]`}
                animate={{ color: heroHovered ? '#e5f3ff' : '#020617' }}
                transition={HOVER_TRANSITION}
              >
                <span className="digital-glitch" data-text="DIGITAL">
                  DIGITAL
                </span>
              </m.h2>
            </div>

            {/* PRESENCE with glitch */}
            <m.div
              className={`${manrope.className} mt-[1.4vw] select-none leading-[0.86] font-extrabold tracking-[-0.07em] text-[17vw] md:text-[10.6vw] relative w-fit`}
              animate={{ color: heroHovered ? '#e5f3ff' : '#020617' }}
              transition={HOVER_TRANSITION}
            >
              <ScrambleWord active={scrambleActive} />
            </m.div>
          </div>

          {/* "why us?" label */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.45 }}
            className={`${playfair.className} absolute right-[15%] top-[5%] z-10 -rotate-6 italic hidden md:block`}
            animate={{
              color: heroHovered ? '#e5f3ff' : '#111827',
            }}
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              letterSpacing: '0.02em',
            }}
          >
            why&nbsp;us?
          </m.div>

          <m.span
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            className={`${mono.className} absolute right-[10.5%] top-[18.5%] z-20 hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-[0.9rem] -rotate-3`}
            animate={{
              backgroundColor: heroHovered ? '#020617' : '#ffffff',
              color: heroHovered ? '#e5f3ff' : '#0f172a',
              boxShadow: heroHovered
                ? '0 20px 55px rgba(15,23,42,0.6)'
                : '0 18px 40px rgba(15,23,42,0.2)',
            }}
            transition={HOVER_TRANSITION}
            style={{
              letterSpacing: '0.03em',
            }}
          >
            <m.span
              className="text-[0.82rem]"
              animate={{
                color: heroHovered ? '#e5e7eb' : '#4b5563',
              }}
              transition={HOVER_TRANSITION}
            >
              *because we put
            </m.span>
            <m.span
              className="inline-flex items-center rounded-full px-3 py-1 text-[0.78rem] font-bold uppercase tracking-[0.18em]"
              animate={{
                backgroundColor: heroHovered ? '#fb923c' : ORANGE,
                color: '#ffffff',
                boxShadow: heroHovered
                  ? '0 12px 30px rgba(249,115,22,0.8)'
                  : '0 10px 25px rgba(248,113,113,0.6)',
              }}
              transition={HOVER_TRANSITION}
            >
              YOU&nbsp;FIRST
            </m.span>
          </m.span>

          {/* What we offer + bullets */}
          <div className="relative mt-[8.2vh] md:mt-[8.8vh]">
            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[0.92fr_1.08fr]">
              <div className="flex items-start md:justify-end">
                <m.h3
                  className={`${orbitron.className} text-[9.2vw] leading-[0.9] md:text-[4.8vw] md:leading-[0.9] font-extrabold tracking-[-0.045em] text-left md:text-right`}
                  animate={{ color: heroHovered ? '#e5f3ff' : '#020617' }}
                  transition={HOVER_TRANSITION}
                >
                  What
                  <br className="hidden md:block" />
                  we&nbsp;offer
                </m.h3>
              </div>

              <div className="relative">
                <ul className="flex flex-col gap-4">
                  {words.map((label) => (
                    <BulletRow key={label} label={label} heroHovered={heroHovered} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

const SCRAMBLE_WORDS = ['PRESENCE', 'FOOTPRINT', 'VISION', 'IDENTITY'];
const SCRAMBLE_MAX = SCRAMBLE_WORDS.reduce((m, w) => Math.max(m, w.length), 0);
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = () => setPrefers(media.matches);
    listener();
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, []);

  return prefers;
}

type DisplayChar = { char: string; dud: boolean };

function ScrambleWord({ active }: { active: boolean }) {
  const pad = (word: string) => word.padEnd(SCRAMBLE_MAX, '\u00A0');
  const [display, setDisplay] = useState<DisplayChar[]>(
    pad(SCRAMBLE_WORDS[0]).split('').map((c) => ({ char: c, dud: false })),
  );
  const indexRef = useRef(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Avoid running the scramble loop until the section is near the viewport (saves CPU/TBT on mobile).
    if (!active) return;
    let raf: number | undefined;
    let timeout: number | undefined;
    let running = true;

    const holdDuration = 2000;

    const runScramble = () => {
      if (!running) return;
      const current = indexRef.current;
      const next = (current + 1) % SCRAMBLE_WORDS.length;
      const from = pad(SCRAMBLE_WORDS[current]);
      const to = pad(SCRAMBLE_WORDS[next]);

      if (reduceMotion) {
        setDisplay(to.split('').map((c) => ({ char: c, dud: false })));
        indexRef.current = next;
        timeout = window.setTimeout(runScramble, holdDuration);
        return;
      }

      type ScrambleFrame = { from: string; to: string; start: number; end: number; char: string };
      const queue: ScrambleFrame[] = [];
      for (let i = 0; i < Math.max(from.length, to.length); i += 1) {
        const start = Math.floor(Math.random() * 90);
        const end = start + Math.floor(Math.random() * 90);
        queue.push({
          from: from[i] || '',
          to: to[i] || '',
          start,
          end,
          char: '',
        });
      }

      let frame = 0;

      const update = () => {
        if (!running) return;
        let complete = 0;
        const out: DisplayChar[] = [];

        for (let i = 0; i < queue.length; i += 1) {
          const { from: f, to: t, start, end } = queue[i];
          if (frame >= end) {
            complete += 1;
            out.push({ char: t, dud: false });
          } else if (frame >= start) {
            queue[i].char =
              queue[i].char && Math.random() > 0.28
                ? queue[i].char
                : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            out.push({ char: queue[i].char, dud: true });
          } else {
            out.push({ char: f, dud: false });
          }
        }

        setDisplay(out);

        if (complete === queue.length) {
          indexRef.current = next;
          timeout = window.setTimeout(runScramble, holdDuration);
        } else {
          frame += 1;
          raf = requestAnimationFrame(update);
        }
      };

      raf = requestAnimationFrame(update);
    };

    timeout = window.setTimeout(runScramble, holdDuration);

    return () => {
      running = false;
      if (raf !== undefined) cancelAnimationFrame(raf);
      if (timeout !== undefined) clearTimeout(timeout);
    };
  }, [reduceMotion, active]);

  const dataText = display.map((c) => c.char).join('').replace(/\u00A0/g, ' ');

  return (
    <span
      className="digital-glitch block"
      data-text={dataText}
      style={{ minWidth: `${SCRAMBLE_MAX}ch` }}
    >
      {display.map((c, i) => (
        <span key={i} className={c.dud ? 'opacity-60' : undefined}>
          {c.char}
        </span>
      ))}
    </span>
  );
}
