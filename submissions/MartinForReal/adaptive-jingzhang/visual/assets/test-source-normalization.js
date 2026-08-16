#!/usr/bin/env node
"use strict";

// Does every source record say what it is, and does it say so honestly?
//
// The 41 records did not share a field shape. Six pointed at repository files through a
// `path` key, one carried a retrieval hash, and the other thirty-four carried neither a
// local-evidence state nor any limitation. None of the 41 carried a machine-readable
// reference state, so a source that nothing in the package cited looked exactly like a
// source that carried an argument. Two records were in that position: PHYSARUM-CHINA-2013
// and PHYSARUM-WUHAN-2023.
//
// This test does not trust the declaration. It scans the package itself, counts the bounded
// citations that actually point at each identifier, and requires the declared reference
// state to match what it found. A record declared `cited` with nothing pointing at it fails,
// and so does a record declared `background_only` that something does cite.
//
// It also holds the local-evidence contract to its own terms. Thirty-three records were
// never retrieved into this package, so they cannot carry a retrieval-time SHA-256, and the
// frozen two-state contract is superseded for them by a third state that says so out loud.
// The supersession has to be registered with a reason and with a count that matches the
// records actually in that state; a record that quietly carries a hash it should not have,
// or quietly lacks one it should have, fails here.
//
// The last assertion is about fabrication. Twenty-one records hold the literal placeholder
// `not_transcribed_from_source` where a title or an issuer would go, because nobody read the
// source document. That is the correct answer, and it stays correct only while the
// placeholder is inseparable from the status field that explains it; a record holding the
// placeholder without the status would read as a transcribed title.
//
// Everything expected is written in this file. The 41 identifiers, the four state names, the
// state invariants and the two background-only identifiers are pinned as literals rather
// than imported from build-sources.js or from source-bibliography.json, so a builder that
// changes one of them has to change this file too.
//
// Read-only. Usage: node test-source-normalization.js

const fs = require("fs");
const path = require("path");

const contract = require("./key-area-contract.js");

const { PACKAGE_ROOT, readText, readJson, harness, cli } = contract;
const REPO_ROOT = path.resolve(PACKAGE_ROOT, "..", "..", "..");
const SHA256_RE = /^[0-9a-f]{64}$/i;

// The closed inventory, pinned. A record added or removed without this list changing is a
// change to the frozen 41-record contract and is reported as one.
const SOURCE_IDS = [
  "SITE-PACKAGE", "SOURCE-REGISTRY", "PROCESSED-FACT-PACK", "BOUNDARY-SOURCE",
  "KEY-AREA-SOURCE", "OFFICIAL-ANNOUNCEMENT", "AGENT-TASKBOOK", "ISSUE-846",
  "ISSUE-1029", "ISSUE-1774", "ISSUE-1781", "ISSUE-2170", "PHYSARUM-MAZE-2000",
  "PHYSARUM-MODEL-2007", "PHYSARUM-TOKYO-2010", "PHYSARUM-CHINA-2013",
  "PHYSARUM-TORONTO-2022", "PHYSARUM-WUHAN-2023", "SCHELLING-1971", "HOLLING-1973",
  "CASE-ONE-NORTH", "CASE-SEOUL-AI-HUB", "CASE-PARIS-SACLAY", "CASE-MILA",
  "CASE-KENDALL", "CASE-KALASATAMA", "CASE-QUAYSIDE", "OPEN-BUILDING-HABRAKEN-2021",
  "SHEARING-LAYERS-BRAND-1994", "OSTROM-COMMONS-1990", "OSTROM-POLYCENTRIC-2010",
  "REAL-OPTIONS-NEUFVILLE-2003", "HOLLING-ADAPTIVE-CYCLE-2001",
  "PORTUGALI-SELF-ORGANIZING-1997", "CAS-DYNAMIC-CITIES-2018", "BLUEVIEW-DISPOSITION-2025",
  "BLUEVIEW-RENEWAL-CASE-2026", "GB-55019-2021-OFFICIAL", "DB11-T-2209-2023-OFFICIAL",
  "BEIJING-RESPONSIBILITY-PLANNER-2024", "BEIJING-METEOROLOGICAL-SEASONAL-QUALIFICATION",
];

