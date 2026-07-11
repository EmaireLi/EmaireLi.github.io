# Feature Decision — Round 07

## Inputs

- Project understanding: `round-07-project_understanding.md`
- Candidate set: `round-07-candidates.md`
- Raw role research: `brainstorm/round-07-brand-product.md` and `brainstorm/round-07-frontend-graphics-ai.md`
- Independent evaluations: `evaluation/round-07-product-evaluator.md` and `evaluation/round-07-delivery-evaluator.md`
- Evaluation summary: `evaluation/round-07-summary.md`

## Top Three Features

### 1. Canonical Mobile Search Doorway

**Reason:** Both evaluators ranked it first. The current search works, but on the homepage its mobile placement around 10,220px makes it practically unavailable. Moving the existing canonical card fixes a measured visitor problem with a narrow, durable change.

**Expected impact:** Mobile visitors can search writing immediately after the header; the site better fulfills its promise of a searchable local archive. Desktop appearance and all search semantics remain intact.

**Implementation outline:** Move the one search section before `.main-inner` in real DOM order, preserve desktop grid placement, update narrow-screen flex order, add stable accessible relationships/live status, add a no-JavaScript First Reads fallback, and document the invariant.

**Key risk:** The card can compete with the identity opening if it becomes too tall. Keep the unloaded mobile surface compact and do not add suggestions or expanded search features.

### 2. Semantic Long-Page Review Navigator

**Reason:** It addresses broader movement across a 10,555px mobile page and ranked second in both evaluations.

**Expected impact:** Faster jumps among proof, projects, reading, archive, and contact.

**Implementation outline:** A later round may add one ordinary-anchor navigation surface, starting non-sticky and without scrollspy.

**Key risk:** It can duplicate the header and Start Here, crowd the viewport, or create a second navigation system.

### 3. Article Continue-Reading Navigation

**Reason:** It completes the archive journey and has strong long-term value as content grows.

**Expected impact:** Readers can move between real related/adjacent posts without returning to the homepage.

**Implementation outline:** A later round may reuse the manifest for chronological neighbors and conservative same-tag links with static fallbacks.

**Key risk:** Unicode filenames, sparse tags, generated templates, and every existing post require careful compatibility testing.

## Decision

Implement **Canonical Mobile Search Doorway** using the always-visible canonical-card approach.

Do not implement a disclosure, modal, command palette, topic seeds, relevance labels, wider evidence index, contact changes, or persistent navigation in this round.
