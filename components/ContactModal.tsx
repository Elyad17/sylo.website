"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ProjectType = "Landing page" | "Presentational" | "Informational" | "Ecommerce" | "One-pager";

const PROJECT_TYPES: ProjectType[] = ["Landing page", "Presentational", "Informational", "Ecommerce", "One-pager"];
const BUDGET_OPTIONS = ["< $1,000", "$1,000 – $3,000", "$3,000 – $5,000", "$5,000 – $10,000", "$10,000+"];

type ContactModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
  triggerLabel?: string;
  renderTrigger?: (open: () => void) => React.ReactNode;
};

export default function ContactModal({
  open,
  onOpenChange,
  showTrigger = true,
  triggerLabel = "Contact",
  renderTrigger,
}: ContactModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [budget, setBudget] = useState<string>("$3,000 – $5,000");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const isControlled = useMemo(() => open !== undefined, [open]);
  const modalOpen = isControlled ? !!open : internalOpen;
  const setModalOpen = (value: boolean) => {
    if (!isControlled) setInternalOpen(value);
    onOpenChange?.(value);
  };

  useEffect(() => {
    if (modalOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
    return undefined;
  }, [modalOpen]);

  return (
    <>
      {renderTrigger
        ? renderTrigger(() => setModalOpen(true))
        : showTrigger && (
        <button
          onClick={() => setModalOpen(true)}
          className="cursor-pointer rounded-full border border-black/10 bg-black text-white px-5 py-2 text-sm font-semibold shadow-lg shadow-black/20 transition hover:scale-[1.02] hover:shadow-black/30"
        >
          {triggerLabel}
        </button>
        )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[9998] flex items-center justify-center px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              onClick={() => setModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />

            <motion.div
              className="relative z-[9999] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-black/5 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.16)] sm:p-8"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >

              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-3 top-3 rounded-full border border-black/10 bg-black/5 p-2 text-slate-600 backdrop-blur transition hover:scale-105 hover:text-black"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold text-black leading-tight">
                  Tell us about your project.
                </h2>
              </div>

              <form
                action="https://formsubmit.co/jonathanarbittier@pixlbuilder.com"
                method="POST"
                className="mt-6 space-y-6 text-black leading-relaxed"
                onSubmit={() => setModalOpen(false)}
              >
                <input type="hidden" name="_subject" value="New website lead from PixlBuilder" />
                <input type="hidden" name="_next" value="https://pixlbuilder.com/thank-you" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                <input type="hidden" name="projectType" value={projectType ?? ""} />
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
                          className={`rounded-full border px-4 py-2 text-sm sm:text-base leading-snug transition ${
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
                  <label className="block text-sm font-semibold text-slate-900">Budget</label>
                  <div className="relative">
                    <select
                      value={budget}
                      name="budget"
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-slate-800 shadow-inner shadow-white/60 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    >
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-white text-slate-800">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Contact details */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField name="name" placeholder="Name" required value={name} onChange={setName} />
                  <InputField name="email" placeholder="Email" required value={email} onChange={setEmail} type="email" />
                  <InputField name="phone" placeholder="Phone" value={phone} onChange={setPhone} />
                  <InputField name="business" placeholder="Business name" value={business} onChange={setBusiness} />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Tell us about your project (optional)</label>
                  <textarea
                    name="message"
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
  label?: string;
  placeholder?: string;
  name?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
};

function InputField({ label, placeholder, value, onChange, required, type = "text", name }: InputFieldProps) {
  return (
    <div className="space-y-2">
      {label ? (
        <label className="text-sm font-semibold text-slate-900">
          {label} {required ? "*" : ""}
        </label>
      ) : null}
      <input
        type={type}
        required={required}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        placeholder={placeholder || label}
      />
    </div>
  );
}
