# Round 2 Brainstorm - Agent 3: WebGL/WebGPU Expert

## 1. SmartLabeling Mask Visualizer

- User value: Visitors can understand image segmentation workflow interactively.
- Why it fits: It directly reinforces the strongest AI/vision project already featured.
- Technical implementation: Add a lightweight canvas module with layered image/mask toggles, opacity slider, and simulated prompt points using local placeholder or generated assets.
- Estimated cost: Medium.
- Display effect: A recruiter sees visual AI tooling rather than only reading about it.
- Risks: Needs accurate representative assets and accessibility fallback text.

## 2. Interactive Architecture Flow

- User value: Makes complex project architecture legible.
- Why it fits: Both SmartLabeling and Yomii have frontend/backend/AI flows that benefit from visual explanation.
- Technical implementation: Use HTML/CSS/JS nodes with hover states and progressive highlighting, avoiding heavy graph libraries.
- Estimated cost: Medium.
- Display effect: System design feels tangible and inspectable.
- Risks: Could become decorative if not tied to real implementation.

## 3. Interactive Shader Notes

- User value: Demonstrates graphics curiosity and low-level visual thinking.
- Why it fits: Adds technical differentiation to an otherwise static portfolio.
- Technical implementation: Small WebGL canvas with shader parameters and readable explanations.
- Estimated cost: Medium to high.
- Display effect: Strong visual signal for frontend/graphics roles.
- Risks: Generic shader demos may feel disconnected from the portfolio.

## 4. GPU Capability Inspector

- User value: Shows real browser feature detection and progressive enhancement.
- Why it fits: Demonstrates engineering judgment around modern APIs.
- Technical implementation: Use `navigator.gpu` detection, WebGL fallback checks, and display browser capability results locally.
- Estimated cost: Low to medium.
- Display effect: A technical diagnostic card.
- Risks: Visitor-specific output may be confusing without context.

## 5. WebGPU Graphics Lab

- User value: Provides a memorable proof of advanced graphics interest.
- Why it fits: Aligns with desired technical direction but is broader than current site content.
- Technical implementation: Progressive enhancement with WebGPU when available and canvas fallback.
- Estimated cost: High.
- Display effect: High visual differentiation.
- Risks: Too much scope for the current static site; browser support and QA burden.

## 6. Archive Constellation

- User value: Lets visitors explore posts by time/topic visually.
- Why it fits: Uses existing post metadata and showcases graphics without external APIs.
- Technical implementation: Canvas scatter/constellation view generated from `posts/posts.json`.
- Estimated cost: Medium.
- Display effect: Distinctive blog navigation.
- Risks: May prioritize novelty over recruiter value.

## 7. Local GPU Image Workbench

- User value: Allows local image filter/mask experimentation in browser.
- Why it fits: Related to SmartLabeling and technical imaging work.
- Technical implementation: File input plus canvas filters and mask overlay demo.
- Estimated cost: High.
- Display effect: Strong interactive demo.
- Risks: Scope and privacy UX need careful handling.

## 8. Project Evidence Reel

- User value: Quickly previews project workflows.
- Why it fits: Case pages are already present and need stronger visual proof.
- Technical implementation: CSS scroll-snap sequence with small canvases or annotated static frames.
- Estimated cost: Medium.
- Display effect: Polished first-scroll project storytelling.
- Risks: Could duplicate case-study content if too broad.

## Priority Recommendation

Start with SmartLabeling Mask Visualizer plus Interactive Architecture Flow. Defer a full WebGPU lab until the site has stronger proof scaffolding.
