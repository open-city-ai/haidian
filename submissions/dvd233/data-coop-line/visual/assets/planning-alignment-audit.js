#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const SUBMISSION_DIR = path.resolve(__dirname, "..", "..");
const REGISTER_RELATIVE = "visual/assets/planning-alignment-register.json";
const REGISTER_ID = "DATA-COOP-PLAN-ALIGNMENT-01";
const FREEZE_SHA = "c79854e90b2e9a641d367c9e91f3f3031e20c127";
const SOURCE_IDS = [
  "JINGZHANG-PLAN-PARTICIPATION-NOTICE-20250208",
  "JINGZHANG-PLAN-APPROVAL-REPORT-20260812",
  "JINGZHANG-PLAN-OFFICIAL-PUBLICATION-20260817",
];
const CLAIM_IDS = [
  "PLAN-TEXT-01",
  "PLAN-TEXT-02",
  "PLAN-TEXT-03",
  "PLAN-TEXT-04",
  "PLAN-TEXT-05",
  "PLAN-TEXT-06",
  "PLAN-TEXT-07",
];
const ASSUMPTION_ID = "A-PLAN-ALIGNMENT-001";
const UNCHANGED_EVIDENCE_SIGNATURE = "c880c438924399d40267391551669d937dcfc5e144850eb511a45bbf024c4a52";
const PRIOR_METRICS_SHA256 = "9c27a7ffbdb60768a9084ef7d41f5073fb0102b4f7f73629c1423a15748c8128";
const CURRENT_METRICS_SHA256 = "d94a8b7bcad389bf26aad70d7ca4b02d4f02042b9a17288e990361f5167d2ba5";
const RECERTIFIED_METRIC_IDS = [
  "synthetic_capacity_resource_gate_total",
  "synthetic_capacity_resource_gate_passed",
  "synthetic_capacity_project_gate_passed",
  "synthetic_capacity_negative_path_fail_closed_total",
  "synthetic_capacity_minimum_headroom_requests",
  "synthetic_capacity_no_data_to_data_capacity_ratio",
];

function absolute(relative) {
  return path.join(SUBMISSION_DIR, relative);
}

function readJson(relative) {
  return JSON.parse(fs.readFileSync(absolute(relative), "utf8"));
}

function sha256(relative) {
  return crypto.createHash("sha256").update(fs.readFileSync(absolute(relative))).digest("hex");
}

