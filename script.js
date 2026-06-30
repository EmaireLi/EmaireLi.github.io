const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const panelLinks = document.querySelectorAll("[data-panel-link]");
const panels = document.querySelectorAll("[data-panel]");

function showPanel(name) {
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== name;
  });
  panelLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.panelLink === name);
  });
}

if (panelLinks.length > 0 && panels.length > 0) {
  const initial = window.location.hash.replace("#", "");
  const hasInitial = Array.from(panels).some((panel) => panel.dataset.panel === initial);
  showPanel(hasInitial ? initial : "about");

  panelLinks.forEach((link) => {
    link.addEventListener("click", () => showPanel(link.dataset.panelLink));
  });

  window.addEventListener("hashchange", () => {
    const current = window.location.hash.replace("#", "");
    const valid = Array.from(panels).some((panel) => panel.dataset.panel === current);
    showPanel(valid ? current : "about");
  });
}

const md = typeof window.markdownit === "function" ? window.markdownit({ html: true, linkify: true, breaks: true }) : null;
const postsCache = new Map();
let revealObserver = null;
const guestbookMaxLength = 100;
const guestbookPostIntervalMs = 60 * 1000;

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function decodeHtmlEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function decodeHtmlEntitiesDeep(text) {
  let current = text;
  for (let i = 0; i < 3; i += 1) {
    const decoded = decodeHtmlEntities(current);
    if (decoded === current) break;
    current = decoded;
  }
  return current;
}

function decodeEscapedSpanTagsInDocument() {
  const nodes = document.querySelectorAll(".article-content, #md-preview");
  nodes.forEach((node) => {
    const before = node.innerHTML;
    const after = before
      .replace(/&lt;span\b([\s\S]*?)&gt;/gi, (_m, attrs) => `<span${decodeHtmlEntitiesDeep(attrs)}>` )
      .replace(/&lt;\/span&gt;/gi, "</span>");
    if (after !== before) {
      node.innerHTML = after;
    }
  });
}

function normalizeMarkdownInputForRender(text) {
  return decodeHtmlEntitiesDeep(text);
}

function renderWithoutMarkdownIt(normalized) {
  if (/<\/?[a-zA-Z][\s\S]*?>/.test(normalized)) {
    return normalized;
  }
  return `<pre>${escapeHtml(normalized)}</pre>`;
}

function renderMarkdownToHtml(text) {
  const normalized = normalizeMarkdownInputForRender(text);
  if (md) return md.render(normalized);
  return renderWithoutMarkdownIt(normalized);
}

function slugify(value) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^\w\u4e00-\u9fa5\- ]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "post"
  );
}

function downloadTextFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

async function fetchPosts(src = "./posts/posts.json") {
  if (!postsCache.has(src)) {
    postsCache.set(
      src,
      fetch(src, { cache: "no-store" })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => (Array.isArray(data) ? data : Array.isArray(data.posts) ? data.posts : []))
    );
  }
  return postsCache.get(src);
}

