# Round 11 Implementation Plan

1. Add one static disclosure in `.guestbook-copy` before the compose control and rename the button.
2. Reference the disclosure from both compose button and form while retaining existing controls/expanded semantics.
3. Add a narrowly scoped quiet helper style that wraps cleanly at narrow widths and does not resemble an error.
4. Add a deterministic guestbook disclosure verifier: unique/resolved id, DOM order, both references, factual public wording, and four-way 100-character parity across copy, textarea, client, and Worker.
5. Run syntax, archive, manifest, diff, and independent QA gates; perform browser QA only if the policy restriction clears legitimately.
6. Commit and push `codex/round-11`, then reassess stop conditions.
