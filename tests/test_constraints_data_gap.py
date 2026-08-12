"""Regression tests for the empty-constraints data-gap advisory.

An empty `geometry/constraints.geojson` is an accepted state: no official regulatory-control
geometry is published for this site, and fabricating one would be worse than an empty set.
These tests pin that contract down: the advisory is warning-only, it never turns an empty
constraint layer into a failure, and it stays silent whenever the gap is recorded either in
the file itself or in `assumptions.json`.
"""

import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from validate_submission import (  # noqa: E402
    FORMAL_NONEMPTY_GEOMETRY_FILES,
    ValidationReport,
    assumptions_declare_constraints_gap,
    constraints_file_declares_data_gap,
    validate_geojson_file,
)

HAS_REVIEW_DEPS = all(
    importlib.util.find_spec(name) is not None for name in ["shapely", "pyproj", "jsonschema"]
)

EMPTY_CONSTRAINTS = {"type": "FeatureCollection", "name": "constraints_scaffold", "features": []}
ADVISORY_MARKER = "empty constraint layer is accepted"


def constraint_feature() -> dict:
    return {
        "type": "Feature",
        "id": "CONSTRAINT-001",
        "properties": {
            "id": "CONSTRAINT-001",
            "layer": "REGULATORY_CONTROL",
            "source_type": "agent_generated_design",
            "confidence": "medium",
            "geometry_role": "design_proposal",
            "official_boundary": False,
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [116.300, 39.901],
                    [116.301, 39.901],
                    [116.301, 39.902],
                    [116.300, 39.902],
                    [116.300, 39.901],
                ]
            ],
        },
    }


class EmptyConstraintsAdvisoryTests(unittest.TestCase):
    def check(self, constraints: dict, assumptions: dict | None = None) -> ValidationReport:
        report = ValidationReport()
        with tempfile.TemporaryDirectory() as tmp:
            base = Path(tmp) / "submissions" / "tester" / "package"
            (base / "geometry").mkdir(parents=True)
            path = base / "geometry" / "constraints.geojson"
            path.write_text(json.dumps(constraints, ensure_ascii=False), encoding="utf-8")
            if assumptions is not None:
                (base / "assumptions.json").write_text(
                    json.dumps(assumptions, ensure_ascii=False), encoding="utf-8"
                )
            validate_geojson_file(
                report,
                REPO_ROOT,
                path,
                "submissions/tester/package/geometry/constraints.geojson",
                require_features=False,
                stage="formal",
                geometry_name="constraints.geojson",
            )
        return report

    def advisories(self, report: ValidationReport) -> list[str]:
        return [item for item in report.warnings if ADVISORY_MARKER in item]

    def test_empty_constraints_without_any_declaration_warns(self) -> None:
        report = self.check(
            EMPTY_CONSTRAINTS,
            {"assumptions": [{"id": "A-SITE-001", "statement": "Boundary is provisional."}]},
        )
        self.assertEqual(1, len(self.advisories(report)))
        self.assertIn("data_gap", self.advisories(report)[0])
        self.assertIn("assumptions.json", self.advisories(report)[0])

    def test_missing_assumptions_file_warns(self) -> None:
        report = self.check(EMPTY_CONSTRAINTS)
        self.assertEqual(1, len(self.advisories(report)))

    def test_in_file_data_gap_declaration_is_silent(self) -> None:
        constraints = dict(EMPTY_CONSTRAINTS)
        constraints["data_gap"] = {
            "status": "official_constraint_geometry_unavailable",
            "assumption_ids": ["A-CONTROLS-001"],
            "missing_layers": ["REGULATORY_CONTROL", "HERITAGE_PROTECTION"],
        }
        report = self.check(constraints, {"assumptions": []})
        self.assertEqual([], self.advisories(report))

    def test_missing_official_layers_declaration_is_silent(self) -> None:
        """Matches a convention already used by submitted packages."""
        constraints = dict(EMPTY_CONSTRAINTS)
        constraints["missing_official_layers"] = ["HERITAGE_PROTECTION", "REGULATORY_CONTROL"]
        report = self.check(constraints, {"assumptions": []})
        self.assertEqual([], self.advisories(report))

    def test_scaffold_default_assumption_id_is_silent(self) -> None:
        """The scaffold ships A-CONTROLS-001, so untouched packages stay quiet."""
        report = self.check(EMPTY_CONSTRAINTS, {"assumptions": [{"id": "A-CONTROLS-001"}]})
        self.assertEqual([], self.advisories(report))

    def test_hand_written_chinese_assumption_is_silent(self) -> None:
        """Packages that renamed the assumption still register the gap in their own words."""
        report = self.check(
            EMPTY_CONSTRAINTS,
            {
                "assumptions": [
                    {
                        "assumption_id": "ASSUME-004",
                        "statement_zh": "缺少控规、道路红线、权属与文保范围等官方条件。",
                    }
                ]
            },
        )
        self.assertEqual([], self.advisories(report))

    def test_non_empty_constraints_never_triggers_the_advisory(self) -> None:
        constraints = {
            "type": "FeatureCollection",
            "name": "constraints",
            "features": [constraint_feature()],
        }
        report = self.check(constraints, {"assumptions": []})
        self.assertEqual([], self.advisories(report))
        self.assertEqual([], report.errors)

    def test_advisory_is_warning_only_and_keeps_the_package_passing(self) -> None:
        report = self.check(EMPTY_CONSTRAINTS, {"assumptions": []})
        self.assertEqual(1, len(self.advisories(report)))
        self.assertEqual([], report.errors)
        self.assertTrue(report.ok)
        self.assertTrue(report.to_dict()["ok"])
        # validate_submission.main() returns `0 if report.ok else 1`.
        self.assertEqual(0, 0 if report.ok else 1)

    def test_constraints_layer_stays_outside_the_formal_nonempty_gate(self) -> None:
        """Guard against the advisory ever being promoted into a hard gate."""
        self.assertNotIn("constraints.geojson", FORMAL_NONEMPTY_GEOMETRY_FILES)

    def test_declaration_helpers_reject_empty_placeholders(self) -> None:
        self.assertFalse(constraints_file_declares_data_gap({"data_gap": {}}))
        self.assertFalse(constraints_file_declares_data_gap({"data_gaps": []}))
        self.assertFalse(assumptions_declare_constraints_gap({"assumptions": []}))
        self.assertFalse(assumptions_declare_constraints_gap(None))


