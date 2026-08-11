from __future__ import annotations

import csv
import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PROCESSED = ROOT / "data" / "processed"


class ProcessedDataTests(unittest.TestCase):
    def read_csv_rows(self, name: str) -> list[dict[str, str]]:
        path = PROCESSED / name
        self.assertTrue(path.exists(), f"missing processed file: {name}")
        with path.open(newline="", encoding="utf-8") as handle:
            rows = list(csv.DictReader(handle))
        self.assertGreater(len(rows), 0, f"{name} should contain rows")
        return rows

    def test_processed_csv_files_are_parseable(self) -> None:
        for name in [
            "project_scope_summary.csv",
            "agent_task_requirements.csv",
            "source_use_matrix.csv",
            "missing_data_checklist.csv",
        ]:
            with self.subTest(name=name):
                rows = self.read_csv_rows(name)
                self.assertTrue(rows[0].keys())

    def test_fact_pack_links_core_sources_and_tables(self) -> None:
        text = (PROCESSED / "agent_fact_pack.md").read_text(encoding="utf-8")
        for expected in [
            "DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509",
            "DATA-SRC-AGENT-TASKBOOK-20260518",
            "DATA-SRC-PROVISIONAL-BOUNDARIES-20260605",
            "project_scope_summary.csv",
            "agent_task_requirements.csv",
            "source_use_matrix.csv",
            "missing_data_checklist.csv",
        ]:
            with self.subTest(expected=expected):
                self.assertIn(expected, text)

    def test_scope_summary_contains_three_levels_and_three_key_areas(self) -> None:
        rows = self.read_csv_rows("project_scope_summary.csv")
        by_id = {row["scope_id"]: row for row in rows}
        self.assertEqual(len(rows), 6)
        for scope_id in [
            "coordinated_research_area",
            "overall_design_area",
            "key_detailed_design_area",
            "zhongzhiyuan_ai_acceleration_area",
            "beijing_ai_origin_community",
            "dazhongsi_ai_industry_cluster",
        ]:
            with self.subTest(scope_id=scope_id):
                self.assertIn(scope_id, by_id)
                self.assertEqual(by_id[scope_id]["geometry_status"], "exact_polygon_missing_provisional_available")
                self.assertIn("PROV-", by_id[scope_id]["provisional_feature_id"])

    def test_provisional_boundary_stays_provisional_only(self) -> None:
        rows = self.read_csv_rows("source_use_matrix.csv")
        by_source = {row["source_id"]: row for row in rows}
        provisional = by_source["DATA-SRC-PROVISIONAL-BOUNDARIES-20260605"]
        self.assertEqual(provisional["usable_for_formal"], "provisional_only")
        self.assertEqual(provisional["can_support_formal_tasks"], "no")
        self.assertEqual(provisional["can_support_spatial_control"], "provisional_only")

    def test_missing_data_checklist_keeps_official_boundary_gaps(self) -> None:
        rows = self.read_csv_rows("missing_data_checklist.csv")
        gaps = {row["gap_id"]: row for row in rows}
        self.assertIn("GAP-BOUNDARY-001", gaps)
        self.assertIn("GAP-BOUNDARY-002", gaps)
        self.assertIn("official polygon", gaps["GAP-BOUNDARY-001"]["missing_item"])
        self.assertIn("official KEY_AREA polygon", gaps["GAP-BOUNDARY-002"]["missing_item"])

    def test_source_registry_lists_processed_local_paths(self) -> None:
        registry = json.loads((ROOT / "data" / "source_registry.json").read_text(encoding="utf-8"))
        paths_by_source = {source["source_id"]: set(source.get("local_paths", [])) for source in registry["sources"]}
        expected_paths = {
            "data/processed/agent_fact_pack.md",
            "data/processed/source_use_matrix.csv",
            "data/processed/missing_data_checklist.csv",
        }
        for source_id in [
            "DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509",
            "DATA-SRC-AGENT-TASKBOOK-20260518",
            "DATA-SRC-PROVISIONAL-BOUNDARIES-20260605",
        ]:
            with self.subTest(source_id=source_id):
                self.assertTrue(expected_paths.issubset(paths_by_source[source_id]))


if __name__ == "__main__":
    unittest.main()
