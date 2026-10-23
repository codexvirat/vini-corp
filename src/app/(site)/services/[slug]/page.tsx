import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import { solarTypes } from "@/lib/data";
import { iconMap } from "@/components/icons";

export function generateStaticParams() {
  return solarTypes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const type = solarTypes.find((t) => t.slug === slug);
  if (!type) return {};
  return {
    title: `${type.name} | Vini Corporate`,
    description: type.intro,
  };
}

export default async function SolarTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = solarTypes.find((t) => t.slug === slug);
  if (!type) notFound();

  const Icon = iconMap[type.icon];
  const others = solarTypes.filter((t) => t.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Solar System"
        title={type.name}
        subtitle={type.short}
        image={type.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: type.name },
        ]}
      />

      <section className="relative bg-night py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-[1.3fr_0.9fr] gap-14">
          <div>
            <Reveal>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sun-500/15 text-sun-400 mb-6">
                <Icon className="h-7 w-7" />
              </span>
              <p className="text-warm/65 leading-relaxed text-lg">
                {type.intro}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[1.5rem] border hairline">
                <Image
                  src={type.image}
                  alt={type.name}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="font-display mt-10 text-xl font-semibold text-warm">
                Key Benefits
              </h3>
              <ul className="mt-5 grid sm:grid-cols-2 gap-3">
                {type.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-sm text-warm/70"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-eco-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-12 grid sm:grid-cols-2 gap-5">
              {type.subsections.map((s, i) => (
                <Reveal key={s.title} delay={0.15 + i * 0.08}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <h4 className="font-display font-semibold text-warm">
                      {s.title}
                    </h4>
                    <p className="mt-2 text-sm text-warm/55 leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-12 rounded-2xl bg-gradient-to-r from-sun-500/15 to-sun-600/5 border border-sun-500/20 p-6 flex flex-wrap items-center justify-between gap-4">
                <p className="font-display text-lg font-semibold text-warm">
                  {type.cta}
                </p>
                <Link
                  href="/quote"
                  className="btn-sun shrink-0 px-6 py-3 text-sm"
                >
                  Get Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div>
            <div className="sticky top-28">
              <QuoteForm compact />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-night-2 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHeading eyebrow="Explore More" title="Other solar"
            accent="systems." />
          <div className="mt-14 grid sm:grid-cols-3 gap-5">
            {others.map((t, i) => {
              const OIcon = iconMap[t.icon];
              return (
                <Reveal key={t.slug} delay={i * 0.08}>
                  <Link
                    href={`/services/${t.slug}`}
                    className="group block rounded-2xl glass p-6 h-full transition-transform hover:-translate-y-1"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sun-500/15 text-sun-400">
                      <OIcon className="h-5 w-5" />
                    </span>
                    <h4 className="font-display mt-4 font-semibold text-warm">
                      {t.name}
                    </h4>
                    <p className="mt-1.5 text-sm text-warm/55 leading-relaxed">
                      {t.short}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
