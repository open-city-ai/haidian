#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const directory = __dirname;
const packageRoot = path.resolve(directory, "../..");
const contractPath = path.join(directory, "human-city-ordinary-journey.json");
const evidencePath = path.join(directory, "human-city-ordinary-journey-evidence.json");
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const scenarioCards = JSON.parse(fs.readFileSync(path.join(directory, "scenario-cards.json"), "utf8"));
const personas = JSON.parse(fs.readFileSync(path.join(directory, "personas-and-fairness.json"), "utf8"));
const releaseGates = JSON.parse(fs.readFileSync(path.join(directory, "release-gate-ledger.json"), "utf8"));
const dataReadiness = JSON.parse(fs.readFileSync(path.join(directory, "data-readiness-register.json"), "utf8"));
const implementationMatrix = JSON.parse(fs.readFileSync(path.join(directory, "implementation-operation-matrix.json"), "utf8"));

const expectedStepIds = ["J1", "J2", "J3", "J4", "J5"];
const scenarioById = new Map((scenarioCards.cards || []).map((card) => [card.scenario_id, card]));
const personaById = new Map((personas.personas || []).map((persona) => [persona.persona_id, persona]));
const gateById = new Map((releaseGates.releases || []).map((release) => [release.release_id, release]));
const geometryFeatureIds = new Map();

function spatialRefResolves(ref) {
  if (typeof ref !== "string") return false;
  const separator = ref.indexOf("#");
  if (separator <= 0 || separator === ref.length - 1) return false;
  const relativePath = ref.slice(0, separator);
  const featureId = ref.slice(separator + 1);
  if (!relativePath.endsWith(".geojson")) return false;

  let featureIds = geometryFeatureIds.get(relativePath);
  if (!featureIds) {
    const geometryPath = path.resolve(packageRoot, relativePath);
    if (geometryPath !== packageRoot && !geometryPath.startsWith(`${packageRoot}${path.sep}`)) return false;
    try {
      const geometry = JSON.parse(fs.readFileSync(geometryPath, "utf8"));
      featureIds = new Set((geometry.features || []).flatMap((feature) => [
        feature.id,
        feature.properties?.id,
        feature.properties?.feature_id,
        feature.properties?.zone_id
      ].filter((value) => typeof value === "string" && value.length > 0)));
    } catch (_error) {
      featureIds = new Set();
    }
    geometryFeatureIds.set(relativePath, featureIds);
  }
  return featureIds.has(featureId);
}

function traceFor(candidate) {
  const steps = Array.isArray(candidate.steps) ? candidate.steps : [];
  const triggers = Array.isArray(candidate.triggers) ? candidate.triggers : [];
  const traceRequirements = candidate.trace_requirements || {};
  const stepIds = new Set(steps.map((step) => step.step_id));
  const triggerIds = new Set(triggers.map((trigger) => trigger.id));
  const referencedTriggerIds = new Set(steps.flatMap((step) => step.trigger_ids || []));
  const referencedEvidenceFields = new Set(steps.flatMap((step) => step.evidence || []));
  const traceReferencesResolve = steps.every((step) =>
    (step.trigger_ids || []).every((id) => triggerIds.has(id)) &&
    (step.evidence || []).every((field) => typeof field === "string" && field.length > 0)
  ) && (traceRequirements.trigger_ids || []).every((id) => triggerIds.has(id));
  const traceCoverage = traceReferencesResolve &&
    (traceRequirements.step_ids || []).every((id) => stepIds.has(id)) &&
    (traceRequirements.trigger_ids || []).every((id) => referencedTriggerIds.has(id)) &&
    (traceRequirements.evidence_fields || []).every((field) => referencedEvidenceFields.has(field));
  return {
    steps,
    triggers,
    traceRequirements,
    stepIds,
    triggerIds,
    referencedTriggerIds,
    referencedEvidenceFields,
    traceCoverage
  };
}

