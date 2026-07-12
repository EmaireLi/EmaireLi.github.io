# Round 10 Project Understanding

## Current product

The plain HTML/CSS/JavaScript site now has a proof-first homepage, curated reading paths, mobile-accessible search and return-to-top behavior, project cases, a complete static article archive, JavaScript tag filters, and a public guestbook.

## State after Round 09

- All five posts exist in source HTML on the homepage and remain available without JavaScript or manifest fetch.
- JavaScript exact-tag filters work as enhancement, but selected state remains in memory only.
- A recruiter or reader cannot bookmark/share a focused `求职`, `技术`, `生活`, or `ACGN` archive view.
- Browser reload and back/forward do not preserve filter state.
- Article endings still use a generic archive fallback; contact still lacks an explicit public-message warning.
- The corpus remains too small for semantic recommendation, embeddings, RAG, or personalization claims.

## Round 10 constraints

- Select exactly one feature after fresh independent research and evaluation.
- Build on the static baseline; never make complete archive access depend on URL-state JavaScript.
- Preserve unrelated query parameters, `#blog`, button semantics, and invalid-state fallback if URL state is selected.
- Do not bundle article continuation, First Reads rewiring, contact copy, new taxonomy, or new visual systems.
- Keep changes compatible with plain HTML/CSS/JavaScript and the existing generator/editor/import workflows.
- Use deterministic checks and independent QA; record the continuing browser-policy limitation unless it clears legitimately.

## Open opportunity space

The leading hypothesis is Addressable Archive Topic Views. Alternatives still include a public contact intent/privacy guide, a restrained chronological article continuation, an article archive signature, or other repository-evidenced improvements. Research must challenge the leading hypothesis and reject decorative or falsely AI-branded work.
