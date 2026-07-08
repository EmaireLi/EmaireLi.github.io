# Agent 8: Startup Product Manager

## Context

The best product strategy is to first improve hiring conversion and capability proof, then add content discovery and measurable optimization. Avoid features that are impressive but unclear in value.

## Feature Ideas

| Feature | User value | Fit for site | Technical implementation | Cost | Display effect | Risk |
|---|---|---|---|---|---|---|
| Hiring Signal Panel | Converts visitors by making fit obvious fast. | Homepage has content but no focused conversion panel. | Static block/profile data with direction, stack, strongest proof, contact. | Low | “Currently seeking/building/proof” panel. | Can over-commercialize the archive. |
| Project Case Study Pages | Turns projects into evaluable engineering outcomes. | Current project links are too shallow. | `projects/smartlabeling.html`, `projects/yomii.html`, homepage cards. | Medium | Product-doc plus technical-review pages. | Needs strong content and real details. |
| Capability Evidence Matrix | Connects skills to proof. | Posts/projects/search already exist. | `evidence.json` or static matrix with links and proof strength. | Low-medium | Recruiter can inspect by skill. | Too many skills feels like padding. |
| Personal Growth Timeline | Makes career transition coherent. | Site positioning already implies transition. | Static milestones reusing archive timeline styles. | Low | Java -> projects -> engine direction story. | Too much self-narrative. |
| Curated Reading Paths | Improves content consumption. | Archive has tags but no recommended entry. | `reading-paths.json` or static cards with selected posts. | Medium | Purpose-based paths: projects, technical, ACGN, life. | Needs periodic refresh. |
| Static Portfolio Snapshots | Shows what products look like. | Project links lack visual proof. | Add `assets/projects/` screenshots and galleries. | Low-medium | Project cards with screenshots and stack. | Image quality/performance. |
| Visitor Funnel Panel | Measures whether changes help. | Existing Worker/visitor count can be extended. | Anonymous event counters for project clicks/search/contact. | Medium | Admin conversion dashboard. | Privacy/data scope must be conservative. |
| Article Relationship Graph | Increases depth of reading. | Manifest has tags/search text. | Generate related posts by tag overlap in manifest script. | Medium | Related reading under posts. | Simple algorithm may be weak. |
| Static Resume Page | Gives a printable hiring artifact. | Personal site can host consistent resume. | `resume.html` with print CSS and project links. | Low | Resume link from Hiring Signal. | Must stay in sync with real resume. |

## Recommended Priority

1. Project Case Study Pages
2. Hiring Signal Panel
3. Capability Evidence Matrix
4. Curated Reading Paths
5. Visitor Funnel Panel

