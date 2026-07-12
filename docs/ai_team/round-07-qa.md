# QA Report — Round 07 Canonical Mobile Search Doorway

## Result

Pass. No blocking implementation or regression issue remains.

One fresh independent QA worker was started with only the implementation and acceptance criteria. It reached its own usage limit before returning findings. In accordance with the delegation rule, it was not respawned in a retry loop. The main agent completed the full acceptance suite below.

## Finding Resolved During QA

### Old CSS remained cached in the preview

The first 390px reload showed the new DOM order but the old computed responsive `order` values, leaving search at the bottom. The repository CSS was correct; the preview had reused the unversioned stylesheet URL.

Fix: the homepage stylesheet URL now includes the Round 07 version query, and README maintenance guidance requires advancing that version when this responsive surface changes. After reload, the expected mobile and desktop layouts were observed.

## Repository Checks

- `node --check script.js`: pass.
- `node --check scripts/import-xhs-notes.js`: pass.
- `node scripts/generate-posts-manifest.js`: pass; generated 5 posts and produced no working-tree manifest change.
- `git diff --check`: pass.
- Changed implementation files are limited to `index.html`, `styles.css`, and `README.md`; `script.js` and `editor.html` are unchanged.

## Structural And Link Checks

- Exactly one homepage `[data-site-search]` root: pass.
- Exactly one `#site-search-input`, `#site-search-status`, and `#site-search-results`: pass.
- Source order is header → search → `.main-inner` → sidebar → account links: pass.
- Input relationships point to the real status/results IDs: pass.
- Status exposes `role="status"`, `aria-live="polite"`, and `aria-atomic="true"`: pass.
- No-JavaScript copy points to `#featured-reading`: pass.
- The fallback target contains 5 static local post links: pass.
- Homepage anchor/local-link check: 24 IDs and 68 hrefs checked; no missing targets or local files.

## Responsive Visual Evidence

### 390×844

- Header: top 10px, height 168px, order 1.
- Search: top 200px, bottom 333px, order 2.
- Main content: top 354px, order 3.
- Search is fully inside the opening viewport and identity content is visible.
- One-result expansion grows the search card to 244px and moves main content to 464px without overlap.
- No horizontal overflow; no console warnings/errors.

Before this round the same search surface began around 10,220px. After the change it begins at 200px.

### 320×844

- Existing navigation wraps the final Editor item to a second row without horizontal overflow.
- Search: top 233px, bottom 366px.
- Main content: top 386px; identity content remains visible in the opening viewport.

### 992px / 991px breakpoint

- At 992px the homepage uses the desktop grid: 240px left rail, search at x=10/y=554, main content at x=262/y=25.
- At 991px the homepage uses the mobile flex flow: header order 1, search order 2 at y=205, main order 3 at y=361, sidebar order 4.
- Neither viewport has horizontal overflow.

### 1440×900

- Desktop grid remains intact.
- Search stays in the existing 240px left rail at x=140/y=554.
- Main content remains at x=392/y=25; first heading remains at y=90.
- Document height remains about 6,315px, matching the pre-change desktop baseline.
- No horizontal overflow; no console warnings/errors.

## Search Interaction Evidence

- `GPT`: 1 result, Apple gift-card / GPT Plus post.
- `ACGN`: 1 result, 京吹3 longform post.
- `西湖`: 1 result, personal archive post.
- Impossible query: 0 results and “没有匹配结果”.
- Whitespace/empty query: 0 results and ready state “可搜索 5 篇文章”.
- The GPT result link was activated in the preview, opened the correct local post, and browser Back returned to the homepage.
- The focused mobile input retains its visible focus ring; one-result expansion has no clipping or horizontal overflow.

## Accessibility And Fallback Review

- Visual, source, and keyboard traversal order agree on narrow screens because the real DOM node moved; the feature does not rely on CSS-only reordering.
- No autofocus, modal, focus trap, custom keyboard shortcut, or new motion was introduced.
- The browser automation surface did not advance native Tab focus reliably, so focus order is supported by semantic source-order evidence rather than an automated Tab traversal assertion.
- A real JavaScript-disabled browser session and screen-reader announcement were not available. The checked `<noscript>` route and live-region relationships provide deterministic markup evidence, but real-device assistive-technology behavior remains a manual residual check.

## Residual Risks

- Future homepage stylesheet changes must advance the CSS version query or visitors may temporarily receive cached layout rules.
- Search still depends on `posts/posts.json` and JavaScript by design; First Reads is the static fallback.
- Real VoiceOver/TalkBack announcement cadence and mobile browser keyboard behavior should be spot-checked on a physical device when available.
