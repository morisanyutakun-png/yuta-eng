// 販売中の本の登録簿。ASIN と、それがどのシリーズ・どの大学の第何巻かだけを持つ。
// 書名・価格・ページ数・発売日は Amazon にしかないので、`npm run data:books` で
// 各商品ページから取り直して data/books.json に書き出す（このファイルは触らない）。
//
// 新しい本を出したら、ここに1行足して `npm run data:books` → `npm run data` を実行する。
// slug は大学別分析（/univ/<slug>）と同じ。scripts/university-meta.mjs に無い slug は
// 分析ページを作れないので、あわせてそちらにも原稿フォルダを登録すること。
//
// series
//   gokaku  … 合格答案をつくる（本番形式の予想問題集）
//   kansei  … 過去問の前に 分野別完成演習
//   shindan … 過去問の前に 志望校診断模試

export const bookRegistry = [
  { asin: "B0HFFFP2PQ", series: "gokaku", slug: "aizu", vol: 1 },

  { asin: "B0HFGG5KF8", series: "gokaku", slug: "asahikawa", vol: 1 },

  { asin: "B0HCL22WBH", series: "gokaku", slug: "chiba", vol: 1 },

  { asin: "B0HKJ1FDCP", series: "gokaku", slug: "cit", vol: 1 },

  { asin: "B0HG6S5SM9", series: "gokaku", slug: "ehime", vol: 1 },

  { asin: "B0HDLDXP6N", series: "gokaku", slug: "fmu", vol: 1 },

  { asin: "B0HH8L9R94", series: "gokaku", slug: "gifu", vol: 1 },

  { asin: "B0HDLRS74P", series: "gokaku", slug: "gifu-pharm", vol: 1 },

  { asin: "B0HFFKBVRH", series: "gokaku", slug: "handai-bunkei", vol: 1 },
  { asin: "B0HKGH2HK1", series: "gokaku", slug: "handai-bunkei", vol: 2 },

  { asin: "B0HBRD9C67", series: "gokaku", slug: "handai-rikei", vol: 1 },
  { asin: "B0HHYQH459", series: "gokaku", slug: "handai-rikei", vol: 2 },
  { asin: "B0HKGP9KDS", series: "gokaku", slug: "handai-rikei", vol: 3 },

  { asin: "B0HCKNQTPH", series: "gokaku", slug: "hiroshima", vol: 1 },

  { asin: "B0HJN7TSFS", series: "gokaku", slug: "hiroshima-bunkei", vol: 1 },

  { asin: "B0HBVGDG5F", series: "gokaku", slug: "hitotsubashi", vol: 1 },
  { asin: "B0HH66D1ND", series: "gokaku", slug: "hitotsubashi", vol: 2 },
  { asin: "B0HHZ1RSF5", series: "gokaku", slug: "hitotsubashi", vol: 3 },

  { asin: "B0HFFL3X7C", series: "gokaku", slug: "hokudai-bunkei", vol: 1 },

  { asin: "B0HCPBLLSH", series: "gokaku", slug: "hokudai-rikei", vol: 1 },
  { asin: "B0HHZ1L4RB", series: "gokaku", slug: "hokudai-rikei", vol: 2 },

  { asin: "B0HBJ9B611", series: "gokaku", slug: "kagakudai", vol: 1 },
  { asin: "B0HG6TX7NV", series: "gokaku", slug: "kagakudai", vol: 2 },
  { asin: "B0HH8P5CLD", series: "gokaku", slug: "kagakudai", vol: 3 },

  { asin: "B0HG6QZTQ7", series: "gokaku", slug: "kanazawa", vol: 1 },

  { asin: "B0HH7V9TD2", series: "gokaku", slug: "keio-keizai", vol: 1 },

  { asin: "B0HG6M2GVN", series: "gokaku", slug: "keio-med", vol: 1 },

  { asin: "B0HBRL64VP", series: "gokaku", slug: "keio-riko", vol: 1 },

  { asin: "B0HH7DTXJ4", series: "gokaku", slug: "keio-shou", vol: 1 },

  { asin: "B0HFFMQDBT", series: "gokaku", slug: "kit", vol: 1 },

  { asin: "B0HDL9Y8H8", series: "gokaku", slug: "kobe-bunkei", vol: 1 },

  { asin: "B0HBQC238T", series: "gokaku", slug: "kobe-rikei", vol: 1 },
  { asin: "B0HG6MNS6B", series: "gokaku", slug: "kobe-rikei", vol: 2 },

  { asin: "B0HDN1SJY4", series: "gokaku", slug: "kumamoto-med", vol: 1 },

  { asin: "B0HDRW25CV", series: "gokaku", slug: "kumamoto-rikei", vol: 1 },

  { asin: "B0HDLZ39BR", series: "gokaku", slug: "kyodai-bunkei", vol: 1 },
  { asin: "B0HKGNT8L1", series: "gokaku", slug: "kyodai-bunkei", vol: 2 },

  { asin: "B0HCKZFG2Z", series: "gokaku", slug: "kyodai-rikei", vol: 1 },
  { asin: "B0HG6MM246", series: "gokaku", slug: "kyodai-rikei", vol: 2 },
  { asin: "B0HH75YXHQ", series: "gokaku", slug: "kyodai-rikei", vol: 3 },

  { asin: "B0HH7FQ16Y", series: "gokaku", slug: "kyudai-bunkei", vol: 1 },

  { asin: "B0HCKX933K", series: "gokaku", slug: "kyudai-rikei", vol: 1 },
  { asin: "B0HHZ5X12S", series: "gokaku", slug: "kyudai-rikei", vol: 2 },

  { asin: "B0HCL7GPGX", series: "gokaku", slug: "mie", vol: 1 },
  { asin: "B0HKP1XLSP", series: "gokaku", slug: "mie", vol: 2 },

  { asin: "B0HDS2QHZR", series: "gokaku", slug: "nagoya-bunkei", vol: 1 },

  { asin: "B0HBB92D4W", series: "gokaku", slug: "nagoya-rikei", vol: 1 },
  { asin: "B0HBJJJLZC", series: "gokaku", slug: "nagoya-rikei", vol: 2 },
  { asin: "B0HHYST3V9", series: "gokaku", slug: "nagoya-rikei", vol: 3 },

  { asin: "B0HG6V184W", series: "gokaku", slug: "ncu-med", vol: 1 },

  { asin: "B0HJP1WS1J", series: "gokaku", slug: "ncu-pharm", vol: 1 },

  { asin: "B0HL9JF345", series: "gokaku", slug: "ndmc", vol: 1 },

  { asin: "B0HG7ZGD4L", series: "gokaku", slug: "niigata", vol: 1 },

  { asin: "B0HBPCCZ2H", series: "gokaku", slug: "nitech", vol: 1 },

  { asin: "B0HJNHPGJV", series: "gokaku", slug: "obihiro", vol: 1 },

  { asin: "B0HCTGKD1N", series: "gokaku", slug: "okayama", vol: 1 },

  { asin: "B0HJQDJBC9", series: "gokaku", slug: "okayama-bunkei", vol: 1 },

  { asin: "B0HH94PJ65", series: "gokaku", slug: "omu", vol: 1 },

  { asin: "B0HBVWYTQN", series: "gokaku", slug: "saitama", vol: 1 },

  { asin: "B0HDN1B34V", series: "gokaku", slug: "shizuoka", vol: 1 },

  { asin: "B0HJQGFWMK", series: "gokaku", slug: "tmu-bunkei", vol: 1 },

  { asin: "B0HFFNY42Z", series: "gokaku", slug: "tmu-math", vol: 1 },

  { asin: "B0HFGFLGCS", series: "gokaku", slug: "tmu-rikei", vol: 1 },

  { asin: "B0HDL4FSDC", series: "gokaku", slug: "todai-bunkei", vol: 1 },
  { asin: "B0HKGLW8JN", series: "gokaku", slug: "todai-bunkei", vol: 2 },

  { asin: "B0HCKS2FVN", series: "gokaku", slug: "todai-rikei", vol: 1 },
  { asin: "B0HG6MC2LK", series: "gokaku", slug: "todai-rikei", vol: 2 },
  { asin: "B0HH6YNNNV", series: "gokaku", slug: "todai-rikei", vol: 3 },

  { asin: "B0HFFQ2D44", series: "gokaku", slug: "tohoku-bunkei", vol: 1 },

  { asin: "B0HBQJZGZ1", series: "gokaku", slug: "tohoku-rikei", vol: 1 },
  { asin: "B0HHYJXBLN", series: "gokaku", slug: "tohoku-rikei", vol: 2 },

  { asin: "B0HCKYQPL6", series: "gokaku", slug: "tsukuba", vol: 1 },

  { asin: "B0HFG7NC8K", series: "gokaku", slug: "tuat", vol: 1 },

  { asin: "B0HDLGK9ZZ", series: "gokaku", slug: "tus-ri1", vol: 1 },

  { asin: "B0HFGLFL3N", series: "gokaku", slug: "uec", vol: 1 },

  { asin: "B0HBX7CP8T", series: "gokaku", slug: "waseda-jinka", vol: 1 },

  { asin: "B0HBVPZ413", series: "gokaku", slug: "waseda-riko", vol: 1 },

  { asin: "B0HH75SCNR", series: "gokaku", slug: "ycu-med", vol: 1 },

  { asin: "B0HCL9TRXL", series: "gokaku", slug: "yokokoku", vol: 1 },

  { asin: "B0HJNDSX12", series: "gokaku", slug: "yokokoku-bunkei", vol: 1 },

  { asin: "B0HJR15WBD", series: "kansei", slug: "handai-rikei", vol: 1 },

  { asin: "B0HKGK1DZW", series: "kansei", slug: "hokudai-rikei", vol: 1 },

  { asin: "B0HHZPM96X", series: "kansei", slug: "kagakudai", vol: 1 },

  { asin: "B0HHZQ8X7H", series: "kansei", slug: "kyodai-rikei", vol: 1 },

  { asin: "B0HKGGJMYZ", series: "kansei", slug: "kyudai-rikei", vol: 1 },

  { asin: "B0HJ1YXFWW", series: "kansei", slug: "nagoya-rikei", vol: 1 },

  { asin: "B0HJ1JGFDV", series: "kansei", slug: "todai-rikei", vol: 1 },

  { asin: "B0HKL25QL6", series: "kansei", slug: "tohoku-rikei", vol: 1 },

  { asin: "B0HJQP1VD3", series: "shindan", slug: "shindan", vol: 1 },
];
