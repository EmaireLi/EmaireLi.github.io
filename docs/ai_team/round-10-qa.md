# Round 10 QA — Addressable Archive Filter State

## Result

PASS for URL/state contracts, source integration, progressive fallback, and independent acceptance. The in-app browser remains unavailable because its local error-page URL policy blocks interaction; no bypass was attempted.

## Verified matrix

- Exact canonical Unicode and ASCII manifest tags resolve.
- `%2B` and raw `+` are distinguished correctly.
- Empty, unknown, duplicate, and `全部` values render the full archive and require initial cleanup.
- A valid tag without `#blog` requires one initial replacement; an invalid cleanup preserves the existing hash.
- Changing `tag` preserves unrelated parameters, repeated values, and their order.
- Same-state user activation is a no-op; an actual user change plans one push.
- Initial state plans at most one replace.
- `popstate` plans render only; its handler contains no push, replace, focus, or scroll call.
- The helper loads before the shared script and exactly one polite, atomic archive status exists.
- The Round 09 five-entry static baseline and fetch-failure preservation contract still pass.
- No article tag links, First Reads rewiring, static topic pages, continuation, guestbook copy, or Topic Hub framing was added.

## Checks

- `node --check archive-filter-state.js` — pass.
- `node --check script.js` — pass.
- `node --check scripts/check-archive-filter-state.js` — pass.
- `node scripts/check-archive-filter-state.js` — pass.
- `node scripts/generate-posts-manifest.js` — pass and idempotent.
- `node scripts/check-static-archive.js` — pass.
- `node --check scripts/import-xhs-notes.js` — pass.
- `git diff --check` — pass.
- Independent QA worker — PASS.

## Residual risk

Real browser history traversal, focus retention, scroll position, and live-region timing were not replayed because of the browser plugin policy restriction. Pure state fixtures, an independent exact-URL matrix, source integration checks, and popstate side-effect guards provide deterministic coverage but are not presented as visual/browser evidence.
