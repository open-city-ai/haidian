import json
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
BOUNDARIES = REPO_ROOT / "brief" / "site-package" / "geometry" / "provisional_boundaries.geojson"


class ProvisionalBoundariesContractTests(unittest.TestCase):
    def test_dazhongsi_feature_exposes_unresolved_station_anchor(self) -> None:
        data = json.loads(BOUNDARIES.read_text(encoding="utf-8"))
        feature = next(item for item in data["features"] if item.get("id") == "PROV-KEY-003")
        properties = feature["properties"]
        self.assertFalse(properties["official_boundary"])
        self.assertEqual("provisional_constraint", properties["geometry_role"])
        self.assertEqual("unresolved_not_station_anchored", properties["anchor_status"])
        self.assertEqual("大钟寺站及其所在路口四象限", properties["anchor_reference"])
        self.assertIn("不得解释为大钟寺站周边范围", properties["anchor_note"])


if __name__ == "__main__":
    unittest.main()
