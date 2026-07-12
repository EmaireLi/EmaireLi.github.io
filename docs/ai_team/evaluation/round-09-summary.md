# Round 09 Evaluation Summary

## Independent outcome

Both evaluators selected **C1 Static Archive Baseline**.

| Candidate | Product rank / score | Delivery rank / score | Reconciled judgment |
| --- | --- | --- | --- |
| C1 Static Archive Baseline | 1 / 8.70 | 1 / 8.98 | Select |
| C2 Addressable Archive Topic Views | 2 / 8.48 | 5 / 7.98 | Valuable after a resilient baseline exists |
| C3 Transparent Chronological Continuation | 4 / 7.75 | 4 / 8.10 | Honest but lower leverage with five posts |
| C4 Public Contact Intent Guide | 3 / 8.00 | 2 / 8.70 | Strong trust hygiene, limited engineering depth |
| C5 Article Closing Signature | 5 / 7.45 | 3 / 8.63 | Safe but modest incremental value |
| C6 Longform Article Contents Navigator | 6 / 5.43 | 6 / 7.45 | Disqualified by absent stable heading structure |

## Shared gates

- The generator must require exactly one start marker and one end marker and fail before writing on missing, duplicate, or reversed markers.
- A second manifest-generation run must be byte-stable.
- Every manifest post must appear exactly once in the baseline, in manifest order, with escaped content and a resolvable local link.
- Runtime enhancement may replace the baseline only after a valid manifest arrives.
- Fetch failure must preserve the static archive instead of clearing useful content.
- Round 09 must not add URL-addressable filters, article continuation, contact copy, or new visual systems.
