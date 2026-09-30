// front.tex（原稿の「はじめに」）から出題分析セクションを構造化 JSON に変換する。
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { universityMeta } from "./university-meta.mjs";
import {
  parseLists,
  parseSpans,
  parseTables,
  readGroup,
  spansToPlain,
  spansToText,
} from "./lib/latex.mjs";

const HOME = process.env.HOME ?? "/Users/moriyuuta";
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "data");

/** 販売中の本（npm run data:books で Amazon から取り直したもの）。 */
const BOOKS = JSON.parse(readFileSync(join(OUT_DIR, "books.json"), "utf8"));

/* ─────────────── 本体 ─────────────── */

// \hdA / \hdB の見出し位置を集める
function findHeadings(tex) {
  const out = [];
  const re = /\\hd([AB])\s*\{/g;
  let m;
  while ((m = re.exec(tex))) {
    const g = readGroup(tex, m.index + m[0].length - 1);
    if (!g) continue;
    out.push({ level: m[1], title: spansToPlain(parseSpans(g.body)), start: m.index, bodyStart: g.end });
  }
  return out;
}

/*
 * 書籍の中身への言及（サイトでは意味をなさない）。
 * 「第1回目」は東京理科大の“試験の実施回”なので、回目は除外する。
 */
const BOOK_SENTENCE = /本書|本巻|第[０-９0-9一二三四五六七八九]+巻|第[０-９0-9]+回(?!目)|付録[A-Z]|収録し|併載/;

const MATH_MARK = "\uE001"; // 数式1つを表す1文字（文の区切り判定に使う）

/** spans を「1文字＝1原子」に開く。数式は分割できないので1原子として扱う。 */
function toAtoms(spans) {
  const atoms = [];
  for (const s of spans) {
    if (s.t === "math") atoms.push({ span: s, ch: MATH_MARK });
    else for (const ch of s.v) atoms.push({ span: s, ch });
  }
  return atoms;
}

/** 原子列を span 列に畳み直す。 */
function fromAtoms(atoms) {
  const out = [];
  let cur = null;
  let buf = "";
  const flush = () => {
    if (cur && buf) out.push({ t: cur.t, v: buf });
    buf = "";
  };
  for (const a of atoms) {
    if (a.span.t === "math") {
      flush();
      cur = null;
      out.push({ t: "math", v: a.span.v });
      continue;
    }
    if (a.span !== cur) { flush(); cur = a.span; }
    buf += a.ch;
  }
  flush();
  return out.filter((s) => s.v !== "");
}

/**
 * 段落から書籍への言及だけを落とす。
 * ① 「（第2回 大問2 が典型で…）」のような括弧書きは括弧ごと
 * ② それでも残る「本書では〜」の文は文ごと
 * 分析そのものの文は残す。全部落ちたら段落ごと捨てる。
 */
function dropBookSentences(spans) {
  const atoms = toAtoms(spans);
  const text = atoms.map((a) => a.ch).join("");
  const dead = new Array(atoms.length).fill(false);

  // ① 書籍に触れている括弧書きを、括弧ごと落とす
  const OPEN = "（(";
  const CLOSE = "）)";
  const stack = [];
  for (let i = 0; i < text.length; i++) {
    if (OPEN.includes(text[i])) stack.push(i);
    else if (CLOSE.includes(text[i]) && stack.length) {
      const start = stack.pop();
      if (BOOK_SENTENCE.test(text.slice(start, i + 1))) {
        for (let k = start; k <= i; k++) dead[k] = true;
      }
    }
  }

  // ② 残った本文を文（。区切り）に分け、書籍に触れている文を落とす
  let from = 0;
  for (let i = 0; i <= text.length; i++) {
    if (i === text.length || text[i] === "。") {
      const alive = [];
      for (let k = from; k <= Math.min(i, text.length - 1); k++) if (!dead[k]) alive.push(text[k]);
      if (BOOK_SENTENCE.test(alive.join(""))) {
        for (let k = from; k <= Math.min(i, text.length - 1); k++) dead[k] = true;
      }
      from = i + 1;
    }
  }

  return tidy(fromAtoms(atoms.filter((_, i) => !dead[i])));
}

/**
 * 組版由来の余分な空白を落とす。
 * LaTeX の改行や、括弧書きを取り除いたあとに残る空きを詰める。
 */
function tidy(spans) {
  const out = spans.map((s) => (s.t === "math" ? s : { ...s }));
  for (const s of out) {
    if (s.t === "math") continue;
    s.v = s.v
      .replace(/[ ]{2,}/g, " ")
      .replace(/[ ]+([。、）」』】\]])/g, "$1")
      .replace(/([。、])[ ]+/g, "$1")
      .replace(/([（「『【\[])[ ]+/g, "$1");
  }
  // 先頭と末尾の空白を落とす
  const first = out.find((s) => s.t !== "math");
  if (first) first.v = first.v.replace(/^[ 　]+/, "");
  for (let i = out.length - 1; i >= 0; i--) {
    if (out[i].t !== "math") { out[i].v = out[i].v.replace(/[ 　]+$/, ""); break; }
  }
  return out.filter((s) => s.t === "math" || s.v !== "");
}

const BOOK_COL = /本書|本巻/;

/**
 * 表から書籍固有の要素を取り除く。
 * ・「本書30題中」のような列は落とす（分析の列は残す）
 * ・第1回〜第5回という「本書の回」の表そのものは落とす
 * 落とすべき表なら null を返す。
 */
function sanitizeTable(t) {
  let { head, rows } = t;

  // 「第1回」「第2回」…が並ぶ表＝本書の構成表
  const roundRows = rows.filter((r) => /^第[０-９0-9一二三四五六七八九]+回$/.test(spansToText(r[0]?.spans ?? [])));
  if (roundRows.length >= 2) return null;

  const flat = [head, ...rows].every((r) => r.every((c) => c.colSpan === 1));
  if (flat) {
    const drop = head.map((c, i) => (BOOK_COL.test(spansToText(c.spans)) ? i : -1)).filter((i) => i >= 0);
    if (drop.length) {
      const keep = (r) => r.filter((_, i) => !drop.includes(i));
      head = keep(head);
      rows = rows.map(keep);
    }
  }

  // 「本書 第1〜5回（平均）」のような、書籍側の実績を並べた行も落とす
  rows = rows.filter((r) => !BOOK_COL.test(spansToText(r[0]?.spans ?? [])));

  // セル内に混じった「本書では〜」の文だけを落とす（分析の文は残す）
  const clean = (r) => r.map((c) => (BOOK_COL.test(spansToText(c.spans)) ? { ...c, spans: dropBookSentences(c.spans) } : c));
  rows = rows.map(clean).filter((r) => r.some((c) => c.spans.length));

  if (head.length < 2 || rows.length === 0) return null;
  if (BOOK_COL.test(spansToText(head[0]?.spans ?? []))) return null;
  return { ...t, head, rows };
}

// 見出し配下の本文を、段落・表・箇条書きの並びに落とす
function blocksFor(tex, from, to) {
  const slice = tex.slice(from, to);
  const tables = parseTables(slice);
  const lists = parseLists(slice);

  // 表・箇条書きの領域を伏せてから段落を拾う
  let masked = slice;
  const spans = [];
  const envRe = /\\begin\{(tabular|longtable|center|minipage|enumerate|itemize)\}(\[[^\]]*\])?[\s\S]*?\\end\{\1\}/g;
  let em;
  while ((em = envRe.exec(slice))) spans.push([em.index, em.index + em[0].length]);
  for (const [s, e] of spans.reverse()) masked = masked.slice(0, s) + " ".repeat(e - s) + masked.slice(e);

  // 元の出現順を保って並べ直す
  const blocks = [];
  for (const chunk of masked.split(/\n\s*\n/)) {
    const p = dropBookSentences(parseSpans(chunk));
    if (spansToText(p).length > 8) blocks.push({ type: "p", spans: p });
  }
  for (const l of lists) {
    const items = l.items.map((it) => dropBookSentences(it)).filter((it) => spansToText(it).length > 1);
    if (items.length) blocks.push({ type: "list", ordered: l.ordered, items });
  }
  for (const t of tables) {
    const clean = sanitizeTable(t);
    if (clean) blocks.push({ type: "table", head: clean.head, rows: clean.rows });
  }
  return blocks;
}

