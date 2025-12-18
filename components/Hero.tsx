'use client';

import { useEffect, useState } from 'react';
import { m, useAnimation } from 'framer-motion';
import { HOVER_TRANSITION } from './hoverTheme';
import ContactModal from './ContactModal';

type HeroProps = {
  hovered: boolean;
  setHovered: (value: boolean) => void;
};

export default function Hero({ hovered, setHovered }: HeroProps) {
  const ticks = useAnimation();
  const typingText = 'scroll down';
  const [visibleText, setVisibleText] = useState('');
  const [eraseCount, setEraseCount] = useState(0);
  const [mode, setMode] = useState<'typing' | 'erasing'>('typing');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    ticks.start({
      rotate: 360,
      transition: { duration: 18, ease: 'linear', repeat: Infinity },
    });
  }, [ticks]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mode === 'typing') {
        setVisibleText((prev) => {
          const nextLen = prev.length + 1;
          if (nextLen >= typingText.length) {
            setMode('erasing');
            return typingText;
          }
          return typingText.slice(0, nextLen);
        });
      } else {
        setEraseCount((prev) => {
          const next = prev + 1;
          if (next > typingText.length) {
            setMode('typing');
            setVisibleText('');
            return 0;
          }
          return next;
        });
      }
    }, 140);

    return () => clearInterval(interval);
  }, [mode, typingText.length]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handle = () => setIsMobile(mq.matches);
    handle();
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  const ringRadius = hovered ? 145 : 115;
  const lines = [
    { text: 'WEBSITES', align: 'text-center md:text-left md:-ml-6 lg:-ml-28' },
    { text: 'THAT STAND', align: 'text-center md:text-left md:pl-0 lg:pl-2 whitespace-nowrap' },
    { text: 'OUT', align: 'text-center md:text-left md:ml-90 lg:ml 120' },
  ];
  const chars = typingText.split('');

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      {/* LIGHT background – same as WhyUs default */}
      <m.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: '#ffffff',
        }}
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={HOVER_TRANSITION}
      />

      {/* DARK background – same as WhyUs hovered */}
      <m.div
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
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <m.div
              animate={{ color: hovered ? '#ffffff' : '#0f172a' }}
              transition={HOVER_TRANSITION}
              className="text-2xl font-semibold tracking-tight flex-shrink-0"
            >
              PixlBuilder
            </m.div>

            <nav className="hidden md:flex items-center justify-end space-x-0 min-w-[110px]">
              <ContactModal
                showTrigger={false}
                renderTrigger={(open) => (
                  <m.button
                    onClick={open}
                    animate={{ color: hovered ? '#f1f5f9' : '#0f172a' }}
                    whileHover={{ color: hovered ? '#5eead4' : '#0d9488' }}
                    transition={HOVER_TRANSITION}
                    className="cursor-pointer text-sm font-semibold uppercase tracking-[0.16em] w-full text-right inline-flex justify-end focus:outline-none focus:ring-0"
                  >
                    Contact
                  </m.button>
                )}
              />
            </nav>
            {isMobile && (
              <div className="md:hidden flex-1 flex justify-end">
                <ContactModal
                  showTrigger={false}
                  renderTrigger={(open) => (
                    <button
                      onClick={open}
                      className="cursor-pointer rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 shadow-sm"
                    >
                      Contact
                    </button>
                  )}
                />
              </div>
            )}
          </div>
        </header>

        <div className="pt-24 min-h-[88vh] flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-12">
            {/* Text column */}
            <div className="text-center md:text-left md:pl-2 lg:pl-6 xl:pl-10">
              <h1 className="space-y-2 md:space-y-3 lg:space-y-4 md:max-w-5xl">
                {lines.map((line, idx) => (
                  <span
                    key={line.text}
                    className={[
                      'font-[var(--font-bree)]',
                      'block',
                      'hero-line-reveal',
                      'text-[clamp(3rem,8vw,4.4rem)] sm:text-[clamp(3.6rem,7vw,5.6rem)] lg:text-[clamp(4.4rem,6vw,6.4rem)] xl:text-[clamp(4.8rem,5.5vw,7rem)]',
                      'font-extrabold leading-[0.9] tracking-[-0.05em] uppercase',
                      line.align,
                    ].join(' ')}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <m.span
                      animate={{ color: hovered ? '#e6fffb' : '#0f172a' }}
                      transition={HOVER_TRANSITION}
                      className="block"
                    >
                      {line.text}
                    </m.span>
                  </span>
                ))}
              </h1>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
                className="mt-4 h-6 text-center md:text-left md:pl-32 lg:pl-52"
              >
                <m.span
                  animate={{ color: hovered ? '#cbd5e1' : '#475569' }}
                  transition={HOVER_TRANSITION}
                  className="relative inline-flex items-center gap-3 text-base tracking-[0.04em] uppercase whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-geo)',
                    minHeight: '1.5rem',
                    minWidth: `${typingText.length + 2}ch`,
                  }}
                >
                  <span className="invisible whitespace-nowrap">{`${typingText} ▼`}</span>
                  <span className="absolute inset-0 inline-flex items-center gap-2 whitespace-nowrap">
                    <span className="inline-flex">
                      {chars.map((char, i) => {
                        const show = mode === 'typing' ? i < visibleText.length : i >= eraseCount;
                        if (char === ' ') {
                          return (
                            <span
                              key={`space-${i}`}
                              className="inline-block"
                              style={{
                                width: '1.6ch',
                                visibility: show ? 'visible' : 'hidden',
                              }}
                            >
                              &nbsp;
                            </span>
                          );
                        }
                        return (
                          <span
                            key={`${char}-${i}`}
                            className="inline-block"
                            style={{
                              visibility: show ? 'visible' : 'hidden',
                            }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                    <m.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      ▼
                    </m.span>
                  </span>
                </m.span>
              </m.div>


            </div>

            {/* Orb + HUD */}
            {!isMobile && (
            <div className="relative flex justify-center items-center">
              {/* Rings */}
              <svg
                viewBox="0 0 440 440"
                className="pointer-events-none absolute -z-10 w-[clamp(18rem,32vw,28rem)] h-[clamp(18rem,32vw,28rem)]"
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
              <m.div
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
              </m.div>

              {/* Corners */}
              <CornerBracket side="tl" active={hovered} />
              <CornerBracket side="tr" active={hovered} />
              <CornerBracket side="bl" active={hovered} />
              <CornerBracket side="br" active={hovered} />

              {/* Orb (controls hover) */}
              <m.div
                onMouseEnter={() => {
                  if (!isMobile) setHovered(true);
                }}
                onMouseLeave={() => {
                  if (!isMobile) setHovered(false);
                }}
                className="w-[clamp(11.5rem,22vw,16rem)] h-[clamp(11.5rem,22vw,16rem)] md:w-[clamp(12.5rem,20vw,18rem)] md:h-[clamp(12.5rem,20vw,18rem)] rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden z-10"
                whileHover={
                  isMobile
                    ? undefined
                    : {
                        scale: 1.12,
                        boxShadow:
                          '0 0 0 8px rgba(20,184,166,0.15), 0 25px 60px rgba(0,0,0,0.25)',
                      }
                }
                transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              >
                <m.div
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
                <m.div
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
                <m.span
                  animate={{
                    color: hovered ? '#e0f2f1' : '#0f172a',
                  }}
                  transition={HOVER_TRANSITION}
                  className="relative z-10 text-sm font-mono uppercase tracking-widest"
                >
                  hover over me
                </m.span>
              </m.div>

              {/* Small metric pills */}
              <m.div
                className="absolute -top-7 left-8"
                animate={{ opacity: hovered ? 1 : 0.75 }}
                transition={HOVER_TRANSITION}
              >
                <Pill label="Higher Conversions" active={hovered} />
              </m.div>
              <m.div
                className="absolute top-10 -right-4"
                animate={{ opacity: hovered ? 1 : 0.75 }}
                transition={HOVER_TRANSITION}
              >
                <Pill label="Seamless Flow" active={hovered} />
              </m.div>
              <m.div
                className="absolute -bottom-5 right-10"
                animate={{ opacity: hovered ? 1 : 0.75 }}
                transition={HOVER_TRANSITION}
              >
                <Pill label="SEO Optimized" active={hovered} />
              </m.div>
            </div>
            )}
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
  value?: string;
  active: boolean;
}) {
  return (
    <m.div
      animate={{
        backgroundColor: active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.7)',
        borderColor: active ? 'rgba(94,234,212,0.6)' : 'rgba(203,213,225,0.6)',
        color: active ? '#0f172a' : '#334155',
      }}
      transition={HOVER_TRANSITION}
      className="flex items-center gap-2 rounded-full px-3 py-1.5 shadow-sm border backdrop-blur"
    >
      <m.span
        animate={{ backgroundColor: active ? '#14b8a6' : '#94a3b8' }}
        transition={HOVER_TRANSITION}
        className="h-1.5 w-1.5 rounded-full"
      />
      <span className="font-mono text-[11px]">{label}</span>
      {value ? <span className="text-[12px] font-semibold">{value}</span> : null}
    </m.div>
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
