"use client";

import Link from "next/link";
import { PhoneCall, MessageCircle, Zap } from "lucide-react";
import { siteSettings } from "@/lib/data";

export default function MobileCTABar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-3 border-t border-white/10 bg-night/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]">
      <a
        href={`tel:${siteSettings.phoneRaw}`}
        className="flex flex-col items-center justify-center gap-1 py-3 text-warm/75 border-r border-white/10"
      >
        <PhoneCall className="h-4.5 w-4.5 text-sun-400" />
        <span className="text-[11px] font-medium">Call</span>
      </a>
      <a
        href={`https://wa.me/${siteSettings.phoneRaw}?text=${encodeURIComponent(
          "Hi Vini Corporate, I'd like to know more about solar installation."
        )}`}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center justify-center gap-1 py-3 text-warm/75 border-r border-white/10"
      >
        <MessageCircle className="h-4.5 w-4.5 text-eco-400" />
        <span className="text-[11px] font-medium">WhatsApp</span>
      </a>
      <Link
        href="/quote"
        className="flex flex-col items-center justify-center gap-1 py-3 bg-gradient-to-r from-sun-400 to-sun-600 text-night"
      >
        <Zap className="h-4.5 w-4.5" />
        <span className="text-[11px] font-semibold">Get Quote</span>
      </Link>
    </div>
  );
}
