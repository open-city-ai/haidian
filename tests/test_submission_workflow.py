import sys
import tempfile
import unittest
import json
import os
import subprocess
import hashlib
import io
import re
import urllib.error
from pathlib import Path
from unittest.mock import MagicMock, patch

import jsonschema


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from validate_submission import (  # noqa: E402
    ALL_REQUIRED_TASK_IDS,
    FALLBACK_REQUIRED_STANDARD_IDS,
    MODEL_FAMILY_VALUES,
    REQUIRED_SECTIONS,
    REQUIRED_SECTIONS_EN,
    REQUIRED_DESIGN_DEPTH_IDS,
    ValidationReport,
    is_empty_pdf,
    media_signature_is_valid,
    validate_agent_disclosure,
    validate_media_manifest_entries,
    validate_submission,
)
from github_pr_validation import (  # noqa: E402
    base_requires_persisted_readiness,
    GitHubClient,
    MAX_DOWNLOAD_BYTES,
    _is_retryable_http_error,
    is_current_pull_request_head,
    is_non_submission_pr,
    is_review_queue_candidate,
    main,
    readiness_contract_dirs_from_base,
    run_trusted_review_gates,
    safe_manifest_paths,
    strict_manifest_paths_for,
    validation_paths_for,
)
from validate_local_submission import discover_submission_files  # noqa: E402


