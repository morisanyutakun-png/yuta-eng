import type { ReactNode } from "react";

import { Container } from "@/components/container";
import { legalInfo, legalHasPlaceholder } from "@/data/legal";

/** [要記入] が残るときだけ出す、運営者向けの注意（公開前チェック用）。 */
export function PlaceholderNotice() {
  const hasPlaceholder = [
    legalInfo.sellerName,
    legalInfo.address,
    legalInfo.phone,
  ].some(legalHasPlaceholder);
  if (!hasPlaceholder) return null;
  return (
    <div className="mb-8 rounded-[14px] bg-[#fff7ed] px-5 py-4 text-[0.84rem] leading-[1.85] text-[#9a3412] ring-1 ring-[rgba(234,88,12,0.25)]">
      <strong className="font-bold">【公開前の確認用・運営者へ】</strong>
      まだ <code className="rounded bg-white px-1 font-semibold">[要記入]</code> の項目があります。
      <code className="rounded bg-white px-1 font-semibold">data/legal.ts</code> を編集し、
      事業者名・所在地・電話番号などを正確に記入してから公開してください（この案内は記入が完了すると自動的に消えます）。
    </div>
  );
}

export function LegalPage({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-white">
      <section className="bg-[linear-gradient(180deg,#f3f8ff_0%,#ffffff_100%)]">
        <Container className="px-6 pt-14 pb-8 sm:pt-20 sm:pb-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-[1.7rem] font-extrabold leading-[1.3] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.2rem]">
              {title}
            </h1>
            <p className="mt-4 text-[0.95rem] leading-[1.95] text-[#475569]">{lead}</p>
            <p className="mt-4 text-[0.78rem] text-[#94a3b8]">
              制定日：{legalInfo.established}／最終改定日：{legalInfo.lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      <Container className="px-6 pb-24 pt-10">
        <div className="mx-auto max-w-3xl">
          <PlaceholderNotice />
          {children}
        </div>
      </Container>
    </article>
  );
}

/** 見出し＋本文の節（プライバシー・返金ポリシー用）。 */
export function LegalSection({
  no,
  title,
  children,
}: {
  no: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[rgba(15,29,74,0.08)] py-7 first:border-t-0 first:pt-0">
      <h2 className="flex gap-2.5 text-[1.1rem] font-extrabold leading-[1.5] text-[#0b1d4a]">
        <span className="text-[#0d9488]">{no}.</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[0.92rem] leading-[1.95] text-[#334155]">
        {children}
      </div>
    </section>
  );
}

/** 定義リストの1行（特商法表記用）。 */
export function LegalRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-[rgba(15,29,74,0.08)] py-5 sm:grid-cols-[200px_1fr] sm:gap-6">
      <dt className="text-[0.88rem] font-bold text-[#0b1d4a]">{label}</dt>
      <dd className="text-[0.92rem] leading-[1.95] text-[#334155]">{children}</dd>
    </div>
  );
}
