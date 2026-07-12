# Agent 4: AI Application Expert

## Context

For this static site, “AI” should mean explainable local artifacts, search/indexing, visualization, and project case studies. Do not depend on paid APIs or external accounts.

## Feature Ideas

| Feature | User value | Fit for site | Technical implementation | Cost | Display effect | Risk |
|---|---|---|---|---|---|---|
| AI Skill Graph | Shows skills, projects, posts, and evidence as a network. | Existing About/Projects/Archives can be connected. | Static JSON nodes/edges rendered with SVG/Canvas. | Medium | Clickable capability graph. | Too many nodes can become messy. |
| Local Semantic Archive Search | Improves content discovery with explainable ranking. | Existing search and manifest provide base data. | Precompute or client-calculate token weights; show match reasons. | Low-medium | Natural-language-ish search with explanations. | Chinese segmentation limits; avoid overclaiming. |
| WebGPU AI Playground | Shows algorithms, graphics, and front-end engineering. | Fits engine/AI direction. | Canvas-first demos: boids, A*, decision boundary, convolution; WebGPU later. | High | Interactive algorithm/AI demos. | Scope can grow quickly. |
| AI Project Case Studies | Gives AI projects engineering context. | SmartLabeling deserves more than a link. | Static case study: data flow, model integration, UI, tradeoffs. | Medium | SmartLabeling becomes a technical artifact. | Generic writing weakens credibility. |
| Local Publishing Assistant | Improves archive metadata and demonstrates automation. | Existing manifest generator is ideal for extension. | Generate `summary`, `topics`, `readingTime`, `relatedPosts` with rules/TF-IDF. | Medium | Better excerpts, reading time, related posts. | Summaries can be wrong; allow manual override later. |
| Knowledge Radar | Shows topic evolution over time. | Archive already has dates/tags. | Time-series JSON from tags/projects; SVG/Canvas radar/flow. | Medium | Visual technical interest history. | Data can feel subjective. |
| Mini Vision Lab | Demonstrates CV basics tied to SmartLabeling. | Existing XHS/project image assets can be reused. | Canvas edge detection, thresholding, color clustering, simple masks. | Medium-high | Local image-processing lab. | Not production-grade vision. |
| Engineering Flashcards | Turns interview/project thinking into structured knowledge. | Existing writing includes tech/career material. | Static `cards.json`, filter/random card UI. | Low | Compact technical Q&A cards. | Could become a generic question bank. |

## Recommended Priority

1. AI Skill Graph
2. Local Semantic Archive Search
3. AI Project Case Studies
4. WebGPU AI Playground

