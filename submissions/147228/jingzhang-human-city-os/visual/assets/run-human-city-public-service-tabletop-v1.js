#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const directory = __dirname;
const packageRoot = path.resolve(directory, "../..");
const inputPath = path.join(directory, "human-city-public-service-tabletop-v1.json");
const evidencePath = path.join(directory, "human-city-public-service-tabletop-v1-evidence.json");
const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const failCodes = new Set([
  "CONSENT_MISSING", "HUMAN_HANDOFF_UNAVAILABLE", "DATA_MINIMIZATION_EXCEEDED",
  "PERMISSION_SCOPE_MISSING", "APPEAL_ROUTE_MISSING", "HIGH_IMPACT_ACTION",
  "BILINGUAL_PARITY_MISSING", "SPATIAL_ANCHOR_UNRESOLVED"
]);
const forbiddenActions = new Set(["medical_decision", "legal_decision", "enforcement", "benefit_decision"]);
const registry = new Map(input.scenario_registry.map((item) => [item.scenario_id, item]));
const geometryCache = new Map();

function assert(condition, message) { if (!condition) throw new Error(message); }
function loadGeometry(relativePath) {
  if (!geometryCache.has(relativePath)) {
    const file = path.join(packageRoot, relativePath);
    const geo = JSON.parse(fs.readFileSync(file, "utf8"));
    const ids = new Set();
    for (const feature of geo.features || []) {
      for (const value of [feature.id, feature.properties?.id, feature.properties?.feature_id, feature.properties?.zone_id]) {
        if (typeof value === "string" && value) ids.add(value);
      }
    }
    geometryCache.set(relativePath, ids);
  }
  return geometryCache.get(relativePath);
}
function spatialRefResolves(ref) {
  if (typeof ref !== "string") return false;
  const separator = ref.indexOf("#");
  if (separator <= 0 || separator === ref.length - 1) return false;
  try { return loadGeometry(ref.slice(0, separator)).has(ref.slice(separator + 1)); } catch (_error) { return false; }
}
function evaluate(fixture, scenario, spatialOk = true) {
  if (!spatialOk) return { pass: false, fail_code: "SPATIAL_ANCHOR_UNRESOLVED" };
  if (!fixture.consent) return { pass: false, fail_code: "CONSENT_MISSING" };
  if (!fixture.human_handoff_available) return { pass: false, fail_code: "HUMAN_HANDOFF_UNAVAILABLE" };
  if (!fixture.requested_data.every((field) => fixture.allowed_data.includes(field) && scenario.minimum_data.includes(field))) {
    return { pass: false, fail_code: "DATA_MINIMIZATION_EXCEEDED" };
  }
  if (!fixture.permission_scope) return { pass: false, fail_code: "PERMISSION_SCOPE_MISSING" };
  if (!fixture.appeal_route) return { pass: false, fail_code: "APPEAL_ROUTE_MISSING" };
  if (forbiddenActions.has(fixture.action_class)) return { pass: false, fail_code: "HIGH_IMPACT_ACTION" };
  if (!fixture.bilingual_review) return { pass: false, fail_code: "BILINGUAL_PARITY_MISSING" };
  return { pass: true, fail_code: null };
}
function clone(value) { return JSON.parse(JSON.stringify(value)); }

function checkContract() {
  assert(input.status.field_state === "not_authorized_not_run", "field state must remain not_authorized_not_run");
  assert(input.status.tabletop_state === "contract_check_only", "tabletop must remain contract_check_only");
  assert(input.status.performance_results === null, "performance results must remain null");
  assert(input.scope.field_location === null, "field location must remain null");
  assert(input.scenario_registry.length === 4, "four scenario contracts are required");
  assert(input.positive_fixtures.length === 4, "four positive fixtures are required");
  assert(input.negative_fixtures.length === 8, "eight negative fixtures are required");
  assert(input.bilingual_qa.length === 4 && input.bilingual_qa.every((item) => item.zh_en_parity && item.third_party_content === false), "bilingual QA is incomplete");
  for (const scenario of input.scenario_registry) {
    assert(registry.has(scenario.scenario_id), `scenario ${scenario.scenario_id} is not registered`);
    assert(spatialRefResolves(scenario.space), `spatial anchor does not resolve: ${scenario.space}`);
    for (const field of ["user", "operator_role", "human_alternative", "baseline", "acceptance", "privacy", "stop_recovery"]) {
      assert(scenario[field]?.zh && scenario[field]?.en, `${scenario.scenario_id} missing bilingual ${field}`);
    }
    assert(scenario.permissions.length >= 2 && scenario.minimum_data.length >= 2, `${scenario.scenario_id} contract is underspecified`);
  }
}

function checkFixtures() {
  const positiveResults = [];
  for (const fixture of input.positive_fixtures) {
    const scenario = registry.get(fixture.scenario_id);
    const result = evaluate(fixture, scenario, spatialRefResolves(scenario.space));
    assert(result.pass, `${fixture.id} should pass but failed ${result.fail_code}`);
    assert(fixture.permission_scope === true, `${fixture.id} must carry explicit permission scope`);
    positiveResults.push({ id: fixture.id, scenario_id: fixture.scenario_id, status: "PASS" });
  }
  const negativeResults = [];
  for (const item of input.negative_fixtures) {
    const source = clone(input.positive_fixtures.find((fixture) => fixture.scenario_id === item.scenario_id));
    assert(source, `${item.id} source fixture missing`);
    let spatialOk = true;
    if (item.mutation === "consent_missing") source.consent = false;
    if (item.mutation === "human_handoff_unavailable") source.human_handoff_available = false;
    if (item.mutation === "data_overcollection") source.requested_data = [...source.requested_data, "unlisted_sensitive_field"];
    if (item.mutation === "permission_missing") source.permission_scope = false;
    if (item.mutation === "appeal_missing") source.appeal_route = false;
    if (item.mutation === "high_impact_action") source.action_class = "medical_decision";
    if (item.mutation === "bilingual_review_missing") source.bilingual_review = false;
    if (item.mutation === "spatial_anchor_missing") spatialOk = false;
    const result = evaluate(source, registry.get(item.scenario_id), spatialOk);
    assert(!result.pass && result.fail_code === item.expected_fail_code, `${item.id} expected ${item.expected_fail_code}, got ${result.fail_code}`);
    negativeResults.push({ id: item.id, expected_fail_code: item.expected_fail_code, observed_fail_code: result.fail_code, status: "REJECT" });
  }
  return { positiveResults, negativeResults };
}

function main() {
  if (process.argv.length !== 3 || process.argv[2] !== "--check") {
    console.error("Usage: node run-human-city-public-service-tabletop-v1.js --check");
    process.exitCode = 2;
    return;
  }
  try {
    checkContract();
    const fixtures = checkFixtures();
    const result = {
      runner: "run-human-city-public-service-tabletop-v1.js",
      status: "PASS",
      package_id: input.package_id,
      field_state: input.status.field_state,
      performance_results: null,
      execution_mode: "read_only_contract_and_fixture_check",
      coverage: { scenarios: 4, positive_fixtures: 4, negative_fixtures: 8, fail_codes: 8, bilingual_qa: 4 },
      positive_results: fixtures.positiveResults,
      negative_results: fixtures.negativeResults,
      claims: { real_users_contacted: false, field_authorized: false, external_systems: false, receipt_is_expected_output_only: true },
      scope_note: input.limits.zh
    };
    fs.writeFileSync(evidencePath, `${JSON.stringify(result, null, 2)}\n`);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(JSON.stringify({ status: "FAIL", error: error.message }, null, 2));
    process.exitCode = 1;
  }
}
main();
