#!/usr/bin/env node
"use strict";

/**
 * Deterministic synthetic regression runner for RailWeave weave contracts.
 *
 * This runner uses only Node.js built-ins. It checks package structure,
 * executes the six declared synthetic branches for S01-S12, and writes a
 * receipt. PASS is deliberately narrow: protocol logic only, never field
 * performance, legal compliance, public safety, accessibility quality,
 * professional approval, procurement feasibility, or implementation authority.
 */

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const RUNNER_VERSION = "1.0.0";
const HERE = __dirname;
const DEFAULT_CONTRACTS = path.join(HERE, "weave_contracts.json");
const DEFAULT_CASES = path.join(HERE, "synthetic_cases.json");
const DEFAULT_RECEIPT = path.join(HERE, "receipt.json");

const SCENARIO_IDS = Array.from({ length: 12 }, (_, index) =>
  `S${String(index + 1).padStart(2, "0")}`,
);
const BRANCHES = [
  "normal",
  "missing_human_review",
  "missing_ordinary_fallback",
  "data_boundary_violation",
  "responsibility_drift",
  "unweave_failure",
];
const REQUIRED_CONTRACT_FIELDS = [
  "scenario_id",
  "title_zh",
  "公共问题",
  "经线保障",
  "纬线接入",
  "结点责任",
  "数据禁区",
  "人工复核",
  "普通服务等价",
  "解编触发",
  "残留维护物",
  "织体成熟门",
  "线程准入门",
];

const PROOF_BOUNDARY_ZH =
  "PASS 只证明 RailWeave 织入契约对这 72 个合成分支按预期失败关闭；" +
  "不证明现场绩效、法律合规、公共安全、无障碍质量、采购可行性、" +
  "专业审定或实施授权。";
