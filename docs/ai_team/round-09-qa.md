# Round 09 QA — Static Archive Baseline

## Result

PASS for implementation, generator integration, progressive source baseline, and independent acceptance. Live in-app browser interaction remains unverified because the browser plugin's local error-page URL policy rejected further use; no bypass was attempted.

## Automated evidence

- `node --check script.js` — pass.
- `node --check scripts/generate-posts-manifest.js` — pass.
- `node --check scripts/check-static-archive.js` — pass.
- `node --check scripts/import-xhs-notes.js` — pass.
- `node scripts/generate-posts-manifest.js` — pass; five posts generated into both outputs.
- `node scripts/check-static-archive.js` — pass for parity, exact-once order, links, escaping, marker failures, and fallback preservation.
- Two consecutive generator runs produced byte-identical `index.html` and `posts/posts.json` — pass.
- `git diff --check` — pass.
- Local HTTP source contained all five archive entries before JavaScript — pass.

## Acceptance findings

- `index.html` contains exactly one ordered marker pair.
- Five manifest entries appear exactly once, in manifest order, and every encoded link resolves to its local post.
- Generated titles, excerpts, tags, and href attributes are HTML-escaped; malicious fixture strings remain text.
- Missing start/end markers, duplicate markers, and reversed markers throw before output writes.
- The source baseline is semantic: year headings, ordered timelines, `time` elements, local links, excerpts, and tags.
- The no-script message accurately says the full archive remains present while tag filters require JavaScript.
- Fetch success retains the existing filter enhancement. Fetch failure removes only the unavailable filter nav, preserves static entries, and reports the degraded state.
- The editor and XHS importer were not modified; no topic URL, article continuation, contact, or visual-system scope was added.

## Independent QA

The single Round 09 QA worker returned PASS after read-only source, integration, temporary-copy failure, idempotency, and regression checks. It made no worktree changes.

## Residual risks

- Actual filter interaction and forced-fetch-failure DOM behavior were not re-run in a live browser because of the plugin policy restriction.
- Manifest and homepage writes are two sequential filesystem operations, not a cross-file atomic transaction. Marker problems fail before either write; an exceptional disk/process interruption between successful writes could still leave one output newer than the other, and the verifier would catch that on the next check.
