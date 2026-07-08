import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { PageCtaRow, PrimaryCta, SecondaryCta } from "@/components/cta";
import { AppScreen, appSteps } from "@/components/app-screens";
import { Illust } from "@/components/nobit-media";
import { Blob, CtaDoodle, CurveDivider, DarkSectionDecor, PhoneBackdrop, SectionGlow } from "@/components/decor";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createSoftwareAppJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = createPageMetadata({
  title: "公式アプリ「ノビットスタディ」｜課題配信・添削返却・進捗の見える化",
  description:
    "学習管理アプリ「ノビットスタディ」の詳しい説明。教材ごとの課題表示、PDFへの書き込み提出、提出直後の解答解説と次の範囲、添削返却・再提出・進捗の見える化まで、アプリひとつで完結します。",
  keywords: ["ノビットスタディ アプリ", "学習管理アプリ", "添削 アプリ", "学習習慣 アプリ 保護者"],
  path: "/app",
});

const features = [
  { title: "今日の範囲が見える", body: "教材ごとに、いま取り組む範囲・採点待ち・再提出あり・合格数が分かります。" },
  { title: "PDFに書き込んで提出", body: "問題PDFを開いて、そのまま書き込み。スマホ・タブレット・紙、好きな形で提出できます。" },
  { title: "解答解説が即届く", body: "提出と同時に解答解説PDFと次の範囲が届くので、その場で自己採点しながら先へ進めます。" },
  { title: "添削・再提出を管理", body: "先生の添削返却、再提出が必要な範囲、コメントや点数をタブで分けて確認できます。" },
  { title: "がんばりメーター", body: "提出数・添削完了・合格数・連続日数を見える化。積み上がりが目に見えて、続けたくなります。" },
  { title: "はなまる・称号", body: "続けるほどはなまるや称号がたまるゲーミフィケーション。学習が自然と習慣に。" },
];

const habitPoints = [
  { title: "「次にやること」が決まっている", body: "提出すると次の範囲が届くから、返却待ちで学習が止まりません。迷いをなくすことが、継続の第一歩です。" },
  { title: "小さな達成を積む", body: "連続記録・はなまる・称号で、小さな「できた」を可視化。手応えが次の範囲へのモチベーションになります。" },
  { title: "出せば、必ず返ってくる", body: "提出した答案には添削が返る。次へ進む流れと直す流れが両方あるから、独学のような「やりっぱなし」になりません。" },
];

