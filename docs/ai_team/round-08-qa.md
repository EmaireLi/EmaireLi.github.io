# Round 08 QA — Accessible Mobile Back-to-Top Restoration

## Result

PASS for implementation and static acceptance. Live browser interaction remains an explicitly unverified residual because the in-app browser was trapped on a local connection-error `data:` page and its URL policy rejected further interaction. The team stopped there instead of bypassing the policy.

## Automated checks

- `node --check script.js` — pass.
- `node --check scripts/import-xhs-notes.js` — pass.
- `node scripts/generate-posts-manifest.js` — pass; generated five posts and left `posts/posts.json` unchanged.
- `git diff --check` — pass.
- Back-to-top contract check — pass for 10 current HTML shells and both generators.

The contract check verified one `body#top`, one default-visible `href="#top"` control, and `20260711b` CSS/JS cache versions in every current shell. It also verified the same body, control, and cache-version contract in the editor and XHS importer templates.

## Source-level acceptance

- The base desktop control remains 34 × 34 px.
- The sole `max-width: 767px` override provides a 44 × 44 px target and safe-area-aware right and bottom offsets; 768 px therefore retains the desktop size.
- Visibility uses the existing `scrollY > 240` threshold.
- Hidden or suspended controls are removed from keyboard navigation with synchronized `tabIndex` and `aria-hidden` state.
- Mobile focus on input, textarea, select, or editable content suspends the control; focus and media-query changes resynchronize it.
- Reduced-motion preference selects immediate scrolling, while the CSS reduced-motion rule disables transitions.
- The focus-visible selector only applies while the control is visible, preventing keyboard focus styles from reviving a hidden control.
- The editor and XHS importer continue generating the same accessible markup as hand-maintained pages.

## Independent QA

The single Round 08 QA worker returned PASS after a read-only diff and contract review. It found no unrelated editor, post-template, or importer regression.

## Residual risk

The in-app browser could not complete runtime checks at 320, 390, 767, 768, and 1440 px, nor soft-keyboard focus and scroll-click behavior. The local server itself returned HTTP 200, but the browser plugin's security policy blocked the error-page tab before it could be recovered. These interactions should be spot-checked in a normal browser after deployment; they are not claimed as passed here.
