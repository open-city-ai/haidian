#!/usr/bin/env node
"use strict";

/**
 * DATA-COOP-REVIEW-SPINE-01 — read-only, fail-loud audit for the five-minute
 * reviewer route. Node built-ins only; no network access and no field claims.
 *
 * Usage:
 *   node visual/assets/reviewer-evidence-spine-audit.js [--json]
 *   node visual/assets/reviewer-evidence-spine-audit.js --self-test [--json]
 */

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const assetsDir = __dirname;
const submissionDir = path.resolve(assetsDir, "..", "..");
const SPINE_RELATIVE = "visual/assets/reviewer-evidence-spine.json";
const SPINE_ID = "DATA-COOP-REVIEW-SPINE-01";
const FREEZE_SHA = "9782df83a8f2a58ebe79823fe8001f18d129b975";
const EVIDENCE_SIGNATURE = "c880c438924399d40267391551669d937dcfc5e144850eb511a45bbf024c4a52";
const FIELD_PACK_SHA256 = "4613343f7943bc81207db0fc3c8ad2a98bc97fb1e4f0442eb215f1e36a773a61";
const DRILL_LEDGER_SHA256 = "86ebfa7655e4cc79fb9d155d22cb62c821a131ec5e4882d71153e7dd13bd5507";
const REQUIRED_STEP_IDS = [
  "R1-AUTHORITY",
  "R2-SPATIAL",
  "R3-MVP",
  "R4-FIELD-CONTROL",
  "R5-FAIL-CLOSED",
];

function absolute(relative) {
  return path.join(submissionDir, relative);
}

function readJson(relative) {
  return JSON.parse(fs.readFileSync(absolute(relative), "utf8"));
}

function sha256(relative) {
  return crypto.createHash("sha256").update(fs.readFileSync(absolute(relative))).digest("hex");
}

function valueAt(metrics, key) {
  return metrics?.metrics?.[key]?.value;
}

