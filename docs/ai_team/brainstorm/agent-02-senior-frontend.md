# Agent 2: Senior Frontend Engineer

## Context

The site is dependency-light and should remain plain HTML/CSS/JavaScript. The highest-value frontend work should improve evidence density, accessibility, progressive enhancement, and portfolio credibility.

## Feature Ideas

| Feature | User value | Fit for site | Technical implementation | Cost | Display effect | Risk |
|---|---|---|---|---|---|---|
| Project Case Studies | Converts GitHub links into scannable engineering evidence. | Projects are currently underdeveloped. | Add project pages and richer homepage project cards. | Medium | Professional project section with architecture and outcomes. | Needs real details and screenshots. |
| Graphics Lab | Demonstrates frontend graphics and performance skills. | Matches engine-development positioning. | Canvas/WebGL/WebGPU progressive enhancement in a separate lab page. | Medium-high | Real-time interactive visual experiments. | Must handle fallback and reduced motion. |
| Local AI Demo Gallery | Shows AI application engineering without cloud calls. | SmartLabeling is already an AI-related project. | Static samples, masks, overlays, JSON annotations. | Medium | “Original -> prompt -> mask -> result” visualization. | Needs quality assets; avoid pretending it is live inference. |
| Engineering Skill Matrix | Gives recruiters a structured overview. | About lacks evidence links. | `data/skills.json` or inline structured HTML; links to posts/projects. | Low-medium | Evidence-driven skill panel. | Avoid arbitrary percentages. |
| Knowledge Graph | Makes archive exploration more memorable. | `posts/posts.json` already has tags and search text. | SVG/Canvas graph of tag-post relations. | Medium | Lightweight content network near Archives. | Sparse data may look thin. |
| Build Log | Turns the site itself into a portfolio artifact. | The repo has import scripts, Worker, manifest generation. | Add “How this site works” page or section. | Low | Architecture/process story for the site. | Too much prose may reduce readability. |
| Hiring Snapshot | Creates fast recruiter conversion. | Homepage is currently blog-first. | Static compact section or `resume.html`. | Low | Clear profile, direction, top links. | Must stay aligned with actual resume. |
| Site Quality Dashboard | Shows frontend engineering discipline. | Static site can generate metrics locally. | Node script creates `data/site-metrics.json`; page displays file sizes/post health. | Medium | Quality/health panel. | Metrics must stay current and meaningful. |

## Recommended Priority

1. Project Case Studies
2. Graphics Lab
3. Hiring Snapshot

