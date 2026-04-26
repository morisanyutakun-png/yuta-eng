import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";

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

// We ship only Regular (400) and Bold (700). The Medium (500) weight was
// dropped — at ~220KB extra on slow 4G it hurt LCP on the Moto-G-Power class
// devices; for "font-medium" callers the browser snaps to the nearest declared
// weight (Regular), which is visually a near-imperceptible difference for the
// small detail text where 500 was used.
//
// `display: "optional"` prevents the late-arriving JP woff2 from re-painting
// the LCP element on slow networks. Browsers give the font ~100ms to download;
// if it misses, the fallback (Hiragino on iOS, system Noto Sans CJK on Android)
// stays for the whole session and the cached font is used on the next visit.
// This reliably shaves 1–3s off the LCP on slow 4G — worth the small first-
// paint typeface mismatch on cold visits.
const zenKaku = localFont({
  variable: "--font-sans-jp",
  src: [
    { path: "../public/fonts/NotoSansJP-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/NotoSansJP-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "optional",
  fallback: ["Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", "sans-serif"],
  adjustFontFallback: false,
});

// Shippori Mincho was dropped entirely — `next/font/google` emits ~125
// `unicode-range` @font-face declarations per weight for CJK fonts, costing
// ~96KB of render-blocking CSS on every page. We rely on the OS Mincho
// fallback chain (Hiragino Mincho ProN / Yu Mincho / serif) instead, which
// is visually almost identical on JP devices and adds zero network cost.
//
// Geist Mono was also dropped from the layout. It was only used inside MDX
// `<code>` blocks on article pages; loading it in the root layout added
// @font-face bytes to every page (including the /blog index, which has no
// monospaced text). Article pages now fall back to the OS monospace stack —
// `ui-monospace, SF Mono, Menlo, Consolas, Liberation Mono, monospace` — set
// directly in `article.css`.

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
    <html
      lang="ja"
      className={`${zenKaku.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* Preconnect to third-party origins so the GA & gtag handshake
            (DNS+TLS) overlaps with HTML parsing instead of blocking later. */}
        {GA_MEASUREMENT_ID ? (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
            <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        ) : null}
      </head>
      <body className="flex min-h-full flex-col">
        {GA_MEASUREMENT_ID ? (
          <>
            {/* GA4: lazyOnload defers ~75KB of script until the browser is
                idle, so it never competes with LCP/INP on first visit. */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
              `}
            </Script>
          </>
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
