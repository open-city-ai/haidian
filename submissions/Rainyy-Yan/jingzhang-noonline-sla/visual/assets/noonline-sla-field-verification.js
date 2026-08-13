#!/usr/bin/env node
"use strict";

/*
 * Jing-Zhang Noonline SLA field-verification workflow.
 *
 * This module derives verification tasks from the existing Noonline SLA route
 * definitions. It is deliberately fail-closed: a task starts unknown and no AI
 * actor may create a field observation or promote it to verified/rejected.
 *
 * It does not fetch data, estimate facilities, or change the V1 verified SLA.
 */

const STATES = ["unknown", "scheduled", "observed", "verified", "rejected"];
const TRANSITIONS = {
  unknown: ["scheduled"],
  scheduled: ["observed"],
  observed: ["verified", "rejected"],
  verified: [],
  rejected: []
};

const ROUTE_TASK_SPECS = {
  shade_continuity: {
    label_zh: "遮阴连续性",
    label_en: "shade continuity",
    evidence_required: "Geolocated route-segment observation at the specified midday sampling window, including shade/solar-exposure record and attachment.",
    verification_method: "Walk the declared reference axis segment; record continuous shaded and exposed intervals with timestamped, geolocated evidence.",
    pass_condition: "Observed shaded coverage meets the pre-approved route threshold for the specified sampling window.",
    fail_condition: "A gap beyond the approved exposure threshold is observed, or the route cannot be observed safely.",
    sla_effect: "Blocks SLA-A promotion when not verified; rejection triggers route-service review."
  },
  continuous_exposure: {
    label_zh: "连续暴晒距离",
    label_en: "continuous exposure distance",
    evidence_required: "Timestamped, geolocated walking survey showing the longest continuously exposed interval.",
    verification_method: "Traverse the reference segment during the approved time window and measure each uninterrupted exposure interval.",
    pass_condition: "The longest exposed interval is within the pre-approved maximum.",
    fail_condition: "The longest exposed interval exceeds the pre-approved maximum or no reliable measurement is available.",
    sla_effect: "Blocks SLA-A promotion when not verified; rejection triggers route-service review."
  },
  summer_detour: {
    label_zh: "夏季实际绕行",
    label_en: "summer detour",
    evidence_required: "Geolocated accessible route trace comparing the declared reference route and the actual shade/access detour.",
    verification_method: "Walk the practical accessible alternative in the approved summer sampling window; record distance and access constraints.",
    pass_condition: "The measured detour is within the pre-approved threshold and preserves accessibility.",
    fail_condition: "The detour exceeds the threshold, becomes inaccessible, or cannot be completed.",
    sla_effect: "Blocks SLA-A promotion when not verified; rejection requires a remain-B or downgrade review."
  },
  static_wayfinding: {
    label_zh: "离线固定导向",
    label_en: "offline static wayfinding",
    evidence_required: "Photographic or documented proof of fixed, legible, low-technology wayfinding covering the declared reference route.",
    verification_method: "Walk the route with AI and mobile services unavailable; document each required direction/decision point.",
    pass_condition: "All required decision points have legible, durable offline guidance under the approved accessibility criteria.",
    fail_condition: "A required decision point lacks legible offline guidance or requires AI/mobile access to proceed.",
    sla_effect: "Blocks SLA-A promotion when not verified and affects AI-OFF support."
  }
};

