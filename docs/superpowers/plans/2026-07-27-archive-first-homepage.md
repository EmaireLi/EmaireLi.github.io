# Archive-First Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the public site as a long-term archive for technical learning, project practice, and daily writing without removing genuine career-related posts.

**Architecture:** Keep the existing plain HTML/CSS/JavaScript site and its archive/search/editor/guestbook behaviors. Restructure public HTML copy and sections, remove obsolete presentation-only styles, and update maintenance documentation so future changes preserve the archive-first direction.

**Tech Stack:** Plain HTML5, CSS, vanilla JavaScript, Node.js verification scripts, GitHub Pages.

## Global Constraints

- Preserve the markdown editor in `editor.html` and `script.js`.
- Preserve search, timeline archive, tag filtering, guestbook, visitor counter, and external account links.
- Keep genuine career-related posts and the `求职` archive tag.
- Do not add frameworks, packages, external services, or hotlinked assets.
- Follow the existing visual language in `styles.css`.

---

### Task 1: Rebuild the homepage narrative

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: Existing anchor navigation, archive mount point `#blog`, search data attributes, guestbook data attributes.
- Produces: Public anchors `#about`, `#featured-reading`, `#projects`, `#site-notes`, `#blog`, and `#contact`.

- [ ] **Step 1: Replace portfolio navigation and hero copy**

  Replace `Proof` with `Reading`, remove recruiter-oriented hero panels and actions, and add three neutral routes to reading, projects, and archives.

- [ ] **Step 2: Remove proof-only sections**

  Remove the entire `#proof` map, evidence matrix, review routes, and proof bridge without touching the archive/search/guestbook structure.

- [ ] **Step 3: Reorder and rewrite curated reading**

  Place reading before projects and organize it as 技术与工具、项目与实践、生活记录、ACGN 随笔. Keep all links local.

- [ ] **Step 4: Simplify project cards**

  Keep project purpose, contribution, stack, learning notes, project detail links, and GitHub links. Remove evidence receipts and proof lists.

- [ ] **Step 5: Replace Site Pipeline Lens with About This Site**

  Use a compact `#site-notes` section describing local writing, XHS import, shared archive/search manifest, and static publishing. Do not link AI-team decision records or Code Tour.

- [ ] **Step 6: Check anchors and prohibited public copy**

  Run:

  ```bash
  rg -n -i 'recruiter|reviewer|proof-first|hiring|evidence receipt|#proof|code-tour|docs/ai_team' index.html
  ```

  Expected: no matches.

### Task 2: Reframe project detail pages

**Files:**
- Modify: `projects/smartlabeling.html`
- Modify: `projects/yomii.html`

**Interfaces:**
- Consumes: Existing case-study layout and shared stylesheet.
- Produces: Project-practice pages with overview, architecture, implementation, current state, references, and future notes.

- [ ] **Step 1: Rename review-oriented navigation and metadata**

  Replace Case Study / Proof / Code Tour wording with 项目记录 / 当前状态 / 相关入口.

- [ ] **Step 2: Rewrite evidence sections**

  Convert `Current Evidence` to `当前状态`, `Evidence Links` to `相关入口`, and `Next Proof To Add` to `后续记录`; remove reviewer-route links.

- [ ] **Step 3: Check public project copy**

  Run:

  ```bash
  rg -n -i 'recruiter|reviewer|proof-first|hiring|current evidence|next proof|code tour' projects/smartlabeling.html projects/yomii.html
  ```

  Expected: no matches.

### Task 3: Remove obsolete presentation styles

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: Class names remaining in `index.html` and project pages.
- Produces: Responsive styling for the archive-first hero, route cards, reading cards, project cards, and compact site notes.

- [ ] **Step 1: Remove selectors used only by deleted proof sections**

  Delete proof map, evidence matrix, review route, proof bridge, evidence receipt, and proof-list rules after confirming no remaining HTML references them.

- [ ] **Step 2: Adapt existing cards for archive-first content**

  Reuse current color, spacing, border, and typography tokens. Keep the new homepage sections readable at desktop and mobile widths.

- [ ] **Step 3: Check selector references**

  Search the repository HTML for each retained homepage class and confirm removed selectors are not referenced by public HTML.

### Task 4: Align maintenance documentation

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: Final homepage and project-page structure.
- Produces: Archive-first maintenance guidance for future contributors.

- [ ] **Step 1: Replace portfolio maintenance rules**

  Remove Proof Map, recruiter routes, evidence receipts, credibility framing, and Code Tour maintenance requirements.

- [ ] **Step 2: Document archive-first rules**

  State that projects are practice records within a broader personal archive and that career posts remain ordinary tagged entries.

### Task 5: Verify, preview, commit, and push

**Files:**
- Verify all modified files.

**Interfaces:**
- Consumes: Completed Tasks 1-4.
- Produces: A pushed branch that can be previewed locally.

- [ ] **Step 1: Run syntax and content checks**

  ```bash
  node --check script.js
  node --check scripts/import-xhs-notes.js
  node scripts/generate-posts-manifest.js
  node scripts/check-static-archive.js
  node scripts/check-archive-filter-state.js
  node scripts/check-guestbook-disclosure.js
  git diff --check
  ```

  Expected: all commands exit successfully.

- [ ] **Step 2: Preview desktop and mobile layouts**

  Start a local static server, inspect the homepage and both project pages, and confirm no broken anchors, overflow, or browser console errors.

- [ ] **Step 3: Commit related files only**

  ```bash
  git add index.html projects/smartlabeling.html projects/yomii.html styles.css README.md docs/superpowers/plans/2026-07-27-archive-first-homepage.md
  git commit -m "refactor: restore archive-first site identity"
  ```

- [ ] **Step 4: Push the branch**

  ```bash
  git push origin codex/archive-first-homepage
  ```

  Expected: the remote branch updates successfully.
