const assert = require("node:assert/strict");
const fs = require("node:fs");

const index = fs.readFileSync("index.html", "utf8");
const client = fs.readFileSync("script.js", "utf8");
const worker = fs.readFileSync("guestbook/worker.mjs", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");

const disclosureId = "guestbook-public-note";
const expectedCopy = "署名和留言会公开显示在本页；请勿填写手机号、邮箱或其他隐私信息。留言最多 100 字。";
const idMatches = index.match(new RegExp(`id="${disclosureId}"`, "g")) || [];
assert.equal(idMatches.length, 1, "public disclosure id must exist exactly once");

const disclosureMatch = index.match(new RegExp(`<p id="${disclosureId}"[^>]*>([^<]+)</p>`));
assert.ok(disclosureMatch, "public disclosure must be a static paragraph");
assert.equal(disclosureMatch[1], expectedCopy, "public disclosure must stay factual and complete");

const disclosureIndex = index.indexOf(`id="${disclosureId}"`);
const composeIndex = index.indexOf("data-guestbook-compose");
const formIndex = index.indexOf("data-guestbook-form");
assert.ok(disclosureIndex < composeIndex && composeIndex < formIndex, "disclosure must precede composition and form entry");

const composeTag = index.match(/<button[^>]*data-guestbook-compose[^>]*>写公开留言<\/button>/)?.[0] || "";
const formTag = index.match(/<form[^>]*data-guestbook-form[^>]*>/)?.[0] || "";
assert.match(composeTag, /aria-describedby="guestbook-public-note"/, "compose action must reference disclosure");
assert.match(composeTag, /aria-controls="guestbook-form"/, "compose action must retain form control relationship");
assert.match(composeTag, /aria-expanded="false"/, "compose action must retain collapsed state");
assert.match(formTag, /aria-describedby="guestbook-public-note"/, "form must reference disclosure");

const copyLimit = Number(expectedCopy.match(/最多 (\d+) 字/)?.[1]);
const textareaLimit = Number(index.match(/id="guestbook-message"[^>]*maxlength="(\d+)"/)?.[1]);
const clientLimit = Number(client.match(/const guestbookMaxLength = (\d+);/)?.[1]);
const workerLimit = Number(worker.match(/const MESSAGE_MAX_LENGTH = (\d+);/)?.[1]);
assert.deepEqual([copyLimit, textareaLimit, clientLimit, workerLimit], [100, 100, 100, 100], "copy, textarea, client, and Worker message limits must agree");

assert.match(styles, /\.guestbook-public-note\s*\{[\s\S]*?color: var\(--muted-color\);[\s\S]*?line-height: 1\.7;/, "disclosure must use a quiet readable treatment");
assert.doesNotMatch(styles.match(/\.guestbook-public-note\s*\{[\s\S]*?\}/)?.[0] || "", /#(?:f00|ff0000)|red|alert|animation/, "disclosure must not use error or animated styling");

console.log("Guestbook disclosure contract: pass (pre-compose order, resolved descriptions, factual copy, 100-character parity)");
