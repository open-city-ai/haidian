const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const fixtures = JSON.parse(fs.readFileSync(path.join(root, "test-fixtures.json"), "utf8"));
const expected = JSON.parse(fs.readFileSync(path.join(root, "evaluation-results.json"), "utf8"));
const variants = ["reference_rule", "single_planner", "life_capacity_kernel"];
const blocking = new Set(["outage", "no_network", "stale_capacity", "false_availability"]);
const unhandled = new Set(["scarcity", "schedule_conflict", "accessibility", "appeal_required"]);
const round = (value, digits) => Number(value.toFixed(digits));
const intersects = (values, allowed) => values.some(value => allowed.has(value));

function evaluateVariantRecord(variant, task, index) {
  const flags = new Set(task.flags);
  const hard = task.flags.filter(flag => !["none", "human_available", "multilingual"].includes(flag));
  const human = flags.has("human_available");
  let constraintOk;
  let released;
  let completed;
  let safe;
  let handoff;
  let receiptFields;
  let usedFields;
  let takeover;
  let blockingWithoutHuman = false;

  if (variant === "reference_rule") {
    constraintOk = hard.length === 0 && !flags.has("multilingual");
    released = true;
    completed = constraintOk;
    safe = constraintOk;
    handoff = false;
    receiptFields = 3;
    usedFields = 8;
    takeover = null;
  } else if (variant === "single_planner") {
    const recognized = intersects(task.flags, blocking);
    const hasUnhandled = intersects(task.flags, unhandled);
    handoff = recognized && human;
    released = !recognized || handoff;
    completed = (released && !hasUnhandled) || handoff;
    constraintOk = released && !hasUnhandled;
    safe = !released || constraintOk;
    receiptFields = 6;
    usedFields = 7;
    takeover = handoff ? 150 + index * 7 : null;
  } else {
    blockingWithoutHuman = intersects(task.flags, blocking) && !human;
    handoff = human && hard.length > 0;
    released = !blockingWithoutHuman;
    completed = released;
    constraintOk = released;
    safe = true;
    receiptFields = 9;
    usedFields = 4;
    takeover = handoff ? 35 + index * 3 : null;
  }

  const graphNodesByTest = {
    "TEST-AI-01": ["request", "night_route", "service_check", "staff_handoff", "receipt"],
    "TEST-AI-02": ["request", "work_window", "care_window", "transport_window", "receipt"],
    "TEST-AI-03": ["request", "language_check", "service_route", "appeal", "receipt"],
  };
  const graphNodes = graphNodesByTest[task.test_id];
  const graphEdges = graphNodes.slice(0, -1).map((node, edgeIndex) => [node, graphNodes[edgeIndex + 1]]);
  let capacityState = "verified";
  if (task.flags.some(flag => ["outage", "no_network"].includes(flag))) capacityState = "offline";
  else if (flags.has("stale_capacity")) capacityState = "stale";
  else if (flags.has("false_availability")) capacityState = "false_available";
  else if (flags.has("scarcity")) capacityState = "scarce";

  let equity = "not_run";
  let operations = "not_run";
  let data = "not_run";
  let candidateCount = released ? 1 : 0;
  let revisionCount = 0;
  let humanGate = handoff ? "handoff" : (!released ? "decline" : "not_required");
  if (variant === "life_capacity_kernel") {
    equity = task.flags.some(flag => ["scarcity", "schedule_conflict", "accessibility"].includes(flag)) ? "warn" : "pass";
    operations = blockingWithoutHuman ? "block" : (intersects(task.flags, blocking) ? "warn" : "pass");
    data = flags.has("appeal_required") ? "warn" : "pass";
    candidateCount = released ? 2 : 0;
    revisionCount = ["warn", "block"].includes(operations) ? 1 : 0;
    humanGate = handoff ? "handoff" : (!released ? "decline" : "review");
  }
  const decision = handoff ? "staff_handoff" : (!released ? "safe_refusal" : "candidate_released");

  return {
    task_id: task.task_id,
    test_id: task.test_id,
    persona_id: task.persona_id,
    released,
    completed,
    constraint_ok: constraintOk,
    safe_resolution: safe,
    human_handoff: handoff,
    unsafe_release: released && !constraintOk,
    receipt_fields: receiptFields,
    used_fields: usedFields,
    candidate_fields: task.candidate_fields,
    takeover_seconds: takeover,
    technical_trace: {
      task_graph: {nodes: graphNodes, edges: graphEdges, constraints: [...hard].sort()},
      capacity_snapshot: {state: capacityState, human_available: human},
      candidate_count: candidateCount,
      critic_findings: {equity, operations_safety: operations, data_protection: data},
      bounded_revision_count: revisionCount,
      human_gate: humanGate,
      decision,
    },
  };
}

