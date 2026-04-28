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

const md = typeof window.markdownit === "function" ? window.markdownit({ html: false, linkify: true, breaks: true }) : null;

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\- ]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "post";
}

function downloadTextFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function renderPostHtml({ title, date, markdownHtml }) {
  const safeTitle = title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
    <script src="../script.js?v=20260428d"></script>
  </body>
</html>`;
}

function inferGitHubRepoInfo() {
  const host = window.location.hostname;
  if (!host.endsWith(".github.io")) return null;

  const owner = host.split(".")[0];
  const segs = window.location.pathname.split("/").filter(Boolean);
  const repo = segs.length > 0 ? segs[0] : `${owner}.github.io`;
  return { owner, repo };
}

function parsePostMeta(name) {
  const base = name.replace(/\.html$/i, "");
  const match = base.match(/^(\d{4}-\d{2}-\d{2})(?:-\d{6})?-(.+)$/);
  if (match) {
    return {
      date: match[1],
      title: match[2].replace(/-/g, " "),
    };
  }
  return {
    date: "",
    title: base.replace(/-/g, " "),
  };
}

async function initBlogAutoList() {
  const listEl = document.getElementById("blog-auto-list");
  const statusEl = document.getElementById("blog-auto-status");
  if (!listEl || !statusEl) return;
  statusEl.hidden = true;
  statusEl.textContent = "";

  const repoInfo = inferGitHubRepoInfo();
  if (!repoInfo) {
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/posts`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}`);
    }

    const entries = await res.json();
    const files = Array.isArray(entries)
      ? entries.filter(
          (item) => item && item.type === "file" && /\.html$/i.test(item.name) && item.name !== "new-post-template.html",
        )
      : [];

    files.sort((a, b) => b.name.localeCompare(a.name));
    listEl.innerHTML = "";

    if (files.length === 0) return;

    files.forEach((file) => {
      const meta = parsePostMeta(file.name);
      const li = document.createElement("li");
      li.className = "blog-item";
      li.innerHTML = `
        <a class="item-title" href="./posts/${file.name}">${meta.title}</a>
        <p class="meta">${meta.date || "已发布"}</p>
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

  const renderMarkdown = () => {
    mdPreview.innerHTML = md ? md.render(mdInput.value) : mdInput.value;
  };

  mdInput.addEventListener("input", renderMarkdown);
  renderMarkdown();

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
    const markdownHtml = md ? md.render(markdown) : markdown;
    const html = renderPostHtml({ title, date, markdownHtml });

    downloadTextFile(`${baseName}.md`, markdown, "text/markdown;charset=utf-8");
    downloadTextFile(`${baseName}.html`, html, "text/html;charset=utf-8");

    if (statusEl) {
      statusEl.textContent = `已保存 ${baseName}.md 和 ${baseName}.html。请把 HTML 文件放到项目 posts/ 目录后提交。`;
    }
  });

  cancelEditorBtn.addEventListener("click", () => {
    window.location.href = "./index.html#blog";
  });
}

initEditorPage();
initBlogAutoList();
