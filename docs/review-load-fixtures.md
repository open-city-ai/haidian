# Review-load fixtures

Use `tools/generate_commit_review_fixture.sh` to exercise automated review
systems with a deterministic linear history. The default creates 2,000 commits
in an isolated repository; it does not modify the Haidian checkout.

```bash
tools/generate_commit_review_fixture.sh 2000 ./review-fixture review/load-test
```

To model a pull request, provide a clean local repository as the fourth
argument. Its tracked files become one synthetic base commit, followed by the
requested commit range:

```bash
tools/generate_commit_review_fixture.sh 2000 ./review-fixture review/load-test /path/to/base-repository
```

The generated `summary.txt` records the base and head SHAs. `commits.tsv` is an
oldest-first inventory, and `review-fixture.bundle` can be imported without a
network connection using the `clone_command` from the summary.