const NODE_TASK_SPECS = {
  node_location: {
    label_zh: "节点真实位置",
    label_en: "actual node location",
    evidence_required: "Geolocated field record confirming the proposed node can be associated with a real, publicly accessible place or documenting why it cannot.",
    verification_method: "Visit the declared node context; record location, public accessibility and an attachment.",
    pass_condition: "The node can be located and its context supports the declared design role without claiming an existing service facility.",
    fail_condition: "The location is inaccessible, materially inconsistent with the declared role, or cannot be located.",
    sla_effect: "Blocks SLA-A promotion when the node is mandatory; rejection triggers siting revision or downgrade review."
  },
  rest_nodes: {
    label_zh: "座椅与休息节点",
    label_en: "seating and rest node",
    evidence_required: "Field record of publicly usable resting provision, condition, access and operating constraint at the declared node.",
    verification_method: "Observe the node, document seating/rest provision, accessibility, condition and availability.",
    pass_condition: "A usable, accessible rest opportunity is present and available under the approved service condition.",
    fail_condition: "No usable rest opportunity is present, access is blocked, or condition is unsafe/unavailable.",
    sla_effect: "Mandatory failures can keep the route at B or trigger downgrade review."
  },
  water_nodes: {
    label_zh: "饮水补给节点",
    label_en: "drinking-water node",
    evidence_required: "Field record of the actual public water option, availability status, access condition and source attachment.",
    verification_method: "Visit and document the water option and its availability without inferring water quality beyond approved evidence.",
    pass_condition: "A public, usable water option is accessible and available under the approved service condition.",
    fail_condition: "No usable option is present, access is blocked, or the option is unavailable.",
    sla_effect: "Mandatory failures can keep the route at B or trigger downgrade review."
  },
  public_entries: {
    label_zh: "公共入口开放条件",
    label_en: "public-entry access condition",
    evidence_required: "Timestamped access observation, including entrance identity, public-access condition and any opening constraint.",
    verification_method: "Observe the declared entry in the relevant midday period and document access and barrier-free condition.",
    pass_condition: "The entry is publicly accessible during the approved service window and meets the documented access condition.",
    fail_condition: "The entry is closed, restricted, inaccessible, or cannot support the declared route connection.",
    sla_effect: "Mandatory failures can keep the route at B or trigger downgrade review."
  },
  crossing_nodes: {
    label_zh: "关键过街条件",
    label_en: "critical crossing condition",
    evidence_required: "Field observation of the legal crossing, waiting condition, accessibility and route continuity at the declared node.",
    verification_method: "Observe and traverse the legal crossing during the approved period; document waiting and continuity conditions.",
    pass_condition: "A legal, accessible crossing maintains the declared route continuity under the approved condition.",
    fail_condition: "The crossing is unsafe, inaccessible, unavailable, or breaks route continuity.",
    sla_effect: "Mandatory failures can keep the route at B or trigger downgrade review."
  },
  human_fallback_nodes: {
    label_zh: "人工兜底服务",
    label_en: "staffed human fallback",
    evidence_required: "Documented responsible human role, service point, usable time window and low-technology fallback procedure.",
    verification_method: "Confirm the service role and availability through an authorized, recorded field/operational check.",
    pass_condition: "A responsible human service role and usable fallback procedure are confirmed for the approved window.",
    fail_condition: "No responsible role, time window, or usable fallback procedure is confirmed.",
    sla_effect: "Mandatory failures can keep the route at B or trigger downgrade review; AI cannot substitute for this condition."
  }
};

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

function routeMandatory(routeId) {
  return routeId === "SLA-A";
}

function taskId(routeId, kind, objectId) {
  return `FV-${routeId}-${kind.toUpperCase().replace(/_/g, "-")}-${objectId}`;
}

function makeTask({ route, kind, objectType, objectId, sourceCondition, mandatoryForSlaA }) {
  const spec = ROUTE_TASK_SPECS[kind] || NODE_TASK_SPECS[kind];
  if (!spec) throw new Error(`No verification specification for ${kind}`);
  return {
    task_id: taskId(route.route_id, kind, objectId),
    route_id: route.route_id,
    route: {
      id: route.route_id,
      name: route.name,
      path_ref: route.path_ref
    },
    object: {
      type: objectType,
      id: objectId,
      source_condition: sourceCondition
    },
    verification_type: kind,
    label_zh: spec.label_zh,
    label_en: spec.label_en,
    evidence_required: spec.evidence_required,
    verification_method: spec.verification_method,
    pass_condition: spec.pass_condition,
    fail_condition: spec.fail_condition,
    status: "unknown",
    confidence: "unknown",
    verifier: null,
    timestamp: null,
    evidence_reference: null,
    observation_note: null,
    mandatory_for_sla_a: mandatoryForSlaA,
    ai_mutation_permitted: false,
    sla_effect: spec.sla_effect,
    writeback: {
      target: "verification_ledger",
      on_verified: "eligible_for_promotion_gate_recheck",
      on_rejected: "promotion_blocked_and_route_review_required"
    }
  };
}

function unique(items) {
  return Array.from(new Set(items || []));
}

