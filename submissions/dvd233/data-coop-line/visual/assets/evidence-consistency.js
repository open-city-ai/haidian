#!/usr/bin/env node
"use strict";

/**
 * Recalculate and verify the Data Co-op Line evidence package.
 *
 * GeoJSON is the spatial source of truth. This read-only audit launches the
 * repository's Python review runtime without shell interpolation, projects
 * every polygon to EPSG:4548, unions each layer with Shapely, and checks the
 * resulting snapshot against metrics and every bilingual readable carrier.
 * Use --refresh-snapshot only after an intentional geometry update.
 */

const childProcess = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..");
const SNAPSHOT_PATH = path.join(__dirname, "evidence-snapshot.json");
const BASELINE_SHA = "c55ef181cbfd1c636b04a644d17c64eaf464d656";
const TARGET_CRS = "EPSG:4548";

const REQUIRED_FIGURES = [
  "assets/figures/site-overview.png",
  "assets/figures/land-use-structure.png",
  "assets/figures/key-areas.png",
  "assets/figures/mobility-bluegreen.png",
  "assets/figures/metrics-evidence.png",
  "assets/figures/site-overview.en.png",
  "assets/figures/land-use-structure.en.png",
  "assets/figures/key-areas.en.png",
  "assets/figures/mobility-bluegreen.en.png",
  "assets/figures/metrics-evidence.en.png",
];

const PDF_OUTPUTS = [
  "drawings/a3-booklet.pdf",
  "drawings/a3-booklet.en.pdf",
  "drawings/a0-boards.pdf",
  "drawings/a0-boards.en.pdf",
];

const PYTHON_RECALCULATOR = String.raw`
import hashlib
import json
import sys
from pathlib import Path

from pyproj import Transformer
from shapely.geometry import shape
from shapely.ops import transform, unary_union

root = Path(sys.argv[1])
baseline_sha = sys.argv[2]
target_crs = "EPSG:4548"
geometry_inputs = {
    "site": "geometry/site_boundary.geojson",
    "buildings": "geometry/buildings.geojson",
    "green_space": "geometry/green_space.geojson",
    "public_space": "geometry/public_space.geojson",
    "key_areas": "geometry/key_areas.geojson",
}
required_figures = json.loads(sys.argv[3])
pdf_outputs = json.loads(sys.argv[4])

def load_json(relative):
    return json.loads((root / relative).read_text(encoding="utf-8"))

def file_sha256(relative):
    return hashlib.sha256((root / relative).read_bytes()).hexdigest()

def projected_union_area(relative):
    data = load_json(relative)
    project = Transformer.from_crs("EPSG:4326", target_crs, always_xy=True).transform
    polygons = []
    for feature in data.get("features", []):
        geometry = feature.get("geometry")
        if isinstance(geometry, dict) and geometry.get("type") in {"Polygon", "MultiPolygon"}:
            polygons.append(transform(project, shape(geometry)))
    return unary_union(polygons).area if polygons else 0.0

site_area = projected_union_area(geometry_inputs["site"])
building_area = projected_union_area(geometry_inputs["buildings"])
green_area = projected_union_area(geometry_inputs["green_space"])
public_area = projected_union_area(geometry_inputs["public_space"])

public_space = load_json(geometry_inputs["public_space"])
scenarios = []
for feature in public_space.get("features", []):
    properties = feature.get("properties", {})
    if properties.get("layer") != "SCENARIO_NODE":
        continue
    scenarios.append({
        "id": properties["id"],
        "name_zh": properties["name_zh"],
        "name_en": properties["name_en"],
        "scenario_type": properties["scenario_type"],
        "no_data_equivalent": properties["no_data_equivalent"],
        "human_review": properties["human_review"],
        "data_rule": properties["data_rule"],
    })
scenarios.sort(key=lambda item: item["id"])
key_areas = load_json(geometry_inputs["key_areas"])

base = {
    "schema_version": "1.0.0",
    "authority": {
        "spatial_source_of_truth": "geometry/*.geojson",
        "derived_metric_registry": "metrics.json",
        "projection": target_crs,
        "baseline_upstream_main": baseline_sha,
    },
    "input_sha256": {
        relative: file_sha256(relative)
        for relative in sorted(geometry_inputs.values())
    },
    "metrics": {
        "site_area_sqm": round(site_area, 3),
        "building_footprint_area_sqm": round(building_area, 3),
        "green_space_area_sqm": round(green_area, 3),
        "public_space_area_sqm": round(public_area, 3),
        "green_ratio": round(green_area / site_area, 6),
        "public_space_ratio": round(public_area / site_area, 6),
        "key_area_count": sum(
            1 for feature in key_areas.get("features", [])
            if feature.get("properties", {}).get("layer") == "KEY_AREA"
        ),
        "scenario_node_count": len(scenarios),
        "industry_test_scenario_count": sum(
            1 for scenario in scenarios
            if scenario["scenario_type"] == "testing_validation"
        ),
    },
    "industry_test_scenario_ids": [
        scenario["id"] for scenario in scenarios
        if scenario["scenario_type"] == "testing_validation"
    ],
    "scenarios": scenarios,
    "carrier_contract": {
        "primary": ["proposal.md", "proposal.en.md"],
        "derived": [
            "report/proposal.html",
            "report/proposal.en.html",
            "visual/index.html",
            "visual/index.en.html",
            *required_figures,
            *pdf_outputs,
        ],
    },
}
payload = json.dumps(
    base, ensure_ascii=False, sort_keys=True, separators=(",", ":")
).encode("utf-8")
base["evidence_signature"] = hashlib.sha256(payload).hexdigest()
print(json.dumps(base, ensure_ascii=False))
`;

