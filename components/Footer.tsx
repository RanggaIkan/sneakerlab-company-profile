"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  FlaskConical,
  ArrowUpRight,
  Shield,
  ChevronRight,
  Crosshair,
} from "lucide-react";

/* ─── Navigation Links ─── */
const FOOTER_LINKS = [
  { label: "Home", href: "#" },
  { label: "The Lab", href: "#" },
  { label: "Services", href: "#" },
  { label: "Leadership", href: "#" },
  { label: "Authentication", href: "#" },
  { label: "Contact", href: "#" },
] as const;

const SERVICE_LINKS = [
  { label: "Chemical Restoration", href: "#" },
  { label: "Sole Swap", href: "#" },
  { label: "Nano-Coating", href: "#" },
  { label: "Consultation", href: "#" },
] as const;

/* ─── Footer ─── */
export default function Footer() {
  return (
    <footer
      className="relative border-t border-dark-border bg-gradient-to-b from-dark-card/50 to-dark-base"
      aria-label="Site Footer"
    >
      {/* Top grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern-subtle opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Main Footer Content ── */}
        <div className="py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* ── Brand Column ── */}
            <div className="lg:col-span-4 space-y-5">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-orange/20 bg-accent-orange-dim">
                  <img
                    src="/images/logo.svg"
                    alt="SNEAKERLAB"
                    className="h-6 w-6 object-contain"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M13 15v5s3-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`;
                      }
                    }}
                  />
                </div>
                <div>
                  <span className="text-lg font-bold text-text-primary tracking-tight">
                    SNEAKERLAB
                  </span>
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-accent-orange mt-px">
                    Engineered Footwear R&amp;D
                  </p>
                </div>
              </div>

              {/* Tagline */}
              <div className="relative pl-4 border-l-2 border-accent-orange/30">
                <p className="text-sm text-text-secondary/80 italic leading-relaxed">
                  &ldquo;Tested. Crafted. Verified.&rdquo;
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-text-secondary/50 leading-relaxed max-w-sm">
                Indonesia&apos;s premier sneaker restoration and footwear engineering
                laboratory. Merging polymer chemistry with precision craftsmanship.
              </p>

              {/* Verified Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan-dim/10 px-3.5 py-1.5">
                <Shield className="h-3 w-3 text-accent-cyan" />
                <span className="text-[9px] font-bold tracking-wider uppercase text-accent-cyan">
                  ISO 9001:2024 Certified Lab
                </span>
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-secondary/50 mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-text-secondary/70 hover:text-text-primary transition-colors"
                    >
                      <ChevronRight className="h-3 w-3 text-accent-orange/50 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Services ── */}
            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-secondary/50 mb-4">
                Services
              </h4>
              <ul className="space-y-2.5">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-text-secondary/70 hover:text-text-primary transition-colors"
                    >
                      <div className="h-1 w-1 rounded-full bg-accent-cyan/40 group-hover:bg-accent-cyan transition-colors" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact / CTA ── */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-dark-border bg-dark-elevated/30 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-orange-dim border border-accent-orange/20">
                    <FlaskConical className="h-4 w-4 text-accent-orange" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">R&amp;D Consultation</p>
                    <p className="text-[10px] text-text-secondary/50">
                      Book a session with our engineering team
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-accent-orange text-dark-base py-3 text-xs font-bold tracking-wider uppercase hover:bg-accent-orange/90 orange-glow transition-all"
                >
                  <span>Schedule R&amp;D Consultation</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <p className="text-[9px] font-mono text-text-secondary/30 text-center">
                  Response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-dark-border" />

        {/* ── Technical System Meta Bar ── */}
        <div className="py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-[9px] font-mono tracking-wider text-text-secondary/30">
              <span className="flex items-center gap-1">
                <Crosshair className="h-2.5 w-2.5 text-accent-orange/40" />
                LAT: -7.3305
              </span>
              <span className="hidden sm:inline text-text-secondary/15">|</span>
              <span className="flex items-center gap-1">
                <Crosshair className="h-2.5 w-2.5 text-accent-cyan/40" />
                LONG: 110.5084
              </span>
              <span className="hidden sm:inline text-text-secondary/15">|</span>
              <span>SYSTEM: NEXT.JS 16</span>
              <span className="hidden sm:inline text-text-secondary/15">|</span>
              <span className="text-accent-orange/40">SNEAKERLAB V2.4</span>
            </div>

            {/* Copyright */}
            <p className="text-[9px] font-mono tracking-wider text-text-secondary/20">
              &copy; 2026 SNEAKERLAB. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
