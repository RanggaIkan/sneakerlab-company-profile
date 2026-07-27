"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, FlaskConical, Droplets, Shield, Grip, ChevronRight, Crosshair, Plus } from "lucide-react";

/* ─── Hotspot Data ─── */
interface HotspotData {
  id: string;
  name: string;
  formula: string;
  label: string;
  description: string;
  color: "orange" | "cyan";
  // Position as percentage from top/left relative to board container
  position: { top: string; left: string };
  icon: React.ElementType;
  performanceLabel: string;
  performanceUnit: string;
  baseValue: number;
  calcOutput: (concentration: number) => string;
}

const HOTSPOTS: HotspotData[] = [
  {
    id: "hydrophobic-shield",
    name: "Hydrophobic Shield",
    formula: "C₉F₁₄",
    label: "Water Repellent",
    description:
      "Advanced fluoropolymer coating that creates a molecular barrier against liquid ingress. Applied via plasma deposition for uniform nano-scale coverage.",
    color: "cyan",
    position: { top: "28%", left: "12%" },
    icon: Droplets,
    performanceLabel: "Water Resistance",
    performanceUnit: "%",
    baseValue: 85,
    calcOutput: (c: number) => {
      const r = 60 + c * 0.47;
      return `${Math.min(99.9, Math.round(r * 10) / 10)}% Water Resistance`;
    },
  },
  {
    id: "stain-protection",
    name: "Stain Protection Unit",
    formula: "C₈H₉NO₂",
    label: "Molecular Shield",
    description:
      "Bio-inspired oleophobic compound that repels oil-based contaminants. The C₈H₉NO₂ chain bonds at the polymer level for sustained protection.",
    color: "orange",
    position: { top: "52%", left: "12%" },
    icon: FlaskConical,
    performanceLabel: "Contact Angle",
    performanceUnit: "°",
    baseValue: 78,
    calcOutput: (c: number) => {
      const angle = 60 + c * 0.65;
      return `Contact Angle: ${Math.round(angle)}°`;
    },
  },
  {
    id: "material-info",
    name: "Material Info",
    formula: "Nubuck Suede",
    label: "Premium Material",
    description:
      "Hand-selected full-grain nubuck suede tanned using eco-friendly chromium-free processes. Each hide is pressure-tested for tensile strength before production.",
    color: "cyan",
    position: { top: "72%", left: "13%" },
    icon: Shield,
    performanceLabel: "Material Tensile Strength",
    performanceUnit: "MPa",
    baseValue: 65,
    calcOutput: (c: number) => {
      const s = 15 + c * 0.55;
      return `Tensile Strength: ${Math.round(s * 10) / 10} MPa`;
    },
  },
  {
    id: "formulated-greatness",
    name: "Formulated for Greatness",
    formula: "Lab Tested",
    label: "Quality Assurance",
    description:
      "Every formula batch undergoes rigorous QC testing across 18 parameters — including abrasion cycling, UV stress, thermal variance, and hydrolysis resistance.",
    color: "orange",
    position: { top: "20%", left: "72%" },
    icon: FlaskConical,
    performanceLabel: "QC Pass Rate",
    performanceUnit: "%",
    baseValue: 90,
    calcOutput: (c: number) => {
      const q = 70 + c * 0.29;
      return `QC Pass Rate: ${Math.min(99.9, Math.round(q * 10) / 10)}%`;
    },
  },
];

