#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = __dirname;
const contracts = JSON.parse(fs.readFileSync(path.join(root, "scenario-contracts.json"), "utf8"));

const cases = [
  {
    id: "NORMAL",
    negative: false,
    state: {},
    expected: "proceed_with_ai_assist"
  },
  {
    id: "NO_ACCOUNT",
    negative: true,
    state: { account_available: false },
    expected: "use_same_task_human_baseline"
  },
  {
    id: "NETWORK_LOSS",
    negative: true,
    state: { network_available: false },
    expected: "use_same_task_human_baseline"
  },
  {
    id: "TAKEOVER_REQUEST",
    negative: true,
    state: { human_takeover_requested: true },
    expected: "use_same_task_human_baseline"
  },
  {
    id: "DATA_SCOPE_VIOLATION",
    negative: true,
    state: { data_scope_valid: false },
    expected: "stop_and_record"
  },
  {
    id: "PATH_OBSTRUCTION",
    negative: true,
    state: { human_spine_clear: false },
    expected: "stop_and_record"
  },
  {
    id: "OPERATOR_ABSENT",
    negative: true,
    state: { operator_present: false },
    expected: "stop_and_record"
  }
];

function normalisedState(patch) {
  return Object.assign({
    account_available: true,
    network_available: true,
    human_takeover_requested: false,
    data_scope_valid: true,
    human_spine_clear: true,
    operator_present: true
  }, patch);
}

function decide(state) {
  if (!state.data_scope_valid || !state.human_spine_clear || !state.operator_present) {
    return "stop_and_record";
  }
  if (!state.account_available || !state.network_available || state.human_takeover_requested) {
    return "use_same_task_human_baseline";
  }
  return "proceed_with_ai_assist";
}

const fixtures = [];
const decisions = [];
for (const scenario of contracts.scenarios) {
  if (!scenario.same_task_human_baseline || !scenario.operator_role || !scenario.recovery) {
    throw new Error(`Incomplete scenario contract: ${scenario.id}`);
  }
  for (const testCase of cases) {
    const state = normalisedState(testCase.state);
    const actual = decide(state);
    const id = `${scenario.id}-${testCase.id}`;
    fixtures.push({
      id,
      scenario_id: scenario.id,
      case_id: testCase.id,
      negative: testCase.negative,
      state,
      expected: testCase.expected
    });
    decisions.push({
      id,
      scenario_id: scenario.id,
      case_id: testCase.id,
      negative: testCase.negative,
      expected: testCase.expected,
      actual,
      pass: actual === testCase.expected,
      human_baseline: scenario.same_task_human_baseline,
      recovery: scenario.recovery
    });
  }
}

const negativeDecisions = decisions.filter(item => item.negative);
const unsafeNegativeReleases = negativeDecisions.filter(item => item.actual === "proceed_with_ai_assist");
const summary = {
  scenario_count: contracts.scenarios.length,
  cases_per_scenario: cases.length,
  fixture_count: fixtures.length,
  negative_fixture_count: negativeDecisions.length,
  pass_count: decisions.filter(item => item.pass).length,
  negative_pass_count: negativeDecisions.filter(item => item.pass).length,
  unsafe_negative_release_count: unsafeNegativeReleases.length,
  all_pass: decisions.every(item => item.pass),
  scope: "deterministic synthetic contract rehearsal only",
  field_performance: "unknown"
};

if (summary.scenario_count !== 12 || summary.fixture_count !== 84 || summary.negative_fixture_count !== 72) {
  throw new Error(`Unexpected coverage: ${JSON.stringify(summary)}`);
}
if (!summary.all_pass || summary.unsafe_negative_release_count !== 0) {
  throw new Error(`Fail-closed rehearsal failed: ${JSON.stringify(summary)}`);
}

fs.writeFileSync(path.join(root, "tabletop-fixtures.json"), `${JSON.stringify({schema_version: "2.0.0", fixtures}, null, 2)}\n`);
fs.writeFileSync(path.join(root, "tabletop-results.json"), `${JSON.stringify({schema_version: "2.0.0", generated_by: "run_tabletop.js", summary, decisions}, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(summary)}\n`);
