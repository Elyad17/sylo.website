export const metadata = {
  title: "Thank You | PixlBuilder",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b1a36] via-[#0d2146] to-[#0b1a36] text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.18em] text-emerald-200/80">Message received</p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">Thanks for reaching out!</h1>
        <p className="text-lg text-slate-200/90">
          We&apos;ll review your project details and get back to you soon. If you need to follow up, just reply to the
          confirmation email once it lands in your inbox.
        </p>
      </div>
    </main>
  );
}
