# Round 10 Implementation Plan

1. Add a small dependency-free URL-state helper that also exports CommonJS functions for deterministic Node fixtures.
2. Parse initial state only after canonical manifest tags are known; render valid exact state or 全部.
3. Canonicalize invalid/duplicate/empty/全部 initial state at most once; add `#blog` for a valid direct tag without scrolling.
4. On actual filter-button changes, render, announce the exact tag/count once, and `pushState` a URL that changes only `tag` and sets `#blog`.
5. On `popstate`, render from the URL without URL/focus/scroll mutation.
6. Add fixtures for Chinese/ASCII, percent encoding, plus, invalid/empty/duplicate keys, unrelated repeated parameters, no-op changes, and history call discipline.
7. Preserve Round 09 static baseline/fetch-failure contracts and run existing project checks.
8. Perform independent QA and browser QA if the policy restriction clears legitimately; otherwise record the limitation.
9. Commit and push only Round 10 files.
