import Link from "next/link";
import { Suspense } from "react";

import { CheckoutNotice } from "@/components/mock-exams/checkout-notice";
import { storeSeller, type MockExam } from "@/data/mock-exams";
import { priceLabel } from "@/lib/mock-exams/catalog";

/**
 * 購入の枠（最終確認画面を兼ねる）。
 *
 * 通信販売の申込みの最終確認として、ボタンの直前に
 * 「何を・いくらで・いつ受け取り・返品できるか」をまとめて表示し、同意を取る。
 * 決済そのものは Stripe の画面（Checkout）で行い、カード情報はこのサイトを通らない。
 *
 * ふつうのフォーム送信なので JS が無くても動く。同意のチェックは
 * 画面の required に加えて、受け口の API でも確かめている。
 */
export function BuyPanel({ exam }: { exam: MockExam }) {
  const onSale = exam.status === "on-sale";

  return (
    <div id="purchase" className="scroll-mt-20 border border-rule bg-white">
      <div className="border-b border-rule px-5 py-4 sm:px-6">
        <p className="text-[0.8rem] text-ink-3">{exam.shortTitle}（PDF 4点セット）</p>
        <p className="mt-1 text-ink">
          <span className="serif text-[1.9rem] leading-none">{exam.price.toLocaleString("ja-JP")}</span>
          <span className="ml-1 text-[0.86rem]">円（税込）</span>
        </p>
      </div>

      <div className="space-y-4 px-5 py-5 sm:px-6">
        <Suspense fallback={null}>
          <CheckoutNotice />
        </Suspense>

        <dl className="grid grid-cols-[6.5em_1fr] gap-x-3 gap-y-2 text-[0.84rem] leading-relaxed">
          <dt className="text-ink-3">お届け</dt>
          <dd className="text-ink">決済完了後すぐに、画面からダウンロード（A4・PDF）</dd>
          <dt className="text-ink-3">収録</dt>
          <dd className="text-ink">{exam.files.map((f) => f.label).join("・")}</dd>
          <dt className="text-ink-3">再ダウンロード</dt>
          <dd className="text-ink">購入から{storeSeller.accessDays}日間（購入確認メールのリンクから）</dd>
          <dt className="text-ink-3">お支払い</dt>
          <dd className="text-ink">クレジットカードほか（Stripe の決済画面で選択）</dd>
          <dt className="text-ink-3">返品</dt>
          <dd className="text-ink">デジタル商品のため、購入後の返品・キャンセルはできません</dd>
        </dl>

        {onSale ? (
          <form action="/api/mock-exams/checkout" method="post" className="space-y-4">
            <input type="hidden" name="examId" value={exam.id} />
            <label className="flex cursor-pointer items-start gap-3 border border-rule bg-paper-2 p-3 text-[0.84rem] leading-relaxed text-ink">
              <input type="checkbox" name="agreed" required className="mt-1 size-4 shrink-0 accent-[var(--sec)]" />
              <span>
                上の内容と
                <Link href="/mock-exams/legal" className="mx-0.5 text-navy underline underline-offset-4">
                  特定商取引法に基づく表記・ご利用条件
                </Link>
                を確認し、PDF を個人の学習のためだけに使い、再配布しないことに同意します。
              </span>
            </label>
            <button type="submit" className="btn btn-primary w-full text-[1rem]">
              今すぐ受験する（{priceLabel(exam)}で購入）
            </button>
            <p className="text-[0.75rem] leading-relaxed text-ink-3">
              Stripe の安全な決済画面に移動します。カード番号は当サイトに送信・保存されません。
            </p>
          </form>
        ) : (
          <div className="space-y-3">
            <button type="button" disabled className="btn w-full cursor-not-allowed opacity-60">
              販売開始前です
            </button>
            {exam.availableNote && <p className="text-[0.84rem] leading-relaxed text-ink-2">{exam.availableNote}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