function extract(dir) {
  const tex = readFileSync(join(HOME, dir, "front.tex"), "utf8");
  const heads = findHeadings(tex);
  if (!heads.length) return null;

  // 「1．…の出題分析」から次の \hdA までが分析セクション
  const aIdx = heads.findIndex((h) => h.level === "A");
  if (aIdx === -1) return null;
  const analysisHead = heads[aIdx];
  const nextA = heads.findIndex((h, i) => i > aIdx && h.level === "A");
  const endPos = nextA === -1 ? tex.length : heads[nextA].start;

  const subs = [];
  const inRange = heads.filter((h, i) => i > aIdx && h.start < endPos && h.level === "B");
  for (let i = 0; i < inRange.length; i++) {
    const h = inRange[i];
    const to = i + 1 < inRange.length ? inRange[i + 1].start : endPos;
    subs.push({ title: h.title, blocks: blocksFor(tex, h.bodyStart, to) });
  }

  // 「本書について」（分析セクションより前の \hdB）は除外済み
  const lead = blocksFor(tex, analysisHead.bodyStart, inRange.length ? inRange[0].start : endPos);

  return { analysisTitle: analysisHead.title, lead, sections: subs };
}

/* ─────────────── 表の役割づけ ─────────────── */

const cellText = (c) => (c ? spansToText(c.spans) : "");
// 分野名・注記のように、素のテキストとして表示する列に使う。
const cellPlain = (c) => (c ? spansToPlain(c.spans) : "");

