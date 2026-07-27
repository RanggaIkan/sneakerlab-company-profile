"use client";

import { cn } from "@/lib/utils";
import { Globe, Code, Camera, Quote } from "lucide-react";

/* ─── Team Data ─── */
interface CoFounderData {
  id: string;
  name: string;
  initials: string;
  role: string;
  discipline: string;
  bio: string;
  stats: { label: string; value: string }[];
  socials: { platform: "linkedin" | "github" | "instagram"; href: string }[];
  color: "orange" | "cyan";
}

const CO_FOUNDERS: CoFounderData[] = [
  {
    id: "rangga",
    name: "Rangga Wikan Raditya",
    initials: "RW",
    role: "Founder & Chief Executive Officer",
    discipline: "Front-End Architecture Lead",
    bio: "Visionary architect of SNEAKERLAB's digital ecosystem. Rangga leads UI/UX strategy, design system engineering, and front-end architecture for all lab instrumentation and client-facing platforms.",
    stats: [
      { label: "Years in R&D", value: "12+" },
      { label: "Patents Filed", value: "8" },
      { label: "Projects Led", value: "200+" },
    ],
    socials: [
      { platform: "linkedin", href: "#" },
      { platform: "github", href: "#" },
      { platform: "instagram", href: "#" },
    ],
    color: "orange",
  },
  {
    id: "vincent",
    name: "Vincent",
    initials: "VN",
    role: "Co-Founder & Chief Technology Officer",
    discipline: "Back-End Systems Architect",
    bio: "Vincent engineers the backbone of SNEAKERLAB's operations — from laboratory management systems and chemical tracking databases to automated quality control pipelines and client authentication infrastructure.",
    stats: [
      { label: "Systems Built", value: "15+" },
      { label: "Data Integrity", value: "99.9%" },
      { label: "API Uptime", value: "99.97%" },
    ],
    socials: [
      { platform: "linkedin", href: "#" },
      { platform: "github", href: "#" },
      { platform: "instagram", href: "#" },
    ],
    color: "cyan",
  },
];

/* ─── Social Icon ─── */
function SocialIcon({ platform, href, color }: { platform: string; href: string; color: "orange" | "cyan" }) {
  const iconMap: Record<string, React.ElementType> = {
    linkedin: Globe,
    github: Code,
    instagram: Camera,
  };
  const Icon = iconMap[platform] ?? Globe;
  const isOrange = color === "orange";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200",
        "border-dark-border text-text-secondary/50 hover:text-text-primary",
        isOrange
          ? "hover:border-accent-orange/30 hover:bg-accent-orange-dim/10 hover:text-accent-orange"
          : "hover:border-accent-cyan/30 hover:bg-accent-cyan-dim/10 hover:text-accent-cyan"
      )}
      aria-label={`${platform} profile`}
    >
      <Icon className="h-3.5 w-3.5" />
    </a>
  );
}

/* ─── Team Card ─── */
function TeamCard({ member }: { member: CoFounderData }) {
  const isOrange = member.color === "orange";

  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-dark-border bg-dark-card/60 backdrop-blur-sm overflow-hidden",
        "transition-all duration-500 ease-out-expo",
        isOrange ? "hover:border-accent-orange/20" : "hover:border-accent-cyan/20"
      )}
    >
      {/* Corner glow */}
      <div
        className={cn(
          "absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-3xl",
          isOrange ? "bg-accent-orange/20" : "bg-accent-cyan/20"
        )}
      />

      {/* Decorative top border line */}
      <div
        className={cn(
          "absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          isOrange
            ? "bg-gradient-to-r from-transparent via-accent-orange/40 to-transparent"
            : "bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
        )}
      />

      <div className="relative p-6 sm:p-8 lg:p-10">
        {/* ── Avatar / Initials Badge ── */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={cn(
              "relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border-2 transition-all duration-300",
              isOrange
                ? "border-accent-orange/20 bg-accent-orange-dim text-accent-orange group-hover:border-accent-orange/40 group-hover:shadow-[0_0_20px_rgba(255,85,0,0.15)]"
                : "border-accent-cyan/20 bg-accent-cyan-dim text-accent-cyan group-hover:border-accent-cyan/40 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
            )}
          >
            <span className="text-lg sm:text-xl font-bold tracking-tight">
              {member.initials}
            </span>

            {/* Online indicator dot */}
            <span
              className={cn(
                "absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-dark-card",
                isOrange ? "bg-accent-orange" : "bg-accent-cyan"
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 rounded-full animate-ping opacity-60",
                  isOrange ? "bg-accent-orange" : "bg-accent-cyan"
                )}
              />
            </span>
          </div>

          {/* Quote icon */}
          <Quote className="h-6 w-6 text-text-secondary/15" />
        </div>

        {/* ── Name & Role ── */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary leading-tight">
            {member.name}
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-text-secondary/80">
            {member.role}
          </p>
          <p
            className={cn(
              "mt-1 text-xs font-mono tracking-wide",
              isOrange ? "text-accent-orange/70" : "text-accent-cyan/70"
            )}
          >
            {member.discipline}
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="my-5 h-px bg-dark-border" />

        {/* ── Bio ── */}
        <p className="text-sm text-text-secondary/70 leading-relaxed">
          {member.bio}
        </p>

        {/* ── Stats Grid ── */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {member.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-dark-border bg-dark-base/40 p-2.5 text-center"
            >
              <p
                className={cn(
                  "text-base font-bold font-mono tabular-nums",
                  isOrange ? "text-accent-orange" : "text-accent-cyan"
                )}
              >
                {stat.value}
              </p>
              <p className="mt-0.5 text-[9px] font-medium tracking-wider text-text-secondary/50 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Social Links ── */}
        <div className="mt-6 flex items-center gap-2">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-text-secondary/30 mr-1">
            Connect
          </span>
          <span className="h-px w-6 bg-dark-border" />
          <div className="flex items-center gap-1.5">
            {member.socials.map((s) => (
              <SocialIcon key={s.platform} platform={s.platform} href={s.href} color={member.color} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── TeamGrid Section ─── */
export default function TeamGrid() {
  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      aria-label="Co-Founders Leadership Team"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern-subtle opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(0,229,255,0.03),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Section Label ── */}
        <div className="flex items-center gap-3 mb-2">
          <span className="h-px w-8 bg-accent-cyan/40" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-cyan">
            Leadership
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-2">
          Co-Founders &amp;
          <br />
          <span className="text-gradient-cyan">Executive Team</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mb-10 sm:mb-14">
          The minds behind SNEAKERLAB&apos;s integrated R&D pipeline — bridging
          front-end innovation with back-end infrastructure.
        </p>

        {/* ── Team Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {CO_FOUNDERS.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
