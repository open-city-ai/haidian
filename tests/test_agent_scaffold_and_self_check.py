import hashlib
import importlib.util
import json
import os
import shlex
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

from self_check_submission import run_json_command  # noqa: E402


class AgentFacingDocsTests(unittest.TestCase):
    def test_agent_docs_use_scaffold_and_full_self_check_commands(self) -> None:
        docs = "\n".join(
            (REPO_ROOT / rel).read_text(encoding="utf-8")
            for rel in [
                "README.md",
                "agent.html",
                ".github/PULL_REQUEST_TEMPLATE.md",
                "templates/proposal.md",
                "scripts/scaffold_ai_submission.py",
            ]
        )
        self.assertIn("scripts/scaffold_ai_submission.py", docs)
        self.assertIn("scripts/self_check_submission.py", docs)
        self.assertIn("requirements-review.txt", docs)
        self.assertIn("智能体提交边界", docs)
        self.assertIn("status=unknown", docs)
        self.assertIn("reason", docs)
        self.assertIn("assumptions", docs)
        self.assertNotIn("pending_control", docs)

    def test_agent_docs_require_bilingual_v2_and_post_submission_monitoring(self) -> None:
        skill = (REPO_ROOT / "skills" / "urban-design-ai-submission" / "SKILL.md").read_text(
            encoding="utf-8"
        )
        self.assertIn("Chinese and English are required for every new submission", skill)
        self.assertIn("Post-Submission Monitoring", skill)
        self.assertIn("gh pr checks", skill)
        self.assertIn("Uploading is not completion", skill)


class SelfCheckEncodingTests(unittest.TestCase):
    def test_run_json_command_forces_utf8_for_gbk_and_recursive_python_children(self) -> None:
        nested_child = (
            "import json; print(json.dumps({'message': '中文全角括号（），²'}, "
            "ensure_ascii=False))"
        )
        parent = (
            "import subprocess, sys; "
            f"child = subprocess.run([sys.executable, '-c', {nested_child!r}], "
            "capture_output=True, text=True, check=True); "
            "sys.stdout.write(child.stdout)"
        )
        with mock.patch.dict(
            os.environ,
            {"PYTHONUTF8": "0", "PYTHONIOENCODING": "cp936"},
        ):
            result = run_json_command([sys.executable, "-c", parent])

        self.assertEqual(0, result["returncode"])
        self.assertTrue(result["ok"])
        self.assertEqual("中文全角括号（），²", result["stdout"]["message"])

    def test_run_json_command_decodes_utf8_diagnostics_independent_of_locale(self) -> None:
        result = run_json_command(
            [
                sys.executable,
                "-c",
                "import sys; sys.stdout.buffer.write(('{' + chr(34) + 'message' + chr(34) + ': ' + chr(34) + '中文全角括号（），²' + chr(34) + '}\\n').encode('utf-8'))",
            ]
        )

        self.assertEqual(0, result["returncode"])
        self.assertTrue(result["ok"])
        self.assertEqual("中文全角括号（），²", result["stdout"]["message"])

    def test_run_json_command_handles_missing_streams_without_secondary_crash(self) -> None:
        completed = subprocess.CompletedProcess(["fixture"], 1, stdout=None, stderr=None)
        with mock.patch("self_check_submission.subprocess.run", return_value=completed) as run:
            result = run_json_command(["fixture"])

        run.assert_called_once_with(
            ["fixture"],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            check=False,
            env=mock.ANY,
        )
        self.assertEqual("1", run.call_args.kwargs["env"]["PYTHONUTF8"])
        self.assertEqual("utf-8", run.call_args.kwargs["env"]["PYTHONIOENCODING"])
        self.assertEqual(
            {
                "returncode": 1,
                "ok": False,
                "stdout": {},
                "stderr": "command produced no JSON output",
            },
            result,
        )

    def test_run_json_command_requires_json_object_output(self) -> None:
        fixtures = [
            ("print('not json')", "invalid JSON output"),
            ("print('[]')", "JSON output must be an object, got list"),
            ("print('null')", "JSON output must be an object, got NoneType"),
            ("pass", "command produced no JSON output"),
        ]
        for script, expected_error in fixtures:
            with self.subTest(script=script):
                result = run_json_command([sys.executable, "-c", script])

                self.assertEqual(0, result["returncode"])
                self.assertFalse(result["ok"])
                self.assertIn(expected_error, result["stderr"])


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


