// 初期リンク一覧です。リセットすると、この内容に戻ります。
// category は categoryOrder にある名前と合わせると、指定した順番で表示されます。
const defaultLinks = [
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
].map((link, index) => ({
  id: `default-${index + 1}`,
  ...link
}));

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
const STORAGE_KEY = "startpage-links-v3";

let links = loadLinks();
let editingLinkId = null;

const searchInput = document.querySelector("#searchInput");
const linkSections = document.querySelector("#linkSections");
const emptyMessage = document.querySelector("#emptyMessage");
const showFormButton = document.querySelector("#showFormButton");
const resetButton = document.querySelector("#resetButton");
const exportButton = document.querySelector("#exportButton");
const importButton = document.querySelector("#importButton");
const importFileInput = document.querySelector("#importFileInput");
const backupMessage = document.querySelector("#backupMessage");
const linkFormPanel = document.querySelector("#linkFormPanel");
const linkForm = document.querySelector("#linkForm");
const formTitle = document.querySelector("#formTitle");
const formMessage = document.querySelector("#formMessage");
const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");
const linkNameInput = document.querySelector("#linkName");
const linkUrlInput = document.querySelector("#linkUrl");
const linkCategoryInput = document.querySelector("#linkCategory");
const linkDescriptionInput = document.querySelector("#linkDescription");
const linkIconInput = document.querySelector("#linkIcon");

function copyDefaultLinks() {
  return defaultLinks.map((link) => ({ ...link }));
}

function loadLinks() {
  const savedLinks = localStorage.getItem(STORAGE_KEY);

  if (!savedLinks) {
    return copyDefaultLinks();
  }

  try {
    const parsedLinks = JSON.parse(savedLinks);
    if (Array.isArray(parsedLinks)) {
      return parsedLinks.map((link, index) => ({
        id: link.id || `saved-${index + 1}`,
        name: link.name || "",
        url: link.url || "",
        category: link.category || "その他",
        description: link.description || "",
        icon: link.icon || "🔗"
      }));
    }
  } catch (error) {
    console.warn("保存済みリンクの読み込みに失敗しました。初期リンクを表示します。", error);
  }

  return copyDefaultLinks();
}

function saveLinks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

function showBackupMessage(message, type = "") {
  backupMessage.textContent = message;
  backupMessage.className = "backup-message";

  if (type) {
    backupMessage.classList.add(`backup-message--${type}`);
  }
}

function createExportFileName() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `startpage-links-${year}-${month}-${day}.json`;
}

function generateImportedId(index) {
  return `imported-${Date.now()}-${index + 1}`;
}

function normalizeImportedLinks(importedLinks) {
  if (!Array.isArray(importedLinks)) {
    throw new Error("JSONの一番外側はリンク一覧の配列にしてください。");
  }

  const usedIds = new Set();

  return importedLinks.map((link, index) => {
    if (!link || typeof link !== "object" || Array.isArray(link)) {
      throw new Error(`${index + 1}件目のリンク形式が正しくありません。`);
    }

    const name = typeof link.name === "string" ? link.name.trim() : "";
    const url = typeof link.url === "string" ? normalizeUrl(link.url) : "";
    const category = typeof link.category === "string" ? link.category.trim() : "";

    if (!name || !url || !category) {
      throw new Error(`${index + 1}件目に必須項目 name / url / category がありません。`);
    }

    const rawId = typeof link.id === "string" ? link.id.trim() : "";
    const id = rawId && !usedIds.has(rawId) ? rawId : generateImportedId(index);
    usedIds.add(id);

    return {
      id,
      name,
      url,
      category,
      description: typeof link.description === "string" ? link.description.trim() : "",
      icon: typeof link.icon === "string" && link.icon.trim() ? link.icon.trim() : "🔗"
    };
  });
}

function normalizeUrl(url) {
  const trimmedUrl = url.trim();
  if (trimmedUrl === "") {
    return "";
  }

  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  return `https://${trimmedUrl}`;
}

function createLinkCard(link) {
  const card = document.createElement("article");
  card.className = "link-card";

  const anchor = document.createElement("a");
  anchor.className = "link-card__main";
  anchor.href = link.url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.setAttribute("aria-label", `${link.name}を新しいタブで開く`);

  const content = document.createElement("div");
  content.className = "link-card__content";

  const icon = document.createElement("span");
  icon.className = "link-card__icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = link.icon || "🔗";

  const name = document.createElement("span");
  name.className = "link-card__name";
  name.textContent = link.name;

  const description = document.createElement("p");
  description.className = "link-card__description";
  description.textContent = link.description;

  content.appendChild(icon);
  content.appendChild(name);
  content.appendChild(description);
  anchor.appendChild(content);

  const actions = document.createElement("div");
  actions.className = "link-card__actions";

  const editButton = document.createElement("button");
  editButton.className = "button button--ghost";
  editButton.type = "button";
  editButton.textContent = "編集";
  editButton.addEventListener("click", () => startEditing(link.id));

  const deleteButton = document.createElement("button");
  deleteButton.className = "button button--danger";
  deleteButton.type = "button";
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", () => deleteLink(link.id));

  actions.appendChild(editButton);
  actions.appendChild(deleteButton);
  card.appendChild(anchor);
  card.appendChild(actions);

  return card;
}

