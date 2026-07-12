# Phase 1: Project Understanding

Date: 2026-07-08
Branch: `codex/brainstorm`

## Repository Snapshot

- Static GitHub Pages personal site.
- No `package.json`; there is no build pipeline or package-managed frontend framework.
- Core files:
  - `index.html`: homepage, about, projects, archive, guestbook.
  - `styles.css`: global visual system, responsive layout, archive/search/guestbook/editor styling.
  - `script.js`: archive rendering, search, editor export, XHS galleries, guestbook, admin guestbook, visitor count, scroll reveal.
  - `editor.html`: local markdown editor.
  - `scripts/import-xhs-notes.js`: imports local XHS JSON into posts and local assets.
  - `scripts/generate-posts-manifest.js`: regenerates `posts/posts.json`.
  - `guestbook/worker.mjs`: Cloudflare Worker + D1 guestbook API.

## Recent Commits

- `a7f0f55` Add timeline archive filters
- `24e76ee` Add timeline archives design spec
- `828e4bd` Add visitor records to admin
- `4272243` Reduce visitor counter size
- `486c7f6` Refine visitor counter footer style
- `d66aaa2` Add visitor count footer stat
- `91974f7` Collapse guestbook composer
- `4227c1d` Include guestbook admin in Pages deploy

## Current Site Positioning

The site is a personal archive and technical/personal blog for Alex. It blends:

- personal notes and long-form writing;
- project links;
- XHS imported posts with local images;
- lightweight site search and timeline archives;
- guestbook and visitor stats through a small Worker backend;
- a local markdown editor.

The strongest existing positioning line is: `JavaBoy 转行引擎开发中`. The site says this, but does not yet prove it visually or technically.

## Current Strengths

- Simple deployment model: static HTML/CSS/JS works on GitHub Pages.
- Existing content workflow: local editor, XHS import, manifest generation.
- Existing interaction depth: search, archive filters, gallery, guestbook, admin page, visitor count.
- Clear personal voice and archive style.
- Recent work already improved archive quality and guestbook operations.

## Current Weaknesses

- Projects are only links; they do not explain role, architecture, tradeoffs, or results.
- The engine/graphics direction is stated but not demonstrated.
- The homepage does not give recruiters a fast evidence path.
- Search is keyword-based and does not explain result ranking.
- Technical depth is mostly hidden in repository files instead of surfaced as portfolio evidence.
- No package or build pipeline is good for simplicity, but feature work must stay plain JS and avoid heavy dependencies.

## Highest-Value Improvement Direction

Prioritize features that turn existing work into evidence:

1. A project/capability evidence layer for hiring conversion.
2. A graphics/WebGPU/Canvas lab that proves the engine-development direction.
3. Static-site-friendly AI/search enhancements that demonstrate engineering judgment without paid APIs.
4. Case-study style explanations of the site itself, SmartLabeling, and Yomii.

Avoid changes that:

- require paid APIs or external account access;
- replace the archive/blog identity;
- delete or destabilize editor, archive, XHS import, or guestbook flows;
- add unnecessary dependencies or a build step.
