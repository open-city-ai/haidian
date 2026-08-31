#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ledgerPath = path.join(__dirname, "agent-participation-ledger.json");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(ledger.schema_version === "0.2.0", "unexpected schema_version");
assert(
  ledger.status === "public_process_partially_observed_urban_implementation_unverified",
  "ledger status must keep public process and urban implementation separate"
);
assert(
  ledger.current_release_status === "v0.16_repository_intake_accepted_and_merged_advisory_96_formal_selection_unobserved_v0.17_local_candidate",
  "release status must distinguish V0.16 repository intake/merge and advisory 96 from the local V0.17 candidate and unobserved formal selection"
);

const expectedPublicStages = ["FRAME", "CREATE", "TRACE", "CHALLENGE", "JUDGE", "RETURN"];
const publicStages = Array.isArray(ledger.public_work_loop) ? ledger.public_work_loop : [];
assert(
  JSON.stringify(publicStages.map((stage) => stage.stage_id)) === JSON.stringify(expectedPublicStages),
  "public_work_loop must contain FRAME, CREATE, TRACE, CHALLENGE, JUDGE and RETURN in order"
);

const allowedStatuses = new Set([
  "documented_public_record",
  "documented_intake_record_only",
  "reserved_for_humans_formal_outcome_unobserved",
  "partial_public_record_future_outcomes_unobserved"
]);
for (const stage of publicStages) {
  assert(typeof stage.label_zh === "string" && stage.label_zh.length > 0, `${stage.stage_id}: missing label_zh`);
  assert(typeof stage.label_en === "string" && stage.label_en.length > 0, `${stage.stage_id}: missing label_en`);
  assert(allowedStatuses.has(stage.status), `${stage.stage_id}: disallowed status ${stage.status}`);
  assert(typeof stage.human_authority === "string" && stage.human_authority.length > 20, `${stage.stage_id}: missing human authority boundary`);
}

const judge = publicStages.find((stage) => stage.stage_id === "JUDGE");
assert(
  judge && judge.status === "reserved_for_humans_formal_outcome_unobserved",
  "JUDGE must remain reserved for humans with formal outcome unobserved"
);
const challenge = publicStages.find((stage) => stage.stage_id === "CHALLENGE");
assert(
  challenge?.evidence_scope?.includes("PR 4306") &&
    challenge.evidence_scope.includes("96/100") &&
    challenge.evidence_scope.includes("PR 4308") &&
    challenge.evidence_scope.includes("100/100") &&
    challenge.evidence_scope.includes("PR 4313") &&
    challenge.evidence_scope.includes("advisory scores are not formal jury scoring"),
  "CHALLENGE evidence scope must record all three PR cycles and the advisory/formal boundary"
);

const revision = ledger.documented_revision_cycle || {};
const revisionSteps = Array.isArray(revision.steps) ? revision.steps : [];
assert(revision.source_id === "SUBMISSION-INTAKE-PR-4306", "revision cycle must cite PR 4306");
assert(revision.pull_request === 4306, "revision cycle pull request mismatch");
assert(revision.final_head_commit === "6f44dbc777e8069286c2ff607416c722cc96c667", "revision cycle head mismatch");
assert(revision.merge_commit === "c40a680e99452b31f5a9b5f630c2cf73c092ed6f", "revision cycle merge mismatch");
assert(
  JSON.stringify(revisionSteps.map((step) => step.step_id)) === JSON.stringify(["R1", "R2", "R3", "R4"]),
  "revision cycle must preserve the detected-repaired-rechecked-intake sequence"
);
assert(
  revisionSteps[0]?.advisory_score === 90 && revisionSteps[2]?.advisory_score === 96 &&
    revisionSteps[0]?.formal_competition_score === null && revisionSteps[2]?.formal_competition_score === null,
  "advisory scores must be recorded without inventing formal competition scores"
);
assert(
  revisionSteps[3]?.formal_selection === null && revisionSteps[3]?.gallery_publication === null && revisionSteps[3]?.implementation === null,
  "repository intake must not imply selection, gallery publication or implementation"
);
assert(revision.boundary?.includes("does not populate FP01 H0-H4"), "revision cycle must preserve the urban-evidence boundary");

