# Round 06 Project Understanding

## Current State Read

- README: static GitHub Pages personal site, plain HTML/CSS/JavaScript, with rules for posts, project cases, Proof Map, Site Pipeline Lens, Code Tour, XHS import, and guestbook.
- package.json: not present. The site has no package-managed frontend build.
- Project structure: `index.html`, `styles.css`, `script.js`, `editor.html`, `posts/`, `assets/xhs/`, `projects/`, `scripts/`, `guestbook/`, and `docs/ai_team/`.
- Recent commits:
  - `0e65f37 Add site pipeline lens`
  - `b9519c0 Add homepage evidence routing`
  - `b335a43 Add guided code tour`
  - `1830087 Add homepage proof map`
  - `c68cd88 Add project case study pages`
- Technical stack: static HTML/CSS/JS, markdown-it CDN, Node scripts for imports/manifests, Cloudflare Worker/D1 guestbook, GitHub Pages deployment.

## Current Website Positioning

The site is a proof-first personal archive. It introduces Alex, routes visitors by intent, shows capability evidence, documents the site's own static publishing workflow, lists project proof, renders recent posts from a generated manifest, supports local search, and exposes contact through a guestbook and account links.

## Current Advantages

- First-visit routing is clearer than a generic blog through hero, Start Here cards, Proof Map, and Site Pipeline Lens.
- Site engineering is now visible: editor, import, manifest, archive/search, guestbook, and publish flow are inspectable.
- Static deployment remains simple and robust.
- Posts already have tags, dates, excerpts, and search text in `posts/posts.json`.
- Local XHS image assets exist and can support richer content presentation without hotlinks.
- AI-team docs preserve decision history and QA evidence.

## Current Defects

- The archive is still mostly a generated timeline with tag filters; it does not recommend first reads or explain why a visitor should click a post.
- Contact is still a basic guestbook block; visitors have little guidance on what kind of message to leave.
- External account links remain a flat platform list without role labels.
- Search works, but result relevance is opaque.
- The homepage is dense; any next feature must reduce decision friction rather than add another heavy proof block.
- Visual warmth from personal writing/images is underused, but image-heavy changes carry QA risk.

## Highest-Value Improvement Direction

Round 06 should prioritize content discovery and visitor conversion on the personal site itself. The strongest direction is a compact curated reading path near the archive: a few editorially selected entry points that explain what to read first, why it matters, and what it proves about the person. This improves homepage usability without changing `script.js`, adding dependencies, or drifting into external project promotion.

## Constraints For Round 06

- Keep implementation static and local.
- Do not change the site positioning.
- Do not delete existing stable features.
- Avoid paid services, external account access, and new dependencies.
- Preserve `script.js` and `editor.html` unless the selected feature explicitly requires changes.
- Focus on personal website design, structure, interaction, and content presentation.
