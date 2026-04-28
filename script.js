const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const storageKey = "alex-blog-published-posts";
const publishConfigKey = "alex-blog-publish-config";

function getSavedPosts() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(storageKey, JSON.stringify(posts));
}

function getPublishConfig() {
  try {
    const raw = localStorage.getItem(publishConfigKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function savePublishConfig(config) {
  localStorage.setItem(publishConfigKey, JSON.stringify(config));
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\- ]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "post";
}

function toBase64Utf8(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function buildPagesUrl(owner, repo, path) {
  if (repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
    return `https://${owner}.github.io/${path}`;
  }
  return `https://${owner}.github.io/${repo}/${path}`;
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
          <p class="meta">${date} · 已发布</p>
          <h1 class="article-title">${safeTitle}</h1>
          ${markdownHtml}
        </article>
      </main>
    </div>
    <script src="../script.js"></script>
  </body>
</html>`;
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

function initBlogHome() {
  const publishedPosts = document.getElementById("published-posts");
  if (!publishedPosts) return;

  const posts = getSavedPosts();
  publishedPosts.innerHTML = "";

  posts.forEach((post) => {
    const item = document.createElement("li");
    item.className = "blog-item";
    item.innerHTML = `
      <a class="item-title" href="${post.url}" target="_blank" rel="noreferrer">${post.title}</a>
      <p class="meta">${post.date} · 已发布</p>
    `;
    publishedPosts.appendChild(item);
  });
}

function initEditorPage() {
  const mdInput = document.getElementById("md-input");
  const mdPreview = document.getElementById("md-preview");
  const mdTitleInput = document.getElementById("md-title-input");
  const publishBtn = document.getElementById("publish-btn");
  const cancelEditorBtn = document.getElementById("cancel-editor-btn");
  const statusEl = document.getElementById("publish-status");
  const ownerInput = document.getElementById("gh-owner");
  const repoInput = document.getElementById("gh-repo");
  const branchInput = document.getElementById("gh-branch");
  const tokenInput = document.getElementById("gh-token");

  if (!mdInput || !mdPreview || !mdTitleInput || !publishBtn || !cancelEditorBtn) return;

  const savedConfig = getPublishConfig();
  if (ownerInput && savedConfig.owner) ownerInput.value = savedConfig.owner;
  if (repoInput && savedConfig.repo) repoInput.value = savedConfig.repo;
  if (branchInput && savedConfig.branch) branchInput.value = savedConfig.branch;
  if (tokenInput && savedConfig.token) tokenInput.value = savedConfig.token;

  const persistConfig = () => {
    savePublishConfig({
      owner: ownerInput ? ownerInput.value.trim() : "",
      repo: repoInput ? repoInput.value.trim() : "",
      branch: branchInput ? branchInput.value.trim() || "main" : "main",
      token: tokenInput ? tokenInput.value.trim() : "",
    });
  };

  [ownerInput, repoInput, branchInput, tokenInput].forEach((el) => {
    if (el) el.addEventListener("input", persistConfig);
  });

  const renderMarkdown = () => {
    mdPreview.innerHTML = md ? md.render(mdInput.value) : mdInput.value;
  };

  mdInput.addEventListener("input", renderMarkdown);
  renderMarkdown();

  publishBtn.addEventListener("click", async () => {
    const title = mdTitleInput.value.trim();
    const markdown = mdInput.value.trim();
    const owner = ownerInput ? ownerInput.value.trim() : "";
    const repo = repoInput ? repoInput.value.trim() : "";
    const branch = branchInput ? branchInput.value.trim() || "main" : "main";
    const token = tokenInput ? tokenInput.value.trim() : "";

    if (!title || !markdown) {
      window.alert("请先填写标题和正文再发布。");
      return;
    }
    if (!owner || !repo || !token) {
      window.alert("请先填写 GitHub Owner、Repo 和 Token。");
      return;
    }

    persistConfig();
    if (statusEl) statusEl.textContent = "正在发布到 GitHub...";

    const date = new Date().toISOString().slice(0, 10);
    const slug = slugify(title);
    const time = new Date().toISOString().slice(11, 19).replace(/:/g, "");
    const filePath = `posts/${date}-${time}-${slug}.html`;
    const postHtml = renderPostHtml({
      title,
      date,
      markdownHtml: md ? md.render(markdown) : markdown,
    });

    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `token ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `publish: ${title}`,
          content: toBase64Utf8(postHtml),
          branch,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "GitHub API 发布失败");
      }

      const postUrl = buildPagesUrl(owner, repo, filePath);
      const posts = getSavedPosts();
      posts.unshift({
        id: String(Date.now()),
        title,
        date,
        url: postUrl,
      });
      savePosts(posts);

      if (statusEl) statusEl.textContent = "发布成功，正在返回 blog 页面...";
      window.location.href = "./index.html#blog";
    } catch (error) {
      if (statusEl) statusEl.textContent = `发布失败：${error.message}`;
    }
  });

  cancelEditorBtn.addEventListener("click", () => {
    window.location.href = "./index.html#blog";
  });
}

initBlogHome();
initEditorPage();
