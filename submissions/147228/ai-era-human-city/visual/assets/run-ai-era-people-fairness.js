#!/usr/bin/env node

/*
 * Recheck public-interest coverage from the package's own persona contract.
 * This is a conceptual structure audit, not a demographic survey, field
 * outcome, accessibility certification, or official score.
 */
const fs = require("fs");
const path = require("path");

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, "../..");
const readAsset = (name) => JSON.parse(fs.readFileSync(path.join(assetDir, name), "utf8"));
const readGeo = (relative) => JSON.parse(fs.readFileSync(path.join(packageDir, relative), "utf8"));

const contract = readAsset("personas-and-fairness.json");
const scenarios = readAsset("scenario-cards.json");
const features = new Map();
for (const relative of [
  "geometry/constraints.geojson",
  "geometry/public_space.geojson",
  "geometry/key_areas.geojson",
  "geometry/green_space.geojson",
]) {
  for (const feature of readGeo(relative).features) features.set(feature.id, feature);
}

const expectedGroups = [
  "原住民与老人",
  "被替代风险劳动者",
  "夜班 AI 从业者",
  "小商户与一人公司",
  "开发者与研究者",
  "行动不便者与照护者",
  "青年学生与初入行者",
  "首次到访者与国际访客",
  "公共服务与一线维护人员",
];
const scenarioIds = new Set(scenarios.cards.map((card) => card.card_id));
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(contract.schema_version === "0.3.0", "persona schema must be 0.3.0");
expect(contract.status === "design_lens_only", "persona contract must remain design_lens_only");
expect(contract.official_boundary === false, "persona contract must disclose official_boundary=false");
expect(contract.operational_status === "not_authorized_not_run", "persona contract must remain not_authorized_not_run");
expect(contract.privacy_rule && contract.privacy_rule.includes("No individual identification"), "privacy rule is missing");
expect(contract.personas.length === 9, `personas=${contract.personas.length}, expected 9`);
const ids = new Set();
const groups = new Set();
const coveredScenarios = new Set();
const coveredFeatures = new Set();
for (const persona of contract.personas) {
  expect(!ids.has(persona.persona_id), `duplicate persona_id ${persona.persona_id}`);
  ids.add(persona.persona_id);
  groups.add(persona.group);
  for (const key of ["needs", "non_negotiable_boundary", "fairness_metric", "ordinary_fallback_zh", "stop_condition_zh"]) {
    expect(String(persona[key] || "").trim().length > 0, `${persona.persona_id} missing ${key}`);
  }
  expect(Array.isArray(persona.scenario_ids) && persona.scenario_ids.length > 0, `${persona.persona_id} missing scenario_ids`);
  expect(Array.isArray(persona.spatial_refs) && persona.spatial_refs.length > 0, `${persona.persona_id} missing spatial_refs`);
  for (const scenarioId of persona.scenario_ids || []) {
    expect(scenarioIds.has(scenarioId), `${persona.persona_id} references missing ${scenarioId}`);
    coveredScenarios.add(scenarioId);
  }
  for (const featureId of persona.spatial_refs || []) {
    expect(features.has(featureId), `${persona.persona_id} references missing spatial feature ${featureId}`);
    coveredFeatures.add(featureId);
  }
}
for (const group of expectedGroups) expect(groups.has(group), `missing required public-interest group ${group}`);
expect(coveredScenarios.size === scenarios.cards.length, `scenario coverage=${coveredScenarios.size}, expected ${scenarios.cards.length}`);
expect(coveredFeatures.size >= 8, `spatial feature coverage=${coveredFeatures.size}, expected at least 8`);

const result = {
  ok: errors.length === 0,
  status: errors.length === 0 ? "PASS" : "FAIL",
  personas: contract.personas.length,
  required_groups: expectedGroups.length,
  scenario_coverage: coveredScenarios.size,
  scenario_total: scenarios.cards.length,
  spatial_feature_coverage: coveredFeatures.size,
  ordinary_fallbacks: contract.personas.filter((persona) => persona.ordinary_fallback_zh).length,
  stop_conditions: contract.personas.filter((persona) => persona.stop_condition_zh).length,
  boundary: "conceptual public-interest lens; not a demographic survey, field result, eligibility rule, accessibility certification, or official score",
  errors,
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.ok ? 0 : 1;