// The two records nothing in the package cites. They are kept because deleting them would
// discard real method lineage, and they are marked because keeping them silently would let
// a reader mistake a bibliography entry for an argument.
const BACKGROUND_ONLY_IDS = ["PHYSARUM-CHINA-2013", "PHYSARUM-WUHAN-2023"];

// Present on all 41 records after normalization.
const REQUIRED_FIELDS = [
  "id", "source_type", "title", "author_or_issuer", "year", "usage",
  "reference_state", "local_evidence_state", "local_reference_path",
  "retrieved_content_sha256", "limitations_zh", "limitations_en",
];

// Fields allowed to hold null on any record.
const NULLABLE_FIELDS = new Set(["year", "local_reference_path", "retrieved_content_sha256"]);

// A record that names no publisher because none was chosen may leave the bibliographic
// fields null, and only that record may. The permission is tied to the state so the null
// cannot spread to a record that simply failed to fill the field in.
const UNSELECTED_STATE = "source_not_selected";
const UNSELECTED_NULLABLE_FIELDS = new Set(["title", "author_or_issuer"]);

// The four permitted local-evidence states and what each one commits to. `path` is whether
// local_reference_path must be a non-empty string; `hash` is whether
// retrieved_content_sha256 must be a non-empty string. `null` means the field must be null.
const LOCAL_EVIDENCE_STATES = {
  repository_local_copy: { path: "string", hash: null },
  url_only_not_cleared_with_retrieval_hash: { path: null, hash: "string" },
  url_only_no_retrieval_hash: { path: null, hash: null },
  source_not_selected: { path: null, hash: null },
};

// The state the frozen two-state contract cannot express, and the number of records in it.
const SUPERSEDED_STATE = "url_only_no_retrieval_hash";
const SUPERSEDED_RECORD_COUNT = 33;

// A background-only record has to say what it may and may not be used for, in both
// languages, or the marking carries no meaning.
const BACKGROUND_FIELDS = [
  "allowed_uses_zh", "allowed_uses_en", "prohibited_inferences_zh", "prohibited_inferences_en",
];

// The literal that stands where a title or an issuer would go when nobody read the source.
const UNTRANSCRIBED = "not_transcribed_from_source";

// Files scanned for citations. Excluded: the two registries that define the inventory, the
// changelog, which records the ledger rather than making an argument from a source, and all
// JavaScript. Builder, contract, runner, and test code may repeat source metadata, but code is
// not a publication surface and therefore cannot prove that a source is cited.
function citationCarriers() {
  const excluded = new Set([
    "sources.json",
    "changelog.md",
    "visual/assets/source-bibliography.json",
    "visual/assets/test-source-normalization.js",
  ]);
  const carriers = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(dir, entry.name);
      const rel = path.relative(PACKAGE_ROOT, full).split(path.sep).join("/");
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".git") continue;
        walk(full);
        continue;
      }
      if (!/\.(json|md|html)$/.test(entry.name)) continue;
      if (excluded.has(rel)) continue;
      carriers.push(rel);
    }
  };
  walk(PACKAGE_ROOT);
  return carriers;
}

function carrierAssert(carriers, report) {
  for (const rel of carriers) {
    if (path.posix.extname(rel).toLowerCase() === ".js") {
      report(`${rel} is JavaScript and may not act as a citation carrier`);
    }
  }
}

// A bounded citation is the marker form a reader sees, the quoted identifier a structured
// record holds, or the locator form used inside the register tables.
function countCitations(text, id) {
  let total = 0;
  for (const pattern of [`[source:${id}]`, `"${id}"`, `source:${id}`]) {
    let index = 0;
    while ((index = text.indexOf(pattern, index)) >= 0) {
      total += 1;
      index += pattern.length;
    }
  }
  return total;
}

