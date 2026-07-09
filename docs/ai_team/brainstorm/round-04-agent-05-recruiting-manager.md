# Round 4 Brainstorm - Agent 5: Recruiting Manager

Date: 2026-07-09

## Scope

Only personal website visual design, homepage structure, interaction, and content presentation. No external project deep-dives.

## Approach Options

1. **Proof-first homepage:** best for recruiter comprehension.
2. **Story-first homepage:** stronger personality but slower hiring review.
3. **Interaction-first homepage:** memorable but higher distraction risk.

## Recommendation

Use a proof-first structure with light interaction.

## Feature Ideas

### 1. Recruiter Start Here Strip

- **User value:** Immediate answer to "who is this and what role fits?"
- **Why it fits:** Proof Map targets hiring review, but current first screen reads like a blog.
- **Technical approach:** Add 3-4 cells: target roles, strongest proof, current direction, contact path.
- **Cost:** Low.
- **Display effect:** Dense, calm summary near the top.
- **Risk:** Generic copy feels like resume filler.

### 2. Role-to-Proof Matrix

- **User value:** Maps capabilities to evidence quickly.
- **Why it fits:** Evidence rows already exist.
- **Technical approach:** Extend matrix with role signal, proof item, what to inspect.
- **Cost:** Low to medium.
- **Display effect:** Strong recruiter utility.
- **Risk:** Can feel bureaucratic.

### 3. 60-Second Review Mode

- **User value:** Busy reviewers scan only high-signal content.
- **Why it fits:** Homepage is content-rich.
- **Technical approach:** Small control toggles a body class for highlighting and condensed summaries.
- **Cost:** Medium.
- **Display effect:** Focused recruiter view.
- **Risk:** Hidden content/accessibility risk.

### 4. Project TL;DR Cards

- **User value:** Makes project value obvious before clicking.
- **Why it fits:** Project cards already have role, stack, and proof lists.
- **Technical approach:** Add `Impact / Role / Evidence` row to each card.
- **Cost:** Low.
- **Display effect:** Clearer hiring signal.
- **Risk:** Claims must stay precise.

### 5. Ownership Badges

- **User value:** Clarifies personal contribution.
- **Why it fits:** Current copy says "Owned" but it is not visually scannable.
- **Technical approach:** Add CSS badges such as `Architecture`, `Frontend`, `AI workflow`, `Content tooling`, `QA process`.
- **Cost:** Low.
- **Display effect:** Faster strength recognition.
- **Risk:** Badge overload.

### 6. Interview Entry Points

- **User value:** Gives interviewers discussion prompts.
- **Why it fits:** Site presents projects and proof artifacts.
- **Technical approach:** Add prompt cards linked to local sections.
- **Cost:** Low.
- **Display effect:** Bridges browsing to interviews.
- **Risk:** Can feel staged without evidence links.

### 7. Personal Brand Snapshot

- **User value:** Communicates working style without reading the archive.
- **Why it fits:** Site blends engineering, ACGN, writing, and tooling.
- **Technical approach:** Add "How I work" block with 3 statements.
- **Cost:** Low.
- **Display effect:** More human and memorable.
- **Risk:** Too much personality dilutes technical signal.

### 8. Contact Intent Panel

- **User value:** Makes outreach path clear.
- **Why it fits:** Contact is currently mostly guestbook-oriented.
- **Technical approach:** Add a compact contact panel near proof/projects.
- **Cost:** Low.
- **Display effect:** Clearer conversion path.
- **Risk:** Missing/stale contact info hurts trust.

## Recommended Priority

Recruiter Start Here Strip, Project TL;DR Cards, Role-to-Proof Matrix, Contact Intent Panel, and Interview Entry Points.