function structuralErrors(register) {
  const errors = [];
  if (register.schema_version !== "1.2.0") errors.push("schema_version must be 1.2.0 after full-metrics recertification");
  if (register.register_id !== REGISTER_ID) errors.push(`register_id must be ${REGISTER_ID}`);
  if (register.branch_freeze?.upstream_main_sha !== FREEZE_SHA) errors.push(`branch freeze must be ${FREEZE_SHA}`);
  if (register.branch_freeze?.gate_scripts_from_this_freeze !== true) errors.push("gate scripts must come from the branch freeze");
  if (!Array.isArray(register.source_hierarchy) || register.source_hierarchy.length !== 3) errors.push("source_hierarchy must contain exactly three tiers");
  if (!Array.isArray(register.text_claims) || register.text_claims.length !== 7) errors.push("text_claims must contain exactly seven claims");
  if (!Array.isArray(register.alignment_decisions) || register.alignment_decisions.length !== 4) errors.push("alignment_decisions must contain exactly four decisions");
  const claimIds = (register.text_claims || []).map((claim) => claim.claim_id);
  if (new Set(claimIds).size !== claimIds.length) errors.push("text claim IDs must be unique");
  const alignmentIds = (register.alignment_decisions || []).map((item) => item.alignment_id);
  if (new Set(alignmentIds).size !== alignmentIds.length) errors.push("alignment IDs must be unique");
  if (register.version_delta?.official_participation_notice_period_label !== "2022-2035") errors.push("official-process period label must remain 2022-2035");
  if (register.version_delta?.reported_approved_plan_period_label !== "2024-2035") errors.push("reported-approved period label must remain 2024-2035");
  if (register.version_delta?.officially_published_plan_period_label !== "2024-2035") errors.push("officially published period label must be 2024-2035");
  if (register.version_delta?.resolution_status !== "officially_published_plan_confirms_2024_2035_label_without_approval_document_number") errors.push("resolution_status must record official publication without approval document number");
  const boundary = register.evidence_boundary || {};
  const requiredFalse = [
    "official_approval_document_retrieved",
    "official_plan_text_retrieved",
    "official_plan_map_or_vector_retrieved",
    "official_complete_plan_text_retrieved",
    "official_plan_drawings_or_maps_retrieved",
    "changes_submission_geometry",
    "changes_submission_metrics",
    "changes_core_value_proposition",
    "changes_submission_license",
    "external_images_or_long_text_redistributed",
    "implementation_or_partnership_commitment",
  ];
  for (const key of requiredFalse) {
    if (boundary[key] !== false) errors.push(`evidence_boundary.${key} must remain false`);
  }
  if (boundary.official_publication_page_retrieved !== true) errors.push("evidence_boundary.official_publication_page_retrieved must be true (P1-06 retrieved fact)");
  if (boundary.full_text_attachment_http_status_at_retrieval !== 404) errors.push("evidence_boundary.full_text_attachment_http_status_at_retrieval must record 404");
  if (boundary.official_control_geometry_features_in_submission !== 0) errors.push("official control geometry feature count must remain zero");
  for (const claim of register.text_claims || []) {
    if (!SOURCE_IDS.includes(claim.source_id)) errors.push(`${claim.claim_id} uses an unknown source tier`);
    if (!claim.claim_zh || !claim.claim_en) errors.push(`${claim.claim_id} must be bilingual`);
  }
  for (const item of register.alignment_decisions || []) {
    if (!String(item.boundary || "").trim()) errors.push(`${item.alignment_id} must state an inference boundary`);
  }
  const recertification = register.current_package_recertification || {};
  if (recertification.prior_metrics_sha256 !== PRIOR_METRICS_SHA256) errors.push("recertification must retain the prior metrics hash");
  if (recertification.current_metrics_sha256 !== CURRENT_METRICS_SHA256) errors.push("recertification must pin the current complete metrics hash");
  if (recertification.metric_change_scope !== "non_spatial_e2_governance_metrics_only") errors.push("recertification scope must remain non-spatial E2 governance metrics only");
  if (JSON.stringify(recertification.added_metric_ids) !== JSON.stringify(RECERTIFIED_METRIC_IDS)) errors.push("recertification metric IDs must exactly match the six appended synthetic-capacity metrics");
  for (const key of ["planning_alignment_claims_changed", "spatial_metrics_or_geometry_changed"]) {
    if (recertification[key] !== false) errors.push(`current_package_recertification.${key} must remain false`);
  }
  if (recertification.all_nine_geometry_hashes_reverified !== true) errors.push("all nine geometry hashes must be reverified");
  if (recertification.evidence_signature_reverified !== UNCHANGED_EVIDENCE_SIGNATURE) errors.push("recertification must retain the evidence signature");
  if (register.frozen_package_inputs?.["metrics.json"] !== CURRENT_METRICS_SHA256) errors.push("frozen metrics input must use the recertified complete-file hash");
  return errors;
}

