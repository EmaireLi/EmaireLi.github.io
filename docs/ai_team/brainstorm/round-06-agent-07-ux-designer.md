# Round 06 Brainstorm - Agent 07 UX Designer

## Feature Ideas

### 1. Curated First-Read Lanes

- User value: visitors stop guessing where to start in the archive.
- Fit: the archive exists, but it is still mostly chronological. Curated reading lanes make posts support proof-first positioning.
- Technical plan: add a static section above `近期更新` with 3-4 curated lanes. Each lane links to selected posts with a short why-read-this line. No JavaScript required.
- Estimated cost: low to medium.
- Showcase effect: makes the blog feel intentionally edited.
- Risk: manual curation can become stale.

### 2. Contact Intent Panel

- User value: visitors know what kind of message to leave before opening the guestbook.
- Fit: guestbook exists, but contact gives little guidance.
- Technical plan: add 3 compact intent options above the guestbook: project feedback, recruiting/interview, writing response.
- Estimated cost: low.
- Showcase effect: makes the site more approachable and conversion-oriented.
- Risk: copy must avoid sounding transactional.

### 3. Account Identity Map

- User value: visitors understand what each external account is for.
- Fit: sidebar links to GitHub, XHS, Bilibili, Steam, Bangumi, and LeetCode.
- Technical plan: replace or augment links with purpose labels: Code, Writing, Video, ACGN, Practice.
- Estimated cost: low.
- Showcase effect: turns scattered links into a coherent personal profile.
- Risk: low standalone impact unless paired with stronger routing.

### 4. What To Review Sticky Mini-Guide

- User value: recruiters and technical reviewers get a persistent path through dense homepage content.
- Fit: the homepage now has many sections.
- Technical plan: add a compact sidebar or top-of-content anchor list with Proof, Projects, Site System, Archive, Contact.
- Estimated cost: medium.
- Showcase effect: makes the page feel like a guided review experience.
- Risk: sticky UI can clutter mobile.

### 5. Project Decision Snapshot

- User value: visitors quickly understand why each project matters before opening a case study.
- Fit: project cards already show role, stack, receipts, and evidence.
- Technical plan: add one compact row per project with problem, constraint, tradeoff, result/next step.
- Estimated cost: low.
- Showcase effect: shows product and engineering judgment.
- Risk: too much text makes cards heavy.

### 6. Search Result Reason Badges

- User value: search becomes more transparent.
- Fit: search already exists and uses the manifest.
- Technical plan: extend search result rendering to show badges such as title, tag, excerpt, or date based on match source.
- Estimated cost: medium.
- Showcase effect: adds product polish.
- Risk: requires touching shared `script.js`.

### 7. Archive Recommended Next Footer

- User value: after reading recent posts, visitors get a next action instead of a dead end.
- Fit: archive is a major destination, but next step is not strongly guided.
- Technical plan: add a small static block below generated archive linking to Projects, Site Pipeline, and Contact.
- Estimated cost: low.
- Showcase effect: connects writing back to proof and contact.
- Risk: can duplicate Start Here.

### 8. Visual Archive Preview Strip

- User value: site feels more personal and easier to scan.
- Fit: local XHS assets exist and homepage is text-dense.
- Technical plan: add a responsive thumbnail strip linking to selected posts with lazy loading and alt text.
- Estimated cost: medium.
- Showcase effect: adds warmth without changing proof-first structure.
- Risk: image weight/cropping/mobile layout require QA.

## Top 3

1. Curated First-Read Lanes
2. Contact Intent Panel
3. Account Identity Map
