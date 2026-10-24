"use client";

import { usePathname } from "next/navigation";

export function SiteHeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // ECサイト（/mock-exams）では研究室本体のヘッダーを非表示にし、独立したECヘッダーを提供する
  if (pathname?.startsWith("/mock-exams")) {
    return null;
  }
  return <>{children}</>;
}

