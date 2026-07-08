# Agent 7: UX Designer

## Context

The site has a strong archive tone and functional components. UX improvements should improve scanning, accessibility, and conversion without turning the site into a marketing page.

## Feature Ideas

| Feature | User value | Fit for site | Technical implementation | Cost | Display effect | Risk |
|---|---|---|---|---|---|---|
| Recruiter Snapshot | Visitors understand identity, direction, and next links in 10 seconds. | Current homepage is archive-like. | Static block after welcome with direction, stack, and key links. | Low | Clear first-page CTA. | Resume-like copy can feel unnatural. |
| Project Case Cards | Makes project value scannable. | Projects section is too sparse. | Replace list with cards containing role, stack, highlights, links. | Medium | Mini portfolio on homepage. | Needs real content. |
| Curated Reading Paths | Helps new visitors choose a route. | Archives have tags but no guided paths. | Path cards linking to tags or triggering archive filters. | Low-medium | More intentional archive discovery. | Needs maintenance. |
| Article TOC + Reading Progress | Helps long-form readers navigate. | Long posts need better reading support. | Generate TOC from headings; progress bar; accessible controls. | Medium | Mature article page behavior. | Mobile placement must be careful. |
| Archive Insights | Gives quick sense of archive activity and themes. | Manifest has dates/tags. | Render counts, span, popular tags, simple mini chart. | Medium | “Long-term record” signal. | Current post count is small. |
| Accessible Command Palette | Speeds navigation for keyboard users. | Existing search can be enhanced. | `Cmd/Ctrl+K` modal with focus trap, keyboard navigation, posts/nav data. | Medium | Polished power-user search. | A11y must be correct. |
| Now Section | Shows current interests and availability. | About is static. | Static block with current focus, topics, update date. | Low | More alive and contactable. | Stale content hurts trust. |
| Related Work Links | Connects posts, projects, and accounts. | Current content graph is weak. | Same-tag post recommendations and project links. | Medium | Deeper exploration paths. | Recommendations can repeat or be irrelevant. |
| Personal Milestone Timeline | Makes growth path easy to scan. | Archive/timeline style already exists. | Static milestone list reusing archive styles. | Low-medium | Personal story with evidence links. | Avoid low-value life-log nodes. |
| Contact Intent Guide | Makes leaving a message easier. | Guestbook exists but has little prompt support. | Intent chips that adjust placeholder or prefill a short starter. | Low-medium | Friendlier contact UX. | Do not over-automate message text. |

## Recommended Priority

1. Recruiter Snapshot
2. Project Case Cards
3. Article TOC + Reading Progress
4. Curated Reading Paths
5. Contact Intent Guide

