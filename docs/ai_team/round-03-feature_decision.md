# Round 3 Feature Decision

## Inputs

- Round 3 project understanding: `docs/ai_team/round-03-project_understanding.md`
- Brainstorm outputs: `docs/ai_team/brainstorm/round-03-agent-01-personal-brand.md` through `round-03-agent-08-startup-pm.md`
- Evaluation outputs: `docs/ai_team/evaluation/round-03-evaluator-01-product-value.md` through `round-03-evaluator-05-delivery-risk.md`

## Top 3 Features

### 1. Guided Code Tour / Review Routes

**Reason:** This was the highest-value unconditional feature. It strengthens technical verification, avoids fake visual proof, does not require new assets, and stays compatible with static HTML/CSS.

**Expected impact:** Technical reviewers can inspect the most relevant repos, folders, and files faster. Recruiters get a clearer path from portfolio claims to verifiable evidence.

**Implementation plan:** Add a static `projects/code-tour.html` page with sections for SmartLabeling, Yomii, and this site. Each section should explain what to inspect, what it proves, and which broad repo/file links to open.

### 2. SmartLabeling Visual Evidence Strip

**Reason:** Four of five evaluators ranked visual SmartLabeling proof first, but all evaluators warned against fake screenshots or implied live inference. The repository currently has no `assets/projects/` visual project assets.

**Expected impact:** Once real screenshots, saved masks, or export artifacts exist, this will be the strongest AI/frontend/graphics proof.

**Implementation plan:** Defer. Add no fake product visuals. Later, use local assets under `assets/projects/smartlabeling/` and conservative captions.

### 3. Yomii Request-to-Result / Essay Evaluation Trace

**Reason:** Strong full-stack and AI-product proof candidate. It can be implemented with sample payloads, route references, and test links, but should follow the code tour.

**Expected impact:** Makes the Yomii learning/evaluation loop easier to verify without running the app.

**Implementation plan:** Defer to a later round. Build one concrete trace, not a broad architecture wall.

## Decision

Implement **Guided Code Tour / Review Routes** for Round 3.

Scope includes:

- New static `projects/code-tour.html` page.
- Links from homepage Proof Map and project case pages.
- Short ownership/verification notes where they help reviewers.
- README maintenance notes for keeping review routes accurate.

Scope excludes:

- Fake screenshots, masks, or product galleries.
- JavaScript search changes.
- WebGL/WebGPU or canvas demos.
- Deep GitHub file anchors that are likely to rot quickly.
