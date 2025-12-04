'use client';

import { motion } from 'framer-motion';
import ClosingPage from '../ClosingPage';

interface CubeTransitionProps {
  progress: number; // 0..1 scroll-driven
  active: boolean;
}

const snapshotSrc = '/pictures/process-overlay.png'; // static snapshot in public/pictures

export default function CubeTransition({ progress, active }: CubeTransitionProps) {
  if (!active) return null;

  const t = Math.max(0, Math.min(1, progress));
  const processAngle = t * 90;
  const closingAngle = -90 + t * 90;
  const depth = 500;
  const processBg = '#e5e7eb';

  return (
    <section className="pointer-events-auto fixed inset-0 z-[9999] overflow-hidden" style={{ background: '#000' }}>
      <div className="relative h-full w-full [perspective:1400px]">
        <motion.div
          className="absolute inset-0"
          style={{
            transformOrigin: `50% 50% -${depth}px`,
            rotateX: processAngle,
            backfaceVisibility: 'hidden',
            background: processBg,
          }}
        >
          <img src={snapshotSrc} alt="Process Snapshot" className="h-full w-full object-cover" />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          style={{
            transformOrigin: `50% 50% -${depth}px`,
            rotateX: closingAngle,
            backfaceVisibility: 'hidden',
          }}
        >
          <ClosingPage />
        </motion.div>

        {/* Overlay footer removed; moved to ClosingPage layout */}
      </div>
    </section>
  );
}