function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has("--help")) {
    process.stdout.write("Usage: node visual/assets/planning-alignment-audit.js [--json] [--self-test]\n");
    return 0;
  }
  for (const arg of args) {
    if (!["--json", "--self-test"].includes(arg)) throw new Error(`Unknown argument: ${arg}`);
  }

  const checks = [];
  let ok = true;
  function check(id, passed, details) {
    const result = Boolean(passed);
    checks.push({ id, passed: result, details });
    if (!result) ok = false;
  }

  const register = readJson(REGISTER_RELATIVE);
  const registerSha = sha256(REGISTER_RELATIVE);
  const structural = structuralErrors(register);
  check("REGISTER_STRUCTURE", structural.length === 0, structural);
  check("REGISTER_ID", register.register_id === REGISTER_ID, register.register_id);
  check("BRANCH_FREEZE", register.branch_freeze?.upstream_main_sha === FREEZE_SHA, register.branch_freeze);
  check("SOURCE_TIER_ORDER", JSON.stringify(register.source_hierarchy.map((item) => item.source_id)) === JSON.stringify(SOURCE_IDS), register.source_hierarchy.map((item) => item.source_id));
  check("CLAIM_IDS", JSON.stringify(register.text_claims.map((item) => item.claim_id)) === JSON.stringify(CLAIM_IDS), register.text_claims.map((item) => item.claim_id));
  check("ALIGNMENT_IDS", JSON.stringify(register.alignment_decisions.map((item) => item.alignment_id)) === JSON.stringify(["ALIGN-01", "ALIGN-02", "ALIGN-03", "ALIGN-04"]), register.alignment_decisions.map((item) => item.alignment_id));
  check("NO_GEOMETRY_TRANSFER", register.text_claims.filter((item) => item.spatial_use === "text_only_no_digitisation").length === 3 && register.evidence_boundary.changes_submission_geometry === false, register.text_claims.map((item) => [item.claim_id, item.spatial_use]));
  check("VERSION_DELTA_VISIBLE", register.version_delta?.resolution_status === "officially_published_plan_confirms_2024_2035_label_without_approval_document_number", register.version_delta);
  check("METRICS_RECERTIFICATION", register.current_package_recertification?.current_metrics_sha256 === CURRENT_METRICS_SHA256
    && register.current_package_recertification?.metric_change_scope === "non_spatial_e2_governance_metrics_only"
    && JSON.stringify(register.current_package_recertification?.added_metric_ids) === JSON.stringify(RECERTIFIED_METRIC_IDS)
    && register.current_package_recertification?.spatial_metrics_or_geometry_changed === false
    && register.current_package_recertification?.all_nine_geometry_hashes_reverified === true
    && register.current_package_recertification?.evidence_signature_reverified === UNCHANGED_EVIDENCE_SIGNATURE,
  register.current_package_recertification);

  const sources = readJson("sources.json").sources || [];
  const sourceMap = Object.fromEntries(sources.map((item) => [item.id, item]));
  const notice = sourceMap[SOURCE_IDS[0]];
  const report = sourceMap[SOURCE_IDS[1]];
  const official = sourceMap[SOURCE_IDS[2]];
  check("SOURCE_NOTICE_EXISTS", Boolean(notice), notice?.id || null);
  check("SOURCE_REPORT_EXISTS", Boolean(report), report?.id || null);
  check("SOURCE_OFFICIAL_PUBLICATION_EXISTS", Boolean(official), official?.id || null);
  check("SOURCE_NOTICE_URL", notice?.url === "https://ghzrzyw.beijing.gov.cn/chengxiangguihua/ghlgg/hd_ghlgg/202502/t20250207_4005553.html", notice?.url || null);
  check("SOURCE_REPORT_URL", report?.url === "https://bj.people.com.cn/n2/2026/0812/c82840-41665678.html", report?.url || null);
  check("SOURCE_OFFICIAL_PUBLICATION_URL", official?.url === "https://zyk.bjhd.gov.cn/zwdt/xxgk/tzgg/202608/t20260819_4825744_hd.shtml", official?.url || null);
  check("SOURCE_NOTICE_HASH", notice?.retrieved_response_sha256 === "e37446c8f0d675b31031468a5aa37fcfcc2b62a7df30298d91432544b1214f0d", notice?.retrieved_response_sha256 || null);
  check("SOURCE_REPORT_HASH", report?.retrieved_response_sha256 === "0fd37bec49cdae71f86aaddb92be68952d8625f9ebcab65e9219e4c208079bc2", report?.retrieved_response_sha256 || null);
  check("SOURCE_OFFICIAL_PUBLICATION_HASH", official?.retrieved_response_sha256 === "e669105c1f94081213740a44a899b2823aff9622e8b3f89a48fac7fce8073b86", official?.retrieved_response_sha256 || null);
  check("SOURCE_OFFICIAL_PUBLICATION_DATE", official?.published_at === "2026-08-17" && official?.accessed_at === "2026-08-22", [official?.published_at, official?.accessed_at]);
  check("SOURCE_NOTICE_BOUNDARY", notice?.review_status === "official_process_notice_citation_only" && notice?.prohibited_uses?.includes("final approval status or approval date") && notice?.prohibited_uses?.includes("official plan polygon or coordinates"), notice?.prohibited_uses || null);
  check("SOURCE_REPORT_BOUNDARY", report?.review_status === "media_report_citation_only" && report?.prohibited_uses?.includes("conversion of reported figures into submission metrics") && report?.prohibited_uses?.includes("government endorsement or implementation commitment"), report?.prohibited_uses || null);
  check("SOURCE_OFFICIAL_PUBLICATION_BOUNDARY", official?.review_status === "official_publication_page_citation_only" && official?.prohibited_uses?.includes("statutory drawings, zoning maps, plan polygons or coordinates") && official?.prohibited_uses?.includes("government endorsement of this submission or implementation commitment"), official?.prohibited_uses || null);

  const assumptions = readJson("assumptions.json").assumptions || [];
  const assumption = assumptions.find((item) => item.id === ASSUMPTION_ID);
  check("ASSUMPTION_EXISTS", Boolean(assumption), assumption?.id || null);
  check("ASSUMPTION_SOURCES", JSON.stringify(assumption?.source_ids || []) === JSON.stringify(SOURCE_IDS), assumption?.source_ids || null);
  check("ASSUMPTION_REGISTER", assumption?.evidence_register === REGISTER_RELATIVE && assumption?.verification_script === "visual/assets/planning-alignment-audit.js", assumption || null);

  for (const [relative, expected] of Object.entries(register.frozen_package_inputs || {})) {
    let actual = null;
    try {
      actual = sha256(relative);
    } catch (error) {
      check(`PINNED_INPUT:${relative}`, false, error.code || error.message);
      continue;
    }
    check(`PINNED_INPUT:${relative}`, actual === expected, { expected, actual });
  }
  const snapshot = readJson("visual/assets/evidence-snapshot.json");
  check("EVIDENCE_SIGNATURE_UNCHANGED", snapshot.evidence_signature === UNCHANGED_EVIDENCE_SIGNATURE, snapshot.evidence_signature);
  const constraints = readJson("geometry/constraints.geojson");
  check("OFFICIAL_CONTROL_FEATURES_ZERO", Array.isArray(constraints.features) && constraints.features.length === 0, constraints.features?.length);

  const textCarriers = [
    ["proposal.md", "assets/figures/planning-alignment.png"],
    ["proposal.en.md", "assets/figures/planning-alignment.en.png"],
    ["report/proposal.html", "planning-alignment.png"],
    ["report/proposal.en.html", "planning-alignment.en.png"],
    ["visual/index.html", "planning-alignment.png"],
    ["visual/index.en.html", "planning-alignment.en.png"],
  ];
  for (const [relative, figureRef] of textCarriers) {
    let text = "";
    try {
      text = fs.readFileSync(absolute(relative), "utf8");
      check(`TEXT_EXISTS:${relative}`, true, relative);
    } catch (error) {
      check(`TEXT_EXISTS:${relative}`, false, error.code || error.message);
      continue;
    }
    check(`TEXT_REGISTER_ID:${relative}`, text.includes(REGISTER_ID), relative);
    check(`TEXT_REGISTER_HASH:${relative}`, text.includes(registerSha), relative);
    check(`TEXT_FIGURE:${relative}`, text.includes(figureRef), figureRef);
    for (const sourceId of SOURCE_IDS) check(`TEXT_SOURCE:${relative}:${sourceId}`, text.includes(sourceId), sourceId);
  }
  for (const relative of ["report/narrative.md", "assets/media/source-notes.md", "report/copyright_statement.md"]) {
    const text = fs.readFileSync(absolute(relative), "utf8");
    check(`SUPPORTING_TEXT_REGISTER_ID:${relative}`, text.includes(REGISTER_ID), relative);
    check(`SUPPORTING_TEXT_REGISTER_HASH:${relative}`, text.includes(registerSha), relative);
  }

  const binaryCarriers = [
    ["assets/figures/planning-alignment.png", "png"],
    ["assets/figures/planning-alignment.en.png", "png"],
    ["drawings/a3-booklet.pdf", "pdf"],
    ["drawings/a3-booklet.en.pdf", "pdf"],
    ["drawings/a0-boards.pdf", "pdf"],
    ["drawings/a0-boards.en.pdf", "pdf"],
  ];
  for (const [relative, kind] of binaryCarriers) {
    let bytes = null;
    try {
      bytes = fs.readFileSync(absolute(relative));
      check(`BINARY_EXISTS:${relative}`, true, relative);
    } catch (error) {
      check(`BINARY_EXISTS:${relative}`, false, error.code || error.message);
      continue;
    }
    check(`BINARY_REGISTER_ID:${relative}`, bytes.includes(Buffer.from(REGISTER_ID, "ascii")), relative);
    check(`BINARY_REGISTER_HASH:${relative}`, bytes.includes(Buffer.from(registerSha, "ascii")), relative);
    for (const sourceId of SOURCE_IDS) check(`BINARY_SOURCE:${relative}:${sourceId}`, bytes.includes(Buffer.from(sourceId, "ascii")), sourceId);
    if (kind === "png") {
      check(`PNG_SIGNATURE:${relative}`, bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a", relative);
      check(`PNG_DIMENSIONS:${relative}`, bytes.length >= 24 && bytes.readUInt32BE(16) === 2400 && bytes.readUInt32BE(20) === 1500, {
        width: bytes.length >= 24 ? bytes.readUInt32BE(16) : null,
        height: bytes.length >= 24 ? bytes.readUInt32BE(20) : null,
      });
    }
  }

  const manifest = readJson("manifest.json");
  const manifestMap = Object.fromEntries((manifest.files || []).map((item) => [item.path, item]));
  const requiredManifest = {
    "visual/assets/planning-alignment-register.json": "evidence_data",
    "visual/assets/planning-alignment-audit.js": "verification_script",
    "assets/figures/planning-alignment.png": "proposal_figure",
    "assets/figures/planning-alignment.en.png": "proposal_figure",
  };
  for (const [relative, role] of Object.entries(requiredManifest)) {
    check(`MANIFEST_ENTRY:${relative}`, manifestMap[relative]?.role === role, manifestMap[relative] || null);
  }
  check("MANIFEST_READY_STATE", manifest.package_state === "ready_for_review" && manifest.validation_claim?.self_checked === true, manifest.validation_claim);
  const selfCheck = readJson("self_check.json");
  check("SELF_CHECK_COMPLETE", selfCheck.ok === true && selfCheck.can_enter_formal_review === true && selfCheck.checks?.length === 4 && selfCheck.checks.every((item) => item.result === "pass"), {
    ok: selfCheck.ok,
    can_enter_formal_review: selfCheck.can_enter_formal_review,
    gates: selfCheck.checks?.map((item) => [item.check_id, item.result]),
  });

  let selfTest = null;
  if (args.has("--self-test")) {
    const mutated = JSON.parse(JSON.stringify(register));
    mutated.evidence_boundary.official_approval_document_retrieved = true;
    const mutationErrors = structuralErrors(mutated);
    selfTest = {
      mutation: "falsely_mark_official_approval_document_retrieved",
      fail_closed: mutationErrors.some((item) => item.includes("official_approval_document_retrieved")),
      errors: mutationErrors,
    };
    check("SELF_TEST_FAIL_CLOSED", selfTest.fail_closed, selfTest);
  }

  const output = {
    ok,
    submission_id: register.submission_id,
    register_id: REGISTER_ID,
    branch_freeze_main_sha: FREEZE_SHA,
    register_sha256: registerSha,
    evidence_signature: snapshot.evidence_signature,
    summary: {
      passed: checks.filter((item) => item.passed).length,
      failed: checks.filter((item) => !item.passed).length,
      text_claims: register.text_claims.length,
      alignment_decisions: register.alignment_decisions.length,
      carriers: textCarriers.length + binaryCarriers.length,
    },
    self_test: selfTest,
    checks,
  };

  if (args.has("--json")) process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  else if (ok) process.stdout.write(`PASS: ${REGISTER_ID} — ${output.summary.text_claims} claims / ${output.summary.alignment_decisions} alignments / ${output.summary.carriers} carriers\n`);
  else process.stdout.write(`FAIL: ${REGISTER_ID}\n${checks.filter((item) => !item.passed).map((item) => `- ${item.id}: ${JSON.stringify(item.details)}`).join("\n")}\n`);
  return ok ? 0 : 1;
}

try {
  process.exitCode = main();
} catch (error) {
  process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
  process.exitCode = 1;
}
