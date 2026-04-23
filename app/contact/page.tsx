import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact | 教材制作・学習支援Webアプリの相談",
  description:
    "物理教材制作、LaTeX教材作成、教育ICT、学習支援Webアプリ開発、Webサイト設計に関する相談・連絡のための yuta-eng.com お問い合わせページです。",
  keywords: [
    "教材制作 相談",
    "LaTeX教材作成 相談",
    "物理教材制作",
    "学習支援Webアプリ開発",
    "教育ICT Webサイト",
  ],
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container>
      <Section className="pb-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Contact
            </p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.08em] text-slate-950 sm:text-6xl">
              物理教材制作・LaTeX教材作成・学習支援Webアプリの相談窓口。
            </h1>
          </div>
          <p className="text-lg leading-9 text-slate-600">
            現時点ではシンプルな連絡導線として用意しています。
            将来的にメールフォーム、外部フォーム、SNS、予約導線などへ接続しやすいよう、
            セクションを分けた構成にしています。
          </p>
        </div>
      </Section>

      <Section className="pt-8 pb-24">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-[2.5rem] border border-slate-200 bg-slate-950 p-8 text-white sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">
              Available Topics
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
              相談しやすい内容
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
              <li>教材制作やLaTeXを使った資料づくり</li>
              <li>物理学習コンテンツの構成や改善</li>
              <li>学習支援Webアプリやブランドサイトの設計</li>
              <li>ブログ、SEO、情報設計を含むWeb運用</li>
            </ul>
          </aside>

          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Message
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
              連絡先
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              まずはメールでの相談を想定しています。フォーム送信機能を追加する場合は、
              このページに Server Action、外部フォーム、またはメール送信サービスを接続できます。
            </p>
            <div className="mt-7 rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Email
              </p>
              <a
                className="mt-2 inline-block text-lg font-semibold text-slate-950 underline decoration-slate-300 transition hover:decoration-sky-500"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                実運用のメールアドレスに変更する場合は `data/site.ts` を編集してください。
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink external href={`mailto:${siteConfig.email}`}>
                メールで相談する
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary">
                Aboutを読む
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
