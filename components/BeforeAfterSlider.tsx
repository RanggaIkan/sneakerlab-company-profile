"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowLeftRight, ZoomIn } from "lucide-react";

/* ─── Before/After Slider ─── */
export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Drag handlers ── */
  const updateSlider = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      updateSlider(e.touches[0].clientX);
    },
    [updateSlider]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => updateSlider(e.clientX);
    const handleTouchMove = (e: TouchEvent) => updateSlider(e.touches[0].clientX);
    const handleEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, updateSlider]);

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      aria-label="Before and After Restoration Comparison"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern-subtle opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_40%,rgba(255,85,0,0.04),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Section Label ── */}
        <div className="flex items-center gap-3 mb-2">
          <span className="h-px w-8 bg-accent-orange/40" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-orange">
            Restoration Showcase
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-2">
          Before &amp; After
          <br />
          <span className="text-gradient-orange">Molecular Restoration</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mb-10 sm:mb-14">
          Drag the slider to compare the original worn condition against our
          full-spectrum chemical restoration process.
        </p>

        {/* ── Slider Container ── */}
        <div className="max-w-4xl mx-auto">
          <div className="relative group/slider">
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-3xl bg-accent-orange/5 blur-2xl opacity-30 group-hover/slider:opacity-60 transition-opacity duration-700" />

            <div
              ref={containerRef}
              className={cn(
                "relative w-full rounded-2xl overflow-hidden select-none cursor-ew-resize",
                "border border-dark-border bg-dark-card",
                "shadow-[0_0_40px_rgba(255,85,0,0.06)]"
              )}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              role="slider"
              aria-label="Before and after restoration comparison slider"
              aria-valuenow={Math.round(sliderPos)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setSliderPos((p) => Math.min(100, p + 2));
                if (e.key === "ArrowLeft") setSliderPos((p) => Math.max(0, p - 2));
              }}
            >
              {/* Aspect ratio container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full">
                {/* ── After Image (full width, visible when slider is to the left) ── */}
                <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                  <Image
                    src="/images/after_shoe.jpg"
                    alt="After restoration — SNEAKERLAB fully restored pair"
                    fill
                    priority
                    className={cn(
                      "object-cover transition-opacity duration-500",
                      afterLoaded ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={() => setAfterLoaded(true)}
                    onError={() => setAfterLoaded(true)}
                  />
                  {/* After label */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-orange/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-dark-base">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dark-base opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-dark-base" />
                      </span>
                      Restored
                    </span>
                  </div>
                </div>

                {/* ── Before Image (clipped by slider) ── */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-[inherit]"
                  style={{ width: `${100 - sliderPos}%` }}
                >
                  <div className="absolute inset-0" style={{ right: 0 }}>
                    <Image
                      src="/images/before_shoe.jpg"
                      alt="Before restoration — worn-out sneaker condition"
                      fill
                      priority
                      className={cn(
                        "object-cover transition-opacity duration-500",
                        beforeLoaded ? "opacity-100" : "opacity-0"
                      )}
                      onLoad={() => setBeforeLoaded(true)}
                      onError={() => setBeforeLoaded(true)}
                    />
                  </div>
                  {/* Before label */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-text-secondary/80 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-dark-base">
                      Before
                    </span>
                  </div>
                </div>

                {/* ── Slider Handle ── */}
                <div
                  className="absolute inset-y-0 z-20 flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  {/* Handle line */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.3)]" />

                  {/* Handle thumb */}
                  <div
                    className={cn(
                      "relative flex h-10 w-10 items-center justify-center rounded-full",
                      "bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.3)]",
                      "transition-transform duration-150",
                      isDragging ? "scale-110" : "scale-100"
                    )}
                  >
                    <ArrowLeftRight className="h-4 w-4 text-dark-base" />
                  </div>
                </div>

                {/* ── Fallback placeholders if images haven't loaded ── */}
                {(!beforeLoaded || !afterLoaded) && (
                  <div className="absolute inset-0 flex items-center justify-center z-[1]">
                    <div className="flex flex-col items-center gap-3 text-text-secondary/30">
                      <ZoomIn className="h-8 w-8" />
                      <span className="text-xs font-mono">Loading comparison...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Slider Percentage Indicator ── */}
          <div className="mt-4 flex items-center justify-between text-[10px] font-mono tracking-wider text-text-secondary/40">
            <span>Before</span>
            <span className="text-accent-orange/60 font-bold">{Math.round(sliderPos)}% restored</span>
            <span>After</span>
          </div>
        </div>
      </div>
    </section>
  );
}
