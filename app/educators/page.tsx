import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AmazonButton } from "@/components/amazon-button";
import { siteTotals, universities, universityCount } from "@/lib/data";
import { sampleCount } from "@/lib/samples";
import { shortName, subject } from "@/lib/seo";
import { kanseiPublished, shindan } from "@/lib/series";
import { groupOrder, site } from "@/lib/site";

/**
 * 学校・塾・予備校の先生向けの案内。
 *
 * 売り込むページではなく、調べに来た先生が「指導用にも使えるか」を
 * 自分で判断できるようにするページ。だから次の3つを守る。
 *
 *   ・確かめていない実績は書かない（「採用実績多数」などは使わない）
 *   ・Amazon 側の仕組み（数量割引・法人向け特典）を断定しない
 *   ・導線は「中身を確かめる」ほうを先に、買うほうは後ろに置く
 *
 * そのうえで、文字だけのページにしない。先生が最初に知りたいのは
 * 「どんな本か」であって、それは表紙と中身を見せるのが一番早い。
 *
 * 数字はすべて実データから出す。原稿が増えれば自動で変わる。
 */

const totals = siteTotals();

const title = "学校・塾・予備校関係者の方へ";
const description =
  `大学受験指導の演習教材としてのご案内です。${universityCount()}大学・${totals.sections}区分の数学入試を分析して` +
  `大学別に書き下ろした予想問題集と、分野別の演習書を刊行しています。` +
  `授業・講習・課題演習にご利用いただけます。中身は試し読みでご確認ください。`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "大学受験 教材 学校採用",
    "塾 予備校 教材",
    "受験数学 演習教材",
    "大学別 数学 問題集 指導用",
    "講習 教材 数学",
  ],
  alternates: { canonical: "/educators" },
  openGraph: {
    title,
    description,
    url: "/educators",
    type: "article",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
};

/** 教材の特徴。実際の中身と食い違わないことだけを書く。 */
const features: { h: string; body: string }[] = [
  {
    h: "大学別・区分別に設計しています",
    body:
      `${universityCount()}大学・${totals.sections}区分（理系／文系／中期日程など）それぞれについて、` +
      `${totals.span}の出題を分析し、試験時間・大問構成・解答形式・頻出分野に合わせて問題を書き下ろしています。` +
      `志望校が決まっている生徒に、その大学の形式のまま演習させることができます。`,
  },
  {
    h: "過去問演習の前後、どちらにも置けます",
    body:
      `分野別完成演習（${kanseiPublished.length}冊）は、標準問題を終えてから過去問に入るまでを埋める演習書です。` +
      `合格答案をつくる（${totals.books}冊）は本番と同じ形式の予想問題集で、過去問演習と並べて使えます。`,
  },
  {
    h: "授業・講習・課題演習に使えます",
    body:
      "試験1回分がそのまま時間を計った演習になり、大問単位で切り出して課題にすることもできます。" +
      "分野別完成演習は章ごとに分野がまとまっているので、分野別の補習にも使えます。",
  },
  {
    h: "採点基準を収録しています",
    body:
      "解法の方針、計算過程、別解に加えて、予想問題集には小問ごとの加点・減点を示した採点表を載せています。" +
      "記述答案の採点基準を指導者間でそろえる材料になります。",
  },
];

