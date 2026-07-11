# Implementation Plan — Round 08 Accessible Mobile Back-to-Top

## Selected Feature

Restore and harden the one existing back-to-top control across every page/template that already renders it.

## Files To Modify

- `styles.css`
  - Restore mobile display.
  - Add 44px touch geometry, safe-area offsets, focus-visible, and suspended state.

- `script.js`
  - Make click scrolling reduced-motion-aware.
  - Suspend/resume the fixed control around mobile text-entry focus.
  - Update the editor-generated HTML body target and cache versions.

- `scripts/import-xhs-notes.js`
  - Update imported-post body target and cache versions.

- `index.html`
  - Keep the existing target, make markup the no-JavaScript visible baseline, and advance CSS/script versions.

- `posts/*.html`
  - Add `body id="top"`, default visible fallback class, and synchronized CSS/script versions to five current posts plus the new-post template.

- `projects/*.html`
  - Add `body id="top"`, default visible fallback class, and synchronized CSS/script versions to three cases.

- `README.md`
  - Document target/control/template/cache invariants.

- Round 08 docs and QA report.

## Technical Approach

1. Use `class="back-to-top is-visible"` as the no-JavaScript baseline.
2. `initBackToTop()` immediately synchronizes threshold state when JavaScript loads.
3. Scroll with `auto` for reduced motion and `smooth` otherwise.
4. At mobile width, suspend the control while an input, textarea, select, or editable surface is focused; resume on focus exit.
5. Remove the mobile `display: none`, set 44×44px geometry, and place using ordinary 12px spacing plus safe-area insets.
6. Keep one control per supported shell and one unique `body#top`.

## Data And Content Changes

- No post body, manifest schema, search, archive, project, or guestbook data changes.
- Navigation-only markup must not change generated post metadata.

## Fallback Behavior

- JavaScript unavailable: visible anchor navigates natively to `#top`.
- JavaScript active: control hides before threshold and enhances motion/focus behavior.
- Reduced motion: immediate scroll.
- Editable focus on mobile: control is temporarily non-interactive.

## Risks And Mitigations

- **Load flash from default-visible fallback:** script is already at the end of each shell and runs immediately; verify top-load screenshots. Accept the no-JS-first baseline over a hidden nonfunctional fallback.
- **Form/gallery overlap:** safe-area offsets plus focus suspension and targeted visual QA.
- **Template drift:** deterministic checks compare body/control/version contracts across current pages, editor template, and XHS importer.
- **Cache staleness:** update CSS/script query versions everywhere this behavior renders.
- **Feature creep:** no other navigation/content behavior.

## Test Strategy

### Prescribed

- `node --check script.js`
- `node --check scripts/import-xhs-notes.js`
- `node scripts/generate-posts-manifest.js`
- `git diff --check`

### Deterministic

- Every HTML with `.back-to-top` has exactly one `id="top"` and one control.
- Editor/import templates emit `body#top`, fallback class, and current asset versions.
- `script.js` uses reduced-motion-aware behavior.
- Manifest regeneration has no content diff.

### Browser

- Widths: 320, 390, 767, 768, 1440; short and tall heights.
- At load/top: enhanced control hidden/non-interactive after initialization.
- After >240px: visible, 44px on mobile, focusable, safe-area positioned.
- Activation reaches scroll position 0 on homepage, representative XHS/longform post, and project case.
- Reduced-motion environment uses immediate behavior.
- Focus search, guestbook input/textarea, and editor-like inputs where the control exists; suspension works.
- No overlap with archive filters, guestbook actions, gallery controls, footer/account links; no overflow/console errors.

## README Impact

Document that any shell rendering the control must provide `body#top`, the markup stays visible for native fallback, JavaScript owns threshold/focus enhancement, and asset version queries must remain synchronized.
