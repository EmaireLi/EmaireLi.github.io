# Round 09 Brainstorm — Frontend, Graphics, Local AI, and Delivery

## Repository evidence

- The site is dependency-free HTML/CSS/JavaScript. `posts/posts.json` is already the shared local data source for search and the homepage archive.
- The manifest contains only five posts. Its useful relationship signals are date and exact tags; `小红书` is a source label, while `生活` occurs on four posts and is too broad to imply close relevance.
- Article pages end with a global footer link to `../index.html#blog`. There is no article-local next step, but the archive remains a valid static fallback.
- The homepage archive starts as an empty `<ul id="blog-auto-list">`; all entries and tag controls are injected after fetching the manifest. If JavaScript or the fetch fails, First Reads still exposes selected posts, but the complete archive disappears.
- Archive tag buttons change only in-memory state. A filtered view cannot be bookmarked, shared, restored on reload, or linked from an article.
- `fetchPosts()` already provides a no-store, path-keyed cache. Archive rendering, search, editor-generated post HTML, and XHS-imported shells all share `script.js`, so changes there have a broad regression surface.
- Current styling already has a coherent glass/cyan language, semantic cards, focus treatment, reduced-motion rules, and responsive breakpoints. A canvas/WebGL/WebGPU layer would add delivery cost without resolving a current visitor problem.

## Candidate B1 — Static Archive Baseline, JavaScript-Enhanced Filters

**Visitor value.** Every published post remains discoverable when JavaScript is disabled, the manifest request fails, or enhancement initializes late. With JavaScript available, the same timeline receives the current tag-filter behavior.

**Why it fits.** The homepage claims to be a durable personal archive, yet its canonical archive is currently an empty shell before runtime rendering. This is the clearest progressive-enhancement gap in the repository and affects the entire five-post corpus, not only readers who finish an article.

**Implementation outline.** Extend the existing manifest-generation workflow to replace a tightly marked block inside `index.html` with semantic year groups and all post links. Keep dates, excerpts, and tags generated from the same manifest schema. Change archive initialization to enhance or deterministically re-render that baseline after a successful fetch; on failure, preserve the static entries and report that filtering is unavailable instead of clearing useful content. Add a `<noscript>` note only if it explains that filters require JavaScript. Document the generated block and never hand-edit inside its markers.

**Graphics/craft opportunity.** Preserve the current timeline rather than inventing a second look. A restrained “static archive / filters available” status can use existing mono metadata styling; no new illustration or graphics runtime is warranted.

**Estimated cost.** M. The visible CSS can remain nearly unchanged, but generator ownership, marker replacement, escaping, idempotency, and failure behavior need careful tests.

**Risks.** A script that rewrites `index.html` can create noisy diffs or corrupt hand-authored content if markers are loose. Duplicate baseline/runtime entries are possible. Mitigate with exact markers, an idempotency check, HTML escaping, and a test that every manifest file appears exactly once in the generated block.

**Testability.** Run manifest generation twice and require a clean second diff; compare generated filenames/order/count to `posts.json`; verify all links resolve; test normal JS, disabled JS, and forced fetch failure; check tag filtering at 320, 390, 767, 768, and desktop widths.

## Candidate B2 — Addressable Archive Topic Views

**Visitor value.** A visitor can bookmark, share, reload, and use browser history on an exact archive topic such as `求职` or `ACGN`, instead of losing the selected filter state.

**Why it fits.** Tag filtering already works and uses normalized exact tags, so the feature exposes existing state rather than adding a new information architecture. It also creates honest destinations that article tags or First Reads could link to in later rounds.

**Implementation outline.** Read one documented query parameter such as `?tag=求职#blog` on initialization, validate it against manifest-derived tags, and default invalid values to `全部`. On filter activation, update the URL with `history.pushState`; respond to `popstate` by restoring the filter and archive focus without forcing scroll. Keep buttons as buttons and retain `aria-pressed`. Optionally render tags in archive entries as links only if that is part of this same feature and keyboard/focus behavior remains clear.

**Graphics/craft opportunity.** The existing active-pill styling is enough. A small visible result count could improve state clarity, but should not become a decorative dashboard.

**Estimated cost.** S–M.

**Risks.** Query encoding, Unicode tags, invalid/stale values, and back/forward behavior can be mishandled. A hash-only design would collide with the existing `#blog` destination, so a query parameter plus the stable section hash is clearer. Without Candidate B1, a no-JavaScript topic URL can only fall back to First Reads/the empty archive shell.

**Testability.** Deterministic cases for every exact tag, spaces/CJK encoding, invalid tags, `全部`, reload, back/forward, and preservation of unrelated query parameters; keyboard activation and screen-reader state remain testable from DOM attributes.

## Candidate B3 — Transparent Article-End Continuation

