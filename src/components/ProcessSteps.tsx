import { ClipboardList, Ruler, HardHat, PlugZap } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    icon: ClipboardList,
    title: "Free Site Survey",
    body: "Our team visits your site to assess roof/land space, shading, and daily consumption.",
  },
  {
    icon: Ruler,
    title: "Custom Design & Quote",
    body: "We design a system sized to your load and budget, with transparent, itemised pricing.",
  },
  {
    icon: HardHat,
    title: "Professional Installation",
    body: "Certified installers mount, wire and commission your system — most jobs done in days.",
  },
  {
    icon: PlugZap,
    title: "Net Metering & Handover",
    body: "We handle DISCOM paperwork and switch you on, with after-sales support included.",
  },
];

export default function ProcessSteps() {
  return (
    <div className="relative grid gap-px overflow-hidden rounded-[1.75rem] border hairline bg-warm/10 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.12} className="h-full">
          <div className="group relative flex h-full flex-col bg-night p-8 transition-colors duration-500 hover:bg-night-2 lg:min-h-[22rem]">
            <div className="flex items-start justify-between">
              <span className="font-serif-accent text-6xl leading-none text-warm/15 transition-colors duration-500 group-hover:text-sun-400/70">
                {i + 1}
              </span>
              <step.icon className="h-6 w-6 text-sun-400" strokeWidth={1.5} />
            </div>
            <div className="mt-auto pt-12">
              <h4 className="font-display text-xl font-semibold text-warm">
                {step.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-warm/55">
                {step.body}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
