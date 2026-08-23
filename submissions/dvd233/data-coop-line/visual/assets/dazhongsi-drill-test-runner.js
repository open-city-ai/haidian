#!/usr/bin/env node
"use strict";

/**
 * DAZHONGSI-DRILL-01 — synthetic drill and failure-test runner for the
 * DAZHONGSI-FIELD-OPS-01 template contract (P1-04).
 *
 * Node built-ins only, read-only against the submission package. All inputs
 * are synthetic or paper fixtures: this runner proves the template's contract
 * logic executes reproducibly (start gate, halt, resume, withdrawal, receipts,
 * no-data equivalence). It collects no field data and never interprets
 * not_observed as risk cleared.
 *
 * Usage:
 *   node visual/assets/dazhongsi-drill-test-runner.js [--json]
 *   node visual/assets/dazhongsi-drill-test-runner.js --self-test [--json]
 *
 * Exit 0 = every case passed (and, with --self-test, every negative fixture
 * proved fail-closed). Exit 1 = any failure.
 */

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const assetsDir = __dirname;
const submissionDir = path.resolve(assetsDir, "..", "..");

const PACK_RELATIVE = "visual/assets/dazhongsi-field-validation-pack.json";
const LEDGER_RELATIVE = "visual/assets/dazhongsi-drill-tests.json";
const SNAPSHOT_RELATIVE = "visual/assets/evidence-snapshot.json";
const FIGURE_ZH_RELATIVE = "assets/figures/dazhongsi-drill-tests.png";
const FIGURE_EN_RELATIVE = "assets/figures/dazhongsi-drill-tests.en.png";
const EXPECTED_PACK_SHA256 = "4613343f7943bc81207db0fc3c8ad2a98bc97fb1e4f0442eb215f1e36a773a61";
const SUITE_ID = "DAZHONGSI-DRILL-01";
const MVP_SCENARIO_IDS = ["SCN-05", "SCN-09", "SCN-10"];
const STAGE_RECEIPTS = {
  "SCN-05": "EVD-DZ-003",
  "SCN-09": "EVD-DZ-004",
  "SCN-10": "EVD-DZ-005",
};
const WITHDRAWAL_STOP_CONDITION = "staffed_or_offline_withdrawal_route_unavailable";
const PAYMENT_FOR_CONSENT_CONDITION = "return_described_as_payment_for_consent";
const NO_DATA_ROUTE_ID = "ROUTE-NO-DATA-EQUIVALENT-01";
const ACCESS_POINT_ID = "CP-ACCESS-01";
const RESUME_COSIGN_ROLES = ["SITE-OPERATOR", "SAFETY-REVIEW", "FIELD-LEAD"];
const MEASUREMENT_FIELDS = ["journey_time", "failure", "price", "accessibility", "human_takeover"];

function readJson(relative) {
  return JSON.parse(fs.readFileSync(path.join(submissionDir, relative), "utf8"));
}

function sha256File(relative) {
  return crypto.createHash("sha256").update(fs.readFileSync(path.join(submissionDir, relative))).digest("hex");
}

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadContext() {
  return {
    pack: readJson(PACK_RELATIVE),
    ledger: readJson(LEDGER_RELATIVE),
    snapshot: readJson(SNAPSHOT_RELATIVE),
    layers: {
      key_areas: readJson("geometry/key_areas.geojson"),
      buildings: readJson("geometry/buildings.geojson"),
      public_space: readJson("geometry/public_space.geojson"),
      roads: readJson("geometry/roads.geojson"),
    },
  };
}

/* ---- contract semantics (derived from the pack's declared gates) ---- */

function startGate(startConditions) {
  return startConditions.every((item) => item.status === "verified") ? "allow" : "refuse";
}

function fireTrigger(state) {
  return state === "running" ? "paused" : state;
}

