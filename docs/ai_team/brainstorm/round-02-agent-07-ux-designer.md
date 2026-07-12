# Round 2 Brainstorm - Agent 7: User Experience Designer

## 1. Hiring Snapshot

- User value: Recruiters understand direction, stack, strongest proof, and contact path in 10 seconds.
- Why it fits: The homepage is still archive-first; it needs a concise evaluation entry without becoming a resume clone.
- Technical implementation: Add a compact section after Welcome with current focus, strongest projects, stack tags, GitHub/contact links.
- Estimated cost: Low.
- Display effect: Clear "who / direction / proof" panel near the first screen.
- Risks: Can feel generic if copy is too polished or inflated.

## 2. Capability Evidence Matrix

- User value: Converts skills into verifiable evidence instead of self-ratings.
- Why it fits: The site now has projects, posts, scripts, import tooling, guestbook, and case studies to link against.
- Technical implementation: Static table/cards with capability, evidence, artifact, and status fields.
- Estimated cost: Low to medium.
- Display effect: Recruiter can scan engineering breadth quickly.
- Risks: Needs honest labels like "used", "learning", and "building"; avoid fake proficiency scores.

## 3. Site as Project Tour

- User value: Shows the personal site itself as an engineering artifact.
- Why it fits: Existing site already has search, timeline archive, XHS import, editor, guestbook Worker, and admin page.
- Technical implementation: Add a "This site is also built by me" section with architecture bullets and links to relevant files/docs.
- Estimated cost: Low.
- Display effect: Makes hidden engineering work visible.
- Risks: Too much implementation detail could become a changelog.

## 4. Recruiter Reading Paths

- User value: Gives visitors guided routes instead of making them inspect everything.
- Why it fits: Archive and projects are useful but not yet curated by visitor intent.
- Technical implementation: Add path cards for "Frontend/Product UI", "AI tooling", "Backend/API", and "Personal writing".
- Estimated cost: Low to medium.
- Display effect: Faster comprehension and deeper browsing.
- Risks: Requires occasional maintenance as posts change.

## 5. Explainable Local Search

- User value: Improves archive discovery while demonstrating client-side engineering.
- Why it fits: Search already exists; enhancing it is cheaper than adding a new subsystem.
- Technical implementation: Extend current JavaScript search to rank title/tag/body matches, highlight snippets, and show match reasons.
- Estimated cost: Medium.
- Display effect: Search feels smarter and more inspectable without APIs.
- Risks: Chinese token matching is limited; should avoid calling it semantic search unless precomputed.

## 6. Article TOC + Reading Progress

- User value: Helps long-form posts feel easier to read and more polished.
- Why it fits: The site has long posts and a quiet archive style; this improves reading UX directly.
- Technical implementation: JavaScript scans article headings, renders a sticky/mobile TOC, updates active heading and progress bar on scroll.
- Estimated cost: Medium.
- Display effect: More mature blog/article experience.
- Risks: Sticky UI can crowd mobile screens; needs careful responsive behavior.

## 7. Learning Trajectory Timeline

- User value: Makes the Java-to-engine transition credible and easy to follow.
- Why it fits: The subtitle already frames this journey, but evidence is scattered.
- Technical implementation: Static timeline using existing archive visual language; each node links to a post, project, repo, or milestone.
- Estimated cost: Low to medium.
- Display effect: Clear growth narrative with proof links.
- Risks: Future-heavy items can read as wishlist; keep it evidence-first.

## 8. Bilingual Visitor Summary

- User value: Helps non-Chinese recruiters understand the site without translating everything.
- Why it fits: Current content mixes Chinese and English; a concise English layer improves accessibility.
- Technical implementation: Add English summaries for About, Projects, and key posts; optional JavaScript toggle for summary language only.
- Estimated cost: Medium.
- Display effect: Broader recruiter comprehension while preserving personal voice.
- Risks: Translation maintenance; half-translated pages can feel inconsistent.

## 9. Static Proof Gallery

- User value: Adds visual evidence without rebuilding case pages.
- Why it fits: Existing case studies explicitly lack screenshots, masks, and app visuals.
- Technical implementation: Add local images under `assets/`, then render a lightweight gallery/lightbox with captions and project links.
- Estimated cost: Medium.
- Display effect: Stronger immediate proof of shipped UI/workflows.
- Risks: Needs real screenshots; placeholders would weaken trust.

## 10. Contact Intent Guide

- User value: Makes the guestbook/contact section less ambiguous.
- Why it fits: Guestbook exists but visitors may not know what kind of message is welcome.
- Technical implementation: Add intent chips like "Project question", "Recruiting", and "Blog comment" that update placeholder text only.
- Estimated cost: Low.
- Display effect: Friendlier, clearer contact UX.
- Risks: Low technical signal; should stay small.

## Priority Recommendation

1. Hiring Snapshot
2. Capability Evidence Matrix
3. Site as Project Tour
4. Explainable Local Search
