import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { PageCtaRow, PrimaryCta, SecondaryCta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { AppScreen } from "@/components/app-screens";
import { CurveDivider, SectionGlow } from "@/components/decor";
import { PrintImage } from "@/components/nobit-media";
import { bookGroups, officialBooks } from "@/data/books";
import { kdpAmazonUrl } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "教材｜ノビット公式教材と『考える力を育てる』シリーズ",
  description:
    "ノビットスタディの教材を詳しく紹介。毎日の演習の土台となるノビット公式教材（数学ⅠA・ⅡBC・ⅢC 標準演習、各分野へ拡大中）と、開発者が刊行する『考える力を育てる』シリーズ全16冊。理解で解く設計思想と、実際の演習本ページも掲載しています。",
  keywords: ["ノビット公式教材", "考える力を育てる 森祐太", "高校物理 教材", "数学 標準演習 問題集"],
  path: "/materials",
});

const principles = [
  { title: "公式暗記ではなく、理解で解く", body: "現象・図・言葉・式を地続きにつなぎ、構造で理解する。初見の問題でも自分で答案を組み立てられる力を育てます。" },
  { title: "記述前提の演習設計", body: "答えだけでなく、途中式・考え方を書く前提の設計。だから提出した答案を、そのまま添削で仕上げられます。" },
  { title: "毎日サイズに分割", body: "1回10〜20分で取り組める大きさに分割。毎日少しずつ、無理なく積み上がるカリキュラムです。" },
];

export default function MaterialsPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "教材", path: "/materials" },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)]">
        <SectionGlow className="-right-24 top-4" color="rgba(249,115,22,0.12)" />
        <SectionGlow className="-left-24 bottom-0" color="rgba(29,78,216,0.08)" />
        <Container className="relative px-6">
          <nav aria-label="パンくずリスト" className="pt-7 text-[0.78rem] text-[#94a3b8] sm:pt-9">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link className="transition hover:text-[#0f766e]" href="/">ホーム</Link></li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#475569]">教材</li>
            </ol>
          </nav>
          <div className="py-10 sm:py-14">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f97316]">Materials · 教材</p>
            <h1 className="mt-3 text-[2.1rem] font-extrabold leading-[1.2] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem]">
