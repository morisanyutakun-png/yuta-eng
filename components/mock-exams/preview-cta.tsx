import Link from "next/link";

import { moshi, moshiUniversity, priceLabel, roundLabel } from "@/lib/moshi/config";

/**
 * 添削付きの本番「入試プレビュー」への案内。
 *
 * 自己採点で「どこで減点されるか」が見えた人ほど、次は人の目で答案を見てほしくなる。
 * 解説・採点基準を読み終えたところ（ページの最下部）に必ず置く。
 *
 * 開催回・期間・受験料は入試プレビューの共通データ（data/moshi.json）から読む。
 * こちらに日付や価格を書き写すと、本番側を直したときに古いまま残るため。
 */
export function PreviewCta({ moshiId, className = "" }: { moshiId?: string; className?: string }) {
  const uni = moshiId ? moshiUniversity(moshiId) : undefined;
  const href = uni ? `/moshi/${uni.id}` : "/moshi";

  return (
    <aside
      aria-labelledby="preview-cta-heading"
      className={`border-2 border-[var(--sec)] bg-white ${className}`}
    >
      <div className="bg-[var(--sec)] px-5 py-2.5 text-[0.8rem] font-semibold tracking-wide text-white sm:px-7">
        自己採点で減点ポイントが浮き彫りになった方へ
      </div>
      <div className="grid gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="min-w-0">
          <p className="eyebrow">現役生・浪人生向け／{moshi.season}</p>
          <h2 id="preview-cta-heading" className="serif h-sect mt-1.5 text-ink">
            本番 添削付き「{moshi.title}」次回開催のご案内
          </h2>
          <p className="prose-ja mt-3 text-[0.93rem] leading-[1.9] text-ink-2">
            採点基準で自分の答案を見直すと、「方針は合っているのに点が伸びない理由」が具体的になります。
            本番の{moshi.title}では、提出された答案を人の目で採点し、小問ごとの点数と添削・講評、
            数学の合格参考判定を{moshi.deliverableName ?? "返却資料"}としてお返しします。
            {uni ? `${uni.university}の${uni.exam}も開催します。` : ""}
          </p>
          <dl className="mt-4 grid gap-x-6 gap-y-1 text-[0.86rem] sm:grid-cols-[auto_1fr]">
            <dt className="text-ink-3">次回</dt>
            <dd className="font-semibold text-ink">{roundLabel}</dd>
            <dt className="text-ink-3">受験料</dt>
            <dd className="font-semibold text-ink">{priceLabel}</dd>
          </dl>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          <Link href={href} className="btn btn-primary">
            {uni ? `${uni.short}の入試プレビューを見る` : "入試プレビューの詳細を見る"}
          </Link>
          <Link href="/moshi#apply" className="btn">
            参加申込へ進む
          </Link>
        </div>
      </div>
    </aside>
  );
}

