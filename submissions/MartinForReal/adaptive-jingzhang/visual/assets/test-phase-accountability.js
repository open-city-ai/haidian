#!/usr/bin/env node
"use strict";

// If one of these twelve actions went ahead, who would run it, who would stop it, and who
// would put the ground back?
//
// The failure this test exists to catch is a proposal that reads as ready. Every action in
// this package is unfunded, unauthorized, and missing a named authority, so
// `pilot_start_allowed` has to be false for all twelve — and it has to be false because
// those preconditions are unmet, not because someone typed false. The test recomputes it
// from the record and compares.
//
// "unassigned" is an acceptable answer here and "TBD" is not. The first states that nobody
// holds the role; the second implies somebody will, which this package cannot promise.
//
// Read-only. Usage: node test-phase-accountability.js

const contract = require("./key-area-contract.js");

const {
  ACTION_IDS, ACTION_FIELDS, ACTION_ROLE_FIELDS, AREAS, HONEST_UNASSIGNED,
  ROLE_NOT_APPLICABLE, FORBIDDEN_PLACEHOLDERS, GATE_PATTERN, computePilotStartAllowed,
  exists, readJson, harness, cli,
} = contract;

const ACTIONS = "visual/assets/action-governance.json";
const DESIGN = "visual/assets/key-area-design.json";

const AREA_IDS = new Set(AREAS.map((area) => area.area_feature_id));

function isFilled(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

function placeholderIn(value) {
  if (typeof value !== "string") return null;
  return FORBIDDEN_PLACEHOLDERS.find((token) => value.includes(token)) ?? null;
}

function run() {
  return harness("KA-ACT", "every action names its authority and derives its own start permission", (fail) => {
    if (!exists(ACTIONS)) return fail(`${ACTIONS} does not exist`);
    const registry = readJson(ACTIONS);
    const actions = registry.actions ?? [];

    const byId = new Map(actions.map((action) => [action.project_id ?? action.id, action]));
    if (actions.length !== ACTION_IDS.length) {
      fail(`the registry holds ${actions.length} actions, expected ${ACTION_IDS.length}`);
    }
    for (const id of ACTION_IDS) {
      if (!byId.has(id)) fail(`the registry has no action ${id}`);
    }
    for (const id of byId.keys()) {
      if (!ACTION_IDS.includes(id)) fail(`the registry declares ${id}, which is not one of P00-P11`);
    }

    const detail = {};
    for (const id of ACTION_IDS) {
      const action = byId.get(id);
      if (!action) continue;

      for (const field of ACTION_FIELDS) {
        // `pilot_start_allowed` is legitimately the boolean false, which the filled check
        // would treat as present only by accident, so it gets its own rule.
        if (field === "pilot_start_allowed") {
          if (typeof action[field] !== "boolean") fail(`${id} declares no boolean ${field}`);
          continue;
        }
        if (!isFilled(action[field])) fail(`${id} is missing ${field}`);
      }
      if (action.project_id !== id) fail(`${id} declares project_id ${JSON.stringify(action.project_id)}`);

      // Nothing here has been authorized, so a target that someone had signed off on would
      // be a claim about a decision nobody has taken.
      if (!("authorized_target" in action)) fail(`${id} does not declare authorized_target`);
      else if (action.authorized_target !== null) {
        fail(`${id} declares an authorized target ${JSON.stringify(action.authorized_target)}, expected null`);
      }

      for (const field of ACTION_ROLE_FIELDS) {
        const role = action[field];
        const placeholder = placeholderIn(role);
        if (placeholder) {
          fail(`${id} ${field} is the placeholder ${JSON.stringify(placeholder)}; say ${HONEST_UNASSIGNED} instead`);
        }
        if (typeof role === "string" && role.trim() === "") fail(`${id} ${field} is blank`);
      }
      // Only the two steward roles may be waived, and only by saying so.
      for (const field of ["operator_role", "maintainer_role", "stop_authority_role"]) {
        if (action[field] === ROLE_NOT_APPLICABLE) {
          fail(`${id} declares ${field} not applicable; every action has one`);
        }
      }

      // A placeholder anywhere else in the record. Bilingual prose is where "TBD" survives
      // longest, because nobody rereads the other language.
      for (const [key, value] of Object.entries(action)) {
        if (ACTION_ROLE_FIELDS.includes(key)) continue;
        const placeholder = placeholderIn(value);
        if (placeholder) fail(`${id} ${key} contains the placeholder ${JSON.stringify(placeholder)}`);
      }

      for (const areaId of action.area_ids ?? []) {
        if (!AREA_IDS.has(areaId)) fail(`${id} names area ${areaId}, which is not a key area`);
      }
      for (const gate of action.blocked_by ?? []) {
        if (!GATE_PATTERN.test(gate)) fail(`${id} is blocked by ${JSON.stringify(gate)}, which is not a D01-D17 gate`);
      }

      // The derivation. If these disagree, the published permission is an assertion rather
      // than a consequence of the record.
      const computed = computePilotStartAllowed(action);
      if (action.pilot_start_allowed !== computed.allowed) {
        fail(`${id} publishes pilot_start_allowed ${action.pilot_start_allowed}, but its own record derives ${computed.allowed} (${computed.blockers.join(", ") || "no blockers"})`);
      }
      if (computed.allowed) {
        fail(`${id} derives pilot_start_allowed true; nothing in this package is funded, authorized, or staffed`);
      }
      if (!isFilled(action.start_blockers)) fail(`${id} does not publish its start blockers`);
      else if (JSON.stringify(action.start_blockers) !== JSON.stringify(computed.blockers)) {
        fail(`${id} publishes start blockers ${JSON.stringify(action.start_blockers)}, derived ${JSON.stringify(computed.blockers)}`);
      }

      detail[id] = { pilot_start_allowed: action.pilot_start_allowed ?? null, blockers: computed.blockers.length };
    }

    // Each area needs an envelope that says what would physically be placed, how it comes
    // out, and who carries the consequence if it does not.
    if (exists(DESIGN)) {
      const areas = new Map((readJson(DESIGN).areas ?? []).map((area) => [area.area_feature_id, area]));
      for (const expected of AREAS) {
        const envelope = areas.get(expected.area_feature_id)?.phase1_envelope;
        if (!envelope) {
          fail(`${expected.area_feature_id} declares no Phase-1 envelope`);
          continue;
        }
        for (const field of [
          "id", "description_zh", "description_en", "removal_zh", "removal_en",
          "restoration_zh", "restoration_en", "liability_zh", "liability_en",
          "evidence_refs", "authorization_state", "funding_state",
        ]) {
          if (!isFilled(envelope[field])) fail(`${expected.prefix} Phase-1 envelope is missing ${field}`);
        }
        if (envelope.reversible !== true) fail(`${expected.prefix} Phase-1 envelope is not declared reversible`);
        if (envelope.georeferenced !== expected.georeferenced) {
          fail(`${expected.prefix} Phase-1 envelope declares georeferenced ${envelope.georeferenced}, expected ${expected.georeferenced}`);
        }
        for (const gate of envelope.blocked_by ?? []) {
          if (!GATE_PATTERN.test(gate)) {
            fail(`${expected.prefix} envelope is blocked by ${JSON.stringify(gate)}, which is not a D01-D17 gate`);
          }
        }
      }
    } else {
      fail(`${DESIGN} does not exist; no area declares a Phase-1 envelope`);
    }

    return { actions: actions.length, detail };
  });
}

if (require.main === module) cli(run());

module.exports = { run };
