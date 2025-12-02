'use client';

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#081126] text-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-white/2 to-black/15" />
      <div className="mx-auto max-w-5xl px-6 py-12 text-center">
        <div className="mx-auto h-px w-full max-w-4xl bg-white/15 blur-[0.3px]" />
        <p className="mt-6 text-sm tracking-wide text-slate-300">Footer placeholder — add links and contact info here.</p>
      </div>
    </footer>
  );
}
