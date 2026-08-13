#!/usr/bin/env node
/*
 * 场景 14 城市议题路由台合成桌面推演器。
 * Zero dependencies, no network, no personal data, no writes.
 * PASS means eligible for human review only. It never authorizes a field run.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const HERE = __dirname;

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(HERE, name), "utf8"));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.keys(value).sort().reduce((result, key) => {
      result[key] = stable(value[key]);
      return result;
    }, {});
  }
  return value;
}

function addReason(reasons, code) {
  if (!reasons.includes(code)) reasons.push(code);
}

function applyMutation(baseCase, fixture) {
  const value = clone(baseCase);
  value.case_id = fixture.case_id;
  value.title_zh = fixture.title_zh;
  value.expected_decision = fixture.expected_decision;
  value.expected_reason = fixture.expected_reason;
  const mutation = fixture.mutation;

  if (mutation.type === "add_issue_field") {
    value.issue[mutation.field] = mutation.value;
  } else if (mutation.type === "remove_role_assignment") {
    delete value.role_assignments[mutation.role];
  } else if (mutation.type === "set_control") {
    value.controls[mutation.control] = mutation.value;
  } else if (mutation.type === "trigger_red_card_pending") {
    value.red_card = {
      holder_role: "affected_group_steward",
      triggered: true,
      reason: mutation.reason,
    };
    value.independent_appeal = {
      required: true,
      completed: false,
      officer_role: "independent_appeal_officer",
      outcome: "pending",
      reason: "独立复核尚未完成。",
    };
    value.human_review.rehearsal_decision = "hold";
  } else if (mutation.type === "overlap_appeal_assignee") {
    value.role_assignments.independent_appeal_officer = value.role_assignments.scenario_owner;
  } else if (mutation.type === "retire_after_independent_review") {
    value.red_card = {
      holder_role: "affected_group_steward",
      triggered: true,
      reason: mutation.reason,
    };
    value.independent_appeal = {
      required: true,
      completed: true,
      officer_role: "independent_appeal_officer",
      outcome: "retire",
      reason: "合成复核确认服务等价失败，Branch 应退役。",
    };
    value.human_review.rehearsal_decision = "retire";
    value.human_review.reason = "红牌由独立角色复核确认；执行删除、回滚、人工服务恢复和公开回执。";
  } else {
    throw new Error(`Unknown mutation type: ${mutation.type}`);
  }
  return value;
}

function evidenceComplete(contract, fixture, reasons) {
  let complete = true;
  for (const evidenceId of contract.required_evidence) {
    const item = fixture.evidence && fixture.evidence[evidenceId];
    if (!item || typeof item !== "object") {
      addReason(reasons, `EVIDENCE_MISSING:${evidenceId}`);
      complete = false;
      continue;
    }
    for (const field of contract.evidence_contract.required_fields) {
      if (typeof item[field] !== "string" || item[field].trim() === "") {
        addReason(reasons, `EVIDENCE_FIELD_MISSING:${evidenceId}:${field}`);
        complete = false;
      }
    }
    if (item.status !== contract.evidence_contract.allowed_status) {
      addReason(reasons, `EVIDENCE_STATUS_INVALID:${evidenceId}`);
      complete = false;
    }
    const assigned = fixture.role_assignments && fixture.role_assignments[item.owner_role];
    if (typeof assigned !== "string" || assigned.trim() === "") {
      addReason(reasons, `EVIDENCE_OWNER_UNASSIGNED:${evidenceId}`);
      complete = false;
    }
  }
  return complete;
}

function evaluate(contract, fixture) {
  const reasons = [];

  if (fixture.synthetic !== true) addReason(reasons, "SYNTHETIC_FLAG_REQUIRED");
  if (fixture.field_run !== false) addReason(reasons, "FIELD_RUN_MUST_BE_FALSE");

  if (!fixture.issue || typeof fixture.issue !== "object") {
    addReason(reasons, "ISSUE_OBJECT_MISSING");
  } else {
    for (const field of contract.required_issue_fields) {
      const value = fixture.issue[field];
      if (
        value === null
        || value === undefined
        || (typeof value === "string" && value.trim() === "")
        || (Array.isArray(value) && value.length === 0)
      ) {
        addReason(reasons, `ISSUE_FIELD_MISSING:${field}`);
      }
    }
    for (const field of Object.keys(fixture.issue)) {
      if (contract.forbidden_issue_fields.includes(field)) {
        addReason(reasons, `FORBIDDEN_ISSUE_FIELD:${field}`);
      } else if (!contract.allowed_issue_fields.includes(field)) {
        addReason(reasons, `UNDECLARED_ISSUE_FIELD:${field}`);
      }
    }
    if (!contract.allowed_data_classifications.includes(fixture.issue.data_classification)) {
      addReason(reasons, "DATA_CLASSIFICATION_NOT_ALLOWED");
    }
  }

  for (const role of contract.required_roles) {
    const assignee = fixture.role_assignments && fixture.role_assignments[role];
    if (typeof assignee !== "string" || assignee.trim() === "") {
      addReason(reasons, `ROLE_ASSIGNMENT_MISSING:${role}`);
    }
  }
  for (const [raciClass, roles] of Object.entries(contract.raci_contract)) {
    if (raciClass === "independence_rule") continue;
    const declared = fixture.raci && fixture.raci[raciClass];
    for (const role of roles) {
      if (!Array.isArray(declared) || !declared.includes(role)) {
        addReason(reasons, `RACI_ROLE_MISSING:${raciClass}:${role}`);
      }
    }
  }

  const initialRoles = fixture.human_review && fixture.human_review.initial_review_roles;
  const appealRole = fixture.independent_appeal && fixture.independent_appeal.officer_role;
  const appealAssignee = fixture.role_assignments && fixture.role_assignments[appealRole];
  if (!Array.isArray(initialRoles) || initialRoles.length === 0) {
    addReason(reasons, "INITIAL_REVIEW_ROLES_MISSING");
  } else if (initialRoles.some((role) => (
    fixture.role_assignments && fixture.role_assignments[role] === appealAssignee
  ))) {
    addReason(reasons, "APPEAL_NOT_INDEPENDENT");
  }

  if (!fixture.controls || typeof fixture.controls !== "object") {
    addReason(reasons, "CONTROLS_MISSING");
  } else {
    if (
      typeof fixture.controls.same_task_non_ai_route !== "string"
      || fixture.controls.same_task_non_ai_route.trim() === ""
    ) addReason(reasons, "NON_AI_ROUTE_MISSING");
    if (fixture.controls.human_reassignment_available !== true) {
      addReason(reasons, "HUMAN_REASSIGNMENT_UNAVAILABLE");
    }
    if (fixture.controls.consent_withdrawal_available !== true) {
      addReason(reasons, "CONSENT_WITHDRAWAL_UNAVAILABLE");
    }
    if (fixture.controls.public_priority_set_by_ai !== false) {
      addReason(reasons, "AI_PUBLIC_PRIORITY_FORBIDDEN");
    }
  }

  const allEvidenceComplete = evidenceComplete(contract, fixture, reasons);
  const redCard = fixture.red_card || {};
  const appeal = fixture.independent_appeal || {};
  if (redCard.holder_role !== contract.red_card_rule.holder_role) {
    addReason(reasons, "RED_CARD_HOLDER_INVALID");
  }

  let decision = "HOLD";
  let decisionReason = "FAIL_CLOSED_RULE_VIOLATION";
  if (reasons.length === 0 && redCard.triggered === true) {
    if (appeal.required !== true || appeal.completed !== true) {
      decisionReason = "RED_CARD_APPEAL_PENDING";
    } else if (appeal.outcome === "retire" && allEvidenceComplete) {
      decision = "RETIRED";
      decisionReason = "RED_CARD_UPHELD_RETIRE";
    } else {
      decisionReason = "RED_CARD_NO_EXPLICIT_RESOLUTION";
    }
  } else if (
    reasons.length === 0
    && redCard.triggered === false
    && fixture.human_review
    && fixture.human_review.rehearsal_decision === "pass_for_human_review"
  ) {
    decision = "PASS";
    decisionReason = "SYNTHETIC_PACKAGE_READY_FOR_HUMAN_REVIEW";
  }

  if (redCard.triggered === true && (appeal.required !== true || appeal.completed !== true)) {
    addReason(reasons, "RED_CARD_APPEAL_PENDING");
    decision = "HOLD";
    decisionReason = "RED_CARD_APPEAL_PENDING";
  }
  if (decision === "HOLD" && reasons.length === 0) addReason(reasons, decisionReason);
  if (decision === "RETIRED") addReason(reasons, decisionReason);

  return {
    decision,
    decision_reason: decisionReason,
    reasons,
    evidence_complete: allEvidenceComplete,
  };
}

function makeReceipt(contract, fixture, result) {
  return {
    receipt_id: `RECEIPT-${fixture.case_id}`,
    contract_id: contract.contract_id,
    scenario_id: contract.scenario_id,
    case_id: fixture.case_id,
    execution_status: "synthetic_offline_rehearsal_complete",
    synthetic: true,
    field_run: false,
    human_decision_required: true,
    decision: result.decision,
    decision_meaning: contract.decision_meanings[result.decision],
    decision_reason: result.decision_reason,
    reasons: result.reasons,
    expectation: {
      expected_decision: fixture.expected_decision,
      expected_reason: fixture.expected_reason || null,
      matched: result.decision === fixture.expected_decision
        && (!fixture.expected_reason || result.reasons.includes(fixture.expected_reason)),
    },
    raci: clone(fixture.raci),
    red_card: clone(fixture.red_card),
    independent_appeal: clone(fixture.independent_appeal),
    evidence: clone(fixture.evidence),
    evidence_complete: result.evidence_complete,
    field_status: "synthetic_only_not_authorized_not_run",
  };
}

function buildRun() {
  const contract = readJson("contract.json");
  const positive = readJson("fixtures.positive.json");
  const negative = readJson("fixtures.negative.json");
  if (positive.contract_id !== contract.contract_id || negative.contract_id !== contract.contract_id) {
    throw new Error("Fixture contract_id does not match contract.json");
  }
  const fixtures = [
    ...positive.cases.map(clone),
    ...negative.cases.map((item) => applyMutation(negative.base_case, item)),
  ];
  const receipts = fixtures.map((fixture) => makeReceipt(contract, fixture, evaluate(contract, fixture)));
  const counts = receipts.reduce((result, receipt) => {
    result[receipt.decision] += 1;
    return result;
  }, { PASS: 0, HOLD: 0, RETIRED: 0 });
  return stable({
    schema_version: "1.0.0",
    run_id: "OJZ-S14-SYNTHETIC-TABLETOP-001",
    contract_id: contract.contract_id,
    scenario_id: contract.scenario_id,
    status: "synthetic_offline_rehearsal_complete",
    execution_status: "synthetic_offline_rehearsal_complete",
    synthetic: true,
    field_run: false,
    human_decision_required: true,
    field_status: "not_authorized_not_run",
    writes_files: false,
    uses_network: false,
    case_count: receipts.length,
    decision_counts: counts,
    all_expectations_matched: receipts.every((receipt) => receipt.expectation.matched),
    limitations_zh: "结果仅证明当前规则能对合成样例执行 PASS、HOLD、RETIRED 分类；不证明真实议题优先级、现场服务、合规性、政府采纳或实施授权。",
    limitations_en: "Results prove only that the current rules classify synthetic fixtures as PASS, HOLD, or RETIRED; they do not prove real civic priority, field service, compliance, government adoption, or implementation authorisation.",
    receipts,
  });
}

function assertCommitted(run) {
  const committed = stable(readJson("receipts.json"));
  if (JSON.stringify(committed) !== JSON.stringify(run)) {
    throw new Error("Committed receipts.json differs from the deterministic tabletop run");
  }
}

function main(argv) {
  const run = buildRun();
  if (!run.all_expectations_matched) throw new Error("One or more synthetic fixtures were misclassified");
  if (argv.includes("--write-receipts")) {
    fs.writeFileSync(path.join(HERE, "receipts.json"), `${JSON.stringify(run, null, 2)}\n`, "utf8");
    process.stdout.write(
      `WROTE receipts.json: ${run.case_count} synthetic fixtures; `
        + `${run.decision_counts.PASS} PASS, ${run.decision_counts.HOLD} HOLD, `
        + `${run.decision_counts.RETIRED} RETIRED; field run: false.\n`
    );
    return;
  }
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(run, null, 2)}\n`);
    return;
  }
  assertCommitted(run);
  process.stdout.write(
    `PASS: ${run.case_count}/${run.case_count} synthetic fixtures matched expectations; `
      + `${run.decision_counts.PASS} PASS, ${run.decision_counts.HOLD} HOLD, `
      + `${run.decision_counts.RETIRED} RETIRED; field run: false.\n`
  );
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`FAIL: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { applyMutation, buildRun, evaluate, stable };
