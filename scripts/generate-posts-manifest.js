const fs = require("node:fs");
const path = require("node:path");

const repoRoot = process.cwd();
const postsDir = path.join(repoRoot, "posts");
const manifestPath = path.join(postsDir, "posts.json");
const indexPath = path.join(repoRoot, "index.html");
const archiveStartMarker = "<!-- ARCHIVE:START -->";
const archiveEndMarker = "<!-- ARCHIVE:END -->";

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripTags(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function extractFirst(regex, text) {
  const match = text.match(regex);
  return match ? match[1] : "";
}

function extractTags(html) {
  const tags = [];
  const seen = new Set();
  const tagRegex = /<span[^>]*class=["'][^"']*\bxhs-tag\b[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi;
  let match = tagRegex.exec(html);

  while (match) {
    const tag = decodeHtmlEntities(stripTags(match[1]))
      .replace(/^#/, "")
      .replace(/\s+/g, " ")
      .trim();
    const key = tag.toLowerCase();
    if (tag && !seen.has(key)) {
      seen.add(key);
      tags.push(tag);
    }
    match = tagRegex.exec(html);
  }

  return tags;
}

function addTag(tags, tag) {
  if (!tags.includes(tag)) tags.push(tag);
}

function inferTags({ file, title, text }) {
  const haystack = [file, title, text].join(" ").toLowerCase();
  const tags = [];

  if (/xhs-|小红书/.test(haystack)) addTag(tags, "小红书");
  if (/京吹|上低音号|京阿尼|动画|acgn|bangumi/.test(haystack)) addTag(tags, "ACGN");
  if (/求职|实习|保研|就业|面试|转正|牛客|大厂|读研|java/.test(haystack)) addTag(tags, "求职");
  if (/java|fastapi|算法|代码|编程|开发/.test(haystack)) addTag(tags, "技术");
  if (/apple|gpt|plus|礼品卡|充值|账号|account|工具/.test(haystack)) addTag(tags, "工具");
  if (/朋友|西湖|灵隐|川大|銀杏|银杏|杭州|高中|生活|失眠|焦虑|焦慮/.test(haystack)) addTag(tags, "生活");

  return tags;
}

function mergeTags(primary, fallback) {
  const tags = [];
  const seen = new Set();
  primary.concat(fallback).forEach((tag) => {
    const normalized = String(tag || "").replace(/^#/, "").replace(/\s+/g, " ").trim();
    const key = normalized.toLowerCase();
    if (!normalized || seen.has(key)) return;
    seen.add(key);
    tags.push(normalized);
  });
  return tags;
}

function inferDateFromFilename(file) {
  const m = file.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : "";
}

function buildManifestEntry(file) {
  const fullPath = path.join(postsDir, file);
  const html = fs
    .readFileSync(fullPath, "utf8")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");

  const h1 = extractFirst(/<h1[^>]*>([\s\S]*?)<\/h1>/i, html);
  const titleTag = extractFirst(/<title[^>]*>([\s\S]*?)<\/title>/i, html);
  const title = decodeHtmlEntities(stripTags(h1 || titleTag || file.replace(/\.html$/i, "")));

  const metaDate = extractFirst(/<p[^>]*class=["'][^"']*meta[^"']*["'][^>]*>([\s\S]*?)<\/p>/i, html);
  const dateMatch = (metaDate || "").match(/\d{4}-\d{2}-\d{2}/);
  const date = dateMatch ? dateMatch[0] : inferDateFromFilename(file);

  const article = extractFirst(/<article[^>]*>([\s\S]*?)<\/article>/i, html);
  const postBody = extractFirst(/<div[^>]*class=["'][^"']*(?:post-body|article-content)[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<\/article>/i, html);
  const searchableHtml = (article || postBody || html).replace(
    /<div[^>]*class=["'][^"']*xhs-gallery[^"']*["'][\s\S]*?<p[^>]*class=["'][^"']*xhs-gallery-count[^"']*["'][\s\S]*?<\/p>\s*<\/div>/gi,
    " "
  );
  const text = decodeHtmlEntities(stripTags(searchableHtml));
  const excerpt = text.replace(title, "").trim().slice(0, 160);
  const tags = mergeTags(extractTags(html), inferTags({ file, title, text }));
  const searchText = [title, date, tags.join(" "), text].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();

  return { file, title, date, excerpt, searchText, tags };
}

function getPostYear(post) {
  const match = String(post.date || "").match(/^(\d{4})/);
  return match ? match[1] : "未归档";
}

function groupPostsByYear(posts) {
  const groups = new Map();
  posts.forEach((post) => {
    const year = getPostYear(post);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(post);
  });
  return Array.from(groups.entries()).sort(([yearA], [yearB]) => {
    if (yearA === yearB) return 0;
    if (yearA === "未归档") return 1;
    if (yearB === "未归档") return -1;
    return yearB.localeCompare(yearA);
  });
}

function renderPostTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) return "";
  return `<div class="archive-entry-tags">${tags.map((tag) => `<span class="archive-entry-tag">${escapeHtml(tag)}</span>`).join("")}</div>`;
}

function renderArchive(posts) {
  return groupPostsByYear(posts)
    .map(([year, yearPosts]) => {
      const entries = yearPosts
        .map((post) => {
          const title = escapeHtml(post.title || post.file || "Untitled");
          const date = escapeHtml(post.date || "");
          const excerpt = escapeHtml(post.excerpt || "");
          const href = escapeHtml(`./posts/${encodeURI(post.file)}`);
          return `                  <li class="archive-entry blog-item">
                    <time class="archive-entry-date" datetime="${date}">${date || "未注明日期"}</time>
                    <div class="archive-entry-main">
                      <a class="item-title archive-entry-title" href="${href}">${title}</a>
                      ${excerpt ? `<p class="archive-entry-excerpt">${excerpt}</p>` : ""}
                      ${renderPostTags(post.tags)}
                    </div>
                  </li>`;
        })
        .join("\n");
      return `              <li class="archive-year-group">
                <h3 class="archive-year">${escapeHtml(year)}</h3>
                <ol class="archive-timeline">
${entries}
                </ol>
              </li>`;
    })
    .join("\n");
}

function replaceArchiveBlock(indexHtml, archiveHtml) {
  const startMatches = indexHtml.match(/<!-- ARCHIVE:START -->/g) || [];
  const endMatches = indexHtml.match(/<!-- ARCHIVE:END -->/g) || [];
  if (startMatches.length !== 1 || endMatches.length !== 1) {
    throw new Error(`Expected exactly one archive marker pair; found ${startMatches.length} start and ${endMatches.length} end markers`);
  }

  const startIndex = indexHtml.indexOf(archiveStartMarker);
  const endIndex = indexHtml.indexOf(archiveEndMarker);
  if (startIndex >= endIndex) {
    throw new Error("Archive markers are reversed");
  }

  const before = indexHtml.slice(0, startIndex + archiveStartMarker.length);
  const after = indexHtml.slice(endIndex);
  return `${before}\n${archiveHtml}\n              ${after}`;
}

function run() {
  if (!fs.existsSync(postsDir)) {
    throw new Error(`posts directory not found: ${postsDir}`);
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((name) => name.endsWith(".html") && name !== "new-post-template.html")
    .sort((a, b) => b.localeCompare(a));

  const manifest = files.map(buildManifestEntry).sort((a, b) => {
    if (a.date === b.date) return b.file.localeCompare(a.file);
    return (b.date || "").localeCompare(a.date || "");
  });

  const indexHtml = fs.readFileSync(indexPath, "utf8");
  const nextIndexHtml = replaceArchiveBlock(indexHtml, renderArchive(manifest));
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  fs.writeFileSync(indexPath, nextIndexHtml, "utf8");
  console.log(`Generated ${path.relative(repoRoot, manifestPath)} (${manifest.length} posts)`);
  console.log(`Updated static archive in ${path.relative(repoRoot, indexPath)}`);
}

if (require.main === module) {
  run();
}

module.exports = { escapeHtml, renderArchive, replaceArchiveBlock };
