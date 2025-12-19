import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Thank You | PixlBuilder",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b1a36] via-[#0d2146] to-[#0b1a36] text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.18em] text-emerald-200/80">Message received</p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">Thanks for reaching out!</h1>
        <p className="text-base text-slate-200/90">In the meantime, feel free to return to the homepage.</p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/20"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