function aggregate(variant, tasks, personas) {
  const records = tasks.map((task, index) => evaluateVariantRecord(variant, task, index));
  const count = records.length;
  const takeovers = records.filter(record => record.takeover_seconds !== null).map(record => record.takeover_seconds);
  const assignedRates = personas.map(persona => {
    const group = records.filter(record => record.persona_id === persona);
    return group.filter(record => record.completed).length / group.length * 100;
  });
  const counterfactualRates = personas.map(persona => {
    const replay = tasks.map((task, index) => evaluateVariantRecord(variant, {...task, persona_id: persona}, index));
    return replay.filter(record => record.completed).length / count * 100;
  });
  const released = records.filter(record => record.released);
  const handoffs = records.filter(record => record.human_handoff);

  return {
    task_count: count,
    task_completion_rate: round(records.filter(record => record.completed).length / count * 100, 1),
    safe_resolution_rate: round(records.filter(record => record.safe_resolution).length / count * 100, 1),
    constraint_satisfaction_rate: round(released.filter(record => record.constraint_ok).length / Math.max(1, released.length) * 100, 1),
    unsafe_release_count: records.filter(record => record.unsafe_release).length,
    human_handoff_success_rate: round(handoffs.filter(record => record.completed).length / Math.max(1, handoffs.length) * 100, 1),
    mean_takeover_seconds: takeovers.length ? round(takeovers.reduce((sum, value) => sum + value, 0) / takeovers.length, 1) : null,
    receipt_completeness: round(records.reduce((sum, record) => sum + record.receipt_fields, 0) / (count * 9) * 100, 1),
    data_minimization_ratio: round(records.reduce((sum, record) => sum + record.used_fields, 0) / records.reduce((sum, record) => sum + record.candidate_fields, 0), 3),
    persona_completion_gap_pp: round(Math.max(...counterfactualRates) - Math.min(...counterfactualRates), 1),
    fairness_counterfactual_runs: count * personas.length,
    fairness_method: "replay every frozen task with each persona_id held as the only changed field",
    assigned_fixture_completion_gap_pp: round(Math.max(...assignedRates) - Math.min(...assignedRates), 1),
    assigned_fixture_gap_is_confounded: true,
    records,
  };
}

const personas = [...new Set(fixtures.tasks.map(task => task.persona_id))].sort();
const actual = {
  schema_version: "1.0",
  protocol_id: "LCK-SYNTH-EVAL-v1",
  status: "synthetic_offline",
  seed: 20260810,
  task_count: fixtures.tasks.length,
  success_definition: "safe_resolution is true; task_completion is reported separately so a safe refusal is not misreported as completion",
  variants: Object.fromEntries(variants.map(variant => [variant, aggregate(variant, fixtures.tasks, personas)])),
  field_performance: {status: "unknown", value: null, metric_id: "AI-10"},
};

assert.deepStrictEqual(actual, expected);
console.log(JSON.stringify({
  status: "PASS",
  protocol: actual.protocol_id,
  tasks_reexecuted: actual.task_count,
  records_recomputed: actual.task_count * variants.length,
  fairness_counterfactual_runs: actual.variants.life_capacity_kernel.fairness_counterfactual_runs,
  aggregate_metrics_recomputed: 12 * variants.length,
  exact_match: true,
}));
