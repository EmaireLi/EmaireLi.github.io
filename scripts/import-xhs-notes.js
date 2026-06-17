const fs = require("node:fs");
const path = require("node:path");
const childProcess = require("node:child_process");

const repoRoot = process.cwd();
const inputPath = path.resolve(repoRoot, process.argv[2] || "imports/xhs-notes.json");
const postsDir = path.join(repoRoot, "posts");
const assetsDir = path.join(repoRoot, "assets", "xhs");

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

function noteImageCount(note) {
  const title = String(note.title || "").trim();
  const lines = String(note.content || note.body || note.text || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const titleIndex = lines.findIndex((line) => line === title);
  const searchLines = titleIndex >= 0 ? lines.slice(0, titleIndex) : lines;
  const pageLine = searchLines.find((line) => /^1\/\d+$/.test(line));
  const match = pageLine && pageLine.match(/^1\/(\d+)$/);
  return match ? Number(match[1]) : 0;
}

function imageIdentity(src) {
  const text = String(src || "");
  const match = text.match(/\/([^/!]+)!/);
  return match ? match[1] : text;
}

function selectNoteImages(note) {
  const count = noteImageCount(note);
  if (!count || !Array.isArray(note.images)) return [];

  const seen = new Set();
  const candidates = [];
  for (const src of note.images) {
    const text = String(src || "");
    if (!text.includes("sns-webpic")) continue;
    if (text.includes("/comment/")) continue;
    if (text.includes("sns-avatar") || text.includes("/avatar/")) continue;
    const key = imageIdentity(text);
    if (seen.has(key)) continue;
    seen.add(key);
    candidates.push(text);
  }

  return candidates.slice(-count);
}

function extensionFromContentType(contentType) {
  if (/png/i.test(contentType)) return ".png";
  if (/jpe?g/i.test(contentType)) return ".jpg";
  if (/gif/i.test(contentType)) return ".gif";
  return ".webp";
}

function downloadImage(url, outputBase) {
  const existingPath = [".webp", ".jpg", ".png", ".gif"].map((ext) => `${outputBase}${ext}`).find((file) => fs.existsSync(file));
  if (existingPath) {
    return path.relative(postsDir, existingPath).replace(/\\/g, "/");
  }

  const tmpPath = `${outputBase}.download`;
  const result = childProcess.spawnSync(
    "curl",
    [
      "-L",
      "--fail",
      "--silent",
      "--show-error",
      "--max-time",
      "30",
      "-A",
      "Mozilla/5.0",
      "-e",
      "https://www.xiaohongshu.com/",
      "-D",
      `${outputBase}.headers`,
      "-o",
      tmpPath,
      url,
    ],
    { encoding: "utf8" }
  );

  if (result.status !== 0) {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    if (fs.existsSync(`${outputBase}.headers`)) fs.unlinkSync(`${outputBase}.headers`);
    throw new Error(`Failed to download image: ${url}\n${result.stderr || result.stdout || ""}`.trim());
  }

  const headers = fs.existsSync(`${outputBase}.headers`) ? fs.readFileSync(`${outputBase}.headers`, "utf8") : "";
  const contentType = (headers.match(/content-type:\s*([^\r\n]+)/i) || [])[1] || "";
  const finalPath = `${outputBase}${extensionFromContentType(contentType)}`;
  fs.renameSync(tmpPath, finalPath);
  if (fs.existsSync(`${outputBase}.headers`)) fs.unlinkSync(`${outputBase}.headers`);
  return path.relative(postsDir, finalPath).replace(/\\/g, "/");
}

function syncImages(note, baseName) {
  const urls = selectNoteImages(note);
  if (urls.length === 0) return [];

  const noteAssetsDir = path.join(assetsDir, baseName);
  fs.mkdirSync(noteAssetsDir, { recursive: true });

  const localPaths = [];
  urls.forEach((url, index) => {
    const outputBase = path.join(noteAssetsDir, String(index + 1).padStart(2, "0"));
    localPaths.push(downloadImage(url, outputBase));
  });
  return localPaths;
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
  const slides = images
    .filter(Boolean)
    .map((src, index) => {
      const safeSrc = escapeHtml(src);
      return `<figure class="xhs-image"><img src="${safeSrc}" alt="小红书图片 ${index + 1}" loading="lazy" /></figure>`;
    })
    .join("\n");
  if (!slides) return "";

  const count = images.filter(Boolean).length;
  return `<div class="xhs-gallery" data-xhs-gallery data-count="${count}">
  <button class="xhs-gallery-button xhs-gallery-prev" type="button" aria-label="上一张图片">‹</button>
  <div class="xhs-gallery-track" tabindex="0">
${slides}
  </div>
  <button class="xhs-gallery-button xhs-gallery-next" type="button" aria-label="下一张图片">›</button>
  <p class="xhs-gallery-count" aria-live="polite">1 / ${count}</p>
</div>`;
}

function renderTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) return "";
  const items = tags
    .filter(Boolean)
    .map((tag) => `<span class="xhs-tag">#${escapeHtml(String(tag).replace(/^#/, ""))}</span>`)
    .join(" ");
  return `<p class="xhs-tags">${items}</p>`;
}

function renderPostHtml(note, localImages = []) {
  const title = escapeHtml(note.title || "小红书笔记");
  const contentText = extractCleanContent(note);
  const date = normalizeDate(extractEditedDate(note.content) || note.date || note.createdAt || note.publishedAt);
  const sourceUrl = note.url || note.sourceUrl || "";
  const source = sourceUrl
    ? `小红书同步 · ${date} · <a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noreferrer">原文链接</a>`
    : `小红书同步 · ${date}`;
  const body = note.contentHtml || paragraphize(contentText);
  const images = renderImages(localImages);
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
          <a class="account-link account-link-bilibili" href="https://www.bilibili.com/" target="_blank" rel="noreferrer">Bilibili</a>
          <a class="account-link account-link-xhs" href="https://www.xiaohongshu.com/" target="_blank" rel="noreferrer">小红书</a>
          <a class="account-link account-link-github" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
          <a class="account-link account-link-steam" href="https://store.steampowered.com/" target="_blank" rel="noreferrer">Steam</a>
          <a class="account-link account-link-bangumi" href="https://bgm.tv/user/muwii_" target="_blank" rel="noreferrer">Bangumi</a>
          <a class="account-link account-link-leetcode" href="https://leetcode.cn/u/emaire/" target="_blank" rel="noreferrer">LeetCode</a>
        </nav>
      </div>

      <div class="main-inner page posts-expand">
        <article class="post-block">
          <header class="post-header">
            <h1 class="post-title">${title}</h1>
            <div class="post-meta-container">${source}</div>
          </header>

          <div class="post-body article-content">
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
    <script src="../script.js?v=20260528b"></script>
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
    const baseName = `${date}-xhs-${slug}`;
    const file = `${baseName}.html`;
    const fileBaseName = file.replace(/\.html$/i, "");
    const localImages = syncImages(note, fileBaseName);
    fs.writeFileSync(path.join(postsDir, file), renderPostHtml(note, localImages), "utf8");
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
