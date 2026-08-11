from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys
import tempfile
import threading
import unittest
from unittest import mock


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from ai_review_submission import (  # noqa: E402
    OpenAIResponsesClient,
    ReviewError,
    collect_visual_inputs,
    content_preflight,
    is_organizer_owned_action,
    run_ai_review,
    validate_base_url,
    validate_output_dir,
)


SUBMISSION = ROOT / "submissions" / "alice" / "fixture-proposal"
SUBMISSION_REL = "submissions/alice/fixture-proposal"
DIMENSIONS = [
    ("brief_alignment", "任务书相关性"),
    ("originality", "原创性"),
    ("ai_planning_innovation", "AI 与城市规划创新性"),
    ("implementation_feasibility", "可实施性"),
    ("public_interest_inclusion", "公共利益与包容性"),
    ("risk_compliance", "风险与合规意识"),
    ("expression_completeness", "表达完整度"),
]


def valid_review() -> dict:
    return {
        "schema_version": "0.1.0",
        "submission_dir": SUBMISSION_REL,
        "recommendation": "formal-review-ready",
        "can_enter_formal_review": True,
        "mandatory_rejection": {
            "result": "pass",
            "hits": [],
            "notes_zh": "未发现自动强制拒绝证据，但版权结论仍以提交证据为限。",
        },
        "gate_checks": {
            key: {"status": "pass", "summary_zh": "检查通过。"}
            for key in [
                "deterministic_validation",
                "spatial_review",
                "visual_review",
                "professional_evidence_review",
            ]
        },
        "rubric_scores": [
            {
                "dimension_id": dimension_id,
                "dimension_zh": title,
                "score": 4,
                "comment_zh": "方案提供了可定位的正文、结构化数据和图件证据，达到较强水平。",
                "evidence_refs": ["proposal.md", "[depth:overall_spatial_structure]"],
                "risks_zh": [],
                "required_repairs_zh": [],
            }
            for dimension_id, title in DIMENSIONS
        ],
        "data_gaps_zh": ["官方边界仍未提供，后续需要复算。"],
        "required_next_actions_zh": [],
        "pr_comment_markdown": "# AI 评审意见\n\n结论：可进入正式专业评分。七维证据完整，并保留正式边界发布后的复算要求。",
    }


class FakeClient:
    def __init__(self, review: dict | None = None) -> None:
        self.review = review or valid_review()
        self.payload = None

    def create_response(self, payload: dict) -> dict:
        self.payload = payload
        return {
            "id": "resp_test",
            "output_text": json.dumps(self.review, ensure_ascii=False),
            "usage": {"input_tokens": 100, "output_tokens": 50},
        }


