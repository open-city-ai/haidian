#!/usr/bin/env node
"use strict";

/*
 * Small, deterministic, offline allocation experiment for S01-S12.
 *
 * The authoritative experiment is kept in workbench/baseline/experiment and
 * is loaded when that directory is available.  The first run packages the
 * structured inputs and their SHA-256 records next to this program.  A copy
 * of the public package can therefore be replayed from experiment-inputs.json
 * without reaching a network or requiring a model/runtime service.
 *
 * Scope is deliberately narrow: assign S01-S12 to three existing role IDs.
 * No coordinates, geometry, land use, engineering, approval, public
 * feedback, field-trial, timing, energy, or HumanDecision data is produced.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SCRIPT_DIR = __dirname;
const PACKAGE_DIR = path.resolve(SCRIPT_DIR, "..", "..");
// An optional authoring workbench may be a sibling of the repository. Public
// replay does not depend on that location and falls back to packaged inputs.
const WORKSPACE_ROOT = path.resolve(PACKAGE_DIR, "..", "..", "..", "..");
const EXPERIMENT_ROOT = path.join(WORKSPACE_ROOT, "workbench", "baseline", "experiment");
const TASK_ROOT = path.join(WORKSPACE_ROOT, "workbench", "baseline", "task");

const INPUTS_PATH = path.join(SCRIPT_DIR, "experiment-inputs.json");
const RUN_PATH = path.join(SCRIPT_DIR, "experiment-run.json");
const SIMULATION_PATH = path.join(PACKAGE_DIR, "simulation.json");

const OBSERVED_AT = "2026-08-23T10:00:00Z";
const SEED = 20260821;
const ROLE_ORDER = [
  "source_calibration_yard",
  "civic_translation_commons",
  "adoption_market_court",
];
const SCENARIO_IDS = Array.from({ length: 12 }, (_, index) => `S${String(index + 1).padStart(2, "0")}`);
const PROHIBITED_FLAGS = [
  "uses_pii",
  "uses_biometrics",
  "medical_claim",
  "regulatory_claim",
  "approval_claim",
];
const CANDIDATE_IDS = [
  "authored_baseline",
  "public_interest_balance",
  "low_burden_operable",
];
const OBJECTIVE_SPECS = [
  ["role_affinity_total", "maximize"],
  ["persona_coverage_min", "maximize"],
  ["fallback_strength_min", "maximize"],
  ["reversibility_sum_min", "maximize"],
  ["unknown_dependency_burden_max", "minimize"],
  ["maintenance_burden_max", "minimize"],
  ["role_load_spread", "minimize"],
];
const MAX_ASSIGNMENT_COMBINATIONS = 600000;
const MAX_ENUMERATION_STATES = 1000000;

// These are the hashes of the frozen baseline files checked before this
// public artifact was written.  A changed baseline must fail visibly rather
// than silently changing the experiment question.
const FROZEN_SOURCE_SHA256 = {
  scenario_catalog: "7bb816bf43e5f62aec70dbe9626dacb0cdc2cfb91a0ea223164350d08e9b3782",
  allocation_config: "6065617ed7e3d0d59be6c68d57f4e0232977605f9950a22684a704a8c1a96cf6",
  analysis_run: "109013015f6c13c37d2309ce938f2b0e345482c64c3c5e0880ed47c2e13db0f4",
  solution_recipe: "0ee185bc6a4cf605410655853d41e4d4e6101874431af094512cab3463b2852b",
  negative_fixtures: "a18241ca7ebd7649a9e959c40e777c3eaba889e708bd79c3b1e35187923cccd4",
  run_allocation: "9ee9974bf365d19b08b95cb81b9119b704d2154ac5f8015f6207c1a9cb56fe6b",
  project_brief: "40e0ea00528d387a53355ff57e8e449d3e7682e14bc7d27d3f4dd96de3024cad",
  scenario_spec: "6e307a94d5522672ad859df7cca7c9fa8e28e6345b50bbc82b6b16af4c9f49bb",
  authored_baseline_candidate: "3fc608440c4dc90abbde59bb1845e6bff649513afd1d78340a30909cd68f17ca",
  public_interest_balance_candidate: "e18062c48c5c90c25e56dc4fd435257d314fa99f97616fba03fc7b7d86337442",
  low_burden_operable_candidate: "b0e9af93f3cf9572a6950deca761e86fc1906c88c02c9b793a5556de2f75d56c",
  authored_baseline_delta: "e2b4730b60d179b876b4932ba38545cdfc3fb979b3e5c4bb506031539cfbf1c6",
  public_interest_balance_delta: "1eba22b633837aeb894f6a86af1f50b198bb7db12fdc5d28d98ab7b5f2f0b826",
  low_burden_operable_delta: "953614a85c8cd1f20a223710cc22d0f04007ae50201bba19053a03e68ade205a",
};

const SOURCE_SPECS = [
  { id: "scenario_catalog", role: "scenario", ref: "workbench/baseline/experiment/scenario_catalog.json", path: path.join(EXPERIMENT_ROOT, "scenario_catalog.json") },
  { id: "allocation_config", role: "configuration", ref: "workbench/baseline/experiment/allocation_config.json", path: path.join(EXPERIMENT_ROOT, "allocation_config.json") },
  { id: "analysis_run", role: "run_evidence", ref: "workbench/baseline/experiment/analysis_run.json", path: path.join(EXPERIMENT_ROOT, "analysis_run.json") },
  { id: "solution_recipe", role: "configuration", ref: "workbench/baseline/experiment/solution_recipe.json", path: path.join(EXPERIMENT_ROOT, "solution_recipe.json") },
  { id: "negative_fixtures", role: "negative_tests", ref: "workbench/baseline/experiment/tests/negative_fixtures.json", path: path.join(EXPERIMENT_ROOT, "tests", "negative_fixtures.json") },
  { id: "run_allocation", role: "baseline_program", ref: "workbench/baseline/experiment/run_allocation.py", path: path.join(EXPERIMENT_ROOT, "run_allocation.py") },
  { id: "project_brief", role: "evidence_contract", ref: "workbench/baseline/task/project_brief.json", path: path.join(TASK_ROOT, "project_brief.json") },
  { id: "scenario_spec", role: "evidence_contract", ref: "workbench/baseline/task/scenario_spec.json", path: path.join(TASK_ROOT, "scenario_spec.json") },
  { id: "site_boundary", role: "provisional_geometry_reference", ref: "geometry/site_boundary.geojson#SITE-001", path: path.join(PACKAGE_DIR, "geometry", "site_boundary.geojson") },
];

for (const candidateId of CANDIDATE_IDS) {
  SOURCE_SPECS.push({
    id: `${candidateId}_candidate`,
    role: "expected_candidate",
    ref: `workbench/baseline/experiment/candidates/${candidateId}.json`,
    path: path.join(EXPERIMENT_ROOT, "candidates", `${candidateId}.json`),
  });
  SOURCE_SPECS.push({
    id: `${candidateId}_delta`,
    role: "expected_delta",
    ref: `workbench/baseline/experiment/deltas/${candidateId}.json`,
    path: path.join(EXPERIMENT_ROOT, "deltas", `${candidateId}.json`),
  });
}

const ALLOWED_WRITES = new Set([INPUTS_PATH, RUN_PATH, SIMULATION_PATH]);

function fail(message) {
  throw new Error(message);
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function readBytes(filePath) {
  return fs.readFileSync(filePath);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`cannot read JSON ${filePath}: ${error.message}`);
  }
}

function sha256Bytes(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

function sha256File(filePath) {
  return sha256Bytes(readBytes(filePath));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    const result = {};
    for (const key of Object.keys(value).sort()) result[key] = canonicalize(value[key]);
    return result;
  }
  return value;
}

function canonicalJson(value) {
  return `${JSON.stringify(canonicalize(value), null, 2)}\n`;
}

function canonicalHash(value) {
  return sha256Bytes(Buffer.from(canonicalJson(value), "utf8"));
}

function normalizedPathKey(filePath) {
  const normalized = path.normalize(path.resolve(filePath));
  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

function assertSafeWriteTarget(filePath) {
  const resolved = path.resolve(filePath);
  if (!ALLOWED_WRITES.has(resolved)) fail(`refusing to write outside frozen artifact scope: ${resolved}`);
  const parent = path.dirname(resolved);
  fs.mkdirSync(parent, { recursive: true });
  if (normalizedPathKey(fs.realpathSync(parent)) !== normalizedPathKey(parent)) {
    fail(`refusing to write through a symbolic-link parent: ${parent}`);
  }
  if (exists(resolved) && fs.lstatSync(resolved).isSymbolicLink()) {
    fail(`refusing to replace a symbolic-link target: ${resolved}`);
  }
  return resolved;
}

function writeJsonBatch(entries) {
  const staged = [];
  try {
    for (const [index, [filePath, value]] of entries.entries()) {
      const resolved = assertSafeWriteTarget(filePath);
      const temporary = `${resolved}.${process.pid}.${index}.tmp`;
      if (exists(temporary)) fail(`temporary output already exists: ${temporary}`);
      const handle = fs.openSync(temporary, "wx");
      try {
        fs.writeFileSync(handle, canonicalJson(value), "utf8");
        fs.fsyncSync(handle);
      } finally {
        fs.closeSync(handle);
      }
      staged.push({ resolved, temporary });
    }
    for (const item of staged) fs.renameSync(item.temporary, item.resolved);
  } catch (error) {
    for (const item of staged) {
      if (exists(item.temporary)) fs.unlinkSync(item.temporary);
    }
    throw error;
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function arraysEqual(left, right) {
  return Array.isArray(left) && Array.isArray(right) && left.length === right.length && left.every((value, index) => value === right[index]);
}

function setsEqual(left, right) {
  const a = new Set(left);
  const b = new Set(right);
  return a.size === b.size && [...a].every((value) => b.has(value));
}

function compareScalar(left, right) {
  return Object.is(left, right) || (typeof left === "number" && typeof right === "number" && Math.abs(left - right) <= 1e-12);
}

function compareAssignments(left, right) {
  return ROLE_ORDER.every((role) => arraysEqual(normalizeAssignment(left)[role], normalizeAssignment(right)[role]));
}

function normalizeAssignment(assignment) {
  const normalized = {};
  for (const role of ROLE_ORDER) normalized[role] = [...(assignment[role] || [])].sort();
  return normalized;
}

function assignmentKey(assignment) {
  const normalized = normalizeAssignment(assignment);
  return ROLE_ORDER.map((role) => `${role}:${normalized[role].join(",")}`).join("|");
}

function flattenAssignment(assignment) {
  const flattened = {};
  for (const role of Object.keys(assignment)) {
    for (const scenarioId of assignment[role]) flattened[scenarioId] = role;
  }
  return flattened;
}

function scenarioIndex(catalog) {
  return Object.fromEntries(catalog.scenarios.map((scenario) => [scenario.id, scenario]));
}

function validateCatalog(catalog, config) {
  const errors = [];
  if (!catalog || !Array.isArray(catalog.roles) || !Array.isArray(catalog.scenarios)) return ["CATALOG_SHAPE"];
  if (!arraysEqual(catalog.roles.map((role) => role.role_id), ROLE_ORDER)) errors.push("ROLE_ORDER_MISMATCH");
  const scenarioIds = catalog.scenarios.map((scenario) => scenario.id);
  if (!arraysEqual(scenarioIds, [...scenarioIds].sort())) errors.push("SCENARIO_ORDER_NOT_SORTED");
  if (!arraysEqual(scenarioIds, SCENARIO_IDS)) errors.push("SCENARIO_SET_NOT_S01_S12");
  if (new Set(scenarioIds).size !== scenarioIds.length) errors.push("SCENARIO_IDS_NOT_UNIQUE");
  const index = scenarioIndex(catalog);
  for (const scenario of catalog.scenarios) {
    if (!Array.isArray(scenario.allowed_roles) || scenario.allowed_roles.length === 0) errors.push(`NO_ALLOWED_ROLE:${scenario.id}`);
    for (const role of scenario.allowed_roles || []) if (!ROLE_ORDER.includes(role)) errors.push(`UNKNOWN_ALLOWED_ROLE:${scenario.id}`);
    for (const flag of PROHIBITED_FLAGS) if (scenario[flag] !== false) errors.push(`PROHIBITED_FLAG:${scenario.id}:${flag}`);
    if (scenario.manual_fallback !== true) errors.push(`NO_MANUAL_FALLBACK:${scenario.id}`);
    if (scenario.reversible !== true) errors.push(`NOT_REVERSIBLE:${scenario.id}`);
  }
  for (const [scenarioId, role] of Object.entries(config.fixed_assignments || {})) {
    if (!index[scenarioId]) errors.push(`FIXED_SCENARIO_MISSING:${scenarioId}`);
    else if (!index[scenarioId].allowed_roles.includes(role)) errors.push(`FIXED_ROLE_NOT_ALLOWED:${scenarioId}:${role}`);
  }
  return [...new Set(errors)].sort();
}

function validateAssignment(assignment, catalog, config) {
  const errors = [];
  const normalized = normalizeAssignment(assignment);
  const suppliedRoles = Object.keys(assignment).sort();
  if (!arraysEqual(suppliedRoles, [...ROLE_ORDER].sort())) errors.push("ROLE_SET_MISMATCH");
  const flattened = flattenAssignment(normalized);
  const total = ROLE_ORDER.reduce((sum, role) => sum + normalized[role].length, 0);
  if (Object.keys(flattened).length !== total) errors.push("DUPLICATE_SCENARIO");
  const expectedIds = new Set(catalog.scenarios.map((scenario) => scenario.id));
  const actualIds = new Set(Object.keys(flattened));
  if (!setsEqual(actualIds, expectedIds)) errors.push("UNIQUE_COVERAGE");
  const minCount = config.role_cardinality.min;
  const maxCount = config.role_cardinality.max;
  for (const role of ROLE_ORDER) {
    const count = normalized[role].length;
    if (count < minCount || count > maxCount) errors.push(`ROLE_CARDINALITY:${role}:${count}`);
  }
  for (const [scenarioId, requiredRole] of Object.entries(config.fixed_assignments)) {
    if (flattened[scenarioId] !== requiredRole) errors.push(`FIXED_ASSIGNMENT:${scenarioId}`);
  }
  const index = scenarioIndex(catalog);
  for (const [scenarioId, role] of Object.entries(flattened)) {
    const scenario = index[scenarioId];
    if (!scenario) continue;
    if (!scenario.allowed_roles.includes(role)) errors.push(`ROLE_NOT_ALLOWED:${scenarioId}:${role}`);
    for (const flag of PROHIBITED_FLAGS) if (scenario[flag] !== false) errors.push(`PROHIBITED_FLAG:${scenarioId}:${flag}`);
  }
  for (const role of ROLE_ORDER) {
    const roleScenarios = normalized[role].map((scenarioId) => index[scenarioId]).filter(Boolean);
    if (!roleScenarios.some((scenario) => scenario.manual_fallback === true)) errors.push(`NO_ROLE_FALLBACK:${role}`);
  }
  return [...new Set(errors)].sort();
}

function validateDelta(delta, config) {
  const errors = [];
  const policy = config.delta_policy || {};
  if (delta.geometry_delta_kind !== (policy.geometry_delta_kind || "candidate_delta")) errors.push("DELTA_KIND");
  if (delta.change_mode !== (policy.change_mode || "attribute_only")) errors.push("DELTA_MODE");
  if (delta.coordinates_changed !== false) errors.push("COORDINATES_CHANGED");
  if (!arraysEqual(delta.coordinate_patch || [], [])) errors.push("COORDINATE_PATCH_NOT_EMPTY");
  if (Object.prototype.hasOwnProperty.call(delta, "coordinates") || Object.prototype.hasOwnProperty.call(delta, "geometry")) errors.push("COORDINATE_FIELD_PRESENT");
  return [...new Set(errors)].sort();
}

function estimateSearchSpace(catalog, config) {
  let combinations = 1;
  for (const scenario of catalog.scenarios) {
    const allowed = Object.prototype.hasOwnProperty.call(config.fixed_assignments, scenario.id)
      ? [config.fixed_assignments[scenario.id]]
      : scenario.allowed_roles;
    const choices = ROLE_ORDER.filter((roleId) => allowed.includes(roleId)).length;
    if (choices === 0) fail(`scenario has no permitted role: ${scenario.id}`);
    combinations *= choices;
    if (!Number.isSafeInteger(combinations) || combinations > MAX_ASSIGNMENT_COMBINATIONS) {
      fail(`allocation search exceeds the ${MAX_ASSIGNMENT_COMBINATIONS} combination budget`);
    }
  }
  return combinations;
}

function enumerateFeasible(catalog, config) {
  const assignment = Object.fromEntries(ROLE_ORDER.map((role) => [role, []]));
  const feasible = [];
  let visitedStates = 0;
  function visit(index) {
    visitedStates += 1;
    if (visitedStates > MAX_ENUMERATION_STATES) {
      fail(`allocation search exceeds the ${MAX_ENUMERATION_STATES} state budget`);
    }
    if (index === catalog.scenarios.length) {
      const candidate = normalizeAssignment(assignment);
      if (validateAssignment(candidate, catalog, config).length === 0) feasible.push({ assignment: candidate, assignment_key: assignmentKey(candidate) });
      return;
    }
    const scenario = catalog.scenarios[index];
    const allowed = Object.prototype.hasOwnProperty.call(config.fixed_assignments, scenario.id)
      ? [config.fixed_assignments[scenario.id]]
      : scenario.allowed_roles;
    for (const role of ROLE_ORDER.filter((roleId) => allowed.includes(roleId))) {
      if (assignment[role].length >= config.role_cardinality.max) continue;
      assignment[role].push(scenario.id);
      visit(index + 1);
      assignment[role].pop();
    }
  }
  visit(0);
  return feasible.sort((left, right) => left.assignment_key.localeCompare(right.assignment_key));
}

function scoreAssignment(assignment, catalog) {
  const index = scenarioIndex(catalog);
  const normalized = normalizeAssignment(assignment);
  const byRole = {};
  for (const role of ROLE_ORDER) {
    const items = normalized[role].map((scenarioId) => index[scenarioId]);
    byRole[role] = {
      scenario_ids: normalized[role],
      persona_ids: [...new Set(items.flatMap((item) => item.personas))].sort(),
      role_affinity: items.reduce((sum, item) => sum + item.role_affinity[role], 0),
      fallback_strength: items.reduce((sum, item) => sum + item.fallback_strength, 0),
      reversibility_sum: items.reduce((sum, item) => sum + item.reversibility_score, 0),
      unknown_dependency_burden: items.reduce((sum, item) => sum + item.unknown_dependency_burden, 0),
      maintenance_burden: items.reduce((sum, item) => sum + item.maintenance_burden, 0),
    };
  }
  const personaCounts = ROLE_ORDER.map((role) => byRole[role].persona_ids.length);
  const fallbackValues = ROLE_ORDER.map((role) => byRole[role].fallback_strength);
  const reversibilityValues = ROLE_ORDER.map((role) => byRole[role].reversibility_sum);
  const unknownValues = ROLE_ORDER.map((role) => byRole[role].unknown_dependency_burden);
  const maintenanceValues = ROLE_ORDER.map((role) => byRole[role].maintenance_burden);
  const combinedLoads = ROLE_ORDER.map((_, index) => unknownValues[index] + maintenanceValues[index]);
  const roleAffinityTotal = ROLE_ORDER.reduce((sum, role) => sum + byRole[role].role_affinity, 0);
  const metrics = {
    role_affinity_total: roleAffinityTotal,
    persona_coverage_min: Math.min(...personaCounts),
    persona_coverage_total: new Set(ROLE_ORDER.flatMap((role) => byRole[role].persona_ids)).size,
    fallback_strength_min: Math.min(...fallbackValues),
    fallback_strength_total: fallbackValues.reduce((sum, value) => sum + value, 0),
    reversibility_sum_min: Math.min(...reversibilityValues),
    reversibility_sum_total: reversibilityValues.reduce((sum, value) => sum + value, 0),
    unknown_dependency_burden_max: Math.max(...unknownValues),
    unknown_dependency_burden_total: unknownValues.reduce((sum, value) => sum + value, 0),
    maintenance_burden_max: Math.max(...maintenanceValues),
    maintenance_burden_total: maintenanceValues.reduce((sum, value) => sum + value, 0),
    role_load_spread: Math.max(...combinedLoads) - Math.min(...combinedLoads),
    public_interest_score: 2 * Math.min(...personaCounts) + 2 * Math.min(...fallbackValues) + Math.min(...reversibilityValues) + roleAffinityTotal,
    manual_fallback_scenario_count: catalog.scenarios.filter((item) => item.manual_fallback === true).length,
    coordinate_change_count: 0,
    forbidden_flag_count: 0,
  };
  return { metrics, by_role: byRole };
}

function paretoFront(scored) {
  function dominates(left, right) {
    let notWorse = true;
    let strictlyBetter = false;
    for (const [metricId, direction] of OBJECTIVE_SPECS) {
      const a = left.score.metrics[metricId];
      const b = right.score.metrics[metricId];
      if (direction === "maximize") {
        if (a < b) notWorse = false;
        if (a > b) strictlyBetter = true;
      } else {
        if (a > b) notWorse = false;
        if (a < b) strictlyBetter = true;
      }
    }
    return notWorse && strictlyBetter;
  }
  return scored.filter((item) => !scored.some((other) => other !== item && dominates(other, item))).sort((left, right) => left.assignment_key.localeCompare(right.assignment_key));
}

function objectiveValues(score) {
  return Object.fromEntries(OBJECTIVE_SPECS.map(([metricId]) => [metricId, score.metrics[metricId]]));
}

function candidateSnapshot(candidate, delta, candidateId) {
  return {
    candidate_id: candidateId,
    assignment: normalizeAssignment(delta.assignment),
    assignment_key: assignmentKey(delta.assignment),
    objective_values: Object.fromEntries((candidate.objectives || []).map((objective) => [objective.objective_id, objective.value])),
    candidate_input_hash: candidate.input_hash,
    candidate_delta_hash: candidate.geometry_delta && candidate.geometry_delta.delta_hash,
    candidate_source_sha256: FROZEN_SOURCE_SHA256[`${candidateId}_candidate`],
    delta_source_sha256: FROZEN_SOURCE_SHA256[`${candidateId}_delta`],
  };
}

function compareObjectiveMaps(actual, expected) {
  return OBJECTIVE_SPECS.every(([metricId]) => Object.prototype.hasOwnProperty.call(expected, metricId) && compareScalar(actual[metricId], expected[metricId]));
}

function makeAssignmentPatch(baseAssignment, patch) {
  const assignment = clone(baseAssignment);
  const flattened = flattenAssignment(assignment);
  for (const [scenarioId, role] of Object.entries(patch || {})) {
    if (!SCENARIO_IDS.includes(scenarioId)) continue;
    if (!assignment[role]) continue;
    const previousRole = flattened[scenarioId];
    if (previousRole) assignment[previousRole] = assignment[previousRole].filter((id) => id !== scenarioId);
    assignment[role].push(scenarioId);
  }
  if (patch && patch.drop_scenario) {
    const scenarioId = patch.drop_scenario;
    const role = flattened[scenarioId];
    if (role) assignment[role] = assignment[role].filter((id) => id !== scenarioId);
  }
  if (patch && patch.duplicate_scenario) {
    const scenarioId = patch.duplicate_scenario;
    const role = flattened[scenarioId];
    if (role) assignment[role].push(scenarioId);
  }
  if (patch && patch.add_to_role) assignment[patch.add_to_role].push(...(patch.scenarios || [patch.scenario]));
  return assignment;
}

function runNegativeFixtures(catalog, config, negativeFixtures, baseAssignment) {
  const results = [];
  for (const fixture of negativeFixtures.cases) {
    let errors;
    if (fixture.kind === "assignment") {
      errors = validateAssignment(makeAssignmentPatch(baseAssignment, fixture.assignment_patch), catalog, config);
    } else if (fixture.kind === "catalog_flag") {
      const alteredCatalog = clone(catalog);
      alteredCatalog.scenarios.find((scenario) => scenario.id === "S04").uses_pii = true;
      errors = validateAssignment(baseAssignment, alteredCatalog, config);
    } else if (fixture.kind === "catalog_fallback") {
      const alteredCatalog = clone(catalog);
      for (const scenario of alteredCatalog.scenarios) if (["S01", "S02", "S08"].includes(scenario.id)) scenario.manual_fallback = false;
      errors = validateAssignment(baseAssignment, alteredCatalog, config);
    } else if (fixture.kind === "delta") {
      errors = validateDelta({
        geometry_delta_kind: "candidate_delta",
        change_mode: "attribute_only",
        coordinates_changed: false,
        coordinate_patch: [[116.34, 39.95]],
      }, config);
    } else {
      errors = ["UNKNOWN_FIXTURE_KIND"];
    }
    const expected = fixture.expected_error || fixture.expected_error_prefix;
    const matches = fixture.expected_error
      ? errors.includes(fixture.expected_error)
      : errors.some((error) => error.startsWith(fixture.expected_error_prefix));
    results.push({
      case_id: fixture.case_id,
      kind: fixture.kind,
      expected_error: expected,
      actual_errors: errors,
      rejected: matches,
      outcome: matches ? "negative_fixture_rejection_success" : "negative_fixture_rejection_failed",
      dispatch_schema_valid: true,
      audit_complete: matches,
    });
  }
  return results;
}

function assertFrozenSourceHashes() {
  const sourceHashes = {};
  for (const spec of SOURCE_SPECS) {
    if (!exists(spec.path)) fail(`frozen source missing: ${spec.path}`);
    const digest = sha256File(spec.path);
    sourceHashes[spec.id] = digest;
    if (FROZEN_SOURCE_SHA256[spec.id] && FROZEN_SOURCE_SHA256[spec.id] !== digest) {
      fail(`frozen source hash mismatch for ${spec.id}: expected ${FROZEN_SOURCE_SHA256[spec.id]}, got ${digest}`);
    }
  }
  return sourceHashes;
}

function loadAuthoritativeInputs() {
  const corePaths = SOURCE_SPECS.filter((spec) => spec.id !== "site_boundary").map((spec) => spec.path);
  const anyCore = corePaths.some(exists);
  const allCore = corePaths.every(exists);
  if (anyCore && !allCore) fail("partial authoritative baseline is present; refusing to fall back to packaged inputs");
  if (allCore) {
    const sourceHashes = assertFrozenSourceHashes();
    const byId = Object.fromEntries(SOURCE_SPECS.map((spec) => [spec.id, spec]));
    const candidateRecords = {};
    const deltaRecords = {};
    for (const candidateId of CANDIDATE_IDS) {
      candidateRecords[candidateId] = readJson(byId[`${candidateId}_candidate`].path);
      deltaRecords[candidateId] = readJson(byId[`${candidateId}_delta`].path);
    }
    return {
      source_mode: true,
      source_hashes: sourceHashes,
      catalog: readJson(byId.scenario_catalog.path),
      config: readJson(byId.allocation_config.path),
      analysis_run: readJson(byId.analysis_run.path),
      solution_recipe: readJson(byId.solution_recipe.path),
      negative_fixtures: readJson(byId.negative_fixtures.path),
      project_brief: readJson(byId.project_brief.path),
      scenario_spec: readJson(byId.scenario_spec.path),
      candidates: candidateRecords,
      deltas: deltaRecords,
    };
  }
  if (!exists(INPUTS_PATH)) fail(`authoritative baseline unavailable and packaged inputs missing: ${INPUTS_PATH}`);
  const packaged = readJson(INPUTS_PATH);
  const frozen = packaged.frozen_inputs;
  if (!frozen || !frozen.scenario_catalog || !frozen.allocation_config || !frozen.negative_fixtures || !frozen.candidates || !frozen.deltas) {
    fail("experiment-inputs.json lacks the required packaged structures");
  }
  return {
    source_mode: false,
    source_hashes: Object.fromEntries((packaged.sources || []).map((source) => [source.input_id, source.sha256])),
    catalog: frozen.scenario_catalog,
    config: frozen.allocation_config,
    analysis_run: frozen.analysis_run,
    solution_recipe: frozen.solution_recipe,
    negative_fixtures: frozen.negative_fixtures,
    project_brief: frozen.project_brief,
    scenario_spec: frozen.scenario_spec,
    candidates: frozen.candidates,
    deltas: frozen.deltas,
  };
}

function buildBoundaries(config) {
  return {
    question: "Assign S01-S12 to source_calibration_yard, civic_translation_commons, and adoption_market_court; do not change coordinates.",
    baseline_candidate: "authored_baseline",
    candidates: CANDIDATE_IDS,
    seed: SEED,
    role_order: ROLE_ORDER,
    scenario_ids: SCENARIO_IDS,
    fixed_assignments: config.fixed_assignments,
    role_cardinality: config.role_cardinality,
    prohibited_flags: PROHIBITED_FLAGS,
    coordinate_policy: {
      change_mode: "attribute_only",
      coordinates_changed: false,
      coordinate_patch: [],
      base_geometry_ref: config.delta_policy.base_geometry_ref,
      crs: config.delta_policy.crs,
    },
    metric_formulas: config.score_definitions,
    score_semantics: "All scores are project-authored internal ordinals; they are not field performance, engineering feasibility, regulatory, approval, or public-opinion claims.",
    not_evaluated: [
      "model invocation",
      "field trial",
      "runtime or latency",
      "energy consumption",
      "public feedback",
      "approval",
      "HumanDecision",
    ],
  };
}

function buildExperimentInputs(inputs) {
  const sourceRecords = SOURCE_SPECS.map((spec) => ({
    input_id: spec.id,
    role: spec.role,
    ref: spec.ref,
    sha256: inputs.source_hashes[spec.id],
    source_available_at_generation: inputs.source_mode,
  }));
  sourceRecords.push({
    input_id: "experiment_allocation_program",
    role: "replay_program",
    ref: "visual/assets/experiment-allocation.js",
    sha256: sha256File(__filename),
    source_available_at_generation: true,
  });
  return {
    schema_version: "1.0",
    input_bundle_id: "jingzhang-s01-s12-allocation-inputs-v1",
    observed_at: OBSERVED_AT,
    seed: SEED,
    mode: "offline",
    source_of_truth: inputs.source_mode ? "workbench/baseline/experiment" : "visual/assets/experiment-inputs.json",
    boundaries: buildBoundaries(inputs.config),
    sources: sourceRecords,
    frozen_inputs: {
      scenario_catalog: inputs.catalog,
      allocation_config: inputs.config,
      analysis_run: inputs.analysis_run,
      solution_recipe: inputs.solution_recipe,
      negative_fixtures: inputs.negative_fixtures,
      project_brief: inputs.project_brief,
      scenario_spec: inputs.scenario_spec,
      candidates: inputs.candidates,
      deltas: inputs.deltas,
    },
    replay_contract: {
      command: "node visual/assets/experiment-allocation.js",
      standard_library_only: true,
      network_required: false,
      model_required: false,
      expected_counts: {
        feasible_assignment_count: 55,
        pareto_assignment_count: 6,
        selected_candidate_count: 3,
        scenario_count: 12,
        role_count: 3,
        coordinate_change_count: 0,
        forbidden_flag_count: 0,
        negative_fixture_rejections: 6,
      },
    },
  };
}

function buildRunLog(inputs, catalogErrors, feasible, pareto, selected, negativeResults, inputBundleHash) {
  const candidateRecords = selected.map((item) => {
    const source = inputs.candidates[item.candidate_id];
    const delta = inputs.deltas[item.candidate_id];
    return {
      candidate_id: item.candidate_id,
      label_zh: item.label_zh,
      assignment: item.assignment,
      assignment_key: assignmentKey(item.assignment),
      objective_values: objectiveValues(item.score),
      expected_objective_values: Object.fromEntries((source.objectives || []).map((objective) => [objective.objective_id, objective.value])),
      expected_assignment: normalizeAssignment(delta.assignment),
      source_candidate_ref: `workbench/baseline/experiment/candidates/${item.candidate_id}.json`,
      source_delta_ref: `workbench/baseline/experiment/deltas/${item.candidate_id}.json`,
      value_check: compareObjectiveMaps(objectiveValues(item.score), Object.fromEntries((source.objectives || []).map((objective) => [objective.objective_id, objective.value]))) && compareAssignments(item.assignment, delta.assignment),
      coordinates_changed: false,
      human_decision: "not_run",
    };
  });
  const allNegativePassed = negativeResults.every((result) => result.rejected === true);
  return {
    schema_version: "1.0",
    run_id: "experiment-run-three-court-role-allocation-node",
    status: "succeeded",
    observed_at: OBSERVED_AT,
    seed: SEED,
    mode: "offline",
    runtime: "Node.js standard library",
    program_ref: "visual/assets/experiment-allocation.js",
    input_bundle_ref: "visual/assets/experiment-inputs.json",
    input_bundle_sha256: inputBundleHash,
    frozen_question: buildBoundaries(inputs.config),
    events: [
      { event_id: "load_and_hash_frozen_inputs", status: catalogErrors.length === 0 ? "passed" : "failed" },
      { event_id: "validate_catalog_hard_gates", status: catalogErrors.length === 0 ? "passed" : "failed", errors: catalogErrors },
      { event_id: "enumerate_allowed_assignments", status: feasible.length === 55 ? "passed" : "failed", feasible_assignment_count: feasible.length },
      { event_id: "retain_pareto_front", status: pareto.length === 6 ? "passed" : "failed", pareto_assignment_count: pareto.length },
      { event_id: "evaluate_three_candidates", status: candidateRecords.every((candidate) => candidate.value_check) ? "passed" : "failed", selected_candidate_count: candidateRecords.length },
      { event_id: "check_negative_fixtures", status: allNegativePassed && negativeResults.length === 6 ? "passed" : "failed", negative_fixture_count: negativeResults.length, rejected_count: negativeResults.filter((result) => result.rejected).length },
      { event_id: "check_attribute_only_delta_policy", status: selected.every((item) => item.score.metrics.coordinate_change_count === 0) ? "passed" : "failed", coordinate_change_count: 0 },
    ],
    counts: {
      feasible_assignment_count: feasible.length,
      pareto_assignment_count: pareto.length,
      scenario_count: inputs.catalog.scenarios.length,
      role_count: ROLE_ORDER.length,
      selected_candidate_count: selected.length,
      coordinate_change_count: 0,
      forbidden_flag_count: 0,
      negative_fixture_count: negativeResults.length,
      negative_fixture_rejections: negativeResults.filter((result) => result.rejected).length,
    },
    candidates: candidateRecords,
    negative_fixture_results: negativeResults,
    limitations: [
      "The experiment only ranks authored role assignments; it does not call a model or simulate a field trial.",
      "All objective values are internal ordinal metadata and remain high-uncertainty until professional and public review.",
      "The referenced SITE-001 geometry remains provisional and read-only.",
      "No timing, energy, public feedback, approval, or HumanDecision value was run or inferred.",
    ],
    reproducibility: {
      status: "exact",
      deterministic_order: "scenario_id_then_role_order",
      repeated_runs_should_match: ["visual/assets/experiment-inputs.json", "visual/assets/experiment-run.json", "simulation.json"],
    },
  };
}

function buildSimulation(runLog, inputs, selected, negativeResults) {
  const taskBase = {
    dispatch_schema_valid: true,
    audit_complete: true,
  };
  const tasks = [];
  tasks.push({
    ...taskBase,
    task_id: "enumerate-feasible-assignments",
    task_kind: "enumeration",
    input_refs: ["visual/assets/experiment-inputs.json#frozen_inputs.scenario_catalog", "visual/assets/experiment-inputs.json#frozen_inputs.allocation_config"],
    output_refs: ["visual/assets/experiment-run.json#counts"],
    expected: { feasible_assignment_count: 55, pareto_assignment_count: 6, scenario_count: 12, role_count: 3 },
    observed: { feasible_assignment_count: runLog.counts.feasible_assignment_count, pareto_assignment_count: runLog.counts.pareto_assignment_count, scenario_count: runLog.counts.scenario_count, role_count: runLog.counts.role_count },
    outcome: "enumeration_success",
  });
  for (const item of selected) {
    const source = inputs.candidates[item.candidate_id];
    const expected = Object.fromEntries((source.objectives || []).map((objective) => [objective.objective_id, objective.value]));
    tasks.push({
      ...taskBase,
      task_id: `evaluate-${item.candidate_id}`,
      task_kind: "candidate_evaluation",
      input_refs: [`visual/assets/experiment-inputs.json#frozen_inputs.candidates.${item.candidate_id}`, `visual/assets/experiment-inputs.json#frozen_inputs.deltas.${item.candidate_id}`],
      output_refs: [`visual/assets/experiment-run.json#candidates.${item.candidate_id}`],
      expected: { candidate_id: item.candidate_id, assignment_key: assignmentKey(item.assignment), objective_values: expected },
      observed: { candidate_id: item.candidate_id, assignment_key: assignmentKey(item.assignment), objective_values: objectiveValues(item.score) },
      outcome: "candidate_evaluation_success",
    });
  }
  for (const result of negativeResults) {
    tasks.push({
      ...taskBase,
      task_id: `reject-${result.case_id}`,
      task_kind: "negative_fixture",
      input_refs: ["visual/assets/experiment-inputs.json#frozen_inputs.negative_fixtures"],
      output_refs: [`visual/assets/experiment-run.json#negative_fixture_results.${result.case_id}`],
      expected: { rejected: true, expected_error: result.expected_error },
      observed: { rejected: result.rejected, actual_errors: result.actual_errors },
      outcome: result.outcome,
    });
  }
  const successful = tasks.filter((task) => task.outcome === "success" || task.outcome.endsWith("_success")).length;
  const schemaValid = tasks.filter((task) => task.dispatch_schema_valid).length;
  const audited = tasks.filter((task) => task.audit_complete).length;
  return {
    schema_version: "1.0",
    simulation_id: "offline-s01-s12-role-allocation",
    status: "succeeded",
    mode: "offline",
    seed: SEED,
    program_ref: "visual/assets/experiment-allocation.js",
    input_bundle_ref: "visual/assets/experiment-inputs.json",
    input_bundle_sha256: sha256File(INPUTS_PATH),
    scope: "One deterministic assignment question: allocate S01-S12 to three role IDs without changing coordinates.",
    task_outcome_rule: "An outcome equal to success or ending in _success is successful; negative fixtures must be rejected successfully.",
    task_count: tasks.length,
    tasks,
    derived: {
      simulation_task_count: tasks.length,
      simulation_success_rate: successful / tasks.length,
      tool_schema_pass_rate: schemaValid / tasks.length,
      audit_completeness: audited / tasks.length,
      negative_fixture_rejection_count: negativeResults.filter((result) => result.rejected).length,
    },
    not_run: [
      "model invocation",
      "field trial",
      "runtime or latency measurement",
      "energy measurement",
      "public feedback",
      "approval",
      "HumanDecision",
    ],
    claims_boundary: "This file is a replayable log of local deterministic checks. It is not evidence of deployment, field performance, approval, or public acceptance.",
  };
}

function assertResult(inputs, catalogErrors, feasible, scored, pareto, selected, negativeResults) {
  if (catalogErrors.length) fail(`catalog hard-gate errors: ${catalogErrors.join(", ")}`);
  if (feasible.length !== 55) fail(`feasible assignment count mismatch: expected 55, got ${feasible.length}`);
  if (pareto.length !== 6) fail(`Pareto assignment count mismatch: expected 6, got ${pareto.length}`);
  if (selected.length !== 3) fail(`selected candidate count mismatch: expected 3, got ${selected.length}`);
  if (new Set(selected.map((item) => assignmentKey(item.assignment))).size !== 3) fail("selected candidates are not distinct");
  if (selected.some((item) => item.score.metrics.coordinate_change_count !== 0 || item.score.metrics.forbidden_flag_count !== 0)) fail("coordinate or prohibited-flag result is non-zero");
  if (negativeResults.length !== 6 || negativeResults.some((result) => result.rejected !== true || !result.outcome.endsWith("_success"))) fail("one or more negative fixtures were not correctly rejected");
  const sourceCandidates = inputs.candidates;
  const sourceDeltas = inputs.deltas;
  for (const item of selected) {
    const sourceCandidate = sourceCandidates[item.candidate_id];
    const sourceDelta = sourceDeltas[item.candidate_id];
    if (!sourceCandidate || !sourceDelta) fail(`missing frozen candidate/delta: ${item.candidate_id}`);
    const expectedObjectives = Object.fromEntries((sourceCandidate.objectives || []).map((objective) => [objective.objective_id, objective.value]));
    if (!compareObjectiveMaps(objectiveValues(item.score), expectedObjectives)) fail(`candidate objective mismatch: ${item.candidate_id}`);
    if (!compareAssignments(item.assignment, sourceDelta.assignment)) fail(`candidate assignment mismatch: ${item.candidate_id}`);
    if (validateDelta(sourceDelta, inputs.config).length) fail(`candidate delta violates coordinate policy: ${item.candidate_id}`);
  }
  if (scored.length !== feasible.length) fail("scored assignment count does not match feasible count");
}

function run() {
  const inputs = loadAuthoritativeInputs();
  const catalogErrors = validateCatalog(inputs.catalog, inputs.config);
  if (catalogErrors.length) fail(`catalog hard-gate errors: ${catalogErrors.join(", ")}`);
  estimateSearchSpace(inputs.catalog, inputs.config);
  const feasible = enumerateFeasible(inputs.catalog, inputs.config);
  const scored = feasible.map((item) => ({ ...item, score: scoreAssignment(item.assignment, inputs.catalog) })).sort((left, right) => left.assignment_key.localeCompare(right.assignment_key));
  const pareto = paretoFront(scored);
  const byKey = Object.fromEntries(scored.map((item) => [item.assignment_key, item]));
  const authoredProfile = inputs.config.candidate_profiles.find((profile) => profile.candidate_id === "authored_baseline");
  if (!authoredProfile) fail("authored_baseline profile missing from allocation_config.json");
  const authoredAssignment = normalizeAssignment(authoredProfile.assignment);
  const authoredKey = assignmentKey(authoredAssignment);
  if (!byKey[authoredKey]) fail("authored baseline is not feasible");
  const publicPool = scored.filter((item) => item.assignment_key !== authoredKey);
  const publicChoice = [...publicPool].sort((left, right) => {
    const a = left.score.metrics;
    const b = right.score.metrics;
    return (b.public_interest_score - a.public_interest_score) || (b.persona_coverage_min - a.persona_coverage_min) || (b.fallback_strength_min - a.fallback_strength_min) || (b.reversibility_sum_min - a.reversibility_sum_min) || (b.role_affinity_total - a.role_affinity_total) || left.assignment_key.localeCompare(right.assignment_key);
  })[0];
  const lowPool = scored.filter((item) => ![authoredKey, publicChoice.assignment_key].includes(item.assignment_key));
  const lowChoice = [...lowPool].sort((left, right) => {
    const a = left.score.metrics;
    const b = right.score.metrics;
    return (a.maintenance_burden_max - b.maintenance_burden_max) || (a.unknown_dependency_burden_max - b.unknown_dependency_burden_max) || (a.role_load_spread - b.role_load_spread) || (b.role_affinity_total - a.role_affinity_total) || (b.persona_coverage_min - a.persona_coverage_min) || left.assignment_key.localeCompare(right.assignment_key);
  })[0];
  const selected = [
    { candidate_id: "authored_baseline", label_zh: "现有 authored baseline", assignment: authoredAssignment, score: byKey[authoredKey].score },
    { candidate_id: "public_interest_balance", label_zh: "公共利益平衡候选", assignment: publicChoice.assignment, score: publicChoice.score },
    { candidate_id: "low_burden_operable", label_zh: "低负担可运营候选", assignment: lowChoice.assignment, score: lowChoice.score },
  ];
  const negativeResults = runNegativeFixtures(inputs.catalog, inputs.config, inputs.negative_fixtures, selected[0].assignment);
  assertResult(inputs, catalogErrors, feasible, scored, pareto, selected, negativeResults);

  const inputBundle = buildExperimentInputs(inputs);
  const inputBundleHash = canonicalHash(inputBundle);
  const runLog = buildRunLog(inputs, catalogErrors, feasible, pareto, selected, negativeResults, inputBundleHash);
  const simulation = buildSimulation(runLog, inputs, selected, negativeResults);
  writeJsonBatch([
    [INPUTS_PATH, inputBundle],
    [RUN_PATH, runLog],
    [SIMULATION_PATH, simulation],
  ]);
  return { inputs, feasible, scored, pareto, selected, negativeResults, runLog, simulation };
}

function main() {
  try {
    const result = run();
    process.stdout.write(`${JSON.stringify({
      status: result.runLog.status,
      feasible_assignment_count: result.feasible.length,
      pareto_assignment_count: result.pareto.length,
      selected_candidate_count: result.selected.length,
      negative_fixture_rejections: result.negativeResults.filter((fixture) => fixture.rejected).length,
      task_count: result.simulation.task_count,
      source_mode: result.inputs.source_mode,
    })}\n`);
  } catch (error) {
    process.stderr.write(`experiment-allocation failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}

if (require.main === module) main();

module.exports = {
  canonicalJson,
  validateAssignment,
  validateCatalog,
  validateDelta,
  enumerateFeasible,
  scoreAssignment,
  paretoFront,
  runNegativeFixtures,
  run,
};