function evaluate(candidate) {
  const bindings = Array.isArray(candidate.replay_bindings) ? candidate.replay_bindings : [];
  const trace = traceFor(candidate);
  const bindingRefsResolve = bindings.length >= 2 && bindings.every((binding) => {
    const scenario = scenarioById.get(binding.scenario_id);
    const persona = personaById.get(binding.persona_id);
    const gate = gateById.get(binding.release_gate_id);
    return scenario && persona && gate &&
      Array.isArray(binding.step_ids) && binding.step_ids.join(",") === expectedStepIds.join(",") &&
      Array.isArray(binding.spatial_refs) && binding.spatial_refs.length > 0 &&
      binding.spatial_refs.every((ref) => scenario.spatial_refs.includes(ref) && spatialRefResolves(ref));
  });

  const checks = [
  {
    id: "package_iteration_context_aligned",
    pass: dataReadiness.package_iteration === "v0.5" &&
      implementationMatrix.package_iteration === "v0.5" &&
      releaseGates.package_iteration === "v0.5",
    observed: {
      data_readiness: dataReadiness.package_iteration,
      implementation_matrix: implementationMatrix.package_iteration,
      release_gate_ledger: releaseGates.package_iteration
    },
    expected: "all package-level governance records align to v0.5"
  },
  {
    id: "five_steps_declared",
    pass: Array.isArray(candidate.steps) && candidate.steps.length === 5,
    observed: Array.isArray(candidate.steps) ? candidate.steps.length : null,
    expected: 5
  },
  {
    id: "ordinary_visible_service_and_evidence",
    pass: Array.isArray(candidate.steps) && candidate.steps.every((step) =>
      step.visible_service_zh && step.visible_service_en &&
      Array.isArray(step.evidence) && step.evidence.length >= 2 &&
      step.fail_closed_zh && step.fail_closed_en
    ),
    observed: "every step has visible service, evidence, and fail-closed action",
    expected: "true"
  },
  {
    id: "human_equivalent_access",
    pass: candidate.steps?.[0]?.visible_service_zh.includes("人工") &&
      candidate.steps?.[2]?.visible_service_zh.includes("现场人员"),
    observed: "J1/J3 include human access and takeover",
    expected: "true"
  },
  {
    id: "four_triggers_declared",
    pass: Array.isArray(candidate.triggers) && candidate.triggers.length === 4,
    observed: Array.isArray(candidate.triggers) ? candidate.triggers.length : null,
    expected: 4
  },
  {
    id: "independent_replay_declared",
    pass: candidate.steps?.[4]?.step_id === "J5" &&
      candidate.steps?.[4]?.name_en === "Independent replay",
    observed: candidate.steps?.[4]?.name_en || null,
    expected: "Independent replay"
  },
  {
    id: "replay_bindings_declared",
    pass: bindings.length >= 2 && bindings.every((binding) =>
      binding.route_id && binding.scenario_id && binding.persona_id && binding.release_gate_id &&
      Array.isArray(binding.step_ids) && binding.step_ids.length === expectedStepIds.length &&
      Array.isArray(binding.spatial_refs) && binding.spatial_refs.length > 0 &&
      Array.isArray(binding.evidence_focus) && binding.evidence_focus.length > 0
    ),
    observed: bindings.length,
    expected: "at least two complete route bindings"
  },
  {
    id: "replay_bindings_resolve",
    pass: bindingRefsResolve,
    observed: "scenario, persona, release gate, step, and spatial references resolve",
    expected: "true"
  },
  {
    id: "non_operational_boundary_preserved",
    pass: candidate.performance_results === null &&
      candidate.operational_status === "not_authorized_not_run" &&
      candidate.environment?.network_calls === 0 &&
      candidate.environment?.personal_data === false &&
      candidate.environment?.external_systems === "none",
    observed: "null/not_authorized_not_run/0/false/none",
    expected: "preserved"
  },
  {
    id: "trace_references_resolve",
    pass: trace.traceCoverage && trace.steps.every((step) => (step.trigger_ids || []).length > 0),
    observed: {
      steps: trace.steps.length,
      referenced_triggers: [...trace.referencedTriggerIds],
      evidence_fields: trace.referencedEvidenceFields.size
    },
    expected: "all step, trigger and evidence references resolve"
  },
  {
    id: "step_ids_unique",
    pass: trace.steps.length === 5 && trace.stepIds.size === trace.steps.length && trace.steps.every((step) => step.step_id),
    observed: [...trace.stepIds],
    expected: "five unique step IDs"
  },
  {
    id: "trigger_ids_unique",
    pass: trace.triggers.length === 4 && trace.triggerIds.size === trace.triggers.length && trace.triggers.every((trigger) => trigger.id),
    observed: [...trace.triggerIds],
    expected: "four unique trigger IDs"
  }
  ];
  return {
    status: checks.every((check) => check.pass) ? "PASS" : "FAIL",
    checks
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const positive = evaluate(contract);
const negativeCases = [
  {
    id: "missing-fail-closed-action",
    description: "Remove J3's human-takeover stop action.",
    candidate: (() => {
      const mutated = clone(contract);
      mutated.steps[2].fail_closed_zh = "";
      return mutated;
    })(),
    expected_failed_check: "ordinary_visible_service_and_evidence"
  },
  {
    id: "unresolved-spatial-binding",
    description: "Point the inclusion route at a non-existent spatial reference.",
    candidate: (() => {
      const mutated = clone(contract);
      mutated.replay_bindings[0].spatial_refs[0] = "geometry/missing.geojson#NO-SUCH-AREA";
      return mutated;
    })(),
    expected_failed_check: "replay_bindings_resolve"
  }
].map((sample) => {
  const replay = evaluate(sample.candidate);
  return {
    id: sample.id,
    description: sample.description,
    expected_status: "FAIL",
    observed_status: replay.status,
    expected_failed_check: sample.expected_failed_check,
    failed_checks: replay.checks.filter((check) => !check.pass).map((check) => check.id),
    pass: replay.status === "FAIL" && replay.checks.some((check) =>
      check.id === sample.expected_failed_check && !check.pass
    )
  };
});

const result = {
  runner: "run-human-city-ordinary-journey.js",
  contract_id: contract.contract_id,
  status: positive.status === "PASS" && negativeCases.every((sample) => sample.pass) ? "PASS" : "FAIL",
  claim_level: contract.claim_level,
  operational_status: contract.operational_status,
  performance_results: null,
  environment: contract.environment,
  trace_coverage: (() => {
    const trace = traceFor(contract);
    return {
      steps: `${trace.stepIds.size}/${(trace.traceRequirements.step_ids || []).length}`,
      triggers: `${trace.referencedTriggerIds.size}/${(trace.traceRequirements.trigger_ids || []).length}`,
      evidence_fields: `${[...(trace.traceRequirements.evidence_fields || [])].filter((field) => trace.referencedEvidenceFields.has(field)).length}/${(trace.traceRequirements.evidence_fields || []).length}`
    };
  })(),
  spatial_reference_coverage: (() => {
    const refs = [...new Set((contract.replay_bindings || []).flatMap((binding) => binding.spatial_refs || []))];
    const resolved = refs.filter((ref) => spatialRefResolves(ref));
    return {
      references: `${resolved.length}/${refs.length}`,
      all_resolve_to_geojson_features: resolved.length === refs.length
    };
  })(),
  checks: positive.checks,
  negative_samples: negativeCases,
  context_files: [
    "visual/assets/scenario-cards.json",
    "visual/assets/personas-and-fairness.json",
    "visual/assets/release-gate-ledger.json",
    "visual/assets/data-readiness-register.json",
    "visual/assets/implementation-operation-matrix.json",
    "geometry/*.geojson"
  ],
  scope_note: "Deterministic contract replay and negative-test evidence only; no personal data, network calls, external systems, or real-world performance claim."
};

fs.writeFileSync(evidencePath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
if (process.argv.includes("--check") && result.status !== "PASS") process.exit(1);
