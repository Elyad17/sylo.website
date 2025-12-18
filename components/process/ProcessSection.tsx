"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { m, useInView, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

type Step = {
  id: number;
  title: string;
};

const STEPS: Step[] = [
  { id: 1, title: 'You submit brief description' },
  { id: 2, title: 'We make sitemap + wireframe' },
  { id: 3, title: 'You approve sitemap + wireframe' },
  { id: 4, title: 'We make design' },
  { id: 5, title: 'You approve design' },
  { id: 6, title: 'We build the site' },
  { id: 7, title: 'Launch website' },
];

type ProcessSectionVariant = 'page' | 'overlay';

const ProcessRive = dynamic(() => import('./ProcessRive'), { ssr: false });
const CubeTransition = dynamic(() => import('./CubeTransition'), { ssr: false });

export function ProcessSection({ variant = 'page' }: { variant?: ProcessSectionVariant }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lastStepRef = useRef<HTMLDivElement | null>(null);
  const [timelineReady, setTimelineReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [progress, setProgress] = useState(0);
  const completionProgressRef = useRef<number | null>(null);
  const lastStepInViewRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const sectionNearViewport = useInView(sectionRef, { amount: 0, margin: '900px 0px' });
  const [loadRive, setLoadRive] = useState(false);

  const lastStepInView = useInView(lastStepRef, {
    amount: 0,
    margin: '0px 0px -50% 0px',
  });

  useEffect(() => {
    lastStepInViewRef.current = lastStepInView;
  }, [lastStepInView]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handle = () => setIsDesktop(mq.matches);
    handle();
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  useEffect(() => {
    if (variant !== 'page') return;
    if (sectionNearViewport) setLoadRive(true);
  }, [sectionNearViewport, variant]);

  useEffect(() => {
    if (isDesktop) void import('./CubeTransition');
  }, [isDesktop]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (variant !== 'page') return;
    const clamped = Math.max(0, Math.min(1, v));
    setProgress(clamped);

    const lastStepVisible = lastStepInViewRef.current;
    const currentCompletion = completionProgressRef.current;
    if (lastStepVisible && currentCompletion === null) {
      completionProgressRef.current = clamped;
    } else if (currentCompletion !== null && clamped < Math.max(currentCompletion - 0.2, 0.4)) {
      completionProgressRef.current = null;
    }
  });

  useEffect(() => {
    const t = setTimeout(() => setTimelineReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Align bar finish with the transition trigger so it reaches 100 smoothly right at the flip start
  // Desktop flip timing (restored): start at 75% and span the final 25% for a smoother play
  const overlayStart = 0.75;
  const overlaySpan = 0.25; // final quarter drives the flip
  const targetProgress = overlayStart; // bar hits 100 when rotation begins
  const normalizedProgress = Math.min(targetProgress > 0 ? progress / targetProgress : 0, 1);
  const computedFill = Math.min(normalizedProgress * 100, 100);
  const progressPercent = useMemo(() => Math.round(computedFill), [computedFill]);

  const overlayProgress = Math.min(Math.max((progress - overlayStart) / overlaySpan, 0), 1);
  const overlayActive = isDesktop && overlayProgress > 0 && overlayProgress <= 1;

  // Make the vertical line advance faster so it doesn't lag behind the bar
  const timelineFillScale = useTransform(scrollYProgress, [0, overlayStart], [0, 1], { clamp: true });

  if (variant === 'overlay') {
    const totalSteps = STEPS.length;
    const finalStep = STEPS[STEPS.length - 1];
    return (
      <section
        ref={sectionRef}
        className="relative w-full pt-0 pb-16 sm:pb-20 text-slate-700"
        style={{
          background: '#e5e7eb',
        }}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 sm:px-6 md:px-10">
          <div className="w-full max-w-[980px] rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <span>{`Step ${String(totalSteps).padStart(2, '0')} / ${String(totalSteps).padStart(2, '0')}`}</span>
              <span>100%</span>
            </div>
            <div className="mt-4 h-3 rounded-full bg-slate-200/80">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-[#43E1BC] via-[#41D8FF] to-[#4A63FF] shadow-[0_10px_30px_rgba(65,216,255,0.35)]" />
            </div>
          </div>

          <div className="flex w-full max-w-4xl flex-col items-center justify-center">
            <div className="h-10 w-[3px] rounded-full bg-[#4b89ff] shadow-[0_0_25px_rgba(77,106,255,0.25)] -mb-1" />
            <article
              className="group relative mt-1 w-[88%] max-w-2xl md:w-[58%] rounded-3xl border border-white/60 bg-white/78 px-6 py-8 text-center shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl transition duration-300"
              style={{
                boxShadow:
                  '0 16px 50px rgba(15,23,42,0.08), 0 0 25px rgba(77,106,255,0.12)',
              }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/50 ring-offset-0 transition duration-300 group-hover:ring-[#7fb8ff]/80" />
              <div className="text-lg font-semibold text-slate-900 font-[var(--font-noto-old-uyghur)] -mt-1">
                {finalStep.id}
              </div>
              <h3 className="mt-4 font-[var(--font-noto-old-uyghur)] text-2xl font-semibold text-slate-900 sm:text-[26px] leading-tight">
                {finalStep.title}
              </h3>
            </article>
          </div>
        </div>
        <div ref={lastStepRef} className="h-px w-px opacity-0" aria-hidden />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 text-slate-700"
      style={{
        background: 'linear-gradient(150deg, #ffffff 0%, #ffffff 32%, #e5e7eb 32%, #e5e7eb 100%)',
      }}
    >
      {isDesktop && <CubeTransition active={overlayActive} progress={overlayProgress} />}

      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 h-50 w-50 md:h-54 md:w-54">
            {loadRive ? <ProcessRive /> : null}
          </div>
          <h2 className="font-serif text-4xl font-semibold text-slate-900 sm:text-5xl">
            Steps to launch
          </h2>
        </div>

        <div className="sticky top-0 z-30 mt-12">
          <div className="rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <span>{`Step ${String(Math.round(normalizedProgress * STEPS.length)).padStart(2, '0')} / ${String(STEPS.length).padStart(2, '0')}`}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="mt-4 h-3 rounded-full bg-slate-200/80">
              <m.div
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#43E1BC] via-[#41D8FF] to-[#4A63FF] shadow-[0_10px_30px_rgba(65,216,255,0.35)] will-change-transform"
                style={{ scaleX: normalizedProgress }}
              />
            </div>
          </div>
        </div>
        <div className="relative mt-16 flex justify-center">
          <div className="relative z-0 w-full max-w-4xl">
            {timelineReady && (
              <>
                <div
                  className="pointer-events-none absolute top-0 z-0 h-full w-px bg-white/60 backdrop-blur"
                  style={{ left: '50%', marginLeft: '-0.5px' }}
                />
                <m.div
                  className="pointer-events-none absolute top-0 z-0 h-full w-[3px] origin-top rounded-full bg-gradient-to-b from-[#42DFBB] via-[#41D8FF] to-[#4D6AFF] shadow-[0_0_25px_rgba(77,106,255,0.25)] will-change-transform"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ scaleY: timelineFillScale, left: '50%', marginLeft: '-1.5px' }}
                />
              </>
            )}

            <div className="relative z-10 space-y-20 sm:space-y-24">
              {STEPS.map((step) => {
                return (
                  <div key={step.id} className="relative flex w-full justify-center">
                    <article
                      className="group relative w-[88%] max-w-2xl md:w-[58%] rounded-3xl border border-white/60 bg-white/85 px-6 py-8 text-center shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(77,106,255,0.16)]"
                      style={{
                        boxShadow:
                          '0 16px 50px rgba(15,23,42,0.08), 0 0 25px rgba(77,106,255,0.12)',
                      }}
                    >
                      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/50 ring-offset-0 transition duration-300 group-hover:ring-[#7fb8ff]/80" />

                      <div className="flex items-center justify-center">
                        <span className="text-lg font-semibold text-slate-900 -mt-1 font-[var(--font-noto-old-uyghur)]">
                          {step.id}
                        </span>
                      </div>
                      <h3 className="mt-4 font-[var(--font-noto-old-uyghur)] text-2xl font-semibold text-slate-900 sm:text-[26px]">
                        {step.title}
                      </h3>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div ref={lastStepRef} className="mt-24 h-[70vh] sm:h-[90vh] md:h-[120vh]" />
      </div>
    </section>
  );
}
