"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  crumbs,
  image = "/images/panel-texture-dark.jpg",
}: {
  eyebrow: string;
  title: string;
  /** Trailing words set in the serif italic accent face */
  accent?: string;
  subtitle?: string;
  crumbs: { label: string; href?: string }[];
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night pt-40 pb-20 sm:pt-48 sm:pb-28">
      <div className="absolute inset-0 -z-10 animate-ken-burns">
        <Image
          src={image}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/85 to-night/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-transparent to-night/70" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-warm/45"
        >
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="h-px w-4 bg-warm/30" />}
              {c.href ? (
                <Link href={c.href} className="hover:text-sun-400">
                  {c.label}
                </Link>
              ) : (
                <span className="text-warm/80">{c.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>
        <h1 className="font-display mt-6 max-w-4xl overflow-hidden pb-[0.08em] text-5xl font-semibold leading-[1] text-warm sm:text-6xl lg:text-7xl">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.1, ease }}
          >
            {title}
            {accent && (
              <>
                {" "}
                <span className="font-serif-accent text-sun-300">{accent}</span>
              </>
            )}
          </motion.span>
        </h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-7 max-w-xl text-base leading-relaxed text-warm/65 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
