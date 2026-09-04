#!/usr/bin/env python3
"""v1.4 pre-flight: validate all geometry layers, recalc areas, phasing vs key areas."""
from __future__ import annotations

import json
import sys
from pathlib import Path

from pyproj import Transformer
from shapely.geometry import shape
from shapely.ops import transform
from shapely.validation import explain_validity

REPO = Path(__file__).resolve().parents[1]
PKG = REPO / "submissions/zenzenzense520-bit/jingzhang-ai-pulse"
GEO = PKG / "geometry"
TR = Transformer.from_crs("EPSG:4326", "EPSG:4548", always_xy=True)

LAYERS = [
    "site_boundary", "key_areas", "land_use", "buildings", "roads",
    "green_space", "public_space", "phasing", "constraints",
]


def area_sqm(g) -> float:
    return float(transform(TR.transform, g).area)


def main() -> int:
    ok = True
    geoms: dict[str, list] = {}
    for name in LAYERS:
        p = GEO / f"{name}.geojson"
        try:
            data = json.loads(p.read_text(encoding="utf-8"))
        except Exception as exc:  # noqa: BLE001
            print(f"[FAIL] {name}: JSON ERROR {exc}")
            ok = False
            continue
        feats = data.get("features", [])
        types: dict[str, int] = {}
        invalid: list[tuple] = []
        for f in feats:
            g = shape(f["geometry"])
            types[g.geom_type] = types.get(g.geom_type, 0) + 1
            if not g.is_valid:
                invalid.append((f.get("id"), explain_validity(g)[:60]))
        geoms[name] = feats
        status = "OK" if not invalid else "INVALID"
        if invalid:
            ok = False
        print(f"[{status}] {name}: {len(feats)} feats, types={types}, invalid={len(invalid)}")
        for fid, reason in invalid[:3]:
            print(f"        {fid}: {reason}")

    site = shape(geoms["site_boundary"][0]["geometry"])
    site_area = area_sqm(site)
    print(f"site_area_sqm = {site_area:,.3f}")

    ka_feats = geoms["key_areas"]
    ka_union = None
    for f in ka_feats:
        g = shape(f["geometry"])
        ka_union = g if ka_union is None else ka_union.union(g)
    print(f"key_areas_total = {area_sqm(ka_union):,.3f}  ({len(ka_feats)} feats)")

    ph = geoms["phasing"]
    p_total = 0.0
    for f in ph:
        g = shape(f["geometry"])
        a = area_sqm(g)
        p_total += a
        inter = g.intersection(ka_union).area / g.area
        print(
            f"  {f['properties']['phase']}: area={a:,.3f} m2 "
            f"三核重叠比={inter:.1%} name={f['properties'].get('name_zh')}"
        )
    print(f"phasing total = {p_total:,.3f} (site diff = {site_area - p_total:,.3f})")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
