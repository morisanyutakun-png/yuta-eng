import type { Metadata } from "next";

import { BlogBuilder } from "@/components/blog-builder";
import { Container } from "@/components/container";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Article Studio",
  description:
    "Lumora の運用者向けに、MDXブログ記事を生成するための非公開導線ツールです。",
  alternates: {
    canonical: "/studio",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioPage() {
  return (
    <Container>
      <Section
        description="このページはホームやナビには載せない運用ツールです。フォームで記事情報を入れると、content/blog に保存するMDXを生成できます。"
        eyebrow="Private Tool"
        title="Article Studio"
      >
        <div className="mb-8 rounded-[1.7rem] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950 sm:rounded-[2rem] sm:p-5">
          Vercel上の公開サイトからリポジトリへ直接書き込む機能は入れていません。
          生成したMDXを `content/blog` に追加してコミットする運用が、今のMVPでは安全で壊れにくいです。
        </div>
        <BlogBuilder />
      </Section>
    </Container>
  );
}
