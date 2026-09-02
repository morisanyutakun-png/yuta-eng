import type { FinderItem } from "@/components/university-finder";
import { universities } from "@/lib/data";
import { shortName } from "@/lib/seo";

/** 検索コンポーネントに渡す一覧。本文は渡さないので転送量は小さい。 */
export function finderItems(): FinderItem[] {
  return universities.map((u) => ({
    slug: u.slug,
    name: u.name,
    short: shortName(u),
    university: u.university,
    course: u.course,
    group: u.group,
    keywords: [u.name, shortName(u), u.university, u.course, u.group, u.kana].join(" "),
    examTime: u.facts.examTime ?? null,
    questions: u.facts.questions ?? null,
    books: u.books.length,
  }));
}