function findDanglingSourceLocators(carriers, texts) {
  const known = new Set(SOURCE_IDS);
  const dangling = new Set();
  for (let i = 0; i < carriers.length; i += 1) {
    for (const match of texts[i].matchAll(/(?:^|[^A-Za-z0-9_-])source:([A-Za-z0-9][A-Za-z0-9_-]*)(?=$|[^A-Za-z0-9_-])/gm)) {
      if (!known.has(match[1])) {
        dangling.add(`${carriers[i]} cites unknown source ${match[1]}`);
      }
    }
  }
  return [...dangling].sort();
}

function danglingAssert(bundle, report) {
  for (const message of findDanglingSourceLocators(bundle.carriers, bundle.texts)) {
    report(message);
  }
}

function citationCoverageAssert(observedCitations, report) {
  const observedUncited = SOURCE_IDS
    .filter((id) => (observedCitations[id] ?? 0) === 0)
    .sort();
  const expectedUncited = [...BACKGROUND_ONLY_IDS].sort();
  if (observedUncited.join("|") !== expectedUncited.join("|")) {
    report(`uncited source set ${observedUncited.join(", ") || "(empty)"}, not pinned ${expectedUncited.join(", ")}`);
  }
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isInside(root, target) {
  const relative = path.relative(root, target);
  return relative === "" || (
    relative !== ".."
    && !relative.startsWith(`..${path.sep}`)
    && !path.isAbsolute(relative)
  );
}

function assertLocalReferencePath(record, report) {
  const value = record.local_reference_path;
  const parts = value.split("#");
  if (parts.length > 2) {
    report(`${record.id}: local_reference_path may contain at most one # fragment`);
    return;
  }

  const repositoryPath = parts[0];
  const fragment = parts.length === 2 ? parts[1] : null;
  if (!repositoryPath || repositoryPath.includes("\\") || repositoryPath.includes("\0")) {
    report(`${record.id}: local_reference_path must be a non-empty POSIX repository-relative path`);
    return;
  }
  if (path.posix.isAbsolute(repositoryPath) || path.win32.isAbsolute(repositoryPath)) {
    report(`${record.id}: local_reference_path must not be absolute: ${JSON.stringify(value)}`);
    return;
  }
  if (path.posix.normalize(repositoryPath) !== repositoryPath) {
    report(`${record.id}: local_reference_path must be normalized: ${JSON.stringify(value)}`);
    return;
  }
  if (fragment !== null && !fragment) {
    report(`${record.id}: local_reference_path fragment may not be empty`);
    return;
  }

  const resolved = path.resolve(REPO_ROOT, ...repositoryPath.split("/"));
  if (!isInside(REPO_ROOT, resolved)) {
    report(`${record.id}: local_reference_path escapes repository root: ${JSON.stringify(value)}`);
    return;
  }
  if (!fs.existsSync(resolved)) {
    report(`${record.id}: local_reference_path target does not exist: ${JSON.stringify(repositoryPath)}`);
    return;
  }

  const realRepoRoot = fs.realpathSync(REPO_ROOT);
  const realTarget = fs.realpathSync(resolved);
  if (!isInside(realRepoRoot, realTarget)) {
    report(`${record.id}: local_reference_path resolves outside repository root: ${JSON.stringify(value)}`);
    return;
  }

  if (fragment !== null) {
    if (path.extname(repositoryPath).toLowerCase() !== ".geojson") {
      report(`${record.id}: only GeoJSON local_reference_path values may carry a feature fragment`);
      return;
    }
    let geojson;
    try {
      geojson = JSON.parse(fs.readFileSync(resolved, "utf8"));
    } catch (error) {
      report(`${record.id}: cannot parse GeoJSON local_reference_path: ${error.message}`);
      return;
    }
    const features = Array.isArray(geojson.features) ? geojson.features : [];
    const resolves = features.some((feature) => feature && (
      feature.id === fragment
      || (feature.properties && feature.properties.id === fragment)
    ));
    if (!resolves) {
      report(`${record.id}: GeoJSON fragment ${fragment} does not resolve to a feature id`);
    }
  }
}

// Applies one deliberate change to an in-memory copy of the records and reports whether the
// assertion under test rejected it. A rule that cannot be made to fail is not a rule.
function mutationHolds(records, mutate, assert) {
  const copy = JSON.parse(JSON.stringify(records));
  mutate(copy);
  const failures = [];
  assert(copy, (message) => failures.push(message));
  return failures.length > 0;
}

function run() {
  return harness(
    "source-normalization",
    "every source record carries one evidence field shape and a reference state the package can prove",
    (fail) => {
      const sources = readJson("sources.json");
      const records = Array.isArray(sources.sources) ? sources.sources : [];
      const detail = { record_count: records.length };

      // 1. The closed inventory.
      const observedIds = records.map((record) => record.id);
      if (records.length !== SOURCE_IDS.length) {
        fail(`sources.json holds ${records.length} records, not the closed ${SOURCE_IDS.length}`);
      }
      for (const id of SOURCE_IDS) {
        if (!observedIds.includes(id)) fail(`sources.json no longer holds the pinned record ${id}`);
      }
      for (const id of observedIds) {
        if (!SOURCE_IDS.includes(id)) fail(`sources.json holds ${id}, which is not in the pinned inventory`);
      }

      // 2. One field shape across all 41.
      const shapeAssert = (list, report) => {
        for (const record of list) {
          for (const field of REQUIRED_FIELDS) {
            if (!(field in record)) {
              report(`${record.id}: ${field} is absent`);
              continue;
            }
            const value = record[field];
            if (value === null) {
              const unselected = record.local_evidence_state === UNSELECTED_STATE
                && UNSELECTED_NULLABLE_FIELDS.has(field);
              if (!NULLABLE_FIELDS.has(field) && !unselected) report(`${record.id}: ${field} may not be null`);
              continue;
            }
          if (field === "year") {
            if (!Number.isInteger(value)) {
              report(`${record.id}: year must be an integer or null, found ${JSON.stringify(value)}`);
            }
            continue;
          }
          if (!nonEmptyString(value)) {
            report(`${record.id}: ${field} must be a non-empty string, found ${JSON.stringify(value)}`);
          }
          }
        }
      };
      shapeAssert(records, fail);

      // 3. The local-evidence state invariants.
      const stateAssert = (list, report) => {
        for (const record of list) {
          const rule = LOCAL_EVIDENCE_STATES[record.local_evidence_state];
          if (!rule) {
            report(`${record.id}: local_evidence_state ${record.local_evidence_state} is not one of the four permitted states`);
            continue;
          }
          const pathValue = record.local_reference_path;
        if (rule.path === "string" && !nonEmptyString(pathValue)) {
          report(`${record.id}: ${record.local_evidence_state} requires a repository-relative local_reference_path`);
        }
        if (rule.path === "string" && nonEmptyString(pathValue)) {
          assertLocalReferencePath(record, report);
        }
          if (rule.path === null && pathValue !== null) {
            report(`${record.id}: ${record.local_evidence_state} requires local_reference_path null, found ${JSON.stringify(pathValue)}`);
          }
          const hashValue = record.retrieved_content_sha256;
          if (rule.hash === "string" && !nonEmptyString(hashValue)) {
            report(`${record.id}: ${record.local_evidence_state} requires a retrieval-time SHA-256`);
          }
        if (rule.hash === null && hashValue !== null) {
          report(`${record.id}: ${record.local_evidence_state} must not carry a retrieval-time SHA-256, found ${JSON.stringify(hashValue)}`);
        }
        if (hashValue !== null && (typeof hashValue !== "string" || !SHA256_RE.test(hashValue))) {
          report(`${record.id}: retrieved_content_sha256 must be exactly 64 hexadecimal characters when present`);
        }
          // The only state that may leave title and author_or_issuer null has to say that
          // no source was chosen, and has to state the conditions a source would have to
          // meet, or the null is indistinguishable from an omission.
          if (record.local_evidence_state === UNSELECTED_STATE) {
            if (record.selection_status !== "not_selected") {
              report(`${record.id}: ${UNSELECTED_STATE} requires selection_status "not_selected", found ${JSON.stringify(record.selection_status)}`);
            }
            for (const field of ["frozen_id_note_zh", "frozen_id_note_en"]) {
              if (!nonEmptyString(record[field])) report(`${record.id}: ${UNSELECTED_STATE} requires a non-empty ${field} explaining why no source was chosen`);
            }
            for (const field of ["admissibility_conditions_zh", "admissibility_conditions_en"]) {
              const conditions = record[field];
              if (!Array.isArray(conditions) || conditions.length === 0 || !conditions.every(nonEmptyString)) {
                report(`${record.id}: ${UNSELECTED_STATE} requires ${field} to state the conditions a source would have to meet`);
              }
            }
          }
        }
      };
      stateAssert(records, fail);

      const stateCounts = {};
      for (const record of records) {
        stateCounts[record.local_evidence_state] = (stateCounts[record.local_evidence_state] ?? 0) + 1;
      }
      detail.local_evidence_state_counts = stateCounts;
      if ((stateCounts[SUPERSEDED_STATE] ?? 0) !== SUPERSEDED_RECORD_COUNT) {
        fail(`${SUPERSEDED_STATE} covers ${stateCounts[SUPERSEDED_STATE] ?? 0} records, not the ${SUPERSEDED_RECORD_COUNT} the supersession record accounts for`);
      }

      // 4. The supersession is registered rather than applied silently.
      const bibliography = readJson("visual/assets/source-bibliography.json");
      const supersedes = bibliography?.evidence_contract?.supersedes;
      if (!supersedes) {
        fail("visual/assets/source-bibliography.json registers no evidence_contract.supersedes record, so the third local-evidence state would be an undeclared change to the frozen two-state contract");
      } else {
        for (const field of ["clause_zh", "clause_en", "reason_zh", "reason_en"]) {
          if (!nonEmptyString(supersedes[field])) fail(`evidence_contract.supersedes.${field} is empty`);
        }
        if (supersedes.affected_record_count !== SUPERSEDED_RECORD_COUNT) {
          fail(`evidence_contract.supersedes.affected_record_count is ${supersedes.affected_record_count}, not the ${SUPERSEDED_RECORD_COUNT} records observed in ${SUPERSEDED_STATE}`);
        }
      }

      // 5. The declared reference state against an independent scan of the package.
    const carriers = citationCarriers();
    carrierAssert(carriers, fail);
    const texts = carriers.map((rel) => readText(rel));
      const observedCitations = {};
      for (const id of SOURCE_IDS) {
        observedCitations[id] = texts.reduce((sum, text) => sum + countCitations(text, id), 0);
      }
      detail.citation_carriers_scanned = carriers.length;
    detail.uncited_ids = SOURCE_IDS.filter((id) => observedCitations[id] === 0).sort();
    citationCoverageAssert(observedCitations, fail);

      const referenceAssert = (list, report) => {
        for (const record of list) {
          const observed = observedCitations[record.id] ?? 0;
          if (record.reference_state !== "cited" && record.reference_state !== "background_only") {
            report(`${record.id}: reference_state ${record.reference_state} is neither cited nor background_only`);
            continue;
          }
          if (record.reference_state === "cited" && observed === 0) {
            report(`${record.id}: declared cited, but no bounded citation anywhere in the package points at it`);
          }
          if (record.reference_state === "background_only" && observed > 0) {
            report(`${record.id}: declared background_only, but ${observed} bounded citations point at it`);
          }
        }
      };
      referenceAssert(records, fail);

      // 6. A background-only marking has to carry its own permitted use and prohibition.
      const backgroundAssert = (list, report) => {
        const declared = list
          .filter((record) => record.reference_state === "background_only")
          .map((record) => record.id)
          .sort();
        if (declared.join("|") !== [...BACKGROUND_ONLY_IDS].sort().join("|")) {
          report(`background_only set is ${declared.join(", ") || "(empty)"}, not the pinned ${BACKGROUND_ONLY_IDS.join(", ")}`);
        }
        for (const record of list) {
          if (record.reference_state !== "background_only") continue;
          for (const field of BACKGROUND_FIELDS) {
            if (!nonEmptyString(record[field])) {
              report(`${record.id}: background_only requires a non-empty ${field}`);
            }
          }
        }
      };
      backgroundAssert(records, fail);

      // 7. The untranscribed placeholder never travels without the status that explains it.
      const untranscribedAssert = (list, report) => {
        for (const record of list) {
          const placeholder = record.title === UNTRANSCRIBED || record.author_or_issuer === UNTRANSCRIBED;
          const declared = record.bibliographic_status === UNTRANSCRIBED;
          if (placeholder && !declared) {
            report(`${record.id}: holds the ${UNTRANSCRIBED} placeholder without bibliographic_status, so a reader would take the placeholder for a transcribed value`);
          }
          if (declared && !placeholder) {
            report(`${record.id}: declares bibliographic_status ${UNTRANSCRIBED} while title and author_or_issuer both hold values, so the status describes nothing`);
          }
          if ("bibliographic_status" in record && !declared) {
            report(`${record.id}: bibliographic_status is ${JSON.stringify(record.bibliographic_status)}, and ${UNTRANSCRIBED} is the only value the field carries`);
          }
        }
      };
      untranscribedAssert(records, fail);
      detail.untranscribed_count = records.filter((record) => record.bibliographic_status === UNTRANSCRIBED).length;

      // 8. No publication surface or structured record cites an identifier the inventory
      //    does not hold.
    const dangling = findDanglingSourceLocators(carriers, texts);
    for (const message of dangling) fail(message);
    detail.dangling_source_citations = dangling.length;

      // 9. Deliberate mutations. Each one names the assertion it is proving can fail.
    const findState = (list, state) => list.find((record) => record.local_evidence_state === state);
    const mutations = {
      citation_carriers_exclude_builder_javascript: mutationHolds(
        carriers,
        (list) => { list.push("visual/assets/build-mutated.js"); },
        carrierAssert,
      ),
      citation_carriers_exclude_test_javascript: mutationHolds(
        carriers,
        (list) => { list.push("visual/assets/test-mutated.js"); },
        carrierAssert,
      ),
      citation_coverage_cited_source_missing: mutationHolds(
        observedCitations,
        (observed) => { observed["SITE-PACKAGE"] = 0; },
        citationCoverageAssert,
      ),
      citation_coverage_background_source_used: mutationHolds(
        observedCitations,
        (observed) => { observed[BACKGROUND_ONLY_IDS[0]] = 1; },
        citationCoverageAssert,
      ),
      dangling_raw_source_locator: mutationHolds(
        { carriers, texts },
        (bundle) => { bundle.texts[0] += "\nsource:NOT-IN-SOURCE-INVENTORY\n"; },
        danglingAssert,
      ),
      field_shape_absent: mutationHolds(records, (list) => { delete list[0].limitations_en; }, shapeAssert),
        field_shape_empty: mutationHolds(records, (list) => { list[0].usage = "   "; }, shapeAssert),
      field_shape_null: mutationHolds(records, (list) => { list[0].limitations_zh = null; }, shapeAssert),
      field_shape_number_in_string: mutationHolds(records, (list) => { list[0].usage = 2026; }, shapeAssert),
      field_shape_year_string: mutationHolds(records, (list) => {
        list.find((record) => Number.isInteger(record.year)).year = "2026";
      }, shapeAssert),
      field_shape_year_fractional: mutationHolds(records, (list) => {
        list.find((record) => Number.isInteger(record.year)).year = 2026.5;
      }, shapeAssert),
        state_unknown: mutationHolds(records, (list) => { list[0].local_evidence_state = "cleared_locally"; }, stateAssert),
      state_path_missing: mutationHolds(
        records,
        (list) => { findState(list, "repository_local_copy").local_reference_path = null; },
        stateAssert,
      ),
      state_path_unsafe: mutationHolds(
        records,
        (list) => { findState(list, "repository_local_copy").local_reference_path = "../outside.json"; },
        stateAssert,
      ),
      state_path_target_missing: mutationHolds(
        records,
        (list) => { findState(list, "repository_local_copy").local_reference_path = "brief/site-package/does-not-exist.json"; },
        stateAssert,
      ),
      state_geojson_feature_missing: mutationHolds(
        records,
        (list) => {
          list.find((record) => record.id === "BOUNDARY-SOURCE").local_reference_path =
            "brief/site-package/geometry/provisional_boundaries.geojson#MISSING-FEATURE";
        },
        stateAssert,
      ),
        state_invented_hash: mutationHolds(
          records,
          (list) => { findState(list, "url_only_no_retrieval_hash").retrieved_content_sha256 = "0".repeat(64); },
          stateAssert,
        ),
      state_hash_dropped: mutationHolds(
        records,
        (list) => { findState(list, "url_only_not_cleared_with_retrieval_hash").retrieved_content_sha256 = null; },
        stateAssert,
      ),
      state_hash_wrong_length: mutationHolds(
        records,
        (list) => { findState(list, "url_only_not_cleared_with_retrieval_hash").retrieved_content_sha256 = "abc"; },
        stateAssert,
      ),
      state_hash_non_hex: mutationHolds(
        records,
        (list) => { findState(list, "url_only_not_cleared_with_retrieval_hash").retrieved_content_sha256 = "z".repeat(64); },
        stateAssert,
      ),
        unselected_without_declaration: mutationHolds(
          records,
          (list) => { findState(list, UNSELECTED_STATE).selection_status = "selected"; },
          stateAssert,
        ),
        unselected_without_conditions: mutationHolds(
          records,
          (list) => { findState(list, UNSELECTED_STATE).admissibility_conditions_en = []; },
          stateAssert,
        ),
        unselected_null_title_elsewhere: mutationHolds(
          records,
          (list) => { findState(list, "url_only_no_retrieval_hash").title = null; },
          shapeAssert,
        ),
        reference_uncited_claimed_cited: mutationHolds(
          records,
          (list) => { list.find((record) => record.id === BACKGROUND_ONLY_IDS[0]).reference_state = "cited"; },
          referenceAssert,
        ),
        reference_cited_claimed_background: mutationHolds(
          records,
          (list) => { list.find((record) => record.id === "OSTROM-COMMONS-1990").reference_state = "background_only"; },
          referenceAssert,
        ),
        background_without_prohibition: mutationHolds(
          records,
          (list) => { list.find((record) => record.id === BACKGROUND_ONLY_IDS[1]).prohibited_inferences_en = ""; },
          backgroundAssert,
        ),
        placeholder_without_status: mutationHolds(
          records,
          (list) => { delete list.find((record) => record.bibliographic_status === UNTRANSCRIBED).bibliographic_status; },
          untranscribedAssert,
        ),
        status_without_placeholder: mutationHolds(
          records,
          (list) => {
            const target = list.find((record) => record.bibliographic_status === UNTRANSCRIBED);
            target.title = "A Title Nobody Read";
            target.author_or_issuer = "An Issuer Nobody Checked";
          },
          untranscribedAssert,
        ),
      };
      detail.mutations = mutations;
      for (const [name, held] of Object.entries(mutations)) {
        if (!held) fail(`mutation ${name} was not rejected, so that assertion cannot fail and does not constrain anything`);
      }

      return detail;
    },
  );
}

if (require.main === module) cli(run());

module.exports = { run };
