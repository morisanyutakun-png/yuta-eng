"use client";

import { useEffect } from "react";

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __nobitGa4Configured?: boolean;
};

type PurchaseItem = {
  item_id: string;
  item_name: string;
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

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-W11S94CV6L";

function getGtag() {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  w.gtag =
    w.gtag ||
    function (...args: unknown[]) {
      (w.dataLayer as unknown[]).push(args);
    };
  if (!w.__nobitGa4Configured) {
    w.gtag("js", new Date());
    w.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
    w.__nobitGa4Configured = true;
  }
  return w.gtag;
}

function loadGoogleAnalyticsScript() {
  const src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  if (Array.from(document.scripts).some((script) => script.src === src)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
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

export function LpPageViewEvent() {
  useEffect(() => {
    loadGoogleAnalyticsScript();
    getGtag()("event", "lp_page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
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

      loadGoogleAnalyticsScript();
      getGtag()("event", "purchase", {
        transaction_id: purchase.transactionId,
        value: purchase.value,
        currency: purchase.currency,
        items: purchase.items,
      });
      markTracked(storageKey);
    }

    void trackPurchase();

    return () => {
      canceled = true;
    };
  }, [sessionId]);

  return null;
}