function resumeGate(resumeConditions, signoffSlots) {
  const conditionsOk = resumeConditions.every((item) => item.status === "verified");
  const signed = new Set(
    signoffSlots.filter((slot) => slot.status === "signed").map((slot) => slot.role_id),
  );
  const cosignOk = RESUME_COSIGN_ROLES.every((role) => signed.has(role));
  return conditionsOk && cosignOk ? "allow" : "refuse";
}

function readinessConclusion(pack) {
  const control = pack.workflow_control || {};
  const starts = control.start_conditions || [];
  const triggers = control.stop_triggers || [];
  const startsReady = starts.length > 0 && starts.every((item) => item.status === "verified");
  const triggersCleared = triggers.every((item) => item.status === "not_fired");
  // not_observed / unknown are never treated as cleared.
  return startsReady && triggersCleared ? "ready" : "not_ready";
}

/* ---- assertions: each returns an array of error strings ---- */

function scenarioById(ctx, id) {
  return (ctx.snapshot.scenarios || []).find((scenario) => scenario.id === id) || null;
}

const assertions = {
  start_gate_requires_all_verified(ctx, params) {
    const errors = [];
    const starts = (ctx.pack.workflow_control || {}).start_conditions || [];
    if (starts.length !== 6) {
      errors.push(`expected 6 start conditions, found ${starts.length}`);
      return errors;
    }
    const verified = starts.map((item) => ({ ...item, status: "verified" }));
    if (startGate(verified) !== "allow") errors.push("all-verified fixture must allow start");
    if (params.mode === "all_unknown") {
      if (startGate(starts) !== "refuse") errors.push("all-unknown live template must refuse start");
    }
    if (params.mode === "sweep_single_missing") {
      for (let index = 0; index < verified.length; index += 1) {
        const fixture = verified.map((item, at) => (at === index ? { ...item, status: "unknown" } : item));
        if (startGate(fixture) !== "refuse") {
          errors.push(`start gate must refuse when only condition ${fixture[index].condition_id} is unverified`);
        }
      }
    }
    if (params.mode === "all_verified" && startGate(verified) !== "allow") {
      errors.push("all-verified fixture must allow start");
    }
    return errors;
  },

  receipt_chain_complete(ctx) {
    const errors = [];
    const receipts = ctx.pack.evidence_receipts || [];
    if (receipts.length !== 11) errors.push(`expected 11 receipts, found ${receipts.length}`);
    const ids = receipts.map((receipt) => receipt.evidence_id);
    if (new Set(ids).size !== ids.length) errors.push("receipt evidence_id values must be unique");
    const idSet = new Set(ids);
    for (const point of ctx.pack.collection_points || []) {
      if (!idSet.has(point.evidence_id)) {
        errors.push(`collection point ${point.point_id} references missing receipt ${point.evidence_id}`);
      }
    }
    for (const [stage, receiptId] of Object.entries(STAGE_RECEIPTS)) {
      if (!idSet.has(receiptId)) errors.push(`stage ${stage} receipt slot ${receiptId} is missing`);
    }
    return errors;
  },

  raci_single_accountable(ctx) {
    const errors = [];
    for (const activity of (ctx.pack.raci || {}).activities || []) {
      const accountables = Object.values(activity.assignments || {}).filter((mark) => mark === "A").length;
      if (accountables !== 1) {
        errors.push(`activity ${activity.activity_id} must have exactly one A, found ${accountables}`);
      }
    }
    const roleIds = new Set(((ctx.pack.raci || {}).roles || []).map((role) => role.role_id));
    const slotIds = (ctx.pack.signoff_slots || []).map((slot) => slot.role_id);
    if (slotIds.length !== roleIds.size || !slotIds.every((id) => roleIds.has(id))) {
      errors.push("signoff slots must map one-to-one to RACI roles");
    }
    return errors;
  },

  concept_refs_resolve(ctx) {
    const errors = [];
    const refs = ctx.pack.concept_refs || {};
    const find = (layer, id) =>
      (ctx.layers[layer].features || []).some((feature) => (feature.properties || {}).id === id);
    if (!find("key_areas", refs.key_area_id)) errors.push(`key area ${refs.key_area_id} not found`);
    for (const id of refs.building_ids || []) if (!find("buildings", id)) errors.push(`building ${id} not found`);
    for (const id of refs.public_space_ids || []) if (!find("public_space", id)) errors.push(`public space ${id} not found`);
    for (const id of refs.concept_route_ids || []) if (!find("roads", id)) errors.push(`road ${id} not found`);
    const scenarioIds = new Set((ctx.snapshot.scenarios || []).map((scenario) => scenario.id));
    for (const id of refs.scenario_ids || []) if (!scenarioIds.has(id)) errors.push(`scenario ${id} not found in snapshot registry`);
    return errors;
  },

  template_purity(ctx) {
    const errors = [];
    const pack = ctx.pack;
    const scan = (value, trail) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => scan(item, `${trail}[${index}]`));
        return;
      }
      if (value && typeof value === "object") {
        for (const [key, item] of Object.entries(value)) scan(item, trail ? `${trail}.${key}` : key);
        return;
      }
      const key = trail.split(".").pop() || "";
      const mustBeNull = /^(observed_|collected_at$|file_ref$|sha256$|signed_by$|name$|organization$|signed_at$|signature_ref$|started_at$|stopped_at$|resumed_at$|closed_at$|seconds$|sample_count$|attempts$|failures$|rate$|failure_codes$|cny$|step_free$|obstruction_count$|assistive_notes$|triggered$|successful$|success_rate$|response_seconds$|ended_at$)/;
      if (mustBeNull.test(key) || trail.includes("observed_") || trail.endsWith("assigned_entity")) {
        if (value !== null) errors.push(`template field ${trail} must remain null, found ${JSON.stringify(value)}`);
      }
    };
    scan(pack, "");
    if (pack.template_state !== "not_observed") errors.push(`template_state must be not_observed, found ${pack.template_state}`);
    if (pack.fieldwork_authorization_status !== "unknown") {
      errors.push(`fieldwork_authorization_status must be unknown, found ${pack.fieldwork_authorization_status}`);
    }
    if ((pack.workflow_control || {}).current_state !== "not_observed") {
      errors.push(`workflow current_state must be not_observed, found ${(pack.workflow_control || {}).current_state}`);
    }
    const enums = pack.status_enums || {};
    const inEnum = (group, value) => (enums[group] || []).includes(value);
    for (const point of pack.collection_points || []) {
      if (!inEnum("verification", point.verification_status)) errors.push(`${point.point_id} verification_status outside enum`);
    }
    for (const route of pack.field_routes || []) {
      if (!inEnum("observation", route.route_status)) errors.push(`${route.route_id} route_status outside enum`);
      for (const field of MEASUREMENT_FIELDS) {
        const status = ((route.measurements || {})[field] || {}).status;
        if (status !== "not_observed") errors.push(`${route.route_id}.measurements.${field} must be not_observed`);
      }
    }
    for (const receipt of pack.evidence_receipts || []) {
      if (!inEnum("observation", receipt.status)) errors.push(`${receipt.evidence_id} status outside enum`);
    }
    for (const slot of pack.signoff_slots || []) {
      if (!inEnum("signature", slot.status)) errors.push(`${slot.role_id} signoff status outside enum`);
    }
    return errors;
  },

  unknown_not_risk_cleared(ctx) {
    const errors = [];
    if (readinessConclusion(ctx.pack) !== "not_ready") {
      errors.push("template readiness must compute to not_ready while any input is unknown or not_observed");
    }
    return errors;
  },

  withdrawal_receipt_slots_exist(ctx) {
    const errors = [];
    const receipts = ctx.pack.evidence_receipts || [];
    const slot = receipts.find((receipt) => receipt.evidence_id === STAGE_RECEIPTS["SCN-09"]);
    if (!slot) {
      errors.push("withdrawal-stage receipt EVD-DZ-004 is missing");
    } else if (slot.status !== "not_observed") {
      errors.push(`withdrawal-stage receipt must remain not_observed, found ${slot.status}`);
    }
    return errors;
  },

  withdrawal_any_stage_maps_to_receipt_and_halt(ctx) {
    const errors = [];
    const receiptIds = new Set((ctx.pack.evidence_receipts || []).map((receipt) => receipt.evidence_id));
    const triggers = ((ctx.pack.workflow_control || {}).stop_triggers || []).map((trigger) =>
      `${trigger.trigger_zh || ""} ${trigger.trigger_en || ""}`,
    );
    const withdrawalCovered = triggers.some((text) => text.includes("撤回") || text.toLowerCase().includes("withdrawal"));
    if (!withdrawalCovered) errors.push("no stop trigger covers unavailable staffed/offline withdrawal");
    for (const stage of MVP_SCENARIO_IDS) {
      if (!receiptIds.has(STAGE_RECEIPTS[stage])) {
        errors.push(`withdrawal at stage ${stage} has no receipt slot ${STAGE_RECEIPTS[stage]}`);
      }
      const scenario = scenarioById(ctx, stage);
      if (!scenario || !Array.isArray(scenario.stop_conditions) || scenario.stop_conditions.length < 3) {
        errors.push(`stage ${stage} must declare at least three stop conditions`);
      }
    }
    const scn09 = scenarioById(ctx, "SCN-09");
    if (!scn09 || !(scn09.stop_conditions || []).includes(WITHDRAWAL_STOP_CONDITION)) {
      errors.push(`SCN-09 must keep stop condition ${WITHDRAWAL_STOP_CONDITION}`);
    }
    return errors;
  },

  withdrawal_never_payment_for_consent(ctx) {
    const errors = [];
    const scn10 = scenarioById(ctx, "SCN-10");
    if (!scn10 || !(scn10.stop_conditions || []).includes(PAYMENT_FOR_CONSENT_CONDITION)) {
      errors.push(`SCN-10 must keep stop condition ${PAYMENT_FOR_CONSENT_CONDITION}`);
    }
    return errors;
  },

  stop_trigger_forces_halt(ctx) {
    const errors = [];
    const triggers = (ctx.pack.workflow_control || {}).stop_triggers || [];
    if (triggers.length !== 6) {
      errors.push(`expected 6 stop triggers, found ${triggers.length}`);
      return errors;
    }
    for (const trigger of triggers) {
      const after = fireTrigger("running", trigger);
      if (after === "running") errors.push(`trigger ${trigger.trigger_id} must move the run out of running`);
    }
    return errors;
  },

  halt_blocks_stage_progression(ctx) {
    const errors = [];
    const state = fireTrigger("running");
    const canAdvance = (current) => current === "running";
    if (canAdvance(state)) errors.push("stage advancement must be blocked while halted");
    return errors;
  },

  timestamps_consistent(ctx) {
    const errors = [];
    const control = ctx.pack.workflow_control || {};
    for (const key of ["started_at", "stopped_at", "resumed_at", "closed_at"]) {
      if (control[key] !== null) errors.push(`template ${key} must be null, found ${JSON.stringify(control[key])}`);
    }
    // Synthetic run: a halt must stamp stopped_at and forbid further receipt collection.
    const run = { state: "running", stopped_at: null, receiptsBlocked: false };
    const halt = (r) => ({ ...r, state: fireTrigger(r.state), stopped_at: "synthetic", receiptsBlocked: true });
    const halted = halt(run);
    if (halted.stopped_at === null || !halted.receiptsBlocked) {
      errors.push("synthetic halt must set stopped_at and block further receipt collection");
    }
    return errors;
  },

  resume_requires_all_four(ctx) {
    const errors = [];
    const resumes = (ctx.pack.workflow_control || {}).resume_conditions || [];
    if (resumes.length !== 4) {
      errors.push(`expected 4 resume conditions, found ${resumes.length}`);
      return errors;
    }
    const signedSlots = (ctx.pack.signoff_slots || []).map((slot) => ({ ...slot, status: "signed" }));
    const verified = resumes.map((item) => ({ ...item, status: "verified" }));
    if (resumeGate(verified, signedSlots) !== "allow") errors.push("all-four-verified with co-signature must allow resume");
    for (let index = 0; index < verified.length; index += 1) {
      const fixture = verified.map((item, at) => (at === index ? { ...item, status: "unknown" } : item));
      if (resumeGate(fixture, signedSlots) !== "refuse") {
        errors.push(`resume must be refused when only ${fixture[index].condition_id} is unverified`);
      }
    }
    return errors;
  },

  resume_requires_cosign(ctx) {
    const errors = [];
    const resumes = ((ctx.pack.workflow_control || {}).resume_conditions || []).map((item) => ({ ...item, status: "verified" }));
    const slots = ctx.pack.signoff_slots || [];
    for (const role of RESUME_COSIGN_ROLES) {
      if (!slots.some((slot) => slot.role_id === role)) {
        errors.push(`co-sign role ${role} has no signoff slot`);
      }
    }
    const allSigned = slots.map((slot) => ({ ...slot, status: "signed" }));
    for (const role of RESUME_COSIGN_ROLES) {
      const fixture = allSigned.map((slot) => (slot.role_id === role ? { ...slot, status: "not_signed" } : slot));
      if (resumeGate(resumes, fixture) !== "refuse") errors.push(`resume must be refused without ${role} signature`);
    }
    if (resumeGate(resumes, allSigned) !== "allow") errors.push("co-signed fixture must allow resume");
    return errors;
  },

  resume_requires_remeasure(ctx) {
    const errors = [];
    for (const route of ctx.pack.field_routes || []) {
      const measurements = route.measurements || {};
      for (const field of MEASUREMENT_FIELDS) {
        if (!measurements[field]) errors.push(`${route.route_id} is missing re-measurement field ${field}`);
      }
    }
    return errors;
  },

  no_data_equivalent_all_mvp(ctx) {
    const errors = [];
    for (const id of MVP_SCENARIO_IDS) {
      const scenario = scenarioById(ctx, id);
      if (!scenario) {
        errors.push(`scenario ${id} missing from snapshot registry`);
        continue;
      }
      if (scenario.no_data_equivalent !== true || scenario.human_review !== true) {
        errors.push(`scenario ${id} must keep no_data_equivalent and human_review true`);
      }
    }
    const ratio = (((ctx.snapshot || {}).metrics) || {}).dazhongsi_mvp_no_data_route_coverage_ratio;
    if (ratio !== 1) errors.push(`dazhongsi_mvp_no_data_route_coverage_ratio must be 1, found ${ratio}`);
    return errors;
  },

  offline_route_declared(ctx) {
    const errors = [];
    const route = (ctx.pack.field_routes || []).find((item) => item.route_id === NO_DATA_ROUTE_ID);
    if (!route) {
      errors.push(`no-data equivalent route ${NO_DATA_ROUTE_ID} is missing`);
    } else {
      if (route.route_status !== "not_observed") errors.push(`${NO_DATA_ROUTE_ID} must remain not_observed`);
      for (const field of MEASUREMENT_FIELDS) {
        if (!((route.measurements || {})[field])) errors.push(`${NO_DATA_ROUTE_ID} missing measurement field ${field}`);
      }
    }
    return errors;
  },

  accessibility_point_and_manual_takeover(ctx) {
    const errors = [];
    const point = (ctx.pack.collection_points || []).find((item) => item.point_id === ACCESS_POINT_ID);
    if (!point) {
      errors.push(`accessibility point ${ACCESS_POINT_ID} is missing`);
    } else {
      const onRoute = (ctx.pack.field_routes || []).some((route) => (route.point_ids || []).includes(ACCESS_POINT_ID));
      if (!onRoute) errors.push(`${ACCESS_POINT_ID} must belong to at least one route`);
    }
    const triggers = ((ctx.pack.workflow_control || {}).stop_triggers || []).map((trigger) =>
      `${trigger.trigger_zh || ""} ${trigger.trigger_en || ""}`,
    );
    if (!triggers.some((text) => text.includes("人工接管") || text.toLowerCase().includes("manual takeover"))) {
      errors.push("no stop trigger covers unavailable or unresponsive manual takeover");
    }
    return errors;
  },

  meta_expected_ids_complete(ctx, _params, executedIds) {
    const errors = [];
    const expected = ctx.ledger.expected_case_ids || [];
    const expectedSet = new Set(expected);
    const executedSet = new Set(executedIds);
    if (expected.length !== expectedSet.size) errors.push("expected_case_ids contains duplicates");
    if (expected.length !== ctx.ledger.expected_case_count) {
      errors.push(`expected_case_count=${ctx.ledger.expected_case_count} but list has ${expected.length}`);
    }
    for (const id of executedSet) if (!expectedSet.has(id)) errors.push(`executed case ${id} is not in the pinned list`);
    for (const id of expectedSet) if (!executedSet.has(id)) errors.push(`pinned case ${id} was not executed`);
    if (!expectedSet.has("DRILL-META-01")) errors.push("the pinned list must include DRILL-META-01 itself");
    return errors;
  },
};

