import sys
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from professional_review import (  # noqa: E402
    ProfessionalReport,
    extract_proposal_metric_claims,
    validate_proposal_metric_table_claims,
)


class ProfessionalMetricTableTests(unittest.TestCase):
    def test_length_units_are_normalized_and_mismatch_is_blocked(self) -> None:
        report = ProfessionalReport()
        validate_proposal_metric_table_claims(
            report,
            "proposal.md",
            "| 双轨慢行主脊长度 | 约18.1 km | geometry/roads.geojson |\n",
            {"heritage_spine_length_m": {"status": "known", "value": 39760.64, "unit": "m"}},
        )
        self.assertFalse(report.ok)
        self.assertEqual("PROPOSAL_METRIC_VALUE_MISMATCH", report.issues[0].check_id)

    def test_rounded_percentage_with_matching_metric_passes(self) -> None:
        report = ProfessionalReport()
        validate_proposal_metric_table_claims(
            report,
            "proposal.md",
            "| 绿地率 | 28.4% | metric:green_ratio |\n",
            {"green_ratio": {"status": "known", "value": 0.2836, "unit": "ratio"}},
        )
        self.assertTrue(report.ok, [issue.__dict__ for issue in report.issues])

    def test_unknown_metric_numeric_table_claim_is_blocked(self) -> None:
        report = ProfessionalReport()
        validate_proposal_metric_table_claims(
            report,
            "proposal.md",
            "| 容积率 | 2.0 | 待控规确认 |\n",
            {"floor_area_ratio": {"status": "unknown", "value": None, "unit": "ratio"}},
        )
        self.assertFalse(report.ok)
        self.assertEqual("PROPOSAL_UNKNOWN_METRIC_NUMERIC_CLAIM", report.issues[0].check_id)

    def test_ranges_and_unrelated_numbers_are_not_guessed(self) -> None:
        text = "| 建筑高度 | 18–24 m | range |\n| 重点区域 | 3 | count |\n"
        self.assertEqual([], extract_proposal_metric_claims(text))


if __name__ == "__main__":
    unittest.main()