**Visitor value.** A reader who reaches an article ending can continue to a newer/older local post without making a long round trip through the homepage.

**Challenge to the carried-forward hypothesis.** The dead end is real, but the corpus is too small for a credible “related posts” or personalization claim. Four of five posts carry `生活`, three are sourced from `小红书`, and exact tags do not establish semantic closeness. Chronological adjacency is defensible; topic relevance is usually not. The current footer archive route already prevents a complete navigation trap, so this is an improvement rather than a repair.

**Implementation outline.** On article shells only, decode the current pathname and match it exactly to `post.file`. Insert a semantic `nav` after `.article-content` with at most one newer and one older title/date from manifest order, plus the existing archive route. Label chronology explicitly; do not say “recommended for you.” If a meaningful exact tag is ever used, filter out source tags and broad `生活`, show the matching tag as the reason, and never replace chronological fallbacks. On fetch failure, missing match, or JavaScript disabled, the static footer remains unchanged. Reuse `fetchPosts()` and update both generators only if a static mount point is required.

**Graphics/craft opportunity.** A compact two-direction endcap can reuse the site’s hairlines, mono dates, and card surface. Avoid carousel controls, thumbnails, animated graphs, or false reading-progress visuals.

**Estimated cost.** M.

**Risks.** Unicode filename matching, reversed older/newer labels, self-links, first/last-post edge cases, and duplicated archive actions. Injecting from the shared script also touches homepage/editor/admin execution paths. Sparse content means the component may look disproportionately prominent.

**Testability.** A pure selection helper can be tested against all five manifest positions: no self-link, existing targets, correct chronological order, and correct first/last collapse. Browser QA should cover one longform post, one XHS image post, fetch failure, 320px wrapping, keyboard order, and no-JavaScript fallback.

## Candidate B4 — Longform Article Contents Navigator

**Visitor value.** The very long 京吹 essay becomes scannable and lets readers jump among its authored sections; short XHS notes remain uncluttered.

**Why it fits.** The repository has one exceptionally long article with multiple internal headings and several short notes with none. A thresholded, DOM-derived contents block is more honest than adding the same continuation UI everywhere, and it demonstrates document-structure craft using local content only.

**Implementation outline.** On `.article-content`, collect authored headings only when there are at least three. Assign stable, collision-safe ids without changing existing ids, render a semantic `nav aria-label="文章目录"` before the content, and use normal hash links. Prefer a static expanded list on desktop and an accessible `details/summary` on small screens. Add `scroll-margin-top`; do not add scrollspy or claim current-section accuracy. Fix heading-level semantics in the longform source only if required by the feature and keep generated posts untouched.

**Graphics/craft opportunity.** Use a quiet editorial index with numbered hairlines; it can strengthen typographic craft without bitmap assets or GPU work.

**Estimated cost.** M.

**Risks.** Only one current post clearly benefits, so portfolio-wide impact is limited. Slug generation for CJK and repeated headings must be deterministic. Dynamically created ids disappear without JavaScript unless generated into the article at authoring time, weakening progressive enhancement.

**Testability.** Unit-like cases for CJK, duplicate headings, pre-existing ids, and the three-heading threshold; browser checks for hash focus/scroll, keyboard use, 320px disclosure layout, reduced motion, and absence on short posts.

## Explicitly rejected for this round

- **WebGL/WebGPU content graph or 3D pipeline:** the five-node corpus does not justify a GPU surface, parallel accessible controls, context-loss handling, or battery/main-thread cost. A semantic list communicates the relationships better.
- **Embedding similarity, RAG, or portfolio chatbot:** there is no corpus scale, service boundary, evaluation set, privacy story, or maintenance budget that would make these more credible than exact local data. They would weaken rather than strengthen engineering claims.
- **Animated reading-progress minimap:** it risks false precision, fixed-UI collisions, motion/accessibility work, and duplication of the restored Back to Top path.

## Comparative recommendation

1. **B1 Static Archive Baseline** has the strongest progressive-enhancement and engineering-credibility case. It makes the site’s core archival promise true under failure and can be verified deterministically, though its generator mutation cost is higher than its visual size suggests.
2. **B2 Addressable Archive Topics** is the lowest-cost complete product feature and improves sharing/history semantics, but it does not repair the current no-JavaScript archive gap.
3. **B3 Transparent Article-End Continuation** remains viable, but should be selected for reader-flow value only—not as AI, semantic recommendation, or personalization. With five posts, chronology is the only consistently truthful rule.
4. **B4 Longform Contents Navigator** demonstrates strong frontend craft, but currently benefits one article and therefore has narrower product impact.

If delivery evidence shows that safely generating a marked archive block is too invasive for one round, B2 is the better fallback than automatically promoting Continue Reading. Do not bundle B1 and B2: each is independently testable and Round 09 requires one feature.