class AIReviewSubmissionTests(unittest.TestCase):
    def setUp(self) -> None:
        self.review_input_patcher = mock.patch(
            "ai_review_submission.build_review_input",
            return_value={
                "submission_dir": SUBMISSION_REL,
                "author": "alice",
                "pre_submit_self_check": {
                    "stdout": {
                        key: {"ok": True}
                        for key in [
                            "deterministic_validation",
                            "spatial_review",
                            "visual_review",
                            "professional_review",
                        ]
                    }
                },
            },
        )
        self.package_hash_patcher = mock.patch(
            "ai_review_submission.package_sha256", return_value="a" * 64
        )
        self.review_input_patcher.start()
        self.package_hash_patcher.start()

    def tearDown(self) -> None:
        self.package_hash_patcher.stop()
        self.review_input_patcher.stop()

    def test_base_url_requires_secure_transport_except_localhost(self) -> None:
        validate_base_url("https://api.openai.com/v1")
        validate_base_url("http://127.0.0.1:8000/v1")
        with self.assertRaisesRegex(ReviewError, "HTTPS"):
            validate_base_url("http://example.com/v1")
        with self.assertRaisesRegex(ReviewError, "embed credentials"):
            validate_base_url("https://user:secret@example.com/v1")

    def test_output_inside_repo_must_use_ignored_review_root(self) -> None:
        validate_output_dir(ROOT, ROOT / ".maintainer-review" / "proposal")
        with tempfile.TemporaryDirectory() as tmp:
            validate_output_dir(ROOT, Path(tmp) / "review")
        with self.assertRaisesRegex(ReviewError, "must stay under"):
            validate_output_dir(ROOT, ROOT / "review-results")

    def test_responses_http_client_posts_bearer_authenticated_json(self) -> None:
        received: dict = {}

        class Handler(BaseHTTPRequestHandler):
            def do_POST(self) -> None:  # noqa: N802
                length = int(self.headers["Content-Length"])
                received["path"] = self.path
                received["authorization"] = self.headers.get("Authorization")
                received["payload"] = json.loads(self.rfile.read(length))
                body = json.dumps({"id": "resp_http", "output_text": "{}"}).encode()
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def log_message(self, format: str, *args) -> None:
                return

        server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            client = OpenAIResponsesClient(
                "secret-test-key", f"http://127.0.0.1:{server.server_port}/v1", timeout=5, retries=0
            )
            response = client.create_response({"model": "gpt-test", "input": "hello"})
        finally:
            server.shutdown()
            thread.join(timeout=5)
            server.server_close()
        self.assertEqual("resp_http", response["id"])
        self.assertEqual("/v1/responses", received["path"])
        self.assertEqual("Bearer secret-test-key", received["authorization"])
        self.assertEqual("gpt-test", received["payload"]["model"])

    def test_content_preflight_detects_unreplaced_generated_marker(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission = Path(tmp)
            (submission / "proposal.md").write_text(
                "PARTICIPANT-DESIGN: replace", encoding="utf-8"
            )
            issues = content_preflight(submission)
            self.assertTrue(any("PARTICIPANT-DESIGN" in item for item in issues))

    def test_multimodal_structured_review_writes_usable_outputs(self) -> None:
        client = FakeClient()
        with tempfile.TemporaryDirectory() as tmp, mock.patch(
            "ai_review_submission.collect_visual_inputs",
            return_value=([{"type": "input_image", "image_url": "data:image/png;base64,AA=="}], ["figure.png"], []),
        ), mock.patch("ai_review_submission.content_preflight", return_value=[]):
            out = Path(tmp) / "review"
            result = run_ai_review(
                ROOT, SUBMISSION, "alice", out, client, "gpt-test", "https://api.openai.com/v1",
                "high", 7, 1024 * 1024, False,
            )
            self.assertEqual("formal-review-ready", result["review"]["recommendation"])
            self.assertEqual(80.0, result["decision"]["weighted_score_100"])
            self.assertEqual("publish-qualified", result["decision"]["publication_recommendation"])
            self.assertEqual("a" * 64, result["decision"]["reviewed_package_sha256"])
            self.assertIn(result["decision"]["reviewed_package_sha256"], result["review"]["pr_comment_markdown"])
            self.assertTrue((out / "ai-review.json").is_file())
            self.assertTrue((out / "model-output.json").is_file())
            self.assertTrue((out / "ai-decision.json").is_file())
            self.assertTrue((out / "ai-review-report.md").is_file())
            self.assertTrue((out / "pr-comment.md").is_file())
            self.assertEqual("json_schema", client.payload["text"]["format"]["type"])
            self.assertNotIn("$schema", client.payload["text"]["format"]["schema"])
            self.assertNotIn("$id", client.payload["text"]["format"]["schema"])
            api_schema = client.payload["text"]["format"]["schema"]
            self.assertEqual("string", api_schema["properties"]["schema_version"]["type"])
            self.assertEqual("string", api_schema["properties"]["recommendation"]["type"])
            self.assertFalse(client.payload["store"])
            content = client.payload["input"][0]["content"]
            self.assertTrue(any(item["type"] == "input_image" for item in content))

    def test_visual_preflight_failure_cannot_be_overridden_by_model(self) -> None:
        client = FakeClient()
        with tempfile.TemporaryDirectory() as tmp, mock.patch(
            "ai_review_submission.collect_visual_inputs",
            return_value=([], [], ["Could not render drawings/a3-booklet.pdf: invalid PDF"]),
        ):
            result = run_ai_review(
                ROOT, SUBMISSION, "alice", Path(tmp), client, "gpt-test",
                "https://api.openai.com/v1", "high", 7, 1024 * 1024, False,
            )
            self.assertEqual("request-changes", result["review"]["recommendation"])
            self.assertFalse(result["review"]["can_enter_formal_review"])
            self.assertEqual("fail", result["review"]["gate_checks"]["visual_review"]["status"])
            self.assertEqual("do-not-publish", result["decision"]["publication_recommendation"])
            comment = (Path(tmp) / "pr-comment.md").read_text(encoding="utf-8")
            self.assertIn("request-changes", comment)
            self.assertIn("视觉与文件可读性：**FAIL**", comment)
            self.assertNotIn("结论：可进入正式专业评分", comment)

    def test_wrong_model_path_and_required_repairs_are_enforced(self) -> None:
        review = valid_review()
        review["submission_dir"] = "submissions/attacker/wrong-path"
        review["rubric_scores"][0]["required_repairs_zh"] = ["补充任务书条款逐项对应表。"]
        client = FakeClient(review)
        with tempfile.TemporaryDirectory() as tmp, mock.patch(
            "ai_review_submission.collect_visual_inputs", return_value=([], [], [])
        ), mock.patch("ai_review_submission.content_preflight", return_value=[]):
            result = run_ai_review(
                ROOT, SUBMISSION, "alice", Path(tmp), client, "gpt-test",
                "https://api.openai.com/v1", "high", 7, 1024 * 1024, False,
            )
            self.assertEqual(SUBMISSION_REL, result["review"]["submission_dir"])
            self.assertEqual("request-changes", result["review"]["recommendation"])
            self.assertTrue(any("1 项详细 required repairs" in item for item in result["review"]["required_next_actions_zh"]))
            self.assertEqual("do-not-publish", result["decision"]["publication_recommendation"])

    def test_mandatory_hits_force_rejection_even_if_model_marks_pass(self) -> None:
        review = valid_review()
        review["mandatory_rejection"]["hits"] = ["发现未脱敏个人手机号。"]
        client = FakeClient(review)
        with tempfile.TemporaryDirectory() as tmp, mock.patch(
            "ai_review_submission.collect_visual_inputs", return_value=([], [], [])
        ), mock.patch("ai_review_submission.content_preflight", return_value=[]):
            result = run_ai_review(
                ROOT, SUBMISSION, "alice", Path(tmp), client, "gpt-test",
                "https://api.openai.com/v1", "high", 7, 1024 * 1024, False,
            )
            self.assertEqual("reject", result["review"]["recommendation"])
            self.assertEqual("fail", result["review"]["mandatory_rejection"]["result"])
            self.assertFalse(result["review"]["can_enter_formal_review"])

    def test_invalid_model_schema_is_rejected(self) -> None:
        client = FakeClient({"recommendation": "formal-review-ready"})
        with tempfile.TemporaryDirectory() as tmp, mock.patch(
            "ai_review_submission.collect_visual_inputs", return_value=([], [], [])
        ):
            with self.assertRaisesRegex(ReviewError, "does not match advisory schema"):
                run_ai_review(
                    ROOT, SUBMISSION, "alice", Path(tmp), client, "gpt-test",
                    "https://api.openai.com/v1", "high", 7, 1024 * 1024, False,
                )

    def test_failed_rerun_removes_stale_final_results(self) -> None:
        client = FakeClient({"recommendation": "formal-review-ready"})
        with tempfile.TemporaryDirectory() as tmp, mock.patch(
            "ai_review_submission.collect_visual_inputs", return_value=([], [], [])
        ):
            out = Path(tmp) / "review"
            out.mkdir()
            for name in ["ai-review.json", "ai-decision.json", "pr-comment.md"]:
                (out / name).write_text("stale", encoding="utf-8")
            with self.assertRaisesRegex(ReviewError, "does not match advisory schema"):
                run_ai_review(
                    ROOT, SUBMISSION, "alice", out, client, "gpt-test",
                    "https://api.openai.com/v1", "high", 7, 1024 * 1024, False,
                )
            self.assertTrue((out / "request-metadata.json").is_file())
            self.assertFalse((out / "ai-review.json").exists())
            self.assertFalse((out / "ai-decision.json").exists())
            self.assertFalse((out / "pr-comment.md").exists())

    def test_visual_evidence_truncation_fails_preflight(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            figures = []
            try:
                from PIL import Image
                for index in range(3):
                    path = root / f"figure-{index}.png"
                    Image.new("RGB", (2, 2), "white").save(path)
                    figures.append(path.name)
            except ImportError:  # pragma: no cover - Pillow is a project test dependency.
                self.skipTest("Pillow unavailable")
            with mock.patch("ai_review_submission.FIGURE_PATHS", figures), mock.patch(
                "ai_review_submission.render_pdf_previews", return_value=[]
            ), mock.patch("ai_review_submission.render_html_previews", return_value=[]):
                _, included, warnings = collect_visual_inputs(root, root / "rendered", 2, 1024 * 1024)
            self.assertEqual(2, len(included))
            self.assertTrue(any("cap reached" in item for item in warnings))

    def test_dry_run_needs_no_api_key_and_redacts_evidence_preview(self) -> None:
        with tempfile.TemporaryDirectory() as tmp, mock.patch(
            "ai_review_submission.collect_visual_inputs", return_value=([], [], [])
        ):
            out = Path(tmp) / "dry"
            result = run_ai_review(
                ROOT, SUBMISSION, "alice", out, None, "gpt-test",
                "https://api.openai.com/v1", "high", 7, 1024 * 1024, True,
            )
            self.assertTrue(result["dry_run"])
            preview = (out / "request-preview.json").read_text(encoding="utf-8")
            self.assertIn("review evidence omitted", preview)
            self.assertNotIn("OPENAI_API_KEY", preview)
            self.assertIn("content_preflight_issues", result)

    def test_visual_packet_includes_present_english_figure_counterparts(self) -> None:
        try:
            from PIL import Image
        except ImportError:  # pragma: no cover - Pillow is a project test dependency.
            self.skipTest("Pillow unavailable")
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            figure_dir = root / "assets" / "figures"
            figure_dir.mkdir(parents=True)
            for name in ["site-overview.png", "site-overview.en.png"]:
                Image.new("RGB", (2, 2), "white").save(figure_dir / name)
            with mock.patch(
                "ai_review_submission.FIGURE_PATHS",
                ["assets/figures/site-overview.png"],
            ), mock.patch("ai_review_submission.render_pdf_previews", return_value=[]), mock.patch(
                "ai_review_submission.render_html_previews", return_value=[]
            ):
                _, included, warnings = collect_visual_inputs(root, root / "rendered", 2, 1024 * 1024)
            self.assertEqual(
                included,
                ["assets/figures/site-overview.png", "assets/figures/site-overview.en.png"],
            )
            self.assertEqual([], warnings)

    def test_visual_packet_keeps_all_bilingual_previews_with_eighteen_image_budget(self) -> None:
        try:
            from PIL import Image
        except ImportError:  # pragma: no cover - Pillow is a project test dependency.
            self.skipTest("Pillow unavailable")
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            figure_dir = root / "assets" / "figures"
            figure_dir.mkdir(parents=True)
            figure_paths = [
                "assets/figures/site-overview.png",
                "assets/figures/land-use-structure.png",
                "assets/figures/key-areas.png",
                "assets/figures/mobility-bluegreen.png",
                "assets/figures/metrics-evidence.png",
            ]
            for rel in figure_paths:
                primary = root / rel
                counterpart = primary.with_name(f"{primary.stem}.en{primary.suffix}")
                Image.new("RGB", (2, 2), "white").save(primary)
                Image.new("RGB", (2, 2), "white").save(counterpart)

            for rel in [
                "drawings/a3-booklet.pdf",
                "drawings/a0-boards.pdf",
                "drawings/a3-booklet.en.pdf",
                "drawings/a0-boards.en.pdf",
                "report/proposal.html",
                "visual/index.html",
                "report/proposal.en.html",
                "visual/index.en.html",
            ]:
                path = root / rel
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(b"fixture")

            rendered = root / "rendered"
            rendered.mkdir()
            def previews(prefix: str) -> list[Path]:
                paths = [rendered / f"{prefix}-a3-01.png", rendered / f"{prefix}-a0-01.png"]
                for path in paths:
                    Image.new("RGB", (2, 2), "white").save(path)
                return paths

            with mock.patch("ai_review_submission.FIGURE_PATHS", figure_paths), mock.patch(
                "ai_review_submission.render_pdf_previews",
                side_effect=[previews("pdf-zh"), previews("pdf-en")],
            ), mock.patch(
                "ai_review_submission.render_html_previews",
                side_effect=[previews("html-zh"), previews("html-en")],
            ):
                _, included, warnings = collect_visual_inputs(
                    root, rendered, 18, 1024 * 1024
                )
            self.assertEqual(18, len(included))
            self.assertIn("rendered/html-en-a3-01.png", included)
            self.assertIn("rendered/html-en-a0-01.png", included)
            self.assertEqual([], warnings)

    def test_organizer_owned_next_action_moves_to_data_gap(self) -> None:
        review = valid_review()
        for item in review["rubric_scores"]:
            item["score"] = 5
        review["required_next_actions_zh"] = ["组织方：发布官方几何后重算指标。"]
        client = FakeClient(review)
        with tempfile.TemporaryDirectory() as tmp, mock.patch(
            "ai_review_submission.collect_visual_inputs", return_value=([], [], [])
        ), mock.patch("ai_review_submission.content_preflight", return_value=[]):
            result = run_ai_review(
                ROOT, SUBMISSION, "alice", Path(tmp), client, "gpt-test",
                "https://api.openai.com/v1", "high", 18, 1024 * 1024, False,
            )
        self.assertEqual("featured-candidate", result["decision"]["publication_recommendation"])
        self.assertEqual([], result["review"]["required_next_actions_zh"])
        self.assertIn("组织方：发布官方几何后重算指标。", result["review"]["data_gaps_zh"])
        self.assertTrue(any("moved organizer-owned" in item for item in result["decision"]["local_gate_overrides"]))

    def test_participant_repair_mentioning_official_geometry_stays_blocking(self) -> None:
        review = valid_review()
        for item in review["rubric_scores"]:
            item["score"] = 5
        review["required_next_actions_zh"] = [
            "修正把非官方边界误标为官方边界的声明。",
            "删除声称使用官方几何的虚假描述。",
        ]
        client = FakeClient(review)
        with tempfile.TemporaryDirectory() as tmp, mock.patch(
            "ai_review_submission.collect_visual_inputs", return_value=([], [], [])
        ), mock.patch("ai_review_submission.content_preflight", return_value=[]):
            result = run_ai_review(
                ROOT, SUBMISSION, "alice", Path(tmp), client, "gpt-test",
                "https://api.openai.com/v1", "high", 7, 1024 * 1024, False,
            )
        self.assertEqual("request-changes", result["review"]["recommendation"])
        self.assertFalse(result["review"]["can_enter_formal_review"])
        self.assertEqual(
            review["required_next_actions_zh"], result["review"]["required_next_actions_zh"]
        )
        self.assertEqual("do-not-publish", result["decision"]["publication_recommendation"])
        self.assertFalse(any("moved organizer-owned" in item for item in result["decision"]["local_gate_overrides"]))

    def test_ambiguous_organizer_language_stays_blocking(self) -> None:
        participant_repairs = [
            "由组织方提供的几何被错误解读，请参赛者修正图件。",
            "待组织方确认前，请删除已获正式批准的表述。",
            "等待主办方发布边界前，请参赛者修正图件。",
        ]
        for action in participant_repairs:
            with self.subTest(action=action):
                self.assertFalse(is_organizer_owned_action(action))
                review = valid_review()
                for item in review["rubric_scores"]:
                    item["score"] = 5
                review["required_next_actions_zh"] = [action]
                client = FakeClient(review)
                with tempfile.TemporaryDirectory() as tmp, mock.patch(
                    "ai_review_submission.collect_visual_inputs", return_value=([], [], [])
                ), mock.patch("ai_review_submission.content_preflight", return_value=[]):
                    result = run_ai_review(
                        ROOT, SUBMISSION, "alice", Path(tmp), client, "gpt-test",
                        "https://api.openai.com/v1", "high", 7, 1024 * 1024, False,
                    )
                self.assertEqual("request-changes", result["review"]["recommendation"])
                self.assertEqual([action], result["review"]["required_next_actions_zh"])
                self.assertFalse(any("moved organizer-owned" in item for item in result["decision"]["local_gate_overrides"]))

    def test_submission_path_author_must_match_pr_author(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            with self.assertRaisesRegex(ReviewError, "does not match"):
                run_ai_review(
                    ROOT, SUBMISSION, "someone-else", Path(tmp), None, "gpt-test",
                    "https://api.openai.com/v1", "high", 7, 1024 * 1024, True,
                )

    def test_submission_path_author_match_is_case_insensitive(self) -> None:
        with tempfile.TemporaryDirectory() as tmp, mock.patch(
            "ai_review_submission.collect_visual_inputs", return_value=([], [], [])
        ):
            result = run_ai_review(
                ROOT, SUBMISSION, "ALICE", Path(tmp), None, "gpt-test",
                "https://api.openai.com/v1", "high", 7, 1024 * 1024, True,
            )
            self.assertTrue(result["dry_run"])


if __name__ == "__main__":
    unittest.main()
