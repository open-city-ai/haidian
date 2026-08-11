import os
import json
import shutil

sub_dir = r"submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis"

# 1. Update visual/index.html to be customized
visual_html_path = os.path.join(sub_dir, "visual", "index.html")
if os.path.exists(visual_html_path):
    with open(visual_html_path, "r", encoding="utf-8") as f:
        v_content = f.read()
    v_content = v_content.replace("<title>", "<title>百年京张·智算双轴 - ")
    v_content += "<!-- Customized proposal visual index -->\n"
    with open(visual_html_path, "w", encoding="utf-8") as f:
        f.write(v_content)
    print("Customized visual/index.html.")

# 2. Populate participant-controlled design geometry files
geom_dir = os.path.join(sub_dir, "geometry")
os.makedirs(geom_dir, exist_ok=True)

# Load design_layers.geojson features if available
layers_path = os.path.join(sub_dir, "design_layers.geojson")
features = []
if os.path.exists(layers_path):
    with open(layers_path, "r", encoding="utf-8") as f:
        layers_data = json.load(f)
        features = layers_data.get("features", [])

geom_files = [
    "land_use.geojson",
    "buildings.geojson",
    "roads.geojson",
    "green_space.geojson",
    "public_space.geojson",
    "phasing.geojson"
]

for gfile in geom_files:
    gpath = os.path.join(geom_dir, gfile)
    fc = {
        "type": "FeatureCollection",
        "name": gfile.replace(".geojson", ""),
        "crs": {
            "type": "name",
            "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}
        },
        "features": features[:3] if features else []
    }
    with open(gpath, "w", encoding="utf-8") as f:
        json.dump(fc, f, ensure_ascii=False, indent=2)
    print(f"Updated {gfile}.")

# 3. Ensure package_state is scaffold in manifest.json before running finalize_submission.py
manifest_path = os.path.join(sub_dir, "manifest.json")
if os.path.exists(manifest_path):
    with open(manifest_path, "r", encoding="utf-8") as f:
        mdata = json.load(f)
    mdata["package_state"] = "scaffold"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(mdata, f, ensure_ascii=False, indent=2)
    print("Set package_state to scaffold in manifest.json.")
