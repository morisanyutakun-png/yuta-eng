import Link from "next/link";

import { examLevels, type MockExam } from "@/data/mock-exams";

/**
 * 一覧に並べる商品の札。
 *
 * 札の中で比べたいのは「どのレベルか・誰向けか・何題で何分か・いくらか」。
 * この4つを同じ位置に置き、札を横に見比べられるようにする。
 * 札全体を1つのリンクにして、指でもどこを押しても詳細に行けるようにする。
 */
export function ExamCard({ exam }: { exam: MockExam }) {
  const level = examLevels[exam.level];
  const onSale = exam.status === "on-sale";

  return (
    <Link href={`/mock-exams/${exam.id}`} className="card flex h-full flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="badge badge-navy">{level.label}</span>
        {onSale ? (
          <span className="badge">PDF・即時ダウンロード</span>
        ) : (
          <span className="badge badge-accent">販売開始前</span>
        )}
      </div>

      <h3 className="serif mt-3 text-[1.08rem] leading-snug text-ink">{exam.title}</h3>
      <p className="mt-1 text-[0.8rem] text-ink-3">{exam.edition}</p>

      <dl className="mt-4 grid grid-cols-[5.5em_1fr] gap-x-3 gap-y-1.5 text-[0.84rem] leading-relaxed">
        <dt className="text-ink-3">対象</dt>
        <dd className="text-ink">{exam.target.universities}</dd>
        <dt className="text-ink-3">偏差値帯</dt>
        <dd className="text-ink">{exam.target.deviation}</dd>
        <dt className="text-ink-3">形式</dt>
        <dd className="text-ink">
          {exam.minutes}分・大問{exam.daimonCount}題・{exam.fullMark}点満点
        </dd>
        <dt className="text-ink-3">範囲</dt>
        <dd className="text-ink">{exam.scope}</dd>
      </dl>

      <p className="prose-ja mt-4 text-[0.86rem] leading-[1.85] text-ink-2">{exam.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {exam.badges.map((b) => (
          <li key={b} className="badge">
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-end justify-between gap-3 border-t border-rule pt-4">
        <p className="text-ink">
          <span className="serif text-[1.35rem]">{exam.price.toLocaleString("ja-JP")}</span>
          <span className="ml-0.5 text-[0.8rem]">円（税込）</span>
        </p>
        <span className="text-[0.84rem] font-semibold text-navy">
          {onSale ? "内容と採点基準の見本を見る →" : "内容を見る →"}
        </span>
      </div>
    </Link>
  );
}

