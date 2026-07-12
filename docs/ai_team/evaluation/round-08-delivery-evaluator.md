# Round 08 Delivery Evaluation

Cost uses `10 = cheapest/easiest`. Weighted total is `Value × 0.40 + Technical × 0.25 + Cost × 0.20 + Long-Term × 0.15`.

| Rank | Candidate | Value | Technical | Cost | Long-term | Weighted total |
| ---: | --- | ---: | ---: | ---: | ---: | ---: |
| 1 | C1 Accessible Mobile Back-to-Top Restoration | 9 | 7 | 9 | 9 | **8.50** |
| 2 | C4 Manifest-Driven Continue Reading | 7 | 9 | 5 | 8 | **7.25** |
| 3 | C3 Compact Mobile Section Compass | 8 | 7 | 5 | 7 | **7.00** |
| 4 | C2 Contextual Section Handoffs | 7 | 5 | 9 | 7 | **6.90** |
| 5 | C5 Addressable Topic Return Routes | 6 | 7 | 5 | 7 | **6.20** |
| 6 | C6 Intent-Aware Contact Handoff | 6 | 4 | 8 | 6 | **5.90** |

## Recommendation

Select **C1: Accessible Mobile Back-to-Top Restoration**.

It closes a measured mobile failure with the smallest regression surface. The existing control is hidden below 767px, only 34×34px, and forces smooth scrolling without honoring reduced motion. The homepage has `body id="top"`, while posts, project cases, the post template, editor output, and XHS importer output do not, so their native hash fallback lacks a valid target.

## Implementation Guardrails

1. Preserve one existing control and `initBackToTop`; create no duplicate.
2. Give every shell rendering it a unique real `#top`, preferably on `<body>`.
3. Keep `href="#top"` functional without JavaScript; JavaScript only enhances scrolling.
4. Use `behavior: "auto"` for reduced motion and `"smooth"` otherwise.
5. Use at least a 44×44px mobile interactive box with safe-area-aware insets.
6. Preserve opacity/pointer blocking before the threshold when JavaScript is active.
7. Add strong `:focus-visible`; keep z-index narrowly sufficient.
8. Add no scrollspy, state, dependencies, persistence, or new destinations.
9. Advance CSS/script cache versions consistently where query strings exist.

## QA Guardrails

- Verify 320, 390, and 767px plus desktop; include short/tall heights and simulated safe area.
- Before 240px the enhanced control is non-interactive; after threshold it is operable.
- Activation reaches the true top on homepage, every post, and every project page.
- Disable JavaScript and confirm the native target path.
- Emulate reduced motion and prove no smooth scripted scroll occurs.
- Test keyboard Enter, visible focus, gallery/guestbook/filter/footer/account collisions, and focused form contexts.
- Check no overflow, console errors, or duplicate `#top`.
- Run all prescribed Node checks and confirm manifest output is unchanged by navigation markup.

## Deferred Or Rejected

- **C4:** Best technical demonstration, but manifest matching, Unicode paths, tag filtering, generator parity, and fallbacks are broad for five posts.
- **C3:** More complete switching, but duplicates opening routes, consumes viewport, and collides with search/browser chrome.
- **C2:** Safe, but adds page height/editorial maintenance while C1 solves the universal escape path.
- **C5:** Sound URL-state design but disproportionate encoding/history/focus complexity.
- **C6:** Useful privacy guidance, but it cannot remove the public-only limitation and has the weakest technical demonstration.
