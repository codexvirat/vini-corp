"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Enter-only transition. An AnimatePresence exit (mode="wait") is unreliable with
// the App Router: the new route's children arrive before the exit finishes, and the
// wrapper could stay frozen at its exit state (opacity 0), blanking the page.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const firstRender = useRef(true);
  // The server-rendered landing page shows immediately; only later routes fade in.
  const [landingPath] = useState(pathname);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={pathname === landingPath ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
