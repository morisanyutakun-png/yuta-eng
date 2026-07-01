import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { PageCtaRow, PrimaryCta, SecondaryCta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { AppMock } from "@/components/nobit-media";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createSoftwareAppJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = createPageMetadata({
  title: "公式アプリ「ノビットスタディ」｜課題配信・添削返却・進捗の見える化",
  description:
    "学習管理アプリ「ノビットスタディ」の詳しい説明。毎日の課題配信、答案の提出、翌日までの添削返却、連続記録・はなまる・称号で続く習慣化、保護者も同じ画面で進捗を確認。課題・提出・添削・進捗がアプリひとつで完結します。",
  keywords: ["ノビットスタディ アプリ", "学習管理アプリ", "添削 アプリ", "学習習慣 アプリ 保護者"],
  path: "/app",
});

const features = [
  { title: "今日の1枚が届く", body: "その日やる課題が毎日配信。「何をやろう」と迷わず、座ったらすぐ始められます。" },
  { title: "その場で提出", body: "解いた答案を、アプリからそのまま提出。途中式・考え方ごと、まるごと見てもらえます。" },
  { title: "解答・解説が即届く", body: "提出と同時に解答・解説が届くので、その場で自己採点。間違いをすぐ確認できます。" },
  { title: "翌日までに添削が返る", body: "先生の添削が翌日までに返却。途中式・減点ポイントまで、スマホで何度でも見返せます。" },
  { title: "がんばりメーター", body: "提出数・添削完了・連続日数を見える化。積み上がりが目に見えて、続けたくなります。" },
  { title: "はなまる・称号", body: "続けるほどはなまるや称号がたまるゲーミフィケーション。毎日の学習が自然と習慣に。" },
];

const habitPoints = [
  { title: "「今日やること」が決まっている", body: "毎日1枚の課題が自動で届くから、計画を立てる負担がありません。迷いをなくすことが、継続の第一歩です。" },
  { title: "小さな達成を、毎日積む", body: "連続記録・はなまる・称号で、小さな「できた」を可視化。手応えが次の1枚のモチベーションになります。" },
  { title: "出せば、必ず返ってくる", body: "提出した答案には必ず添削が返る。この往復があるから、独学のような「やりっぱなし」になりません。" },
];

export default function AppPage() {
  const appJsonLd = createSoftwareAppJsonLd({
    name: "ノビットスタディ（学習管理アプリ）",
    alternateName: ["Nobit Study App"],
    description:
      "毎日の課題配信・答案の提出・翌日までの添削返却・進捗の見える化を行う、ノビットスタディ 中高部の学習管理アプリ。保護者も同じ画面で進捗を確認できる。",
    url: new URL("/app", siteConfig.url).toString(),
    audience: "student",
  });

  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "ホーム", path: "/" },
            { name: "公式アプリ", path: "/app" },
          ]),
          appJsonLd,
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef6f6_100%)]">
        <Container className="px-6">
          <nav aria-label="パンくずリスト" className="pt-7 text-[0.78rem] text-[#94a3b8] sm:pt-9">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link className="transition hover:text-[#0f766e]" href="/">ホーム</Link></li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#475569]">公式アプリ</li>
            </ol>
          </nav>
          <div className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">App · 公式アプリ</p>
              <h1 className="mt-3 text-[2.1rem] font-extrabold leading-[1.2] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem]">
                学習も添削も、
                <br className="hidden sm:block" />
                アプリひとつで。
              </h1>
              <p className="mt-4 max-w-lg text-[1rem] leading-[1.95] text-[#334155]">
                課題・提出・添削・進捗を、専用アプリ「ノビットスタディ」に集約。
                <strong className="font-bold text-[#0b1d4a]">習慣化は根性ではなく、アプリの仕事</strong>。
                保護者も同じ画面で進捗を見守れます。
              </p>
              <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <PrimaryCta href="/apply">初月半額ではじめる</PrimaryCta>
                <SecondaryCta href="/how-it-works">ノビットのしくみ</SecondaryCta>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.2),transparent)] blur-2xl sm:h-96 sm:w-96"
              />
              <AppMock className="relative float-slow" />
            </div>
          </div>
        </Container>
      </section>

      {/* できること */}
      <section className="bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">Features · できること</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
              毎日の学習が、ここで完結する。
            </h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.title} className="rounded-[18px] bg-[#f8fafc] p-6 ring-1 ring-[rgba(15,29,74,0.06)]">
                <p className="flex items-center gap-2 text-[1rem] font-bold leading-[1.45] text-[#0b1d4a]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
                  {f.title}
                </p>
                <p className="mt-2 text-[0.88rem] leading-[1.85] text-[#475569]">{f.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 習慣化のしくみ */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">Habit · 続く理由</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
              「続けられない」を、設計で解く。
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 lg:grid-cols-3">
            {habitPoints.map((h) => (
              <div key={h.title} className="rounded-[20px] bg-white p-7 ring-1 ring-[rgba(15,29,74,0.06)]">
                <p className="text-[1.05rem] font-extrabold leading-[1.5] text-[#0b1d4a]">{h.title}</p>
                <p className="mt-2 text-[0.9rem] leading-[1.95] text-[#475569]">{h.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 保護者も安心 */}
      <section className="bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl rounded-[24px] bg-[#eef6f6] p-8 ring-1 ring-[rgba(13,148,136,0.18)] sm:p-10">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">For Parents · 保護者の方へ</p>
            <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[1.9rem]">
              同じ画面で、そっと見守れる。
            </h2>
            <p className="mt-4 text-[0.96rem] leading-[1.95] text-[#334155]">
              面談がなくても大丈夫。提出数・添削完了・連続日数を、保護者も同じアプリで確認できます。
              「今日はちゃんと出したかな？」が一目で分かるから、口を出しすぎずに見守れます。
            </p>
            <ul className="mt-5 grid gap-2 text-[0.92rem] leading-[1.85] text-[#334155] sm:grid-cols-2">
              {["提出・添削の状況がわかる", "連続記録で頑張りが見える", "勧誘・営業電話は一切なし", "いつでも科目の追加・解約OK"].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <PageCtaRow note="毎日続く仕組みを、今日から。科目ごとに選べます。" />
          </div>
        </Container>
      </section>
    </>
  );
}