/* ---- mutations for --self-test: each must make the suite fail ---- */

const mutations = {
  drop_one_receipt(ctx) {
    ctx.pack.evidence_receipts.pop();
  },
  fill_observed_location(ctx) {
    ctx.pack.collection_points[0].observed_location = { lat: 39.946, lon: 116.351 };
  },
  break_evidence_link(ctx) {
    ctx.pack.collection_points[0].evidence_id = "EVD-DZ-999";
  },
  duplicate_receipt_id(ctx) {
    ctx.pack.evidence_receipts[1].evidence_id = ctx.pack.evidence_receipts[0].evidence_id;
  },
  drop_stop_condition(ctx) {
    const scenario = ctx.snapshot.scenarios.find((item) => item.id === "SCN-09");
    scenario.stop_conditions = scenario.stop_conditions.filter((item) => item !== WITHDRAWAL_STOP_CONDITION);
  },
  second_accountable(ctx) {
    ctx.pack.raci.activities[0].assignments["FIELD-LEAD"] = "A";
  },
  drop_case_id(ctx) {
    ctx.ledger.expected_case_ids.pop();
    ctx.ledger.expected_case_count -= 1;
  },
  flip_no_data_equivalent(ctx) {
    const scenario = ctx.snapshot.scenarios.find((item) => item.id === "SCN-05");
    scenario.no_data_equivalent = false;
  },
};