// 年度が縦に並ぶ表＝年度別出題一覧
const isYearTable = (t) => t.rows.filter((r) => /^(19|20)\d\d/.test(cellText(r[0]))).length >= 3;

// 「分野 / 回数 / 特徴」の表＝分野別頻度
/*
 * 「分野 / 8年中 / 特徴」の表＝分野別の頻度。
 * 2列目が出題回数として数えられるものだけを対象にする
 * （慶應商の「項目 / 実際の出題」のような表を巻き込まないため）。
 */
const isFieldTable = (t) => {
  if (isYearTable(t)) return false;
  if (!/分野|単元/.test(cellText(t.head[0]))) return false;
  const counted = t.rows.filter((r) => /^\d+/.test(cellText(r[1]).replace(/[^\d]/g, "") ? cellText(r[1]).trim() : ""));
  return counted.length >= 3;
};

/**
 * 分野別頻度の表の見出し（「8年中」「32題中」「8年40題中」「8年で」）を読み、
 * 数がどの軸で数えられているかを決める。
 *
 * ここを取り違えると「微分積分 16 / 8年」のような、分母を超える表示になる。
 * 原稿の見出しは軸が混在しているので、
 *   - 「題」があればその題数を分母にする（8年40題中 → 40題）
 *   - 「年」しかなければ、数えているのは題数で、年数は期間にすぎない
 * と読み分ける。
 */
function fieldBasis(head) {
  const unit = head.replace(/\s+/g, "");
  const q = unit.match(/(\d+)\s*題/);
  const y = unit.match(/(\d+)\s*年/);
  if (q) return { unit, kind: "question", n: Number(q[1]), years: y ? Number(y[1]) : null };
  if (y) return { unit, kind: "year", n: null, years: Number(y[1]) };
  return { unit, kind: "unknown", n: null, years: null };
}

