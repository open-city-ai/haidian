#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const directory = __dirname;
const packageRoot = path.resolve(directory, "../..");
const receiptPath = path.join(directory, "human-city-receipt.json");
const evidencePath = path.join(directory, "human-city-receipt-evidence.json");
const receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
const cards = JSON.parse(fs.readFileSync(path.join(directory, "scenario-cards.json"), "utf8"));
const personas = JSON.parse(fs.readFileSync(path.join(directory, "personas-and-fairness.json"), "utf8"));
const cardById = new Map((cards.cards || []).map((card) => [card.scenario_id, card]));
const personaIds = new Set((personas.personas || []).map((persona) => persona.persona_id));
const geometryCache = new Map();

function spatialRefResolves(ref) {
  if (typeof ref !== "string") return false;
  const separator = ref.indexOf("#");
  if (separator <= 0 || separator === ref.length - 1) return false;
  const rel = ref.slice(0, separator);
  const id = ref.slice(separator + 1);
  if (!rel.endsWith(".geojson")) return false;
  if (!geometryCache.has(rel)) {
    try {
      const geo = JSON.parse(fs.readFileSync(path.resolve(packageRoot, rel), "utf8"));
      geometryCache.set(rel, new Set((geo.features || []).flatMap((feature) => [
        feature.id,
        feature.properties?.id,
        feature.properties?.feature_id,
        feature.properties?.zone_id
      ].filter((value) => typeof value === "string" && value.length > 0))));
    } catch (_error) {
      geometryCache.set(rel, new Set());
    }
  }
  return geometryCache.get(rel).has(id);
}

function clone(value) { return JSON.parse(JSON.stringify(value)); }

const CASE_READBACK_FIELDS = [
  "human_alternative",
  "minimum_data",
  "stop_reason",
  "replay_hash",
  "release_note_ref"
];

function evaluate(candidate) {
  const cases = Array.isArray(candidate.synthetic_cases) ? candidate.synthetic_cases : [];
  const gates = Array.isArray(candidate.gate_sequence) ? candidate.gate_sequence : [];
  const requiredCases = candidate.replay_contract?.required_case_ids || [];
  const requiredGates = candidate.replay_contract?.required_gate_ids || [];
  const requiredFields = candidate.replay_contract?.required_fields || [];
  const caseIds = new Set(cases.map((item) => item.case_id));
  const gateIds = new Set(gates.map((item) => item.gate_id));
  const checks = [
    {
      id: "RECEIPT_SYNTHETIC_ONLY",
      pass: candidate.operational_status === "not_authorized_not_run" &&
        candidate.performance_results === null &&
        candidate.environment?.network_calls === 0 &&
        candidate.environment?.personal_data === false &&
        candidate.environment?.external_systems === "none",
      detail: "not_authorized_not_run/null/0/false/none boundary is preserved"
    },
    {
      id: "RECEIPT_CASE_COVERAGE",
      pass: cases.length === 3 && requiredCases.every((id) => caseIds.has(id)),
      detail: `${cases.length}/${requiredCases.length} synthetic cases are registered`
    },
    {
      id: "RECEIPT_GATE_COVERAGE",
      pass: gates.length === 6 && requiredGates.every((id) => gateIds.has(id)),
      detail: `${gates.length}/${requiredGates.length} human handoff gates are registered`
    },
    {
      id: "RECEIPT_SCENARIO_REFERENCES",
      pass: cases.every((item) => {
        const card = cardById.get(item.scenario_id);
        return card && item.spatial_refs?.every((ref) => card.spatial_refs.includes(ref));
      }),
      detail: "every receipt case resolves to an existing scenario card"
    },
    {
      id: "RECEIPT_PERSONA_REFERENCES",
      pass: cases.every((item) => item.persona_ids?.length > 0 && item.persona_ids.every((id) => personaIds.has(id))),
      detail: "every receipt case names existing persona IDs"
    },
    {
      id: "RECEIPT_SPATIAL_REFERENCES",
      pass: cases.every((item) => item.spatial_refs?.length > 0 && item.spatial_refs.every(spatialRefResolves)),
      detail: "every receipt spatial reference resolves to bundled GeoJSON"
    },
    {
      id: "RECEIPT_HUMAN_ALTERNATIVE",
      pass: cases.every((item) => typeof item.acceptance_zh === "string" && item.acceptance_zh.includes("人工")),
      detail: "every case keeps an explicit human service path"
    },
    {
      id: "RECEIPT_CASE_READBACK",
      pass: requiredFields.length === 8 &&
        cases.every((item) => requiredFields.every((field) => Object.prototype.hasOwnProperty.call(item, field))) &&
        cases.every((item) => CASE_READBACK_FIELDS.every((field) => Object.prototype.hasOwnProperty.call(item, field))) &&
        cases.every((item) => typeof item.human_alternative === "string" && item.human_alternative.length > 0) &&
        cases.every((item) => typeof item.minimum_data === "string" && item.minimum_data.length > 0) &&
        cases.every((item) => typeof item.stop_reason === "string" && item.stop_reason.length > 0) &&
        cases.every((item) => item.replay_hash === null && item.replay_hash_status === "not_generated_before_authorization") &&
        cases.every((item) => item.release_note_ref === null && item.release_note_status === "not_authorized_not_run"),
      detail: "every case carries the declared replay fields and explicit pre-authorization hash/release-note boundaries"
    },
    {
      id: "RECEIPT_REPLAY_FIELDS",
      pass: candidate.replay_contract?.no_real_world_write === true &&
        candidate.replay_contract?.no_personal_data === true &&
        candidate.replay_contract?.no_external_systems === true &&
        candidate.replay_contract?.required_fields?.length >= 8,
      detail: "replay contract declares fields and no-write limits"
    }
  ];
  return { status: checks.every((check) => check.pass) ? "PASS" : "FAIL", checks };
}

