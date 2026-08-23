#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ASSET_DIR = __dirname;
const PACKAGE_DIR = path.resolve(ASSET_DIR, "../..");
const SNAPSHOT_DIR = path.join(ASSET_DIR, "protocol_snapshots");
const FIXTURE_DIR = path.join(ASSET_DIR, "crosswalk-fixtures");
const AUDIT_PATH = path.join(ASSET_DIR, "three-area-operations-audit.json");
const MANIFEST_PATH = path.join(SNAPSHOT_DIR, "manifest.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function fail(message, errors) {
  errors.push(message);
}

function validateSnapshotManifest(manifest, errors) {
  if (manifest.offline_stability !== "local_bytes_pinned") {
    fail("snapshot manifest must declare local_bytes_pinned", errors);
  }
  if (!Array.isArray(manifest.snapshots) || manifest.snapshots.length !== 3) {
    fail("snapshot manifest must contain exactly three protocol assets", errors);
    return new Map();
  }

  const snapshots = new Map();
  for (const snapshot of manifest.snapshots) {
    if (!snapshot.id || snapshots.has(snapshot.id)) {
      fail(`duplicate or missing snapshot id: ${snapshot.id || "<missing>"}`, errors);
      continue;
    }
    snapshots.set(snapshot.id, snapshot);
    const localPath = path.join(PACKAGE_DIR, snapshot.local_path);
    if (!fs.existsSync(localPath)) {
      fail(`${snapshot.id}: local snapshot is missing: ${snapshot.local_path}`, errors);
      continue;
    }
    const actual = sha256(localPath);
    if (actual !== snapshot.sha256) {
      fail(`${snapshot.id}: sha256 mismatch (expected ${snapshot.sha256}, got ${actual})`, errors);
    }
    if (!snapshot.license || !snapshot.attribution || !snapshot.source_commit) {
      fail(`${snapshot.id}: license, attribution, and source_commit are required`, errors);
    }
  }
  return snapshots;
}

function validateAuditRegistration(audit, manifest, errors) {
  const adoption = audit.protocol_adoption;
  if (!adoption || adoption.status !== "optional_crosswalk_concept_only") {
    fail("audit asset must keep optional_crosswalk_concept_only status", errors);
    return;
  }
  if (adoption.source_of_record !== "visual/assets/three-area-operations-audit.json") {
    fail("audit source_of_record must point to the local audit asset", errors);
  }
  if (adoption.snapshot_manifest !== "visual/assets/protocol_snapshots/manifest.json") {
    fail("audit snapshot_manifest must point to the local snapshot manifest", errors);
  }
  if (adoption.verification_script !== "visual/assets/check-protocol-crosswalk.js") {
    fail("audit verification_script must point to the local checker", errors);
  }
  for (const fixturePath of adoption.fixture_paths || []) {
    if (!fs.existsSync(path.join(PACKAGE_DIR, fixturePath))) fail(`missing declared fixture ${fixturePath}`, errors);
  }
  const rules = new Set((adoption.crosswalk_rules || []).map((rule) => rule.id));
  for (const required of ["CW-01", "CW-02", "CW-03", "CW-04"]) {
    if (!rules.has(required)) fail(`audit asset is missing ${required}`, errors);
  }
  const manifestById = new Map(manifest.snapshots.map((snapshot) => [snapshot.id, snapshot]));
  for (const entry of adoption.external_spec_snapshots || []) {
    const snapshot = manifestById.get(entry.id);
    if (!snapshot) {
      fail(`audit registration references unknown snapshot ${entry.id}`, errors);
      continue;
    }
    if (entry.spec_sha256 !== undefined && entry.spec_sha256 !== snapshot.sha256) {
      fail(`${entry.id}: audit registration hash differs from local snapshot manifest`, errors);
    }
    if (entry.adoption_claim !== "optional_crosswalk_only") {
      fail(`${entry.id}: adoption claim must remain optional_crosswalk_only`, errors);
    }
    if (entry.local_snapshot_id && entry.local_snapshot_id !== entry.id) {
      fail(`${entry.id}: local_snapshot_id must match the registered id`, errors);
    }
    if (entry.id === "SWITCHBACK-V030" && entry.schema_sha256 !== manifestById.get("SWITCHBACK-V030-SCHEMA")?.sha256) {
      fail(`${entry.id}: schema hash differs from local schema snapshot`, errors);
    }
  }
}