const PROOF_BOUNDARY_EN =
  "PASS proves only that the RailWeave weave contracts fail closed as expected " +
  "for these 72 synthetic branches. It does not prove field performance, legal " +
  "compliance, public safety, accessibility quality, procurement feasibility, " +
  "professional approval, or implementation authority.";

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class CheckBook {
  constructor() {
    this.total = 0;
  }

  require(condition, label) {
    this.total += 1;
    if (!condition) {
      throw new ValidationError(label);
    }
  }
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function loadJson(filePath) {
  let value;
  try {
    value = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new ValidationError(`cannot load valid JSON from ${filePath}: ${error.message}`);
  }
  if (!isObject(value)) {
    throw new ValidationError(`top-level JSON value must be an object: ${filePath}`);
  }
  return value;
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function isNonempty(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length > 0;
  }
  return true;
}

function sameSet(left, right) {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  return leftSet.size === rightSet.size && [...leftSet].every((item) => rightSet.has(item));
}

function sortedObject(counter) {
  return Object.fromEntries([...counter.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

function increment(counter, key) {
  counter.set(key, (counter.get(key) || 0) + 1);
}

function validateGate(checks, scenarioId, gateName, gate, expectedKind, expectedOtherGate) {
  checks.require(isObject(gate), `${scenarioId} ${gateName} must be an object`);
  checks.require(gate.gate_kind === expectedKind, `${scenarioId} ${gateName} has the wrong gate_kind`);
  checks.require(gate.independent === true, `${scenarioId} ${gateName} must declare independence`);
  checks.require(
    gate.cannot_substitute === expectedOtherGate,
    `${scenarioId} ${gateName} must forbid substitution by the other gate`,
  );
  checks.require(isNonempty(gate.decision_owner), `${scenarioId} ${gateName} needs a decision owner`);
  const gateChecks = gate.required_checks;
  checks.require(
    Array.isArray(gateChecks) && gateChecks.length >= 3,
    `${scenarioId} ${gateName} needs at least three checks`,
  );
  const checkIds = [];
  for (const item of gateChecks) {
    checks.require(isObject(item), `${scenarioId} ${gateName} check must be an object`);
    checks.require(isNonempty(item.check_id), `${scenarioId} ${gateName} check_id missing`);
    checks.require(isNonempty(item.question), `${scenarioId} ${gateName} question missing`);
    checks.require(isNonempty(item.required_evidence), `${scenarioId} ${gateName} evidence missing`);
    checkIds.push(item.check_id);
  }
  checks.require(
    checkIds.length === new Set(checkIds).size,
    `${scenarioId} ${gateName} check_ids must be unique`,
  );
}

function validateContracts(checks, document) {
  checks.require(
    document.status === "conceptual_protocol_for_synthetic_verification_only",
    "contracts status must remain synthetic-only",
  );
  checks.require(
    (document.proof_boundary_zh || "").includes("不证明现场绩效"),
    "contracts must state the field-performance proof boundary",
  );
  checks.require(
    document.gate_independence?.field_use_requires_both === true,
    "field use must require both independent gates",
  );
  const roleReference = document.role_reference;
  checks.require(isObject(roleReference) && Object.keys(roleReference).length > 0, "role_reference missing");

  const contracts = document.contracts;
  checks.require(Array.isArray(contracts), "contracts must be an array");
  checks.require(contracts.length === 12, "exactly 12 contracts are required");
  const byId = new Map();

  for (const contract of contracts) {
    checks.require(isObject(contract), "each contract must be an object");
    const scenarioId = contract.scenario_id;
    checks.require(SCENARIO_IDS.includes(scenarioId), `unexpected scenario_id: ${scenarioId}`);
    checks.require(!byId.has(scenarioId), `duplicate scenario_id: ${scenarioId}`);
    for (const field of REQUIRED_CONTRACT_FIELDS) {
      checks.require(isNonempty(contract[field]), `${scenarioId} missing ${field}`);
    }

    const node = contract["结点责任"];
    checks.require(isObject(node), `${scenarioId} 结点责任 must be an object`);
    for (const roleField of ["accountable_role", "operating_role", "independent_review_role"]) {
      const role = node[roleField];
      checks.require(
        Object.prototype.hasOwnProperty.call(roleReference, role),
        `${scenarioId} unknown ${roleField}: ${role}`,
      );
    }
    checks.require(isNonempty(node.authority_boundary), `${scenarioId} authority boundary missing`);

    const forbidden = contract["数据禁区"];
    checks.require(
      Array.isArray(forbidden) && forbidden.length >= 3,
      `${scenarioId} needs at least three forbidden data classes`,
    );
    checks.require(
      forbidden.length === new Set(forbidden).size,
      `${scenarioId} forbidden data must be unique`,
    );

    const human = contract["人工复核"];
    checks.require(human.required === true, `${scenarioId} human review must be required`);
    checks.require(
      Object.prototype.hasOwnProperty.call(roleReference, human.reviewer_role),
      `${scenarioId} reviewer role invalid`,
    );
    checks.require(isNonempty(human.triggers), `${scenarioId} human review triggers missing`);
    checks.require(isNonempty(human.required_record), `${scenarioId} human review record missing`);

    const ordinary = contract["普通服务等价"];
    checks.require(ordinary.required === true, `${scenarioId} ordinary equivalence must be required`);
    checks.require(isNonempty(ordinary.channels), `${scenarioId} ordinary channels missing`);
    checks.require(isNonempty(ordinary.no_penalty_rule), `${scenarioId} no-penalty rule missing`);
    checks.require(isNonempty(ordinary.evidence_required), `${scenarioId} ordinary evidence missing`);

    const unweave = contract["解编触发"];
    checks.require(isNonempty(unweave.triggers), `${scenarioId} unweave triggers missing`);
    checks.require(isNonempty(unweave.immediate_action), `${scenarioId} unweave action missing`);
    checks.require(isNonempty(unweave.restoration_receipt), `${scenarioId} restoration receipt missing`);

    const residual = contract["残留维护物"];
    checks.require(isNonempty(residual.artifacts), `${scenarioId} residual artifacts missing`);
    checks.require(
      Object.prototype.hasOwnProperty.call(roleReference, residual.steward_role),
      `${scenarioId} steward role invalid`,
    );
    checks.require(isNonempty(residual.maintenance_horizon), `${scenarioId} maintenance horizon missing`);

    validateGate(
      checks,
      scenarioId,
      "织体成熟门",
      contract["织体成熟门"],
      "spatial_delivery_maturity",
      "线程准入门",
    );
    validateGate(
      checks,
      scenarioId,
      "线程准入门",
      contract["线程准入门"],
      "ai_service_admission",
      "织体成熟门",
    );
    byId.set(scenarioId, contract);
  }

  checks.require(sameSet(byId.keys(), SCENARIO_IDS), "contracts must cover S01-S12 exactly");

  const s06 = byId.get("S06")["实施切片_90日"];
  checks.require(isObject(s06), "S06 must include 实施切片_90日");
  checks.require(
    s06.status === "conceptual_pre_registration_not_an_approved_schedule",
    "S06 90-day slice must remain a conceptual preregistration",
  );
  for (const segment of ["days_0_30", "days_31_60", "days_61_90"]) {
    checks.require(isObject(s06[segment]), `S06 missing ${segment}`);
    checks.require(isNonempty(s06[segment].purpose), `S06 ${segment} purpose missing`);
    checks.require(isNonempty(s06[segment].required_actions), `S06 ${segment} actions missing`);
    checks.require(isNonempty(s06[segment].gate), `S06 ${segment} gate missing`);
  }
  const reserve = s06.exit_reserve;
  checks.require(isObject(reserve), "S06 exit_reserve missing");
  checks.require(
    reserve.percentage_status === "not_prescribed" && reserve.amount_status === "unpriced_unapproved",
    "S06 exit resources must remain unpriced, unapproved and without a prescribed percentage",
  );
  checks.require(
    isNonempty(reserve.sufficiency_standard_zh) && isNonempty(reserve.required_evidence),
    "S06 exit resource sufficiency standard or evidence list missing",
  );
  checks.require(isNonempty(reserve.covered_items), "S06 exit reserve covered items missing");
  checks.require(
    (reserve.boundary_zh || "").includes("不是报价"),
    "S06 exit reserve needs a non-budget boundary",
  );
  return byId;
}

function validateCases(checks, document, contracts) {
  checks.require(
    document.status === "synthetic_protocol_regression_only",
    "case suite status must remain synthetic-only",
  );
  checks.require(
    (document.proof_boundary_zh || "").includes("不证明现场绩效"),
    "case suite must state the field-performance proof boundary",
  );
  const definitions = document.branch_definitions;
  checks.require(isObject(definitions), "branch_definitions must be an object");
  checks.require(
    sameSet(Object.keys(definitions), BRANCHES),
    "branch_definitions must contain the six canonical branches",
  );
  for (const branch of BRANCHES) {
    const definition = definitions[branch];
    checks.require(isObject(definition), `branch ${branch} must be an object`);
    for (const field of ["description_zh", "mutation", "expected_decision", "expected_reason"]) {
      checks.require(isNonempty(definition[field]), `branch ${branch} missing ${field}`);
    }
    checks.require(
      ["PASS", "BLOCK"].includes(definition.expected_decision),
      `branch ${branch} has invalid expected decision`,
    );
  }

  const cases = document.cases;
  checks.require(Array.isArray(cases), "cases must be an array");
  checks.require(cases.length === 72, "exactly 72 cases are required");
  const caseIds = new Set();
  const branchesByScenario = new Map();
  for (const testCase of cases) {
    checks.require(isObject(testCase), "each case must be an object");
    const caseId = testCase.case_id;
    const scenarioId = testCase.scenario_id;
    const branch = testCase.branch;
    checks.require(isNonempty(caseId), "case_id missing");
    checks.require(!caseIds.has(caseId), `duplicate case_id: ${caseId}`);
    checks.require(contracts.has(scenarioId), `case ${caseId} has unknown scenario`);
    checks.require(Object.prototype.hasOwnProperty.call(definitions, branch), `case ${caseId} has unknown branch`);
    caseIds.add(caseId);
    if (!branchesByScenario.has(scenarioId)) {
      branchesByScenario.set(scenarioId, []);
    }
    branchesByScenario.get(scenarioId).push(branch);
  }

  checks.require(caseIds.size === 72, "case_ids must be unique");
  checks.require(
    sameSet(branchesByScenario.keys(), SCENARIO_IDS),
    "cases must cover S01-S12",
  );
  for (const scenarioId of SCENARIO_IDS) {
    const branches = branchesByScenario.get(scenarioId);
    checks.require(branches.length === 6, `${scenarioId} must have six cases`);
    checks.require(sameSet(branches, BRANCHES), `${scenarioId} must have each branch once`);
  }
  return { cases, definitions };
}

function defaultState(contract) {
  return {
    fabric_maturity_gate_passed: true,
    thread_admission_gate_passed: true,
    human_review_present: true,
    ordinary_service_equivalence_present: true,
    observed_data_classes: [],
    observed_accountable_role: contract["结点责任"].accountable_role,
    unweave_completed: true,
  };
}

function applyBranch(state, branch, contract) {
  switch (branch) {
    case "normal":
      return;
    case "missing_human_review":
      state.human_review_present = false;
      return;
    case "missing_ordinary_fallback":
      state.ordinary_service_equivalence_present = false;
      return;
    case "data_boundary_violation":
      state.observed_data_classes = [contract["数据禁区"][0]];
      return;
    case "responsibility_drift":
      state.observed_accountable_role = "UNASSIGNED";
      return;
    case "unweave_failure":
      state.unweave_completed = false;
      return;
    default:
      throw new ValidationError(`unsupported branch: ${branch}`);
  }
}

function decide(contract, state) {
  if (!state.fabric_maturity_gate_passed) {
    return ["BLOCK", "FABRIC_MATURITY_GATE_FAILED"];
  }
  if (!state.thread_admission_gate_passed) {
    return ["BLOCK", "THREAD_ADMISSION_GATE_FAILED"];
  }
  if (!state.human_review_present) {
    return ["BLOCK", "HUMAN_REVIEW_MISSING"];
  }
  if (!state.ordinary_service_equivalence_present) {
    return ["BLOCK", "ORDINARY_SERVICE_EQUIVALENCE_MISSING"];
  }
  const forbidden = new Set(contract["数据禁区"]);
  if (state.observed_data_classes.some((item) => forbidden.has(item))) {
    return ["BLOCK", "DATA_BOUNDARY_VIOLATION"];
  }
  if (state.observed_accountable_role !== contract["结点责任"].accountable_role) {
    return ["BLOCK", "RESPONSIBILITY_DRIFT"];
  }
  if (!state.unweave_completed) {
    return ["BLOCK", "UNWEAVE_INCOMPLETE"];
  }
  return ["PASS", "OK"];
}

function runSuite(contractsPath, casesPath, receiptPath) {
  const checks = new CheckBook();
  const contractsDocument = loadJson(contractsPath);
  const casesDocument = loadJson(casesPath);
  const contracts = validateContracts(checks, contractsDocument);
  const { cases, definitions } = validateCases(checks, casesDocument, contracts);

  const results = [];
  const decisionCounts = new Map();
  const reasonCounts = new Map();
  const branchCounts = new Map();
  const scenarioBranchCounts = new Map();
  let caseAssertions = 0;
  let caseAssertionsPassed = 0;

  for (const testCase of cases) {
    const contract = contracts.get(testCase.scenario_id);
    const definition = definitions[testCase.branch];
    const state = defaultState(contract);
    applyBranch(state, testCase.branch, contract);
    const [decision, reason] = decide(contract, state);
    const expectedDecision = definition.expected_decision;
    const expectedReason = definition.expected_reason;

    const decisionOk = decision === expectedDecision;
    const reasonOk = reason === expectedReason;
    caseAssertions += 2;
    caseAssertionsPassed += Number(decisionOk) + Number(reasonOk);
    if (!decisionOk || !reasonOk) {
      throw new ValidationError(
        `${testCase.case_id} expected ${expectedDecision}/${expectedReason}, got ${decision}/${reason}`,
      );
    }

    increment(decisionCounts, decision);
    increment(reasonCounts, reason);
    increment(branchCounts, testCase.branch);
    if (!scenarioBranchCounts.has(testCase.scenario_id)) {
      scenarioBranchCounts.set(testCase.scenario_id, new Map());
    }
    increment(scenarioBranchCounts.get(testCase.scenario_id), testCase.branch);
    results.push({
      case_id: testCase.case_id,
      scenario_id: testCase.scenario_id,
      branch: testCase.branch,
      decision,
      reason,
      assertions_passed: 2,
    });
  }

  const totalAssertions = checks.total + caseAssertions;
  const scenarioCounts = {};
  for (const scenarioId of SCENARIO_IDS) {
    scenarioCounts[scenarioId] = sortedObject(scenarioBranchCounts.get(scenarioId));
  }
  const receipt = {
    schema_version: "0.1.0",
    suite_id: casesDocument.suite_id,
    runner: "visual/assets/railweave_runner.js",
    runner_version: RUNNER_VERSION,
    result: "PASS",
    proof_scope: "synthetic_protocol_logic_only",
    proof_boundary_zh: PROOF_BOUNDARY_ZH,
    proof_boundary_en: PROOF_BOUNDARY_EN,
    inputs: {
      "weave_contracts.json": sha256(contractsPath),
      "synthetic_cases.json": sha256(casesPath),
    },
    counts: {
      contracts: contracts.size,
      cases: cases.length,
      branches: BRANCHES.length,
      pass_decisions: decisionCounts.get("PASS") || 0,
      blocked_decisions: decisionCounts.get("BLOCK") || 0,
    },
    assertions: {
      structural: checks.total,
      case_decision_and_reason: caseAssertions,
      total: totalAssertions,
      passed: checks.total + caseAssertionsPassed,
      failed: totalAssertions - checks.total - caseAssertionsPassed,
    },
    branch_counts: sortedObject(branchCounts),
    decision_counts: sortedObject(decisionCounts),
    reason_counts: sortedObject(reasonCounts),
    scenario_branch_counts: scenarioCounts,
    s06_90_day_slice: {
      present: true,
      segments: ["days_0_30", "days_31_60", "days_61_90"],
      exit_resource_standard: "verified_itemised_resources_sufficient_for_restoration",
      exit_resource_amount_status: "unpriced_unapproved",
      status: "conceptual_pre_registration_not_an_approved_schedule",
    },
    case_results: results,
  };

  fs.mkdirSync(path.dirname(receiptPath), { recursive: true });
  fs.writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
  return receipt;
}

function parseArgs(argv) {
  const options = {
    contracts: DEFAULT_CONTRACTS,
    cases: DEFAULT_CASES,
    receipt: DEFAULT_RECEIPT,
  };
  const flags = new Map([
    ["--contracts", "contracts"],
    ["--cases", "cases"],
    ["--receipt", "receipt"],
  ]);
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (!flags.has(flag) || index + 1 >= argv.length) {
      throw new ValidationError(`usage: ${path.basename(process.argv[1])} [--contracts PATH] [--cases PATH] [--receipt PATH]`);
    }
    options[flags.get(flag)] = path.resolve(argv[index + 1]);
    index += 1;
  }
  return options;
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    const receipt = runSuite(options.contracts, options.cases, options.receipt);
    const counts = receipt.counts;
    const assertions = receipt.assertions;
    process.stdout.write(
      `PASS: contracts=${counts.contracts} cases=${counts.cases} ` +
        `pass=${counts.pass_decisions} block=${counts.blocked_decisions} ` +
        `assertions=${assertions.passed}/${assertions.total}\n`,
    );
    process.stdout.write(`${PROOF_BOUNDARY_EN}\n`);
    process.stdout.write(`receipt=${options.receipt}\n`);
    return 0;
  } catch (error) {
    if (error instanceof ValidationError) {
      process.stderr.write(`FAIL: ${error.message}\n`);
      return 1;
    }
    throw error;
  }
}

process.exitCode = main();