/** 分野別頻度の表を、棒グラフに描ける形へ。 */
function toFieldChart(t) {
  if (!t) return null;
  const items = [];
  for (const r of t.rows) {
    const label = cellPlain(r[0]).replace(/\s+/g, "");
    const countCell = cellText(r[1]);
    const m = countCell.match(/(\d+)/);
    if (!label || !m) continue;
    // 「合計」行は分野ではないので棒にしない
    if (/^(合計|計|総計|小計)$/.test(label)) continue;
    const count = Number(m[1]);
    const note = cellPlain(r[2] ?? { spans: [] });

    // 「データの分析／整式／複素数平面 & 各1」は3分野が1回ずつという意味。
    // 1本の棒にまとめると、3分野あわせて1回だったように読めてしまう。
    const each = /各\s*\d+/.test(countCell);
    const parts = each ? label.split(/[／/・]/).map((x) => x.trim()).filter(Boolean) : [label];
    if (parts.length > 1) {
      for (const part of parts) items.push({ label: part, count, note });
      continue;
    }
    items.push({ label, count, note });
  }
  if (items.length < 3) return null;
  const total = items.reduce((a, x) => a + x.count, 0);
  const basis = fieldBasis(cellText(t.head[1]));
  // 分母として出せるのは「題数」で数えているときだけ。
  // 「8年中」は期間であって分母ではないので、n は持たせない。
  return {
    unit: basis.unit,
    kind: basis.kind,
    /** 分母として表示してよい題数。null なら分母を出さない。 */
    denom: basis.kind === "question" ? basis.n : null,
    /** 集計の対象期間（年）。取れないこともある。 */
    years: basis.years,
    /** items の count の合計。延べ数なので denom を超えうる。 */
    total,
    items,
  };
}

/* ─────────────── 要点の抽出 ─────────────── */

/**
 * 数学の配点を拾う。
 *
 * 原稿の導入文には、数学の配点・他教科を含む合計・共通テストの配点・
 * 学部ごとに違う配点が、同じ数段落に混ざって書かれている。
 * かつてここで「計500点」「計800点」を数学の配点として拾い、
 * 会津大に「配点 500 点」、熊本大医学部に「配点 800 点」と出していた。
 *
 * 数字を1つに決められない場合は、出さないほうが正しい。
 */
function extractPoints(text) {
  const OTHER_SUBJECT = /外国語|英語|理科|国語|地理歴史|地歴|公民|小論文|面接|物理|化学|生物/;
  const found = new Set();

  for (const raw of text.split(/(?<=[。、])/)) {
    // 共通テスト・換算後の点は、二次試験の数学の配点ではない
    if (/共通テスト|センター|換算|読み替え/.test(raw)) continue;
    // 「総合問題のみで、試験時間100分・450点」は総合問題全体の配点。数学のぶんではない
    if (/総合問題/.test(raw) && !/数学[はがのも]/.test(raw)) continue;
    // 「数学は450点中の150点を占める」——数学のぶんは後ろの数
    const ofWhich = raw.match(/数学[はがのも]?[^。]{0,8}?\d{2,4}\s*点中(?:の)?\s*(\d{2,4})\s*点/);
    if (ofWhich) { found.add(Number(ofWhich[1])); continue; }
    // 「配点は100点（A方式は外国語200点…）」の括弧書きは、数学の配点の話ではない
    const sentence = raw.replace(/[（(][^）)]*[）)]/g, "");

    // (a) 「数学250点」「数学は200点」と名指しされている
    for (const m of sentence.matchAll(/数学(?:は|が)?\s*(\d{2,4})\s*点(?!満点)/g)) found.add(Number(m[1]));

    if (OTHER_SUBJECT.test(sentence)) continue;

    // (b) 他教科の名が出てこない文なら、「200点満点」「計250点」は数学のもの
    const m =
      sentence.match(/(\d{2,4})\s*点満点/) ||
      sentence.match(/配点は\s*(\d{2,4})\s*点/) ||
      sentence.match(/(?:合計|計)\s*(\d{2,4})\s*点/);
    if (m) { found.add(Number(m[1])); continue; }

    // (c) 数学の話をしていて、点数が1つしか出てこない文
    //     （「数学は100分・大問4題・150点である」のような書き方）
    if (!/数学|配点/.test(sentence)) continue;
    const all = [...new Set([...sentence.matchAll(/(\d{2,4})\s*点/g)].map((x) => Number(x[1])))];
    if (all.length === 1) found.add(all[0]);
  }

  // 愛媛大のように学部で配点が違う大学は、1つの数字にまとめられない。
  // 九大理系のように「計250点」と「経済工学科のみ300点換算」が並ぶ場合も同じ。
  return found.size === 1 ? [...found][0] : null;
}

