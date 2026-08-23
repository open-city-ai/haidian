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
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..");
const SNAPSHOT_PATH = path.join(__dirname, "evidence-snapshot.json");
const EXPIRING_TICKET_PATH = "visual/assets/expiring-data-ticket-protocol.json";
const BASELINE_SHA = "c55ef181cbfd1c636b04a644d17c64eaf464d656";
const FROZEN_MAIN_SHA = "a8f150d86480f8efc0716069ece406edf013502b";
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
    "roads": "geometry/roads.geojson",
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

project = Transformer.from_crs("EPSG:4326", target_crs, always_xy=True).transform
all_features = {}
for relative in geometry_inputs.values():
    for feature in load_json(relative).get("features", []):
        feature_id = feature.get("properties", {}).get("id")
        if feature_id:
            all_features[feature_id] = feature

def projected_geometry(feature_id):
    return transform(project, shape(all_features[feature_id]["geometry"]))

dazhongsi = projected_geometry("PROV-KEY-003")
mvp_scenario_ids = ["SCN-05", "SCN-09", "SCN-10"]
mvp_room_ids = ["BLDG-005", "BLDG-006"]
mvp_public_space_ids = ["PUBLIC-003"]
mvp_route_ids = ["ROAD-001", "ROAD-003"]
mvp_rooms = unary_union([projected_geometry(item) for item in mvp_room_ids])
mvp_public_space = unary_union([projected_geometry(item) for item in mvp_public_space_ids])
mvp_routes = unary_union([
    projected_geometry(item).intersection(dazhongsi) for item in mvp_route_ids
])

public_space = load_json(geometry_inputs["public_space"])
scenarios = []
for feature in public_space.get("features", []):
    properties = feature.get("properties", {})
    if properties.get("layer") != "SCENARIO_NODE":
        continue
    scenario = {
        "id": properties["id"],
        "name_zh": properties["name_zh"],
        "name_en": properties["name_en"],
        "scenario_type": properties["scenario_type"],
        "no_data_equivalent": properties["no_data_equivalent"],
        "human_review": properties["human_review"],
        "data_rule": properties["data_rule"],
    }
    if properties.get("mvp_id"):
        scenario.update({
            "key_area_ref": properties.get("key_area_ref"),
            "mvp_id": properties.get("mvp_id"),
            "mvp_stage": properties.get("mvp_stage"),
            "mvp_role": properties.get("mvp_role"),
            "stop_conditions": properties.get("stop_conditions", []),
        })
    scenarios.append(scenario)
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
        "dazhongsi_mvp_key_area_sqm": round(dazhongsi.area, 3),
        "dazhongsi_mvp_reversible_room_footprint_sqm": round(mvp_rooms.area, 3),
        "dazhongsi_mvp_public_receipt_space_sqm": round(mvp_public_space.area, 3),
        "dazhongsi_mvp_route_length_m": round(mvp_routes.length, 3),
        "dazhongsi_mvp_scenario_count": len(mvp_scenario_ids),
        "dazhongsi_mvp_no_data_route_coverage_ratio": round(sum(
            1 for scenario in scenarios
            if scenario["id"] in mvp_scenario_ids
            and scenario["no_data_equivalent"]
            and scenario["human_review"]
        ) / len(mvp_scenario_ids), 6),
    },
    "industry_test_scenario_ids": [
        scenario["id"] for scenario in scenarios
        if scenario["scenario_type"] == "testing_validation"
    ],
    "scenarios": scenarios,
    "dazhongsi_mvp": {
        "id": "DAZHONGSI-MVP-01",
        "key_area_id": "PROV-KEY-003",
        "scenario_ids": mvp_scenario_ids,
        "room_ids": mvp_room_ids,
        "public_space_ids": mvp_public_space_ids,
        "route_ids": mvp_route_ids,
        "scenario_points_covered_by_key_area": {
            item: dazhongsi.covers(projected_geometry(item))
            for item in mvp_scenario_ids
        },
    },
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
  const defaultCandidates = process.platform === "win32"
    ? [[repositoryPython, []], ["py", ["-3"]], ["python", []], ["python3", []]]
    : [[repositoryPython, []], ["python3", []], ["python", []]];
  const candidates = process.env.DATA_COOP_PYTHON
    ? [[process.env.DATA_COOP_PYTHON, []], ...defaultCandidates]
    : defaultCandidates;
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
  const defaultCandidates = process.platform === "win32"
    ? [[repositoryPython, []], ["py", ["-3"]], ["python", []], ["python3", []]]
    : [[repositoryPython, []], ["python3", []], ["python", []]];
  const candidates = process.env.DATA_COOP_PYTHON
    ? [[process.env.DATA_COOP_PYTHON, []], ...defaultCandidates]
    : defaultCandidates;
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

function transitionPairs(stateMachine) {
  return (stateMachine.allowed_transitions || []).map((item) => `${item.from}>${item.to}`);
}

function pointInRing(point, ring) {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const [xi, yi] = ring[index];
    const [xj, yj] = ring[previous];
    const crosses = (yi > point[1]) !== (yj > point[1]) &&
      point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}

function pointInPolygonGeometry(point, geometry) {
  if (!geometry || !Array.isArray(point)) return false;
  const polygonContains = (coordinates) =>
    pointInRing(point, coordinates[0]) &&
    coordinates.slice(1).every((hole) => !pointInRing(point, hole));
  if (geometry.type === "Polygon") return polygonContains(geometry.coordinates);
  if (geometry.type === "MultiPolygon") return geometry.coordinates.some(polygonContains);
  return false;
}

function featureById(relativePath, featureId) {
  return (loadJson(relativePath).features || []).find(
    (feature) => feature && feature.properties && feature.properties.id === featureId,
  );
}

function resolveJsonPointer(root, pointer) {
  if (pointer === "") return root;
  if (typeof pointer !== "string" || !pointer.startsWith("/")) return undefined;
  return pointer.slice(1).split("/").reduce((current, rawPart) => {
    if (current === null || current === undefined) return undefined;
    const part = rawPart.replace(/~1/g, "/").replace(/~0/g, "~");
    return Object.prototype.hasOwnProperty.call(current, part) ? current[part] : undefined;
  }, root);
}

