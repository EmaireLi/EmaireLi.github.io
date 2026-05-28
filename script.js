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
  } catch (error) {
    statusEl.hidden = false;
    statusEl.textContent = `文章列表加载失败：${error.message}`;
  }
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

function renderSearchResults(resultsEl, posts, query, basePath) {
  const normalizedQuery = normalizeSearchText(query);
  const matches = posts
    .filter((post) => normalizeSearchText([post.title, post.date, post.excerpt, post.searchText].filter(Boolean).join(" ")).includes(normalizedQuery))
    .slice(0, 8);

  resultsEl.innerHTML = matches
    .map((post) => {
      const title = escapeHtml(post.title || post.file || "Untitled");
      const date = escapeHtml(post.date || "");
      const excerpt = escapeHtml(makeSearchExcerpt(post, query));
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

decodeEscapedSpanTagsInDocument();
initBlogAutoList();
initEditorPage();
initSiteSearch();
initXhsGalleries();
initBackToTop();
