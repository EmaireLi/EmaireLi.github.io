# Round 09 Delivery Evaluation

## Method

This review scores the exact C1-C6 set in `round-09-candidates.md` against delivery evidence in the current repository. Scores use a 1-10 scale, where 10 is strongest. The weighted total is out of 10.

| Criterion | Weight | Delivery interpretation |
| --- | ---: | --- |
| Delivery feasibility | 20% | Can the feature be implemented cleanly in the current plain HTML/CSS/JavaScript architecture? |
| Progressive enhancement and accessibility | 20% | Does the baseline remain useful without JavaScript, and are semantics and interaction states robust? |
| Regression risk | 15% | A higher score means a smaller or better-contained regression surface. |
| Deterministic testability | 15% | Can source, generator, DOM, and behavior invariants be checked without subjective or external evidence? |
| Engineering showcase | 25% | Does the result demonstrate substantive, inspectable engineering rather than only copy or decoration? |
| Cost | 5% | A higher score rewards lower implementation and maintenance effort. |

Engineering showcase receives the largest weight because this is a personal engineering site, while feasibility and progressive enhancement remain co-primary delivery gates. Cost is deliberately modest: a small feature should not outrank a durable system improvement merely because it is cheap.

## Repository evidence

- The canonical archive list is populated by `renderTimelineArchive()` only after `fetchPosts()` succeeds. Its failure branch reports an error and clears filters, so the current homepage archive has no complete resilient content baseline.
- `scripts/generate-posts-manifest.js` already owns deterministic manifest order and metadata extraction, but it currently writes only `posts/posts.json`; adding a strictly marked `index.html` output block is a bounded extension of an existing content pipeline.
- Exact tag filtering already exists in `script.js`, including active-button and `aria-pressed` state. URL/history state would therefore extend a working interaction rather than create it, but it introduces query parsing and navigation-state behavior not currently covered.
- All five article shells load the shared script and end with a static `Back to archive` link. The editor renderer, XHS importer, and static post template are additional parity surfaces for any article-shell markup change.
- The manifest has only five posts. Chronological neighbors are deterministic, but edge posts necessarily expose one direction and every dynamic continuation remains dependent on manifest fetch success.
- Only the 京吹 essay has enough authored section structure to justify a contents navigator. Its section headings are inconsistent (`h1` elements and styled paragraphs), which makes a generic heading-derived implementation less clean than the candidate description initially suggests.

## Scores

| Rank | Candidate | Feasibility 20% | Progressive / a11y 20% | Regression 15% | Testability 15% | Showcase 25% | Cost 5% | Weighted total |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | C1 Static Archive Baseline | 8.5 | 10.0 | 7.5 | 9.5 | 9.5 | 7.0 | **8.98** |
| 2 | C4 Public Contact Intent Guide | 9.5 | 10.0 | 9.5 | 10.0 | 5.5 | 10.0 | **8.70** |
| 3 | C5 Article Closing Signature | 9.0 | 10.0 | 9.0 | 9.5 | 6.5 | 8.5 | **8.63** |
| 4 | C3 Transparent Chronological Continuation | 7.5 | 8.5 | 7.0 | 8.5 | 9.0 | 6.5 | **8.10** |
| 5 | C2 Addressable Archive Topic Views | 8.5 | 7.5 | 7.0 | 8.0 | 8.5 | 8.0 | **7.98** |
| 6 | C6 Longform Article Contents Navigator | 7.5 | 6.5 | 7.5 | 8.0 | 8.0 | 6.5 | **7.45** |

## Candidate findings

### C1. Static Archive Baseline

C1 fixes a concrete architectural gap: the site's durable archive currently disappears when enhancement fails. The generator already produces the authoritative sorted dataset, so rendering escaped semantic year groups from that same in-memory manifest avoids introducing a second source of truth. It also produces unusually strong deterministic gates: exactly one start/end marker pair, generator fail-closed behavior, byte-stable repeated runs, manifest-to-HTML parity, valid local links, and retention of baseline markup when fetch rejects.

