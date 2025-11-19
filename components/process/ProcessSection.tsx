'use client';

import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion';
import ScreenSplitTransition from './ScreenSplitTransition';

type Actor = 'YOU' | 'US';

type Step = {
  id: number;
  actor: Actor;
  title: string;
  blurb: string;
};

const STEPS: Step[] = [
  {
    id: 1,
    actor: 'YOU',
    title: 'Kickoff signal',
    blurb: 'Share the mission, the must-haves, and success in two minutes.',
  },
  {
    id: 2,
    actor: 'US',
    title: 'Strategy sketch',
    blurb: 'We map flows, IA, and KPIs into a tight blueprint.',
  },
  {
    id: 3,
    actor: 'YOU',
    title: 'Direction lock',
    blurb: 'Pick your favorite moodboard so we sprint forward.',
  },
  {
    id: 4,
    actor: 'US',
    title: 'Interface build',
    blurb: 'We craft the hero, core pages, and signature motion.',
  },
  {
    id: 5,
    actor: 'YOU',
    title: 'Refine and approve',
    blurb: 'Final inputs on copy, imagery, and polish.',
  },
  {
    id: 6,
    actor: 'US',
    title: 'Launch + handoff',
    blurb: 'Build, QA, speed passes, and go-live support.',
  },
];

const ACCENTS: Record<
  Actor,
  { color: string; label: string; muted: string; chip: string }
> = {
  YOU: {
    color: '#42DFBB',
    muted: 'rgba(66,223,187,0.12)',
    chip: 'bg-[#E6FFF6] text-[#169B7A]',
    label: 'Your move',
  },
  US: {
    color: '#4D6AFF',
    muted: 'rgba(77,106,255,0.1)',
    chip: 'bg-[#E7E9FF] text-[#2F3FC8]',
    label: 'Sylo in progress',
  },
};

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lastStepRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [progress, setProgress] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [completionProgress, setCompletionProgress] = useState<number | null>(null);
  const lastStepMidScreen = useInView(lastStepRef, {
    amount: 0,
    margin: '0px 0px -50% 0px',
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.max(0, Math.min(1, latest));
    setProgress(next);
  });

  useEffect(() => {
    if (lastStepMidScreen && completionProgress === null) {
      setCompletionProgress(progress);
    }
  }, [lastStepMidScreen, completionProgress, progress]);

  const targetProgress = completionProgress ?? 1.05;
  const normalizedProgressRaw = progress / targetProgress;
  const normalizedProgress = Math.min(normalizedProgressRaw, 1);
  const computedFill = normalizedProgress * 100;
  const barWidth = `${computedFill}%`;
  const progressPercent = useMemo(() => Math.round(computedFill), [computedFill]);

  const transitionSpan = 0.08;
  const extraProgress = completionProgress ? Math.max(progress - completionProgress, 0) : 0;
  const overlayProgress = completionProgress
    ? Math.min(extraProgress / transitionSpan, 1)
    : 0;
  const overlayActive = overlayProgress > 0;

  const handleVisible = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  const currentStep = STEPS[focusedIndex] ?? STEPS[0];

  return (
    <section
      ref={sectionRef}
      className="bg-[#E9F0FF] py-24 text-slate-600"
    >
      <ScreenSplitTransition active={overlayActive} progress={overlayProgress} />
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            The long-form road from spark to launch.
          </h2>
        </div>

        <div className="sticky top-6 z-20 mt-12">
          <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <span>{`Step 0${currentStep.id} / 0${STEPS.length}`}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold text-slate-900">
                {currentStep.title}
              </p>
              <p className="text-xs text-slate-500">{ACCENTS[currentStep.actor].label}</p>
            </div>
            <div className="mt-4 h-3 rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#43E1BC] via-[#41D8FF] to-[#4A63FF] shadow-[0_10px_30px_rgba(65,216,255,0.35)]"
                style={{ width: barWidth }}
              />
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-16">
          {STEPS.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              onVisible={handleVisible}
            />
          ))}
        </div>

        <div ref={lastStepRef} className="h-[55vh]" />
      </div>
    </section>
  );
}

type StepCardProps = {
  step: Step;
  index: number;
  onVisible: (index: number) => void;
};

function StepCard({ step, index, onVisible }: StepCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.85 });

  useEffect(() => {
    if (isInView) {
      onVisible(index);
    }
  }, [isInView, index, onVisible]);

  const accent = ACCENTS[step.actor];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={{
        opacity: isInView ? 1 : 0.2,
        y: isInView ? 0 : 40,
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="rounded-[32px] border border-slate-200/70 bg-white/80 px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur"
    >
      <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
        <span className="text-slate-500">{String(step.id).padStart(2, '0')}</span>
        <span
          className={[
            'rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.25em]',
            accent.chip,
          ].join(' ')}
        >
          {step.actor}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-slate-900">{step.title}</h3>
      <p className="mt-2 text-base text-slate-500">{step.blurb}</p>
      <div
        className="mt-6 h-px w-full"
        style={{ backgroundImage: `linear-gradient(90deg, ${accent.muted}, rgba(148,163,184,0.2))` }}
      />
    </motion.article>
  );
}
