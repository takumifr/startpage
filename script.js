// リンクを増やしたいときは、この links 配列にオブジェクトを追加します。
// category は categoryOrder にある名前と合わせると、指定した順番で表示されます。
const links = [
  {
    category: "AI",
    name: "ChatGPT",
    description: "文章作成、調べもの、アイデア出しに使えるOpenAIのAIチャット。",
    icon: "AI",
    url: "https://chat.openai.com/"
  },
  {
    category: "AI",
    name: "Claude",
    description: "長文の読解、要約、企画整理に使いやすいAIアシスタント。",
    icon: "🤖",
    url: "https://claude.ai/"
  },
  {
    category: "AI",
    name: "Gemini",
    description: "GoogleのAIチャット。検索やGoogleサービスとあわせた調査に便利。",
    icon: "◇",
    url: "https://gemini.google.com/"
  },
  {
    category: "AI",
    name: "NotebookLM",
    description: "資料やメモを読み込ませて、要約や質問回答に使えるノート型AI。",
    icon: "📓",
    url: "https://notebooklm.google.com/"
  },
  {
    category: "AI",
    name: "Codex",
    description: "コード作成や修正の相談に使う開発向けAIツール。",
    icon: "⌘",
    url: "https://chatgpt.com/codex"
  },
  {
    category: "Google",
    name: "Google検索",
    description: "日々の検索、情報収集、公式サイト探しの入口。",
    icon: "G",
    url: "https://www.google.com/"
  },
  {
    category: "Google",
    name: "Gmail",
    description: "メールの確認、送受信、問い合わせ対応。",
    icon: "✉️",
    url: "https://mail.google.com/"
  },
  {
    category: "Google",
    name: "Google Drive",
    description: "写真、書類、仕事用ファイルを保存して共有するクラウドドライブ。",
    icon: "📁",
    url: "https://drive.google.com/"
  },
  {
    category: "Google",
    name: "Googleカレンダー",
    description: "予定、作業日、出荷日、打ち合わせを確認するカレンダー。",
    icon: "📅",
    url: "https://calendar.google.com/"
  },
  {
    category: "Google",
    name: "Googleスプレッドシート",
    description: "売上、在庫、作業記録などを表で管理するGoogleの表計算ツール。",
    icon: "▦",
    url: "https://sheets.google.com/"
  },
  {
    category: "Google",
    name: "Googleドキュメント",
    description: "文章、手順書、下書き、共有資料を作るGoogleの文書ツール。",
    icon: "📄",
    url: "https://docs.google.com/"
  },
  {
    category: "Google",
    name: "Googleフォト",
    description: "写真や動画の確認、整理、共有に使うフォトストレージ。",
    icon: "🌈",
    url: "https://photos.google.com/"
  },
  {
    category: "Google",
    name: "Googleマップ",
    description: "行き先、店舗、農地周辺、配送ルートを確認する地図サービス。",
    icon: "🗺️",
    url: "https://www.google.com/maps"
  },
  {
    category: "YouTube",
    name: "YouTube",
    description: "動画視聴、学習、情報収集、チャンネル確認。",
    icon: "▶️",
    url: "https://www.youtube.com/"
  },
  {
    category: "YouTube",
    name: "YouTube Studio",
    description: "動画投稿、コメント、アナリティクスを管理するチャンネル管理画面。",
    icon: "🎬",
    url: "https://studio.youtube.com/"
  },
  {
    category: "YouTube",
    name: "YouTube履歴",
    description: "過去に見た動画や検索履歴を確認するページ。",
    icon: "🕘",
    url: "https://www.youtube.com/feed/history"
  },
  {
    category: "農業",
    name: "農林水産省",
    description: "農業政策、補助金、統計、災害関連情報を確認する公式サイト。",
    icon: "🌾",
    url: "https://www.maff.go.jp/"
  },
  {
    category: "農業",
    name: "気象庁",
    description: "天気予報、警報、台風、雨雲などの気象情報を確認。",
    icon: "☀️",
    url: "https://www.jma.go.jp/"
  },
  {
    category: "農業",
    name: "アメダス",
    description: "降水量、気温、日照、風など地域ごとの観測データを確認。",
    icon: "🌧️",
    url: "https://www.jma.go.jp/bosai/amedas/"
  },
  {
    category: "農業",
    name: "JA関連ページ",
    description: "地域のJA情報、農業支援、営農関連ページを探す入口。",
    icon: "JA",
    url: "https://life.ja-group.jp/"
  },
  {
    category: "農業",
    name: "農薬登録情報提供システム",
    description: "農薬の登録内容、適用作物、使用方法を調べる公式データベース。",
    icon: "🧪",
    url: "https://pesticide.maff.go.jp/"
  },
  {
    category: "販売",
    name: "BASE",
    description: "ネットショップ作成、商品登録、注文管理に使う販売サービス。",
    icon: "B",
    url: "https://thebase.com/"
  },
  {
    category: "販売",
    name: "ポケットマルシェ",
    description: "生産者から直接販売できる産直マーケットプレイス。",
    icon: "🥕",
    url: "https://poke-m.com/"
  },
  {
    category: "販売",
    name: "食べチョク",
    description: "農産物や加工品を消費者へ直接販売する産直通販サイト。",
    icon: "🍅",
    url: "https://www.tabechoku.com/"
  },
  {
    category: "販売",
    name: "産直アウル",
    description: "野菜、果物、米などを出品できる産直販売サービス。",
    icon: "🦉",
    url: "https://owl-food.com/"
  },
  {
    category: "販売",
    name: "メルカリ",
    description: "不用品や商品を出品、購入できるフリマサービス。",
    icon: "M",
    url: "https://jp.mercari.com/"
  },
  {
    category: "金融",
    name: "Yahoo!ファイナンス",
    description: "株価、為替、経済ニュース、ポートフォリオ確認。",
    icon: "💹",
    url: "https://finance.yahoo.co.jp/"
  },
  {
    category: "金融",
    name: "日本銀行",
    description: "金利、金融政策、統計、経済レポートを確認する公式サイト。",
    icon: "￥",
    url: "https://www.boj.or.jp/"
  },
  {
    category: "金融",
    name: "SBI証券",
    description: "株式、投資信託、口座情報を確認する証券サービス。",
    icon: "S",
    url: "https://www.sbisec.co.jp/"
  },
  {
    category: "金融",
    name: "楽天証券",
    description: "投資、資産状況、マーケット情報を確認する証券サービス。",
    icon: "R",
    url: "https://www.rakuten-sec.co.jp/"
  },
  {
    category: "買い物",
    name: "Amazon",
    description: "日用品、本、家電、資材などを購入するオンラインストア。",
    icon: "🛒",
    url: "https://www.amazon.co.jp/"
  },
  {
    category: "買い物",
    name: "楽天市場",
    description: "ポイントを活用して食品、日用品、資材を購入するショッピングモール。",
    icon: "R",
    url: "https://www.rakuten.co.jp/"
  },
  {
    category: "買い物",
    name: "Yahoo!ショッピング",
    description: "PayPay連携やポイント還元を使える買い物サイト。",
    icon: "Y!",
    url: "https://shopping.yahoo.co.jp/"
  },
  {
    category: "買い物",
    name: "モノタロウ",
    description: "工具、農業資材、事務用品、消耗品を探しやすい通販サイト。",
    icon: "🔧",
    url: "https://www.monotaro.com/"
  },
  {
    category: "仕事",
    name: "Google Drive",
    description: "仕事用資料、請求書、写真、共有ファイルの保管場所。",
    icon: "📁",
    url: "https://drive.google.com/"
  },
  {
    category: "仕事",
    name: "Notion",
    description: "メモ、タスク、プロジェクト、作業手順をまとめるワークスペース。",
    icon: "N",
    url: "https://www.notion.so/"
  },
  {
    category: "仕事",
    name: "GitHub",
    description: "コード、課題、リポジトリ、Web制作の作業状況を管理。",
    icon: "GH",
    url: "https://github.com/"
  },
  {
    category: "仕事",
    name: "ChatGPT Codex",
    description: "仕事や開発のコード作成、修正、調査をAIに相談する入口。",
    icon: "⌘",
    url: "https://chatgpt.com/codex"
  },
  {
    category: "仕事",
    name: "Google Keep",
    description: "短いメモ、買うもの、思いついた作業をすばやく記録。",
    icon: "📝",
    url: "https://keep.google.com/"
  },
  {
    category: "開発",
    name: "GitHub",
    description: "ソースコード管理、Issue、Pull Request、GitHub Pagesの入口。",
    icon: "GH",
    url: "https://github.com/"
  },
  {
    category: "開発",
    name: "Codex Web",
    description: "ブラウザから開発作業を進めるためのCodexページ。",
    icon: "⌘",
    url: "https://chatgpt.com/codex"
  },
  {
    category: "開発",
    name: "GitHub Pages",
    description: "静的サイト公開や設定方法を確認するGitHub Pages公式ドキュメント。",
    icon: "🌐",
    url: "https://pages.github.com/"
  },
  {
    category: "開発",
    name: "MDN Web Docs",
    description: "HTML、CSS、JavaScriptの仕様や使い方を調べる開発者向け資料。",
    icon: "</>",
    url: "https://developer.mozilla.org/ja/"
  },
  {
    category: "その他",
    name: "Wikipedia",
    description: "用語、人物、地域、歴史などをざっくり調べる百科事典。",
    icon: "W",
    url: "https://ja.wikipedia.org/"
  },
  {
    category: "その他",
    name: "DeepL翻訳",
    description: "日本語と英語などの翻訳、文章の意味確認に使う翻訳ツール。",
    icon: "翻",
    url: "https://www.deepl.com/translator"
  }
];