const PYTHON_PDF_RASTER_AUDITOR = String.raw`
import base64
import hashlib
import json
import re
import sys
import zlib
from pathlib import Path

from PIL import Image

root = Path(sys.argv[1])
pairs = json.loads(sys.argv[2])
errors = []

def pixel_hash(relative):
    with Image.open(root / relative) as source:
        image = source.convert("RGB")
        if image.size != (2400, 1500):
            raise RuntimeError(f"unexpected source figure size {image.size}: {relative}")
        return hashlib.sha256(image.tobytes()).hexdigest()

def decoded_image_hashes(relative):
    raw = (root / relative).read_bytes()
    pattern = re.compile(
        rb"<<(?:(?!>>).)*?/Subtype\s*/Image(?:(?!>>).)*?>>\s*stream\r?\n",
        re.DOTALL,
    )
    hashes = []
    for match in pattern.finditer(raw):
        dictionary = match.group(0)
        length_match = re.search(rb"/Length\s+(\d+)", dictionary)
        if length_match is None:
            continue
        length = int(length_match.group(1))
        encoded = raw[match.end():match.end() + length]
        try:
            decoded = encoded
            if b"/ASCII85Decode" in dictionary:
                decoded = base64.a85decode(decoded, adobe=True)
            if b"/FlateDecode" in dictionary:
                decoded = zlib.decompress(decoded)
        except Exception:
            continue
        if len(decoded) == 2400 * 1500 * 3:
            hashes.append(hashlib.sha256(decoded).hexdigest())
    return hashes

for pdf_relative, figure_relative in pairs.items():
    expected = pixel_hash(figure_relative)
    matches = decoded_image_hashes(pdf_relative).count(expected)
    if matches != 1:
        errors.append(
            f"{pdf_relative} must embed exactly one current {figure_relative} raster; found {matches}"
        )

print(json.dumps(errors))
`;

function loadJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, stableValue(value[key])]),
    );
  }
  return value;
}

function sameJson(left, right) {
  return JSON.stringify(stableValue(left)) === JSON.stringify(stableValue(right));
}

function recalculate() {
  const repositoryRoot = path.resolve(ROOT, "..", "..", "..");
  const repositoryPython = process.platform === "win32"
    ? path.join(repositoryRoot, ".venv", "Scripts", "python.exe")
    : path.join(repositoryRoot, ".venv", "bin", "python");
  const candidates = process.platform === "win32"
    ? [[repositoryPython, []], ["py", ["-3"]], ["python", []], ["python3", []]]
    : [[repositoryPython, []], ["python3", []], ["python", []]];
  const failures = [];
  for (const [command, prefix] of candidates) {
    const result = childProcess.spawnSync(
      command,
      [
        ...prefix,
        "-c",
        PYTHON_RECALCULATOR,
        ROOT,
        BASELINE_SHA,
        JSON.stringify(REQUIRED_FIGURES),
        JSON.stringify(PDF_OUTPUTS),
      ],
      {
        encoding: "utf8",
        windowsHide: true,
        env: { ...process.env, PYTHONUTF8: "1", PYTHONIOENCODING: "utf-8" },
      },
    );
    if (result.status === 0) {
      return JSON.parse(result.stdout.trim());
    }
    failures.push(`${command}: ${String(result.stderr || result.error || "unavailable").trim()}`);
  }
  throw new Error(
    "Unable to run the EPSG:4548 recalculator (requires Python, pyproj and Shapely):\n" +
      failures.join("\n"),
  );
}

