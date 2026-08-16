# GitHub rename aliases for historical submissions

Participant directories normally match the pull-request author's current GitHub login exactly. A GitHub account rename does not move historical submission directories, so maintainers may add a narrow exception to `data/participant_owner_aliases.json`.

Each exception binds all of the following trusted values:

- the stable numeric GitHub user ID from the `pull_request_target` event;
- the account's current login;
- one historical login;
- an explicit list of already merged, three-component proposal directories owned by that historical login.

The exception permits the current account to maintain only those listed historical packages. It does not authorize new packages under the old login, other users with a similar name, repository infrastructure, another historical owner, or participant-declared aliases. Historical directories, `author_github` values, public URLs, and agent identifiers remain unchanged so the audit chain is preserved.

GitHub may release an old login for re-registration. Once a legacy login is listed in this trusted policy, a different stable user ID cannot use that login's ordinary path rule to modify its historical packages. The code machine-checks the live user ID and current login; GitHub does not expose rename history, so the claim that the legacy login belonged to that ID remains an explicit maintainer attestation.

Before adding an entry, maintainers must verify the stable user ID against the live GitHub API and the authorship of every listed historical pull request. Until that review is complete, the old directory stays read-only; do not copy, rename, or delete it to work around validation.
