# Round 2 Evaluation - Evaluator 5: Delivery Risk Critic

Scores are weighted totals out of 100. Cost score rewards low cost and low delivery risk.

## Ranking

| Rank | Candidate | Score | Delivery-risk read |
|---:|---|---:|---|
| 1 | Hiring Snapshot + Capability Evidence Matrix | 87 | Best value-to-risk ratio. Mostly static HTML/CSS, strong recruiter value, minimal chance of breaking editor/search/import. |
| 2 | Guided Code Review Route / Ownership Receipts | 80 | High trust signal, low implementation cost. Main risk is external repo path drift. |
| 3 | Site-as-Project Tour / Colophon | 78 | Good technical display with low code risk. Keep it concise so it does not become meta filler. |
| 4 | AI Ability Evidence Graph | 74 | Useful if treated as evidence-backed matrix, not buzzword nodes. Should probably merge into rank 1. |
| 5 | Engineering Decision Log | 73 | Good seniority signal, low technical risk. Risk is verbosity and self-importance. |
| 6 | Static Project Proof Gallery | 72 | Strong display value, but depends on real screenshots/assets. Placeholder visuals would hurt trust. |
| 7 | Recruiter Reading Paths | 71 | Useful navigation layer, low risk, but less technical display than evidence matrix. |
| 8 | Interactive Architecture / Workflow Visualization | 69 | Good display, but more scope and JS/CSS complexity. Static diagram first would be safer. |
| 9 | Explainable Local Search | 67 | Good technical feature, but touches shared `script.js` search behavior and risks regressions in existing post/import flow. Defer. |
| 10 | SmartLabeling Mask Visualizer / Mini Vision Lab | 66 | Strong visual proof, but canvas/assets/simulation framing increase scope and fragility. |
| 11 | Static Resume / One-Page Profile | 62 | Practical, low risk, but stale-content risk and weaker technical signal. |
| 12 | Build Log / Now Page | 59 | Cheap, but becomes stale quickly. |
| 13 | Article TOC + Reading Progress | 57 | Useful UX, but shared JS and imported-post variability make it riskier than value warrants. |
| 14 | Command Palette / Quick Jump | 55 | Memorable, but accessibility/mobile/keybinding complexity is disproportionate. |
| 15 | Archive Quality Dashboard / Metrics Strip | 54 | Low strategic value; vanity-metric risk. |
| 16 | Contact Intent Guide | 53 | Safe but low technical and recruiter impact. |
| 17 | XHS Photo Notes / Gallery Archive | 50 | Personal-content value, weak recruiter value, import/gallery interaction risk. |
| 18 | Auto Tags / Related Recommendations / Metadata Assistant | 49 | Fragile inference quality and manifest/script churn. |
| 19 | Engine Mini Lab / Graphics Lab / Shader Notes | 48 | Technical display is high, but scope creep is high and relevance is less direct. |
| 20 | WebGPU Lab / GPU Workbench / GPU Inspector | 40 | Eliminate for Round 2. Browser support, QA burden, and novelty risk are too high. |

## Recommended

Implement one tightly scoped static feature: Hiring Snapshot + Capability Evidence Matrix, optionally including Ownership Receipts / Code Review Route inside the same section.

Secondary safe add-on: Site-as-Project Tour / Colophon, only if short and factual.

## Eliminated

- WebGPU Lab, GPU Workbench, Shader Notes, Interactive Engine Lab
- Command Palette
- Auto Tags, Related Recommendations, Metadata Assistant
- Explainable Search and Article TOC for this round
- XHS Photo Notes
