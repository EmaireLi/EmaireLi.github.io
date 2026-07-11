# Round 07 Evaluation Summary

## Consensus

Both fresh evaluators independently selected **C1: Canonical Mobile Search Doorway**.

| Evaluator | C1 score | Second place | Lead |
| --- | ---: | ---: | ---: |
| Product | 8.95 | C2 at 8.15 | 0.80 |
| Delivery | 8.70 | C2 at 7.30 | 1.40 |

## Why It Won

- It fixes the strongest measured defect rather than adding speculative content: the homepage search input begins around 10,220px on a 390px-wide mobile layout.
- Search itself already works and is backed by the generated manifest, shared cache, highlighting, result count, and local error state.
- The homepage is the outlier. Article and case pages already put their search rail before the main content on mobile.
- One canonical DOM move plus responsive ordering improves reachability without a second input, second fetch path, modal, focus trap, service, or dependency.
- It preserves all proof, archive, editor, import, project, and guestbook behavior.

## Reconciled Delivery Choice

Use the **always-visible canonical-card approach**:

1. Move the single homepage search section immediately after the header in source order.
2. Keep its desktop grid coordinates unchanged.
3. On narrow screens, use the order header → search → main content → site overview → external accounts.
4. Keep the input directly visible; do not add a custom disclosure, drawer, or modal.
5. Add live status semantics, stable relationships, and a no-JavaScript route to static First Reads.

This resolves the disagreement inside brainstorming between an inline disclosure and a visible card. The visible card has the smaller state and accessibility surface, while still keeping the identity content inside the first mobile viewport.

## Top Three

1. Canonical Mobile Search Doorway.
2. Semantic Long-Page Review Navigator.
3. Article Continue-Reading Navigation.

## Deferred

- Long-page navigator: useful after search placement is corrected, but risks duplicating header and Start Here routes.
- Continue Reading: strong future content-lifecycle feature; requires exact Unicode filename and sparse-tag fallback tests across all post shells.
- Unified Evidence Finder: revisit when the local evidence corpus justifies a second typed index.
- Intent-Aware Contact: begin with static prompts if selected later; never overwrite an existing draft.
- Explainable Search: evaluate only after search reachability is fixed.

## Rejected For This Round

- Capability/aspiration snapshot: duplicates existing opening evidence.
- Account identity map: moves external platforms ahead of local proof.
- WebGL decoration and AI chatbot/RAG: poor fit, unnecessary performance/service/privacy cost.
- Collapsible proof: hides the evidence the site is designed to expose.
