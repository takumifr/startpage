const HOME_ORDER_KEY_PATCH = "startpage-home-order-v1";
const iconResultCachePatch = new Map();
const failedIconUrlCachePatch = new Set();
const linkShowOnHomeInputPatch = document.querySelector("#linkShowOnHome");

function makeFolderHomeId(folder) { return `folder:${folder}`; }
function makeLinkHomeId(linkId) { return `link:${linkId}`; }
function parseHomeItemId(itemId) {
  const [type, ...rest] = itemId.split(":");
  return { type, id: rest.join(":") };
}

function getAvailableHomeItemIds() {
  return [
    ...getFolders().map(makeFolderHomeId),
    ...links.filter((link) => link.showOnHome).map((link) => makeLinkHomeId(link.id))
  ];
}

function mergeHomeOrderPatch(baseOrder) {
  const available = getAvailableHomeItemIds();
  const validBase = Array.isArray(baseOrder)
    ? baseOrder.filter((item) => typeof item === "string" && available.includes(item))
    : [];
  return [...validBase, ...available.filter((item) => !validBase.includes(item))];
}

function loadHomeOrderPatch() {
  try {
    const parsed = JSON.parse(localStorage.getItem(HOME_ORDER_KEY_PATCH) || "[]");
    if (Array.isArray(parsed)) return mergeHomeOrderPatch(parsed);
  } catch (error) {
    console.warn("ホーム画面の並び順の読み込みに失敗しました。", error);
  }
  return mergeHomeOrderPatch(getFolders().map(makeFolderHomeId));
}

let homeOrderPatch = loadHomeOrderPatch();

function syncFolderOrderFromHomeOrderPatch() {
  const homeFolders = homeOrderPatch
    .map(parseHomeItemId)
    .filter((item) => item.type === "folder")
    .map((item) => item.id);
  folderOrder = mergeFolderOrder([...homeFolders, ...folderOrder]);
}

function saveHomeOrderPatch() {
  homeOrderPatch = mergeHomeOrderPatch(homeOrderPatch);
  syncFolderOrderFromHomeOrderPatch();
  localStorage.setItem(HOME_ORDER_KEY_PATCH, JSON.stringify(homeOrderPatch));
}

normalizeLinks = function normalizeLinksWithHome(rawLinks) {
  const categoryCounts = new Map();
  return rawLinks.map((link, index) => {
    const category = typeof link.category === "string" && link.category.trim() ? link.category.trim() : "その他";
    const order = Number.isFinite(link.order) ? link.order : (categoryCounts.get(category) || 0);
    categoryCounts.set(category, Math.max(categoryCounts.get(category) || 0, order + 1));
    return {
      id: typeof link.id === "string" && link.id ? link.id : `saved-${index + 1}`,
      name: typeof link.name === "string" ? link.name : "",
      url: typeof link.url === "string" ? link.url : "",
      category,
      description: typeof link.description === "string" ? link.description : "",
      icon: typeof link.icon === "string" && link.icon ? link.icon : "🔗",
      iconSource: normalizeIconSource(link.iconSource),
      iconUrl: typeof link.iconUrl === "string" ? normalizeOptionalUrl(link.iconUrl) : "",
      showOnHome: link.showOnHome === true,
      order
    };
  });
};

normalizeImportedLinks = function normalizeImportedLinksWithHome(importedLinks) {
  if (!Array.isArray(importedLinks)) throw new Error("JSONの一番外側はリンク一覧の配列にしてください。");
  const usedIds = new Set();
  return normalizeLinks(importedLinks.map((link, index) => {
    if (!link || typeof link !== "object" || Array.isArray(link)) throw new Error(`${index + 1}件目のリンク形式が正しくありません。`);
    const name = typeof link.name === "string" ? link.name.trim() : "";
    const url = typeof link.url === "string" ? normalizeUrl(link.url) : "";
    const category = typeof link.category === "string" ? link.category.trim() : "";
    if (!name || !url || !category) throw new Error(`${index + 1}件目に必須項目 name / url / category がありません。`);
    const rawId = typeof link.id === "string" ? link.id.trim() : "";
    const id = rawId && !usedIds.has(rawId) ? rawId : generateImportedId(index);
    usedIds.add(id);
    return {
      id,
      name,
      url,
      category,
      description: typeof link.description === "string" ? link.description.trim() : "",
      icon: typeof link.icon === "string" && link.icon.trim() ? link.icon.trim() : "🔗",
      iconSource: normalizeIconSource(link.iconSource),
      iconUrl: typeof link.iconUrl === "string" ? normalizeOptionalUrl(link.iconUrl) : "",
      showOnHome: link.showOnHome === true,
      order: Number.isFinite(link.order) ? link.order : undefined
    };
  }));
};

