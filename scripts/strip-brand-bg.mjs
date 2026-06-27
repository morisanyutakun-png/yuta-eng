#!/usr/bin/env node
/**
 * One-time: removes the flat white studio background from the brand PNGs
 * (logo + mascot) so they blend into any section instead of sitting in a white
 * box. Flood-fills the border-connected near-white region to transparent
 * (interior whites — eye highlights, the 中高部 badge text, the book label —
 * are enclosed by darker pixels and preserved), then feathers the alpha edge.
 *
 * Overwrites the canonical PNGs in place; rerun convert-brand-images.mjs after
 * to regenerate the AVIF/WebP variants with alpha.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, "..", "public", "brand");
const FILES = ["nobit-logo.png", "nobit-kun-wave.png", "nobit-kun-point.png"];

const MINC = 224; // a pixel this light (all channels) ...
const MAXDIFF = 22; // ... and this desaturated counts as background.

function isBg(d, i) {
  const r = d[i], g = d[i + 1], b = d[i + 2];
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  return min >= MINC && max - min <= MAXDIFF;
}

async function strip(file) {
  const src = path.join(DIR, file);
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const ch = info.channels; // 4
  const bg = new Uint8Array(W * H); // 1 = background

  // Flood fill from every border pixel (stack-based, 4-connected).
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const p = y * W + x;
    if (bg[p]) return;
    if (!isBg(data, p * ch)) return;
    bg[p] = 1;
    stack.push(p);
  };
  for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
  for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
  while (stack.length) {
    const p = stack.pop();
    const x = p % W, y = (p / W) | 0;
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
  }

  // Apply: background → alpha 0. Edge feather: a kept pixel touching the
  // background gets alpha scaled by how non-white it is, dissolving the halo.
  for (let p = 0; p < W * H; p++) {
    const i = p * ch;
    if (bg[p]) { data[i + 3] = 0; continue; }
    const x = p % W, y = (p / W) | 0;
    let nearBg = false;
    if (x > 0 && bg[p - 1]) nearBg = true;
    else if (x < W - 1 && bg[p + 1]) nearBg = true;
    else if (y > 0 && bg[p - W]) nearBg = true;
    else if (y < H - 1 && bg[p + W]) nearBg = true;
    if (nearBg) {
      const minc = Math.min(data[i], data[i + 1], data[i + 2]);
      // minc 224→0, 150→~255: lighter fringe pixels become more transparent.
      data[i + 3] = Math.max(0, Math.min(255, Math.round((224 - minc) * 3.4)));
    }
  }

  await sharp(data, { raw: { width: W, height: H, channels: ch } })
    .png({ compressionLevel: 9 })
    .toFile(src);
  console.log(`[strip-bg] ${file}: ${W}x${H} background removed`);
}

for (const f of FILES) await strip(f);
