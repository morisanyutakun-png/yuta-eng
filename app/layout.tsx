import type { Metadata, Viewport } from "next";
import { Geist_Mono, Shippori_Mincho } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";

import { JsonLd } from "@/components/json-ld";
import { ScrollProgress } from "@/components/scroll-progress";
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

const zenKaku = localFont({
  variable: "--font-sans-jp",
  src: [
    { path: "../public/fonts/NotoSansJP-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/NotoSansJP-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/NotoSansJP-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  fallback: ["Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", "sans-serif"],
});

// Shippori Mincho is a CJK font: next/font/google emits ~100 @font-face rules
// per weight (unicode-range subsets). 4 weights → ~400 @font-face rules =
// 378KB of CSS on every page. We drop to a single weight (700) used by article
// headings and serif accents, falling back to OS mincho for other weights.
const shipporiMincho = Shippori_Mincho({
  variable: "--font-serif-jp",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

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
      className={`${zenKaku.variable} ${shipporiMincho.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
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
        <ScrollProgress />
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
