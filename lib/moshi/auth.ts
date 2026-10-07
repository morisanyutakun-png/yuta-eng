/**
 * 管理画面の合言葉を確かめる。
 *
 * middleware と、画面から呼ぶ削除の処理の両方で使う。
 * 入口が middleware だけだと、matcher の書き方を変えたときに
 * 削除だけが素通りになりうる。消す側でももう一度確かめる。
 *
 * 文字数の違いで早く抜けないよう、長さをそろえてから全文字を比べる。
 */
export function checkBasicAuth(header: string | null | undefined): boolean {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return false;
  if (!header?.startsWith("Basic ")) return false;

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return false;
  }
  const i = decoded.indexOf(":");
  const u = i < 0 ? "" : decoded.slice(0, i);
  const p = i < 0 ? "" : decoded.slice(i + 1);
  if (u.length !== user.length || p.length !== pass.length) return false;

  let diff = 0;
  for (let k = 0; k < u.length; k++) diff |= u.charCodeAt(k) ^ user.charCodeAt(k);
  for (let k = 0; k < p.length; k++) diff |= p.charCodeAt(k) ^ pass.charCodeAt(k);
  return diff === 0;
}
