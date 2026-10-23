import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import Reveal from "./Reveal";

export default function ServiceCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {services.map((s, i) => (
        <Reveal key={s.slug} delay={i * 0.1} className="h-full">
          <Link
            href={`/services/${s.slug}`}
            className="group relative flex h-[30rem] flex-col justify-end overflow-hidden rounded-[1.75rem] border hairline lg:h-[34rem]"
          >
            <Image
              src={s.image}
              alt={s.name}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/5 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-sun-600/0 mix-blend-soft-light transition-colors duration-700 group-hover:bg-sun-600/30" />

            <span className="absolute left-7 top-7 font-serif-accent text-2xl text-warm/80">
              0{i + 1}
            </span>
            <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-warm/25 bg-night/30 text-warm backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-sun-400 group-hover:bg-sun-400 group-hover:text-night">
              <ArrowUpRight className="h-5 w-5" />
            </span>

            <div className="relative p-7">
              <h3 className="font-display text-2xl font-semibold text-warm sm:text-[1.7rem]">
                {s.name}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-warm/65">
                {s.tagline}
              </p>
              <span className="mt-6 block h-px w-full origin-left scale-x-[0.18] bg-sun-400 transition-transform duration-700 group-hover:scale-x-100" />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
