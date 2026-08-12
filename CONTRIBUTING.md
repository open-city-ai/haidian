# Contributing to Haidian

This repository accepts two different kinds of contribution. Choose the path before opening a Pull Request; do not combine a city-design submission with repository code, documentation, data-policy, or website changes.

## 1. City-design submissions

Use the [submission Skill](skills/urban-design-ai-submission/SKILL.md), [formal submission guide](docs/formal-submission-guide.md), and [submission-directory instructions](submissions/README.md). A participant PR is limited to one package under:

```text
submissions/<your-github-login>/<proposal-slug>/
```

Run the render, finalize, persisted self-check, and participant preflight commands documented there. The default Pull Request template is the checklist for this path.

## 2. Repository code, documentation, tests, and website improvements

For a tool, documentation, test, taskbook, schema, or website improvement:

1. Search existing [Issues](https://github.com/open-city-ai/haidian/issues) and [Pull Requests](https://github.com/open-city-ai/haidian/pulls). Join the canonical discussion instead of creating a duplicate.
2. For a defect, include the affected path, expected and observed behavior, reproduction steps, and relevant logs or screenshots. For a policy-affecting change, document evidence, affected submissions, compatibility, and a migration plan before implementation.
3. Start a single-purpose branch from the latest `upstream/main`. Keep unrelated formatting, generated artifacts, or proposal edits out of the change.
4. Run the smallest relevant tests plus syntax or generator checks for every touched component. Run `git diff --check` before pushing.
5. Replace the submission-only PR checklist with a concise description of the scope, linked Issue, risk or compatibility boundary, exact commands run, and test results. Continue monitoring CI and review until the PR is merged or a concrete blocker is recorded.

Ordinary code, documentation, and test PRs use the trusted non-submission validation route. They do **not** run `participant_preflight.py`, and they must not be disguised as participant submissions. A green non-submission check means participant-package validation was not applicable; it is not a code-quality, security, policy, or maintainer approval.

## Maintainer-controlled boundaries

- Participant submission PRs may modify only their own package. They must not modify another participant's package or mix repository code and documentation into the same PR.
- `submissions-data.js` and `gallery-publication.json` are generated or curated publication state. Do not edit them from a participant or ordinary contributor branch; report drift in an Issue so a maintainer can regenerate and verify the publication chain.
- `.maintainer-review/` and `docs/reviews/` contain trusted review artifacts. Contributor-authored review output is not accepted as maintainer evidence.
- Changes to `.github/`, deployment or maintenance workflows, validation scripts, schemas, the brief/taskbook, and shared policy files require CODEOWNER review. Open an Issue first when the change alters permissions, trusted-base behavior, participant scope, scoring, eligibility, source authority, or migration of existing submissions.
- Do not broaden `data/source_registry.json`, official geometry, or another authority boundary solely because a source is publicly reachable. Record provenance, license, allowed use, limitations, and the intended formal/background status for maintainer review.
- Never include secrets, private correspondence, personal data, restricted planning material, unlicensed assets, build output, caches, or unrelated large files.

Repository protection is intentional. Do not bypass required reviews, trusted checks, branch/ruleset protection, participant scope, or fail-closed validation to make a PR mergeable.

## Suggested validation

Choose commands that match the change. Common examples are:

```bash
python3 -m unittest tests.<relevant_test_module> -v
python3 -m py_compile scripts/<changed_script>.py
python3 scripts/<generator>.py --check
node --check <changed_script>.js
git diff --check
```

If a required dependency or environment is unavailable, say which check could not run, what was verified instead, and how a maintainer can reproduce the remaining check. Do not claim that unrun tests passed.

## Discussion and review etiquette

Keep collaboration public, relevant, and auditable. Comment when you have new evidence, a decision, a reproducible result, or a concrete question; do not use Issues as CI logs or post repeated empty status updates. Respect a thread owner's request to pause or consolidate Agent replies. Credit sources and prior contributors, summarize accepted feedback in the PR or changelog, and state what remains uncertain.
