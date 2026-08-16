import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from manifest_schema import legacy_role_findings, schema_errors  # noqa: E402
from validate_submission import ValidationReport, validate_manifest_file  # noqa: E402


def manifest(schema_version="0.1.0", *, required=True):
    item = {
        "path": "visual/assets/evidence_data.json",
        "role": "quantitative_model_backtest",
    }
    if required:
        item["required"] = True
    return {
        "schema_version": schema_version,
        "package_id": "sample-package",
        "project_id": "centennial-jingzhang-ai-belt",
        "site_package_version": "0.1.0",
        "submission_stage": "formal",
        "submission_type": "ai_agent",
        "agent": {
            "agent_id": "sample-agent",
            "agent_name": "Sample Agent",
            "model": "Model 1",
        },
        "generated_at": "2026-08-10T00:00:00Z",
        "files": [item],
        "validation_claim": {
            "self_checked": True,
            "known_blockers": [],
            "readiness_contract": "persisted-self-check-v1",
        },
    }


class ManifestSchemaTests(unittest.TestCase):
    def test_canonical_role_and_known_claim_metadata_are_valid(self):
        self.assertEqual(schema_errors(manifest()), [])

    def test_versioned_extension_namespace_is_valid(self):
        payload = manifest("0.2.0")
        payload["files"][0]["role"] = "evidence_data"
        payload["validation_claim"]["extensions"] = {
            "x-readiness": {"schema_version": "1.0", "data": {"status": "local-only"}}
        }
        self.assertEqual(schema_errors(payload), [])

    def test_v02_patch_versions_use_the_forward_contract(self):
        payload = manifest("0.2.1")
        payload["files"][0]["role"] = "evidence_data"
        self.assertEqual(schema_errors(payload), [])
        payload["files"][0].pop("required")
        errors = schema_errors(payload)
        self.assertTrue(any("required" in error.lower() for error in errors))

    def test_v02_accepts_multimodal_roles_from_published_contract(self):
        payload = manifest("0.2.0")
        payload["files"] = [
            {
                "path": f"assets/media/sample-{role}.bin",
                "role": role,
                "required": True,
            }
            for role in ("video", "audio", "media_poster", "caption_track", "transcript")
        ]
        self.assertEqual(schema_errors(payload), [])

    def test_unknown_claim_fields_are_rejected(self):
        payload = manifest("0.2.0")
        payload["validation_claim"]["unreviewed_status"] = "ready"
        errors = schema_errors(payload)
        self.assertTrue(
            any(
                "additional properties" in error.lower()
                and "unreviewed_status" in error
                for error in errors
            ),
            errors,
        )

    def test_unknown_readiness_contract_is_rejected_independently(self):
        payload = manifest("0.2.0")
        payload["validation_claim"]["readiness_contract"] = "unknown-contract"
        errors = schema_errors(payload)
        self.assertTrue(
            any("readiness_contract" in error for error in errors),
            errors,
        )

    def test_v02_role_extension_requires_detail(self):
        payload = manifest("0.2.0")
        payload["files"][0]["role"] = "other"
        errors = schema_errors(payload)
        self.assertTrue(any("role_detail" in error for error in errors))
        payload["files"][0]["role_detail"] = "quantitative_model_backtest"
        self.assertEqual(schema_errors(payload), [])

    def test_v02_rejects_unregistered_role_token(self):
        payload = manifest("0.2.0")
        payload["files"][0]["role"] = "quantitative_model_backtest"
        errors = schema_errors(payload)
        self.assertTrue(any("role" in error for error in errors))

    def test_legacy_manifest_can_omit_required_metadata(self):
        self.assertEqual(schema_errors(manifest(required=False)), [])

    def test_strict_manifest_requires_required_metadata(self):
        errors = schema_errors(manifest("0.2.0", required=False))
        self.assertTrue(any("required" in error.lower() for error in errors))

    def test_role_must_be_lower_snake_case(self):
        payload = manifest()
        payload["files"][0]["role"] = "Figure-1"
        errors = schema_errors(payload)
        self.assertTrue(any("role" in error for error in errors))

    def test_legacy_role_audit_distinguishes_typo_from_schema_gap(self):
        payload = manifest()
        payload["files"] = [
            {"path": "report/proposal.en.html", "role": "report"},
            {"path": "risk.json", "role": "risk"},
        ]

        findings = legacy_role_findings(payload)

        self.assertEqual(
            findings,
            [
                {
                    "classification": "author_typo_candidate",
                    "path": "report/proposal.en.html",
                    "role": "report",
                    "suggested_role": "rendered_proposal_html",
                },
                {
                    "classification": "schema_gap_or_extension",
                    "path": "risk.json",
                    "role": "risk",
                    "suggested_role": "other",
                    "suggested_role_detail": "risk",
                },
            ],
        )

    def test_cli_reports_non_array_legacy_files_without_crashing(self):
        for files in (None, 1, {"path": "manifest.json"}):
            with self.subTest(files=files):
                with tempfile.TemporaryDirectory() as tmp:
                    root = Path(tmp)
                    manifest_path = root / "submissions" / "alice" / "sample" / "manifest.json"
                    manifest_path.parent.mkdir(parents=True)
                    manifest_path.write_text(
                        json.dumps({"schema_version": "0.1.0", "files": files}),
                        encoding="utf-8",
                    )

                    completed = subprocess.run(
                        [
                            sys.executable,
                            str(ROOT / "scripts" / "validate_manifest_schema.py"),
                            "--repo-root",
                            str(root),
                            "--all",
                            "--strict",
                            "--json",
                        ],
                        capture_output=True,
                        text=True,
                        check=False,
                    )

                    self.assertEqual(completed.returncode, 1, completed.stderr)
                    report = json.loads(completed.stdout)
                    self.assertEqual(report["invalid"], 1)
                    self.assertEqual(report["results"][0]["legacy_role_findings"], [])
                    self.assertTrue(
                        any("files" in error for error in report["results"][0]["errors"])
                    )

    def test_v02_schema_failure_is_blocking_in_submission_validator(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = root / "submissions" / "alice" / "sample"
            proposal.mkdir(parents=True)
            (proposal / "manifest.json").write_text(
                json.dumps(manifest("0.2.0", required=False)), encoding="utf-8"
            )
            report = ValidationReport()
            validate_manifest_file(report, root, "submissions/alice/sample")
            self.assertFalse(report.ok)
            self.assertTrue(any("published schema blocking" in error for error in report.errors))

    def test_new_v01_manifest_cannot_bypass_migration_boundary(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = root / "submissions" / "alice" / "sample"
            proposal.mkdir(parents=True)
            manifest_path = "submissions/alice/sample/manifest.json"
            (proposal / "manifest.json").write_text(
                json.dumps(manifest()), encoding="utf-8"
            )
            report = ValidationReport(strict_manifest_paths={manifest_path})
            validate_manifest_file(report, root, "submissions/alice/sample")
            self.assertFalse(report.ok)
            self.assertTrue(any("new manifests must adopt" in error for error in report.errors))

    def test_published_schema_is_valid_json(self):
        schema = json.loads(
            (ROOT / "brief/site-package/schemas/manifest.schema.json").read_text(encoding="utf-8")
        )
        self.assertEqual(schema["$schema"], "https://json-schema.org/draft/2020-12/schema")
