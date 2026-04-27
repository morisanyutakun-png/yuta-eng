import type { Metadata, Viewport } from "next";

import { GoogleAnalyticsLoader } from "@/components/google-analytics-loader";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/data/site";
import {
  createOrganizationJsonLd,
  createPersonJsonLd,
  createWebsiteJsonLd,
} from "@/lib/structured-data";

import "./globals.css";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-WT6BZVH9YJ";

// Web fonts dropped entirely. Lighthouse showed `NotoSansJP-Regular.woff2`
// (219 KB) and `NotoSansJP-Bold.woff2` (224 KB) sitting in the LCP critical
// chain at 1.4–1.5s on slow 4G — together they were the largest remaining
// FCP/LCP block. JP-locale devices already ship excellent system fonts:
//   • iOS / iPadOS : Hiragino Sans (sans-serif), Hiragino Mincho (serif)
//   • macOS        : Hiragino Sans / Hiragino Mincho
//   • Android      : Noto Sans CJK JP (built into the OS)
//   • Windows      : Yu Gothic UI / Meiryo
// The CSS variable `--font-sans-jp` is still referenced by `globals.css` but
// resolves to `undefined`, which CSS gracefully skips, falling through to the
// next entry in the stack. Net savings: ~440 KB on first visit, ~1.5s LCP.

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1d4a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  category: "education",
  classification:
    "理系人材育成、STEM教育、EdTech、教育DX、GIGAスクール、AI教材作成、LaTeX教材作成、学習支援アプリ、物理オンライン塾、教材制作",
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
        sizes: "512x512",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
        sizes: "512x512",
      },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
    other: [
      {
        rel: "mask-icon",
        url: "/mask-icon.svg",
        color: "#0f172a",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head />
      <body className="flex min-h-full flex-col">
        {GA_MEASUREMENT_ID ? (
          <GoogleAnalyticsLoader measurementId={GA_MEASUREMENT_ID} />
        ) : null}
        <JsonLd data={createWebsiteJsonLd()} />
        <JsonLd data={createOrganizationJsonLd()} />
        <JsonLd data={createPersonJsonLd()} />
        <SiteHeader />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
