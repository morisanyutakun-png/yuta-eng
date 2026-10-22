import { notFound } from "next/navigation";

import { StoreBar } from "@/components/mock-exams/store-bar";
import { isStoreEnabled } from "@/lib/mock-exams/env";
import { sectionStyle } from "@/lib/sections";

/**
 * 模試演習ストア（/mock-exams 以下）の共通の枠。
 *
 * Stripe の環境変数（STRIPE_SECRET_KEY）が未設定の間は 404 を返し、
 * 環境変数を設定した時点でストアが出現する。
 */
export default function MockExamsLayout({ children }: { children: React.ReactNode }) {
  if (!isStoreEnabled()) notFound();

  return (
    <div style={sectionStyle("moshi")}>
      <StoreBar />
      {children}
    </div>
  );
}

