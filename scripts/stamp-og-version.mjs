#!/usr/bin/env node
/**
 * Stamp a fresh OG version BEFORE `next build` so that SSG pages can read it
 * via lib/blog.ts `getOgVersion()` and inject `?v=...` into image srcSet.
 *
 * Without this, the OG cards stay cached forever in browsers because we set
 * `Cache-Control: max-age=31536000, immutable` on /og/*. Changing the URL via
 * a query string is the cleanest way to bust that cache per deploy.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const OUT_DIR = path.join(repoRoot, "public", "og");

const version = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);

await mkdir(OUT_DIR, { recursive: true });
await writeFile(path.join(OUT_DIR, ".version"), version, "utf8");

console.log(`[og] stamped version=${version}`);
