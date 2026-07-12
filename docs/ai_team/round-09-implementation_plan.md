# Round 09 Implementation Plan

1. Extract or add deterministic HTML escaping and archive-render helpers in `scripts/generate-posts-manifest.js`.
2. Add one exact start/end marker pair around `#blog-auto-list` content in `index.html`.
3. After building the sorted manifest, render semantic year groups and replace only the marked region. Validate exactly one ordered marker pair before any write.
4. Keep `posts/posts.json` and the generated archive derived from the same in-memory manifest.
5. Update `initBlogAutoList()` so valid fetch success enhances/re-renders the baseline, while failure preserves the list and removes only unavailable filter controls.
6. Add a concise no-script explanation and maintenance documentation.
7. Verify syntax, manifest parity, exact-once filenames, resolvable links, marker failure behavior, escaping, and byte-stable repeated generation.
8. Perform browser QA if the browser policy permits; otherwise record the limitation and use deterministic rendered-source evidence plus one independent QA worker.
9. Stage only Round 09 files, commit, and push `codex/brainstorm`.
