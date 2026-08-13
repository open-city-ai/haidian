#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = __dirname;
const cardsPath = path.join(root, "scenario_cards.json");
const fixturesPath = path.join(root, "tabletop_fixtures.json");
const resultsPath = path.join(root, "tabletop_results.json");

const requiredCardFields = new Set([
  "id", "title", "area", "risk_class", "public_task", "human_owner_role",
  "independent_reviewer_role", "entry_evidence", "stop_conditions", "takeover",
  "recovery_conditions", "retirement_conditions", "baseline_metric_ids"
]);

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function validateCards(cards) {
  const errors = [];
  const scenarios = Array.isArray(cards.scenarios) ? cards.scenarios : [];
  if (scenarios.length !== 10) errors.push(`scenario count must be 10, got ${scenarios.length}`);
  const ids = scenarios.map(card => card.id);
  if (new Set(ids).size !== ids.length) errors.push("scenario ids must be unique");
  for (const card of scenarios) {
    const missing = [...requiredCardFields].filter(field => !(field in card)).sort();
    if (missing.length) errors.push(`${card.id || "<unknown>"}: missing ${missing.join(", ")}`);
    for (const field of ["title", "public_task", "takeover"]) {
      const value = card[field] || {};
      if (!value.zh || !value.en) errors.push(`${card.id || "<unknown>"}: ${field} must be bilingual`);
    }
    for (const [field, minimum] of [["entry_evidence", 5], ["stop_conditions", 3], ["recovery_conditions", 2], ["retirement_conditions", 2], ["baseline_metric_ids", 1]]) {
      if (!Array.isArray(card[field]) || card[field].length < minimum) errors.push(`${card.id || "<unknown>"}: ${field} needs at least ${minimum}`);
    }
  }
  return errors;
}

function decide(observation, contract) {
  const retirement = contract.retire_triggers.filter(key => observation[key] === true);
  if (retirement.length) return ["RETIRE", retirement];
  const stops = contract.stop_gates.filter(key => observation[key] !== true);
  if (stops.length) return ["STOP", stops];
  const holds = contract.hold_gates.filter(key => observation[key] !== true);
  if (holds.length) return ["HOLD", holds];
  return ["GO", []];
}

function main() {
  const cards = loadJson(cardsPath);
  const fixtures = loadJson(fixturesPath);
  const structuralErrors = validateCards(cards);
  const knownIds = new Set(cards.scenarios.map(card => card.id));
  const decisions = fixtures.fixtures.map(fixture => {
    const observation = {...fixtures.default_observation, ...(fixture.overrides || {})};
    const [actual, reasons] = decide(observation, cards.shared_gate_contract);
    return {
      fixture_id: fixture.id,
      scenario_id: fixture.scenario_id,
      expected: fixture.expected,
      actual,
      reasons,
      match: actual === fixture.expected && knownIds.has(fixture.scenario_id)
    };
  });
  const matched = decisions.filter(item => item.match).length;
  const outcomeCounts = Object.fromEntries(["GO", "HOLD", "STOP", "RETIRE"].map(name => [name, decisions.filter(item => item.actual === name).length]));
  const result = {
    schema_version: "1.0.0",
    protocol_version: cards.protocol_version,
    evidence_status: "synthetic_offline_tabletop_only",
    scenario_count: cards.scenarios.length,
    fixture_count: decisions.length,
    matched_fixture_count: matched,
    expected_outcome_match_ratio: decisions.length ? matched / decisions.length : 0,
    fail_closed_guard_count: cards.shared_gate_contract.stop_gates.length,
    hold_gate_count: cards.shared_gate_contract.hold_gates.length,
    outcome_counts: outcomeCounts,
    structural_errors: structuralErrors,
    decisions,
    claim_limit: "Internal contract verification only; no field observation, certification, permission, or service performance is established."
  };
  fs.writeFileSync(resultsPath, JSON.stringify(result, null, 2) + "\n", "utf8");
  const expectedCounts = {GO: 10, HOLD: 2, STOP: 4, RETIRE: 2};
  const passed = structuralErrors.length === 0 && matched === 18 && decisions.length === 18 && JSON.stringify(outcomeCounts) === JSON.stringify(expectedCounts);
  process.stdout.write(JSON.stringify({passed, scenario_count: result.scenario_count, fixture_count: decisions.length, matched, outcomes: outcomeCounts}) + "\n");
  return passed ? 0 : 1;
}

process.exitCode = main();
