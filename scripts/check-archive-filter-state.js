const assert = require("node:assert/strict");
const fs = require("node:fs");
const { ALL_TAG, resolveArchiveState, buildArchiveUrl, planArchiveTransition } = require("../archive-filter-state.js");

const tags = ["ACGN", "工具", "求职", "生活", "+"];

assert.deepEqual(resolveArchiveState("https://site.test/?tag=%E6%B1%82%E8%81%8C#blog", tags), { tag: "求职", shouldReplace: false });
assert.deepEqual(resolveArchiveState("https://site.test/?tag=ACGN", tags), { tag: "ACGN", shouldReplace: true });
assert.deepEqual(resolveArchiveState("https://site.test/?tag=%E5%B7%A5%E5%85%B7#blog", tags), { tag: "工具", shouldReplace: false });
assert.deepEqual(resolveArchiveState("https://site.test/?tag=%2B#blog", tags), { tag: "+", shouldReplace: false });
assert.deepEqual(resolveArchiveState("https://site.test/?tag=+#blog", tags), { tag: ALL_TAG, shouldReplace: true });
assert.deepEqual(resolveArchiveState("https://site.test/?tag=#blog", tags), { tag: ALL_TAG, shouldReplace: true });
assert.deepEqual(resolveArchiveState("https://site.test/?tag=unknown#blog", tags), { tag: ALL_TAG, shouldReplace: true });
assert.deepEqual(resolveArchiveState("https://site.test/?tag=%E6%B1%82%E8%81%8C&tag=%E6%B1%82%E8%81%8C#blog", tags), { tag: ALL_TAG, shouldReplace: true });
assert.deepEqual(resolveArchiveState("https://site.test/?tag=%E5%85%A8%E9%83%A8#blog", tags), { tag: ALL_TAG, shouldReplace: true });
assert.deepEqual(resolveArchiveState("https://site.test/?x=1#contact", tags), { tag: ALL_TAG, shouldReplace: false });

const changed = buildArchiveUrl("https://site.test/?x=1&x=2&tag=old&y=a+b#contact", "求职");
assert.deepEqual(changed.searchParams.getAll("x"), ["1", "2"]);
assert.equal(changed.searchParams.get("y"), "a b");
assert.deepEqual(Array.from(changed.searchParams.keys()), ["x", "x", "y", "tag"]);
assert.equal(changed.searchParams.get("tag"), "求职");
assert.equal(changed.hash, "#blog");

const cleared = buildArchiveUrl(changed, ALL_TAG);
assert.equal(cleared.searchParams.has("tag"), false);
assert.deepEqual(cleared.searchParams.getAll("x"), ["1", "2"]);

const invalidCleanup = buildArchiveUrl("https://site.test/?x=1&tag=bad#contact", ALL_TAG, { ensureBlogHash: false });
assert.equal(invalidCleanup.hash, "#contact");
assert.equal(invalidCleanup.search, "?x=1");

assert.deepEqual(planArchiveTransition("全部", { tag: "全部", shouldReplace: false }, "initial"), { action: "render", tag: "全部" });
assert.deepEqual(planArchiveTransition("全部", { tag: "全部", shouldReplace: true }, "initial"), { action: "replace", tag: "全部" });
assert.deepEqual(planArchiveTransition("求职", { tag: "求职" }, "user"), { action: "none", tag: "求职" });
assert.deepEqual(planArchiveTransition("全部", { tag: "求职" }, "user"), { action: "push", tag: "求职" });
assert.deepEqual(planArchiveTransition("求职", { tag: "生活", shouldReplace: true }, "popstate"), { action: "render", tag: "生活" });

const scriptSource = fs.readFileSync("script.js", "utf8");
const indexSource = fs.readFileSync("index.html", "utf8");
const popstateBlock = scriptSource.match(/window\.addEventListener\("popstate", \(\) => \{([\s\S]*?)\n    \}\);/);
assert.ok(popstateBlock, "popstate handler must exist");
assert.doesNotMatch(popstateBlock[1], /pushState|replaceState|\.focus\(|scrollTo|scrollIntoView/, "popstate must not mutate URL, focus, or scroll");
assert.equal((scriptSource.match(/window\.history\.pushState/g) || []).length, 1, "one guarded pushState call expected");
assert.equal((scriptSource.match(/window\.history\.replaceState/g) || []).length, 1, "one initial replaceState call expected");
assert.ok(indexSource.indexOf("archive-filter-state.js?v=20260712a") < indexSource.indexOf("script.js?v=20260712b"), "state helper must load before the shared script");
assert.match(indexSource, /id="blog-auto-status"[^>]*role="status"[^>]*aria-live="polite"[^>]*aria-atomic="true"/, "archive status must be a restrained polite live region");

console.log("Archive filter state contract: pass (Unicode, encoding, invalid state, parameter preservation, history decisions)");
