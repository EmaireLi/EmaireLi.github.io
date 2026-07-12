# Round 09 Deduplicated Candidate Set

Both evaluators must score this same set. Cost scores reward lower delivery cost. Round 09 will select exactly one feature.

## C1. Static Archive Baseline

- **Visitor value:** All five published posts remain discoverable if JavaScript is disabled, manifest fetch fails, or enhancement initializes late.
- **Fit:** The canonical archive is currently an empty `<ul>` populated only at runtime, despite the site's durable-archive promise.
- **Approach:** Extend manifest generation to replace an exact marked block in `index.html` with escaped semantic year groups and all entries. Enhance that baseline when fetch succeeds; preserve it on failure. Require idempotency and manifest parity.
- **Cost:** M.
- **Showcase:** Progressive enhancement, safe generator ownership, deterministic content pipelines.
- **Risk:** Marker corruption, duplicate entries, or noisy generated diffs if ownership is weak.

## C2. Addressable Archive Topic Views

- **Visitor value:** Exact archive topics can be bookmarked, shared, reloaded, and traversed with browser back/forward.
- **Fit:** Exact tag filtering already works; only persistent URL state is missing.
- **Approach:** Use `?tag=<exact>#blog`, validate against manifest tags, default invalid values to 全部, update via history, and restore on `popstate`. Preserve unrelated query parameters and current button/ARIA semantics.
- **Cost:** S–M.
- **Showcase:** URL/state design, Unicode handling, accessible history semantics.
- **Risk:** Encoding, invalid state, hash/query ordering, focus, and history can be subtly wrong; no-JS still lacks the complete archive without C1.

## C3. Transparent Chronological Continuation

- **Visitor value:** Article finishers can move to an explicitly newer or older local post without returning to the homepage.
- **Fit:** Every article currently ends with only a generic archive link; the manifest provides exact order and local titles.
- **Approach:** Match the decoded current filename, inject a quiet semantic endcap with at most one newer and one older title/date, label chronology honestly, and retain the static archive fallback. Keep all current shells and both generators aligned if a mount is needed.
- **Cost:** M.
- **Showcase:** Explainable local retrieval, Unicode-path correctness, progressive fallback.
- **Risk:** Sparse content, edge posts, reversed labels, self-links, and shared-script regression. No related/personalized claim is allowed.

## C4. Public Contact Intent Guide

- **Visitor value:** Visitors know the guestbook is public, what messages belong there, and what must not be posted.
- **Fit:** Start Here welcomes questions and collaboration, but Contact supplies only generic copy and no privacy expectation.
- **Approach:** Add concise static intent/privacy guidance around the existing compose action; do not invent a private endpoint, prefill, response promise, or new account.
- **Cost:** S.
- **Showcase:** Honest conversion and responsible constraint communication.
- **Risk:** Cannot solve the missing private channel and may over-formalize a warm personal section.

## C5. Article Closing Signature

- **Visitor value:** Direct article visitors understand that the post belongs to Alex's personal archive and can choose First Reads or the full archive.
- **Fit:** Homepage framing is strong, but direct post endings are abrupt and generic.
- **Approach:** Add a static, tone-neutral archive signature to current shells and both generators using existing metadata and local exits only.
- **Cost:** S–M.
- **Showcase:** Editorial continuity and direct-landing clarity.
- **Risk:** Modest behavioral gain and potential resume-like intrusion after personal writing.

## C6. Longform Article Contents Navigator

- **Visitor value:** The exceptionally long 京吹 essay becomes scannable through authored headings; short notes remain unchanged.
- **Fit:** One post clearly crosses the threshold for internal navigation while the others do not.
- **Approach:** For three or more headings, assign stable collision-safe ids and render a semantic contents nav with ordinary hash links; no scrollspy.
- **Cost:** M.
- **Showcase:** Document structure, CJK slugging, responsive editorial typography.
- **Risk:** Primarily benefits one post and dynamic ids weaken no-JS behavior.

## Removed Before Evaluation

- Generic related posts, embedding similarity, RAG, or personalization: five posts and broad/source tags do not support the claims.
- First Reads-to-topic handoff: depends on C2 and is a later consequence, not an independent feature.
- External destination guide: article account URLs need consistency verification first and local continuity has higher priority.
- WebGL/WebGPU graph, animated minimap, or content carousel: adds cost and accessibility burden without stronger visitor value.
