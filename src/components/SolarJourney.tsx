"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, PhoneCall, ChevronDown, Lightbulb } from "lucide-react";
import Counter from "./Counter";
import RayBurst from "./RayBurst";
import LiveClock from "./LiveClock";
import { stats, siteSettings } from "@/lib/data";

// Deterministic pseudo-random particle/star fields (avoids SSR/CSR hydration mismatch)
const particles = Array.from({ length: 22 }).map((_, i) => {
  const seed = i * 137.5;
  const left = ((seed * 1.618) % 100).toFixed(2);
  const delay = ((i * 0.7) % 6).toFixed(2);
  const duration = (7 + (i % 5) * 1.4).toFixed(2);
  const size = 2 + (i % 4);
  return { left, delay, duration, size, id: i };
});

const stars = Array.from({ length: 40 }).map((_, i) => {
  const seed = i * 53.7;
  const left = ((seed * 1.41) % 100).toFixed(2);
  const top = ((seed * 2.23) % 55).toFixed(2);
  const delay = ((i * 0.37) % 4).toFixed(2);
  return { left, top, delay, id: i };
});

// Fraction of the total journey the hero content occupies before handing off
const HERO_END = 0.24;
// Remap a [0,1] progress value (from the old standalone PowerFlow timing)
// into the travel portion of the combined journey [HERO_END, 1].
const remap = (x: number) => HERO_END + x * (1 - HERO_END);

// Re-wrapping a scroll-linked useTransform output through a function-based
// useTransform forces plain JS evaluation instead of this Framer Motion
// version's hardware-accelerated (WAAPI) path, which was observed getting
// stuck partway through the interpolation on long scroll ranges.
function useSafe<T>(value: MotionValue<T>): MotionValue<T> {
  return useTransform(value, (v) => v);
}