function deriveVerificationLedger(routes, fieldDataGaps) {
  const tasks = [];
  for (const route of Object.values(routes)) {
    const mandatoryForSlaA = routeMandatory(route.route_id);
    for (const kind of ["shade_continuity", "continuous_exposure", "summer_detour", "static_wayfinding"]) {
      tasks.push(makeTask({
        route,
        kind,
        objectType: "route",
        objectId: route.route_id,
        sourceCondition: kind,
        mandatoryForSlaA
      }));
    }
    for (const nodeId of unique(route.nodes)) {
      tasks.push(makeTask({
        route,
        kind: "node_location",
        objectType: "node",
        objectId: nodeId,
        sourceCondition: "service_node_locations_not_surveyed",
        mandatoryForSlaA
      }));
    }
    for (const kind of ["rest_nodes", "water_nodes", "public_entries", "crossing_nodes", "human_fallback_nodes"]) {
      for (const nodeId of unique(route.conditions[kind])) {
        tasks.push(makeTask({
          route,
          kind,
          objectType: "node",
          objectId: nodeId,
          sourceCondition: kind,
          mandatoryForSlaA
        }));
      }
    }
  }
  const duplicateIds = tasks.map((task) => task.task_id).filter((id, index, all) => all.indexOf(id) !== index);
  if (duplicateIds.length) throw new Error(`Duplicate verification task IDs: ${duplicateIds.join(", ")}`);
  return {
    schema_version: "1.0.0",
    ledger_id: "jingzhang-noonline-sla-field-verification-ledger",
    generated_by: "noonline-sla-field-verification.js",
    generation_method: "Deterministically derived from existing Noonline SLA route conditions and field data gaps; no field result is inferred.",
    source_field_data_gaps: [...fieldDataGaps],
    state_machine: {
      states: STATES,
      transitions: TRANSITIONS,
      verified_or_rejected_requirements: ["human_verifier", "timestamp", "evidence_reference", "observed_predecessor"],
      ai_rule: "AI may not create, observe, verify, reject, or self-certify field evidence."
    },
    tasks,
    summary: summarizeLedger(tasks)
  };
}

function summarizeLedger(tasks) {
  const byStatus = Object.fromEntries(STATES.map((state) => [state, 0]));
  let mandatory = 0;
  for (const task of tasks) {
    byStatus[task.status] += 1;
    if (task.mandatory_for_sla_a) mandatory += 1;
  }
  return {
    total_tasks: tasks.length,
    by_status: byStatus,
    mandatory_for_sla_a: mandatory,
    outstanding_for_sla_a: tasks.filter((task) => task.mandatory_for_sla_a && task.status !== "verified").length
  };
}

function validateTransition(task, nextStatus, actor) {
  if (!STATES.includes(nextStatus)) throw new Error(`Unsupported verification status: ${nextStatus}`);
  if (!actor || actor.actor_type !== "human") {
    throw new Error("AI or unspecified actors cannot write field-evidence states.");
  }
  if (!TRANSITIONS[task.status].includes(nextStatus)) {
    throw new Error(`Invalid state transition ${task.status} -> ${nextStatus} for ${task.task_id}`);
  }
  if (["verified", "rejected"].includes(nextStatus)) {
    const required = ["verifier", "timestamp", "evidence_reference"];
    const missing = required.filter((field) => !actor[field]);
    if (missing.length) throw new Error(`${nextStatus} requires ${missing.join(", ")}`);
  }
}

function applyFieldObservation(ledger, taskIdValue, nextStatus, actor, note = null) {
  const copy = deepCopy(ledger);
  const task = copy.tasks.find((item) => item.task_id === taskIdValue);
  if (!task) throw new Error(`Unknown verification task: ${taskIdValue}`);
  validateTransition(task, nextStatus, actor);
  task.status = nextStatus;
  if (["observed", "verified", "rejected"].includes(nextStatus)) {
    task.verifier = actor.verifier || task.verifier;
    task.timestamp = actor.timestamp || task.timestamp;
    task.evidence_reference = actor.evidence_reference || task.evidence_reference;
    task.confidence = actor.confidence || (nextStatus === "observed" ? "low" : "medium");
    task.observation_note = note || task.observation_note;
  }
  copy.summary = summarizeLedger(copy.tasks);
  return copy;
}

