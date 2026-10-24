import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { storeSeller } from "@/data/mock-exams";
import { isStoreEnabled } from "@/lib/mock-exams/env";
import { site } from "@/lib/site";

const title = "特定商取引法に基づく表記｜数学記述模試『入試プレビュー』模試PDFストア";
const description = "大学別数学研究室 模試PDFストアにおける特定商取引法に基づく表記およびデジタル教材（PDF）のご利用条件。";

export function generateMetadata(): Metadata {
  if (!isStoreEnabled()) return { robots: { index: false, follow: false } };
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/mock-exams/legal` },
    openGraph: {
      title,
      description,
      url: `${site.url}/mock-exams/legal`,
      siteName: "大学別数学研究室 模試PDFストア",
    },
  };
}

const legalRows = [
  { k: "販売事業者名", v: storeSeller.storeName },
  { k: "運営統括責任者", v: storeSeller.responsible },
  { k: "所在地", v: storeSeller.address },
  { k: "電話番号", v: storeSeller.phone },
  { k: "メールアドレス", v: storeSeller.email },
  {
    k: "販売価格",
    v: "各模試の詳細ページに税込価格（日本円）を表示しています。",
  },
  {
    k: "商品代金以外の必要料金",
    v: "なし（インターネット接続料金・通信料および印刷にかかる費用はご購入者様のご負担となります）。",
  },
  {
    k: "お支払い方法",
    v: "クレジットカード決済ほか（Stripe Checkout が提供する決済手段）。クレジットカード情報は当サイトを通過・保持せず、Stripe 社にて安全に処理されます。",
  },
  {
    k: "お支払い時期",
    v: "ご購入手続き完了時に即時決済されます。",
  },
  {
    k: "商品の引渡時期",
    v: "決済完了後ただちに、購入完了ページおよび購入確認メール記載の専用リンクから印刷用 A4 PDF（問題冊子・所定解答用紙・解答解説・採点基準）をダウンロードいただけます。購入者ご本人の利用に限り、本サービスの提供期間中はいつでも再ダウンロードが可能です。",
  },
  {
    k: "領収書の発行",
    v: "決済完了時に送信されるメールおよび購入完了画面より、PDF形式の領収書を即時自動発行いただけます（※当方は適格請求書発行事業者の登録を行っていないため、インボイス制度に基づく適格請求書ではなく、通常の領収書PDFとなります）。",
  },
  {
    k: "返品・交換・キャンセル",
    v: "デジタルコンテンツ（PDF）の性質上、決済完了後の返品・返金・キャンセルはお受けできません。ファイル破損やダウンロード不能などの不備がある場合は、上記メールアドレスまでご連絡ください。",
  },
  {
    k: "動作環境",
    v: "PDF を閲覧・印刷できる端末およびソフトウェア（Adobe Acrobat Reader、各種ブラウザ標準の PDF ビューア等）。A4 サイズでの印刷を推奨します。",
  },
];

export default function MockExamsLegalPage() {
  if (!isStoreEnabled()) notFound();
  return (
    <div className="page mobile-compact">
      <nav aria-label="パンくず" className="breadcrumb pt-3 text-[0.75rem] text-ink-3">
        <Link href="/" className="hover:text-navy">
          トップ
        </Link>
        <span className="mx-1.5 text-rule">／</span>
        <Link href="/mock-exams" className="hover:text-navy">
          模試PDFストア
        </Link>
        <span className="mx-1.5 text-rule">／</span>
        <span className="text-ink-2">特定商取引法に基づく表記</span>
      </nav>

      <div className="sec-rule mt-3" />

      <header className="border-b border-rule pb-6 pt-6">
        <p className="eyebrow">模試PDFストア</p>
        <h1 className="serif h-page mt-1.5 text-ink">特定商取引法に基づく表記・ご利用条件</h1>
      </header>

      <section aria-labelledby="tokusho-heading" className="mt-8">
        <h2 id="tokusho-heading" className="rule-mark serif h-sect text-ink">
          特定商取引法に基づく表記
        </h2>
        <dl className="mt-4 divide-y divide-rule border-y border-rule text-[0.88rem] leading-relaxed">
          {legalRows.map((row) => (
            <div key={row.k} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
              <dt className="font-semibold text-ink">{row.k}</dt>
              <dd className="text-ink-2">{row.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="terms-heading" className="mt-12">
        <h2 id="terms-heading" className="rule-mark serif h-sect text-ink">
          PDF 教材のご利用条件（流出防止・著作権）
        </h2>
        <ul className="prose-ja mt-4 list-disc space-y-2 pl-5 text-[0.9rem] leading-[1.9] text-ink-2">
          <li>
            本ストアで販売するすべての PDF（問題冊子・所定解答用紙・解答解説・採点基準）の著作権は、制作者（{storeSeller.seller}）に帰属します。
          </li>
          <li>
            ご購入いただいた PDF は、ご購入者ご本人の学習目的でのみ閲覧・印刷してご利用いただけます。
          </li>
          <li>
            第三者へのデータ共有、ダウンロード URL の転送、SNS・Web サイトへの転載、複製しての配布・販売は固く禁じます。購入確認メール記載の専用リンクはご購入者ご本人専用となります。学校・塾・予備校等で複数名に配布して使用される場合は、別途団体利用についてお問い合わせください。
          </li>
          <li>
            掲載している模試は当サイトが独自に制作した非公式の演習教材であり、各大学および予備校（河合塾「全統記述模試」等）とは一切関係ありません。「全統記述レベル」は難易度の目安を示す表記です。
          </li>
        </ul>
      </section>

      <p className="mt-10">
        <Link href="/mock-exams" className="btn">
          ← 模試PDFストア一覧へ戻る
        </Link>
      </p>
    </div>
  );
}

