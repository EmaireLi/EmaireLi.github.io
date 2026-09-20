# Reading layout verification

- Browser preview: homepage at 320, 390, 768, 1440 and 1920 CSS px; no document horizontal overflow. Desktop content remains bounded at large widths.
- At 390 x 844: first archive title is approximately y=643 (previously y=1029); article title y=125 (previously y=571).
- Article preview at 320, 390, 768, 1440 and 1920 CSS px. Desktop article shell is capped at 860 px; mobile becomes a single column.
- Search disclosure opens and closes via native details; searching 京吹 returns one result. Result panel stays inside 320/768/1920 viewports.
- ACGN filter returns one article; resetting to 全部 restores archive.
- Image article Next button advances counter to 2 / 10, with no document overflow.
- Editor entry, title/body inputs and Markdown preview render with existing layout. Only export HTML shell and script cache version changed.
- All six existing post/template article elements match HEAD byte-for-byte. Manifest remains unchanged.
- Existing static archive, filter-state and guestbook checks pass.
- Deployment packaging now includes reading-layout.css, projects/ and archive-filter-state.js.
- the-loop recording unavailable: installed watch-skill reports loop.missing_dependency (Playwright not installed). Visual and interaction checks used the connected browser; no real-phone Safari or video-based motion validation claimed.