function promotionGate(ledger) {
  const mandatory = ledger.tasks.filter((task) => task.mandatory_for_sla_a);
  const rejected = mandatory.filter((task) => task.status === "rejected");
  const incomplete = mandatory.filter((task) => task.status !== "verified");
  if (rejected.length) {
    return {
      current_verified_sla: "B",
      candidate_verified_sla: "B",
      promotion: "blocked",
      reason: "mandatory_evidence_rejected",
      rejected_task_ids: rejected.map((task) => task.task_id),
      outstanding_task_ids: incomplete.map((task) => task.task_id),
      degrade_review_required: true,
      automatic_sla_change: false
    };
  }
  if (incomplete.length) {
    return {
      current_verified_sla: "B",
      candidate_verified_sla: "B",
      promotion: "blocked",
      reason: "mandatory_evidence_incomplete",
      rejected_task_ids: [],
      outstanding_task_ids: incomplete.map((task) => task.task_id),
      degrade_review_required: false,
      automatic_sla_change: false
    };
  }
  return {
    current_verified_sla: "B",
    candidate_verified_sla: "A",
    promotion: "permitted_by_evidence_gate",
    reason: "all_mandatory_evidence_verified_by_human_workflow",
    rejected_task_ids: [],
    outstanding_task_ids: [],
    degrade_review_required: false,
    automatic_sla_change: false,
    note: "This only permits a subsequent policy/engine recheck; it does not auto-write Verified SLA=A."
  };
}

function explainCurrentSla(ledger) {
  const gate = promotionGate(ledger);
  return {
    verified_sla: "B",
    target_sla: "A",
    promotion_gate: gate,
    explanation: gate.promotion === "blocked"
      ? "Verified SLA remains B because mandatory field evidence is incomplete or rejected."
      : "Evidence gate permits a subsequent recheck, but no automatic SLA writeback is allowed."
  };
}

function htmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderFieldPack(ledger, language) {
  const zh = language === "zh";
  const title = zh ? "京张午间服务线：现场核验清单" : "Jing-Zhang Noon Service Line: Field Verification Pack";
  const subtitle = zh
    ? "本页面由机器可读 ledger 自动生成。所有任务初始为 unknown，不代表现场已经核验。"
    : "This page is generated from the machine-readable ledger. All tasks start unknown and do not represent completed field verification.";
  const headers = zh
    ? ["任务", "对象", "所需证据", "核验方法", "通过 / 失败", "状态", "SLA 影响"]
    : ["Task", "Object", "Evidence required", "Method", "Pass / fail", "Status", "SLA effect"];
  const rows = ledger.tasks.map((task) => {
    const object = `${task.route_id} · ${task.object.type}:${task.object.id}`;
    const passFail = `${task.pass_condition} / ${task.fail_condition}`;
    return `<tr><td>${htmlEscape(task.task_id)}<br><small>${htmlEscape(zh ? task.label_zh : task.label_en)}</small></td><td>${htmlEscape(object)}</td><td>${htmlEscape(task.evidence_required)}</td><td>${htmlEscape(task.verification_method)}</td><td>${htmlEscape(passFail)}</td><td><strong>${htmlEscape(task.status)}</strong></td><td>${htmlEscape(task.sla_effect)}</td></tr>`;
  }).join("\n");
  const gate = promotionGate(ledger);
  return `<!doctype html>\n<html lang="${zh ? "zh" : "en"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><style>body{font-family:Arial,"Microsoft YaHei",sans-serif;margin:0;background:#f6f7f3;color:#17202d}header{padding:28px 5vw;background:#17202d;color:#fff}main{padding:24px 5vw 48px}table{border-collapse:collapse;width:100%;background:#fff;font-size:13px}th,td{border:1px solid #d6dce2;padding:10px;vertical-align:top;text-align:left;line-height:1.45}th{background:#edf1f6}small{color:#5b6574}.notice{border-left:5px solid #e85a44;background:#fff8f5;padding:14px;margin:18px 0}.summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.card{background:#fff;border:1px solid #d6dce2;padding:14px}@media(max-width:900px){.summary{grid-template-columns:1fr}table{font-size:12px;display:block;overflow-x:auto}}</style></head><body><header><h1>${title}</h1><p>${subtitle}</p></header><main><div class="notice"><strong>${zh ? "当前结论" : "Current conclusion"}:</strong> ${zh ? "Target SLA=A；Verified SLA=B。机器逻辑不允许 AI 将 unknown 自动升级为 verified。" : "Target SLA=A; Verified SLA=B. The machine workflow does not allow AI to promote unknown evidence to verified."}</div><div class="summary"><div class="card"><strong>${zh ? "全部任务" : "Total tasks"}</strong><br>${ledger.summary.total_tasks}</div><div class="card"><strong>${zh ? "待处理" : "Outstanding"}</strong><br>${ledger.summary.by_status.unknown + ledger.summary.by_status.scheduled + ledger.summary.by_status.observed}</div><div class="card"><strong>${zh ? "A 级升级门" : "SLA-A promotion gate"}</strong><br>${htmlEscape(gate.promotion)} · ${htmlEscape(gate.reason)}</div></div><h2>${zh ? "核验任务" : "Verification tasks"}</h2><table><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></main></body></html>\n`;
}

