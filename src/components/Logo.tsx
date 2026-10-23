import Link from "next/link";

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-3" aria-label="Vini Corporate home">
      <span className="relative flex h-9 w-9 items-center justify-center">
        <svg viewBox="0 0 40 40" className="h-9 w-9 transition-transform duration-700 group-hover:rotate-90">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="20"
              y1="2.5"
              x2="20"
              y2="7"
              stroke="#fbbf24"
              strokeWidth="1.6"
              strokeLinecap="round"
              transform={`rotate(${i * 30} 20 20)`}
            />
          ))}
          <circle cx="20" cy="20" r="8.5" fill="url(#logo-sun)" />
          <defs>
            <radialGradient id="logo-sun" cx="0.35" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#fff8e1" />
              <stop offset="45%" stopColor="#ffd75e" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
          </defs>
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] font-semibold tracking-tight text-warm">
          Vini Corporate
        </span>
        <span className="mt-1 block text-[9px] uppercase tracking-[0.32em] text-warm/45">
          Solar Energy
        </span>
      </span>
    </Link>
  );
}