function renderPostHtml({ title, date, markdownHtml }) {
  const safeTitle = escapeHtml(title);
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle} | Alex</title>
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <div class="headband"></div>
    <main class="main">
      <div class="column">
        <header class="header" aria-label="Site header">
          <div class="site-brand-container">
            <div class="site-meta">
              <a class="brand" href="../index.html" rel="start">
                <i class="logo-line" aria-hidden="true"></i>
                <p class="site-title">Alex Emaire's Blog</p>
                <i class="logo-line" aria-hidden="true"></i>
              </a>
              <p class="site-subtitle">个人归档站</p>
            </div>
          </div>

          <nav class="site-nav" aria-label="Main navigation">
            <ul class="main-menu menu">
              <li class="menu-item"><a href="../index.html#about">About</a></li>
              <li class="menu-item"><a href="../index.html#projects">Projects</a></li>
              <li class="menu-item"><a href="../index.html#blog">Archives</a></li>
              <li class="menu-item"><a href="../editor.html">Editor</a></li>
            </ul>
          </nav>
        </header>

        <aside class="sidebar" aria-label="Site overview">
          <div class="sidebar-inner">
            <div class="site-author">
              <p class="site-author-name">Alex</p>
              <p class="site-description">JavaBoy 转行引擎开发中</p>
            </div>
          </div>
        </aside>

        <section class="site-search-card" data-site-search data-posts-src="../posts/posts.json" data-post-base="../posts/" aria-label="Site search">
          <label class="site-search-label" for="site-search-input">Search</label>
          <div class="site-search-control">
            <span class="site-search-icon" aria-hidden="true"></span>
            <input id="site-search-input" class="site-search-input" type="search" placeholder="搜索文章" autocomplete="off" />
          </div>
          <p class="site-search-status" data-search-status>输入关键词搜索全站文章</p>
          <div class="site-search-results" data-search-results role="list"></div>
        </section>

        <nav class="account-links-card" aria-label="Third-party accounts">
          <a class="account-link account-link-bilibili" href="https://space.bilibili.com/436931264" target="_blank" rel="noreferrer">Bilibili</a>
          <a class="account-link account-link-xhs" href="https://www.xiaohongshu.com/user/profile/60c21d80000000000101de0a" target="_blank" rel="noreferrer">小红书</a>
          <a class="account-link account-link-github" href="https://github.com/EmaireLi" target="_blank" rel="noreferrer">GitHub</a>
          <a class="account-link account-link-steam" href="https://steamcommunity.com/id/Muwii/" target="_blank" rel="noreferrer">Steam</a>
          <a class="account-link account-link-bangumi" href="https://bgm.tv/user/muwii_" target="_blank" rel="noreferrer">Bangumi</a>
          <a class="account-link account-link-leetcode" href="https://leetcode.cn/u/emaire/" target="_blank" rel="noreferrer">LeetCode</a>
        </nav>
      </div>

      <div class="main-inner page posts-expand">
        <article class="post-block">
          <header class="post-header">
            <h1 class="post-title">${safeTitle}</h1>
            <div class="post-meta-container">${date}</div>
          </header>

          <div class="post-body article-content">
            ${markdownHtml}
          </div>
        </article>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <span>© <span id="year"></span> Alex</span>
        <span class="footer-dot">•</span>
        <span><a href="../index.html#blog">Back to archive</a></span>
      </div>
    </footer>

    <a class="back-to-top" href="#top" aria-label="Back to top">↑</a>
    <script src="../script.js?v=20260528b"></script>
  </body>
