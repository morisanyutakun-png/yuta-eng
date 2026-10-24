"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { BoothFooter } from "@/components/mock-exams/booth-footer";
import { BoothHeader } from "@/components/mock-exams/booth-header";
import { CartDrawer } from "@/components/mock-exams/cart-drawer";

interface Props {
  children: React.ReactNode;
}

/**
 * 模試PDFストア（/mock-exams 以下）の共通レイアウト切り替えコンポーネント。
 *
 * 管理画面（/mock-exams/shelf）を開いている時は、
 * 一般顧客用のヘッダー（カートなど）やストア用フッター（特商法表記など）を
 * 完全に非表示にし、Admin専用の集中できるUIを提供する。
 */
export function MockExamsStoreChrome({ children }: Props) {
  const pathname = usePathname();
  const isShelf = pathname?.startsWith("/mock-exams/shelf");

  if (isShelf) {
    return <main className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900 font-sans antialiased">
      <BoothHeader />
      <CartDrawer />
      <div className="min-h-[calc(100vh-280px)]">{children}</div>
      <BoothFooter />
    </div>
  );
}

