# Round 3 Brainstorm - Agent 4: AI Applications Expert

## 1. SmartLabeling Visual Proof Strip

- User value: Lets reviewers see the AI labeling workflow without cloning the repo.
- Why it fits: Directly addresses the current gap: SmartLabeling is strong but mostly text proof.
- Technical approach: Static sequence of input image, prompt points/box, generated mask artifact, human correction, and export files. Use real screenshots/masks if available; otherwise label as architecture walkthrough.
- Estimated cost: Medium.
- Display effect: Strong visual AI-product proof on the case-study page.
- Risks: Must not imply browser-side SAM/CLIP inference unless it exists.

## 2. Yomii Essay Evaluation Trace

- User value: Shows how an AI writing-evaluation workflow is structured and reviewed.
- Why it fits: Yomii already claims essay evaluation, local model adapters, tests, and pipeline framing.
- Technical approach: Static expandable trace with submitted essay, rubric, scoring dimensions, feedback fields, mock/test output, backend route/code links.
- Estimated cost: Medium.
- Display effect: Makes AI evaluation loop inspectable and credible.
- Risks: Needs real or clearly labeled mock artifacts.

## 3. AI Workflow Diagrams for Both Projects

- User value: Helps non-specialists understand where UI, backend, data, and models meet.
- Why it fits: SmartLabeling and Yomii are workflow-heavy AI-adjacent projects.
- Technical approach: Semantic HTML sections styled as step diagrams; optional small JS for selecting steps.
- Estimated cost: Low to medium.
- Display effect: Cleaner case studies with readable system flow.
- Risks: Can become decorative if not tied to code links.

## 4. Evaluation Artifact Library

- User value: Demonstrates AI product judgment through rubrics, failure cases, tests, and acceptance criteria.
- Why it fits: Strong fit for honest AI-product demonstrations without paid APIs.
- Technical approach: Static page/section listing Yomii essay rubric, SmartLabeling mask-quality checks, backend tests, and known limitations.
- Estimated cost: Medium.
- Display effect: Signals maturity beyond "I used AI."
- Risks: Weak if artifacts are generic.

## 5. Explainable Local Search Upgrade

- User value: Visitors find posts/projects and see why results matched.
- Why it fits: Existing search and `posts/posts.json` provide the base.
- Technical approach: Client-side scoring with keyword aliases, snippets, highlighted matches, and "matched because" labels.
- Estimated cost: Medium.
- Display effect: Search feels smarter while staying local.
- Risks: Not semantic embeddings; describe honestly.

## 6. Code Tour Index

- User value: Gives technical reviewers a fast path into the right files and responsibilities.
- Why it fits: Current proof map links high-level repos, but not a cross-project tour.
- Technical approach: Static review route page/cards: capability, project, exact GitHub file/folder links, what to inspect.
- Estimated cost: Low.
- Display effect: Converts proof claims into reviewable evidence.
- Risks: External repo paths can drift.

## 7. Capability Receipts Filter

- User value: Lets recruiters filter proof by role.
- Why it fits: Builds naturally on current Proof Map.
- Technical approach: Inline or small JSON receipt data; JS filters cards by capability/status/project.
- Estimated cost: Low to medium.
- Display effect: More interactive proof map.
- Risks: Too many categories can feel like resume padding.

## 8. Mini Vision Concepts Lab

- User value: Shows CV intuition around masks, thresholds, points, and corrections.
- Why it fits: Supports SmartLabeling if framed as browser-side concept demo.
- Technical approach: Canvas demo with local sample image, threshold/color mask, manual point overlays, export preview.
- Estimated cost: Medium to high.
- Display effect: Memorable technical demo.
- Risks: Highest honesty risk; must say concept demo, not SAM inference.

## 9. Yomii Learning Loop Map

- User value: Makes product loop visible: search, favorite, review, quiz, essay feedback.
- Why it fits: Yomii's strength is full-stack learning workflow.
- Technical approach: Static/interactive flow with sample data objects and links to relevant modules.
- Estimated cost: Low to medium.
- Display effect: Shows product architecture and data thinking.
- Risks: Less AI-heavy than evaluation trace.

## Recommendation

1. SmartLabeling Visual Proof Strip
2. Yomii Essay Evaluation Trace
