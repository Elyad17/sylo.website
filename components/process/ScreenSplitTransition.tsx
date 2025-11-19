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
          {/* Closing view revealed from the center */}
          <motion.div
            className="absolute inset-0"
            style={{
              clipPath: `inset(${clipInset} 0 ${clipInset} 0)`,
            }}
          >
            <ClosingPage />
          </motion.div>

          {/* Panels that mimic splitting the process surface */}
          <div className="absolute inset-0 flex flex-col">
            <motion.div
              className="flex-1 bg-[#E9F0FF] shadow-[0_20px_50px_rgba(148,163,184,0.45)]"
              style={{
                transform: `translateY(-${easedProgress * 100}%)`,
              }}
            />
            <motion.div
              className="flex-1 bg-[#E9F0FF] shadow-[0_-20px_50px_rgba(148,163,184,0.45)]"
              style={{
                transform: `translateY(${easedProgress * 100}%)`,
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
