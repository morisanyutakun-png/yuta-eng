import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { NextStep } from "@/components/next-step";
import { PageHeader } from "@/components/page-header";
import { ProductPanel, type Product } from "@/components/product-panel";
import { InfoDetails } from "@/components/info-details";
import { MobileActions } from "@/components/mobile-actions";
import { MoshiDeliverables } from "@/components/moshi-deliverables";
import { siteTotals, universities, universityCount } from "@/lib/data";
import { moshi, priceLabel, groupPaymentLine, roundLabel } from "@/lib/moshi/config";
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

const title = "学校・塾・法人の方へ";
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

  /**
   * 団体でのお申し込み用の、項目を埋めたメール。
   *
   * 「メールをください」とだけ書くと、何を書けばよいか分からず止まる。
   * 件名と、埋める項目をあらかじめ入れておけば、あとは埋めて送るだけになる。
   * 問い合わせ先がフォームの場合は作らない（その場合はボタンを節へのリンクにする）。
   */
  const mailTemplate =
    site.contact && site.contact.includes("@")
      ? `mailto:${site.contact}?subject=${encodeURIComponent(
          `${moshi.title}　団体でのお申し込みについて`,
        )}&body=${encodeURIComponent(
          [
            "（この下の項目を埋めてお送りください。この時点ではまだ確定しません）",
            "",
            "ご所属（学校名・塾名・法人名）：",
            "お名前：",
            "ご希望の大学：",
            "おおよその人数：",
            "ご希望の時期：",
            "ご希望の支払方法（カード・銀行振込・請求書払い）：",
            "ご希望の支払期限：",
            "ご質問・ご要望：",
            "",
          ].join("\n"),
        )}`
      : null;

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
        className="mobile-compact mx-auto max-w-[46rem] px-5 sm:px-6 lg:max-w-[74rem] lg:px-8"
        style={sectionStyle("educators")}
      >
        <MobileActions primary={{href: mailTemplate ?? "#contact", label: "団体申込・相談"}} secondary={{href: "#moshi", label: "団体受験の条件"}} />
        <nav aria-label="パンくず" className="breadcrumb pt-3 text-[0.75rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">学校・塾・法人の方へ</span>
        </nav>

        <PageHeader
          section="educators"
          title={<>学校・塾・法人<br className="sm:hidden" />の方へ</>}
          covers={series.map((p) => p.cover)}
          facts={[
            { icon: "person", label: "授業・講習に" },
            { icon: "check", label: "採点表つき" },
            { icon: "book", label: `${universityCount()}大学・${totals.books + kanseiPublished.length + 1}冊` },
          ]}
          lead={
            <>
              授業・講習用の大学別数学教材と、クラス単位で受けられる模試をご案内します。
            </>
          }
        />

        {/*
          先生がこのページでやることは、突き詰めると2つしかない。
          教材を授業で使うか、模試をクラスで受けさせるか。
          まずその2つを大きく分け、どちらを読めばよいかを先に決めてもらう。
          相談だけしたい人のために、3つめの小さな入口も置く。
        */}
        <section aria-labelledby="ask" className="mt-10">
          <h2 id="ask" className="rule-mark serif h-sect text-ink">
            ご用件からお選びください
          </h2>

          <ul className="mt-5 grid gap-4 lg:grid-cols-2">
            {[
              {
                n: "1",
                want: "教材を授業・講習で使いたい",
                to: "#books-for-class",
                body: `${universityCount()}大学の予想問題集と、分野別の演習書です。試し読みと出題分析で中身を確かめてから、Amazon でご購入いただけます。`,
                points: ["本番と同じ形式の予想問題集", "小問ごとの加点・減点つきの採点表", `抜粋で中身を確認（${sampleCount}冊ぶん）`],
                label: "教材のご案内を見る",
              },
              {
                n: "2",
                want: "模試をクラスで受けさせたい",
                to: "#moshi",
                body: `${moshi.title}を、${moshi.group.min}名から団体で承ります。人数の確定は受験の前日まで、ご請求は受験後です。`,
                points: ["志望校の形式で記述答案を書かせる", "人の手で採点し講評まで返す", "請求書払い・Stripe決済のご相談"],
                label: "模試のご案内を見る",
              },
            ].map((x) => (
              <li key={x.n}>
                <Link
                  href={x.to}
                  className="group flex h-full flex-col border border-rule bg-white transition-colors hover:border-[var(--sec)]"
                >
                  <span className="sec-rule" />
                  <span className="flex flex-1 flex-col px-5 py-5 sm:px-6">
                    <span className="text-[0.75rem] font-bold tabular-nums tracking-[0.1em] text-[var(--sec)]">
                      0{x.n}
                    </span>
                    <span className="serif mt-2 text-[1.15rem] leading-snug text-ink">{x.want}</span>
                    <span className="prose-ja mt-2.5 hidden text-[0.86rem] leading-[1.9] text-ink-2 sm:block">{x.body}</span>
                    <span className="mt-4 hidden space-y-1.5 border-t border-rule pt-3.5 sm:block">
                      {x.points.map((pt) => (
                        <span key={pt} className="flex gap-2 text-[0.86rem] leading-relaxed text-ink-2">
                          <span aria-hidden="true" className="shrink-0 text-[var(--sec)]">
                            ・
                          </span>
                          <span className="min-w-0">{pt}</span>
                        </span>
                      ))}
                    </span>
                    <span className="mt-4 flex items-center gap-1.5 pt-1 text-[0.86rem] font-semibold text-[var(--sec)]">
                      {x.label}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="size-3 transition-transform group-hover:translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                      >
                        <path d="m4 7 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="prose-ja mt-4 text-[0.86rem] leading-[1.9] text-ink-2">
            どちらとも決めかねる場合や、学年・進度に合うものを一緒に選んでほしい場合は、
            <Link href="#contact" className="font-semibold text-navy underline underline-offset-4">
              そのままご相談ください
            </Link>
            。ご所属とお名前を添えてメールをいただければ、こちらからお返事します。
          </p>
        </section>

        {/* ここから1つめ。教材の話だけをまとめる */}
        <section aria-labelledby="books-heading" className="mt-16 scroll-mt-20" id="books-for-class">
          <p className="eyebrow">ご用件 01</p>
          <h2 id="books-heading" className="serif h-sect mt-1.5 border-b-2 border-ink/80 pb-3 text-ink">
            教材を授業・講習で使う
          </h2>
        </section>

        {/* 表紙の棚。文字より先に「どんな本か」を見せる */}
        <section aria-labelledby="shelf" className="mt-12 border-y border-rule py-6">
          <h3 id="shelf" className="sr-only">
            刊行している大学別教材
          </h3>
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
                  <span className="mt-1.5 block truncate text-[0.75rem] text-ink-2 transition-colors group-hover:text-navy">
                    {shortName(u)}数学
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-1.5 text-[0.75rem] text-ink-3">
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
          <h3 id="series" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            刊行している教材
          </h3>
          <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-2">大学別予想問題集・分野別完成演習・志望校診断模試の3シリーズです。</p>
          <InfoDetails title="教材の内容・試し読みを見る">
          <ul className="mt-4 space-y-10">
            {series.map((p, i) => (
              <li key={p.name} className="border-t border-rule pt-10 first:border-0 first:pt-0">
                <ProductPanel p={p} priority={i === 0} />
              </li>
            ))}
          </ul>
          </InfoDetails>
          <p className="mt-5 text-[0.8rem] leading-relaxed text-ink-3">
            価格・在庫・配送は Amazon の商品ページの表示が優先されます。
          </p>
        </section>

        <section aria-labelledby="features" className="mt-14">
          <h3 id="features" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            教材の特徴
          </h3>
          <InfoDetails title="教材の特徴・授業での使い方を読む">
          <dl className="mt-4 space-y-7">
            {features.map((f) => (
              <div key={f.h}>
                <dt className="text-[0.97rem] font-semibold leading-snug text-ink">{f.h}</dt>
                <dd className="prose-ja mt-1.5 text-[0.93rem] leading-[2] text-ink-2">{f.body}</dd>
              </div>
            ))}
          </dl>
          </InfoDetails>
        </section>

        <section aria-labelledby="check" className="mt-14">
          <h3 id="check" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            購入前に中身を確かめる
          </h3>
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
                    <span className="mt-1 block text-[0.86rem] leading-relaxed text-ink-3">{l.body}</span>
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
          <h3 id="multiple" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            複数冊でのご利用について
          </h3>
          <div className="prose-ja mt-5 space-y-3 text-[0.93rem] leading-[2] text-ink-2">
            <p>複数名でのご利用も、通常の商品ページから購入いただけます。</p>
            <p className="text-[0.86rem] text-ink-3">
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
        <NextStep
          heading="教材について、次にすること"
          note="中身をご確認いただいてから、通常の商品ページでご購入いただけます。ご不明な点は先にお尋ねください。"
          primary={{ href: "/universities", label: "大学を選んで分析と試し読みを見る" }}
          secondary={[
            { href: "/books", label: "全冊を学習の段階順に見る" },
            { href: "#contact", label: "教材選定について相談する" },
          ]}
        />

        <section aria-labelledby="moshi-heading" className="mt-16 scroll-mt-20" id="moshi">
          <p className="eyebrow">ご用件 02</p>
          <h2 id="moshi-heading" className="serif h-sect mt-1.5 border-b-2 border-ink/80 pb-3 text-ink">
            模試をクラスで受けさせる
          </h2>
          <div className="prose-ja mt-5 space-y-3 text-[0.93rem] leading-[2] text-ink-2">
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

          <dl className="mt-4 grid grid-cols-2 gap-px border border-rule bg-rule">
            {[
              ["人数", `${moshi.group.min}〜${moshi.group.max}名`],
              ["受験料", `1名 ${priceLabel}`],
              ["ご請求", "受験後・実受験人数分"],
              ["支払期限", `請求書発行から${moshi.group.paymentDays}日`],
            ].map(([label, value]) => <div key={label} className="bg-white px-3 py-3"><dt className="text-[0.75rem] text-ink-3">{label}</dt><dd className="mt-1 text-[0.86rem] font-semibold leading-relaxed text-ink">{value}</dd></div>)}
          </dl>
          <p className="prose-ja mt-3 text-[0.86rem] leading-relaxed text-ink-2">{groupPaymentLine}</p>
          <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-2">人数変更・取り消しは受験の前日まで無料です。人数による割引はありません。</p>
          {!moshi.group.invoiceRegistered && <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-3">適格請求書（インボイス）は発行できません。必要な場合は、お申し込み前にご確認ください。</p>}
          <InfoDetails title="実施の流れ・書類・人数変更の条件を見る">
          {/*
            いちばん大事なのは「いつ何が決まるか」。
            「お申し込みが確定した時点で請求」のような書き方だと、
            何をもって確定とするのかが読み手に分からず、金額の根拠も立たない。
            出来事の順に並べて、人数が決まる日と請求が出る日を名指しする。
          */}
          <h3 className="mt-8 text-[1rem] font-semibold text-ink">決まる順番</h3>
          <ol className="mt-4 border border-rule">
            {[
              {
                h: "お申し込み",
                when: "いつでも",
                body: "受験期間が始まる前であれば、いつでも承ります。この時点では、おおよその人数と希望の時期だけで結構です。",
              },
              {
                h: "実施日の決定",
                when: "申し込みのあと",
                body: `${roundLabel}。この期間のうち、教室で一斉に実施する日を1日お決めください。各自の家で、それぞれの都合のよい日に受けさせる形でも構いません。`,
              },
              {
                h: "人数の確定",
                when: "受験の前日まで",
                body: "受験される日の前日までは、人数の増減を承ります。名簿のご提出もこのときまでで結構です。前日までに決まっていれば間に合います。",
              },
              {
                h: "受験と返却",
                when: "実施日",
                body: "答案をご提出いただいたあと、採点して返却します。",
              },
              {
                h: "ご請求",
                when: "受験期間の終了後",
                body: `実際に受験された人数で請求書を発行します。受験しなかった方の分は請求しません。お支払いの期限は、請求書の発行日から${moshi.group.paymentDays}日です。`,
              },
            ].map((x, i) => (
              <li
                key={x.h}
                className="grid gap-x-5 border-b border-rule px-4 py-4 last:border-b-0 sm:grid-cols-[11rem_1fr]"
              >
                <p className="flex items-baseline gap-2.5">
                  <span className="serif shrink-0 tabular-nums text-[0.86rem] text-[var(--sec)]">
                    0{i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.93rem] font-semibold leading-snug text-ink">{x.h}</span>
                    <span className="mt-0.5 block text-[0.8rem] text-ink-3">{x.when}</span>
                  </span>
                </p>
                <p className="prose-ja mt-1.5 text-[0.86rem] leading-[1.9] text-ink-2 sm:mt-0">{x.body}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-8 text-[1rem] font-semibold text-ink">そのほかの条件</h3>
          <div className="mt-4 border border-rule">
            <ul className="divide-y divide-rule">
              {[
                [
                  "人数",
                  `${moshi.group.min}名から${moshi.group.max}名まで承ります。${moshi.group.max}名を超える場合は、講座やクラスで分けてお申し込みください。`,
                ],
                [
                  "受験料",
                  `1名あたり${priceLabel}です。人数による割引は行っていません。`,
                ],
                [
                  "お支払い",
                  groupPaymentLine,
                ],
                [
                  "書類",
                  `見積書・請求書・納品書を発行します。見積書はお申し込みの前にもお出しできますので、校内の起案に必要でしたらお申し付けください。宛名・件名・提出形式のご指定にも応じます。${
                    moshi.group.invoiceRegistered
                      ? "適格請求書（インボイス）として発行できます。登録番号は請求書に記載します。"
                      : "なお当方は適格請求書発行事業者の登録をしていないため、お出しする請求書は適格請求書（インボイス）ではありません。消費税の仕入税額控除が必要な場合は、お申し込みの前にご確認ください。"
                  }`,
                ],
                [
                  "取り消し",
                  "受験の前日までであれば、人数の減少も全体の取り消しも承ります。費用はかかりません。",
                ],
              ].map(([k, v]) => (
                <li key={k} className="grid gap-x-5 px-4 py-3.5 sm:grid-cols-[8.5rem_1fr]">
                  <span className="text-[0.8rem] leading-relaxed text-ink-3">{k}</span>
                  <span className="prose-ja mt-1 text-[0.86rem] leading-[1.9] text-ink-2 sm:mt-0">{v}</span>
                </li>
              ))}
            </ul>
          </div>
          </InfoDetails>

          {/* 返すものは、この模試で一番の中身。項目を立てて見せる */}
          <h3 className="mt-9 text-[1rem] font-semibold text-ink">
            受験後にお渡しするもの ──「{moshi.deliverableName}」
          </h3>
          <MoshiDeliverables />
          <p className="prose-ja mt-4 max-w-[40rem] text-[0.93rem] leading-[1.9] text-ink-2">
            {moshi.group.reportMin}名以上でお申し込みいただいた場合は、これに加えて
            <strong className="font-semibold text-ink">受験者全体の分野別の得点状況</strong>
            をまとめたものを、先生あてにお渡しします。どの分野が落ちているかが講座の単位で分かるので、
            そのあとの授業で詰める順番を決める材料になります。
          </p>

          <NextStep
            heading="模試について、次にすること"
            note={
              mailTemplate
                ? "下のボタンを押すと、必要な項目があらかじめ入ったメールが開きます。埋めて送信してください。この時点ではまだ確定しません。"
                : "ご所属・お名前・ご希望の大学・おおよその人数・ご希望の時期をお知らせください。"
            }
            primary={
              mailTemplate
                ? { href: mailTemplate, label: "団体でのお申し込み・お問い合わせ", external: true }
                : { href: "#contact", label: "団体でのお申し込み・お問い合わせ" }
            }
            secondary={[
              { href: "/moshi#sample", label: "見本問題を見る" },
              { href: "/moshi", label: "模試のご案内を見る" },
            ]}
          />
        </section>

        <section aria-labelledby="contact" className="mt-14">
          <h2 id="contact" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            お問い合わせ
          </h2>
          <div className="prose-ja mt-5 space-y-4 text-[0.93rem] leading-[2] text-ink-2">
            <p>
              収録範囲、難易度、進度に合わせた使い方、模試の団体でのお申し込みについてお答えします。
            </p>
            {site.contact &&
              (site.contact.includes("@") ? (
                // 学校によっては mailto が開かないので、住所そのものも文字で出す。
                // 先生がコピーして、ふだん使っているメールソフトから送れるようにする。
                <div className="border border-rule bg-paper-2/50 px-5 py-4">
                  <p className="text-[0.8rem] text-ink-3">メールでお送りください</p>
                  <p className="mt-1 break-all font-mono text-[0.97rem] text-ink">
                    <a href={`mailto:${site.contact}`} className="text-navy underline underline-offset-4">
                      {site.contact}
                    </a>
                  </p>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-3">
                    ご所属とお名前を添えていただけると、こちらの回答が早くなります。
                  </p>
                </div>
              ) : (
                <p>
                  <a
                    href={site.contact}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-11 items-center border border-rule bg-paper-2/60 px-5 text-[0.93rem] font-semibold text-navy transition-colors hover:border-navy/40"
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
              {/* 長いページなので、どこに何があるかを出しっぱなしにする */}
              <nav aria-labelledby="toc-edu" className="mb-4 border border-rule bg-white px-4 py-4">
                <p id="toc-edu" className="text-[0.75rem] font-bold tracking-wide text-ink-3">
                  このページの中身
                </p>
                <ol className="mt-2 space-y-1.5">
                  {[
                    ["#books-for-class", "01　教材を授業・講習で使う"],
                    ["#check", "　　中身を確かめる"],
                    ["#multiple", "　　複数冊でのご利用"],
                    ["#moshi", "02　模試をクラスで受けさせる"],
                    ["#contact", "　　ご相談・お問い合わせ"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="block whitespace-pre text-[0.86rem] leading-relaxed text-ink-2 transition-colors hover:text-navy"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="border border-rule bg-white">
                <div className="sec-rule" />
                <div className="px-5 py-5">
                  <p className="eyebrow">学校・塾・予備校の方へ</p>
                  <p className="serif mt-1.5 text-[1.02rem] leading-snug text-ink">ご相談・お問い合わせ</p>
                  <p className="prose-ja mt-2.5 text-[0.86rem] leading-[1.9] text-ink-2">
                    複数冊でのご利用、模試の団体でのお申し込み、採用検討時の内容確認、教材選定について承ります。
                  </p>
                  {site.contact &&
                    (site.contact.includes("@") ? (
                      <>
                        {mailTemplate && (
                          <p className="mt-3.5 border-t border-rule pt-3.5">
                            <a href={mailTemplate} className="btn btn-primary w-full">
                              模試のお申し込み・ご相談
                            </a>
                          </p>
                        )}
                        <p className="mt-3 break-all font-mono text-[0.93rem]">
                          <a href={`mailto:${site.contact}`} className="text-navy underline underline-offset-4">
                            {site.contact}
                          </a>
                        </p>
                      </>
                    ) : (
                      <p className="mt-3.5 border-t border-rule pt-3.5">
                        <a href={site.contact} target="_blank" rel="noopener" className="btn w-full">
                          お問い合わせフォームへ
                        </a>
                      </p>
                    ))}
                  <p className="mt-2.5 text-[0.8rem] leading-relaxed text-ink-3">
                    ご所属とお名前を添えていただけると、こちらの回答が早くなります。
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[0.8rem] leading-relaxed text-ink-3">
                価格・在庫・配送は Amazon の商品ページの表示が優先されます。
              </p>
            </div>
          </aside>
        </div>

        <p className="prose-ja mt-14 border-t border-rule pt-6 text-[0.8rem] leading-[1.9] text-ink-3">
          本サイトおよび教材は、各大学とは関係のない、独自に制作した非公式の教材です。
          問題文の転載は行っていません。
        </p>
      </div>
    </>
  );
}