/**
 * 「試験時間120分，大問5題，完全記述式」のような導入文から、
 * ページ冒頭に出す要点を拾う。取れなかった項目は載せない（推測はしない）。
 */
function extractFacts(blocks) {
  // 形式の説明は先頭の数段落に集中している。他大学との比較文を拾わないよう範囲を絞る。
  // 原稿は「配点は $100$ 点」のように数字まで数式にしている。
  // $ が混ざったままだと正規表現が当たらないので、平文に落としてから読む。
  const text = blocks
    .filter((b) => b.type === "p")
    .slice(0, 3)
    .map((b) => spansToPlain(b.spans))
    .join(" ");

  const facts = {};

  const time =
    text.match(/試験時間(?:は)?\s*(\d{2,3})\s*分/) ||
    text.match(/数学は\s*(\d{2,3})\s*分/) ||
    // 「数学（文科系）は80分・素点75点で」のように、科目名に括弧書きが挟まる書き方
    text.match(/数学(?:[（(][^）)]*[）)])?は\s*(\d{2,3})\s*分/) ||
    // 「数学は2時限80分・100点」「直近の問題冊子は90分で」「独立した試験時間（90分）」
    text.match(/数学は[^。]{0,8}?(\d{2,3})\s*分/) ||
    text.match(/問題冊子は\s*(\d{2,3})\s*分/) ||
    text.match(/試験時間[^。]{0,4}[（(](\d{2,3})\s*分[）)]/) ||
    text.match(/数学\s*[（(]\s*(\d{2,3})\s*分/) ||
    text.match(/(\d{2,3})\s*分\s*[，、,・･]\s*大問/);
  if (time) facts.examTime = Number(time[1]);

  // 「試験時間は120分（教育学部・農学部は100分）」のように学部で分かれる大学がある。
  // 代表値だけを出すと他学部の受験生に誤った数字を見せるので、但し書きを添える。
  const varies = text.match(
    /試験時間は[^。]{0,20}?\d{2,3}\s*分[^。]{0,10}[（(]([^）)]{0,40}?(\d{2,3})\s*分)[）)]/,
  );
  if (varies && facts.examTime && Number(varies[2]) !== facts.examTime) {
    facts.examTimeNote = varies[1].replace(/\s+/g, "");
  }

  // 千葉大・新潟大のように「1冊子から志望学部ぶんだけ選んで解く」大学は、
  // 冊子に並ぶ題数と受験生が解く題数が違う。数字を1つ出すと誤解を招くので出さない。
  // 「数学と外国語のどちらかを選択」のような“科目の選択”は別の話なので含めない。
  const selective =
    /解くべき大問|指定された番号|問題の選択|(大問|小問|問題|番号|\d+\s*題)[^。]{0,12}(指定され|選択する|選ぶ)/.test(text);
  const dai = text.match(/大問\s*(\d+)\s*題/) || text.match(/(\d+)\s*題\s*[，、,]\s*完全記述/);
  if (dai && !selective) facts.questions = Number(dai[1]);
  if (selective) facts.selective = true;

  // 防衛医科大のように「選択式・数字記入式・記述式」が同じ試験に同居する大学があるので、
  // 出てくる形式をすべて拾い、1つに決められるときだけ1つ書く。
  if (/完全記述式/.test(text)) facts.style = "完全記述式";
  else if (/選択式/.test(text) && /数字記入式/.test(text)) {
    // 防衛医科大のように、1つの試験に選択式・数字記入式・記述式が同居する
    facts.style = ["選択式", "数字記入式", /記述式/.test(text) ? "記述式" : null].filter(Boolean).join("・");
  } else if (/空欄補充/.test(text)) facts.style = "空欄補充";
  else if (/マークシート/.test(text) && /記述/.test(text)) facts.style = "マーク＋記述";
  else if (/マークシート/.test(text)) facts.style = "マークシート";
  else if (/記述式/.test(text)) facts.style = "記述式";

  facts.points = extractPoints(text);
  if (facts.points == null) delete facts.points;

  return facts;
}

