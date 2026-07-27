"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Shield, FlaskConical } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero Banner"
    >
      {/* ── Background Layers ── */}
      {/* Dark radial gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,85,0,0.08),transparent_70%)]" />

      {/* Subtle secondary cyan glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_80%,rgba(0,229,255,0.05),transparent_60%)]" />

      {/* Technical grid pattern from globals.css */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Animated scan-line overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(255,85,0,0.015)_50%)] bg-[length:100%_4px] animate-scan" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24 sm:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left Column: Text Content ── */}
          <div>
            {/* ── Status Badges ── */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,229,255,0.2)] bg-[rgba(0,229,255,0.06)] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-accent-cyan uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
                </span>
                <span>Lab Status: Active</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-orange-dim bg-accent-orange-dim/20 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-accent-orange uppercase">
                <FlaskConical className="h-3.5 w-3.5" />
                <span>R&D System V2.4</span>
              </span>
            </div>

            {/* ── Headline ── */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight">
              <span className="text-text-primary">ENGINEERING</span>
              <br />
              <span className="text-gradient-orange">THE FUTURE</span>
              <br />
              <span className="text-text-primary">OF FOOTWEAR</span>
            </h1>

            {/* ── Subheadline ── */}
            <p className="mt-6 max-w-xl text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed">
              Indonesia&apos;s premier sneaker R&D laboratory. From chemical
              formulas to performance restoration — pushing the boundaries of
              material science and biomechanical engineering.
            </p>

            {/* ── CTA Buttons ── */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4">
              <a
                href="#lab-blueprint"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("lab-blueprint")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="gap-2 hover:shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-shadow duration-300"
                >
                  Explore The Lab
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>

              <a
                href="#leadership"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("leadership")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="group gap-2 border-accent-orange/20 hover:border-accent-orange/50 hover:bg-accent-orange-dim/10 hover:shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-accent-orange/70 group-hover:text-accent-orange transition-colors" />
                    <span>Schedule CEO Consultation</span>
                  </span>
                </Button>
              </a>
            </div>

            {/* ── Bottom Indicator ── */}
            <div className="mt-16 sm:mt-20 flex items-center gap-3 text-[11px] font-medium tracking-[0.15em] text-text-secondary/40 uppercase">
              <span className="h-px w-8 bg-text-secondary/20" />
              <span>Precision Engineered in Indonesia</span>
              <span className="h-px w-8 bg-text-secondary/20" />
            </div>
          </div>

          {/* ── Right Column: Visual Showcase Card ── */}
          <div className="hidden lg:block relative">
            {/* Outer glow */}
            <div className="absolute -inset-6 rounded-[2rem] bg-accent-orange/5 blur-3xl opacity-40" />

            <div className="relative rounded-2xl border border-dark-border bg-dark-card/60 backdrop-blur-sm overflow-hidden group/chamber shadow-[0_0_40px_rgba(255,85,0,0.08)] hover:shadow-[0_0_60px_rgba(255,85,0,0.15)] transition-shadow duration-500">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent-cyan/20 rounded-tl-2xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent-cyan/20 rounded-tr-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-accent-orange/20 rounded-bl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent-orange/20 rounded-br-2xl pointer-events-none" />

              {/* Image container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/images/chamber-testing.jpg"
                  alt="SNEAKERLAB Chamber Testing — R&D Laboratory"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/chamber:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const fallback = target.parentElement?.querySelector(".chamber-fallback");
                    if (fallback) (fallback as HTMLElement).style.display = "flex";
                  }}
                />

                {/* SVG Fallback */}
                <div className="chamber-fallback hidden absolute inset-0 bg-dark-elevated items-center justify-center">
                  <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <pattern id="chamber-grid" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                        <rect width={20} height={20} fill="none" />
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,229,255,0.06)" strokeWidth={0.5} />
                      </pattern>
                    </defs>
                    <rect width={400} height={300} fill="url(#chamber-grid)" />
                    <circle cx={200} cy={150} r={60} fill="none" stroke="rgba(255,85,0,0.15)" strokeWidth={1} strokeDasharray="4,3" />
                    <circle cx={200} cy={150} r={20} fill="none" stroke="rgba(0,229,255,0.2)" strokeWidth={1} />
                    <line x1={200} y1={90} x2={200} y2={50} stroke="rgba(255,85,0,0.2)" strokeWidth={1} />
                    <line x1={200} y1={210} x2={200} y2={250} stroke="rgba(255,85,0,0.2)" strokeWidth={1} />
                    <line x1={140} y1={150} x2={100} y2={150} stroke="rgba(255,85,0,0.2)" strokeWidth={1} />
                    <line x1={260} y1={150} x2={300} y2={150} stroke="rgba(255,85,0,0.2)" strokeWidth={1} />
                    <text x={200} y={280} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.15)" fontFamily="monospace">CHAMBER TESTING // R&D LAB</text>
                  </svg>
                </div>

                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-dark-base/80 backdrop-blur-sm border border-accent-orange/20 px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase text-accent-orange">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-orange opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-orange" />
                    </span>
                    Live Testing
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-dark-base/80 backdrop-blur-sm border border-accent-cyan/20 px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase text-accent-cyan">
                    Chamber 03
                  </span>
                </div>
              </div>

              {/* Info bar */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-dark-border bg-dark-base/40">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-text-secondary/40">
                  <FlaskConical className="h-3 w-3 text-accent-orange/50" />
                  <span>Pressure: 101.3 kPa</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-text-secondary/40">
                  <span className="h-2 w-2 rounded-full bg-green-500/60 animate-pulse" />
                  <span>Temp: 23.4 °C</span>
                </div>
              </div>
            </div>

            {/* Corner ornament */}
            <div className="absolute -top-4 -right-4 hidden lg:block">
              <div className="flex flex-col items-end gap-1.5 text-[10px] font-mono tracking-wider text-text-secondary/20">
                <span>REV 2.4.1</span>
                <span>───</span>
                <span>NEXT GEN</span>
                <span>───</span>
                <span>FOOTWEAR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-base to-transparent pointer-events-none" />
    </section>
  );
}

