# Mobile Back-to-Top Restoration Design

## Context

The homepage is about 10,615px tall at 390×844, several articles are long, and the mobile header is not persistent. The repository already renders one `.back-to-top` anchor on the homepage, all five posts, the post template, and three project cases. `initBackToTop()` toggles it after 240px, but the narrow-screen CSS hides it completely. The control is also 34×34px, several shells lack a real `#top`, and the scripted click always forces smooth motion.

The user delegated design approval to the continuous AI Team loop and requested no questions. This specification records the alternatives, evaluator consensus, and self-review that serve as the approval gate.

## Goal

Restore a reliable, touch-accessible, reduced-motion-safe return path on mobile across every page that already renders the control, while preserving one progressive anchor and the current site identity.

## Non-Goals

- Do not add a sticky section compass, scrollspy, progress indicator, bottom dock, or new navigation destinations.
- Do not add article continuation, contact prompts, archive URL state, search changes, or analytics.
- Do not add the control to editor/admin pages that do not currently render it.
- Do not change the 240px visibility threshold.

## Considered Approaches

### Approach A — Restore The Existing Progressive Control (Selected)

Re-enable the one current control on mobile, add real top targets, enlarge the touch target, respect safe areas/reduced motion, and suspend it while text-entry controls are focused on narrow screens.

**Advantages**

- Solves the universal escape-path problem on homepage, posts, and cases.
- Reuses one component/handler with the smallest interface and regression surface.
- Returns visitors to the established header and Start Here rather than inventing a second route system.
- Supports a native hash fallback when JavaScript is unavailable.

**Trade-off**

- It returns to Top rather than switching directly between deep sections.

### Approach B — Contextual Section Handoffs

Add ordinary links after Proof, Projects, First Reads, and Archive.

**Advantages**

- Static, contextual, and non-persistent.

**Trade-offs**

- Adds page height and editorial maintenance.
- Does not help at arbitrary scroll positions or on article/project pages.

### Approach C — Sticky Mobile Section Compass

Keep four high-value anchors visible while scrolling.

**Advantages**

- Supports direct cross-section switching.

**Trade-offs**

- Duplicates header/Start Here, consumes viewport height, can wrap at 320px, and may collide with expanded search, anchor headings, browser chrome, or forms.

## Selected Experience

- With JavaScript active, the control is non-interactive at or above the top threshold and becomes visible after scrolling beyond 240px.
- On mobile it has a 44×44px hit target and sits 12px beyond the safe-area inset from the bottom/right.
- Activating it returns to the true `body#top`.
- Normal motion uses smooth scrolling; reduced-motion preference uses immediate/auto scrolling.
- When a text input, textarea, select, or editable surface is focused at mobile width, the fixed control suspends so it does not compete with the on-screen keyboard or cover a field/action.
- With JavaScript unavailable, the anchor remains visible and uses native `href="#top"` navigation.

## Progressive-Enhancement Contract

### Markup

- Every page/template that renders `.back-to-top` gives `<body>` the unique `id="top"`.
- The anchor keeps `href="#top"` and its accessible label.
- Markup includes `is-visible` as the no-JavaScript baseline. `initBackToTop()` immediately synchronizes it after JavaScript loads, removing visibility before the threshold.

### JavaScript

- Reuse `initBackToTop()` and one control.
- The initial `sync()` runs immediately.
- Click behavior reads `prefers-reduced-motion` at activation time and chooses `auto` or `smooth`.
- Focus-in/out synchronization adds/removes a suspension class only for text-entry focus at widths up to 767px.
- No global shortcut, history state, persistence, observer, or dependency is added.

### CSS

- Base visibility and threshold classes remain the source of truth.
- Mobile no longer sets `display: none`; it uses a 44px box and safe-area-aware right/bottom offsets.
- Add a visible focus ring.
- Suspended state uses the same opacity/pointer/transform semantics as the hidden state.
- Reduced-motion CSS remains unchanged; JavaScript now matches it.

## Supported Shells

- `index.html`.
- Five existing posts and `posts/new-post-template.html`.
- `projects/smartlabeling.html`, `projects/yomii.html`, and `projects/code-tour.html`.
- Editor-generated post HTML in `script.js`.
- XHS-imported post HTML in `scripts/import-xhs-notes.js`.

Editor and admin pages are out of scope because they do not render the control.

## Error And Fallback Behavior

- If JavaScript fails or is disabled, the visible anchor navigates natively to the real `#top`.
- If `matchMedia` is unavailable, use smooth enhancement; native fallback remains.
- If focus detection cannot identify an editable target, the control remains in its normal threshold state.
- The control never blocks taps before the threshold after initialization because opacity and pointer-event state are synchronized together.

## Cache Contract

Advance stylesheet and shared-script version queries on every page/template touched by this behavior so GitHub Pages/browser caches do not retain the mobile `display: none` rule or old motion handler.

## Verification

- Prescribed Node checks and manifest generation.
- Deterministic checks: every rendered control has exactly one matching `#top`; template versions match; no duplicate controls.
- Browser QA at 320px, 390px, 767px, 768px, and desktop; short and tall heights.
- Before/after threshold visibility and pointer behavior.
- Activation from homepage, each post type, and project cases.
- Reduced-motion activation proves `auto` behavior.
- Visible keyboard focus; focused search/guestbook fields suspend the control.
- No overlap with archive filters, guestbook actions, XHS gallery controls, footer/account links, or project content.
- No overflow or console errors.

## Self-Review And Delegated Approval

- Placeholder scan: no TBD/TODO or unresolved copy.
- Consistency: all supported shells share one target/control/handler contract.
- Scope: one mobile recovery feature; deep navigation and reading continuity remain separate rounds.
- Ambiguity: “supported shell” means exactly the files/templates listed above that already render `.back-to-top`.
- Approval: both fresh evaluators selected C1, scoring it 8.30 and 8.50. Under the no-interruption instruction, that consensus approves implementation.
