"use client";

import { cn } from "@/lib/utils";
import {
  MapPin,
  Clock,
  Mail,
  Building,
  Crosshair,
  Compass,
} from "lucide-react";

/* ─── Studio Info Data ─── */
const STUDIO_INFO = {
  hours: "Monday — Saturday: 09:00 – 18:00 WIB\nSunday: By appointment only",
  email: "hello@sneakerlab.id",
  address: "Jl. Setiabudi No. 45, Salatiga\nCentral Java, Indonesia 50711",
  coordinates: { lat: "-7.3305", lng: "110.5084" },
};

/* ─── Blueprint Map Mockup ─── */
function BlueprintMap() {
  return (
    <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-xl border border-dark-border bg-dark-base/80 overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Map SVG */}
      <svg
        viewBox="0 0 600 400"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="map-grid" x={0} y={0} width={30} height={30} patternUnits="userSpaceOnUse">
            <rect width={30} height={30} fill="none" />
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0,229,255,0.06)" strokeWidth={0.5} />
          </pattern>
          <pattern id="map-topo" x={0} y={0} width={120} height={120} patternUnits="userSpaceOnUse">
            <rect width={120} height={120} fill="url(#map-grid)" />
            <circle cx={60} cy={60} r={30} fill="none" stroke="rgba(255,85,0,0.04)" strokeWidth={0.5} />
            <circle cx={60} cy={60} r={50} fill="none" stroke="rgba(255,85,0,0.025)" strokeWidth={0.3} />
          </pattern>
        </defs>

        {/* Base */}
        <rect width={600} height={400} fill="url(#map-topo)" />

        {/* Terrain contour lines */}
        <path
          d="M 0 250 Q 100 220 200 240 Q 300 260 400 230 Q 500 200 600 220"
          fill="none"
          stroke="rgba(0,229,255,0.06)"
          strokeWidth={0.8}
        />
        <path
          d="M 0 280 Q 80 260 180 275 Q 280 290 380 270 Q 480 250 600 270"
          fill="none"
          stroke="rgba(0,229,255,0.05)"
          strokeWidth={0.6}
        />
        <path
          d="M 0 310 Q 100 300 200 310 Q 350 320 450 300 Q 550 280 600 300"
          fill="none"
          stroke="rgba(0,229,255,0.04)"
          strokeWidth={0.5}
        />

        {/* Road networks */}
        <line x1={120} y1={0} x2={180} y2={400} stroke="rgba(255,85,0,0.08)" strokeWidth={1.5} />
        <line x1={280} y1={0} x2={260} y2={400} stroke="rgba(255,85,0,0.06)" strokeWidth={1} />
        <line x1={420} y1={0} x2={400} y2={400} stroke="rgba(255,85,0,0.07)" strokeWidth={1.2} />
        <line x1={0} y1={150} x2={600} y2={140} stroke="rgba(255,85,0,0.06)" strokeWidth={1} />
        <line x1={0} y1={280} x2={600} y2={270} stroke="rgba(255,85,0,0.08)" strokeWidth={1.5} />

        {/* Center crosshair — Studio Location */}
        <circle cx={300} cy={200} r={40} fill="none" stroke="rgba(255,85,0,0.15)" strokeWidth={0.8} strokeDasharray="4,3" />
        <circle cx={300} cy={200} r={8} fill="rgba(255,85,0,0.2)" stroke="rgba(255,85,0,0.4)" strokeWidth={1} />
        <line x1={300} y1={180} x2={300} y2={170} stroke="rgba(255,85,0,0.4)" strokeWidth={1} />
        <line x1={300} y1={220} x2={300} y2={230} stroke="rgba(255,85,0,0.4)" strokeWidth={1} />
        <line x1={280} y1={200} x2={270} y2={200} stroke="rgba(255,85,0,0.4)" strokeWidth={1} />
        <line x1={320} y1={200} x2={330} y2={200} stroke="rgba(255,85,0,0.4)" strokeWidth={1} />

        {/* Compass rose */}
        <g transform="translate(60, 60)">
          <circle cx={0} cy={0} r={20} fill="none" stroke="rgba(0,229,255,0.15)" strokeWidth={0.6} />
          <polygon points="0,-16 3,-5 -3,-5" fill="rgba(0,229,255,0.3)" />
          <polygon points="0,16 3,5 -3,5" fill="rgba(255,85,0,0.3)" />
          <line x1={0} y1={-20} x2={0} y2={20} stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} />
          <line x1={-20} y1={0} x2={20} y2={0} stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} />
          <text x={0} y={-26} textAnchor="middle" fontSize={8} fill="rgba(0,229,255,0.4)" fontFamily="monospace">N</text>
        </g>

        {/* Coordinates label */}
        <text x={300} y={370} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.15)" fontFamily="monospace">
          LAT: {STUDIO_INFO.coordinates.lat} | LNG: {STUDIO_INFO.coordinates.lng}
        </text>

        {/* Scale bar */}
        <line x1={480} y1={350} x2={560} y2={350} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
        <line x1={480} y1={346} x2={480} y2={354} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
        <line x1={560} y1={346} x2={560} y2={354} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
        <text x={520} y={345} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,0.15)" fontFamily="monospace">2 km</text>
      </svg>

      {/* Overlay crosshair indicator */}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="text-[9px] font-mono tracking-wider text-accent-orange/50">
          SNEAKERLAB // FLAGSHIP STUDIO
        </span>
      </div>
    </div>
  );
}

