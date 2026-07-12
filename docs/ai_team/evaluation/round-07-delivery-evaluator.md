# Round 07 Delivery Evaluation

Cost uses `10 = cheapest/easiest`. Weighted total is `Value × 0.40 + Technical × 0.25 + Cost × 0.20 + Long-Term × 0.15`.

| Rank | ID | Feature | Value | Technical | Cost | Long-Term | Weighted |
| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: |
| 1 | C1 | Canonical Mobile Search Doorway | 10 | 7 | 8 | 9 | **8.70** |
| 2 | C2 | Semantic Long-Page Review Navigator | 8 | 6 | 7 | 8 | **7.30** |
| 3 | C5 | Article Continue-Reading Navigation | 7 | 7 | 6 | 8 | **6.95** |
| 4 | C7 | Unified Evidence Finder | 7 | 9 | 3 | 7 | **6.70** |
| 5 | C3 | Intent-Aware Contact Bridge | 7 | 4 | 8 | 7 | **6.45** |
| 6 | C4 | Explainable Search And Recovery | 6 | 7 | 6 | 7 | **6.40** |
| 7 | C6 | Current Capability / Aspiration Snapshot | 6 | 3 | 9 | 6 | **5.85** |
| 8 | C8 | Purpose-Labeled Account Identity Map | 5 | 3 | 9 | 6 | **5.45** |

## Ranking Rationale

1. **C1 — 8.70:** Resolves a measured, severe reachability defect with a small extension of an already-working system. Moving one canonical element is low-cost, avoids another data path, and demonstrates source-order-aware responsive architecture and accessibility without overstating technical novelty.
2. **C2 — 7.30:** Ordinary anchors are durable and accessible, but eight destinations are difficult to fit into a useful mobile ribbon. A persistent treatment risks duplicating the header, consuming viewport space, and creating another navigation system to maintain.
3. **C5 — 6.95:** Meaningfully completes the reading loop and has good long-term value. It nevertheless affects every post, relies on exact Unicode filename matching, and requires generated-template compatibility and robust sparse-tag fallbacks.
4. **C7 — 6.70:** Strongest technical demonstration, but disproportionate for the current corpus of five posts plus a small set of evidence pages. A second index and extraction/curation rules create real staleness and maintenance risk before basic search reachability is fixed.
5. **C3 — 6.45:** Useful conversion improvement at low cost, especially if prompts remain static. Its engineering demonstration is modest, interactive prefill touches fragile guestbook states, and it adds height to the already-long mobile page.
6. **C4 — 6.40:** A pure field-aware matcher would be honest, testable engineering. With only five posts, however, relevance labels offer limited immediate value, and polishing an input located after 10,000px does not solve the primary failure.
7. **C6 — 5.85:** Cheap and honest, but substantially repeats the hero, Hiring Snapshot, and Proof Map. It adds copy maintenance while offering little new navigation or interaction value.
8. **C8 — 5.45:** Very inexpensive, but promotes external platforms ahead of stronger local evidence and adds mobile density. Purpose labels are useful polish, not the highest-value site problem.

## Recommendation

Select **C1, Canonical Mobile Search Doorway**, using the always-visible canonical-card variant rather than a drawer or custom disclosure.

Move the existing homepage search section immediately after the header in real DOM order. Desktop CSS can retain its explicit sidebar grid coordinates, while mobile order becomes header → search → main content → overview → account links. Add an ordinary header anchor targeting the existing search input. This keeps the no-JavaScript navigation path meaningful and avoids modal, focus-trap, Escape, resize, and duplicated-ID risks.

## Implementation Guardrails

- Keep exactly one homepage `[data-site-search]`, one `#site-search-input`, one result container, and one `initSiteSearch()` controller.
- Do not clone the card, create a second manifest fetch, or duplicate search rendering.
- Preserve the current desktop grid position at wide widths; change source order and responsive layout only.
- Make visual order and keyboard/source order identical below the desktop breakpoint.
- Keep search visible rather than putting it in a dialog or animated disclosure.
- Use a normal `href="#site-search-input"` route so navigation still lands at the real control without JavaScript.
- Do not autofocus on page load or introduce a focus trap. Anchor activation should focus or visibly target the input; Shift+Tab should return naturally toward the header.
- Give the result/status relationship stable IDs and add a polite, atomic live status. Avoid announcing every result body.
- Preserve current loading, empty-query, no-match, eight-result limit, escaping, and fetch-failure behavior.
- Include a no-JavaScript/archive fallback near the search surface because manifest search itself requires JavaScript.
- Keep the unloaded mobile card compact enough that the identity remains visible in the opening viewport.
- Add no dependency, observer, service, analytics call, or extra network asset.
- Do not alter article-page search placement, editor behavior, archive generation, or guestbook code.

## QA Guardrails

- Run `node --check script.js`, `node --check scripts/import-xhs-notes.js`, and `node scripts/generate-posts-manifest.js`.
- Confirm manifest regeneration produces no unrelated content change.
- Assert one search root, input ID, status, and result list on the homepage.
- Inspect at 1440×900, around the 992/991px breakpoint, 390×844, and 320px width.
- At 390×844, require the search input to appear before the article and within the first viewport.
- Confirm desktop sidebar geometry is unchanged and no viewport has horizontal overflow.
- Verify the sixth header route wraps deliberately, retains visible focus, and has an adequate touch target.
- Keyboard-test the header Search route, input, result links, reverse tab order, empty query, and no-match state.
- Test representative title, tag, and body queries such as `GPT`, `ACGN`, and `西湖`.
- Simulate a failed `posts.json` request; the page, archive route, and remaining content must stay usable.
- Disable JavaScript and verify the Search anchor still reaches the visible surface and the archive fallback works.
- Check live-status behavior, reduced motion, console errors, and that the manifest is fetched only once.

## Deferred Or Rejected

- **C2:** Defer until C1 is measured in use. If still needed, start with a non-sticky, HTML-only anchor nav and omit active-section tracking.
- **C5:** Defer as a strong future content-lifecycle round. Require Unicode filename tests, chronological edge cases, sparse-tag fallback, and generated-template documentation.
- **C7:** Defer until the evidence corpus is large enough to justify a maintained typed index. Prefer explicit metadata over brittle HTML scraping.
- **C3:** Defer until discovery reachability is fixed. If selected later, begin with static prompts and never overwrite an in-progress guestbook draft.
- **C4:** Defer until C1 makes search reachable. Keep it a separate round so retrieval changes can be tested independently.
- **C6:** Reject for this round because it duplicates current opening evidence and would become another stale copy surface.
- **C8:** Reject for this round because it weakens the local proof-first hierarchy and does not address the long-page usability defect.
