# Round 08 Evaluation Summary

## Consensus

Both fresh evaluators independently selected **C1: Accessible Mobile Back-to-Top Restoration**.

| Evaluator | C1 score | Second place | Lead |
| --- | ---: | ---: | ---: |
| Product | 8.30 | C4 at 7.60 | 0.70 |
| Delivery | 8.50 | C4 at 7.25 | 1.25 |

## Why It Won

- It fixes a measured failure across the 10,615px homepage and long articles.
- The control/threshold/handler already exist; mobile CSS alone suppresses the feature.
- It restores the canonical header/Start Here routes without adding another navigation model.
- Correct delivery includes meaningful accessibility work: real hash targets, 44px touch size, safe-area placement, visible focus, and reduced-motion-safe scrolling.
- It has a much smaller regression surface than shared article recommendation or URL-state work.

## Top Three

1. Accessible Mobile Back-to-Top Restoration.
2. Manifest-Driven Continue Reading.
3. Compact Mobile Section Compass.

## Selected Delivery Shape

- Reuse exactly one current control.
- Add valid `#top` targets to every page/template that renders it.
- Preserve native hash fallback and use JavaScript only for threshold/smooth enhancement.
- Restore mobile display at a 44px target with safe-area spacing and focus visibility.
- Make scroll behavior honor reduced motion.
- Do not add section links, scrollspy, sticky routes, continuation, contact copy, or archive state in this round.

## Deferred

- Continue Reading remains the strongest future content-lifecycle candidate when the archive grows.
- A section compass should only follow if returning to Top proves insufficient; it must not duplicate the header.
- Section handoffs and contact guidance remain lower-risk later copy/navigation work.