persistAll = function persistAllWithHome() {
  normalizeOrders();
  saveLinks();
  saveHomeOrderPatch();
  saveFolderOrder();
};

function getIconCacheKeyPatch(link) {
  const parts = getUrlParts(link.url);
  return [normalizeIconSource(link.iconSource), link.iconUrl || "", parts?.href || link.url || ""].join("|");
}

getTouchIconUrls = function getTouchIconUrlsHighRes(parts) {
  if (!parts?.origin) return [];
  return [
    `${parts.origin}/apple-touch-icon-180x180.png`,
    `${parts.origin}/apple-touch-icon-167x167.png`,
    `${parts.origin}/apple-touch-icon-152x152.png`,
    `${parts.origin}/apple-touch-icon.png`,
    `${parts.origin}/apple-touch-icon-precomposed.png`
  ];
};

getFaviconUrls = function getFaviconUrlsHighRes(parts) {
  if (!parts?.origin) return [];
  return [
    `${parts.origin}/favicon.svg`,
    getGoogleFaviconUrl(parts),
    `${parts.origin}/favicon.ico`
  ];
};

appendIconContent = function appendIconContentCached(container, link, imageClass) {
  const fallback = document.createElement("span");
  fallback.className = imageClass === "folder-preview__image" ? "folder-preview__fallback" : "app-icon__fallback";
  fallback.textContent = link.icon || "🔗";
  container.textContent = "";
  container.appendChild(fallback);

  const cacheKey = getIconCacheKeyPatch(link);
  const cachedImageUrl = iconResultCachePatch.get(cacheKey);
  if (cachedImageUrl === null) return;

  const imageUrls = (cachedImageUrl ? [cachedImageUrl] : getIconImageUrls(link))
    .filter((url) => url && !failedIconUrlCachePatch.has(url));
  let currentImageIndex = 0;

  const loadNextImage = () => {
    const imageUrl = imageUrls[currentImageIndex];
    currentImageIndex += 1;
    if (!imageUrl) {
      iconResultCachePatch.set(cacheKey, null);
      return;
    }

    const image = document.createElement("img");
    image.className = imageClass;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    if (cachedImageUrl === imageUrl) {
      container.classList.add("has-image");
      fallback.hidden = true;
      image.classList.add("is-loaded");
    }
    image.src = imageUrl;
    image.addEventListener("load", () => {
      iconResultCachePatch.set(cacheKey, imageUrl);
      container.classList.add("has-image");
      fallback.hidden = true;
      image.classList.add("is-loaded");
    }, { once: true });
    image.addEventListener("error", () => {
      failedIconUrlCachePatch.add(imageUrl);
      if (cachedImageUrl === imageUrl) iconResultCachePatch.delete(cacheKey);
      image.remove();
      loadNextImage();
    }, { once: true });
    container.appendChild(image);
  };

  loadNextImage();
};

createFolderIcon = function createFolderIconPatch(folder) {
  const item = createIconShell("folder", folder);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "app-icon app-icon--folder";
  button.setAttribute("aria-label", `${folder}フォルダを開く`);
  const preview = document.createElement("span");
  preview.className = "folder-preview";
  getLinksInFolder(folder).slice(0, 4).forEach((link) => preview.appendChild(createMiniIcon(link)));
  button.appendChild(preview);
  button.addEventListener("click", (event) => {
    if (editMode || suppressNextActivation) {
      event.preventDefault();
      suppressNextActivation = false;
      return;
    }
    currentFolder = folder;
    renderCurrentView();
  });
  enableLongPress(button);
  item.append(button, createName(folder), createReorderActions());
  enableDrag(item);
  return item;
};

renderHome = function renderHomePatch() {
  homeOrderPatch = mergeHomeOrderPatch(homeOrderPatch);
  emptyMessage.hidden = homeOrderPatch.length > 0;
  const grid = createGrid("ホーム画面");
  homeOrderPatch.forEach((homeItemId) => {
    const item = createHomeItemPatch(homeItemId);
    if (item) grid.appendChild(item);
  });
  launcherView.appendChild(grid);
};

function createHomeItemPatch(homeItemId) {
  const item = parseHomeItemId(homeItemId);
  if (item.type === "folder" && getFolders().includes(item.id)) return createFolderIcon(item.id);
  if (item.type === "link") {
    const link = links.find((candidate) => candidate.id === item.id && candidate.showOnHome);
    if (link) return createLinkIcon(link);
  }
  return null;
}

