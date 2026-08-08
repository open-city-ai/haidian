import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from schema_provenance_review import (  # noqa: E402
    format_similarity_warning,
    review_changed_schema_files,
)


def receipt_schema(drop_fields: bool = False) -> dict:
    required = [
        "schema_version",
        "receipt_id",
        "scenario_id",
        "status",
        "problem",
        "place",
        "data",
        "system",
        "human_gate",
        "rights",
        "operations",
        "evaluation",
        "handoff",
        "disclaimer",
    ]
    properties = {
        "problem": {"type": "object", "required": ["statement", "public_interest", "proposer_role", "evidence_refs"]},
        "place": {"type": "object", "required": ["geometry_ref", "geometry_status", "space_mode", "non_ai_path"]},
        "data": {"type": "object", "required": ["purpose", "minimum_fields", "personal_data", "retention", "deletion_verification"]},
        "system": {"type": "object", "required": ["deployment_status", "model_or_ruleset", "version", "artifact_hash", "tool_permissions", "forbidden_actions", "abstention_conditions"]},
        "human_gate": {"type": "object", "required": ["accountable_role", "reviewer_roles", "decision", "signed_at", "decision_diff"]},
        "rights": {"type": "object", "required": ["notice", "opt_out", "appeal", "accessibility", "deletion"]},
        "operations": {"type": "object", "required": ["service_window", "on_call_role", "fallback", "maintenance_owner", "cost_status", "exit_asset_plan"]},
        "evaluation": {"type": "object", "required": ["baseline_status", "candidate_metrics", "performance_results", "stop_conditions", "review_cycle"]},
        "handoff": {"type": "object", "required": ["from_role", "to_role", "output_object", "next_gate"]},
    }
    if drop_fields:
        for name, removed in {
            "problem": "proposer_role",
            "place": "space_mode",
            "data": "deletion_verification",
            "system": "model_or_ruleset",
            "human_gate": "decision_diff",
            "operations": "cost_status",
            "evaluation": "review_cycle",
        }.items():
            properties[name]["required"].remove(removed)
    return {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "required": required,
        "properties": properties,
    }


class SchemaProvenanceReviewTests(unittest.TestCase):
    def write_schema(self, root: Path, relative: str, schema: dict) -> None:
        path = root / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(schema, ensure_ascii=False), encoding="utf-8")

    def test_flags_issue_style_ordered_top_level_and_nested_subsets(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            trusted = Path(tmp) / "trusted"
            worktree = Path(tmp) / "worktree"
            peer = "submissions/Mentat-Uran/civic/visual/assets/relay-receipt.schema.json"
            candidate = "submissions/147228/open-pulse/visual/assets/open-pulse-relay-receipt.schema.json"
            self.write_schema(trusted, peer, receipt_schema())
            self.write_schema(worktree, candidate, receipt_schema(drop_fields=True))

            findings = review_changed_schema_files(worktree, trusted, [candidate])

        self.assertEqual(1, len(findings))
        self.assertEqual(candidate, findings[0].candidate_path)
        self.assertEqual(peer, findings[0].peer_path)
        self.assertEqual(14, findings[0].top_level_required_count)
        self.assertGreaterEqual(len(findings[0].nested_paths), 3)
        warning = format_similarity_warning(findings[0])
        self.assertIn("not an automated plagiarism", warning)
        self.assertIn("licence review required", warning)

    def test_does_not_flag_a_partial_generic_overlap(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            trusted = Path(tmp) / "trusted"
            worktree = Path(tmp) / "worktree"
            peer = "submissions/peer/design/visual/assets/contract.schema.json"
            candidate = "submissions/alice/design/visual/assets/receipt.schema.json"
            self.write_schema(
                trusted,
                peer,
                {"type": "object", "required": ["id", "status", "data"], "properties": {}},
            )
            self.write_schema(worktree, candidate, receipt_schema(drop_fields=True))

            findings = review_changed_schema_files(worktree, trusted, [candidate])

        self.assertEqual([], findings)

    def test_does_not_compare_schemas_within_the_same_submission(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            trusted = Path(tmp) / "trusted"
            worktree = Path(tmp) / "worktree"
            peer = "submissions/alice/design/visual/assets/old.schema.json"
            candidate = "submissions/alice/design/visual/assets/new.schema.json"
            self.write_schema(trusted, peer, receipt_schema())
            self.write_schema(worktree, candidate, receipt_schema(drop_fields=True))

            findings = review_changed_schema_files(worktree, trusted, [candidate])

        self.assertEqual([], findings)


if __name__ == "__main__":
    unittest.main()