const categoryOrder = [
  "AI",
  "Google",
  "YouTube",
  "農業",
  "販売",
  "金融",
  "買い物",
  "仕事",
  "開発",
  "その他"
];
const searchInput = document.querySelector("#searchInput");
const linkSections = document.querySelector("#linkSections");
const emptyMessage = document.querySelector("#emptyMessage");

function createLinkCard(link) {
  const card = document.createElement("a");
  card.className = "link-card";
  card.href = link.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.setAttribute("aria-label", `${link.name}を新しいタブで開く`);

  card.innerHTML = `
    <div class="link-card__content">
      <span class="link-card__icon" aria-hidden="true">${link.icon}</span>
      <span class="link-card__name">${link.name}</span>
      <p class="link-card__description">${link.description}</p>
    </div>
  `;

  return card;
}

function groupLinksByCategory(filteredLinks) {
  return categoryOrder
    .map((category) => ({
      category,
      links: filteredLinks.filter((link) => link.category === category)
    }))
    .filter((group) => group.links.length > 0);
}

function renderLinks(filteredLinks) {
  linkSections.innerHTML = "";
  emptyMessage.hidden = filteredLinks.length > 0;

  const groups = groupLinksByCategory(filteredLinks);

  groups.forEach((group) => {
    const section = document.createElement("section");
    section.className = "category";

    const title = document.createElement("h2");
    title.className = "category__title";
    title.textContent = group.category;

    const grid = document.createElement("div");
    grid.className = "card-grid";

    group.links.forEach((link) => {
      grid.appendChild(createLinkCard(link));
    });

    section.appendChild(title);
    section.appendChild(grid);
    linkSections.appendChild(section);
  });
}

function filterLinks(searchText) {
  const keyword = searchText.trim().toLowerCase();

  if (keyword === "") {
    return links;
  }

  return links.filter((link) => {
    const searchTarget = `${link.name} ${link.category} ${link.description}`.toLowerCase();
    return searchTarget.includes(keyword);
  });
}

searchInput.addEventListener("input", (event) => {
  const filteredLinks = filterLinks(event.target.value);
  renderLinks(filteredLinks);
});

renderLinks(links);
