# Round 3 Brainstorm - Agent 7: UX Designer

## 1. Article TOC + Reading Progress

- User value: Long posts become easier to scan, resume, and navigate on mobile.
- Why it fits: Blog reading UX is still basic; this improves the archive without adding a new portfolio layer.
- Technical approach: JavaScript scans article headings, builds a compact TOC, adds active heading state and progress bar. Mobile uses collapsed "On this page."
- Estimated cost: Medium.
- Display effect: Calmer, more readable article experience.
- Risks: Sticky UI can crowd small screens; needs reduced-motion and keyboard support.

## 2. Start Here Reading Paths

- User value: New visitors choose the right route faster.
- Why it fits: Proof Map guides hiring review; this would guide archive reading without repeating proof claims.
- Technical approach: Static path links such as technical learning, project retrospectives, ACGN notes, and tool experiments.
- Estimated cost: Low.
- Display effect: Quiet guide rail above Archives.
- Risks: Needs light maintenance as posts grow.

## 3. Mobile Section Navigator

- User value: Faster homepage scanning on phones.
- Why it fits: Current homepage is long after Proof Map and Projects.
- Technical approach: Small horizontal anchor nav or compact jump menu for About, Proof, Projects, Archives, Contact.
- Estimated cost: Low.
- Display effect: Reduces vertical hunting and improves first-visit orientation.
- Risks: Can duplicate existing sidebar nav if not mobile-only or visually restrained.

## 4. Better Local Search Reasons

- User value: Search results become easier to trust.
- Why it fits: Existing search works but does not explain matches.
- Technical approach: Extend current JS to show matched field labels: title, tag, excerpt, body; keep simple substring ranking.
- Estimated cost: Medium.
- Display effect: Search feels more useful without backend/API complexity.
- Risks: Chinese matching remains limited; avoid calling it semantic search.

## 5. Related / Next Reading Trail

- User value: Keeps readers moving without decision fatigue.
- Why it fits: Archive style benefits from gentle continuity.
- Technical approach: Add related links from `posts.json` tags/date proximity, rendered at article bottom.
- Estimated cost: Medium.
- Display effect: Each post ends with calm next steps.
- Risks: Auto-related content can be weak with a small post set.

## 6. Reading Comfort Controls

- User value: Improves accessibility and mobile comfort.
- Why it fits: Quiet archive style supports reader-owned preferences.
- Technical approach: Small controls for font size and line height using CSS variables and `localStorage`.
- Estimated cost: Medium.
- Display effect: More comfortable long-form reading.
- Risks: Extra controls can feel tool-like; keep hidden/collapsed.

## 7. Archive Density Toggle

- User value: Visitors can switch between skim and detail.
- Why it fits: Current timeline includes excerpts and can be visually long.
- Technical approach: JS toggle between compact title/date and detailed excerpt/tags.
- Estimated cost: Low to medium.
- Display effect: Faster scan speed for repeat visitors.
- Risks: Adds state; must preserve accessibility and no-JS fallback.

## 8. Contact Intent Hints

- User value: Makes contact less ambiguous.
- Why it fits: Guestbook exists but gives little guidance.
- Technical approach: Static chips or buttons that update textarea placeholder.
- Estimated cost: Low.
- Display effect: Clearer visitor action without backend changes.
- Risks: Low technical impact.

## Recommendation

1. Article TOC + Reading Progress
2. Start Here Reading Paths
3. Mobile Section Navigator
