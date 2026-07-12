# Round 3 Brainstorm - Agent 5: Recruiting Manager

## 1. SmartLabeling Visual Evidence Strip

- User value: Lets reviewers verify the AI labeling claim without running the app.
- Why it fits: Directly fills the biggest current proof gap called out in the case study.
- Technical approach: Add local screenshots/static masks: input image, prompt points/box, generated mask, export artifact. Keep captions honest.
- Estimated cost: Medium.
- Display effect: Strong visual proof inside the SmartLabeling case page.
- Risks: Weak or staged assets would reduce trust.

## 2. Guided Code Tour Index

- User value: Technical reviewers know exactly which files prove architecture, tests, AI flow, and frontend craft.
- Why it fits: Extends existing case-study code links without repeating the Proof Map.
- Technical approach: Add a `code-tour` section/page with "inspect this because..." links for SmartLabeling, Yomii, and this site.
- Estimated cost: Low to medium.
- Display effect: Clear 10-minute technical review path.
- Risks: External GitHub paths can rot.

## 3. Yomii Request-to-Result Trace

- User value: Makes full-stack learning loop inspectable: UI action to API to DB/model to response.
- Why it fits: Yomii already has backend tests and architecture claims, but lacks visual sequence proof.
- Technical approach: Add one annotated sequence for dictionary lookup, quiz/review, or essay evaluation with payload/result snippets.
- Estimated cost: Medium.
- Display effect: Interviewer sees system thinking.
- Risks: Too much implementation detail can slow skimming.

## 4. Reproducible Verification Cards

- User value: Hiring teams can see how to run or verify each project.
- Why it fits: Builds confidence around existing repos and tests.
- Technical approach: Per project setup command, test command, expected result, known limitations, linked docs.
- Estimated cost: Low.
- Display effect: "You can verify this" block under each case study.
- Risks: Must stay current with repo changes.

## 5. Test Evidence Ledger

- User value: Converts tests from hidden repo detail into hiring proof.
- Why it fits: Yomii and site scripts already have checks.
- Technical approach: Summarize test areas, linked folders, and behaviors each suite protects.
- Estimated cost: Low.
- Display effect: Compact proof of engineering discipline.
- Risks: Overclaiming coverage would be risky.

## 6. Architecture Decision Cards

- User value: Shows judgment: why Electron, why FastAPI, why local AI, why split storage.
- Why it fits: Case studies already mention tradeoffs; this makes them faster to evaluate.
- Technical approach: Short cards per project: decision, reason, rejected option, consequence.
- Estimated cost: Low.
- Display effect: Seniority signal without flashy UI.
- Risks: Can become verbose.

## 7. Interview Review Packet

- User value: Gives interviewers a focused route for a 15-minute screen.
- Why it fits: Complements Proof Map with technical interview prep.
- Technical approach: Static page/section with top projects, top files, discussion topics, and proof links.
- Estimated cost: Low.
- Display effect: "Start here before interview" path.
- Risks: Could feel too formal.

## 8. Site-as-Project Colophon

- User value: Shows the site itself as proof of product thinking and delivery workflow.
- Why it fits: Current site tooling is real.
- Technical approach: Concise engineering colophon: architecture, constraints, scripts, deployment, verification.
- Estimated cost: Medium.
- Display effect: Inspectable artifact.
- Risks: Lower value than project proof if self-referential.

## 9. Proof Freshness Badges

- User value: Helps reviewers trust links and evidence are maintained.
- Why it fits: Proof now spans case pages, repos, docs, and scripts.
- Technical approach: Add "last verified" dates or commit references to proof sections.
- Estimated cost: Low.
- Display effect: Small credibility boost.
- Risks: Creates maintenance obligation.

## Recommendation

1. SmartLabeling Visual Evidence Strip
2. Guided Code Tour Index
3. Yomii Request-to-Result Trace
