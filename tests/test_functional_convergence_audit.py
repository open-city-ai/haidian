from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "tests" / "fixtures" / "functional_convergence"
SCRIPT = ROOT / "scripts" / "audit_functional_convergence.py"


def run_audit() -> dict:
    result = subprocess.run(
        [
            sys.executable,
            str(SCRIPT),
            "--candidate",
            str(FIXTURE / "candidate.json"),
            "--index",
            str(FIXTURE / "submissions-data.js"),
            "--repo-root",
            str(FIXTURE),
            "--no-network",
            "--max-proposals",
            "10",
            "--json",
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def by_key(result: dict, key: str) -> dict:
    return next(item for item in result["comparisons"] if item["proposal_key"] == key)


def test_complete_chain_is_evidence_not_score() -> None:
    result = run_audit()
    complete = by_key(result, "777/complete-chain")
    assert complete["classification"] == "complete_functional_chain"
    assert complete["coverage"] == {"matched_fields": 5, "total_fields": 5}
    assert complete["relation"] == "peer"
    assert result["limitations"]
    assert "originality score" in result["limitations"][0]


def test_theme_only_and_self_iteration_are_separate() -> None:
    result = run_audit()
    theme = by_key(result, "888/theme-only")
    self_iteration = by_key(result, "147228/self-iteration")
    assert theme["classification"] == "thematic_overlap"
    assert theme["coverage"]["matched_fields"] == 1
    assert theme["field_matches"]["public_task"]["matched"] is False
    assert theme["field_matches"]["public_task"]["negated_hits"]
    assert theme["field_matches"]["failure_outcome"]["matched"] is False
    assert self_iteration["classification"] == "complete_functional_chain"
    assert self_iteration["relation"] == "self_iteration"


def test_output_is_stable() -> None:
    assert run_audit() == run_audit()