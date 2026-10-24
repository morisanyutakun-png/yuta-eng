import Link from "next/link";
import { Suspense } from "react";

import { CheckoutNotice } from "@/components/mock-exams/checkout-notice";
import { LockIcon, ShieldCheckIcon } from "@/components/mock-exams/icons";
import { storeSeller, type MockExam } from "@/data/mock-exams";
import { priceLabel } from "@/lib/mock-exams/catalog";

/**
 * 日本国内向け（Zenn / 技術書典 / SEshop型）フリクションレス購入パネル。
 *
 * カート不要の直接決済、税込表示の徹底、JCB対応を含む主要ブランド表記、
 * 領収書PDF・即時納品を明快に提示。
 */
export function BuyPanel({ exam }: { exam: MockExam }) {
  const onSale = exam.status === "on-sale";

  return (
    <div className="rounded-lg border border-slate-300 bg-white shadow-xs overflow-hidden">
      {/* 上部: 税込価格表示 */}
      <div className="border-b border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-medium text-slate-500">
          {exam.shortTitle}（印刷用A4 PDF 4点セット）
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            ¥{exam.price.toLocaleString("ja-JP")}
          </span>
          <span className="text-xs font-bold text-slate-700">（税込） / 買い切り</span>
        </div>
      </div>

      <div className="p-5 space-y-4 text-xs leading-relaxed">
        <Suspense fallback={null}>
          <CheckoutNotice />
        </Suspense>

        {/* 取引条件・安心スペック */}
        <dl className="grid grid-cols-[5.5em_1fr] gap-x-3 gap-y-2.5 border-b border-slate-100 pb-4 text-slate-600">
          <dt className="text-slate-500 font-medium">お渡し方法</dt>
          <dd className="text-slate-900 font-semibold">
            決済完了後、画面および確認メールにてPDF即時ダウンロード
          </dd>
          <dt className="text-slate-500 font-medium">同梱内容</dt>
          <dd className="text-slate-800">{exam.files.map((f) => f.label).join("・")}</dd>
          <dt className="text-slate-500 font-medium">再取得期間</dt>
          <dd className="text-slate-800">
            いつでも再ダウンロード可能（メール記載URLより何度でも再取得可能 ※購入者ご本人の利用限定）
          </dd>
          <dt className="text-slate-500 font-medium">決済方法</dt>
          <dd className="text-slate-800 font-medium">
            クレジットカード（JCB / Visa / Mastercard / Amex） / Apple Pay / Google Pay
          </dd>
          <dt className="text-slate-500 font-medium">領収書</dt>
          <dd className="text-slate-800">
            領収書PDFを即時自動発行（経費精算対応）
          </dd>
        </dl>

        {onSale ? (
          <form action="/api/mock-exams/checkout" method="post" className="space-y-4">
            <input type="hidden" name="examId" value={exam.id} />

            <label className="flex cursor-pointer items-start gap-2.5 rounded border border-slate-200 bg-slate-50/80 p-3 text-slate-700 hover:bg-slate-50">
              <input
                type="checkbox"
                name="agreed"
                required
                className="mt-0.5 size-4 shrink-0 rounded accent-slate-900"
              />
              <span className="text-[11px] leading-relaxed">
                <Link
                  href="/mock-exams/legal"
                  target="_blank"
                  className="font-semibold text-slate-800 underline underline-offset-2 hover:text-slate-600"
                >
                  特定商取引法に基づく表記・利用規約
                </Link>
                を確認し、PDFを個人の学習目的のみで利用し再配布しないことに同意します。
              </span>
            </label>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3.5 px-4 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 hover:shadow-md transition active:scale-98"
            >
              <LockIcon size={16} />
              <span>この模試を購入する（{priceLabel(exam)}）</span>
            </button>

            {/* 対応決済ブランド表記（国内向けJCB含む） */}
            <div className="pt-2 text-center">
              <p className="text-[10px] text-slate-400 font-medium mb-1.5">
                対応決済ブランド（Stripe安全決済・カード情報は暗号化保護）
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] text-slate-600 font-bold">
                <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5">VISA</span>
                <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5">Mastercard</span>
                <span className="rounded border border-slate-300 bg-slate-100 text-slate-800 px-2 py-0.5">JCB対応</span>
                <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5">AMEX</span>
                <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5">Apple Pay</span>
                <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5">Google Pay</span>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <button
              type="button"
              disabled
              className="w-full rounded-lg bg-slate-100 py-3 text-xs font-bold text-slate-400 cursor-not-allowed"
            >
              順次公開予定（販売準備中）
            </button>
            {exam.availableNote && (
              <p className="text-xs leading-relaxed text-slate-500">
                {exam.availableNote}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
