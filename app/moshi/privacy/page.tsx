import type { Metadata } from "next";
import Link from "next/link";

import { moshi } from "@/lib/moshi/config";
import { site } from "@/lib/site";

/**
 * 模試の参加申込で預かる情報の扱い。
 *
 * 書くのは「何を・何のために預かり・いつまで持ち・どうすれば消せるか」の4つだけ。
 * 実際にやっていること以上のことは書かない。
 */
const title = "個人情報の取り扱い（大学別オンライン数学模試）";
const description =
  `${moshi.title}の参加申込でお預かりする情報の範囲と、その利用目的・保管の方法・保管する期間・削除のご依頼方法についてのご案内です。` +
  `お名前・メールアドレス・学年・志望学部・参加を希望された大学のほかはお預かりしません。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/moshi/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: "/moshi/privacy",
    type: "article",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
};

export default function MoshiPrivacy() {
  const items: { h: string; body: React.ReactNode }[] = [
    {
      h: "お預かりする情報",
      body: "お名前、メールアドレス、学年、志望学部（任意）、参加を希望された大学です。これ以外の情報はお預かりしません。",
    },
    {
      h: "利用する目的",
      body: "模試の受験日程・受験料のお支払い方法のご案内と、模試の実施に関する連絡に使います。 この目的以外には使いません。第三者への提供・販売は行いません。",
    },
    {
      h: "保管の方法",
      body: "お預かりした情報は、外部のデータベースサービス上に保存します。 当サイトの運営者以外は閲覧できないようにしています。",
    },
    {
      h: "保管する期間",
      body: "第1回の模試に関する連絡が終わるまで保管します。以後の回のご案内を希望されない場合は、下記までご連絡ください。",
    },
    {
      h: "削除のご依頼",
      body: site.contact ? (
        <>
          お申し込みの取り消しや情報の削除をご希望の場合は、お申し込み時のメールアドレスから
          <a href={`mailto:${site.contact}`} className="mx-1 text-navy underline underline-offset-4">
            {site.contact}
          </a>
          までご連絡ください。確認のうえ削除します。
        </>
      ) : (
        "お申し込みの取り消しや情報の削除をご希望の場合は、お申し込み時のメールアドレスからご連絡ください。"
      ),
    },
    {
      h: "お支払いについて",
      body: "参加申込の時点では料金は発生しません。クレジットカード番号などの決済情報は、当サイトでは一切お預かりしません。",
    },
  ];

  return (
    <div className="page">
      <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
        <Link href="/" className="hover:text-navy">
          トップ
        </Link>
        <span className="mx-1.5 text-rule">／</span>
        <Link href="/moshi" className="hover:text-navy">
          {moshi.title}
        </Link>
        <span className="mx-1.5 text-rule">／</span>
        <span className="text-ink-2">個人情報の取り扱い</span>
      </nav>

      <header className="border-b border-rule pb-7 pt-6">
        <h1 className="serif h-page text-ink">個人情報の取り扱い</h1>
        <p className="prose-ja mt-3 text-[0.93rem] leading-[1.95] text-ink-2">
          {moshi.title}の参加申込でお預かりする情報について、扱いをまとめています。
        </p>
      </header>

      <dl className="mt-10 space-y-8">
        {items.map((i) => (
          <div key={i.h}>
            <dt className="serif text-[1.05rem] text-ink">{i.h}</dt>
            <dd className="prose-ja mt-2 text-[0.9rem] leading-[1.95] text-ink-2">{i.body}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-12 border-t border-rule pt-6 text-[0.85rem]">
        <Link href="/moshi" className="text-navy underline underline-offset-4">
          {moshi.title}のご案内に戻る
        </Link>
      </p>
    </div>
  );
}
