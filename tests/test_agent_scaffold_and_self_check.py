import hashlib
import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

HAS_REVIEW_DEPS = all(
    importlib.util.find_spec(name) is not None for name in ["shapely", "pyproj", "jsonschema"]
)

if HAS_REVIEW_DEPS:
    from self_check_submission import build_self_check  # noqa: E402
    from pyproj import Transformer  # noqa: E402
    from shapely.geometry import shape  # noqa: E402
    from shapely.ops import transform  # noqa: E402


class AgentFacingDocsTests(unittest.TestCase):
    def test_agent_docs_use_scaffold_and_full_self_check_commands(self) -> None:
        docs = "\n".join(
            (REPO_ROOT / rel).read_text(encoding="utf-8")
            for rel in ["README.md", "agent.html", ".github/PULL_REQUEST_TEMPLATE.md"]
        )
        self.assertIn("scripts/scaffold_ai_submission.py", docs)
        self.assertIn("scripts/self_check_submission.py", docs)
        self.assertIn("requirements-review.txt", docs)


def run_scaffold(output_dir: Path, stage: str = "formal", cwd: Path = REPO_ROOT) -> subprocess.CompletedProcess:
    return subprocess.run(
        [
            sys.executable,
            str(REPO_ROOT / "scripts" / "scaffold_ai_submission.py"),
            str(output_dir),
            "--stage",
            stage,
            "--agent-id",
            "alice",
            "--agent-name",
            "Alice Agent",
            "--proposal-title",
            "Topology Pass",
        ],
        cwd=cwd,
        capture_output=True,
        text=True,
        check=False,
    )


def projected_area(geometry: dict) -> float:
    transformer = Transformer.from_crs("EPSG:4326", "EPSG:4548", always_xy=True)
    return float(transform(transformer.transform, shape(geometry)).area)


def polygon(x1: float, y1: float, x2: float, y2: float) -> dict:
    return {
        "type": "Polygon",
        "coordinates": [[[x1, y1], [x2, y1], [x2, y2], [x1, y2], [x1, y1]]],
    }


def official_feature(feature_id: str, layer: str, geometry: dict, **props) -> dict:
    properties = {
        "id": feature_id,
        "layer": layer,
        "source_type": "official_public",
        "confidence": "high",
        "geometry_role": "official_constraint",
        "official_boundary": True,
    }
    properties.update(props)
    if layer == "KEY_AREA":
        properties["official_area_sqm"] = round(projected_area(geometry), 3)
    return {"type": "Feature", "id": feature_id, "properties": properties, "geometry": geometry}


