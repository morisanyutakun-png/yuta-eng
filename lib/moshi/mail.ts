import { moshi, moshiUniversity, priceLabel, roundLabel } from "@/lib/moshi/config";
import { site } from "@/lib/site";

/**
 * 申込の確認メール。
 *
 * Resend の HTTP API をそのまま叩く。SDK を足さないのは、
 * 送る口が1つしかないのに依存を1つ増やすのが見合わないため。
 *
 * 鍵と差出人は環境変数から読む。設定がないときは送らずに false を返す。
 * メールが送れなくても申込そのものは保存済みなので、申込を失敗にはしない。
 */
export const canSendMail = () => Boolean(process.env.RESEND_API_KEY && process.env.MOSHI_MAIL_FROM);

export async function sendConfirmation(to: string, name: string, universityIds: string[]): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MOSHI_MAIL_FROM;
  if (!key || !from) return false;

  const list = universityIds
    .map((id) => moshiUniversity(id))
    .filter((u): u is NonNullable<typeof u> => Boolean(u))
    .map((u) => `・${u.university} ${u.exam}`)
    .join("\n");

  const text = [
    `${name} 様`,
    "",
    `${moshi.season} ${moshi.title}への参加申込を受け付けました。`,
    "",
    "【お申し込みいただいた模試】",
    list,
    "",
    `${roundLabel}。`,
    "正式な受験期間が決まりましたら、改めてメールでご案内します。",
    "",
    `受験料は${priceLabel}の予定です。現時点では料金は発生していません。`,
    "お支払い方法は、正式な受験日程のご案内とあわせてお知らせします。",
    "お支払いの期限までにご入金が確認できない場合、お申し込みは取り消しとなります。",
    "",
    "このメールにお心当たりがない場合は、お手数ですがこのまま破棄してください。",
    "",
    "――――――",
    site.name,
    site.url,
    site.contact ?? "",
  ]
    .filter((l) => l !== undefined)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: `${moshi.title} 参加申込を受け付けました`,
        text,
        ...(site.contact ? { reply_to: site.contact } : {}),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
