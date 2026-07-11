# Round 08 Product Evaluation

Cost uses `10 = cheapest/easiest`. Weighted total is `Value × 0.40 + Technical × 0.25 + Cost × 0.20 + Long-Term × 0.15`.

| Rank | Candidate | Value | Technical | Cost | Long-term | Weighted |
| ---: | --- | ---: | ---: | ---: | ---: | ---: |
| 1 | C1 Accessible Mobile Back-to-Top Restoration | 9 | 6 | 10 | 8 | **8.30** |
| 2 | C4 Manifest-Driven Continue Reading | 8 | 8 | 6 | 8 | **7.60** |
| 3 | C3 Compact Mobile Section Compass | 8 | 7 | 6 | 8 | **7.35** |
| 4 | C2 Contextual Section Handoffs | 7 | 5 | 9 | 7 | **6.90** |
| 5 | C6 Intent-Aware Contact Handoff | 7 | 5 | 8 | 7 | **6.70** |
| 6 | C5 Addressable Topic Return Routes | 6 | 7 | 5 | 7 | **6.20** |

## Recommendation

Select **C1: Accessible Mobile Back-to-Top Restoration**.

It fixes a verified, high-frequency mobile failure on both the 10,615px homepage and long articles, restores access to the existing route system, and has the strongest cost-to-value ratio. Reusing an existing progressive control preserves the proof-first identity. Its limitation—return rather than direct cross-section switching—is acceptable because Top already exposes the canonical header and Start Here routes.

## Deferred Or Rejected

- **C4:** Strong durable reading continuity and technical evidence, but five posts limit present upside; shared-script/template/import/editor parity creates wider regression surface. Defer until archive growth or after mobile recovery.
- **C3:** Valuable orientation, but duplicates header/Start Here, permanently consumes narrow viewport space, and introduces collision/wrapping risk. Defer unless C1 proves insufficient.
- **C2:** Inexpensive and resilient, but repeated handoffs lengthen the page and route choices are editorially subjective.
- **C6:** Improves honesty and action clarity, but public-only contact constrains conversion and prompts risk making the archive recruitment-heavy.
- **C5:** Clean URL-state idea, but five posts/few tags do not justify history, encoding, and focus complexity.

## Scope Guardrails

- Reuse the single existing back-to-top element and handler; do not add a dock, compass, scrollspy, section links, or duplicate control.
- Mobile-visible only after the existing threshold; minimum 44×44px target, clear focus, safe-area inset, and no content/form/gallery overlap.
- Confirm every supported shell has a genuine `#top`; keep ordinary anchor and no-JavaScript behavior.
- Respect `prefers-reduced-motion`; add no dependencies or unrelated motion.
- Test homepage, articles, project cases, and guestbook/form contexts at narrow widths including 320px, plus desktop regression.