def complete_scaffold(
    output_dir: Path,
    synchronized_paths: tuple[str, ...] = (),
) -> subprocess.CompletedProcess:
    proposal = output_dir / "proposal.md"
    proposal.write_text(
        proposal.read_text(encoding="utf-8").replace("SCAFFOLD-DRAFT", "PARTICIPANT-DESIGN")
        + "\nParticipant-authored design decisions.\n",
        encoding="utf-8",
    )
    for rel in ["report/proposal.html", "visual/index.html"]:
        path = output_dir / rel
        path.write_text(path.read_text(encoding="utf-8") + "\n<!-- participant revision -->\n", encoding="utf-8")
    for rel in [
        "assets/figures/site-overview.png",
        "assets/figures/land-use-structure.png",
        "assets/figures/key-areas.png",
        "assets/figures/mobility-bluegreen.png",
        "assets/figures/metrics-evidence.png",
    ]:
        path = output_dir / rel
        path.write_bytes(path.read_bytes() + b"participant-revision")
    geometry = output_dir / "geometry" / "land_use.geojson"
    geometry.write_text(geometry.read_text(encoding="utf-8") + "\n", encoding="utf-8")
    drawing = b"%PDF-1.4\n3 0 obj<</Type/Page/Parent 2 0 R>>endobj\n" + b"0" * 4096
    for rel in ["drawings/a3-booklet.pdf", "drawings/a0-boards.pdf"]:
        (output_dir / rel).write_bytes(drawing)

    # Finalization represents a participant-authored package, so replace the
    # disclosure placeholders emitted by the scaffold before refreshing hashes.
    agent_path = output_dir / "agent.json"
    agent = json.loads(agent_path.read_text(encoding="utf-8"))
    agent.update(
        {"model": "GPT-5 Codex", "model_family": "gpt", "model_detail": "GPT-5 Codex"}
    )
    agent_path.write_text(json.dumps(agent, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    manifest_path = output_dir / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if isinstance(manifest.get("agent"), dict):
        manifest["agent"].update(
            {"model": "GPT-5 Codex", "model_family": "gpt", "model_detail": "GPT-5 Codex"}
        )
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    primary_text = proposal.read_text(encoding="utf-8")
    translated_proposal = output_dir / "proposal.en.md"
    if not translated_proposal.exists():
        translated_proposal.write_text(
            primary_text.replace(
                'language: "zh"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_file: "proposal.en.md"',
                'language: "en"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_of: "proposal.md"',
                1,
            ),
            encoding="utf-8",
        )
    for rel in ["report/proposal.html", "visual/index.html"]:
        source = output_dir / rel
        target = source.with_name(f"{source.stem}.en{source.suffix}")
        if not target.exists():
            target.write_bytes(source.read_bytes())
    for rel in [
        "drawings/a3-booklet.pdf",
        "drawings/a0-boards.pdf",
        "assets/figures/site-overview.png",
        "assets/figures/land-use-structure.png",
        "assets/figures/key-areas.png",
        "assets/figures/mobility-bluegreen.png",
        "assets/figures/metrics-evidence.png",
    ]:
        source = output_dir / rel
        target = source.with_name(f"{source.stem}.en{source.suffix}")
        if not target.exists():
            target.write_bytes(source.read_bytes())
    if synchronized_paths:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        items = {item["path"]: item for item in manifest["files"]}
        for rel in synchronized_paths:
            items[rel]["sha256"] = hashlib.sha256((output_dir / rel).read_bytes()).hexdigest()
        manifest_path.write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
    return subprocess.run(
        [sys.executable, str(REPO_ROOT / "scripts" / "finalize_submission.py"), str(output_dir)],
        capture_output=True,
        text=True,
        check=False,
    )


def mark_self_checked(output_dir: Path) -> subprocess.CompletedProcess:
    repo_root = output_dir.resolve().parents[2]
    return subprocess.run(
        [
            sys.executable,
            str(REPO_ROOT / "scripts" / "self_check_submission.py"),
            str(output_dir),
            "--repo-root",
            str(repo_root),
            "--pr-author",
            "alice",
            "--mark-self-checked",
            "--json",
        ],
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


def write_provisional_site_package(root: Path) -> None:
    geometry_dir = root / "brief" / "site-package" / "geometry"
    geometry_dir.mkdir(parents=True, exist_ok=True)
    source = REPO_ROOT / "brief" / "site-package" / "geometry" / "provisional_boundaries.geojson"
    (geometry_dir / "provisional_boundaries.geojson").write_bytes(source.read_bytes())


@unittest.skipUnless(HAS_REVIEW_DEPS, "Install requirements-review.txt to run scaffold/self-check tests")
class AgentScaffoldAndSelfCheckTests(unittest.TestCase):
    def test_ready_package_manifest_refresh_updates_only_declared_hashes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "refresh-ready"
            self.assertEqual(run_scaffold(submission_dir, cwd=root).returncode, 0)
            self.assertEqual(complete_scaffold(submission_dir).returncode, 0)
            self.assertEqual(mark_self_checked(submission_dir).returncode, 0)

            changed = submission_dir / "visual" / "index.html"
            changed.write_text(changed.read_text(encoding="utf-8") + "\n<!-- iteration -->\n", encoding="utf-8")
            unlisted = submission_dir / "notes.tmp"
            unlisted.write_text("not part of the manifest", encoding="utf-8")

            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "refresh_submission_manifest.py"),
                    str(submission_dir),
                    "--json",
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            result = json.loads(completed.stdout)
            manifest = json.loads((submission_dir / "manifest.json").read_text(encoding="utf-8"))
            items = {item["path"]: item for item in manifest["files"]}
            self.assertEqual(
                hashlib.sha256(changed.read_bytes()).hexdigest(),
                items["visual/index.html"]["sha256"],
            )
            self.assertNotIn("notes.tmp", items)
            self.assertNotIn("manifest.json", result["refreshed_files"])
            self.assertFalse(manifest["validation_claim"]["self_checked"])
            self.assertIn("--mark-self-checked", result["next_command"])
            self.assertNotIn("<github-login>", result["next_command"])
            self.assertEqual(
                "Replace GITHUB_LOGIN with the exact PR author login.",
                result["next_command_note"],
            )

    def test_ready_package_manifest_refresh_restores_missing_hashes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "refresh-missing-hashes"
            self.assertEqual(run_scaffold(submission_dir, cwd=root).returncode, 0)
            self.assertEqual(complete_scaffold(submission_dir).returncode, 0)
            self.assertEqual(mark_self_checked(submission_dir).returncode, 0)

            manifest_path = submission_dir / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            for item in manifest["files"]:
                item.pop("sha256", None)
            manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "refresh_submission_manifest.py"),
                    str(submission_dir),
                    "--json",
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            refreshed = json.loads(manifest_path.read_text(encoding="utf-8"))
            self.assertTrue(refreshed["files"])
            self.assertTrue(
                all(item.get("sha256") for item in refreshed["files"] if item.get("path") != "manifest.json")
            )
            self.assertFalse(refreshed["validation_claim"]["self_checked"])

            checked = mark_self_checked(submission_dir)
            self.assertEqual(checked.returncode, 0, checked.stdout + checked.stderr)

    def test_manifest_refresh_next_command_quotes_space_in_path(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            submission_dir = Path(tmp) / "workspace with spaces" / "submission"
            submission_dir.mkdir(parents=True)
            artifact = submission_dir / "proposal.md"
            artifact.write_text("# Proposal\n", encoding="utf-8")
            (submission_dir / "manifest.json").write_text(
                json.dumps(
                    {
                        "package_state": "ready_for_review",
                        "validation_claim": {"self_checked": True},
                        "files": [{"path": "proposal.md", "sha256": "0" * 64}],
                    }
                ),
                encoding="utf-8",
            )

            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "refresh_submission_manifest.py"),
                    str(submission_dir),
                    "--json",
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(0, completed.returncode, completed.stdout + completed.stderr)
            result = json.loads(completed.stdout)
            command = shlex.split(result["next_command"])
            self.assertEqual(str(submission_dir), command[2])
            self.assertEqual("GITHUB_LOGIN", command[command.index("--pr-author") + 1])

    def test_manifest_refresh_refuses_scaffold_and_unsafe_paths(self) -> None:
        from refresh_submission_manifest import refresh_manifest

        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "refresh-refusal"
            self.assertEqual(run_scaffold(submission_dir, cwd=root).returncode, 0)
            ok, error, refreshed = refresh_manifest(submission_dir)
            self.assertFalse(ok)
            self.assertIn("must be ready_for_review", error)
            self.assertEqual([], refreshed)

            manifest_path = submission_dir / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["package_state"] = "ready_for_review"
            manifest["files"].append({"path": "../outside.txt", "sha256": "0" * 64})
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
            ok, error, refreshed = refresh_manifest(submission_dir)
            self.assertFalse(ok)
            self.assertIn("unsafe or duplicate", error)
            self.assertEqual([], refreshed)

    def test_scaffold_emits_machine_readable_model_disclosure_fields(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            output_dir = Path(tmp) / "submissions" / "alice" / "model-disclosure"
            scaffold = run_scaffold(output_dir)
            self.assertEqual(0, scaffold.returncode, scaffold.stdout + scaffold.stderr)

            agent = json.loads((output_dir / "agent.json").read_text(encoding="utf-8"))
            manifest = json.loads((output_dir / "manifest.json").read_text(encoding="utf-8"))
            expected = {
                "model_family": "other",
                "model_detail": "replace-with-declared-model",
            }
            self.assertEqual(expected, {key: agent[key] for key in expected})
            self.assertEqual(expected, {key: manifest["agent"][key] for key in expected})

    def test_finalize_blocks_v2_package_without_required_bilingual_files(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            output_dir = Path(tmp) / "submissions" / "alice" / "missing-bilingual"
            scaffold = run_scaffold(output_dir)
            self.assertEqual(0, scaffold.returncode, scaffold.stdout + scaffold.stderr)
            proposal = output_dir / "proposal.md"
            proposal.write_text(
                proposal.read_text(encoding="utf-8").replace("SCAFFOLD-DRAFT", "PARTICIPANT-DESIGN")
                + "\nParticipant-authored design decisions.\n",
                encoding="utf-8",
            )
            for rel in ["report/proposal.html", "visual/index.html"]:
                path = output_dir / rel
                path.write_text(path.read_text(encoding="utf-8") + "\n<!-- participant revision -->\n", encoding="utf-8")
            for rel in [
                "assets/figures/site-overview.png",
                "assets/figures/land-use-structure.png",
                "assets/figures/key-areas.png",
                "assets/figures/mobility-bluegreen.png",
                "assets/figures/metrics-evidence.png",
            ]:
                path = output_dir / rel
                path.write_bytes(path.read_bytes() + b"participant-revision")
            geometry = output_dir / "geometry" / "land_use.geojson"
            geometry.write_text(geometry.read_text(encoding="utf-8") + "\n", encoding="utf-8")
            drawing = b"%PDF-1.4\n3 0 obj<</Type/Page/Parent 2 0 R>>endobj\n" + b"0" * 4096
            for rel in ["drawings/a3-booklet.pdf", "drawings/a0-boards.pdf"]:
                (output_dir / rel).write_bytes(drawing)

            finalized = subprocess.run(
                [sys.executable, str(REPO_ROOT / "scripts" / "finalize_submission.py"), str(output_dir)],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertNotEqual(0, finalized.returncode)
            self.assertIn("required bilingual counterpart is missing", finalized.stdout)

    def test_finalize_accepts_nonempty_drawing_with_synchronized_scaffold_hash(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            output_dir = Path(tmp) / "submissions" / "alice" / "synchronized-drawing"
            scaffold = run_scaffold(output_dir)
            self.assertEqual(0, scaffold.returncode, scaffold.stdout + scaffold.stderr)

            finalized = complete_scaffold(
                output_dir,
                synchronized_paths=("drawings/a0-boards.pdf",),
            )

            self.assertEqual(0, finalized.returncode, finalized.stdout + finalized.stderr)
            manifest = json.loads((output_dir / "manifest.json").read_text(encoding="utf-8"))
            self.assertEqual("ready_for_review", manifest["package_state"])

    def test_finalize_registers_existing_language_counterparts(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            output_dir = Path(tmp) / "submissions" / "alice" / "bilingual-finalize"
            scaffold = run_scaffold(output_dir)
            self.assertEqual(0, scaffold.returncode, scaffold.stdout + scaffold.stderr)
            translated = (output_dir / "proposal.md").read_text(encoding="utf-8").replace(
                'language: "zh"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_file: "proposal.en.md"',
                'language: "en"\nproposal_format_version: "2"\nbilingual_contract_version: "1"\ntranslation_of: "proposal.md"',
                1,
            )
            (output_dir / "proposal.en.md").write_text(translated, encoding="utf-8")
            (output_dir / "report" / "proposal.en.html").write_bytes(
                (output_dir / "report" / "proposal.html").read_bytes()
            )
            manifest_path = output_dir / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append({
                "path": "proposal.en.md",
                "role": "narrative",
                "required": False,
                "language": "neutral",
                "translation_of": "wrong.md",
            })
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            completed = complete_scaffold(output_dir)
            self.assertEqual(0, completed.returncode, completed.stdout + completed.stderr)
            manifest = json.loads((output_dir / "manifest.json").read_text(encoding="utf-8"))
            items = {item["path"]: item for item in manifest["files"]}
            self.assertEqual("zh", items["proposal.md"]["language"])
            self.assertEqual("en", items["proposal.en.md"]["language"])
            self.assertEqual("proposal.md", items["proposal.en.md"]["translation_of"])
            self.assertEqual("report/proposal.html", items["report/proposal.en.html"]["translation_of"])

    def test_finalize_preserves_localized_figure_language_metadata(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            output_dir = Path(tmp) / "submissions" / "alice" / "bilingual-figures"
            scaffold = run_scaffold(output_dir)
            self.assertEqual(0, scaffold.returncode, scaffold.stdout + scaffold.stderr)

            primary_rel = "assets/figures/site-overview.png"
            localized_rel = "assets/figures/site-overview.en.png"
            (output_dir / localized_rel).write_bytes((output_dir / primary_rel).read_bytes())
            manifest_path = output_dir / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append(
                {
                    "path": localized_rel,
                    "role": "figure",
                    "required": False,
                    "language": "en",
                    "translation_of": primary_rel,
                }
            )
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            completed = complete_scaffold(output_dir)
            self.assertEqual(0, completed.returncode, completed.stdout + completed.stderr)
            finalized = json.loads(manifest_path.read_text(encoding="utf-8"))
            items = {item["path"]: item for item in finalized["files"]}
            self.assertEqual("zh", items[primary_rel]["language"])
            self.assertEqual("en", items[localized_rel]["language"])
            self.assertEqual(primary_rel, items[localized_rel]["translation_of"])

    def test_generated_scaffold_is_blocked_until_participant_finalizes_it(self) -> None:
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
            self.assertNotEqual(completed.returncode, 0)
            report = json.loads(completed.stdout)
            self.assertFalse(report["ok"])
            self.assertFalse(report["deterministic_validation"]["ok"])
            self.assertFalse(report["can_enter_formal_review"])
            self.assertTrue(any("generated scaffold" in item for item in report["deterministic_validation"]["stdout"]["errors"]))

            finalized = complete_scaffold(submission_dir)
            self.assertEqual(finalized.returncode, 0, finalized.stdout + finalized.stderr)
            marked = mark_self_checked(submission_dir)
            self.assertEqual(marked.returncode, 0, marked.stdout + marked.stderr)
            rerun = subprocess.run(
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
            self.assertEqual(rerun.returncode, 0, rerun.stdout + rerun.stderr)
            self.assertTrue(json.loads(rerun.stdout)["can_enter_formal_review"])
            manifest = json.loads((submission_dir / "manifest.json").read_text(encoding="utf-8"))
            self.assertTrue(manifest["validation_claim"]["self_checked"])
            self.assertEqual(
                "persisted-self-check-v1",
                manifest["validation_claim"]["readiness_contract"],
            )
            persisted = json.loads((submission_dir / "self_check.json").read_text(encoding="utf-8"))
            self.assertTrue(persisted["ok"])
            self.assertTrue(persisted["can_enter_formal_review"])
            self.assertEqual(
                {
                    "DETERMINISTIC_VALIDATION",
                    "SPATIAL_REVIEW",
                    "VISUAL_PACKAGING",
                    "PROFESSIONAL_EVIDENCE",
                },
                {item["check_id"] for item in persisted["checks"]},
            )
            self_check_item = next(item for item in manifest["files"] if item["path"] == "self_check.json")
            self.assertEqual(
                self_check_item["sha256"],
                hashlib.sha256((submission_dir / "self_check.json").read_bytes()).hexdigest(),
            )

    def test_mark_self_checked_replaces_stale_runtime_evidence_and_refreshes_hash(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "stale-self-check"
            self.assertEqual(run_scaffold(submission_dir, cwd=root).returncode, 0)
            self.assertEqual(complete_scaffold(submission_dir).returncode, 0)

            self_check_path = submission_dir / "self_check.json"
            stale = json.loads(self_check_path.read_text(encoding="utf-8"))
            stale.update(
                {
                    "ok": False,
                    "can_enter_formal_review": False,
                    "review_status": "revision-requested",
                }
            )
            self_check_path.write_text(json.dumps(stale, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            manifest_path = submission_dir / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            item = next(item for item in manifest["files"] if item["path"] == "self_check.json")
            item["sha256"] = hashlib.sha256(self_check_path.read_bytes()).hexdigest()
            manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

            marked = mark_self_checked(submission_dir)
            self.assertEqual(marked.returncode, 0, marked.stdout + marked.stderr)
            persisted = json.loads(self_check_path.read_text(encoding="utf-8"))
            self.assertTrue(persisted["ok"])
            self.assertTrue(persisted["can_enter_formal_review"])
            import jsonschema

            jsonschema.validate(
                persisted,
                json.loads(
                    (REPO_ROOT / "brief" / "site-package" / "schemas" / "self_check.schema.json").read_text(
                        encoding="utf-8"
                    )
                ),
            )
            refreshed = json.loads(manifest_path.read_text(encoding="utf-8"))
            refreshed_item = next(item for item in refreshed["files"] if item["path"] == "self_check.json")
            self.assertEqual(
                refreshed_item["sha256"],
                hashlib.sha256(self_check_path.read_bytes()).hexdigest(),
            )
            from generate_submissions_data import has_blocking_self_check

            self.assertFalse(has_blocking_self_check(submission_dir))

    def test_finalize_rejects_manifest_path_outside_submission(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "path-escape"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            outside = root / "outside.txt"
            outside.write_text("outside must not be hashed\n", encoding="utf-8")
            manifest_path = submission_dir / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append(
                {"path": str(outside), "role": "narrative", "required": False}
            )
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            finalized = complete_scaffold(submission_dir)

            self.assertNotEqual(finalized.returncode, 0)
            self.assertIn("unsafe path", finalized.stdout)
            persisted = json.loads(manifest_path.read_text(encoding="utf-8"))
            self.assertEqual("scaffold", persisted["package_state"])
            self.assertEqual("outside must not be hashed\n", outside.read_text(encoding="utf-8"))

    def test_finalize_rejects_manifest_path_through_symlink(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "symlink-escape"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            outside = root / "outside.txt"
            outside.write_text("outside must not be hashed\n", encoding="utf-8")
            link = submission_dir / "linked.txt"
            try:
                link.symlink_to(outside)
            except OSError as exc:
                self.skipTest(f"symlink not supported: {exc}")
            manifest_path = submission_dir / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["files"].append(
                {"path": "linked.txt", "role": "narrative", "required": False}
            )
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            finalized = complete_scaffold(submission_dir)

            self.assertNotEqual(finalized.returncode, 0)
            self.assertIn("path traverses symbolic link", finalized.stdout)
            persisted = json.loads(manifest_path.read_text(encoding="utf-8"))
            self.assertEqual("scaffold", persisted["package_state"])

    def test_scaffold_does_not_emit_contributor_exhibit(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            # Portal entry is a maintainer decision; contributors do not ship exhibit.json.
            self.assertFalse((submission_dir / "exhibit.json").exists())

    def test_mark_self_checked_can_replace_persisted_blocking_failure(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "blocking-self-check"
            self.assertEqual(run_scaffold(submission_dir, cwd=root).returncode, 0)
            self.assertEqual(complete_scaffold(submission_dir).returncode, 0)

            self_check_path = submission_dir / "self_check.json"
            persisted = json.loads(self_check_path.read_text(encoding="utf-8"))
            persisted["checks"][0]["result"] = "fail"
            persisted["checks"][0]["severity"] = "blocking"
            self_check_path.write_text(
                json.dumps(persisted, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            manifest_path = submission_dir / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            item = next(item for item in manifest["files"] if item["path"] == "self_check.json")
            item["sha256"] = hashlib.sha256(self_check_path.read_bytes()).hexdigest()
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            marked = mark_self_checked(submission_dir)
            self.assertEqual(marked.returncode, 0, marked.stdout + marked.stderr)
            final_self_check = json.loads(self_check_path.read_text(encoding="utf-8"))
            self.assertTrue(final_self_check["ok"])
            self.assertTrue(final_self_check["can_enter_formal_review"])
            self.assertTrue(
                all(item["result"] == "pass" for item in final_self_check["checks"])
            )

    def test_validation_rejects_contributor_supplied_exhibit(self) -> None:
        from validate_submission import validate_submission

        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            (submission_dir / "exhibit.json").write_text("{}", encoding="utf-8")

            changed = ["submissions/alice/topology-pass/exhibit.json"]
            report = validate_submission(root, "alice", changed)
            self.assertFalse(report.ok)
            self.assertTrue(
                any("exhibit.json" in error for error in report.errors),
                report.errors,
            )

    def test_maintainer_exhibit_generation_renders_portal(self) -> None:
        import jsonschema

        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "topology-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            from generate_submissions_data import package_sha256
            (root / "gallery-publication.json").write_text(
                json.dumps(
                    {
                        "version": 1,
                        "entries": [
                            {
                                "path": "submissions/alice/topology-pass",
                                "published": True,
                                "featured": True,
                                "review_status": "approved_for_publication",
                                "quality_tier": "featured",
                                "reviewed_by": "maintainer",
                                "reviewed_at": "2026-08-05",
                                "rights_reviewed": True,
                                "reviewed_package_sha256": package_sha256(submission_dir),
                                "selection_reason_zh": "通过人工内容与版权审核后入选展示。",
                                "selection_reason_en": "Selected after human content and rights review.",
                                "selected_at": "2026-08-05",
                            }
                        ],
                    }
                ),
                encoding="utf-8",
            )

            generated = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "generate_exhibit.py"),
                    str(submission_dir),
                    "--repo-root",
                    str(root),
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(generated.returncode, 0, generated.stdout + generated.stderr)

            exhibit_path = submission_dir / "exhibit.json"
            self.assertTrue(exhibit_path.exists())
            exhibit = json.loads(exhibit_path.read_text(encoding="utf-8"))
            self.assertEqual("report/proposal.html", exhibit["links"]["detail"])
            self.assertTrue((submission_dir / exhibit["links"]["detail"]).is_file())
            schema = json.loads((REPO_ROOT / "schema" / "exhibit.schema.json").read_text(encoding="utf-8"))
            jsonschema.validate(exhibit, schema)

            portal_out = root / "portal.html"
            rendered = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "render_portal.py"),
                    str(submission_dir),
                    "--output",
                    str(portal_out),
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(rendered.returncode, 0, rendered.stdout + rendered.stderr)
            self.assertTrue(portal_out.exists() and portal_out.stat().st_size > 0)

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

    def test_tampered_scaffold_file_fails_manifest_hash_check(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "tampered"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            proposal = submission_dir / "proposal.md"
            proposal.write_text(proposal.read_text(encoding="utf-8") + "\n篡改。\n", encoding="utf-8")
            checked = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "validate_local_submission.py"),
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
            self.assertNotEqual(checked.returncode, 0)
            self.assertIn("sha256 mismatch for `proposal.md`", checked.stdout)
            self.assertNotIn("declared digest matches", checked.stdout)

    def test_manifest_hash_mismatch_explains_crlf_normalization(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_official_site_package(root)
            submission_dir = root / "submissions" / "alice" / "crlf-manifest"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)

            proposal = submission_dir / "proposal.md"
            lf_raw = proposal.read_bytes().replace(b"\r\n", b"\n")
            proposal.write_bytes(lf_raw)
            crlf_digest = hashlib.sha256(lf_raw.replace(b"\n", b"\r\n")).hexdigest()
            manifest_path = submission_dir / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            next(item for item in manifest["files"] if item["path"] == "proposal.md")[
                "sha256"
            ] = crlf_digest
            manifest_path.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            checked = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "validate_local_submission.py"),
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
            self.assertNotEqual(checked.returncode, 0)
            self.assertIn("sha256 mismatch for `proposal.md`", checked.stdout)
            self.assertIn("declared digest matches the CRLF form", checked.stdout)
            self.assertIn(
                "Regenerate manifest.json from the exact bytes committed to Git",
                checked.stdout,
            )

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

    def test_generated_provisional_fixture_passes_full_self_check_and_content_review_gate(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            write_provisional_site_package(root)
            submission_dir = root / "submissions" / "alice" / "provisional-pass"
            scaffold = run_scaffold(submission_dir, cwd=root)
            self.assertEqual(scaffold.returncode, 0, scaffold.stdout + scaffold.stderr)
            finalized = complete_scaffold(submission_dir)
            self.assertEqual(finalized.returncode, 0, finalized.stdout + finalized.stderr)
            marked = mark_self_checked(submission_dir)
            self.assertEqual(marked.returncode, 0, marked.stdout + marked.stderr)
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
            self.assertTrue(report["ok"])
            self.assertTrue(report["can_enter_formal_review"])
            self.assertEqual("professional_design_package", report["package_type"])
            self.assertEqual("formal-review-ready", report["review_status"])
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
            finalized = complete_scaffold(submission_dir)
            self.assertEqual(finalized.returncode, 0, finalized.stdout + finalized.stderr)
            marked = mark_self_checked(submission_dir)
            self.assertEqual(marked.returncode, 0, marked.stdout + marked.stderr)

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
