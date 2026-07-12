# Round 2 Brainstorm - Agent 8: Startup Product Manager

## 1. Hiring Snapshot Panel

- User value: Recruiters understand fit in 20 seconds.
- Why it fits: The site currently feels archival; this adds conversion without becoming a resume clone.
- Technical implementation: Add a compact homepage block with target roles, strengths, strongest proof links, GitHub/contact CTA.
- Estimated cost: Low.
- Display effect: "What I build / what I am seeking / proof" summary near About.
- Risks: Can feel too salesy if copy is generic.

## 2. Capability Evidence Matrix

- User value: Turns skills into inspectable proof.
- Why it fits: Connects Java, Vue, FastAPI, Electron, AI tools, and engine direction to real artifacts.
- Technical implementation: Static table/cards using local data-like HTML; link each capability to project, post, repo, or code path.
- Estimated cost: Low to medium.
- Display effect: Filterable proof grid: capability to evidence to depth.
- Risks: Too many rows can look padded; keep only verified proof.

## 3. Engineering Decision Log

- User value: Shows product and architecture judgment, not just output.
- Why it fits: Strong PM/recruiting signal: "why I chose this" differentiates from screenshots.
- Technical implementation: Add `decisions.html` or homepage section with short decision cards and links to posts/projects.
- Estimated cost: Low.
- Display effect: Timeline/list of tradeoffs, constraints, and outcomes.
- Risks: Needs concise writing; long essays reduce scan speed.

## 4. Static Resume / One-Page Profile

- User value: Gives hiring visitors a printable artifact.
- Why it fits: Complements personal archive and project proof with a practical recruiter path.
- Technical implementation: Create `resume.html` with print CSS, anchor links to evidence, and optional manually generated PDF later.
- Estimated cost: Low.
- Display effect: Clean resume page with "view proof" links per skill/project.
- Risks: Can become stale unless updated with site changes.

## 5. Interactive Engine Mini Lab

- User value: Visible technical differentiation without APIs.
- Why it fits: Aligns with "turning toward engine development" better than more case pages.
- Technical implementation: Canvas/WebGL demos for transform matrix, lighting, particle field, or collision toy using pure JavaScript modules.
- Estimated cost: Medium.
- Display effect: Small playable technical demo embedded on homepage or under `labs/`.
- Risks: Overbuilding risk; must stay simple and performant.

## 6. Proof-Based Reading Paths

- User value: Helps different visitors find the right content.
- Why it fits: Existing archive/search is broad; curated paths improve consumption.
- Technical implementation: Static cards for "Recruiter", "Engine learning", "AI tools", and "Life notes".
- Estimated cost: Low.
- Display effect: Guided entry points above Recent Updates or Archives.
- Risks: Requires manual curation; weak if paths have too few links.

## 7. Build Log / Now Page

- User value: Shows momentum and current direction.
- Why it fits: Personal brand improves when visitors see active learning and shipping cadence.
- Technical implementation: Add `now.html` or homepage section with dated entries, current focus, shipped recently, and next learning target.
- Estimated cost: Low.
- Display effect: Lightweight public progress board.
- Risks: Must avoid overpromising or exposing private plans.

## 8. Code Tour Index

- User value: Helps technical reviewers inspect repositories faster.
- Why it fits: The case pages link repos, but reviewers still need entry points.
- Technical implementation: Static "Start here" guide listing important files/modules per project and why they matter.
- Estimated cost: Low to medium.
- Display effect: Reviewer-friendly map: repo area to what to inspect to signal.
- Risks: Could duplicate case pages; keep it cross-project and code-navigation focused.

## 9. Personal Metrics Strip

- User value: Makes the site feel alive and evidence-rich.
- Why it fits: Existing visitor/post/project counts can become a credibility surface.
- Technical implementation: Use generated `posts.json` plus static project metadata to show posts, projects, tags, shipped artifacts.
- Estimated cost: Low.
- Display effect: Small dashboard: posts, projects, evidence links, last updated.
- Risks: Vanity metrics can backfire; use practical counts only.

## Priority Recommendation

1. Hiring Snapshot Panel
2. Capability Evidence Matrix
3. Interactive Engine Mini Lab
4. Code Tour Index