function renderFieldPackSection(ledger, language) {
  const zh = language === "zh";
  const title = zh ? "V2 现场核验清单" : "V2 Field-Verification Checklist";
  const intro = zh
    ? "本清单由机器可读 ledger 自动生成。全部任务当前为 unknown，不代表任何遮阴、饮水、座椅、入口、过街、绕行或人工服务已经被现场核验。"
    : "This checklist is generated from the machine-readable ledger. All tasks are currently unknown and do not represent field verification of shade, water, seating, entries, crossings, detours, or staffed services.";
  const headers = zh
    ? ["任务", "对象", "所需证据", "核验方法", "通过 / 失败", "状态", "SLA 影响"]
    : ["Task", "Object", "Evidence required", "Method", "Pass / fail", "Status", "SLA effect"];
  const rows = ledger.tasks.map((task) => {
    const object = `${task.route_id} · ${task.object.type}:${task.object.id}`;
    const passFail = `${task.pass_condition} / ${task.fail_condition}`;
    return `<tr><td>${htmlEscape(task.task_id)}<br><small>${htmlEscape(zh ? task.label_zh : task.label_en)}</small></td><td>${htmlEscape(object)}</td><td>${htmlEscape(task.evidence_required)}</td><td>${htmlEscape(task.verification_method)}</td><td>${htmlEscape(passFail)}</td><td><strong>${htmlEscape(task.status)}</strong></td><td>${htmlEscape(task.sla_effect)}</td></tr>`;
  }).join("\\n");
  const gate = promotionGate(ledger);
  const conclusion = zh
    ? `Target SLA = A；Verified SLA = B。SLA-A 的 ${ledger.summary.mandatory_for_sla_a} 项 mandatory evidence 尚未完成，因此 ${gate.promotion}。AI 不得写入 observed、verified 或 rejected。`
    : `Target SLA = A; Verified SLA = B. The ${ledger.summary.mandatory_for_sla_a} mandatory SLA-A evidence tasks are incomplete, so ${gate.promotion}. AI may not write observed, verified, or rejected states.`;
  const taskLabel = zh ? `展开 ${ledger.summary.total_tasks} 项任务` : `Expand ${ledger.summary.total_tasks} tasks`;
  return `<section id="v2-field-verification" class="warning"><h2>${title}</h2><p>${intro}</p><p><strong>${htmlEscape(conclusion)}</strong></p><details><summary>${htmlEscape(taskLabel)}</summary><div style="overflow-x:auto;margin-top:12px"><table><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div></details></section>`;
}

function applyVerifiedHumanWorkflow(ledger, taskIdValue) {
  const scheduled = applyFieldObservation(ledger, taskIdValue, "scheduled", { actor_type: "human", verifier: "field-coordinator" });
  const observed = applyFieldObservation(scheduled, taskIdValue, "observed", { actor_type: "human", verifier: "field-observer", timestamp: "2026-08-13T12:00:00+08:00", evidence_reference: "evidence://sample-observation", confidence: "medium" }, "Synthetic test observation only; not a real field record.");
  return applyFieldObservation(observed, taskIdValue, "verified", { actor_type: "human", verifier: "authorized-field-verifier", timestamp: "2026-08-13T12:05:00+08:00", evidence_reference: "evidence://sample-verification", confidence: "high" }, "Synthetic test verification only; not a real field result.");
}