/**
 * 「難易度と目標」の節から、目標点にあたる1文を拾う。
 * FAQ に使うので、言い切っている文だけを採る。
 */
function extractGoal(sections) {
  const sec = sections.find((s) => /目標|難易度/.test(s.title));
  if (!sec) return "";
  const text = sec.blocks
    .filter((b) => b.type === "p")
    .map((b) => spansToPlain(b.spans))
    .join("");
  for (const s of text.split(/(?<=。)/)) {
    if (!/目標(は|点|得点)|狙いたい|確保したい|取りきりたい/.test(s) || s.length >= 120) continue;
    const line = s.replace(/\s+/g, "").trim();
    // 「目標は次のとおり。」だけを拾っても、FAQ の答えとしては何も言っていない。
    // 後ろの表や箇条書きを指しているだけの文はここで落とす。
    if (/^目標(点)?は?(次|以下|下記|上記|表)/.test(line)) continue;
    // 点数・完答数のどちらも書いていない一文は、目標として成立していない
    if (!/\d/.test(line)) continue;
    return line;
  }
  return "";
}

/**
 * 「2027年度から試験時間と配点が変わる」のように、
 * このページの数字がそのままでは通用しなくなる変更を拾う。
 *
 * 予想問題集が狙うのは次年度の入試なので、
 * 過去問から出した数字だけを黙って出すと受験生に古い情報を見せることになる。
 */
function extractChange(sections, lead) {
  const blocks = [...lead, ...sections.flatMap((x) => x.blocks)];
  const text = blocks
    .filter((b) => b.type === "p")
    .map((b) => spansToPlain(b.spans))
    .join("");
  for (const s of text.split(/(?<=。)/)) {
    // 対象は「これから起きる変更」だけ。既に済んだ変更や、
    // 表の内訳を述べただけの文（「上の一覧は…8年46題である」）は拾わない。
    if (!/20(2[7-9]|[3-9]\d)年度/.test(s)) continue;
    if (/上の一覧|次の一覧|からなる|内訳/.test(s)) continue;
    if (!/(から|より)[^。]{0,60}(変わ|変更|拡大|縮小|休止|廃止|加え|加わ|追加|新設)/.test(s)) continue;
    // 「加わった」「変わった」は完了。ページの数字はもう新しいほうを指している。
    if (/(変わ|拡大|縮小|加わ|追加)っ?た[。，、]?$/.test(s.trim())) continue;
    const line = s.replace(/\s+/g, "").trim();
    if (line.length >= 20 && line.length <= 160) return line;
  }
  return "";
}

/** 冒頭に出すリード文。最初の段落の1〜2文だけを使う。 */
function leadSentences(blocks, maxLen = 120) {
  const p = blocks.find((b) => b.type === "p");
  if (!p) return "";
  const text = spansToPlain(p.spans).replace(/\s+/g, "");
  const out = [];
  let total = 0;
  for (const s of text.split(/(?<=。)/)) {
    if (total + s.length > maxLen && out.length) break;
    out.push(s);
    total += s.length;
  }
  return out.join("");
}

/**
 * ページに載せる分析対象年度を決める。
 *
 * 見出しの「（2019--2026年度）」は原稿によっては分析全体の構想を書いたままで、
 * 実際に載っている年度別出題一覧と食い違うことがある（千葉大・愛媛大）。
 * 読者が数えられるのは表のほうなので、表があれば表を正とする。
 */
function resolveYears(analysisTitle, yearTable) {
  const fromTable = yearTable
    ? yearTable.rows
        .map((r) => (cellText(r[0]).match(/(19|20)\d\d/) || [])[0])
        .filter(Boolean)
        .map(Number)
    : [];
  if (fromTable.length >= 3) {
    const uniq = [...new Set(fromTable)].sort((a, b) => a - b);
    return { years: [String(uniq[0]), String(uniq[uniq.length - 1])], yearCount: uniq.length };
  }
  const m = analysisTitle.match(/((?:19|20)\d\d)\s*[-–—〜~]+\s*((?:19|20)\d\d)/);
  if (!m) return { years: [], yearCount: null };
  return { years: [m[1], m[2]], yearCount: Number(m[2]) - Number(m[1]) + 1 };
}

