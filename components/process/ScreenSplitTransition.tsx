'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ClosingPage from '@/components/ClosingPage';

interface ScreenSplitTransitionProps {
  progress: number;
  active: boolean;
}

export default function ScreenSplitTransition({ progress, active }: ScreenSplitTransitionProps) {
  const easedProgress = useMemo(() => {
    const clamped = Math.min(Math.max(progress, 0), 1);
    return 1 - Math.pow(1 - clamped, 3);
  }, [progress]);
  const clipInset = `${Math.max(45 - easedProgress * 90, 0)}%`;
  const processBg = 'linear-gradient(150deg, #ffffff 0%, #ffffff 32%, #f0f0f0 32%, #f0f0f0 100%)';

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{ background: processBg, opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden' }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          clipPath: `inset(${clipInset} 0 ${clipInset} 0)`,
          WebkitClipPath: `inset(${clipInset} 0 ${clipInset} 0)`,
          opacity: easedProgress,
        }}
      >
        <ClosingPage />
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-0 z-20">
        <motion.div
          className="absolute left-0 right-0 top-0 h-1/2 backdrop-blur-[3px]"
          style={{ transform: `translateY(-${easedProgress * 100}%)`, background: processBg }}
        />
        <motion.div
          className="absolute left-0 right-0 bottom-0 h-1/2 backdrop-blur-[3px]"
          style={{ transform: `translateY(${easedProgress * 100}%)`, background: processBg }}
        />
      </motion.div>
    </motion.div>
  );
}
