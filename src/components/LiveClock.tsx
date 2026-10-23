"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const TIME_ZONE = "Asia/Kolkata";

const dayFmt = new Intl.DateTimeFormat("en-IN", { weekday: "long", timeZone: TIME_ZONE });
const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: TIME_ZONE,
});
const timeFmt = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZone: TIME_ZONE,
});
const timeFmtNoSeconds = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: TIME_ZONE,
});

export default function LiveClock({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = setInterval(tick, 1000);
    const kickoff = setTimeout(tick, 0);
    return () => {
      clearInterval(id);
      clearTimeout(kickoff);
    };
  }, []);

  if (!now) {
    // Avoid SSR/CSR hydration mismatch: render nothing until mounted.
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm font-medium text-sun-100 ${className}`}
        aria-hidden
      >
        <Clock className="h-3.5 w-3.5 text-sun-400" />
        <span className="opacity-0">--</span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-warm/75 tabular-nums ${className}`}
      >
        <Clock className="h-3.5 w-3.5 text-sun-400 shrink-0" />
        {timeFmtNoSeconds.format(now)} IST
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm font-medium text-sun-100 ${className}`}
    >
      <Clock className="h-3.5 w-3.5 text-sun-400 shrink-0" />
      <span>{dayFmt.format(now)}</span>
      <span className="text-warm/30">•</span>
      <span>{dateFmt.format(now)}</span>
      <span className="text-warm/30">•</span>
      <span className="tabular-nums sun-gradient-text font-semibold">
        {timeFmt.format(now)} IST
      </span>
    </div>
  );
}
