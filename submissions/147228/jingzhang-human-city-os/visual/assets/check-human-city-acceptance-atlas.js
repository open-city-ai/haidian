#!/usr/bin/env node
"use strict";

// Offline structural review for Figure 09.  It proves that the displayed
// human pathways resolve existing package records; it never evaluates a real
// service, site, person, or operating condition.

const fs = require("fs");
const path = require("path");

const directory = __dirname;
const packageRoot = path.resolve(directory, "../..");
const atlasPath = path.join(directory, "human-city-acceptance-atlas.json");
const evidencePath = path.join(directory, "human-city-acceptance-atlas-evidence.json");
const atlas = JSON.parse(fs.readFileSync(atlasPath, "utf8"));
const personas = JSON.parse(fs.readFileSync(path.join(directory, "personas-and-fairness.json"), "utf8"));
const scenarios = JSON.parse(fs.readFileSync(path.join(directory, "scenario-cards.json"), "utf8"));
const releases = JSON.parse(fs.readFileSync(path.join(directory, "release-gate-ledger.json"), "utf8"));

const personaById = new Map((personas.personas || []).map((record) => [record.persona_id, record]));
const scenarioById = new Map((scenarios.cards || []).map((record) => [record.scenario_id, record]));
const releaseById = new Map((releases.releases || []).map((record) => [record.release_id, record]));
const geometryFeatureIds = new Map();

const expectedPersonaIds = ["P-01", "P-02", "P-03", "P-04", "P-05", "P-06"];
const expectedScenarioIds = [
  "SC-A01", "SC-A02", "SC-A03", "SC-A04",
  "SC-B01", "SC-B02", "SC-B03", "SC-B04",
  "SC-C01", "SC-C02", "SC-C03", "SC-C04", "SC-C05",
  "SC-D01", "SC-D02", "SC-D03", "SC-D04"
];
const expectedReleaseIds = ["PHASE-V01", "PHASE-V02", "PHASE-V10"];

function sameSet(left, right) {
  return Array.isArray(left) && Array.isArray(right) &&
    left.length === right.length && new Set(left).size === left.length &&
    left.every((item) => right.includes(item));
}

function featureIdsFor(relativePath) {
  if (geometryFeatureIds.has(relativePath)) return geometryFeatureIds.get(relativePath);
  if (typeof relativePath !== "string" || !relativePath.endsWith(".geojson")) {
    geometryFeatureIds.set(relativePath, new Set());
    return geometryFeatureIds.get(relativePath);
  }
  const geometryPath = path.resolve(packageRoot, relativePath);
  if (geometryPath !== packageRoot && !geometryPath.startsWith(`${packageRoot}${path.sep}`)) {
    geometryFeatureIds.set(relativePath, new Set());
    return geometryFeatureIds.get(relativePath);
  }
  try {
    const geometry = JSON.parse(fs.readFileSync(geometryPath, "utf8"));
    const ids = new Set((geometry.features || []).flatMap((feature) => [
      feature.id,
      feature.properties?.id,
      feature.properties?.feature_id,
      feature.properties?.zone_id
    ].filter((value) => typeof value === "string" && value.length > 0)));
    geometryFeatureIds.set(relativePath, ids);
  } catch (_error) {
    geometryFeatureIds.set(relativePath, new Set());
  }
  return geometryFeatureIds.get(relativePath);
}

function spatialRefResolves(reference) {
  if (typeof reference !== "string") return false;
  const separator = reference.indexOf("#");
  if (separator <= 0 || separator === reference.length - 1) return false;
  const relativePath = reference.slice(0, separator);
  const featureId = reference.slice(separator + 1);
  return featureIdsFor(relativePath).has(featureId);
}

function allKeys(value, prefix = "") {
  if (Array.isArray(value)) return value.flatMap((item, index) => allKeys(item, `${prefix}[${index}]`));
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, item]) => [
    `${prefix}.${key}`,
    ...allKeys(item, `${prefix}.${key}`)
  ]);
}