class MediaContractTests(unittest.TestCase):
    def test_media_manifest_accepts_accessible_local_video_and_audio(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal_dir = "submissions/alice/multimodal"
            media = root / proposal_dir / "assets" / "media"
            media.mkdir(parents=True)
            (media / "walkthrough.mp4").write_bytes(b"\x00\x00\x00\x18ftypmp42demo")
            (media / "soundscape.mp3").write_bytes(b"ID3demo")
            (media / "poster.webp").write_bytes(b"RIFFdemoWEBP")
            (media / "walkthrough.vtt").write_text("WEBVTT\n\n00:00.000 --> 00:01.000\n概念场景\n", encoding="utf-8")
            (media / "walkthrough.md").write_text("# 视频文字稿\n\n这是概念视频的完整可访问文字说明。", encoding="utf-8")
            (media / "soundscape.md").write_text("# 音乐说明\n\n这是无对白概念音乐的内容、时长与用途说明。", encoding="utf-8")
            files = [
                {
                    "path": "assets/media/walkthrough.mp4", "role": "video",
                    "title_zh": "步行体验", "title_en": "Walking experience",
                    "description_zh": "概念体验短片", "description_en": "Concept experience film",
                    "poster": "assets/media/poster.webp",
                    "caption": "assets/media/walkthrough.vtt",
                    "transcript": "assets/media/walkthrough.md",
                },
                {
                    "path": "assets/media/soundscape.mp3", "role": "audio",
                    "title_zh": "声音景观", "title_en": "Soundscape",
                    "description_zh": "无对白概念音乐", "description_en": "Concept music without dialogue",
                    "transcript": "assets/media/soundscape.md",
                },
                {"path": "assets/media/poster.webp", "role": "media_poster"},
                {"path": "assets/media/walkthrough.vtt", "role": "caption_track"},
                {"path": "assets/media/walkthrough.md", "role": "transcript"},
                {"path": "assets/media/soundscape.md", "role": "transcript"},
            ]
            report = ValidationReport()
            validate_media_manifest_entries(
                report, root, proposal_dir, files, {item["path"] for item in files}
            )
            self.assertTrue(report.ok, report.errors)
            self.assertTrue(media_signature_is_valid(media / "walkthrough.mp4"))
            self.assertTrue(media_signature_is_valid(media / "soundscape.mp3"))

    def test_media_manifest_rejects_missing_accessibility_and_spoofed_container(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal_dir = "submissions/alice/multimodal"
            media = root / proposal_dir / "assets" / "media"
            media.mkdir(parents=True)
            (media / "walkthrough.mp4").write_bytes(b"not-an-mp4")
            files = [{
                "path": "assets/media/walkthrough.mp4", "role": "video",
                "title_zh": "步行体验", "title_en": "Walking experience",
                "description_zh": "概念体验短片", "description_en": "Concept experience film",
            }]
            report = ValidationReport()
            validate_media_manifest_entries(
                report, root, proposal_dir, files, {item["path"] for item in files}
            )
            self.assertFalse(report.ok)
            joined = "\n".join(report.errors)
            self.assertIn("does not match its declared media container", joined)
            self.assertIn("needs a manifest-listed poster", joined)
            self.assertIn("needs a manifest-listed caption", joined)
            self.assertIn("needs a manifest-listed transcript", joined)

    def test_media_validator_never_reads_traversal_paths(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            outside = root / "outside.mp4"
            outside.write_bytes(b"not-an-mp4")
            report = ValidationReport()
            validate_media_manifest_entries(
                report,
                root,
                "submissions/alice/multimodal",
                [{"path": "assets/media/../../../outside.mp4", "role": "video"}],
                set(),
            )
            self.assertTrue(report.ok, report.errors)


class _Response:
    def __init__(self, body: bytes) -> None:
        self.body = body
        self.headers = {}

    def __enter__(self):
        return self

    def __exit__(self, *args):
        return False

    def read(self, *args):
        return self.body


class GitHubApiResilienceTests(unittest.TestCase):
    @staticmethod
    def _error(code: int, body: bytes, headers=None) -> urllib.error.HTTPError:
        return urllib.error.HTTPError(
            "https://api.github.com/test",
            code,
            "error",
            headers or {},
            io.BytesIO(body),
        )

    def test_secondary_rate_limit_403_is_retryable(self) -> None:
        error = self._error(
            403,
            b'{"message":"You have exceeded a secondary rate limit."}',
            {"Retry-After": "1"},
        )
        self.assertTrue(
            _is_retryable_http_error(
                "GET", error, "You have exceeded a secondary rate limit."
            )
        )

    def test_permission_403_is_not_retried(self) -> None:
        error = self._error(403, b'{"message":"Resource not accessible by integration"}')
        self.assertFalse(
            _is_retryable_http_error(
                "GET", error, "Resource not accessible by integration"
            )
        )

    def test_mutating_request_is_not_retryable(self) -> None:
        error = self._error(
            500,
            b'{"message":"server error"}',
        )
        self.assertFalse(_is_retryable_http_error("POST", error, "server error"))

    def test_request_retries_throttling_then_succeeds(self) -> None:
        error = self._error(
            403,
            b'{"message":"You have exceeded a secondary rate limit."}',
            {"Retry-After": "1"},
        )
        client = GitHubClient("token", "open-city-ai/haidian")
        with patch(
            "github_pr_validation.urllib.request.urlopen",
            side_effect=[error, _Response(b'{"ok":true}')],
        ), patch("github_pr_validation.time.sleep") as sleep:
            payload, _ = client.request("GET", "/test")
        self.assertEqual({"ok": True}, payload)
        sleep.assert_called_once_with(1.0)

    def test_request_does_not_retry_mutating_failure(self) -> None:
        error = self._error(500, b'{"message":"server error"}')
        client = GitHubClient("token", "open-city-ai/haidian")
        with patch(
            "github_pr_validation.urllib.request.urlopen",
            side_effect=[error, _Response(b'{"ok":true}')],
        ) as urlopen, patch("github_pr_validation.time.sleep") as sleep:
            with self.assertRaisesRegex(RuntimeError, "HTTP 500: server error"):
                client.request("POST", "/test", {"body": "comment"})
        self.assertEqual(1, urlopen.call_count)
        sleep.assert_not_called()

    def test_download_404_retries_then_succeeds(self) -> None:
        client = GitHubClient("token", "open-city-ai/haidian")
        not_found = self._error(404, b'{"message":"Not Found"}')
        with tempfile.TemporaryDirectory() as temp_dir, patch(
            "github_pr_validation.urllib.request.urlopen",
            side_effect=[not_found, _Response(b"payload")],
        ), patch("github_pr_validation.time.sleep") as sleep:
            destination = Path(temp_dir) / "asset.bin"
            client.download_content("fork/repo", "asset.bin", "head-sha", destination)
            self.assertEqual(b"payload", destination.read_bytes())
        sleep.assert_called_once_with(1.0)

    def test_download_404_exhaustion_reports_path(self) -> None:
        client = GitHubClient("token", "open-city-ai/haidian")
        errors = [self._error(404, b'{"message":"Not Found"}') for _ in range(4)]
        with tempfile.TemporaryDirectory() as temp_dir, patch(
            "github_pr_validation.urllib.request.urlopen",
            side_effect=errors,
        ), patch("github_pr_validation.time.sleep"):
            with self.assertRaisesRegex(
                RuntimeError,
                r"GitHub API download submissions/alice/design/asset.bin failed with HTTP 404",
            ):
                client.download_content(
                    "fork/repo",
                    "submissions/alice/design/asset.bin",
                    "head-sha",
                    Path(temp_dir) / "asset.bin",
                )


class PullRequestHeadGuardTests(unittest.TestCase):
    def test_head_guard_compares_event_sha_with_current_pr(self) -> None:
        client = GitHubClient("token", "open-city-ai/haidian")
        with patch.object(
            client,
            "request",
            return_value=(
                {"state": "open", "draft": False, "head": {"sha": "current-sha"}},
                {},
            ),
        ) as request:
            self.assertTrue(is_current_pull_request_head(client, 627, "current-sha"))
            self.assertFalse(is_current_pull_request_head(client, 627, "stale-sha"))
        self.assertEqual(2, request.call_count)
        request.assert_called_with(
            "GET", "/repos/open-city-ai/haidian/pulls/627"
        )

    def test_stale_event_skips_file_listing_and_side_effects(self) -> None:
        event = {
            "pull_request": {
                "number": 627,
                "user": {"login": "147228"},
                "head": {
                    "repo": {"full_name": "147228/haidian"},
                    "sha": "stale-sha",
                },
            }
        }
        with tempfile.NamedTemporaryFile("w", encoding="utf-8") as event_file:
            json.dump(event, event_file)
            event_file.flush()
            client = MagicMock()
            client.repository = "open-city-ai/haidian"
            client.request.return_value = (
                {"state": "open", "draft": False, "head": {"sha": "current-sha"}},
                {},
            )
            with patch.dict(
                os.environ,
                {
                    "GITHUB_TOKEN": "token",
                    "GITHUB_REPOSITORY": "open-city-ai/haidian",
                    "GITHUB_EVENT_PATH": event_file.name,
                },
                clear=False,
            ), patch("github_pr_validation.GitHubClient", return_value=client):
                self.assertEqual(0, main())
        client.paginate.assert_not_called()
        client.download_content.assert_not_called()
        client.upsert_comment.assert_not_called()
        client.add_labels.assert_not_called()
        client.remove_labels.assert_not_called()

    def test_head_change_after_file_listing_skips_downloads(self) -> None:
        event = {
            "pull_request": {
                "number": 627,
                "user": {"login": "147228"},
                "head": {
                    "repo": {"full_name": "147228/haidian"},
                    "sha": "event-sha",
                },
            }
        }
        with tempfile.NamedTemporaryFile("w", encoding="utf-8") as event_file:
            json.dump(event, event_file)
            event_file.flush()
            client = MagicMock()
            client.repository = "open-city-ai/haidian"
            client.request.side_effect = [
                (
                    {"state": "open", "draft": False, "head": {"sha": "event-sha"}},
                    {},
                ),
                (
                    {"state": "open", "draft": False, "head": {"sha": "newer-sha"}},
                    {},
                ),
            ]
            client.paginate.return_value = [{"filename": "docs/example.md"}]
            with patch.dict(
                os.environ,
                {
                    "GITHUB_TOKEN": "token",
                    "GITHUB_REPOSITORY": "open-city-ai/haidian",
                    "GITHUB_EVENT_PATH": event_file.name,
                },
                clear=False,
            ), patch("github_pr_validation.GitHubClient", return_value=client):
                self.assertEqual(0, main())
        client.download_content.assert_not_called()
        client.upsert_comment.assert_not_called()
        client.add_labels.assert_not_called()
        client.remove_labels.assert_not_called()

    def test_non_submission_head_change_before_comment_skips_side_effects(self) -> None:
        event = {
            "pull_request": {
                "number": 627,
                "user": {"login": "147228"},
                "head": {
                    "repo": {"full_name": "147228/haidian"},
                    "sha": "event-sha",
                },
            }
        }
        with tempfile.NamedTemporaryFile("w", encoding="utf-8") as event_file:
            json.dump(event, event_file)
            event_file.flush()
            client = MagicMock()
            client.repository = "open-city-ai/haidian"
            client.request.side_effect = [
                (
                    {"state": "open", "draft": False, "head": {"sha": "event-sha"}},
                    {},
                ),
                (
                    {"state": "open", "draft": False, "head": {"sha": "event-sha"}},
                    {},
                ),
                (
                    {"state": "open", "draft": False, "head": {"sha": "newer-sha"}},
                    {},
                ),
            ]
            client.paginate.return_value = [{"filename": "docs/example.md"}]
            with patch.dict(
                os.environ,
                {
                    "GITHUB_TOKEN": "token",
                    "GITHUB_REPOSITORY": "open-city-ai/haidian",
                    "GITHUB_EVENT_PATH": event_file.name,
                },
                clear=False,
            ), patch("github_pr_validation.GitHubClient", return_value=client):
                self.assertEqual(0, main())
        self.assertEqual(3, client.request.call_count)
        client.download_content.assert_not_called()
        client.upsert_comment.assert_not_called()
        client.add_labels.assert_not_called()
        client.remove_labels.assert_not_called()


class EmptyPdfDetectionTests(unittest.TestCase):
    def test_zero_count_placeholder_is_empty(self) -> None:
        placeholder = (
            b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n"
            b"2 0 obj<</Type/Pages/Count 0>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n"
        )
        self.assertTrue(is_empty_pdf(placeholder))

    def test_tiny_stub_without_pages_is_empty(self) -> None:
        self.assertTrue(is_empty_pdf(b"%PDF-1.4\n%%EOF\n"))

    def test_pdf_with_page_objects_is_not_empty(self) -> None:
        data = b"%PDF-1.4\n3 0 obj<</Type/Page/Parent 2 0 R>>endobj\n" + b"0" * 4096
        self.assertFalse(is_empty_pdf(data))

    def test_non_pdf_is_not_flagged(self) -> None:
        self.assertFalse(is_empty_pdf(b"not a pdf"))


class AgentDisclosureTests(unittest.TestCase):
    def test_model_family_and_detail_are_machine_readable(self) -> None:
        report = ValidationReport()

        validate_agent_disclosure(
            report,
            {"model_family": "gpt", "model_detail": "GPT-5 Codex"},
            "submissions/alice/design/agent.json",
        )

        self.assertTrue(report.ok)
        self.assertEqual(
            {"gpt", "claude", "deepseek", "qwen", "glm", "kimi", "grok", "other"},
            MODEL_FAMILY_VALUES,
        )

    def test_invalid_or_incomplete_model_disclosure_fails(self) -> None:
        report = ValidationReport()

        validate_agent_disclosure(
            report,
            {"model_family": "unknown-model", "model_detail": "Unknown"},
            "submissions/alice/design/agent.json",
        )
        validate_agent_disclosure(
            report,
            {"model_family": "gpt"},
            "submissions/alice/design/agent.json",
        )
        validate_agent_disclosure(
            report,
            {"model_detail": "GPT-5"},
            "submissions/alice/design/agent.json",
        )

        self.assertFalse(report.ok)
        self.assertEqual(3, len(report.errors))

    def test_legacy_agent_without_optional_disclosure_remains_compatible(self) -> None:
        report = ValidationReport()

        validate_agent_disclosure(report, {"model": "legacy-model"}, "agent.json")

        self.assertTrue(report.ok)

    def test_scaffold_placeholder_is_not_a_valid_disclosure(self) -> None:
        report = ValidationReport()

        validate_agent_disclosure(
            report,
            {"model_family": "other", "model_detail": "replace-with-declared-model"},
            "submissions/alice/design/agent.json",
        )

        self.assertFalse(report.ok)
        self.assertEqual(1, len(report.errors))
        self.assertIn("replace the scaffold placeholder", report.errors[0])

    def test_genuine_other_model_disclosure_remains_valid(self) -> None:
        report = ValidationReport()

        validate_agent_disclosure(
            report,
            {"model_family": "other", "model_detail": "A private in-house model"},
            "submissions/alice/design/agent.json",
        )

        self.assertTrue(report.ok)


class ManifestHydrationTests(unittest.TestCase):
    def test_trusted_base_readiness_boundary_is_fail_closed(self) -> None:
        self.assertTrue(base_requires_persisted_readiness({}))
        self.assertTrue(
            base_requires_persisted_readiness(
                {"package_state": "scaffold", "validation_claim": {}}
            )
        )
        self.assertFalse(
            base_requires_persisted_readiness(
                {
                    "package_state": "ready_for_review",
                    "validation_claim": {"self_checked": False},
                }
            )
        )
        self.assertTrue(
            base_requires_persisted_readiness(
                {
                    "package_state": "ready_for_review",
                    "validation_claim": {
                        "readiness_contract": "persisted-self-check-v1"
                    },
                }
            )
        )

    def test_trusted_base_contract_dirs_cover_new_and_contracted_packages(self) -> None:
        client = MagicMock()
        base = "submissions/alice/ai-urban-loop"
        contracted = "submissions/alice/contracted-loop"

        def fetch_content(_repo, path, _ref, destination):
            destination.parent.mkdir(parents=True, exist_ok=True)
            if path == f"{base}/manifest.json":
                destination.write_text(
                    json.dumps(
                        {
                            "package_state": "ready_for_review",
                            "validation_claim": {"self_checked": False},
                        }
                    ),
                    encoding="utf-8",
                )
                return True
            if path == f"{contracted}/manifest.json":
                destination.write_text(
                    json.dumps(
                        {
                            "package_state": "ready_for_review",
                            "validation_claim": {
                                "readiness_contract": "persisted-self-check-v1"
                            },
                        }
                    ),
                    encoding="utf-8",
                )
                return True
            return False

        client.fetch_content.side_effect = fetch_content
        with tempfile.TemporaryDirectory() as tmp:
            required = readiness_contract_dirs_from_base(
                client,
                "open-city-ai/haidian",
                "base-sha",
                {
                    f"{base}/proposal.md",
                    f"{contracted}/proposal.md",
                    "submissions/alice/new-loop/proposal.md",
                },
                Path(tmp),
            )

        self.assertEqual(
            {
                "submissions/alice/contracted-loop",
                "submissions/alice/new-loop",
            },
            required,
        )

    def test_download_content_accepts_ten_mib_file(self) -> None:
        client = GitHubClient("token", "owner/repo")
        with tempfile.TemporaryDirectory() as tmp:
            destination = Path(tmp) / "artifact.pdf"
            with patch(
                "github_pr_validation.urllib.request.urlopen",
                return_value=_Response(b"x" * MAX_DOWNLOAD_BYTES),
            ):
                client.download_content("owner/repo", "artifact.pdf", "sha", destination)
            self.assertEqual(MAX_DOWNLOAD_BYTES, destination.stat().st_size)

    def test_download_content_rejects_file_over_ten_mib(self) -> None:
        client = GitHubClient("token", "owner/repo")
        with tempfile.TemporaryDirectory() as tmp:
            destination = Path(tmp) / "artifact.pdf"
            with patch(
                "github_pr_validation.urllib.request.urlopen",
                return_value=_Response(b"x" * (MAX_DOWNLOAD_BYTES + 1)),
            ):
                with self.assertRaisesRegex(RuntimeError, "file exceeds download cap"):
                    client.download_content("owner/repo", "artifact.pdf", "sha", destination)
            self.assertFalse(destination.exists())

    def test_accepts_only_safe_relative_manifest_paths(self) -> None:
        manifest = {
            "files": [
                {"path": "assets/figures/site-overview.png"},
                {"path": "report/proposal.html"},
                {"path": "../outside.txt"},
                {"path": "/absolute.txt"},
                {"path": ""},
                {"path": 123},
                "not-an-object",
            ]
        }
        self.assertEqual(
            {
                "assets/figures/site-overview.png",
                "report/proposal.html",
            },
            safe_manifest_paths(manifest),
        )

    def test_invalid_manifest_shapes_return_no_paths(self) -> None:
        self.assertEqual(set(), safe_manifest_paths([]))
        self.assertEqual(set(), safe_manifest_paths({"files": "not-a-list"}))

    def test_trusted_review_gates_use_trusted_scripts_and_fail_closed(self) -> None:
        report = ValidationReport()
        with tempfile.TemporaryDirectory() as tmp:
            trusted_root = Path(tmp) / "trusted"
            submission_dir = Path(tmp) / "hydrated" / "submissions" / "alice" / "design"
            trusted_root.mkdir(parents=True)
            submission_dir.mkdir(parents=True)
            completed = [
                subprocess.CompletedProcess([], 0, '{"ok": true, "issues": []}', ""),
                subprocess.CompletedProcess([], 1, '{"ok": false, "issues": [{"id": "x"}]}', ""),
                subprocess.CompletedProcess([], 0, '{"ok": true, "summary": {}}', ""),
            ]
            with patch("github_pr_validation.subprocess.run", side_effect=completed) as run:
                run_trusted_review_gates(report, trusted_root, submission_dir)
            self.assertEqual(3, run.call_count)
            self.assertFalse(report.ok)
            self.assertIn("trusted gate SPATIAL_REVIEW: PASS", "\n".join(report.warnings))
            self.assertIn("trusted gate VISUAL_PACKAGING: FAIL", "\n".join(report.errors))

    def test_trusted_base_distinguishes_historical_and_new_ready_packages(self) -> None:
        historical = {
            "package_state": "ready_for_review",
            "validation_claim": {"self_checked": False, "known_blockers": []},
        }
        contracted = {
            "package_state": "ready_for_review",
            "validation_claim": {
                "self_checked": True,
                "known_blockers": [],
                "readiness_contract": "persisted-self-check-v1",
            },
        }
        scaffold = {"package_state": "scaffold", "validation_claim": {}}
        self.assertFalse(base_requires_persisted_readiness(historical))
        self.assertTrue(base_requires_persisted_readiness(contracted))
        self.assertTrue(base_requires_persisted_readiness(scaffold))
        self.assertTrue(base_requires_persisted_readiness(None))

    def test_trusted_base_manifest_fetch_marks_new_package_strict(self) -> None:
        proposal_paths = {"submissions/alice/design/proposal.md"}
        with tempfile.TemporaryDirectory() as tmp:
            client = MagicMock()
            client.fetch_content.return_value = False
            required = readiness_contract_dirs_from_base(
                client,
                "open-city-ai/haidian",
                "base-sha",
                proposal_paths,
                Path(tmp),
            )
        self.assertEqual({"submissions/alice/design"}, required)

    def test_maintainer_removals_are_not_revalidated_as_missing_files(self) -> None:
        files = [
            {"filename": "submissions/alice/design/proposal.md", "status": "removed"},
            {"filename": "docs/note.md", "status": "modified"},
        ]
        self.assertEqual(["docs/note.md"], validation_paths_for(files, True))

    def test_removed_paths_are_excluded_from_validation_scope(self) -> None:
        files = [{"filename": "submissions/alice/design/proposal.md", "status": "removed"}]
        self.assertEqual([], validation_paths_for(files, False))

    def test_added_copied_and_renamed_manifests_enter_strict_migration(self) -> None:
        files = [
            {"filename": "submissions/alice/added/manifest.json", "status": "added"},
            {"filename": "submissions/alice/copied/manifest.json", "status": "copied"},
            {"filename": "submissions/alice/renamed/manifest.json", "status": "renamed"},
            {"filename": "submissions/alice/changed/manifest.json", "status": "modified"},
            {"filename": "submissions/alice/removed/manifest.json", "status": "removed"},
        ]
        self.assertEqual(
            [
                "submissions/alice/added/manifest.json",
                "submissions/alice/copied/manifest.json",
                "submissions/alice/renamed/manifest.json",
            ],
            strict_manifest_paths_for(files),
        )

    def test_participant_deletion_only_pr_is_warning_not_missing_file_failure(self) -> None:
        event = {
            "pull_request": {
                "number": 647,
                "user": {"login": "alice"},
                "head": {"repo": {"full_name": "alice/haidian"}, "sha": "head-sha"},
            }
        }
        files = [
            {"filename": "submissions/alice/design/obsolete.png", "status": "removed"}
        ]
        with tempfile.NamedTemporaryFile("w", encoding="utf-8") as event_file:
            json.dump(event, event_file)
            event_file.flush()
            client = MagicMock()
            client.repository = "open-city-ai/haidian"
            client.request.return_value = (
                {"state": "open", "draft": False, "head": {"sha": "head-sha"}},
                {},
            )
            client.paginate.return_value = files
            with patch.dict(
                os.environ,
                {
                    "GITHUB_TOKEN": "token",
                    "GITHUB_REPOSITORY": "open-city-ai/haidian",
                    "GITHUB_EVENT_PATH": event_file.name,
                },
                clear=False,
            ), patch("github_pr_validation.GitHubClient", return_value=client):
                self.assertEqual(0, main())
        client.download_content.assert_not_called()
        comment = client.upsert_comment.call_args.args[1]
        self.assertIn("participant deletion-only PR", comment)

    def test_non_submission_pr_short_circuits_before_hydration(self) -> None:
        event = {
            "pull_request": {
                "number": 707,
                "user": {"login": "alice"},
                "head": {"repo": {"full_name": "alice/haidian"}, "sha": "head-sha"},
            }
        }
        files = [
            {"filename": "scripts/tool.py", "status": "modified"},
            {"filename": "tests/test_tool.py", "status": "modified"},
        ]

        with tempfile.NamedTemporaryFile("w", encoding="utf-8") as event_file:
            json.dump(event, event_file)
            event_file.flush()
            client = MagicMock()
            client.repository = "open-city-ai/haidian"
            client.request.return_value = (
                {"state": "open", "draft": False, "head": {"sha": "head-sha"}},
                {},
            )
            client.paginate.return_value = files
            with patch.dict(
                os.environ,
                {
                    "GITHUB_TOKEN": "token",
                    "GITHUB_REPOSITORY": "open-city-ai/haidian",
                    "GITHUB_EVENT_PATH": event_file.name,
                },
                clear=False,
            ), patch("github_pr_validation.GitHubClient", return_value=client):
                self.assertEqual(0, main())
        client.download_content.assert_not_called()
        client.fetch_content.assert_not_called()
        comment = client.upsert_comment.call_args.args[1]
        self.assertIn("non-submission code/docs/test PR", comment)

    def test_closed_pr_short_circuits_before_hydration_or_side_effects(self) -> None:
        event = {
            "pull_request": {
                "number": 736,
                "user": {"login": "alice"},
                "head": {"repo": {"full_name": "alice/haidian"}, "sha": "closed-head"},
            }
        }
        with tempfile.NamedTemporaryFile("w", encoding="utf-8") as event_file:
            json.dump(event, event_file)
            event_file.flush()
            client = MagicMock()
            client.request.return_value = ({"state": "closed", "draft": False}, {})
            with patch.dict(
                os.environ,
                {
                    "GITHUB_TOKEN": "token",
                    "GITHUB_REPOSITORY": "open-city-ai/haidian",
                    "GITHUB_EVENT_PATH": event_file.name,
                },
                clear=False,
            ), patch("github_pr_validation.GitHubClient", return_value=client):
                self.assertEqual(0, main())
        client.paginate.assert_not_called()
        client.download_content.assert_not_called()
        client.upsert_comment.assert_not_called()
        client.add_labels.assert_not_called()
        client.remove_labels.assert_not_called()

    def test_current_draft_pr_short_circuits_before_hydration_or_side_effects(self) -> None:
        event = {
            "pull_request": {
                "number": 736,
                "user": {"login": "alice"},
                "head": {"repo": {"full_name": "alice/haidian"}, "sha": "draft-head"},
            }
        }
        with tempfile.NamedTemporaryFile("w", encoding="utf-8") as event_file:
            json.dump(event, event_file)
            event_file.flush()
            client = MagicMock()
            client.request.return_value = ({"state": "open", "draft": True}, {})
            with patch.dict(
                os.environ,
                {
                    "GITHUB_TOKEN": "token",
                    "GITHUB_REPOSITORY": "open-city-ai/haidian",
                    "GITHUB_EVENT_PATH": event_file.name,
                },
                clear=False,
            ), patch("github_pr_validation.GitHubClient", return_value=client):
                self.assertEqual(0, main())
        client.paginate.assert_not_called()
        client.download_content.assert_not_called()
        client.upsert_comment.assert_not_called()

    def test_review_queue_candidate_is_one_author_owned_submission(self) -> None:
        self.assertTrue(
            is_review_queue_candidate(
                [
                    "submissions/Alice/design/proposal.md",
                    "submissions/Alice/design/agent.json",
                ],
                "alice",
            )
        )
        self.assertFalse(
            is_review_queue_candidate(
                ["submissions/alice/design/proposal.md", "README.md"],
                "alice",
            )
        )
        self.assertFalse(
            is_review_queue_candidate(
                [
                    "submissions/alice/design-a/proposal.md",
                    "submissions/alice/design-b/proposal.md",
                ],
                "alice",
            )
        )

    def test_non_submission_code_pr_is_not_sent_to_package_validator(self) -> None:
        self.assertTrue(is_non_submission_pr(["scripts/tool.py", "tests/test_tool.py"]))
        self.assertTrue(is_non_submission_pr(["docs/design.md"]))
        self.assertFalse(is_non_submission_pr([]))
        self.assertFalse(
            is_non_submission_pr(["submissions/alice/design/proposal.md", "scripts/tool.py"])
        )
        self.assertFalse(
            is_non_submission_pr(
                [
                    {
                        "filename": "scripts/tool.py",
                        "previous_filename": "submissions/alice/design/proposal.md",
                        "status": "renamed",
                    }
                ]
            )
        )

    def test_local_full_package_check_ignores_existing_maintainer_feedback(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission = root / "submissions" / "alice" / "design"
            submission.mkdir(parents=True)
            (submission / "proposal.md").write_text("# Design\n", encoding="utf-8")
            (submission / "FEEDBACK.md").write_text("# Maintainer feedback\n", encoding="utf-8")
            self.assertEqual(
                ["submissions/alice/design/proposal.md"],
                discover_submission_files(submission, root),
            )

    def test_maintainer_controlled_paths_are_not_treated_as_code_only(self) -> None:
        protected_paths = [
            "submissions-data.js",
            "gallery-publication.json",
            "submissions/README.md",
            ".maintainer-review/alice/review-summary.json",
            "docs/reviews/alice.md",
        ]
        for path in protected_paths:
            with self.subTest(path=path):
                self.assertFalse(is_non_submission_pr([path]))

        self.assertFalse(
            is_non_submission_pr(
                [
                    {
                        "filename": "scripts/generated-gallery.js",
                        "previous_filename": "submissions-data.js",
                        "status": "renamed",
                    }
                ]
            )
        )
        self.assertFalse(
            is_non_submission_pr(
                [
                    {
                        "filename": "submissions-data.js",
                        "previous_filename": "scripts/generated-gallery.js",
                        "status": "renamed",
                    }
                ]
            )
        )


class ProposalSchemaTests(unittest.TestCase):
    def test_english_contract_accepts_english_section_headings(self) -> None:
        schema = json.loads((REPO_ROOT / "schema" / "proposal.schema.json").read_text(encoding="utf-8"))
        payload = {
            "metadata": {
                "title": "English Proposal",
                "author_github": "alice",
                "language": "en",
                "license": "CC-BY-4.0",
                "summary": "A complete English urban design proposal.",
            },
            "sections": REQUIRED_SECTIONS_EN,
        }
        jsonschema.validate(payload, schema)
        payload["sections"] = REQUIRED_SECTIONS
        with self.assertRaises(jsonschema.ValidationError):
            jsonschema.validate(payload, schema)

    def test_contract_accepts_human_readable_v2_metadata(self) -> None:
        schema = json.loads((REPO_ROOT / "schema" / "proposal.schema.json").read_text(encoding="utf-8"))
        payload = {
            "metadata": {
                "title": "可读方案",
                "author_github": "alice",
                "language": "zh",
                "proposal_format_version": "2",
                "bilingual_contract_version": "1",
                "translation_file": "proposal.en.md",
                "license": "CC-BY-4.0",
                "summary": "将人类可读正文与完整机器核验索引分层组织。",
            },
            "sections": REQUIRED_SECTIONS,
        }
        jsonschema.validate(payload, schema)
        del payload["metadata"]["translation_file"]
        with self.assertRaises(jsonschema.ValidationError):
            jsonschema.validate(payload, schema)
        del payload["metadata"]["bilingual_contract_version"]
        jsonschema.validate(payload, schema)


REFERENCE_BLOCK = (
    "证据引用 [source:SITE-PACKAGE] [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] "
    "[source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] "
    "[standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] "
    "[standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING] "
    "[standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] "
    "[data:geometry/site_boundary.geojson#SITE-001] [data:geometry/key_areas.geojson#KEY-001] "
    "[data:geometry/land_use.geojson#LAND_USE-001] [data:geometry/buildings.geojson#BUILDING_FOOTPRINT-001] "
    "[data:geometry/roads.geojson#ROAD_CENTERLINE-001] [data:geometry/green_space.geojson#GREEN_SPACE-001] "
    "[data:geometry/public_space.geojson#PUBLIC_SPACE-001] [data:geometry/constraints.geojson#CONSTRAINTS] "
    "[data:geometry/phasing.geojson#LAND_USE-001] [metric:site_area_sqm] [metric:green_ratio] "
    "[metric:public_space_ratio]"
)
REFERENCE_BLOCK += " " + " ".join(f"[depth:{item_id}]" for item_id in sorted(REQUIRED_DESIGN_DEPTH_IDS))


def english_primary(text: str) -> str:
    text = text.replace(
        'language: "zh"',
        'language: "en"\ntranslation_file: "proposal.zh.md"',
        1,
    )
    for chinese, english in zip(REQUIRED_SECTIONS, REQUIRED_SECTIONS_EN):
        text = text.replace(f"## {chinese}", f"## {english}")
    marker = "# AI Urban Loop\n"
    return text.replace(
        marker,
        marker + "\n" + ("English design evidence, spatial strategy, metrics, and implementation. " * 45),
        1,
    )

FIGURE_BLOCK = """
![资料证据链与提交包关系图](assets/figures/site-overview.png)
![三层范围与空间工作框架图](assets/figures/land-use-structure.png)
![三处重点区域索引与设计任务图](assets/figures/key-areas.png)
![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)
![核心指标复算与证据链图](assets/figures/metrics-evidence.png)
"""

FORMAL_PARAGRAPH = (
    "本节以官方公告和结构化场地包为依据，说明设计任务、空间图层、指标复算、"
    "图纸表达、HTML 展示和自检证据之间的关系。方案不使用非公开资料，不伪造"
    "官方审批结论，并把待补控规、道路红线、权属、市政和工程条件列为专业复核"
    "前置条件。所有面积、比例、项目数量和空间对象均需要能追溯到 GeoJSON、"
    "metrics.json、sources.json、assumptions.json 和 compliance_matrix.json。"
    f"{REFERENCE_BLOCK}"
)


VALID_BODY = f"""
---
title: "AI Urban Loop"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"
---

# AI Urban Loop

## 设计依据与资料清单

{FIGURE_BLOCK}

{FORMAL_PARAGRAPH * 3}

## 三层范围工作框架

{FORMAL_PARAGRAPH * 3}

## 统筹研究范围产业与未来城市研究

{FORMAL_PARAGRAPH * 3}

## 总体设计范围城市更新与控规深度城市设计

{FORMAL_PARAGRAPH * 3}

## 重点区域详细设计

{FORMAL_PARAGRAPH * 3}

## AI 创新生态、人才画像与 AI+ 场景

{FORMAL_PARAGRAPH * 3}

## 用地、建筑规模与拆改留方案

{FORMAL_PARAGRAPH * 3}

## 交通、轨道、市政与公共服务设施

{FORMAL_PARAGRAPH * 3}

## 蓝绿空间、公共空间与城市风貌

{FORMAL_PARAGRAPH * 3}

## 更新项目清单、实施政策与分期计划

{FORMAL_PARAGRAPH * 3}

## 指标体系、面积复算与合规矩阵

{FORMAL_PARAGRAPH * 3}

## 风险、版权与合规说明

{FORMAL_PARAGRAPH * 3}

## 参考资料

- brief/public-brief.md
- 北京市与海淀区公开政策资料
- {REFERENCE_BLOCK}
"""


OFFTOPIC_BODY = """
---
title: "Coffee Shop Coupon"
author_github: "alice"
language: "zh"
license: "CC-BY-4.0"
summary: "这个方案主要讨论咖啡优惠券。"
---

# Coffee Shop Coupon

## 摘要
优惠券。
## 问题理解
优惠券。
## 核心概念
优惠券。
## 空间与产业方案
优惠券。
## AI 治理与创新场景
优惠券。
## 落地路径
优惠券。
## 风险与合规说明
优惠券。
## 参考资料
无。
"""

VALID_CHANGELOG = """# 方案迭代记录

## v0.1 - 2026-06-14

### 改动摘要

- 创建 formal 方案初稿，说明设计依据、空间图层、AI 场景和证据链。

### 采纳反馈

- 暂无，首版提交。

### 暂未采纳或待复核事项

- 具体建设强度、道路线位、设施落位和权属判断均需基于公开资料进一步复核。

### 公开资料与合规说明

- 本版本仅使用公开任务书和可公开资料，不包含个人隐私、涉密资料、内部图件或未审定规划控制指标。
"""

VALID_RISK = {
    "version": 1,
    "summary": "测试风险矩阵。",
    "dimensions": [
        {
            "id": "data_privacy",
            "label": "数据隐私",
            "score": 4,
            "note": "涉及公众反馈数据，需要授权和脱敏。",
            "mitigation": "只使用聚合指标，不采集个人敏感信息。",
            "human_review": "由数据安全和法律合规人员复核。",
        },
        {
            "id": "implementation_complexity",
            "label": "实施复杂度",
            "score": 3,
            "note": "涉及多主体协同，需要分阶段推进。",
            "mitigation": "先做轻量试点，再扩大范围。",
        },
    ],
}

VALID_SPATIAL = {
    "version": 1,
    "disclaimer": "concept-only",
    "summary": "测试概念空间节点。",
    "items": [
        {
            "id": "node-youth-hub",
            "type": "node",
            "title": "青年创新会客厅",
            "summary": "面向青年团队和居民的公共活动节点。",
            "source": "brief/public-brief.md",
            "public_level": "public",
            "linked_scenarios": ["enterprise-service-copilot"],
            "geometry": {"mode": "concept", "label": "京张铁路遗址公园沿线"},
        }
    ],
}


class SubmissionWorkflowTests(unittest.TestCase):
    def write(self, root: Path, rel: str, content: str = VALID_BODY) -> None:
        path = root / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")

    def write_json(self, root: Path, rel: str, content: object) -> None:
        self.write(root, rel, json.dumps(content, ensure_ascii=False, indent=2))

    def write_bytes(self, root: Path, rel: str, content: bytes) -> None:
        path = root / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(content)

    def write_minimal_ai_package(self, root: Path, base: str) -> list[str]:
        proposal = f"{base}/proposal.md"
        self.write(root, proposal)
        figure_assets = [
            "assets/figures/site-overview.png",
            "assets/figures/land-use-structure.png",
            "assets/figures/key-areas.png",
            "assets/figures/mobility-bluegreen.png",
            "assets/figures/metrics-evidence.png",
        ]

        required = [
            "manifest.json",
            "agent.json",
            "metrics.json",
            "assumptions.json",
            "sources.json",
            "self_check.json",
            "compliance_matrix.json",
            "standard_matrix.json",
            "design_depth_matrix.json",
            "geometry/site_boundary.geojson",
            "geometry/key_areas.geojson",
            "geometry/land_use.geojson",
            "geometry/buildings.geojson",
            "geometry/roads.geojson",
            "geometry/green_space.geojson",
            "geometry/public_space.geojson",
            "geometry/constraints.geojson",
            "geometry/phasing.geojson",
            "report/proposal.html",
            "report/copyright_statement.md",
            "drawings/a3-booklet.pdf",
            "drawings/a0-boards.pdf",
            "visual/index.html",
            *figure_assets,
        ]
        self.write_json(
            root,
            f"{base}/manifest.json",
            {
                "schema_version": "0.1.0",
                "package_id": "ai-urban-loop",
                "project_id": "centennial-jingzhang-ai-belt",
                "site_package_version": "0.1.0",
                "submission_stage": "formal",
                "submission_type": "ai_agent",
                "agent": {
                    "agent_id": "agent-test",
                    "agent_name": "Test Agent",
                    "model": "test-model",
                },
                "generated_at": "2026-06-03T00:00:00Z",
                "files": [
                    {
                        "path": item,
                        "role": "geometry"
                        if item.startswith("geometry/")
                        else "drawing"
                        if item.startswith("drawings/")
                        else "visualization"
                        if item.startswith("visual/")
                        else "proposal_figure"
                        if item.startswith("assets/figures/")
                        else "rendered_proposal_html"
                        if item == "report/proposal.html"
                        else "narrative"
                        if item.endswith("narrative.md")
                        else "copyright_statement"
                        if item.endswith("copyright_statement.md")
                        else "compliance_matrix"
                        if item == "compliance_matrix.json"
                        else "standard_matrix"
                        if item == "standard_matrix.json"
                        else "design_depth_matrix"
                        if item == "design_depth_matrix.json"
                        else "manifest",
                        "required": True,
                    }
                    for item in required
                ],
                "validation_claim": {
                    "self_checked": True,
                    "known_blockers": [],
                    "data_confidence": "high",
                },
            },
        )
        self.write_json(root, f"{base}/agent.json", {"agent_id": "agent-test"})
        self.write_json(root, f"{base}/assumptions.json", {"assumptions": [{"id": "A-CONTROLS-001"}]})
        self.write_json(
            root,
            f"{base}/sources.json",
            {
                "sources": [
                    {"id": "SITE-PACKAGE"},
                    {"id": "OFFICIAL-ANNOUNCEMENT"},
                    {"id": "AGENT-TASKBOOK"},
                    {"id": "BOUNDARY-SOURCE"},
                    {"id": "KEY-AREA-SOURCE"},
                ]
            },
        )
        self.write_json(
            root,
            f"{base}/compliance_matrix.json",
            {
                "schema_version": "0.1.0",
                "requirements": [
                    {
                        "requirement_id": requirement_id,
                        "mandatory": True,
                        "report_sections": ["三层范围工作框架"],
                        "geojson_layers": ["geometry/site_boundary.geojson"],
                        "metrics": ["site_area_sqm"],
                        "drawings": ["drawings/a3-booklet.pdf"],
                        "visual_sections": ["任务覆盖"],
                        "source_ids": ["SITE-PACKAGE"],
                        "assumption_ids": ["A-CONTROLS-001"],
                        "self_check_ids": ["TEST_CHECK"],
                    }
                    for requirement_id in sorted(ALL_REQUIRED_TASK_IDS)
                ],
            },
        )
        self.write_json(
            root,
            f"{base}/standard_matrix.json",
            {
                "schema_version": "0.1.0",
                "standards": [
                    {
                        "standard_id": standard_id,
                        "requirement_zh": "测试标准响应必须有章节、图纸、图层、指标、来源、假设和自检证据。",
                        "professional_dimension": "测试专业",
                        "mandatory": standard_id in FALLBACK_REQUIRED_STANDARD_IDS,
                        "review_status": "addressed" if standard_id in FALLBACK_REQUIRED_STANDARD_IDS else "data_gap",
                        "proposal_sections": ["设计依据与资料清单"],
                        "drawing_refs": ["drawings/a3-booklet.pdf"],
                        "geometry_refs": ["geometry/site_boundary.geojson"],
                        "metric_refs": ["site_area_sqm"],
                        "source_ids": ["SITE-PACKAGE"],
                        "assumption_ids": ["A-CONTROLS-001"],
                        "self_check_ids": ["TEST_CHECK"],
                        "evidence_summary_zh": "测试标准响应可由 proposal.md、图纸、图层、指标和自检共同追溯。",
                    }
                    for standard_id in sorted(FALLBACK_REQUIRED_STANDARD_IDS | {"MOHURD-ARCH-DESIGN-DEPTH-2016"})
                ],
            },
        )
        self.write_json(
            root,
            f"{base}/design_depth_matrix.json",
            {
                "schema_version": "0.1.0",
                "items": [
                    {
                        "item_id": item_id,
                        "title_zh": "测试设计深度项",
                        "professional_dimension": "测试专业",
                        "required": True,
                        "status": "complete",
                        "proposal_sections": ["三层范围工作框架"],
                        "drawing_refs": ["drawings/a3-booklet.pdf"],
                        "geometry_refs": ["geometry/site_boundary.geojson"],
                        "metric_refs": ["site_area_sqm"],
                        "source_ids": ["SITE-PACKAGE"],
                        "assumption_ids": ["A-CONTROLS-001"],
                        "self_check_ids": ["TEST_CHECK"],
                        "evidence_summary_zh": "测试设计深度项可由正文、图纸、图层、指标和来源共同追溯。",
                    }
                    for item_id in sorted(REQUIRED_DESIGN_DEPTH_IDS)
                ],
            },
        )
        self.write_json(
            root,
            f"{base}/self_check.json",
            {
                "schema_version": "0.1.0",
                "checks": [
                    {
                        "check_id": "TEST_CHECK",
                        "result": "pass",
                        "severity": "info",
                        "target": "package",
                    }
                ],
            },
        )
        self.write_json(
            root,
            f"{base}/metrics.json",
            {
                "schema_version": "0.1.0",
                "units": {"length": "m", "area": "sqm"},
                "metrics": {
                    "site_area_sqm": {
                        "status": "known",
                        "value": 100,
                        "unit": "sqm",
                        "source_files": ["geometry/site_boundary.geojson"],
                        "formula": "polygon_area(site_boundary)",
                        "confidence": "high",
                        "assumptions": [],
                    },
                    "green_ratio": {
                        "status": "known",
                        "value": 0.2,
                        "unit": "ratio",
                        "source_files": ["geometry/green_space.geojson", "geometry/site_boundary.geojson"],
                        "formula": "green_space_area_sqm / site_area_sqm",
                        "confidence": "medium",
                        "assumptions": [],
                    },
                    "public_space_ratio": {
                        "status": "known",
                        "value": 0.1,
                        "unit": "ratio",
                        "source_files": ["geometry/public_space.geojson", "geometry/site_boundary.geojson"],
                        "formula": "public_space_area_sqm / site_area_sqm",
                        "confidence": "medium",
                        "assumptions": [],
                    },
                },
            },
        )
        site_boundary = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "id": "SITE-001",
                    "properties": {
                        "id": "SITE-001",
                        "layer": "SITE_BOUNDARY",
                        "source_type": "user_provided_cleared",
                        "confidence": "high",
                        "geometry_role": "official_constraint",
                        "official_boundary": True,
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [116.3, 39.9],
                                [116.31, 39.9],
                                [116.31, 39.91],
                                [116.3, 39.91],
                                [116.3, 39.9],
                            ]
                        ],
                    },
                }
            ],
        }
        self.write_json(root, f"{base}/geometry/site_boundary.geojson", site_boundary)
        key_features = []
        for index, area_id in enumerate(
            [
                "zhongzhiyuan_ai_acceleration_area",
                "beijing_ai_origin_community",
                "dazhongsi_ai_industry_cluster",
            ],
            start=1,
        ):
            key_features.append(
                {
                    "type": "Feature",
                    "id": f"KEY-{index:03d}",
                    "properties": {
                        "id": f"KEY-{index:03d}",
                        "layer": "KEY_AREA",
                        "area_id": area_id,
                        "source_type": "official_public",
                        "confidence": "high",
                        "geometry_role": "official_constraint",
                        "official_boundary": True,
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [116.300 + index * 0.001, 39.901],
                                [116.3005 + index * 0.001, 39.901],
                                [116.3005 + index * 0.001, 39.9015],
                                [116.300 + index * 0.001, 39.9015],
                                [116.300 + index * 0.001, 39.901],
                            ]
                        ],
                    },
                }
            )
        self.write_json(root, f"{base}/geometry/key_areas.geojson", {"type": "FeatureCollection", "features": key_features})
        empty_geojson = {"type": "FeatureCollection", "features": []}
        for rel in [
            "geometry/constraints.geojson",
        ]:
            self.write_json(root, f"{base}/{rel}", empty_geojson)
        self.promote_package_to_formal(root, base)
        self.write_json(root, f"{base}/geometry/phasing.geojson", json.loads((root / base / "geometry/land_use.geojson").read_text(encoding="utf-8")))
        self.write(root, f"{base}/report/narrative.md", "# Narrative\n\nFormal narrative.")
        self.write(root, f"{base}/report/copyright_statement.md", "# Copyright\n\nAll assets are cleared.")
        drawing = b"%PDF-1.4\n3 0 obj<</Type/Page/Parent 2 0 R>>endobj\n" + b"0" * 4096
        self.write_bytes(root, f"{base}/drawings/a3-booklet.pdf", drawing)
        self.write_bytes(root, f"{base}/drawings/a0-boards.pdf", drawing)
        self.write(
            root,
            f"{base}/visual/index.html",
            """<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>Visual</title></head><body>
<h1>总览地图</h1><p>三层范围 重点区域 用地分区 交通慢行 蓝绿公共空间 建筑 更新项目 AI 场景 核心指标 任务覆盖 自检状态 来源 假设</p>
<span data-metric="site_area_sqm" data-value="100">100</span>
<span data-metric="green_ratio" data-value="0.2">0.2</span>
<span data-metric="public_space_ratio" data-value="0.1">0.1</span>
</body></html>""",
        )
        self.write(
            root,
            f"{base}/report/proposal.html",
            """<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>Proposal</title></head><body><main>
<figure><img src="../assets/figures/site-overview.png" alt="资料证据链与提交包关系图"></figure>
<figure><img src="../assets/figures/land-use-structure.png" alt="三层范围与空间工作框架图"></figure>
<figure><img src="../assets/figures/key-areas.png" alt="三处重点区域索引与设计任务图"></figure>
<figure><img src="../assets/figures/mobility-bluegreen.png" alt="交通慢行与蓝绿公共空间复合系统图"></figure>
<figure><img src="../assets/figures/metrics-evidence.png" alt="核心指标复算与证据链图"></figure>
</main></body></html>""",
        )
        for figure in figure_assets:
            self.write(
                root,
                f"{base}/{figure}",
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><title>Figure</title><rect width="10" height="10"/></svg>',
            )
        return [proposal] + [f"{base}/{item}" for item in required]

    def add_bilingual_v2_display(self, root: Path, base: str, changed: list[str]) -> None:
        primary = root / base / "proposal.md"
        text = primary.read_text(encoding="utf-8")
        if 'proposal_format_version: "2"' not in text:
            text = text.replace(
                'language: "zh"',
                'language: "zh"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_file: "proposal.en.md"',
                1,
            )
        else:
            if 'bilingual_contract_version: "1"' not in text:
                text = text.replace(
                    'proposal_format_version: "2"',
                    'proposal_format_version: "2"\nbilingual_contract_version: "1"',
                    1,
                )
        if 'translation_file: "proposal.en.md"' not in text:
            text = text.replace(
                'bilingual_contract_version: "1"',
                'bilingual_contract_version: "1"\ntranslation_file: "proposal.en.md"',
                1,
            )
        primary.write_text(text, encoding="utf-8")
        translated = text.replace(
            'language: "zh"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_file: "proposal.en.md"',
            'language: "en"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_of: "proposal.md"',
            1,
        )
        (root / base / "proposal.en.md").write_text(translated, encoding="utf-8")
        display_paths = [
            "proposal.md",
            "report/proposal.html",
            "visual/index.html",
            "drawings/a3-booklet.pdf",
            "drawings/a0-boards.pdf",
            "assets/figures/site-overview.png",
            "assets/figures/land-use-structure.png",
            "assets/figures/key-areas.png",
            "assets/figures/mobility-bluegreen.png",
            "assets/figures/metrics-evidence.png",
        ]
        manifest_path = root / base / "manifest.json"
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        items = {item["path"]: item for item in manifest["files"]}
        if "proposal.md" not in items:
            item = {"path": "proposal.md", "role": "narrative", "required": True}
            manifest["files"].append(item)
            items["proposal.md"] = item
        for rel in display_paths:
            source = root / base / rel
            localized_rel = "proposal.en.md" if rel == "proposal.md" else source.with_name(
                f"{source.stem}.en{source.suffix}"
            ).relative_to(root / base).as_posix()
            localized = root / base / localized_rel
            if rel != "proposal.md":
                localized.write_bytes(source.read_bytes())
            items[rel]["language"] = "zh"
            items[rel]["sha256"] = hashlib.sha256(source.read_bytes()).hexdigest()
            manifest["files"].append(
                {
                    "path": localized_rel,
                    "role": items[rel]["role"],
                    "required": True,
                    "language": "en",
                    "translation_of": rel,
                    "sha256": hashlib.sha256(localized.read_bytes()).hexdigest(),
                }
            )
            changed.append(f"{base}/{localized_rel}")
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    def update_json(self, root: Path, rel: str, updater) -> None:
        path = root / rel
        data = json.loads(path.read_text(encoding="utf-8"))
        updater(data)
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    def promote_package_to_formal(self, root: Path, base: str) -> None:
        self.update_json(
            root,
            f"{base}/manifest.json",
            lambda data: data.update({"submission_stage": "formal"}),
        )
        self.update_json(
            root,
            f"{base}/geometry/site_boundary.geojson",
            lambda data: data["features"][0]["properties"].update(
                {
                    "source_type": "official_public",
                    "confidence": "high",
                    "geometry_role": "official_constraint",
                    "official_boundary": True,
                }
            ),
        )
        feature_base = {
            "type": "Feature",
            "id": "FEATURE-001",
            "properties": {
                "id": "FEATURE-001",
                "source_type": "agent_generated_design",
                "confidence": "medium",
                "geometry_role": "design_proposal",
            },
        }
        polygon = {
            "type": "Polygon",
            "coordinates": [
                [
                    [116.301, 39.901],
                    [116.309, 39.901],
                    [116.309, 39.909],
                    [116.301, 39.909],
                    [116.301, 39.901],
                ]
            ],
        }
        line = {
            "type": "LineString",
            "coordinates": [[116.302, 39.902], [116.308, 39.908]],
        }
        for filename, layer, extra, geometry in [
            ("land_use.geojson", "LAND_USE", {"land_use_code": "0802"}, polygon),
            ("buildings.geojson", "BUILDING_FOOTPRINT", {"building_type": "office"}, polygon),
            ("green_space.geojson", "GREEN_SPACE", {"land_use_code": "1401"}, polygon),
            ("public_space.geojson", "PUBLIC_SPACE", {}, polygon),
            ("roads.geojson", "ROAD_CENTERLINE", {"road_class": "greenway"}, line),
        ]:
            feature = json.loads(json.dumps(feature_base))
            feature["id"] = f"{layer}-001"
            feature["properties"]["id"] = f"{layer}-001"
            feature["properties"]["layer"] = layer
            feature["properties"].update(extra)
            feature["geometry"] = geometry
            self.write_json(
                root,
                f"{base}/geometry/{filename}",
                {"type": "FeatureCollection", "features": [feature]},
            )

    def test_markdown_only_submission_fails_formal_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            rel = "submissions/alice/ai-urban-loop/proposal.md"
            self.write(root, rel)
            report = validate_submission(root, "alice", [rel])
            self.assertFalse(report.ok)
            self.assertIn("required AI package file is missing", "\n".join(report.errors))

    def test_symlinked_manifest_is_rejected_before_package_reads(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            self.write_minimal_ai_package(root, base)
            manifest_path = root / base / "manifest.json"
            outside_manifest = root / "outside-manifest.json"
            outside_manifest.write_bytes(manifest_path.read_bytes())
            manifest_path.unlink()
            manifest_path.symlink_to(outside_manifest)

            report = validate_submission(root, "alice", [f"{base}/proposal.md"])

        self.assertFalse(report.ok)
        self.assertIn(
            f"{base}/manifest.json: symbolic links are not allowed in submission packages",
            "\n".join(report.errors),
        )

    def test_symlinked_package_subdirectory_is_rejected_before_asset_reads(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            self.write_minimal_ai_package(root, base)
            visual_dir = root / base / "visual"
            outside_visual_dir = root / "outside-visual"
            visual_dir.rename(outside_visual_dir)
            visual_dir.symlink_to(outside_visual_dir, target_is_directory=True)

            report = validate_submission(root, "alice", [f"{base}/proposal.md"])

        self.assertFalse(report.ok)
        self.assertIn(
            f"{base}/visual: symbolic links are not allowed in submission packages",
            "\n".join(report.errors),
        )

    def test_user_cannot_modify_another_user_folder(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            rel = "submissions/bob/ai-urban-loop/proposal.md"
            self.write(root, rel)
            report = validate_submission(root, "alice", [rel])
            self.assertFalse(report.ok)
            self.assertIn("must exactly match", "\n".join(report.errors))

    def test_submission_owner_casing_must_match_github_login(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            rel = "submissions/Alice/ai-urban-loop/proposal.md"
            self.write(root, rel)
            report = validate_submission(root, "alice", [rel])
            self.assertFalse(report.ok)
            self.assertIn("including letter case", "\n".join(report.errors))

    def test_user_cannot_modify_repo_infrastructure(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write(root, "README.md", "# changed")
            report = validate_submission(root, "alice", ["README.md"])
            self.assertFalse(report.ok)
            self.assertIn("participant PRs may only change", "\n".join(report.errors))

    def test_user_cannot_modify_generated_gallery_data(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write(root, "submissions-data.js", "window.HAIDIAN_SUBMISSIONS = [];\n")
            report = validate_submission(root, "alice", ["submissions-data.js"])
            self.assertFalse(report.ok)
            self.assertIn("participants must not edit maintainer-controlled gallery publication data", "\n".join(report.errors))

    def test_user_cannot_modify_gallery_publication_registry(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write(root, "gallery-publication.json", '{"version": 1, "entries": []}\n')
            report = validate_submission(root, "alice", ["gallery-publication.json"])
            self.assertFalse(report.ok)
            self.assertIn("maintainer-controlled gallery publication data", "\n".join(report.errors))

    def test_maintainer_bypass_allows_generated_gallery_data(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write(root, "submissions-data.js", "window.HAIDIAN_SUBMISSIONS = [];\n")
            report = validate_submission(root, "maintainer", ["submissions-data.js"], ["maintainer"])
            self.assertTrue(report.ok, "\n".join(report.errors))
            self.assertTrue(report.maintainer_bypass)

    def test_maintainer_bypass_allows_submissions_root_readme(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write(root, "submissions/README.md", "# Submission documentation\n")
            report = validate_submission(
                root,
                "maintainer",
                ["submissions/README.md"],
                ["maintainer"],
            )
            self.assertTrue(report.ok, "\n".join(report.errors))
            self.assertTrue(report.maintainer_bypass)
            self.assertEqual([], report.proposal_files)

    def test_participant_cannot_modify_submissions_root_readme(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write(root, "submissions/README.md", "# Submission documentation\n")
            report = validate_submission(root, "alice", ["submissions/README.md"])
            self.assertFalse(report.ok)
            self.assertIn(
                "only maintainers may edit submissions root documentation",
                "\n".join(report.errors),
            )

    def test_participant_cannot_add_maintainer_feedback(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            feedback = f"{base}/FEEDBACK.md"
            self.write(root, feedback, "# Maintainer feedback\n")
            report = validate_submission(root, "alice", [*changed, feedback])
            self.assertFalse(report.ok)
            self.assertIn(
                "only maintainers may add or edit FEEDBACK.md",
                "\n".join(report.errors),
            )

    def test_maintainer_can_add_feedback_to_valid_submission(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            self.write_minimal_ai_package(root, base)
            feedback = f"{base}/FEEDBACK.md"
            self.write(root, feedback, "# Maintainer feedback\n")
            report = validate_submission(
                root,
                "maintainer",
                [feedback],
                ["maintainer"],
            )
            self.assertTrue(report.ok, "\n".join(report.errors))
            self.assertTrue(report.maintainer_bypass)

    def test_review_artifacts_cannot_be_committed(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            rel = "docs/reviews/ai-urban-loop/maintainer-comment.md"
            self.write(root, rel, "# review")
            report = validate_submission(root, "maintainer", [rel], ["maintainer"])
            self.assertFalse(report.ok)
            self.assertIn("maintainer review artifacts must stay local", "\n".join(report.errors))

    def test_local_review_artifacts_cannot_be_committed(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            rel = ".maintainer-review/ai-urban-loop/review-summary.json"
            self.write(root, rel, "{}")
            report = validate_submission(root, "maintainer", [rel], ["maintainer"])
            self.assertFalse(report.ok)
            self.assertIn("maintainer review artifacts must stay local", "\n".join(report.errors))

    def test_missing_required_section_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            rel = "submissions/alice/ai-urban-loop/proposal.md"
            self.write(root, rel, VALID_BODY.replace("## 参考资料", "## 资料"))
            report = validate_submission(root, "alice", [rel])
            self.assertFalse(report.ok)
            self.assertIn("missing required section", "\n".join(report.errors))

    def test_disallowed_asset_extension_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            proposal = "submissions/alice/ai-urban-loop/proposal.md"
            asset = "submissions/alice/ai-urban-loop/assets/run.py"
            self.write(root, proposal)
            self.write(root, asset, "print('nope')")
            report = validate_submission(root, "alice", [proposal, asset])
            self.assertFalse(report.ok)
            self.assertIn("assets must use", "\n".join(report.errors))

    def test_media_size_limits_distinguish_primary_media_from_sidecars(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            cases = [
                ("video.mp4", 6 * 1024 * 1024, None),
                ("audio.mp3", 6 * 1024 * 1024, None),
                ("poster.webp", 6 * 1024 * 1024, "media sidecars and posters"),
                ("oversize.mp4", 21 * 1024 * 1024, "video files must be"),
            ]

            for filename, size, expected_error in cases:
                with self.subTest(filename=filename):
                    rel = f"{base}/assets/media/{filename}"
                    path = root / rel
                    path.parent.mkdir(parents=True, exist_ok=True)
                    with path.open("wb") as handle:
                        handle.truncate(size)

                    report = validate_submission(root, "alice", [rel])
                    size_errors = [error for error in report.errors if "must be <=" in error]
                    if expected_error is None:
                        self.assertEqual([], size_errors)
                    else:
                        self.assertTrue(
                            any(expected_error in error for error in size_errors),
                            size_errors,
                        )
                    path.unlink()

    def test_proposal_must_embed_required_local_figures(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            path = root / base / "proposal.md"
            path.write_text(
                path.read_text(encoding="utf-8").replace(
                    "![核心指标复算与证据链图](assets/figures/metrics-evidence.png)",
                    "",
                ),
                encoding="utf-8",
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("must embed required human-readable diagram", "\n".join(report.errors))

    def test_proposal_embedded_image_must_exist_locally(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            (root / base / "assets/figures/site-overview.png").unlink()
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("embedded image `assets/figures/site-overview.png` is missing", "\n".join(report.errors))

    def test_proposal_embedded_image_cannot_be_remote(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            path = root / base / "proposal.md"
            path.write_text(
                path.read_text(encoding="utf-8").replace(
                    "assets/figures/site-overview.png",
                    "https://example.com/site-overview.png",
                ),
                encoding="utf-8",
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            errors = "\n".join(report.errors)
            self.assertIn("embedded images must use local assets/ paths", errors)
            self.assertIn("must embed required human-readable diagram", errors)

    def test_proposal_html_report_must_be_static_and_show_figures(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            path = root / base / "report/proposal.html"
            path.write_text(
                """<!doctype html><html><body><main>
<script src="https://example.com/app.js"></script>
<img src="../assets/figures/site-overview.png">
</main></body></html>""",
                encoding="utf-8",
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            errors = "\n".join(report.errors)
            self.assertIn("HTML report must not contain scripts", errors)
            self.assertIn("HTML report must not load remote resources", errors)
            self.assertIn("missing rendered figure reference `../assets/figures/land-use-structure.png`", errors)

    def test_privacy_pattern_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            rel = "submissions/alice/ai-urban-loop/proposal.md"
            self.write(root, rel, VALID_BODY + "\n联系人手机号 13812345678")
            report = validate_submission(root, "alice", [rel])
            self.assertFalse(report.ok)
            self.assertIn("疑似手机号", "\n".join(report.errors))

    def test_minimal_ai_package_passes_hard_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            report = validate_submission(root, "alice", changed)
            self.assertTrue(report.ok, report.errors)

    def test_changelog_submission_passes_hard_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            proposal = root / base / "proposal.md"
            proposal.write_text(
                proposal.read_text(encoding="utf-8").replace(
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"',
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"\niteration: "v0.1"',
                ),
                encoding="utf-8",
            )
            changelog = f"{base}/changelog.md"
            self.write(root, changelog, VALID_CHANGELOG)
            changed.append(changelog)

            report = validate_submission(root, "alice", changed)

            self.assertTrue(report.ok, report.errors)
            self.assertEqual(report.changelog_files, [changelog])

    def test_changelog_bad_version_heading_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            changelog = f"{base}/changelog.md"
            self.write(root, changelog, VALID_CHANGELOG.replace("## v0.1 - 2026-06-14", "## 首版"))
            changed.append(changelog)

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            self.assertIn("version heading", "\n".join(report.errors))

    def test_risk_json_submission_passes_hard_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            risk = f"{base}/risk.json"
            self.write_json(root, risk, VALID_RISK)
            changed.append(risk)

            report = validate_submission(root, "alice", changed)

            self.assertTrue(report.ok, report.errors)

    def test_high_risk_without_human_review_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            risk_data = json.loads(json.dumps(VALID_RISK))
            risk_data["dimensions"][0].pop("human_review")
            risk = f"{base}/risk.json"
            self.write_json(root, risk, risk_data)
            changed.append(risk)

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            self.assertIn("high risk scores need human_review", "\n".join(report.errors))

    def test_invalid_risk_score_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            risk_data = json.loads(json.dumps(VALID_RISK))
            risk_data["dimensions"][0]["score"] = 6
            risk = f"{base}/risk.json"
            self.write_json(root, risk, risk_data)
            changed.append(risk)

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            self.assertIn("score must be between 1 and 5", "\n".join(report.errors))

    def test_unknown_risk_dimension_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            risk_data = json.loads(json.dumps(VALID_RISK))
            risk_data["dimensions"][0]["id"] = "brand_risk"
            risk = f"{base}/risk.json"
            self.write_json(root, risk, risk_data)
            changed.append(risk)

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            self.assertIn("unknown risk dimension `brand_risk`", "\n".join(report.errors))

    def test_spatial_json_submission_passes_hard_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            spatial = f"{base}/spatial.json"
            self.write_json(root, spatial, VALID_SPATIAL)
            changed.append(spatial)

            report = validate_submission(root, "alice", changed)

            self.assertTrue(report.ok, report.errors)

    def test_spatial_json_coordinates_fail_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            spatial_data = json.loads(json.dumps(VALID_SPATIAL))
            spatial_data["items"][0]["geometry"]["coordinates"] = [116.3, 39.9]
            spatial = f"{base}/spatial.json"
            self.write_json(root, spatial, spatial_data)
            changed.append(spatial)

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            self.assertIn("geometry may only contain mode and label", "\n".join(report.errors))

    def test_spatial_json_non_concept_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            spatial_data = json.loads(json.dumps(VALID_SPATIAL))
            spatial_data["disclaimer"] = "official"
            spatial_data["items"][0]["geometry"]["mode"] = "coordinates"
            spatial = f"{base}/spatial.json"
            self.write_json(root, spatial, spatial_data)
            changed.append(spatial)

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            errors = "\n".join(report.errors)
            self.assertIn("disclaimer must be concept-only", errors)
            self.assertIn("geometry.mode must be concept", errors)

    def test_invalid_iteration_metadata_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            proposal = root / base / "proposal.md"
            proposal.write_text(
                proposal.read_text(encoding="utf-8").replace(
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"',
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"\niteration: "first draft"',
                ),
                encoding="utf-8",
            )

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            self.assertIn("iteration must look like", "\n".join(report.errors))

    def test_proposal_tracks_pass_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            proposal = root / base / "proposal.md"
            proposal.write_text(
                proposal.read_text(encoding="utf-8").replace(
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"',
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"\ntracks: ["ai-traffic-walkability", "civic-agent-governance"]',
                ),
                encoding="utf-8",
            )

            report = validate_submission(root, "alice", changed)

            self.assertTrue(report.ok, report.errors)

    def test_unknown_proposal_track_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            proposal = root / base / "proposal.md"
            proposal.write_text(
                proposal.read_text(encoding="utf-8").replace(
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"',
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"\ntracks: ["unknown-track"]',
                ),
                encoding="utf-8",
            )

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            self.assertIn("unknown track id `unknown-track`", "\n".join(report.errors))

    def test_too_many_proposal_tracks_fail_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            proposal = root / base / "proposal.md"
            proposal.write_text(
                proposal.read_text(encoding="utf-8").replace(
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"',
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"\ntracks: ["ai-traffic-walkability", "civic-agent-governance", "ai-public-services", "robotics-autonomous-mobility"]',
                ),
                encoding="utf-8",
            )

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            self.assertIn("tracks may include at most 3 track IDs", "\n".join(report.errors))

    def test_proposal_scenarios_pass_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            proposal = root / base / "proposal.md"
            proposal.write_text(
                proposal.read_text(encoding="utf-8").replace(
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"',
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"\nscenarios: ["ai-traffic-walkability", "enterprise-service-copilot"]',
                ),
                encoding="utf-8",
            )

            report = validate_submission(root, "alice", changed)

            self.assertTrue(report.ok, report.errors)

    def test_unknown_proposal_scenario_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            proposal = root / base / "proposal.md"
            proposal.write_text(
                proposal.read_text(encoding="utf-8").replace(
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"',
                    'summary: "围绕百年京张 AI 创新带提出 formal 城市设计方案、空间更新策略和 AI 场景。"\nscenarios: ["unknown-scenario"]',
                ),
                encoding="utf-8",
            )

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            self.assertIn("unknown scenario id `unknown-scenario`", "\n".join(report.errors))

    def test_unknown_language_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            path = root / base / "proposal.md"
            path.write_text(
                path.read_text(encoding="utf-8").replace('language: "zh"', 'language: "bilingual"'),
                encoding="utf-8",
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("language must be zh or en", "\n".join(report.errors))

    def test_english_submission_without_chinese_counterpart_only_warns(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            path = root / base / "proposal.md"
            path.write_text(english_primary(path.read_text(encoding="utf-8")), encoding="utf-8")
            self.promote_package_to_formal(root, base)
            report = validate_submission(root, "alice", changed)
            self.assertTrue(report.ok, report.errors)
            self.assertIn("proposal.zh.md", "\n".join(report.warnings))
            self.assertIn("legacy v1 package remains compatible", "\n".join(report.warnings))

    def test_new_bilingual_contract_without_counterparts_is_blocked(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            path = root / base / "proposal.md"
            path.write_text(
                path.read_text(encoding="utf-8").replace(
                    'language: "zh"',
                    'language: "zh"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_file: "proposal.en.md"',
                    1,
                ),
                encoding="utf-8",
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("bilingual contract requires", "\n".join(report.errors))

    def test_legacy_v2_manifest_only_update_remains_compatible(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            self.write_minimal_ai_package(root, base)
            path = root / base / "proposal.md"
            path.write_text(
                path.read_text(encoding="utf-8").replace(
                    'language: "zh"', 'language: "zh"\nproposal_format_version: "2"', 1
                ),
                encoding="utf-8",
            )
            readable = re.sub(
                r"\[(?:source|standard|depth|data|metric):[^\]\s]+\]",
                "",
                path.read_text(encoding="utf-8"),
            )
            readable_explanation = re.sub(
                r"\[(?:source|standard|depth|data|metric):[^\]\s]+\]",
                "",
                FORMAL_PARAGRAPH,
            )
            for heading in REQUIRED_SECTIONS:
                readable = readable.replace(
                    f"## {heading}\n",
                    f"## {heading}\n\n本节关键判断依据 [source:SITE-PACKAGE]。{readable_explanation}\n",
                    1,
                )
            path.write_text(readable, encoding="utf-8")
            report = validate_submission(root, "alice", [f"{base}/manifest.json"])
            self.assertTrue(report.ok, report.errors)

    def test_bilingual_contract_manifest_only_update_rechecks_full_package(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            self.write_minimal_ai_package(root, base)
            path = root / base / "proposal.md"
            path.write_text(
                path.read_text(encoding="utf-8").replace(
                    'language: "zh"',
                    'language: "zh"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_file: "proposal.en.md"',
                    1,
                ),
                encoding="utf-8",
            )
            report = validate_submission(root, "alice", [f"{base}/manifest.json"])
            self.assertFalse(report.ok)
            self.assertIn("bilingual contract requires", "\n".join(report.errors))

    def test_bilingual_contract_checks_manifest_only_text_bearing_figures(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.add_bilingual_v2_display(root, base, changed)
            extra = root / base / "assets" / "figures" / "report-only.png"
            extra.write_bytes(b"text-bearing report figure")
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append(
                {
                    "path": "assets/figures/report-only.png",
                    "role": "proposal_figure",
                    "required": True,
                    "language": "zh",
                    "sha256": hashlib.sha256(extra.read_bytes()).hexdigest(),
                }
            )
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
            )
            report = validate_submission(root, "alice", [f"{base}/manifest.json"])
            self.assertFalse(report.ok)
            self.assertIn("report-only.en.png", "\n".join(report.errors))

    def test_complete_bilingual_display_mapping_has_no_bilingual_warning(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            primary = root / base / "proposal.md"
            primary.write_text(
                primary.read_text(encoding="utf-8").replace(
                    'language: "zh"',
                    'language: "zh"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_file: "proposal.en.md"',
                    1,
                ),
                encoding="utf-8",
            )
            readable = re.sub(
                r"\[(?:source|standard|depth|data|metric):[^\]\s]+\]",
                "",
                primary.read_text(encoding="utf-8"),
            )
            readable_explanation = re.sub(
                r"\[(?:source|standard|depth|data|metric):[^\]\s]+\]",
                "",
                FORMAL_PARAGRAPH,
            )
            for heading in REQUIRED_SECTIONS:
                readable = readable.replace(
                    f"## {heading}\n",
                    f"## {heading}\n\n本节关键判断依据 [source:SITE-PACKAGE]。{readable_explanation}\n",
                    1,
                )
            primary.write_text(readable, encoding="utf-8")
            translated = primary.read_text(encoding="utf-8").replace(
                'language: "zh"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_file: "proposal.en.md"',
                'language: "en"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_of: "proposal.md"',
                1,
            )
            (root / base / "proposal.en.md").write_text(translated, encoding="utf-8")
            display_paths = [
                "proposal.md",
                "report/proposal.html",
                "visual/index.html",
                "drawings/a3-booklet.pdf",
                "drawings/a0-boards.pdf",
                "assets/figures/site-overview.png",
                "assets/figures/land-use-structure.png",
                "assets/figures/key-areas.png",
                "assets/figures/mobility-bluegreen.png",
                "assets/figures/metrics-evidence.png",
            ]
            companion_paths = []
            for rel in display_paths[1:]:
                source = root / base / rel
                target = source.with_name(f"{source.stem}.en{source.suffix}")
                target.write_bytes(source.read_bytes())
                companion_paths.append(target.relative_to(root / base).as_posix())
            companion_paths.insert(0, "proposal.en.md")
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            by_path = {item["path"]: item for item in manifest["files"]}
            if "proposal.md" not in by_path:
                proposal_item = {"path": "proposal.md", "role": "narrative", "required": True}
                manifest["files"].append(proposal_item)
                by_path["proposal.md"] = proposal_item
            for primary_rel, companion_rel in zip(display_paths, companion_paths):
                by_path[primary_rel]["language"] = "zh"
                if primary_rel != "manifest.json":
                    by_path[primary_rel]["sha256"] = hashlib.sha256((root / base / primary_rel).read_bytes()).hexdigest()
                companion = root / base / companion_rel
                manifest["files"].append({
                    "path": companion_rel,
                    "role": by_path[primary_rel]["role"],
                    "required": False,
                    "language": "en",
                    "translation_of": primary_rel,
                    "sha256": hashlib.sha256(companion.read_bytes()).hexdigest(),
                })
            manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            changed.extend(f"{base}/{path}" for path in companion_paths)
            report = validate_submission(root, "alice", changed)
            self.assertTrue(report.ok, report.errors)
            bilingual_warnings = [
                warning for warning in report.warnings
                if "bilingual" in warning or "counterpart" in warning or "should declare language" in warning
            ]
            self.assertEqual([], bilingual_warnings)

    def test_machine_data_only_update_does_not_trigger_bilingual_warning(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            report = validate_submission(root, "alice", [f"{base}/metrics.json"])
            self.assertTrue(report.ok, report.errors)
            self.assertNotIn("bilingual", "\n".join(report.warnings))
            self.assertNotIn("counterpart", "\n".join(report.warnings))

    def test_v2_simulation_metrics_must_match_task_records(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.add_bilingual_v2_display(root, base, changed)
            metrics_path = root / base / "metrics.json"
            metrics = json.loads(metrics_path.read_text(encoding="utf-8"))
            metrics["metrics"].update(
                {
                    "simulation_task_count": {
                        "status": "known",
                        "value": 2,
                        "unit": "count",
                        "source_files": ["simulation.json"],
                    },
                    "simulation_success_rate": {
                        "status": "known",
                        "value": 0.5,
                        "unit": "ratio",
                        "source_files": ["simulation.json"],
                    },
                    "tool_schema_pass_rate": {
                        "status": "known",
                        "value": 1.0,
                        "unit": "ratio",
                        "source_files": ["simulation.json"],
                    },
                    "energy_budget_violations": {
                        "status": "known",
                        "value": 0,
                        "unit": "count",
                        "source_files": ["simulation.json"],
                    },
                    "audit_completeness": {
                        "status": "known",
                        "value": 0.5,
                        "unit": "ratio",
                        "source_files": ["simulation.json"],
                    },
                }
            )
            metrics_path.write_text(
                json.dumps(metrics, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            self.write_json(
                root,
                f"{base}/simulation.json",
                {
                    "schema_version": "0.1.0",
                    "task_count": 2,
                    "tasks": [
                        {
                            "task_id": "SIM-001",
                            "outcome": "success",
                            "dispatch_schema_valid": True,
                            "energy_used_kwh": 3.0,
                            "energy_budget_kwh": 2.0,
                            "audit_complete": True,
                        },
                        {
                            "task_id": "SIM-002",
                            "outcome": "failed",
                            "dispatch_schema_valid": False,
                            "energy_used_kwh": 1.0,
                            "energy_budget_kwh": 2.0,
                            "audit_complete": False,
                        },
                    ],
                },
            )
            changed.extend([f"{base}/metrics.json", f"{base}/simulation.json"])

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            errors = "\n".join(report.errors)
            self.assertIn("metrics.tool_schema_pass_rate=1.0", errors)
            self.assertIn("task-derived value 0.5", errors)
            self.assertIn("metrics.energy_budget_violations=0", errors)
            self.assertIn("task-derived value 1", errors)

    def test_simulation_baseline_must_match_mirror_file_and_metric_scope(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.add_bilingual_v2_display(root, base, changed)

            metrics_path = root / base / "metrics.json"
            metrics = json.loads(metrics_path.read_text(encoding="utf-8"))
            metrics["metrics"]["simulation_success_rate"] = {
                "status": "known",
                "value": 0.5,
                "unit": "ratio",
                "source_files": ["simulation.json"],
            }
            metrics_path.write_text(
                json.dumps(metrics, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            self.write_json(
                root,
                f"{base}/simulation.json",
                {
                    "schema_version": "0.1.0",
                    "task_count": 2,
                    "tasks": [
                        {
                            "task_id": "SIM-001",
                            "outcome": "success",
                            "dispatch_schema_valid": True,
                            "energy_used_kwh": 1.0,
                            "energy_budget_kwh": 2.0,
                            "audit_complete": True,
                        },
                        {
                            "task_id": "SIM-002",
                            "outcome": "failed",
                            "dispatch_schema_valid": True,
                            "energy_used_kwh": 1.0,
                            "energy_budget_kwh": 2.0,
                            "audit_complete": True,
                        },
                    ],
                    "baselines": {
                        "urban_llm_harness": {"success_rate": 1.0},
                    },
                },
            )
            self.write_json(
                root,
                f"{base}/visual/assets/evaluation-baseline.json",
                {
                    "schema_version": "0.1.0",
                    "metrics": {
                        "urban_llm_harness": {"success_rate": 0.9},
                    },
                },
            )
            changed.extend(
                [
                    f"{base}/metrics.json",
                    f"{base}/simulation.json",
                    f"{base}/visual/assets/evaluation-baseline.json",
                ]
            )

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            errors = "\n".join(report.errors)
            self.assertIn("conflicts with baselines.urban_llm_harness.success_rate=1.0", errors)
            self.assertIn("urban_llm_harness must mirror the task-derived aggregate", errors)
            self.assertIn("evaluation-baseline.json", errors)

    def test_v2_ready_package_requires_true_self_checked_claim(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.add_bilingual_v2_display(root, base, changed)
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["package_state"] = "ready_for_review"
            manifest["validation_claim"]["readiness_contract"] = "persisted-self-check-v1"
            manifest["validation_claim"]["self_checked"] = False
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            self.assertIn(
                "must set validation_claim.self_checked=true",
                "\n".join(report.errors),
            )

    def test_unmarked_ready_package_keeps_legacy_intake_compatibility_warning(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["package_state"] = "ready_for_review"
            manifest["validation_claim"]["self_checked"] = False
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            report = validate_submission(root, "alice", changed)

            self.assertTrue(report.ok, report.errors)
            self.assertIn(
                "legacy package accepted for intake",
                "\n".join(report.warnings),
            )

    def test_trusted_base_prevents_missing_contract_downgrade_to_legacy(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["package_state"] = "ready_for_review"
            manifest["validation_claim"]["self_checked"] = False
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            report = validate_submission(
                root,
                "alice",
                changed,
                required_readiness_contract_dirs={base},
            )

            self.assertFalse(report.ok)
            self.assertIn("trusted base requires", "\n".join(report.errors))

    def test_ready_package_requires_persisted_four_gate_evidence(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["package_state"] = "ready_for_review"
            manifest["validation_claim"]["readiness_contract"] = "persisted-self-check-v1"
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            errors = "\n".join(report.errors)
            self.assertIn("must persist ok=true", errors)
            self.assertIn("must persist can_enter_formal_review=true", errors)
            self.assertIn("must persist pass/blocking gates", errors)

            self.write_json(
                root,
                f"{base}/self_check.json",
                {
                    "schema_version": "0.1.0",
                    "ok": True,
                    "can_enter_formal_review": True,
                    "checks": [
                        {
                            "check_id": gate,
                            "result": "pass",
                            "severity": "blocking",
                            "target": f"scripts/{target}",
                        }
                        for gate, target in [
                            ("DETERMINISTIC_VALIDATION", "validate_local_submission.py"),
                            ("SPATIAL_REVIEW", "spatial_review.py"),
                            ("VISUAL_PACKAGING", "visual_review.py"),
                            ("PROFESSIONAL_EVIDENCE", "professional_review.py"),
                        ]
                    ],
                },
            )

            report = validate_submission(root, "alice", changed)

            self.assertTrue(report.ok, report.errors)

    def test_pending_ready_self_check_evidence_is_allowed_only_for_mark_flow(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["package_state"] = "ready_for_review"
            manifest["validation_claim"]["readiness_contract"] = "persisted-self-check-v1"
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            report = validate_submission(
                root,
                "alice",
                changed,
                allow_pending_self_check=True,
            )

            self.assertTrue(report.ok, report.errors)
            self.assertIn(
                "must persist ok=true; pending self-check completion",
                "\n".join(report.warnings),
            )

    def test_pending_mark_flow_allows_blocking_failure_but_strict_validation_rejects_it(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["package_state"] = "ready_for_review"
            manifest["validation_claim"]["readiness_contract"] = "persisted-self-check-v1"
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            self_check_path = root / base / "self_check.json"
            self_check = json.loads(self_check_path.read_text(encoding="utf-8"))
            self_check["checks"][0]["result"] = "fail"
            self_check["checks"][0]["severity"] = "blocking"
            self_check_path.write_text(
                json.dumps(self_check, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            pending = validate_submission(
                root,
                "alice",
                changed,
                allow_pending_self_check=True,
            )
            self.assertTrue(pending.ok, pending.errors)
            self.assertIn(
                "blocking failed self-check `TEST_CHECK`; pending self-check replacement",
                "\n".join(pending.warnings),
            )

            strict = validate_submission(root, "alice", changed)
            self.assertFalse(strict.ok)
            self.assertIn(
                "formal submission has blocking failed self-check `TEST_CHECK`",
                "\n".join(strict.errors),
            )

    def test_trusted_base_contract_cannot_be_removed_or_downgraded(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["package_state"] = "ready_for_review"
            manifest["validation_claim"]["self_checked"] = False
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            report = validate_submission(
                root,
                "alice",
                changed,
                required_readiness_contract_dirs={base},
            )

            self.assertFalse(report.ok)
            self.assertIn(
                "trusted base requires validation_claim.readiness_contract",
                "\n".join(report.errors),
            )

    def test_unmarked_legacy_package_keeps_compatibility_warning(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)

            report = validate_submission(root, "alice", changed)

            self.assertTrue(report.ok, report.errors)

    def test_manifest_schema_declares_persisted_readiness_contract(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            self.write_minimal_ai_package(root, base)
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["validation_claim"]["readiness_contract"] = "persisted-self-check-v1"
            schema = json.loads(
                (REPO_ROOT / "brief/site-package/schemas/manifest.schema.json").read_text(
                    encoding="utf-8"
                )
            )
            jsonschema.validate(manifest, schema)

            manifest["validation_claim"]["readiness_contract"] = "unknown-contract"
            with self.assertRaises(jsonschema.ValidationError):
                jsonschema.validate(manifest, schema)

    def test_language_neutral_cannot_bypass_primary_display_pair(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append({
                "path": "proposal.md",
                "role": "narrative",
                "required": True,
                "language": "neutral",
            })
            manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            report = validate_submission(root, "alice", changed)
            self.assertTrue(report.ok, report.errors)
            self.assertIn("proposal.en.md", "\n".join(report.warnings))

    def test_localized_visual_html_receives_static_safety_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            localized = root / base / "visual" / "index.en.html"
            localized.write_text(
                '<!doctype html><html><body><iframe src="https://example.com"></iframe></body></html>',
                encoding="utf-8",
            )
            changed.append(f"{base}/visual/index.en.html")
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("visual/index.en.html", "\n".join(report.errors))
            self.assertIn("iframe", "\n".join(report.errors))

    def test_stale_translation_manifest_hash_is_non_blocking(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            translated_path = root / base / "proposal.en.md"
            translated_path.write_text(
                '---\ntitle: "English"\nauthor_github: "alice"\nlanguage: "en"\ntranslation_of: "proposal.md"\nlicense: "CC-BY-4.0"\nsummary: "English translation summary."\n---\n',
                encoding="utf-8",
            )
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append({
                "path": "proposal.en.md",
                "role": "narrative",
                "required": False,
                "language": "en",
                "translation_of": "proposal.md",
                "sha256": "0" * 64,
            })
            manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            changed.extend([f"{base}/proposal.en.md", f"{base}/manifest.json"])
            report = validate_submission(root, "alice", changed)
            self.assertTrue(report.ok, report.errors)
            self.assertIn("sha256 mismatch for `proposal.en.md`", "\n".join(report.warnings))

    def test_manifest_hash_mismatch_reports_declared_and_actual_digest(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            proposal = root / base / "proposal.md"
            proposal.write_text(proposal.read_text(encoding="utf-8") + "\nRevised.\n", encoding="utf-8")
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append(
                {"path": "proposal.md", "role": "narrative", "required": True, "sha256": "0" * 64}
            )
            manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

            report = validate_submission(root, "alice", changed)

            self.assertFalse(report.ok)
            mismatch = next(error for error in report.errors if "sha256 mismatch for `proposal.md`" in error)
            declared = "0" * 64
            actual = hashlib.sha256(proposal.read_bytes()).hexdigest()
            self.assertIn(f"declared={declared}", mismatch)
            self.assertIn(f"actual={actual}", mismatch)

    def test_manifest_self_referential_sha256_is_rejected(self) -> None:
        """manifest.json must not declare sha256 for itself (self-referential).

        All four official scripts (scaffold, finalize, backfill, refresh) skip
        manifest.json's own hash. The validator must reject it explicitly so
        that strict manifests do not carry meaningless integrity metadata.
        """
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            # Inject a deliberately wrong sha256 into the manifest.json entry
            for item in manifest["files"]:
                if item.get("path") == "manifest.json":
                    item["sha256"] = "0" * 64
                    break
            else:
                self.fail("manifest.json entry not found in files array")
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertTrue(
                any("manifest.json must not declare sha256" in e for e in report.errors),
                f"expected 'must not declare sha256' error, but got: {report.errors}",
            )

    def test_manifest_content_hash_mismatch_still_reported(self) -> None:
        """A real sha256 mismatch for a non-manifest file must still be reported.

        This is the regression guard: the self-hash fix must not accidentally
        silence genuine content drift for other files.
        """
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            # Tamper with metrics.json but keep the old manifest hash
            metrics_path = root / base / "metrics.json"
            original_hash = hashlib.sha256(metrics_path.read_bytes()).hexdigest()
            metrics_path.write_text(
                metrics_path.read_text(encoding="utf-8") + "\n  // tampered\n",
                encoding="utf-8",
            )
            # Ensure the manifest still has the original (now stale) hash
            manifest_path = root / base / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            for item in manifest["files"]:
                if item.get("path") == "metrics.json":
                    item["sha256"] = original_hash
                    break
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
            )
            report = validate_submission(root, "alice", changed)
            mismatch = next(
                error for error in report.errors if "sha256 mismatch for `metrics.json`" in error
            )
            self.assertIn(f"declared={original_hash}", mismatch)

    def test_removed_translation_file_is_non_blocking(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            self.write_minimal_ai_package(root, base)
            report = validate_submission(root, "alice", [f"{base}/proposal.en.md"])
            self.assertTrue(report.ok, report.errors)
            self.assertIn("was removed or is missing", "\n".join(report.warnings))

    def test_orphan_localized_display_file_only_warns(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            self.write_minimal_ai_package(root, base)
            orphan = root / base / "assets" / "figures" / "extra.en.png"
            orphan.write_bytes(b"translated image")
            report = validate_submission(root, "alice", [f"{base}/assets/figures/extra.en.png"])
            self.assertTrue(report.ok, report.errors)
            warnings = "\n".join(report.warnings)
            self.assertIn("has no primary display file `assets/figures/extra.png`", warnings)
            self.assertIn("list bilingual counterpart `assets/figures/extra.en.png`", warnings)

    def test_incomplete_translation_pdf_and_html_only_warn(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            pdf_path = root / base / "drawings" / "a3-booklet.en.pdf"
            pdf_path.write_bytes(b"%PDF-1.4\n%%EOF\n")
            html_path = root / base / "report" / "proposal.en.html"
            html_path.write_text("<p>Incomplete translation</p>", encoding="utf-8")
            changed.extend([
                f"{base}/drawings/a3-booklet.en.pdf",
                f"{base}/report/proposal.en.html",
            ])
            report = validate_submission(root, "alice", changed)
            self.assertTrue(report.ok, report.errors)
            warnings = "\n".join(report.warnings)
            self.assertIn("bilingual drawing PDF has no pages", warnings)
            self.assertIn("bilingual completeness does not block review", warnings)

    def test_non_utf8_translation_html_only_warns(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            report_path = root / base / "report" / "proposal.en.html"
            visual_path = root / base / "visual" / "index.en.html"
            report_path.write_bytes(b"\xff\xfe")
            visual_path.write_bytes(b"\xff\xfe")
            changed.extend([
                f"{base}/report/proposal.en.html",
                f"{base}/visual/index.en.html",
            ])
            report = validate_submission(root, "alice", changed)
            self.assertTrue(report.ok, report.errors)
            warnings = "\n".join(report.warnings)
            self.assertIn("report/proposal.en.html: proposal HTML report must be UTF-8 text", warnings)
            self.assertIn("visual/index.en.html: visual HTML must be UTF-8 text", warnings)

    def test_missing_formal_deliverables_fail(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            for rel in [
                "compliance_matrix.json",
                "standard_matrix.json",
                "design_depth_matrix.json",
                "visual/index.html",
                "drawings/a3-booklet.pdf",
                "drawings/a0-boards.pdf",
                "report/proposal.html",
                "report/copyright_statement.md",
            ]:
                (root / base / rel).unlink()
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            errors = "\n".join(report.errors)
            self.assertIn("compliance_matrix.json: required AI package file is missing", errors)
            self.assertIn("standard_matrix.json: required AI package file is missing", errors)
            self.assertIn("design_depth_matrix.json: required AI package file is missing", errors)
            self.assertIn("visual/index.html: required AI package file is missing", errors)
            self.assertIn("drawings/a3-booklet.pdf: required AI package file is missing", errors)
            self.assertIn("drawings/a0-boards.pdf: required AI package file is missing", errors)
            self.assertIn("report/proposal.html: required AI package file is missing", errors)
            self.assertIn("report/copyright_statement.md: required AI package file is missing", errors)

    def test_incomplete_compliance_matrix_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.write_json(
                root,
                f"{base}/compliance_matrix.json",
                {
                    "schema_version": "0.1.0",
                    "requirements": [
                        {
                            "requirement_id": "1.3.1",
                            "mandatory": True,
                            "report_sections": ["三层范围工作框架"],
                            "geojson_layers": ["geometry/site_boundary.geojson"],
                            "metrics": ["site_area_sqm"],
                            "drawings": ["drawings/a3-booklet.pdf"],
                            "visual_sections": ["任务覆盖"],
                            "source_ids": ["SITE-PACKAGE"],
                            "assumption_ids": ["A-CONTROLS-001"],
                            "self_check_ids": ["TEST_CHECK"],
                        }
                    ],
                },
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("missing required announcement or agent taskbook coverage", "\n".join(report.errors))

    def test_incomplete_standard_matrix_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.write_json(
                root,
                f"{base}/standard_matrix.json",
                {
                    "schema_version": "0.1.0",
                    "standards": [
                        {
                            "standard_id": "PROJECT-OFFICIAL-ANNOUNCEMENT",
                            "requirement_zh": "公告响应",
                            "professional_dimension": "规划",
                            "mandatory": True,
                            "review_status": "data_gap",
                            "proposal_sections": ["设计依据与资料清单"],
                            "drawing_refs": [],
                            "geometry_refs": ["geometry/site_boundary.geojson"],
                            "metric_refs": ["site_area_sqm"],
                            "source_ids": ["SITE-PACKAGE"],
                            "assumption_ids": ["A-CONTROLS-001"],
                            "self_check_ids": ["TEST_CHECK"],
                            "evidence_summary_zh": "证据不足。",
                        }
                    ],
                },
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            errors = "\n".join(report.errors)
            self.assertIn("mandatory standard responses must be addressed", errors)
            self.assertIn("drawing_refs must be a non-empty string array", errors)
            self.assertIn("missing required standard response coverage", errors)

    def test_incomplete_design_depth_matrix_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.update_json(
                root,
                f"{base}/design_depth_matrix.json",
                lambda data: data["items"][0].update({"status": "data_gap"}),
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("formal design depth item status must be complete", "\n".join(report.errors))

    def test_proposal_missing_evidence_references_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            proposal_path = root / base / "proposal.md"
            proposal_path.write_text(
                proposal_path.read_text(encoding="utf-8").replace("[data:geometry/land_use.geojson#LAND_USE-001]", ""),
                encoding="utf-8",
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("missing data reference [data:geometry/land_use.geojson#...]", "\n".join(report.errors))

    def test_v2_uses_section_anchors_without_repeating_complete_index(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            proposal_path = root / base / "proposal.md"
            text = proposal_path.read_text(encoding="utf-8")
            text = text.replace('language: "zh"', 'language: "zh"\nproposal_format_version: "2"', 1)
            text = re.sub(r"\[(?:source|standard|depth|data|metric):[^\]\s]+\]", "", text)
            readable_explanation = re.sub(
                r"\[(?:source|standard|depth|data|metric):[^\]\s]+\]",
                "",
                FORMAL_PARAGRAPH,
            )
            for heading in REQUIRED_SECTIONS:
                text = text.replace(
                    f"## {heading}\n",
                    f"## {heading}\n\n本节关键判断依据 [source:SITE-PACKAGE]。{readable_explanation}\n",
                    1,
                )
            proposal_path.write_text(text, encoding="utf-8")
            self.add_bilingual_v2_display(root, base, changed)
            report = validate_submission(root, "alice", changed)
            self.assertTrue(report.ok, "\n".join(report.errors))
            self.assertNotIn("missing known metric reference", "\n".join(report.errors))

    def test_v2_rejects_dense_inline_evidence_dump(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            proposal_path = root / base / "proposal.md"
            text = proposal_path.read_text(encoding="utf-8")
            text = text.replace('language: "zh"', 'language: "zh"\nproposal_format_version: "2"', 1)
            text = text.replace(
                "## 设计依据与资料清单\n",
                "## 设计依据与资料清单\n\n完整索引 "
                "[source:SITE-PACKAGE] [source:OFFICIAL-ANNOUNCEMENT] "
                "[source:AGENT-TASKBOOK] [source:BOUNDARY-SOURCE]\n",
                1,
            )
            proposal_path.write_text(text, encoding="utf-8")
            self.add_bilingual_v2_display(root, base, changed)
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("consecutive evidence markers", "\n".join(report.errors))

    def test_non_formal_stage_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.update_json(
                root,
                f"{base}/manifest.json",
                lambda data: data.update({"submission_stage": "draft"}),
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("submission_stage must be formal", "\n".join(report.errors))

    def test_unclosed_ai_package_polygon_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            site_path = root / base / "geometry/site_boundary.geojson"
            site = json.loads(site_path.read_text(encoding="utf-8"))
            site["features"][0]["geometry"]["coordinates"][0].pop()
            site_path.write_text(json.dumps(site), encoding="utf-8")
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("invalid or unclosed geometry", "\n".join(report.errors))

    def test_local_submission_wrapper_validates_directory(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            self.write_minimal_ai_package(root, base)
            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "validate_local_submission.py"),
                    base,
                    "--repo-root",
                    str(root),
                    "--pr-author",
                    "alice",
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            self.assertIn("Result: PASS", completed.stdout)

    def test_local_submission_wrapper_can_enforce_forward_manifest_contract(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            self.write_minimal_ai_package(root, base)
            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "validate_local_submission.py"),
                    base,
                    "--repo-root",
                    str(root),
                    "--pr-author",
                    "alice",
                    "--strict-manifest",
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertNotEqual(completed.returncode, 0)
            self.assertIn("new manifests must adopt schema_version 0.2.x", completed.stdout)

    def test_formal_blocking_self_check_fails_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.promote_package_to_formal(root, base)
            self.write_json(
                root,
                f"{base}/self_check.json",
                {
                    "schema_version": "0.1.0",
                    "checks": [
                        {
                            "check_id": "BOUNDARY_MISSING",
                            "result": "fail",
                            "severity": "blocking",
                            "target": "geometry/site_boundary.geojson",
                        }
                    ],
                },
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("blocking failed self-check", "\n".join(report.errors))

    def test_blocking_self_check_always_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.write_json(
                root,
                f"{base}/self_check.json",
                {
                    "schema_version": "0.1.0",
                    "checks": [
                        {
                            "check_id": "BOUNDARY_MISSING",
                            "result": "fail",
                            "severity": "blocking",
                            "target": "geometry/site_boundary.geojson",
                        }
                    ],
                },
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("blocking failed self-check", "\n".join(report.errors))

    def test_formal_map_viewport_site_boundary_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.promote_package_to_formal(root, base)
            self.update_json(
                root,
                f"{base}/geometry/site_boundary.geojson",
                lambda data: data["features"][0]["properties"].update(
                    {
                        "source_type": "agent_inferred_from_public_data",
                        "confidence": "low",
                        "geometry_role": "map_viewport",
                        "official_boundary": False,
                    }
                ),
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("formal submissions require an official site boundary", "\n".join(report.errors))

    def test_invalid_package_enums_fail_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.promote_package_to_formal(root, base)
            self.update_json(
                root,
                f"{base}/geometry/land_use.geojson",
                lambda data: data["features"][0]["properties"].update(
                    {
                        "layer": "BAD_LAYER",
                        "source_type": "bad-source",
                        "confidence": "bad-confidence",
                        "geometry_role": "bad-role",
                        "land_use_code": "BAD",
                    }
                ),
            )
            self.update_json(
                root,
                f"{base}/geometry/roads.geojson",
                lambda data: data["features"][0]["properties"].update(
                    {"road_class": "bad-road"}
                ),
            )
            self.update_json(
                root,
                f"{base}/geometry/buildings.geojson",
                lambda data: data["features"][0]["properties"].update(
                    {"building_type": "bad-building"}
                ),
            )
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            errors = "\n".join(report.errors)
            for field in [
                "layer",
                "source_type",
                "confidence",
                "geometry_role",
                "land_use_code",
                "road_class",
                "building_type",
            ]:
                self.assertIn(f"unknown {field}", errors)
            self.assertEqual(7, errors.count("; allowed: "))
            self.assertIn("allowed: AI_SERVICE_ZONE", errors)
            self.assertIn("allowed: agent_generated_design", errors)
            self.assertIn("allowed: high, low, medium, unknown", errors)
            self.assertIn("allowed: analysis_helper", errors)
            self.assertIn("allowed: 05, 07, 0701", errors)
            self.assertIn("allowed: arterial, branch, cycleway", errors)
            self.assertIn("allowed: ai_r_and_d", errors)

    def test_formal_empty_core_geometry_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed = self.write_minimal_ai_package(root, base)
            self.promote_package_to_formal(root, base)
            self.write_json(root, f"{base}/geometry/land_use.geojson", {"type": "FeatureCollection", "features": []})
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertIn("needs at least one feature", "\n".join(report.errors))


if __name__ == "__main__":
    unittest.main()
