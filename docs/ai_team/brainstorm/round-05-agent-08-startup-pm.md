# Round 05 Brainstorm - Agent 08 Startup Product Manager

Visitor problem: first-time visitors need to answer quickly who Alex is, why they should trust the site, what to read first, and how to contact or remember the owner. The site already has proof routes, projects, archive, search, account links, and guestbook. The next product gains should make those assets easier to understand and more credible.

## Feature Ideas

### 1. Site Pipeline Lens

- User value: shows the website itself as an engineered artifact, not just a content shell.
- Fit: the site already has editor, post manifest generation, XHS import, search, archive, guestbook, and GitHub Pages constraints.
- Technical plan: add a compact homepage section explaining the static content pipeline with links to local pages/scripts/docs. Static HTML/CSS only.
- Estimated cost: low to medium.
- Showcase effect: strengthens engineering credibility through the site's own workflow.
- Risk: could become too inside-baseball. Keep it visitor-readable.

### 2. Curated Archive Windows

- User value: readers can discover meaningful writing themes instead of scanning only recent posts.
- Fit: the archive already has technical posts, XHS imports, life notes, and ACGN writing.
- Technical plan: add 3-4 curated lanes such as Technical Notes, Learning Logs, Life Fragments, and ACGN Essays, powered by existing post tags or a small static featured list.
- Estimated cost: medium.
- Showcase effect: makes the archive feel intentional and personal.
- Risk: manual curation can go stale unless kept small.

### 3. Contact Intent Panel

- User value: visitors know how and why to reach out.
- Fit: the guestbook already exists, but contact is currently late and lightly framed.
- Technical plan: add short contact routes: project discussion, reading feedback, collaboration, casual message. Link to guestbook and relevant external accounts.
- Estimated cost: low.
- Showcase effect: improves conversion without adding backend complexity.
- Risk: too many prompts may make the site feel transactional.

### 4. Account Links Identity Map

- User value: visitors understand what each external profile represents.
- Fit: the sidebar already lists GitHub, XHS, Bilibili, Steam, Bangumi, LeetCode.
- Technical plan: add short labels or grouping: code, writing, video, practice, interests. Keep current links.
- Estimated cost: low.
- Showcase effect: turns a link list into a fuller personal brand signal.
- Risk: sidebar clutter if labels are too verbose.

### 5. Featured Reading Path

- User value: a new reader gets a recommended first sequence instead of choosing randomly.
- Fit: the site has enough posts and case-study pages to support guided discovery.
- Technical plan: add a small Recommended First Reads block near the archive with 3-5 handpicked links and one-line reasons.
- Estimated cost: low.
- Showcase effect: creates editorial confidence and helps visitors understand the author's taste.
- Risk: needs occasional refresh as better posts appear.

### 6. Search Result Context

- User value: search feels more useful because visitors can see why each result matched.
- Fit: search already exists and pulls from the post manifest.
- Technical plan: extend search rendering to show matched tag/date/excerpt context. Keep no-JS fallback unchanged.
- Estimated cost: medium.
- Showcase effect: makes content discovery feel more polished.
- Risk: touches `script.js`, so regression risk is higher than static content changes.

### 7. Homepage Trust Strip

- User value: visitors quickly see that the site is maintained and current.
- Fit: the site already has generated manifests, recent posts, and project proof sections.
- Technical plan: add a compact strip with post count, last updated date, project count, and primary review routes.
- Estimated cost: low.
- Showcase effect: adds credibility above the fold or near Proof Map.
- Risk: a stale last-updated value can hurt trust.

### 8. Personal Positioning Microcopy Pass

- User value: the homepage becomes clearer and more memorable with less cognitive effort.
- Fit: current structure is strong, but several sections can be tightened into a sharper personal narrative.
- Technical plan: rewrite section intros, route labels, and CTA copy without changing layout.
- Estimated cost: low.
- Showcase effect: high perceived polish for minimal technical work.
- Risk: over-polished copy could feel less authentic.

## Recommended Top 3

1. Site Pipeline Lens
2. Curated Archive Windows
3. Contact Intent Panel
