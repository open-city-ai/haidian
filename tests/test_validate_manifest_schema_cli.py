from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPT = REPO_ROOT / "scripts" / "validate_manifest_schema.py"


class ValidateManifestSchemaCliTests(unittest.TestCase):
    def run_audit(self, root: Path, *arguments: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(SCRIPT), "--repo-root", str(root), *arguments],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=False,
        )

    def test_strict_json_audit_rejects_empty_manifest_set(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            completed = self.run_audit(Path(tmp), "--all", "--strict", "--json")

        self.assertEqual(2, completed.returncode)
        payload = json.loads(completed.stdout)
        self.assertEqual(0, payload["total"])
        self.assertEqual([], payload["results"])
        self.assertIn("no submission manifests found", payload["error"])

    def test_advisory_audit_rejects_missing_repository_root(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            missing = Path(tmp) / "missing-root"
            completed = self.run_audit(missing, "--all")

        self.assertEqual(2, completed.returncode)
        self.assertIn("Manifest schema audit (advisory): 0/0 valid", completed.stdout)
        self.assertIn("Audit error: no submission manifests found", completed.stdout)

    def test_existing_manifest_uses_normal_schema_result_path(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            manifest_path = root / "submissions" / "alice" / "sample" / "manifest.json"
            manifest_path.parent.mkdir(parents=True)
            manifest_path.write_text("{}", encoding="utf-8")

            completed = self.run_audit(root, "--all", "--json")

        self.assertEqual(0, completed.returncode)
        payload = json.loads(completed.stdout)
        self.assertEqual(1, payload["total"])
        self.assertEqual(1, payload["invalid"])
        self.assertNotIn("error", payload)
        self.assertEqual(
            "submissions/alice/sample/manifest.json", payload["results"][0]["path"]
        )


if __name__ == "__main__":
    unittest.main()
