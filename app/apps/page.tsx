import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { apps } from "@/data/apps";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "アプリ一覧｜Lumora が紹介する学習支援Webアプリ",
  description:
    "Lumora が公式に紹介する学習支援Webアプリ一覧。教材作成AIで人気の Eddivom、IT基礎学習の IT Pass、物理学習の Physics をまとめて確認できます。",
  keywords: [
    "学習支援Webアプリ",
    "教材作成AI アプリ",
    "Eddivom",
    "IT Pass",
    "物理 アプリ",
  ],
  path: "/apps",
});

export default function AppsPage() {
  return (
    <Container className="px-4 sm:px-6">
      <header className="mx-auto mt-6 max-w-3xl text-center sm:mt-12">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
          Apps
        </p>
        <h1 className="mt-3 text-balance font-serif text-[1.85rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-[2.4rem] sm:leading-[1.32]">
          学んだことを、そのまま手を動かす場所へ。
        </h1>
        <p className="mt-4 text-pretty text-[0.95rem] leading-[1.95] text-slate-600 sm:text-[1.05rem] sm:leading-[2]">
          Lumora が公式に紹介する学習支援Webアプリの一覧です。記事で整理した考え方を、実際の問題演習や教材制作につなげるための入口としてお使いください。
        </p>
      </header>

      <ul className="mx-auto mt-8 grid max-w-5xl gap-3 sm:mt-12 lg:grid-cols-3">
        {apps.map((app) => (
          <li
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_45px_-44px_rgba(15,23,42,0.45)] sm:rounded-[1.4rem] sm:p-5"
            key={app.name}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-[1.15rem] font-bold tracking-[-0.01em] text-slate-950 sm:text-[1.25rem]">
                {app.name}
              </h2>
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[0.65rem] font-bold text-amber-800">
                {app.status}
              </span>
            </div>
            <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-sky-700">
              {app.category}
            </p>
            <p className="mt-3 text-[0.95rem] font-bold leading-[1.6] text-slate-800">
              {app.comparison}
            </p>
            <p className="mt-3 text-[0.88rem] leading-[1.85] text-slate-600">
              {app.description}
            </p>
            <div className="mt-4 rounded-xl bg-slate-50 p-3.5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                向いている人
              </p>
              <p className="mt-1.5 text-[0.85rem] leading-[1.7] text-slate-700">
                {app.audience}
              </p>
            </div>
            <ButtonLink className="mt-4 w-full" external href={app.href}>
              {app.ctaLabel} ↗
            </ButtonLink>
          </li>
        ))}
      </ul>

      <section className="mx-auto my-12 max-w-4xl rounded-3xl bg-gradient-to-br from-sky-50 via-white to-amber-50 p-5 sm:my-16 sm:rounded-[1.6rem] sm:p-8">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
          For Visitors
        </p>
        <h2 className="mt-2 font-serif text-[1.4rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-[1.7rem]">
          アプリの背景や使い方は、ブログとプロフィールで補足しています。
        </h2>
        <p className="mt-3 text-[0.92rem] leading-[1.9] text-slate-600">
          アプリを使う前に、教材作成や学習支援の考え方を読んでおくと、より自然に使い始められます。気になる入口から開いてみてください。
        </p>
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <ButtonLink className="w-full sm:w-auto" href="/blog">
            ブログを読む
          </ButtonLink>
          <ButtonLink className="w-full sm:w-auto" href="/about" variant="secondary">
            Lumora について
          </ButtonLink>
        </div>
      </section>

    </Container>
  );
}
