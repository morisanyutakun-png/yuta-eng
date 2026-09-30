import Link from "next/link";

import { shindan } from "@/lib/series";

export type Stage = "undecided" | "shindan" | "kansei" | "gotoku";

/**
 * 学習段階のナビ。サイトの教材を「志望校未決定 → 志望校診断模試 → 分野別完成演習 → 合格答案をつくる」
 * の順に並べ、どのページからも前後の段階へ移れるようにする。
 *
 * 順番は原稿どおり。完成演習の「はじめに」は
 * 「基礎・標準問題集 → 本書 → 過去問演習・『合格答案をつくる』」、
 * 診断模試の最終判定は「第1志望候補が決まったら、その大学の完成演習に進む。過去問はそのあと」と書いている。
 *
 * slug を渡すと、完成演習・合格答案をつくるの段をその大学のページへ直接つなぐ。
 */
export function LearningPath({
  current,
  slug,
  kanseiPublished = false,
  heading = "学習の段階から教材を選ぶ",
  className = "",
  compact = false,
}: {
  current?: Stage;
  slug?: string;
  /** その大学の完成演習が公開済みか（未公開なら一覧へつなぐ） */
  kanseiPublished?: boolean;
  heading?: string;
  className?: string;
  /** 説明文を省いて1段1行にする（トップ・大学別分析のように、主役が別にあるページ用） */
  compact?: boolean;
}) {
  const steps: { key: Stage; no: string; label: string; body: string; hint: string; href: string; cta: string }[] = [
    {
      key: "undecided",
      no: "0",
      label: "志望校がまだ決まっていない",
      body: "標準問題は終えた。けれど、どの大学の過去問に進めばよいか分からない。まず大学ごとの出題の違いを知る。",
      hint: "まず大学ごとの出題の違いを知る",
      href: "/universities",
      cta: "大学別の出題分析を見る",
    },
    {
      key: "shindan",
      no: "1",
      label: "志望校診断模試",
      body: `${shindan.rounds}回の模試で「得点の形」を分析し、旧帝大・難関国公立の${shindan.universities.length}大学との相性を判定する。`,
      hint: `${shindan.rounds}回の模試で、${shindan.universities.length}大学との相性を判定`,
      href: "/shindan",
      cta: "志望校診断模試",
    },
    {
      key: "kansei",
      no: "2",
      label: "分野別完成演習",
      body: "志望校の頻出分野を、標準から本番水準まで段階的に。過去問に入る前の「間」を埋める。",
      hint: "志望校の頻出分野を、本番水準まで段階的に",
      href: slug && kanseiPublished ? `/kansei/${slug}` : "/kansei",
      cta: slug && kanseiPublished ? "この大学の完成演習" : "大学別の完成演習",
    },
    {
      key: "gotoku",
      no: "3",
      label: "合格答案をつくる",
      body: "本番と同じ形式の予想問題集。過去問演習と並べて使い、加点・減点つきの採点表で自分の答案を照合する。",
      hint: "本番と同じ形式の予想問題集で仕上げる",
      href: slug ? `/univ/${slug}#books` : "/universities",
      cta: slug ? "この大学の予想問題集" : "大学を選んで見る",
    },
  ];

  if (compact) {
    return (
      <nav aria-labelledby="path-heading" className={className}>
        <h2 id="path-heading" className="serif text-[1.05rem] text-ink">
          {heading}
        </h2>
        <ol className="mt-3 divide-y divide-rule border-y border-rule">
          {steps.map((s) => {
            const here = s.key === current;
            return (
              <li key={s.key}>
                <Link
                  href={s.href}
                  aria-current={here ? "step" : undefined}
                  className="group flex min-h-12 items-center gap-3 py-2.5 transition-colors hover:text-navy"
                >
                  <span
                    aria-hidden="true"
                    className={`serif flex size-6 shrink-0 items-center justify-center text-[0.8rem] tabular-nums ${
                      here ? "bg-navy text-white" : "border border-rule text-ink-3"
                    }`}
                  >
                    {s.no}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9rem] font-semibold leading-snug text-ink group-hover:text-navy">
                      {s.label}
                    </span>
                    <span className="block truncate text-[0.72rem] text-ink-3">{s.hint}</span>
                  </span>
                  {here ? (
                    <span className="shrink-0 text-[0.62rem] font-bold text-accent">いまここ</span>
                  ) : (
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5 shrink-0 text-ink-3" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-labelledby="path-heading" className={className}>
      <h2 id="path-heading" className="serif text-[1.05rem] text-ink">
        {heading}
      </h2>
      <ol className="mt-3 grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => {
          const here = s.key === current;
          return (
            <li key={s.key} className={here ? "bg-white" : "bg-paper"}>
              <Link
                href={s.href}
                aria-current={here ? "step" : undefined}
                className="group flex h-full flex-col px-4 py-3.5 transition-colors hover:bg-white"
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`serif flex size-6 shrink-0 items-center justify-center text-[0.8rem] tabular-nums ${
                      here ? "bg-navy text-white" : "border border-rule text-ink-3"
                    }`}
                  >
                    {s.no}
                  </span>
                  <span className="text-[0.88rem] font-semibold leading-snug text-ink">{s.label}</span>
                  {here && <span className="ml-auto shrink-0 text-[0.62rem] font-bold text-accent">いまここ</span>}
                </span>
                <span className="prose-ja mt-1.5 text-[0.76rem] leading-relaxed text-ink-2">{s.body}</span>
                {!here && (
                  <span className="mt-auto pt-2 text-[0.76rem] font-semibold text-navy underline decoration-navy/30 underline-offset-4 group-hover:decoration-navy">
                    {s.cta} →
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
