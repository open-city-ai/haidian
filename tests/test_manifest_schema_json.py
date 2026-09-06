import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "validate_manifest_schema.py"


def manifest(extension_data: object) -> dict:
    return {
        "schema_version": "0.2.0",
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
        "files": [
            {"path": "evidence.json", "role": "evidence_data", "required": True}
        ],
        "validation_claim": {
            "self_checked": True,
            "known_blockers": [],
            "readiness_contract": "persisted-self-check-v1",
            "extensions": {
                "x-test": {"schema_version": "1.0", "data": extension_data}
            },
        },
    }


class ManifestSchemaJsonTests(unittest.TestCase):
    def run_audit(self, raw_manifest: str) -> subprocess.CompletedProcess[str]:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "manifest.json").write_text(raw_manifest, encoding="utf-8")
            return subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--repo-root",
                    str(root),
                    "--manifest",
                    "manifest.json",
                    "--strict",
                    "--json",
                ],
                cwd=ROOT,
                check=False,
                capture_output=True,
                text=True,
            )

    def test_nonstandard_numeric_constants_are_invalid_json(self):
        marker = '"NONSTANDARD_CONSTANT"'
        base = json.dumps(manifest("NONSTANDARD_CONSTANT"))

        for constant in ("NaN", "Infinity", "-Infinity"):
            with self.subTest(constant=constant):
                result = self.run_audit(base.replace(marker, constant))
                payload = json.loads(result.stdout)

                self.assertEqual(result.returncode, 1, result.stdout)
                self.assertEqual(payload["valid"], 0)
                self.assertEqual(payload["invalid"], 1)
                self.assertFalse(payload["results"][0]["valid"])
                self.assertTrue(
                    any(constant in error for error in payload["results"][0]["errors"]),
                    payload["results"][0]["errors"],
                )

    def test_standard_extension_data_remains_valid(self):
        result = self.run_audit(json.dumps(manifest({"score": 1.5})))
        payload = json.loads(result.stdout)

        self.assertEqual(result.returncode, 0, result.stdout)
        self.assertEqual(payload["valid"], 1)
        self.assertEqual(payload["invalid"], 0)


if __name__ == "__main__":
    unittest.main()
