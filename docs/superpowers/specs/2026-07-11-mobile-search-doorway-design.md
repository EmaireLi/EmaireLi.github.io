# Mobile Search Doorway Design

## Context

The homepage search works, but the custom homepage grid puts it after the complete article flow on narrow screens. At 390×844 the input begins around 10,220px in a 10,555px document. Article and project pages do not share this defect because their left column precedes their main content in source order.

The user explicitly requested a continuous autonomous loop with no approval questions. The usual interactive design-review gates are therefore represented by the documented alternatives, two independent evaluator approvals, and this self-reviewed specification.

## Goal

Make the existing homepage search directly reachable on mobile while preserving one canonical search surface, the current desktop rail, the proof-first opening, and all existing search semantics.

## Non-Goals

- Do not change result matching, ranking, excerpts, or the eight-result cap.
- Do not expand search to projects, case studies, or AI-team documents.
- Do not add topic suggestions, a command palette, modal, drawer, global shortcut, or second search input.
- Do not change article/case search placement, the editor, archive renderer, import scripts, guestbook, or external account links.

## Considered Approaches

### Approach A — Always-Visible Canonical Card (Selected)

Move the one homepage search section immediately after the header in source order. Preserve its explicit desktop grid coordinates, but place it between the header and main article on narrow screens.

**Advantages**

- Removes the measured mobile reachability defect with no new state machine.
- Source, visual, and keyboard order agree on mobile.
- Uses the current input, fetch cache, renderer, and failure behavior unchanged.
- Has no focus trap, Escape contract, resize state, duplicated ID, or animation risk.
- Remains useful when reached through normal keyboard traversal.

**Trade-off**

- Adds the compact search card before the identity article on mobile. The card must stay visually quiet enough that the brand message remains in the first viewport.

### Approach B — Inline Native Disclosure

Move the canonical search early but wrap it in a native disclosure that is collapsed on mobile and expanded on desktop.

**Advantages**

- Uses less initial vertical space.
- Keeps search discoverable through a visible summary.

**Trade-offs**

- Requires responsive open-state management or accepts inconsistent defaults.
- Adds focus/Escape/resize/hash QA and potential expanded-content flash.
- Makes a simple reachability fix depend on interaction state.

### Approach C — Header Launcher With Modal Or Drawer

Keep search in its current source position and open it through an overlay.

**Advantages**

- Preserves the exact mobile page order and creates an app-like search moment.

**Trade-offs**

- Requires focus containment, focus return, close control, Escape handling, body-scroll behavior, mobile-keyboard QA, and a no-JavaScript fallback.
- Encourages either moving the DOM at runtime or cloning the search UI.
- Adds disproportionate complexity for a five-post local archive.

## Selected User Experience

On desktop, the search card remains in the same left-rail grid cell and should look unchanged.

At widths up to 991px, the sequence becomes:

1. Site header and existing navigation.
2. Canonical search card.
3. Identity article and all current homepage sections.
4. Site overview.
5. External account links.

The input remains visible without a launcher. It is a single tap away after the header, before the article, and within the opening 390×844 viewport. Search results expand below the input in the same card. The identity article remains visible in the opening viewport beneath the compact unloaded card.

## Structure And Components

### Canonical Search Section

- Keep one `[data-site-search]` root and one `#site-search-input`.
- Add a stable section target ID.
- Add stable IDs for status and results.
- Connect the input to status/results with `aria-describedby` and `aria-controls`.
- Mark the status as polite and atomic so loading, result counts, no-match, and failure messages are announced without reading every result.
- Add a `<noscript>` route to the static First Reads section, because the dynamic archive and search both require JavaScript.

### Responsive Layout

- Move the search section in `index.html`; do not use CSS order alone to pretend it moved.
- Keep the existing desktop grid row/column assignment.
- Update mobile flex ordering so header → search → main content → site overview → accounts matches source order.
- Keep the card compact and consistent with the current glass visual system.

### Search Data Flow

No data-flow changes:

1. `initSiteSearch()` finds the same canonical root.
2. `fetchPosts()` reads the same `posts/posts.json` through the existing cache.
3. Input events call the same result renderer.
4. The same status element reports ready, count, empty, no-match, or failure state.

## Accessibility

- Mobile source order and visual order must agree.
- The input remains a native search control with a visible label.
- No autofocus occurs on load.
- No modal, focus trap, or global keyboard shortcut is introduced.
- Existing focus styles remain visible.
- Status updates use `role="status"`, `aria-live="polite"`, and `aria-atomic="true"`.
- The static First Reads fallback remains usable without JavaScript.
- Motion behavior is unchanged, so reduced-motion support remains intact.

## Error And Fallback Behavior

- Manifest load failure keeps the current visible error text; the rest of the homepage remains available.
- Empty input retains the current ready/help state.
- No result retains the current no-match state.
- With JavaScript disabled, the input is visibly present but the `<noscript>` copy directs the visitor to static local article links in First Reads.

## Maintenance

README guidance will record that the homepage search must remain a single canonical element placed before `.main-inner` in source order, while desktop grid coordinates preserve the rail. Future search enhancements must reuse the existing renderer/cache and must not create separate desktop/mobile search instances.

## Verification

- Repository-prescribed Node checks and manifest regeneration.
- `git diff --check`.
- Deterministic HTML assertions for one search root/input/status/results and source order.
- Desktop inspection at 1440×900.
- Breakpoint inspection at 992px and 991px.
- Mobile inspection at 390×844 and 320px.
- Search interaction tests for a title query, tag/content query, no match, clear, result link, and keyboard traversal.
- JavaScript-disabled inspection of the First Reads fallback.
- Console error and horizontal-overflow checks.

## Self-Review And Delegated Approval

- Placeholder scan: no TBD, TODO, or unresolved copy remains.
- Consistency: the selected architecture, acceptance criteria, and file plan all use one always-visible canonical search surface.
- Scope: one responsive reachability feature; search relevance and corpus expansion remain separate future rounds.
- Ambiguity: “early” means immediately after the homepage header in source order and before `.main-inner` at widths up to 991px.
- Approval: both fresh evaluators selected C1; the delivery evaluator explicitly selected the always-visible card. Under the user's no-interruption instruction, this recorded consensus is the delegated approval to proceed.
