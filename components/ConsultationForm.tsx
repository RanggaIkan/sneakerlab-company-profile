"use client";

import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Send,
  User,
  Mail,
  Briefcase,
  FileText,
  Upload,
  ArrowRight,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

/* ─── Service Options ─── */
const SERVICE_OPTIONS = [
  { value: "restoration", label: "Deep Chemical Restoration" },
  { value: "custom-art", label: "Custom Structural Engineering & Sole Swap" },
  { value: "nano-coating", label: "Nanotech Hydrophobic Protection" },
] as const;

/* ─── Form Data ─── */
interface FormData {
  fullName: string;
  contact: string;
  service: string;
  shoeDescription: string;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  contact: "",
  service: "restoration",
  shoeDescription: "",
};

/* ─── Drag & Drop Upload Zone ─── */
function FileUploadZone() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...dropped].slice(0, 5));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []).filter((f) =>
f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...selected].slice(0, 5));
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div>
      <label className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-2 block">
        Shoe Condition Photos (optional)
      </label>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200",
          isDragOver
            ? "border-accent-orange/50 bg-accent-orange-dim/10"
            : "border-dark-border hover:border-accent-cyan/30 hover:bg-dark-hover"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
          aria-label="Upload shoe condition photos"
        />

        <Upload
          className={cn(
            "mx-auto h-6 w-6 mb-2 transition-colors",
            isDragOver ? "text-accent-orange" : "text-text-secondary/40"
          )}
        />
        <p className="text-xs text-text-secondary/60">
          <span className="text-accent-cyan/70 font-semibold">Click to upload</span> or drag &amp; drop
        </p>
        <p className="text-[10px] text-text-secondary/30 mt-1">PNG, JPG up to 10MB each (max 5)</p>
      </div>

      {/* File previews */}
      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-dark-border bg-dark-elevated/50 px-3 py-1.5"
            >
              <span className="text-[10px] font-mono text-text-secondary/70 truncate max-w-[120px]">
                {file.name}
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="text-text-secondary/40 hover:text-red-400 transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Consultation Form ─── */
export default function ConsultationForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const updateField = useCallback(
    (field: keyof FormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.fullName.trim() || !form.contact.trim()) return;

      const serviceLabel =
        SERVICE_OPTIONS.find((s) => s.value === form.service)?.label ?? form.service;

      const message = encodeURIComponent(
        `*SNEAKERLAB R&D Consultation Request*\n\n` +
        `*Name:* ${form.fullName.trim()}\n` +
        `*Contact:* ${form.contact.trim()}\n` +
        `*Service:* ${serviceLabel}\n` +
        `*Shoe Description:* ${form.shoeDescription.trim() || "Not provided"}\n\n` +
        `_Sent via SNEAKERLAB Company Profile_`
      );

      window.open(`https://wa.me/6281234567890?text=${message}`, "_blank", "noopener,noreferrer");
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setTimeout(() => setSubmitted(false), 5000);
    },
    [form]
  );

  const isValid = form.fullName.trim() && form.contact.trim();

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      aria-label="Consultation and R&D Request Form"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern-subtle opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(0,229,255,0.03),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Section Label ── */}
        <div className="flex items-center gap-3 mb-2">
          <span className="h-px w-8 bg-accent-cyan/40" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-cyan">
            Get In Touch
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-2">
          Consult Our
          <br />
          <span className="text-gradient-cyan">R&D Team</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mb-10 sm:mb-14">
          Submit a detailed request and our engineering team will respond with a
          customized restoration or treatment proposal within 24 hours.
        </p>

        {/* ── Form Card ── */}
        <div className="max-w-2xl mx-auto">
          <div className="relative group/form">
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-3xl bg-accent-cyan/5 blur-2xl opacity-30 group-hover/form:opacity-60 transition-opacity duration-700" />

            <div className="relative rounded-2xl border border-dark-border bg-gradient-to-b from-dark-card to-dark-base overflow-hidden">
              <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]" />

              <div className="relative p-6 sm:p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Success Banner */}
                  {submitted && (
                    <div className="flex items-center gap-3 rounded-xl border border-accent-orange/20 bg-accent-orange-dim/20 p-4 animate-in slide-in-from-top-2 duration-300">
                      <CheckCircle className="h-5 w-5 text-accent-orange shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-accent-orange">Request Submitted!</p>
                        <p className="text-xs text-text-secondary/70">
                          WhatsApp will open with your pre-filled consultation message.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-2 block"
                    >
                      Full Name <span className="text-accent-orange">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
                      <input
                        id="fullName"
                        type="text"
                        value={form.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="Your full name"
                        required
                        className="w-full rounded-xl border border-dark-border bg-dark-elevated/50 pl-10 pr-4 py-3.5 text-sm text-text-primary placeholder:text-text-secondary/20 outline-none focus:border-accent-cyan/30 focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* WhatsApp / Email */}
                  <div>
                    <label
                      htmlFor="contact"
                      className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-2 block"
                    >
                      WhatsApp / Email <span className="text-accent-orange">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30" />
                      <input
                        id="contact"
                        type="text"
                        value={form.contact}
                        onChange={(e) => updateField("contact", e.target.value)}
                        placeholder="+62 812-3456-7890 or email@example.com"
                        required
                        className="w-full rounded-xl border border-dark-border bg-dark-elevated/50 pl-10 pr-4 py-3.5 text-sm text-text-primary placeholder:text-text-secondary/20 outline-none focus:border-accent-cyan/30 focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label
                      htmlFor="service"
                      className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-2 block"
                    >
                      Service Type
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30 z-10" />
                      <select
                        id="service"
                        value={form.service}
                        onChange={(e) => updateField("service", e.target.value)}
                        className="w-full rounded-xl border border-dark-border bg-dark-elevated/50 pl-10 pr-10 py-3.5 text-sm text-text-primary appearance-none outline-none focus:border-accent-cyan/30 focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-dark-card text-text-primary">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/30 pointer-events-none"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Shoe Description */}
                  <div>
                    <label
                      htmlFor="shoeDescription"
                      className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-secondary/50 mb-2 block"
                    >
                      Shoe Description
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-text-secondary/30" />
                      <textarea
                        id="shoeDescription"
                        value={form.shoeDescription}
                        onChange={(e) => updateField("shoeDescription", e.target.value)}
                        placeholder="Brand, model, condition, and specific concerns..."
                        rows={4}
                        className="w-full rounded-xl border border-dark-border bg-dark-elevated/50 pl-10 pr-4 py-3.5 text-sm text-text-primary placeholder:text-text-secondary/20 outline-none focus:border-accent-cyan/30 focus:ring-2 focus:ring-accent-cyan/20 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <FileUploadZone />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={cn(
                      "w-full rounded-xl py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300",
                      "flex items-center justify-center gap-2",
                      isValid
                        ? "bg-accent-orange text-dark-base hover:bg-accent-orange/90 orange-glow orange-glow-hover"
                        : "bg-dark-elevated text-text-secondary/40 cursor-not-allowed"
                    )}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Send via WhatsApp</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-center text-[10px] font-mono text-text-secondary/30">
                    Your data is transmitted securely via WhatsApp. No data is stored on our servers.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
