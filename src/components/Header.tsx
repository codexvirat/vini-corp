"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, PhoneCall } from "lucide-react";
import { siteSettings, solarTypes } from "@/lib/data";
import { iconMap } from "./icons";
import LiveClock from "./LiveClock";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "bg-night/80 backdrop-blur-xl border-b border-white/[0.08] py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        <Logo onClick={() => setMobileOpen(false)} />

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.label === "Services" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-warm/80 hover:text-warm rounded-full transition-colors"
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[560px]"
                    >
                      <div className="rounded-2xl border border-white/10 bg-night/95 backdrop-blur-xl p-3 grid grid-cols-2 gap-1 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                        {solarTypes.map((t) => {
                          const Icon = iconMap[t.icon];
                          return (
                            <Link
                              key={t.slug}
                              href={`/services/${t.slug}`}
                              onClick={() => setMegaOpen(false)}
                              className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-white/8 transition-colors"
                            >
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sun-500/15 text-sun-400">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span>
                                <span className="block text-sm font-medium text-warm">
                                  {t.name}
                                </span>
                                <span className="block text-xs text-warm/50 leading-snug">
                                  {t.short}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  pathname === link.href
                    ? "text-warm bg-white/10"
                    : "text-warm/80 hover:text-warm"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LiveClock variant="compact" />
          <span className="h-4 w-px bg-white/15" />
          <a
            href={`tel:${siteSettings.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-medium text-warm/80 hover:text-warm"
          >
            <PhoneCall className="h-4 w-4 text-sun-400" />
            {siteSettings.phone}
          </a>
          <Link
            href="/quote"
            className="btn-sun px-5 py-2.5 text-sm"
          >
            Get Free Quote
          </Link>
        </div>

        <button
          className="lg:hidden text-warm p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-night/95 backdrop-blur-lg border-t border-white/10 mt-4"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              <LiveClock className="mb-4 self-start" />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-warm/85 font-medium border-b border-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3">
                <p className="text-xs text-warm/40 mb-2 uppercase tracking-wide">
                  Solar Systems
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {solarTypes.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/services/${t.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-warm/70 py-1.5"
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/quote"
                onClick={() => setMobileOpen(false)}
                className="mt-5 text-center rounded-full bg-gradient-to-r from-sun-400 to-sun-600 px-5 py-3 text-sm font-semibold text-night"
              >
                Get Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
