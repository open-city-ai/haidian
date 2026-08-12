import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from backfill_bilingual_artifacts import backfill_manifests  # noqa: E402


class BilingualArtifactManifestFreshnessTests(unittest.TestCase):
    def write_package(self, root: Path) -> Path:
        directory = root / "submissions" / "alice" / "example"
        for relative, content in {
            "proposal.md": '---\ntitle: "Example"\nlanguage: "en"\n---\nBody\n',
            "proposal.zh.md": '---\ntitle: "示例"\nlanguage: "zh"\ntranslation_of: "proposal.md"\n---\n正文\n',
            "report/proposal.html": "primary report",
            "report/proposal.zh.html": "translated report",
            "visual/index.html": "primary visual",
            "visual/index.zh.html": "translated visual",
            "drawings/a3-booklet.pdf": "primary drawing",
            "drawings/a3-booklet.zh.pdf": "translated drawing",
        }.items():
            path = directory / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")
        (directory / "manifest.json").write_text(
            json.dumps(
                {
                    "files": [
                        {
                            "path": "proposal.md",
                            "role": "narrative",
                            "required": True,
                            "sha256": hashlib.sha256(
                                (directory / "proposal.md").read_bytes()
                            ).hexdigest(),
                        }
                    ],
                    "validation_claim": {"self_checked": True},
                }
            ),
            encoding="utf-8",
        )
        return directory

    def test_changed_artifact_inventory_invalidates_review_freshness(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            directory = self.write_package(Path(tmp))

            backfill_manifests([directory])

            manifest = json.loads((directory / "manifest.json").read_text(encoding="utf-8"))
            items = {item["path"]: item for item in manifest["files"]}
            self.assertFalse(manifest["validation_claim"]["self_checked"])
            self.assertEqual("rendered_proposal_html", items["report/proposal.html"]["role"])
            self.assertEqual("visualization", items["visual/index.html"]["role"])
            self.assertEqual("drawing", items["drawings/a3-booklet.pdf"]["role"])
            self.assertEqual(
                "report/proposal.html",
                items["report/proposal.zh.html"]["translation_of"],
            )

    def test_unchanged_artifact_inventory_preserves_fresh_review(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            directory = self.write_package(Path(tmp))
            backfill_manifests([directory])
            manifest_path = directory / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["validation_claim"]["self_checked"] = True
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")

            backfill_manifests([directory])

            refreshed = json.loads(manifest_path.read_text(encoding="utf-8"))
            self.assertTrue(refreshed["validation_claim"]["self_checked"])


if __name__ == "__main__":
    unittest.main()
