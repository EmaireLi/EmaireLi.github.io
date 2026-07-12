# Feature Decision — Round 09

## Decision

Implement **Static Archive Baseline** only.

Both evaluators ranked it first. It repairs the strongest contradiction in the current site: a homepage presented as a durable archive contains an empty canonical archive until JavaScript and a manifest fetch both succeed.

## Expected impact

All published posts remain linked and readable from the homepage under no-JavaScript, late-initialization, and fetch-failure conditions. With JavaScript available, the existing filters continue enhancing the same content.

## Delivery boundary

- Extend the existing manifest generator; do not add a build system or dependency.
- Give the generator ownership only between exact archive markers in `index.html`.
- Generate the same semantic year/entry classes already used by runtime rendering.
- Preserve static entries if runtime fetch fails.
- Document ownership and verification.
- Do not add addressable tag URLs, new archive UI, continuation cards, or contact changes.

## Key risk

Generator mutation of a hand-authored homepage can corrupt content or create duplicates. Exact marker validation, write-after-validation, escaping, parity checks, and idempotency are release gates.