/* ─── Molecular Diagram SVGs ─── */
function MolecularDiagram({ formula }: { formula: string }) {
  // Simple molecular visualization per formula
  const diagrams: Record<string, React.ReactNode> = {
    "C₉F₁₄": (
      <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
        {/* Carbon backbone */}
        {[10, 25, 40, 55, 70, 85, 100].map((cx, i) => (
          <circle key={i} cx={cx} cy={45} r={4} fill="rgba(0,229,255,0.5)" />
        ))}
        {[10, 25, 40, 55, 70, 85].map((cx, i) => (
          <line key={i} x1={cx} y1={45} x2={cx + 15} y2={45} stroke="rgba(0,229,255,0.3)" strokeWidth={1.5} />
        ))}
        {/* Fluorine branches */}
        <circle cx={17.5} cy={28} r={3.5} fill="rgba(255,85,0,0.6)" />
        <circle cx={32.5} cy={28} r={3.5} fill="rgba(255,85,0,0.6)" />
        <circle cx={47.5} cy={28} r={3.5} fill="rgba(255,85,0,0.6)" />
        <circle cx={62.5} cy={28} r={3.5} fill="rgba(255,85,0,0.6)" />
        <circle cx={77.5} cy={28} r={3.5} fill="rgba(255,85,0,0.6)" />
        <line x1={17.5} y1={28} x2={17.5} y2={38} stroke="rgba(0,229,255,0.25)" strokeWidth={1} />
        <line x1={32.5} y1={28} x2={32.5} y2={38} stroke="rgba(0,229,255,0.25)" strokeWidth={1} />
        <line x1={47.5} y1={28} x2={47.5} y2={38} stroke="rgba(0,229,255,0.25)" strokeWidth={1} />
        <line x1={62.5} y1={28} x2={62.5} y2={38} stroke="rgba(0,229,255,0.25)" strokeWidth={1} />
        <line x1={77.5} y1={28} x2={77.5} y2={38} stroke="rgba(0,229,255,0.25)" strokeWidth={1} />
        {/* Labels */}
        <text x={10} y={72} fontSize={7} fill="rgba(255,255,255,0.3)" fontFamily="monospace">C₉F₁₄</text>
      </svg>
    ),
    "C₈H₉NO₂": (
      <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
        {/* Aromatic ring */}
        <polygon points="40,30 55,20 70,30 70,50 55,60 40,50" stroke="rgba(0,229,255,0.3)" strokeWidth={1.5} fill="none" />
        <circle cx={55} cy={40} r={3} fill="rgba(255,85,0,0.5)" />
        {/* Side chains */}
        <line x1={70} y1={40} x2={90} y2={35} stroke="rgba(0,229,255,0.25)" strokeWidth={1.2} />
        <circle cx={90} cy={35} r={3} fill="rgba(0,229,255,0.4)" />
        <line x1={40} y1={30} x2={25} y2={20} stroke="rgba(0,229,255,0.25)" strokeWidth={1.2} />
        <circle cx={25} cy={20} r={3} fill="rgba(0,229,255,0.4)" />
        <text x={10} y={72} fontSize={7} fill="rgba(255,255,255,0.3)" fontFamily="monospace">C₈H₉NO₂</text>
      </svg>
    ),
    "1.618": (
      <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
        {/* Golden spiral */}
        <path d="M60 40 Q 60 20 80 20 Q 100 20 100 40 Q 100 60 80 60 Q 55 60 55 45 Q 55 35 68 35 Q 78 35 78 42 Q 78 48 70 48" stroke="rgba(0,229,255,0.4)" strokeWidth={1.2} fill="none" />
        {/* Golden ratio phi */}
        <rect x={65} y={20} width={24} height={15} stroke="rgba(255,85,0,0.25)" strokeWidth={1} fill="none" />
        <rect x={65} y={35} width={15} height={15} stroke="rgba(255,85,0,0.25)" strokeWidth={1} fill="none" />
        <text x={40} y={72} fontSize={7} fill="rgba(255,255,255,0.3)" fontFamily="monospace">φ = 1.618</text>
      </svg>
    ),
    "RAL 9004": (
      <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
        {/* Hex grid */}
        <polygon points="60,15 80,28 80,52 60,65 40,52 40,28" stroke="rgba(255,85,0,0.3)" strokeWidth={1.5} fill="none" />
        <polygon points="60,25 72,32 72,48 60,55 48,48 48,32" stroke="rgba(0,229,255,0.2)" strokeWidth={1} fill="none" />
        <circle cx={60} cy={40} r={5} fill="rgba(255,85,0,0.15)" stroke="rgba(255,85,0,0.3)" strokeWidth={1} />
        <text x={30} y={72} fontSize={7} fill="rgba(255,255,255,0.3)" fontFamily="monospace">RAL 9004</text>
      </svg>
    ),
  };

  return (
    <div className="h-24 w-full rounded-lg border border-dark-border bg-dark-base/50 p-2">
      {diagrams[formula] || (
        <div className="flex h-full items-center justify-center text-text-secondary/40 text-xs font-mono">
          {formula}
        </div>
      )}
    </div>
  );
}