function evaluateTicketCase(protocol, rehearsal) {
  const errors = [];
  const failedAssertionIds = new Set();
  const fail = (assertionId, message) => {
    failedAssertionIds.add(assertionId);
    errors.push(`[${assertionId}] ${rehearsal.case_id}: ${message}`);
  };
  const ticketAllowed = new Set(transitionPairs(protocol.ticket_state_machine));
  const executionAllowed = new Set(transitionPairs(protocol.execution_state_machine));
  const caseSpecs = {
    "CASE-NORMAL-EXPIRY-01": {
      caseType: "normal_expiry",
      termEvent: "automatic_expiry",
      termState: "expired",
      stopRole: "CONTROLLED-COMPUTE-OPERATOR",
      ticketStates: [
        "draft", "co_decided", "active", "expired",
        "residual_disclosed", "return_accepted", "closed",
      ],
      executionStates: ["not_started", "running", "stopping", "stopped", "closed"],
      eventNames: [
        "co_decided", "activated", "output_reviewed", "automatic_expiry",
        "execution_stopped", "derivative_inventory_completed",
        "controllable_public_output_removed", "residual_disclosed",
        "public_return_accepted", "closed",
      ],
      slaTargetIds: [
        "SLA-EXECUTION-TEARDOWN", "SLA-DERIVATIVE-INVENTORY",
        "SLA-CONTROLLABLE-PUBLIC-OUTPUT-REMOVAL", "SLA-RESIDUAL-DISCLOSURE",
      ],
      derivativeItems: [
        {
          item_id: "DERIV-EXPIRY-REPORT-01",
          class: "report",
          post_term_state: "retained_as_disclosed_synthetic_evaluation",
        },
        {
          item_id: "DERIV-EXPIRY-PUBLIC-01",
          class: "public_output",
          post_term_state: "removed_from_controllable_channel",
        },
      ],
      residualEffects: [
        {
          derivative_item_id: "DERIV-EXPIRY-REPORT-01",
          class: "aggregate_benchmark_summary",
          rollback_status: "retained_as_disclosed_synthetic_evaluation",
          complete_erasure_promised: false,
        },
      ],
    },
    "CASE-MIDSTREAM-WITHDRAWAL-01": {
      caseType: "midstream_withdrawal_with_residual_effect",
      termEvent: "withdrawal_effective",
      termState: "withdrawn",
      stopRole: "PARTICIPANT-REP",
      ticketStates: [
        "draft", "co_decided", "active", "withdrawn",
        "residual_disclosed", "return_accepted", "closed",
      ],
      executionStates: ["not_started", "running", "stopping", "stopped", "closed"],
      eventNames: [
        "co_decided", "activated", "output_reviewed", "withdrawal_request_received",
        "withdrawal_acknowledged", "withdrawal_effective", "execution_stopped",
        "post_withdrawal_query_attempt", "derivative_inventory_completed",
        "controllable_public_output_removed", "residual_disclosed", "complaint_received",
        "complaint_first_response", "public_return_accepted", "closed",
      ],
      slaTargetIds: [
        "SLA-HUMAN-WITHDRAWAL-ACK", "SLA-EXECUTION-TEARDOWN",
        "SLA-DERIVATIVE-INVENTORY", "SLA-CONTROLLABLE-PUBLIC-OUTPUT-REMOVAL",
        "SLA-RESIDUAL-DISCLOSURE", "SLA-COMPLAINT-FIRST-RESPONSE",
      ],
      derivativeItems: [
        {
          item_id: "DERIV-WITHDRAWAL-VIEWED-01",
          class: "report",
          post_term_state: "cannot_guarantee_recall_from_human_memory",
        },
        {
          item_id: "DERIV-WITHDRAWAL-PUBLIC-01",
          class: "public_output",
          post_term_state: "removed_from_controllable_channel",
        },
      ],
      residualEffects: [
        {
          derivative_item_id: "DERIV-WITHDRAWAL-VIEWED-01",
          class: "already_viewed_synthetic_summary",
          rollback_status: "cannot_guarantee_recall_from_human_memory",
          complete_erasure_promised: false,
        },
      ],
    },
  };
  const spec = caseSpecs[rehearsal.case_id];
  if (!spec || rehearsal.case_type !== spec.caseType) {
    fail("ASSERT-MONOTONIC-EVENTS", "case identity or type drifted");
  }
  if (!sameJson(rehearsal.scope, {
        scenario_id: "SCN-06",
        key_area_id: "PROV-KEY-001",
        handoff_id: null,
      }) || !protocol.operational_scope ||
      protocol.operational_scope.cross_node_handoff_in_scope !== false ||
      protocol.operational_scope.ticket_transfer_allowed !== false ||
      protocol.operational_scope.data_transfer_allowed !== false ||
      protocol.operational_scope.role_or_stop_authority_transfer_allowed !== false) {
    fail(
      "ASSERT-SINGLE-NODE-OPERATIONAL-SCOPE",
      "the E2 case must remain at SCN-06 / PROV-KEY-001 with no ticket, data, role or stop-authority handoff",
    );
  }

  const events = Array.isArray(rehearsal.events) ? rehearsal.events : [];
  const eventNames = events.map((item) => item && item.event);
  const eventMap = new Map();
  let previousTimestamp = -Infinity;
  events.forEach((item) => {
    const timestamp = item && Date.parse(item.at);
    if (!item || typeof item.event !== "string" || !Number.isFinite(timestamp) ||
        timestamp <= previousTimestamp || eventMap.has(item.event)) {
      fail("ASSERT-MONOTONIC-EVENTS", "events must have unique names and valid, strictly increasing timestamps");
    }
    if (item && typeof item.event === "string" && !eventMap.has(item.event)) {
      eventMap.set(item.event, item);
    }
    previousTimestamp = timestamp;
  });
  if (spec && !sameJson(eventNames, spec.eventNames)) {
    fail("ASSERT-MONOTONIC-EVENTS", "event set or order drifted from the pinned case contract");
  }
  const eventAt = (name) => {
    const item = eventMap.get(name);
    return item ? Date.parse(item.at) : NaN;
  };
  const derivedTicketStates = ["draft"];
  const derivedExecutionStates = ["not_started"];
  const ticketEventStates = {
    co_decided: "co_decided",
    activated: "active",
    automatic_expiry: "expired",
    withdrawal_effective: "withdrawn",
    residual_disclosed: "residual_disclosed",
    public_return_accepted: "return_accepted",
    closed: "closed",
  };
  const executionEventStates = {
    activated: "running",
    automatic_expiry: "stopping",
    withdrawal_effective: "stopping",
    execution_stopped: "stopped",
    closed: "closed",
  };
  for (const name of eventNames) {
    if (ticketEventStates[name]) derivedTicketStates.push(ticketEventStates[name]);
    if (executionEventStates[name]) derivedExecutionStates.push(executionEventStates[name]);
  }
  if (spec && (!sameJson(rehearsal.ticket_state_sequence, spec.ticketStates) ||
      !sameJson(derivedTicketStates, spec.ticketStates) ||
      !sameJson(rehearsal.execution_state_sequence, spec.executionStates) ||
      !sameJson(derivedExecutionStates, spec.executionStates))) {
    fail("ASSERT-MONOTONIC-EVENTS", "declared and event-derived states must both match complete initial-to-terminal sequences");
  }
  for (let index = 1; index < derivedTicketStates.length; index += 1) {
    const pair = `${derivedTicketStates[index - 1]}>${derivedTicketStates[index]}`;
    if (!ticketAllowed.has(pair)) fail("ASSERT-MONOTONIC-EVENTS", `forbidden ticket transition ${pair}`);
  }
  for (let index = 1; index < derivedExecutionStates.length; index += 1) {
    const pair = `${derivedExecutionStates[index - 1]}>${derivedExecutionStates[index]}`;
    if (!executionAllowed.has(pair)) fail("ASSERT-MONOTONIC-EVENTS", `forbidden execution transition ${pair}`);
  }
  const coupledTermEvent = spec && eventMap.get(spec.termEvent);
  const coupledStopEvent = eventMap.get("execution_stopped");
  const coupledTeardownSeconds = spec ?
    (eventAt("execution_stopped") - eventAt(spec.termEvent)) / 1000 : NaN;
  if (!coupledTermEvent || coupledTermEvent.execution_state_after !== "stopping" ||
      coupledTermEvent.new_query_or_output_allowed !== false || coupledTermEvent.teardown_only !== true ||
      !coupledStopEvent || coupledStopEvent.execution_state_after !== "stopped" ||
      coupledStopEvent.teardown_completed !== true || !Number.isFinite(coupledTeardownSeconds) ||
      coupledTeardownSeconds < 0 || coupledTeardownSeconds > 60) {
    fail(
      "ASSERT-TICKET-EXECUTION-COUPLING",
      "expiry or withdrawal must atomically enter teardown-only stopping, block new work, and reach stopped within 60 seconds",
    );
  }

  const requiredTicketFields = [
    "ticket_id", "version", "supersedes", "purpose", "term", "input_contract",
    "compute_contract", "output_contract", "withdrawal_contract", "derivative_chain",
    "no_data_equivalent_contract", "public_return_contract",
  ];
  const ticket = rehearsal.ticket;
  const term = ticket && ticket.term || {};
  const input = ticket && ticket.input_contract || {};
  const compute = ticket && ticket.compute_contract || {};
  const output = ticket && ticket.output_contract || {};
  const withdrawal = ticket && ticket.withdrawal_contract || {};
  const derivative = ticket && ticket.derivative_chain || {};
  const noDataContract = ticket && ticket.no_data_equivalent_contract || {};
  const returnContract = ticket && ticket.public_return_contract || {};
  const issuedAt = Date.parse(term.issued_at);
  const validFrom = Date.parse(term.valid_from);
  const expiresAt = Date.parse(term.expires_at);
  const ticketProblems = [];
  if (!ticket || requiredTicketFields.some((field) =>
      !Object.prototype.hasOwnProperty.call(ticket, field))) {
    ticketProblems.push("required instantiated ticket fields are incomplete");
  }
  if (!ticket || ticket.ticket_id !== rehearsal.ticket_id || ticket.version !== "1.0.0" ||
      ticket.supersedes !== null) ticketProblems.push("ticket identity or version is invalid");
  if (!ticket || !ticket.purpose || typeof ticket.purpose.statement_zh !== "string" ||
      typeof ticket.purpose.statement_en !== "string" ||
      !Array.isArray(ticket.purpose.allowed_uses) || ticket.purpose.allowed_uses.length === 0 ||
      !Array.isArray(ticket.purpose.prohibited_uses) || ticket.purpose.prohibited_uses.length === 0) {
    ticketProblems.push("purpose contract is incomplete");
  }
  if (!Number.isFinite(issuedAt) || !Number.isFinite(validFrom) || !Number.isFinite(expiresAt) ||
      !(issuedAt < validFrom && validFrom < expiresAt) || term.timezone !== "Asia/Shanghai" ||
      eventAt("activated") !== validFrom) {
    ticketProblems.push("term or activation timestamps are invalid");
  }
  if (spec && spec.termEvent === "automatic_expiry" && eventAt(spec.termEvent) !== expiresAt) {
    ticketProblems.push("automatic expiry is not bound to ticket.term.expires_at");
  }
  if (spec && spec.termEvent === "automatic_expiry" && withdrawal.effective_at !== null) {
    ticketProblems.push("normal-expiry case must not declare an effective withdrawal");
  }
  if (spec && spec.termEvent === "withdrawal_effective" &&
      (Date.parse(withdrawal.effective_at) !== eventAt(spec.termEvent) ||
       eventAt(spec.termEvent) >= expiresAt)) {
    ticketProblems.push("withdrawal is not bound to the ticket withdrawal contract before expiry");
  }
  if (!Array.isArray(input.data_categories) || input.data_categories.length === 0 ||
      !sameJson(input.provenance_and_licence_records, [{
        source: "case_local_synthetic_fixture",
        licence: "submission_owned_synthetic_data",
      }]) ||
      input.controlled_domain !== "synthetic_rehearsal_sandbox" ||
      input.raw_record_export_allowed !== false) {
    ticketProblems.push("input provenance, controlled-domain or export boundary is invalid");
  }
  if (!Array.isArray(compute.allowed_queries_models_or_containers) ||
      compute.allowed_queries_models_or_containers.length === 0 ||
      compute.operator_role_type !== "CONTROLLED-COMPUTE-OPERATOR" ||
      compute.assigned_entity !== null || compute.assignment_status !== "unknown") {
    ticketProblems.push("controlled-compute contract invents or omits an operator assignment");
  }
  if (!Array.isArray(output.allowed_outputs) || output.allowed_outputs.length === 0 ||
      !Array.isArray(output.prohibited_outputs) || output.prohibited_outputs.length === 0 ||
      output.review_required !== true || !Number.isInteger(output.minimum_aggregate_group_size) ||
      output.minimum_aggregate_group_size < 1 ||
      output.output_release_requires_active_ticket !== true) {
    ticketProblems.push("output review or active-ticket release contract is invalid");
  }
  if (!sameJson(withdrawal.channels, ["staffed", "paper", "offline", "machine"]) ||
      withdrawal.complete_erasure_promised !== false) {
    ticketProblems.push("withdrawal channels or non-erasure boundary drifted");
  }
  const derivativeClasses = [
    "source_material", "controlled_copy", "feature", "model", "report", "public_output",
  ];
  if (!sameJson(derivative.classes, derivativeClasses) || !Array.isArray(derivative.items) ||
      derivative.items.length === 0 || derivative.unmapped_item_count !== 0 ||
      (spec && !sameJson(derivative.items, spec.derivativeItems))) {
    ticketProblems.push("derivative inventory is missing, unmapped or uses an invalid class set");
  }
  if (noDataContract.same_core_output_schema !== true ||
      noDataContract.price_premium_allowed !== false ||
      noDataContract.staffed_paper_and_offline_routes_required !== true) {
    ticketProblems.push("ticket-level no-data equivalence contract drifted");
  }
  const expectedReturnDeliverableContract = {
    deliverable_id: "DELIV-PUBLIC-AUDIT-CARD-01",
    description_zh: "双语公共审计卡：披露到期或撤回、无数据规则、残余影响与问责边界。",
    description_en: "Bilingual public audit card disclosing expiry or withdrawal, no-data rules, residual effects, and accountability boundaries.",
    content_ref: "/public_return/deliverable",
  };
  const expectedReturnValueMetric = {
    metric_id: "VALUE-NO-DATA-RULE-COVERAGE-01",
    unit: "ratio",
    operator: ">=",
    target_value: 1.0,
    formula: "passed_no_data_rules / evaluated_no_data_rules",
  };
  const expectedReturnEvidenceRefs = [
    "/route_pair", "/public_return/deliverable", "/public_return/value_measurement",
  ];
  if (!returnContract.beneficiary || !Number.isFinite(Date.parse(returnContract.due_at)) ||
      !returnContract.acceptance_method || !returnContract.undelivered_state ||
      !sameJson(returnContract.deliverable, expectedReturnDeliverableContract) ||
      !sameJson(returnContract.value_metric, expectedReturnValueMetric) ||
      !sameJson(returnContract.evidence_refs, expectedReturnEvidenceRefs) ||
      returnContract.is_payment_for_consent !== false ||
      ticket.confirmed_legal_role !== null || ticket.confirmed_signatory !== null ||
      ticket.confirmed_capacity !== null) {
    ticketProblems.push("public-return or unconfirmed legal-role boundary is incomplete");
  }
  ticketProblems.forEach((problem) => fail("ASSERT-INSTANTIATED-TICKET", problem));

  const thresholds = protocol.no_data_equivalence && protocol.no_data_equivalence.thresholds || {};
  const routePair = rehearsal.route_pair || {};
  const dataRoute = routePair.data_route || {};
  const noDataRoute = routePair.no_data_route || {};
  const finiteNonNegative = (value) => typeof value === "number" &&
    Number.isFinite(value) && value >= 0;
  const ratioFields = [
    "core_output_schema_match_ratio",
    "safety_alert_match_ratio",
  ];
  const recalculateRoute = (route) => {
    const batches = Array.isArray(route.observation_batches) ? route.observation_batches : [];
    const valid = batches.length > 0 && batches.every((batch) =>
      Number.isInteger(batch.attempt_count) && batch.attempt_count > 0 &&
      batch.attempt_count <= 1000 && finiteNonNegative(batch.time_seconds) &&
      finiteNonNegative(batch.price_cny) && Number.isInteger(batch.failure_count) &&
      batch.failure_count >= 0 && batch.failure_count <= batch.attempt_count &&
      ratioFields.every((field) => typeof batch[field] === "number" &&
        Number.isFinite(batch[field]) && batch[field] >= 0 && batch[field] <= 1));
    if (!valid) return { valid: false };
    const attempts = batches.reduce((sum, batch) => sum + batch.attempt_count, 0);
    const failures = batches.reduce((sum, batch) => sum + batch.failure_count, 0);
    const times = batches.flatMap((batch) => Array(batch.attempt_count).fill(batch.time_seconds))
      .sort((left, right) => left - right);
    const weighted = (field) => batches.reduce(
      (sum, batch) => sum + batch[field] * batch.attempt_count, 0,
    ) / attempts;
    return {
      valid: true,
      attempts,
      failures,
      p90_time_seconds: times[Math.ceil(attempts * 0.9) - 1],
      price_cny: weighted("price_cny"),
      core_output_schema_match_ratio: weighted("core_output_schema_match_ratio"),
      safety_alert_match_ratio: weighted("safety_alert_match_ratio"),
    };
  };
  const dataValues = recalculateRoute(dataRoute);
  const noDataValues = recalculateRoute(noDataRoute);
  for (const [label, declared, recalculated] of [
    ["data_route", dataRoute, dataValues],
    ["no_data_route", noDataRoute, noDataValues],
  ]) {
    for (const field of [
      "attempts", "failures", "p90_time_seconds", "price_cny", ...ratioFields,
    ]) {
      if (!recalculated.valid || typeof declared[field] !== "number" ||
          Math.abs(declared[field] - recalculated[field]) > 1e-9) {
        fail("ASSERT-NO-DATA-ALL-THRESHOLDS", `${label}.${field} does not match observation batches`);
      }
    }
  }
  const accessibilityContract = protocol.no_data_equivalence &&
    protocol.no_data_equivalence.accessibility_task_contract || {};
  const accessibilityFixtures = routePair.accessibility_task_fixtures || {};
  const accessibilityTasks = Array.isArray(accessibilityFixtures.tasks) ?
    accessibilityFixtures.tasks : [];
  const requiredAccessibilityTasks = Array.isArray(accessibilityContract.required_tasks) ?
    accessibilityContract.required_tasks : [];
  const requiredAccessibilityTaskIds = requiredAccessibilityTasks.map((item) => item.task_id);
  const requiredAccessibilityRouteIds = Array.isArray(accessibilityContract.required_route_ids) ?
    accessibilityContract.required_route_ids : [];
  const requiredAccessibilityResultFields = Array.isArray(accessibilityContract.required_result_fields) ?
    accessibilityContract.required_result_fields : [];
  const accessibilityProblems = [];
  if (accessibilityFixtures.claim_scope !== accessibilityContract.claim_scope ||
      accessibilityFixtures.observed_user_count !== 0 ||
      accessibilityFixtures.field_test_status !== "not_observed" ||
      accessibilityFixtures.professional_confirmation_status !== "unknown") {
    accessibilityProblems.push("accessibility fixture boundary must remain E2 with zero observed users");
  }
  const accessibilityTaskIds = accessibilityTasks.map((item) => item && item.task_id);
  if (!sameJson(accessibilityTaskIds, requiredAccessibilityTaskIds) ||
      new Set(accessibilityTaskIds).size !== requiredAccessibilityTaskIds.length) {
    accessibilityProblems.push("accessibility task set is incomplete, duplicated or reordered");
  }
  let validAccessibilityRouteFixtureCount = 0;
  const requiredAccessibilityRouteFixtureCount =
    requiredAccessibilityTaskIds.length * requiredAccessibilityRouteIds.length;
  for (const task of accessibilityTasks) {
    for (const routeId of requiredAccessibilityRouteIds) {
      const result = task && task[routeId];
      const resultProblems = [];
      if (!result || requiredAccessibilityResultFields.some((field) =>
          !Object.prototype.hasOwnProperty.call(result, field))) {
        resultProblems.push("required result fields are incomplete");
      } else {
        if (result.result_type !== "synthetic_fixture" ||
            !Number.isInteger(result.attempt_count) || result.attempt_count < 1 ||
            !Number.isInteger(result.completed_count) || result.completed_count !== result.attempt_count ||
            !Number.isInteger(result.help_request_count) || result.help_request_count < 0 ||
            !finiteNonNegative(result.wait_seconds) || !Number.isInteger(result.detour_count) ||
            result.detour_count < 0 || result.human_takeover_available !== true ||
            result.critical_output_readback_fixture_passed !== true ||
            result.complaint_or_stop_receipt_available !== true) {
          resultProblems.push("synthetic task result is unusable or incomplete");
        }
        if (!Array.isArray(result.evidence_refs) || result.evidence_refs.length === 0 ||
            result.evidence_refs.some((pointer) => resolveJsonPointer(rehearsal, pointer) === undefined)) {
          resultProblems.push("synthetic task result has unresolved evidence pointers");
        }
      }
      if (resultProblems.length === 0) {
        validAccessibilityRouteFixtureCount += 1;
      } else {
        accessibilityProblems.push(
          `${task && task.task_id || "unknown task"}.${routeId}: ${resultProblems.join("; ")}`,
        );
      }
    }
  }
  const recalculatedAccessibilityCoverage = requiredAccessibilityRouteFixtureCount ?
    validAccessibilityRouteFixtureCount / requiredAccessibilityRouteFixtureCount : 0;
  if (typeof routePair.accessibility_task_fixture_coverage_ratio !== "number" ||
      Math.abs(routePair.accessibility_task_fixture_coverage_ratio - recalculatedAccessibilityCoverage) > 1e-9 ||
      recalculatedAccessibilityCoverage < thresholds.accessibility_task_fixture_coverage_ratio_min) {
    accessibilityProblems.push("declared accessibility fixture coverage does not match the records or threshold");
  }
  accessibilityProblems.forEach((problem) => fail("ASSERT-ACCESSIBILITY-TASK-CONTRACT", problem));
  const accessibilityTaskContractPassed = accessibilityProblems.length === 0;
  const parityChecks = [
    dataValues.valid && dataValues.attempts >= thresholds.minimum_attempts_per_route,
    noDataValues.valid && noDataValues.attempts >= thresholds.minimum_attempts_per_route,
    dataValues.valid && noDataValues.valid &&
      Math.abs(noDataValues.p90_time_seconds - dataValues.p90_time_seconds) <=
        thresholds.p90_time_absolute_delta_max_seconds,
    dataValues.valid && noDataValues.valid && dataValues.p90_time_seconds > 0 &&
      noDataValues.p90_time_seconds / dataValues.p90_time_seconds <= thresholds.p90_time_ratio_max,
    dataValues.valid && noDataValues.valid &&
      noDataValues.price_cny - dataValues.price_cny <= thresholds.price_premium_max_cny,
    dataValues.valid && noDataValues.valid &&
      noDataValues.failures / noDataValues.attempts -
        dataValues.failures / dataValues.attempts <=
        thresholds.failure_rate_delta_max + Number.EPSILON,
    dataValues.valid && noDataValues.valid &&
      dataValues.core_output_schema_match_ratio >= thresholds.core_output_schema_match_ratio_min &&
      noDataValues.core_output_schema_match_ratio >= thresholds.core_output_schema_match_ratio_min,
    dataValues.valid && noDataValues.valid &&
      dataValues.safety_alert_match_ratio >= thresholds.safety_alert_match_ratio_min &&
      noDataValues.safety_alert_match_ratio >= thresholds.safety_alert_match_ratio_min,
    accessibilityTaskContractPassed,
    thresholds.human_takeover_required !== true ||
      (routePair.human_takeover && routePair.human_takeover.available === true &&
       finiteNonNegative(routePair.human_takeover.response_seconds) &&
       routePair.human_takeover.response_seconds <= thresholds.human_takeover_response_max_seconds),
    thresholds.staffed_paper_offline_complaint_channels_required !== true ||
      (routePair.complaint_channels && routePair.complaint_channels.staffed === true &&
       routePair.complaint_channels.paper === true && routePair.complaint_channels.offline === true),
  ];
  parityChecks.forEach((passed, index) => {
    if (!passed) fail("ASSERT-NO-DATA-ALL-THRESHOLDS", `no-data equivalence rule ${index + 1} failed`);
  });

  const outputEvent = eventMap.get("output_reviewed");
  if (!outputEvent || outputEvent.decision !== "allowed" ||
      !Number.isInteger(outputEvent.output_group_size) ||
      outputEvent.output_group_size < output.minimum_aggregate_group_size ||
      eventAt("output_reviewed") < validFrom ||
      (spec && eventAt("output_reviewed") >= eventAt(spec.termEvent))) {
    fail("ASSERT-INSTANTIATED-TICKET", "output review was not performed under an active ticket or minimum group size");
  }

  const slaTargets = new Map(
    ((protocol.service_level_targets || {}).targets || []).map((item) => [item.target_id, item]),
  );
  const observations = Array.isArray(rehearsal.sla_observations) ? rehearsal.sla_observations : [];
  const observedTargetIds = observations.map((item) => item && item.target_id);
  if (spec && !sameJson(observedTargetIds, spec.slaTargetIds)) {
    fail("ASSERT-SLA-OBSERVATIONS", "SLA observation set or order drifted");
  }
  const expectedEndEvents = {
    "SLA-EXECUTION-TEARDOWN": "execution_stopped",
    "SLA-HUMAN-WITHDRAWAL-ACK": "withdrawal_acknowledged",
    "SLA-DERIVATIVE-INVENTORY": "derivative_inventory_completed",
    "SLA-CONTROLLABLE-PUBLIC-OUTPUT-REMOVAL": "controllable_public_output_removed",
    "SLA-RESIDUAL-DISCLOSURE": "residual_disclosed",
    "SLA-COMPLAINT-FIRST-RESPONSE": "complaint_first_response",
  };
  const expectedStartEvent = (targetId) => {
    if (targetId === "SLA-HUMAN-WITHDRAWAL-ACK") return "withdrawal_request_received";
    if (targetId === "SLA-COMPLAINT-FIRST-RESPONSE") return "complaint_received";
    return spec && spec.termEvent;
  };
  observations.forEach((observation) => {
    const target = observation && slaTargets.get(observation.target_id);
    const startAt = observation && eventAt(observation.start_event);
    const endAt = observation && eventAt(observation.end_event);
    const elapsed = (endAt - startAt) / 1000;
    if (!target || observation.start_event !== expectedStartEvent(observation.target_id) ||
        observation.end_event !== expectedEndEvents[observation.target_id] ||
        !Number.isFinite(elapsed) || elapsed < 0 || elapsed > target.max_seconds) {
      fail("ASSERT-SLA-OBSERVATIONS", `${observation && observation.target_id || "unknown SLA"} failed its event-to-event target`);
    }
  });
  if (spec && spec.termEvent === "withdrawal_effective") {
    const requestEvent = eventMap.get("withdrawal_request_received");
    const acknowledgementEvent = eventMap.get("withdrawal_acknowledged");
    const humanChannels = new Set(["staffed", "paper", "offline"]);
    if (!requestEvent || !acknowledgementEvent || !humanChannels.has(requestEvent.channel) ||
        acknowledgementEvent.channel !== requestEvent.channel) {
      fail(
        "ASSERT-SLA-OBSERVATIONS",
        "human withdrawal acknowledgement must use the same staffed, paper, or offline channel as the request",
      );
    }
  }

  const termAt = spec ? eventAt(spec.termEvent) : NaN;
  const postTermEvents = events.filter((item) => Number.isFinite(Date.parse(item.at)) &&
    Date.parse(item.at) >= termAt && Object.prototype.hasOwnProperty.call(item, "released_output_count"));
  const postTermReleasedOutputCount = postTermEvents.reduce((sum, item) =>
    sum + (Number.isInteger(item.released_output_count) ?
      item.released_output_count : Number.POSITIVE_INFINITY), 0);
  for (const event of postTermEvents) {
    if (!Number.isInteger(event.released_output_count) || event.released_output_count !== 0 ||
        (event.event === "post_withdrawal_query_attempt" && event.decision !== "denied")) {
      fail("ASSERT-POST-TERM-OUTPUT-BLOCKED", "released or allowed post-term output");
    }
  }
  if (spec && spec.termEvent === "withdrawal_effective" &&
      postTermEvents.filter((item) => item.event === "post_withdrawal_query_attempt").length !== 1) {
    fail("ASSERT-POST-TERM-OUTPUT-BLOCKED", "withdrawal case must contain exactly one denied injected query");
  }

  const residualEffects = Array.isArray(rehearsal.residual_effects) ? rehearsal.residual_effects : [];
  const derivativeItems = Array.isArray(derivative.items) ? derivative.items : [];
  if ((spec && !sameJson(residualEffects, spec.residualEffects)) ||
      residualEffects.length === 0 || residualEffects.some((item) =>
      !item || !item.derivative_item_id || typeof item.class !== "string" || !item.class ||
      typeof item.rollback_status !== "string" || !item.rollback_status ||
      item.complete_erasure_promised !== false ||
      !derivativeItems.some((derivativeItem) =>
        derivativeItem.item_id === item.derivative_item_id &&
        derivativeItem.post_term_state === item.rollback_status))) {
    fail("ASSERT-RESIDUAL-NOT-ERASURE", "residual disclosure is empty, promises erasure or does not crosswalk to the derivative inventory");
  }
  const removalEvent = eventMap.get("controllable_public_output_removed");
  const publicOutputs = derivativeItems.filter((item) => item.class === "public_output");
  if (!removalEvent || publicOutputs.some((item) =>
      item.post_term_state !== "removed_from_controllable_channel") ||
      removalEvent.removed_output_count !== publicOutputs.length) {
    fail("ASSERT-RESIDUAL-NOT-ERASURE", "controllable public-output removal does not match the derivative inventory");
  }

  const publicReturn = rehearsal.public_return || {};
  const acceptedAt = (eventMap.get("public_return_accepted") || {}).at;
  const returnDeliverable = publicReturn.deliverable || {};
  const returnValueMeasurement = publicReturn.value_measurement || {};
  const recalculatedValue = parityChecks.length ? parityChecks.filter(Boolean).length / parityChecks.length : 0;
  const returnPointersResolve = Array.isArray(publicReturn.evidence_refs) &&
    publicReturn.evidence_refs.length > 0 &&
    publicReturn.evidence_refs.every((pointer) => resolveJsonPointer(rehearsal, pointer) !== undefined);
  if (publicReturn.obligation_exists !== true ||
      publicReturn.obligation_survives_withdrawal !== true ||
      publicReturn.beneficiary !== returnContract.beneficiary ||
      publicReturn.due_at !== returnContract.due_at ||
      publicReturn.acceptance_method !== returnContract.acceptance_method ||
      publicReturn.accepted !== true ||
      publicReturn.accepted_at !== acceptedAt ||
      Date.parse(publicReturn.accepted_at) > Date.parse(publicReturn.due_at) ||
      publicReturn.is_payment_for_consent !== false) {
    fail("ASSERT-PUBLIC-RETURN-SUBSTANTIATED", "public return is unaccepted, late, mismatched or framed as payment for consent");
  }
  if (!sameJson(returnDeliverable, {
        ...expectedReturnDeliverableContract,
        status: "delivered",
        delivered_at: acceptedAt,
      }) ||
      !sameJson(returnValueMeasurement, {
        metric_id: expectedReturnValueMetric.metric_id,
        unit: expectedReturnValueMetric.unit,
        value: recalculatedValue,
        status: "synthetic_recalculated",
        source_ref: "/route_pair",
      }) ||
      returnValueMeasurement.value < expectedReturnValueMetric.target_value ||
      !sameJson(publicReturn.evidence_refs, expectedReturnEvidenceRefs) || !returnPointersResolve ||
      publicReturn.acceptance_scope !== "synthetic_delivery_and_contract_conformance_only" ||
      !sameJson(publicReturn.impact_observation, {
        status: "not_observed",
        value: null,
        next_trigger: "authorized_E3_E4_test",
      })) {
    fail(
      "ASSERT-PUBLIC-RETURN-SUBSTANTIATED",
      "public return lacks a delivered audit card, independently recalculated value, resolvable evidence, or not-observed impact boundary",
    );
  }

  const catalog = Array.isArray(protocol.audit_artifact_catalog) ? protocol.audit_artifact_catalog : [];
  const requiredArtifactIds = catalog.map((item) => item.artifact_id);
  const produced = Array.isArray(rehearsal.produced_artifact_ids) ? rehearsal.produced_artifact_ids : [];
  const records = Array.isArray(rehearsal.artifact_records) ? rehearsal.artifact_records : [];
  const recordIds = records.map((item) => item && item.artifact_id);
  if (!sameJson(produced, requiredArtifactIds) || !sameJson(recordIds, requiredArtifactIds)) {
    fail("ASSERT-ARTIFACT-COVERAGE", "declared and recorded artifact IDs must exactly match the conditional catalog");
  }
  const expectedArtifactEvents = {
    "ART-TICKET-SNAPSHOT": null,
    "ART-CO-DECISION": "co_decided",
    "ART-ACTIVATION": "activated",
    "ART-EXECUTION-LOG": "activated",
    "ART-OUTPUT-REVIEW": "output_reviewed",
    "ART-NO-DATA-PARITY": "output_reviewed",
    "ART-STOP-DECISION": "execution_stopped",
    "ART-EXPIRY-OR-WITHDRAWAL": spec && spec.termEvent,
    "ART-DERIVATIVE-INVENTORY": "derivative_inventory_completed",
    "ART-RESIDUAL-DISCLOSURE": "residual_disclosed",
    "ART-PUBLIC-RETURN": "public_return_accepted",
    "ART-CLOSURE": "closed",
  };
  const eventPointer = (name) => {
    const index = eventNames.indexOf(name);
    return index >= 0 ? `/events/${index}` : null;
  };
  const expectedArtifactContentRefs = {
    "ART-TICKET-SNAPSHOT": "/ticket",
    "ART-CO-DECISION": eventPointer("co_decided"),
    "ART-ACTIVATION": eventPointer("activated"),
    "ART-EXECUTION-LOG": eventPointer("activated"),
    "ART-OUTPUT-REVIEW": eventPointer("output_reviewed"),
    "ART-NO-DATA-PARITY": "/route_pair",
    "ART-STOP-DECISION": eventPointer("execution_stopped"),
    "ART-EXPIRY-OR-WITHDRAWAL": spec && eventPointer(spec.termEvent),
    "ART-DERIVATIVE-INVENTORY": eventPointer("derivative_inventory_completed"),
    "ART-RESIDUAL-DISCLOSURE": "/residual_effects",
    "ART-PUBLIC-RETURN": "/public_return",
    "ART-CLOSURE": eventPointer("closed"),
  };
  const expectedArtifactInputRefs = {
    "ART-TICKET-SNAPSHOT": ["/ticket"],
    "ART-CO-DECISION": ["/ticket/purpose"],
    "ART-ACTIVATION": ["/ticket/term", "/ticket/compute_contract"],
    "ART-EXECUTION-LOG": [eventPointer("activated")],
    "ART-OUTPUT-REVIEW": ["/ticket/output_contract", "/route_pair"],
    "ART-NO-DATA-PARITY": ["/route_pair"],
    "ART-STOP-DECISION": [spec && eventPointer(spec.termEvent)],
    "ART-EXPIRY-OR-WITHDRAWAL": spec && spec.termEvent === "automatic_expiry"
      ? ["/ticket/term"]
      : ["/ticket/withdrawal_contract", eventPointer("withdrawal_request_received")],
    "ART-DERIVATIVE-INVENTORY": ["/ticket/derivative_chain"],
    "ART-RESIDUAL-DISCLOSURE": ["/ticket/derivative_chain", "/residual_effects"],
    "ART-PUBLIC-RETURN": [
      "/ticket/public_return_contract",
      "/public_return/deliverable",
      "/public_return/value_measurement",
    ],
    "ART-CLOSURE": ["/public_return", "/residual_effects"],
  };
  const termState = spec && spec.termState;
  const expectedArtifactStates = {
    "ART-TICKET-SNAPSHOT": ["draft", "draft"],
    "ART-CO-DECISION": ["draft", "co_decided"],
    "ART-ACTIVATION": ["co_decided", "active"],
    "ART-EXECUTION-LOG": ["not_started", "running"],
    "ART-OUTPUT-REVIEW": ["active", "active"],
    "ART-NO-DATA-PARITY": ["active", "active"],
    "ART-STOP-DECISION": ["stopping", "stopped"],
    "ART-EXPIRY-OR-WITHDRAWAL": ["active", termState],
    "ART-DERIVATIVE-INVENTORY": [termState, termState],
    "ART-RESIDUAL-DISCLOSURE": [termState, "residual_disclosed"],
    "ART-PUBLIC-RETURN": ["residual_disclosed", "return_accepted"],
    "ART-CLOSURE": ["return_accepted", "closed"],
  };
  const expectedArtifactRoles = {
    "ART-TICKET-SNAPSHOT": "EVIDENCE-CUSTODIAN",
    "ART-CO-DECISION": "COLLECTIVE-AGENDA-CHAIR",
    "ART-ACTIVATION": "CONTROLLED-COMPUTE-OPERATOR",
    "ART-EXECUTION-LOG": "CONTROLLED-COMPUTE-OPERATOR",
    "ART-OUTPUT-REVIEW": "RIGHTS-ETHICS-SAFETY-REVIEWER",
    "ART-NO-DATA-PARITY": "NO-DATA-SERVICE-OPERATOR",
    "ART-STOP-DECISION": spec && spec.stopRole,
    "ART-EXPIRY-OR-WITHDRAWAL": "EVIDENCE-CUSTODIAN",
    "ART-DERIVATIVE-INVENTORY": "DATA-DOMAIN-CUSTODIAN",
    "ART-RESIDUAL-DISCLOSURE": "RIGHTS-ETHICS-SAFETY-REVIEWER",
    "ART-PUBLIC-RETURN": "PUBLIC-RETURN-REP",
    "ART-CLOSURE": "COLLECTIVE-AGENDA-CHAIR",
  };
  const expectedArtifactDecisions = {
    "ART-TICKET-SNAPSHOT": "allowed",
    "ART-CO-DECISION": "allowed",
    "ART-ACTIVATION": "allowed",
    "ART-EXECUTION-LOG": "allowed",
    "ART-OUTPUT-REVIEW": "allowed",
    "ART-NO-DATA-PARITY": "allowed",
    "ART-STOP-DECISION": "stopped",
    "ART-EXPIRY-OR-WITHDRAWAL": "stopped",
    "ART-DERIVATIVE-INVENTORY": "allowed",
    "ART-RESIDUAL-DISCLOSURE": "allowed",
    "ART-PUBLIC-RETURN": "allowed",
    "ART-CLOSURE": "allowed",
  };
  const expectedArtifactReasons = {
    "ART-TICKET-SNAPSHOT": "synthetic_ticket_created",
    "ART-CO-DECISION": "synthetic_purpose_co_decided",
    "ART-ACTIVATION": "synthetic_activation_conditions_passed",
    "ART-EXECUTION-LOG": "synthetic_execution_started",
    "ART-OUTPUT-REVIEW": "synthetic_minimum_output_review_passed",
    "ART-NO-DATA-PARITY": "all_synthetic_parity_thresholds_passed",
    "ART-STOP-DECISION": spec && spec.termEvent === "automatic_expiry"
      ? "ticket_expired"
      : "participant_withdrawal_effective",
    "ART-EXPIRY-OR-WITHDRAWAL": spec && spec.termEvent === "automatic_expiry"
      ? "automatic_expiry_reached"
      : "valid_withdrawal_received",
    "ART-DERIVATIVE-INVENTORY": "synthetic_derivative_inventory_complete",
    "ART-RESIDUAL-DISCLOSURE": "non_erasure_boundary_disclosed",
    "ART-PUBLIC-RETURN": spec && spec.termEvent === "automatic_expiry"
      ? "synthetic_public_return_accepted"
      : "synthetic_public_return_accepted_after_withdrawal",
    "ART-CLOSURE": "synthetic_closure_conditions_passed",
  };
  const roleIds = (protocol.roles || []).map((item) => item.role_id);
  const decisions = (protocol.status_enums || {}).decision || [];
  const validArtifactIds = new Set();
  for (const record of records) {
    const recordProblems = [];
    const catalogItem = catalog.find((item) => item.artifact_id === (record && record.artifact_id));
    if (!record || !catalogItem) {
      recordProblems.push("record has an unknown artifact_id");
    } else {
      for (const field of catalogItem.minimum_fields || []) {
        if (!Object.prototype.hasOwnProperty.call(record, field)) {
          recordProblems.push(`${record.artifact_id} is missing ${field}`);
        }
      }
      if (record.ticket_id !== rehearsal.ticket_id || record.case_id !== rehearsal.case_id) {
        recordProblems.push(`${record.artifact_id} identity does not match the case`);
      }
      if (!roleIds.includes(record.role_type) ||
          record.role_type !== expectedArtifactRoles[record.artifact_id]) {
        recordProblems.push(`${record.artifact_id} role is invalid`);
      }
      if (!sameJson([record.before_state, record.after_state],
          expectedArtifactStates[record.artifact_id])) {
        recordProblems.push(`${record.artifact_id} state pair is invalid`);
      }
      if (!decisions.includes(record.decision) ||
          record.decision !== expectedArtifactDecisions[record.artifact_id] ||
          record.reason_code !== expectedArtifactReasons[record.artifact_id]) {
        recordProblems.push(`${record.artifact_id} decision or reason is invalid`);
      }
      const expectedEventName = expectedArtifactEvents[record.artifact_id];
      const expectedRecordedAt = expectedEventName ? eventAt(expectedEventName) : issuedAt;
      if (!Number.isFinite(Date.parse(record.recorded_at)) ||
          Date.parse(record.recorded_at) !== expectedRecordedAt) {
        recordProblems.push(`${record.artifact_id} timestamp is not bound to its case event`);
      }
      if (record.content_ref !== expectedArtifactContentRefs[record.artifact_id]) {
        recordProblems.push(`${record.artifact_id} content pointer is not bound to its evidence object`);
      }
      if (!sameJson(record.input_refs, expectedArtifactInputRefs[record.artifact_id]) ||
          record.input_refs.some((pointer) => resolveJsonPointer(rehearsal, pointer) === undefined) ||
          resolveJsonPointer(rehearsal, record.content_ref) === undefined) {
        recordProblems.push(`${record.artifact_id} contains an unresolved evidence pointer`);
      }
    }
    if (recordProblems.length === 0 &&
        records.filter((item) => item && item.artifact_id === record.artifact_id).length === 1) {
      validArtifactIds.add(record.artifact_id);
    } else {
      if (recordProblems.length === 0) {
        recordProblems.push(`${record.artifact_id} must have exactly one record`);
      }
      recordProblems.forEach((problem) => fail("ASSERT-ARTIFACT-COVERAGE", problem));
    }
  }

  const expected = rehearsal.expected_result || {};
  if (expected.pass !== true ||
      expected.ticket_final_state !== derivedTicketStates[derivedTicketStates.length - 1] ||
      expected.execution_final_state !== derivedExecutionStates[derivedExecutionStates.length - 1] ||
      expected.released_output_after_expiry_or_withdrawal_count !== postTermReleasedOutputCount ||
      (spec && spec.termEvent === "withdrawal_effective" && expected.illegal_action_blocked !== true)) {
    fail("ASSERT-POST-TERM-OUTPUT-BLOCKED", "declared expected result does not match the event-derived result");
  }

  return {
    errors,
    failedAssertionIds: [...failedAssertionIds],
    parityPassed: !failedAssertionIds.has("ASSERT-NO-DATA-ALL-THRESHOLDS"),
    artifactCoveragePassed: !failedAssertionIds.has("ASSERT-ARTIFACT-COVERAGE"),
    parityRuleCount: parityChecks.length,
    parityRulePassCount: parityChecks.filter(Boolean).length,
    requiredArtifactCount: requiredArtifactIds.length,
    validArtifactCount: validArtifactIds.size,
    slaTargetIds: observedTargetIds,
  };
}

