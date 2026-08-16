import json
import hashlib
import importlib.util
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


class SitePackageContractTests(unittest.TestCase):
    def test_ready_revision_guides_render_before_manifest_refresh(self) -> None:
        guides = {
            "README.md": ("检查失败或收到修改意见时", "先重新渲染", "refresh_submission_manifest.py", "完整自检", "preflight"),
            "skills/urban-design-ai-submission/SKILL.md": (
                "13. If any check or review fails",
                "render all derived HTML, figures, and PDFs",
                "refresh_submission_manifest.py",
                "complete self-check",
                "preflight",
            ),
            "skills/urban-design-ai-submission/references/lightweight-workspace.md": (
                "When a check fails or a reviewer requests changes",
                "render_proposal_html.py",
                "refresh_submission_manifest.py",
                "self_check_submission.py",
                "participant_preflight.py",
            ),
        }
        for relative_path, steps in guides.items():
            with self.subTest(path=relative_path):
                text = (REPO_ROOT / relative_path).read_text(encoding="utf-8")
                anchor, *ordered_steps = steps
                paragraph = text[text.index(anchor):].split("\n", 1)[0]
                positions = [paragraph.index(step) for step in ordered_steps]
                self.assertEqual(positions, sorted(positions), ordered_steps)

    def test_site_package_json_files_parse(self) -> None:
        for path in (REPO_ROOT / "brief" / "site-package").rglob("*.json"):
            with self.subTest(path=path.relative_to(REPO_ROOT)):
                json.loads(path.read_text(encoding="utf-8"))

    def test_key_area_sum_matches_official_total(self) -> None:
        brief = json.loads(
            (REPO_ROOT / "brief" / "site-package" / "design_brief.json").read_text(
                encoding="utf-8"
            )
        )
        key_total = sum(item["area_sqm"] for item in brief["key_areas"])
        official_total = next(
            item["area_sqm"]
            for item in brief["official_scope_levels"]
            if item["scope_id"] == "key_detailed_design_area"
        )
        self.assertEqual(key_total, official_total)

    def test_provisional_boundaries_match_announced_area_order_of_magnitude(self) -> None:
        if importlib.util.find_spec("shapely") is None or importlib.util.find_spec("pyproj") is None:
            self.skipTest("Install requirements-review.txt to check projected provisional areas")

        from pyproj import Transformer
        from shapely.geometry import shape
        from shapely.ops import transform

        data = json.loads(
            (
                REPO_ROOT
                / "brief"
                / "site-package"
                / "geometry"
                / "provisional_boundaries.geojson"
            ).read_text(encoding="utf-8")
        )
        transformer = Transformer.from_crs("EPSG:4326", "EPSG:4548", always_xy=True).transform
        features = {item["properties"]["id"]: item for item in data["features"]}
        site = shape(features["PROV-SITE-001"]["geometry"])
        site_area = transform(transformer, site).area
        self.assertAlmostEqual(site_area, 11_400_000, delta=250_000)
        self.assertFalse(features["PROV-SITE-001"]["properties"]["official_boundary"])
        self.assertEqual(features["PROV-SITE-001"]["properties"]["geometry_role"], "provisional_constraint")

        research = shape(features["PROV-RESEARCH-001"]["geometry"])
        research_area = transform(transformer, research).area
        self.assertAlmostEqual(research_area, 43_600_000, delta=400_000)
        self.assertTrue(research.covers(site))
        self.assertFalse(features["PROV-RESEARCH-001"]["properties"]["official_boundary"])
        self.assertEqual(features["PROV-RESEARCH-001"]["properties"]["scope_id"], "coordinated_research_area")

        key_scope = shape(features["PROV-KEY-SCOPE-001"]["geometry"])
        key_scope_area = transform(transformer, key_scope).area
        self.assertAlmostEqual(key_scope_area, 3_684_000, delta=40_000)
        self.assertTrue(site.covers(key_scope))
        self.assertFalse(features["PROV-KEY-SCOPE-001"]["properties"]["official_boundary"])
        self.assertEqual(features["PROV-KEY-SCOPE-001"]["properties"]["scope_id"], "key_detailed_design_area")

        announced = {
            "PROV-KEY-001": 1_921_000,
            "PROV-KEY-002": 1_043_000,
            "PROV-KEY-003": 720_000,
        }
        for feature_id, expected_area in announced.items():
            with self.subTest(feature_id=feature_id):
                geom = shape(features[feature_id]["geometry"])
                self.assertTrue(site.covers(geom))
                area = transform(transformer, geom).area
                self.assertAlmostEqual(area, expected_area, delta=max(15_000, expected_area * 0.01))
                self.assertFalse(features[feature_id]["properties"]["official_boundary"])
                self.assertEqual(features[feature_id]["properties"]["geometry_role"], "provisional_constraint")
                self.assertTrue(key_scope.covers(geom))

    def test_bootstrap_bbox_is_closed_and_not_official(self) -> None:
        bbox = json.loads(
            (
                REPO_ROOT
                / "brief"
                / "site-package"
                / "geometry"
                / "study_area_bbox.geojson"
            ).read_text(encoding="utf-8")
        )
        feature = bbox["features"][0]
        ring = feature["geometry"]["coordinates"][0]
        self.assertEqual(ring[0], ring[-1])
        self.assertFalse(feature["properties"]["official_boundary"])

    def test_skill_exists(self) -> None:
        skill = REPO_ROOT / "skills" / "urban-design-ai-submission" / "SKILL.md"
        text = skill.read_text(encoding="utf-8")
        self.assertIn("name: urban-design-ai-submission", text)
        self.assertIn("machine-readable urban design submission", text)
        self.assertIn("participate in the Haidian Centennial Jing-Zhang AI Innovation Belt open call", text)
        self.assertIn("scripts/install_submission_skill.py", text)

    def test_submission_skill_installer_copies_skill(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "install_submission_skill.py"),
                    "--codex-home",
                    tmp,
                    "--json",
                ],
                cwd=REPO_ROOT,
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            report = json.loads(completed.stdout)
            self.assertTrue(report["ok"])
            self.assertTrue(report["installed"])
            self.assertTrue(report["up_to_date"])

            installed_skill = Path(tmp) / "skills" / "urban-design-ai-submission" / "SKILL.md"
            self.assertTrue(installed_skill.exists())
            self.assertIn("Participant Quick Start", installed_skill.read_text(encoding="utf-8"))

            check = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "install_submission_skill.py"),
                    "--codex-home",
                    tmp,
                    "--check",
                    "--json",
                ],
                cwd=REPO_ROOT,
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(check.returncode, 0, check.stdout + check.stderr)
            check_report = json.loads(check.stdout)
            self.assertFalse(check_report["installed"])
            self.assertTrue(check_report["up_to_date"])

    def test_professional_standards_have_local_reference_snapshots(self) -> None:
        standards_path = REPO_ROOT / "brief" / "site-package" / "standards" / "standards.json"
        standards = json.loads(standards_path.read_text(encoding="utf-8"))["standards"]
        accepted_mandatory_statuses = {
            "fetched",
            "fetched_via_official_pdf_text",
            "user_provided_summary",
        }
        for standard in standards:
            with self.subTest(standard_id=standard["standard_id"]):
                local_path = standard.get("local_reference_path")
                self.assertTrue(local_path, "standard must record local_reference_path")
                self.assertEqual(standard.get("local_reference_format"), "markdown")
                self.assertEqual(standard.get("local_markdown_path"), local_path)
                reference = REPO_ROOT / local_path
                self.assertTrue(reference.exists(), f"missing local reference {local_path}")
                digest = hashlib.sha256(reference.read_bytes()).hexdigest()
                self.assertEqual(standard.get("local_reference_sha256"), digest)
                if standard.get("mandatory_for_formal"):
                    self.assertIn(
                        standard.get("reference_fetch_status"),
                        accepted_mandatory_statuses,
                    )

    def test_standards_reference_index_hashes_match_files(self) -> None:
        index_path = (
            REPO_ROOT
            / "brief"
            / "site-package"
            / "standards"
            / "references"
            / "index.json"
        )
        index = json.loads(index_path.read_text(encoding="utf-8"))["references"]
        for record in index:
            with self.subTest(standard_id=record["standard_id"]):
                reference = REPO_ROOT / record["local_reference_path"]
                self.assertEqual(record.get("local_reference_format"), "markdown")
                self.assertEqual(record.get("local_markdown_path"), record["local_reference_path"])
                self.assertTrue(reference.exists())
                digest = hashlib.sha256(reference.read_bytes()).hexdigest()
                self.assertEqual(record["local_reference_sha256"], digest)

    def test_visual_style_recommendations_cover_formal_html_and_figures(self) -> None:
        path = REPO_ROOT / "brief" / "site-package" / "visual_style_recommendations.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        skills = {item["skill"] for item in data["recommended_skills"]}
        self.assertIn("baoyu-markdown-to-html", skills)
        self.assertIn("baoyu-infographic", skills)
        self.assertIn("baoyu-diagram", skills)
        self.assertIn("baoyu-slide-deck", skills)
        self.assertTrue(data.get("formal_visual_guardrails"))
        self.assertTrue(data.get("not_recommended_for_formal_core"))

    def test_agent_taskbook_covers_required_agent_tasks(self) -> None:
        path = REPO_ROOT / "brief" / "site-package" / "agent_taskbook.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        task_ids = {item["requirement_id"] for item in data["required_agent_tasks"]}
        self.assertEqual(task_ids, {f"agent.{index}" for index in range(1, 7)})
        self.assertEqual(len(data["co_creation_charter"]), 10)
        continuous = data["continuous_participation"]
        self.assertIn("每天", continuous["materials_update_notice_zh"])
        self.assertIn("computer use", continuous["working_modes_zh"])
        self.assertIn("inspect_and_participate_in_issues_and_pull_requests", continuous["recommended_loop"])
        self.assertIn("开 Issue", continuous["issue_collaboration_zh"])
        self.assertIn("截图", continuous["issue_collaboration_zh"])
        self.assertIn("交叉验证", continuous["external_data_guidance_zh"])
        self.assertIn("report_and_discuss_issues_with_reproduction_and_evidence", continuous["recommended_loop"])
        self.assertIn("validate_and_register_external_data", continuous["recommended_loop"])
        self.assertIn("社交媒体", continuous["social_sharing_guidance_zh"])
        self.assertIn("更多智能体", continuous["social_sharing_guidance_zh"])
        self.assertIn("share_noteworthy_work_and_invite_more_agents", continuous["recommended_loop"])
        self.assertIn("--filter=blob:none", continuous["lightweight_workspace_zh"])
        self.assertIn("read_peer_proposals.py", continuous["progressive_peer_reading_zh"])
        self.assertIn("participant_preflight.py", continuous["upload_preflight_zh"])
        self.assertIn("use_blobless_sparse_participant_workspace", continuous["recommended_loop"])
        self.assertIn("run_participant_preflight_before_upload", continuous["recommended_loop"])
        self.assertTrue(data["boundary_clause"]["forbidden_final_conclusions_zh"])
        multimodal = data["multimodal_presentation"]
        self.assertIn("Three.js", multimodal["priority_zh"])
        self.assertIn("视频", multimodal["priority_zh"])
        self.assertIn("音乐", multimodal["priority_zh"])
        self.assertIn("默认封面", multimodal["capability_fallback_zh"])
        self.assertIn("manifest.cover_image", multimodal["website_delivery_zh"])
        self.assertTrue(any("never_autoplay_audio_or_video" in item for item in multimodal["guardrails"]))

        skill = (REPO_ROOT / "skills" / "urban-design-ai-submission" / "SKILL.md").read_text(encoding="utf-8")
        self.assertIn("## Continuous Participation Loop", skill)
        self.assertIn("scheduled tasks, recurring automation", skill)
        self.assertIn("Watch the repository", skill)
        self.assertIn("CLI, API, or computer use", skill)
        self.assertIn("low-bandwidth daily command sequence", skill)
        self.assertIn("other Agents' proposals", skill)
        self.assertIn("Issues, Pull Requests", skill)
        self.assertIn("computer use", skill)
        self.assertIn("## Collaborate Through Issues and PRs", skill)
        self.assertIn("Attach screenshots or annotated images", skill)
        self.assertIn("multimodal-presentation.md", skill)
        self.assertIn("Three.js", skill)
        self.assertIn("assets/media/", skill)
        self.assertIn("cover_image", skill)

        readme = (REPO_ROOT / "README.md").read_text(encoding="utf-8")
        readme_en = (REPO_ROOT / "README.en.md").read_text(encoding="utf-8")
        for text in (readme, readme_en):
            self.assertIn("Three.js", text)
            self.assertIn("assets/media/", text)
            self.assertIn("cover_image", text)
        self.assertIn("Cross-check important claims", skill)
        self.assertIn("## Research Beyond the Repository", skill)
        self.assertIn("follow up at the first available opportunity", skill)
        self.assertIn("Do not post a question and abandon", skill)
        self.assertIn("## Share Noteworthy Work", skill)
        self.assertIn("Publishing to an external account requires", skill)
        self.assertIn("bootstrap_participant_workspace.py", skill)
        self.assertIn("read_peer_proposals.py", skill)
        self.assertIn("participant_preflight.py", skill)
        self.assertIn("references/lightweight-workspace.md", skill)
        project_link = "[open-city-ai/haidian](https://github.com/open-city-ai/haidian)"
        self.assertEqual(skill.count(project_link), 1)
        self.assertNotIn("你也可以 Star", skill)



    def test_skill_references_all_required_reference_docs(self) -> None:
        """SKILL.md must link to all six reference documents."""
        skill = (REPO_ROOT / "skills" / "urban-design-ai-submission" / "SKILL.md").read_text(encoding="utf-8")
        required_refs = [
            "references/geometry-and-metrics.md",
            "references/human-readable-proposal.md",
            "references/lightweight-workspace.md",
            "references/multimodal-presentation.md",
            "references/submission-package.md",
            "references/validator-feedback.md",
        ]
        for ref in required_refs:
            with self.subTest(ref=ref):
                self.assertIn(ref, skill, f"SKILL.md must link to {ref}")

    def test_provisional_boundaries_geojson_has_required_feature_ids(self) -> None:
        """provisional_boundaries.geojson must contain the 6 required provisional feature IDs."""
        geojson_path = (
            REPO_ROOT / "brief" / "site-package" / "geometry" / "provisional_boundaries.geojson"
        )
        data = json.loads(geojson_path.read_text(encoding="utf-8"))
        feature_ids = {f["properties"]["id"] for f in data["features"]}
        required_ids = {
            "PROV-SITE-001",
            "PROV-RESEARCH-001",
            "PROV-KEY-SCOPE-001",
            "PROV-KEY-001",
            "PROV-KEY-002",
            "PROV-KEY-003",
        }
        for feature_id in required_ids:
            with self.subTest(feature_id=feature_id):
                self.assertIn(feature_id, feature_ids, f"provisional_boundaries.geojson must contain {feature_id}")


if __name__ == "__main__":
    unittest.main()
