# Round 06 Brainstorm - Agent 05 Recruiting Manager

## Visitor Intent Frame

Recruiters and interviewers likely ask:

- What role is Alex aiming for?
- What proof can I verify in under 90 seconds?
- What does this personal site itself demonstrate?
- What should I read first?
- How do I contact Alex with the right context?

Round 06 should reduce decision friction, not add another large proof section.

## Feature Ideas

### 1. Recruiter Snapshot Bar

- User value: gives recruiters the fastest answer to role fit, strongest evidence, and contact route.
- Fit: Proof Map and Start Here exist, but the key hiring answer is spread across sections.
- Technical plan: add a compact near-hero horizontal summary with target roles, strongest proof, status, and contact path.
- Estimated cost: low.
- Showcase effect: makes homepage more intentional and conversion-oriented.
- Risk: could make the site feel like a resume instead of a personal archive.

### 2. Curated First Reads

- User value: helps visitors choose meaningful posts without scanning the whole archive.
- Fit: archive exists, but it does not explain which posts best represent technical thinking, personal voice, or learning progress.
- Technical plan: add a small Start Reading section above recent updates with 3-5 manually selected posts, each with title, category, why read it, and link.
- Estimated cost: low.
- Showcase effect: turns the blog from chronology into editorial proof of judgment and writing.
- Risk: needs occasional manual maintenance.

### 3. Contact Intent Cards

- User value: lowers friction by telling visitors what kind of message to leave.
- Fit: guestbook exists, but current contact section is emotionally friendly rather than action-guiding.
- Technical plan: add 3 compact cards before the guestbook: recruiting, technical feedback, project discussion.
- Estimated cost: low.
- Showcase effect: improves conversion without backend changes.
- Risk: must avoid over-promising availability.

### 4. Homepage Proof Ladder

- User value: gives visitors a clear sequence: identity, capability proof, site proof, writing proof, contact.
- Fit: homepage is strong but dense.
- Technical plan: add a lightweight navigation strip or numbered overview near the hero, linking to existing sections and expected review time.
- Estimated cost: low.
- Showcase effect: shows product thinking.
- Risk: may duplicate Start Here.

### 5. Site Maintenance Receipts

- User value: technical reviewers can see the website is maintained with scripts, manifests, and verification steps.
- Fit: Site Pipeline Lens explains the system; receipts would add credibility.
- Technical plan: add a compact Receipts row inside Site Pipeline Lens linking to manifest, import script, generator, Code Tour, and decision docs.
- Estimated cost: low.
- Showcase effect: strengthens site-as-portfolio artifact.
- Risk: too many internal links may feel noisy.

### 6. Search Result Reason Labels

- User value: visitors understand why a search result matched.
- Fit: search works, but relevance is opaque.
- Technical plan: extend result rendering to show matched tag/category/date text from `posts/posts.json`.
- Estimated cost: medium.
- Showcase effect: improves content discovery and shows small UX care.
- Risk: requires `script.js` changes.

### 7. Account Identity Map

- User value: makes external links easier to interpret: code, writing, video, ACGN, practice.
- Fit: sidebar account links are flat.
- Technical plan: group existing links visually with short labels.
- Estimated cost: low.
- Showcase effect: makes identity coherent without making external platforms the main feature.
- Risk: limited impact compared with homepage/contact improvements.

### 8. What I Am Looking For Panel

- User value: recruiters understand suitable opportunities or conversation topics.
- Fit: current direction is visible, but not translated into practical recruiting language.
- Technical plan: add a restrained section near About or Contact with preferred areas: frontend/full-stack, AI tooling, static content systems, engine-learning direction.
- Estimated cost: low.
- Showcase effect: improves role clarity.
- Risk: too narrow wording may close off useful opportunities.

## Top 3

1. Curated First Reads
2. Contact Intent Cards
3. Recruiter Snapshot Bar
