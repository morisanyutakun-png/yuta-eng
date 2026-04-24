import type { Metadata } from "next";

import { AppCard } from "@/components/app-card";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { StaggerReveal } from "@/components/stagger-reveal";
import { apps } from "@/data/apps";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "学習支援Webアプリ一覧 | Eddivom・IT Pass・Physics",
  description:
    "Eddivom、IT Pass、Physics など、yuta-eng.com が案内する既存の学習支援Webアプリ一覧です。各アプリは外部サービスとして紹介し、公式リンクへ案内します。",
  keywords: [
    "学習支援Webアプリ",
    "教育ICT アプリ",
    "Eddivom",
    "IT Pass",
    "Physics",
    "物理学習アプリ",
  ],
  path: "/apps",
});

export default function AppsPage() {
  return (
    <Container>
      <Section className="pb-10">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
            Apps
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-[-0.08em] text-slate-950 sm:text-5xl lg:text-6xl">
            学習支援Webアプリへの公式導線を、ひとつの場所に。
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:mt-6 sm:text-lg sm:leading-9">
            このページはアプリ本体ではなく、すでに存在する外部アプリを紹介する一覧ページです。
            yuta-eng.com はブランドサイト兼公式ハブとして、それぞれの学習支援アプリへ自然に案内します。
          </p>
        </div>
      </Section>

      <Section
        description="カード情報は `data/apps.ts` の配列から描画しているため、将来アプリを増やすときも同じデータ形式で追加できます。"
        eyebrow="Official App Hub"
        title="アプリ一覧"
      >
        <div className="mb-6 grid gap-3 sm:mb-8 lg:grid-cols-3">
          {apps.map((app) => (
            <article
              className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_20px_70px_-56px_rgba(15,23,42,0.62)] sm:rounded-[1.9rem]"
              key={app.name}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
                  {app.name}
                </h3>
                <span className="rounded-full bg-slate-950 px-3 py-1 text-[0.68rem] font-semibold text-white">
                  {app.category.split(" / ")[0]}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-800">
                {app.comparison}
              </p>
            </article>
          ))}
        </div>

        <StaggerReveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard app={app} key={app.href} />
          ))}
        </StaggerReveal>
      </Section>

      <Section className="pb-24">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:rounded-[2.5rem] sm:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                For Visitors
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl">
                アプリの背景や制作思想は Blog / About で読めます。
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                アプリを使う前に、教材制作や学習支援への考え方を知りたい場合は、
                About や Blog から読むと全体像を把握しやすくなります。
              </p>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink className="w-full sm:w-auto" href="/about" variant="secondary">
                Aboutへ
              </ButtonLink>
              <ButtonLink className="w-full sm:w-auto" href="/blog">
                Blogへ
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