const positive = evaluate(receipt);
const negativeCases = [
  {
    id: "missing-human-alternative",
    expected_failed_check: "RECEIPT_HUMAN_ALTERNATIVE",
    candidate: (() => { const mutated = clone(receipt); mutated.synthetic_cases[0].acceptance_zh = "只提供数字入口"; return mutated; })()
  },
  {
    id: "unresolved-spatial-anchor",
    expected_failed_check: "RECEIPT_SPATIAL_REFERENCES",
    candidate: (() => { const mutated = clone(receipt); mutated.synthetic_cases[1].spatial_refs[0] = "geometry/missing.geojson#NO-SUCH-ANCHOR"; return mutated; })()
  },
  {
    id: "missing-case-readback",
    expected_failed_check: "RECEIPT_CASE_READBACK",
    candidate: (() => { const mutated = clone(receipt); delete mutated.synthetic_cases[0].human_alternative; return mutated; })()
  }
].map((sample) => {
  const replay = evaluate(sample.candidate);
  return {
    id: sample.id,
    expected_status: "FAIL",
    observed_status: replay.status,
    expected_failed_check: sample.expected_failed_check,
    failed_checks: replay.checks.filter((check) => !check.pass).map((check) => check.id),
    pass: replay.status === "FAIL" && replay.checks.some((check) => check.id === sample.expected_failed_check && !check.pass)
  };
});

const result = {
  runner: "run-human-city-receipt.js",
  receipt_id: receipt.receipt_id,
  status: positive.status === "PASS" && negativeCases.every((sample) => sample.pass) ? "PASS" : "FAIL",
  claim_level: receipt.claim_level,
  operational_status: receipt.operational_status,
  performance_results: null,
  environment: receipt.environment,
  coverage: {
    synthetic_cases: `${receipt.synthetic_cases.length}/${receipt.replay_contract.required_case_ids.length}`,
    handoff_gates: `${receipt.gate_sequence.length}/${receipt.replay_contract.required_gate_ids.length}`,
    spatial_refs: `${[...new Set(receipt.synthetic_cases.flatMap((item) => item.spatial_refs || []))].filter(spatialRefResolves).length}/${[...new Set(receipt.synthetic_cases.flatMap((item) => item.spatial_refs || []))].length}`
  },
  checks: positive.checks,
  negative_samples: negativeCases,
  scope_note: receipt.limits_zh
};
fs.writeFileSync(evidencePath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.status === "PASS" ? 0 : 1;
