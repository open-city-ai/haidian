# Review-load fixtures

Use `tools/generate_commit_review_fixture.sh` to exercise automated review
systems with a deterministic linear history. The default creates 2,000 commits
in an isolated repository. Place the output outside the Haidian checkout to
keep generated files out of `git status`:

```bash
tools/generate_commit_review_fixture.sh 2000 /tmp/haidian-review-fixture review/load-test
```

To model a pull request, provide a clean local repository as the fourth
argument. Its tracked files become one synthetic base commit, followed by the
requested commit range:

```bash
tools/generate_commit_review_fixture.sh 2000 /tmp/haidian-review-pr-fixture review/load-test /path/to/base-repository
```

The generated `summary.txt` records the head SHA and, in pull-request mode, the
base SHA. Standalone fixtures use `base=standalone`. `commits.tsv` is an
oldest-first inventory, and `review-fixture.bundle` can be imported without a
network connection using the `clone_command` from the summary. Failed runs
remove their partial output directory so the same command can be retried.