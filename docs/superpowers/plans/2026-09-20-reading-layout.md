# Responsive Reading Layout Implementation Plan

**Goal:** Implement the approved homepage, article reading layout, and quieter surfaces on mobile and desktop.

**Architecture:** Keep plain static HTML/CSS/JavaScript. Put scoped layout rules in reading-layout.css; update existing posts and both post export templates so future posts retain the layout. Preserve article bodies, Markdown editor behavior, search, archive filters, and guestbook.

**Tech Stack:** HTML, CSS, existing JavaScript and Node checks.

## Approved design
- Homepage: merge identity heading and introduction; place search next to the article archive; retain desktop sidebar and use a compact mobile header.
- Articles: compact site header with return link and native search disclosure; move author/social content below the article; constrain desktop reading width.
- Surfaces: opaque reading area, subtle borders, flat archive rows; keep the existing blue-gray colors.

## Implementation
- [x] Update index.html and add reading-layout.css scoped to home-page/reading-page.
- [x] Update all posts/*.html shells, including new-post-template.html; synchronize renderPostHtml templates in script.js and scripts/import-xhs-notes.js without changing editor logic or article bodies.
- [x] Run node --check script.js, node --check scripts/import-xhs-notes.js, node scripts/generate-posts-manifest.js and all existing check scripts.
- [x] Preview 390px/320px mobile, 768px tablet and 1440px/1920px desktop. Check first article visibility, overflow, search/filter behavior, article navigation, image gallery, and editor regression.
- [x] Inspect diff and prepare the verified task files for commit; push main to origin as the final delivery step.
