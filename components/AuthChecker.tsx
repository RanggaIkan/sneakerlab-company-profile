"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Shield, ShieldCheck, X, BadgeCheck, Calendar, User, FlaskConical, Scan, AlertTriangle } from "lucide-react";

/* ─── Valid Certificates ─── */
const VALID_CODES = new Set(["LAB-88219-X", "LAB-88219", "88219", "LAB-X-001"]);

/* ─── Certificate Data ─── */
interface CertificateData {
  shoeModel: string;
  testingDate: string;
  inspector: string;
  chemicalSeal: string;
  certificateId: string;
}

function generateCertificate(code: string): CertificateData {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + 365);

  return {
    shoeModel: "SNEAKERLAB Prototype X // Air-Cushion Midsole",
    testingDate: futureDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    inspector: "Rangga Wikan Raditya, CEO",
    chemicalSeal: "SNEAKERLAB-CC-24-0" + Math.floor(Math.random() * 100),
    certificateId: code,
  };
}

/* ─── Verified Modal ─── */
function VerifiedModal({
  certificate,
  onClose,
  open,
}: {
  certificate: CertificateData;
  onClose: () => void;
  open: boolean;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    modalRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Certificate Verification Result — VERIFIED AUTHENTIC"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-base/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={cn(
          "relative w-full max-w-lg rounded-2xl border border-accent-orange/30",
          "bg-gradient-to-b from-dark-card to-dark-base",
          "shadow-[0_0_60px_rgba(255,85,0,0.15),0_0_120px_rgba(255,85,0,0.08)]",
          "animate-in zoom-in-95 duration-300 ease-out-expo"
        )}
      >
        {/* Animated border glow */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-accent-orange/40 via-accent-orange/10 to-accent-cyan/20 opacity-50 blur-sm pointer-events-none" />

        {/* Content */}
        <div className="relative p-6 sm:p-8">
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-dark-hover transition-colors"
            aria-label="Close verification modal"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Verified Badge */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-full bg-accent-orange/20 blur-xl animate-pulse" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent-orange-dim border-2 border-accent-orange/30">
                <ShieldCheck className="h-8 w-8 text-accent-orange" />
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-orange-dim/30 border border-accent-orange/20 px-4 py-1 mb-2">
              <BadgeCheck className="h-3.5 w-3.5 text-accent-orange" />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-accent-orange">
                Verified Authentic
              </span>
            </span>

            <p className="text-xs text-text-secondary/60 font-mono tracking-wide">
              Certificate ID:{" "}
              <span className="text-text-primary font-bold">{certificate.certificateId}</span>
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-accent-orange/20 to-transparent mb-6" />

          {/* Certificate Details */}
          <div className="space-y-4">
            {/* Shoe Model */}
            <div className="flex items-start gap-3 rounded-lg border border-dark-border bg-dark-base/40 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-orange-dim/20 border border-accent-orange/10">
                <Shield className="h-4 w-4 text-accent-orange" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-0.5">
                  Shoe Model
                </p>
                <p className="text-sm font-bold text-text-primary">{certificate.shoeModel}</p>
              </div>
            </div>

            {/* Testing Date */}
            <div className="flex items-start gap-3 rounded-lg border border-dark-border bg-dark-base/40 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-cyan-dim/20 border border-accent-cyan/10">
                <Calendar className="h-4 w-4 text-accent-cyan" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-0.5">
                  Testing Date
                </p>
                <p className="text-sm font-semibold text-text-primary">{certificate.testingDate}</p>
              </div>
            </div>

            {/* Inspector Signature */}
            <div className="flex items-start gap-3 rounded-lg border border-dark-border bg-dark-base/40 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-orange-dim/20 border border-accent-orange/10">
                <User className="h-4 w-4 text-accent-orange" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-0.5">
                  Inspector Signature
                </p>
                <p className="text-sm font-semibold text-text-primary">{certificate.inspector}</p>
                <p className="text-[10px] font-mono text-text-secondary/40 mt-0.5">
                  Digital Seal: 0x7A3F...B2E9
                </p>
              </div>
            </div>

            {/* Official Chemical Seal */}
            <div className="flex items-start gap-3 rounded-lg border border-dark-border bg-dark-base/40 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-cyan-dim/20 border border-accent-cyan/10">
                <FlaskConical className="h-4 w-4 text-accent-cyan" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-0.5">
                  Official Chemical Seal
                </p>
                <p className="text-sm font-mono font-bold text-accent-cyan">{certificate.chemicalSeal}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-dark-border text-center">
            <p className="text-[9px] font-mono tracking-wider text-text-secondary/30">
              SNEAKERLAB R&D // CERTIFICATE AUTHENTICATION // BLOCKCHAIN-VERIFIED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AuthChecker Component ─── */
export default function AuthChecker() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "verified" | "invalid">("idle");
  const [showModal, setShowModal] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const verifyCode = useCallback(() => {
    const trimmed = code.trim();
    if (!trimmed) {
      setStatus("idle");
      return;
    }

    if (VALID_CODES.has(trimmed)) {
      setStatus("verified");
      setCertificate(generateCertificate(trimmed));
      setTimeout(() => setShowModal(true), 400);
    } else {
      setStatus("invalid");
      setShowModal(false);
      setCertificate(null);
    }
  }, [code]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        verifyCode();
      }
    },
    [verifyCode]
  );

  const handleClear = useCallback(() => {
    setCode("");
    setStatus("idle");
    setShowModal(false);
    setCertificate(null);
    inputRef.current?.focus();
  }, []);

  const isVerified = status === "verified";
  const isInvalid = status === "invalid";

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      aria-label="Lab Serial Authentication System"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(0,229,255,0.04),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Section Label ── */}
        <div className="flex items-center gap-3 mb-2">
          <span className="h-px w-8 bg-accent-cyan/40" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-cyan">
            Authentication
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-2">
          LAB VERIFICATION
          <br />
          <span className="text-gradient-cyan">SYSTEM</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mb-10 sm:mb-14">
          Enter your SNEAKERLAB Certificate Serial Code to verify authenticity
          and retrieve official testing documentation.
        </p>

        {/* ── Verification Card ── */}
        <div className="max-w-xl mx-auto">
          <div className="relative group/auth">
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-3xl bg-accent-cyan/5 blur-2xl opacity-30 group-hover/auth:opacity-60 transition-opacity duration-700" />

            {/* Card */}
            <div
              className={cn(
                "relative rounded-2xl border bg-gradient-to-b from-dark-card to-dark-base overflow-hidden",
                "transition-all duration-500",
                isVerified
                  ? "border-accent-orange/30 shadow-[0_0_40px_rgba(255,85,0,0.1)]"
                  : "border-dark-border"
              )}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]" />

              <div className="relative p-6 sm:p-8 lg:p-10">
                {/* ── Scanning Icon ── */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full blur-xl opacity-40",
                        isVerified ? "bg-accent-orange/30" : "bg-accent-cyan/20"
                      )}
                    />
                    <div
                      className={cn(
                        "relative flex h-14 w-14 items-center justify-center rounded-full border",
                        isVerified
                          ? "border-accent-orange/20 bg-accent-orange-dim"
                          : "border-accent-cyan/20 bg-accent-cyan-dim"
                      )}
                    >
                      <Scan
                        className={cn(
                          "h-6 w-6",
                          isVerified ? "text-accent-orange" : "text-accent-cyan"
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Input ── */}
                <div className="space-y-4">
                  <label
                    htmlFor="serial-code"
                    className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 text-center"
                  >
                    Serial Certificate Verification Code
                  </label>

                  <div className="relative">
                    <input
                      ref={inputRef}
                      id="serial-code"
                      type="text"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                        if (status !== "idle") setStatus("idle");
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="LAB-88219-X"
                      autoComplete="off"
                      spellCheck={false}
                      className={cn(
                        "w-full rounded-xl border bg-dark-elevated/50 px-5 py-4 text-center",
                        "text-base sm:text-lg font-mono font-bold tracking-widest text-text-primary",
                        "placeholder:text-text-secondary/20 placeholder:tracking-widest",
                        "outline-none transition-all duration-300",
                        "focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-base",
                        isVerified
                          ? "border-accent-orange/30 focus:ring-accent-orange/40 text-accent-orange"
                          : isInvalid
                            ? "border-red-500/40 focus:ring-red-500/40 text-red-400"
                            : "border-dark-border focus:border-accent-cyan/30 focus:ring-accent-cyan/30"
                      )}
                    />

                    {/* Clear button */}
                    {code && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-md text-text-secondary/40 hover:text-text-primary hover:bg-dark-hover transition-colors"
                        aria-label="Clear input"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Status Messages */}
                  {isVerified && (
                    <div className="flex items-center justify-center gap-2 text-sm text-accent-orange animate-in slide-in-from-top-2 duration-300">
                      <BadgeCheck className="h-4 w-4" />
                      <span className="font-semibold">Code Verified — Opening certificate...</span>
                    </div>
                  )}

                  {isInvalid && (
                    <div className="flex items-center justify-center gap-2 text-sm text-red-400 animate-in slide-in-from-top-2 duration-300">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-semibold">Invalid code. Please check and try again.</span>
                    </div>
                  )}

                  {/* ── Verify Button ── */}
                  <button
                    type="button"
                    onClick={verifyCode}
                    disabled={!code.trim()}
                    className={cn(
                      "w-full rounded-xl py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300",
                      "flex items-center justify-center gap-2",
                      code.trim()
                        ? isVerified
                          ? "bg-accent-orange text-dark-base shadow-[0_0_20px_rgba(255,85,0,0.3)]"
                          : "bg-accent-orange text-dark-base hover:bg-accent-orange/90 orange-glow orange-glow-hover"
                        : "bg-dark-elevated text-text-secondary/40 cursor-not-allowed"
                    )}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Verify Certificate</span>
                  </button>
                </div>

                {/* ── Hint ── */}
                <div className="mt-6 text-center">
                  <p className="text-[10px] font-mono tracking-wider text-text-secondary/30">
                    Try code:{" "}
                    <span className="text-accent-cyan/60 font-bold">LAB-88219-X</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Verified Modal ── */}
      {certificate && (
        <VerifiedModal
          certificate={certificate}
          onClose={() => setShowModal(false)}
          open={showModal}
        />
      )}
    </section>
  );
}
