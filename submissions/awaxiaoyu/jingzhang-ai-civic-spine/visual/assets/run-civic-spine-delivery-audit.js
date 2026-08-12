#!/usr/bin/env node
/**
 * Replays Jing-Zhang Civic Spine delivery contracts from bundled JSON.
 * No network calls, no field measurement, no authorization. PASS means the
 * local scenario/project/key-area/inclusion records are structurally complete
 * and malformed negative fixtures are rejected.
 */
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const HERE = __dirname;
const ROOT = path.resolve(HERE, "..", "..");
function readJson(rel){ return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8")); }
function sha256(rel){ return crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, rel))).digest("hex"); }
function check(id, pass, observed, expected){ return {id, status: pass ? "pass" : "fail", observed, expected}; }
function nonEmpty(v){ if(Array.isArray(v)) return v.length>0 && v.every(nonEmpty); return typeof v === 'string' ? v.trim().length>0 : v !== undefined && v !== null; }
const CONTRACT = readJson("visual/assets/civic-spine-delivery-audit.json");
const SCENARIOS = readJson("visual/assets/scenario-governance-matrix.json").cards || [];
const PROJECTS = readJson("visual/assets/project-implementation-register.json").projects || [];
const AREAS = readJson("visual/assets/key-area-operating-sections.json").areas || [];
const INCLUSION = readJson("visual/assets/inclusion-governance-matrix.json").groups || [];
function evalScenario(row){
  const checks = [
    check("identity", nonEmpty(row.id) && nonEmpty(row.title), {id: row.id, title: row.title}, "id+title"),
    check("data_minimization", /public|aggregated|minimized|synthetic/i.test(row.input_data||""), row.input_data, "public/aggregated/minimized/synthetic"),
    check("assistive_ai_role", /assist|rank|explain|simulate|never final authority/i.test(row.algorithm_role||""), row.algorithm_role, "assistive not final authority"),
    check("failure_modes", Array.isArray(row.failure_modes) && row.failure_modes.length >= 3, row.failure_modes, ">=3"),
    check("human_control", nonEmpty(row.human_takeover), row.human_takeover, "human takeover"),
    check("switchback", nonEmpty(row.switchback_trigger) && nonEmpty(row.recovery_condition), {trigger: row.switchback_trigger, recovery: row.recovery_condition}, "trigger+recovery"),
    check("privacy_boundary", nonEmpty(row.privacy_boundary) && /no personal|opt-out|privacy/i.test(row.privacy_boundary), row.privacy_boundary, "privacy/opt-out limit"),
  ];
  return {id: row.id || "(missing)", status: checks.every(c=>c.status==="pass") ? "pass" : "fail", failed_checks: checks.filter(c=>c.status!=="pass").map(c=>c.id), checks};
}
function evalProject(row){
  const checks = [
    check("identity", /^JZ-\d{2}$/.test(row.id||"") && nonEmpty(row.name), row.id, "JZ-##"),
    check("phase_cost", nonEmpty(row.phase) && nonEmpty(row.cost_band), {phase: row.phase, cost_band: row.cost_band}, "phase+cost"),
    check("owner_type", nonEmpty(row.owner_type), row.owner_type, "owner/responsibility"),
    check("approval_dependency", nonEmpty(row.approval_dependency) && /official|road|ownership|utility|heritage|fire|public/i.test(row.approval_dependency), row.approval_dependency, "professional dependency"),
    check("kpi_public_value", nonEmpty(row.kpi) && nonEmpty(row.public_value), {kpi: row.kpi, public_value: row.public_value}, "kpi+public value"),
    check("pause_condition", nonEmpty(row.pause_trigger), row.pause_trigger, "pause trigger"),
    check("professional_interface", nonEmpty(row.professional_interface), row.professional_interface, "professional interface"),
  ];
  return {id: row.id || "(missing)", status: checks.every(c=>c.status==="pass") ? "pass" : "fail", failed_checks: checks.filter(c=>c.status!=="pass").map(c=>c.id), checks};
}
function evalArea(row){
  const checks = ["id","program","traffic","building_strategy","switchback"].map(k => check(k, nonEmpty(row[k]), row[k], "non-empty"));
  return {id: row.id || "(missing)", status: checks.every(c=>c.status==="pass") ? "pass" : "fail", failed_checks: checks.filter(c=>c.status!=="pass").map(c=>c.id), checks};
}
function evalInclusion(row){
  const checks = [
    check("group", nonEmpty(row.group), row.group, "group"),
    check("responses", Array.isArray(row.responses) && row.responses.length >= 3, row.responses, ">=3 responses")
  ];
  return {id: row.group || "(missing)", status: checks.every(c=>c.status==="pass") ? "pass" : "fail", failed_checks: checks.filter(c=>c.status!=="pass").map(c=>c.id), checks};
}
function clone(v){ return JSON.parse(JSON.stringify(v)); }
function runNegativeFixtures(){
  const firstScenario = SCENARIOS[0] || {};
  const firstProject = PROJECTS[0] || {};
  const fixtures = [];
  let s1 = clone(firstScenario); s1.human_takeover = ""; fixtures.push({id:"NEG-SCENARIO-NO-HUMAN-TAKEOVER", observed: evalScenario(s1), expected_failed_checks:["human_control"]});
  let s2 = clone(firstScenario); s2.privacy_boundary = ""; s2.switchback_trigger = ""; fixtures.push({id:"NEG-SCENARIO-NO-PRIVACY", observed: evalScenario(s2), expected_failed_checks:["switchback","privacy_boundary"]});
  let p1 = clone(firstProject); p1.pause_trigger = ""; fixtures.push({id:"NEG-PROJECT-NO-PAUSE", observed: evalProject(p1), expected_failed_checks:["pause_condition"]});
  let p2 = clone(firstProject); p2.professional_interface = ""; p2.approval_dependency = ""; fixtures.push({id:"NEG-PROJECT-NO-PROFESSIONAL-INTERFACE", observed: evalProject(p2), expected_failed_checks:["approval_dependency","professional_interface"]});
  return fixtures.map(f => ({...f, status: JSON.stringify(f.observed.failed_checks.slice().sort()) === JSON.stringify(f.expected_failed_checks.slice().sort()) ? "pass" : "fail"}));
}
const scenarioRows = SCENARIOS.map(evalScenario);
const projectRows = PROJECTS.map(evalProject);
const areaRows = AREAS.map(evalArea);
const inclusionRows = INCLUSION.map(evalInclusion);
const negative = runNegativeFixtures();
const checks = [
  check("scenario_count", SCENARIOS.length === CONTRACT.expected.scenario_cards, SCENARIOS.length, CONTRACT.expected.scenario_cards),
  check("scenario_contracts", scenarioRows.every(r=>r.status==="pass"), scenarioRows.filter(r=>r.status!=="pass").map(r=>({id:r.id, failed:r.failed_checks})), []),
  check("project_count", PROJECTS.length === CONTRACT.expected.implementation_projects, PROJECTS.length, CONTRACT.expected.implementation_projects),
  check("project_contracts", projectRows.every(r=>r.status==="pass"), projectRows.filter(r=>r.status!=="pass").map(r=>({id:r.id, failed:r.failed_checks})), []),
  check("key_area_count", AREAS.length === CONTRACT.expected.key_areas, AREAS.length, CONTRACT.expected.key_areas),
  check("key_area_contracts", areaRows.every(r=>r.status==="pass"), areaRows.filter(r=>r.status!=="pass").map(r=>({id:r.id, failed:r.failed_checks})), []),
  check("inclusion_group_count", INCLUSION.length === CONTRACT.expected.inclusion_groups, INCLUSION.length, CONTRACT.expected.inclusion_groups),
  check("inclusion_contracts", inclusionRows.every(r=>r.status==="pass"), inclusionRows.filter(r=>r.status!=="pass").map(r=>({id:r.id, failed:r.failed_checks})), []),
  check("negative_fixtures_rejected", negative.every(f=>f.status==="pass"), negative.map(f=>({id:f.id, status:f.status, failed:f.observed.failed_checks})), "all malformed contracts rejected")
];
const pass = checks.every(c=>c.status==="pass");
const evidence = {
  schema_version: "1.0.0",
  audit_id: "CIVIC-SPINE-DELIVERY-AUDIT-RESULT-001",
  runner: "run-civic-spine-delivery-audit.js",
  status: pass ? "PASS" : "FAIL",
  claim_level: "local_structural_audit",
  operational_status: "not_authorized_not_run",
  input_hashes: {
    scenario_governance_matrix: sha256("visual/assets/scenario-governance-matrix.json"),
    project_implementation_register: sha256("visual/assets/project-implementation-register.json"),
    key_area_operating_sections: sha256("visual/assets/key-area-operating-sections.json"),
    inclusion_governance_matrix: sha256("visual/assets/inclusion-governance-matrix.json")
  },
  summary: {
    scenario_cards: SCENARIOS.length,
    implementation_projects: PROJECTS.length,
    key_areas: AREAS.length,
    inclusion_groups: INCLUSION.length,
    negative_fixtures: negative.length
  },
  checks,
  scenario_rows: scenarioRows.map(r=>({id:r.id,status:r.status,failed_checks:r.failed_checks})),
  project_rows: projectRows.map(r=>({id:r.id,status:r.status,failed_checks:r.failed_checks})),
  key_area_rows: areaRows.map(r=>({id:r.id,status:r.status,failed_checks:r.failed_checks})),
  inclusion_rows: inclusionRows.map(r=>({id:r.id,status:r.status,failed_checks:r.failed_checks})),
  negative_fixture_results: negative,
  common_gates: CONTRACT.expected.minimum_common_gates,
  not_proven: [
    "official geometry, road redline, ownership, utility, heritage, fire-safety or public-participation clearance",
    "field accessibility, traffic, safety, environmental, commercial or AI-model performance",
    "procurement, budget, construction, public opening, publication, score or government endorsement"
  ]
};
if(process.argv.includes("--write")) fs.writeFileSync(path.join(HERE, "civic-spine-delivery-audit-result.json"), JSON.stringify(evidence,null,2)+"\n", "utf8");
if(process.argv.includes("--check") && evidence.status !== "PASS") process.exitCode = 1;
console.log(JSON.stringify(evidence, null, 2));
