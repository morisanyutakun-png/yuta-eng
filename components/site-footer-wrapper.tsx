"use client";

import { usePathname } from "next/navigation";

export function SiteFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // ECサイト（/mock-exams）では研究室本体のフッターを非表示にし、独立したECフッターを提供する
  if (pathname?.startsWith("/mock-exams")) {
    return null;
  }
  return <>{children}</>;
}