function runWorkflowAssertions(ledger) {
  const assertions = [];
  const assert = (id, condition, detail) => assertions.push({ id, passed: Boolean(condition), detail });
  const baselineGate = promotionGate(ledger);
  assert("unknown_evidence_cannot_promote_sla", baselineGate.promotion === "blocked" && baselineGate.reason === "mandatory_evidence_incomplete", baselineGate);

  const nonMandatory = ledger.tasks.find((task) => !task.mandatory_for_sla_a);
  let nonMandatoryLedger = applyVerifiedHumanWorkflow(ledger, nonMandatory.task_id);
  const nonMandatoryGate = promotionGate(nonMandatoryLedger);
  assert("verified_non_mandatory_evidence_alone_cannot_promote_sla", nonMandatoryGate.promotion === "blocked", nonMandatoryGate);

  const mandatory = ledger.tasks.find((task) => task.mandatory_for_sla_a);
  let rejectedLedger = applyFieldObservation(ledger, mandatory.task_id, "scheduled", { actor_type: "human", verifier: "field-coordinator" });
  rejectedLedger = applyFieldObservation(rejectedLedger, mandatory.task_id, "observed", { actor_type: "human", verifier: "field-observer", timestamp: "2026-08-13T12:00:00+08:00", evidence_reference: "evidence://rejection-observation" });
  rejectedLedger = applyFieldObservation(rejectedLedger, mandatory.task_id, "rejected", { actor_type: "human", verifier: "authorized-field-verifier", timestamp: "2026-08-13T12:05:00+08:00", evidence_reference: "evidence://rejection" }, "Synthetic test rejection only; not a real field result.");
  const rejectedGate = promotionGate(rejectedLedger);
  assert("rejected_mandatory_evidence_blocks_promotion", rejectedGate.promotion === "blocked" && rejectedGate.reason === "mandatory_evidence_rejected" && rejectedGate.degrade_review_required, rejectedGate);

  let allVerified = deepCopy(ledger);
  for (const task of allVerified.tasks.filter((item) => item.mandatory_for_sla_a)) {
    allVerified = applyVerifiedHumanWorkflow(allVerified, task.task_id);
  }
  const allVerifiedGate = promotionGate(allVerified);
  assert("all_mandatory_evidence_verified_permits_promotion_logic", allVerifiedGate.promotion === "permitted_by_evidence_gate" && allVerifiedGate.candidate_verified_sla === "A" && !allVerifiedGate.automatic_sla_change, allVerifiedGate);

  let missingVerifierBlocked = false;
  try {
    let candidate = applyFieldObservation(ledger, mandatory.task_id, "scheduled", { actor_type: "human", verifier: "field-coordinator" });
    candidate = applyFieldObservation(candidate, mandatory.task_id, "observed", { actor_type: "human", verifier: "field-observer", timestamp: "2026-08-13T12:00:00+08:00", evidence_reference: "evidence://observation" });
    applyFieldObservation(candidate, mandatory.task_id, "verified", { actor_type: "human", timestamp: "2026-08-13T12:05:00+08:00", evidence_reference: "evidence://missing-verifier" });
  } catch (error) {
    missingVerifierBlocked = /verifier/.test(error.message);
  }
  assert("missing_verifier_timestamp_or_evidence_reference_cannot_be_verified", missingVerifierBlocked, "Missing verifier rejected by transition guard.");

  let aiBlocked = false;
  try {
    applyFieldObservation(ledger, mandatory.task_id, "scheduled", { actor_type: "ai", verifier: "AI" });
  } catch (error) {
    aiBlocked = /AI or unspecified actors/.test(error.message);
  }
  assert("ai_cannot_self_verify_field_evidence", aiBlocked, "AI actor rejected before any field-state transition.");

  return {
    ok: assertions.every((item) => item.passed),
    assertion_count: assertions.length,
    assertions
  };
}

module.exports = {
  STATES,
  TRANSITIONS,
  deriveVerificationLedger,
  applyFieldObservation,
  promotionGate,
  explainCurrentSla,
  renderFieldPack,
  renderFieldPackSection,
  runWorkflowAssertions
};
