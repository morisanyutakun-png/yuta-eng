import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { ProductPanel, type Product } from "@/components/product-panel";
import { siteTotals, universities, universityCount } from "@/lib/data";
import { moshi, priceLabel, roundLabel } from "@/lib/moshi/config";
import { sampleCount } from "@/lib/samples";
import { sectionStyle } from "@/lib/sections";
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

  // 教材一覧と同じ型・同じ順で並べる。ページごとに並びが変わると読み直しになる
  const lead = kanseiPublished[0];
  const series: Product[] = [
    {
      cover: `/covers/${shelf[0].books[0].asin}.webp`,
      coverAlt: `${subject(shelf[0])}の表紙`,
      name: `合格答案をつくる（${universityCount()}大学・${totals.books}冊）`,
      audience: "志望校が決まっている生徒の演習・課題に",
      points: [
        "本番と同じ試験時間・大問構成・解答形式で書き下ろした予想問題集です。",
        "小問ごとの加点・減点を示した採点表つきで、記述答案の採点基準をそろえられます。",
        "試験1回分をそのまま演習に、大問単位で切り出して課題にできます。",
      ],
      meta: null,
      href: "/universities",
      hrefLabel: "大学別に見る",
      amazonUrl: shelf[0].books[0].amazonUrl,
    },
    ...(lead
      ? [
          {
            cover: lead.cover,
            coverAlt: `${lead.name} 分野別完成演習の表紙`,
            name: `過去問の前に 分野別完成演習（${kanseiPublished.length}冊）`,
            audience: "標準問題を終えて、過去問に入る前の段階に",
            points: [
              "志望校の頻出分野を、標準から本番の水準まで段階的に上げます。",
              "章ごとに分野がまとまっているので、分野別の補習に切り出せます。",
            ],
            meta: null,
            href: "/kansei",
            hrefLabel: "収録分野を見る",
            amazonUrl: lead.amazonUrl,
          } satisfies Product,
        ]
      : []),
    {
      cover: shindan.cover,
      coverAlt: "志望校診断模試の表紙",
      name: "旧帝大・難関国公立大理系数学 志望校診断模試",
      audience: "志望校がまだ定まっていない生徒の面談に",
      points: [
        `${shindan.rounds}回分の模試で、いまの実力に合う大学を探します。`,
        "分野別・能力別の得点が出るので、どこを詰めるかを一緒に決められます。",
      ],
      meta: null,
      href: "/shindan",
      hrefLabel: "判定の仕組みを見る",
      amazonUrl: shindan.amazonUrl,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div
        className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:max-w-[74rem] lg:px-8"
        style={sectionStyle("educators")}
      >
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">学校・塾・予備校関係者の方へ</span>
        </nav>

        <PageHeader
          section="educators"
          title="学校・塾・予備校関係者の方へ"
          covers={series.map((p) => p.cover)}
          facts={[
            { icon: "person", label: "授業・講習に" },
            { icon: "check", label: "採点表つき" },
            { icon: "book", label: `${universityCount()}大学・${totals.books + kanseiPublished.length + 1}冊` },
          ]}
          lead={
            <>
              大学入試の数学を大学別・区分別に分析し、その形式に合わせて書き下ろした予想問題集と演習書です。
              個人の学習を想定して作っていますが、授業・講習・課題演習にもご利用いただけます。
            </>
          }
        />

        {/*
          先生がこのページに来る用件は、だいたい次の3つに分かれる。
          それぞれがどこに書いてあるかを先に示して、読む場所を選べるようにする。
          売り込みではなく、見出しは用件のままの言葉にする。
        */}
        <section aria-labelledby="ask" className="mt-9">
          <h2 id="ask" className="rule-mark serif h-sect text-ink">
            ご相談いただけること
          </h2>
          <ol className="mt-5 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                h: "複数冊でのご利用",
                body: "授業・講習・課題演習でまとめてお使いになる場合のご相談を承ります。",
                to: "#multiple",
                label: "ご利用について",
              },
              {
                h: "採用検討時の内容確認",
                body: `収録範囲・難易度・解説の方針は、出題分析と抜粋（${sampleCount}冊ぶん）でご確認いただけます。`,
                to: "#check",
                label: "中身を確かめる",
              },
              {
                h: "模試の団体でのお申し込み",
                body: `${moshi.title}を、${moshi.group.min}名から${moshi.group.max}名まで、請求書・銀行振込の後払いで承ります。`,
                to: "#moshi",
                label: "団体でのお申し込み",
              },
              {
                h: "教材選定のご相談",
                body: "学年・進度・志望層に合わせて、どの段階のどの教材が合うかをお答えします。",
                to: "#contact",
                label: "お問い合わせ",
              },
            ].map((x, i) => (
              <li key={x.h} className="bg-white px-5 py-5">
                <p className="text-[0.68rem] font-bold tabular-nums tracking-[0.1em] text-[var(--sec)]">
                  0{i + 1}
                </p>
                <p className="serif mt-1.5 text-[1rem] leading-snug text-ink">{x.h}</p>
                <p className="prose-ja mt-2 text-[0.84rem] leading-[1.9] text-ink-2">{x.body}</p>
                <p className="mt-3">
                  <Link href={x.to} className="text-[0.8rem] font-semibold text-navy underline underline-offset-4">
                    {x.label}
                  </Link>
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 表紙の棚。文字より先に「どんな本か」を見せる */}
        <section aria-labelledby="shelf" className="mt-12 border-y border-rule py-6">
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
                    className="w-full rounded-[2px] border border-rule shadow-[0_1px_2px_rgba(21,24,28,0.07)] transition-shadow group-hover:shadow-[0_2px_6px_rgba(21,24,28,0.12)]"
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

        {/*
          ここから先は読みものが続く。画面が広いときだけ右に袖を出して、
          問い合わせ先を出しっぱなしにする。先生は読み終えてから戻るのではなく、
          読みながら連絡先を控えることが多い。
        */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-x-12">
          <div className="min-w-0">

        {/* 3シリーズ。表紙・説明・購入導線をひとまとめに */}
        <section aria-labelledby="series" className="mt-14">
          <h2 id="series" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            刊行している教材
          </h2>
          <ul className="mt-7 space-y-10">
            {series.map((p, i) => (
              <li key={p.name} className="border-t border-rule pt-10 first:border-0 first:pt-0">
                <ProductPanel p={p} priority={i === 0} />
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

        {/*
          模試をクラス単位で受けさせたい先生向け。
          団体受験は模試の主な入り口だが、採点は人の手でやっているので
          人数と時期によっては受けられない。できないことを先に書いて、
          そのうえで相談を受ける形にする。仕組みのない約束はしない。
        */}
        <section aria-labelledby="moshi-heading" className="mt-14 scroll-mt-20" id="moshi">
          <h2 id="moshi-heading" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            模試をまとめてお申し込みいただく場合
          </h2>
          <div className="prose-ja mt-5 space-y-3 text-[0.9rem] leading-[2] text-ink-2">
            <p>
              <Link href="/moshi" className="font-semibold text-navy underline underline-offset-4">
                {moshi.title}
              </Link>
              は、志望校1校の入試形式に合わせて作る大学別の数学模試です。
              {moshi.universities.length}大学で実施し、記述答案はすべて人の手で採点します。
              クラスや講座の単位でまとめてお申し込みいただけます。条件は下のとおりです。
            </p>
            <p>
              受験はオンラインで、期間内の都合のよい日時に行えます。教室で一斉に取り組ませることも、
              各自の家で受けさせることもできます。出題の形式と採点の基準は、
              <Link href="/moshi#sample" className="text-navy underline underline-offset-4">
                見本問題
              </Link>
              で実物をご確認いただけます。
            </p>
          </div>

          {/*
            条件は決め切って書く。「ご相談ください」とだけ書いたものは、
            先生の側で検討が進まない。人数・締切・支払い・返すものを
            数字と名前で出し、判断に要るものをこの表だけで揃える。
          */}
          <div className="mt-6 border border-rule">
            <p className="border-b border-rule bg-paper-2 px-4 py-2 text-[0.74rem] font-bold tracking-wide text-navy">
              団体でのお申し込み
            </p>
            <ul className="divide-y divide-rule">
              {[
                [
                  "人数",
                  `${moshi.group.min}名から${moshi.group.max}名まで承ります。${moshi.group.max}名を超える場合は、講座やクラスで分けてお申し込みください。`,
                ],
                [
                  "お申し込みの締切",
                  "受験期間が始まる前日まで受け付けます。受験者の名簿は、受験される日までにご提出いただければ結構です。",
                ],
                [
                  "日程",
                  `${roundLabel}。この期間内であれば、教室で一斉に実施する日を1日ご指定いただけます。各自の家で受けさせる形でも構いません。`,
                ],
                [
                  "受験料",
                  `1名あたり${priceLabel}です。人数による割引は行っていません。`,
                ],
                [
                  "お支払い",
                  `銀行振込による後払いです。お申し込みが確定した時点で学校・塾あての請求書をお送りし、お支払いの期限は発行日から${moshi.group.paymentDays}日です。先に受験していただき、そのあとのお支払いで構いません。`,
                ],
                [
                  "書類",
                  `見積書・請求書・納品書を発行します。宛名・件名・提出形式のご指定に応じますので、校内の手続きに必要な書式をお知らせください。${
                    moshi.group.invoiceRegistered
                      ? "適格請求書（インボイス）として発行できます。登録番号は請求書に記載します。"
                      : "なお当方は適格請求書発行事業者の登録をしていないため、お出しする請求書は適格請求書（インボイス）ではありません。消費税の仕入税額控除が必要な場合は、お申し込みの前にご確認ください。"
                  }`,
                ],
                [
                  "キャンセル",
                  "受験期間の開始前であれば、人数の減少も取り消しも承ります。請求は確定した人数で行います。",
                ],
              ].map(([k, v]) => (
                <li key={k} className="grid gap-x-5 px-4 py-3.5 sm:grid-cols-[8.5rem_1fr]">
                  <span className="text-[0.78rem] leading-relaxed text-ink-3">{k}</span>
                  <span className="prose-ja mt-1 text-[0.86rem] leading-[1.9] text-ink-2 sm:mt-0">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 返すものは、この模試で一番の中身。項目を立てて見せる */}
          <h3 className="mt-9 text-[1rem] font-semibold text-ink">
            受験後にお渡しするもの ──「{moshi.deliverableName}」
          </h3>
          <p className="prose-ja mt-2 max-w-[40rem] text-[0.88rem] leading-[1.9] text-ink-2">
            受験された方お一人ごとに、次の4つをまとめた冊子をお渡しします。点数だけを返して終わりにはしません。
          </p>
          <ol className="mt-4 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {moshi.deliverables.map((d, i) => (
              <li key={d.h} className="bg-white px-5 py-4">
                <p className="text-[0.68rem] font-bold tabular-nums tracking-[0.1em] text-[var(--sec)]">
                  0{i + 1}
                </p>
                <p className="mt-1 text-[0.93rem] font-semibold text-ink">{d.h}</p>
                <p className="prose-ja mt-1.5 text-[0.84rem] leading-[1.9] text-ink-2">{d.body}</p>
              </li>
            ))}
          </ol>
          <p className="prose-ja mt-4 max-w-[40rem] text-[0.88rem] leading-[1.9] text-ink-2">
            {moshi.group.reportMin}名以上でお申し込みいただいた場合は、これに加えて
            <strong className="font-semibold text-ink">受験者全体の分野別の得点状況</strong>
            をまとめたものを、先生あてにお渡しします。どの分野が落ちているかが講座の単位で分かるので、
            そのあとの授業で詰める順番を決める材料になります。
          </p>

          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[0.86rem]">
            <Link href="/moshi" className="btn">
              模試のご案内を見る
            </Link>
            <Link href="#contact" className="text-navy underline underline-offset-4">
              団体でのお申し込み・ご質問はこちらから
            </Link>
          </p>
        </section>

        <section aria-labelledby="contact" className="mt-14">
          <h2 id="contact" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            お問い合わせ
          </h2>
          <div className="prose-ja mt-5 space-y-4 text-[0.9rem] leading-[2] text-ink-2">
            <p>
              収録範囲、難易度、進度に合わせた使い方、模試の団体でのお申し込みについてお答えします。
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

          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-6 pt-2">
              <div className="border border-rule bg-white">
                <div className="sec-rule" />
                <div className="px-5 py-5">
                  <p className="eyebrow">学校・塾・予備校の方へ</p>
                  <p className="serif mt-1.5 text-[1.02rem] leading-snug text-ink">ご相談・お問い合わせ</p>
                  <p className="prose-ja mt-2.5 text-[0.82rem] leading-[1.9] text-ink-2">
                    複数冊でのご利用、模試の団体でのお申し込み、採用検討時の内容確認、教材選定について承ります。
                  </p>
                  {site.contact &&
                    (site.contact.includes("@") ? (
                      <p className="mt-3.5 break-all border-t border-rule pt-3.5 font-mono text-[0.92rem]">
                        <a href={`mailto:${site.contact}`} className="text-navy underline underline-offset-4">
                          {site.contact}
                        </a>
                      </p>
                    ) : (
                      <p className="mt-3.5 border-t border-rule pt-3.5">
                        <a href={site.contact} target="_blank" rel="noopener" className="btn w-full">
                          お問い合わせフォームへ
                        </a>
                      </p>
                    ))}
                  <p className="mt-2.5 text-[0.74rem] leading-relaxed text-ink-3">
                    ご所属とお名前を添えていただけると、こちらの回答が早くなります。
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[0.78rem] leading-relaxed text-ink-3">
                価格・在庫・配送は Amazon の商品ページの表示が優先されます。
              </p>
            </div>
          </aside>
        </div>

        <p className="prose-ja mt-14 border-t border-rule pt-6 text-[0.78rem] leading-[1.9] text-ink-3">
          本サイトおよび教材は、各大学とは関係のない、独自に制作した非公式の教材です。
          問題文の転載は行っていません。
        </p>
      </div>
    </>
  );
}
