import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import ServiceCards from "@/components/ServiceCards";
import SavingsCalculator from "@/components/SavingsCalculator";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSteps from "@/components/ProcessSteps";
import GalleryGrid from "@/components/GalleryGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import QuoteForm from "@/components/QuoteForm";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { siteSettings, team } from "@/lib/data";

const offerings = [
  "Solar Panel & Battery Distributor",
  "Rooftop & Ground-Mounted Installation",
  "Solar Power Plant Distributor",
  "Lithium Battery Distributor",
];

export default function Home() {
  const founder = team[0];

  return (
    <>
      <Hero />
      <TrustMarquee />

      {/* About — editorial split */}
      <section className="relative bg-night py-28 sm:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
          <Reveal>
            <div className="relative pb-16 pr-10 sm:pr-20">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/images/residential-rooftop-install.jpg"
                  alt="Installer fitting a solar module on a residential roof"
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 aspect-square w-[46%] overflow-hidden rounded-[1.5rem] border-[6px] border-night">
                <Image
                  src="/images/installer-wiring-panel.jpg"
                  alt="Technician wiring a solar junction box"
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute left-6 top-6 rounded-2xl border border-white/15 bg-night/60 px-5 py-4 backdrop-blur-xl">
                <p className="font-serif-accent text-4xl leading-none text-sun-300">
                  {new Date().getFullYear() - siteSettings.founded}+
                </p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-warm/60">
                  Years of service
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="Gorakhpur's trusted"
              accent="solar partner."
              center={false}
            />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-warm/60">
                Based in Golghar, near Gorakhnath Mandir, Vini Corporate has
                been distributing and installing solar panels, batteries and
                rooftop systems since {siteSettings.founded}. Tier-1 products,
                a customer-first team — from your first site survey to years of
                after-sales support.
              </p>
            </Reveal>
            <ul className="mt-10 border-t hairline">
              {offerings.map((item, i) => (
                <Reveal key={item} delay={0.1 + i * 0.06}>
                  <li className="flex items-center justify-between border-b hairline py-4 text-warm/80">
                    <span className="flex items-center gap-5">
                      <span className="font-serif-accent text-lg text-sun-400/70">
                        0{i + 1}
                      </span>
                      {item}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-warm/30" />
                  </li>
                </Reveal>
              ))}
            </ul>
            <Link
              href="/about"
              className="btn-ghost group mt-10 px-6 py-3.5 text-sm"
            >
              More about us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative bg-night-2 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="What We Offer"
              title="Solar solutions for"
              accent="every scale."
              center={false}
            />
            <Reveal delay={0.1}>
              <p className="max-w-sm text-warm/55 leading-relaxed">
                From single-home rooftops to industrial power plants — we
                design, supply and install systems that pay for themselves.
              </p>
            </Reveal>
          </div>
          <ServiceCards />
        </div>
      </section>

      {/* Statement band */}
      <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden">
        <Image
          src="/images/industrial-solar-park-aerial.jpg"
          alt="Aerial view of a solar park"
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-night/70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night-2 via-transparent to-night" />
        <div className="mx-auto max-w-5xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="eyebrow">Our belief</p>
            <p className="font-display mt-8 text-4xl font-semibold leading-[1.1] text-warm sm:text-6xl">
              Every rooftop in Gorakhpur is a{" "}
              <span className="font-serif-accent text-sun-300">
                power plant
              </span>{" "}
              waiting to happen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="relative bg-night py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <SavingsCalculator />
        </div>
      </section>

      {/* Process */}
      <section className="relative bg-night-2 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="How It Works"
              title="From survey to"
              accent="switch-on."
              center={false}
            />
            <Reveal delay={0.1}>
              <p className="max-w-sm text-warm/55 leading-relaxed">
                A simple, transparent process — most residential installs are
                complete within a week.
              </p>
            </Reveal>
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative bg-night py-28 sm:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Why Vini Corporate"
              title="Built on trust,"
              accent="powered by the sun."
              center={false}
            />
            <Reveal delay={0.1}>
              <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[1.75rem] lg:block">
                <Image
                  src="/images/commercial-campus-dusk.jpg"
                  alt="Commercial solar installation at dusk"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
              <Link href="/quote" className="btn-sun group mt-10 px-7 py-4 text-sm">
                Get your free quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <WhyChooseUs />
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="relative bg-night-2 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our Work"
              title="Recent"
              accent="installations."
              center={false}
            />
            <Link
              href="/gallery"
              className="btn-ghost group px-6 py-3.5 text-sm"
            >
              View full gallery
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <GalleryGrid limit={6} />
        </div>
      </section>

      {/* Founder note */}
      {founder && (
        <section className="relative bg-night py-28 sm:py-36">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-[auto_1fr] lg:gap-20">
            <Reveal>
              <div className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-full border hairline sm:h-64 sm:w-64">
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-sun-300 via-sun-500 to-sun-700" />
                <span className="font-serif-accent relative text-7xl text-night">
                  {founder.initials}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow">A note from the founder</p>
              <p className="font-serif-accent mt-6 text-3xl leading-[1.3] text-warm sm:text-4xl">
                &ldquo;We treat every installation as if it were on our own
                roof — honest sizing, quality components, and a team that
                picks up the phone long after the job is done.&rdquo;
              </p>
              <p className="mt-8 font-display font-semibold text-warm">
                {founder.name}
              </p>
              <p className="text-sm text-sun-400">{founder.role}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-night-2 py-28 sm:py-36">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
          <div className="mb-20">
            <SectionHeading
              eyebrow="Testimonials"
              title="What our"
              accent="customers say."
              center={false}
            />
          </div>
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-night py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked"
            accent="questions."
            subtitle="Everything you'd want to know before switching to solar."
          />
          <div className="mt-16">
            <FAQ />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative isolate overflow-hidden py-28 sm:py-36">
        <Image
          src="/images/panel-rows-symmetry.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-50"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/70 to-night-2" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Get Started"
            title="Ready to"
            accent="go solar?"
            subtitle="Share a few details and our team will get back to you within 24 hours with a free, no-obligation quote."
            center={false}
          />
          <Reveal delay={0.1}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
