import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, PhoneCall, Mail, MapPin } from "lucide-react";
import { siteSettings, solarTypes } from "@/lib/data";
import { InstagramIcon } from "./icons";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night">
      {/* Closing CTA band */}
      <section className="relative isolate overflow-hidden border-t hairline">
        <Image
          src="/images/grid-power-lines-sunset.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/40 to-night" />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
          <p className="eyebrow">Start your solar journey</p>
          <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display max-w-4xl text-5xl font-semibold leading-[0.98] text-warm sm:text-7xl lg:text-8xl">
              Let&apos;s power your{" "}
              <span className="font-serif-accent text-sun-300">tomorrow.</span>
            </h2>
            <Link
              href="/quote"
              className="group flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-full bg-sun-400 text-night transition-transform duration-500 hover:scale-105 sm:h-44 sm:w-44"
            >
              <ArrowUpRight className="h-8 w-8 transition-transform duration-500 group-hover:rotate-45" />
              <span className="mt-2 text-sm font-semibold">Free Quote</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 border-t hairline px-6 py-16 sm:grid-cols-2 sm:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-warm/50">
            Solar panel dealer &amp; installation company based in Golghar,
            Gorakhpur — powering homes and businesses since{" "}
            {siteSettings.founded}.
          </p>
          <a
            href={siteSettings.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-warm/15 text-warm/70 transition-colors hover:border-sun-400 hover:text-sun-400"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
        </div>

        <FooterCol title="Company">
          {[
            ["About Us", "/about"],
            ["Services", "/services"],
            ["Gallery", "/gallery"],
            ["Free Quote", "/quote"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="transition-colors hover:text-sun-400">
                {label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Solar Systems">
          {solarTypes.slice(0, 5).map((t) => (
            <li key={t.slug}>
              <Link
                href={`/services/${t.slug}`}
                className="transition-colors hover:text-sun-400"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Get in Touch">
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sun-400" />
            {siteSettings.address}
          </li>
          <li className="flex items-center gap-3">
            <PhoneCall className="h-4 w-4 shrink-0 text-sun-400" />
            <a href={`tel:${siteSettings.phoneRaw}`} className="hover:text-sun-400">
              {siteSettings.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="h-4 w-4 shrink-0 text-sun-400" />
            <a href={`mailto:${siteSettings.email}`} className="break-all hover:text-sun-400">
              {siteSettings.email}
            </a>
          </li>
        </FooterCol>
      </div>

      <div className="relative border-t hairline">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-warm/35 sm:flex-row sm:px-10">
          <p>
            &copy; {new Date().getFullYear()} {siteSettings.legalName}. All
            Rights Reserved.
          </p>
          <p>Design &amp; Developed by Vatrix Technologies</p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <p
        aria-hidden
        className="font-display pointer-events-none select-none whitespace-nowrap px-4 pb-4 text-center text-[14.5vw] font-semibold leading-[0.8] tracking-[-0.06em] text-warm/[0.035]"
      >
        Vini Corporate
      </p>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-warm/40">
        {title}
      </h4>
      <ul className="space-y-3 text-sm text-warm/65">{children}</ul>
    </div>
  );
}
