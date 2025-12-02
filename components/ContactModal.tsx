"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ProjectType = "Landing page" | "Presentational" | "Informational" | "Ecommerce" | "One-pager";

const PROJECT_TYPES: ProjectType[] = ["Landing page", "Presentational", "Informational", "Ecommerce", "One-pager"];
const BUDGET_OPTIONS = ["< $1,000", "$1,000 – $3,000", "$3,000 – $5,000", "$5,000+"];

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [budget, setBudget] = useState<string>("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    console.log({
      projectType,
      budget,
      email,
      phone,
      business,
      name,
      notes,
    });
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-black/10 bg-black text-white px-5 py-2 text-sm font-semibold shadow-lg shadow-black/20 transition hover:scale-[1.02] hover:shadow-black/30"
      >
        Contact
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9998] flex items-center justify-center px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />

            <motion.div
              className="relative z-[9999] w-full max-w-3xl overflow-hidden rounded-xl border border-black/5 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.16)] sm:p-8"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-200/30 via-transparent to-emerald-200/10" />

              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 rounded-full border border-black/10 bg-black/5 p-2 text-slate-600 backdrop-blur transition hover:scale-105 hover:text-black"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-black sm:text-3xl">
                  Let’s put your business on the map
                </h2>
                <p className="text-sm text-slate-600 sm:text-base">Tell us a bit about your project.</p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6 text-black">
                {/* Project type */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <span>Project type</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {PROJECT_TYPES.map((type) => {
                      const active = projectType === type;
                      return (
                        <motion.button
                          key={type}
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          onClick={() => setProjectType(type)}
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            active
                              ? "border-emerald-400 bg-emerald-100/70 text-emerald-900 shadow-[0_10px_30px_rgba(52,211,153,0.25)]"
                              : "border-black/15 bg-white text-slate-700 hover:border-black/30 hover:text-black"
                          }`}
                        >
                          {type}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900">Budget (optional)</label>
                  <div className="relative">
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    >
                      <option value="">Select budget</option>
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-white text-slate-800">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact details */}
                <div className="space-y-3">
                  <span className="text-sm font-semibold text-slate-900">Contact details</span>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InputField label="Email" required value={email} onChange={setEmail} type="email" />
                    <InputField label="Phone" value={phone} onChange={setPhone} />
                    <InputField label="Business name" value={business} onChange={setBusiness} />
                    <InputField label="Name" required value={name} onChange={setName} />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Tell us more (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    placeholder="Project goals, timeline, references..."
                  />
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-0 scale-110 rounded-full bg-emerald-200/60 blur-[60px]" />
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  type="submit"
                  disabled={!email || !name}
                  className="relative w-full rounded-full border border-black/10 bg-gradient-to-r from-emerald-300 to-emerald-500 py-3 text-center text-base font-medium text-black shadow-[0_12px_40px_rgba(16,185,129,0.35)] transition hover:shadow-[0_14px_60px_rgba(16,185,129,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Submit Request
                </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
};

function InputField({ label, value, onChange, required, type = "text" }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-900">
        {label} {required ? "*" : ""}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        placeholder={label}
      />
    </div>
  );
}
