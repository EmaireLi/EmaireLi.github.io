const fs = require("node:fs");
const path = require("node:path");

const repoRoot = process.cwd();
const postsDir = path.join(repoRoot, "posts");
const manifestPath = path.join(postsDir, "posts.json");

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

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Generated ${path.relative(repoRoot, manifestPath)} (${manifest.length} posts)`);
}

run();
