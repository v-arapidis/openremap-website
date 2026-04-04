"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const slides = [
  {
    label: "Identify",
    image: "/identify_2.png",
    alt: "OpenRemap TUI — Identify panel showing a Bosch EDC17CP14 identification",
    caption:
      "Drop in any ECU binary and get a full breakdown — manufacturer, family, variant, software version, hardware number, and a confidence score you can trust.",
  },
  {
    label: "Scan",
    image: "/tui-scan.png",
    alt: "OpenRemap TUI — Scan panel showing batch identification of 24 ECU files",
    caption:
      "Point it at a folder of bins. Every file gets identified, classified, and colour-coded. Hit Organise to sort them into a clean manufacturer / family tree.",
  },
  {
    label: "Cook",
    image: "/cook.png",
    alt: "OpenRemap TUI — Cook panel showing a completed recipe with 79 instructions",
    caption:
      "Feed in a stock and tuned binary. Out comes a .remap recipe — your calibration work, cleanly separated from the OEM firmware.",
  },
  {
    label: "Tune",
    image: "/tune_1.png",
    alt: "OpenRemap TUI — Tune panel showing three-phase validation and successful patch",
    caption:
      "Three safety phases run automatically — pre-flight check, apply, post-tune verification. All-or-nothing. If anything fails, nothing gets written.",
  },
] as const;

export default function TuiGallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = slides[active];

  const closeLightbox = useCallback(() => setLightbox(false), []);

  const go = useCallback(
    (next: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      // brief delay to allow fade-out before switching
      timeoutRef.current = setTimeout(() => {
        setActive(next);
        setIsTransitioning(false);
      }, 150);
    },
    [isTransitioning],
  );

  const prev = useCallback(
    () => go((active - 1 + slides.length) % slides.length),
    [active, go],
  );
  const next = useCallback(
    () => go((active + 1) % slides.length),
    [active, go],
  );

  // Keyboard navigation
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightbox) closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [lightbox, closeLightbox, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [lightbox]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <div className="w-full">
        {/* ── Terminal window mockup ──────────────────────────── */}
        <div className="group relative mx-auto max-w-5xl">
          {/* Outer glow on hover */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-emerald-500/20 via-emerald-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-sm" />

          <div className="relative overflow-hidden rounded-2xl border border-neutral-700/50 bg-[#0d0d14] shadow-2xl shadow-black/60">
            {/* Title bar */}
            <div className="relative flex items-center border-b border-neutral-800/80 bg-[#161622] px-4 py-2.5">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              {/* Window title */}
              <span className="absolute inset-x-0 text-center text-xs font-medium text-neutral-500 pointer-events-none">
                OpenRemap — ECU Toolkit
              </span>
              {/* Expand button */}
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="ml-auto rounded-md p-1 text-neutral-600 transition-colors hover:text-neutral-300"
                aria-label="View full screen"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Screenshot area */}
            <div className="relative">
              {/* Image stack */}
              <div className="relative aspect-[16/9]">
                {slides.map((slide, i) => (
                  <div
                    key={slide.label}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-all duration-300 ease-out ${
                      i === active && !isTransitioning
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-[0.98] pointer-events-none"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      className="object-cover object-top cursor-zoom-in"
                      priority={i === 0}
                      onClick={() => setLightbox(true)}
                    />
                  </div>
                ))}
              </div>

              {/* Bottom gradient overlay with caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pb-5 pt-16">
                <p className="text-sm leading-relaxed text-neutral-300 max-w-2xl">
                  {current.caption}
                </p>
              </div>

              {/* Nav arrows — visible on hover */}
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/70 opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 hover:text-white group-hover:opacity-100"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/70 opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 hover:text-white group-hover:opacity-100"
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Pill selectors ─────────────────────────────────── */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.label}
              type="button"
              onClick={() => go(i)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                i === active
                  ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
                  : "bg-neutral-800/50 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300"
              }`}
            >
              {slide.label}
            </button>
          ))}
        </div>
      </div>

      {/* ──────────────────── Lightbox ──────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.label} screenshot — full screen`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={closeLightbox}
          />

          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4">
            {/* Pill selectors inside lightbox */}
            <div className="flex items-center gap-1.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.label}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(i);
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                    i === active
                      ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {slide.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="rounded-full p-2 text-neutral-500 transition-colors hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/5 p-3 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/5 p-3 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative z-0 mx-auto max-h-[85vh] max-w-[92vw] cursor-zoom-out"
            onClick={closeLightbox}
          >
            <Image
              src={current.image}
              alt={current.alt}
              width={2920}
              height={1560}
              className="max-h-[85vh] w-auto rounded-xl object-contain"
              quality={95}
              priority
            />
          </div>

          {/* Bottom caption */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent px-6 pb-6 pt-12">
            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-neutral-400">
              {current.caption}
            </p>
            {/* Progress bar */}
            <div className="mx-auto mt-4 flex max-w-xs items-center gap-1.5">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                    i === active ? "bg-emerald-400" : "bg-neutral-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-3 text-neutral-600 sm:flex">
            <span className="flex items-center gap-1 text-xs">
              <kbd className="rounded border border-neutral-700 bg-neutral-800/50 px-1.5 py-0.5 font-mono text-[10px]">
                ←
              </kbd>
              <kbd className="rounded border border-neutral-700 bg-neutral-800/50 px-1.5 py-0.5 font-mono text-[10px]">
                →
              </kbd>
              <span className="ml-0.5">navigate</span>
            </span>
            <span className="flex items-center gap-1 text-xs">
              <kbd className="rounded border border-neutral-700 bg-neutral-800/50 px-1.5 py-0.5 font-mono text-[10px]">
                esc
              </kbd>
              <span className="ml-0.5">close</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
