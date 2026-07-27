"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  X,
  Crosshair,
  Plus,
  Layers,
  Weight,
  Activity,
  Clock,
  ChevronRight,
  Grip,
  Shield,
  Droplets,
  Ruler,
  Zap,
} from "lucide-react";

/* ─── Types ─── */
interface ConstructionNode {
  id: string;
  name: string;
  shortLabel: string;
  tagline: string;
  specs: string[];
  position: { top: string; left: string };
  color: "orange" | "cyan";
}

interface MaterialVariant {
  id: string;
  name: string;
  description: string;
  metrics: {
    weight: number;
    impactAbsorption: number;
    lifespanScore: number;
  };
}

interface NodeMaterials {
  currentVariantIndex: number;
  variants: MaterialVariant[];
}

/* ─── Construction Nodes Data ─── */
const CONSTRUCTION_NODES: ConstructionNode[] = [
  {
    id: "upper-system",
    name: "Upper System",
    shortLabel: "UPPER TECH",
    tagline: "Breathable Mesh / Fusion Overlays / TPU Support",
    specs: [
      "Engineered air-mesh knit with gradient ventilation zones",
      "Thermoplastic polyurethane (TPU) fusion weld overlays",
      "Asymmetric lacing system for adaptive lockdown",
      "Reinforced heel counter with internal stabilizer",
    ],
    position: { top: "28%", left: "26%" },
    color: "cyan",
  },
  {
    id: "midsole-tech",
    name: "Midsole Tech",
    shortLabel: "MIDSOLE",
    tagline: "EVA Foam / Air Cushion Unit / Stability Frame",
    specs: [
      "Full-length nitrogen-infused EVA foam core",
      "Dual-chamber air cushion unit in heel & forefoot",
      "Carbon fiber stability frame plate",
      "Anatomical arch support shank",
    ],
    position: { top: "52%", left: "48%" },
    color: "orange",
  },
  {
    id: "outsole-design",
    name: "Outsole Design",
    shortLabel: "OUTSOLE",
    tagline: "Rubber Compound / Multi-Directional Traction",
    specs: [
      "High-abrasion carbon rubber compound",
      "Multi-directional herringbone traction pattern",
      "Flex groove zones for natural gait transition",
      "Wear-indicator tread depth markers",
    ],
    position: { top: "72%", left: "70%" },
    color: "cyan",
  },
];

