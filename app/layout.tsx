import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { SEO } from "@/lib/content";

/* Naštete so SAMO dejansko uporabljene debeline — vsaka doda svojo datoteko.
   display: 600 (font-semibold), 700 (naslovi h1–h4), 800 (font-extrabold)
   sans:    400 (osnovno besedilo), 500 (font-medium v meniju)
   mono:    400 (.tick, .btn), 500 (.eyebrow)
   Če kje dodate novo debelino, jo pripišite tudi sem. */
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

/* Besedila so v lib/content.ts → SEO */
export const metadata: Metadata = {
  metadataBase: new URL(SEO.url),
  title: {
    default: SEO.title,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  openGraph: {
    title: SEO.shareTitle,
    description: SEO.shareDescription,
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.shareTitle,
    description: SEO.shareDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sl"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col">
        <ScrollReveal />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
