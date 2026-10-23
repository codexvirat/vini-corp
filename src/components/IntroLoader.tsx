"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DISPLAY_MS = 1400;
const SEEN_KEY = "vc-intro-seen";

// Plays once per browser session so repeat navigations aren't blocked.
export default function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    if (!seen) document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setVisible(false), seen ? 0 : DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-night"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-16 w-16 rounded-full animate-sun-pulse"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #fff8e1 0%, #ffd75e 30%, #f59e0b 62%, #ea580c 100%)",
            }}
          />
          <div className="mt-10 overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-2xl font-semibold text-warm sm:text-3xl"
            >
              Vini <span className="font-serif-accent text-sun-300">Corporate</span>
            </motion.p>
          </div>
          <div className="mt-6 h-px w-40 overflow-hidden bg-warm/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DISPLAY_MS / 1000, ease: "easeInOut" }}
              className="h-full origin-left bg-sun-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
