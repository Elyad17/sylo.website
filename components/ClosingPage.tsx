'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ClosingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-8">
      <div className="max-w-3xl text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-semibold tracking-tight"
        >
          Closing Sequence Placeholder
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="text-lg text-slate-300"
        >
          Replace this component with the final cinematic handoff you have in mind. It lives in
          components/ClosingPage.tsx so you can reuse or iterate freely.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Back to site
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
