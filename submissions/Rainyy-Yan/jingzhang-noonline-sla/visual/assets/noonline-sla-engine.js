#!/usr/bin/env node
"use strict";

/*
 * Deterministic offline Noonline SLA evaluator.
 *
 * Reads this submission package only. It does not call external APIs, does not
 * fetch data, and does not treat unverified field conditions as satisfied.
 */

const fs = require("fs");
const path = require("path");
const verificationWorkflow = require("./noonline-sla-field-verification.js");

const STATUSES = { A: 4, B: 3, C: 2, DEGRADED: 1, UNKNOWN: 0 };
const FIELD_ASSUMPTION = "A-MICROCLIMATE-001";
const NODE_ASSUMPTION = "A-NODE-SITING-001";
const SLA_ASSUMPTION = "A-SLA-SPATIAL-EVIDENCE-001";
const PRIVACY_ASSUMPTION = "A-PRIVACY-001";
const BOUNDARY_ASSUMPTION = "A-PROVISIONAL-BOUNDARY-001";

const ROUTES = {
  "SLA-A": {
    route_id: "SLA-A",
    name: "Heritage-park noon spine",
    path_ref: "geometry/roads.geojson#ROAD-001",
    geometry_factor: 1.0,
    target: "A",
    minimum: "B",
    nodes: ["N01", "N02", "N03", "N04", "N05", "N06"],
    conditions: {
      shade_continuity: "conceptual_not_field_verified",
      continuous_exposure: "not_field_verified",
      rest_nodes: ["N02", "N05"],
      water_nodes: ["N02", "N05"],
      public_entries: ["N03"],
      crossing_nodes: ["N04"],
      human_fallback_nodes: ["N02", "N05"],
      summer_detour: "not_field_verified",
      ai_off_static_wayfinding: true
    }
  },
  "SLA-B": {
    route_id: "SLA-B",
    name: "Campus-park transverse access",
    path_ref: "geometry/roads.geojson#ROAD-001+drawing-layer",
    geometry_factor: 0.74,
    target: "B",
    minimum: "C",
    nodes: ["N07", "N08", "N09", "N10"],
    conditions: {
      shade_continuity: "partial_conceptual_not_field_verified",
      continuous_exposure: "not_field_verified",
      rest_nodes: ["N07", "N09"],
      water_nodes: ["N09"],
      public_entries: ["N08"],
      crossing_nodes: ["N07", "N10"],
      human_fallback_nodes: ["N07", "N09"],
      summer_detour: "not_field_verified",
      ai_off_static_wayfinding: true
    }
  },
  "SLA-C": {
    route_id: "SLA-C",
    name: "Station-to-park touchpoints",
    path_ref: "geometry/roads.geojson#ROAD-001+drawing-layer",
    geometry_factor: 0.48,
    target: "C",
    minimum: "C",
    nodes: ["N11", "N12"],
    conditions: {
      shade_continuity: "localized_conceptual_not_field_verified",
      continuous_exposure: "not_field_verified",
      rest_nodes: ["N11"],
      water_nodes: ["N11"],
      public_entries: ["N12"],
      crossing_nodes: ["N11"],
      human_fallback_nodes: ["N11"],
      summer_detour: "not_field_verified",
      ai_off_static_wayfinding: true
    }
  }
};

