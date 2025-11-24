'use client';

import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import ClosingPage from '@/components/ClosingPage';

interface ScreenSplitTransitionProps {
  progress: number; // retained for signature compatibility
  active: boolean;
}

export default function ScreenSplitTransition({ progress: _progress, active }: ScreenSplitTransitionProps) {
  const anim = useMotionValue(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setVisible(true);
      const controls = animate(anim, 1, {
        duration: 1.6,
        ease: 'easeInOut',
        onComplete: () => anim.set(1),
      });
      return () => controls.stop();
    }

    const controls = animate(anim, 0, {
      duration: 1.6,
      ease: 'easeInOut',
      onComplete: () => {
        anim.set(0);
        setVisible(false);
      },
    });
    return () => controls.stop();
  }, [active, anim]);

  const clipInset = useTransform(anim, (v) => {
    const t = Math.max(0, Math.min(1, v));
    const inset = 50 - t * 100;
    return `${inset <= 0 ? 0 : inset}%`;
  });
  const clipPath = useTransform(clipInset, (v) => `inset(${v} 0 ${v} 0)`);
  const processBg = '#e5e7eb';

  useEffect(() => {
    if (!visible) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [visible]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{
        background: processBg,
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
      }}
    >
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          clipPath,
          WebkitClipPath: clipPath,
        }}
      >
        <ClosingPage />
      </motion.div>
    </motion.div>
  );
}