function roundSix(value) {
  return Math.round(value * 1e6) / 1e6;
}

function evaluateSyntheticCapacityEnvelope(envelope, implementationEnvelope) {
  const errors = [];
  const failedAssertionIds = new Set();
  const failedModelIds = new Set();
  const fail = (assertionId, message, modelIds = []) => {
    errors.push(`[${assertionId}] ${message}`);
    failedAssertionIds.add(assertionId);
    for (const modelId of modelIds) failedModelIds.add(modelId);
  };
  const equalNumber = (left, right) =>
    typeof left === "number" && Number.isFinite(left) && Math.abs(left - right) <= 1e-6;
  const expectedScope = {
    scenario_id: "SCN-06",
    key_area_id: "PROV-KEY-001",
    project_ids: ["C-01", "C-02", "C-04"],
    window_minutes: 60,
    unit_definition: "abstract_parallel_service_unit_for_rehearsal_only",
    excludes: [
      "named_or_counted_real_staff", "physical_compute_hardware",
      "power_cooling_or_network_engineering", "facility_or_fire_capacity",
      "cost_budget_procurement_or_approval",
    ],
  };
  const expectedDemandFixture = {
    source: "submission_owned_synthetic_fixture",
    arrivals_per_window: 12,
    route_split: { data_route: 6, no_data_route: 6 },
    observed_arrivals: null,
    field_observation_status: "not_observed",
  };
  const expectedConfirmations = {
    operator_entity: null,
    staffing_assignment: null,
    site_capacity: null,
    power_kw: null,
    cooling_kw: null,
    network_bandwidth: null,
    cost_cny: null,
    procurement_status: "unknown",
    approval_status: "unknown",
    professional_confirmation_status: "unknown",
  };
  const expectedModelInputs = [
    {
      model_id: "CAP-C01-PURPOSE-TICKET-REVIEW",
      project_id: "C-01",
      service_role: "purpose_ticket_review",
      route_id: "all_requests",
      demand_requests_per_window: 12,
      service_minutes_per_request: 15,
      declared_parallel_units: 4,
      protected_reserve_units: 0,
      dedicated_to_route: false,
      borrowable_by_other_route: false,
      reserve_purpose: null,
    },
    {
      model_id: "CAP-C02-DATA-ROUTE",
      project_id: "C-02",
      service_role: "equivalent_service_delivery",
      route_id: "data_route",
      demand_requests_per_window: 6,
      service_minutes_per_request: 12,
      declared_parallel_units: 2,
      protected_reserve_units: 0,
      dedicated_to_route: true,
      borrowable_by_other_route: false,
      reserve_purpose: "preserve_route_capacity",
    },
    {
      model_id: "CAP-C02-NO-DATA-ROUTE",
      project_id: "C-02",
      service_role: "equivalent_service_delivery",
      route_id: "no_data_route",
      demand_requests_per_window: 6,
      service_minutes_per_request: 12,
      declared_parallel_units: 2,
      protected_reserve_units: 0,
      dedicated_to_route: true,
      borrowable_by_other_route: false,
      reserve_purpose: "protect_no_data_equivalence",
    },
    {
      model_id: "CAP-C04-CONTROLLED-COMPUTE",
      project_id: "C-04",
      service_role: "controlled_compute_job",
      route_id: "data_route",
      demand_requests_per_window: 6,
      service_minutes_per_request: 20,
      declared_parallel_units: 4,
      protected_reserve_units: 1,
      dedicated_to_route: true,
      borrowable_by_other_route: false,
      reserve_purpose: "teardown_and_recovery_only",
    },
  ];

  if (!envelope || typeof envelope !== "object" ||
      envelope.envelope_id !== "SCN06-C010204-SYNTHETIC-CAPACITY-01" ||
      envelope.version !== "1.0.0") {
    fail("ASSERT-CAPACITY-RECALCULATION", "synthetic capacity envelope identity drifted");
  }
  if (!sameJson(envelope.scope, expectedScope)) {
    fail("ASSERT-CAPACITY-RECALCULATION", "scope, window or abstract-unit boundary drifted");
  }
  if (!sameJson(envelope.demand_fixture, expectedDemandFixture)) {
    fail("ASSERT-CAPACITY-DEMAND-HEADROOM", "the pinned synthetic demand fixture drifted");
  }

  const models = Array.isArray(envelope.resource_models) ? envelope.resource_models : [];
  const expectedIds = expectedModelInputs.map((item) => item.model_id);
  if (!sameJson(models.map((item) => item && item.model_id), expectedIds)) {
    fail("ASSERT-CAPACITY-RECALCULATION", "resource model identity or order drifted", expectedIds);
  }
  const expectedById = Object.fromEntries(expectedModelInputs.map((item) => [item.model_id, item]));
  const computedById = {};
  for (const model of models) {
    if (!model || !expectedById[model.model_id]) continue;
    const expected = expectedById[model.model_id];
    const modelId = model.model_id;
    const inputProjection = Object.fromEntries(
      Object.keys(expected).map((key) => [key, model[key]]),
    );
    if (!sameJson(inputProjection, expected)) {
      const assertionId = modelId === "CAP-C02-NO-DATA-ROUTE"
        ? "ASSERT-CAPACITY-NO-DATA-RESERVE"
        : modelId === "CAP-C04-CONTROLLED-COMPUTE"
          ? "ASSERT-CAPACITY-STOP-RESERVE"
          : model.demand_requests_per_window !== expected.demand_requests_per_window
            ? "ASSERT-CAPACITY-DEMAND-HEADROOM"
            : "ASSERT-CAPACITY-RECALCULATION";
      fail(assertionId, `${modelId} synthetic input contract drifted`, [modelId]);
    }
    const numericInputs = [
      model.demand_requests_per_window, model.service_minutes_per_request,
      model.declared_parallel_units, model.protected_reserve_units,
    ];
    if (numericInputs.some((value) => !Number.isFinite(value)) ||
        model.service_minutes_per_request <= 0 || model.declared_parallel_units < 0 ||
        model.protected_reserve_units < 0 ||
        model.protected_reserve_units > model.declared_parallel_units) {
      fail("ASSERT-CAPACITY-RECALCULATION", `${modelId} has invalid numeric inputs`, [modelId]);
      continue;
    }
    const available = model.declared_parallel_units - model.protected_reserve_units;
    const capacity = Math.floor((60 * available) / model.service_minutes_per_request);
    const headroom = capacity - model.demand_requests_per_window;
    const utilization = capacity > 0
      ? roundSix(model.demand_requests_per_window / capacity)
      : null;
    computedById[modelId] = { available, capacity, headroom, utilization };
    if (!equalNumber(model.available_parallel_units, available) ||
        !equalNumber(model.capacity_requests_per_window, capacity) ||
        !equalNumber(model.headroom_requests, headroom) ||
        !equalNumber(model.utilization_ratio, utilization)) {
      fail(
        "ASSERT-CAPACITY-RECALCULATION",
        `${modelId} available units, throughput, headroom or utilization is not reproducible`,
        [modelId],
      );
    }
    if (model.demand_requests_per_window < 0 || capacity <= 0 || headroom < 0) {
      fail(
        "ASSERT-CAPACITY-DEMAND-HEADROOM",
        `${modelId} cannot admit the pinned synthetic demand with non-negative headroom`,
        [modelId],
      );
    }
  }

  const dataId = "CAP-C02-DATA-ROUTE";
  const noDataId = "CAP-C02-NO-DATA-ROUTE";
  const dataModel = models.find((item) => item && item.model_id === dataId);
  const noDataModel = models.find((item) => item && item.model_id === noDataId);
  if (!dataModel || !noDataModel || !computedById[dataId] || !computedById[noDataId] ||
      dataModel.route_id !== "data_route" || noDataModel.route_id !== "no_data_route" ||
      noDataModel.declared_parallel_units !== 2 || noDataModel.available_parallel_units !== 2 ||
      noDataModel.dedicated_to_route !== true || noDataModel.borrowable_by_other_route !== false ||
      noDataModel.reserve_purpose !== "protect_no_data_equivalence" ||
      computedById[noDataId].capacity < computedById[dataId].capacity) {
    fail(
      "ASSERT-CAPACITY-NO-DATA-RESERVE",
      "the no-data route lost its dedicated non-borrowable capacity or parity",
      [dataId, noDataId],
    );
  }

  const stopId = "CAP-C04-CONTROLLED-COMPUTE";
  const stopModel = models.find((item) => item && item.model_id === stopId);
  if (!stopModel || stopModel.declared_parallel_units !== 4 ||
      stopModel.protected_reserve_units !== 1 || stopModel.available_parallel_units !== 3 ||
      stopModel.borrowable_by_other_route !== false ||
      stopModel.reserve_purpose !== "teardown_and_recovery_only") {
    fail(
      "ASSERT-CAPACITY-STOP-RESERVE",
      "C-04 must protect one abstract unit for teardown and recovery",
      [stopId],
    );
  }

  const expectedResult = envelope.expected_result || {};
  if (envelope.evidence_level !== "E2" ||
      envelope.status !== "synthetic_planning_envelope_not_confirmed_capacity" ||
      !sameJson(envelope.real_world_confirmations, expectedConfirmations) ||
      expectedResult.synthetic_admission_decision !== "pass_for_E2_rehearsal_only" ||
      expectedResult.field_operation_decision !== "not_ready_for_field_operation" ||
      !implementationEnvelope ||
      implementationEnvelope.synthetic_capacity_envelope_status !==
        "passed_for_E2_rehearsal_only" ||
      implementationEnvelope.field_capacity_status !== "unknown") {
    fail(
      "ASSERT-CAPACITY-E2-BOUNDARY",
      "synthetic evidence was promoted to a real capacity or field-readiness claim",
    );
  }

  const projectIds = [...new Set(models.map((item) => item && item.project_id).filter(Boolean))];
  const projectGatePassed = projectIds.filter((projectId) =>
    models.filter((item) => item && item.project_id === projectId)
      .every((item) => !failedModelIds.has(item.model_id))).length;
  const computedModels = Object.values(computedById);
  const capacityMetrics = {
    synthetic_capacity_resource_gate_total: models.length,
    synthetic_capacity_resource_gate_passed:
      models.filter((item) => item && !failedModelIds.has(item.model_id)).length,
    synthetic_capacity_project_gate_passed: projectGatePassed,
    synthetic_capacity_minimum_headroom_requests: computedModels.length
      ? Math.min(...computedModels.map((item) => item.headroom))
      : 0,
    synthetic_capacity_no_data_to_data_capacity_ratio:
      computedById[dataId] && computedById[dataId].capacity > 0 && computedById[noDataId]
        ? computedById[noDataId].capacity / computedById[dataId].capacity
        : 0,
  };
  return { errors, failedAssertionIds: [...failedAssertionIds], capacityMetrics };
}