</html>`;
}

async function initBlogAutoList() {
  const listEl = document.getElementById("blog-auto-list");
  const statusEl = document.getElementById("blog-auto-status");
  if (!listEl || !statusEl) return;

  statusEl.hidden = true;
  statusEl.textContent = "";

  try {
    const posts = await fetchPosts("./posts/posts.json");
    const postCountEl = document.getElementById("post-count");
    if (postCountEl) {
      postCountEl.textContent = String(posts.length);
    }

    listEl.innerHTML = "";
    posts.forEach((post) => {
      if (!post || !post.file) return;
      const li = document.createElement("li");
      li.className = "blog-item";
      li.innerHTML = `
        <a class="item-title" href="./posts/${post.file}">${post.title || post.file}</a>
        <p class="meta">${post.date || ""}</p>
      `;
      listEl.appendChild(li);
    });
    initRevealOnScroll();
  } catch (error) {
    statusEl.hidden = false;
    statusEl.textContent = `文章列表加载失败：${error.message}`;
    initRevealOnScroll();
  }
}

function initRevealOnScroll() {
  if (!document.body.classList.contains("home-page")) return;
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }

  const targets = Array.from(
    document.querySelectorAll(
      ".home-page .post-body > h1, .home-page .post-body > h2, .home-page .project-list > li, .home-page .blog-list > .blog-item, .home-page blockquote, .home-page .guestbook"
    )
  );
  if (targets.length === 0) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  targets.forEach((target, index) => {
    target.dataset.reveal = "";
    target.style.transitionDelay = reducedMotion ? "0ms" : `${Math.min(index * 35, 240)}ms`;
  });

  if (reducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px 28% 0px", threshold: 0.01 }
  );
  revealObserver = observer;

  targets.forEach((target) => {
    if (target.classList.contains("is-visible")) return;
    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.15) {
      target.classList.add("is-visible");
      return;
    }
    observer.observe(target);
  });
}

function normalizeSearchText(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function makeSearchExcerpt(post, query) {
  const excerpt = String(post.excerpt || "");
  const searchText = String(post.searchText || excerpt || post.title || "");
  const normalized = normalizeSearchText(searchText);
  const normalizedQuery = normalizeSearchText(query);
  const index = normalized.indexOf(normalizedQuery);
  if (index < 0) return excerpt || searchText.slice(0, 96);
  const start = Math.max(0, index - 28);
  const end = Math.min(searchText.length, index + normalizedQuery.length + 72);
  return `${start > 0 ? "..." : ""}${searchText.slice(start, end)}${end < searchText.length ? "..." : ""}`;
}

function highlightSearchTerm(text, query) {
  const safeText = escapeHtml(String(text || ""));
  const safeQuery = escapeHtml(String(query || "").trim());
  if (!safeQuery) return safeText;

  const index = safeText.toLowerCase().indexOf(safeQuery.toLowerCase());
  if (index < 0) return safeText;

  const before = safeText.slice(0, index);
  const match = safeText.slice(index, index + safeQuery.length);
  const after = safeText.slice(index + safeQuery.length);
  return `${before}<mark class="site-search-mark">${match}</mark>${after}`;
}

function renderSearchResults(resultsEl, posts, query, basePath) {
  const normalizedQuery = normalizeSearchText(query);
  const matches = posts
    .filter((post) => normalizeSearchText([post.title, post.date, post.excerpt, post.searchText].filter(Boolean).join(" ")).includes(normalizedQuery))
    .slice(0, 8);

  resultsEl.innerHTML = matches
    .map((post) => {
      const title = highlightSearchTerm(post.title || post.file || "Untitled", query);
      const date = escapeHtml(post.date || "");
      const excerpt = highlightSearchTerm(makeSearchExcerpt(post, query), query);
      const href = `${basePath}${encodeURI(post.file)}`;
      return `<a class="site-search-result" href="${href}" role="listitem">
        <span class="site-search-result-title">${title}</span>
        <span class="site-search-result-meta">${date}</span>
        <span class="site-search-result-excerpt">${excerpt}</span>
      </a>`;
    })
    .join("");

  return matches.length;
}

function initSiteSearch() {
  const search = document.querySelector("[data-site-search]");
  if (!search) return;

  const input = search.querySelector(".site-search-input");
  const status = search.querySelector("[data-search-status]");
  const results = search.querySelector("[data-search-results]");
  const postsSrc = search.dataset.postsSrc || "./posts/posts.json";
  const postBase = search.dataset.postBase || "./posts/";
  if (!input || !status || !results) return;

  let posts = [];
  fetchPosts(postsSrc)
    .then((items) => {
      posts = items;
      status.textContent = `可搜索 ${items.length} 篇文章`;
    })
    .catch((error) => {
      status.textContent = `搜索索引加载失败：${error.message}`;
    });

  input.addEventListener("input", () => {
    const query = input.value.trim();
    results.innerHTML = "";
    if (!query) {
      status.textContent = posts.length ? `可搜索 ${posts.length} 篇文章` : "输入关键词搜索全站文章";
      return;
    }

    const count = renderSearchResults(results, posts, query, postBase);
    status.textContent = count ? `找到 ${count} 条结果` : "没有匹配结果";
  });
}

function initEditorPage() {
  const mdInput = document.getElementById("md-input");
  const mdPreview = document.getElementById("md-preview");
  const mdTitleInput = document.getElementById("md-title-input");
  const saveLocalBtn = document.getElementById("save-local-btn");
  const cancelEditorBtn = document.getElementById("cancel-editor-btn");
  const statusEl = document.getElementById("save-status");

  if (!mdInput || !mdPreview || !mdTitleInput || !saveLocalBtn || !cancelEditorBtn) return;

  const renderPreview = () => {
    mdPreview.innerHTML = renderMarkdownToHtml(mdInput.value);
  };
  mdInput.addEventListener("input", renderPreview);
  renderPreview();

  saveLocalBtn.addEventListener("click", () => {
    const title = mdTitleInput.value.trim();
    const markdown = mdInput.value.trim();
    if (!title || !markdown) {
      window.alert("请先填写标题和正文再保存。");
      return;
    }

    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toISOString().slice(11, 19).replace(/:/g, "");
    const slug = slugify(title);
    const baseName = `${date}-${time}-${slug}`;
    const html = renderPostHtml({
      title,
      date,
      markdownHtml: renderMarkdownToHtml(markdown),
    });

    downloadTextFile(`${baseName}.html`, html, "text/html;charset=utf-8");

    if (statusEl) {
      statusEl.textContent = `已保存 ${baseName}.html。`;
    }
  });

  cancelEditorBtn.addEventListener("click", () => {
    window.location.href = "./index.html#blog";
  });
}

function initBackToTop() {
  const link = document.querySelector(".back-to-top");
  if (!link) return;

  const sync = () => {
    link.classList.toggle("is-visible", window.scrollY > 240);
  };

  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", sync, { passive: true });
  sync();
}

function initXhsGalleries() {
  const syncGallery = (gallery) => {
    const track = gallery.querySelector(".xhs-gallery-track");
    const slides = Array.from(gallery.querySelectorAll(".xhs-image"));
    const prev = gallery.querySelector(".xhs-gallery-prev");
    const next = gallery.querySelector(".xhs-gallery-next");
    const count = gallery.querySelector(".xhs-gallery-count");
    if (!track || slides.length === 0) return 0;

    const index = Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / Math.max(1, track.clientWidth))));
    gallery.dataset.current = String(index + 1);
    if (count) count.textContent = `${index + 1} / ${slides.length}`;
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === slides.length - 1;
    return index;
  };

  const moveGallery = (gallery, direction) => {
    const track = gallery.querySelector(".xhs-gallery-track");
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  };

  document.querySelectorAll("[data-xhs-gallery]").forEach((gallery) => {
    const track = gallery.querySelector(".xhs-gallery-track");
    if (!track) return;
    gallery.dataset.ready = "true";
    gallery.addEventListener("pointerenter", () => gallery.classList.add("is-controls-visible"));
    gallery.addEventListener("pointerleave", () => gallery.classList.remove("is-controls-visible"));
    track.addEventListener("scroll", () => syncGallery(gallery), { passive: true });
    window.addEventListener("resize", () => syncGallery(gallery));
    syncGallery(gallery);
  });

  if (!window.xhsGalleryClickBound) {
    document.addEventListener("click", (event) => {
      const button = event.target.closest(".xhs-gallery-button");
      if (!button) return;
      const gallery = button.closest("[data-xhs-gallery]");
      if (!gallery) return;
      moveGallery(gallery, button.classList.contains("xhs-gallery-prev") ? -1 : 1);
    });
    window.xhsGalleryClickBound = true;
  }
}

function normalizeGuestbookApiUrl(value) {
  return String(value || "").trim().replace(/\/+$/g, "");
}

function getGuestbookApiUrl(root) {
  return normalizeGuestbookApiUrl(root.dataset.guestbookApiUrl || window.GUESTBOOK_API_URL || "");
}

function setGuestbookStatus(statusEl, message, tone = "") {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
}

function getGuestbookCharCount(text) {
  return Array.from(String(text || "")).length;
}

function renderGuestbookMessages(listEl, messages) {
  if (!listEl) return;
  listEl.innerHTML = "";

  if (!messages.length) {
    const empty = document.createElement("p");
    empty.className = "guestbook-empty";
    empty.textContent = "还没有留言。";
    listEl.appendChild(empty);
    return;
  }

  messages.forEach((item) => {
    const entry = document.createElement("article");
    entry.className = "guestbook-item";

    const header = document.createElement("div");
    header.className = "guestbook-item-head";

    const signature = document.createElement("strong");
    signature.textContent = item.signature || "访客";

    const time = document.createElement("time");
    const date = new Date(item.updated_at || item.created_at || Date.now());
    time.dateTime = Number.isNaN(date.getTime()) ? "" : date.toISOString();
    time.textContent = Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });

    const message = document.createElement("p");
    message.textContent = item.message || "";

    header.append(signature, time);
    entry.append(header, message);
    listEl.appendChild(entry);
  });
}

async function fetchGuestbookMessages(apiUrl) {
  const response = await fetch(`${apiUrl}/messages`, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return Array.isArray(data.messages) ? data.messages : [];
}

async function submitGuestbookMessage(apiUrl, payload) {
  const response = await fetch(`${apiUrl}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