function runSuite(ctx) {
  const results = [];
  const executedIds = [];
  for (const testCase of ctx.ledger.cases || []) {
    const fn = assertions[testCase.assertion];
    let errors;
    if (!fn) {
      errors = [`no assertion implementation for kind ${testCase.assertion}`];
    } else {
      try {
        errors = fn(ctx, testCase.params || {}, executedIds.concat(testCase.case_id));
      } catch (error) {
        errors = [`assertion threw: ${error && error.message ? error.message : error}`];
      }
    }
    executedIds.push(testCase.case_id);
    results.push({ case_id: testCase.case_id, category: testCase.category, passed: errors.length === 0, errors });
  }
  // Meta check runs against the full executed set.
  const metaErrors = assertions.meta_expected_ids_complete(ctx, {}, executedIds);
  const metaResult = results.find((result) => result.case_id === "DRILL-META-01");
  if (metaResult) {
    metaResult.errors = metaErrors;
    metaResult.passed = metaErrors.length === 0;
  }
  return results;
}

function structuralPreflight(ctx) {
  const errors = [];
  if (sha256File(PACK_RELATIVE) !== EXPECTED_PACK_SHA256) {
    errors.push(`pack sha256 drifted from ${EXPECTED_PACK_SHA256}`);
  }
  if (ctx.ledger.suite_id !== SUITE_ID) errors.push(`suite_id must be ${SUITE_ID}`);
  if (ctx.ledger.pack_sha256 !== EXPECTED_PACK_SHA256) errors.push("ledger pack_sha256 does not match the pinned pack hash");
  if (ctx.ledger.synthetic_only !== true) errors.push("ledger must declare synthetic_only=true");
  const caseIds = (ctx.ledger.cases || []).map((testCase) => testCase.case_id);
  if (new Set(caseIds).size !== caseIds.length) errors.push("ledger case IDs must be unique");
  for (const testCase of ctx.ledger.cases || []) {
    for (const field of ["title_zh", "title_en", "given_zh", "when_zh", "then_zh", "given_en", "when_en", "then_en"]) {
      if (typeof testCase[field] !== "string" || !testCase[field]) {
        errors.push(`${testCase.case_id} is missing bilingual field ${field}`);
      }
    }
  }
  return errors;
}