function assess(candidate) {
  const pathways = Array.isArray(candidate.pathways) ? candidate.pathways : [];
  const scope = candidate.scope || {};
  const allScenarioRecords = (scope.scenario_ids || []).map((id) => scenarioById.get(id)).filter(Boolean);
  const selectedScenarioIds = [...new Set(pathways.flatMap((pathway) => pathway.scenario_ids || []))];
  const selectedScenarioRecords = selectedScenarioIds.map((id) => scenarioById.get(id)).filter(Boolean);
  const selectedSpatialRefs = selectedScenarioRecords.flatMap((record) => record.spatial_refs || []);
  const allSpatialRefs = allScenarioRecords.flatMap((record) => record.spatial_refs || []);
  const pathwayResolution = pathways.every((pathway) => {
    const persona = personaById.get(pathway.persona_id);
    const referenced = Array.isArray(pathway.scenario_ids) ? pathway.scenario_ids : [];
    const anchor = scenarioById.get(pathway.map_anchor_id);
    return persona && referenced.length > 0 &&
      referenced.every((scenarioId) => persona.spatial_response.includes(scenarioId) && scenarioById.has(scenarioId)) &&
      referenced.includes(pathway.map_anchor_id) && anchor &&
      spatialRefResolves(`geometry/constraints.geojson#${pathway.map_anchor_id}`);
  });
  const cardIntegrity = selectedScenarioRecords.length === selectedScenarioIds.length && selectedScenarioRecords.every((record) =>
    record.no_deployment_claim === true && record.human_fallback_zh && record.stop_or_exit_zh &&
    Array.isArray(record.spatial_refs) && record.spatial_refs.length > 0
  );
  const forbiddenKeys = allKeys(candidate).filter((key) => /(?:dimension|capacity|operator|permit|investment|height|far)/i.test(key));
  const checks = [
    {
      id: "ATLAS_CLAIM_BOUNDARY",
      pass: candidate.claim_level === "offline_structural_trace" &&
        candidate.operational_status === "not_authorized_not_run" &&
        candidate.performance_results === null &&
        candidate.environment?.network_calls === 0 &&
        candidate.environment?.personal_data === false &&
        candidate.environment?.external_systems === "none",
      detail: "The atlas remains an offline, non-operational structural trace."
    },
    {
      id: "ATLAS_SIX_PERSONAS",
      pass: sameSet(scope.persona_ids, expectedPersonaIds) &&
        pathways.length === expectedPersonaIds.length && sameSet(pathways.map((pathway) => pathway.persona_id), expectedPersonaIds) &&
        expectedPersonaIds.every((id) => personaById.has(id) && personaById.get(id).non_negotiable_boundary_zh),
      detail: "All six existing persona records appear once and retain a human non-negotiable boundary."
    },
    {
      id: "ATLAS_ALL_SCENARIOS",
      pass: sameSet(scope.scenario_ids, expectedScenarioIds) &&
        allScenarioRecords.length === expectedScenarioIds.length &&
        allScenarioRecords.every((record) => record.no_deployment_claim === true),
      detail: "All seventeen scenario cards remain visible as a complete conceptual registry."
    },
    {
      id: "ATLAS_RELEASE_GATES",
      pass: sameSet(scope.release_gate_ids, expectedReleaseIds) &&
        expectedReleaseIds.every((id) => releaseById.has(id) && releaseById.get(id).pause_or_rollback_zh),
      detail: "All three existing release gates resolve and retain a pause or rollback condition."
    },
    {
      id: "ATLAS_PATHWAY_RESOLUTION",
      pass: pathwayResolution,
      detail: "Each persona path only selects scenarios already named by that persona and a real scenario-map anchor."
    },
    {
      id: "ATLAS_SELECTED_CARD_SAFEGUARDS",
      pass: selectedScenarioIds.length === 10 && cardIntegrity,
      detail: "The ten representative scenario links retain human fallback, stop action, spatial references, and no-deployment status."
    },
    {
      id: "ATLAS_SPATIAL_REFERENCE_COVERAGE",
      pass: selectedSpatialRefs.length > 0 && selectedSpatialRefs.every(spatialRefResolves) &&
        allSpatialRefs.length > 0 && allSpatialRefs.every(spatialRefResolves),
      detail: "Every selected and registry scenario spatial reference resolves to a bundled GeoJSON feature."
    },
    {
      id: "ATLAS_FIGURE_RULES",
      pass: candidate.figure_rules?.show_all_scenarios === true &&
        candidate.figure_rules?.show_persona_human_floor === true &&
        candidate.figure_rules?.show_selected_scenario_human_fallback === true &&
        candidate.figure_rules?.show_selected_scenario_stop_action === true &&
        candidate.figure_rules?.show_release_gates === true &&
        candidate.figure_rules?.not_a_service_or_operating_dashboard === true,
      detail: "The figure is required to show coverage and safeguards rather than a claimed operating dashboard."
    },
    {
      id: "ATLAS_NO_UNSUPPORTED_IMPLEMENTATION_FIELDS",
      pass: forbiddenKeys.length === 0,
      detail: forbiddenKeys.length === 0 ? "No implementation field is introduced." : `Unsupported keys: ${forbiddenKeys.join(", ")}`
    }
  ];
  return {
    status: checks.every((check) => check.pass) ? "PASS" : "FAIL",
    checks,
    selectedScenarioIds,
    selectedSpatialRefs,
    allSpatialRefs
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const positive = assess(atlas);
const negativeCandidate = clone(atlas);
negativeCandidate.pathways.find((pathway) => pathway.persona_id === "P-06").map_anchor_id = "SC-NO-SUCH-ANCHOR";
const negative = assess(negativeCandidate);
const result = {
  runner: "check-human-city-acceptance-atlas.js",
  atlas_id: atlas.atlas_id,
  status: positive.status === "PASS" && negative.status === "FAIL" &&
    negative.checks.some((check) => check.id === "ATLAS_PATHWAY_RESOLUTION" && !check.pass) ? "PASS" : "FAIL",
  claim_level: atlas.claim_level,
  operational_status: atlas.operational_status,
  performance_results: null,
  environment: atlas.environment,
  coverage: {
    persona_pathways: `${atlas.pathways.length}/${expectedPersonaIds.length}`,
    scenario_registry: `${atlas.scope.scenario_ids.length}/${expectedScenarioIds.length}`,
    representative_scenarios: `${positive.selectedScenarioIds.length}/10`,
    selected_spatial_refs: `${positive.selectedSpatialRefs.filter(spatialRefResolves).length}/${positive.selectedSpatialRefs.length}`,
    all_scenario_spatial_refs: `${positive.allSpatialRefs.filter(spatialRefResolves).length}/${positive.allSpatialRefs.length}`,
    release_gates: `${atlas.scope.release_gate_ids.length}/${expectedReleaseIds.length}`
  },
  checks: positive.checks,
  negative_samples: [{
    id: "unresolved-persona-map-anchor",
    expected_status: "FAIL",
    observed_status: negative.status,
    expected_failed_check: "ATLAS_PATHWAY_RESOLUTION",
    failed_checks: negative.checks.filter((check) => !check.pass).map((check) => check.id),
    pass: negative.status === "FAIL" && negative.checks.some((check) => check.id === "ATLAS_PATHWAY_RESOLUTION" && !check.pass)
  }],
  scope_note: "Offline record-resolution and negative-test evidence only; no personal data, network calls, external systems, real service evidence, or operating-performance claim."
};

fs.writeFileSync(evidencePath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.status === "PASS" ? 0 : 1;
