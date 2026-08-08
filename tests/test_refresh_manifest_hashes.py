import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


REPO_ROOT = Path(__file__).resolve().parents[1]
SCRIPT = REPO_ROOT / "scripts" / "refresh_manifest_hashes.py"
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from generate_submissions_data import classify_submission  # noqa: E402
from refresh_manifest_hashes import refresh_manifest  # noqa: E402
from self_check_submission import record_formal_pass  # noqa: E402


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class RefreshManifestHashesTests(unittest.TestCase):
    def make_package(self, root: Path) -> tuple[Path, Path]:
        package = root / "submissions" / "alice" / "hash-refresh"
        package.mkdir(parents=True)
        proposal = package / "proposal.md"
        proposal.write_text("updated proposal\n", encoding="utf-8")
        manifest = {
            "package_state": "ready_for_review",
            "files": [
                {"path": "proposal.md", "sha256": "0" * 64},
                {"path": "manifest.json"},
            ],
        }
        manifest_path = package / "manifest.json"
        manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
        return package, manifest_path

    def run_script(self, package: Path, *args: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(SCRIPT), str(package), *args],
            capture_output=True,
            text=True,
            check=False,
        )

    def run_all_audit(self, repo_root: Path) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(SCRIPT), "--all", "--repo-root", str(repo_root), "--json"],
            capture_output=True,
            text=True,
            check=False,
        )

    def test_refreshes_stale_hashes_without_hashing_manifest_itself(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package, manifest_path = self.make_package(Path(tmp))

            completed = self.run_script(package)

            self.assertEqual(0, completed.returncode, completed.stderr)
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            self.assertEqual(digest(package / "proposal.md"), manifest["files"][0]["sha256"])
            self.assertNotIn("sha256", manifest["files"][1])

    def test_check_reports_stale_hashes_without_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package, manifest_path = self.make_package(Path(tmp))
            before = manifest_path.read_bytes()

            completed = self.run_script(package, "--check")

            self.assertEqual(1, completed.returncode)
            self.assertIn("need refresh", completed.stdout)
            self.assertEqual(before, manifest_path.read_bytes())

    def test_invalid_manifest_fails_before_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package, manifest_path = self.make_package(Path(tmp))
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append({"path": "../outside.txt", "sha256": "0" * 64})
            manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
            before = manifest_path.read_bytes()

            completed = self.run_script(package)

            self.assertEqual(1, completed.returncode)
            self.assertIn("unsafe path", completed.stderr)
            self.assertEqual(before, manifest_path.read_bytes())

    def test_symlink_outside_package_fails_before_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            package, manifest_path = self.make_package(root)
            outside = root / "outside.txt"
            outside.write_text("outside package\n", encoding="utf-8")
            try:
                (package / "outside-link.txt").symlink_to(outside)
            except (NotImplementedError, OSError):
                self.skipTest("symbolic links are not available on this platform")
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append({"path": "outside-link.txt", "sha256": "0" * 64})
            manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
            before = manifest_path.read_bytes()

            completed = self.run_script(package)

            self.assertEqual(1, completed.returncode)
            self.assertIn("resolves outside the package", completed.stderr)
            self.assertEqual(before, manifest_path.read_bytes())

    def test_refresh_preserves_manifest_file_mode(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package, manifest_path = self.make_package(Path(tmp))
            manifest_path.chmod(0o640)
            expected_mode = manifest_path.stat().st_mode & 0o777

            completed = self.run_script(package)

            self.assertEqual(0, completed.returncode, completed.stderr)
            self.assertEqual(expected_mode, manifest_path.stat().st_mode & 0o777)

    def test_refresh_invalidates_explicit_self_check_but_check_only_does_not(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package, manifest_path = self.make_package(Path(tmp))
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["validation_claim"] = {"self_checked": True, "known_blockers": []}
            manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
            before_check = manifest_path.read_bytes()

            checked = self.run_script(package, "--check")

            self.assertEqual(1, checked.returncode)
            self.assertEqual(before_check, manifest_path.read_bytes())
            self.assertTrue(json.loads(manifest_path.read_text(encoding="utf-8"))["validation_claim"]["self_checked"])

            refreshed = self.run_script(package)

            self.assertEqual(0, refreshed.returncode, refreshed.stderr)
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            self.assertFalse(manifest["validation_claim"]["self_checked"])

    def test_all_audit_reports_stale_hashes_without_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            package, manifest_path = self.make_package(root)
            manifest_before = manifest_path.read_bytes()

            audited = self.run_all_audit(root)

            self.assertEqual(1, audited.returncode)
            report = json.loads(audited.stdout)
            self.assertFalse(report["ok"])
            self.assertEqual(
                {
                    "packages_scanned": 1,
                    "packages_with_stale_hashes": 1,
                    "stale_artifacts": 1,
                    "packages_with_errors": 0,
                },
                report["summary"],
            )
            self.assertEqual("submissions/alice/hash-refresh", report["packages"][0]["submission_dir"])
            self.assertEqual(1, report["packages"][0]["stale_artifacts"])
            self.assertEqual([], report["packages"][0]["errors"])
            self.assertEqual(manifest_before, manifest_path.read_bytes())

    def make_recordable_package(self, root: Path) -> tuple[Path, Path]:
        package = root / "submissions" / "alice" / "record-pass"
        package.mkdir(parents=True)
        proposal = package / "proposal.md"
        proposal.write_text("recordable proposal\n", encoding="utf-8")
        self_check = package / "self_check.json"
        self_check.write_text(
            json.dumps(
                {
                    "schema_version": "0.1.0",
                    "checks": [
                        {
                            "check_id": "STATIC_CHECK",
                            "result": "pass",
                            "severity": "info",
                            "target": "proposal.md",
                        }
                    ],
                }
            )
            + "\n",
            encoding="utf-8",
        )
        manifest_path = package / "manifest.json"
        manifest_path.write_text(
            json.dumps(
                {
                    "submission_stage": "formal",
                    "files": [
                        {"path": "proposal.md", "sha256": digest(proposal)},
                        {"path": "self_check.json", "sha256": digest(self_check)},
                        {"path": "manifest.json"},
                    ],
                    "validation_claim": {"self_checked": False, "known_blockers": []},
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
        return package, manifest_path

    @staticmethod
    def passing_report() -> dict:
        return {
            "can_enter_formal_review": True,
            "deterministic_validation": {"ok": True},
            "spatial_review": {"ok": True},
            "visual_review": {"ok": True},
            "professional_review": {"ok": True},
        }

    def test_record_formal_pass_refreshes_self_check_then_restores_claim(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package, manifest_path = self.make_recordable_package(Path(tmp))

            self.assertEqual([], record_formal_pass(package, self.passing_report()))

            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            self_check = json.loads((package / "self_check.json").read_text(encoding="utf-8"))
            self.assertTrue(manifest["validation_claim"]["self_checked"])
            self.assertIn("self_checked_at", manifest["validation_claim"])
            self.assertTrue(self_check["can_enter_formal_review"])
            self.assertEqual("formal-review-ready", self_check["review_status"])
            self.assertEqual("STATIC_CHECK", self_check["checks"][0]["check_id"])

            (package / "proposal.md").write_text("changed proposal\n", encoding="utf-8")
            changed, errors = refresh_manifest(manifest_path)
            self.assertEqual([], errors)
            self.assertEqual(1, changed)
            self.assertFalse(json.loads(manifest_path.read_text(encoding="utf-8"))["validation_claim"]["self_checked"])

            self.assertEqual([], record_formal_pass(package, self.passing_report()))
            self.assertTrue(json.loads(manifest_path.read_text(encoding="utf-8"))["validation_claim"]["self_checked"])

    def test_record_formal_pass_refuses_non_passing_report_without_writing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            package, manifest_path = self.make_recordable_package(Path(tmp))
            self_check_path = package / "self_check.json"
            manifest_before = manifest_path.read_bytes()
            self_check_before = self_check_path.read_bytes()

            errors = record_formal_pass(package, {"can_enter_formal_review": False})

            self.assertEqual(["cannot record a self-check that is not formal-review-ready"], errors)
            self.assertEqual(manifest_before, manifest_path.read_bytes())
            self.assertEqual(self_check_before, self_check_path.read_bytes())

    def test_explicit_false_preempts_stored_formal_readiness(self) -> None:
        manifest = {
            "submission_stage": "formal",
            "validation_claim": {"self_checked": False, "known_blockers": []},
        }
        with (
            mock.patch("generate_submissions_data.package_complete", return_value=True),
            mock.patch("generate_submissions_data.stored_formal_readiness", return_value=True) as readiness,
        ):
            result = classify_submission(Path("submissions/alice/example"), manifest)

        self.assertEqual("needs_revision", result)
        readiness.assert_not_called()


if __name__ == "__main__":
    unittest.main()
