"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { gallery, galleryCategories } from "@/lib/data";
import Reveal from "./Reveal";

// Bento rhythm: every 6 tiles, one large feature tile and one tall tile
const spanFor = (i: number) => {
  const n = i % 6;
  if (n === 0) return "col-span-2 row-span-2";
  if (n === 3) return "row-span-2";
  return "";
};

export default function GalleryGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(() => {
    const filtered =
      filter === "All" ? gallery : gallery.filter((g) => g.category === filter);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [filter, limit]);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((a) => (a === null ? a : (a + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  const current = active !== null ? items[active] : null;

  return (
    <>
      {!limit && (
        <div className="mb-10 flex flex-wrap gap-2">
          {["All", ...galleryCategories].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                filter === c ? "text-night" : "text-warm/65 hover:text-warm"
              }`}
            >
              {filter === c && (
                <motion.span
                  layoutId="gallery-filter"
                  className="absolute inset-0 rounded-full bg-sun-400"
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
      )}

      <Reveal>
      <motion.div
        layout
        className="grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {items.map((g, i) => (
            <motion.button
              layout
              key={g.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, delay: (i % 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-2xl border hairline text-left ${spanFor(i)}`}
            >
              <Image
                src={g.src}
                alt={g.title}
                fill
                sizes="(min-width: 1024px) 40vw, 60vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-sun-300">
                    {g.category}
                  </p>
                  <p className="font-display mt-1 text-sm font-semibold text-warm sm:text-base">
                    {g.title}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 scale-75 items-center justify-center rounded-full bg-warm text-night opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <Plus className="h-4 w-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      </Reveal>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex flex-col bg-night/95 backdrop-blur-xl"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <div className="flex items-center justify-between px-6 py-5 sm:px-10">
              <p className="text-xs uppercase tracking-[0.25em] text-warm/50 tabular-nums">
                {String((active ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </p>
              <button
                onClick={close}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-warm/20 text-warm hover:bg-warm/10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full max-h-[78vh] w-full max-w-6xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={current.src}
                    alt={current.title}
                    fill
                    sizes="90vw"
                    className="rounded-2xl object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {items.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      step(-1);
                    }}
                    className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-warm/20 bg-night/50 text-warm hover:bg-warm/10 sm:left-6"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      step(1);
                    }}
                    className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-warm/20 bg-night/50 text-warm hover:bg-warm/10 sm:right-6"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="px-6 pb-8 text-center sm:px-10">
              <p className="text-[11px] uppercase tracking-[0.25em] text-sun-300">
                {current.category}
              </p>
              <p className="font-display mt-1 text-lg font-semibold text-warm">
                {current.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
