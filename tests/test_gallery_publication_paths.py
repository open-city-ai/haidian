from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path
import sys


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from generate_submissions_data import (  # noqa: E402
    PUBLICATION_PATH_RE,
    build_data,
    load_publication_registry,
)


def held_entry(path: str) -> dict[str, object]:
    return {
        "path": path,
        "published": False,
        "featured": False,
        "review_status": "not_approved",
        "quality_tier": "qualified",
        "reviewed_by": "maintainer",
        "reviewed_at": "2026-08-12",
        "rights_reviewed": False,
        "reviewed_package_sha256": "0" * 64,
        "selection_reason_zh": "维护者暂停公开展示",
        "selection_reason_en": "Held from public display",
        "selected_at": "2026-08-12",
    }


class GalleryPublicationPathTests(unittest.TestCase):
    def write_registry(self, root: Path, path: str) -> None:
        (root / "gallery-publication.json").write_text(
            json.dumps({"version": 1, "entries": [held_entry(path)]}),
            encoding="utf-8",
        )

    def test_noncanonical_hold_paths_are_rejected(self) -> None:
        invalid_paths = [
            "submissions//alice/example",
            "submissions/./alice/example",
            "submissions/alice/example/",
            "submissions/alice/Example",
            "submissions/alice/ex",
        ]
        for path in invalid_paths:
            with self.subTest(path=path), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                self.write_registry(root, path)

                with self.assertRaisesRegex(SystemExit, "invalid submission path"):
                    load_publication_registry(root)

    def test_runtime_path_pattern_matches_published_schema(self) -> None:
        schema = json.loads(
            (REPO_ROOT / "schema" / "gallery-publication.schema.json").read_text(
                encoding="utf-8"
            )
        )
        schema_pattern = schema["properties"]["entries"]["items"]["properties"]["path"][
            "pattern"
        ]

        self.assertEqual(schema_pattern, PUBLICATION_PATH_RE.pattern)

    def test_canonical_hold_key_excludes_discovered_submission(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = root / "submissions" / "alice" / "example" / "proposal.md"
            proposal.parent.mkdir(parents=True)
            proposal.write_text("# Held proposal\n", encoding="utf-8")
            self.write_registry(root, "submissions/alice/example")

            self.assertEqual([], build_data(root))


if __name__ == "__main__":
    unittest.main()
