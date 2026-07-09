# Round 4 Brainstorm - Agent 1: Personal Brand Expert

Date: 2026-07-09

## Scope

Only personal website visual design, homepage structure, interaction, and content presentation. No external repository work.

## Direction Options

1. **Reviewer-first homepage** - strongest for recruiting and technical review.
2. **Archive-first homepage** - strongest for personal publishing.
3. **Hybrid identity dashboard** - recommended: keep the archive soul, but make the top half act like a clear personal-brand dashboard.

## Feature Ideas

### 1. First-Viewport Brand Thesis

- **User value:** Visitors understand within 5 seconds who Alex is, what direction he is pursuing, and what to inspect first.
- **Why it fits:** The homepage has Proof Map content, but the first screen still reads like a generic blog.
- **Technical approach:** Rework the top `post-header` and welcome block into a compact intro panel with a role thesis, proof chips, and links to `#proof`, `#projects`, and `#blog`.
- **Cost:** Low.
- **Display effect:** Clear personal-brand entrance instead of a plain blog title.
- **Risk:** Overly aggressive copy could feel less authentic.

### 2. Audience Route Switcher

- **User value:** Recruiters, technical reviewers, and readers can choose a fast path.
- **Why it fits:** Existing suggested review routes are useful but passive.
- **Technical approach:** Add route buttons with small JavaScript active-state highlighting. Keep all content visible.
- **Cost:** Medium.
- **Display effect:** Guided homepage without adding pages.
- **Risk:** Can duplicate navigation if too large.

### 3. Proof Map Visual Compression

- **User value:** Makes capabilities easier to scan.
- **Why it fits:** Proof Map is strong but text-dense.
- **Technical approach:** Add numbered markers, shorter row titles, and claim/evidence visual rhythm using CSS.
- **Cost:** Low.
- **Display effect:** Evidence board instead of long resume paragraphs.
- **Risk:** Over-compression can remove nuance.

### 4. Project Proof Snapshot Cards

- **User value:** Visitors compare projects before opening case studies.
- **Why it fits:** Existing project cards already contain proof but do not visually lead with it.
- **Technical approach:** Add a proof strip with labeled pills such as `AI tooling`, `Full-stack`, `Desktop app`, and `Workflow design`.
- **Cost:** Low.
- **Display effect:** Stronger recruiter-friendly project cards.
- **Risk:** Labels can become buzzwords if not tied to concrete text.

### 5. Now / Next / Learning Module

- **User value:** Shows current momentum.
- **Why it fits:** The sidebar says "JavaBoy 转行引擎开发中" but the homepage does not explain that journey.
- **Technical approach:** Add a three-column static module near About.
- **Cost:** Low.
- **Display effect:** Living-site signal.
- **Risk:** Needs manual maintenance.

### 6. Archive Texture Strip

- **User value:** Adds personal warmth from local posts and XHS image assets.
- **Why it fits:** The site is a personal archive with local images under `assets/xhs/`.
- **Technical approach:** Add selected lazy-loaded local images linking to posts.
- **Cost:** Medium.
- **Display effect:** Visual memory layer.
- **Risk:** Random-looking images can distract from proof sections.

### 7. Sticky Section Rail

- **User value:** Helps visitors orient on a long homepage.
- **Why it fits:** Anchors already exist.
- **Technical approach:** Add a compact in-page nav, optionally active via `IntersectionObserver`.
- **Cost:** Medium.
- **Display effect:** More deliberate reading flow.
- **Risk:** Can clutter the existing left column.

### 8. Gentle Reveal And Active-State Motion

- **User value:** Makes the site feel more crafted.
- **Why it fits:** The stylesheet already has motion variables and hover effects.
- **Technical approach:** Add reveal classes via `IntersectionObserver`, respecting `prefers-reduced-motion`.
- **Cost:** Medium.
- **Display effect:** Subtle staged rhythm.
- **Risk:** Decorative motion can become noise.

### 9. Contact Intent Cards

- **User value:** Gives clearer reasons to contact Alex.
- **Why it fits:** Contact currently depends mostly on the guestbook.
- **Technical approach:** Add small intent cards above guestbook.
- **Cost:** Low to medium.
- **Display effect:** More purposeful closing section.
- **Risk:** Can feel too commercial.

## Recommendation

Prioritize First-Viewport Brand Thesis, Proof Map Visual Compression, Project Proof Snapshot Cards, and Now / Next / Learning Module.

