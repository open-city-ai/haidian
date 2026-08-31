(function (root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.JZACCorrection = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const ORDERED_STATES = ["INTAKE", "PAUSE", "REVIEW", "CORRECT", "RETEST", "ADOPTION", "RECOVERY", "CLOSED"];
  const DOSSIER_KEYS = [
    "intake_receipt",
    "pause_receipt",
    "independent_review_record",
    "same_channel_correction_receipt",
    "retest_ticket",
    "adoption_consequence",
    "recovery_retirement_receipt",
    "closure_record"
  ];
  const isText = value => typeof value === "string" && value.trim().length > 0;
  function evaluate(record) {
    const receipt = record && record.receipt;
    if (!receipt || !receipt.asset_data_recovery_record) return { state: "retire", reason: "recovery_record_missing" };
    for (const key of ["accountable_role", "independent_reviewer", "pause_record", "evidence_basis", "review_result", "product_retest_task", "procurement_update"]) {
      if (typeof receipt[key] !== "string" || !receipt[key].trim()) return { state: "pause", reason: key + "_missing" };
    }
    if (record.status !== "synthetic_drill_not_field_result" || record.case?.live_public_release !== false) {
      return { state: "pause", reason: "synthetic_boundary_required" };
    }
    const dossier = record.case_dossier;
    if (!dossier || typeof dossier !== "object") return { state: "pause", reason: "case_dossier_missing" };
    if (!dossier.recovery_retirement_receipt) return { state: "retire", reason: "institutional_recovery_receipt_missing" };
    const missingDossierKey = DOSSIER_KEYS.find(key => !dossier[key] || typeof dossier[key] !== "object");
    if (missingDossierKey) return { state: "pause", reason: missingDossierKey + "_missing" };
    const trace = Array.isArray(record.state_trace) ? record.state_trace.map(row => row && row.state) : [];
    if (trace.length !== ORDERED_STATES.length || trace.some((state, index) => state !== ORDERED_STATES[index])) {
      return { state: "pause", reason: "illegal_state_transition_or_shortcut" };
    }
    const channels = record.original_channels;
    if (!Array.isArray(channels) || channels.length !== 2) return { state: "pause", reason: "channel_inventory_incomplete" };
    if (channels.some(c => !c || typeof c !== "object")) return { state: "pause", reason: "invalid_channel_receipt" };
    const originalIds = record.case.original_channel_ids;
    if (!Array.isArray(originalIds) || originalIds.length !== 2 || new Set(originalIds).size !== 2 || originalIds.some(id => typeof id !== "string" || !id.trim())) return { state: "pause", reason: "original_publication_inventory_missing" };
    if (new Set(channels.map(c => c.id)).size !== channels.length) return { state: "pause", reason: "duplicate_channel" };
    if (channels.some(c => !originalIds.includes(c.id))) return { state: "pause", reason: "not_the_original_channels" };
    if (receipt.independent_reviewer.trim() === receipt.accountable_role.trim()) return { state: "pause", reason: "reviewer_conflict" };
    if (channels.some(c => !c.id || !c.pause_status || !c.correction_status || !isText(c.version_before) || !isText(c.version_after) || c.front_end_corrected !== true || c.backend_only_change !== false || c.acknowledged !== true)) {
      return { state: "pause", reason: "channel_receipt_incomplete" };
    }
    const coverage = receipt.same_channel_correction_status;
    if (!coverage || coverage.required_channels !== channels.length || coverage.corrected_channels !== channels.length || coverage.coverage_ratio !== 1) {
      return { state: "pause", reason: "coverage_mismatch" };
    }
    const intake = dossier.intake_receipt;
    if (!Array.isArray(intake.registered_channel_ids) || intake.registered_channel_ids.length !== originalIds.length || intake.registered_channel_ids.some(id => !originalIds.includes(id)) || intake.unregistered_channel_count !== 0 || intake.screenless_path_completed !== true || intake.critical_path_blockers !== 0) {
      return { state: "pause", reason: "intake_receipt_incomplete" };
    }
    const pause = dossier.pause_receipt;
    if (pause.human_decision !== true || !Array.isArray(pause.paused_channel_ids) || pause.paused_channel_ids.length !== originalIds.length || pause.paused_channel_ids.some(id => !originalIds.includes(id))) {
      return { state: "pause", reason: "human_pause_incomplete" };
    }
    const review = dossier.independent_review_record;
    if (review.accountable_role !== "independent_reviewer" || review.conflict_check !== "clear" || review.conflict_count !== 0 || !isText(review.result)) {
      return { state: "pause", reason: "independent_review_invalid" };
    }
    const correction = dossier.same_channel_correction_receipt;
    if (correction.required_channel_count !== originalIds.length || correction.acknowledged_channel_count !== originalIds.length || correction.coverage_ratio !== 1 || correction.backend_only_change_accepted !== false || !Array.isArray(correction.channels) || correction.channels.length !== originalIds.length || correction.channels.some(c => !c || !originalIds.includes(c.id) || !isText(c.old_version) || !isText(c.new_version) || c.front_end_corrected !== true || c.acknowledged !== true)) {
      return { state: "pause", reason: "same_channel_correction_incomplete" };
    }
    const retest = dossier.retest_ticket;
    if (retest.completed !== true || retest.service_restore_authorized !== false || !isText(retest.failure_fixture) || !isText(retest.result)) {
      return { state: "pause", reason: "retest_incomplete_or_self_authorizing" };
    }
    const adoption = dossier.adoption_consequence;
    if (adoption.human_decision !== true || adoption.automatic_model_decision !== false || !isText(adoption.decision)) {
      return { state: "pause", reason: "human_adoption_consequence_missing" };
    }
    const institutionalRecovery = dossier.recovery_retirement_receipt;
    if (institutionalRecovery.completed !== true || institutionalRecovery.unclosed_item_count !== 0 || !Array.isArray(institutionalRecovery.items) || institutionalRecovery.items.some(item => !item || !isText(item.state) || !isText(item.evidence))) {
      return { state: "retire", reason: "institutional_recovery_incomplete" };
    }
    const closure = dossier.closure_record;
    if (closure.all_seven_receipt_classes_present !== true || closure.all_original_channels_acknowledged !== true || closure.retest_complete !== true || closure.adoption_consequence_recorded !== true || closure.recovery_complete !== true || closure.status !== "CLOSED_SYNTHETIC_ONLY" || closure.field_authorization !== false) {
      return { state: "pause", reason: "closure_conditions_incomplete" };
    }
    const recovery = receipt.asset_data_recovery_record;
    if (["temporary_label_restored", "offline_cache_cleared", "synthetic_test_material_isolated"].some(k => recovery[k] !== true)) {
      return { state: "retire", reason: "recovery_incomplete" };
    }
    return { state: "synthetic_complete", reason: "not_authorized_for_field_use" };
  }
  function inject(record, field) {
    const copy = JSON.parse(JSON.stringify(record));
    if (field === "original_channels") delete copy.original_channels;
    else delete copy.receipt[field];
    return copy;
  }
  function removePath(record, dottedPath) {
    const copy = JSON.parse(JSON.stringify(record));
    const parts = dottedPath.split(".");
    let cursor = copy;
    for (let index = 0; index < parts.length - 1; index += 1) {
      if (!cursor || typeof cursor !== "object") return copy;
      cursor = cursor[parts[index]];
    }
    if (cursor && typeof cursor === "object") delete cursor[parts[parts.length - 1]];
    return copy;
  }
  return { evaluate, inject, removePath, ORDERED_STATES };
});
