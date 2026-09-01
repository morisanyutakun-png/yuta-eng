import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">ページが見つかりません</h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
        URL が変わったか、削除された可能性があります。
      </p>
      <Link
        href="/universities"
        className="mt-6 inline-block rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
      >
        大学一覧へ
      </Link>
    </div>
  );
}
