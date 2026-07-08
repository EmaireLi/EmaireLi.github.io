# Round 3 Brainstorm - Agent 6: Independent Developer

## 1. Project Visual Proof Strips

- User value: Visitors see real project output without cloning repos.
- Why it fits: Case studies already say screenshots/masks are missing proof.
- Technical approach: Add local `assets/projects/...` images and a static before/after/workflow strip on each case page; optional tiny JS toggle.
- Estimated cost: Medium.
- Display effect: Makes SmartLabeling/Yomii feel more real and shipped.
- Risks: Weakens trust if assets are fake, blurry, or oversized.

## 2. Guided Code Tour Index

- User value: Technical reviewers get a direct "inspect this first" route.
- Why it fits: Proof map and case studies link repos, but not a unified verification path.
- Technical approach: Static `code-tour.html` with project sections, repo links, key files, what each file proves, and expected review time.
- Estimated cost: Low.
- Display effect: Organized, practical, reviewer-friendly.
- Risks: Links can rot if repo structure changes.

## 3. Public Colophon / Site-as-Project

- User value: Turns the site itself into proof of engineering process.
- Why it fits: README documents workflows; public visitors cannot see the story easily.
- Technical approach: Static `colophon.html` covering architecture, content pipeline, XHS import, manifest generation, guestbook Worker, QA commands.
- Estimated cost: Low.
- Display effect: Adds maturity and maintained-system credibility.
- Risks: Too much meta content can feel self-indulgent.

## 4. Freshness Panel

- User value: Makes the site feel alive at a glance.
- Why it fits: Personal archive plus portfolio benefits from visible maintenance signal.
- Technical approach: Homepage/footer block: latest post date from `posts/posts.json`, latest project proof update, last verified date.
- Estimated cost: Low.
- Display effect: "This is maintained" signal.
- Risks: Stale dates hurt.

## 5. Related Reading Under Posts

- User value: Keeps readers moving through archive.
- Why it fits: Tags already exist in `posts/posts.json`.
- Technical approach: JS loads manifest, matches current filename, ranks related posts by tag/date/title overlap, renders three links.
- Estimated cost: Medium.
- Display effect: Blog feels more complete.
- Risks: Sparse tags may produce weak recommendations.

## 6. Article TOC + Reading Progress Lite

- User value: Long posts become easier to read.
- Why it fits: Article reading UX is still basic.
- Technical approach: JS scans article headings, creates compact TOC, adds progress bar.
- Estimated cost: Medium.
- Display effect: Polished reading experience.
- Risks: Shared `script.js` complexity.

## 7. SEO / Share Metadata Pass

- User value: Links look intentional when shared and indexed.
- Why it fits: Static site can gain trust from basic metadata.
- Technical approach: Add descriptions, Open Graph/Twitter tags, maybe JSON-LD Person/WebSite.
- Estimated cost: Low.
- Display effect: Better previews.
- Risks: Generated posts may need template support.

## 8. Static RSS + Sitemap Generation

- User value: Makes archive feel like a maintained blog.
- Why it fits: Existing manifest generator can be extended.
- Technical approach: Add or extend Node script to generate `feed.xml` and `sitemap.xml`.
- Estimated cost: Medium.
- Display effect: Publishing discipline and crawler support.
- Risks: URL base must be configured correctly.

## Recommendation

1. Project Visual Proof Strips
2. Guided Code Tour Index
3. Freshness Panel