function auditPdfMetricsPixels() {
  const repositoryRoot = path.resolve(ROOT, "..", "..", "..");
  const repositoryPython = process.platform === "win32"
    ? path.join(repositoryRoot, ".venv", "Scripts", "python.exe")
    : path.join(repositoryRoot, ".venv", "bin", "python");
  const candidates = process.platform === "win32"
    ? [[repositoryPython, []], ["py", ["-3"]], ["python", []], ["python3", []]]
    : [[repositoryPython, []], ["python3", []], ["python", []]];
  const pairs = {
    "drawings/a0-boards.en.pdf": "assets/figures/metrics-evidence.en.png",
    "drawings/a0-boards.pdf": "assets/figures/metrics-evidence.png",
    "drawings/a3-booklet.en.pdf": "assets/figures/metrics-evidence.en.png",
    "drawings/a3-booklet.pdf": "assets/figures/metrics-evidence.png",
  };
  const failures = [];
  for (const [command, prefix] of candidates) {
    const result = childProcess.spawnSync(
      command,
      [...prefix, "-c", PYTHON_PDF_RASTER_AUDITOR, ROOT, JSON.stringify(pairs)],
      {
        encoding: "utf8",
        windowsHide: true,
        env: { ...process.env, PYTHONUTF8: "1", PYTHONIOENCODING: "utf-8" },
      },
    );
    if (result.status === 0) return JSON.parse(result.stdout.trim());
    failures.push(`${command}: ${String(result.stderr || result.error || "unavailable").trim()}`);
  }
  return [
    "Unable to audit embedded PDF metric rasters (requires Python and Pillow):\n" +
      failures.join("\n"),
  ];
}

function compareNumber(name, expected, actual, errors) {
  if (typeof actual !== "number" || !Number.isFinite(actual)) {
    errors.push(`metrics.json ${name} is not numeric`);
    return;
  }
  const tolerance = Math.max(1e-6, Math.abs(expected) * 1e-9);
  if (Math.abs(actual - expected) > tolerance) {
    errors.push(`metrics.json ${name}=${actual} != recalculated ${expected}`);
  }
}

