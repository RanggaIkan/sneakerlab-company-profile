"use client";

import { cn } from "@/lib/utils";
import { FlaskConical, Shovel, Droplets, ArrowRight, Shield, Microscope } from "lucide-react";

/* ─── Service Data ─── */
interface ServiceCardData {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  color: "orange" | "cyan";
}

const SERVICES: ServiceCardData[] = [
  {
    id: "chemical-restoration",
    icon: FlaskConical,
    title: "Deep Chemical Restoration",
    tagline: "Polymer-Level Revitalization",
    description:
      "Our flagship restoration process uses proprietary solvent-free polymer reconditioning to reverse oxidation, rehydrate degraded materials, and restore original tensile strength to midsole foams, leathers, and synthetic uppers.",
    features: [
      "Oxidation reversal via molecular reconditioning",
      "Non-invasive foam decompression & re-expansion",
      "Leather lipid replenishment & grain reconstruction",
      "Zero volatile organic compound (VOC) process",
    ],
    color: "orange",
  },
  {
    id: "structural-engineering",
    icon: Shovel,
    title: "Custom Structural Engineering & Sole Swap",
    tagline: "Full-Chassis Rebuild & Reinforcement",
    description:
      "Complete structural overhaul including precision sole removal, 3D-printed custom midsole inserts, carbon fiber plate reinforcement, and outsole grafting. We extend the lifecycle of heirloom sneakers by engineering entirely new support architectures.",
    features: [
      "Laser-guided sole separation with zero upper damage",
      "3D-scan-matched custom midsole fabrication",
      "Carbon fiber / titanium plate reinforcement options",
      "Heritage outsole grafting & re-stitching",
    ],
    color: "cyan",
  },
  {
    id: "nanotech-protection",
    icon: Droplets,
    title: "Nanotech Hydrophobic Protection",
    tagline: "Molecular Barrier Coating System",
    description:
      "Industrial-grade nano-coating applied via plasma deposition that creates an invisible molecular barrier against water, oils, and stains. The treatment bonds at the polymer level and remains effective through 12+ months of regular wear.",
    features: [
      "Plasma-deposited fluoropolymer nano-layer",
      "Oleophobic & hydrophobic dual-action repellency",
      "UV-resistant formulation prevents yellowing",
      "Breathable membrane — maintains original airflow",
    ],
    color: "orange",
  },
];

/* ─── Service Card ─── */
function ServiceCard({ service, index }: { service: ServiceCardData; index: number }) {
  const Icon = service.icon;
  const isOrange = service.color === "orange";

  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-dark-border bg-dark-card/60 backdrop-blur-sm overflow-hidden",
        "transition-all duration-500 ease-out-expo",
        "hover:scale-[1.02] hover:border-white/20",
        isOrange ? "hover:shadow-[0_0_40px_rgba(255,85,0,0.12)]" : "hover:shadow-[0_0_40px_rgba(0,229,255,0.12)]"
      )}
    >
      {/* Subtle corner accent glow */}
      <div
        className={cn(
          "absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-3xl",
          isOrange ? "bg-accent-orange/20" : "bg-accent-cyan/20"
        )}
      />

      {/* Content */}
      <div className="relative p-6 sm:p-8 lg:p-10">
        {/* Service Number */}
        <span className="text-[10px] font-mono font-bold tracking-wider text-text-secondary/20">
          /{String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon & Title */}
        <div className="mt-4 flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
              isOrange
                ? "border-accent-orange/20 bg-accent-orange-dim text-accent-orange group-hover:bg-accent-orange-dim/30"
                : "border-accent-cyan/20 bg-accent-cyan-dim text-accent-cyan group-hover:bg-accent-cyan-dim/30"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-text-primary leading-tight">
              {service.title}
            </h3>
            <p className="mt-0.5 text-xs font-mono tracking-wide text-text-secondary/60">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-text-secondary/80 leading-relaxed">
          {service.description}
        </p>

        {/* Feature List */}
        <ul className="mt-5 space-y-2">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-text-secondary/70">
              <span
                className={cn(
                  "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                  isOrange ? "bg-accent-orange/60" : "bg-accent-cyan/60"
                )}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* Bottom CTA indicator */}
        <div className="mt-6 flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-text-secondary/40 group-hover:text-text-secondary/70 transition-colors">
          <span>Learn More</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

/* ─── Services Section ─── */
export default function Services() {
  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      aria-label="Corporate R&D Services"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern-subtle opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_40%,rgba(255,85,0,0.03),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Section Label ── */}
        <div className="flex items-center gap-3 mb-2">
          <span className="h-px w-8 bg-accent-orange/40" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-orange">
            Corporate R&D
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-2">
          Precision Engineering
          <br />
          <span className="text-gradient-orange">Services</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mb-10 sm:mb-14">
          Every SNEAKERLAB process is ISO-guided, chemically documented, and
          engineered for molecular-level precision. Below are our core service
          pillars.
        </p>

        {/* ── Service Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
