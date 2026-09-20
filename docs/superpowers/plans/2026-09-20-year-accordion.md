# Year accordion implementation plan

Approved interaction: archive is collapsed by year with article counts. Desktop pointer movement over a year opens only that year. Touch/click and keyboard toggle native disclosure controls. Moving into another year closes the prior year; moving into its articles keeps it open so links can be followed. No automatic collapse solely due to layout-induced pointer exit.

- Update static generator and runtime archive rendering with matching native details/summary markup, year counts and a shared disclosure name.
- Delegate actual pointer movement to year summaries only on fine hover pointers; never rely on pointerenter events synthesized by layout changes. Keep at most one disclosure open for click/keyboard/fallback browsers.
- Use minimal chevron/opacity feedback, respect reduced-motion, and retain all article links in static HTML. Search stays directly usable; filtering rebuilds the compact year groups and matching counts.
- Validate generator contracts, interactions, static fallback and mobile/desktop layouts. Commit and push main.

## Verification
- Existing syntax/static archive/filter-state/guestbook checks pass.
- check-archive-disclosure.js covers default collapse, exclusive hover, intentional closing, touch/coarse-pointer exclusion, keyboard/native-toggle exclusivity, static article links and year counts.
- Browser pointer movement verified 2026-only then 2025-only; keyboard Enter switches groups and clicking an open summary closes it.
- ACGN filtering shows 2026 / 1 article; search returns one 京吹 result.
- 390px mobile layout visually reviewed; 320px has no horizontal overflow and year controls are 68px high. Touch event handling checked with fixture; no physical phone test claimed.
