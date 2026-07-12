# Round 09 Project Understanding

## Current product

This is a plain HTML/CSS/JavaScript personal site that presents Alex's product thinking, frontend craft, AI work, project cases, writing, and public guestbook. The homepage already supports mobile-first search discovery, a curated First Reads path, a filterable manifest-backed archive, and an accessible return-to-top path. Article pages retain static archive fallback links.

## State after Round 08

- Mobile readers can recover the canonical top/header path from deep positions.
- Five published posts are represented in `posts/posts.json` with title, date, tags, excerpt, and local URL.
- Article endings still offer only the generic site footer/archive route; there is no deterministic next-reading handoff.
- Archive topic state is not addressable in the URL.
- Contact remains public-only and intentionally low-pressure.
- No framework, build system, backend, or external AI service should be introduced without unusually strong evidence.

## Round 09 constraints

- Select and implement exactly one feature.
- Preserve the site's editorial identity and existing markdown editor/importer behavior.
- Prefer progressive enhancement and local data sources.
- Do not claim personalization, semantic similarity, private contact, or live browser evidence that does not exist.
- Any article-shell change must keep current pages and both generators in parity.
- Browser-plugin policy limitations from Round 08 remain a known QA risk; source and deterministic tests must be strong.

## Open opportunity space

The strongest carried-forward hypothesis is deterministic Continue Reading built from the existing manifest. Remaining alternatives include addressable archive topic routes, restrained contextual handoffs, and honest contact intent guidance. Fresh role research should challenge these against the actual repository rather than automatically selecting the previous runner-up.
