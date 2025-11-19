'use client';

import Lottie from 'lottie-react';
import anim from '../animations/Scene.json';

interface MascotProps {
  className?: string;
  loop?: boolean;
}

export default function Mascot({ className = 'w-24 h-24', loop = true }: MascotProps) {
  const rendererSettings = {
    preserveAspectRatio: 'xMidYMid slice',
    progressiveLoad: true,
    clearCanvas: true,
  };

  return (
    <Lottie
      animationData={anim}
      loop={loop}
      rendererSettings={rendererSettings}
      className={className}
      style={{ pointerEvents: 'none', background: 'transparent', width: '100%', height: '100%' }}
    />
  );
}
