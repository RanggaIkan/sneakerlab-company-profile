"use client";

import { cn } from "@/lib/utils";
import { BadgeCheck, FlaskConical, Microscope } from "lucide-react";

/* ─── Executive Stats ─── */
const EXECUTIVE_STATS = [
  {
    value: "5,000+",
    label: "Pairs Engineered",
    icon: Microscope,
  },
  {
    value: "99.8%",
    label: "Restoration Precision",
    icon: BadgeCheck,
  },
  {
    value: "12+",
    label: "Proprietary Formulas",
    icon: FlaskConical,
  },
] as const;

/* ─── CEO Spotlight ─── */
export default function CEOSpotlight() {
  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      aria-label="CEO Spotlight"
    >
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern-subtle opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,rgba(255,85,0,0.04),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Section Label ── */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-accent-orange/40" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-orange">
            Executive Leadership
          </span>
        </div>

        {/* ── Main Card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* ── Left Column: Portrait ── */}
          <div className="lg:col-span-2">
            <div className="relative group">
              {/* Framed Image Container */}
              <div className="relative aspect-[4/5] w-full max-w-[400px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-dark-border bg-dark-card">
                {/* CEO Portrait Image (Placeholder) */}
                <img
                  src="/images/ceo-profile.jpg"
                  alt="Rangga Wikan Raditya — Founder & CEO of SNEAKERLAB"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const placeholder = target.parentElement?.querySelector(".ceo-placeholder");
                    if (placeholder) (placeholder as HTMLElement).style.display = "flex";
                  }}
                />

                {/* Image Fallback Placeholder */}
                <div className="ceo-placeholder hidden absolute inset-0 flex-col items-center justify-center bg-dark-card text-center p-6">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-accent-orange-dim">
                    <span className="text-2xl font-bold text-accent-orange">RW</span>
                  </div>
                  <p className="text-xs text-text-secondary/60">CEO Portrait</p>
                </div>

                {/* ── Technical Crosshair Overlay ── */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Horizontal line */}
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-accent-cyan/20" />
                  {/* Vertical line */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-accent-cyan/20" />
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full border border-accent-cyan/15" />
                  {/* Corner brackets */}
                  <div className="absolute top-3 left-3 h-6 w-6 border-t-2 border-l-2 border-accent-cyan/30" />
                  <div className="absolute top-3 right-3 h-6 w-6 border-t-2 border-r-2 border-accent-cyan/30" />
                  <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-accent-cyan/30" />
                  <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-accent-cyan/30" />
                  {/* Crosshair dots */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent-cyan/40 animate-crosshair" />
                </div>

                {/* ── CEO Badge ── */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-dark-base/80 backdrop-blur-sm border border-accent-orange/20 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase text-accent-orange">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-orange opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-orange" />
                    </span>
                    Chief Executive Officer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Content ── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Name & Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
                Rangga Wikan Raditya
              </h2>
              <p className="mt-2 text-base sm:text-lg text-accent-orange font-semibold tracking-wide">
                Founder &amp; Chief Executive Officer
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-16 bg-accent-orange/40" />

            {/* Vision Quote */}
            <blockquote className="relative pl-6 border-l-2 border-accent-orange/30">
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed italic">
                &ldquo;We don&apos;t just restore sneakers; we re-engineer their
                molecular durability through precision science.&rdquo;
              </p>
            </blockquote>

            {/* Executive Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {EXECUTIVE_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group rounded-xl border border-dark-border bg-dark-card/50 p-4 transition-all duration-300 hover:border-accent-orange/20 hover:bg-accent-orange-dim/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-orange-dim/20 border border-accent-orange/10 group-hover:bg-accent-orange-dim/30 transition-colors">
                        <Icon className="h-4 w-4 text-accent-orange" />
                      </div>
                      <div>
                        <p className="text-lg font-bold tracking-tight text-text-primary">
                          {stat.value}
                        </p>
                        <p className="text-[11px] font-medium tracking-wide text-text-secondary/70 uppercase">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vision Statement */}
            <p className="text-sm text-text-secondary/60 leading-relaxed max-w-xl pt-2">
              Under Rangga&apos;s leadership, SNEAKERLAB has pioneered
              Indonesia&apos;s first integrated footwear R&D pipeline —
              combining polymer chemistry, digital biomechanics, and
              precision craftsmanship to redefine industry standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