export default function SolarJourney() {
  const journeyRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"],
  });

  // Hero content fades + drifts up, then hands off to the panel/wire/bulb scene.
  const heroOpacity = useSafe(
    useTransform(scrollYProgress, [0, HERO_END * 0.6, HERO_END], [1, 1, 0])
  );
  const heroY = useSafe(
    useTransform(scrollYProgress, [0, HERO_END * 0.6, HERO_END], [0, 0, -40])
  );

  // The one and only sun: sits in the hero position, then travels to the panel.
  const sunLeft = useSafe(
    useTransform(scrollYProgress, [0, HERO_END, remap(0.45)], ["82%", "82%", "50%"])
  );
  const sunTop = useSafe(
    useTransform(scrollYProgress, [0, HERO_END, remap(0.45)], ["14%", "14%", "24%"])
  );
  const sunScale = useSafe(
    useTransform(scrollYProgress, [0, HERO_END, remap(0.45)], [1, 1, 0.5])
  );

  const beamOpacity = useSafe(
    useTransform(scrollYProgress, [remap(0.32), remap(0.48)], [0, 1])
  );
  const panelGlow = useSafe(
    useTransform(scrollYProgress, [remap(0.42), remap(0.58)], [0, 1])
  );
  const wireDraw = useSafe(
    useTransform(scrollYProgress, [remap(0.56), remap(0.8)], [0, 1])
  );
  const bulbGlow = useSafe(
    useTransform(scrollYProgress, [remap(0.78), remap(0.96)], [0, 1])
  );

  const captionPanel = useSafe(
    useTransform(scrollYProgress, [remap(0.44), remap(0.55), remap(0.62)], [0, 1, 0])
  );
  const captionWire = useSafe(
    useTransform(scrollYProgress, [remap(0.6), remap(0.7), remap(0.78)], [0, 1, 0])
  );
  const captionBulb = useSafe(
    useTransform(scrollYProgress, [remap(0.82), remap(0.94)], [0, 1])
  );

  // The panel/wire/bulb scene stays fully hidden until the hero has handed off.
  const sceneOpacity = useSafe(
    useTransform(scrollYProgress, [HERO_END * 0.7, HERO_END], [0, 1])
  );

  const panelShadow = useSafe(
    useTransform(
      panelGlow,
      [0, 1],
      ["0 0 0px rgba(251,191,36,0)", "0 0 70px rgba(251,191,36,0.55)"]
    )
  );
  const cellOpacity = useSafe(useTransform(panelGlow, [0, 1], [0.5, 1]));

  return (
    <section ref={journeyRef} className="relative h-[440vh] bg-night">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Sky gradient backdrop */}
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #060a14 0%, #0a1224 22%, #0f1c34 42%, #3a2412 68%, #7a3b12 82%, #f59e0b 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-sun-600/40 via-sun-500/10 to-transparent" />
        <div className="absolute inset-0 noise-overlay opacity-[0.08]" />

        {/* Stars */}
        <div className="absolute inset-0">
          {stars.map((s) => (
            <span
              key={s.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: 2,
                height: 2,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Rising energy particles (hero phase only) */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full bg-sun-300 animate-rise"
              style={{
                left: `${p.left}%`,
                bottom: "-10px",
                width: p.size,
                height: p.size,
                boxShadow: "0 0 8px rgba(255,215,94,0.9)",
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </motion.div>

        {/* The single traveling sun */}
        <motion.div
          style={{ left: sunLeft, top: sunTop, scale: sunScale }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 lg:w-[26rem] lg:h-[26rem] pointer-events-none z-30"
        >
          <div className="absolute inset-0 animate-ray-spin opacity-40">
            <RayBurst count={16} color="rgba(251,191,36,0.55)" />
          </div>
          <div className="absolute inset-8 animate-ray-spin-slow opacity-30">
            <RayBurst count={12} color="rgba(249,115,22,0.5)" />
          </div>
          <div className="absolute inset-[26%] rounded-full animate-sun-pulse">
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #fff8e1 0%, #ffd75e 30%, #f59e0b 62%, #ea580c 100%)",
              }}
            />
          </div>
        </motion.div>

        {/* ---- Hero content (fades out, hands off) ---- */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-32 pb-20 max-w-7xl mx-auto w-full"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm font-medium text-sun-100 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sun-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sun-400" />
            </span>
            Solar Panel Dealer &amp; Installation • Golghar, Gorakhpur
          </div>

          <LiveClock className="mb-6" />

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl text-warm [text-shadow:0_2px_24px_rgba(6,10,20,0.65)]">
            Harness the <span className="sun-gradient-text">Sun.</span>
            <br />
            Power Your <span className="sun-gradient-text">Tomorrow.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-warm/70">
            Since {siteSettings.founded}, Vini Corporate has been Gorakhpur&apos;s
            trusted solar panel distributor &amp; installer — residential,
            commercial and industrial systems built to outlast the grid.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sun-400 to-sun-600 px-7 py-3.5 font-semibold text-night shadow-[0_0_30px_rgba(245,158,11,0.45)] transition-transform hover:scale-105"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${siteSettings.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-semibold text-warm transition-colors hover:bg-white/10"
            >
              <PhoneCall className="h-4 w-4 text-sun-400" />
              {siteSettings.phone}
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-4 text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold sun-gradient-text">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-[11px] sm:text-xs text-warm/60 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-warm/50 pointer-events-none"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>

        {/* ---- Power-flow scene (hidden during hero, fades/draws in after handoff) ---- */}
        <motion.div
          style={{ opacity: sceneOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div
            style={{ opacity: beamOpacity }}
            className="absolute left-1/2 top-[27%] -translate-x-1/2 w-10 sm:w-14 h-[26%] blur-md z-[5] pointer-events-none"
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,215,94,0.65) 0%, rgba(251,191,36,0.35) 55%, rgba(251,191,36,0) 100%)",
                clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
              }}
            />
          </motion.div>

          <motion.div
            style={{ top: "58%", boxShadow: panelShadow }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-72 z-10 pointer-events-none"
          >
            <motion.div
              style={{ opacity: panelGlow }}
              className="absolute -inset-8 rounded-[2rem] bg-sun-400/40 blur-3xl"
            />
            <div
              className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-night-2 to-night p-2.5 sm:p-3 grid grid-cols-4 grid-rows-2 gap-1.5 sm:gap-2 shadow-2xl overflow-hidden"
              style={{ transform: "rotateX(38deg)" }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: cellOpacity }}
                  className="aspect-square rounded-[4px] bg-gradient-to-br from-sun-400/70 to-sun-700/70 border border-white/10"
                />
              ))}
              <motion.div
                style={{ opacity: panelGlow }}
                className="absolute inset-y-0 -left-full w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"
              />
            </div>
          </motion.div>

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full z-[8] pointer-events-none"
          >
            <motion.path
              d="M 50 68 C 50 80, 26 78, 24 90"
              fill="none"
              stroke="url(#wire-gradient)"
              strokeWidth="0.6"
              strokeLinecap="round"
              style={{ pathLength: wireDraw }}
            />
            <defs>
              <linearGradient id="wire-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute left-[24%] top-[90%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <motion.div
              style={{ opacity: bulbGlow }}
              className="absolute -inset-8 rounded-full bg-sun-300/60 blur-2xl"
            />
            <Lightbulb className="relative h-9 w-9 sm:h-11 sm:w-11 text-warm/15" strokeWidth={1.5} />
            <motion.div style={{ opacity: bulbGlow }} className="absolute inset-0">
              <Lightbulb
                className="h-9 w-9 sm:h-11 sm:w-11 text-sun-300 fill-sun-300/90"
                strokeWidth={1.5}
              />
            </motion.div>
          </div>

          <motion.p
            style={{ opacity: captionPanel }}
            className="absolute left-1/2 top-[42%] -translate-x-1/2 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sun-300 z-20 whitespace-nowrap pointer-events-none"
          >
            Sunlight Captured
          </motion.p>
          <motion.p
            style={{ opacity: captionWire }}
            className="absolute left-[8%] sm:left-[12%] top-[76%] text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-eco-400 z-20 whitespace-nowrap pointer-events-none"
          >
            Power Flows
          </motion.p>
          <motion.div
            style={{ opacity: captionBulb }}
            className="absolute left-1/2 bottom-[4%] -translate-x-1/2 text-center z-20 px-6 pointer-events-none"
          >
            <p className="font-display text-2xl sm:text-4xl font-bold text-warm">
              Your Home, <span className="sun-gradient-text">Powered.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