export default function AppPage() {
  const appJsonLd = createSoftwareAppJsonLd({
    name: "ノビットスタディ（学習管理アプリ）",
    alternateName: ["Nobit Study App"],
    description:
      "教材ごとの課題表示・PDF提出・提出直後の解答解説と次の範囲・添削返却・再提出・進捗の見える化を行う、ノビットスタディ 中高部の学習管理アプリ。保護者も同じ画面で進捗を確認できる。",
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
      <section className="relative overflow-hidden">
        {/* レイヤードなメッシュ背景（奥行き・上質感） */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 10% 6%, rgba(124,58,237,0.13), transparent 60%), radial-gradient(52% 46% at 94% 10%, rgba(13,148,136,0.17), transparent 60%), radial-gradient(46% 52% at 80% 96%, rgba(29,78,216,0.10), transparent 60%), linear-gradient(180deg, #ffffff 0%, #f4f8fc 100%)",
          }}
        />
        {/* 有機的なブロブ（色のインパクト） */}
        <Blob fill="#7c3aed" className="pointer-events-none absolute -right-24 -top-16 h-[26rem] w-[26rem] opacity-[0.2]" />
        <Blob fill="#0d9488" className="pointer-events-none absolute -left-32 top-[38%] h-[22rem] w-[22rem] opacity-[0.18]" />
        <Blob fill="#f97316" className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 opacity-[0.13]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,29,74,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,29,74,0.045) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 80% 70% at 74% 44%, #000 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 74% 44%, #000 30%, transparent 80%)",
          }}
        />
        <Container className="relative px-6">
          <nav aria-label="パンくずリスト" className="pt-7 text-[0.78rem] text-[#94a3b8] sm:pt-9">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link className="transition hover:text-[#0f766e]" href="/">ホーム</Link></li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#475569]">公式アプリ</li>
            </ol>
          </nav>
          <div className="grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-[0.72rem] font-bold tracking-[0.06em] text-[#6d28d9] shadow-[0_8px_20px_-12px_rgba(124,58,237,0.5)] ring-1 ring-[rgba(124,58,237,0.2)] backdrop-blur">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#7c3aed]" />
                公式アプリ「ノビットスタディ」
              </p>
              <h1 className="mt-5 text-[2.55rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#0b1d4a] sm:text-[3.35rem]">
                「今日、何やろう」
                <br />
                から、
                <span className="relative inline-block whitespace-nowrap">
                  <span className="bg-[linear-gradient(100deg,#7c3aed_0%,#1d4ed8_55%,#0d9488_100%)] bg-clip-text text-transparent">解放</span>
                  <span aria-hidden="true" className="absolute -bottom-1 left-0 h-[0.18em] w-full rounded-full bg-[linear-gradient(100deg,#7c3aed,#0d9488)] opacity-80" />
                </span>
                されよう。
              </h1>
              <p className="mt-6 max-w-lg text-[1.05rem] leading-[1.95] text-[#334155]">
                やること・提出・添削・成績、ぜんぶスマホの中に。
                <strong className="font-bold text-[#0b1d4a]">続けるのは、あなたの根性じゃなくてアプリの役目</strong>。
                おうちの人も、同じ画面でそっと見守れます。
              </p>
              <div className="relative mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                {/* 手描きの誘導（人の手の気配） */}
                <CtaDoodle />
                <PrimaryCta href="/apply">買い切りではじめる</PrimaryCta>
                <SecondaryCta href="/how-it-works">ノビットのしくみ</SecondaryCta>
              </div>
              {/* トラストチップ（安心・信頼） */}
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {["入会金・追加費用0円", "買い切り・自動更新なし", "添削つき"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5 text-[0.82rem] font-semibold text-[#475569]">
                    <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full bg-[#0d9488] text-white">
                      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.3 4.3L19 7" /></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex justify-center py-4">
              <PhoneBackdrop />
              <AppScreen variant="home" className="relative z-10 float-slow" />
              {/* フローティング吹き出し（ガラス調で上質に） */}
              <div className="absolute -left-4 top-8 hidden -rotate-[5deg] rounded-[14px] bg-white/80 px-3.5 py-2.5 shadow-[0_22px_44px_-20px_rgba(11,29,74,0.55)] ring-1 ring-white/70 backdrop-blur-md sm:block">
                <p className="flex items-center gap-1.5 text-[0.72rem] font-extrabold text-[#0b1d4a]"><span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />今日の範囲</p>
                <p className="mt-0.5 text-[0.62rem] text-[#64748b]">迷う時間はゼロ</p>
              </div>
              <div className="absolute -right-4 top-1/2 hidden rotate-[5deg] rounded-[14px] bg-white/80 px-3.5 py-2.5 shadow-[0_22px_44px_-20px_rgba(11,29,74,0.55)] ring-1 ring-white/70 backdrop-blur-md sm:block">
                <p className="flex items-center gap-1.5 text-[0.72rem] font-extrabold text-[#0b1d4a]"><span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />返却・再提出</p>
                <p className="mt-0.5 text-[0.62rem] text-[#64748b]">点数・コメント</p>
              </div>
              <div className="absolute -bottom-1 left-6 hidden -rotate-3 rounded-[14px] bg-white/80 px-3.5 py-2.5 shadow-[0_22px_44px_-20px_rgba(11,29,74,0.55)] ring-1 ring-white/70 backdrop-blur-md sm:block">
                <p className="flex items-center gap-1.5 text-[0.72rem] font-extrabold text-[#0b1d4a]"><span className="h-1.5 w-1.5 rounded-full bg-[#1d4ed8]" />保護者も見れる</p>
              </div>
            </div>
          </div>
        </Container>
        <CurveDivider fill="#f8fafc" flip />
      </section>

      {/* できること */}
      <section className="relative overflow-hidden bg-[#f8fafc]">
        <SectionGlow className="-left-24 top-6" color="rgba(13,148,136,0.12)" />
        <SectionGlow className="-right-28 bottom-0" color="rgba(29,78,216,0.08)" />
        <Container className="relative px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">Features · できること</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
              ひらけば、やることが待ってる。
            </h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <li key={f.title} className="group rounded-[18px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-34px_rgba(15,29,74,0.4)]">
                <span className="inline-grid h-8 w-8 place-items-center rounded-[10px] bg-[#eef6f6] text-[0.8rem] font-extrabold text-[#0f766e]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-[1rem] font-bold leading-[1.45] text-[#0b1d4a]">{f.title}</p>
                <p className="mt-2 text-[0.88rem] leading-[1.85] text-[#475569]">{f.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 習慣化のしくみ（ダークな帯でコントラスト） */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] text-white">
        <CurveDivider fill="#f8fafc" />
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
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#5eead4]">Habit · 続く理由</p>
            <h2 className="mt-3 text-[1.8rem] font-extrabold leading-[1.3] sm:text-[2.3rem]">
              気づいたら、続いてる。
            </h2>
            <p className="mt-4 text-[0.96rem] leading-[1.95] text-white/80">
              「がんばる」に頼らない。続く人がやっていることを、アプリが全部肩代わりします。
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 lg:grid-cols-3">
            {habitPoints.map((h, i) => (
              <div key={h.title} className="relative overflow-hidden rounded-[20px] bg-white/[0.07] p-7 ring-1 ring-white/15 backdrop-blur-sm">
                <span className="text-[1.4rem] font-extrabold text-white/30">0{i + 1}</span>
                <p className="mt-1 text-[1.05rem] font-extrabold leading-[1.5]">{h.title}</p>
                <p className="mt-2 text-[0.9rem] leading-[1.95] text-white/75">{h.body}</p>
              </div>
            ))}
          </div>
        </Container>
        <CurveDivider fill="#ffffff" flip />
      </section>

      {/* 実画面で見る 4ステップ */}
      <section className="relative overflow-hidden bg-white">
        <SectionGlow className="-right-24 top-24" color="rgba(124,58,237,0.08)" />
        <SectionGlow className="-left-28 bottom-24" color="rgba(13,148,136,0.1)" />
        <Container className="relative px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">Screens · 実際のアプリ画面</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
              アプリの中を、のぞいてみよう。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              今日の範囲を開く → PDFに書き込んで提出 → 解答解説で自己採点 → 返却・再提出も記録。実際の画面でご紹介します。
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-y-16">
            {appSteps.map((s, i) => (
              <div
                key={s.no}
                className={`grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-12 ${i % 2 === 1 ? "lg:grid-cols-[1fr_auto]" : ""}`}
              >
                <div className={`flex justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <AppScreen variant={s.variant} />
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0b1d4a] px-3 py-1 text-[0.72rem] font-extrabold tracking-[0.08em] text-white">
                    STEP {s.no}
                  </span>
                  <p className="mt-3 text-[1.3rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[1.5rem]">{s.title}</p>
                  <p className="mt-2 text-[0.95rem] leading-[1.95] text-[#334155]">{s.lead}</p>
                  <ul className="mt-4 grid gap-2">
                    {s.facts.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[0.9rem] leading-[1.8] text-[#475569]">
                        <span aria-hidden="true" className="mt-[0.4em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-14 max-w-2xl text-center text-[0.82rem] leading-[1.8] text-[#94a3b8]">
            ※ 掲載画面はデモ環境での実際の表示例をもとにした再現です。
          </p>
        </Container>
      </section>

      {/* 対応環境・通知 */}
      <section className="relative overflow-hidden bg-[#f8fafc]">
        <SectionGlow className="-left-24 top-8" color="rgba(29,78,216,0.1)" />
        <Container className="relative px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">Environment · 使える環境</p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2.2rem]">
              やる気になった、その瞬間に。
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-3">
            {[
              { t: "アプリのインストール不要", b: "Webブラウザで動くので、面倒な設定なし。決済後の案内に沿ってログインすれば、すぐに使い始められます。" },
              { t: "スマホ・タブレット・PC対応", b: "iPhone / Android / パソコンの最新ブラウザに対応。移動中はスマホ、家ではPCと、使い分けられます。" },
              { t: "課題・添削のお知らせ", b: "次の課題や添削の返却をお知らせ。「やり忘れ」を防ぎ、学習リズムづくりを助けます。" },
            ].map((c) => (
              <div key={c.t} className="rounded-[20px] bg-white p-7 ring-1 ring-[rgba(15,29,74,0.06)]">
                <p className="text-[1.05rem] font-extrabold leading-[1.5] text-[#0b1d4a]">{c.t}</p>
                <p className="mt-2 text-[0.9rem] leading-[1.9] text-[#475569]">{c.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* アプリのFAQ */}
      <section className="bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">FAQ · アプリについて</p>
              <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.35] text-[#0b1d4a] sm:text-[2rem]">よくある質問</h2>
            </div>
            <ul className="mt-10 grid gap-3">
              {[
                { q: "アプリのダウンロードは必要ですか？", a: "いいえ。Webブラウザで動くので、アプリストアからのインストールは不要です。決済後のご案内に沿ってログインするだけで使い始められます。" },
                { q: "どの端末で使えますか？", a: "iPhone・Android のスマホ／タブレット、パソコンの最新ブラウザに対応しています。移動中はスマホ、家ではPCなど、使い分けられます。" },
                { q: "保護者も見られますか？", a: "はい。提出数・添削完了・連続日数などを、保護者の方も同じ画面で確認できます。面談がなくても、お子さまの取り組みをそっと見守れます。" },
                { q: "提出した答案や学習データはどう扱われますか？", a: "答案・進捗などの学習データは、サービスの提供と品質向上のために適切に管理します。詳しくはプライバシーポリシーをご確認ください。" },
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

      {/* 保護者も安心 */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto grid max-w-4xl items-center gap-8 rounded-[24px] bg-[#eef6f6] p-8 ring-1 ring-[rgba(13,148,136,0.18)] sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">For Parents · 保護者の方へ</p>
              <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[1.9rem]">
                同じ画面で、そっと見守れる。
              </h2>
              <p className="mt-4 text-[0.96rem] leading-[1.95] text-[#334155]">
                面談がなくても大丈夫。提出数・添削完了・連続日数を、保護者も同じアプリで確認できます。
                「今日はちゃんと出したかな？」が一目で分かるから、口を出しすぎずに見守れます。
              </p>
              <ul className="mt-5 grid gap-2 text-[0.92rem] leading-[1.85] text-[#334155] sm:grid-cols-2">
                {["提出・添削の状況がわかる", "連続記録で頑張りが見える", "勧誘・営業電話は一切なし", "教材はいつでも追加できる"].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[20px] bg-white shadow-[0_34px_60px_-40px_rgba(11,29,74,0.5)] ring-1 ring-[rgba(13,148,136,0.2)]">
              <Illust
                base="parent-child"
                widths={[520, 1040]}
                width={1254}
                height={1254}
                alt="スマホの学習進捗を一緒に見る保護者と中高生のイラスト"
                sizes="(min-width: 1024px) 320px, 80vw"
                className="block h-auto w-full"
              />
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <PageCtaRow title="アプリひとつで、学習が続く。" note="課題・提出・添削・進捗まで、これひとつ。教材ごとに選べて、買い切り・自動更新なし。" />
          </div>
        </Container>
      </section>
    </>
  );
}
