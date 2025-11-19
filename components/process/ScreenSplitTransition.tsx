'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ClosingPage from '@/components/ClosingPage';

interface ScreenSplitTransitionProps {
  progress: number;
  active: boolean;
  navigateTo?: string;
}

export default function ScreenSplitTransition({
  progress,
  active,
  navigateTo = '/closing-page',
}: ScreenSplitTransitionProps) {
  const router = useRouter();
  const hasNavigated = useRef(false);

  const easedProgress = useMemo(() => {
    const clamped = Math.min(Math.max(progress, 0), 1);
    return 1 - Math.pow(1 - clamped, 3);
  }, [progress]);

  useEffect(() => {
    if (!active || easedProgress < 1 || hasNavigated.current) return;
    hasNavigated.current = true;
    router.push(navigateTo);
  }, [active, easedProgress, navigateTo, router]);

  const clipInset = `${Math.max(50 - easedProgress * 50, 0)}%`;

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden bg-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: `inset(${clipInset} 0 ${clipInset} 0)`,
              WebkitClipPath: `inset(${clipInset} 0 ${clipInset} 0)`,
            }}
          >
            <div className="overflow-hidden h-full w-full">
              <ClosingPage />
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 flex flex-col">
            <motion.div
              className="flex-1"
              style={{
                background: 'rgba(233,240,255,0.02)',
                boxShadow: `0 30px 60px rgba(15,23,42,${0.35 * easedProgress}) inset`,
                transform: `translateY(-${easedProgress * 100}%)`,
              }}
            />
            <motion.div
              className="flex-1"
              style={{
                background: 'rgba(233,240,255,0.02)',
                boxShadow: `0 -30px 60px rgba(15,23,42,${0.35 * easedProgress}) inset`,
                transform: `translateY(${easedProgress * 100}%)`,
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
