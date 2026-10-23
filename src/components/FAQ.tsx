"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "How much does a solar system cost?",
    a: "Costs depend on system size and site conditions, but a typical residential system ranges from ₹55,000–₹65,000 per kW before subsidy. Use our savings calculator above for a personalised estimate, or request a free site survey for an exact quote.",
  },
  {
    q: "How long does installation actually take?",
    a: "Most residential rooftop installations are completed within 3–7 days once materials are on site. Larger commercial and industrial systems can take 2–4 weeks depending on scale and structural work required.",
  },
  {
    q: "Do I need government approval for solar?",
    a: "For grid-connected (on-grid) systems, DISCOM approval and net-metering registration is required — we handle this entire process for you, including subsidy paperwork where applicable.",
  },
  {
    q: "What maintenance does a solar system need?",
    a: "Very little. Periodic panel cleaning (every 2–4 weeks depending on dust) and an annual inspection of wiring and inverter is generally sufficient. We offer maintenance contracts for customers who want us to handle this.",
  },
  {
    q: "What happens to my power during a cut or cloudy day?",
    a: "On-grid systems without a battery will not provide power during a grid outage (a safety requirement). If backup power matters to you, we recommend a hybrid or off-grid system with battery storage — ask us about sizing one for your needs.",
  },
  {
    q: "How long do solar panels actually last?",
    a: "Tier-1 panels we install typically carry a 25-year performance warranty, with most panels still producing 80%+ of their original output at the end of that period. Inverters usually need replacement once every 10–12 years.",
  },
  {
    q: "Can I pay in installments or finance my system?",
    a: "Yes — alongside UPI, net banking, cheque/DD and cash, we can help connect you with financing partners for eligible systems. Talk to our team about what works for your budget.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto divide-y divide-white/10 rounded-3xl glass overflow-hidden">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={faq.q} delay={i * 0.04}>
            <div>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display font-semibold text-warm text-sm sm:text-base">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sun-500/15 text-sun-400"
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 sm:px-7 pb-5 text-sm text-warm/60 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
