import type { Metadata } from "next";
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { siteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us | Vini Corporate",
  description:
    "Get in touch with Vini Corporate — solar panel dealer & installer in Golghar, Gorakhpur. Call, WhatsApp, or send us a message.",
};

const details = [
  { icon: MapPin, label: "Address", value: siteSettings.address },
  { icon: PhoneCall, label: "Phone (24/7)", value: siteSettings.phone },
  { icon: Mail, label: "Email", value: siteSettings.email },
  { icon: Clock, label: "Hours", value: "Mon – Sun: 9:00 AM – 8:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd love to"
        accent="hear from you."
        image="/images/panels-orchard.jpg"
        subtitle="Questions about solar for your home or business? Send us a message or give us a call."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="relative bg-night py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <div className="space-y-4">
            {details.map((d, i) => (
              <Reveal key={d.label} delay={i * 0.08}>
                <div className="glass rounded-2xl p-5 flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sun-500/15 text-sun-400">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-warm/45 uppercase tracking-wide">
                      {d.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-warm/85">
                      {d.value}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="rounded-2xl overflow-hidden border border-white/10 h-56">
                <iframe
                  src={siteSettings.mapEmbed}
                  className="w-full h-full grayscale invert-[0.92] contrast-[1.1]"
                  loading="lazy"
                  title="Vini Corporate Location"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
