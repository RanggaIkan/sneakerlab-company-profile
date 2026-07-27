"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";

/* ─── Navigation Links with hash IDs for smooth scroll ─── */
const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#lab-blueprint", label: "The Lab" },
  { href: "#services", label: "Services" },
  { href: "#leadership", label: "Leadership" },
  { href: "#authentication", label: "Authentication" },
  { href: "#contact", label: "Contact" },
] as const;

/* ─── Smooth scroll helper ─── */
function scrollToSection(href: string) {
  const id = href.replace("#", "");
  if (id === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ─── Navbar Component ─── */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /* ── Scroll Effect ── */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Close mobile menu on Escape ── */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsMobileOpen(false);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, handleKeyDown]);

  /* ── Handle Nav Click (smooth scroll + close mobile) ── */
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    scrollToSection(href);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-[400ms] cubic-bezier(0.19,1,0.22,1)",
        isScrolled
          ? "bg-dark-base/75 backdrop-blur-xl border-b border-dark-border shadow-[0_1px_0_rgba(255,255,255,0.05)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-10 max-w-7xl">
{/* ── Brand Logo ── */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="group flex items-center gap-3"
          aria-label="SNEAKERLAB Home"
        >
          {/* Image Logo with Fallback */}
          <div className="relative flex items-center justify-center rounded-lg bg-accent-orange/10 border border-accent-orange/20 p-1.5 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,85,0,0.5)]">
            <img
              src="/images/logo.svg"
              alt="SNEAKERLAB"
              className="h-[38px] w-auto object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const fallback = e.currentTarget.parentElement?.querySelector(".logo-fallback");
                if (fallback) (fallback as HTMLElement).style.display = "flex";
              }}
            />
            <span
              className="logo-fallback hidden absolute inset-0 items-center justify-center text-[10px] font-bold tracking-[0.15em] text-accent-orange"
            >
              SL
            </span>
          </div>

          {/* Brand Name */}
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-[0.12em] text-text-primary">
              SNEAKERLAB
            </span>
            <span className="text-[10px] font-medium tracking-[0.08em] text-text-secondary">
              R&D STUDIO
            </span>
          </div>
        </a>

        {/* ── Desktop Nav ── */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Primary Navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-accent-orange after:rounded-full after:transition-all after:duration-300 hover:after:w-4/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <Button variant="primary" size="sm" className="hidden lg:inline-flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="flex items-center gap-2"
            >
              Consult R&D
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="lg:hidden relative flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-dark-hover transition-all duration-200"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((prev) => !prev)}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
          isMobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-dark-base/60 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-72 max-w-[85vw] glass-panel-strong border-l border-dark-border shadow-2xl transition-transform duration-[400ms] cubic-bezier(0.19,1,0.22,1)",
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6">
            {/* Nav Links */}
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "group flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-dark-hover transition-all duration-200 cursor-pointer",
                    isMobileOpen && "animate-in fade-in slide-in-from-right-4"
                  )}
                  style={{
                    animationDelay: `${index * 60}ms`,
                    animationFillMode: "both",
                  }}
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 text-text-secondary/40 group-hover:text-accent-orange transition-colors duration-200" />
                </a>
              ))}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Mobile CTA */}
            <Button variant="primary" size="lg" className="w-full">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="flex items-center justify-center gap-2 w-full"
              >
                Consult R&D
                <ChevronRight className="h-4 w-4" />
              </a>
            </Button>

            {/* Footer note */}
            <p className="mt-4 text-center text-[11px] font-medium tracking-wider text-text-secondary/50 uppercase">
              Engineered by SNEAKERLAB
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

