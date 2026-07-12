# Round 4 Brainstorm - Agent 2: Senior Frontend Engineer

Date: 2026-07-09

## Scope

Personal website visual design, homepage structure, interaction, and content presentation only.

## Approach Options

1. **Evidence-first homepage:** reviewer dashboard with role signal, proof routes, receipts, and compact case-study entry points.
2. **Archive-first personal site:** stronger publishing identity but weaker hiring signal.
3. **Polished interaction layer:** improves navigation and mobile scanning with lower strategic lift.

## Recommendation

Prioritize the evidence-first homepage with small interaction improvements.

## Feature Ideas

### 1. Reviewer Mode Switcher

- **User value:** Different visitors see the most relevant path: recruiter, technical reviewer, or reader.
- **Why it fits:** Proof Map already defines routes, but they are passive text.
- **Technical approach:** Add buttons with `data-review-mode`; JavaScript highlights relevant sections while keeping all content in the DOM.
- **Cost:** Medium.
- **Display effect:** Interactive, intentional homepage.
- **Risk:** Hiding content would hurt discoverability, so highlight rather than filter.

### 2. Project Evidence Receipts

- **User value:** Claims become easier to trust.
- **Why it fits:** Project cards already list role, stack, and proof bullets.
- **Technical approach:** Add compact rows: `Claim`, `Evidence`, `Where to inspect`.
- **Cost:** Low.
- **Display effect:** Project cards feel more credible.
- **Risk:** Receipts must stay factual.

### 3. Homepage Capability Strip

- **User value:** First-time visitors get a fast read before the long Proof Map.
- **Why it fits:** Current hero is quiet and blog-like while later sections have stronger proof.
- **Technical approach:** Add a responsive list of capability cells: frontend systems, full-stack apps, AI tooling, content tooling.
- **Cost:** Low.
- **Display effect:** Stronger above-the-fold signal.
- **Risk:** Generic labels need concrete anchors.

### 4. Proof Map Progressive Disclosure

- **User value:** Reduces density while keeping detail available.
- **Why it fits:** Proof Map is useful but text-heavy.
- **Technical approach:** Use native `<details>`/`<summary>` or small JS toggles for secondary notes.
- **Cost:** Low to medium.
- **Display effect:** Cleaner rhythm, especially on mobile.
- **Risk:** Over-collapsing can hide proof.

### 5. Visual Archive Preview Rail

- **User value:** Makes posts and XHS imports feel alive.
- **Why it fits:** Local assets already exist.
- **Technical approach:** Render a scroll-snap image rail with lazy-loaded local images.
- **Cost:** Medium.
- **Display effect:** Visual variety and personal warmth.
- **Risk:** Requires graceful fallback for posts without images.

### 6. Search Result Quick Preview

- **User value:** Visitors can judge search results before opening them.
- **Why it fits:** Search already loads `posts/posts.json`.
- **Technical approach:** Enhance result rows with date, tags, excerpt, and matched-field label.
- **Cost:** Low to medium.
- **Display effect:** Sidebar search feels more complete.
- **Risk:** Narrow column can become crowded.

### 7. Mobile Section Jump Bar

- **User value:** Phone users can jump across the long homepage.
- **Why it fits:** Desktop has persistent navigation; mobile needs a compact equivalent.
- **Technical approach:** Mobile-only sticky horizontal anchor nav.
- **Cost:** Low.
- **Display effect:** More app-like mobile scanning.
- **Risk:** Sticky UI can consume vertical space.

### 8. Guestbook Presence Panel

- **User value:** Contact feels warmer and more intentional.
- **Why it fits:** Guestbook exists but is mostly functional.
- **Technical approach:** Add a static intro row plus optional loaded-count/status behavior.
- **Cost:** Low to medium.
- **Display effect:** Better contact close.
- **Risk:** Empty/failure states must look deliberate.

### 9. Print-Friendly Homepage Snapshot

- **User value:** Recruiters can print/save a clean one-page summary.
- **Why it fits:** Homepage already has the right content.
- **Technical approach:** Add `@media print` rules.
- **Cost:** Low.
- **Display effect:** Professional utility.
- **Risk:** Needs print QA.

## Highest-Leverage Picks

Reviewer Mode Switcher, Project Evidence Receipts, Proof Map Progressive Disclosure, and Mobile Section Jump Bar.