export default function EducatorsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${site.url}/educators`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    inLanguage: "ja",
  };

  // 表紙の棚。検索されやすい大学から並べる
  const order: readonly string[] = groupOrder;
  const shelf = [...universities].sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group));

  // 代表的な3シリーズ。表紙とボタンを添えて、中身の違いが一目で分かるようにする
  const lead = kanseiPublished[0];
  const series = [
    {
      key: "kakomon",
      name: "合格答案をつくる",
      cover: `/covers/${shelf[0].books[0].asin}.webp`,
      alt: `${subject(shelf[0])}の表紙`,
      lines: [
        `大学別の予想問題集（全${totals.books}冊）。`,
        "本番と同じ試験時間・大問構成で書き下ろした問題に、解答・解説と採点表を付けています。",
        "過去問演習と並べて、答案を書く練習に使えます。",
      ],
      href: "/universities",
      hrefLabel: "大学別に見る",
      amazon: shelf[0].books[0].amazonUrl,
    },
    ...(lead
      ? [
          {
            key: "kansei",
            name: "過去問の前に 分野別完成演習",
            cover: lead.cover,
            alt: `${lead.name} 分野別完成演習の表紙`,
            lines: [
              `分野別の演習書（全${kanseiPublished.length}冊）。`,
              "標準問題は終えたが過去問はまだ早い、という段階のための1冊です。",
              "章ごとに分野がまとまっているので、分野別の補習に切り出せます。",
            ],
            href: "/kansei",
            hrefLabel: "収録分野を見る",
            amazon: lead.amazonUrl,
          },
        ]
      : []),
    {
      key: "shindan",
      name: "志望校診断模試",
      cover: shindan.cover,
      alt: "志望校診断模試の表紙",
      lines: [
        `${shindan.rounds}回分の模試で、いまの実力に合う大学を探すための1冊。`,
        "分野別・能力別の得点から、受験できる大学の見当をつけます。",
        "志望校がまだ定まっていない生徒の面談材料になります。",
      ],
      href: "/shindan",
      hrefLabel: "判定の仕組みを見る",
      amazon: shindan.amazonUrl,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:px-8">
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">学校・塾・予備校関係者の方へ</span>
        </nav>

        <header className="pb-7 pt-6">
          <h1 className="serif text-[1.6rem] leading-[1.45] text-ink sm:text-[2rem]">
            学校・塾・予備校関係者の方へ
          </h1>
          <p className="prose-ja mt-3.5 text-[0.95rem] leading-[1.95] text-ink-2">
            大学入試の数学を大学別・区分別に分析し、その形式に合わせて書き下ろした予想問題集と演習書です。
            個人の学習を想定して作っていますが、授業・講習・課題演習にもご利用いただけます。
          </p>
        </header>

        {/* 表紙の棚。文字より先に「どんな本か」を見せる */}
        <section aria-labelledby="shelf" className="border-y border-rule py-6">
          <h2 id="shelf" className="sr-only">
            刊行している大学別教材
          </h2>
          <ul className="scroll-hint -mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:scroll-pl-6 sm:px-6">
            {shelf.map((u, i) => (
              <li key={u.slug} className="w-[96px] shrink-0 snap-start sm:w-[108px]">
                <Link href={`/univ/${u.slug}`} className="group block">
                  <Image
                    src={`/covers/thumb/${u.books[0].asin}.webp`}
                    alt={`${subject(u)}の表紙`}
                    width={160}
                    height={226}
                    priority={i < 4}
                    loading={i < 4 ? undefined : "lazy"}
                    sizes="(max-width: 640px) 96px, 108px"
                    className="w-full rounded-[2px] border border-rule shadow-[0_1px_4px_rgba(26,29,33,0.16)] transition-shadow group-hover:shadow-[0_3px_10px_rgba(26,29,33,0.24)]"
                  />
                  <span className="mt-1.5 block truncate text-[0.72rem] text-ink-2 transition-colors group-hover:text-navy">
                    {shortName(u)}数学
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-1.5 text-[0.72rem] text-ink-3">
            横にスクロールできます。表紙を選ぶと、その大学の出題分析と抜粋をご覧いただけます。
          </p>
        </section>

        {/* 3シリーズ。表紙・説明・購入導線をひとまとめに */}
        <section aria-labelledby="series" className="mt-14">
          <h2 id="series" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            刊行している教材
          </h2>
          <ul className="mt-6 space-y-9">
            {series.map((s) => (
              <li key={s.key} className="flex gap-4 sm:gap-5">
                <div className="w-[88px] shrink-0 sm:w-[112px]">
                  <Image
                    src={s.cover}
                    alt={s.alt}
                    width={310}
                    height={438}
                    loading="lazy"
                    sizes="(max-width: 640px) 88px, 112px"
                    className="w-full rounded-[3px] border border-rule shadow-[0_1px_3px_rgba(26,29,33,0.14)]"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="serif text-[1.02rem] leading-snug text-ink">{s.name}</h3>
                  <p className="prose-ja mt-1.5 text-[0.88rem] leading-[1.9] text-ink-2">{s.lines.join("")}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Link
                      href={s.href}
                      className="text-[0.85rem] font-semibold text-navy underline underline-offset-4"
                    >
                      {s.hrefLabel}
                    </Link>
                    {s.amazon && <AmazonButton href={s.amazon} label="Amazonで見る" />}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.78rem] leading-relaxed text-ink-3">
            価格・在庫・配送は Amazon の商品ページの表示が優先されます。
          </p>
        </section>

        <section aria-labelledby="features" className="mt-14">
          <h2 id="features" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            教材の特徴
          </h2>
          <dl className="mt-6 space-y-7">
            {features.map((f) => (
              <div key={f.h}>
                <dt className="text-[0.95rem] font-semibold leading-snug text-ink">{f.h}</dt>
                <dd className="prose-ja mt-1.5 text-[0.9rem] leading-[2] text-ink-2">{f.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="check" className="mt-14">
          <h2 id="check" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            購入前に中身を確かめる
          </h2>
          <ul className="mt-5 divide-y divide-rule border-y border-rule">
            {[
              {
                href: "/universities",
                h: "大学別の出題分析と試し読み",
                body: `大学を選ぶと、出題分析と教材の抜粋（${sampleCount}冊ぶん）をご覧いただけます。`,
              },
              {
                href: "/kaisetsu",
                h: "過去問の解答・解説",
                body: "当サイトが独自に作成した解答例です。解説の書き方の方針をご確認いただけます。",
              },
              {
                href: "/books",
                h: "教材一覧",
                body: `全${totals.books + kanseiPublished.length + 1}冊を、学習の段階ごとに並べています。`,
              },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group flex items-center justify-between gap-5 py-4">
                  <span className="min-w-0">
                    <span className="block text-[0.93rem] font-semibold text-ink transition-colors group-hover:text-navy">
                      {l.h}
                    </span>
                    <span className="mt-1 block text-[0.82rem] leading-relaxed text-ink-3">{l.body}</span>
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="size-3.5 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="multiple" className="mt-14">
          <h2 id="multiple" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            複数冊でのご利用について
          </h2>
          <div className="prose-ja mt-5 space-y-3 text-[0.9rem] leading-[2] text-ink-2">
            <p>複数名でのご利用も、通常の商品ページから購入いただけます。</p>
            <p className="text-[0.84rem] text-ink-3">
              まとめてのご購入にあたっての条件（在庫・配送・支払い方法など）は、Amazon の案内をご確認ください。
              当サイトではそれらの可否を判断しかねます。
            </p>
          </div>
        </section>

        <section aria-labelledby="contact" className="mt-14">
          <h2 id="contact" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            お問い合わせ
          </h2>
          <div className="prose-ja mt-5 space-y-4 text-[0.9rem] leading-[2] text-ink-2">
            <p>
              収録範囲、難易度、進度に合わせた使い方などについてお答えします。
            </p>
            {site.contact &&
              (site.contact.includes("@") ? (
                // 学校によっては mailto が開かないので、住所そのものも文字で出す。
                // 先生がコピーして、ふだん使っているメールソフトから送れるようにする。
                <div className="border border-rule bg-paper-2/50 px-5 py-4">
                  <p className="text-[0.74rem] text-ink-3">メールでお送りください</p>
                  <p className="mt-1 break-all font-mono text-[0.98rem] text-ink">
                    <a href={`mailto:${site.contact}`} className="text-navy underline underline-offset-4">
                      {site.contact}
                    </a>
                  </p>
                  <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-3">
                    ご所属とお名前を添えていただけると、こちらの回答が早くなります。
                  </p>
                </div>
              ) : (
                <p>
                  <a
                    href={site.contact}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-11 items-center border border-rule bg-paper-2/60 px-5 text-[0.9rem] font-semibold text-navy transition-colors hover:border-navy/40"
                  >
                    お問い合わせフォームへ
                  </a>
                </p>
              ))}
          </div>
        </section>

        <p className="prose-ja mt-14 border-t border-rule pt-6 text-[0.78rem] leading-[1.9] text-ink-3">
          本サイトおよび教材は、各大学とは関係のない、独自に制作した非公式の教材です。
          問題文の転載は行っていません。
        </p>
      </div>
    </>
  );
}