async function fetchAdminGuestbookMessages(apiUrl, token) {
  const response = await fetch(`${apiUrl}/admin/messages`, {
    cache: "no-store",
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return Array.isArray(data.messages) ? data.messages : [];
}

async function updateGuestbookMessage(apiUrl, id, token, payload) {
  const response = await fetch(`${apiUrl}/messages/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

async function deleteGuestbookMessage(apiUrl, id, token) {
  const response = await fetch(`${apiUrl}/messages/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

async function recordSiteVisit(apiUrl) {
  const response = await fetch(`${apiUrl}/stats/visit`, { method: "POST", cache: "no-store" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return Number(data.visitors) || 0;
}

function getGuestbookIntervalWait() {
  let lastSentAt = 0;
  try {
    lastSentAt = Number(window.localStorage.getItem("guestbook:lastSentAt") || 0);
  } catch (_error) {
    lastSentAt = 0;
  }
  const elapsed = Date.now() - lastSentAt;
  return Math.max(0, guestbookPostIntervalMs - elapsed);
}

function initGuestbook() {
  const root = document.querySelector("[data-guestbook]");
  if (!root) return;

  const form = root.querySelector("[data-guestbook-form]");
  const composeButton = root.querySelector("[data-guestbook-compose]");
  const signatureInput = root.querySelector("#guestbook-signature");
  const messageInput = root.querySelector("#guestbook-message");
  const counter = root.querySelector("[data-guestbook-counter]");
  const submitButton = root.querySelector("[data-guestbook-submit]");
  const status = root.querySelector("[data-guestbook-status]");
  const list = root.querySelector("[data-guestbook-list]");
  const apiUrl = getGuestbookApiUrl(root);

  if (!form || !signatureInput || !messageInput || !counter || !submitButton || !list) return;

  const expandForm = () => {
    form.hidden = false;
    form.classList.add("is-expanded");
    if (composeButton) {
      composeButton.hidden = true;
      composeButton.setAttribute("aria-expanded", "true");
    }
    signatureInput.focus();
  };

  if (composeButton) {
    composeButton.addEventListener("click", expandForm);
  }

  const syncCounter = () => {
    const count = getGuestbookCharCount(messageInput.value);
    counter.textContent = `${count} / ${guestbookMaxLength}`;
    counter.dataset.tone = count > guestbookMaxLength ? "error" : "";
  };

  syncCounter();
  messageInput.addEventListener("input", syncCounter);

  if (!apiUrl) {
    if (composeButton) composeButton.disabled = true;
    submitButton.disabled = true;
    setGuestbookStatus(status, "留言服务未配置。", "muted");
    renderGuestbookMessages(list, []);
    return;
  }

  setGuestbookStatus(status, "正在加载留言...", "muted");
  fetchGuestbookMessages(apiUrl)
    .then((messages) => {
      renderGuestbookMessages(list, messages);
      setGuestbookStatus(status, "");
    })
    .catch((error) => {
      renderGuestbookMessages(list, []);
      setGuestbookStatus(status, `留言加载失败：${error.message}`, "error");
    });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const signature = signatureInput.value.trim();
    const message = messageInput.value.trim();
    const count = getGuestbookCharCount(message);
    const waitMs = getGuestbookIntervalWait();

    if (!signature) {
      setGuestbookStatus(status, "请填写署名。", "error");
      signatureInput.focus();
      return;
    }

    if (!message) {
      setGuestbookStatus(status, "请填写留言。", "error");
      messageInput.focus();
      return;
    }

    if (count > guestbookMaxLength) {
      setGuestbookStatus(status, `留言最多 ${guestbookMaxLength} 字。`, "error");
      messageInput.focus();
      return;
    }

    if (waitMs > 0) {
      setGuestbookStatus(status, `请 ${Math.ceil(waitMs / 1000)} 秒后再发送。`, "error");
      return;
    }

    submitButton.disabled = true;
    setGuestbookStatus(status, "正在发送...", "muted");

    try {
      await submitGuestbookMessage(apiUrl, { signature, message });
      try {
        window.localStorage.setItem("guestbook:lastSentAt", String(Date.now()));
      } catch (_error) {
        // Ignore storage failures; the Worker still enforces rate limits.
      }
      messageInput.value = "";
      syncCounter();
      const messages = await fetchGuestbookMessages(apiUrl);
      renderGuestbookMessages(list, messages);
      setGuestbookStatus(status, "已发送。", "success");
    } catch (error) {
      if (String(error.message || "").includes("署名已经留过言")) {
        window.alert("这个 From 已经留过言。");
      }
      setGuestbookStatus(status, error.message, "error");
    } finally {
      submitButton.disabled = false;
    }
  });
}

function formatGuestbookTime(value) {
  const date = new Date(value || Date.now());
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function createAdminMessageCard(item, handlers) {
  const card = document.createElement("article");
  card.className = "admin-message-card";
  card.dataset.messageId = item.id || "";

  const meta = document.createElement("div");
  meta.className = "admin-message-meta";

  const idText = document.createElement("span");
  idText.textContent = item.id || "";

  const createdText = document.createElement("span");
  createdText.textContent = `创建 ${formatGuestbookTime(item.created_at)}`;

  const updatedText = document.createElement("span");
  updatedText.textContent = `更新 ${formatGuestbookTime(item.updated_at)}`;

  meta.append(idText, createdText, updatedText);

  const grid = document.createElement("div");
  grid.className = "admin-message-grid";

  const signatureField = document.createElement("label");
  signatureField.className = "guestbook-field";
  const signatureLabel = document.createElement("span");
  signatureLabel.textContent = "署名";
  const signatureInput = document.createElement("input");
  signatureInput.type = "text";
  signatureInput.maxLength = 24;
  signatureInput.value = item.signature || "";
  signatureField.append(signatureLabel, signatureInput);

  const messageField = document.createElement("label");
  messageField.className = "guestbook-field";
  const labelRow = document.createElement("span");
  labelRow.className = "guestbook-label-row";
  const messageLabel = document.createElement("span");
  messageLabel.textContent = "留言";
  const counter = document.createElement("span");
  counter.className = "guestbook-counter";
  labelRow.append(messageLabel, counter);
  const messageInput = document.createElement("textarea");
  messageInput.maxLength = guestbookMaxLength;
  messageInput.rows = 3;
  messageInput.value = item.message || "";
  messageField.append(labelRow, messageInput);
  grid.append(signatureField, messageField);

  const actions = document.createElement("div");
  actions.className = "admin-message-actions";

  const saveButton = document.createElement("button");
  saveButton.className = "editor-btn";
  saveButton.type = "button";
  saveButton.textContent = "保存";

  const deleteButton = document.createElement("button");
  deleteButton.className = "editor-btn secondary admin-danger";
  deleteButton.type = "button";
  deleteButton.textContent = "删除";

  const status = document.createElement("p");
  status.className = "guestbook-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  const syncCounter = () => {
    const count = getGuestbookCharCount(messageInput.value);
    counter.textContent = `${count} / ${guestbookMaxLength}`;
    counter.dataset.tone = count > guestbookMaxLength ? "error" : "";
  };

  messageInput.addEventListener("input", syncCounter);
  syncCounter();

  saveButton.addEventListener("click", () => {
    handlers.onSave({
      id: item.id,
      signature: signatureInput.value.trim(),
      message: messageInput.value.trim(),
      status,
      saveButton,
      deleteButton,
    });
  });

  deleteButton.addEventListener("click", () => {
    handlers.onDelete({
      id: item.id,
      signature: signatureInput.value.trim() || item.signature || item.id,
      status,
      saveButton,
      deleteButton,
    });
  });

  actions.append(saveButton, deleteButton, status);
  card.append(meta, grid, actions);
  return card;
}

function renderAdminGuestbookMessages(listEl, messages, handlers) {
  if (!listEl) return;
  listEl.innerHTML = "";

  if (!messages.length) {
    const empty = document.createElement("p");
    empty.className = "guestbook-empty";
    empty.textContent = "还没有留言。";
    listEl.appendChild(empty);
    return;
  }

  messages.forEach((item) => {
    listEl.appendChild(createAdminMessageCard(item, handlers));
  });
}

function initAdminGuestbook() {
  const root = document.querySelector("[data-admin-guestbook]");
  if (!root) return;

  const form = root.querySelector("[data-admin-token-form]");
  const tokenInput = root.querySelector("#admin-token-input");
  const clearTokenButton = root.querySelector("[data-admin-clear-token]");
  const status = root.querySelector("[data-admin-status]");
  const list = root.querySelector("[data-admin-message-list]");
  const apiUrl = getGuestbookApiUrl(root);

  if (!form || !tokenInput || !clearTokenButton || !list) return;

  if (!apiUrl) {
    setGuestbookStatus(status, "留言服务未配置。", "error");
    return;
  }

  const getToken = () => tokenInput.value.trim();

  const loadMessages = async () => {
    const token = getToken();
    if (!token) {
      setGuestbookStatus(status, "请输入管理员 Token。", "error");
      tokenInput.focus();
      return;
    }

    setGuestbookStatus(status, "正在读取...", "muted");
    try {
      const messages = await fetchAdminGuestbookMessages(apiUrl, token);
      renderAdminGuestbookMessages(list, messages, {
        onSave: async ({ id, signature, message, status: itemStatus, saveButton, deleteButton }) => {
          if (!signature || !message) {
            setGuestbookStatus(itemStatus, "署名和留言不能为空。", "error");
            return;
          }
          if (getGuestbookCharCount(message) > guestbookMaxLength) {
            setGuestbookStatus(itemStatus, `留言最多 ${guestbookMaxLength} 字。`, "error");
            return;
          }

          saveButton.disabled = true;
          deleteButton.disabled = true;
          setGuestbookStatus(itemStatus, "正在保存...", "muted");
          try {
            await updateGuestbookMessage(apiUrl, id, getToken(), { signature, message });
            setGuestbookStatus(itemStatus, "已保存。", "success");
            await loadMessages();
          } catch (error) {
            setGuestbookStatus(itemStatus, error.message, "error");
          } finally {
            saveButton.disabled = false;
            deleteButton.disabled = false;
          }
        },
        onDelete: async ({ id, signature, status: itemStatus, saveButton, deleteButton }) => {
          if (!window.confirm(`删除 ${signature} 的留言？`)) return;

          saveButton.disabled = true;
          deleteButton.disabled = true;
          setGuestbookStatus(itemStatus, "正在删除...", "muted");
          try {
            await deleteGuestbookMessage(apiUrl, id, getToken());
            setGuestbookStatus(status, "已删除。", "success");
            await loadMessages();
          } catch (error) {
            setGuestbookStatus(itemStatus, error.message, "error");
          } finally {
            saveButton.disabled = false;
            deleteButton.disabled = false;
          }
        },
      });
      setGuestbookStatus(status, `共 ${messages.length} 条留言。`, "success");
    } catch (error) {
      setGuestbookStatus(status, `读取失败：${error.message}`, "error");
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    loadMessages();
  });

  clearTokenButton.addEventListener("click", () => {
    tokenInput.value = "";
    list.innerHTML = "";
    setGuestbookStatus(status, "");
    tokenInput.focus();
  });
}

function initVisitorCount() {
  const root = document.querySelector("[data-visitor-count]");
  if (!root) return;

  const valueEl = root.querySelector("[data-visitor-count-value]");
  const apiUrl = normalizeGuestbookApiUrl(window.GUESTBOOK_API_URL || "");
  if (!valueEl || !apiUrl) return;

  recordSiteVisit(apiUrl)
    .then((visitors) => {
      valueEl.textContent = String(visitors);
      root.hidden = false;
    })
    .catch(() => {
      root.hidden = true;
    });
}

decodeEscapedSpanTagsInDocument();
initBlogAutoList();
initEditorPage();
initSiteSearch();
initXhsGalleries();
initGuestbook();
initAdminGuestbook();
initVisitorCount();
initBackToTop();
initRevealOnScroll();