function groupLinksByCategory(filteredLinks) {
  const knownGroups = categoryOrder
    .map((category) => ({
      category,
      links: filteredLinks.filter((link) => link.category === category)
    }))
    .filter((group) => group.links.length > 0);

  const extraCategories = [...new Set(filteredLinks
    .map((link) => link.category)
    .filter((category) => !categoryOrder.includes(category)))];

  const extraGroups = extraCategories.map((category) => ({
    category,
    links: filteredLinks.filter((link) => link.category === category)
  }));

  return [...knownGroups, ...extraGroups];
}

function renderLinks(filteredLinks) {
  linkSections.textContent = "";
  emptyMessage.hidden = filteredLinks.length > 0;

  groupLinksByCategory(filteredLinks).forEach((group) => {
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

function renderCurrentLinks() {
  renderLinks(filterLinks(searchInput.value));
}

function showForm() {
  linkFormPanel.hidden = false;
  linkNameInput.focus();
}

function resetForm() {
  editingLinkId = null;
  linkForm.reset();
  formTitle.textContent = "リンクを追加";
  submitButton.textContent = "追加";
  formMessage.textContent = "";
  linkFormPanel.hidden = true;
}

function startEditing(linkId) {
  const link = links.find((item) => item.id === linkId);
  if (!link) {
    return;
  }

  editingLinkId = linkId;
  formTitle.textContent = "リンクを編集";
  submitButton.textContent = "更新";
  formMessage.textContent = "";
  linkNameInput.value = link.name;
  linkUrlInput.value = link.url;
  linkCategoryInput.value = link.category;
  linkDescriptionInput.value = link.description;
  linkIconInput.value = link.icon;
  linkFormPanel.hidden = false;
  linkNameInput.focus();
}

function exportLinks() {
  const json = JSON.stringify(links, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const downloadUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = createExportFileName();
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  URL.revokeObjectURL(downloadUrl);
  showBackupMessage("現在のリンク一覧をJSONファイルとしてエクスポートしました。", "success");
}

function importLinksFromFile(file) {
  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    try {
      const parsedLinks = JSON.parse(reader.result);
      const importedLinks = normalizeImportedLinks(parsedLinks);

      if (!confirm(`現在のリンク一覧を、選択した${importedLinks.length}件のリンクで上書きしますか？`)) {
        showBackupMessage("インポートをキャンセルしました。");
        return;
      }

      links = importedLinks;
      saveLinks();
      resetForm();
      renderCurrentLinks();
      showBackupMessage(`${importedLinks.length}件のリンクをインポートして保存しました。`, "success");
    } catch (error) {
      showBackupMessage(`インポートできませんでした: ${error.message}`, "error");
    } finally {
      importFileInput.value = "";
    }
  });

  reader.addEventListener("error", () => {
    showBackupMessage("ファイルの読み込みに失敗しました。別のJSONファイルを選んでください。", "error");
    importFileInput.value = "";
  });

  reader.readAsText(file);
}

function deleteLink(linkId) {
  const link = links.find((item) => item.id === linkId);
  if (!link || !confirm(`「${link.name}」を削除しますか？`)) {
    return;
  }

  links = links.filter((item) => item.id !== linkId);
  saveLinks();
  if (editingLinkId === linkId) {
    resetForm();
  }
  renderCurrentLinks();
}

linkForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = linkNameInput.value.trim();
  const url = normalizeUrl(linkUrlInput.value);
  const category = linkCategoryInput.value.trim();
  const description = linkDescriptionInput.value.trim();
  const icon = linkIconInput.value.trim() || "🔗";

  if (!name || !url || !category) {
    formMessage.textContent = "リンク名・URL・カテゴリを入力してください。";
    return;
  }

  const linkData = { name, url, category, description, icon };

  if (editingLinkId) {
    links = links.map((link) => link.id === editingLinkId ? { ...link, ...linkData } : link);
  } else {
    links = [{ id: `user-${Date.now()}`, ...linkData }, ...links];
  }

  saveLinks();
  resetForm();
  renderCurrentLinks();
});

showFormButton.addEventListener("click", () => {
  resetForm();
  showForm();
});

cancelButton.addEventListener("click", resetForm);

exportButton.addEventListener("click", exportLinks);

importButton.addEventListener("click", () => {
  importFileInput.click();
});

importFileInput.addEventListener("change", () => {
  importLinksFromFile(importFileInput.files[0]);
});

resetButton.addEventListener("click", () => {
  if (!confirm("保存データを削除して、初期リンク一覧に戻しますか？")) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  links = copyDefaultLinks();
  resetForm();
  renderCurrentLinks();
});

searchInput.addEventListener("input", renderCurrentLinks);

renderCurrentLinks();

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js", { scope: "./" }).catch((error) => {
      console.warn("Service Workerの登録に失敗しました。ページ本体は通常どおり動作します。", error);
    });
  });
}

registerServiceWorker();
