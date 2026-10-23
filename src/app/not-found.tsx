import Link from "next/link";
import { Home, PhoneCall } from "lucide-react";
import { siteSettings } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="relative isolate overflow-hidden bg-night min-h-[80svh] flex items-center justify-center px-6 py-32">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 30%, rgba(245,158,11,0.14), transparent 55%)",
        }}
      />

      {/* Eclipsed sun */}
      <div className="absolute left-1/2 top-[14%] -translate-x-1/2 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none">
        <div className="absolute inset-0 animate-ray-spin opacity-25">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2="50"
                y2="4"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.4"
                strokeLinecap="round"
                transform={`rotate(${(360 / 16) * i} 50 50)`}
              />
            ))}
          </svg>
        </div>
        <div className="absolute inset-[22%] rounded-full overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #fff8e1 0%, #ffd75e 30%, #f59e0b 62%, #ea580c 100%)",
            }}
          />
          <div className="absolute inset-0 translate-x-[35%] rounded-full bg-night" />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto mt-40">
        <p className="font-display text-7xl sm:text-8xl font-extrabold sun-gradient-text">
          404
        </p>
        <h1 className="font-display mt-4 text-2xl sm:text-3xl font-bold text-warm">
          Looks Like You&apos;ve Wandered Off the Grid
        </h1>
        <p className="mt-4 text-warm/60 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved. Let&apos;s get you back to somewhere sunnier.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sun-400 to-sun-600 px-7 py-3.5 font-semibold text-night shadow-[0_0_30px_rgba(245,158,11,0.45)] transition-transform hover:scale-105"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <a
            href={`tel:${siteSettings.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-semibold text-warm transition-colors hover:bg-white/10"
          >
            <PhoneCall className="h-4 w-4 text-sun-400" />
            {siteSettings.phone}
          </a>
        </div>
      </div>
      </section>
      <Footer />
    </>
  );
}
