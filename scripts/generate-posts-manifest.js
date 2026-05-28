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
  const searchText = [title, date, text].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  const excerpt = text.replace(title, "").trim().slice(0, 160);

  return { file, title, date, excerpt, searchText };
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
