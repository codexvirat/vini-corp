"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/data";

const INTERVAL_MS = 7000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, index]);

  const t = testimonials[index];
  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <div
      className="relative mx-auto max-w-5xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span
        aria-hidden
        className="font-serif-accent pointer-events-none absolute -top-16 left-0 select-none text-[12rem] leading-none text-sun-400/15 sm:-left-6"
      >
        &ldquo;
      </span>

      <div className="relative min-h-[17rem] sm:min-h-[15rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="font-serif-accent text-[1.75rem] leading-[1.3] text-warm sm:text-4xl lg:text-[2.75rem]">
              {t.quote}
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sun-300 to-sun-600 font-display text-sm font-semibold text-night">
                {t.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
              <span>
                <span className="block font-display font-semibold text-warm">
                  {t.name}
                </span>
                <span className="block text-sm text-warm/50">{t.role}</span>
              </span>
              <span className="ml-auto hidden gap-1 sm:flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-sun-400 text-sun-400" />
                ))}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center gap-6 border-t hairline pt-6">
        <div className="flex flex-1 gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative h-[2px] flex-1 overflow-hidden bg-warm/15"
              aria-label={`Go to testimonial ${i + 1}`}
            >
              {i === index && (
                <motion.span
                  key={`${index}-${paused}`}
                  initial={{ scaleX: paused ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: paused ? 0 : INTERVAL_MS / 1000, ease: "linear" }}
                  className="absolute inset-0 origin-left bg-sun-400"
                />
              )}
              {i < index && <span className="absolute inset-0 bg-warm/40" />}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-warm/20 text-warm/80 transition-colors hover:border-sun-400 hover:text-sun-400"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-warm/20 text-warm/80 transition-colors hover:border-sun-400 hover:text-sun-400"
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
