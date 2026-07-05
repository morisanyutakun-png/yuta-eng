import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { PageCtaRow, PrimaryCta, SecondaryCta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { AppScreen } from "@/components/app-screens";
import { Blob, CtaDoodle, CurveDivider, DarkSectionDecor, SectionGlow } from "@/components/decor";
import { Illust } from "@/components/nobit-media";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "ノビットのしくみ｜教材 × 習慣化 × 添削で毎日続く学習システム",
  description:
    "ノビットスタディ 中高部のしくみを詳しく解説。塾でも参考書でもない「続く学習システム」。自作教材を毎日1枚ずつ進め、提出と同時に解答・解説、翌日までにプロの添削。3本柱（教材・習慣化・添削）と1日のサイクル、添削の中身までを紹介します。",
  keywords: ["ノビットスタディ しくみ", "デジタル通信添削 とは", "毎日添削 学習法", "学習習慣化"],
  path: "/how-it-works",
});

const pillars = [
  {
    tag: "教材",
    icon: "pillar-materials",
    color: "#1d4ed8",
    title: "自作のオリジナル教材",
    body: "市販の一般教材ではありません。16冊を刊行した開発者が「理解で解く」設計で書き下ろし、毎日少しずつ進む大きさに分割。今日やる分がいつも目の前にあります。",
    points: ["理解で解く設計思想", "毎日サイズに分割", "各分野へ順次拡大中"],
  },
  {
    tag: "習慣化",
    icon: "pillar-habit",
    color: "#0d9488",
    title: "続く仕組みを、まるごと",
    body: "専用アプリが毎日1枚の課題を配信。連続記録・はなまる・称号で、勉強が自然と生活のリズムになります。「今日やること」が決まっているから続きます。",
    points: ["毎日1枚の課題配信", "連続記録・はなまる・称号", "保護者も進捗を確認"],
  },
  {
    tag: "添削",
    icon: "pillar-correction",
    color: "#ea580c",
    title: "あなた専用の指摘",
    body: "提出した答案を、教材を書いた本人が添削。途中式・考え方・減点ポイントまで、どこをどう直すかが分かる形で返します。やりっぱなしをなくします。",
    points: ["途中式・考え方まで", "減点ポイントを可視化", "翌日までに返却"],
  },
];

const steps = [
  { no: "01", title: "今日の1枚が届く", body: "その日やる課題がアプリに配信。「何をやろう」と迷う時間はゼロ。座ったらすぐ始められます。" },
  { no: "02", title: "解いて、出す", body: "自作教材で理解して書く。1回10〜20分から。提出と同時に解答・解説が届くので、その場で自己採点まで完了します。" },
  { no: "03", title: "翌日までに添削が返る", body: "自己採点だけで終わりません。翌日までに、あなた専用の添削が返却。スマホでそのまま見返せます。" },
  { no: "04", title: "直して、また明日へ", body: "指摘をもとに直し、合格したら次の教材へ。連続記録を1日のばす。この小さなループが力を積み上げます。" },
];