def write_official_site_package(root: Path) -> None:
    geometry_dir = root / "brief" / "site-package" / "geometry"
    geometry_dir.mkdir(parents=True, exist_ok=True)
    features = [
        official_feature("SITE-001", "SITE_BOUNDARY", polygon(116.300, 39.900, 116.330, 39.930)),
        official_feature(
            "KEY-001",
            "KEY_AREA",
            polygon(116.302, 39.902, 116.308, 39.908),
            area_id="zhongzhiyuan_ai_acceleration_area",
        ),
        official_feature(
            "KEY-002",
            "KEY_AREA",
            polygon(116.310, 39.902, 116.316, 39.908),
            area_id="beijing_ai_origin_community",
        ),
        official_feature(
            "KEY-003",
            "KEY_AREA",
            polygon(116.318, 39.902, 116.324, 39.908),
            area_id="dazhongsi_ai_industry_cluster",
        ),
    ]
    (geometry_dir / "official_boundaries.geojson").write_text(
        json.dumps({"type": "FeatureCollection", "features": features}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


@unittest.skipUnless(HAS_REVIEW_DEPS, "Install requirements-review.txt to run scaffold/self-check tests")
class AgentScaffoldAndSelfCheckTests(unittest.TestCase):
    def test_formal_scaffold_passes_full_self_check_with_official_fixture(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)

            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "self_check_submission.py"),
                    str(submission_dir),
                    "--repo-root",
                    str(root),
                    "--pr-author",
                    "alice",
                    "--json",
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            report = json.loads(completed.stdout)
            self.assertTrue(report["ok"], report)
            self.assertTrue(report["deterministic_validation"]["ok"])
            self.assertTrue(report["spatial_review"]["ok"])
            self.assertTrue(report["visual_review"]["ok"])
            self.assertTrue(report["professional_review"]["ok"], report["professional_review"])
            self.assertTrue(report["can_enter_formal_review"])
            self.assertEqual([], report["spatial_issue_ids"])
            self.assertEqual([], report["visual_issue_ids"])
            self.assertEqual([], report["professional_issue_ids"])

    def test_scaffold_manifest_hashes_match_written_files(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)

            manifest = json.loads((submission_dir / "manifest.json").read_text(encoding="utf-8"))
            hashed = [item for item in manifest["files"] if item.get("sha256")]
            self.assertGreater(len(hashed), 5)
            for item in hashed:
                digest = hashlib.sha256((submission_dir / item["path"]).read_bytes()).hexdigest()
                self.assertEqual(digest, item["sha256"], item["path"])

    def test_scaffold_includes_public_source_registry_reference(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)

            sources = json.loads((submission_dir / "sources.json").read_text(encoding="utf-8"))
            source_ids = {item["id"] for item in sources["sources"]}
            proposal = (submission_dir / "proposal.md").read_text(encoding="utf-8")
            self.assertIn("SOURCE-REGISTRY", source_ids)
            self.assertIn("PROCESSED-FACT-PACK", source_ids)
            self.assertIn("[source:SOURCE-REGISTRY]", proposal)
            self.assertIn("[source:PROCESSED-FACT-PACK]", proposal)
            self.assertIn("data/source_registry.json", proposal)
            self.assertIn("data/processed/agent_fact_pack.md", proposal)
            self.assertIn("京张智脉共生带", proposal)
            self.assertIn("不少于10张AI场景卡", proposal)
            self.assertIn("01 开源发布厅", proposal)
            self.assertIn("JZ-01", proposal)
            self.assertIn("开源开发者", proposal)

            visual = (submission_dir / "visual" / "index.html").read_text(encoding="utf-8")
            self.assertIn("方案可视化总览", visual)
            self.assertIn("10个AI场景卡", visual)
            self.assertIn("全球AI活动周路线", visual)
            self.assertIn("三处重点片区", visual)

    def test_formal_scaffold_uses_repo_provisional_boundary_when_official_missing(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission_dir = root / "submissions" / "alice" / "formal-test"
            scaffold = run_scaffold(submission_dir, stage="formal")
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            site = json.loads((submission_dir / "geometry" / "site_boundary.geojson").read_text(encoding="utf-8"))
            props = site["features"][0]["properties"]
            self.assertEqual(props["geometry_role"], "provisional_constraint")
            self.assertFalse(props["official_boundary"])

    def test_formal_scaffold_fails_without_any_boundary_fixture(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            submission_dir = root / "submissions" / "alice" / "formal-test"
            scaffold = run_scaffold(submission_dir, stage="formal", cwd=root)
            self.assertNotEqual(scaffold.returncode, 0)
            self.assertIn("formal scaffold requires a trusted official or explicit provisional SITE_BOUNDARY", scaffold.stderr)
            self.assertFalse(submission_dir.exists())

    def test_standard_example_passes_full_self_check_but_not_formal_review(self) -> None:
        submission_dir = REPO_ROOT / "submissions" / "codex-final" / "jingzhang-ai-symbiotic-rail"
        self.assertTrue(submission_dir.exists(), "standard example is missing")
        completed = subprocess.run(
            [
                sys.executable,
                str(REPO_ROOT / "scripts" / "self_check_submission.py"),
                str(submission_dir),
                "--repo-root",
                str(REPO_ROOT),
                "--pr-author",
                "codex-final",
                "--json",
            ],
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
        report = json.loads(completed.stdout)
        self.assertTrue(report["ok"])
        self.assertFalse(report["can_enter_formal_review"])
        self.assertEqual([], report["professional_issue_ids"])
        self.assertEqual([], report["visual_issue_ids"])

    def test_missing_review_dependencies_are_reported(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)

            with mock.patch("self_check_submission.missing_review_dependencies", return_value=["shapely"]):
                report = build_self_check(root, submission_dir, "alice")
            self.assertFalse(report["ok"])
            self.assertEqual(["shapely"], report["missing_review_dependencies"])
            self.assertIn("pip install -r requirements-review.txt", report["spatial_review"]["stderr"])

    def test_review_packet_consumes_self_check_result(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            out_dir = root / "review"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)

            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "review_submission.py"),
                    str(submission_dir),
                    "--repo-root",
                    str(root),
                    "--out",
                    str(out_dir),
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            review_input = json.loads((out_dir / "review-input.json").read_text(encoding="utf-8"))
            self.assertIn("pre_submit_self_check", review_input)
            self.assertTrue(review_input["pre_submit_self_check"]["stdout"]["ok"])
            self.assertTrue(review_input["spatial_review"]["ok"])
            self.assertTrue(review_input["visual_review"]["ok"])
            self.assertTrue(review_input["professional_review"]["ok"])
            self.assertTrue(review_input["pre_submit_self_check"]["stdout"]["can_enter_formal_review"])

    def test_professional_review_script_passes_scaffold(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)

            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "professional_review.py"),
                    str(submission_dir),
                    "--repo-root",
                    str(root),
                    "--json",
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            report = json.loads(completed.stdout)
            self.assertTrue(report["ok"], report)
            self.assertEqual([], report["issues"])


if __name__ == "__main__":
    unittest.main()
