import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: "SNEAKERLAB | Engineered Footwear R&D",
  description:
    "A futuristic corporate company profile and R&D studio — engineering the next generation of footwear through material science, biomechanics, and computational design.",
  keywords: [
    "sneakerlab",
    "footwear R&D",
    "sneaker research",
    "biomechanics",
    "material science",
    "footwear engineering",
  ],
  authors: [{ name: "SNEAKERLAB" }],
  openGraph: {
    title: "SNEAKERLAB | Engineered Footwear R&D",
    description:
      "Pioneering the future of footwear through advanced R&D, material science, and computational design.",
    siteName: "SNEAKERLAB",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

/* ─── Viewport ─── */
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0B0B0E",
};

/* ─── Root Layout ─── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-dark-base text-text-primary font-sans min-h-screen">
        <Navbar />
        {/* Push content below fixed navbar */}
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}

