# Round 4 Feature Decision

Date: 2026-07-09

## Decision Inputs

- Phase 1 project understanding: `docs/ai_team/round-04-project_understanding.md`
- Brainstorm outputs: `docs/ai_team/brainstorm/round-04-agent-*.md`
- Evaluator outputs: `docs/ai_team/evaluation/round-04-evaluator-*.md`
- Evaluation summary: `docs/ai_team/evaluation/round-04-summary.md`

## Top 3 Features

### 1. Homepage Evidence-Routing Pass

**Reason:**  
The personal website's strongest content is already present, but the first viewport and homepage flow still make visitors assemble the story themselves. A combined identity hero, Start Here routes, proof bridge, and project receipts gives the highest personal-site value without adding dependencies or touching stable tools.

**Expected impact:**

- Recruiters understand direction and evidence before scrolling deeply.
- Technical reviewers get clear routes into proof, projects, and code tour.
- Readers can still reach the archive without the site becoming a generic resume.
- The homepage becomes a designed personal-site experience rather than a blog template with portfolio sections attached.

**Implementation plan:**

- Rework the top homepage content into a positioning-first identity panel.
- Add static Start Here route cards for recruiter, technical reviewer, reader, and contact/collaboration intent.
- Add a Proof-to-Project bridge that connects capability claims to inspectable destinations.
- Add project evidence receipt rows to homepage project cards.
- Add CSS for the new components using the existing visual system.
- Avoid JavaScript changes unless strictly necessary.

### 2. Static Site Pipeline Lens

**Reason:**  
This would make the website itself more clearly visible as an engineering artifact: editor, posts, XHS import, manifest generation, search, archive, guestbook, and GitHub Pages deployment.

**Expected impact:**

- Stronger engineering-process signal.
- Clearer full-stack/static-site ownership without external services.

**Implementation plan:**

- Add a compact "how this site works" section in a later round.
- Keep it HTML/CSS-first and evidence-linked to local scripts/docs.

### 3. Curated Archive Windows

**Reason:**  
The archive is part of the site's personality, but the homepage currently shows it mostly as a recent-post list.

**Expected impact:**

- Better content discovery for readers.
- Warmer personal-site impression after the professional route is clear.

**Implementation plan:**

- Add small curated lanes for technical notes, life fragments, and imported XHS notes in a later round.
- Use local post data and avoid complex taxonomy until the content volume grows.

## Clear Highest Priority

The fourth implementation target is:

**Homepage Evidence-Routing Pass**

## Explicitly Skipped For This Round

- External project deep-dives.
- WebGL/canvas/shader decoration.
- Capability filters that hide content.
- Search/result algorithm changes.
- Paid services, external accounts, or new dependencies.

