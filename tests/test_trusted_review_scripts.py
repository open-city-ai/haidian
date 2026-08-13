import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

import review_submission  # noqa: E402
import self_check_submission  # noqa: E402


class TrustedReviewScriptTests(unittest.TestCase):
    def test_review_never_executes_script_from_submission_checkout(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            untrusted = Path(tmp)
            candidate = untrusted / "scripts" / "self_check_submission.py"
            candidate.parent.mkdir()
            candidate.write_text("raise RuntimeError('untrusted')\n", encoding="utf-8")

            resolved = review_submission.script_path(untrusted, candidate.name)

            self.assertEqual(REPO_ROOT / "scripts" / candidate.name, resolved)

    def test_self_check_keeps_subprocesses_on_trusted_version(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            untrusted = Path(tmp)
            candidate = untrusted / "scripts" / "validate_local_submission.py"
            candidate.parent.mkdir()
            candidate.write_text("raise RuntimeError('untrusted')\n", encoding="utf-8")

            resolved = self_check_submission.script_path(untrusted, candidate.name)

            self.assertEqual(REPO_ROOT / "scripts" / candidate.name, resolved)



    def test_script_path_returns_repo_root_scripts_not_caller_path(self) -> None:
        """script_path must always return a path under the trusted REPO_ROOT/scripts/, regardless of what repo_root is passed."""
        import review_submission as rv
        import self_check_submission as sc

        arbitrary_root = Path("/tmp/some-untrusted-checkout")
        for module, name in [(rv, "maintainer_review.py"), (sc, "spatial_review.py")]:
            with self.subTest(module=module.__name__, name=name):
                resolved = module.script_path(arbitrary_root, name)
                self.assertTrue(
                    str(resolved).startswith(str(REPO_ROOT / "scripts")),
                    f"{module.__name__}.script_path returned path outside trusted scripts dir: {resolved}",
                )

    def test_review_script_dir_constant_matches_repo_scripts(self) -> None:
        """SCRIPT_DIR in trusted review modules must equal the actual scripts directory."""
        import review_submission as rv
        import self_check_submission as sc

        for module in (rv, sc):
            with self.subTest(module=module.__name__):
                self.assertEqual(
                    module.SCRIPT_DIR.resolve(),
                    (REPO_ROOT / "scripts").resolve(),
                    f"{module.__name__}.SCRIPT_DIR does not point to the trusted scripts directory",
                )

    def test_untrusted_checkout_cannot_override_validator_via_script_path(self) -> None:
        """A PR checkout that contains a malicious validate_local_submission.py must never be executed."""
        import review_submission as rv

        with tempfile.TemporaryDirectory() as tmp:
            fake_repo = Path(tmp)
            fake_scripts = fake_repo / "scripts"
            fake_scripts.mkdir()
            # Place a malicious script in the untrusted checkout
            (fake_scripts / "validate_local_submission.py").write_text(
                "raise SystemExit('malicious validator was executed')\n",
                encoding="utf-8",
            )
            resolved = rv.script_path(fake_repo, "validate_local_submission.py")
            # Must not point into the untrusted checkout
            self.assertNotEqual(resolved, fake_scripts / "validate_local_submission.py")
            # Must point into the trusted REPO_ROOT/scripts/
            self.assertTrue(resolved.is_file(), f"Trusted script not found at {resolved}")


if __name__ == "__main__":
    unittest.main()
