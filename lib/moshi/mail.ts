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
 *
 * 見た目は表組みで作る。メールソフトは新しい CSS をほとんど解さず、
 * 画像も既定で止めることが多い。だから罫線と背景色だけで形を作り、
 * 画像は1枚も使わない。文字だけでも同じ順で読めるよう、
 * 同じ内容の平文も必ず添える。
 */
export const canSendMail = () => Boolean(process.env.RESEND_API_KEY && process.env.MOSHI_MAIL_FROM);

const C = {
  ink: "#15181c",
  ink2: "#434a53",
  ink3: "#666d76",
  rule: "#e0e3e7",
  band: "#f5f6f8",
  navy: "#1b3a63",
  accent: "#b3412f",
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** 項目名と内容を1行で並べる。サイトの実施要項と同じ並べ方にそろえる */
const row = (k: string, v: string, last = false) => `
<tr>
  <td style="padding:12px 16px;border-bottom:${last ? "0" : `1px solid ${C.rule}`};
             font-size:12px;line-height:1.6;color:${C.ink3};white-space:nowrap;
             vertical-align:top;width:92px;">${esc(k)}</td>
  <td style="padding:12px 16px 12px 0;border-bottom:${last ? "0" : `1px solid ${C.rule}`};
             font-size:14px;line-height:1.85;color:${C.ink2};">${v}</td>
</tr>`;

function buildHtml(name: string, universityIds: string[]) {
  const unis = universityIds
    .map((id) => moshiUniversity(id))
    .filter((u): u is NonNullable<typeof u> => Boolean(u));

  const uniRows = unis
    .map(
      (u, i) => `
<tr>
  <td style="padding:11px 16px;border-bottom:${i === unis.length - 1 ? "0" : `1px solid ${C.rule}`};">
    <span style="font-size:15px;font-weight:700;color:${C.ink};">${esc(u.university)}</span>
    <span style="font-size:12.5px;color:${C.ink2};padding-left:8px;">${esc(u.exam)}</span>
  </td>
</tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(moshi.title)} 参加申込</title></head>
<body style="margin:0;padding:0;background:${C.band};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">
参加申込を受け付けました。正式な受験日程とお支払い方法は、確定しだいご案内します。
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background:${C.band};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="max-width:560px;background:#ffffff;border:1px solid ${C.rule};">

  <!-- 差出人。画像を使わず、四角と文字だけで作る -->
  <tr><td style="padding:18px 24px;border-bottom:1px solid ${C.rule};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="width:26px;height:26px;background:${C.navy};"></td>
      <td style="padding-left:10px;font-size:14px;font-weight:700;color:${C.ink};
                 font-family:'Hiragino Mincho ProN','Yu Mincho',serif;">${esc(site.name)}</td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:28px 24px 0;">
    <div style="font-size:11.5px;font-weight:700;letter-spacing:.08em;color:${C.accent};">
      ${esc(moshi.season)}・${esc(moshi.title)}
    </div>
    <h1 style="margin:8px 0 0;font-size:21px;line-height:1.5;color:${C.ink};
               font-family:'Hiragino Mincho ProN','Yu Mincho',serif;font-weight:700;">
      参加申込を受け付けました
    </h1>
    <p style="margin:14px 0 0;font-size:14px;line-height:1.95;color:${C.ink2};">
      ${esc(name)} 様<br>
      このたびはお申し込みいただきありがとうございます。<br>
      正式な受験日程とお支払い方法は、確定しだい改めてご案内します。
    </p>
  </td></tr>

  <tr><td style="padding:22px 24px 0;">
    <div style="font-size:11.5px;font-weight:700;letter-spacing:.06em;color:${C.navy};
                background:${C.band};border:1px solid ${C.rule};border-bottom:0;padding:8px 16px;">
      お申し込みいただいた模試
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="border:1px solid ${C.rule};">${uniRows}</table>
  </td></tr>

  <tr><td style="padding:20px 24px 0;">
    <div style="font-size:11.5px;font-weight:700;letter-spacing:.06em;color:${C.navy};
                background:${C.band};border:1px solid ${C.rule};border-bottom:0;padding:8px 16px;">
      このあとの流れ
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="border:1px solid ${C.rule};">
      ${row("実施時期", esc(roundLabel) + "。<br>正式な受験期間が決まりしだい、メールでご案内します。")}
      ${row(
        "受験料",
        `${esc(priceLabel)}の予定です。<br><span style="color:${C.accent};font-weight:700;">現時点では料金は発生していません。</span><br>お支払い方法は日程のご案内とあわせてお知らせします。`,
      )}
      ${row("取り消し", "お支払いの期限までにご入金が確認できない場合、お申し込みは自動的に取り消しとなります。", true)}
    </table>
  </td></tr>

  <tr><td style="padding:22px 24px 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="background:${C.navy};">
        <a href="${site.url}/moshi" style="display:inline-block;padding:11px 22px;font-size:13.5px;
                  font-weight:700;color:#ffffff;text-decoration:none;">模試のご案内を見る</a>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:22px 24px 26px;">
    <p style="margin:0;font-size:12px;line-height:1.9;color:${C.ink3};">
      このメールにお心当たりがない場合は、お手数ですがこのまま破棄してください。<br>
      お申し込みの取り消しや内容の変更をご希望の場合は、このメールにご返信ください。
    </p>
  </td></tr>

  <tr><td style="padding:16px 24px;border-top:1px solid ${C.rule};background:${C.band};">
    <p style="margin:0;font-size:11.5px;line-height:1.85;color:${C.ink3};">
      ${esc(site.name)}<br>
      <a href="${site.url}" style="color:${C.navy};text-decoration:none;">${esc(site.url.replace(/^https?:\/\//, ""))}</a>
      ${site.contact ? `　|　<a href="mailto:${esc(site.contact)}" style="color:${C.navy};text-decoration:none;">${esc(site.contact)}</a>` : ""}
      <br>本模試は各大学とは関係のない、当サイトが独自に制作するものです。
    </p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

function buildText(name: string, universityIds: string[]) {
  const list = universityIds
    .map((id) => moshiUniversity(id))
    .filter((u): u is NonNullable<typeof u> => Boolean(u))
    .map((u) => `・${u.university} ${u.exam}`)
    .join("\n");

  return [
    `${name} 様`,
    "",
    `${moshi.season} ${moshi.title}への参加申込を受け付けました。`,
    "",
    "【お申し込みいただいた模試】",
    list,
    "",
    "【このあとの流れ】",
    `実施時期　${roundLabel}。正式な受験期間が決まりしだい、メールでご案内します。`,
    `受験料　　${priceLabel}の予定です。現時点では料金は発生していません。`,
    "　　　　　お支払い方法は日程のご案内とあわせてお知らせします。",
    "取り消し　お支払いの期限までにご入金が確認できない場合、お申し込みは自動的に取り消しとなります。",
    "",
    `模試のご案内　${site.url}/moshi`,
    "",
    "このメールにお心当たりがない場合は、お手数ですがこのまま破棄してください。",
    "お申し込みの取り消しや内容の変更をご希望の場合は、このメールにご返信ください。",
    "",
    "――――――",
    site.name,
    site.url,
    site.contact ?? "",
    "本模試は各大学とは関係のない、当サイトが独自に制作するものです。",
  ]
    .filter((l) => l !== "")
    .join("\n");
}

export async function sendConfirmation(to: string, name: string, universityIds: string[]): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MOSHI_MAIL_FROM;
  if (!key || !from) return false;

  // 運営側の控え。申し込んだ本人には見えない形（bcc）で同じものを送る。
  // 宛先は環境変数から読む。公開しているコードに個人の宛先を書かない。
  const bcc = process.env.MOSHI_NOTIFY_BCC?.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        ...(bcc ? { bcc } : {}),
        subject: `${moshi.title} 参加申込を受け付けました`,
        html: buildHtml(name, universityIds),
        text: buildText(name, universityIds),
        ...(site.contact ? { reply_to: site.contact } : {}),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