The primary risk is generator ownership of a hand-edited file. This becomes disqualifying only if the implementation uses a broad or permissive replacement. Delivery must require exactly one matched block, abort on missing or duplicate markers, escape every field, and prove idempotency before writing. The runtime enhancer must replace the baseline only after a valid manifest has been obtained; it must not clear useful content in the catch path.

### C4. Public Contact Intent Guide

C4 is the safest and cheapest candidate. Static guidance is available without JavaScript, creates no new service promise, and is easy to verify. Its limitation is not delivery quality but engineering depth: it mostly changes copy around an already functional public guestbook. It is a sound product hygiene task, but it does little to demonstrate the site's content pipeline or frontend architecture. There is no disqualifying technical risk if the wording remains concise and does not imply privacy, response time, or a private channel.

### C5. Article Closing Signature

C5 is also progressively enhanced by default because it can be static HTML. Current shells plus the editor renderer, XHS importer, and static template make parity mechanically testable. Its delivery weakness is leverage: repeating a brand/archive signature across every article adds maintenance surface for a modest navigational gain, while the existing footer already identifies Alex and links back to the archive. A verbose or résumé-like signature would be an editorial disqualifier; a small semantic endcap is technically safe.

### C3. Transparent Chronological Continuation

C3 has strong engineering value and can use the manifest's existing sort order without pretending to infer relevance. Matching must compare a decoded basename against manifest filenames, explicitly handle both ends of the list, prevent self-links, and name directions according to the actual descending chronology. It can preserve the existing archive link if fetch or matching fails.

Its regression surface is wider than C1: all article pages share `script.js`, Unicode pathname behavior varies by representation, and a shell mount would need generator parity. With only five posts, a deterministic unit-style contract plus browser checks across the newest, middle, and oldest post is necessary. Reversing “newer” and “older,” removing the static archive fallback, or claiming relatedness would be disqualifying.

### C2. Addressable Archive Topic Views

C2 extends an existing filter cleanly and demonstrates useful URL-state engineering. The hard part is not rendering but navigation semantics: exact Unicode validation, preservation of unrelated parameters, canonical invalid-state fallback, `pushState` versus `replaceState`, `popstate` restoration, and avoiding unnecessary focus movement or announcements. These behaviors are deterministically testable, but the matrix is larger than the nominal cost suggests.

Its progressive-enhancement score is limited because a bookmarked tag URL still has no complete archive without C1. That is not an absolute disqualifier, but implementing it first leaves the most important failure mode intact. Dropping unrelated query parameters, accepting partial/case-folded tags, or creating history entries during `popstate` restoration would be disqualifying defects.

### C6. Longform Article Contents Navigator

C6 benefits only one current post and encounters weak source structure: the long essay mixes an `h1` with visually enlarged paragraphs rather than three consistently authored headings. A runtime-only navigator would disappear without JavaScript and would assign fragment identifiers late, weakening copied links. CJK collision-safe slugging is feasible and testable, but it adds a reusable system for a single document.

The candidate is disqualified in its stated dynamic-id form for this round unless the article's real section structure is first made semantic and stable in source. Generating links from presentationally styled paragraphs, changing existing article prose merely to meet a heading threshold, or allowing duplicate/unstable IDs would also disqualify delivery.

## Recommendation

Recommend **C1, Static Archive Baseline**, as the single Round 09 feature.

It is the best delivery investment because it converts the archive from JavaScript-dependent output into a resilient semantic document while reusing the existing manifest generator as the authority. It has stronger accessibility and progressive-enhancement value than every interactive alternative, creates a more substantive engineering proof than the low-risk copy/endcap candidates, and admits exact fail-closed and idempotency tests. The implementation should remain narrowly scoped to generator-owned archive markup plus runtime preservation on fetch failure; addressable filters and article continuation should remain separate future rounds.
