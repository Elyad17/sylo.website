'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type BlobConfig = {
  size: number;
  top: string;
  left: string;
  depth: number;
  driftX: number[];
  driftY: number[];
  glow: string;
};

const BLOBS: BlobConfig[] = [
  { size: 360, top: '12%', left: '18%', depth: 6, driftX: [-6, 6], driftY: [-10, 12], glow: '#42DFBB' },
  { size: 420, top: '32%', left: '64%', depth: 4, driftX: [8, -6], driftY: [10, -12], glow: '#41D8FF' },
  { size: 320, top: '64%', left: '34%', depth: 8, driftX: [-4, 8], driftY: [12, -10], glow: '#4D6AFF' },
];

export default function ClosingPage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasPointer = typeof window !== 'undefined' && matchMedia('(pointer:fine)').matches;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothedX = useSpring(mouseX, { stiffness: 90, damping: 18, mass: 0.8 });
  const smoothedY = useSpring(mouseY, { stiffness: 90, damping: 18, mass: 0.8 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!hasPointer || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const blobs = useMemo(() => BLOBS, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-32 sm:py-36 min-h-screen"
      style={{
        background: 'linear-gradient(145deg, #ffffff 0%, #ffffff 38%, #f2f2f2 38%, #f2f2f2 100%)',
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {blobs.map((blob, idx) => (
          <GlassBlob key={idx} config={blob} index={idx} x={smoothedX} y={smoothedY} />
        ))}
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          the universe put you here
        </h1>
        <p className="mt-4 text-xl text-slate-500">let’s act on it</p>
      </div>
    </section>
  );
}

type GlassBlobProps = {
  config: BlobConfig;
  index: number;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
};

function GlassBlob({ config, index, x, y }: GlassBlobProps) {
  const parallaxX = useTransform(x, (v) => v * config.depth * 12);
  const parallaxY = useTransform(y, (v) => v * config.depth * 12);

  return (
    <motion.div
      className="absolute rounded-full bg-white/22 backdrop-blur-[30px] shadow-[0_0_60px_rgba(255,255,255,0.22)]"
      style={{
        width: config.size,
        height: config.size * 0.82,
        top: config.top,
        left: config.left,
        x: parallaxX,
        y: parallaxY,
        border: `1px solid ${config.glow}1a`,
        boxShadow: `0 0 60px ${config.glow}40, inset 0 0 40px rgba(255,255,255,0.5)`,
      }}
      animate={{
        x: config.driftX,
        y: config.driftY,
      }}
      transition={{
        duration: 18 + index * 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  );
}
