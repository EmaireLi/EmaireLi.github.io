# Round 06 Brainstorm - Agent 04 AI Applications Expert

## Feature Ideas

### 1. Curated Reading Paths

- User value: visitors can choose a path like Start with projects, Read personal writing, or Understand the site system instead of scanning everything.
- Fit: the site already has posts, project case pages, Proof Map, Site Pipeline Lens, and local search.
- Technical plan: add a static homepage/archive section with hand-authored path cards. Each card links to 2-4 existing posts, pages, or sections.
- Estimated cost: low to medium.
- Showcase effect: makes the site feel product-minded and visitor-aware.
- Risk: manual curation; too many paths could make the homepage denser.

### 2. Search Match Explainer

- User value: search results explain why they appeared: title match, tag match, excerpt match, project match, or body text match.
- Fit: local search and generated manifest already exist.
- Technical plan: extend search logic in `script.js` to classify match sources and render labels plus context snippets.
- Estimated cost: medium.
- Showcase effect: demonstrates explainable information retrieval and thoughtful UX.
- Risk: touches shared search code.

### 3. Why This Result Archive Cards

- User value: archive cards tell visitors what a post is useful for.
- Fit: existing metadata includes titles, dates, tags, excerpts, and local images.
- Technical plan: add optional intent/whyRead/readerType fields to manifest generation, or maintain a small manual metadata map keyed by slug.
- Estimated cost: medium.
- Showcase effect: makes the archive feel curated.
- Risk: more metadata maintenance.

### 4. Local Recommendation Seeds

- User value: visitors get clickable prompts such as Show me technical proof, writing with images, or site-building notes.
- Fit: builds on local search and tags while avoiding fake personalization.
- Technical plan: add static query buttons that populate the search box or activate tag filters.
- Estimated cost: low to medium.
- Showcase effect: feels AI-adjacent while staying deterministic.
- Risk: weak queries can feel decorative.

### 5. AI Boundary Ledger

- User value: visitors understand where AI helped and where human judgment remained responsible.
- Fit: AI-team docs, feature decisions, QA notes, and pipeline evidence exist.
- Technical plan: add a compact static section/table with AI-assisted, human-reviewed, local/static reality, and evidence.
- Estimated cost: low.
- Showcase effect: responsible AI signal.
- Risk: can feel too meta or defensive.

### 6. Reading Depth Map

- User value: visitors see lightweight clusters: projects, workflow, technical notes, life writing, XHS imports.
- Fit: archive and manifest have enough structure for a local content map.
- Technical plan: generate counts by tag/category from `posts/posts.json`, then render a static visual summary with links into filters/search.
- Estimated cost: medium.
- Showcase effect: makes the body of work feel more navigable.
- Risk: can duplicate archive filters.

### 7. Project-to-Post Evidence Links

- User value: visitors can move from project claims to related writing or process evidence.
- Fit: project pages and personal posts exist but are loosely connected.
- Technical plan: add manually curated Related Writing/Evidence Trail links on project cards/pages.
- Estimated cost: low.
- Showcase effect: makes the site cohesive.
- Risk: manual links can go stale.

### 8. Transparent Content Import Receipt

- User value: readers can tell which posts came from XHS import, whether images are local, and when content was generated into the site.
- Fit: XHS import is a real workflow with local assets.
- Technical plan: add small receipt labels on imported post pages or archive cards: source type, image count, local asset status, import date if available.
- Estimated cost: medium.
- Showcase effect: turns static-site maintenance into visible trust infrastructure.
- Risk: metadata may distract from writing.

## Top 3

1. Curated Reading Paths
2. Search Match Explainer
3. Project-to-Post Evidence Links