function validateFixture(fixture, snapshots, audit, errors) {
  const fixtureErrors = [];
  if (fixture.source_of_record !== "visual/assets/three-area-operations-audit.json") {
    fail(`${fixture.fixture_id}: source_of_record must be the local audit asset`, fixtureErrors);
  }
  if (fixture.snapshot_manifest !== "visual/assets/protocol_snapshots/manifest.json") {
    fail(`${fixture.fixture_id}: snapshot_manifest must be local`, fixtureErrors);
  }
  for (const snapshotId of fixture.snapshot_ids || []) {
    if (!snapshots.has(snapshotId)) fail(`${fixture.fixture_id}: unknown snapshot ${snapshotId}`, fixtureErrors);
  }
  const requiredFields = ["ai_off_path", "human_handoff", "gate_id", "operating_mode", "responsible_role"];
  for (const field of requiredFields) {
    if (!fixture.local_state || !fixture.local_state[field]) fail(`${fixture.fixture_id}: missing local field ${field}`, fixtureErrors);
    if (!fixture.field_map || !fixture.field_map[field]) fail(`${fixture.fixture_id}: missing field map ${field}`, fixtureErrors);
  }
  const ruleIds = new Set((audit.protocol_adoption.crosswalk_rules || []).map((rule) => rule.id));
  for (const ruleId of fixture.crosswalk_rules_used || []) {
    if (!ruleIds.has(ruleId)) fail(`${fixture.fixture_id}: unknown crosswalk rule ${ruleId}`, fixtureErrors);
  }

  const boundaries = fixture.boundaries || {};
  if (fixture.adoption_mode !== "optional_crosswalk_only") fail(`${fixture.fixture_id}: adoption mode overclaims`, fixtureErrors);
  if (boundaries.external_level_claim === true) fail(`${fixture.fixture_id}: external level claim is not allowed`, fixtureErrors);
  if (boundaries.external_open_level_id !== null) fail(`${fixture.fixture_id}: external open level id must be null`, fixtureErrors);
  if (boundaries.field_data !== false) fail(`${fixture.fixture_id}: field_data must remain false`, fixtureErrors);
  if (boundaries.performance_results !== null) fail(`${fixture.fixture_id}: performance_results must remain null`, fixtureErrors);
  if (boundaries.official_endorsement !== false) fail(`${fixture.fixture_id}: official endorsement must remain false`, fixtureErrors);
  if (boundaries.deployment_authorized !== false) fail(`${fixture.fixture_id}: deployment authorization must remain false`, fixtureErrors);

  const actualResult = fixtureErrors.length === 0 ? "pass" : "reject";
  const expectedResult = fixture.expected_result;
  return {
    fixture_id: fixture.fixture_id,
    expected_result: expectedResult,
    actual_result: actualResult,
    ok: expectedResult === actualResult,
    errors: fixtureErrors,
  };
}

const errors = [];
const manifest = readJson(MANIFEST_PATH);
const snapshots = validateSnapshotManifest(manifest, errors);
const audit = readJson(AUDIT_PATH);
validateAuditRegistration(audit, manifest, errors);

const fixtureFiles = fs.readdirSync(FIXTURE_DIR).filter((name) => name.endsWith(".json")).sort();
const fixtures = fixtureFiles.map((name) => validateFixture(readJson(path.join(FIXTURE_DIR, name)), snapshots, audit, errors));
for (const result of fixtures) {
  if (!result.ok) errors.push(`${result.fixture_id}: expected ${result.expected_result}, got ${result.actual_result}`);
}

const output = {
  ok: errors.length === 0,
  snapshot_count: snapshots.size,
  fixture_count: fixtures.length,
  fixture_results: fixtures,
  errors,
};
console.log(JSON.stringify(output, null, 2));
process.exitCode = output.ok ? 0 : 1;
