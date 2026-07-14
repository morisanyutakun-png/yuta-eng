"use client";

// 広告流入→購入コンバージョン計測のための GA4 イベント（クライアント側）。
// purchase は決済成功確定後にのみ送る（analytics-events.tsx / lib/ga4.ts）。ここでは
// その手前のファネル（view_item → select_item → begin_checkout / generate_lead）と、
// CTA の発火位置（cta_click）だけを扱う。既存の page_view / purchase 実装には触れない。

import { useEffect, useRef } from "react";
import Link from "next/link";

import { currentSinglePrice } from "@/lib/pricing";
import type { Ga4Item } from "@/lib/ga4-items";

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const GA_DEBUG_MODE = process.env.NEXT_PUBLIC_GA_DEBUG_MODE === "1";

function getGtag() {
  if (typeof window === "undefined") return null;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  w.gtag =
    w.gtag ||
    function (...args: unknown[]) {
      (w.dataLayer as unknown[]).push(args);
    };
  return w.gtag;
}

/** 汎用の GA4 イベント送信。window 未定義（SSR）では何もしない。 */
export function gtagEvent(name: string, params: Record<string, unknown> = {}) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", name, {
    ...(GA_DEBUG_MODE ? { debug_mode: true } : {}),
    ...params,
  });
}

/**
 * CTA クリック計測用のリンク。cta_location でファーストビュー・料金・教材カード・
 * 最終CTA などの発火位置を分析できるようにする。
 */
export function TrackedLink({
  href,
  location,
  children,
  className,
  ariaLabel,
  extraParams,
  eventName = "cta_click",
}: {
  href: string;
  location: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  extraParams?: Record<string, unknown>;
  eventName?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      data-cta-location={location}
      className={className}
      onClick={() =>
        gtagEvent(eventName, { cta_location: location, ...extraParams })
      }
    >
      {children}
    </Link>
  );
}

/** 相談導線（generate_lead）。mailto や /contact への遷移時に発火。 */
export function LeadLink({
  href,
  location,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  location: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const isMail = href.startsWith("mailto:");
  const fire = () =>
    gtagEvent("generate_lead", { cta_location: location, method: isMail ? "email" : "form" });

  if (isMail) {
    return (
      <a href={href} aria-label={ariaLabel} data-cta-location={location} className={className} onClick={fire}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} data-cta-location={location} className={className} onClick={fire}>
      {children}
    </Link>
  );
}

/**
 * 料金・教材が画面に入ったら view_item を1回だけ送る（IntersectionObserver）。
 * 表示のない計測専用要素。
 */
export function ViewItemBeacon({ items }: { items: Ga4Item[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || fired.current) return;

    const value = currentSinglePrice();
    const fire = () => {
      if (fired.current) return;
      fired.current = true;
      gtagEvent("view_item", {
        currency: "JPY",
        value,
        item_list_id: "lp_materials",
        item_list_name: "ノビットスタディ 対応教材",
        items,
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      fire();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          fire();
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [items]);

  return <div ref={ref} aria-hidden="true" className="h-0 w-full" />;
}
