// 原稿フォルダ（第1階層）→ サイト上の大学ページのメタ情報。
// key は ~/ 直下の原稿フォルダ名。1 フォルダ = 1 ページ（巻が複数あってもまとめる）。
// kana … 検索用の読み・略称。スペース区切りで何語でも足せる。
export const universityMeta = {
  /* ── 旧帝大・難関国立 ── */
  東大理系数学: { slug: "todai-rikei", name: "東大理系数学", university: "東京大学", course: "理系", group: "旧帝大", kana: "とうだい とうきょうだいがく 東京大 理系" },
  東大文系数学: { slug: "todai-bunkei", name: "東大文系数学", university: "東京大学", course: "文系", group: "旧帝大", kana: "とうだい とうきょうだいがく 東京大 文系" },
  京大理系数学: { slug: "kyodai-rikei", name: "京大理系数学", university: "京都大学", course: "理系", group: "旧帝大", kana: "きょうだい きょうとだいがく 京都大 理系" },
  京大文系数学: { slug: "kyodai-bunkei", name: "京大文系数学", university: "京都大学", course: "文系", group: "旧帝大", kana: "きょうだい きょうとだいがく 京都大 文系" },
  名大数学: { slug: "nagoya-rikei", name: "名大理系数学", university: "名古屋大学", course: "理系", group: "旧帝大", kana: "めいだい なごやだいがく 名古屋大 理系" },
  名大文系数学: { slug: "nagoya-bunkei", name: "名大文系数学", university: "名古屋大学", course: "文系", group: "旧帝大", kana: "めいだい なごやだいがく 名古屋大 文系" },
  大阪大学数学: { slug: "handai-rikei", name: "阪大理系数学", university: "大阪大学", course: "理系", group: "旧帝大", kana: "はんだい おおさかだいがく 大阪大 阪大 理系" },
  大阪大文系数学: { slug: "handai-bunkei", name: "阪大文系数学", university: "大阪大学", course: "文系", group: "旧帝大", kana: "はんだい おおさかだいがく 大阪大 阪大 文系" },
  東北大学理系数学: { slug: "tohoku-rikei", name: "東北大理系数学", university: "東北大学", course: "理系", group: "旧帝大", kana: "とうほくだい とうほくだいがく 東北大 理系" },
  東北大文系数学: { slug: "tohoku-bunkei", name: "東北大文系数学", university: "東北大学", course: "文系", group: "旧帝大", kana: "とうほくだい とうほくだいがく 東北大 文系" },
  九州大理系数学: { slug: "kyudai-rikei", name: "九大理系数学", university: "九州大学", course: "理系", group: "旧帝大", kana: "きゅうだい きゅうしゅうだいがく 九州大 理系" },
  九大文系数学: { slug: "kyudai-bunkei", name: "九大文系数学", university: "九州大学", course: "文系", group: "旧帝大", kana: "きゅうだい きゅうしゅうだいがく 九州大 文系" },
  北大理系数学: { slug: "hokudai-rikei", name: "北大理系数学", university: "北海道大学", course: "理系", group: "旧帝大", kana: "ほくだい ほっかいどうだいがく 北海道大 理系" },
  北大文系数学: { slug: "hokudai-bunkei", name: "北大文系数学", university: "北海道大学", course: "文系", group: "旧帝大", kana: "ほくだい ほっかいどうだいがく 北海道大 文系" },
  東工大数学: { slug: "kagakudai", name: "東京科学大（旧東工大）数学", university: "東京科学大学", course: "理系", group: "旧帝大", kana: "とうこうだい とうきょうこうぎょうだいがく かがくだい とうきょうかがくだいがく 東工大 科学大" },
  一橋数学: { slug: "hitotsubashi", name: "一橋数学", university: "一橋大学", course: "文系", group: "旧帝大", kana: "ひとつばし ひとつばしだいがく 一橋大 文系" },
  神戸大学数学: { slug: "kobe-rikei", name: "神戸大理系数学", university: "神戸大学", course: "理系", group: "難関国公立", kana: "こうべだい こうべだいがく 神戸大 理系" },
  神戸大文系数学: { slug: "kobe-bunkei", name: "神戸大文系数学", university: "神戸大学", course: "文系", group: "難関国公立", kana: "こうべだい こうべだいがく 神戸大 文系" },

  /* ── 国公立 ── */
  筑波大数学: { slug: "tsukuba", name: "筑波大数学", university: "筑波大学", course: "理系", group: "国公立大", kana: "つくばだい つくばだいがく 筑波大" },
  千葉大数学: { slug: "chiba", name: "千葉大理系数学", university: "千葉大学", course: "理系", group: "国公立大", kana: "ちばだい ちばだいがく 千葉大" },
  横国理系数学: { slug: "yokokoku", name: "横国理系数学", university: "横浜国立大学", course: "理系", group: "国公立大", kana: "よここく よこはまこくりつだいがく 横浜国立 横国" },
  広島大理系数学: { slug: "hiroshima", name: "広大理系数学", university: "広島大学", course: "理系", group: "国公立大", kana: "ひろだい ひろしまだいがく 広島大" },
  岡山大理系数学: { slug: "okayama", name: "岡山大理系数学", university: "岡山大学", course: "理系", group: "国公立大", kana: "おかやまだい おかやまだいがく 岡山大" },
  金沢大理系数学: { slug: "kanazawa", name: "金沢大理系数学", university: "金沢大学", course: "理系", group: "国公立大", kana: "かなざわだい かなざわだいがく 金沢大" },
  新潟大理系数学: { slug: "niigata", name: "新潟大理系数学", university: "新潟大学", course: "理系", group: "国公立大", kana: "にいがただい にいがただいがく 新潟大" },
  熊本大理系数学: { slug: "kumamoto-rikei", name: "熊本大理系数学", university: "熊本大学", course: "理系", group: "国公立大", kana: "くまもとだい くまもとだいがく 熊本大" },
  三重大全学数学: { slug: "mie", name: "三重大数学", university: "三重大学", course: "全学", group: "国公立大", kana: "みえだい みえだいがく 三重大" },
  静大理系数学前期: { slug: "shizuoka", name: "静大理系数学", university: "静岡大学", course: "理系・前期", group: "国公立大", kana: "しずだい しずおかだいがく 静岡大" },
  岐阜大理系数学: { slug: "gifu", name: "岐阜大理系数学", university: "岐阜大学", course: "理系", group: "国公立大", kana: "ぎふだい ぎふだいがく 岐阜大" },
  埼玉大数学: { slug: "saitama", name: "埼玉大理系数学", university: "埼玉大学", course: "理系", group: "国公立大", kana: "さいたまだい さいたまだいがく 埼玉大" },
  愛媛大数学: { slug: "ehime", name: "愛媛大数学", university: "愛媛大学", course: "理系", group: "国公立大", kana: "えひめだい えひめだいがく 愛媛大" },
  東京農工大: { slug: "tuat", name: "東京農工大数学", university: "東京農工大学", course: "理系", group: "国公立大", kana: "のうこうだい とうきょうのうこうだいがく 農工大" },
  電通大数学: { slug: "uec", name: "電通大数学", university: "電気通信大学", course: "理系・前期", group: "国公立大", kana: "でんつうだい でんきつうしんだいがく 電通大" },
  名工大数学: { slug: "nitech", name: "名工大数学", university: "名古屋工業大学", course: "理系", group: "国公立大", kana: "めいこうだい なごやこうぎょうだいがく 名工大" },
  京都工芸繊維大数学: { slug: "kit", name: "京都工芸繊維大数学", university: "京都工芸繊維大学", course: "理系", group: "国公立大", kana: "きょうこうせん きょうとこうげいせんいだいがく 工繊" },
  東京都立大理系数学: { slug: "tmu-rikei", name: "東京都立大理系数学", university: "東京都立大学", course: "理系", group: "国公立大", kana: "とりつだい とうきょうとりつだいがく 都立大 首都大" },
  東京都立大学数理数学: { slug: "tmu-math", name: "東京都立大 数理科学科数学", university: "東京都立大学", course: "数理科学科", group: "国公立大", kana: "とりつだい とうきょうとりつだいがく 都立大 数理科学" },
  大阪公立理系数学前期: { slug: "omu", name: "大阪公立大理系数学", university: "大阪公立大学", course: "理系・前期", group: "国公立大", kana: "おおさかこうりつ おおさかこうりつだいがく 大阪公立 市大 府大" },
  会津大学数学: { slug: "aizu", name: "会津大数学", university: "会津大学", course: "理系", group: "国公立大", kana: "あいづだい あいづだいがく 会津大" },

  /* ── 医・薬 ── */
  熊本大医学数学: { slug: "kumamoto-med", name: "熊本大医学部数学", university: "熊本大学", course: "医学部医学科", group: "医学部・薬学部", kana: "くまもとだい くまもとだいがく 熊本大 医学部 医学科" },
  名市医学数学: { slug: "ncu-med", name: "名市大医学部数学", university: "名古屋市立大学", course: "医学部医学科", group: "医学部・薬学部", kana: "めいしだい なごやしりつだいがく 名市大 医学部 医学科" },
  横浜市立医学数学: { slug: "ycu-med", name: "横市大医学部数学", university: "横浜市立大学", course: "医学部医学科", group: "医学部・薬学部", kana: "よこいち よこはましりつだいがく 横市大 医学部 医学科" },
  福島県立医科大: { slug: "fmu", name: "福島県立医科大数学", university: "福島県立医科大学", course: "医学部医学科", group: "医学部・薬学部", kana: "ふくしまけんりついか ふくしまけんりついかだいがく 福島県立医科大 医学部 医学科" },
  旭川医科大学数学: { slug: "asahikawa", name: "旭川医科大数学", university: "旭川医科大学", course: "医学部医学科", group: "医学部・薬学部", kana: "あさひかわいか あさひかわいかだいがく 旭川医大 医学部 医学科" },
  岐阜薬科大学: { slug: "gifu-pharm", name: "岐阜薬科大数学", university: "岐阜薬科大学", course: "薬学部", group: "医学部・薬学部", kana: "ぎふやっか ぎふやっかだいがく 岐阜薬科大 薬学部" },

  /* ── 私立 ── */
  慶應理工数学: { slug: "keio-riko", name: "慶應理工数学", university: "慶應義塾大学", course: "理工学部", group: "私立大", kana: "けいおう けいおうぎじゅくだいがく 慶応 理工学部" },
  慶應医学数学: { slug: "keio-med", name: "慶應医学部数学", university: "慶應義塾大学", course: "医学部", group: "私立大", kana: "けいおう けいおうぎじゅくだいがく 慶応 医学部" },
  慶應経済数学A: { slug: "keio-keizai", name: "慶應経済数学（A方式）", university: "慶應義塾大学", course: "経済学部A方式", group: "私立大", kana: "けいおう けいおうぎじゅくだいがく 慶応 経済学部" },
  慶應商学部数学A: { slug: "keio-shou", name: "慶應商学部数学", university: "慶應義塾大学", course: "商学部A方式", group: "私立大", kana: "けいおう けいおうぎじゅくだいがく 慶応 商学部" },
  早稲田理工数学: { slug: "waseda-riko", name: "早稲田理工数学", university: "早稲田大学", course: "理工学部", group: "私立大", kana: "わせだ わせだだいがく 早大 理工学部" },
  早稲田数学選抜: { slug: "waseda-jinka", name: "早稲田人科 数学選抜", university: "早稲田大学", course: "人間科学部 数学選抜", group: "私立大", kana: "わせだ わせだだいがく 早大 人間科学部 人科" },
  東京理科大理学第一数学: { slug: "tus-ri1", name: "東京理科大 理学部第一部数学", university: "東京理科大学", course: "理学部第一部", group: "私立大", kana: "りかだい とうきょうりかだいがく 東京理科大 理学部" },
};

// トップページ等での並び順。
export const groupOrder = ["旧帝大", "難関国公立", "国公立大", "医学部・薬学部", "私立大"];
