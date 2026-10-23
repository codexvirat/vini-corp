import type { Metadata } from "next";
import { ShieldCheck, Zap, Clock3 } from "lucide-react";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Free Quote | Vini Corporate",
  description:
    "Request a free, no-obligation solar installation quote from Vini Corporate, Gorakhpur.",
};

const perks = [
  { icon: Zap, title: "Fast Response", body: "We respond within 24 hours of your request." },
  { icon: ShieldCheck, title: "No Obligation", body: "Free consultation — no pressure, no hidden costs." },
  { icon: Clock3, title: "Quick Install", body: "Most residential systems installed within a week." },
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Free Quote"
        title="Get your free"
        accent="solar quote."
        image="/images/ground-mounted-blue-sky.jpg"
        subtitle="Tell us about your requirement and our team will design a system that fits your roof, load and budget."
        crumbs={[{ label: "Home", href: "/" }, { label: "Free Quote" }]}
      />

      <section className="relative bg-night py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <div className="space-y-4">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="glass rounded-2xl p-5 flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sun-500/15 text-sun-400">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display font-semibold text-warm">
                      {p.title}
                    </p>
                    <p className="mt-1 text-sm text-warm/55">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
