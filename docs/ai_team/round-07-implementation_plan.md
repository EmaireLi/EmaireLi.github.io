# Implementation Plan — Round 07 Canonical Mobile Search Doorway

## Selected Feature

Move the homepage's one working search surface before the main article on narrow screens while preserving its desktop rail placement and existing search behavior.

## Files To Modify

- `index.html`
  - Move the existing `[data-site-search]` section immediately after the homepage header.
  - Add a stable section ID and stable status/results IDs.
  - Connect the input with `aria-describedby` and `aria-controls`.
  - Add polite/atomic live status semantics.
  - Add a no-JavaScript link to the static First Reads section.

- `styles.css`
  - Update homepage narrow-screen flex ordering to header → search → main → overview → accounts.
  - Add minimal styling for the no-JavaScript fallback and target/scroll behavior.
  - Keep desktop grid placement and the existing visual system unchanged.

- `README.md`
  - Add maintenance rules for the canonical responsive search placement and no-duplication invariant.

- `docs/ai_team/*` and `docs/superpowers/specs/*`
  - Preserve Round 07 discovery, brainstorm, evaluation, decision, design, implementation, delegation, and QA evidence.

## Technical Approach

1. Relocate the existing search HTML; do not clone it.
2. Preserve `.home-page .site-search-card { grid-column: 1; grid-row: 3; }` for desktop.
3. At `max-width: 991px`, assign search order 2 and shift the main/sidebar/account orders down.
4. Leave `script.js` search filtering, caching, rendering, and initialization unchanged.
5. Add semantic relationships in markup only.

## Content And Data Changes

- No manifest schema or post content changes.
- No search result or ranking changes.
- One short no-JavaScript message routes to existing static First Reads links.

## Fallback Behavior

- JavaScript available: current dynamic search behavior is unchanged.
- Manifest failure: current error status remains visible and the page stays usable.
- JavaScript unavailable: static First Reads remains a local path into real articles.
- CSS unavailable: source order still places search before the homepage article.

## Risks And Mitigations

- **Identity displaced below the fold:** keep the unloaded card compact; verify the identity article remains visible at 390×844 and 320px.
- **Desktop rail regression:** retain explicit grid coordinates and compare baseline geometry at 1440×900.
- **Keyboard/visual mismatch:** move the real DOM node and make narrow-screen flex order match source order.
- **Duplicate search controls:** deterministic assertion requires exactly one root, input, status, and results container.
- **Feature creep:** do not alter `script.js` or absorb relevance, suggestions, evidence indexing, contact, or navigation work.

## Test Strategy

### Prescribed checks

- `node --check script.js`
- `node --check scripts/import-xhs-notes.js`
- `node scripts/generate-posts-manifest.js`

### Deterministic checks

- `git diff --check`.
- Assert one `[data-site-search]`, `#site-search-input`, status ID, and result ID.
- Assert source order: header → search → main-inner → sidebar → account links.
- Assert all local hash targets and featured local post links exist.

### Browser QA

- 1440×900 desktop: search stays in the left rail and no main-content geometry changes.
- 992px and 991px: breakpoint switches without horizontal overflow.
- 390×844 and 320px: search is before the article and in the first viewport; identity remains visible.
- Keyboard: navigate into the input, type a query, open a result, reverse-tab, clear, and test no-match.
- Search queries: title (`GPT`), tag/content (`ACGN`), body content (`西湖`), and an impossible query.
- JavaScript disabled: no-script First Reads route is visible and points to static local links.
- Console: no errors or warnings attributable to the feature.

## README Impact

Document that the homepage must keep one canonical search surface before `.main-inner` in source order, that desktop grid placement may differ visually, and that future search improvements must reuse the same cache and renderer.
