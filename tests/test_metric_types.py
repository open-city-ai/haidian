import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from validate_submission import ValidationReport, validate_metrics_file  # noqa: E402
from metric_types import is_json_number  # noqa: E402


class MetricTypeTests(unittest.TestCase):
    def test_booleans_are_not_json_numbers(self) -> None:
        self.assertTrue(is_json_number(0))
        self.assertTrue(is_json_number(1.0))
        self.assertFalse(is_json_number(True))
        self.assertFalse(is_json_number(False))

    def test_non_finite_values_are_not_json_numbers(self) -> None:
        for value in (float("nan"), float("inf"), float("-inf")):
            with self.subTest(value=value):
                self.assertFalse(is_json_number(value))

    def test_huge_integers_are_not_json_numbers(self) -> None:
        for value in (10**1000, -(10**1000)):
            with self.subTest(sign=value > 0):
                self.assertFalse(is_json_number(value))

    def test_huge_integer_known_metric_fails_deterministic_validation(self) -> None:
        for value in (10**1000, -(10**1000)):
            with self.subTest(sign=value > 0), tempfile.TemporaryDirectory() as tmp:
                path = Path(tmp) / "metrics.json"
                path.write_text(
                    json.dumps(
                        {
                            "schema_version": "0.1.0",
                            "units": {"length": "m", "area": "sqm"},
                            "metrics": {
                                "green_ratio": {"status": "known", "value": value, "unit": "ratio"}
                            },
                        }
                    ),
                    encoding="utf-8",
                )
                report = ValidationReport()
                validate_metrics_file(report, path, "metrics.json")

            self.assertFalse(report.ok)
            self.assertTrue(any("known metric needs numeric value" in error for error in report.errors))

    def test_boolean_known_metric_fails_deterministic_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "metrics.json"
            path.write_text(
                json.dumps(
                    {
                        "schema_version": "0.1.0",
                        "units": {"length": "m", "area": "sqm"},
                        "metrics": {
                            "green_ratio": {
                                "status": "known",
                                "value": True,
                                "unit": "ratio",
                            }
                        },
                    }
                ),
                encoding="utf-8",
            )
            report = ValidationReport()
            validate_metrics_file(report, path, "metrics.json")

        self.assertFalse(report.ok)
        self.assertTrue(any("known metric needs numeric value" in error for error in report.errors))

    def test_numeric_zero_and_one_remain_valid_ratio_values(self) -> None:
        for value in (0, 1):
            with self.subTest(value=value), tempfile.TemporaryDirectory() as tmp:
                path = Path(tmp) / "metrics.json"
                path.write_text(
                    json.dumps(
                        {
                            "schema_version": "0.1.0",
                            "units": {"length": "m", "area": "sqm"},
                            "metrics": {
                                "green_ratio": {
                                    "status": "known",
                                    "value": value,
                                    "unit": "ratio",
                                }
                            },
                        }
                    ),
                    encoding="utf-8",
                )
                report = ValidationReport()
                validate_metrics_file(report, path, "metrics.json")

            self.assertTrue(report.ok, report.errors)


if __name__ == "__main__":
    unittest.main()
