# Round 2 Brainstorm - Agent 1: Personal Brand Expert

Context: Round 1 added project cards and SmartLabeling/Yomii case-study pages. Round 2 should strengthen the site's value as a recruiter-facing engineering portfolio, not duplicate case pages.

## 1. Hiring Snapshot + Capability Evidence Matrix

- User value: Recruiters can understand role fit, core strengths, and supporting proof in under one minute.
- Why it fits: The site now has evidence pages but no fast hiring summary that routes visitors to them.
- Technical implementation: Add a homepage section with role target, capability rows, proof links, and compact availability/status text using static HTML/CSS.
- Estimated cost: Low.
- Display effect: A dense, credible "why hire me" panel with direct links to project proof.
- Risks: Can feel resume-like if copy is too generic.

## 2. Site-as-Project Engineering Colophon

- User value: Visitors see that the website itself is maintained with process, docs, QA, and iteration.
- Why it fits: The repo now contains AI-team planning artifacts and automated checks that can become proof of engineering discipline.
- Technical implementation: Add a lightweight `/projects/site.html` or README-linked section describing architecture, import pipeline, static constraints, QA checks, and release workflow.
- Estimated cost: Low to medium.
- Display effect: Turns the portfolio infrastructure into a third portfolio project.
- Risks: Needs careful copy so it does not overstate complexity.

## 3. Graphics/Interaction Lab Strip

- User value: Technical visitors can quickly sample visual and interactive engineering ability.
- Why it fits: The site should signal frontend depth beyond static content while staying compatible with GitHub Pages.
- Technical implementation: Add small canvas demos embedded in a section, such as image mask preview, particle timeline, or shader-like CSS/canvas effects.
- Estimated cost: Medium.
- Display effect: Visually memorable technical proof near project links.
- Risks: Performance and accessibility need guardrails.

## 4. Explainable Search

- User value: Readers can search posts and see why results matched.
- Why it fits: The site already has local posts manifest generation and keyword search.
- Technical implementation: Extend client-side search with matched terms, score labels, snippets, and optional topic filters.
- Estimated cost: Medium.
- Display effect: Search results feel engineered rather than basic.
- Risks: Could complicate `script.js`, which should be preserved unless explicitly changed.

## 5. Project Visual Proof Gallery

- User value: Recruiters can inspect screenshots, flows, and implementation artifacts without leaving the site.
- Why it fits: Current case studies are text-heavy and would benefit from more visual proof.
- Technical implementation: Add local image assets, responsive figures, and annotated captions to project pages.
- Estimated cost: Medium.
- Display effect: Case studies become more tangible and skimmable.
- Risks: Requires sourcing or creating accurate images.

## Priority Recommendation

1. Hiring Snapshot + Capability Evidence Matrix
2. Site-as-Project Engineering Colophon
3. Graphics/Interaction Lab Strip
4. Explainable Search
5. Project Visual Proof Gallery
