# Round 11 Project Understanding

## Current product after the main merge

The site now has proof-led navigation, project cases, curated reading paths, mobile search and return paths, a generated static archive, exact-tag filtering with addressable history state, and a public guestbook. Rounds 01–10 are merged into remote `main` at `9b9ec0d`; Round 11 begins from that deployed checkpoint on `codex/round-11`.

## Remaining evidenced gaps

- Contact invites visitors to compose a guestbook message but does not say before typing that submissions are public.
- There is no private recruiting/contact endpoint; the product must not imply one.
- Article endings still provide only a generic archive route and do not explain archive context for direct landings.
- Only five posts exist, so chronological continuation is possible but semantic related-content claims remain unsupported.
- Several external-account links on article shells may not be as specific as the homepage; promoting them requires destination verification.
- The in-app browser's local error-page URL policy has repeatedly prevented live interaction QA; this is a tooling constraint, not permission to claim visual evidence.

## Round 11 constraints

- Select exactly one feature after independent research and evaluation.
- Preserve the warm, personal tone; avoid turning Contact or article endings into a recruiter funnel.
- Make only factual claims supported by current UI/API behavior.
- Do not add a private endpoint, new account, response promise, moderation promise, or availability claim.
- Keep editor and XHS importer behavior intact unless the chosen feature explicitly requires shell parity.
- Prefer static progressive behavior and deterministic QA.

## Open opportunity space

Leading hypotheses are a concise Public Guestbook Safety Note, a quiet Article Archive Signature, or a single transparent chronological continuation. Research should also inspect whether a more urgent accessibility or trust gap exists and should reject decorative, false-AI, or corpus-inflating work.
