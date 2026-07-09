# Round 05 Brainstorm - Agent 01 Personal Brand

Scope correction: this round evaluates the personal website itself, not a GitHub project showcase. The feature must improve first-visit understanding, credibility, and personal positioning inside the site.

## Strategic Directions

- System-as-portfolio homepage: present the website as a maintained publishing and discovery system.
- Curated personal archive: make posts easier to scan by visitor intent.
- Interactive reviewer experience: help recruiters or technical visitors know what to inspect first.

## Feature Ideas

### 1. Site Pipeline Lens

- User value: visitors understand that the website is built and maintained as an engineering artifact, not only a static resume.
- Fit: the site already has an editor, XHS import, generated post manifest, search, archive, guestbook, and GitHub Pages deployment.
- Technical plan: add a homepage section with static cards for Write, Import, Index, Browse, Search, Guestbook, and Publish, linking to existing local pages/scripts/docs.
- Estimated cost: medium.
- Showcase effect: turns hidden site infrastructure into visible proof of engineering discipline.
- Risk: can feel self-referential if copy is too abstract.

### 2. Curated Archive Lanes

- User value: readers can enter posts through themes instead of only chronology.
- Fit: the site already has many posts and a generated manifest.
- Technical plan: add homepage/archive lanes such as Technical Notes, Career/Study, Life Notes, ACGN, and Imported Notes using existing metadata.
- Estimated cost: medium.
- Showcase effect: improves content discovery and information architecture.
- Risk: weak metadata may make some lanes sparse.

### 3. Work Style Snapshot

- User value: recruiters quickly see how the owner makes decisions and verifies work.
- Fit: the AI team docs already document decision-making and QA.
- Technical plan: add a concise homepage block linking to feature decisions, implementation plans, and QA notes.
- Estimated cost: low.
- Showcase effect: communicates engineering maturity.
- Risk: generic claims if not tied to concrete evidence.

### 4. Interview Prompt Cards

- User value: visitors can ask better questions in interviews or conversations.
- Fit: existing project/evidence sections already expose proof links.
- Technical plan: add cards like "Ask me about static publishing", "Ask me about UX tradeoffs", and "Ask me about AI-assisted iteration".
- Estimated cost: low.
- Showcase effect: converts passive browsing into conversation starters.
- Risk: can feel staged if overdone.

### 5. Proof Timeline

- User value: visitors see recent improvement momentum.
- Fit: the repository now has AI-team docs and repeated homepage upgrades.
- Technical plan: add a short dated timeline linking to decisions, README, and implemented sections.
- Estimated cost: medium.
- Showcase effect: demonstrates iteration, not one-time polish.
- Risk: can read like an internal changelog.

### 6. Account Identity Map

- User value: external links become meaningful instead of a plain account list.
- Fit: the homepage already links GitHub, Bilibili, XHS, Steam, Bangumi, and guestbook.
- Technical plan: group accounts by purpose: Code, Writing, Video, Notes, ACGN, Contact.
- Estimated cost: low.
- Showcase effect: clarifies multidimensional personal brand.
- Risk: may add clutter if placed too early.

### 7. Search Result Match Reasons

- User value: search feels more transparent and useful.
- Fit: the site already has local search over posts.
- Technical plan: update search rendering to show whether title, tag, or excerpt matched.
- Estimated cost: medium.
- Showcase effect: improves perceived product quality.
- Risk: touches `script.js`, which should remain stable unless necessary.

### 8. Contact Intent Panel

- User value: visitors know what kind of contact is welcome.
- Fit: the contact section currently relies heavily on account links and guestbook.
- Technical plan: add contact cards for project discussion, technical review, writing feedback, and interview/recruiting.
- Estimated cost: low.
- Showcase effect: improves conversion from browsing to contact.
- Risk: can imply availability that may not be intended.

## Recommendation

Highest priority: Site Pipeline Lens.

Secondary candidates: Curated Archive Lanes, Interview Prompt Cards, Work Style Snapshot.

Defer: Search Result Match Reasons until there is a stronger reason to touch `script.js`.
