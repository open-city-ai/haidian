import argparse
import tempfile
import unittest
from pathlib import Path
from unittest import mock


import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from read_peer_proposals import PeerReaderError, download_bundle  # noqa: E402


ITEM = {
    "id": "alice/sample",
    "sourceUrl": "submissions/alice/sample/proposal.md",
    "proposalUrl": "proposal-view.html?id=alice%2Fsample",
    "visualUrl": "submissions/alice/sample/visual/index.html",
}


def args(repo_root: Path, output_dir: Path) -> argparse.Namespace:
    return argparse.Namespace(
        repo_root=str(repo_root),
        output_dir=str(output_dir),
        max_file_mb=1,
        full_text=False,
        include_figures=False,
        include_visual=False,
        include_drawings=False,
    )


class ReadPeerOutputBoundaryTests(unittest.TestCase):
    def test_cache_cannot_write_into_submissions(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / "repo"
            submissions = root / "submissions"
            existing = submissions / "alice" / "sample" / "proposal.md"
            existing.parent.mkdir(parents=True)
            existing.write_text("original proposal\n", encoding="utf-8")

            with mock.patch(
                "read_peer_proposals.fetch_bytes", return_value=b"peer content\n"
            ) as fetch:
                with self.assertRaisesRegex(
                    PeerReaderError, "peer download cache must stay outside"
                ):
                    download_bundle(ITEM, args(root, submissions))

            fetch.assert_not_called()
            self.assertEqual(existing.read_text(encoding="utf-8"), "original proposal\n")

    def test_symlink_alias_to_submissions_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / "repo"
            submissions = root / "submissions"
            submissions.mkdir(parents=True)
            alias = Path(tmp) / "peer-cache"
            alias.symlink_to(submissions, target_is_directory=True)

            with mock.patch(
                "read_peer_proposals.fetch_bytes", return_value=b"peer content\n"
            ) as fetch:
                with self.assertRaisesRegex(
                    PeerReaderError, "peer download cache must stay outside"
                ):
                    download_bundle(ITEM, args(root, alias))

            fetch.assert_not_called()

    def test_script_repository_is_protected_when_index_root_is_elsewhere(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            directory = Path(tmp)
            script_root = directory / "repo"
            submissions = script_root / "submissions"
            existing = submissions / "alice" / "sample" / "proposal.md"
            existing.parent.mkdir(parents=True)
            existing.write_text("original proposal\n", encoding="utf-8")
            index_root = directory / "index-cache"
            index_root.mkdir()

            with mock.patch("read_peer_proposals.SCRIPT_REPO_ROOT", script_root), mock.patch(
                "read_peer_proposals.fetch_bytes", return_value=b"peer content\n"
            ) as fetch:
                with self.assertRaisesRegex(
                    PeerReaderError, "peer download cache must stay outside"
                ):
                    download_bundle(ITEM, args(index_root, submissions))

            fetch.assert_not_called()
            self.assertEqual(existing.read_text(encoding="utf-8"), "original proposal\n")

    def test_running_inside_submission_still_protects_script_repository(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            script_root = Path(tmp) / "repo"
            own_package = script_root / "submissions" / "me" / "own-package"
            own_package.mkdir(parents=True)
            (own_package / "proposal.md").write_text("own proposal\n", encoding="utf-8")

            with mock.patch("read_peer_proposals.SCRIPT_REPO_ROOT", script_root), mock.patch(
                "read_peer_proposals.fetch_bytes", return_value=b"peer content\n"
            ) as fetch:
                with self.assertRaisesRegex(
                    PeerReaderError, "peer download cache must stay outside"
                ):
                    download_bundle(ITEM, args(own_package, own_package))

            fetch.assert_not_called()
            self.assertFalse((own_package / "alice" / "sample").exists())

    def test_distinct_cache_directory_remains_supported(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / "repo"
            root.mkdir()
            cache = root / ".peer-proposals"

            with mock.patch(
                "read_peer_proposals.fetch_bytes", return_value=b"peer content\n"
            ):
                result = download_bundle(ITEM, args(root, cache))

            output = cache / "alice" / "sample"
            self.assertTrue(result["ok"])
            self.assertEqual((output / "proposal.md").read_bytes(), b"peer content\n")
            self.assertTrue((output / "peer-metadata.json").is_file())


if __name__ == "__main__":
    unittest.main()
