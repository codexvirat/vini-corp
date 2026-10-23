"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Zap, IndianRupee, CalendarClock, Leaf, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

// Assumptions (approximate, for estimation purposes only)
const UNIT_COST = 8; // ₹ per kWh, average grid tariff
const UNITS_PER_KW_PER_MONTH = 120; // typical generation per installed kW
const COST_PER_KW = 55000; // ₹, blended residential installation cost
const BILL_OFFSET = 0.9; // fraction of bill solar typically offsets
const CO2_PER_KWH = 0.82; // kg CO2 avoided per kWh (India grid average)

function useAnimatedNumber(target: number, duration = 600) {
  const [value, setValue] = useState(target);
  const frame = useRef<number | null>(null);
  const from = useRef(target);

  useEffect(() => {
    const start = performance.now();
    const startValue = from.current;
    const delta = target - startValue;

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(startValue + delta * eased);
      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        from.current = target;
      }
    };

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

export default function SavingsCalculator() {
  const [bill, setBill] = useState(4000);
  const sliderRef = useRef<HTMLInputElement>(null);

  const monthlyUnits = bill / UNIT_COST;
  const systemSizeKw = Math.max(1, Math.round((monthlyUnits / UNITS_PER_KW_PER_MONTH) * 2) / 2);
  const systemCost = systemSizeKw * COST_PER_KW;
  const monthlySavings = bill * BILL_OFFSET;
  const annualSavings = monthlySavings * 12;
  const paybackYears = annualSavings > 0 ? systemCost / annualSavings : 0;
  const co2PerYearKg = monthlyUnits * 12 * CO2_PER_KWH;
  const lifetimeSavings = annualSavings * 25 - systemCost;

  const animSystemSize = useAnimatedNumber(systemSizeKw);
  const animMonthlySavings = useAnimatedNumber(monthlySavings);
  const animPayback = useAnimatedNumber(paybackYears);
  const animCo2 = useAnimatedNumber(co2PerYearKg / 1000);
  const animLifetime = useAnimatedNumber(Math.max(0, lifetimeSavings));

  const pct = ((bill - 500) / (20000 - 500)) * 100;

  // Applied imperatively (not via the SSR'd style prop) because the browser
  // normalizes the `background` shorthand on parse, which makes React's
  // hydration comparison flag a false-positive mismatch.
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.background = `linear-gradient(90deg, #f59e0b ${pct}%, rgba(255,255,255,0.1) ${pct}%)`;
    }
  }, [pct]);

  return (
    <div className="relative rounded-3xl glass p-6 sm:p-10 overflow-hidden">
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-sun-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-eco-500/10 blur-3xl" />

      <div className="relative grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sun-400">
            Solar Savings Calculator
          </p>
          <h3 className="font-display mt-4 text-3xl sm:text-4xl font-semibold text-warm">
            What could you <span className="font-serif-accent text-sun-300">save?</span>
          </h3>
          <p className="mt-3 text-sm text-warm/55 leading-relaxed">
            Drag the slider to match your average monthly electricity bill and
            see an instant estimate of your ideal system size and savings.
          </p>

          <div className="mt-10">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs text-warm/50 uppercase tracking-wide">
                Monthly Electricity Bill
              </span>
              <span className="font-display text-2xl font-bold sun-gradient-text tabular-nums">
                ₹{bill.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              ref={sliderRef}
              type="range"
              min={500}
              max={20000}
              step={500}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="sun-slider"
              aria-label="Monthly electricity bill"
            />
            <div className="mt-2 flex justify-between text-[11px] text-warm/40">
              <span>₹500</span>
              <span>₹20,000+</span>
            </div>
          </div>

          <Link
            href="/quote"
            className="btn-sun mt-10 px-6 py-3.5 text-sm"
          >
            Get an Exact Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ResultCard
            icon={Zap}
            label="Recommended System"
            value={`${animSystemSize.toFixed(1)} kW`}
            accent="sun"
          />
          <ResultCard
            icon={IndianRupee}
            label="Est. Monthly Savings"
            value={`₹${Math.round(animMonthlySavings).toLocaleString("en-IN")}`}
            accent="sun"
          />
          <ResultCard
            icon={CalendarClock}
            label="Payback Period"
            value={`${animPayback.toFixed(1)} yrs`}
            accent="eco"
          />
          <ResultCard
            icon={Leaf}
            label="CO₂ Offset / Year"
            value={`${animCo2.toFixed(1)} tons`}
            accent="eco"
          />
          <div className="col-span-2 rounded-2xl bg-gradient-to-r from-eco-500/15 to-sun-500/10 border border-white/10 px-5 py-4 text-center">
            <p className="text-xs text-warm/55 uppercase tracking-wide">
              Estimated 25-Year Net Savings
            </p>
            <p className="font-display mt-1 text-2xl sm:text-3xl font-bold sun-gradient-text tabular-nums">
              ₹{Math.round(animLifetime).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      <p className="relative mt-8 text-[11px] text-warm/35 text-center">
        Estimates only, based on average tariffs &amp; generation data for
        Uttar Pradesh. Final numbers depend on your site survey.
      </p>
    </div>
  );
}

function ResultCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
  accent: "sun" | "eco";
}) {
  return (
    <Reveal className="h-full">
      <div className="h-full rounded-2xl bg-white/5 border border-white/10 px-4 py-5">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            accent === "sun" ? "bg-sun-500/15 text-sun-400" : "bg-eco-500/15 text-eco-400"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <p className="mt-3 font-display text-xl font-bold text-warm tabular-nums">
          {value}
        </p>
        <p className="mt-0.5 text-[11px] text-warm/50 leading-tight">{label}</p>
      </div>
    </Reveal>
  );
}
