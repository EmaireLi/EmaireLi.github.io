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

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function decodeHtmlEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function normalizeMarkdownInputForRender(text) {
  if (/&lt;\/?[a-zA-Z][\s\S]*?&gt;/.test(text)) {
    return decodeHtmlEntities(text);
  }
  return text;
}

function renderMarkdownToHtml(text) {
  const normalized = normalizeMarkdownInputForRender(text);
  if (md) return md.render(normalized);
  return `<pre>${escapeHtml(normalized)}</pre>`;
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
    <div class="site-shell">
      <aside class="sidebar">
        <p class="site-name"><a href="../index.html">Alex</a></p>
        <nav class="sidebar-nav" aria-label="Sidebar">
          <a href="../index.html#about">1. 自我简介</a>
          <a href="../index.html#projects">2. 个人项目</a>
          <a href="../index.html#blog">3. blog</a>
        </nav>
      </aside>
      <main class="content">
        <article class="section article-content">
          <p class="meta">${date}</p>
          <h1 class="article-title">${safeTitle}</h1>
          ${markdownHtml}
        </article>
      </main>
    </div>
    <script src="../script.js?v=20260428h"></script>
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
    const res = await fetch("./posts/posts.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const posts = Array.isArray(data) ? data : Array.isArray(data.posts) ? data.posts : [];

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
      statusEl.textContent = `已保存 ${baseName}.html。把它放到 posts/ 后 push，部署流程会自动更新文章列表。`;
    }
  });

  cancelEditorBtn.addEventListener("click", () => {
    window.location.href = "./index.html#blog";
  });
}

initBlogAutoList();
initEditorPage();