const correction = [
  { mark: "①", title: "人の目で、読む", body: "機械の丸つけでは拾えない「考え方」まで。途中式の論理も、本番で引かれる減点ポイントも、講師が一枚ずつ読み込みます。" },
  { mark: "②", title: "やり取りが、続く", body: "出して終わり、ではありません。コメントに返信でき、次の答案でまた返ってくる。双方向だから、疑問がその場で消えます。" },
  { mark: "③", title: "「見てくれている」実感", body: "提出を続けるほど、頑張りが伝わる。認めてもらえる一言が、次の1枚へのやる気になります。" },
  { mark: "④", title: "次まで、いっしょに", body: "弱点に合わせて次の課題を提示。ひとりで抱え込まず、必要な順番で積み上げられます。" },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "ホーム", path: "/" },
          { name: "ノビットのしくみ", path: "/how-it-works" },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)]">
        <Blob fill="#1d4ed8" className="pointer-events-none absolute -left-28 -top-20 h-[24rem] w-[24rem] opacity-[0.14]" />
        <Blob fill="#0d9488" className="pointer-events-none absolute -right-24 top-4 h-[26rem] w-[26rem] opacity-[0.16]" />
        <Blob fill="#f97316" className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 opacity-[0.1]" />
        <Container className="relative px-6">
          <nav aria-label="パンくずリスト" className="pt-7 text-[0.78rem] text-[#94a3b8] sm:pt-9">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link className="transition hover:text-[#0f766e]" href="/">ホーム</Link></li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#475569]">しくみ</li>
            </ol>
          </nav>
          <div className="py-10 sm:py-14">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
              How it works · しくみ
            </p>
            <h1 className="mt-3 text-[2.1rem] font-extrabold leading-[1.2] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem]">
              毎日の学習を、仕組みにする。
            </h1>
            <p className="mt-4 max-w-2xl text-[1rem] leading-[1.95] text-[#334155]">
              ノビットは、塾でも参考書でもありません。自作教材を<strong className="font-bold text-[#0b1d4a]">毎日1枚ずつ</strong>進め、
              提出と同時に解答・解説、翌日までにプロの添削が返る——
              <strong className="font-bold text-[#0b1d4a]">「教材 × 習慣化 × 添削」</strong>で回す、続く学習システムです。
            </p>
            <div className="relative mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:mt-16 lg:w-fit">
              <CtaDoodle />
              <PrimaryCta href="/apply">買い切りではじめる</PrimaryCta>
              <SecondaryCta href="/app">公式アプリを見る</SecondaryCta>
            </div>
          </div>
        </Container>
      </section>

      {/* 3本柱 */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] text-white">
        <CurveDivider fill="#f3f8ff" />
        <DarkSectionDecor />
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
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#5eead4]">The Method · 3本柱</p>
            <h2 className="mt-3 text-[1.8rem] font-extrabold leading-[1.3] sm:text-[2.3rem]">
              <span className="text-[#7dd3fc]">教材</span> × <span className="text-[#5eead4]">習慣化</span> × <span className="text-[#fdba74]">添削</span>。
            </h2>
            <p className="mt-4 text-[0.98rem] leading-[1.95] text-white/80">
              3つがかみ合って、はじめて学習は「仕組み」になります。どれが欠けても、続かないか・直らないかのどちらかです。
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.tag} className="relative overflow-hidden rounded-[22px] bg-white/[0.07] p-7 ring-1 ring-white/15">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ background: p.color }} />
                <div className="flex items-center gap-3">
                  <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-[16px] bg-white shadow-[0_14px_28px_-16px_rgba(0,0,0,0.5)] ring-1 ring-white/40">
                    <Illust base={p.icon} widths={[128, 256]} width={256} height={256} alt={`${p.tag}のイラスト`} sizes="64px" className="h-full w-full object-contain" />
                  </span>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-[0.8rem] font-extrabold text-white" style={{ background: p.color }}>
                    {p.tag}
                  </span>
                </div>
                <p className="mt-4 text-[1.18rem] font-extrabold leading-[1.5]">{p.title}</p>
                <p className="mt-3 text-[0.9rem] leading-[1.95] text-white/75">{p.body}</p>
                <ul className="mt-4 grid gap-1.5 border-t border-white/15 pt-4">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-[0.84rem] leading-[1.7] text-white/85">
                      <span aria-hidden="true" className="text-[#5eead4]">◆</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
        <CurveDivider fill="#ffffff" flip />
      </section>

      {/* 実際のアプリ画面（届く→返る） */}
      <section className="relative overflow-hidden bg-white">
        <SectionGlow className="-left-24 top-10" color="rgba(124,58,237,0.1)" />
        <SectionGlow className="-right-24 bottom-10" color="rgba(13,148,136,0.1)" />
        <Container className="relative px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">In the app · アプリの中で</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
