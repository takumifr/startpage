// 将来 localStorage や Firebase に置き換えやすいように、リンク情報は配列で管理します。
const links = [
  { category: "AI", name: "ChatGPT", description: "文章作成や調べものの相談に使うAIツール", icon: "AI", url: "https://chat.openai.com/" },
  { category: "AI", name: "Claude", description: "長文の整理やアイデア出しに便利なAIツール", icon: "🤖", url: "https://claude.ai/" },
  { category: "Google", name: "Google検索", description: "日々の検索や情報収集の入口", icon: "G", url: "https://www.google.com/" },
  { category: "Google", name: "Gmail", description: "メールの確認と送受信", icon: "✉️", url: "https://mail.google.com/" },
  { category: "Google", name: "Googleカレンダー", description: "予定やタスクの確認", icon: "📅", url: "https://calendar.google.com/" },
  { category: "YouTube", name: "YouTube", description: "動画視聴や学習コンテンツの確認", icon: "▶️", url: "https://www.youtube.com/" },
  { category: "YouTube", name: "YouTube Studio", description: "動画チャンネルの管理画面", icon: "🎬", url: "https://studio.youtube.com/" },
  { category: "農業", name: "農林水産省", description: "農業政策や統計情報の確認", icon: "🌾", url: "https://www.maff.go.jp/" },
  { category: "農業", name: "気象庁", description: "天気や警報、気象情報の確認", icon: "☀️", url: "https://www.jma.go.jp/" },
  { category: "金融", name: "Yahoo!ファイナンス", description: "株価や為替、経済ニュースの確認", icon: "💹", url: "https://finance.yahoo.co.jp/" },
  { category: "金融", name: "日本銀行", description: "金利や金融政策に関する公式情報", icon: "￥", url: "https://www.boj.or.jp/" },
  { category: "買い物", name: "Amazon", description: "日用品や本などのオンライン購入", icon: "🛒", url: "https://www.amazon.co.jp/" },
  { category: "買い物", name: "楽天市場", description: "ポイントを活用した買い物", icon: "R", url: "https://www.rakuten.co.jp/" },
  { category: "仕事", name: "Google Drive", description: "仕事用ファイルや資料の確認", icon: "📁", url: "https://drive.google.com/" },
  { category: "仕事", name: "Notion", description: "メモやプロジェクト情報の整理", icon: "N", url: "https://www.notion.so/" }
];

const categoryOrder = ["AI", "Google", "YouTube", "農業", "金融", "買い物", "仕事"];
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

function filterLinksByName(searchText) {
  const keyword = searchText.trim().toLowerCase();

  if (keyword === "") {
    return links;
  }

  return links.filter((link) => link.name.toLowerCase().includes(keyword));
}

searchInput.addEventListener("input", (event) => {
  const filteredLinks = filterLinksByName(event.target.value);
  renderLinks(filteredLinks);
});

renderLinks(links);
