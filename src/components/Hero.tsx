"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import Counter from "./Counter";
import { stats, siteSettings } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const lineVariants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1.1, delay: 0.35 + i * 0.12, ease },
  }),
};

// Re-wrapping a scroll-linked useTransform output through a function-based
// useTransform forces plain JS evaluation instead of this Framer Motion
// version's hardware-accelerated (ViewTimeline) path, which gets stuck at a
// stale value after client-side navigation back to the home page.
function useSafe<T>(value: MotionValue<T>): MotionValue<T> {
  return useTransform(value, (v) => v);
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useSafe(useTransform(scrollYProgress, [0, 1], ["0%", "18%"]));
  const contentY = useSafe(useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]));
  const contentOpacity = useSafe(useTransform(scrollYProgress, [0, 0.7], [1, 0]));

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden bg-night"
    >
      {/* Photograph with slow settle-in zoom + scroll parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src="/images/hero-rooftop-sunset.jpg"
            alt="Rooftop solar array at sunset"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Grading: deep night at the top-left, warm sun bleeding in from the right */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/55 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-transparent to-night/50" />
      <div
        className="absolute inset-0 -z-10 mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 85% 30%, rgba(251,191,36,0.55), transparent 55%)",
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-10 pt-36 sm:px-10 lg:pb-14"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="eyebrow"
        >
          Est. {siteSettings.founded} &nbsp;·&nbsp; Golghar, Gorakhpur
        </motion.p>

        <h1 className="font-display mt-7 max-w-5xl text-[2.9rem] font-semibold leading-[0.98] text-warm sm:text-7xl lg:text-[6.5rem]">
          {[
            <>Harness the sun.</>,
            <>
              Power your{" "}
              <span className="font-serif-accent text-sun-300">tomorrow.</span>
            </>,
          ].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                variants={lineVariants}
                initial="hidden"
                animate="show"
                custom={i}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease }}
            className="max-w-md text-base leading-relaxed text-warm/70 sm:text-lg"
          >
            Gorakhpur&apos;s trusted solar distributor &amp; installer.
            Residential, commercial and industrial systems — engineered,
            installed and supported by one team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link href="/quote" className="btn-sun group px-7 py-4 text-sm">
              Get a Free Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${siteSettings.phoneRaw}`}
              className="btn-ghost px-7 py-4 text-sm"
            >
              <PhoneCall className="h-4 w-4 text-sun-400" />
              {siteSettings.phone}
            </a>
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.15 }}
          className="mt-14 grid grid-cols-2 border-t hairline sm:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 sm:py-7 ${i > 0 ? "sm:border-l hairline sm:pl-8" : ""} ${
                i % 2 === 1 ? "border-l hairline pl-6 sm:pl-8" : ""
              } ${i >= 2 ? "border-t hairline sm:border-t-0" : ""}`}
            >
              <div className="font-display text-3xl font-semibold text-warm sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-warm/45">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
