import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BuyPanel } from "@/components/mock-exams/buy-panel";
import { PdfPreviewStrip } from "@/components/mock-exams/pdf-preview-strip";
import { PreviewCta } from "@/components/mock-exams/preview-cta";
import { RubricSample } from "@/components/mock-exams/rubric-sample";
import { examLevels } from "@/data/mock-exams";
import { allExams, getExam, isOnSale, priceLabel } from "@/lib/mock-exams/catalog";
import { isStoreEnabled } from "@/lib/mock-exams/env";

export function generateStaticParams() {
  return allExams().map((e) => ({ id: e.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  if (!isStoreEnabled()) return { robots: { index: false, follow: false } };
  const { id } = await params;
  const exam = getExam(id);
  if (!exam) return {};
  const title = `${exam.title}｜模試演習ストア`;
  const description = `${exam.summary}（${exam.minutes}分・大問${exam.daimonCount}題・${exam.fullMark}点満点／問題冊子・所定解答用紙・解答解説・採点基準のA4 PDF 4点セット）`;
  return {
    title,
    description,
    alternates: { canonical: `/mock-exams/${exam.id}` },
    openGraph: { title, description, url: `/mock-exams/${exam.id}` },
  };
}

export default async function MockExamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isStoreEnabled()) notFound();
  const { id } = await params;
  const exam = getExam(id);
  if (!exam) notFound();

  const level = examLevels[exam.level];
  const onSale = isOnSale(exam);

  return (
    <div className="page page-wide mobile-compact">
      <nav aria-label="パンくず" className="breadcrumb pt-3 text-[0.75rem] text-ink-3">
        <Link href="/" className="hover:text-navy">
          トップ
        </Link>
        <span className="mx-1.5 text-rule">／</span>
        <Link href="/mock-exams" className="hover:text-navy">
          模試演習ストア
        </Link>
        <span className="mx-1.5 text-rule">／</span>
        <span className="text-ink-2">{exam.shortTitle}</span>
      </nav>

      <div className="sec-rule mt-3" />

      <header className="border-b border-rule pb-8 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge badge-navy">{level.label}</span>
          <span className="badge">{exam.edition}</span>
          {onSale ? (
            <span className="badge">印刷用A4 PDF・即時ダウンロード</span>
          ) : (
            <span className="badge badge-accent">販売開始前</span>
          )}
        </div>

        <h1 className="serif h-page mt-3 text-ink">{exam.title}</h1>
        <p className="prose-ja mt-3 text-[1rem] leading-[1.95] text-ink-2">{exam.summary}</p>

        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-rule py-4 text-[0.86rem] sm:grid-cols-4">
          <div>
            <dt className="text-[0.75rem] text-ink-3">試験時間・構成</dt>
            <dd className="mt-0.5 font-semibold text-ink">
              {exam.minutes}分・大問{exam.daimonCount}題（{exam.fullMark}点）
            </dd>
          </div>
          <div>
            <dt className="text-[0.75rem] text-ink-3">出題範囲</dt>
            <dd className="mt-0.5 font-semibold text-ink">{exam.scope}</dd>
          </div>
          <div>
            <dt className="text-[0.75rem] text-ink-3">対象・目安</dt>
            <dd className="mt-0.5 font-semibold text-ink">{exam.target.deviation}</dd>
          </div>
          <div>
            <dt className="text-[0.75rem] text-ink-3">価格</dt>
            <dd className="mt-0.5 font-semibold text-ink">{priceLabel(exam)}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a href="#purchase" className="btn btn-primary">
            {onSale ? `今すぐ受験する（${priceLabel(exam)}）` : "販売予定を確認する"}
          </a>
          <a href="#sample-rubric" className="btn">
            採点基準のサンプルを見る
          </a>
          {exam.previews?.length ? (
            <a href="#pdf-previews" className="btn">
              PDFの紙面見本を見る
            </a>
          ) : null}
        </div>
      </header>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_23rem]">
        <div className="min-w-0 space-y-14">
          <section aria-labelledby="aims-heading">
            <h2 id="aims-heading" className="rule-mark serif h-sect text-ink">
              この模試の狙い
            </h2>
            <div className="mt-4 space-y-3.5">
              {exam.aims.map((p, i) => (
                <p key={i} className="prose-ja text-[0.95rem] leading-[1.95] text-ink-2">
                  {p}
                </p>
              ))}
            </div>
            <dl className="mt-5 grid grid-cols-[6.5em_1fr] gap-x-4 gap-y-2 border border-rule bg-paper-2 p-4 text-[0.86rem]">
              <dt className="text-ink-3">想定する志望層</dt>
              <dd className="text-ink">{exam.target.universities}</dd>
              <dt className="text-ink-3">偏差値の目安</dt>
              <dd className="text-ink">{exam.target.deviation}</dd>
              <dt className="text-ink-3">対象学年</dt>
              <dd className="text-ink">{exam.target.audience}</dd>
            </dl>
          </section>

          <section aria-labelledby="structure-heading">
            <h2 id="structure-heading" className="rule-mark serif h-sect text-ink">
              大問構成・出題分野
            </h2>
            <div className="table-wrap mt-4">
              <table className="w-full min-w-[28rem] border-y border-rule text-[0.88rem]">
                <thead>
                  <tr className="border-b border-rule bg-paper-2 text-left text-[0.8rem] text-ink-2">
                    <th scope="col" className="py-2.5 pl-3 pr-3 font-semibold">
                      大問
                    </th>
                    <th scope="col" className="py-2.5 pr-4 font-semibold">
                      分野
                    </th>
                    <th scope="col" className="py-2.5 pr-4 font-semibold">
                      主題・ねらい
                    </th>
                    <th scope="col" className="py-2.5 pr-3 text-right font-semibold">
                      配点
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {exam.structure.map((row) => (
                    <tr key={row.no} className="border-b border-rule last:border-b-0">
                      <td className="py-2.5 pl-3 pr-3 font-semibold text-ink">第{row.no}問</td>
                      <td className="py-2.5 pr-4 text-ink">{row.field}</td>
                      <td className="py-2.5 pr-4 text-ink-2">{row.theme}</td>
                      <td className="py-2.5 pr-3 text-right font-semibold tabular-nums text-ink">{row.points}点</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[0.78rem] text-ink-3">扱う主なテーマ：</span>
              {exam.fields.map((f) => (
                <span key={f} className="badge">
                  {f}
                </span>
              ))}
            </div>
          </section>

          <section aria-labelledby="files-heading">
            <h2 id="files-heading" className="rule-mark serif h-sect text-ink">
              本番そっくりの所定解答用紙と、4つの印刷用A4 PDF
            </h2>
            <p className="prose-ja mt-3 text-[0.93rem] leading-[1.9] text-ink-2">
              白紙のノートではなく、<strong className="font-semibold text-ink">大問ごとに1枚の所定解答用紙（A4）</strong>
              に書く形式で演習できます。受験番号・氏名・得点欄に加え、小問ごとの採点欄を配置しており、
              「限られた枠の中に過不足なく論証を収める」練習と、採点基準に照らした自己採点がそのまま行えます。
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {exam.files.map((f) => (
                <li key={f.key} className="border border-rule bg-white p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[0.93rem] font-semibold text-ink">{f.label}（A4 PDF）</h3>
                    {f.pages ? <span className="text-[0.78rem] text-ink-3">見本 {f.pages}p</span> : null}
                  </div>
                  <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-2">{f.note}</p>
                </li>
              ))}
            </ul>
          </section>

          {exam.previews?.length ? (
            <section id="pdf-previews" aria-labelledby="previews-heading" className="scroll-mt-20">
              <h2 id="previews-heading" className="rule-mark serif h-sect text-ink">
                印刷用PDFの紙面見本（「合格答案をつくる」シリーズ準拠）
              </h2>
              <p className="prose-ja mt-3 text-[0.9rem] leading-[1.9] text-ink-2">
                既刊「合格答案をつくる」シリーズの組版・採点表の体裁をそのまま用いています。
                画像を押すと拡大して文字や罫線の組み方を確かめられます（見本は大問1のみ収録）。
              </p>
              <PdfPreviewStrip previews={exam.previews} title={exam.title} />
            </section>
          ) : null}

          <section id="sample-rubric" aria-labelledby="rubric-heading" className="scroll-mt-20">
            <h2 id="rubric-heading" className="rule-mark serif h-sect text-ink">
              採点基準のサンプル（大問1問分の一部）
            </h2>
            <p className="prose-ja mt-3 text-[0.92rem] leading-[1.9] text-ink-2">
              購入後にダウンロードできる「採点基準PDF」の抜粋です。
              答えが合っているかだけでなく、どの記述に何点与え、どの不備で何点引くか（×行）を小問ごとに定めています。
            </p>
            <div className="mt-4">
              <RubricSample sample={exam.rubricSample} />
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-6">
          <BuyPanel exam={exam} />
        </div>
      </div>

      <PreviewCta moshiId={exam.moshiId} className="mt-16" />
    </div>
  );
}

