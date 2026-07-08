# Agent 6: Indie Builder

## Context

The strongest indie-builder direction is a maintained personal archive plus product/learning artifacts. Prioritize low-dependency, maintainable features that compound over time.

## Feature Ideas

| Feature | User value | Fit for site | Technical implementation | Cost | Display effect | Risk |
|---|---|---|---|---|---|---|
| Project Case Card Upgrade | Visitors quickly understand products and technical maturity. | Projects currently have low information density. | Rich cards in `index.html`; later extract to JSON. | Low-medium | Compact portfolio instead of plain links. | Manual maintenance. |
| Article TOC + Reading Progress | Improves long-form reading. | Existing posts include long essays. | Scan headings, generate TOC, progress indicator. | Medium | More mature article UX. | Mobile layout complexity. |
| Now Page/Section | Shows current direction and activity. | Archive site needs a current-state signal. | Static `now.html` or homepage section with update date. | Low | Live-feeling personal status board. | Gets stale if not updated. |
| Learning Route / Tech Map | Strengthens Java-to-engine narrative. | Current subtitle already sets this direction. | Static timeline/rail linked to posts/projects. | Low-medium | Clear learning route. | Must stay real and concise. |
| XHS Photo Notes | Reuses local XHS image assets. | Existing import pipeline and assets support it. | Extract XHS image posts into grid index. | Medium | Visual archive/photo notes view. | Image loading performance. |
| Command Palette | Adds polished dev-tool style navigation. | Search manifest already exists. | `Ctrl/Cmd+K` modal over posts/projects/nav. | Medium | Fast keyboard navigation. | Accessibility complexity. |
| Changelog | Shows continuous building. | Recent commits are product-like improvements. | Static changelog list or JSON; homepage shows recent items. | Low | Indie-builder “shipping” signal. | Can become noise. |
| Guestbook Experience Upgrade | Improves contact reliability. | Existing Worker can fail or be unconfigured. | Better empty/offline states; optional static featured messages. | Low | More stable Contact section. | Static/dynamic message semantics. |
| Article Collections | Organizes scattered posts by series. | Tags filter but do not express reading order. | Add optional `series` metadata in manifest. | Medium | Collections for career, ACGN, tools. | Manifest changes and maintenance. |
| Colophon | Explains site construction. | README exists but public site lacks this story. | Static `colophon.html` with stack/workflow/design choices. | Low | Site becomes a portfolio artifact. | Low value for casual visitors. |

## Recommended Priority

1. Project Case Card Upgrade
2. Article TOC + Reading Progress
3. Learning Route / Tech Map
4. XHS Photo Notes
5. Changelog / Now

