"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __nobitGoogleTagConfigured?: boolean;
  __nobitLastPageViewKey?: string;
  __nobitLpPageViewTracked?: boolean;
};

type PurchaseItem = {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  price?: number;
  quantity: number;
};

type PurchaseResponse = {
  paid: boolean;
  transactionId: string;
  value: number;
  currency: string;
  items: PurchaseItem[];
};

const GOOGLE_ADS_PURCHASE_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_SEND_TO ?? "";

function getGtag() {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  w.gtag =
    w.gtag ||
    function (...args: unknown[]) {
      (w.dataLayer as unknown[]).push(args);
    };
  return w.gtag;
}

function hasTracked(storageKey: string) {
  try {
    return window.localStorage.getItem(storageKey) !== null;
  } catch {
    return false;
  }
}

function markTracked(storageKey: string) {
  try {
    window.localStorage.setItem(storageKey, new Date().toISOString());
  } catch {
    // Storage can be unavailable in strict privacy modes; transaction_id still
    // gives GA4 a stable duplicate guard.
  }
}

function pageEventParams() {
  return {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
  };
}

export function PageViewEventTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const w = window as GtagWindow;
    const key = `${pathname}${window.location.search}`;
    if (w.__nobitLastPageViewKey === key) return;

    getGtag()("event", "page_view", pageEventParams());
    w.__nobitLastPageViewKey = key;
  }, [pathname]);

  return null;
}

export function LpPageViewEvent() {
  useEffect(() => {
    const w = window as GtagWindow;
    if (w.__nobitLpPageViewTracked) return;

    getGtag()("event", "lp_page_view", {
      ...pageEventParams(),
      event_category: "landing_page",
      event_label: "home",
    });
    w.__nobitLpPageViewTracked = true;
  }, []);

  return null;
}

export function PurchaseEventTracker({ sessionId }: { sessionId: string | null }) {
  useEffect(() => {
    if (!sessionId) return;

    const safeSessionId = sessionId;
    const storageKey = `nobit:ga4:purchase:${safeSessionId}`;
    if (hasTracked(storageKey)) return;

    let canceled = false;

    async function trackPurchase() {
      const res = await fetch(
        `/api/checkout/session?session_id=${encodeURIComponent(safeSessionId)}`,
        { credentials: "same-origin" },
      ).catch(() => null);

      if (!res?.ok || canceled) return;

      const purchase = (await res.json().catch(() => null)) as PurchaseResponse | null;
      if (!purchase?.paid || canceled) return;

      const eventParams = {
        transaction_id: purchase.transactionId,
        value: purchase.value,
        currency: purchase.currency,
        affiliation: "ノビットスタディ 中高部",
        tax: 0,
        shipping: 0,
        items: purchase.items,
      };

      getGtag()("event", "purchase", eventParams);
      if (GOOGLE_ADS_PURCHASE_SEND_TO) {
        getGtag()("event", "conversion", {
          send_to: GOOGLE_ADS_PURCHASE_SEND_TO,
          value: purchase.value,
          currency: purchase.currency,
          transaction_id: purchase.transactionId,
        });
      }
      markTracked(storageKey);
    }

    void trackPurchase();

    return () => {
      canceled = true;
    };
  }, [sessionId]);

  return null;
}
