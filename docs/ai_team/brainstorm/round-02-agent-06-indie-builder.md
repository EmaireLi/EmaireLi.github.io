# Round 2 Brainstorm - Agent 6: Independent Developer

## 1. Capability Evidence Matrix

- User value: Turns scattered projects, posts, and repo links into a quick proof system.
- Why it fits: Best return for a static site after project pages.
- Technical implementation: Static data-like HTML section with rows for AI, frontend, backend, product, and engineering process.
- Estimated cost: Low.
- Display effect: Compact, practical portfolio navigation.
- Risks: Needs concise copy.

## 2. Now / Shipping Section

- User value: Shows what is active and current.
- Why it fits: A personal site should feel maintained.
- Technical implementation: Add a small homepage block with current focus, recent shipped item, and next improvement.
- Estimated cost: Low.
- Display effect: Freshness and momentum.
- Risks: Stale if not updated.

## 3. Article TOC + Reading Progress

- User value: Makes posts easier to read.
- Why it fits: Low-friction improvement across content.
- Technical implementation: Client-side heading scan and progress bar on post pages.
- Estimated cost: Medium.
- Display effect: Blog feels more polished.
- Risks: Requires careful `script.js` changes.

## 4. Command Palette / Quick Jump

- User value: Fast navigation to projects, posts, and key pages.
- Why it fits: Power-user feature that demonstrates frontend craft.
- Technical implementation: Client-side modal triggered by Ctrl/Cmd+K using local metadata.
- Estimated cost: Medium.
- Display effect: Memorable interaction.
- Risks: Accessibility and mobile behavior must be good.

## 5. XHS Photo Notes

- User value: Makes imported visual content browsable and local.
- Why it fits: Project already has XHS import conventions and asset path rules.
- Technical implementation: Add a gallery/archive surface using local `assets/xhs/` images and post metadata.
- Estimated cost: Medium.
- Display effect: Richer personal content layer.
- Risks: Lower recruiter value unless curated.

## 6. Colophon / Site-as-Project

- User value: Shows stack, constraints, and maintenance process.
- Why it fits: Strong static-site engineering proof with little code risk.
- Technical implementation: Static page describing architecture, scripts, QA, and content workflow.
- Estimated cost: Low.
- Display effect: Adds engineering credibility.
- Risks: Can be too meta.

## 7. Article Collections

- User value: Helps readers browse by topic instead of only chronology.
- Why it fits: Builds long-term content value.
- Technical implementation: Add curated static collection pages or generated topic cards.
- Estimated cost: Low to medium.
- Display effect: Better archive structure.
- Risks: Needs enough posts per collection.

## 8. Explainable Search

- User value: Faster discovery with transparent matching.
- Why it fits: Existing search can evolve incrementally.
- Technical implementation: Weighted local index with snippets and chips.
- Estimated cost: Medium.
- Display effect: Stronger product feel.
- Risks: Search logic can get messy without boundaries.

## Priority Recommendation

1. Capability Evidence Matrix
2. Colophon / Site-as-Project
3. Article TOC + Reading Progress
4. Now / Shipping Section
5. XHS Photo Notes
