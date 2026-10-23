"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteSettings } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${siteSettings.phoneRaw}?text=${encodeURIComponent(
        "Hi Vini Corporate, I'd like to know more about solar installation."
      )}`}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-50 hidden lg:flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.5)]"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
      <MessageCircle className="relative h-7 w-7 text-white" fill="white" />
    </motion.a>
  );
}
