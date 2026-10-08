import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CoverShelf } from "@/components/cover-shelf";
import { FactStrip } from "@/components/fact-strip";
import { AnalysisTable } from "@/components/home-visual";
import { IntentCards } from "@/components/intent-cards";
import { AnswerSheet } from "@/components/moshi-visual";
import { moshi, roundLabel } from "@/lib/moshi/config";
import { KanseiCards } from "@/components/kansei-cards";
import { TopFields } from "@/components/top-fields";
import { UniversityFinder } from "@/components/university-finder";
import { siteTotals, universities } from "@/lib/data";
import { finderItems } from "@/lib/finder";
import { sectionStyle } from "@/lib/sections";
import { kanseiPublished, seriesTagline, shindan } from "@/lib/series";
import { hasSolutions, published, questionCount, solutionUniversities } from "@/lib/solutions";
import { groupOrder, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name}｜${site.tagline}` },
  description: site.description,
  keywords: [
    "大学別 数学 傾向と対策",
    "大学入試 数学 過去問 分析",
    "数学 頻出分野",
    "二次試験 数学 対策",
    "医学部 数学 対策",
    "大学別 数学 頻出分野",
    "大学別 数学 問題集",
    "志望校 診断 数学",
    "難関国公立 数学",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name}｜${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og/home.jpg"] },
};

export default function HomePage() {
  const t = siteTotals();
  const usedGroups = groupOrder.filter((g) => universities.some((u) => u.group === g));
  const items = finderItems();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.alternateName,
    url: site.url,
    description: site.description,
    inLanguage: "ja",
    publisher: { "@type": "Person", name: site.author },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page page-wide">
        {/*
          最初の画面に置くのは、何のサイトかの1行・できあがるものの図・
          3つの数字・そして**大学を探す欄**だけ。
          探しに来た人が最初にすることは検索なので、それを一番上に置く。
          64区分をここで全部並べると「多すぎて選べない」が先に来るため、
          絞り込む前は少しだけ見せて、続きは一覧ページへ送る。
        */}
        {/*
          いま集めたいのは模試の申込なので、最初の画面に告知を置く。
          分析サイトとしての見出しは下にそのまま残す。
          帯は1行に収め、押す先は模試の案内ひとつだけにする。
        */}
        <Link
          href="/moshi"
          style={sectionStyle("moshi")}
          className="group mt-5 flex items-center gap-3 border border-[var(--sec)]/35 bg-[color-mix(in_srgb,var(--sec)_6%,#fff)] px-4 py-3 transition-colors hover:bg-[color-mix(in_srgb,var(--sec)_11%,#fff)] sm:px-5"
        >
          <span className="shrink-0 border border-[var(--sec)] px-2 py-0.5 text-[0.66rem] font-bold tracking-wide text-[var(--sec)]">
            申込受付中
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.88rem] font-semibold leading-snug text-ink">{moshi.title}</span>
            <span className="mt-0.5 block text-[0.75rem] leading-snug text-ink-2">
              {moshi.season}・{moshi.universities.length}大学
              <span className="hidden sm:inline">・{roundLabel}</span>
            </span>
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="size-3.5 shrink-0 text-[var(--sec)] transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* 読む前に掴める手がかりを先に置く。文字だけの最初の画面にしない */}
        <FactStrip
          items={[
            { icon: "grid", label: `${t.universities}大学・${t.sections}区分` },
            { icon: "clock", label: `${t.minYears}〜${t.maxYears}年分` },
            { icon: "pen", label: "解答解説も無料" },
          ]}
        />

        <section className="border-b border-rule pb-9 pt-7 sm:pt-9">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-center lg:gap-x-12">
            <div className="min-w-0">
              <p className="text-[0.7rem] font-bold tracking-[0.1em] text-navy">
                国公立・私立{t.universities}大学／{t.span}の過去問から
              </p>
              <h1 className="serif h-page mt-2.5 text-ink">
                大学別数学
                <br className="sm:hidden" />
                研究室
              </h1>
              <p className="prose-ja mt-4 max-w-[34rem] text-[0.97rem] text-ink-2">
                試験時間・大問構成・頻出分野・目標点を、大学ごとに
                <strong className="font-semibold text-ink">年度別・分野別の表</strong>
                にまとめています。
              </p>
            </div>

            {/*
              できあがる表そのものを見せる。文章で説明するより早い。
              狭い画面では、数字より先にこれが出るように並び順を決めている。
            */}
            <figure className="mt-7 lg:mt-0">
              <div className="border border-rule bg-white px-4 py-4">
                <AnalysisTable className="w-full" />
              </div>
              <figcaption className="mt-2 text-[0.7rem] leading-relaxed text-ink-3">
                各大学のページに出している、年度 × 分野の出題表（見本）。
              </figcaption>
            </figure>
          </div>

          <dl className="mt-8 flex flex-wrap gap-x-9 gap-y-4 border-t border-rule pt-6">
            {[
              { k: "分析した大学", v: t.universities, u: `大学・${t.sections}区分` },
              { k: "分析した入試", v: t.totalYears, u: "年分" },
              { k: "予想問題集", v: t.books, u: "冊" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-[0.68rem] text-ink-3">{s.k}</dt>
                <dd className="serif mt-1 leading-none text-ink">
                  <span className="text-[1.6rem] tabular-nums">{s.v}</span>
                  <span className="ml-0.5 font-sans text-[0.7rem] font-normal text-ink-3">{s.u}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="find-heading" className="mt-9" style={sectionStyle("universities")}>
          <h2 id="find-heading" className="rule-mark serif h-sect text-ink">
            大学から探す
          </h2>
          <p className="prose-ja mt-2.5 max-w-[36rem] text-[0.9rem] text-ink-2">
            大学名やかなで検索するか、下の区分で絞り込めます。
          </p>
          <UniversityFinder
            items={items}
            groups={usedGroups}
            size="lg"
            limit={6}
            moreHref="/universities"
          />
        </section>

      </div>

      {/*
        ここから3つの節は、地をごく薄く落とした面に載せる。
        白のまま細い罫だけで区切っていくと、縦に長いページのどこからどこまでが
        一続きなのか読み取れなくなる。要所で面を切り替えて、流れに区切りを付ける。
      */}
      <div className="band mt-14">
        <div className="page page-wide">
        {/*
          用件から入口を選ばせる。分析・診断・演習・予想問題集は性質が違うのに、
          名前を見ただけではどれが自分向けか分からない。
        */}
        <section aria-labelledby="intent-heading">
          <h2 id="intent-heading" className="rule-mark serif h-sect text-ink">
            いまのあなたに合うもの
          </h2>
          <p className="prose-ja mt-2.5 max-w-[36rem] text-[0.9rem] text-ink-2">
            やりたいことを選ぶと、その段階で使うものに移ります。
          </p>
          <IntentCards
            items={[
              {
                want: "志望校の出題を知りたい",
                to: "大学別分析",
                body: `${t.universities}大学・${t.sections}区分の試験時間・大問構成・頻出分野・目標点を、年度別の表で。`,
                href: "/universities",
                section: "universities",
              },
              {
                want: "自分に合う大学を知りたい",
                to: "志望校診断模試",
                body: `${shindan.rounds}回の模試で得点の形を取り出し、${shindan.universities.length}大学との相性を判定します。`,
                href: "/shindan",
                section: "shindan",
              },
              {
                want: "過去問の前に力をつけたい",
                to: "分野別完成演習",
                body: `志望校の頻出分野を、標準から本番の水準まで段階的に。${kanseiPublished.length}大学ぶん刊行。`,
                href: "/kansei",
                section: "kansei",
              },
              {
                want: "本番の形式で演習したい",
                to: "合格答案をつくる",
                body: `試験時間・大問構成・解答形式をそろえた予想問題集。全${t.books}冊。`,
                href: "/books",
                section: "books",
              },
            ]}
          />
        </section>

        {/*
          当サイトで解いた解答・解説。無料で最後まで読めるものなので、
          教材の紹介より前に置く。ここが入口になって大学ページへ回ることも多い。
        */}
        {hasSolutions && (
          <section aria-labelledby="kaisetsu-heading" className="mt-16" style={sectionStyle("kaisetsu")}>
            <h2 id="kaisetsu-heading" className="rule-mark serif h-sect text-ink">
              過去問の解答・解説
            </h2>
            <div className="card mt-4 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-7">
              <div className="min-w-0">
                <p className="prose-ja text-[0.9rem] leading-[1.9] text-ink-2">
                  当サイトで独自に解いた解答・計算過程・詳解・別解です。
                  どの方針をなぜ選ぶのか、答案で省略しない方がよい説明は何かまで書いています。
                </p>
                <dl className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                  {[
                    { k: "掲載した大学", v: solutionUniversities().length, u: "大学" },
                    { k: "掲載した年度", v: published.length, u: "年度分" },
                    { k: "解いた大問", v: questionCount, u: "問" },
                  ].map((x) => (
                    <div key={x.k}>
                      <dt className="text-[0.68rem] text-ink-3">{x.k}</dt>
                      <dd className="serif mt-0.5 leading-none text-ink">
                        <span className="text-[1.3rem] tabular-nums">{x.v}</span>
                        <span className="ml-0.5 font-sans text-[0.68rem] font-normal text-ink-3">{x.u}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <Link href="/kaisetsu" className="btn shrink-0">
                解答・解説を読む
              </Link>
            </div>
          </section>
        )}

        {/* 既存の教材紹介より前に出さない。知らせる役だけを持たせる */}
        <section aria-labelledby="moshi-heading" className="mt-16" style={sectionStyle("moshi")}>
          <h2 id="moshi-heading" className="rule-mark serif h-sect text-ink">
            大学別オンライン数学模試
          </h2>
          {/* 文字だけの帯にせず、採点して返すところまでを図で見せる */}
          <div className="card mt-4 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-7">
            <AnswerSheet className="w-[150px] shrink-0 self-center sm:w-[170px]" />
            <div className="min-w-0">
              <p className="prose-ja text-[0.9rem] leading-[1.9] text-ink-2">
                {moshi.season}・{moshi.universities.length}大学。{roundLabel}。
                志望校と同じ形式の記述答案を、人の手で採点して返します。
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Link href="/moshi" className="btn btn-primary">
                  模試のご案内と参加申込
                </Link>
                <span className="text-[0.78rem] text-ink-3">参加申込を受け付けています</span>
              </p>
            </div>
          </div>
        </section>

        </div>
      </div>

      <div className="page page-wide">
        <TopFields />

        <section aria-labelledby="shelf-heading" className="mt-16" style={sectionStyle("books")}>
          <h2 id="shelf-heading" className="rule-mark serif h-sect text-ink">
            表紙から探す
          </h2>
          <p className="prose-ja mt-2.5 max-w-[36rem] text-[0.9rem] text-ink-2">
            刊行している大学別の予想問題集です。表紙を選ぶと、その大学の出題分析に移ります。
          </p>
          <CoverShelf labelled />
        </section>


        <section aria-labelledby="series-heading" className="mt-16" style={sectionStyle("kansei")}>
          <p className="eyebrow">過去問の前にシリーズ</p>
          <h2 id="series-heading" className="serif mt-1 text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            {seriesTagline}
          </h2>
          <p className="prose-ja mt-2.5 max-w-[36rem] text-[0.9rem] text-ink-2">
            旧帝大・難関国公立の理系数学を目指す人向けに、過去問に入る前の段階を2冊に分けました。
            志望校診断模試で行き先を決め、その大学の分野別完成演習で頻出分野を固めてから過去問へ進みます。
          </p>

          <Link
            href="/shindan"
            className="group mt-6 flex gap-4 border-y border-navy/20 bg-paper-2/70 px-4 py-5 transition-colors hover:bg-paper-2"
          >
            <Image
              src="/covers/kansei/thumb/shindan.webp"
              alt="志望校診断模試の表紙"
              width={160}
              height={226}
              sizes="76px"
              className="w-[76px] shrink-0 self-start rounded-[2px] border border-rule shadow-[0_1px_2px_rgba(21,24,28,0.07)]"
            />
            <span className="min-w-0">
              <span className="block text-[0.68rem] font-bold text-navy">1　志望校が決まっていないなら</span>
              <span className="serif mt-1 block text-[1.05rem] leading-snug text-ink group-hover:text-navy">
                旧帝大・難関国公立大 理系数学 志望校診断模試
              </span>
              <span className="prose-ja mt-1.5 block text-[0.82rem] text-ink-2">
                {shindan.rounds}回の模試で「得点の形」を分析し、{shindan.universities.map((u) => u.name).join("・")}
                の{shindan.universities.length}大学との相性を判定します。
              </span>
            </span>
          </Link>

          <div className="mt-8">
            <h3 className="text-[0.9rem] font-semibold text-ink">
              <span className="mr-2 text-[0.68rem] font-bold text-navy">2</span>
              志望校が決まったら、大学別の分野別完成演習（{kanseiPublished.length}冊刊行）
            </h3>
            <div className="mt-4">
              <KanseiCards />
            </div>
            <p className="mt-4 text-[0.85rem]">
              <Link href="/kansei" className="text-navy underline underline-offset-4">
                分野別完成演習のシリーズ全体を見る
              </Link>
            </p>
          </div>
        </section>

        <section className="mt-16 border-t border-rule pt-7">
          {/*
            同じ説明を本文のあちこちで繰り返していたので、ここ1か所にまとめた。
            「どこから作ったか」「どこまで載せているか」「何者か」の3つだけ。
            教材やシリーズの紹介は上の節で済んでいるので、ここでは繰り返さない。
          */}
          <h2 className="serif text-[1.1rem] text-ink">このサイトについて</h2>
          <dl className="mt-4 grid gap-px border border-rule bg-rule sm:grid-cols-3">
            {[
              {
                k: "分析の出どころ",
                v: `各大学の公表資料と実際の問題冊子にあたって作成しています。分析年数は${t.minYears}〜${t.maxYears}年分と大学によって幅があり、対象年度は各ページに書いています。`,
              },
              {
                k: "載せているもの",
                v: "出題形式と分野構成の分析、および当サイトが独自に作成した解答・解説です。問題文・図表の転載はしていません。",
              },
              {
                k: "運営",
                v: `${site.author}が個人で制作・運営しています。各大学とは関係のない非公式サイトです。`,
              },
            ].map((x) => (
              <div key={x.k} className="bg-white px-5 py-4">
                <dt className="text-[0.72rem] font-bold tracking-wide text-ink-3">{x.k}</dt>
                <dd className="prose-ja mt-1.5 text-[0.84rem] leading-[1.9] text-ink-2">{x.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 学校・塾向けの入口。生徒向けの導線とは別に、はっきり分けて置く */}
        <section
          aria-labelledby="educators-heading"
          className="mt-12 border border-rule"
          style={sectionStyle("educators")}
        >
          <div className="sec-rule" />
          <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="min-w-0">
              <p className="eyebrow">学校・塾・予備校の先生へ</p>
              <h2 id="educators-heading" className="serif mt-1.5 text-[1.15rem] leading-snug text-ink">
                授業・講習・課題演習にお使いいただけます
              </h2>
              <p className="prose-ja mt-2 max-w-[38rem] text-[0.86rem] leading-[1.9] text-ink-2">
                複数冊でのご利用、採用をご検討のさいの内容確認、学年や進度に合わせた教材選定のご相談を承っています。
              </p>
            </div>
            <Link href="/educators" className="btn shrink-0">
              先生方へのご案内
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