renderFolder = function renderFolderPatch(folder) {
  const stage = document.createElement("section");
  stage.className = "folder-stage";
  stage.setAttribute("aria-label", `${folder}フォルダ`);
  stage.addEventListener("click", (event) => {
    if (event.target.closest(".folder-panel")) return;
    closeFolderViewPatch();
  });

  const panel = document.createElement("div");
  panel.className = "folder-panel";
  const header = document.createElement("div");
  header.className = "folder-header";
  const title = document.createElement("h2");
  title.className = "folder-title";
  title.textContent = folder;
  title.tabIndex = 0;
  title.setAttribute("aria-label", `${folder}フォルダ名。長押しで名前を変更`);
  enableFolderTitleEditPatch(title, folder);
  header.appendChild(title);
  panel.appendChild(header);

  const folderLinks = getLinksInFolder(folder);
  emptyMessage.hidden = folderLinks.length > 0;
  const grid = createGrid(`${folder}フォルダ`);
  folderLinks.forEach((link) => grid.appendChild(createLinkIcon(link)));
  panel.appendChild(grid);
  stage.appendChild(panel);
  launcherView.appendChild(stage);
};

function closeFolderViewPatch() {
  if (!currentFolder) return false;
  currentFolder = null;
  if (editMode) setEditMode(false);
  else renderCurrentView();
  return true;
}

function enableFolderTitleEditPatch(title, folder) {
  let titlePressState = null;
  const clearTitlePress = () => {
    if (!titlePressState) return;
    window.clearTimeout(titlePressState.timer);
    titlePressState = null;
  };
  const beginEdit = () => {
    titlePressState = null;
    startFolderTitleEditingPatch(title, folder);
  };

  title.addEventListener("pointerdown", (event) => {
    if (event.button > 0) return;
    clearTitlePress();
    const startX = event.clientX;
    const startY = event.clientY;
    titlePressState = {
      pointerId: event.pointerId,
      startX,
      startY,
      timer: window.setTimeout(beginEdit, LONG_PRESS_MS)
    };
  });
  title.addEventListener("pointermove", (event) => {
    if (!titlePressState || titlePressState.pointerId !== event.pointerId) return;
    const distance = Math.hypot(event.clientX - titlePressState.startX, event.clientY - titlePressState.startY);
    if (distance > LONG_PRESS_MOVE_LIMIT) clearTitlePress();
  });
  title.addEventListener("keydown", (event) => {
    if (event.key === "Enter") startFolderTitleEditingPatch(title, folder);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((type) => title.addEventListener(type, clearTitlePress));
}

function startFolderTitleEditingPatch(title, folder) {
  const input = document.createElement("input");
  input.className = "folder-title-input";
  input.type = "text";
  input.value = folder;
  input.setAttribute("aria-label", "フォルダ名");
  title.replaceWith(input);
  input.focus();
  input.select();

  let finished = false;
  const finish = (commit) => {
    if (finished) return;
    finished = true;
    const newName = input.value.trim();
    if (commit && newName && newName !== folder) {
      applyFolderRenamePatch(folder, newName);
      return;
    }
    renderCurrentView();
  };

  input.addEventListener("blur", () => finish(true));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") finish(true);
    if (event.key === "Escape") finish(false);
  });
}

function applyFolderRenamePatch(oldName, newName) {
  if (getFolders().includes(newName)) {
    showBackupMessage(`「${newName}」はすでにあります。別の名前を入力してください。`, "error");
    renderCurrentView();
    return false;
  }
  links = links.map((link) => link.category === oldName ? { ...link, category: newName } : link);
  folderOrder = folderOrder.map((folder) => folder === oldName ? newName : folder);
  homeOrderPatch = homeOrderPatch.map((itemId) => itemId === makeFolderHomeId(oldName) ? makeFolderHomeId(newName) : itemId);
  if (currentFolder === oldName) currentFolder = newName;
  persistAll();
  renderCurrentView();
  showBackupMessage(`フォルダ名を「${newName}」に変更しました。`, "success");
  return true;
}

applyReorder = function applyReorderPatch(source, target) {
  if (!currentFolder) {
    const sourceId = source.dataset.type === "folder" ? makeFolderHomeId(source.dataset.id) : makeLinkHomeId(source.dataset.id);
    const targetId = target.dataset.type === "folder" ? makeFolderHomeId(target.dataset.id) : makeLinkHomeId(target.dataset.id);
    const from = homeOrderPatch.indexOf(sourceId);
    const to = homeOrderPatch.indexOf(targetId);
    if (from < 0 || to < 0) return;
    homeOrderPatch.splice(to, 0, homeOrderPatch.splice(from, 1)[0]);
    saveHomeOrderPatch();
    saveFolderOrder();
    return;
  }
  const folderLinks = getLinksInFolder(currentFolder);
  const from = folderLinks.findIndex((link) => link.id === source.dataset.id);
  const to = folderLinks.findIndex((link) => link.id === target.dataset.id);
  if (from < 0 || to < 0) return;
  folderLinks.splice(to, 0, folderLinks.splice(from, 1)[0]);
  folderLinks.forEach((link, index) => { link.order = index; });
  saveLinks();
};