/* ─── Material Variants per Node ─── */
const NODE_MATERIALS: Record<string, NodeMaterials> = {
  "upper-system": {
    currentVariantIndex: 0,
    variants: [
      {
        id: "ultra-knit",
        name: "Ultra-Knit Mesh",
        description:
          "Monofilament polyester knit with laser-perforated ventilation zones. Provides 40% greater breathability than standard mesh while maintaining structural integrity.",
        metrics: { weight: 42, impactAbsorption: 55, lifespanScore: 68 },
      },
      {
        id: "fuse-overlay",
        name: "Fusion Overlay",
        description:
          "Thermally-bonded TPU film overlays fused directly onto the knit substrate. Eliminates stitching weak points and reduces weight by 18%.",
        metrics: { weight: 38, impactAbsorption: 48, lifespanScore: 82 },
      },
      {
        id: "vegan-leather",
        name: "Premium Vegan Leather",
        description:
          "Microfiber-based synthetic leather with plant-based coating. Offers premium hand-feel with 100% animal-free construction and enhanced durability.",
        metrics: { weight: 56, impactAbsorption: 42, lifespanScore: 90 },
      },
    ],
  },
  "midsole-tech": {
    currentVariantIndex: 0,
    variants: [
      {
        id: "carbon-plate",
        name: "Carbon Fiber Plate",
        description:
          "Full-length forged carbon fiber plate with torsional rigidity tuning. Maximizes energy return and provides a propulsive toe-off feel.",
        metrics: { weight: 68, impactAbsorption: 72, lifespanScore: 88 },
      },
      {
        id: "nitrogen-foam",
        name: "Nitrogen-Injected Foam",
        description:
          "Supercritical nitrogen-infused EVA foam with 35% greater energy return than standard EVA. Ultra-lightweight with exceptional softness.",
        metrics: { weight: 52, impactAbsorption: 88, lifespanScore: 74 },
      },
      {
        id: "eva-matrix",
        name: "EVA Matrix",
        description:
          "Compression-molded EVA foam matrix with dual-density zones. Softer heel for impact, firmer forefoot for propulsion. Industry-proven reliability.",
        metrics: { weight: 62, impactAbsorption: 78, lifespanScore: 80 },
      },
    ],
  },
  "outsole-design": {
    currentVariantIndex: 0,
    variants: [
      {
        id: "carbon-rubber",
        name: "Carbon Rubber",
        description:
          "High-wear carbon rubber compound with 30% silica additive for wet traction. Laser-cut flex grooves articulate with natural foot movement.",
        metrics: { weight: 72, impactAbsorption: 45, lifespanScore: 92 },
      },
      {
        id: "traction-lug",
        name: "Multi-Directional Traction",
        description:
          "Aggressive lug pattern with chevron-shaped tread elements. Self-cleaning grooves shed mud and debris during off-road conditions.",
        metrics: { weight: 78, impactAbsorption: 52, lifespanScore: 88 },
      },
      {
        id: "lightweight-blown",
        name: "Blown Rubber Lite",
        description:
          "Injection-molded blown rubber with hollow microsphere technology. Reduces outsole weight by 25% while retaining 90% of abrasion resistance.",
        metrics: { weight: 54, impactAbsorption: 40, lifespanScore: 76 },
      },
    ],
  },
};

