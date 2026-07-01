import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { PageCtaRow, PrimaryCta, SecondaryCta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
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
    color: "#1d4ed8",
    title: "自作のオリジナル教材",
    body: "市販の一般教材ではありません。16冊を刊行した開発者が「理解で解く」設計で書き下ろし、毎日少しずつ進む大きさに分割。今日やる分がいつも目の前にあります。",
    points: ["理解で解く設計思想", "毎日サイズに分割", "各分野へ順次拡大中"],
  },
  {
    tag: "習慣化",
    color: "#0d9488",
    title: "続く仕組みを、まるごと",
    body: "専用アプリが毎日1枚の課題を配信。連続記録・はなまる・称号で、勉強が自然と生活のリズムになります。「今日やること」が決まっているから続きます。",
    points: ["毎日1枚の課題配信", "連続記録・はなまる・称号", "保護者も進捗を確認"],
  },
  {
    tag: "添削",
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
  { mark: "①", title: "途中式の論理", body: "式と式のつながりを確認。どこで論理が飛んだか、説明が足りないかを具体的に指摘します。" },
  { mark: "②", title: "減点ポイント", body: "本番なら何点引かれるか。記号の定義漏れ・条件の書き落としなど、もったいない失点を洗い出します。" },
  { mark: "③", title: "考え方の筋道", body: "なぜその方針を選ぶのか。より速く確実な解き筋があれば、考え方そのものを提案します。" },
  { mark: "④", title: "次の一手", body: "弱点に合わせて、次に取り組む課題を提示。やみくもではなく、必要な順番で積み上げます。" },
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
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)]">
        <Container className="px-6">
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
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <PrimaryCta href="/apply">初月半額ではじめる</PrimaryCta>
              <SecondaryCta href="/app">公式アプリを見る</SecondaryCta>
            </div>
          </div>
        </Container>
      </section>

      {/* 3本柱 */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <Container className="relative px-6 py-16 sm:py-24">
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
                <span className="grid h-11 w-11 place-items-center rounded-[14px] text-[0.9rem] font-extrabold text-white" style={{ background: p.color }}>
                  {p.tag}
                </span>
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
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#ea580c]">Correction · 添削の中身</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
              「○×」では、終わらせない。
            </h2>
            <p className="mt-4 text-[0.96rem] leading-[1.95] text-[#475569]">
              提出した答案1枚から、次の4つが返ってきます。これが「やりっぱなし」をなくす中身です。
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {correction.map((c) => (
              <li key={c.title} className="rounded-[20px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.08)]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0b1d4a] text-[1rem] font-extrabold text-white">
                  {c.mark}
                </span>
                <p className="mt-4 text-[1.08rem] font-extrabold leading-[1.45] text-[#0b1d4a]">{c.title}</p>
                <p className="mt-2 text-[0.86rem] leading-[1.9] text-[#475569]">{c.body}</p>
              </li>
            ))}
          </ul>
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
              <PageCtaRow note="必要な科目を選ぶだけ。いまなら初月半額ではじめられます。" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
