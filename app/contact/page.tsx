import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "相談する｜Lumora お問い合わせ",
  description:
    "Lumora への相談・お問い合わせはこちらから。教材設計、AI教材作成、学習支援Webアプリの企画やサイト相談などをメールで受け付けています。",
  keywords: [
    "Lumora 相談",
    "教材作成 相談",
    "AI教材 制作 依頼",
    "学習支援Webアプリ 開発",
  ],
  path: "/contact",
});

const topics = [
  "高校物理の教材・授業設計の相談",
  "AIとLaTeXを使った教材制作の導入",
  "学習支援Webアプリの企画/UI 相談",
  "教育系メディア・ブログ運用の相談",
  "EdTech 領域での協業・寄稿のご依頼",
];

const flow = [
  {
    label: "01",
    title: "メールで概要を送る",
    body: "テーマ、ご希望の範囲、目安スケジュールを教えてください。1営業日以内に返信します。",
  },
  {
    label: "02",
    title: "オンライン or テキストで擦り合わせ",
    body: "30分の通話 or 非同期テキストで、ゴールと制約を整理します。NDA が必要な場合はお知らせください。",
  },
  {
    label: "03",
    title: "見積もり/方針提案 → 開始",
    body: "範囲・進め方・概算費用を文書でお渡しし、合意の上で着手します。",
  },
];

export default function ContactPage() {
  return (
    <Container className="px-4 sm:px-6">
      <header className="mx-auto mt-6 max-w-3xl text-center sm:mt-12">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
          Contact
        </p>
        <h1 className="mt-3 text-balance font-serif text-[1.85rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-[2.4rem] sm:leading-[1.32]">
          まずは、気になっていることを<br className="hidden sm:block" />
          一行送ってください。
        </h1>
        <p className="mt-4 text-pretty text-[0.95rem] leading-[1.95] text-slate-600 sm:text-[1.05rem] sm:leading-[2]">
          Lumora は教材設計・AI教材制作・学習Webアプリの相談を受け付けています。「ここから話せばよい」ではなく、現状の困りごとをそのまま書いていただければ大丈夫です。
        </p>
      </header>

      <section className="mx-auto mt-8 grid max-w-4xl gap-4 sm:mt-10 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-5 sm:rounded-[1.6rem] sm:p-7">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
            メールで相談する
          </p>
          <h2 className="mt-2 font-serif text-[1.35rem] font-bold leading-[1.45] tracking-[-0.01em] text-slate-950 sm:text-[1.55rem]">
            連絡先
          </h2>
          <a
            className="mt-4 inline-block break-all rounded-xl bg-slate-50 px-3 py-2.5 text-[0.95rem] font-bold text-slate-950 underline decoration-sky-300 decoration-2 underline-offset-4 transition hover:bg-sky-50 hover:decoration-sky-600 sm:text-[1.05rem]"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>
          <p className="mt-3 text-[0.86rem] leading-[1.85] text-slate-600">
            初回返信は1営業日以内を目安にしています。土日祝は翌営業日になることがあります。
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <ButtonLink
              className="w-full sm:w-auto"
              external
              href={`mailto:${siteConfig.email}`}
            >
              メールを開く
            </ButtonLink>
            <ButtonLink className="w-full sm:w-auto" href="/about" variant="secondary">
              Lumora について
            </ButtonLink>
          </div>
        </article>

        <aside className="rounded-3xl bg-gradient-to-br from-slate-950 to-sky-900 p-5 text-white sm:rounded-[1.6rem] sm:p-7">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-300">
            相談しやすいテーマ
          </p>
          <ul className="mt-4 grid gap-2.5 text-[0.9rem] leading-[1.65]">
            {topics.map((topic) => (
              <li className="flex items-start gap-2 text-slate-100" key={topic}>
                <span aria-hidden="true" className="mt-0.5 text-amber-300">
                  ●
                </span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mx-auto my-12 max-w-4xl sm:my-16">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700 sm:text-center">
          進め方
        </p>
        <h2 className="mt-2 font-serif text-[1.4rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-center sm:text-[1.7rem]">
          相談から開始までの流れ
        </h2>
        <ul className="mt-6 grid gap-3 sm:gap-4 lg:grid-cols-3">
          {flow.map((item) => (
            <li
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:rounded-[1.4rem] sm:p-5"
              key={item.title}
            >
              <p className="font-mono text-[0.78rem] font-bold text-sky-800">
                {item.label}
              </p>
              <h3 className="mt-3 text-[1rem] font-bold tracking-[-0.01em] text-slate-950">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.88rem] leading-[1.85] text-slate-600">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
