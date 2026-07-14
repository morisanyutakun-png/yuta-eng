// GA4 ecommerce の item 生成（サーバー/クライアント両方から使える純粋関数）。
// "use client" を付けないことで、サーバーコンポーネントからも呼び出せる。

import type { Subject } from "@/lib/pricing";

export type Ga4Item = {
  item_id: string;
  item_name: string;
  item_brand: string;
  item_category: string;
  price: number;
  quantity: number;
};

/** 教材（Subject）→ GA4 item。price は税込の1教材価格。 */
export function subjectToItem(subject: Subject, price: number): Ga4Item {
  return {
    item_id: subject.id,
    item_name: subject.registrationLabel ?? subject.label,
    item_brand: "ノビットスタディ",
    item_category: subject.area,
    price,
    quantity: 1,
  };
}
