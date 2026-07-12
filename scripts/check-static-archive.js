const fs = require("node:fs");
const path = require("node:path");
const { renderArchive, replaceArchiveBlock } = require("./generate-posts-manifest.js");

const repoRoot = process.cwd();
const indexHtml = fs.readFileSync(path.join(repoRoot, "index.html"), "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(repoRoot, "posts", "posts.json"), "utf8"));
const scriptSource = fs.readFileSync(path.join(repoRoot, "script.js"), "utf8");
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const startMarker = "<!-- ARCHIVE:START -->";
const endMarker = "<!-- ARCHIVE:END -->";
assert((indexHtml.match(/<!-- ARCHIVE:START -->/g) || []).length === 1, "expected one start marker");
assert((indexHtml.match(/<!-- ARCHIVE:END -->/g) || []).length === 1, "expected one end marker");

const block = indexHtml.split(startMarker)[1]?.split(endMarker)[0] || "";
const hrefFiles = Array.from(block.matchAll(/href="\.\/posts\/([^"]+)"/g), (match) => decodeURI(match[1]));
assert((block.match(/class="archive-entry blog-item"/g) || []).length === manifest.length, "entry count must match manifest");
assert(hrefFiles.join("\n") === manifest.map((post) => post.file).join("\n"), "entry order must match manifest");

manifest.forEach((post) => {
  assert(hrefFiles.filter((file) => file === post.file).length === 1, `${post.file} must appear exactly once`);
  assert(fs.existsSync(path.join(repoRoot, "posts", post.file)), `${post.file} link must resolve`);
});

const renderedFixture = renderArchive([
  { file: "safe&a.html", title: "<script>alert('x')</script>", date: "2026-07-12", excerpt: "A & B", tags: ["<tag>"] },
]);
assert(!renderedFixture.includes("<script>"), "title HTML must be escaped");
assert(renderedFixture.includes("&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;"), "escaped title must be preserved as text");
assert(renderedFixture.includes("A &amp; B"), "excerpt HTML must be escaped");
assert(renderedFixture.includes("&lt;tag&gt;"), "tag HTML must be escaped");
assert(renderedFixture.includes("safe&amp;a.html"), "href HTML must be escaped");

const validFixture = `before${startMarker}\nold\n${endMarker}after`;
assert(replaceArchiveBlock(validFixture, "new").includes(`${startMarker}\nnew\n`), "valid marker pair must be replaceable");
[
  ["missing start", `before${endMarker}after`],
  ["missing end", `before${startMarker}after`],
  ["duplicate start", `${startMarker}${startMarker}${endMarker}`],
  ["duplicate end", `${startMarker}${endMarker}${endMarker}`],
  ["reversed", `${endMarker}${startMarker}`],
].forEach(([name, fixture]) => {
  let threw = false;
  try {
    replaceArchiveBlock(fixture, "new");
  } catch (_error) {
    threw = true;
  }
  assert(threw, `${name} markers must fail closed`);
});

assert(
  scriptSource.includes("filterEl.remove();") && !/catch \(error\)[\s\S]{0,260}listEl\.innerHTML/.test(scriptSource),
  "runtime failure path must preserve the static list"
);

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Static archive contract: pass (${manifest.length} entries, parity, escaping, marker failures, fallback preservation)`);