/* ─── Blueprint Lab Component ─── */
export default function BlueprintLab() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [concentration, setConcentration] = useState(50);
  const [boardLoaded, setBoardLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const activeData = useMemo(
    () => HOTSPOTS.find((h) => h.id === activeHotspot) ?? null,
    [activeHotspot]
  );

  /* ── Open Drawer ── */
  const openFormula = useCallback((id: string) => {
    // Close drawer first if another is selected
    setDrawerOpen(false);
    setTimeout(() => {
      setActiveHotspot(id);
      setConcentration(HOTSPOTS.find((h) => h.id === id)?.baseValue ?? 50);
      setDrawerOpen(true);
    }, 150);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => setActiveHotspot(null), 300);
  }, []);

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      aria-label="Interactive Blueprint Lab"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,229,255,0.04),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Section Label ── */}
        <div className="flex items-center gap-3 mb-2">
          <span className="h-px w-8 bg-accent-cyan/40" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-cyan">
            R&D Laboratory
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-2">
          Formula Making
          <span className="text-gradient-cyan"> Blueprint</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mb-10 sm:mb-14">
          Explore the proprietary chemical formulas and engineering blueprints
          powering every SNEAKERLAB restoration. Click a hotspot to break down
          the formula.
        </p>

{/* ── Blueprint Board — Sci-Fi Glowing Frame ── */}
        <div className="relative group/board">
          {/* Outer glow blur layer */}
          <div className="absolute -inset-4 rounded-3xl bg-accent-orange/5 blur-2xl opacity-40 group-hover/board:opacity-70 transition-opacity duration-700" />

          {/* Main board container with neon border */}
          <div className="relative w-full rounded-2xl border border-accent-orange/20 bg-dark-card/80 shadow-[0_0_60px_rgba(255,85,0,0.12)] overflow-hidden
            transition-shadow duration-500 group-hover/board:shadow-[0_0_80px_rgba(255,85,0,0.2)]">
            {/* Inner neon glow line */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_30px_rgba(255,85,0,0.06)]" />

            {/* Board inner — same aspect ratio as image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">

              {/* ── Image Wrapper with Blend & Vignette ── */}
              <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                {/* Blueprint background image (Next.js optimized) */}
                <Image
                  src="/images/image_2.jpg"
                  alt="SNEAKERLAB Formula Blueprint Board"
                  fill
                  priority
                  className={cn(
                    "object-contain transition-opacity duration-500",
                    boardLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setBoardLoaded(true)}
                  onError={() => setImgError(true)}
                />

                {/* Vignette overlay — dark inner shadow blending edges into background */}
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(11,11,14,0.85)] rounded-[inherit] pointer-events-none" />

                {/* Radial gradient blend — soft dark edges on all sides */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,transparent_40%,rgba(11,11,14,0.7)_100%)] pointer-events-none" />

                {/* Bottom gradient blend */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0B0B0E] via-[rgba(11,11,14,0.4)] to-transparent pointer-events-none" />
                {/* Top gradient blend */}
                <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-[#0B0B0E] via-[rgba(11,11,14,0.3)] to-transparent pointer-events-none" />
                {/* Left gradient blend */}
                <div className="absolute top-0 bottom-0 left-0 w-1/5 bg-gradient-to-r from-[#0B0B0E] via-[rgba(11,11,14,0.3)] to-transparent pointer-events-none" />
                {/* Right gradient blend */}
                <div className="absolute top-0 bottom-0 right-0 w-1/5 bg-gradient-to-l from-[#0B0B0E] via-[rgba(11,11,14,0.3)] to-transparent pointer-events-none" />
              </div>

              {/* Fallback geometric grid when no image */}
              {(!boardLoaded || imgError) && (
                <div className="absolute inset-0 flex items-center justify-center z-[2]">
                  <svg viewBox="0 0 800 450" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <pattern id="blueprint-grid" x={0} y={0} width={40} height={40} patternUnits="userSpaceOnUse">
                        <rect width={40} height={40} fill="none" />
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,229,255,0.06)" strokeWidth={0.5} />
                      </pattern>
                      <pattern id="blueprint-grid-large" x={0} y={0} width={200} height={200} patternUnits="userSpaceOnUse">
                        <rect width={200} height={200} fill="url(#blueprint-grid)" />
                        <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(0,229,255,0.1)" strokeWidth={0.8} />
                      </pattern>
                    </defs>
                    <rect width={800} height={450} fill="url(#blueprint-grid-large)" />
                    <rect x={20} y={20} width={760} height={410} fill="none" stroke="rgba(0,229,255,0.12)" strokeWidth={0.8} />
                    <line x1={400} y1={20} x2={400} y2={430} stroke="rgba(0,229,255,0.04)" strokeWidth={1} strokeDasharray="6,4" />
                    <line x1={20} y1={225} x2={780} y2={225} stroke="rgba(0,229,255,0.04)" strokeWidth={1} strokeDasharray="6,4" />
                    <text x={40} y={420} fontSize={10} fill="rgba(0,229,255,0.2)" fontFamily="monospace">SNEAKERLAB R&amp;D — BLUEPRINT BOARD // REV 2.4.1</text>
                    <text x={40} y={435} fontSize={8} fill="rgba(0,229,255,0.12)" fontFamily="monospace">CLASSIFICATION: PROPRIETARY // FORMULA MATRIX ALPHA</text>
                  </svg>
                </div>
              )}

              {/* ── Hotspots Overlay — same container as image, precise positioning ── */}
              <div className="absolute inset-0 z-[5]">
                {HOTSPOTS.map((hotspot) => {
                  const isActive = activeHotspot === hotspot.id;
                  const isOrange = hotspot.color === "orange";

                  return (
                    <button
                      key={hotspot.id}
                      type="button"
                      onClick={() => openFormula(hotspot.id)}
                      className={cn(
                        "group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-base"
                      )}
                      style={{ top: hotspot.position.top, left: hotspot.position.left }}
                      aria-label={`Explore formula: ${hotspot.name} (${hotspot.formula})`}
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
                            <span className="text-text-primary">{hotspot.formula}</span>{" "}
                            <span className={cn("text-[8px] tracking-[0.15em]", isOrange ? "text-accent-orange/60" : "text-accent-cyan/60")}>
                              {hotspot.name === "Hydrophobic Shield" ? "WATER REPELLENT" :
                               hotspot.name === "Stain Protection Unit" ? "MOLECULAR SHIELD" :
                               hotspot.name === "Material Info" ? "PREMIUM MATERIAL" :
                               "QUALITY ASSURANCE"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Board footer watermark */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none z-[3]">
                <span className="text-[9px] font-mono tracking-wider text-text-secondary/15">
                  SNEAKERLAB R&amp;D // BLUEPRINT BOARD REV 2.4.1
                </span>
                <span className="text-[9px] font-mono tracking-wider text-text-secondary/15">
                  CLASSIFICATION: PROPRIETARY
                </span>
              </div>

              {/* Board top-left corner marker */}
              <div className="absolute top-3 left-4 pointer-events-none z-[3]">
                <span className="text-[8px] font-mono text-text-secondary/10">X:Y — FORMULA MATRIX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Formula Breakdown Drawer ── */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] lg:w-[480px] transition-transform duration-[400ms] cubic-bezier(0.19,1,0.22,1) border-l border-dark-border",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!drawerOpen}
        role="dialog"
        aria-modal={drawerOpen}
        aria-label="Formula Breakdown"
      >
        {/* Backdrop (click to close) */}
        <div
          className={cn(
            "fixed inset-0 z-[-1] bg-dark-base/40 backdrop-blur-sm",
            drawerOpen ? "block" : "hidden"
          )}
          onClick={closeDrawer}
        />

        {/* Drawer Panel */}
        <div className="h-full glass-panel-strong overflow-y-auto">
          {activeData && (
            <div className="flex flex-col h-full">
              {/* ── Drawer Header ── */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg border",
                      activeData.color === "orange"
                        ? "border-accent-orange/20 bg-accent-orange-dim"
                        : "border-accent-cyan/20 bg-accent-cyan-dim"
                    )}
                  >
                    <activeData.icon
                      className={cn(
                        "h-5 w-5",
                        activeData.color === "orange" ? "text-accent-orange" : "text-accent-cyan"
                      )}
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary">{activeData.name}</h3>
                    <p className="text-xs text-text-secondary/60 font-mono">{activeData.formula}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-dark-hover transition-colors"
                  aria-label="Close formula breakdown"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* ── Drawer Body ── */}
              <div className="flex-1 px-6 py-6 space-y-6">
                {/* Molecular Diagram */}
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-2">
                    Molecular Structure
                  </p>
                  <MolecularDiagram formula={activeData.formula} />
                </div>

                {/* Technology Purpose */}
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-2">
                    Technology Purpose
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {activeData.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-dark-border" />

                {/* Material Performance Index */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50">
                      Material Performance Index
                    </p>
                    <span
                      className={cn(
                        "text-xs font-mono font-bold",
                        activeData.color === "orange" ? "text-accent-orange" : "text-accent-cyan"
                      )}
                    >
                      {activeData.performanceLabel}
                    </span>
                  </div>

                  {/* Performance bar */}
                  <div className="h-2 rounded-full bg-dark-elevated overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500 ease-out-expo",
                        activeData.color === "orange"
                          ? "bg-gradient-to-r from-accent-orange/60 to-accent-orange"
                          : "bg-gradient-to-r from-accent-cyan/60 to-accent-cyan"
                      )}
                      style={{ width: `${concentration}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-text-secondary/40 font-mono">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Interactive Concentration Slider */}
                <div className="rounded-xl border border-dark-border bg-dark-base/50 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Grip className="h-4 w-4 text-text-secondary/40" />
                      <p className="text-xs font-semibold tracking-wide text-text-primary">
                        Concentration %
                      </p>
                    </div>
                    <span
                      className={cn(
                        "text-lg font-bold font-mono tabular-nums",
                        activeData.color === "orange" ? "text-accent-orange" : "text-accent-cyan"
                      )}
                    >
                      {concentration}%
                    </span>
                  </div>

                  {/* Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={concentration}
                      onChange={(e) => setConcentration(Number(e.target.value))}
                      className={cn(
                        "w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer",
                        "bg-dark-elevated",
                        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
                        "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2",
                        "[&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer",
                        "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200",
                        "[&::-webkit-slider-thumb]:hover:scale-125",
                        activeData.color === "orange"
                          ? "[&::-webkit-slider-thumb]:border-accent-orange [&::-webkit-slider-thumb]:bg-accent-orange"
                          : "[&::-webkit-slider-thumb]:border-accent-cyan [&::-webkit-slider-thumb]:bg-accent-cyan"
                      )}
                      style={{
                        background: `linear-gradient(to right, ${activeData.color === "orange" ? "#FF5500" : "#00E5FF"} ${concentration}%, rgba(255,255,255,0.06) ${concentration}%)`,
                      }}
                    />
                  </div>

                  {/* Simulated Performance Output */}
                  <div
                    className={cn(
                      "rounded-lg border p-3 text-center transition-colors duration-300",
                      activeData.color === "orange"
                        ? "border-accent-orange/15 bg-accent-orange-dim/10"
                        : "border-accent-cyan/15 bg-accent-cyan-dim/10"
                    )}
                  >
                    <p
                      className={cn(
                        "text-sm font-mono font-bold",
                        activeData.color === "orange" ? "text-accent-orange" : "text-accent-cyan"
                      )}
                    >
                      {activeData.calcOutput(concentration)}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Drawer Footer ── */}
              <div className="px-6 py-4 border-t border-dark-border">
                <p className="text-[9px] font-mono tracking-wider text-text-secondary/30 text-center">
                  SNEAKERLAB R&amp;D // FORMULA DATA V2.4 // PROPRIETARY TECHNOLOGY
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
            {HOTSPOTS.map((h) => (
              <div
                key={h.id}
                className={cn(
                  "h-2 w-2 rounded-full",
                  h.color === "orange" ? "bg-accent-orange/50" : "bg-accent-cyan/50"
                )}
              />
            ))}
          </div>
          <span className="text-[10px] font-medium tracking-wider text-text-secondary/50 uppercase">
            Hover + Click hotspots to explore formulas
          </span>
        </div>
      </div>
    </section>
  );
}

