import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DownloadIcon } from "@/components/mock-exams/icons";
import { PreviewCta } from "@/components/mock-exams/preview-cta";
import { RubricSample } from "@/components/mock-exams/rubric-sample";
import { verifyPurchase } from "@/lib/mock-exams/access";
import { getExam } from "@/lib/mock-exams/catalog-server";
import { hasDownloadSecret, isStoreEnabled, signDownload } from "@/lib/mock-exams/env";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ご購入完了・PDFダウンロード｜公式ストア",
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
  const fullToken = canSign ? signDownload({ s: access.sessionId, e: exam.id, f: "full" }) : null;

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
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>決済完了 ｜ ご購入者様専用ダウンロードページ</span>
        </div>
        <h1 className="serif h-page mt-2.5 text-ink">{exam.title}</h1>
        <p className="prose-ja mt-3 text-[0.95rem] leading-[1.9] text-ink-2">
          ご購入ありがとうございます。下のボタンから「問題冊子・所定解答用紙・解答解説・採点基準」の
          印刷用A4 PDFをダウンロードできます。このページのURLをブックマークしておくと、
          <strong className="font-semibold text-ink">{fmtDate(access.expiresAt)}</strong>
          まで何度でも再ダウンロードできます。
        </p>
        <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-3 text-[11.5px] text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">🔒 セキュリティ・透かし刻印について：</span>
          本教材PDFには不正転載・再配布防止のため、ご購入者様固有の注文識別番号（<code className="font-mono text-[11px] text-slate-500">{access.sessionId.slice(0, 18)}…</code>）および学習目的限定ライセンスが全ページに自動刻印されています。個人学習の範囲内でご活用ください。
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────
          1. 4点一括統合版（full.pdf）ワンクリックダウンロード
      ────────────────────────────────────────────────────────── */}
      <section aria-labelledby="dl-heading" className="mt-8">
        <h2 id="dl-heading" className="rule-mark serif h-sect text-ink">
          1．教材PDFのダウンロード
        </h2>
        <p className="prose-ja mt-2 text-[0.88rem] leading-[1.85] text-ink-2">
          各ダウンロードリンクの有効期限は15分です。期限が切れた場合はページを再読み込みすると新しいリンクが発行されます。
        </p>

        {!canSign ? (
          <p role="alert" className="mt-4 border border-accent bg-accent-bg p-4 text-[0.88rem] font-semibold text-accent">
            サーバーの署名鍵（STORE_DOWNLOAD_SECRET）が未設定のため、現在ダウンロードリンクを発行できません。
          </p>
        ) : (
          <div className="mt-5 space-y-6">
            {/* ★ 4点一括統合版ワンクリックダウンロード（ヒーローカード） */}
            {fullToken && (
              <div className="rounded-xl border border-blue-900/30 bg-gradient-to-br from-slate-900 via-slate-900 to-[#1e293b] p-5 sm:p-6 text-white shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded bg-amber-400 text-slate-950 px-2 py-0.5 text-[11px] font-bold">
                      ★ 一番おすすめ ｜ タブレット学習・一括保存向け
                    </span>
                    <h3 className="mt-2 text-base sm:text-lg font-bold text-white">
                      全4冊 統合版PDF（全32〜33ページ・完全収録）
                    </h3>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-xl">
                      問題冊子・所定解答用紙・詳細解答解説・採点基準が1冊のPDFにすべてまとまっています。iPad（GoodNotes / Notability）での学習や、まずは1ファイルにまとめて保存したい方に最適です。
                    </p>
                  </div>
                  <div className="shrink-0">
                    <a
                      href={`/api/mock-exams/download?t=${encodeURIComponent(fullToken)}`}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition active:scale-95"
                    >
                      <DownloadIcon size={16} />
                      <span>4点まとめて一括ダウンロード（PDF）</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 個別分割版（4点セット） */}
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-3">
                個別冊子ごとに分けてダウンロードしたい場合：
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {exam.files.map((f, idx) => {
                  const token = signDownload({ s: access.sessionId, e: exam.id, f: f.key });
                  return (
                    <li key={f.key} className="flex flex-col justify-between rounded-lg border border-rule bg-white p-4 shadow-2xs">
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="serif text-[0.8rem] text-[var(--sec)]">PDF 0{idx + 1}</span>
                          {f.pages ? <span className="text-[0.78rem] text-ink-3">A4・{f.pages}ページ</span> : null}
                        </div>
                        <h4 className="mt-1 text-[0.95rem] font-semibold text-ink">{f.label}</h4>
                        <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-2">{f.note}</p>
                      </div>
                      <div className="mt-3 pt-2">
                        <a
                          href={`/api/mock-exams/download?t=${encodeURIComponent(token)}`}
                          className="btn btn-primary w-full text-xs"
                        >
                          {f.label}（PDF）を保存
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. コンビニ複合機（ネットプリント）での印刷手順
      ────────────────────────────────────────────────────────── */}
      <section aria-labelledby="print-guide-heading" className="mt-12 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <h2 id="print-guide-heading" className="text-sm font-bold text-slate-900">
            コンビニ複合機（ネットプリント）での印刷手順
          </h2>
        </div>
        <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
          ご自宅にプリンターがない場合でも、お近くのセブン・ローソン・ファミマ等のマルチコピー機から手軽にA4原寸白黒印刷（1枚20円程度）いただけます。
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {/* セブン-イレブン */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Image
                src="/images/stores/seven-eleven.png"
                alt="セブン-イレブン"
                width={72}
                height={24}
                className="h-6 w-auto object-contain"
              />
              <span>セブン-イレブン</span>
            </div>
            <ol className="mt-2 space-y-1 text-[11px] text-slate-600 leading-relaxed list-decimal list-inside">
              <li>「かんたんnetprint」アプリまたはLINEにPDFを登録</li>
              <li>発行された8桁の予約番号を控える</li>
              <li>店頭マルチコピー機で「ネットプリント」を選び番号を入力</li>
            </ol>
            <div className="mt-2.5 pt-2 border-t border-slate-200/70 text-[10.5px] text-slate-500">
              白黒A4：1枚20円 ｜ 公式アプリまたはLINEで即日発行
            </div>
          </div>

          {/* ローソン・ファミマ */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5 text-xs">
            <div className="flex flex-wrap items-center gap-2 font-bold text-slate-900">
              <Image
                src="/images/stores/lawson.png"
                alt="ローソン"
                width={72}
                height={24}
                className="h-6 w-auto object-contain"
              />
              <span className="text-slate-300">/</span>
              <Image
                src="/images/stores/familymart.png"
                alt="ファミリーマート"
                width={72}
                height={24}
                className="h-6 w-auto object-contain"
              />
            </div>
            <ol className="mt-2 space-y-1 text-[11px] text-slate-600 leading-relaxed list-decimal list-inside">
              <li>「ネットワークプリント」アプリまたはLINEにPDFを登録</li>
              <li>発行されたユーザー番号を控える</li>
              <li>店頭マルチコピー機で「ネットワークプリント」を選び印刷</li>
            </ol>
            <div className="mt-2.5 pt-2 border-t border-slate-200/70 text-[10.5px] text-slate-500">
              白黒A4：1枚20円 ｜ アプリまたは公式LINEで即日発行
            </div>
          </div>

          {/* 印刷のコツ */}
          <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3.5 text-xs">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-amber-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>綺麗に解くための設定のコツ</span>
            </div>
            <ul className="mt-2 space-y-1 text-[11px] text-amber-950 leading-relaxed list-disc list-inside">
              <li><strong>A4実寸（100%）</strong>：用紙に合わせず「原寸」を選択</li>
              <li><strong>解答用紙</strong>：記述枠サイズを保つため「片面印刷」を推奨</li>
              <li><strong>問題冊子・解説</strong>：携帯に便利な「両面印刷」もおすすめ</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. 本番と同じ条件で解き、採点基準で自己採点する手順
      ────────────────────────────────────────────────────────── */}
      <section aria-labelledby="guide-heading" className="mt-12">
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

