# Round 06 Brainstorm - Agent 03 WebGL/WebGPU Expert

Scope stance: use WebGL only when it makes site information easier to understand. For this static personal site, most wins should be HTML/CSS/SVG/canvas first, with WebGL as progressive enhancement.

## Feature Ideas

### 1. Archive Topic Terrain

- User value: helps visitors see what Alex writes about across time instead of scanning a flat archive.
- Fit: `posts/posts.json` already has dates, tags, excerpts, and titles.
- Technical plan: render a tag/year map from the post manifest. Start with semantic HTML plus CSS grid; optionally add canvas for density contours or hover trails.
- Estimated cost: medium.
- Showcase effect: shows data visualization judgment on real personal content.
- Risk: current post count is sparse; weak tag consistency could make the map feel thin.

### 2. Curated Reading Path Map

- User value: gives first-time visitors a guided "read these first" route.
- Fit: Round 06 archive discovery is the next gap.
- Technical plan: add 3-4 editorial lanes near `近期更新`: technical growth, personal notes, ACGN writing, site-building notes.
- Estimated cost: low.
- Showcase effect: makes the site feel authored rather than auto-generated.
- Risk: manual curation can become stale.

### 3. Proof-to-Post Bridge

- User value: connects claims in the Proof Map to personal writing and notes, not only projects.
- Fit: Proof Map, project evidence, and Site Pipeline Lens exist, but archive is less integrated.
- Technical plan: add small related-writing links inside proof sections, backed by tags or manual links.
- Estimated cost: low to medium.
- Showcase effect: shows continuity between learning, building, and documenting.
- Risk: over-linking can make the homepage denser.

### 4. Site Pipeline Playback

- User value: makes the existing Site Pipeline Lens easier to understand as a sequence.
- Fit: the pipeline section already has five stages.
- Technical plan: add lightweight scroll-driven or click-driven step highlight. CSS/JS only.
- Estimated cost: medium.
- Showcase effect: demonstrates interaction design while reinforcing the static publishing workflow.
- Risk: animation must respect reduced-motion preferences.

### 5. Search Match Inspector

- User value: helps visitors understand why a search result appeared.
- Fit: search exists, but relevance is opaque.
- Technical plan: highlight matched title, tag, excerpt, or date fields in result cards.
- Estimated cost: medium.
- Showcase effect: shows careful frontend systems work.
- Risk: touches shared JavaScript.

### 6. XHS Image Story Grid

- User value: lets visitors browse visual personal notes more naturally.
- Fit: local XHS assets are available under `assets/xhs/`.
- Technical plan: add a compact image-led strip for imported XHS posts.
- Estimated cost: medium.
- Showcase effect: adds warmth without external dependencies.
- Risk: image layout needs careful mobile QA.

### 7. Guestbook Intent Router

- User value: helps visitors leave more useful messages.
- Fit: contact is functional but minimal.
- Technical plan: add small intent chips before the guestbook for project question, reading feedback, collaboration, casual note.
- Estimated cost: low to medium.
- Showcase effect: improves conversion.
- Risk: can feel form-heavy if overdone.

### 8. Personal Site Systems Mini-Map

- User value: gives technical reviewers a compact view of how the site is structured.
- Fit: Code Tour and Site Pipeline expose implementation proof.
- Technical plan: add a small SVG/HTML module map linking homepage, editor, posts manifest, import scripts, guestbook worker, and project pages.
- Estimated cost: medium.
- Showcase effect: communicates architecture without focusing on external projects.
- Risk: file paths can go stale.

## Top 3

1. Curated Reading Path Map
2. Archive Topic Terrain
3. Proof-to-Post Bridge
