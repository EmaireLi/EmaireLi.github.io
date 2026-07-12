# Round 07 Product Evaluation

Cost uses `10 = cheapest/easiest`. Weighted total is `Value × 0.40 + Technical × 0.25 + Cost × 0.20 + Long-Term × 0.15`.

| Rank | ID | Feature | Value | Technical | Cost | Long-term | Weighted total |
| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: |
| 1 | C1 | Canonical Mobile Search Doorway | 10 | 8 | 8 | 9 | **8.95** |
| 2 | C2 | Semantic Long-Page Review Navigator | 9 | 7 | 8 | 8 | **8.15** |
| 3 | C5 | Article Continue-Reading Navigation | 8 | 7 | 6 | 9 | **7.50** |
| 4 | C7 | Unified Evidence Finder | 8 | 9 | 3 | 9 | **7.40** |
| 5 | C3 | Intent-Aware Contact Bridge | 7 | 5 | 9 | 7 | **6.90** |
| 6 | C4 | Explainable Search And Recovery | 6 | 8 | 6 | 8 | **6.80** |
| 7 | C6 | Current Capability / Aspiration Snapshot | 7 | 4 | 10 | 6 | **6.70** |
| 8 | C8 | Purpose-Labeled Account Identity Map | 6 | 3 | 9 | 6 | **5.85** |

## Ranked Assessment

1. **C1 — recommended.** It fixes the clearest observed visitor failure: homepage search exists but starts roughly 10,220px into the mobile flow. It improves reader utility immediately, makes the publishing/search system more credible, and demonstrates responsive information architecture without introducing a second content system.
2. **C2 — defer.** It addresses the broader long-page problem, but a persistent navigator risks duplicating both the header and Start Here routes. C1 is more focused, tied to a measured defect, and less likely to consume mobile viewport space.
3. **C5 — defer to a content-discovery round.** It offers strong long-term value as the archive grows and completes the reading loop. However, it affects every post, generated/imported shells, and fallback behavior while leaving the homepage’s primary reachability problem untouched.
4. **C7 — defer until current search is reachable and observed to need broader scope.** It has excellent recruiting and technical-showcase potential, but the current corpus is small and deterministic extraction introduces significant maintenance. Building a larger index before fixing access to the existing one would reverse the correct dependency order.
5. **C3 — defer.** Clear contact intents could improve conversion, but Contact remains near the bottom of the long mobile page. Static prompts are inexpensive yet technically modest; interactive prefill creates unnecessary guestbook regression risk.
6. **C4 — reject for this round.** Explainability is useful polish, but it optimizes result quality before mobile visitors can conveniently reach the search control.
7. **C6 — reject unless a later content audit finds real ambiguity.** It is cheap and could improve honesty, but the hero, identity panel, hiring snapshot, and Proof Map already repeat this positioning. Another summary risks staleness and résumé-style duplication.
8. **C8 — reject.** Purpose labels would humanize the profile, but emphasizing six external destinations weakens the local proof-first hierarchy and adds mobile density with little engineering demonstration.

## Recommended Feature

Select **C1: Canonical Mobile Search Doorway**.

It has the strongest combination of measurable visitor value, recruiting usefulness, low regression surface, and durable benefit. It also reinforces a claim already central to the site—that the archive is locally searchable—by making that capability practically available on the most constrained layout.

## Scope Guardrails

- Keep exactly one canonical search input, result renderer, cache, and live-status region; do not clone separate desktop and mobile search interfaces.
- Preserve post-only search semantics this round. Do not absorb C4 or C7.
- Prefer ordinary anchor navigation and an early inline mobile position over a modal or custom overlay.
- Keep the identity hero dominant in the first viewport; place the canonical search early enough to be useful without replacing the opening brand message.
- Preserve the current desktop sidebar placement visually and prevent header wrapping at narrow widths.
- Ensure DOM order, visual order, and keyboard order agree on mobile.
- Provide a stable target, visible focus, suitable scroll margin, and a working no-JavaScript path.
- Add no dependencies and make no contact, account-map, long-page navigator, or search-index changes in the same round.
- Acceptance includes 390px and 1440px layouts, no horizontal overflow, one-tap mobile reachability, keyboard operation, and unchanged search results.