/* ─── Gauge Bar Component ─── */
function GaugeBar({
  label,
  value,
  unit,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  color: "orange" | "cyan";
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className={cn("h-3 w-3", color === "orange" ? "text-accent-orange" : "text-accent-cyan")} />
          <span className="text-[10px] font-semibold tracking-wide uppercase text-text-secondary/70">
            {label}
          </span>
        </div>
        <span
          className={cn(
            "text-xs font-mono font-bold tabular-nums",
            color === "orange" ? "text-accent-orange" : "text-accent-cyan"
          )}
        >
          {value}
          <span className="text-[9px] font-normal text-text-secondary/50 ml-0.5">{unit}</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-dark-elevated overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out-expo",
            color === "orange"
              ? "bg-gradient-to-r from-accent-orange/60 to-accent-orange"
              : "bg-gradient-to-r from-accent-cyan/60 to-accent-cyan"
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Construction Bay Component ─── */
export default function ConstructionBay() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  /* ── Get active node data ── */
  const activeNodeData = useMemo(
    () => CONSTRUCTION_NODES.find((n) => n.id === activeNode) ?? null,
    [activeNode]
  );

  /* ── Get material data for active node ── */
  const materialData = useMemo(() => {
    if (!activeNode) return null;
    const nodeMat = NODE_MATERIALS[activeNode];
    if (!nodeMat) return null;
    return nodeMat.variants[variantIndex] ?? nodeMat.variants[0];
  }, [activeNode, variantIndex]);

  const totalVariants = useMemo(
    () => (activeNode ? NODE_MATERIALS[activeNode]?.variants.length ?? 0 : 0),
    [activeNode]
  );

  /* ── Open Panel ── */
  const openNodePanel = useCallback((nodeId: string) => {
    setPanelOpen(false);
    setTimeout(() => {
      setActiveNode(nodeId);
      setVariantIndex(NODE_MATERIALS[nodeId]?.currentVariantIndex ?? 0);
      setPanelOpen(true);
    }, 150);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setTimeout(() => setActiveNode(null), 300);
  }, []);

  const switchVariant = useCallback((index: number) => {
    setVariantIndex(index);
  }, []);

  const currentColor = activeNodeData?.color ?? "orange";

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      aria-label="Construction Simulation Bay"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern-subtle opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(255,85,0,0.04),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-2">
          <span className="h-px w-8 bg-accent-orange/40" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-orange">
            Construction Bay
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-2">
          SNEAKERLAB CONSTRUCTION
          <br />
          <span className="text-gradient-orange">SIMULATION BAY</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mb-10 sm:mb-14">
          Interactive shoe structural blueprint &amp; material engineering terminal.
          Click a node to explore component specifications and toggle material variants.
        </p>

        {/* ── Visual Canvas ── */}
        <div className="relative group/canvas">
          {/* Outer glow */}
          <div className="absolute -inset-4 rounded-3xl bg-accent-cyan/5 blur-2xl opacity-30 group-hover/canvas:opacity-60 transition-opacity duration-700" />

          {/* Glassmorphism Card Container */}
          <div
            className={cn(
              "relative w-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#16161C] to-[#0B0B0E] overflow-hidden",
              "transition-all duration-500 group-hover/canvas:border-[#FF5500]/30 group-hover/canvas:shadow-[0_0_60px_rgba(255,85,0,0.1)]"
            )}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />

            {/* Aspect ratio container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">
              {/* ── Image Wrapper with Blend ── */}
              <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                <Image
                  src="/images/image_3.jpg"
                  alt="SNEAKERLAB Construction Blueprint — Shoe Engineering Schematic"
                  fill
                  priority
                  className={cn(
                    "object-contain transition-opacity duration-500",
                    imgLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                />

                {/* Vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(11,11,14,0.85)] rounded-[inherit] pointer-events-none" />
                {/* Radial blend */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,transparent_40%,rgba(11,11,14,0.7)_100%)] pointer-events-none" />
                {/* Directional blends */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0B0B0E] via-[rgba(11,11,14,0.4)] to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-[#0B0B0E] via-[rgba(11,11,14,0.3)] to-transparent pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-0 w-1/5 bg-gradient-to-r from-[#0B0B0E] via-[rgba(11,11,14,0.3)] to-transparent pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-1/5 bg-gradient-to-l from-[#0B0B0E] via-[rgba(11,11,14,0.3)] to-transparent pointer-events-none" />
              </div>

              {/* Fallback grid */}
              {(!imgLoaded || imgError) && (
                <div className="absolute inset-0 flex items-center justify-center z-[2]">
                  <svg viewBox="0 0 800 450" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <pattern id="construction-grid" x={0} y={0} width={40} height={40} patternUnits="userSpaceOnUse">
                        <rect width={40} height={40} fill="none" />
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,85,0,0.06)" strokeWidth={0.5} />
                      </pattern>
                    </defs>
                    <rect width={800} height={450} fill="url(#construction-grid)" />
                    <text x={40} y={420} fontSize={10} fill="rgba(255,85,0,0.2)" fontFamily="monospace">
                      SNEAKERLAB R&amp;D — CONSTRUCTION BAY // REV 3.1
                    </text>
                  </svg>
                </div>
              )}

              {/* ── Hotspot Nodes Overlay ── */}
              <div className="absolute inset-0 z-[5]">
                {CONSTRUCTION_NODES.map((node) => {
                  const isActive = activeNode === node.id;
                  const isOrange = node.color === "orange";

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => openNodePanel(node.id)}
                      className={cn(
                        "group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-base"
                      )}
                      style={{ top: node.position.top, left: node.position.left }}
                      aria-label={`Explore: ${node.name}`}
                    >
                      {/* Outer glow halo */}
                      <div
                        className={cn(
                          "absolute -inset-5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700",
                          isOrange
                            ? "bg-[radial-gradient(circle,rgba(255,85,0,0.25)_0%,transparent_70%)]"
                            : "bg-[radial-gradient(circle,rgba(0,229,255,0.25)_0%,transparent_70%)]"
                        )}
                      />

                      {/* Pulsing neon ring */}
                      <div
                        className={cn(
                          "absolute -inset-3 rounded-full border opacity-0 group-hover:opacity-100 animate-ping duration-[2000ms]",
                          isOrange ? "border-accent-orange/40" : "border-accent-cyan/40"
                        )}
                      />

                      {/* Interactive Pulse Badge */}
                      <div
                        className={cn(
                          "relative flex items-center justify-center rounded-full transition-all duration-300",
                          "w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14",
                          "backdrop-blur-md border-2 group-hover:scale-110",
                          isActive
                            ? isOrange
                              ? "border-accent-orange bg-accent-orange/20 shadow-[0_0_24px_rgba(255,85,0,0.35)]"
                              : "border-accent-cyan bg-accent-cyan/20 shadow-[0_0_24px_rgba(0,229,255,0.35)]"
                            : "border-transparent bg-[rgba(255,255,255,0.06)] group-hover:bg-[rgba(255,85,0,0.2)] group-hover:border-accent-orange/40"
                        )}
                      >
                        <Crosshair
                          className={cn(
                            "h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300",
                            isActive
                              ? isOrange ? "text-accent-orange" : "text-accent-cyan"
                              : "text-text-secondary/40 group-hover:text-accent-orange group-hover:rotate-45"
                          )}
                        />
                        <Plus
                          className={cn(
                            "absolute -top-0.5 -right-0.5 h-3 w-3 transition-all duration-300",
                            isActive
                              ? isOrange ? "text-accent-orange" : "text-accent-cyan"
                              : "text-text-secondary/30 group-hover:text-accent-orange/70"
                          )}
                        />
                      </div>

                      {/* Inline floating label */}
                      <div
                        className={cn(
                          "absolute left-1/2 -translate-x-1/2 mt-2 pointer-events-none",
                          "opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0",
                          "top-full"
                        )}
                      >
                        <div className="whitespace-nowrap rounded-md bg-dark-elevated/95 backdrop-blur-md border border-dark-border px-3 py-1.5 text-center shadow-lg">
                          <span className="text-[9px] font-mono font-bold tracking-wider uppercase">
                            <span className={cn(isOrange ? "text-accent-orange" : "text-accent-cyan")}>[+]</span>{" "}
                            <span className="text-text-primary">{node.shortLabel}</span>
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer watermark */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none z-[3]">
                <span className="text-[9px] font-mono tracking-wider text-text-secondary/15">
                  SNEAKERLAB R&amp;D // CONSTRUCTION BAY REV 3.1
                </span>
                <span className="text-[9px] font-mono tracking-wider text-text-secondary/15">
                  CLASSIFICATION: PROPRIETARY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Side Panel ── */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] lg:w-[480px] transition-transform duration-[400ms] cubic-bezier(0.19,1,0.22,1) border-l border-dark-border",
          panelOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!panelOpen}
        role="dialog"
        aria-modal={panelOpen}
        aria-label="Component Engineering Details"
      >
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 z-[-1] bg-dark-base/40 backdrop-blur-sm",
            panelOpen ? "block" : "hidden"
          )}
          onClick={closePanel}
        />

        {/* Panel */}
        <div className="h-full glass-panel-strong overflow-y-auto">
          {activeNodeData && materialData && (
            <div className="flex flex-col h-full">
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg border",
                      currentColor === "orange"
                        ? "border-accent-orange/20 bg-accent-orange-dim"
                        : "border-accent-cyan/20 bg-accent-cyan-dim"
                    )}
                  >
                    <Layers
                      className={cn(
                        "h-5 w-5",
                        currentColor === "orange" ? "text-accent-orange" : "text-accent-cyan"
                      )}
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary">{activeNodeData.name}</h3>
                    <p className="text-xs text-text-secondary/60 font-mono">{activeNodeData.tagline}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-dark-hover transition-colors"
                  aria-label="Close panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* ── Body ── */}
              <div className="flex-1 px-6 py-6 space-y-6">
                {/* Specs */}
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-2">
                    Component Specifications
                  </p>
                  <ul className="space-y-2">
                    {activeNodeData.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span
                          className={cn(
                            "mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0",
                            currentColor === "orange" ? "bg-accent-orange" : "bg-accent-cyan"
                          )}
                        />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Divider */}
                <div className="h-px bg-dark-border" />

                {/* Material Variant Switcher */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50">
                      Material Variant
                    </p>
                    <span className="text-[10px] font-mono text-text-secondary/40">
                      {variantIndex + 1} / {totalVariants}
                    </span>
                  </div>

<div className="flex gap-2 mb-4">
                    {activeNode && NODE_MATERIALS[activeNode]?.variants.map((v: MaterialVariant, i: number) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => switchVariant(i)}
                        className={cn(
                          "flex-1 rounded-lg border px-2.5 py-2 text-center transition-all duration-200",
                          i === variantIndex
                            ? currentColor === "orange"
                              ? "border-accent-orange/30 bg-accent-orange-dim text-accent-orange"
                              : "border-accent-cyan/30 bg-accent-cyan-dim text-accent-cyan"
                            : "border-dark-border bg-dark-base/50 text-text-secondary/60 hover:border-text-secondary/30 hover:text-text-secondary"
                        )}
                      >
                        <span className="text-[9px] font-bold tracking-wide uppercase leading-tight block">
                          {v.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Active variant description */}
                  <div
                    className={cn(
                      "rounded-lg border p-3 text-sm transition-colors duration-300",
                      currentColor === "orange"
                        ? "border-accent-orange/15 bg-accent-orange-dim/10"
                        : "border-accent-cyan/15 bg-accent-cyan-dim/10"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Zap
                        className={cn(
                          "h-3.5 w-3.5",
                          currentColor === "orange" ? "text-accent-orange" : "text-accent-cyan"
                        )}
                      />
                      <span
                        className={cn(
                          "text-[11px] font-bold font-mono",
                          currentColor === "orange" ? "text-accent-orange" : "text-accent-cyan"
                        )}
                      >
                        {materialData.name}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary/80 leading-relaxed">
                      {materialData.description}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-dark-border" />

                {/* Dynamic Live Metrics */}
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-3">
                    Live Metrics
                  </p>
                  <div className="space-y-3">
                    <GaugeBar
                      label="Weight"
                      value={materialData.metrics.weight}
                      unit="g"
                      icon={Weight}
                      color={currentColor}
                    />
                    <GaugeBar
                      label="Impact Absorption"
                      value={materialData.metrics.impactAbsorption}
                      unit="%"
                      icon={Activity}
                      color={currentColor}
                    />
                    <GaugeBar
                      label="Lifespan Score"
                      value={materialData.metrics.lifespanScore}
                      unit="hrs"
                      icon={Clock}
                      color={currentColor}
                    />
                  </div>
                </div>
              </div>

              {/* ── Footer ── */}
              <div className="px-6 py-4 border-t border-dark-border">
                <p className="text-[9px] font-mono tracking-wider text-text-secondary/30 text-center">
                  SNEAKERLAB R&amp;D // CONSTRUCTION DATA V3.1 // PROPRIETARY TECHNOLOGY
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Hint Chip ── */}
      <div className="relative z-10 mt-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-dark-border bg-dark-card/50 px-4 py-2">
          <div className="flex -space-x-1">
            {CONSTRUCTION_NODES.map((n) => (
              <div
                key={n.id}
                className={cn(
                  "h-2 w-2 rounded-full",
                  n.color === "orange" ? "bg-accent-orange/50" : "bg-accent-cyan/50"
                )}
              />
            ))}
          </div>
          <span className="text-[10px] font-medium tracking-wider text-text-secondary/50 uppercase">
            Click nodes to explore component specs &amp; toggle materials
          </span>
        </div>
      </div>
    </section>
  );
}
