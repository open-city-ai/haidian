"""
Fetch real geographic data from OpenStreetMap Overpass API for the Jingzhang AI Belt area.
Outputs GeoJSON files with real roads, railway, water, green space, and POIs.
"""
import json
import requests
import time
import os

# Bounding box for the overall design area (from provisional_boundaries.geojson)
# Approx: lon 116.32-116.37, lat 39.935-40.03
BBOX = (39.935, 116.32, 40.03, 116.375)  # (south, west, north, east)

OVERPASS_URLS = [
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.openstreetmap.fr/api/interpreter",
    "https://overpass-api.de/api/interpreter",
]

QUERIES = {
    "roads": """
        [out:json][timeout:60];
        (
          way["highway"~"^(primary|secondary|tertiary|residential|trunk|unclassified)$"](%s);
          way["highway"="footway"](%s);
          way["highway"="cycleway"](%s);
        );
        out geom;
    """ % (",".join(map(str, BBOX)), ",".join(map(str, BBOX)), ",".join(map(str, BBOX))),

    "railway": """
        [out:json][timeout:60];
        (
          way["railway"~"^(rail|abandoned|disused|subway|light_rail)$"](%s);
          way["railway"="rail"](%s);
        );
        out geom;
    """ % (",".join(map(str, BBOX)), ",".join(map(str, BBOX))),

    "water": """
        [out:json][timeout:60];
        (
          way["waterway"](%s);
          way["natural"="water"](%s);
          relation["natural"="water"](%s);
        );
        out geom;
    """ % (",".join(map(str, BBOX)), ",".join(map(str, BBOX)), ",".join(map(str, BBOX))),

    "green_space": """
        [out:json][timeout:60];
        (
          way["leisure"~"^(park|garden|green)$"](%s);
          way["landuse"~"^(grass|meadow|forest|greenery)$"](%s);
          way["natural"~"^(wood|scrub|grassland)$"](%s);
          relation["leisure"="park"](%s);
        );
        out geom;
    """ % (",".join(map(str, BBOX)), ",".join(map(str, BBOX)), ",".join(map(str, BBOX)), ",".join(map(str, BBOX))),

    "buildings": """
        [out:json][timeout:60];
        (
          way["building"](%s);
        );
        out geom;
    """ % ",".join(map(str, BBOX)),

    "poi": """
        [out:json][timeout:60];
        (
          node["amenity"](%s);
          node["railway"="station"](%s);
          node["railway"="subway_entrance"](%s);
          node["station"="subway"](%s);
        );
        out;
    """ % (",".join(map(str, BBOX)), ",".join(map(str, BBOX)), ",".join(map(str, BBOX)), ",".join(map(str, BBOX))),
}

def overpass_to_geojson(query_name, query):
    """Execute Overpass query and convert to GeoJSON FeatureCollection."""
    for url in OVERPASS_URLS:
        print(f"  Fetching {query_name} from {url.split('/')[2]}...")
        try:
            resp = requests.get(url, params={"data": query}, timeout=120, headers={"User-Agent": "JingzhangAI-Belt-Submission/1.0 (urban design research)"})
            if resp.status_code == 429 or resp.status_code >= 500:
                print(f"    Server error {resp.status_code}, trying next endpoint...")
                time.sleep(3)
                continue
            resp.raise_for_status()
            data = resp.json()
            break
        except Exception as e:
            print(f"    ERROR: {e}")
            time.sleep(3)
            continue
    else:
        print(f"    All endpoints failed for {query_name}")
        return None

    features = []
    elements = data.get("elements", [])

    for el in elements:
        if el["type"] == "way" and "geometry" in el:
            coords = [[n["lon"], n["lat"]] for n in el["geometry"]]
            if len(coords) < 2:
                continue
            tags = el.get("tags", {})

            if coords[0] == coords[-1] and len(coords) >= 4:
                geom = {"type": "Polygon", "coordinates": [coords]}
            else:
                geom = {"type": "LineString", "coordinates": coords}

            props = {
                "id": f"{query_name}-{el['id']}",
                "layer": query_name.upper(),
                "source_type": "openstreetmap",
                "confidence": "high",
                "geometry_role": "real_world_reference",
                "name": tags.get("name", ""),
                "tags": tags,
            }
            features.append({"type": "Feature", "id": props["id"], "properties": props, "geometry": geom})

        elif el["type"] == "node" and "lat" in el:
            tags = el.get("tags", {})
            props = {
                "id": f"{query_name}-node-{el['id']}",
                "layer": query_name.upper(),
                "source_type": "openstreetmap",
                "confidence": "high",
                "geometry_role": "real_world_reference",
                "name": tags.get("name", ""),
                "tags": tags,
            }
            geom = {"type": "Point", "coordinates": [el["lon"], el["lat"]]}
            features.append({"type": "Feature", "id": props["id"], "properties": props, "geometry": geom})

        elif el["type"] == "relation" and "members" in el:
            # For relations (e.g., parks), try to get outer way geometries
            tags = el.get("tags", {})
            for member in el["members"]:
                if member.get("type") == "way" and "geometry" in member:
                    coords = [[n["lon"], n["lat"]] for n in member["geometry"]]
                    if len(coords) >= 4 and coords[0] == coords[-1]:
                        props = {
                            "id": f"{query_name}-rel-{el['id']}-{member['ref']}",
                            "layer": query_name.upper(),
                            "source_type": "openstreetmap",
                            "confidence": "high",
                            "geometry_role": "real_world_reference",
                            "name": tags.get("name", ""),
                            "tags": tags,
                        }
                        geom = {"type": "Polygon", "coordinates": [coords]}
                        features.append({"type": "Feature", "id": props["id"], "properties": props, "geometry": geom})

    fc = {
        "type": "FeatureCollection",
        "name": f"osm_{query_name}",
        "metadata": {
            "source": "OpenStreetMap",
            "license": "ODbL",
            "fetched_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
            "bbox": list(BBOX),
            "url": url,
        },
        "features": features,
    }
    print(f"    Got {len(features)} features")
    return fc


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))
    osm_dir = os.path.join(out_dir, "osm_data")
    os.makedirs(osm_dir, exist_ok=True)

    for name, query in QUERIES.items():
        fc = overpass_to_geojson(name, query)
        if fc:
            out_path = os.path.join(osm_dir, f"osm_{name}.geojson")
            with open(out_path, "w", encoding="utf-8") as f:
                json.dump(fc, f, ensure_ascii=False)
            print(f"    Saved -> {out_path}")
        else:
            print(f"    FAILED: {name}")
        time.sleep(2)  # Be nice to the API

    print("\nDone! All OSM data saved to:", osm_dir)


if __name__ == "__main__":
    main()
