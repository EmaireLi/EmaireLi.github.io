const fs = require("node:fs");
const path = require("node:path");
const childProcess = require("node:child_process");

const repoRoot = process.cwd();
const inputPath = path.resolve(repoRoot, process.argv[2] || "imports/xhs-notes.json");
const postsDir = path.join(repoRoot, "posts");

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugify(value) {
  return (
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^\w\u4e00-\u9fa5\- ]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "xhs-note"
  );
}

function normalizeDate(value) {
  const text = String(value || "").trim();
  const match = text.match(/\d{4}-\d{2}-\d{2}/);
  if (match) return match[0];
  return new Date().toISOString().slice(0, 10);
}

function normalizeDisplayDate(value) {
  const text = String(value || "").trim();
  const exact = text.match(/\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/);
  if (exact) {
    return exact[0]
      .replace(/[/.]/g, "-")
      .replace(/-(\d)(?=-|$)/g, "-0$1");
  }

  const short = text.match(/(\d{1,2})[-/.](\d{1,2})/);
  if (short) {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${short[1].padStart(2, "0")}-${short[2].padStart(2, "0")}`;
  }

  return "";
}

function extractEditedDate(text) {
  const line = String(text || "")
    .split(/\r?\n/)
    .find((item) => /^(编辑于|发布于)?\s*\d{4}[-/.]\d{1,2}[-/.]\d{1,2}|^编辑于\s*\d{1,2}[-/.]\d{1,2}/.test(item.trim()));
  return normalizeDisplayDate(line || "");
}

function isUiLine(line) {
  return (
    /^(点点|ai|RED|LIVE|直播|消息|我|更多|关于我们|活动)$/.test(line) ||
    /^沪ICP备/.test(line) ||
    /^©\s*2014-/.test(line) ||
    /^行吟信息科技/.test(line) ||
    /^地址：上海市/.test(line) ||
    /^电话：/.test(line) ||
    /^小红书号：/.test(line) ||
    /^IP属地：/.test(line) ||
    /^(粉丝|获赞与收藏|笔记|专辑・|文件・)/.test(line) ||
    /^你还没有/.test(line) ||
    /^共\s*\d+\s*条评论/.test(line) ||
    /^(置顶评论|赞|回复|发送|取消|说点什么|这是一片荒地点击评论|- THE END -)$/.test(line) ||
    /^\d+$/.test(line)
  );
}

function extractCleanContent(note) {
  const raw = String(note.content || note.body || note.text || "");
  const title = String(note.title || "").trim();
  let lines = raw
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !isUiLine(line));

  const titleIndex = lines.findIndex((line) => line === title);
  if (titleIndex >= 0) {
    lines = lines.slice(titleIndex + 1);
  }

  while (lines[0] && (/^\d+\/\d+$/.test(lines[0]) || lines[0] === "河野华" || lines[0] === "作者")) {
    lines.shift();
  }

  const stopIndex = lines.findIndex((line) => {
    return (
      /^编辑于/.test(line) ||
      /^发布于/.test(line) ||
      /^共\s*\d+\s*条评论/.test(line) ||
      /^这是一片荒地/.test(line) ||
      /^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/.test(line)
    );
  });
  if (stopIndex >= 0) {
    lines = lines.slice(0, stopIndex);
  }

  lines = lines.filter((line) => line !== "河野华" && line !== "作者" && !isUiLine(line));
  return lines.join("\n\n").trim();
}

function hasDetailPageSignal(note) {
  const title = String(note.title || "").trim();
  const lines = String(note.content || note.body || note.text || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const titleIndex = lines.findIndex((line) => line === title);
  if (titleIndex < 0) return false;

  const beforeTitle = lines.slice(Math.max(0, titleIndex - 12), titleIndex);
  const afterTitle = lines.slice(titleIndex + 1, titleIndex + 40);
  return (
    beforeTitle.some((line) => /^\d+\/\d+$/.test(line)) ||
    afterTitle.some((line) => /^编辑于/.test(line) || /^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/.test(line))
  );
}

function paragraphize(text) {
  return String(text || "")
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br />")}</p>`)
    .join("\n");
}

function renderImages(images) {
  if (!Array.isArray(images) || images.length === 0) return "";
  return images
    .filter((src) => {
      const text = String(src || "");
      return text && !text.includes("sns-avatar") && !text.includes("avatar/");
    })
    .map((src) => {
      const safeSrc = escapeHtml(src);
      return `<figure class="xhs-image"><img src="${safeSrc}" alt="" loading="lazy" /></figure>`;
    })
    .join("\n");
}

function renderTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) return "";
  const items = tags
    .filter(Boolean)
    .map((tag) => `<span class="xhs-tag">#${escapeHtml(String(tag).replace(/^#/, ""))}</span>`)
    .join(" ");
  return `<p class="xhs-tags">${items}</p>`;
}

function renderPostHtml(note) {
  const title = escapeHtml(note.title || "小红书笔记");
  const contentText = extractCleanContent(note);
  const date = normalizeDate(extractEditedDate(note.content) || note.date || note.createdAt || note.publishedAt);
  const sourceUrl = note.url || note.sourceUrl || "";
  const source = sourceUrl
    ? `<p class="meta">小红书同步 · ${date} · <a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noreferrer">原文链接</a></p>`
    : `<p class="meta">小红书同步 · ${date}</p>`;
  const body = note.contentHtml || paragraphize(contentText);
  const images = note.includeImages ? renderImages(note.images) : "";
  const tags = renderTags(note.tags);

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#222222" />
    <title>${title} | Alex</title>
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
      </div>

      <div class="main-inner page posts-expand">
        <article class="post-block">
          <header class="post-header">
            <h1 class="post-title">${title}</h1>
            <div class="post-meta-container">小红书同步 · ${date}</div>
          </header>

          <div class="post-body article-content">
            ${source}
            ${images}
            ${body}
            ${tags}
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
    <script src="../script.js?v=20260521a"></script>
  </body>
</html>`;
}

function uniqueFileName(baseName) {
  let candidate = `${baseName}.html`;
  let index = 2;
  while (fs.existsSync(path.join(postsDir, candidate))) {
    candidate = `${baseName}-${index}.html`;
    index += 1;
  }
  return candidate;
}

function readNotes() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${path.relative(repoRoot, inputPath)}`);
  }
  const raw = fs.readFileSync(inputPath, "utf8");
  const data = JSON.parse(raw);
  const notes = Array.isArray(data) ? data : data.notes;
  if (!Array.isArray(notes)) {
    throw new Error("Input JSON must be an array or an object with a notes array.");
  }
  return notes;
}

function run() {
  fs.mkdirSync(postsDir, { recursive: true });
  const notes = readNotes();
  const validNotes = notes.filter((note) => hasDetailPageSignal(note) && extractCleanContent(note).length >= 20);

  const written = validNotes.map((note, index) => {
    const date = normalizeDate(extractEditedDate(note.content) || note.date || note.createdAt || note.publishedAt);
    const slug = slugify(note.slug || note.title || `xhs-note-${index + 1}`);
    const file = uniqueFileName(`${date}-xhs-${slug}`);
    fs.writeFileSync(path.join(postsDir, file), renderPostHtml(note), "utf8");
    return file;
  });

  childProcess.execFileSync("node", ["scripts/generate-posts-manifest.js"], {
    cwd: repoRoot,
    stdio: "inherit",
  });

  const skipped = notes.length - validNotes.length;
  console.log(`Imported ${written.length} Xiaohongshu notes${skipped ? `, skipped ${skipped} notes without usable detail text` : ""}:`);
  written.forEach((file) => console.log(`- posts/${file}`));
}

run();