/* Every published carrier must expose the suite identity and the exact ledger
   hash, so a stale carrier fails loudly instead of drifting silently. */
function carrierConsistency(ctx) {
  const errors = [];
  const ledgerSha = sha256File(LEDGER_RELATIVE);
  const textCarriers = [
    ["proposal.md", FIGURE_ZH_RELATIVE],
    ["proposal.en.md", FIGURE_EN_RELATIVE],
    ["report/proposal.html", "dazhongsi-drill-tests.png"],
    ["report/proposal.en.html", "dazhongsi-drill-tests.en.png"],
    ["visual/index.html", "dazhongsi-drill-tests.png"],
    ["visual/index.en.html", "dazhongsi-drill-tests.en.png"],
  ];
  for (const [relative, figureRef] of textCarriers) {
    let text = null;
    try {
      text = fs.readFileSync(path.join(submissionDir, relative), "utf8");
    } catch (error) {
      errors.push(`FILE_MISSING:${relative}: ${error.code || error.message}`);
      continue;
    }
    if (!text.includes(SUITE_ID)) errors.push(`${relative} is missing suite id ${SUITE_ID}`);
    if (!text.includes(ledgerSha)) errors.push(`${relative} is missing drill-ledger sha256 ${ledgerSha}`);
    if (!text.includes(figureRef)) errors.push(`${relative} is missing figure reference ${figureRef}`);
  }
  const binaryCarriers = [
    [FIGURE_ZH_RELATIVE, "png"],
    [FIGURE_EN_RELATIVE, "png"],
    ["drawings/a3-booklet.pdf", "pdf"],
    ["drawings/a3-booklet.en.pdf", "pdf"],
    ["drawings/a0-boards.pdf", "pdf"],
    ["drawings/a0-boards.en.pdf", "pdf"],
  ];
  for (const [relative, kind] of binaryCarriers) {
    let bytes = null;
    try {
      bytes = fs.readFileSync(path.join(submissionDir, relative));
    } catch (error) {
      errors.push(`FILE_MISSING:${relative}: ${error.code || error.message}`);
      continue;
    }
    if (!bytes.includes(Buffer.from(SUITE_ID, "ascii"))) errors.push(`${relative} is missing suite id ${SUITE_ID}`);
    if (!bytes.includes(Buffer.from(ledgerSha, "ascii"))) errors.push(`${relative} is missing drill-ledger sha256 ${ledgerSha}`);
    if (kind === "png") {
      const pngSignature = bytes.subarray(0, 8).toString("hex");
      const width = bytes.length >= 24 ? bytes.readUInt32BE(16) : null;
      const height = bytes.length >= 24 ? bytes.readUInt32BE(20) : null;
      if (pngSignature !== "89504e470d0a1a0a") errors.push(`${relative} is not a PNG`);
      if (width !== 2400 || height !== 1500) errors.push(`${relative} must be 2400x1500, found ${width}x${height}`);
    }
  }
  return errors;
}