function auditExpiringTicket(metrics, texts, manifest) {
  const errors = [];
  const protocolAbsolute = path.join(ROOT, EXPIRING_TICKET_PATH);
  if (!fs.existsSync(protocolAbsolute)) {
    return { errors: [`${EXPIRING_TICKET_PATH} is missing`], protocolMetrics: {} };
  }
  const protocol = JSON.parse(fs.readFileSync(protocolAbsolute, "utf8"));
  const expectedTicketStateMachine = {
    initial_state: "draft",
    terminal_state: "closed",
    states: [
      "draft", "co_decided", "active", "expired", "withdrawn",
      "residual_disclosed", "return_accepted", "closed",
    ],
    allowed_transitions: [
      { from: "draft", to: "co_decided", trigger: "collective_decision_recorded" },
      { from: "draft", to: "withdrawn", trigger: "withdrawal_before_decision" },
      { from: "co_decided", to: "active", trigger: "activation_conditions_pass" },
      { from: "co_decided", to: "withdrawn", trigger: "withdrawal_before_activation" },
      { from: "active", to: "expired", trigger: "clock_reaches_expires_at" },
      { from: "active", to: "withdrawn", trigger: "valid_withdrawal_received" },
      {
        from: "expired",
        to: "residual_disclosed",
        trigger: "derivative_inventory_and_residual_notice_complete",
      },
      {
        from: "withdrawn",
        to: "residual_disclosed",
        trigger: "derivative_inventory_and_residual_notice_complete",
      },
      {
        from: "residual_disclosed",
        to: "return_accepted",
        trigger: "public_return_acceptance_recorded",
      },
      { from: "residual_disclosed", to: "closed", trigger: "no_public_return_obligation" },
      { from: "return_accepted", to: "closed", trigger: "closure_artifact_complete" },
    ],
    forbidden_transitions: [
      ["expired", "active"], ["withdrawn", "active"], ["closed", "active"],
    ],
    invariants: [
      "new_output_release_requires_ticket_active",
      "withdrawn_does_not_mean_all_effects_deleted",
      "closed_requires_residual_disclosure",
      "return_acceptance_is_not_payment_for_consent",
    ],
  };
  const expectedExecutionStateMachine = {
    initial_state: "not_started",
    terminal_states: ["stopped", "closed"],
    states: ["not_started", "running", "paused", "stopping", "stopped", "closed"],
    allowed_transitions: [
      { from: "not_started", to: "running", requires_ticket_state: "active" },
      { from: "running", to: "paused", trigger: "recoverable_pause_trigger_detected" },
      { from: "running", to: "stopping", trigger: "ticket_expired_or_withdrawn" },
      { from: "paused", to: "running", trigger: "same_method_retest_and_joint_signoff" },
      { from: "paused", to: "stopping", trigger: "remediation_failed_or_ticket_not_active" },
      { from: "stopping", to: "stopped", trigger: "teardown_completed_within_60_seconds" },
      { from: "stopped", to: "closed", trigger: "conditional_artifacts_complete" },
    ],
    invariants: [
      "running_requires_ticket_active",
      "expiry_or_withdrawal_atomically_enters_stopping_and_blocks_new_query_or_output",
      "stopping_allows_teardown_only_and_reaches_stopped_within_60_seconds",
      "resume_requires_same_method_retest_no_active_trigger_and_joint_signoff",
      "ticket_closure_requires_execution_stopped_or_closed",
    ],
  };
  if (protocol.protocol_id !== "EXPIRING-DATA-TICKET-01" || protocol.version !== "1.1.0" ||
      protocol.scenario_id !== "SCN-06" || protocol.frozen_main_sha !== FROZEN_MAIN_SHA) {
    errors.push("Expiring-ticket identity, scenario or frozen main SHA drifted");
  }
  if (!sameJson(protocol.ticket_state_machine, expectedTicketStateMachine)) {
    errors.push("Expiring-ticket state machine must retain the exact pinned states, transitions, triggers and invariants");
  }
  if (!sameJson(protocol.execution_state_machine, expectedExecutionStateMachine)) {
    errors.push("Execution state machine must retain the exact pinned states, transitions, guards and invariants");
  }
  const boundary = protocol.evidence_boundary || {};
  if (boundary.evidence_level !== "E2" || boundary.field_observation_status !== "not_observed" ||
      boundary.entity_confirmation_status !== "unknown" ||
      boundary.professional_confirmation_status !== "unknown" ||
      boundary.implementation_status !== "not_implemented" ||
      boundary.field_or_stakeholder_evidence !== "not_collected") {
    errors.push("Expiring-ticket evidence boundary must remain E2 and unconfirmed beyond synthetic rehearsal");
  }
  const requiredTicketFields = [
    "ticket_id", "version", "supersedes", "purpose", "term", "input_contract",
    "compute_contract", "output_contract", "withdrawal_contract", "derivative_chain",
    "no_data_equivalent_contract", "public_return_contract",
  ];
  if (!sameJson(protocol.ticket_template.required_fields, requiredTicketFields) ||
      requiredTicketFields.some((field) => !Object.prototype.hasOwnProperty.call(protocol.ticket_template, field)) ||
      protocol.ticket_template.confirmed_legal_role !== null ||
      protocol.ticket_template.confirmed_signatory !== null ||
      protocol.ticket_template.confirmed_capacity !== null ||
      !sameJson(protocol.ticket_template.public_return_contract, {
        beneficiary: null,
        due_at: null,
        acceptance_method: null,
        undelivered_state: null,
        deliverable: {
          deliverable_id: null,
          description_zh: null,
          description_en: null,
          content_ref: null,
        },
        value_metric: {
          metric_id: null,
          unit: null,
          operator: null,
          target_value: null,
          formula: null,
        },
        evidence_refs: [],
        is_payment_for_consent: false,
      })) {
    errors.push("Expiring-ticket template is missing a required field or preserves a false confirmation");
  }
  const expectedNoDataThresholds = {
    minimum_attempts_per_route: 30,
    p90_time_absolute_delta_max_seconds: 120,
    p90_time_ratio_max: 1.1,
    price_premium_max_cny: 0,
    failure_rate_delta_max: 0.02,
    core_output_schema_match_ratio_min: 1.0,
    safety_alert_match_ratio_min: 1.0,
    accessibility_task_fixture_coverage_ratio_min: 1.0,
    human_takeover_required: true,
    human_takeover_response_max_seconds: 120,
    staffed_paper_offline_complaint_channels_required: true,
  };
  const expectedAccessibilityTaskContract = {
    claim_scope: "E2_synthetic_fixture_coverage_not_usability_performance",
    observed_user_count: 0,
    field_test_status: "not_observed",
    professional_confirmation_status: "unknown",
    required_tasks: [
      { task_id: "A11Y-READ-TICKET-SCREEN-READER", mode: "screen_reader" },
      { task_id: "A11Y-WITHDRAW-KEYBOARD-ONLY", mode: "keyboard_only" },
      { task_id: "A11Y-READ-RECEIPT-LOW-VISION", mode: "low_vision" },
      { task_id: "A11Y-REACH-STAFFED-FALLBACK", mode: "reduced_mobility" },
      { task_id: "A11Y-UNDERSTAND-RESIDUAL", mode: "cognitive_or_language" },
      { task_id: "A11Y-COMPLETE-NO-SMARTPHONE", mode: "no_smartphone" },
    ],
    required_route_ids: ["data_route", "no_data_route"],
    required_result_fields: [
      "result_type", "attempt_count", "completed_count", "help_request_count", "wait_seconds",
      "detour_count", "human_takeover_available", "critical_output_readback_fixture_passed",
      "complaint_or_stop_receipt_available", "evidence_refs",
    ],
  };
  if (!sameJson((protocol.no_data_equivalence || {}).thresholds, expectedNoDataThresholds) ||
      !sameJson((protocol.no_data_equivalence || {}).accessibility_task_contract,
        expectedAccessibilityTaskContract) ||
      protocol.no_data_equivalence.threshold_status !==
        "design_threshold_pending_professional_and_field_confirmation" ||
      protocol.no_data_equivalence.evidence_level !== "E2") {
    errors.push("No-data thresholds must remain the exact pinned E2 design contract");
  }
  const expectedSlaTargets = [
    {
      target_id: "SLA-EXECUTION-TEARDOWN",
      max_seconds: 60,
      starts_at: "expiry_or_withdrawal_effective_at",
    },
    {
      target_id: "SLA-HUMAN-WITHDRAWAL-ACK",
      max_seconds: 900,
      starts_at: "staffed_paper_or_offline_request_received",
    },
    {
      target_id: "SLA-DERIVATIVE-INVENTORY",
      max_seconds: 14400,
      starts_at: "expiry_or_withdrawal_effective_at",
    },
    {
      target_id: "SLA-CONTROLLABLE-PUBLIC-OUTPUT-REMOVAL",
      max_seconds: 86400,
      starts_at: "expiry_or_withdrawal_effective_at",
    },
    {
      target_id: "SLA-RESIDUAL-DISCLOSURE",
      max_seconds: 86400,
      starts_at: "expiry_or_withdrawal_effective_at",
    },
    {
      target_id: "SLA-COMPLAINT-FIRST-RESPONSE",
      max_seconds: 172800,
      starts_at: "complaint_received",
    },
  ];
  if ((protocol.service_level_targets || {}).status !==
        "synthetic_protocol_design_target_pending_E3_E4" ||
      !sameJson((protocol.service_level_targets || {}).targets, expectedSlaTargets)) {
    errors.push("Service-level target catalog drifted from the exact pinned E2 contract");
  }

  const expectedStopControls = {
    triggers: [
      {
        trigger_id: "STOP-UNPROVEN-SOURCE-OR-LICENCE",
        field: "unproven_source_or_licence_count",
        operator: ">",
        threshold: 0,
      },
      {
        trigger_id: "STOP-LIVE-HIGH-RISK-RECORD",
        field: "live_personal_trajectory_payment_or_covert_identifier_count",
        operator: ">",
        threshold: 0,
      },
      { trigger_id: "STOP-RAW-EXPORT", field: "raw_record_export_count", operator: ">", threshold: 0 },
      {
        trigger_id: "STOP-UNAUTHORIZED-QUERY",
        field: "unauthorized_query_attempt_count",
        operator: ">",
        threshold: 0,
      },
      {
        trigger_id: "STOP-SMALL-GROUP-OUTPUT",
        field: "output_group_size",
        operator: "<",
        threshold_ref: "ticket.output_contract.minimum_aggregate_group_size",
      },
      {
        trigger_id: "STOP-NO-DATA-PARITY",
        field: "no_data_equivalence_all_rules_pass",
        operator: "==",
        threshold: false,
      },
      {
        trigger_id: "STOP-HUMAN-TAKEOVER",
        field: "human_takeover_available_and_within_threshold",
        operator: "==",
        threshold: false,
      },
      {
        trigger_id: "STOP-UNMAPPED-DERIVATIVE",
        field: "unmapped_derivative_item_count",
        operator: ">",
        threshold: 0,
      },
      {
        trigger_id: "STOP-POST-TERM-OUTPUT",
        field: "released_output_after_expiry_or_withdrawal_count",
        operator: ">",
        threshold: 0,
      },
      {
        trigger_id: "STOP-RESIDUAL-DISCLOSURE",
        field: "residual_disclosure_complete_within_target",
        operator: "==",
        threshold: false,
      },
    ],
    action_chain: [
      "block_output", "pause_or_stop_execution", "preserve_log", "issue_stop_receipt",
      "notify_role_types", "remediate", "same_method_retest", "joint_signoff",
    ],
    resume_conditions: [
      "ticket_state_is_active", "all_stop_triggers_cleared", "same_method_retest_passed",
      "participant_custodian_and_safety_signoff_recorded",
    ],
  };
  if (!sameJson(protocol.stop_controls, expectedStopControls)) {
    errors.push("Expiring-ticket stop triggers, action chain or resume conditions drifted");
  }

  const expectedRoles = [
    "COLLECTIVE-AGENDA-CHAIR", "PARTICIPANT-REP", "DATA-DOMAIN-CUSTODIAN",
    "CONTROLLED-COMPUTE-OPERATOR", "MODEL-OR-QUERY-TEAM", "NO-DATA-SERVICE-OPERATOR",
    "RIGHTS-ETHICS-SAFETY-REVIEWER", "EVIDENCE-CUSTODIAN", "PUBLIC-RETURN-REP",
  ];
  const roleIds = (protocol.roles || []).map((item) => item.role_id);
  if (!sameJson(roleIds, expectedRoles) || (protocol.roles || []).some((role) =>
    role.assigned_entity !== null || role.assignment_status !== "unknown" || role.legal_role_confirmed !== false)) {
    errors.push("Expiring-ticket role types must remain complete and unassigned");
  }
  const expectedAccountableByActivity = {
    "ACT-CO-DECIDE": "COLLECTIVE-AGENDA-CHAIR",
    "ACT-ACTIVATE": "CONTROLLED-COMPUTE-OPERATOR",
    "ACT-RUN": "CONTROLLED-COMPUTE-OPERATOR",
    "ACT-NO-DATA-SERVICE": "NO-DATA-SERVICE-OPERATOR",
    "ACT-STOP": "CONTROLLED-COMPUTE-OPERATOR",
    "ACT-PRESERVE-EVIDENCE": "EVIDENCE-CUSTODIAN",
    "ACT-ACCEPT-RETURN": "PUBLIC-RETURN-REP",
    "ACT-CLOSE": "COLLECTIVE-AGENDA-CHAIR",
  };
  const expectedRaci = {
    boundary: "Role types are design placeholders, not confirmed entities or statutory/legal assignments.",
    activities: [
      {
        activity_id: "ACT-CO-DECIDE",
        accountable: "COLLECTIVE-AGENDA-CHAIR",
        responsible: ["PARTICIPANT-REP"],
        consulted: ["RIGHTS-ETHICS-SAFETY-REVIEWER", "NO-DATA-SERVICE-OPERATOR"],
        informed: ["EVIDENCE-CUSTODIAN"],
      },
      {
        activity_id: "ACT-ACTIVATE",
        accountable: "CONTROLLED-COMPUTE-OPERATOR",
        responsible: ["DATA-DOMAIN-CUSTODIAN"],
        consulted: ["RIGHTS-ETHICS-SAFETY-REVIEWER"],
        informed: ["PARTICIPANT-REP", "EVIDENCE-CUSTODIAN"],
      },
      {
        activity_id: "ACT-RUN",
        accountable: "CONTROLLED-COMPUTE-OPERATOR",
        responsible: ["MODEL-OR-QUERY-TEAM", "DATA-DOMAIN-CUSTODIAN"],
        consulted: ["RIGHTS-ETHICS-SAFETY-REVIEWER"],
        informed: ["PARTICIPANT-REP", "EVIDENCE-CUSTODIAN"],
      },
      {
        activity_id: "ACT-NO-DATA-SERVICE",
        accountable: "NO-DATA-SERVICE-OPERATOR",
        responsible: ["NO-DATA-SERVICE-OPERATOR"],
        consulted: ["PARTICIPANT-REP", "RIGHTS-ETHICS-SAFETY-REVIEWER"],
        informed: ["EVIDENCE-CUSTODIAN"],
      },
      {
        activity_id: "ACT-STOP",
        accountable: "CONTROLLED-COMPUTE-OPERATOR",
        responsible: ["CONTROLLED-COMPUTE-OPERATOR", "DATA-DOMAIN-CUSTODIAN"],
        consulted: ["RIGHTS-ETHICS-SAFETY-REVIEWER"],
        informed: ["PARTICIPANT-REP", "NO-DATA-SERVICE-OPERATOR", "EVIDENCE-CUSTODIAN"],
      },
      {
        activity_id: "ACT-PRESERVE-EVIDENCE",
        accountable: "EVIDENCE-CUSTODIAN",
        responsible: ["EVIDENCE-CUSTODIAN"],
        consulted: ["DATA-DOMAIN-CUSTODIAN", "RIGHTS-ETHICS-SAFETY-REVIEWER"],
        informed: ["PARTICIPANT-REP"],
      },
      {
        activity_id: "ACT-ACCEPT-RETURN",
        accountable: "PUBLIC-RETURN-REP",
        responsible: ["PUBLIC-RETURN-REP"],
        consulted: ["PARTICIPANT-REP", "COLLECTIVE-AGENDA-CHAIR"],
        informed: ["EVIDENCE-CUSTODIAN"],
      },
      {
        activity_id: "ACT-CLOSE",
        accountable: "COLLECTIVE-AGENDA-CHAIR",
        responsible: ["EVIDENCE-CUSTODIAN"],
        consulted: ["PARTICIPANT-REP", "PUBLIC-RETURN-REP", "RIGHTS-ETHICS-SAFETY-REVIEWER"],
        informed: ["CONTROLLED-COMPUTE-OPERATOR", "NO-DATA-SERVICE-OPERATOR"],
      },
    ],
    unilateral_stop_authorities: [
      {
        role_id: "PARTICIPANT-REP",
        scope: "withdrawal or material mismatch affecting represented participants",
      },
      {
        role_id: "DATA-DOMAIN-CUSTODIAN",
        scope: "source, permission, export or derivative-chain breach",
      },
      {
        role_id: "NO-DATA-SERVICE-OPERATOR",
        scope: "no-data equivalence or human-service failure",
      },
      {
        role_id: "RIGHTS-ETHICS-SAFETY-REVIEWER",
        scope: "rights, ethics, safety or unresolved residual-impact breach",
      },
    ],
  };
  if (!sameJson(protocol.raci, expectedRaci)) {
    errors.push("Expiring-ticket RACI responsibilities, consultations, notices or stop authorities drifted");
  }
  const activities = (protocol.raci || {}).activities || [];
  const activityIds = activities.map((item) => item.activity_id);
  if (!sameJson(activityIds, Object.keys(expectedAccountableByActivity)) ||
      new Set(activityIds).size !== activityIds.length) {
    errors.push("Expiring-ticket RACI activity identity set is incomplete or duplicated");
  }
  for (const activity of activities) {
    if (typeof activity.accountable !== "string" ||
        activity.accountable !== expectedAccountableByActivity[activity.activity_id] ||
        !roleIds.includes(activity.accountable)) {
      errors.push(`${activity.activity_id || "RACI activity"} must have exactly its pinned accountable role`);
    }
    for (const field of ["responsible", "consulted", "informed"]) {
      if (!Array.isArray(activity[field]) ||
          new Set(activity[field]).size !== activity[field].length ||
          activity[field].some((role) => !roleIds.includes(role))) {
        errors.push(`${activity.activity_id || "RACI activity"} has an invalid or duplicated ${field} role`);
      }
    }
  }
  const stopAuthorities = (protocol.raci || {}).unilateral_stop_authorities || [];
  const expectedStopRoles = [
    "PARTICIPANT-REP", "DATA-DOMAIN-CUSTODIAN", "NO-DATA-SERVICE-OPERATOR",
    "RIGHTS-ETHICS-SAFETY-REVIEWER",
  ];
  if (!sameJson(stopAuthorities.map((item) => item.role_id), expectedStopRoles) ||
      new Set(stopAuthorities.map((item) => item.role_id)).size !== expectedStopRoles.length ||
      stopAuthorities.some((item) => typeof item.scope !== "string" || !item.scope)) {
    errors.push("Expiring-ticket unilateral stop authorities are incomplete, duplicated or unscoped");
  }

  const commonArtifactFields = [
    "ticket_id", "case_id", "recorded_at", "role_type", "before_state", "after_state",
    "input_refs", "decision", "reason_code", "content_ref",
  ];
  const expectedArtifactIds = [
    "ART-TICKET-SNAPSHOT", "ART-CO-DECISION", "ART-ACTIVATION", "ART-EXECUTION-LOG",
    "ART-OUTPUT-REVIEW", "ART-NO-DATA-PARITY", "ART-STOP-DECISION",
    "ART-EXPIRY-OR-WITHDRAWAL", "ART-DERIVATIVE-INVENTORY",
    "ART-RESIDUAL-DISCLOSURE", "ART-PUBLIC-RETURN", "ART-CLOSURE",
  ];
  const expectedArtifactConditions = [
    "ticket_created_or_versioned", "draft_to_co_decided", "co_decided_to_active",
    "execution_started_or_state_changed", "output_considered_for_release",
    "route_pair_rehearsed", "stop_trigger_or_term_end", "ticket_expired_or_withdrawn",
    "ticket_expired_or_withdrawn", "ticket_expired_or_withdrawn",
    "public_return_obligation_exists", "ticket_closes",
  ];
  const catalog = protocol.audit_artifact_catalog || [];
  if (!sameJson(catalog.map((item) => item.artifact_id), expectedArtifactIds) ||
      !sameJson(catalog.map((item) => item.required_when), expectedArtifactConditions) ||
      catalog.some((item) => !sameJson(item.minimum_fields, commonArtifactFields))) {
    errors.push("Expiring-ticket conditional audit artifact catalog drifted");
  }

  const scenario = featureById("geometry/public_space.geojson", "SCN-06");
  const keyArea = featureById("geometry/key_areas.geojson", "PROV-KEY-001");
  const building = featureById("geometry/buildings.geojson", "BLDG-002");
  const scenarioPoint = scenario && scenario.geometry && scenario.geometry.coordinates;
  if (!scenarioPoint || !keyArea || !pointInPolygonGeometry(scenarioPoint, keyArea.geometry)) {
    errors.push("SCN-06 must remain inside provisional key area PROV-KEY-001");
  }
  if (!scenarioPoint || !building || pointInPolygonGeometry(scenarioPoint, building.geometry)) {
    errors.push("SCN-06 must not be represented as co-located inside conceptual BLDG-002");
  }
  const refs = protocol.concept_refs || {};
  if (refs.key_area_id !== "PROV-KEY-001" || refs.building_host_candidate_id !== "BLDG-002" ||
      !sameJson(refs.route_ids, ["ROAD-001", "ROAD-005"]) ||
      !sameJson((refs.spatial_relationships || []).map((item) => item.verified_in_package), [true, false])) {
    errors.push("Expiring-ticket spatial crosswalk drifted");
  }
  const expectedOperationalScope = {
    mode: "single_node_E2",
    scenario_id: "SCN-06",
    key_area_id: "PROV-KEY-001",
    cross_node_handoff_in_scope: false,
    ticket_transfer_allowed: false,
    data_transfer_allowed: false,
    role_or_stop_authority_transfer_allowed: false,
    related_area_refs: [
      {
        key_area_id: "PROV-KEY-002",
        relationship: "illustrative_capability_reference_only",
        shared_ticket_or_case: false,
      },
      {
        key_area_id: "PROV-KEY-003",
        pack_id: "DAZHONGSI-FIELD-OPS-01",
        relationship: "separate_package_no_handoff",
        shared_ticket_or_case: false,
      },
    ],
    future_scope_expansion_requires: [
      "versioned_handoff_contract", "destination_role_mapping", "ack_receipt_and_sla",
      "reject_and_escalation_path", "authorized_E3_test", "E4_entity_and_legal_confirmation",
    ],
  };
  const fieldPack = loadJson("visual/assets/dazhongsi-field-validation-pack.json");
  if (!sameJson(protocol.operational_scope, expectedOperationalScope) ||
      fieldPack.pack_id !== "DAZHONGSI-FIELD-OPS-01" ||
      (fieldPack.concept_refs || {}).key_area_id !== "PROV-KEY-003" ||
      !sameJson((fieldPack.concept_refs || {}).scenario_ids, ["SCN-05", "SCN-09", "SCN-10"])) {
    errors.push("Expiring-ticket single-node scope or separate Dazhongsi package boundary drifted");
  }

  const officialThree = ["百年京张文化带", "都市AI生活体验带", "AI融合创新带"];
  const officialFive = [
    "AI全栈自主创新体系", "世界级AI创新生态", "AI+场景赋能新范式",
    "智能化AI活力城市", "AI治理全球话语权",
  ];
  if (!sameJson((protocol.crosswalk.official_three_positioning || []).map((item) => item.official_item_zh), officialThree) ||
      !sameJson((protocol.crosswalk.official_five_functions || []).map((item) => item.official_item_zh), officialFive) ||
      !sameJson((protocol.crosswalk.agent_tasks || []).map((item) => `${item.task_id}:${item.impact}`), [
        "agent.1:supporting", "agent.2:primary", "agent.3:primary",
        "agent.4:supporting", "agent.5:supporting", "agent.6:primary",
      ])) {
    errors.push("Official three-positioning, five-function or agent.1-6 crosswalk drifted");
  }
  const expectedAssertionIds = [
    "ASSERT-EXACT-TICKET-STATES", "ASSERT-EXACT-EXECUTION-STATES",
    "ASSERT-SINGLE-NODE-OPERATIONAL-SCOPE", "ASSERT-INSTANTIATED-TICKET",
    "ASSERT-MONOTONIC-EVENTS",
    "ASSERT-SLA-OBSERVATIONS", "ASSERT-TICKET-EXECUTION-COUPLING", "ASSERT-ONE-ACCOUNTABLE",
    "ASSERT-NO-DATA-ALL-THRESHOLDS", "ASSERT-ACCESSIBILITY-TASK-CONTRACT",
    "ASSERT-POST-TERM-OUTPUT-BLOCKED",
    "ASSERT-RESIDUAL-NOT-ERASURE", "ASSERT-PUBLIC-RETURN-SUBSTANTIATED",
    "ASSERT-ARTIFACT-COVERAGE", "ASSERT-E2-BOUNDARY",
    "ASSERT-CAPACITY-RECALCULATION", "ASSERT-CAPACITY-DEMAND-HEADROOM",
    "ASSERT-CAPACITY-NO-DATA-RESERVE", "ASSERT-CAPACITY-STOP-RESERVE",
    "ASSERT-CAPACITY-E2-BOUNDARY",
  ];
  const expectedNegativeMutations = [
    {
      mutation_id: "MUT-RELEASE-OUTPUT-AFTER-WITHDRAWAL",
      base_case_id: "CASE-MIDSTREAM-WITHDRAWAL-01",
      mutation: "Set released_output_count on post_withdrawal_query_attempt to 1 and decision to allowed.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-POST-TERM-OUTPUT-BLOCKED",
    },
    {
      mutation_id: "MUT-ALLOW-RAW-EXPORT",
      base_case_id: "CASE-NORMAL-EXPIRY-01",
      mutation: "Set ticket.input_contract.raw_record_export_allowed to true.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-INSTANTIATED-TICKET",
    },
    {
      mutation_id: "MUT-SMALL-GROUP-OUTPUT",
      base_case_id: "CASE-NORMAL-EXPIRY-01",
      mutation: "Set output_reviewed.output_group_size below the ticket minimum aggregate group size.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-INSTANTIATED-TICKET",
    },
    {
      mutation_id: "MUT-UNMAPPED-DERIVATIVE",
      base_case_id: "CASE-MIDSTREAM-WITHDRAWAL-01",
      mutation: "Set ticket.derivative_chain.unmapped_item_count to 1.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-INSTANTIATED-TICKET",
    },
    {
      mutation_id: "MUT-OMIT-STOPPING-STATE",
      base_case_id: "CASE-NORMAL-EXPIRY-01",
      mutation: "Set automatic_expiry.execution_state_after to running instead of stopping.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-TICKET-EXECUTION-COUPLING",
    },
    {
      mutation_id: "MUT-MISSING-PUBLIC-RETURN-DELIVERABLE",
      base_case_id: "CASE-NORMAL-EXPIRY-01",
      mutation: "Delete public_return.deliverable while leaving accepted true.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-PUBLIC-RETURN-SUBSTANTIATED",
    },
    {
      mutation_id: "MUT-PUBLIC-RETURN-BELOW-TARGET",
      base_case_id: "CASE-MIDSTREAM-WITHDRAWAL-01",
      mutation: "Set public_return.value_measurement.value below the contracted target.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-PUBLIC-RETURN-SUBSTANTIATED",
    },
    {
      mutation_id: "MUT-EMPTY-PUBLIC-RETURN-EVIDENCE",
      base_case_id: "CASE-MIDSTREAM-WITHDRAWAL-01",
      mutation: "Replace public_return.evidence_refs with an empty array.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-PUBLIC-RETURN-SUBSTANTIATED",
    },
    {
      mutation_id: "MUT-CROSS-NODE-WITHOUT-HANDOFF",
      base_case_id: "CASE-NORMAL-EXPIRY-01",
      mutation: "Move case scope to SCN-10 / PROV-KEY-003 while handoff_id remains null.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-SINGLE-NODE-OPERATIONAL-SCOPE",
    },
    {
      mutation_id: "MUT-BOTH-ROUTES-FAIL-SCREEN-READER-TASK",
      base_case_id: "CASE-NORMAL-EXPIRY-01",
      mutation: "Set completed_count to 0 for both routes of A11Y-READ-TICKET-SCREEN-READER while leaving declared coverage at 1.0.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-ACCESSIBILITY-TASK-CONTRACT",
    },
  ];
  const expectedCapacityRuleIds = [
    "ASSERT-CAPACITY-RECALCULATION", "ASSERT-CAPACITY-DEMAND-HEADROOM",
    "ASSERT-CAPACITY-NO-DATA-RESERVE", "ASSERT-CAPACITY-STOP-RESERVE",
    "ASSERT-CAPACITY-E2-BOUNDARY",
  ];
  const expectedCapacityMutations = [
    {
      mutation_id: "MUT-CAPACITY-DECLARED-CALCULATION-DRIFT",
      mutation: "Set C-01 declared capacity_requests_per_window from 16 to 15.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-CAPACITY-RECALCULATION",
    },
    {
      mutation_id: "MUT-CAPACITY-DEMAND-EXCEEDS-C01",
      mutation: "Set C-01 demand_requests_per_window from 12 to 17.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-CAPACITY-DEMAND-HEADROOM",
    },
    {
      mutation_id: "MUT-CAPACITY-BORROW-NO-DATA-UNITS",
      mutation: "Make one no-data route unit borrowable by the data route.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-CAPACITY-NO-DATA-RESERVE",
    },
    {
      mutation_id: "MUT-CAPACITY-REMOVE-STOP-RESERVE",
      mutation: "Set C-04 protected_reserve_units to zero and expose all units to live work.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-CAPACITY-STOP-RESERVE",
    },
    {
      mutation_id: "MUT-CAPACITY-FALSE-FIELD-CONFIRMATION",
      mutation: "Invent an operator entity and change the field operation decision to ready.",
      required_audit_result: "fail",
      expected_failed_assertion_id: "ASSERT-CAPACITY-E2-BOUNDARY",
    },
  ];
  const capacityEnvelope = protocol.synthetic_capacity_envelope || {};
  if (!sameJson((protocol.fail_closed_assertions || []).map((item) => item.assertion_id), expectedAssertionIds) ||
      !sameJson(protocol.negative_mutations, expectedNegativeMutations) ||
      !sameJson(capacityEnvelope.admission_rule_ids, expectedCapacityRuleIds) ||
      !sameJson(capacityEnvelope.negative_mutations, expectedCapacityMutations)) {
    errors.push("Expiring-ticket fail-closed assertion or mutation set drifted");
  }

  const rehearsals = protocol.synthetic_rehearsals || [];
  if (!sameJson(rehearsals.map((item) => item.case_id), [
    "CASE-NORMAL-EXPIRY-01", "CASE-MIDSTREAM-WITHDRAWAL-01",
  ])) {
    errors.push("Expiring-ticket synthetic rehearsal set drifted");
  }
  const evaluations = rehearsals.map((item) => evaluateTicketCase(protocol, item));
  evaluations.forEach((evaluation) => errors.push(...evaluation.errors));
  const expectedObservedSlaIds = ((protocol.service_level_targets || {}).targets || [])
    .map((item) => item.target_id).sort();
  const observedSlaIds = [...new Set(evaluations.flatMap((item) => item.slaTargetIds))].sort();
  if (!sameJson(observedSlaIds, expectedObservedSlaIds)) {
    errors.push("Synthetic event observations do not cover every pinned SLA target");
  }

  let negativePathFailClosed = 0;
  const mutationHandlers = {
    "MUT-RELEASE-OUTPUT-AFTER-WITHDRAWAL": (mutated) => {
      const postTerm = mutated.events.find((item) => item.event === "post_withdrawal_query_attempt");
      if (!postTerm) return false;
      postTerm.decision = "allowed";
      postTerm.released_output_count = 1;
      return true;
    },
    "MUT-ALLOW-RAW-EXPORT": (mutated) => {
      mutated.ticket.input_contract.raw_record_export_allowed = true;
      return true;
    },
    "MUT-SMALL-GROUP-OUTPUT": (mutated) => {
      const outputReview = mutated.events.find((item) => item.event === "output_reviewed");
      if (!outputReview) return false;
      outputReview.output_group_size = mutated.ticket.output_contract.minimum_aggregate_group_size - 1;
      return true;
    },
    "MUT-UNMAPPED-DERIVATIVE": (mutated) => {
      mutated.ticket.derivative_chain.unmapped_item_count = 1;
      return true;
    },
    "MUT-OMIT-STOPPING-STATE": (mutated) => {
      const termEvent = mutated.events.find((item) => item.event === "automatic_expiry");
      if (!termEvent) return false;
      termEvent.execution_state_after = "running";
      return true;
    },
    "MUT-MISSING-PUBLIC-RETURN-DELIVERABLE": (mutated) => {
      if (!mutated.public_return) return false;
      delete mutated.public_return.deliverable;
      return true;
    },
    "MUT-PUBLIC-RETURN-BELOW-TARGET": (mutated) => {
      if (!mutated.public_return || !mutated.public_return.value_measurement) return false;
      mutated.public_return.value_measurement.value = 0.5;
      return true;
    },
    "MUT-EMPTY-PUBLIC-RETURN-EVIDENCE": (mutated) => {
      if (!mutated.public_return) return false;
      mutated.public_return.evidence_refs = [];
      return true;
    },
    "MUT-CROSS-NODE-WITHOUT-HANDOFF": (mutated) => {
      if (!mutated.scope) return false;
      mutated.scope.scenario_id = "SCN-10";
      mutated.scope.key_area_id = "PROV-KEY-003";
      mutated.scope.handoff_id = null;
      return true;
    },
    "MUT-BOTH-ROUTES-FAIL-SCREEN-READER-TASK": (mutated) => {
      const fixtures = mutated.route_pair && mutated.route_pair.accessibility_task_fixtures;
      const task = fixtures && fixtures.tasks.find(
        (item) => item.task_id === "A11Y-READ-TICKET-SCREEN-READER",
      );
      if (!task || !task.data_route || !task.no_data_route) return false;
      task.data_route.completed_count = 0;
      task.no_data_route.completed_count = 0;
      return true;
    },
  };
  for (const mutation of protocol.negative_mutations || []) {
    const baseIndex = rehearsals.findIndex((item) => item.case_id === mutation.base_case_id);
    const handler = mutationHandlers[mutation.mutation_id];
    if (baseIndex < 0 || typeof handler !== "function") {
      errors.push(`${mutation.mutation_id || "Unknown mutation"} has no executable base case or handler`);
      continue;
    }
    const mutated = JSON.parse(JSON.stringify(rehearsals[baseIndex]));
    const applied = handler(mutated);
    const mutationEvaluation = applied ? evaluateTicketCase(protocol, mutated) : null;
    if (applied && evaluations[baseIndex].errors.length === 0 &&
        mutationEvaluation.errors.length > 0 &&
        mutationEvaluation.failedAssertionIds.includes(mutation.expected_failed_assertion_id)) {
      negativePathFailClosed += 1;
    } else {
      errors.push(`${mutation.mutation_id} did not fail closed on ${mutation.expected_failed_assertion_id}`);
    }
  }
  const capacityEvaluation = evaluateSyntheticCapacityEnvelope(
    capacityEnvelope,
    protocol.implementation_envelope,
  );
  errors.push(...capacityEvaluation.errors);
  const capacityMutationHandlers = {
    "MUT-CAPACITY-DECLARED-CALCULATION-DRIFT": (mutated) => {
      const model = mutated.resource_models.find(
        (item) => item.model_id === "CAP-C01-PURPOSE-TICKET-REVIEW",
      );
      if (!model) return false;
      model.capacity_requests_per_window = 15;
      return true;
    },
    "MUT-CAPACITY-DEMAND-EXCEEDS-C01": (mutated) => {
      const model = mutated.resource_models.find(
        (item) => item.model_id === "CAP-C01-PURPOSE-TICKET-REVIEW",
      );
      if (!model) return false;
      model.demand_requests_per_window = 17;
      return true;
    },
    "MUT-CAPACITY-BORROW-NO-DATA-UNITS": (mutated) => {
      const model = mutated.resource_models.find(
        (item) => item.model_id === "CAP-C02-NO-DATA-ROUTE",
      );
      if (!model) return false;
      model.borrowable_by_other_route = true;
      return true;
    },
    "MUT-CAPACITY-REMOVE-STOP-RESERVE": (mutated) => {
      const model = mutated.resource_models.find(
        (item) => item.model_id === "CAP-C04-CONTROLLED-COMPUTE",
      );
      if (!model) return false;
      model.protected_reserve_units = 0;
      model.available_parallel_units = 4;
      model.capacity_requests_per_window = 12;
      model.headroom_requests = 6;
      model.utilization_ratio = 0.5;
      return true;
    },
    "MUT-CAPACITY-FALSE-FIELD-CONFIRMATION": (mutated) => {
      if (!mutated.real_world_confirmations || !mutated.expected_result) return false;
      mutated.real_world_confirmations.operator_entity = "invented_operator";
      mutated.expected_result.field_operation_decision = "ready_for_field_operation";
      return true;
    },
  };
  let capacityNegativePathFailClosed = 0;
  for (const mutation of capacityEnvelope.negative_mutations || []) {
    const handler = capacityMutationHandlers[mutation.mutation_id];
    if (typeof handler !== "function") {
      errors.push(`${mutation.mutation_id || "Unknown capacity mutation"} has no executable handler`);
      continue;
    }
    const mutated = JSON.parse(JSON.stringify(capacityEnvelope));
    const applied = handler(mutated);
    const mutationEvaluation = applied
      ? evaluateSyntheticCapacityEnvelope(mutated, protocol.implementation_envelope)
      : null;
    if (applied && capacityEvaluation.errors.length === 0 &&
        mutationEvaluation.errors.length > 0 &&
        mutationEvaluation.failedAssertionIds.includes(mutation.expected_failed_assertion_id)) {
      capacityNegativePathFailClosed += 1;
    } else {
      errors.push(
        `${mutation.mutation_id} did not fail closed on ${mutation.expected_failed_assertion_id}`,
      );
    }
  }
  const capacityProtocolMetrics = {
    ...capacityEvaluation.capacityMetrics,
    synthetic_capacity_negative_path_fail_closed_total: capacityNegativePathFailClosed,
  };
  const expectedCapacityResult = {
    resource_gate_total: capacityProtocolMetrics.synthetic_capacity_resource_gate_total,
    resource_gate_passed: capacityProtocolMetrics.synthetic_capacity_resource_gate_passed,
    project_gate_passed: capacityProtocolMetrics.synthetic_capacity_project_gate_passed,
    negative_path_fail_closed_total:
      capacityProtocolMetrics.synthetic_capacity_negative_path_fail_closed_total,
    minimum_headroom_requests:
      capacityProtocolMetrics.synthetic_capacity_minimum_headroom_requests,
    no_data_to_data_capacity_ratio:
      capacityProtocolMetrics.synthetic_capacity_no_data_to_data_capacity_ratio,
    synthetic_admission_decision: "pass_for_E2_rehearsal_only",
    field_operation_decision: "not_ready_for_field_operation",
  };
  if (!sameJson(capacityEnvelope.expected_result, expectedCapacityResult) ||
      capacityEnvelope.field_replacement_trigger !==
        "Authorized E3 demand and service observations plus E4 operator, accessibility and professional confirmation must replace or reject every synthetic input before Gate 2.") {
    errors.push("Synthetic capacity expected result or field replacement boundary drifted");
  }

  const parityRuleCount = evaluations.reduce((sum, item) => sum + item.parityRuleCount, 0);
  const parityRulePassCount = evaluations.reduce((sum, item) => sum + item.parityRulePassCount, 0);
  const requiredArtifactCount = evaluations.reduce(
    (sum, item) => sum + item.requiredArtifactCount, 0,
  );
  const validArtifactCount = evaluations.reduce((sum, item) => sum + item.validArtifactCount, 0);
  const protocolMetrics = {
    expiring_ticket_synthetic_case_total: rehearsals.length,
    expiring_ticket_synthetic_case_passed: evaluations.filter((item) => item.errors.length === 0).length,
    expiring_ticket_negative_path_fail_closed_total: negativePathFailClosed,
    expiring_ticket_no_data_rule_coverage_ratio:
      parityRuleCount ? parityRulePassCount / parityRuleCount : 0,
    expiring_ticket_conditional_artifact_coverage_ratio:
      requiredArtifactCount ? validArtifactCount / requiredArtifactCount : 0,
    ...capacityProtocolMetrics,
  };
  if (!sameJson((protocol.recalculation_contract || {}).expected_metrics, protocolMetrics)) {
    errors.push("Expiring-ticket recalculation contract metrics drifted from executable results");
  }
  for (const [name, expected] of Object.entries(protocolMetrics)) {
    const metric = metrics[name];
    if (!metric) {
      errors.push(`metrics.json is missing ${name}`);
      continue;
    }
    compareNumber(name, expected, metric.value, errors);
    if (metric.metric_kind !== "synthetic_contract_test" || metric.confidence !== "low" ||
        !Array.isArray(metric.source_files) || !metric.source_files.includes(EXPIRING_TICKET_PATH) ||
        !metric.source_files.includes("visual/assets/evidence-consistency.js")) {
      errors.push(`metrics.json ${name} has an invalid E2 provenance contract`);
    }
  }

  const assumptions = loadJson("assumptions.json").assumptions || [];
  const assumptionIds = assumptions.map((item) => item.id);
  for (const assumptionId of [
    "A-EXPIRING-TICKET-001", "A-EXPIRING-TICKET-THRESHOLDS-001",
    "A-SYNTHETIC-CAPACITY-001",
  ]) {
    if (!assumptionIds.includes(assumptionId)) errors.push(`assumptions.json is missing ${assumptionId}`);
  }
  const compliance = loadJson("compliance_matrix.json").requirements || [];
  for (const requirementId of ["1.5.3.1", "agent.2", "agent.3", "agent.6"]) {
    const requirement = compliance.find((item) => item.requirement_id === requirementId);
    if (!requirement || !requirement.assumption_ids.includes("A-EXPIRING-TICKET-001") ||
        !requirement.metrics.includes("expiring_ticket_synthetic_case_passed")) {
      errors.push(`compliance_matrix.json ${requirementId} is missing the expiring-ticket evidence link`);
    }
  }
  const capacityMetricNames = Object.keys(capacityProtocolMetrics);
  for (const requirementId of ["1.5.2.2", "1.5.2.3", "1.5.3.1", "agent.2", "agent.3", "agent.6"]) {
    const requirement = compliance.find((item) => item.requirement_id === requirementId);
    if (!requirement || !requirement.assumption_ids.includes("A-SYNTHETIC-CAPACITY-001") ||
        capacityMetricNames.some((name) => !requirement.metrics.includes(name))) {
      errors.push(`compliance_matrix.json ${requirementId} is missing the synthetic-capacity evidence link`);
    }
  }

  const zhTokens = [
    "EXPIRING-DATA-TICKET-01", "CASE-NORMAL-EXPIRY-01", "CASE-MIDSTREAM-WITHDRAWAL-01",
    "stopping", "10 / 10", "单节点", "SCN06-C010204-SYNTHETIC-CAPACITY-01",
    "4 / 4", "5 / 5", "无数据专用容量", "not_ready_for_field_operation",
    ...officialThree, ...officialFive,
  ];
  const enTokens = [
    "EXPIRING-DATA-TICKET-01", "CASE-NORMAL-EXPIRY-01", "CASE-MIDSTREAM-WITHDRAWAL-01",
    "stopping", "10 / 10", "single-node", "SCN06-C010204-SYNTHETIC-CAPACITY-01",
    "4 / 4", "5 / 5", "dedicated no-data capacity", "not_ready_for_field_operation",
    "Centennial Jing-Zhang Cultural Belt", "Urban AI Life Experience Belt",
    "AI Integration Innovation Belt", "Full-stack Independent AI Innovation System",
    "World-class AI Innovation Ecosystem", "New AI+ Scenario-Empowerment Paradigm",
    "Vibrant Intelligent AI City", "Global Voice in AI Governance",
  ];
  for (const relative of ["proposal.md", "report/proposal.html", "visual/index.html"]) {
    for (const token of zhTokens) {
      if (!texts[relative].includes(token)) errors.push(`${relative} is missing expiring-ticket token ${token}`);
    }
  }
  for (const relative of ["proposal.en.md", "report/proposal.en.html", "visual/index.en.html"]) {
    for (const token of enTokens) {
      if (!texts[relative].includes(token)) errors.push(`${relative} is missing expiring-ticket token ${token}`);
    }
  }
  for (const relative of [
    "proposal.md", "proposal.en.md", "report/proposal.html", "report/proposal.en.html",
    "visual/index.html", "visual/index.en.html",
  ]) {
    if (texts[relative].includes("P1-07")) {
      errors.push(`${relative} must use stable design language instead of the iteration code P1-07`);
    }
  }
  if (texts["visual/index.html"].includes("同一 canonical 协议跨三处") ||
      texts["visual/index.en.html"].includes("One canonical protocol is explained across")) {
    errors.push("Visual narrative must not imply a cross-node ticket or authority handoff");
  }

  const manifestEntry = (manifest.files || []).find((item) => item.path === EXPIRING_TICKET_PATH);
  const protocolSha256 = crypto.createHash("sha256")
    .update(fs.readFileSync(protocolAbsolute)).digest("hex");
  if (!manifestEntry || manifestEntry.role !== "evidence_data" || manifestEntry.required !== true ||
      manifestEntry.language !== "neutral" || manifestEntry.sha256 !== protocolSha256) {
    errors.push(
      `manifest.json must list ${EXPIRING_TICKET_PATH} as required neutral evidence_data with its actual sha256`,
    );
  }
  return { errors, protocolMetrics };
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

  const expectedMvpScenarioIds = ["SCN-05", "SCN-09", "SCN-10"];
  if (!sameJson(snapshot.dazhongsi_mvp.scenario_ids, expectedMvpScenarioIds)) {
    errors.push(`Dazhongsi MVP scenario order must be ${JSON.stringify(expectedMvpScenarioIds)}`);
  }
  for (const scenarioId of expectedMvpScenarioIds) {
    if (snapshot.dazhongsi_mvp.scenario_points_covered_by_key_area[scenarioId] !== true) {
      errors.push(`${scenarioId} must be covered by provisional key area PROV-KEY-003`);
    }
  }
  const mvpScenarios = snapshot.scenarios.filter((scenario) => expectedMvpScenarioIds.includes(scenario.id));
  if (!sameJson(mvpScenarios.map((scenario) => scenario.mvp_stage), [1, 2, 3])) {
    errors.push("Dazhongsi MVP stages must be ordered 1, 2 and 3");
  }
  for (const scenario of mvpScenarios) {
    if (scenario.key_area_ref !== "PROV-KEY-003" || scenario.mvp_id !== "DAZHONGSI-MVP-01") {
      errors.push(`${scenario.id} is missing the Dazhongsi MVP key-area contract`);
    }
    if (!Array.isArray(scenario.stop_conditions) || scenario.stop_conditions.length < 3) {
      errors.push(`${scenario.id} must declare at least three stop conditions`);
    }
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
    "proposal.md": [...allMarkers, "720,454.219", "13,361.508", "32,739.258", "1,614.218"],
    "proposal.en.md": [...allMarkers, "720,454.219", "13,361.508", "32,739.258", "1,614.218"],
    "report/proposal.html": [...allMarkers, "720,454.219", "13,361.508", "32,739.258", "1,614.218"],
    "report/proposal.en.html": [...allMarkers, "720,454.219", "13,361.508", "32,739.258", "1,614.218"],
    "visual/index.html": ["40,063.344", "20.8953%", "0.8601%", "720,454.219", "13,361.508", "32,739.258", "1,614.218"],
    "visual/index.en.html": ["40,063.344", "20.8953%", "0.8601%", "720,454.219", "13,361.508", "32,739.258", "1,614.218"],
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
    [EXPIRING_TICKET_PATH]: "evidence_data",
  };
  for (const [relative, role] of Object.entries(requiredManifest)) {
    if (listed[relative] !== role) {
      errors.push(`manifest.json must list ${relative} with role=${role}`);
    }
  }
  const expiringTicket = auditExpiringTicket(metrics, texts, manifest);
  errors.push(...expiringTicket.errors);
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