const latest = ledger.latest_reviewed_intake || {};
assert(latest.source_id === "SUBMISSION-INTAKE-PR-4313", "latest reviewed intake must cite PR 4313");
assert(latest.pull_request === 4313 && latest.submission_version === "V0.16", "latest reviewed intake identity mismatch");
assert(latest.final_head_commit === "4c23e8f62dddbcdf141404050fcdb352737fe073", "PR 4313 head mismatch");
assert(latest.merge_commit === "a0bc3867178cc9d35767e9edc611282aa58469b9", "PR 4313 merge mismatch");
assert(latest.reviewed_package_sha256 === "ef95c067f23a4131cbdb8dd7d6c08adc722995a79436a901ebbc4fff31f0f4e7", "PR 4313 package hash mismatch");
assert(latest.deterministic_validation === "PASS" && latest.advisory_review_score === 96, "PR 4313 validation/advisory result mismatch");
assert(latest.formal_competition_score === null, "advisory 96 must not become a formal competition score");
assert(
  latest.recommendations?.includes("formal-review-ready") && latest.recommendations?.includes("featured-candidate"),
  "PR 4313 recommendations are incomplete"
);
assert(latest.boundary?.includes("not a formal jury score or a guarantee for the local V0.17"), "latest intake must preserve the V0.17 non-guarantee boundary");

const expectedUrbanStages = ["SOURCE", "STACK", "PROVE", "LIVE_MARKET", "ENABLE", "COMMONS"];
const urbanStages = Array.isArray(ledger.urban_application_loop) ? ledger.urban_application_loop : [];
assert(
  JSON.stringify(urbanStages.map((stage) => stage.stage_id)) === JSON.stringify(expectedUrbanStages),
  "urban_application_loop must preserve the six established capability stages"
);
assert(
  urbanStages.every((stage) => stage.status === "concept_only_pending_h0_h4"),
  "every urban application stage must remain concept_only_pending_h0_h4"
);

assert(ledger.external_evidence_boundary?.fp01_h0_h4_verified_gate_count === 0, "H0-H4 verified gate count must remain zero");
assert(ledger.external_evidence_boundary?.fp01_external_evidence_artifact_verified_count === 0, "verified external artifact count must remain zero");
assert(
  ledger.external_evidence_boundary?.rule?.includes("PR 4306") &&
    ledger.external_evidence_boundary.rule.includes("PR 4308") &&
    ledger.external_evidence_boundary.rule.includes("PR 4313") &&
    ledger.external_evidence_boundary.rule.includes("None is formal jury scoring") &&
    ledger.external_evidence_boundary.rule.includes("not selection, adoption or implementation"),
  "external-evidence rule must preserve all advisory/intake boundaries"
);

const requiredExclusions = [
  "formal_competition_selection",
  "adoption_or_implementation",
  "government_endorsement",
  "national_pilot_designation",
  "approved_planning_or_procurement",
  "demonstrated_public_benefit",
  "independently_verified_world_first",
  "settled_historical_significance"
];
for (const item of requiredExclusions) {
  assert(ledger.excluded_claims?.includes(item), `missing excluded claim: ${item}`);
}

assert(Array.isArray(ledger.transferable_actions) && ledger.transferable_actions.length === 6, "six transferable institutional actions are required");
assert(
  ledger.transferable_actions.some((item) => item.public_work_action === "human_final_judgment_gate_reserved_outcome_unobserved"),
  "transferable actions must encode a reserved, unobserved human-judgment gate"
);
assert(ledger.assumption_id === "A-AGENT-PARTICIPATION-METHOD-001", "assumption link is missing");

if (failures.length) {
  console.error(`agent-participation-ledger: FAIL (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("agent-participation-ledger: PASS");
