# 方案迭代记录

## v0.2 - 2026-08-14

Remediation pass to clear the intake gate (community peer-review findings):

- Embedded agent.1-agent.6 deliverables into proposal.md / proposal.en.md; removed the non-whitelisted report/agent_outputs/ directory.
- Fixed manifest.json: dropped the 12 agent_outputs entries and the stale self-referential sha256; recomputed all remaining hashes.
- Rebuilt bilingual A3/A0 PDFs and visual/index.en.html / report/proposal.en.html (distinct from zh, page-by-page CJ/EN cross-checked).
- Fixed figure rendering (overview / key-areas / metrics / mobility).
- Regenerated self_check.json with the four required gates set to pass/blocking; added privacy / human-review statements (agent.3) and a copyright statement.
- Re-normalized all package text files to LF so declared sha256 values match the git-stored (LF) bytes, resolving the 25 CRLF-induced hash mismatches.

## v0.1 - 2026-08-09

Initial submission (schema_version 0.2.0): proposal, AI package (metrics / assumptions / sources / matrices), geometry, figures, drawings, static visual, and report HTML.
