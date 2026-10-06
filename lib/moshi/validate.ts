import { moshi, validIds } from "@/lib/moshi/config";

/**
 * 完了ページへ渡す控えの置き場。
 * 入れるのは申し込んだ大学の識別子と、メールを送れたかどうかだけ。
 * 氏名もメールアドレスも入れない。10分で消える。
 */
export const THANKS_COOKIE = "moshi_done";

/**
 * フォームから来た値を確かめる。
 *
 * 画面側でも確かめるが、画面を通さずに送られることがあるので、
 * **保存する前にサーバー側でもう一度**確かめる。ここが最後の砦。
 */
export type Parsed = {
  name: string;
  email: string;
  grade: string;
  faculty: string | null;
  universityIds: string[];
};

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "";

/** 記号の並びだけを見る素朴な確認。厳密な判定は送ってみないと分からない */
const looksLikeEmail = (s: string) =>
  /^[^\s@,:;<>()[\]\\]+@[^\s@.,:;<>()[\]\\]+(\.[^\s@.,:;<>()[\]\\]+)+$/.test(s) && s.length <= 254;

export function parseApplication(body: unknown): { ok: true; value: Parsed } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "入力を読み取れませんでした。" };
  const b = body as Record<string, unknown>;

  const name = str(b.name, 60);
  if (name.length < 1) return { ok: false, error: "お名前を入力してください。" };

  const email = str(b.email, 254);
  if (!looksLikeEmail(email)) return { ok: false, error: "メールアドレスの形式をご確認ください。" };

  const grade = str(b.grade, 20);
  if (!moshi.grades.includes(grade)) return { ok: false, error: "学年を選んでください。" };

  const facultyRaw = str(b.faculty, 20);
  const faculty = facultyRaw && moshi.faculties.includes(facultyRaw) ? facultyRaw : null;

  const universityIds = validIds(b.universityIds);
  if (universityIds.length === 0) return { ok: false, error: "参加を希望する大学を1つ以上選んでください。" };

  return { ok: true, value: { name, email, grade, faculty, universityIds } };
}