function same(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function structuralErrors(spine) {
  const errors = [];
  if (spine.schema_version !== "1.0.0") errors.push("schema_version must be 1.0.0");
  if (spine.submission_id !== "dvd233/data-coop-line") errors.push("submission_id mismatch");
  if (spine.spine_id !== SPINE_ID) errors.push(`spine_id must be ${SPINE_ID}`);
  if (spine.branch_freeze?.upstream_main_sha !== FREEZE_SHA) errors.push("branch freeze SHA mismatch");
  if (spine.branch_freeze?.gate_scripts_from_this_freeze !== true) errors.push("gate-script freeze flag must be true");
  if (spine.purpose?.direction_change !== false) errors.push("direction_change must remain false");
  if (spine.purpose?.new_source_or_license_boundary !== false) errors.push("new source/license boundary must remain false");
  if (spine.purpose?.changes_geometry_or_metrics !== false) errors.push("geometry/metric change flag must remain false");
  if (spine.route_duration_seconds !== 300) errors.push("review route must remain exactly 300 seconds");
  const steps = spine.steps || [];
  if (!same(steps.map((item) => item.step_id), REQUIRED_STEP_IDS)) errors.push("step IDs or order drifted");
  if (!same(steps.map((item) => item.order), [1, 2, 3, 4, 5])) errors.push("step order must be 1..5");
  if (steps.reduce((sum, item) => sum + item.duration_seconds, 0) !== 300) errors.push("step durations must sum to 300");
  for (const step of steps) {
    for (const field of ["title_zh", "title_en", "question_zh", "question_en", "verified_zh", "verified_en", "boundary_zh", "boundary_en"]) {
      if (typeof step[field] !== "string" || step[field].trim() === "") errors.push(`${step.step_id || "unknown"} missing ${field}`);
    }
    if (!Array.isArray(step.references) || step.references.length < 2) errors.push(`${step.step_id || "unknown"} needs at least two references`);
  }
  return errors;
}

function main() {
  const args = new Set(process.argv.slice(2));
  const allowed = new Set(["--json", "--self-test"]);
  for (const arg of args) {
    if (!allowed.has(arg)) throw new Error(`Unknown argument: ${arg}`);
  }

  const checks = [];
  let ok = true;
  const check = (id, condition, details) => {
    const passed = Boolean(condition);
    checks.push({ id, passed, details });
    if (!passed) ok = false;
  };

  const spine = readJson(SPINE_RELATIVE);
  const spineSha256 = sha256(SPINE_RELATIVE);
  const structure = structuralErrors(spine);
  check("SPINE_STRUCTURE", structure.length === 0, structure);
  check("SPINE_SHA256", /^[0-9a-f]{64}$/.test(spineSha256), spineSha256);

  for (const step of spine.steps || []) {
    for (const reference of step.references || []) {
      check(
        `REFERENCE_EXISTS:${step.step_id}:${reference.path}`,
        typeof reference.path === "string" && fs.existsSync(absolute(reference.path)),
        reference,
      );
    }
  }

  const siteRegister = readJson("visual/assets/site-evidence-register.json");
  const constraints = readJson("geometry/constraints.geojson");
  check("SITE_REGISTER_FROZEN_SOURCE", siteRegister.frozen_main_sha === "ce2c6bcee348accc3c354f585c9ad45e39ff2db7", siteRegister.frozen_main_sha);
  check("SITE_GEOMETRY_MAPPING_COUNT", siteRegister.scope_geometry_checks?.length === 4, siteRegister.scope_geometry_checks?.length);
  check("OFFICIAL_CONTROL_FEATURE_COUNT", constraints.features?.length === 0, constraints.features?.length);
  check("CONTROL_GAP_STATUS", constraints.data_gap?.status === "official_constraint_geometry_unavailable", constraints.data_gap?.status);
  check("CONTROL_MISSING_LAYER_COUNT", constraints.data_gap?.missing_layers?.length === 6, constraints.data_gap?.missing_layers);

  const metrics = readJson("metrics.json");
  const expectedMetrics = {
    site_area_sqm: 11412825.386,
    building_footprint_area_sqm: 40063.344,
    green_space_area_sqm: 2384747.221,
    public_space_area_sqm: 98164.982,
    dazhongsi_mvp_key_area_sqm: 720454.219,
    dazhongsi_mvp_reversible_room_footprint_sqm: 13361.508,
    dazhongsi_mvp_public_receipt_space_sqm: 32739.258,
    dazhongsi_mvp_route_length_m: 1614.218,
    dazhongsi_mvp_scenario_count: 3,
    dazhongsi_mvp_no_data_route_coverage_ratio: 1,
    dazhongsi_drill_case_total: 21,
    dazhongsi_drill_case_passed: 21,
    dazhongsi_drill_negative_fixture_fail_closed_total: 8,
  };
  for (const [key, expected] of Object.entries(expectedMetrics)) {
    check(`METRIC:${key}`, valueAt(metrics, key) === expected, { expected, actual: valueAt(metrics, key) });
  }

  const snapshot = readJson("visual/assets/evidence-snapshot.json");
  check("EVIDENCE_SIGNATURE", snapshot.evidence_signature === EVIDENCE_SIGNATURE, snapshot.evidence_signature);

  const fieldPack = readJson("visual/assets/dazhongsi-field-validation-pack.json");
  check("FIELD_PACK_HASH", sha256("visual/assets/dazhongsi-field-validation-pack.json") === FIELD_PACK_SHA256, sha256("visual/assets/dazhongsi-field-validation-pack.json"));
  check("FIELD_PACK_STATE", fieldPack.template_state === "not_observed" && fieldPack.fieldwork_authorization_status === "unknown", {
    template_state: fieldPack.template_state,
    fieldwork_authorization_status: fieldPack.fieldwork_authorization_status,
  });
  check("FIELD_PACK_COUNTS", fieldPack.collection_points?.length === 5 && fieldPack.field_routes?.length === 3 && fieldPack.raci?.roles?.length === 6 && fieldPack.evidence_receipts?.length === 11 && fieldPack.signoff_slots?.length === 6, {
    points: fieldPack.collection_points?.length,
    routes: fieldPack.field_routes?.length,
    roles: fieldPack.raci?.roles?.length,
    receipts: fieldPack.evidence_receipts?.length,
    signoffs: fieldPack.signoff_slots?.length,
  });

  const drill = readJson("visual/assets/dazhongsi-drill-tests.json");
  check("DRILL_LEDGER_HASH", sha256("visual/assets/dazhongsi-drill-tests.json") === DRILL_LEDGER_SHA256, sha256("visual/assets/dazhongsi-drill-tests.json"));
  check("DRILL_COUNTS", drill.expected_case_count === 21 && drill.expected_fixture_count === 8, {
    cases: drill.expected_case_count,
    fixtures: drill.expected_fixture_count,
  });

  const manifest = readJson("manifest.json");
  const manifestRoles = Object.fromEntries((manifest.files || []).map((item) => [item.path, item]));
  const requiredManifestEntries = {
    "visual/assets/reviewer-evidence-spine.json": "evidence_data",
    "visual/assets/reviewer-evidence-spine-audit.js": "verification_script",
    "assets/figures/reviewer-evidence-spine.png": "proposal_figure",
    "assets/figures/reviewer-evidence-spine.en.png": "proposal_figure",
  };
  for (const [relative, role] of Object.entries(requiredManifestEntries)) {
    check(`MANIFEST_ROLE:${relative}`, manifestRoles[relative]?.role === role, manifestRoles[relative] || null);
  }
  check("MANIFEST_REVIEW_STATE", manifest.package_state === "ready_for_review" && manifest.validation_claim?.self_checked === true, {
    package_state: manifest.package_state,
    self_checked: manifest.validation_claim?.self_checked,
  });

  const selfCheck = readJson("self_check.json");
  const gateChecks = selfCheck.checks || [];
  check("SELF_CHECK_COMPLETE", selfCheck.ok === true && selfCheck.can_enter_formal_review === true && gateChecks.length === 4 && gateChecks.every((item) => item.result === "pass"), {
    ok: selfCheck.ok,
    can_enter_formal_review: selfCheck.can_enter_formal_review,
    gate_results: gateChecks.map((item) => [item.check_id, item.result]),
  });

  const textCarriers = [
    ["proposal.md", "assets/figures/reviewer-evidence-spine.png"],
    ["proposal.en.md", "assets/figures/reviewer-evidence-spine.en.png"],
    ["report/proposal.html", "reviewer-evidence-spine.png"],
    ["report/proposal.en.html", "reviewer-evidence-spine.en.png"],
    ["visual/index.html", "reviewer-evidence-spine.png"],
    ["visual/index.en.html", "reviewer-evidence-spine.en.png"],
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
    check(`TEXT_SPINE_ID:${relative}`, text.includes(SPINE_ID), relative);
    check(`TEXT_SPINE_HASH:${relative}`, text.includes(spineSha256), relative);
    check(`TEXT_FIGURE:${relative}`, text.includes(figureRef), figureRef);
  }

  const binaryCarriers = [
    "assets/figures/reviewer-evidence-spine.png",
    "assets/figures/reviewer-evidence-spine.en.png",
    "drawings/a3-booklet.pdf",
    "drawings/a3-booklet.en.pdf",
    "drawings/a0-boards.pdf",
    "drawings/a0-boards.en.pdf",
  ];
  for (const relative of binaryCarriers) {
    let bytes = null;
    try {
      bytes = fs.readFileSync(absolute(relative));
      check(`BINARY_EXISTS:${relative}`, true, relative);
    } catch (error) {
      check(`BINARY_EXISTS:${relative}`, false, error.code || error.message);
      continue;
    }
    check(`BINARY_SPINE_ID:${relative}`, bytes.includes(Buffer.from(SPINE_ID, "ascii")), relative);
    check(`BINARY_SPINE_HASH:${relative}`, bytes.includes(Buffer.from(spineSha256, "ascii")), relative);
    if (relative.endsWith(".png")) {
      check(`PNG_DIMENSIONS:${relative}`, bytes.length >= 24 && bytes.readUInt32BE(16) === 2400 && bytes.readUInt32BE(20) === 1500, {
        width: bytes.length >= 24 ? bytes.readUInt32BE(16) : null,
        height: bytes.length >= 24 ? bytes.readUInt32BE(20) : null,
      });
    }
  }

  let selfTest = null;
  if (args.has("--self-test")) {
    const mutated = JSON.parse(JSON.stringify(spine));
    mutated.steps.pop();
    const mutationErrors = structuralErrors(mutated);
    selfTest = {
      mutation: "drop_final_review_step",
      fail_closed: mutationErrors.length > 0,
      errors: mutationErrors,
    };
    check("SELF_TEST_FAIL_CLOSED", selfTest.fail_closed, selfTest);
  }

  const report = {
    ok,
    submission_id: spine.submission_id,
    spine_id: SPINE_ID,
    branch_freeze_main_sha: FREEZE_SHA,
    spine_sha256: spineSha256,
    route_duration_seconds: spine.route_duration_seconds,
    summary: {
      passed: checks.filter((item) => item.passed).length,
      failed: checks.filter((item) => !item.passed).length,
      review_steps: spine.steps?.length || 0,
      carrier_count: textCarriers.length + binaryCarriers.length,
    },
    self_test: selfTest,
    checks,
  };

  if (args.has("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (ok) {
    process.stdout.write(`PASS: ${SPINE_ID} — ${report.summary.review_steps} steps / ${report.route_duration_seconds}s / ${report.summary.carrier_count} carriers\n`);
  } else {
    const failed = checks.filter((item) => !item.passed);
    process.stdout.write(`FAIL: ${SPINE_ID}\n${failed.map((item) => `- ${item.id}: ${JSON.stringify(item.details)}`).join("\n")}\n`);
  }
  return ok ? 0 : 1;
}

try {
  process.exitCode = main();
} catch (error) {
  process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
  process.exitCode = 1;
}
