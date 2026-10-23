import {
  ShieldCheck,
  Award,
  Users,
  Wrench,
  CreditCard,
  CalendarCheck,
  BadgeCheck,
  Sun,
  type LucideIcon,
} from "lucide-react";

const badges: { icon: LucideIcon; label: string }[] = [
  { icon: Sun, label: "Tier-1 Solar Panels" },
  { icon: ShieldCheck, label: "25-Year Performance Warranty" },
  { icon: BadgeCheck, label: "MNRE Subsidy Assistance" },
  { icon: Users, label: "350+ Successful Installations" },
  { icon: Wrench, label: "Certified Installation Team" },
  { icon: CalendarCheck, label: "Free Site Survey" },
  { icon: CreditCard, label: "Flexible Payment Options" },
  { icon: Award, label: "Trusted Since 2019" },
];

export default function TrustMarquee() {
  const doubled = [...badges, ...badges];

  return (
    <div className="relative border-y border-white/10 bg-night-2 py-5 overflow-hidden pause-on-hover">
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-night-2 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-night-2 to-transparent z-10 pointer-events-none" />
      <div className="flex w-max animate-marquee">
        {doubled.map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-6 sm:px-8 text-sm font-medium text-warm/70 whitespace-nowrap shrink-0"
          >
            <b.icon className="h-4 w-4 text-sun-400 shrink-0" />
            {b.label}
            <span className="ml-6 sm:ml-8 h-1 w-1 rounded-full bg-warm/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
