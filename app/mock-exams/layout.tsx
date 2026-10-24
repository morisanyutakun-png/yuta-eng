import { notFound } from "next/navigation";

import { CartProvider } from "@/components/mock-exams/cart-context";
import { MockExamsStoreChrome } from "@/components/mock-exams/store-chrome";
import { isStoreEnabled } from "@/lib/mock-exams/env";

/**
 * 模試演習ストア（/mock-exams 以下）専用のレイアウト。
 * 一般ストア画面では BOOTH スタイルのヘッダー・フッター・カートを提供し、
 * 管理画面（/mock-exams/shelf）では顧客用パーツを自動排除してAdmin専用UIを提供する。
 */
export default function MockExamsLayout({ children }: { children: React.ReactNode }) {
  if (!isStoreEnabled()) notFound();

  return (
    <CartProvider>
      <MockExamsStoreChrome>{children}</MockExamsStoreChrome>
    </CartProvider>
  );
}

