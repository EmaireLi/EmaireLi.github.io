# Implementation Plan - Round 05 Site Pipeline Lens

## Highest-Priority Feature

Site Pipeline Lens: a homepage section that explains how the personal website itself is written, imported, indexed, browsed, searched, contacted, and published.

## Files To Modify

- `index.html`
  - Add a new `section` after `Projects` and before `近期更新`.
  - Use semantic HTML with a heading, pipeline cards, and a short proof/constraint strip.
  - Link only to existing local artifacts: `editor.html`, import/manifest scripts, `posts/posts.json`, archive/search/contact anchors, README, and AI-team decisions.

- `styles.css`
  - Add layout and responsive styles for the pipeline section.
  - Reuse existing tokens, borders, typography, and card treatment.
  - Avoid JavaScript-dependent behavior.

- `README.md`
  - Document maintenance rules for the Site Pipeline Lens.

- `docs/ai_team/*`
  - Save Round 05 decision, implementation, and evaluation records.

## Technical Approach

- Static HTML/CSS only.
- No new dependencies.
- No changes to `script.js`, `editor.html`, guestbook worker, or import behavior.
- Keep the module visitor-readable: explain why each pipeline step matters to trust, not only which file implements it.
- Keep links local and verifiable.

## Data Structure Changes

None. Existing `posts/posts.json` and scripts remain unchanged.

## Risks

- The section could become too internal if copy focuses on file paths instead of visitor trust.
- Homepage density could increase; mitigate with compact cards and restrained copy.
- Links to scripts/docs should remain stable and local.
- Future pipeline changes require the section and README maintenance rules to stay aligned.

## QA Plan

- Run required checks:
  - `node --check script.js`
  - `node --check scripts/import-xhs-notes.js`
  - `node scripts/generate-posts-manifest.js`
- Run `git diff --check`.
- Parse `index.html` with a simple HTML parser if available.
- Preview locally and check desktop/mobile layout, focusable links, no horizontal overflow, and no text overlap.