/* ─────────────── 実行 ─────────────── */

const skipped = [];
/** slug → { folder, volumes: { 1: "東大理系数学/東大数学vol1" } } */
const manuscripts = {};

// 本書の構成に関する節はサイトには載せない（分析だけを出す）。
// 第2巻以降には「第1巻との違い」「独自性の確認」のような巻の説明が入るので、それも落とす。
const BOOK_ONLY = /回の並び|校正|本書|付録|使い方|収録|第\s*\d+\s*巻|独自性|重複/;

/** 見出しや書名を突き合わせるための正規化（LaTeX・空白・括弧書きを外す）。 */
const norm = (s) => s.replace(/\\[a-zA-Z]+|[{}$]/g, "").replace(/\s|[（(].*?[）)]/g, "");

/** 全大学の呼び名。ほかの大学の原稿が紛れていないかの判定に使う。 */
const ALL_NAMES = Object.values(universityMeta).map((m) => ({ slug: m.slug, name: norm(m.name) }));

/**
 * その大学の原稿フォルダの中から、「はじめに」を持つ巻のディレクトリを集める。
 *
 * どのフォルダにも雛形として名大の巻（名大数学vol1 など）がコピーされている。
 * フォルダ名では見分けられない（名大文系数学のフォルダにも名大理系の巻が入っている）ので、
 * 「はじめに」の見出しが“別の大学”の名前になっている巻を落とす。
 * 分野別完成演習・診断模試は別シリーズなので対象外。
 */
function volumeDirs(folder, meta) {
  const root = join(HOME, folder);
  if (!existsSync(root)) return [];
  const own = norm(meta.name);
  return readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => existsSync(join(root, name, "front.tex")))
    .filter((name) => !/完成演習|診断模試|のコピー|copy/i.test(name))
    .filter((name) => {
      const head = norm((readFileSync(join(root, name, "front.tex"), "utf8").match(/\\hdA\{([^}]*)\}/) || [])[1] ?? "");
      if (head.includes(own)) return true;
      const other = ALL_NAMES.find((u) => u.slug !== meta.slug && u.name && head.includes(u.name));
      if (other) {
        skipped.push({ title: `${meta.name}／${name}`, why: `ほかの大学の原稿（${other.slug}）なので使わない` });
        return false;
      }
      return true;
    })
    .sort()
    .map((name) => `${folder}/${name}`);
}

// 大学ごとに、販売中の巻（data/books.json）と原稿のディレクトリをまとめる。
const byFolder = new Map();
for (const [folder, meta] of Object.entries(universityMeta)) {
  const books = Object.values(BOOKS)
    .filter((b) => b.series === "gokaku" && b.slug === meta.slug)
    .sort((a, b) => a.vol - b.vol)
    .map((b) => ({
      title: b.title,
      fullTitle: b.fullTitle,
      asin: b.asin,
      vol: b.vol,
      price: b.price ?? null,
      pages: b.pages ?? null,
      released: b.released ?? null,
      isbn13: b.isbn13 ?? null,
      amazonUrl: `https://www.amazon.co.jp/dp/${b.asin}`,
    }));
  if (!books.length) { skipped.push({ title: meta.name, why: "販売中の巻が登録簿にない" }); continue; }
  const dirs = volumeDirs(folder, meta);
  if (!dirs.length) { skipped.push({ title: meta.name, why: `原稿が見つからない（${folder}）` }); continue; }
  byFolder.set(folder, { books, dirs });

  // 巻番号 → 原稿ディレクトリ。表紙を切り出す側（scripts/build-covers.py）が使う。
  const volumes = {};
  for (const dir of dirs) {
    const n = Number((dir.match(/vol\s*(\d+)/i) || [])[1] ?? 1);
    if (!volumes[n]) volumes[n] = dir;
  }
  manuscripts[meta.slug] = { folder, volumes };

  // 収録している予想問題の回数。多くは5回だが、防衛医科大は6回、千葉工大は8回ある。
  // 原稿の set1_q.tex … を数えるのがいちばん確か。
  for (const b of books) {
    const dir = volumes[b.vol];
    if (!dir) continue;
    const files = readdirSync(join(HOME, dir));
    const n = files.filter((f) => /^set\d+_q\.tex$/.test(f)).length;
    if (n) b.rounds = n;
    // 別解を載せていない巻があるので、あるときだけ「別解つき」と書く。
    // 原稿では betsu 環境（\begin{betsu}）で組まれている。
    b.altSolutions = files
      .filter((f) => /^set\d+_[ard]/.test(f))
      .some((f) => /別解|\\begin\{betsu\}/.test(readFileSync(join(HOME, dir, f), "utf8")));
  }
}

