import type { Metadata, Viewport } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";

import { GoogleAnalyticsLoader } from "@/components/google-analytics-loader";
import { PageViewEventTracker } from "@/components/analytics-events";
import { JsonLd } from "@/components/json-ld";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/data/site";
import { getOgVersion } from "@/lib/og-version";
import {
  createOrganizationJsonLd,
  createPersonJsonLd,
  createWebsiteJsonLd,
} from "@/lib/structured-data";

// Vercel serves /favicon.svg with `Cache-Control: immutable, max-age=1y`, so
// the only way to push a redesigned favicon to browsers (and eventually to
// Google's separate favicon crawler) is a URL change. Reuse the per-deploy
// OG version stamp.
const ICON_V = `?v=${getOgVersion()}`;

// 見出し専用のブランドフォント。本文は端末標準のまま（速度優先）。
// display:swap＋preload:false で、初期表示をブロックせず非同期で差し替える。
const displayFont = Zen_Kaku_Gothic_New({
  weight: ["700", "900"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-display",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Hiragino Sans",
    "Hiragino Kaku Gothic ProN",
    "Yu Gothic Medium",
    "Meiryo",
    "sans-serif",
  ],
});

import "./globals.css";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-W11S94CV6L";
const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-17966887751";
const GOOGLE_CONSENT_DEFAULT =
  process.env.NEXT_PUBLIC_GOOGLE_CONSENT_DEFAULT === "denied"
    ? "denied"
    : "granted";
const GSC_VERIFICATION = Array.from(
  new Set(
    [
      "xJ-e8RMue2_IEi2fS0-L0SkG9axuC4oPuXXVawtY7kk",
      process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim(),
    ].filter((token): token is string => Boolean(token)),
  ),
);

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
    "高校物理 添削、記述答案 添削、オンライン添削塾、答案添削、学習管理、高校数学、高校英語、大学受験 物理、教材開発、自立学習",
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      {
        url: `/favicon.svg${ICON_V}`,
        type: "image/svg+xml",
        sizes: "512x512",
      },
      {
        url: `/icon.svg${ICON_V}`,
        type: "image/svg+xml",
        sizes: "512x512",
      },
    ],
    shortcut: `/favicon.svg${ICON_V}`,
    apple: `/favicon.svg${ICON_V}`,
    other: [
      {
        rel: "mask-icon",
        url: `/mask-icon.svg${ICON_V}`,
        color: "#0f172a",
      },
    ],
  },
  manifest: `/site.webmanifest${ICON_V}`,
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
  verification: {
    google: GSC_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`h-full antialiased ${displayFont.variable}`}>
      <head>
        {GA_MEASUREMENT_ID ? (
          <GoogleAnalyticsLoader
            measurementId={GA_MEASUREMENT_ID}
            googleAdsId={GOOGLE_ADS_ID}
            consentDefault={GOOGLE_CONSENT_DEFAULT}
          />
        ) : null}
      </head>
      <body className="flex min-h-full flex-col">
        <PageViewEventTracker />
        <JsonLd data={createWebsiteJsonLd()} />
        <JsonLd data={createOrganizationJsonLd()} />
        <JsonLd data={createPersonJsonLd()} />
        {/* Top reading-progress bar (CSS scroll-timeline, zero JS) */}
        <div aria-hidden="true" className="scroll-progress">
          <span />
        </div>
        <SiteHeader />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
