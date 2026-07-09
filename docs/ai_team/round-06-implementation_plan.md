# Implementation Plan - Round 06 Curated Reading Paths

## Highest-Priority Feature

Curated Reading Paths / First Reads: a homepage section that gives first-time visitors a few clear reading routes through the existing archive.

## Files To Modify

- `index.html`
  - Add a `featured-reading` section after `Site Pipeline Lens` and before `近期更新`.
  - Include 4 reading lanes based on existing posts:
    - Direction and career notes
    - Tool / workflow notes
    - Life archive
    - ACGN longform
  - Link only to existing local posts.

- `styles.css`
  - Add responsive styles for the reading lanes.
  - Reuse existing tokens, card radius, typography, borders, and link-chip treatment.

- `README.md`
  - Add maintenance rules for curated reading paths.

- `docs/ai_team/*`
  - Save Round 06 decision, implementation, evaluation, and QA records.

## Technical Approach

- Static HTML/CSS only.
- No new dependencies.
- No changes to `script.js`, `editor.html`, import scripts, or guestbook behavior.
- Keep the section compact so it guides archive discovery without creating another heavy proof block.
- Use durable copy: explain why to read each path rather than using stale "latest" language.

## Data Structure Changes

None. This round does not alter `posts/posts.json` or manifest generation.

## Risks

- Manual curation can become stale. README should document how to refresh the section when stronger posts are added.
- Reusing posts across paths can feel thin; keep cards honest about the current small archive.
- Adding another homepage section can increase density; mitigate with compact layout and clear hierarchy.

## QA Plan

- Run required checks:
  - `node --check script.js`
  - `node --check scripts/import-xhs-notes.js`
  - `node scripts/generate-posts-manifest.js`
- Run `git diff --check`.
- Check local links exist.
- Parse and anchor-check `index.html`.
- Preview desktop/mobile to verify no horizontal overflow, no text clipping, and section placement between Site Pipeline Lens and Archive.
