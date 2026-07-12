# Static Archive Baseline Design

## Problem

The complete homepage archive is currently an empty list in source and depends on JavaScript plus a successful fetch. This contradicts the site's durable-archive promise and leaves only four curated First Reads links when enhancement fails.

## Design

The existing manifest generator becomes the single pipeline for two outputs produced from one sorted in-memory array: `posts/posts.json` and the marked inner content of `#blog-auto-list` in `index.html`. The generated HTML reuses the current semantic structure and CSS classes, so JavaScript enhancement does not create a second visual system.

```text
post HTML files
      ↓
buildManifestEntry + deterministic sort
      ↓
      ├── posts/posts.json
      └── exact marked archive block in index.html
```

## Ownership contract

`index.html` contains exactly one `ARCHIVE:START` and one `ARCHIVE:END` comment inside the canonical list. The generator verifies uniqueness and ordering before computing a replacement and writes only after every validation passes. Human edits belong outside the markers.

## Runtime behavior

- Baseline: all posts are ordinary local links grouped by year with dates, excerpts, and tags.
- JavaScript success: existing exact-tag controls appear and the list is deterministically re-rendered from the validated manifest.
- JavaScript or fetch failure: baseline entries remain. The status states that filtering is unavailable; no useful archive content is cleared.
- No script: a short `<noscript>` note explains that the full archive is present but filters require JavaScript.

## Accessibility and visual behavior

The baseline uses the same list, heading, time, link, paragraph, and tag semantics already styled by the site. There is no new interaction before JavaScript. Filters remain buttons with current `aria-pressed` behavior after enhancement.

## Failure model

Generation aborts on missing, duplicate, or reversed markers. User-derived text is escaped. Filenames are encoded for local hrefs. A second run must produce no diff, and every manifest filename must occur once in the generated block.
