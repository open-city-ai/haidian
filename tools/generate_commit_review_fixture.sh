#!/usr/bin/env bash
set -Eeuo pipefail

usage() {
  cat <<'EOF'
Usage: generate_commit_review_fixture.sh [COUNT] [OUTPUT_DIR] [BRANCH] [BASE_REPO]

Generate a self-contained Git history for automated review load tests.
COUNT defaults to 2000. BASE_REPO, when supplied, is copied as one synthetic
base commit and COUNT commits are added on top, matching a pull-request range.
The output contains repo/, commits.tsv, review-fixture.bundle, and summary.txt.
EOF
}

if [[ ${1:-} == "-h" || ${1:-} == "--help" ]]; then usage; exit 0; fi
count=${1-2000}
output_dir=${2:-commit-review-fixture}
branch=${3:-review-load-test}
base_repo=${4:-}

[[ $count =~ ^[1-9][0-9]*$ ]] || { printf 'error: COUNT must be a positive integer\n' >&2; exit 2; }
[[ ! -e $output_dir ]] || { printf 'error: output path already exists: %s\n' "$output_dir" >&2; exit 2; }
git check-ref-format --branch "$branch" >/dev/null 2>&1 || { printf 'error: invalid branch name: %s\n' "$branch" >&2; exit 2; }
if [[ -n $base_repo ]]; then
  git -C "$base_repo" rev-parse --verify HEAD >/dev/null
  [[ -z $(git -C "$base_repo" status --porcelain) ]] || { printf 'error: BASE_REPO worktree must be clean\n' >&2; exit 2; }
fi

mkdir -p "$output_dir"
output_dir=$(cd "$output_dir" && pwd)
cleanup_output() {
  status=${1:-$?}
  trap - ERR
  rm -rf -- "$output_dir"
  exit "$status"
}
trap cleanup_output ERR

if [[ -n $base_repo ]]; then
  mkdir "$output_dir/repo"
  repo="$output_dir/repo"
  git -C "$repo" init --quiet --initial-branch=fixture-base
  git -C "$repo" config user.name "Review Load Fixture"
  git -C "$repo" config user.email "fixture@example.invalid"
  git -C "$repo" config commit.gpgSign false
  git -C "$repo" config core.hooksPath "$repo/.git/disabled-hooks"
  git -C "$repo" config gc.auto 0
  git -C "$base_repo" archive --format=tar HEAD | tar -xf - -C "$repo"
  git -C "$repo" add --all --force
  GIT_AUTHOR_DATE='@1704067199 +0000' GIT_COMMITTER_DATE='@1704067199 +0000' \
    git -C "$repo" commit --quiet --no-gpg-sign -m 'fixture: record review base'
  base_sha=$(git -C "$repo" rev-parse HEAD)
  git -C "$repo" switch --quiet -c "$branch"
else
  mkdir "$output_dir/repo"
  repo="$output_dir/repo"
  git -C "$repo" init --quiet --initial-branch="$branch"
  base_sha=
fi
git -C "$repo" config user.name "Review Load Fixture"
git -C "$repo" config user.email "fixture@example.invalid"
git -C "$repo" config commit.gpgSign false
git -C "$repo" config core.hooksPath "$repo/.git/disabled-hooks"
git -C "$repo" config gc.auto 0

fixture_dir="$repo/.review-load-fixture"
mkdir "$fixture_dir"
printf '# Commit Review Fixture\n\nSynthetic review-load history.\n' > "$fixture_dir/README.md"
events="$fixture_dir/audit-events.jsonl"
width=${#count}
for ((index = 1; index <= count; index++)); do
  printf -v sequence "%0${width}d" "$index"
  printf '{"sequence":%d,"fixture":"review-load-test","record":"%s"}\n' "$index" "$sequence" >> "$events"
  git -C "$repo" add --force .review-load-fixture
  timestamp=$((1704067200 + index))
  GIT_AUTHOR_DATE="@$timestamp +0000" GIT_COMMITTER_DATE="@$timestamp +0000" \
    git -C "$repo" commit --quiet --no-gpg-sign -m "fixture: add audit event $sequence of $count"
done

if [[ -n $base_sha ]]; then range="$base_sha..HEAD"; expected_roots=0; else range=HEAD; expected_roots=1; fi
actual=$(git -C "$repo" rev-list --count "$range")
roots=$(git -C "$repo" rev-list --max-parents=0 --count "$range")
merges=$(git -C "$repo" rev-list --min-parents=2 --count "$range")
if [[ $actual -ne $count || $roots -ne $expected_roots || $merges -ne 0 || -n $(git -C "$repo" status --porcelain) ]]; then
  printf 'error: generated repository failed verification\n' >&2
  cleanup_output 1
fi

git -C "$repo" log --reverse --format='%H%x09%aI%x09%s' "$range" > "$output_dir/commits.tsv"
git -C "$repo" bundle create "$output_dir/review-fixture.bundle" "$branch" >/dev/null
git -C "$repo" bundle verify "$output_dir/review-fixture.bundle" >/dev/null
head=$(git -C "$repo" rev-parse HEAD)
cat > "$output_dir/summary.txt" <<EOF
repository=$repo
branch=$branch
base=${base_sha:-standalone}
commits=$actual
roots=$roots
merges=$merges
working_tree=clean
head=$head
bundle=$output_dir/review-fixture.bundle
inventory=$output_dir/commits.tsv
clone_command=git clone -b $branch $output_dir/review-fixture.bundle review-fixture-clone
EOF
trap - ERR
printf 'Generated %d commits in %s\nBundle: %s\nInventory: %s\n' "$actual" "$repo" "$output_dir/review-fixture.bundle" "$output_dir/commits.tsv"
