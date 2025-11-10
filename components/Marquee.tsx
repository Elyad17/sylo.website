'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const CAPABILITIES = [
  'Next.js','React','TypeScript','Tailwind','Framer Motion','Animations','SEO',
  'Accessibility','Performance','Analytics','CMS','E-commerce','Supabase','Stripe','Content Strategy',
];

const Pill = ({ text }: { text: string }) => (
  <span className="mx-3 inline-flex items-center gap-2 rounded-full border border-slate-300/60 bg-white/80 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur">
    <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
    {text}
  </span>
);

export default function Marquee() {
  const items = useMemo(() => [...CAPABILITIES, ...CAPABILITIES], []);

  return (
    <section
      aria-label="Capabilities"
      // match HERO at top, and end on pure white for Services at bottom
      className="relative -mt-px w-full overflow-hidden bg-linear-to-b from-white to-gray-50 py-12"
    >
      {/* top feather (hero -> marquee) */}
      <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-linear-to-b from-transparent to-gray-50" />

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white/80 to-transparent" />

      {/* track */}
      <motion.div
        className="flex w-max"
        initial={{ x: 0 }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
        style={{ animation: 'marqueeShift 20s linear infinite' }}
      >
        {items.map((t, i) => (
          <Pill key={`${t}-${i}`} text={t} />
        ))}
      </motion.div>

      {/* bottom feather (marquee -> services) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-linear-to-b from-transparent to-white" />

      <style>{`
        @keyframes marqueeShift {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
