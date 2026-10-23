import type { Metadata } from "next";
import { CreditCard, Landmark, Banknote, Smartphone } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { siteSettings, stats, team } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Vini Corporate",
  description:
    "Learn about Vini Corporate — solar panel dealer & installer based in Golghar, Gorakhpur, established 2019.",
};

const paymentModes = [
  { icon: Smartphone, label: "UPI" },
  { icon: Landmark, label: "Net Banking" },
  { icon: CreditCard, label: "Cheque / DD" },
  { icon: Banknote, label: "Cash" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Powering Gorakhpur,"
        accent="one rooftop at a time."
        image="/images/residential-terrace-panel.jpg"
        subtitle="A local solar company built on quality products, honest advice and dependable installation."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="relative bg-night py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <div className="glass rounded-2xl px-6 py-6 text-center">
                <div className="font-display text-3xl font-bold sun-gradient-text">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1.5 text-xs text-warm/60">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative bg-night py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <Reveal>
            <p className="text-warm/65 leading-relaxed text-lg">
              Founded in {siteSettings.founded} and based in{" "}
              {siteSettings.address}, Vini Corporate has grown into a trusted
              name for solar panel distribution and installation across
              Gorakhpur. We supply and install solar panels, batteries,
              rooftop systems and complete solar power plants for homes,
              shops, and industries — backed by a small, dedicated team that
              treats every installation like it&apos;s on their own roof.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-night-2 py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow="What We Do"
            title="Our"
            accent="offerings."
            subtitle="Everything you need to go solar, under one roof."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Solar Panel Distributor",
              "Battery Distributor",
              "Solar Panel Installation Services",
              "Rooftop Solar System Distributor",
              "Solar Power Plant Distributor",
              "Lithium Battery Distributor",
            ].map((item, i) => (
              <Reveal key={item} delay={i * 0.06}>
                <div className="glass rounded-2xl px-6 py-5 text-sm font-medium text-warm/80 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-sun-400 shrink-0" />
                  {item}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-night py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHeading eyebrow="Why Us" title="Why choose"
            accent="Vini Corporate." />
          <div className="mt-14">
            <WhyChooseUs />
          </div>
        </div>
      </section>

      <section className="relative bg-night-2 py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeading
              eyebrow="Flexible Payments"
              title="Pay however"
              accent="works for you."
              center={false}
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {paymentModes.map((p, i) => (
                <Reveal key={p.label} delay={i * 0.08}>
                  <div className="glass rounded-2xl px-5 py-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sun-500/15 text-sun-400">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-warm/80">
                      {p.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Leadership"
              title="Meet the"
              accent="team."
              center={false}
            />
            <div className="mt-8 flex flex-wrap gap-6">
              {team.map((member) => (
                <Reveal key={member.name}>
                  <div className="glass rounded-3xl p-6 text-center w-56">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sun-400 to-sun-600 font-display text-xl font-bold text-night">
                      {member.initials}
                    </div>
                    <h4 className="font-display mt-4 font-semibold text-warm">
                      {member.name}
                    </h4>
                    <p className="text-sm text-sun-400">{member.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
