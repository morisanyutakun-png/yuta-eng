import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PreviewCta } from "@/components/mock-exams/preview-cta";
import { RubricSample } from "@/components/mock-exams/rubric-sample";
import { verifyPurchase } from "@/lib/mock-exams/access";
import { getExam } from "@/lib/mock-exams/catalog";
import { hasDownloadSecret, isStoreEnabled, signDownload } from "@/lib/mock-exams/env";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ご購入完了・PDFダウンロード｜模試演習ストア",
  robots: { index: false, follow: false },
};

const REASON_MESSAGES: Record<string, { heading: string; body: string }> = {
  invalid: {
    heading: "決済情報を確認できませんでした",
    body: "URL の決済セッション ID（session_id）が正しくないか、有効でない形式です。購入確認メールに記載のリンクから開き直してください。",
  },
  mismatch: {
    heading: "別の商品の決済セッションです",
    body: "指定された決済セッションは、このページの模試のものではありません。購入確認メールのリンクをご確認ください。",
  },
  pending: {
    heading: "お支払いの確認中です",
    body: "まだ決済の完了が確認できていません。カード決済の直後の場合は数秒おいてページを再読み込みしてください。",
  },
  refunded: {
    heading: "返金済みのご注文です",
    body: "このご注文は返金処理が完了しているため、PDF のダウンロードはできません。",
  },
  failed: {
    heading: "決済が完了していません",
    body: "決済画面の有効期限が切れたか、お支払いが完了していません。模試の詳細ページから改めてお手続きください。",
  },
  expired: {
    heading: "ダウンロード期間を過ぎています",
    body: "ご購入後の再ダウンロード可能期間を過ぎています。ご不明な点はお問い合わせください。",
  },
  unavailable: {
    heading: "ただいま決済確認を行えません",
    body: "サーバー側の決済設定が未完了のため確認できません。時間をおいて再度お試しください。",
  },
};

