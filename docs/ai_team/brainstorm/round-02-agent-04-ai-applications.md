# Round 2 Brainstorm - Agent 4: AI Applications Expert

## 1. Explainable Semantic-Style Local Search

- User value: Visitors can find relevant writing and projects with visible match reasons.
- Why it fits: Demonstrates AI-product thinking without needing an API.
- Technical implementation: Build local weighted search over posts/projects using tokenization, aliases, topic maps, snippets, and explainable scoring.
- Estimated cost: Medium.
- Display effect: Search results include "matched project: AI labeling", "matched topic: FastAPI", and highlighted snippets.
- Risks: Not true embeddings; should be described honestly.

## 2. AI Ability Evidence Graph

- User value: Recruiters can map AI capabilities to concrete projects and artifacts.
- Why it fits: Current site has evidence pages but no cross-project skill taxonomy.
- Technical implementation: Static data object rendered as capability nodes with links to case studies, posts, and repos.
- Estimated cost: Low to medium.
- Display effect: Clear AI/product engineering skill map.
- Risks: Can become buzzwordy if not evidence-backed.

## 3. Auto Tags + Related Recommendations

- User value: Readers discover more relevant content.
- Why it fits: The site has posts and a manifest that can be enriched.
- Technical implementation: Extend manifest generation or client JS to infer tags from title/content and recommend related posts.
- Estimated cost: Medium.
- Display effect: Blog feels more like a thoughtful knowledge base.
- Risks: Inference quality may be shallow without NLP libraries.

## 4. AI Project Workflow Visualization Panel

- User value: Makes AI feature architecture understandable to non-specialists.
- Why it fits: SmartLabeling and Yomii both combine UI, backend, and model workflows.
- Technical implementation: Add static workflow diagrams with interactive step details.
- Estimated cost: Medium.
- Display effect: Visitor can follow data/model/user loops.
- Risks: Needs accurate scope and clear terminology.

## 5. Mini Vision Lab

- User value: Demonstrates local browser AI-adjacent interaction through image masks and annotations.
- Why it fits: Reinforces SmartLabeling while avoiding paid APIs.
- Technical implementation: Local canvas demo with sample image, user points, simulated mask, and export.
- Estimated cost: Medium to high.
- Display effect: Strong interactive proof.
- Risks: Simulated AI must be clearly framed.

## 6. Topic Timeline Radar

- User value: Shows learning trajectory across AI, frontend, and product areas.
- Why it fits: Personal sites benefit from visible growth narrative.
- Technical implementation: Render topic frequency and time ranges from post metadata.
- Estimated cost: Low to medium.
- Display effect: A concise map of evolving focus areas.
- Risks: Weak if post metadata is sparse.

## 7. Metadata Assistant for Posts

- User value: Maintainer gets better summaries/tags for future posts.
- Why it fits: Improves long-term content quality.
- Technical implementation: Local script to suggest tags and excerpts from markdown files.
- Estimated cost: Medium.
- Display effect: Mostly internal; indirect site improvement.
- Risks: Less visible to recruiters.

## 8. Prompt/Evaluation Sample Library

- User value: Shows structured AI evaluation thinking.
- Why it fits: Aligns with AI application roles and product judgment.
- Technical implementation: Static page with anonymized prompts, eval rubrics, and examples.
- Estimated cost: Medium.
- Display effect: Differentiates from generic "I used AI" claims.
- Risks: Needs real artifacts to avoid looking theoretical.

## Priority Recommendation

1. Explainable Semantic-Style Local Search
2. AI Ability Evidence Graph
3. Auto Tags + Related Recommendations
4. AI Project Workflow Visualization Panel
5. Mini Vision Lab