const items = [];

for (const [folder, { books, dirs }] of byFolder) {
  const meta = universityMeta[folder];

  // 代表に使う巻を決める。
  // 年度別の出題一覧を持つ巻のうち最初のもの（＝第1巻）を優先する。
  // 第2巻以降は分析が省かれていたり、巻ごとに目標点の書き方が違ったりするため、
  // 大学の分析としては最初の巻に揃えるほうがぶれない。
  let best = null;
  for (const dir of dirs) {
    let data;
    try {
      data = extract(dir);
    } catch (e) {
      skipped.push({ title: `${meta.name}（${dir}）`, why: e.message });
      continue;
    }
    if (!data) continue;
    const tables = [...data.lead, ...data.sections.flatMap((s) => s.blocks)].filter((x) => x.type === "table");
    const hasYears = tables.some(isYearTable);
    const score = (hasYears ? 100 : 0) + tables.length + data.sections.length;
    if (!best || score > best.score) best = { data, tables, score, from: dir };
    if (hasYears) break; // 年度別表のある最初の巻を採る
  }
  if (!best) { skipped.push({ title: folder, why: "分析セクションを取得できず" }); continue; }

  const { data, tables } = best;
  const allBlocks = [...data.lead, ...data.sections.flatMap((s) => s.blocks)];
  const yearTable = tables.find(isYearTable) ?? null;
  items.push({
    ...meta,
    folder,
    analysisTitle: data.analysisTitle,
    // 年度別出題一覧を正として、なければ見出しの「（2019--2026年度）」から
    ...resolveYears(data.analysisTitle, yearTable),
    facts: extractFacts(allBlocks),
    summary: leadSentences(allBlocks),
    goal: extractGoal(data.sections),
    change: extractChange(data.sections, data.lead),
    lead: data.lead,
    sections: data.sections.filter((s) => !BOOK_ONLY.test(s.title)),
    yearTable,
    fieldTable: tables.find(isFieldTable) ?? null,
    fieldChart: toFieldChart(tables.find(isFieldTable)),
    books,
  });
}

mkdirSync(join(OUT_DIR), { recursive: true });
writeFileSync(join(OUT_DIR, "analysis.json"), JSON.stringify(items, null, 2));
writeFileSync(join(OUT_DIR, "manuscripts.json"), `${JSON.stringify(manuscripts, null, 2)}\n`);

/* ─────────────── 検証 ─────────────── */

const bookCount = items.reduce((a, g) => a + g.books.length, 0);
console.log(`大学ページ: ${items.length} 件 / 書籍: ${bookCount} 冊`);
for (const s of skipped) console.log("  skip:", s.title, "|", s.why);

const problems = [];
for (const g of items) {
  if (!g.yearTable) problems.push(`${g.name}: 年度別表なし`);
  if (!g.sections.length) problems.push(`${g.name}: 分析セクションなし`);
  if (/tabular|enumerate|linewidth/.test(JSON.stringify(g))) problems.push(`${g.name}: LaTeX残渣`);
}
const slugs = items.map((g) => g.slug);
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupes.length) problems.push(`slug 重複: ${dupes.join(", ")}`);

if (problems.length) {
  console.log("\n要確認:");
  for (const p of problems) console.log("  -", p);
} else {
  console.log("検証: 問題なし");
}