@unittest.skipUnless(HAS_REVIEW_DEPS, "Install requirements-review.txt to run scaffold tests")
class ScaffoldConstraintsDataGapTests(unittest.TestCase):
    def test_scaffold_declares_the_gap_without_inventing_geometry(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            output = Path(tmp) / "submissions" / "tester" / "scaffold-package"
            run = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "scaffold_ai_submission.py"),
                    str(output),
                    "--stage",
                    "formal",
                    "--agent-id",
                    "alice",
                    "--agent-name",
                    "Alice Agent",
                    "--proposal-title",
                    "Constraints Data Gap",
                ],
                cwd=REPO_ROOT,
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(0, run.returncode, run.stderr)
            constraints = json.loads(
                (output / "geometry" / "constraints.geojson").read_text(encoding="utf-8")
            )

            # The gap is declared; no constraint geometry is invented to fill it.
            self.assertEqual([], constraints["features"])
            data_gap = constraints["data_gap"]
            self.assertEqual("official_constraint_geometry_unavailable", data_gap["status"])
            self.assertIn("A-CONTROLS-001", data_gap["assumption_ids"])
            self.assertIn("REGULATORY_CONTROL", data_gap["missing_layers"])
            self.assertIn("HERITAGE_PROTECTION", data_gap["missing_layers"])
            self.assertIn("official_constraint", data_gap["note_en"])

            # The scaffold assumption keeps registering the same gap.
            assumptions = json.loads((output / "assumptions.json").read_text(encoding="utf-8"))
            self.assertTrue(assumptions_declare_constraints_gap(assumptions))

            report = ValidationReport()
            validate_geojson_file(
                report,
                REPO_ROOT,
                output / "geometry" / "constraints.geojson",
                "geometry/constraints.geojson",
                require_features=False,
                stage="formal",
                geometry_name="constraints.geojson",
            )
            self.assertEqual([], [w for w in report.warnings if ADVISORY_MARKER in w])
            self.assertEqual([], report.errors)


if __name__ == "__main__":
    unittest.main()
