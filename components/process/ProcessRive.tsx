'use client';

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

export default function ProcessRive() {
  const { RiveComponent } = useRive({
    src: '/rive/9445-17946-rocket-without-background.riv',
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });

  if (!RiveComponent) return null;

  return <RiveComponent style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }} />;
}
