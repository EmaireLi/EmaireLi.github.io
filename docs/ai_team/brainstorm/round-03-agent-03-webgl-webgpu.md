# Round 3 Brainstorm - Agent 3: WebGL/WebGPU Expert

## 1. SmartLabeling Workflow Proof Strip

- User value: Shows the annotation loop at a glance: image, prompt, mask proposal, correction, export.
- Why it fits: Directly fills the stated gap on `projects/smartlabeling.html`.
- Technical approach: Static HTML with local image/mask assets; Canvas/WebGL overlay for opacity, contours, prompt points, and before/after slider; accessible captions as fallback.
- Estimated cost: Medium.
- Display effect: Strong, honest workflow proof inside the case study.
- Risks: Needs real or clearly labeled representative assets.

## 2. Mask Difference Inspector

- User value: Helps technical reviewers see correction quality, not just a pretty mask.
- Why it fits: Ties to SmartLabeling's human-in-the-loop claim.
- Technical approach: Use paired saved masks; WebGL fragment shader colors false positive, false negative, overlap, and contour. Canvas fallback with precomputed PNG layers.
- Estimated cost: Medium.
- Display effect: Interactive comparison panel with legend.
- Risks: Requires paired masks; avoid quantitative claims unless measured.

## 3. Prompt-to-Mask Timeline Player

- User value: Makes workflow feel product-real: each user action changes model state.
- Why it fits: Matches foreground/background points, boxes, undo/redo, and async service orchestration.
- Technical approach: Static JSON event trace rendered as a timeline. Canvas/WebGL draws prompt points, boxes, pending state, response mask, correction step.
- Estimated cost: Medium.
- Display effect: Compact replay of an annotation session.
- Risks: If reconstructed, label as representative.

## 4. Export Artifact Explorer

- User value: Proves the workflow ends in usable training artifacts.
- Why it fits: SmartLabeling emphasizes mask/YAML/cache export.
- Technical approach: Static file-tree panel plus thumbnail atlas of exported masks; hover links masks to YAML labels and code links.
- Estimated cost: Low to medium.
- Display effect: Reviewers can inspect what comes out after annotation.
- Risks: Can become too file-format-heavy.

## 5. Annotation State Machine Map

- User value: Shows engineering control of a complex UI.
- Why it fits: Supports the frontend interaction and model-service boundary claims.
- Technical approach: Semantic HTML/CSS diagram with optional JavaScript highlighting for point, box, correct, export.
- Estimated cost: Low to medium.
- Display effect: Clear technical explanation without a toy demo.
- Risks: Decorative graph risk unless every node links to code evidence.

## 6. Mask Gallery Contact Sheet

- User value: Gives visual proof across multiple examples.
- Why it fits: Works if local SmartLabeling examples exist.
- Technical approach: CSS grid contact sheet; optional JS filters; WebGL optional contour overlay.
- Estimated cost: Medium.
- Display effect: Dense original/mask/corrected gallery.
- Risks: Needs enough real samples.

## 7. Progressive GPU Overlay Mode

- User value: Demonstrates practical graphics judgment while serving project proof.
- Why it fits: Better than a standalone WebGPU lab because it enhances SmartLabeling proof.
- Technical approach: Canvas2D default; detect WebGPU/WebGL2 for large-image compositing, contour extraction, LUT coloring, and smooth opacity blending.
- Estimated cost: Medium to high.
- Display effect: Technical visitors see practical GPU use tied to image annotation.
- Risks: Browser compatibility and QA burden.

## 8. Workflow-to-Code Review Route

- User value: Lets reviewers jump from visible workflow step to actual implementation entry points.
- Why it fits: Builds on Proof Map and SmartLabeling code-reading links.
- Technical approach: Step cards: Prompt UI, FastAPI route, Mask service, Export; highlight related visual layer and reveal GitHub links.
- Estimated cost: Low.
- Display effect: Converts visual proof into verifiable engineering proof.
- Risks: External GitHub links can drift.

## Recommendation

Build SmartLabeling Workflow Proof Strip plus Workflow-to-Code Review Route first. Add mask difference or timeline only if real saved masks/event traces are available.
