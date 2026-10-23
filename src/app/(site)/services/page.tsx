import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCards from "@/components/ServiceCards";
import ProcessSteps from "@/components/ProcessSteps";
import ComparisonTable from "@/components/ComparisonTable";
import Reveal from "@/components/Reveal";
import { solarTypes } from "@/lib/data";
import { iconMap } from "@/components/icons";

export const metadata: Metadata = {
  title: "Services | Vini Corporate",
  description:
    "Residential, commercial & industrial solar installation services from Vini Corporate — rooftop, ground-mounted, on-grid & off-grid systems.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Solar systems for"
        accent="every need."
        image="/images/ground-mounted-array-clouds.jpg"
        subtitle="Whether it's a home, a shop or a factory floor — we design and install the right solar system for you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="relative bg-night py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow="Top-Level Services"
            title="Residential, commercial"
            accent="& industrial."
          />
          <div className="mt-14">
            <ServiceCards />
          </div>
        </div>
      </section>

      <section className="relative bg-night-2 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow="All Solar System Types"
            title="Explore every system"
            accent="we install."
            subtitle="From rooftop to ground-mounted, on-grid to fully independent off-grid setups."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solarTypes.map((t, i) => {
              const Icon = iconMap[t.icon];
              return (
                <Reveal key={t.slug} delay={(i % 6) * 0.06} className="h-full">
                  <Link
                    href={`/services/${t.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border hairline bg-night transition-colors duration-500 hover:border-sun-400/40"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
                      <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-night/40 text-sun-300 backdrop-blur-md">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-xl font-semibold text-warm">
                        {t.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-warm/55">
                        {t.short}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-sun-400">
                        View details
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-night py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow="Which One's Right for You"
            title="On-grid, off-grid"
            accent="or hybrid?"
            subtitle="A quick side-by-side to help you decide before you talk to our team."
          />
          <div className="mt-14">
            <ComparisonTable />
          </div>
        </div>
      </section>

      <section className="relative bg-night-2 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHeading eyebrow="Our Process" title="How we get"
            accent="you live." />
          <div className="mt-16">
            <ProcessSteps />
          </div>
        </div>
      </section>
    </>
  );
}