やる教材に、もう困らない。
            </h1>
            <p className="mt-4 max-w-2xl text-[1rem] leading-[1.95] text-[#334155]">
              ノビットのために書き下ろした<strong className="font-bold text-[#0b1d4a]">公式教材</strong>と、開発者が刊行する
              <strong className="font-bold text-[#0b1d4a]">『考える力を育てる』シリーズ（全16冊）</strong>。
              教材が豊富だから、毎日の演習に困りません。そのすべてを、つくった本人が毎日添削します。
            </p>
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <PrimaryCta href="/apply">初月半額ではじめる</PrimaryCta>
              <SecondaryCta href="/how-it-works">ノビットのしくみ</SecondaryCta>
            </div>
          </div>
        </Container>
      </section>

      {/* 設計思想 */}
      <section className="bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">Design · 教材の設計思想</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
              「分かったつもり」を、つくらない。
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 lg:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-[20px] bg-[#f8fafc] p-7 ring-1 ring-[rgba(15,29,74,0.06)]">
                <p className="text-[1.05rem] font-extrabold leading-[1.5] text-[#0b1d4a]">{p.title}</p>
                <p className="mt-2 text-[0.9rem] leading-[1.95] text-[#475569]">{p.body}</p>
              </div>
            ))}
          </div>

          {/* 実際の演習本 */}
          <div className="mx-auto mt-14 max-w-3xl">
            <p className="mb-3 text-center text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0f766e]">
              実際の公式演習本（数学ⅢC・関数）より
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <figure className="overflow-hidden rounded-[12px] bg-white ring-1 ring-[rgba(15,29,74,0.1)] shadow-[0_26px_50px_-34px_rgba(11,29,74,0.5)]">
                <PrintImage base="print-problem" alt="ノビット公式演習本の問題ページ（解答欄つき）" sizes="(min-width: 1024px) 360px, 44vw" className="block h-auto w-full" />
                <figcaption className="border-t border-[rgba(15,29,74,0.06)] bg-white px-3 py-2 text-center text-[0.72rem] font-semibold text-[#475569]">問題ページ（解答欄つき）</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-[12px] bg-white ring-1 ring-[rgba(15,29,74,0.1)] shadow-[0_26px_50px_-34px_rgba(11,29,74,0.5)]">
                <PrintImage base="print-solution" alt="ノビット公式演習本の解答・解説ページ（方針つき）" sizes="(min-width: 1024px) 360px, 44vw" className="block h-auto w-full" />
                <figcaption className="border-t border-[rgba(15,29,74,0.06)] bg-white px-3 py-2 text-center text-[0.72rem] font-semibold text-[#475569]">解答・解説（方針つき）</figcaption>
              </figure>
            </div>
            <p className="mt-3 text-center text-[0.78rem] leading-[1.7] text-[#64748b]">
              数値違いの並行類題＋方針つきの丁寧な解答解説。毎日ここから演習します。
            </p>
          </div>
        </Container>
      </section>

      {/* ノビット公式教材（ダークな帯で主役化） */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] text-white">
        <CurveDivider fill="#ffffff" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <Container className="relative px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center rounded-full bg-white/[0.12] px-3 py-1 text-[0.68rem] font-extrabold tracking-[0.08em] text-white ring-1 ring-white/20">
              ノビット公式教材
            </p>
            <h2 className="mt-4 text-[1.6rem] font-extrabold leading-[1.4] sm:text-[2rem]">
              まずは数学から。各分野へ拡大中。
            </h2>
            <p className="mt-4 text-[0.95rem] leading-[1.95] text-white/80">
              ノビットのために書き下ろした公式教材。数学（ⅠA・ⅡBC・ⅢC）を公開中で、物理・化学・英語など各分野へ順次拡大していきます。
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-3">
            {officialBooks.map((b) => (
              <li key={b.asin}>
                <a href={`https://www.amazon.co.jp/dp/${b.asin}`} target="_blank" rel="noreferrer noopener" className="group flex h-full flex-col rounded-[16px] bg-white p-4 ring-1 ring-[rgba(15,29,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-34px_rgba(11,29,74,0.45)]">
                  <div className="relative overflow-hidden rounded-[10px] bg-[#0b1d4a] shadow-[0_18px_30px_-18px_rgba(11,29,74,0.55)]">
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-[#16a34a] px-2 py-0.5 text-[0.6rem] font-extrabold text-white">{b.subject}</span>
                    <picture>
                      <source type="image/avif" srcSet={`/books/${b.asin}.avif`} />
                      <source type="image/webp" srcSet={`/books/${b.asin}.webp`} />
                      <img src={`/books/${b.asin}.webp`} alt={`${b.title}（森祐太・ノビット公式教材）の表紙`} width={355} height={500} loading="lazy" decoding="async" className="block aspect-[71/100] h-auto w-full object-cover" />
                    </picture>
                  </div>
                  <p className="mt-3 text-[0.92rem] font-bold leading-[1.45] text-[#0b1d4a] group-hover:text-[#0f766e]">{b.title}</p>
                  <p className="mt-1 text-[0.76rem] leading-[1.6] text-[#64748b]">{b.sub}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[0.72rem] font-semibold text-[#ea580c]">Amazonで見る <span aria-hidden="true">↗</span></span>
                </a>
              </li>
            ))}
          </ul>
          <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-[0.74rem] font-semibold">
            <li className="text-white/70">続々制作中：</li>
            {["物理基礎・物理", "化学基礎・化学", "英語長文・英文法"].map((s) => (
              <li key={s} className="rounded-full bg-white/[0.08] px-3 py-1 text-white/70 ring-1 ring-dashed ring-white/25">{s}（準備中）</li>
            ))}
          </ul>
        </Container>
        <CurveDivider fill="#ffffff" flip />
      </section>

      {/* 教材の使い方 */}
      <section className="bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">How to use · 教材の使い方</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
              「読む」教材ではなく、「使う」教材。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              教材は毎日の演習と添削とセットで力に変わります。ノビットでの使い方はこうです。
            </p>
          </div>
          <ol className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {[
              { n: "01", t: "その日の1枚に取り組む", b: "教材から毎日サイズに切り出された課題を、途中式・考え方まで書いて解きます。" },
              { n: "02", t: "並行類題で定着させる", b: "数値違いの並行類題を用意。同じ考え方を手を変えて反復し、「解ける」を「いつでも解ける」に。" },
              { n: "03", t: "方針つき解答で確認する", b: "解答・解説は答えだけでなく“なぜその方針か”まで。提出と同時に届くので、その場で自己採点できます。" },
              { n: "04", t: "添削で仕上げる", b: "書いた答案を開発者本人が添削。教材と添削が地続きだから、直し方まで一貫しています。" },
            ].map((s) => (
              <li key={s.n} className="rounded-[20px] bg-[#f8fafc] p-7 ring-1 ring-[rgba(15,29,74,0.06)]">
                <span className="text-[0.9rem] font-extrabold tracking-[0.14em] text-[#0d9488]">{s.n}</span>
                <p className="mt-2 text-[1.08rem] font-extrabold leading-[1.45] text-[#0b1d4a]">{s.t}</p>
                <p className="mt-2 text-[0.9rem] leading-[1.9] text-[#475569]">{s.b}</p>
              </li>
            ))}
          </ol>
          {/* 提出→添削の実画面 */}
          <div className="mt-14 flex flex-wrap items-start justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <AppScreen variant="submit" />
              <p className="mt-4 text-[0.9rem] font-bold text-[#0b1d4a]">答案を写真で提出</p>
              <p className="mt-1 text-[0.8rem] text-[#64748b]">紙でもタブレットでも。何枚でもOK</p>
            </div>
            <div className="text-center">
              <AppScreen variant="returned" />
              <p className="mt-4 text-[0.9rem] font-bold text-[#0b1d4a]">添削されて返却</p>
              <p className="mt-1 text-[0.8rem] text-[#64748b]">合否・得点・コメントで仕上げる</p>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-[20px] bg-[#eef6f6] p-6 ring-1 ring-[rgba(13,148,136,0.18)] sm:p-8">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0f766e]">設計思想を、ひとことで</p>
            <p className="mt-2 text-[1.05rem] font-extrabold leading-[1.6] text-[#0b1d4a]">
              現象 → 図 → 言葉 → 式。この順につなぐと、公式は「暗記」から「導けるもの」に変わる。
            </p>
            <p className="mt-2 text-[0.9rem] leading-[1.95] text-[#334155]">
              たとえば物理なら、起きている現象を図にし、言葉で条件を整理し、そこから式を立てる。
              この流れを教材の設計に落とし込んでいるので、初見の問題でも自分で答案を組み立てられるようになります。
            </p>
          </div>
        </Container>
      </section>

      {/* 考える力を育てる シリーズ */}
      <section className="bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f97316]">Books · あわせて演習できる教材</p>
            <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[2rem]">
              『考える力を育てる』シリーズ（全16冊）
            </h2>
            <p className="mt-4 text-[0.95rem] leading-[1.95] text-[#475569]">
              公式教材に加え、開発者が KDP で刊行するこのシリーズも演習に活用できます。
              <strong className="font-bold text-[#0b1d4a]">理論・演習・入試対策・総まとめ</strong>まで、学びはじめから合格までを切れ目なく支えます。
            </p>
          </div>

          <div className="mt-10 grid gap-8">
            {bookGroups.map((group) => (
              <div key={group.group}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-[rgba(15,29,74,0.08)] pb-3">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] font-extrabold tracking-[0.06em] text-white" style={{ background: group.accent }}>{group.group}</span>
                  <span className="text-[0.82rem] text-[#64748b]">{group.note}</span>
                </div>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
                  {group.books.map((b) => (
                    <li key={b.asin}>
                      <a href={`https://www.amazon.co.jp/dp/${b.asin}`} target="_blank" rel="noreferrer noopener" className="group flex h-full flex-col">
                        <div className="overflow-hidden rounded-[10px] bg-[#0b1d4a] shadow-[0_18px_30px_-18px_rgba(11,29,74,0.55)] ring-1 ring-[rgba(15,29,74,0.1)] transition group-hover:-translate-y-1">
                          <picture>
                            <source type="image/avif" srcSet={`/books/${b.asin}.avif`} />
                            <source type="image/webp" srcSet={`/books/${b.asin}.webp`} />
                            <img src={`/books/${b.asin}.webp`} alt={`考える力を育てる ${b.title}（森祐太・KDP）の表紙`} width={320} height={451} loading="lazy" decoding="async" className="block aspect-[71/100] h-auto w-full object-cover" />
                          </picture>
                        </div>
                        <p className="mt-2.5 text-[0.84rem] font-bold leading-[1.4] text-[#0b1d4a] transition group-hover:text-[#0f766e]">{b.title}</p>
                        <p className="mt-1 text-[0.72rem] leading-[1.6] text-[#64748b]">{b.sub}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a href={kdpAmazonUrl} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b1d4a] px-7 text-[0.96rem] font-semibold text-white transition hover:bg-[#0f5e5e]">
              Amazon で「考える力を育てる 森祐太」を見る <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* 教材のFAQ */}
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="text-center">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f97316]">FAQ · 教材について</p>
              <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2rem]">よくある質問</h2>
            </div>
            <ul className="mt-8 grid gap-3">
              {[
                { q: "教材は別で買う必要がありますか？", a: "いいえ。毎日の演習に使うノビット公式教材はサービスに含まれ、教材費は0円です。学習は公式教材を中心に進めます（KDPの市販書籍は、さらに演習したい方向けの任意の選択肢です）。" },
                { q: "どの科目の公式教材がありますか？", a: "現在は数学（ⅠA・ⅡBC・ⅢC）の標準演習を公開しています。物理基礎・物理／化学基礎・化学／英語長文・英文法など、各分野へ順次拡大していきます。" },
                { q: "レベルはどのくらいですか？", a: "基礎から入試標準までをカバーします。段階的に難易度が上がる設計なので、苦手からでも積み上げられ、難関大・名大の記述対策まで対応します。" },
                { q: "市販の『考える力を育てる』シリーズとの違いは？", a: "公式教材はノビットのために書き下ろした毎日演習用の教材、『考える力を育てる』シリーズは開発者がKDPで刊行する書籍です。どちらも同じ設計思想で、あわせて演習に活用できます。" },
              ].map((item) => (
                <li key={item.q} className="rounded-[18px] bg-[#f8fafc] p-6 ring-1 ring-[rgba(15,29,74,0.06)]">
                  <p className="flex items-start gap-2.5 text-[1rem] font-bold leading-[1.6] text-[#0b1d4a]">
                    <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#0d9488] text-[0.78rem] font-bold text-white">Q</span>
                    {item.q}
                  </p>
                  <p className="mt-3 border-t border-dotted border-[rgba(15,29,74,0.12)] pt-3 text-[0.92rem] leading-[1.95] text-[#475569]">{item.a}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <PageCtaRow note="教材はサービスとセット。毎日演習して、毎日添削で仕上げます。" />
          </div>
        </Container>
      </section>
    </>
  );
}