const FAILURE_CASES = [
  { case_id: "WATER_POINT_FAIL", route: "SLA-A", fail: { water_nodes: ["N02"] } },
  { case_id: "REST_POINT_FAIL", route: "SLA-A", fail: { rest_nodes: ["N05"] } },
  { case_id: "PUBLIC_ENTRY_CLOSED", route: "SLA-B", fail: { public_entries: ["N08"] } },
  { case_id: "PATH_SEGMENT_UNAVAILABLE", route: "SLA-B", fail: { path_unavailable: true } },
  { case_id: "AI_SERVICE_NODE_FAIL", route: "SLA-C", fail: { ai_service_nodes: ["N11"] } },
  { case_id: "ALL_AI_OFF", route: "SLA-A", fail: { all_ai_off: true } },
  {
    case_id: "TWO_CRITICAL_NODES_FAIL",
    route: "SLA-A",
    fail: { water_nodes: ["N02"], human_fallback_nodes: ["N05"] }
  }
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function haversineM(a, b) {
  const toRad = (value) => (value * Math.PI) / 180;
  const lon1 = toRad(a[0]);
  const lat1 = toRad(a[1]);
  const lon2 = toRad(b[0]);
  const lat2 = toRad(b[1]);
  const dLon = lon2 - lon1;
  const dLat = lat2 - lat1;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 6371000.0 * 2 * Math.asin(Math.sqrt(h));
}

function lineLengthM(geometry) {
  if (!geometry || geometry.type !== "LineString") return null;
  const coords = geometry.coordinates || [];
  if (coords.length < 2) return null;
  let total = 0;
  for (let i = 1; i < coords.length; i += 1) {
    total += haversineM(coords[i - 1], coords[i]);
  }
  return total;
}

function byId(items) {
  const out = {};
  for (const item of items || []) {
    if (item && item.id) out[item.id] = item;
  }
  return out;
}

function metricRef(metrics, metricId) {
  const metric = metrics.metrics[metricId];
  if (!metric) return null;
  return {
    metric_id: metricId,
    status: metric.status,
    value: metric.value,
    unit: metric.unit,
    formula: metric.formula,
    confidence: metric.confidence,
    assumptions: metric.assumptions || [],
    source_files: metric.source_files || []
  };
}

function sourceIdsForCondition(condition) {
  if (condition === "ai_off" || condition === "ai_service") {
    return ["DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES", "DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW"];
  }
  if (condition === "public_entries" || condition === "human_fallback_nodes") {
    return ["DATA-SRC-AGENT-TASKBOOK-20260518", "DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW"];
  }
  if (condition === "path_length") {
    return ["DATA-SRC-PROVISIONAL-BOUNDARIES-20260605"];
  }
  return ["DATA-SRC-AGENT-TASKBOOK-20260518"];
}

function evidenceTrace(route, packageData, condition, conditionStatus, nodeIds) {
  const metrics = packageData.metrics;
  const assumptions = packageData.assumptions;
  const sources = packageData.sources;
  const metricIds = ["noon_sla_corridor_count"];
  if (["rest_nodes", "water_nodes", "public_entries", "crossing_nodes", "human_fallback_nodes", "ai_off"].includes(condition)) {
    metricIds.push("noon_service_node_count");
  }
  if (condition === "human_fallback_nodes" || condition === "ai_off") {
    metricIds.push("human_fallback_node_count");
  }
  const assumptionIds = [SLA_ASSUMPTION];
  if (["shade_continuity", "continuous_exposure", "summer_detour", "path_length"].includes(condition)) {
    assumptionIds.push(FIELD_ASSUMPTION);
  }
  if (["rest_nodes", "water_nodes", "public_entries", "crossing_nodes", "human_fallback_nodes"].includes(condition)) {
    assumptionIds.push(NODE_ASSUMPTION);
  }
  if (condition === "ai_off" || condition === "ai_service") {
    assumptionIds.push(PRIVACY_ASSUMPTION);
  }
  if (condition === "path_length") {
    assumptionIds.push(BOUNDARY_ASSUMPTION);
  }
  return {
    route_id: route.route_id,
    path_ref: route.path_ref,
    condition,
    condition_status: conditionStatus,
    node_ids: nodeIds || [],
    metrics: metricIds.map((id) => metricRef(metrics, id)).filter(Boolean),
    assumptions: assumptionIds.map((id) => ({
      id,
      status: assumptions[id] ? assumptions[id].status : "missing",
      statement: assumptions[id] ? assumptions[id].statement : null,
      impact: assumptions[id] ? assumptions[id].impact : null
    })),
    sources: sourceIdsForCondition(condition).map((id) => ({
      id,
      source_type: sources[id] ? sources[id].source_type : null,
      usable_for_formal: sources[id] ? sources[id].usable_for_formal : null,
      usage: sources[id] ? sources[id].usage : null,
      limitations: sources[id] ? sources[id].limitations || sources[id].prohibited_use : null
    })),
    confidence: ["present", "operational", "conceptual_present", "provisional"].includes(conditionStatus) ? "medium" : "low"
  };
}

function removeFailed(items, failed, key) {
  const removed = new Set(Array.isArray(failed[key]) ? failed[key] : []);
  return (items || []).filter((item) => !removed.has(item));
}

function nextLower(status) {
  const order = ["A", "B", "C", "DEGRADED", "UNKNOWN"];
  const index = order.indexOf(status);
  return order[Math.min(index + 1, order.length - 1)];
}

function maxStatusFloor(status, floor) {
  return STATUSES[status] >= STATUSES[floor] ? status : floor;
}

function evaluateRoute(route, packageData, failed = {}) {
  const baseLength = packageData.base_length_m;
  const length = baseLength ? Math.round(baseLength * route.geometry_factor * 10) / 10 : null;
  const conditions = JSON.parse(JSON.stringify(route.conditions));
  const reasons = [];
  const traces = [];
  const blockers = [];
  const warnings = [];
  let facilityFailureDetected = false;

  if (failed.path_unavailable) {
    blockers.push("path_unavailable");
    reasons.push("A path segment is unavailable, so the route cannot keep its normal grade.");
  }
  if (length === null) {
    blockers.push("path_length_unknown");
    reasons.push("Route length cannot be calculated from geometry.");
  } else {
    traces.push(evidenceTrace(route, packageData, "path_length", "provisional", []));
    warnings.push("path_length_provisional_geometry");
  }

  for (const condition of ["shade_continuity", "continuous_exposure", "summer_detour"]) {
    const status = String(conditions[condition]);
    if (status.includes("not_field_verified")) {
      warnings.push(`${condition}_not_field_verified`);
      reasons.push(`${condition} is not field verified and is not counted as fully satisfied.`);
    }
    traces.push(evidenceTrace(route, packageData, condition, "not_field_verified", []));
  }

  const nodeKeys = ["rest_nodes", "water_nodes", "public_entries", "crossing_nodes", "human_fallback_nodes"];
  const remainingNodes = {};
  for (const key of nodeKeys) {
    const failedNodes = Array.isArray(failed[key]) ? failed[key] : [];
    if (failedNodes.length) {
      facilityFailureDetected = true;
      reasons.push(`${key} failure removes ${failedNodes.slice().sort().join(", ")}.`);
    }
    const remaining = removeFailed(conditions[key], failed, key);
    remainingNodes[key] = remaining;
    const status = remaining.length ? "conceptual_present" : "missing";
    if (!remaining.length) {
      blockers.push(`${key}_missing`);
      reasons.push(`${key} missing after failures.`);
    } else {
      warnings.push(`${key}_conceptual_not_field_verified`);
    }
    traces.push(evidenceTrace(route, packageData, key, status, remaining));
  }

  const aiService = failed.all_ai_off ? "off" : failed.ai_service_nodes ? "node_failed" : "available";
  traces.push(evidenceTrace(route, packageData, "ai_service", aiService, failed.ai_service_nodes || []));

  const aiOffPossible =
    Boolean(conditions.ai_off_static_wayfinding) &&
    ["rest_nodes", "water_nodes", "public_entries", "human_fallback_nodes"].every((key) => remainingNodes[key].length);
  if (aiOffPossible) {
    warnings.push("ai_off_possible_with_conceptual_nodes");
    traces.push(evidenceTrace(route, packageData, "ai_off", "operational", remainingNodes.human_fallback_nodes));
  } else {
    blockers.push("ai_off_incomplete");
    reasons.push("AI-off mode is incomplete because one or more physical support conditions are missing.");
    traces.push(evidenceTrace(route, packageData, "ai_off", "missing", remainingNodes.human_fallback_nodes));
  }

  let status = route.target;
  if (route.target === "A" && warnings.some((item) => item.includes("not_field_verified"))) {
    status = "B";
  } else if (route.target === "B" && warnings.length) {
    status = "C";
  }
  if (blockers.length) {
    status = blockers.includes("path_unavailable") || blockers.includes("ai_off_incomplete") || blockers.some((item) => item.endsWith("_missing"))
      ? "DEGRADED"
      : "C";
  }
  if (blockers.includes("path_length_unknown")) {
    status = "UNKNOWN";
  }
  if (facilityFailureDetected && !blockers.length) {
    status = nextLower(status);
    reasons.push("A declared physical support condition failed; the route is downgraded even if backup nodes remain.");
  }
  if (failed.ai_service_nodes && !blockers.length) {
    status = STATUSES[status] <= STATUSES.C ? "DEGRADED" : nextLower(status);
    reasons.push("AI service node failed; public service remains but dynamic support is reduced.");
  }
  if (failed.all_ai_off && !blockers.length) {
    status = maxStatusFloor(status, route.minimum);
    reasons.push("All AI services are off; fixed signs, physical nodes and staff carry the remaining service.");
  }
  if (!reasons.length) {
    reasons.push("Route has conceptual spatial support, but unresolved field verification prevents a higher grade.");
  }

  return {
    route_id: route.route_id,
    name: route.name,
    path_ref: route.path_ref,
    target_grade: route.target,
    status,
    status_vocabulary: Object.keys(STATUSES).sort(),
    length_m: length,
    ai_off_possible: aiOffPossible,
    provisional: warnings.length > 0,
    needs_detour: Boolean(failed.path_unavailable || !remainingNodes.public_entries.length),
    needs_human_fallback: Boolean(blockers.length || facilityFailureDetected || failed.all_ai_off || failed.ai_service_nodes),
    blockers,
    warnings: Array.from(new Set(warnings)).sort(),
    reasons,
    facility_failure_detected: facilityFailureDetected,
    remaining_nodes: remainingNodes,
    field_verification: {
      shade_continuity: "not_field_verified",
      continuous_exposure: "not_field_verified",
      summer_detour: "not_field_verified",
      node_locations: "conceptual_siting_rule_not_field_verified"
    },
    evidence_trace: traces
  };
}

function gradeTransition(original, next) {
  return `${original}->${next}`;
}

function runFailures(normal, packageData) {
  return FAILURE_CASES.map((testCase) => {
    const route = ROUTES[testCase.route];
    const result = evaluateRoute(route, packageData, testCase.fail);
    const original = normal[route.route_id].status;
    return {
      case_id: testCase.case_id,
      route_id: route.route_id,
      original_grade: original,
      new_grade: result.status,
      transition: gradeTransition(original, result.status),
      trigger: testCase.fail,
      reason: result.reasons,
      needs_detour: result.needs_detour,
      needs_human_fallback: result.needs_human_fallback,
      result
    };
  });
}

function runAiOffTest(packageData) {
  const routeResults = {};
  for (const [routeId, route] of Object.entries(ROUTES)) {
    routeResults[routeId] = evaluateRoute(route, packageData, { all_ai_off: true });
  }
  const breakpoints = [];
  const remainingCapacity = [];
  for (const [routeId, result] of Object.entries(routeResults)) {
    if (result.ai_off_possible) {
      remainingCapacity.push({
        route_id: routeId,
        remaining_grade: result.status,
        physical_support: {
          fixed_signage: true,
          physical_route: true,
          seats: result.remaining_nodes.rest_nodes,
          water: result.remaining_nodes.water_nodes,
          public_entries: result.remaining_nodes.public_entries,
          staffed_fallback: result.remaining_nodes.human_fallback_nodes
        }
      });
    } else {
      breakpoints.push({ route_id: routeId, blockers: result.blockers, reasons: result.reasons });
    }
  }
  return {
    test_id: "AI_OFF_TEST",
    passed: breakpoints.length === 0,
    status: breakpoints.length === 0 ? "PASS_WITH_PROVISIONAL_PHYSICAL_NETWORK" : "FAIL",
    remaining_capacity: remainingCapacity,
    breakpoints,
    note: "Synthetic deterministic test based on conceptual submission data; not observed city operations."
  };
}

function buildTraceIndex(normal, failures) {
  const index = {};
  for (const [routeId, result] of Object.entries(normal)) {
    index[`normal:${routeId}`] = result.evidence_trace.map((item) => ({
      route_id: item.route_id,
      condition: item.condition,
      metric_ids: item.metrics.map((metric) => metric.metric_id),
      assumption_ids: item.assumptions.map((assumption) => assumption.id),
      source_ids: item.sources.map((source) => source.id),
      confidence: item.confidence,
      condition_status: item.condition_status,
      node_ids: item.node_ids
    }));
  }
  for (const failure of failures) {
    index[`failure:${failure.case_id}`] = failure.result.evidence_trace.map((item) => ({
      route_id: item.route_id,
      condition: item.condition,
      metric_ids: item.metrics.map((metric) => metric.metric_id),
      assumption_ids: item.assumptions.map((assumption) => assumption.id),
      source_ids: item.sources.map((source) => source.id),
      confidence: item.confidence,
      condition_status: item.condition_status,
      node_ids: item.node_ids
    }));
  }
  return index;
}

function detectInconsistencies(normal) {
  const findings = [];
  if (normal["SLA-A"].status !== "A") {
    findings.push({
      id: "SLA_A_NOT_AUTOMATIC_A",
      proposal_claim: "SLA-A is the main continuous service line.",
      engine_result: normal["SLA-A"].status,
      reason: "Unverified shade/exposure/detour and conceptual node siting prevent automatic A."
    });
  }
  if (Object.values(normal).some((result) => result.warnings.length)) {
    findings.push({
      id: "FIELD_VERIFICATION_REQUIRED",
      proposal_claim: "Noonline SLA can be audited.",
      engine_result: "auditable_but_provisional",
      reason: "The engine can explain and downgrade the network, but field measurement is required before treating conditions as satisfied."
    });
  }
  return findings;
}

function loadPackage(root) {
  const roads = readJson(path.join(root, "geometry", "roads.geojson"));
  const road = roads.features && roads.features[0];
  return {
    root,
    manifest: readJson(path.join(root, "manifest.json")),
    metrics: readJson(path.join(root, "metrics.json")),
    assumptions: byId(readJson(path.join(root, "assumptions.json")).assumptions),
    sources: byId(readJson(path.join(root, "sources.json")).sources),
    roads,
    public_space: readJson(path.join(root, "geometry", "public_space.geojson")),
    base_length_m: road ? lineLengthM(road.geometry) : null
  };
}

function buildReport(root) {
  const packageData = loadPackage(root);
  const normal = {};
  for (const [routeId, route] of Object.entries(ROUTES)) {
    normal[routeId] = evaluateRoute(route, packageData);
  }
  const failures = runFailures(normal, packageData);
  const fieldDataGaps = [
    "shade_continuity_not_field_verified",
    "continuous_exposure_not_field_verified",
    "service_node_locations_not_surveyed",
    "drinking_water_points_not_existing_inventory",
    "seating_points_not_existing_inventory",
    "public_entries_not_access_audited",
    "crossing_waiting_conditions_not_measured",
    "summer_detour_distance_not_field_verified"
  ];
  const verificationLedger = verificationWorkflow.deriveVerificationLedger(ROUTES, fieldDataGaps);
  const promotionGate = verificationWorkflow.promotionGate(verificationLedger);
  const workflowAssertions = verificationWorkflow.runWorkflowAssertions(verificationLedger);
  return {
    schema_version: "0.1.0",
    engine_id: "noonline-sla-engine",
    generated_at: "deterministic_not_timestamped",
    deterministic: true,
    network_basis: {
      submission_dir: "submissions/Rainyy-Yan/jingzhang-noonline-sla",
      geometry_source: "geometry/roads.geojson#ROAD-001",
      metrics_source: "metrics.json",
      assumptions_source: "assumptions.json",
      sources_source: "sources.json",
      synthetic_test_notice: "Failure cases are deterministic offline tests, not real city operation data."
    },
    normal_routes: normal,
    failure_cases: failures,
    ai_off_test: runAiOffTest(packageData),
    evidence_trace_index: buildTraceIndex(normal, failures),
    verification_workflow: {
      ledger_file: "visual/assets/noonline-field-verification-ledger.json",
      field_pack_zh: "visual/index.html#v2-field-verification",
      field_pack_en: "visual/index.en.html#v2-field-verification",
      state_machine: verificationLedger.state_machine,
      ledger: verificationLedger,
      promotion_gate: promotionGate,
      current_sla_explanation: verificationWorkflow.explainCurrentSla(verificationLedger),
      workflow_assertions: workflowAssertions
    },
    inconsistencies: detectInconsistencies(normal),
    query_examples: {
      why_SLA_A_is_B_not_A: {
        route_id: "SLA-A",
        answer_status: normal["SLA-A"].status,
        target_grade: normal["SLA-A"].target_grade,
        machine_readable_reasons: normal["SLA-A"].reasons,
        evidence_conditions: normal["SLA-A"].evidence_trace.map((item) => item.condition)
      }
    },
    field_data_gaps: fieldDataGaps
  };
}

function runAssertions(report) {
  const errors = [];
  const expectedRoutes = { "SLA-A": "B", "SLA-B": "C", "SLA-C": "C" };
  for (const [routeId, expected] of Object.entries(expectedRoutes)) {
    const got = report.normal_routes[routeId].status;
    if (got !== expected) errors.push(`${routeId} expected ${expected}, got ${got}`);
  }
  const expectedCases = {
    WATER_POINT_FAIL: "C",
    REST_POINT_FAIL: "C",
    PUBLIC_ENTRY_CLOSED: "DEGRADED",
    PATH_SEGMENT_UNAVAILABLE: "DEGRADED",
    AI_SERVICE_NODE_FAIL: "DEGRADED",
    ALL_AI_OFF: "B",
    TWO_CRITICAL_NODES_FAIL: "C"
  };
  const cases = Object.fromEntries(report.failure_cases.map((item) => [item.case_id, item]));
  for (const [caseId, expected] of Object.entries(expectedCases)) {
    const got = cases[caseId].new_grade;
    if (got !== expected) errors.push(`${caseId} expected ${expected}, got ${got}`);
  }
  if (!report.ai_off_test.passed) errors.push("AI_OFF_TEST expected pass");
  if (!report.inconsistencies.length) errors.push("Expected at least one provisional consistency finding");
  const workflow = report.verification_workflow;
  if (!workflow || workflow.ledger.summary.total_tasks !== 45) errors.push("Expected exactly 45 derived field-verification tasks");
  if (!workflow || workflow.promotion_gate.promotion !== "blocked") errors.push("Unknown mandatory field evidence must block SLA-A promotion");
  if (!workflow || !workflow.workflow_assertions.ok) errors.push("Field-verification workflow assertions failed");
  return errors;
}

function writeGeneratedFieldPackSection(root, ledger, language, filename) {
  const target = path.join(root, "visual", filename);
  const begin = "<!-- FIELD_VERIFICATION_PACK:BEGIN -->";
  const end = "<!-- FIELD_VERIFICATION_PACK:END -->";
  const current = fs.readFileSync(target, "utf8");
  const start = current.indexOf(begin);
  const finish = current.indexOf(end);
  if (start < 0 || finish < start) {
    throw new Error(`${filename} is missing field-verification template markers`);
  }
  const replacement = `${begin}\n${verificationWorkflow.renderFieldPackSection(ledger, language)}\n${end}`;
  const next = `${current.slice(0, start)}${replacement}${current.slice(finish + end.length)}`;
  fs.writeFileSync(target, next, "utf8");
}

function main() {
  const root = path.resolve(process.argv[2] || path.join(__dirname, "..", ".."));
  const output = path.resolve(process.argv[3] || path.join(root, "visual", "assets", "noonline-sla-report.json"));
  const testOutput = path.join(root, "visual", "assets", "noonline-sla-test-results.json");
  const report = buildReport(root);
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  const ledgerOutput = path.join(root, "visual", "assets", "noonline-field-verification-ledger.json");
  fs.writeFileSync(ledgerOutput, `${JSON.stringify(report.verification_workflow.ledger, null, 2)}\n`, "utf8");
  writeGeneratedFieldPackSection(root, report.verification_workflow.ledger, "zh", "index.html");
  writeGeneratedFieldPackSection(root, report.verification_workflow.ledger, "en", "index.en.html");
  const errors = runAssertions(report);
  const testReport = {
    ok: errors.length === 0,
    engine_id: report.engine_id,
    assertions: "deterministic_expected_results_and_field_verification_workflow",
    field_verification_workflow: report.verification_workflow.workflow_assertions,
    errors,
    output: path.relative(root, output).split(path.sep).join("/")
  };
  fs.writeFileSync(testOutput, `${JSON.stringify(testReport, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify(testReport, null, 2)}\n`);
  return errors.length === 0 ? 0 : 1;
}

if (require.main === module) {
  process.exitCode = main();
}
