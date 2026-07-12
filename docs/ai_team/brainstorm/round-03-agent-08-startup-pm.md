# Round 3 Brainstorm - Agent 8: Startup Product Manager

## 1. Project Proof Gallery

- User value: Lets visitors see real product/workflow evidence before reading long case studies.
- Why it fits: SmartLabeling and Yomii already say next proof is visual.
- Technical approach: Add local assets under project asset folders, then render captioned screenshot/mask/workflow strips on case pages. Optional vanilla JS lightbox.
- Estimated cost: Medium.
- Display effect: Case studies become visually inspectable, not just descriptive.
- Risks: Needs truthful assets; bad screenshots weaken the site.

## 2. Guided Code Review Routes

- User value: Helps technical reviewers know exactly what files/modules prove ownership and architecture.
- Why it fits: Extends existing Proof Map and case-study code links into a reviewer-friendly product surface.
- Technical approach: Static `review-routes.html` or homepage section with project, repo area, what to inspect, why it matters.
- Estimated cost: Low to medium.
- Display effect: Clear "start here if reviewing my code" path.
- Risks: Can duplicate case pages unless cross-project and concise.

## 3. Ownership Receipts Layer

- User value: Converts vague portfolio claims into specific "I owned this" evidence.
- Why it fits: The site already has ownership notes; this makes them durable and standardized.
- Technical approach: Add compact receipt blocks per project: decision, artifact, code path, evidence link, limitation.
- Estimated cost: Low.
- Display effect: Stronger trust signal for recruiters and engineers.
- Risks: Must avoid overstating contribution.

## 4. Evidence Timeline / Shipping Log

- User value: Shows momentum, consistency, and how the site/projects improve over time.
- Why it fits: Compounds naturally with future commits, posts, and case-study updates.
- Technical approach: Static timeline generated manually or from a small JavaScript array; link entries to commits/docs/projects.
- Estimated cost: Medium.
- Display effect: Site narrative becomes "I ship and document progress."
- Risks: Requires maintenance discipline.

## 5. Architecture Explorer

- User value: Makes system design understandable without opening GitHub first.
- Why it fits: Yomii and SmartLabeling both have multi-part architecture.
- Technical approach: HTML tabs/details sections for UI/backend/data/model/export layers.
- Estimated cost: Medium.
- Display effect: Case pages feel more like product/engineering walkthroughs.
- Risks: Too much diagramming can feel decorative.

## 6. Site-as-Project Colophon

- User value: Shows the personal site itself as an engineered product.
- Why it fits: Reuses real local tooling: imports, manifests, editor, guestbook, QA.
- Technical approach: Add a concise `site.html` or case-study page for site architecture, scripts, constraints, verification workflow.
- Estimated cost: Low.
- Display effect: Turns static-site work into portfolio proof.
- Risks: Could become inward-looking.

## 7. Explainable Proof Search

- User value: Helps visitors find relevant evidence by capability, project, or keyword with match reasons.
- Why it fits: Builds on existing local search.
- Technical approach: Extend search to show snippets, tags, source type, and matched field labels.
- Estimated cost: Medium to high.
- Display effect: Search becomes a discovery feature.
- Risks: Touches `script.js`.

## 8. Reviewer Mode Switch

- User value: Recruiters, engineers, or product visitors can see the right route.
- Why it fits: Strengthens existing review routes with interaction.
- Technical approach: Segmented buttons filter/highlight sections by audience using data attributes and hash state.
- Estimated cost: Medium.
- Display effect: Homepage feels intentional and productized.
- Risks: Could feel gimmicky if hidden content makes navigation confusing.

## 9. Mini Technical Lab, Tied To Proof

- User value: Adds visible differentiation beyond static text.
- Why it fits: Best attached to SmartLabeling or engine-learning direction.
- Technical approach: Vanilla canvas demo: mask overlay comparison, transform matrix playground, collision/particle micro-lab.
- Estimated cost: Medium to high.
- Display effect: Memorable technical artifact.
- Risks: High polish burden; must avoid implying live AI inference.

## Recommendation

Build Project Proof Gallery next, with Ownership Receipts folded into the same case-study upgrade.
