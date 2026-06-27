import fs from "node:fs";
import path from "node:path";

/**
 * Per-deploy version stamp, written by scripts/stamp-og-version.mjs to
 * public/og/.version. Used to cache-bust the favicon / icon URLs on each
 * deploy (Vercel serves /favicon.svg immutable for a year otherwise).
 */
let cachedOgVersion: string | null = null;
export function getOgVersion(): string {
  if (cachedOgVersion !== null) return cachedOgVersion;
  try {
    const versionPath = path.join(process.cwd(), "public", "og", ".version");
    const v = fs.readFileSync(versionPath, "utf8").trim();
    cachedOgVersion = v.length > 0 ? v : "v1";
  } catch {
    cachedOgVersion = "v1";
  }
  return cachedOgVersion;
}
