import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from validate_submission import (  # noqa: E402
    REQUIRED_AI_PACKAGE_FILES,
    ValidationReport,
    validate_manifest_file,
)


class ManifestChangedInventoryTests(unittest.TestCase):
    def write_package(
        self,
        root: Path,
        *,
        changed_rel: str,
        declare_changed: bool,
    ) -> tuple[str, ValidationReport]:
        proposal_dir = "submissions/alice/sample-package"
        base = root / proposal_dir
        package_paths = sorted(REQUIRED_AI_PACKAGE_FILES | {"proposal.md"})
        for rel_path in package_paths:
            if rel_path == "manifest.json":
                continue
            path = base / rel_path
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(f"fixture for {rel_path}\n".encode())

        changed_path = base / changed_rel
        changed_path.parent.mkdir(parents=True, exist_ok=True)
        changed_path.write_bytes(b"changed package content\n")
        if declare_changed:
            package_paths.append(changed_rel)

        files = []
        for rel_path in sorted(package_paths):
            item = {"path": rel_path, "role": "asset", "required": True}
            if rel_path != "manifest.json":
                item["sha256"] = hashlib.sha256((base / rel_path).read_bytes()).hexdigest()
            files.append(item)
        manifest = {
            "schema_version": "0.2.0",
            "package_id": "sample-package",
            "project_id": "centennial-jingzhang-ai-belt",
            "site_package_version": "0.1.0",
            "package_type": "professional_design_package",
            "package_state": "ready_for_review",
            "submission_stage": "formal",
            "submission_type": "ai_agent",
            "agent": {
                "agent_id": "sample-agent",
                "agent_name": "Sample Agent",
                "model": "Model 1",
            },
            "generated_at": "2026-08-12T00:00:00Z",
            "files": files,
            "validation_claim": {"self_checked": True, "known_blockers": []},
        }
        (base / "manifest.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        report = ValidationReport(changed_files=[f"{proposal_dir}/{changed_rel}"])
        validate_manifest_file(report, root, proposal_dir)
        return proposal_dir, report

    def test_changed_package_files_must_be_declared(self):
        for changed_rel in ("visual/assets/runtime.js", "assets/figures/extra.png"):
            with self.subTest(changed_rel=changed_rel), tempfile.TemporaryDirectory() as tmp:
                proposal_dir, report = self.write_package(
                    Path(tmp), changed_rel=changed_rel, declare_changed=False
                )

                self.assertIn(
                    f"{proposal_dir}/manifest.json: changed package file `{changed_rel}` "
                    "must be listed in files with its sha256",
                    report.errors,
                )

    def test_declared_changed_package_file_is_covered(self):
        with tempfile.TemporaryDirectory() as tmp:
            proposal_dir, report = self.write_package(
                Path(tmp),
                changed_rel="visual/assets/runtime.js",
                declare_changed=True,
            )

            self.assertTrue(report.ok, f"{proposal_dir}: {report.errors}")

    def test_maintainer_feedback_is_not_package_inventory(self):
        with tempfile.TemporaryDirectory() as tmp:
            _proposal_dir, report = self.write_package(
                Path(tmp), changed_rel="FEEDBACK.md", declare_changed=False
            )

            self.assertTrue(report.ok, report.errors)


if __name__ == "__main__":
    unittest.main()