resetForm = function resetFormPatch() {
  editingLinkId = null;
  linkForm.reset();
  if (linkShowOnHomeInputPatch) linkShowOnHomeInputPatch.checked = false;
  formTitle.textContent = "リンクを追加";
  submitButton.textContent = "追加";
  formMessage.textContent = "";
  linkFormPanel.hidden = true;
};

startEditing = function startEditingPatch(linkId) {
  const link = links.find((item) => item.id === linkId);
  if (!link) return;
  editingLinkId = linkId;
  formTitle.textContent = "リンクを編集";
  submitButton.textContent = "更新";
  formMessage.textContent = "";
  linkNameInput.value = link.name;
  linkUrlInput.value = link.url;
  linkCategoryInput.value = link.category;
  linkDescriptionInput.value = link.description;
  linkIconInput.value = link.icon;
  linkIconSourceInput.value = normalizeIconSource(link.iconSource);
  linkIconUrlInput.value = link.iconUrl || "";
  if (linkShowOnHomeInputPatch) linkShowOnHomeInputPatch.checked = link.showOnHome === true;
  linkFormPanel.hidden = false;
  linkNameInput.focus();
};

importLinksFromFile = function importLinksFromFilePatch(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const importedLinks = normalizeImportedLinks(JSON.parse(reader.result));
      if (!confirm(`現在のリンク一覧を、選択した${importedLinks.length}件のリンクで上書きしますか？`)) {
        showBackupMessage("インポートをキャンセルしました。");
        return;
      }
      links = importedLinks;
      folderOrder = mergeFolderOrder(categoryOrder);
      homeOrderPatch = mergeHomeOrderPatch(getFolders().map(makeFolderHomeId));
      persistAll();
      currentFolder = null;
      resetForm();
      renderCurrentView();
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
};

linkForm.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
  const name = linkNameInput.value.trim();
  const url = normalizeUrl(linkUrlInput.value);
  const category = linkCategoryInput.value.trim();
  const description = linkDescriptionInput.value.trim();
  const icon = linkIconInput.value.trim() || "🔗";
  const iconSource = normalizeIconSource(linkIconSourceInput.value);
  const iconUrl = normalizeOptionalUrl(linkIconUrlInput.value);
  const showOnHome = linkShowOnHomeInputPatch?.checked === true;
  if (!name || !url || !category) {
    formMessage.textContent = "リンク名・URL・フォルダを入力してください。";
    return;
  }
  if (!folderOrder.includes(category)) folderOrder.push(category);
  const existingLink = editingLinkId ? links.find((link) => link.id === editingLinkId) : null;
  const movedToAnotherFolder = existingLink && existingLink.category !== category;
  const order = existingLink && !movedToAnotherFolder ? existingLink.order ?? getLinksInFolder(category).length : getLinksInFolder(category).length;
  const data = { name, url, category, description, icon, iconSource, iconUrl, showOnHome, order };
  links = editingLinkId
    ? links.map((link) => link.id === editingLinkId ? { ...link, ...data } : link)
    : [...links, { id: `user-${Date.now()}`, ...data }];
  persistAll();
  currentFolder = showOnHome ? null : category;
  resetForm();
  renderCurrentView();
}, true);

document.addEventListener("click", (event) => {
  if (currentFolder && !event.target.closest(".launcher-item, .folder-panel, .search-panel, .link-form-panel")) {
    closeFolderViewPatch();
    event.stopImmediatePropagation();
    return;
  }
}, true);

document.addEventListener("pointerdown", (event) => {
  if (!currentFolder || event.button > 0) return;
  if (event.target.closest(".launcher-item, .folder-panel, .search-panel, .link-form-panel")) return;
  closeFolderViewPatch();
  event.stopPropagation();
}, true);

window.addEventListener("storage", (event) => {
  if (![STORAGE_KEY, FOLDER_ORDER_KEY, HOME_ORDER_KEY_PATCH].includes(event.key)) return;
  links = normalizeLinks(loadRawLinks());
  folderOrder = loadFolderOrder();
  homeOrderPatch = loadHomeOrderPatch();
  renderCurrentView();
});

links = normalizeLinks(links);
homeOrderPatch = loadHomeOrderPatch();
persistAll();
renderCurrentView();
