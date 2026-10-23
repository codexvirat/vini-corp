"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: form.get("name"),
          email: form.get("email"),
          subject: form.get("subject"),
          message: form.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative rounded-3xl glass p-8 sm:p-10 overflow-hidden">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sun-500/10 blur-3xl" />
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex flex-col items-center justify-center text-center py-10"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-eco-500/15 text-eco-400 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h3 className="font-display text-xl font-semibold text-warm">
              Message sent!
            </h3>
            <p className="mt-2 text-sm text-warm/60 max-w-xs">
              We&apos;ve received your message and will respond shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm font-medium text-sun-400 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="relative grid gap-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" placeholder="Your name" required />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <Field label="Subject" name="subject" placeholder="How can we help?" />
            <div>
              <label className="block text-xs font-medium text-warm/60 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us about your requirement..."
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-warm placeholder:text-warm/30 focus:border-sun-400 focus:outline-none focus:ring-1 focus:ring-sun-400 resize-none"
              />
            </div>
            {status === "error" && (
              <p className="text-xs text-red-400">
                Something went wrong. Please try again or call us directly.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sun-400 to-sun-600 px-6 py-3.5 font-semibold text-night shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-warm/60 mb-1.5">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-warm placeholder:text-warm/30 focus:border-sun-400 focus:outline-none focus:ring-1 focus:ring-sun-400"
      />
    </div>
  );
}