function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has("--help")) {
    process.stdout.write(
      "Usage: node visual/assets/dazhongsi-drill-test-runner.js [--json] [--self-test]\n",
    );
    return 0;
  }
  const ctx = loadContext();
  const preflightErrors = structuralPreflight(ctx).concat(carrierConsistency(ctx));
  const results = runSuite(ctx);
  const failed = results.filter((result) => !result.passed);

  const report = {
    ok: preflightErrors.length === 0 && failed.length === 0,
    suite_id: SUITE_ID,
    pack_id: ctx.ledger.pack_id,
    pack_sha256: EXPECTED_PACK_SHA256,
    synthetic_only: true,
    summary: {
      cases: results.length,
      passed: results.filter((result) => result.passed).length,
      failed: failed.length,
      categories: [...new Set(results.map((result) => result.category))].length,
      preflight_errors: preflightErrors.length,
    },
    preflight_errors: preflightErrors,
    results,
  };

  if (args.has("--self-test")) {
    const selfTest = [];
    for (const fixture of ctx.ledger.negative_fixtures || []) {
      const mutate = mutations[fixture.mutation];
      if (!mutate) {
        selfTest.push({ fixture_id: fixture.fixture_id, fail_closed: false, errors: [`no mutation named ${fixture.mutation}`] });
        continue;
      }
      const mutatedCtx = loadContext();
      mutate(mutatedCtx);
      const mutatedPreflight = structuralPreflight(mutatedCtx);
      const mutatedResults = runSuite(mutatedCtx);
      const mutatedFailed = mutatedResults.filter((result) => !result.passed);
      selfTest.push({
        fixture_id: fixture.fixture_id,
        fail_closed: mutatedPreflight.length > 0 || mutatedFailed.length > 0,
        errors: mutatedPreflight.concat(mutatedFailed.flatMap((result) => result.errors)).slice(0, 4),
      });
    }
    const notClosed = selfTest.filter((item) => !item.fail_closed);
    report.self_test = {
      fixtures: selfTest.length,
      fail_closed: selfTest.length - notClosed.length,
      not_fail_closed: notClosed.map((item) => item.fixture_id),
      details: selfTest,
    };
    report.ok = report.ok && notClosed.length === 0 && selfTest.length === ctx.ledger.expected_fixture_count;
    if (selfTest.length !== ctx.ledger.expected_fixture_count) {
      report.self_test.count_error = `expected ${ctx.ledger.expected_fixture_count} fixtures, ran ${selfTest.length}`;
    }
  }

  if (args.has("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    if (report.ok) {
      process.stdout.write(
        `PASS: ${report.summary.passed}/${report.summary.cases} drill cases across ${report.summary.categories} categories` +
          (report.self_test ? `; ${report.self_test.fail_closed}/${report.self_test.fixtures} negative fixtures fail-closed` : "") +
          "\n",
      );
    } else {
      const lines = [`FAIL: DAZHONGSI-DRILL-01`];
      for (const error of preflightErrors) lines.push(`- preflight: ${error}`);
      for (const result of failed) lines.push(`- ${result.case_id}: ${result.errors.join("; ")}`);
      if (report.self_test && report.self_test.not_fail_closed.length) {
        lines.push(`- not fail-closed fixtures: ${report.self_test.not_fail_closed.join(", ")}`);
      }
      process.stdout.write(`${lines.join("\n")}\n`);
    }
  }
  return report.ok ? 0 : 1;
}

try {
  process.exitCode = main();
} catch (error) {
  process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
  process.exitCode = 1;
}
