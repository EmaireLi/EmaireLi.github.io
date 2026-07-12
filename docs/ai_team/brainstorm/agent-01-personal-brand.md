# Agent 1: Personal Brand Expert

## Context

The site is a static personal archive with posts, search, timeline archive, XHS imports, projects, guestbook, and visitor stats. The personal-brand gap is not visual polish; it is stronger proof that Alex can build systems, explain technical decisions, and move toward engine/graphics work.

## Feature Ideas

| Feature | User value | Fit for site | Technical implementation | Cost | Display effect | Risk |
|---|---|---|---|---|---|---|
| Project Case Studies | Recruiters understand role, architecture, tradeoffs, and outcomes without digging through GitHub. | Current Projects section is only two links. | Add `projects/` detail pages for SmartLabeling and Yomii; homepage links to them. | Medium | Projects become a real portfolio with technical narrative. | Empty content would look like packaging. |
| Graphics Lab | Proves the “engine development” direction visually. | The homepage states this direction but does not demonstrate it. | Add `lab/graphics.html` with Canvas/WebGPU demos and fallback. | Medium-high | Interactive rendering demos with controls and notes. | WebGPU compatibility and mobile performance. |
| Skill Map | Shows current capabilities and evidence links. | About is personal; Projects are sparse. | Static JSON or HTML skill entries with status and proof links. | Low-medium | Compact skill board under About. | Subjective scoring can feel untrustworthy. |
| Local Search Engineering Demo | Shows AI/search engineering without paid APIs. | Existing `posts/posts.json` and search can be upgraded. | BM25/TF-IDF-like ranking, match reasons, weighted fields. | Medium | Search results explain why they rank. | Must not overclaim as LLM/RAG. |
| Engineering Notes | Makes engineering judgment visible. | Existing docs and scripts already show design habits. | Add an Engineering section with short decision notes. | Low | Public technical decision archive. | Avoid exposing sensitive deployment/security details. |
| Hiring Snapshot | Gives a 30-second recruiter path. | Current site is archive-first, not hiring-first. | Add a restrained static block with role, direction, top links. | Low | Clear “who I am / what to inspect” entry. | Can feel like a resume template if overdone. |
| Learning Timeline | Makes Java-to-engine transition credible. | Timeline style already exists in archives. | Add curated milestones linked to projects/posts. | Low-medium | Personal technical growth route. | Future-heavy content can feel like a wishlist. |
| Site System Dashboard | Turns this site into portfolio evidence. | The site already has scripts, Worker, D1, imports, search. | Add `system.html` with architecture/data-flow diagrams and checks. | Medium | Shows full-stack/static-site engineering. | Do not reveal admin/token details. |
| Code Reading Cards | Shows code communication ability. | Content site is well-suited to guided explanations. | Add short cards linking to key files in projects. | Low | Interviewers know what code to inspect. | Long snippets reduce readability. |

## Recommended Priority

1. Project Case Studies
2. Graphics Lab
3. Skill Map