アプリの中を、ちょっと見てみる。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              スマホ・タブレットで完結。課題が「届き」、添削されて「返る」——実際の画面はこう見えます。
            </p>
          </div>
          <div className="mt-12 flex flex-wrap items-start justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <AppScreen variant="home" />
              <p className="mt-4 text-[0.9rem] font-bold text-[#0b1d4a]">課題が届く（ホーム）</p>
              <p className="mt-1 text-[0.8rem] text-[#64748b]">今日の1枚・やること・がんばりメーター</p>
            </div>
            <div className="text-center">
              <AppScreen variant="returned" />
              <p className="mt-4 text-[0.9rem] font-bold text-[#0b1d4a]">添削が返る（返却）</p>
              <p className="mt-1 text-[0.8rem] text-[#64748b]">合否・得点・次の一手までコメント</p>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <SecondaryCta href="/app">アプリの4画面をくわしく見る</SecondaryCta>
          </div>
        </Container>
      </section>

      {/* 1日のサイクル */}
      <section className="bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">Daily Loop · 1日のサイクル</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
              届く → 解く → 返る → 直す。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              1回10〜20分から。シンプルなループだから、無理なく続いて積み上がります。
            </p>
          </div>
          <ol className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
            {steps.map((s) => (
              <li key={s.no} className="rounded-[20px] bg-[#f8fafc] p-7 ring-1 ring-[rgba(15,29,74,0.06)]">
                <span className="text-[0.9rem] font-extrabold tracking-[0.14em] text-[#0d9488]">STEP {s.no}</span>
                <p className="mt-2 text-[1.1rem] font-extrabold leading-[1.45] text-[#0b1d4a]">{s.title}</p>
                <p className="mt-2 text-[0.92rem] leading-[1.95] text-[#475569]">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 添削の中身 */}
      <section className="relative overflow-hidden bg-[#f8fafc]">
        <SectionGlow className="-left-24 top-8" color="rgba(234,88,12,0.14)" />
        <Container className="relative px-6 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            {/* 採点済み答案イラスト */}
            <div className="relative order-1 mx-auto w-full max-w-md">
              <div className="relative -rotate-2 overflow-hidden rounded-[18px] bg-white shadow-[0_44px_80px_-44px_rgba(11,29,74,0.6)] ring-1 ring-[rgba(15,29,74,0.1)] transition hover:rotate-0">
                <Illust base="correction-graded" widths={[560, 1120]} width={1448} height={1086} alt="赤ペンで添削された数学の答案。チェック・合格スタンプ・先生コメント入り" sizes="(min-width: 1024px) 440px, 88vw" className="block h-auto w-full" />
              </div>
              <span className="absolute -right-3 -top-3 -rotate-6 rounded-full bg-[#ea580c] px-3.5 py-1.5 text-[0.78rem] font-extrabold text-white shadow-[0_14px_26px_-12px_rgba(234,88,12,0.9)]">
                翌日までに
              </span>
            </div>
            {/* 4つの指摘 */}
            <div className="order-2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#ea580c]">Correction · 人が読む添削</p>
              <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
                答案の向こうに、いつも人がいる。
              </h2>
              <p className="mt-4 max-w-lg text-[0.96rem] leading-[1.95] text-[#475569]">
                答案には、講師が目を通してコメントを返します。ただの丸つけと違い、やり取りが生まれ、進み具合まで見てもらえる。「ちゃんと見てくれている」——その手ごたえが、毎日のやる気を支えます。
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {correction.map((c) => (
                  <li key={c.title} className="rounded-[16px] bg-white p-5 ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_20px_38px_-34px_rgba(11,29,74,0.5)]">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0b1d4a] text-[0.95rem] font-extrabold text-white">
                      {c.mark}
                    </span>
                    <p className="mt-3 text-[1.02rem] font-extrabold leading-[1.4] text-[#0b1d4a]">{c.title}</p>
                    <p className="mt-1.5 text-[0.84rem] leading-[1.85] text-[#475569]">{c.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 1日の流れ（具体例） */}
      <section className="bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">Example · 1日の流れ</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
              たとえば、夜の30分。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              時間帯も曜日も自由です。生活のリズムに合わせて、無理なく回せます（下は一例）。
            </p>
          </div>
          <ol className="mx-auto mt-10 max-w-2xl space-y-3">
            {[
              { time: "20:00", title: "アプリに「今日の課題」が届く", body: "通知が来たら開くだけ。何をやるか迷う時間はありません。" },
              { time: "20:05", title: "プリントで解く（10〜20分）", body: "その日の1枚を、途中式・考え方まで書いて答案に。" },
              { time: "20:20", title: "提出 → その場で解答・解説", body: "出した瞬間に模範解答が届くので、すぐ自己採点できます。" },
              { time: "翌20:00", title: "先生の添削が返ってくる", body: "翌日までに、あなた専用の添削が返却。指摘をもとに直します。" },
              { time: "そして", title: "合格したら、次の1枚へ", body: "連続記録が1日のびる。この小さなループを毎日くりかえします。" },
            ].map((s, i, arr) => (
              <li key={s.time} className="relative flex gap-4 rounded-[16px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.06)]">
                <div className="flex flex-col items-center">
                  <span className="grid min-h-8 min-w-[3.4rem] place-items-center rounded-full bg-[#0b1d4a] px-2 text-[0.72rem] font-extrabold text-white">
                    {s.time}
                  </span>
                  {i < arr.length - 1 ? <span aria-hidden="true" className="mt-1 w-px flex-1 bg-[rgba(15,29,74,0.15)]" /> : null}
                </div>
                <div className="pb-1">
                  <p className="text-[1rem] font-bold leading-[1.5] text-[#0b1d4a]">{s.title}</p>
                  <p className="mt-1 text-[0.88rem] leading-[1.85] text-[#475569]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.86rem] leading-[1.8] text-[#475569]">
            合計 <strong className="font-bold text-[#0b1d4a]">1日20〜30分</strong> ほど。部活や習い事があっても、スキマ時間で続けられます。
          </p>
        </Container>
      </section>

      {/* 主役＝教材 */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">Materials · 教材のこと</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
              武器は、著者が書き下ろした教材。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              市販の寄せ集めではありません。16冊を刊行した開発者が「理解で解く」設計で書き下ろし、毎日サイズに分割。この1冊を最後までやり切ることが、いちばんの近道です。
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
            {[
              { label: "自作オリジナル", body: "16冊を刊行した開発者が書き下ろし。市販の寄せ集めにはない、一貫した設計。" },
              { label: "理解で解く", body: "暗記ではなく、現象・図・言葉・式を地続きに。初見の問題でも、自分で答案を組み立てられる。" },
              { label: "毎日サイズ", body: "1回10〜20分に分割。約100日で1冊、無理なく最後までやり切れる大きさに。" },
            ].map((m, i) => (
              <div key={m.label} className="rounded-[16px] bg-white p-5 ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_20px_38px_-34px_rgba(11,29,74,0.5)]">
                <p className="flex items-center gap-2 text-[0.98rem] font-extrabold text-[#0b1d4a]">
                  <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-[#1d4ed8] text-[0.74rem] font-black text-white">{i + 1}</span>
                  {m.label}
                </p>
                <p className="mt-2.5 text-[0.86rem] leading-[1.85] text-[#475569]">{m.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.84rem] leading-[1.8] text-[#475569]">
            授業はしません。自分の手で解いて、著者本人に毎日見てもらう。だから「分かったつもり」で止まらず、1冊をやり切れます。
          </p>
        </Container>
      </section>

      {/* しくみのFAQ */}
      <section className="bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">FAQ · しくみについて</p>
              <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2rem]">よくある質問</h2>
            </div>
            <ul className="mt-10 grid gap-3">
              {[
                { q: "1日どのくらいの時間がかかりますか？", a: "1回10〜20分で取り組める大きさに課題を分割しています。提出後の自己採点や、翌日の添削の見直しを含めても、1日20〜30分ほどが目安です。部活や習い事があっても続けやすい設計です。" },
                { q: "提出はどのくらいの頻度ですか？", a: "毎日1枚の提出を基本にしています。ペースは生活に合わせて調整でき、忙しい日は休んでも、連続記録の仕組みで自然と戻ってこられます。" },
                { q: "添削はいつ返ってきますか？", a: "提出と同時に解答・解説が届くのでその場で自己採点でき、先生の添削は翌日までに返却することを基本にしています（運用日程の詳細は申し込み時にご案内します）。" },
                { q: "面談や授業（ライブ指導）はありますか？", a: "現状、対面・オンラインの面談や授業は行っていません。自分のペースで教材を進め、提出した答案に毎日の添削が入る——その繰り返しに集中しています。" },
                { q: "続けられるか不安です。", a: "「続けられない」を設計で解くのがノビットです。毎日1枚の自動配信で迷いをなくし、連続記録・はなまる・称号で小さな達成を可視化。出せば必ず返ってくる往復が、継続を後押しします。" },
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
        </Container>
      </section>

      {/* 関連ページ＋CTA */}
      <section className="bg-white">
        <Container className="px-6 pb-20 pt-4 sm:pb-28">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/app" className="group rounded-[18px] bg-[#f8fafc] p-6 ring-1 ring-[rgba(15,29,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_44px_-34px_rgba(15,29,74,0.4)]">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0f766e]">App</p>
                <p className="mt-1 text-[1.05rem] font-extrabold text-[#0b1d4a] group-hover:text-[#0f766e]">公式アプリのくわしい説明 →</p>
                <p className="mt-1.5 text-[0.86rem] leading-[1.8] text-[#475569]">習慣化のエンジン。課題配信・添削返却・保護者ビューまで。</p>
              </Link>
              <Link href="/materials" className="group rounded-[18px] bg-[#f8fafc] p-6 ring-1 ring-[rgba(15,29,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_44px_-34px_rgba(15,29,74,0.4)]">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#f97316]">Materials</p>
                <p className="mt-1 text-[1.05rem] font-extrabold text-[#0b1d4a] group-hover:text-[#0f766e]">教材のくわしい説明 →</p>
                <p className="mt-1.5 text-[0.86rem] leading-[1.8] text-[#475569]">公式教材と『考える力を育てる』シリーズ、設計思想まで。</p>
              </Link>
            </div>
            <div className="mt-12">
              <PageCtaRow title="しくみが分かったら、あとは始めるだけ。" note="必要な教材を選ぶだけ。むずかしい設定も、長い契約もありません。" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
