"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import CubeTransition from './CubeTransition';

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

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lastStepRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [progress, setProgress] = useState(0);
  const [completionProgress, setCompletionProgress] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const lastStepInView = useInView(lastStepRef, {
    amount: 0,
    margin: '0px 0px -50% 0px',
  });

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handle = () => setIsDesktop(mq.matches);
    handle();
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    setProgress(clamped);
  });

  useEffect(() => {
    if (lastStepInView && completionProgress === null) {
      setCompletionProgress(progress);
    }
  }, [lastStepInView, completionProgress, progress]);

  useEffect(() => {
    if (completionProgress !== null && progress < Math.max(completionProgress - 0.2, 0.4)) {
      setCompletionProgress(null);
    }
  }, [completionProgress, progress]);

  // Align bar finish with the transition trigger so it reaches 100 smoothly right at the flip start
  // Desktop flip timing (restored): start at 75% and span the final 25% for a smoother play
  const overlayStart = 0.75;
  const overlaySpan = 0.25; // final quarter drives the flip
  const targetProgress = overlayStart; // bar hits 100 when rotation begins
  const normalizedProgress = Math.min(targetProgress > 0 ? progress / targetProgress : 0, 1);
  const computedFill = Math.min(normalizedProgress * 100, 100);
  const barWidth = `${computedFill}%`;
  const progressPercent = useMemo(() => Math.round(computedFill), [computedFill]);

  const overlayProgress = Math.min(Math.max((progress - overlayStart) / overlaySpan, 0), 1);
  const overlayActive = isDesktop && overlayProgress > 0 && overlayProgress <= 1;

  // Make the vertical line advance faster so it doesn't lag behind the bar
  const timelineFill = useTransform(scrollYProgress, [0, overlayStart], ['0%', '100%']);

  const nodeProgress = useMemo(
    () => STEPS.map((_, idx) => (idx + 1) / STEPS.length),
    []
  );

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
            <ProcessRive />
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
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#43E1BC] via-[#41D8FF] to-[#4A63FF] shadow-[0_10px_30px_rgba(65,216,255,0.35)]"
                style={{ width: barWidth }}
              />
            </div>
          </div>
        </div>
        <div className="relative mt-16 flex justify-center">
          <div className="relative w-full max-w-4xl">
            <div className="absolute left-1/2 top-0 z-10 h-full w-px -translate-x-1/2 bg-white/60 backdrop-blur" />
            <motion.div
              className="absolute left-1/2 top-0 z-20 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#42DFBB] via-[#41D8FF] to-[#4D6AFF] shadow-[0_0_25px_rgba(77,106,255,0.25)]"
              style={{ height: timelineFill }}
            />

            <div className="relative z-20 space-y-20 sm:space-y-24">
              {STEPS.map((step, idx) => {
                const threshold = nodeProgress[idx];
                const nodeActive = progress >= threshold;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.35 }}
                    className="relative flex w-full justify-center"
                  >
                    <motion.article
                      className="group relative w-[88%] max-w-2xl md:w-[58%] rounded-3xl border border-white/60 bg-white/25 px-6 py-8 text-center shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(77,106,255,0.16)]"
                      style={{
                        boxShadow:
                          '0 16px 50px rgba(15,23,42,0.08), 0 0 25px rgba(77,106,255,0.12)',
                      }}
                    >
                      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/50 ring-offset-0 transition duration-300 group-hover:ring-[#7fb8ff]/80" />

                      <div className="flex items-center justify-center">
                        <span className="text-lg font-semibold text-slate-900 -mt-1 font-['Noto_Serif_Old_Uyghur',_serif]">
                          {step.id}
                        </span>
                      </div>
                      <h3 className="mt-4 font-['Noto_Serif_Old_Uyghur',_serif] text-2xl font-semibold text-slate-900 sm:text-[26px]">
                        {step.title}
                      </h3>
                    </motion.article>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        <div ref={lastStepRef} className="mt-24 h-[120vh]" />
      </div>
    </section>
  );
}

function ProcessRive() {
  const { RiveComponent } = useRive({
    src: '/rive/9445-17946-rocket-without-background.riv',
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });

  if (!RiveComponent) return null;

  return <RiveComponent style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }} />;
}