function check(snapshot) {
  const errors = [];
  if (!fs.existsSync(SNAPSHOT_PATH)) {
    errors.push("visual/assets/evidence-snapshot.json is missing");
  } else {
    const persisted = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf8"));
    if (!sameJson(persisted, snapshot)) {
      errors.push("visual/assets/evidence-snapshot.json is stale");
    }
  }

  const metrics = loadJson("metrics.json").metrics || {};
  for (const [name, expected] of Object.entries(snapshot.metrics)) {
    if (!Object.prototype.hasOwnProperty.call(metrics, name)) {
      errors.push(`metrics.json is missing ${name}`);
      continue;
    }
    compareNumber(name, expected, metrics[name].value, errors);
  }

  if (!sameJson(snapshot.industry_test_scenario_ids, ["SCN-04", "SCN-05", "SCN-06"])) {
    errors.push(
      `GeoJSON industry tests must remain SCN-04, SCN-05 and SCN-06; found ${JSON.stringify(snapshot.industry_test_scenario_ids)}`,
    );
  }

  const textPaths = [
    "proposal.md",
    "proposal.en.md",
    "report/proposal.html",
    "report/proposal.en.html",
    "visual/index.html",
    "visual/index.en.html",
  ];
  const texts = Object.fromEntries(
    textPaths.map((relative) => [relative, fs.readFileSync(path.join(ROOT, relative), "utf8")]),
  );
  const staleTokens = ["310,807", "12.3423%", "12.34%", "7.3281%", "7.33%"];
  for (const [relative, content] of Object.entries(texts)) {
    for (const token of staleTokens) {
      if (content.includes(token)) errors.push(`${relative} contains stale metric token ${token}`);
    }
  }

  const allMarkers = ["40,063.344", "2,384,747.221", "98,164.982", "20.8953%", "0.8601%"];
  const exactMarkers = {
    "proposal.md": allMarkers,
    "proposal.en.md": allMarkers,
    "report/proposal.html": allMarkers,
    "report/proposal.en.html": allMarkers,
    "visual/index.html": ["40,063.344", "20.8953%", "0.8601%"],
    "visual/index.en.html": ["40,063.344", "20.8953%", "0.8601%"],
  };
  for (const [relative, markers] of Object.entries(exactMarkers)) {
    for (const marker of markers) {
      if (!texts[relative].includes(marker)) {
        errors.push(`${relative} is missing canonical marker ${marker}`);
      }
    }
  }

  for (const scenario of snapshot.scenarios) {
    for (const relative of ["proposal.md", "report/proposal.html", "visual/index.html"]) {
      if (!texts[relative].includes(scenario.name_zh)) {
        errors.push(`${relative} is missing ${scenario.id} ${scenario.name_zh}`);
      }
    }
    for (const relative of ["proposal.en.md", "report/proposal.en.html", "visual/index.en.html"]) {
      if (!texts[relative].includes(scenario.name_en)) {
        errors.push(`${relative} is missing ${scenario.id} ${scenario.name_en}`);
      }
    }
  }

  const signature = Buffer.from(snapshot.evidence_signature, "ascii");
  const baselineToken = Buffer.from(BASELINE_SHA, "ascii");
  for (const relative of REQUIRED_FIGURES) {
    const bytes = fs.readFileSync(path.join(ROOT, relative));
    if (!bytes.includes(signature)) {
      errors.push(`${relative} has stale or missing evidence_signature`);
    }
    if (!bytes.includes(baselineToken)) {
      errors.push(`${relative} has stale or missing baseline_upstream_main metadata`);
    }
  }
  for (const relative of PDF_OUTPUTS) {
    const bytes = fs.readFileSync(path.join(ROOT, relative));
    if (!bytes.includes(signature)) {
      errors.push(`${relative} has stale or missing evidence signature metadata`);
    }
    if (!bytes.includes(baselineToken)) {
      errors.push(`${relative} has stale or missing baseline metadata`);
    }
  }
  errors.push(...auditPdfMetricsPixels());

  const manifest = loadJson("manifest.json");
  const listed = Object.fromEntries(
    (manifest.files || []).filter((item) => item && typeof item === "object").map((item) => [item.path, item.role]),
  );
  const requiredManifest = {
    "changelog.md": "changelog",
    "visual/assets/evidence-consistency.js": "verification_script",
    "visual/assets/evidence-snapshot.json": "evidence_data",
  };
  for (const [relative, role] of Object.entries(requiredManifest)) {
    if (listed[relative] !== role) {
      errors.push(`manifest.json must list ${relative} with role=${role}`);
    }
  }
  if (!fs.existsSync(path.join(ROOT, "changelog.md"))) errors.push("changelog.md is missing");
  return errors;
}

function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has("--help")) {
    process.stdout.write(
      "Usage: node visual/assets/evidence-consistency.js [--refresh-snapshot] [--json]\n",
    );
    return 0;
  }
  const allowed = new Set(["--refresh-snapshot", "--json"]);
  for (const arg of args) {
    if (!allowed.has(arg)) throw new Error(`Unknown argument: ${arg}`);
  }

  const snapshot = recalculate();
  if (args.has("--refresh-snapshot")) {
    fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
  }
  const errors = check(snapshot);
  const report = {
    ok: errors.length === 0,
    baseline_upstream_main: BASELINE_SHA,
    projection: TARGET_CRS,
    evidence_signature: snapshot.evidence_signature,
    metrics: snapshot.metrics,
    industry_test_scenario_ids: snapshot.industry_test_scenario_ids,
    errors,
  };
  if (args.has("--json")) {
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  } else {
    process.stdout.write(errors.length === 0
      ? "PASS: evidence carriers are consistent\n"
      : `FAIL: evidence carriers are inconsistent\n${errors.map((error) => `- ${error}`).join("\n")}\n`);
  }
  return errors.length === 0 ? 0 : 1;
}

try {
  process.exitCode = main();
} catch (error) {
  process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
  process.exitCode = 1;
}
