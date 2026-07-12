# Feature Decision — Round 08

## Inputs

- Project understanding: `round-08-project_understanding.md`
- Candidate set: `round-08-candidates.md`
- Raw role research: `brainstorm/round-08-brand-product.md` and `brainstorm/round-08-frontend-graphics-ai.md`
- Independent evaluations: `evaluation/round-08-product-evaluator.md` and `evaluation/round-08-delivery-evaluator.md`
- Evaluation summary: `evaluation/round-08-summary.md`

## Top Three Features

### 1. Accessible Mobile Back-to-Top Restoration

**Reason:** Both evaluators ranked it first. The site already implements threshold visibility and scrolling, but mobile CSS removes the only arbitrary-position escape route from a 10,615px page. Delivery also found invalid native targets, undersized touch geometry, and reduced-motion mismatch.

**Expected impact:** Mobile visitors can return to the canonical header/Start Here from the homepage, long posts, and project cases. The behavior remains one progressive anchor rather than a second navigation system.

**Implementation outline:** Add real `body#top` targets to every current/generator shell, restore mobile display at 44px with safe-area offsets/focus styling, make motion preference-aware, suspend during mobile text entry, and advance cache versions.

**Key risk:** A fixed control can cover form/gallery/content. Mitigate with safe-area placement, focus suspension, and multi-shell visual QA.

### 2. Manifest-Driven Continue Reading

**Reason:** Strongest future content-lifecycle and technical-demonstration candidate.

**Expected impact:** Finished readers can continue through chronological or exact-tag routes.

**Implementation outline:** Later reuse the manifest/cache with transparent reason labels and static archive fallback.

**Key risk:** Shared-script, Unicode path, tag meaning, generator parity, and sparse-corpus regression surface are broad for five posts.

### 3. Compact Mobile Section Compass

**Reason:** Addresses direct route switching more fully than return-to-top.

**Expected impact:** Keeps a small set of deep destinations available.

**Implementation outline:** Only reconsider if the restored Top path proves insufficient; use ordinary anchors and no scrollspy.

**Key risk:** Duplicates existing routes, consumes viewport height, and can collide/wrap.

## Decision

Implement **Accessible Mobile Back-to-Top Restoration** only.

Do not add section routes, scrollspy, continuation, contact copy, archive state, search changes, or external services in this round.
