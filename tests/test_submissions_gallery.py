import re
import json
import subprocess
import sys
import unittest
import tempfile
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from generate_submissions_data import (  # noqa: E402
    build_data,
    build_item,
    discover_submissions,
    load_publication_registry,
    package_sha256,
)
DATA_FILE = ROOT / "submissions-data.js"
INDEX_FILE = ROOT / "index.html"
SUBMISSIONS_FILE = ROOT / "submissions.html"
COVER_FILE = ROOT / "proposal-cover.js"


class TestSubmissionsGallery(unittest.TestCase):
    def load_gallery_items(self):
        data = DATA_FILE.read_text(encoding="utf-8")
        match = re.search(r"window\.HAIDIAN_SUBMISSIONS = (\[.*\]);\s*$", data, re.S)
        self.assertIsNotNone(match)
        return json.loads(match.group(1))

    def test_every_merged_submission_is_listed_unless_explicitly_held(self):
        registry = json.loads((ROOT / "gallery-publication.json").read_text(encoding="utf-8"))
        held = {entry["path"] for entry in registry["entries"] if not entry["published"]}
        expected = {
            path.relative_to(ROOT).as_posix()
            for path in discover_submissions(ROOT)
            if path.relative_to(ROOT).as_posix() not in held
        }
        source_paths = {str(Path(item["sourceUrl"]).parent) for item in self.load_gallery_items()}
        self.assertEqual(expected, source_paths)

    def test_homepage_featured_state_comes_from_publication_registry(self):
        registry = json.loads((ROOT / "gallery-publication.json").read_text(encoding="utf-8"))
        publication = {entry["path"]: entry for entry in registry["entries"]}
        expected = {
            "/".join(path.relative_to(ROOT).parts[1:]): publication.get(
                path.relative_to(ROOT).as_posix(), {}
            ).get("featured", False)
            for path in discover_submissions(ROOT)
            if publication.get(path.relative_to(ROOT).as_posix(), {}).get("published", True)
        }
        actual = {item["id"]: item["featured"] for item in self.load_gallery_items()}
        self.assertEqual(expected, actual)
        self.assertTrue(all("selectionReason" in item for item in self.load_gallery_items()))

    def test_merged_submission_is_public_without_registry_entry(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission = root / "submissions" / "alice" / "example"
            (submission / "report").mkdir(parents=True)
            (submission / "proposal.md").write_text(
                "---\ntitle: Example proposal\nsummary: A merged proposal\n---\n",
                encoding="utf-8",
            )
            (submission / "report" / "proposal.html").write_text(
                "<!doctype html><title>Example proposal</title>",
                encoding="utf-8",
            )
            (root / "gallery-publication.json").write_text(
                '{"version": 1, "entries": []}\n',
                encoding="utf-8",
            )
            items = build_data(root)
            self.assertEqual(1, len(items))
            self.assertEqual("alice/example", items[0]["id"])
            self.assertEqual("example", items[0]["slug"])
            self.assertFalse(items[0]["featured"])
            self.assertEqual(
                "proposal-view.html?proposal=submissions/alice/example",
                items[0]["proposalUrl"],
            )

    def test_registry_can_explicitly_hold_a_merged_submission(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission = root / "submissions" / "alice" / "example"
            submission.mkdir(parents=True)
            (submission / "proposal.md").write_text("# Example\n", encoding="utf-8")
            entry = {
                "path": "submissions/alice/example",
                "published": False,
                "featured": False,
                "review_status": "not_approved",
                "quality_tier": "qualified",
                "reviewed_by": "maintainer",
                "reviewed_at": "2026-08-07",
                "rights_reviewed": False,
                "reviewed_package_sha256": "0" * 64,
                "selection_reason_zh": "维护者明确暂停公开展示",
                "selection_reason_en": "Explicitly held from public display",
                "selected_at": "2026-08-07",
            }
            (root / "gallery-publication.json").write_text(
                json.dumps({"version": 1, "entries": [entry]}),
                encoding="utf-8",
            )
            self.assertEqual([], build_data(root))

    def test_publication_registry_rejects_missing_selection_metadata(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "gallery-publication.json").write_text(
                json.dumps({"version": 1, "entries": [{"path": "submissions/alice/example", "published": False, "featured": False}]}),
                encoding="utf-8",
            )
            with self.assertRaisesRegex(SystemExit, "missing fields"):
                load_publication_registry(root)

    def test_publication_registry_rejects_invalid_date_and_flag_types(self):
        base = {
            "path": "submissions/alice/example",
            "published": False,
            "featured": False,
            "review_status": "not_approved",
            "quality_tier": "qualified",
            "reviewed_by": "maintainer",
            "reviewed_at": "2026-08-05",
            "rights_reviewed": False,
            "reviewed_package_sha256": "0" * 64,
            "selection_reason_zh": "公开展示理由",
            "selection_reason_en": "Publication reason",
            "selected_at": "2026-08-05",
        }
        for field, value, message in [
            ("published", "yes", "published must be boolean"),
            ("selected_at", "August 5", "selected_at must be YYYY-MM-DD"),
        ]:
            with self.subTest(field=field), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                entry = dict(base)
                entry[field] = value
                (root / "gallery-publication.json").write_text(
                    json.dumps({"version": 1, "entries": [entry]}), encoding="utf-8"
                )
                with self.assertRaisesRegex(SystemExit, message):
                    load_publication_registry(root)

    def test_publication_registry_requires_human_and_rights_approval(self):
        base = {
            "path": "submissions/alice/example",
            "published": True,
            "featured": False,
            "review_status": "approved_for_publication",
            "quality_tier": "qualified",
            "reviewed_by": "maintainer",
            "reviewed_at": "2026-08-05",
            "rights_reviewed": True,
            "reviewed_package_sha256": "0" * 64,
            "selection_reason_zh": "通过人工内容和版权审核",
            "selection_reason_en": "Approved after human content and rights review",
            "selected_at": "2026-08-05",
        }
        for field, value, message in [
            ("review_status", "not_approved", "needs approved_for_publication"),
            ("rights_reviewed", False, "needs rights_reviewed=true"),
            ("quality_tier", "featured", "quality_tier=featured requires featured=true"),
        ]:
            with self.subTest(field=field), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                entry = dict(base)
                entry[field] = value
                submission = root / "submissions" / "alice" / "example"
                submission.mkdir(parents=True)
                (submission / "proposal.md").write_text("# proposal\n", encoding="utf-8")
                (root / "gallery-publication.json").write_text(
                    json.dumps({"version": 1, "entries": [entry]}), encoding="utf-8"
                )
                with self.assertRaisesRegex(SystemExit, message):
                    load_publication_registry(root)

    def test_publication_approval_is_invalidated_when_reviewed_package_changes(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission = root / "submissions" / "alice" / "example"
            submission.mkdir(parents=True)
            (submission / "proposal.md").write_text("# reviewed proposal\n", encoding="utf-8")
            (submission / "manifest.json").write_text(
                json.dumps({"files": [{"path": "proposal.md"}]}), encoding="utf-8"
            )
            entry = {
                "path": "submissions/alice/example",
                "published": True,
                "featured": False,
                "review_status": "approved_for_publication",
                "quality_tier": "qualified",
                "reviewed_by": "maintainer",
                "reviewed_at": "2026-08-05",
                "rights_reviewed": True,
                "reviewed_package_sha256": package_sha256(submission),
                "selection_reason_zh": "通过人工内容和版权审核",
                "selection_reason_en": "Approved after human content and rights review",
                "selected_at": "2026-08-05",
            }
            (root / "gallery-publication.json").write_text(
                json.dumps({"version": 1, "entries": [entry]}), encoding="utf-8"
            )
            load_publication_registry(root)
            (submission / "proposal.md").write_text("# changed after review\n", encoding="utf-8")
            with self.assertRaisesRegex(SystemExit, "reviewed package SHA-256 is stale"):
                load_publication_registry(root)

    def test_gallery_paths_exist(self):
        data = DATA_FILE.read_text(encoding="utf-8")
        paths = re.findall(
            r'"(?:thumbnailUrl|visualUrl|proposalUrl|sourceUrl)(?:Zh|En)?"\s*:\s*"([^"]+)"',
            data,
        )
        missing = [path for path in paths if not (ROOT / urlsplit(path).path).exists()]
        self.assertEqual([], missing)

    def test_generated_gallery_data_is_current(self):
        completed = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "generate_submissions_data.py"), "--check"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)

    def test_public_gallery_matches_merged_submission_count(self):
        registry = json.loads((ROOT / "gallery-publication.json").read_text(encoding="utf-8"))
        publication = {entry["path"]: entry for entry in registry["entries"]}
        expected = sum(
            1
            for path in discover_submissions(ROOT)
            if publication.get(path.relative_to(ROOT).as_posix(), {}).get("published", True)
        )
        self.assertEqual(expected, len(self.load_gallery_items()))

    def test_gallery_item_ids_are_unique_and_path_scoped(self):
        items = self.load_gallery_items()
        ids = [item["id"] for item in items]
        self.assertEqual(len(ids), len(set(ids)))
        for item in items:
            source_dir = Path(item["sourceUrl"]).parent
            self.assertEqual("/".join(source_dir.parts[1:]), item["id"])
            self.assertEqual(source_dir.name, item["slug"])

    def test_human_readable_report_viewer_loads_structured_evidence(self):
        viewer = (ROOT / "proposal-view.html").read_text(encoding="utf-8")
        artifact_viewer = (ROOT / "proposal-artifact-viewer.js").read_text(encoding="utf-8")
        artifact_styles = (ROOT / "proposal-artifact-viewer.css").read_text(encoding="utf-8")
        for required in [
            "manifest.json",
            "sources.json",
            "metrics.json",
            "standard_matrix.json",
            "design_depth_matrix.json",
            "_evidence_retry",
            "Structured evidence JSON failed to load",
            "requiredEvidence",
            "页面未计算覆盖率，请刷新重试",
            "assumptions.json",
            "self_check.json",
            "resolveDataRefs",
            "normalizeBlockStructure",
            "normalizeInlineMarkdown",
            "normalizeTables",
            "normalizeBareDataReferences",
            "normalizeHumanStatusTerms",
            "collapseEvidenceRuns",
            "evidence-bundle",
            "MACHINE_FILE_LABELS",
            "待正式数据补齐",
            "dataTokenLabel",
            "hasRelatedDataMarker",
            "data-token",
            "semantic-flag",
            "showCitation",
            "citation-popover",
            "responsive-table",
            "已解析证据",
            "artifact-groups",
            "packageToggle",
            "packageScrim",
            "workspace-nav",
            "方案工作台",
            "阅读方案",
            "浏览方案资料",
            "核对方案证据",
            "activateFilter",
            "正文中的“依据”与“多条依据”均可点击",
            "proposal-artifact-viewer.js",
            "proposal-artifact-viewer.css",
            "方案资料库",
            "artifactViewerBody",
            "renderMultimodalShowcase",
            "multimodal-showcase",
            "Three.js、WebGL、Canvas",
        ]:
            self.assertIn(required, viewer)
        self.assertIn("position:fixed;z-index:75", viewer)
        self.assertIn("document.body.classList.toggle('drawer-open',open)", viewer)
        self.assertNotIn("package-entry-cta", viewer)
        self.assertNotIn("panelCollapse", viewer)
        for required in [
            "renderGeoJSON",
            "geoSvg",
            "renderJSON",
            "markdownToHTML",
            "parseDelimited",
            'sandbox="allow-scripts allow-forms allow-modals allow-popups"',
            "hydratePreviews",
            "data-line",
            "--data-width",
            "window.ProposalArtifactViewer",
            "点击后绘制空间图层",
            "点击后读取结构化内容",
            "video",
            "audio",
            "controls playsinline preload=\"metadata\"",
            "controls preload=\"metadata\"",
            "caption",
            "transcript",
        ]:
            self.assertIn(required, artifact_viewer)
        for required in [
            ".artifact-card",
            "grid-template-columns:62px minmax(0,1fr)",
            "width:62px;height:66px",
            ".preview-data .data-line.accent",
            ".artifact-viewer",
            ".artifact-map-canvas",
            ".artifact-document",
            ".artifact-table",
        ]:
            self.assertIn(required, artifact_styles)
        self.assertNotIn(".artifact-preview{height:105px}", artifact_styles)
        self.assertNotIn(".artifact-preview{height:132px}", artifact_styles)
        self.assertNotIn("--data-color", artifact_styles)

    def test_cover_renderer_preserves_default_and_supports_custom_cover(self):
        cover = COVER_FILE.read_text(encoding="utf-8")
        generator = (ROOT / "scripts" / "generate_submissions_data.py").read_text(encoding="utf-8")
        self.assertIn("item.coverUrl", cover)
        self.assertIn("cover-art-custom", cover)
        self.assertIn("gradient", cover)
        self.assertIn('item["coverUrl"]', generator)
        self.assertIn('manifest.get("cover_image")', generator)

    def test_gallery_pages_explain_review_statuses(self):
        index = INDEX_FILE.read_text(encoding="utf-8")
        submissions = SUBMISSIONS_FILE.read_text(encoding="utf-8")
        covers = COVER_FILE.read_text(encoding="utf-8")
        self.assertIn("View All Proposals", index)
        self.assertIn("STATUS_META", index)
        self.assertIn("data-filter=\"formal\"", submissions)
        self.assertIn("data-filter=\"revision\"", submissions)
        self.assertIn("data-filter=\"fixture\"", submissions)
        self.assertNotIn("data-filter=\"intake\"", submissions)
        self.assertIn("formal_review_ready", submissions)
        self.assertIn("intake_provisional", submissions)
        self.assertIn('<script src="proposal-cover.js"></script>', index)
        self.assertIn('<script src="proposal-cover.js"></script>', submissions)
        self.assertIn("window.renderCover", covers)
        self.assertIn("function hash", covers)
        self.assertIn("cover-grid", covers)
        self.assertIn("data-count-for=\"revision\"", submissions)
        self.assertIn("不是加载失败", submissions)
        self.assertNotIn("proposal-thumb iframe", index)
        self.assertNotIn("<iframe data-src=", submissions)

    def test_gallery_runtime_i18n_preserves_historical_evidence_boundary(self):
        index = INDEX_FILE.read_text(encoding="utf-8")
        submissions = SUBMISSIONS_FILE.read_text(encoding="utf-8")
        for page in (index, submissions):
            self.assertIn("历史展示状态不等于新的可信正式证据", page)
            self.assertIn(
                "historical display status is not new trusted evidence for formal scoring",
                page,
            )
        self.assertIn("'gallery.sub': '已合并到 GitHub 主分支的方案自动进入展厅。", index)
        self.assertIn("'gallery.sub': 'Proposals merged into the GitHub main branch", index)
        self.assertIn("'guide.reviewNote':'卡片与分类只统计 GitHub main", submissions)
        self.assertIn("'guide.reviewNote':'Cards and filters count only proposals", submissions)

    def test_homepage_exposes_copyable_agent_prompt_in_hero(self):
        index = INDEX_FILE.read_text(encoding="utf-8")
        hero = index[index.index('<section id="hero">'):index.index("<!-- Stats -->")]
        self.assertIn("hero-skill-copy", hero)
        self.assertIn("urban-design-ai-submission", hero)
        self.assertIn("skill-copy-btn", hero)
        self.assertIn("hero-skill-head", hero)
        self.assertIn("复制这句话，交给你的 Agent", hero)
        self.assertIn('href="submissions.html"', hero)
        self.assertNotIn('href="#submit"', hero)
        self.assertEqual(2, index.count('class="skill-copy-row'))
        self.assertIn("document.querySelectorAll('.skill-copy-btn').forEach", index)
        self.assertNotIn('id="skillCopyButton"', index)
        self.assertNotIn('id="skillAddressField"', index)

    def test_generated_items_include_github_avatar_metadata(self):
        items = self.load_gallery_items()
        self.assertTrue(items)
        for item in items:
            self.assertEqual(item["githubUrl"], f"https://github.com/{item['author']}")
            self.assertEqual(item["avatarUrl"], f"https://github.com/{item['author']}.png?size=96")

    def test_gallery_paginates_without_rendering_every_card(self):
        submissions = SUBMISSIONS_FILE.read_text(encoding="utf-8")
        for required in [
            "const PAGE_SIZE = 50",
            "filtered.slice(offset, offset + PAGE_SIZE)",
            'id="galleryRange"',
            'id="pagination"',
            "pageItems(currentPage, totalPages)",
            "url.searchParams.set('page', String(currentPage))",
            "window.addEventListener('popstate'",
            "每页 50 个方案",
            "50 proposals per page",
        ]:
            self.assertIn(required, submissions)

    def test_gallery_item_exposes_language_specific_urls(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission = root / "submissions" / "alice" / "bilingual-design"
            (submission / "report").mkdir(parents=True)
            (submission / "visual").mkdir()
            (submission / "proposal.md").write_text(
                '---\ntitle: "中文方案"\nsummary: "中文摘要"\nlanguage: "zh"\n---\n', encoding="utf-8"
            )
            (submission / "proposal.en.md").write_text(
                '---\ntitle: "English Proposal"\nsummary: "English summary"\nlanguage: "en"\ntranslation_of: "proposal.md"\n---\n', encoding="utf-8"
            )
            for rel in ["report/proposal.html", "report/proposal.en.html", "visual/index.html", "visual/index.en.html"]:
                (submission / rel).write_text("<!doctype html>", encoding="utf-8")
            (submission / "manifest.json").write_text("{}", encoding="utf-8")
            (submission / "agent.json").write_text("{}", encoding="utf-8")
            item = build_item(root, submission, {})
            self.assertEqual("English Proposal", item["titleEn"])
            self.assertEqual(item["proposalUrl"], item["proposalUrlZh"])
            self.assertTrue(item["proposalUrlEn"].endswith("report/proposal.en.html"))
            self.assertTrue(item["thumbnailUrlZh"].endswith("report/proposal.html"))
            self.assertTrue(item["visualUrlEn"].endswith("visual/index.en.html"))

    def test_gallery_item_uses_safe_custom_cover_and_defaults_when_empty(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission = root / "submissions" / "alice" / "cover-design"
            (submission / "assets" / "media").mkdir(parents=True)
            (submission / "proposal.md").write_text(
                '---\ntitle: "封面方案"\nsummary: "摘要"\nlanguage: "zh"\n---\n', encoding="utf-8"
            )
            (submission / "agent.json").write_text("{}", encoding="utf-8")
            (submission / "assets" / "media" / "cover.webp").write_bytes(b"RIFFdemoWEBP")
            manifest = {"cover_image": "assets/media/cover.webp"}
            (submission / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
            item = build_item(root, submission, {})
            self.assertEqual(
                "submissions/alice/cover-design/assets/media/cover.webp", item["coverUrl"]
            )

            manifest["cover_image"] = ""
            (submission / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
            self.assertNotIn("coverUrl", build_item(root, submission, {}))


if __name__ == "__main__":
    unittest.main()