/* ─── Studio HQ Component ─── */
export default function StudioHQ() {
  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      aria-label="Studio Headquarters Location"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern-subtle opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,85,0,0.03),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Section Label ── */}
        <div className="flex items-center gap-3 mb-2">
          <span className="h-px w-8 bg-accent-orange/40" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-orange">
            Headquarters
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-2">
          Flagship Studio
          <br />
          <span className="text-gradient-orange">Sneakerlab HQ</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mb-10 sm:mb-14">
          Our central R&D laboratory, engineering workshop, and client consultation
          studio — located in the heart of Salatiga, Central Java.
        </p>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* ── Left: Map ── */}
          <div className="lg:col-span-3">
            <div className="relative group/map">
              <div className="absolute -inset-3 rounded-2xl bg-accent-orange/5 blur-xl opacity-30 group-hover/map:opacity-60 transition-opacity duration-700" />
              <BlueprintMap />
            </div>
          </div>

          {/* ── Right: Studio Info Card ── */}
          <div className="lg:col-span-2">
            <div className="relative group/info">
              <div className="absolute -inset-3 rounded-2xl bg-accent-cyan/5 blur-xl opacity-20 group-hover/info:opacity-40 transition-opacity duration-700" />

              <div className="relative rounded-2xl border border-dark-border bg-dark-card/60 backdrop-blur-sm overflow-hidden">
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Studio Badge */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent-orange/20 bg-accent-orange-dim">
                      <Building className="h-5 w-5 text-accent-orange" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text-primary">SNEAKERLAB Studio</h3>
                      <p className="text-[11px] font-mono text-text-secondary/50">
                        Engineering. Restoration. Innovation.
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-dark-border" />

                  {/* Operating Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-accent-cyan mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-1">
                        Operating Hours
                      </p>
                      <p className="text-sm text-text-secondary/80 whitespace-pre-line leading-relaxed">
                        {STUDIO_INFO.hours}
                      </p>
                    </div>
                  </div>

                  {/* Contact Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-accent-orange mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-1">
                        Contact Email
                      </p>
                      <a
                        href={`mailto:${STUDIO_INFO.email}`}
                        className="text-sm font-semibold text-accent-cyan hover:text-accent-cyan/80 transition-colors"
                      >
                        {STUDIO_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-accent-cyan mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-1">
                        Flagship Studio Address
                      </p>
                      <p className="text-sm text-text-secondary/80 whitespace-pre-line leading-relaxed">
                        {STUDIO_INFO.address}
                      </p>
                    </div>
                  </div>

                  {/* Coordinates */}
                  <div className="flex items-center gap-2 rounded-lg border border-dark-border bg-dark-base/40 p-3">
                    <Crosshair className="h-3.5 w-3.5 text-accent-orange/60 shrink-0" />
                    <span className="text-[10px] font-mono tracking-wider text-text-secondary/50">
                      LAT: {STUDIO_INFO.coordinates.lat}° S
                    </span>
                    <span className="text-text-secondary/20">|</span>
                    <span className="text-[10px] font-mono tracking-wider text-text-secondary/50">
                      LNG: {STUDIO_INFO.coordinates.lng}° E
                    </span>
                  </div>

                  {/* CTA */}
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(STUDIO_INFO.address.replace(/\n/g, ", "))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-xl border border-dark-border bg-dark-elevated/50 py-3 text-xs font-semibold tracking-wider uppercase text-text-secondary/70 hover:text-text-primary hover:border-accent-orange/30 hover:bg-accent-orange-dim/10 transition-all"
                  >
                    <Compass className="h-4 w-4" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
