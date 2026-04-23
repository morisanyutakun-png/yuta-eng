"use client";

import type { ReactNode } from "react";
import { useState } from "react";

const categoryOptions = ["Education", "Physics", "LaTeX", "Web", "Apps"];

function slugify(value: string) {
  const slug = value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || "new-article";
}

function yamlString(value: string) {
  return `"${value.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
}

function toList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export function BlogBuilder() {
  const today = new Date().toISOString().slice(0, 10);
  const [title, setTitle] = useState("学習支援Webアプリの設計メモ");
  const [slug, setSlug] = useState("learning-support-web-app-design");
  const [description, setDescription] = useState(
    "教材、演習、復習をつなぐ学習支援Webアプリの設計ポイントを整理します。",
  );
  const [date, setDate] = useState(today);
  const [category, setCategory] = useState("Education");
  const [tags, setTags] = useState("学習支援Webアプリ, 教育ICT, 教材制作");
  const [searchIntent, setSearchIntent] = useState(
    "学習支援Webアプリを作る前に、設計の考え方を知りたい人向け",
  );
  const [keyPoints, setKeyPoints] = useState(
    "学習者のつまずきを先に整理する, 教材と演習を同じ導線に置く, 記事末尾からアプリへ自然に案内する",
  );
  const [draft, setDraft] = useState(false);
  const [body, setBody] = useState(`## まず整理すること

ここに本文を書きます。

## 設計のポイント

- ポイント1
- ポイント2
- ポイント3

## 次にやること

読者が次に進める導線を書きます。
`);
  const [copied, setCopied] = useState(false);

  const fileSlug = slugify(slug);
  const tagList = toList(tags);
  const keyPointList = toList(keyPoints);
  const mdx = `---
title: ${yamlString(title)}
description: ${yamlString(description)}
date: ${yamlString(date)}
tags:
${tagList.map((tag) => `  - ${yamlString(tag)}`).join("\n")}
category: ${yamlString(category)}
slug: ${yamlString(fileSlug)}
draft: ${draft ? "true" : "false"}
searchIntent: ${yamlString(searchIntent)}
keyPoints:
${keyPointList.map((point) => `  - ${yamlString(point)}`).join("\n")}
---

${body}`;

  async function copyMdx() {
    await navigator.clipboard.writeText(mdx);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function downloadMdx() {
    const blob = new Blob([mdx], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${fileSlug}.mdx`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_24px_90px_-70px_rgba(15,23,42,0.7)] sm:p-8">
        <div className="grid gap-5">
          <Field label="タイトル">
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:bg-white"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </Field>
          <Field label="URLスラッグ / ファイル名（英数字推奨）">
            <div className="flex gap-2">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:bg-white"
                onChange={(event) => setSlug(slugify(event.target.value))}
                value={slug}
              />
              <button
                className="shrink-0 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                onClick={() => setSlug(slugify(title))}
                type="button"
              >
                自動
              </button>
            </div>
            <p className="mt-2 text-xs leading-6 text-slate-500">
              保存先: content/blog/{fileSlug}.mdx。日本語URLも動きますが、運用では英数字が扱いやすいです。
            </p>
          </Field>
          <Field label="説明文">
            <textarea
              className="min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition focus:border-sky-300 focus:bg-white"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="公開日">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:bg-white"
                onChange={(event) => setDate(event.target.value)}
                type="date"
                value={date}
              />
            </Field>
            <Field label="カテゴリ">
              <select
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:bg-white"
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              >
                {categoryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="タグ（カンマ区切り）">
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:bg-white"
              onChange={(event) => setTags(event.target.value)}
              value={tags}
            />
          </Field>
          <Field label="検索意図">
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:bg-white"
              onChange={(event) => setSearchIntent(event.target.value)}
              value={searchIntent}
            />
          </Field>
          <Field label="要点（カンマ区切り）">
            <textarea
              className="min-h-20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition focus:border-sky-300 focus:bg-white"
              onChange={(event) => setKeyPoints(event.target.value)}
              value={keyPoints}
            />
          </Field>
          <Field label="本文">
            <textarea
              className="min-h-72 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-sky-300 focus:bg-white"
              onChange={(event) => setBody(event.target.value)}
              value={body}
            />
          </Field>
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
            <input
              checked={draft}
              className="size-4 rounded border-slate-300"
              onChange={(event) => setDraft(event.target.checked)}
              type="checkbox"
            />
            draft として保存する
          </label>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_90px_-70px_rgba(15,23,42,0.8)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
              MDX Output
            </p>
            <p className="mt-2 text-sm text-slate-300">
              保存先: content/blog/{fileSlug}.mdx
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              onClick={copyMdx}
              type="button"
            >
              {copied ? "コピー済み" : "コピー"}
            </button>
            <button
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              onClick={downloadMdx}
              type="button"
            >
              ダウンロード
            </button>
          </div>
        </div>
        <pre className="mt-6 max-h-[46rem] overflow-auto rounded-[1.75rem] border border-white/10 bg-black/35 p-5 text-xs leading-6 text-slate-200">
          <code>{mdx}</code>
        </pre>
      </div>
    </div>
  );
}
