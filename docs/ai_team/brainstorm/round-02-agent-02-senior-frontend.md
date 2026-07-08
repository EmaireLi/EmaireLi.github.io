# Round 2 Brainstorm - Agent 2: Senior Frontend Engineer

## 1. Hiring Snapshot + Evidence Matrix

- User value: Converts project proof into a clear capability map.
- Why it fits: The homepage currently introduces projects but does not summarize the engineering profile.
- Technical implementation: Add semantic HTML tables/lists with accessible links to case-study sections and external repos.
- Estimated cost: Low.
- Display effect: A compact technical positioning section above projects.
- Risks: Needs concise content to avoid clutter.

## 2. Explainable Local Search

- User value: Users can find posts/projects faster and trust why each result appears.
- Why it fits: Existing search can be upgraded without backend dependencies.
- Technical implementation: Use `posts/posts.json`, static project metadata, simple weighted matching, highlighted snippets, and filter chips.
- Estimated cost: Medium.
- Display effect: Search becomes a visible engineering feature.
- Risks: Touches `script.js`, so regression testing matters.

## 3. Post Reading Enhancements

- User value: Long posts become easier to scan and revisit.
- Why it fits: Blog posts are a core site surface, and improvements are broadly useful.
- Technical implementation: Client-side generated table of contents, reading progress, related posts, and anchor links.
- Estimated cost: Medium.
- Display effect: Cleaner article experience with minimal data changes.
- Risks: Must avoid breaking imported posts.

## 4. How This Site Works

- User value: Technical visitors can inspect the static architecture and automation workflow.
- Why it fits: Demonstrates engineering process within the personal site itself.
- Technical implementation: Add a static page documenting content import, manifest generation, QA checks, and deployment assumptions.
- Estimated cost: Low.
- Display effect: A credible engineering artifact that links to repo files.
- Risks: Can become stale if not maintained.

## 5. SmartLabeling Visual Proof Strip

- User value: Makes the most technically ambitious project understandable at a glance.
- Why it fits: SmartLabeling is a strong AI/frontend project but current proof is mostly text.
- Technical implementation: Add local static visual sequence or small canvas interaction showing image, prompt, mask, export.
- Estimated cost: Medium.
- Display effect: High-impact visual block inside the case study.
- Risks: Needs truthful assets and good responsive behavior.

## 6. Code Reading Map

- User value: Reviewers know which files to inspect first in external repos.
- Why it fits: Case studies already include code reading guides; this turns them into guided routes.
- Technical implementation: Add linked ordered routes with purpose, file path, and takeaway.
- Estimated cost: Low.
- Display effect: More recruiter/developer friendly case pages.
- Risks: External repo paths can drift.

## 7. Archive Quality Dashboard

- User value: Shows content volume, topics, and recency.
- Why it fits: The manifest already contains structured post data.
- Technical implementation: Generate simple counts and recency cards from `posts/posts.json`.
- Estimated cost: Low to medium.
- Display effect: Gives the blog archive a product-like information layer.
- Risks: Limited value if content volume stays small.

## 8. Accessibility/Performance Proof Footer

- User value: Signals care for production quality.
- Why it fits: Static site can advertise concrete checks and constraints.
- Technical implementation: Add a small page or footer note with local QA commands and accessibility notes.
- Estimated cost: Low.
- Display effect: Subtle engineering trust signal.
- Risks: Should not distract from primary content.

## Priority Recommendation

1. Hiring Snapshot + Evidence Matrix
2. Explainable Local Search
3. SmartLabeling Visual Proof Strip
4. Post Reading Enhancements
5. How This Site Works
