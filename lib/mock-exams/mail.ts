import type { MockExam } from "@/data/mock-exams";
import { storeSeller } from "@/data/mock-exams";
import { priceLabel } from "@/lib/mock-exams/catalog";

/**
 * 購入確認メール（任意）。
 *
 * 決済完了ページを閉じてしまっても PDF を取り直せるよう、
 * 閲覧ページの URL を購入者に送る。PDF そのものは添付しない
 * （添付すると転送だけで配れてしまい、返金後も手元に残る）。
 *
 * RESEND_API_KEY と STORE_MAIL_FROM（無ければ MOSHI_MAIL_FROM）が両方あるときだけ送る。
 * 送れなくても注文は成立しているので、Webhook の処理は失敗にしない。
 */

const mailFrom = () => process.env.STORE_MAIL_FROM?.trim() || process.env.MOSHI_MAIL_FROM?.trim() || "";

export const canSendStoreMail = () => Boolean(process.env.RESEND_API_KEY?.trim() && mailFrom());

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendPurchaseMail(to: string, exam: MockExam, viewUrl: string, days: number): Promise<boolean> {
  if (!canSendStoreMail()) return false;

  const text = [
    `${exam.title} をご購入いただき、ありがとうございます。`,
    "",
    "下のページから、問題冊子・所定解答用紙・解答解説・採点基準（A4・PDF）をダウンロードできます。",
    viewUrl,
    "",
    `・お支払い金額：${priceLabel(exam)}`,
    `・ダウンロードできる期間：ご購入から${days}日間`,
    "・このURLを知っている人は誰でもダウンロードできます。他の方に共有しないでください。",
    "・PDF の再配布・転載・複製しての配布は禁止しています。",
    "",
    "自己採点で減点ポイントが見えてきたら、添削付きの本番「入試プレビュー」もご検討ください。",
    "https://yuta-eng.com/moshi",
    "",
    "──",
    storeSeller.storeName,
    `お問い合わせ：${storeSeller.email}`,
  ].join("\n");

  const html = `<div style="font-family:sans-serif;line-height:1.8;color:#15181c">
<p>${esc(exam.title)} をご購入いただき、ありがとうございます。</p>
<p>下のボタンから、問題冊子・所定解答用紙・解答解説・採点基準（A4・PDF）をダウンロードできます。</p>
<p><a href="${esc(viewUrl)}" style="display:inline-block;background:#1b3a63;color:#fff;padding:10px 18px;text-decoration:none">ダウンロードページを開く</a></p>
<ul>
<li>お支払い金額：${esc(priceLabel(exam))}</li>
<li>ダウンロードできる期間：ご購入から${days}日間</li>
<li>このURLを知っている人は誰でもダウンロードできます。他の方に共有しないでください。</li>
<li>PDF の再配布・転載・複製しての配布は禁止しています。</li>
</ul>
<p>自己採点で減点ポイントが見えてきたら、添削付きの本番<a href="https://yuta-eng.com/moshi">「入試プレビュー」</a>もご検討ください。</p>
<p style="color:#666d76;font-size:12px">${esc(storeSeller.storeName)}／お問い合わせ：${esc(storeSeller.email)}</p>
</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: mailFrom(),
        to: [to],
        reply_to: storeSeller.email,
        subject: `【ご購入ありがとうございます】${exam.title}`,
        text,
        html,
      }),
    });
    if (!res.ok) console.error(`[mock-exams/mail] 送信失敗 ${res.status} ${(await res.text().catch(() => "")).slice(0, 160)}`);
    return res.ok;
  } catch (err) {
    console.error("[mock-exams/mail] 送信失敗", err);
    return false;
  }
}