export default async function MockExamViewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  if (!isStoreEnabled()) notFound();
  const { id } = await params;
  const query = await searchParams;
  const rawSession = Array.isArray(query.session_id) ? query.session_id[0] : query.session_id;

  const exam = getExam(id);
  if (!exam) notFound();

  const access = await verifyPurchase(exam.id, rawSession);

  if (!access.ok) {
    const info = REASON_MESSAGES[access.reason] ?? REASON_MESSAGES.invalid;
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
          <Link href={`/mock-exams/${exam.id}`} className="hover:text-navy">
            {exam.shortTitle}
          </Link>
        </nav>

        <div className="sec-rule mt-3" />

        <section className="mt-8 border border-rule bg-white p-6 sm:p-8">
          <p className="eyebrow">アクセス確認</p>
          <h1 className="serif h-sect mt-1.5 text-ink">{info.heading}</h1>
          <p className="prose-ja mt-3 text-[0.93rem] leading-[1.9] text-ink-2">{info.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {access.reason === "pending" && rawSession ? (
              <a
                href={`/mock-exams/${exam.id}/view?session_id=${encodeURIComponent(rawSession)}`}
                className="btn btn-primary"
              >
                もう一度確認する
              </a>
            ) : null}
            <Link href={`/mock-exams/${exam.id}`} className="btn">
              {exam.shortTitle}の詳細ページへ戻る
            </Link>
            <Link href="/mock-exams" className="btn">
              模試一覧へ
            </Link>
          </div>
        </section>

        <PreviewCta moshiId={exam.moshiId} className="mt-14" />
      </div>
    );
  }

  const canSign = hasDownloadSecret();
  const fmtDate = (d: Date) =>
    d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });

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
        <Link href={`/mock-exams/${exam.id}`} className="hover:text-navy">
          {exam.shortTitle}
        </Link>
        <span className="mx-1.5 text-rule">／</span>
        <span className="text-ink-2">ダウンロード・解説</span>
      </nav>

      <div className="sec-rule mt-3" />

      <header className="border-b border-rule pb-7 pt-6">
        <p className="eyebrow">決済完了・ご購入者専用ページ</p>
        <h1 className="serif h-page mt-1.5 text-ink">{exam.title}</h1>
        <p className="prose-ja mt-3 text-[0.95rem] leading-[1.9] text-ink-2">
          ご購入ありがとうございます。下のボタンから「問題冊子・所定解答用紙・解答解説・採点基準」の
          印刷用A4 PDFをダウンロードできます。このページのURLをブックマークしておくと、
          <strong className="font-semibold text-ink">{fmtDate(access.expiresAt)}</strong>
          まで何度でも再ダウンロードできます（他の方への共有はご遠慮ください）。
        </p>
      </header>

      <section aria-labelledby="dl-heading" className="mt-10">
        <h2 id="dl-heading" className="rule-mark serif h-sect text-ink">
          1．印刷用A4 PDFのダウンロード（4点セット）
        </h2>
        <p className="prose-ja mt-2.5 text-[0.88rem] leading-[1.85] text-ink-2">
          各ダウンロードリンクの有効期限は15分です。期限が切れた場合は、このページを再読み込みすると新しいリンクが発行されます。
          印刷する際は「A4・原寸（100%・拡大縮小なし）」を選んでください。
        </p>

        {!canSign ? (
          <p role="alert" className="mt-4 border border-accent bg-accent-bg p-4 text-[0.88rem] font-semibold text-accent">
            サーバーの署名鍵（STORE_DOWNLOAD_SECRET）が未設定のため、現在ダウンロードリンクを発行できません。
          </p>
        ) : (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {exam.files.map((f, idx) => {
              const token = signDownload({ s: access.sessionId, e: exam.id, f: f.key });
              return (
                <li key={f.key} className="flex flex-col justify-between border border-rule bg-white p-5">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="serif text-[0.8rem] text-[var(--sec)]">PDF 0{idx + 1}</span>
                      {f.pages ? <span className="text-[0.78rem] text-ink-3">A4・{f.pages}ページ</span> : null}
                    </div>
                    <h3 className="mt-1 text-[1.02rem] font-semibold text-ink">{f.label}</h3>
                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-2">{f.note}</p>
                  </div>
                  <div className="mt-4 pt-2">
                    <a
                      href={`/api/mock-exams/download?t=${encodeURIComponent(token)}`}
                      className="btn btn-primary w-full"
                    >
                      {f.label}（PDF）をダウンロード
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="guide-heading" className="mt-14">
        <h2 id="guide-heading" className="rule-mark serif h-sect text-ink">
          2．本番と同じ条件で解き、採点基準で自己採点する手順
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          <li className="border border-rule bg-white p-5">
            <h3 className="text-[0.93rem] font-semibold text-ink">Step 1：所定解答用紙に時間を計って書く</h3>
            <p className="prose-ja mt-2 text-[0.85rem] leading-[1.85] text-ink-2">
              試験時間（{exam.minutes}分）を計り、「問題冊子」と「所定解答用紙」だけを手元に置いて解きます。
              頭の中で解けたことにせず、解答用紙の枠内に最後まで清書してください。
            </p>
          </li>
          <li className="border border-rule bg-white p-5">
            <h3 className="text-[0.93rem] font-semibold text-ink">Step 2：加点行・減点行（×）で厳密に採点</h3>
            <p className="prose-ja mt-2 text-[0.85rem] leading-[1.85] text-ink-2">
              「採点基準」PDFを開き、自分の答案に実際に書いてある段階だけを加点し、
              続く「×」の行（場合分けの境界抜け・同値性の説明不足など）に当たるものを引いて小問ごとの得点を解答用紙の採点欄に記入します。
            </p>
          </li>
          <li className="border border-rule bg-white p-5">
            <h3 className="text-[0.93rem] font-semibold text-ink">Step 3：解答・解説で答案の書き方を照合</h3>
            <p className="prose-ja mt-2 text-[0.85rem] leading-[1.85] text-ink-2">
              「解答・解説」PDFの論述答案と自分の答案を見比べ、減点された箇所をどう書けばよかったかを赤で書き直します。
            </p>
          </li>
        </ol>
      </section>

      <section aria-labelledby="rubric-preview-heading" className="mt-14">
        <h2 id="rubric-preview-heading" className="rule-mark serif h-sect text-ink">
          3．採点基準・解説の読み方（大問1抜粋）
        </h2>
        <p className="prose-ja mt-2.5 text-[0.88rem] leading-[1.85] text-ink-2">
          全大問・全小問の完全な解答解説および採点基準は、上の「解答・解説」「採点基準」PDFに収録しています。
        </p>
        <div className="mt-4">
          <RubricSample sample={exam.rubricSample} />
        </div>
      </section>

      <PreviewCta moshiId={exam.moshiId} className="mt-16" />
    </div>
  );
}

