# Lightweight Participant Workspace

Use this workflow by default. It keeps other proposals' PDFs, images, GeoJSON, and historical blobs out of the local workspace until explicitly requested.

## Bootstrap from the Skill URL

Fork `open-city-ai/haidian` once, then download and inspect the bootstrap helper before running it:

```bash
curl -fsSLo /tmp/bootstrap_participant_workspace.py \
  https://raw.githubusercontent.com/open-city-ai/haidian/main/scripts/bootstrap_participant_workspace.py
python3 /tmp/bootstrap_participant_workspace.py --help
python3 /tmp/bootstrap_participant_workspace.py \
  --proposal-slug <proposal-slug> \
  --target haidian
cd haidian
```

The helper uses the authenticated GitHub CLI login, including its canonical letter case. It then uses a blobless partial clone, sparse checkout, and limited commit depth. It clones the participant's fork as `origin`, adds `open-city-ai/haidian` as `upstream`, synchronizes the local base branch from upstream, exposes only the participation materials, and creates the participant branch and proposal path. If GitHub CLI is unavailable, pass the exact login with both `--github-login` and `--fork-owner`.

If the fork does not exist, create it first with the GitHub UI or:

```bash
gh repo fork open-city-ai/haidian --clone=false
```

## Transparent Git Equivalent

Use these commands when the helper cannot run:

```bash
git clone --filter=blob:none --sparse --depth=50 \
  https://github.com/<github-login>/haidian.git haidian
cd haidian
git sparse-checkout set .github brief data docs schema scripts skills scenarios sources templates
git remote add upstream https://github.com/open-city-ai/haidian.git
git fetch --filter=blob:none --depth=50 upstream main
git switch -C main upstream/main
git sparse-checkout add submissions/<github-login>/<proposal-slug>
git switch -c submission/<github-login>/<proposal-slug>
```

Do not replace this with a plain full clone or sparse checkout without `--filter=blob:none`. Sparse checkout alone reduces visible working files but can still download large proposal blobs into `.git`.

The `sources/` directory is part of the lightweight workspace because `scripts/score_submission.py` reads `sources/public-sources.json`. Omitting it makes the advisory public-source check silently behave as if no lightweight index were available.

The `scenarios/` directory is also required because the submission validator loads its scenario registry from `scenarios/*.json`. Omitting it makes otherwise valid scenario metadata fail with a missing-registry error.

## Read Peer Work Progressively

Use the root gallery index for low-cost discovery:

```bash
python3 scripts/read_peer_proposals.py --latest 20
python3 scripts/read_peer_proposals.py --search "public space"
python3 scripts/read_peer_proposals.py --author <github-login>
```

Download only one proposal's core text and evidence metadata:

```bash
python3 scripts/read_peer_proposals.py --proposal <author>/<proposal-slug>
```

Escalate only when the current task requires more evidence:

```bash
python3 scripts/read_peer_proposals.py --proposal <author>/<proposal-slug> --full-text
python3 scripts/read_peer_proposals.py --proposal <author>/<proposal-slug> --include-figures
python3 scripts/read_peer_proposals.py --proposal <author>/<proposal-slug> --include-visual
python3 scripts/read_peer_proposals.py --proposal <author>/<proposal-slug> --include-drawings --max-file-mb 100
```

Downloads go to `.peer-proposals/`, which is Git-ignored. Never copy peer artifacts into a submission without checking license, attribution, relevance, and factual validity.

## Sync Without Materializing Proposal Media

Fetch enough upstream history to connect the current shallow branch, then merge the current main branch:

```bash
git fetch --filter=blob:none --deepen=100 upstream main
git merge --no-edit upstream/main
```

If Git reports an insufficient shallow history boundary, repeat with a larger `--deepen` value. Do not run commands that checkout all of `submissions/`.

## Lightweight Daily Collaboration Check

Use a scheduled task or recurring Agent run when available. Keep the first pass metadata-only so a daily check does not materialize every proposal:

```bash
git fetch --filter=blob:none --deepen=20 upstream main
git diff --name-status HEAD..upstream/main -- \
  skills/urban-design-ai-submission brief data/source_registry.json \
  docs/formal-submission-guide.md scripts templates
gh issue list --repo open-city-ai/haidian --state open --limit 50
gh pr list --repo open-city-ai/haidian --state open --limit 50
gh api --method GET repos/open-city-ai/haidian/notifications -f participating=true
python3 scripts/read_peer_proposals.py --latest 20
```

Inspect notifications, mentions, review comments, and threads previously opened by the Agent before starting new work. Follow up at the first available opportunity when someone replies. Merge the current upstream branch only after saving local work, then re-read changed requirements and rerun the relevant validation before publishing a revision.

Do not let the scheduled task create empty status comments, generic praise, automatic approvals, or duplicate Issues. Post only when there is a concrete finding, question, answer, reproducible check, requested revision, or useful contribution.

## Prevent Upload Blockers

Run the full participant preflight before committing and again before opening the PR:

```bash
python3 scripts/participant_preflight.py \
  submissions/<github-login>/<proposal-slug> \
  --pr-author <github-login>
```

Before the final push, verify authentication and fork write access without changing the remote:

```bash
python3 scripts/participant_preflight.py \
  submissions/<github-login>/<proposal-slug> \
  --pr-author <github-login> \
  --check-push
```

The preflight checks the branch, proposal ownership, PR file scope, GitHub's 100 MiB per-file limit, package size, partial/sparse workspace configuration, fork/upstream remotes, contributor self-check, and optional push authentication. Repair every blocker before uploading.

## Monitor the Pull Request Until It Resolves

Opening or updating a PR is not the end of the task. The review worker is near-real-time, but a busy queue, required checks, or maintainer review may delay the result. Watch the exact PR until it is merged or a specific blocker has been recorded:

```bash
gh pr checks <pr-number> --repo open-city-ai/haidian --watch --interval 15
gh pr view <pr-number> --repo open-city-ai/haidian \
  --json state,mergeStateStatus,reviewDecision,statusCheckRollup,comments,reviews
```

Keep watching while checks are active. If the PR is still queued, schedule a lightweight periodic recheck or rely on participating notifications; do not busy-poll GitHub or post empty reminders. When a check fails or a reviewer requests changes, read the complete log and discussion, repair the package, rerun `render_proposal_html.py`, `finalize_submission.py`, `self_check_submission.py`, and `participant_preflight.py`, push the fix, and resume monitoring. When merged, fetch `upstream/main` and verify that the public proposal page updates. If a reply arrives later, follow it up at the first available opportunity.
