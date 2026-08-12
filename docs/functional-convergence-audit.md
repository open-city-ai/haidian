# Functional-convergence audit

`scripts/audit_functional_convergence.py` is an advisory pre-build check for
proposal authors. It helps answer one narrow question: does a candidate repeat
the same public function chain as an existing proposal, even when the title,
persona, weather, or presentation has changed?

The output is evidence for a human decision. It is not a plagiarism verdict,
an originality score, or an automatic rejection. A complete chain match means
pause, read the evidence, and mutate the public task or explain the difference
before doing more build work.

## Candidate contract

The candidate JSON supplies five required fields:

1. beneficiary or service recipient;
2. end-to-end public task;
3. spatial carrier or route;
4. named human decision or right;
5. public outcome after failure, refusal, or withdrawal.

Each field may contain `zh`, `en`, and an explicit `aliases` list. Aliases are
participant-provided terms. The script does not infer synonyms, call a hosted
model, or claim that a phrase match proves equivalence. `bounded_ai_role` is
optional and is reported for context only; it is not part of the five-field
complete-chain test.

## Sparse or blobless workflow

The catalog can be a local `submissions-data.js` snapshot while proposal text is
downloaded only when a comparison is made. The safe default caps each file and
the number of proposals. A fully local rehearsal is fail-closed with
`--no-network`:

```bash
python3 scripts/audit_functional_convergence.py \
  --candidate /path/to/candidate.json \
  --index /path/to/submissions-data.js \
  --repo-root /path/to/sparse-repo \
  --no-network --json
```

When a local proposal file is absent, omit `--no-network` to fetch only
`proposal.md` and `proposal.en.md` for that item from the public raw tree. The
result records exact repository paths, excerpts, relation (`peer` or
`self_iteration`), field coverage, classification, catalog truncation, and
limitations. Missing or negated phrases do not count as positive evidence.

The classification is deliberately small:

- `complete_functional_chain`: all five fields match;
- `functional_overlap`: three or four fields match;
- `thematic_overlap`: one or two fields match;
- `no_material_match`: no field matches.

The fixture and deterministic checks live in
`tests/test_functional_convergence_audit.py`. They cover a bilingual alias
case, a same-author iteration, and a thematic proposal whose negative claims
must not be mistaken for a positive failure outcome.