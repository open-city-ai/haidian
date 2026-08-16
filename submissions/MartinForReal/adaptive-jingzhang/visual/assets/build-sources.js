#!/usr/bin/env node
"use strict";

// Migrates sources.json to the closed 41-record inventory and gives every record the
// title / author_or_issuer / year bibliographic field shape.
//
// A bibliographic value is only ever transcribed, never guessed. In priority order a
// field may come from:
//   1. brief/site-package/sources.json, matched by the record's own url or path;
//   2. the DOI-verifiable title_overrides table in source-bibliography.json;
//   3. the record's own identifier or url (a trailing year in the ID, a dated Beijing
//      government url segment, or the registered domain via host_issuers);
//   4. a record description migrated verbatim from the approved specification.
// When none of those supplies a value the field is written as the explicit string
// "not_transcribed_from_source" rather than being filled in.
//
// The repository registry is opened read-only and is never written.
//
// Usage: node build-sources.js [--check]

const fs = require("node:fs");
const path = require("node:path");

const ASSETS = __dirname;
const PACKAGE_ROOT = path.resolve(ASSETS, "..", "..");
const REPO_ROOT = path.resolve(PACKAGE_ROOT, "..", "..", "..");

const SOURCES = path.join(PACKAGE_ROOT, "sources.json");
const BIBLIOGRAPHY = path.join(ASSETS, "source-bibliography.json");
const REPO_REGISTRY = path.join(REPO_ROOT, "brief", "site-package", "sources.json");

const UNRESOLVED = "not_transcribed_from_source";

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// Beijing government pages carry the publication date in the url, e.g.
// /202506/t20250606_4107444.html; gov.cn uses /2022-03/30/. Both are the page's own
// data, so reading a year out of them is transcription, not inference.
function yearFromUrl(url) {
  if (typeof url !== "string") return null;
  const dated = url.match(/\/t(\d{4})\d{4}_/) || url.match(/\/(\d{4})-\d{2}\//);
  if (dated) return Number(dated[1]);
  const segment = url.match(/\/(\d{4})(?:0[1-9]|1[0-2])\//);
  return segment ? Number(segment[1]) : null;
}

function yearFromId(id) {
  const trailing = String(id).match(/-((?:19|20)\d{2})$/);
  return trailing ? Number(trailing[1]) : null;
}

function hostOf(url) {
  if (typeof url !== "string") return null;
  const match = url.match(/^https?:\/\/([^/]+)/i);
  return match ? match[1].toLowerCase() : null;
}

function buildRegistryIndex(registry) {
  const index = new Map();
  const records = Array.isArray(registry?.sources) ? registry.sources : [];
  for (const record of records) {
    if (typeof record.url === "string") index.set(record.url, record);
  }
  return index;
}

// Matches a package record against the repository registry by url, by repository path,
// or by a path that the registry stores as its url value.
function registryMatch(record, index) {
  for (const candidate of [record.url, record.path]) {
    if (typeof candidate !== "string") continue;
    if (index.has(candidate)) return index.get(candidate);
    const trimmed = candidate.replace(/\/$/, "");
    for (const [key, value] of index) {
      if (key === trimmed || key.startsWith(`${trimmed}/`)) return value;
    }
  }
  return null;
}

// A previous run writes derived bibliographic fields back into the record. Re-deriving
// on top of them would flip every provenance tag from "derived" to "specification",
// so the authored state is recovered first using the provenance tags themselves.
function stripDerived(record) {
  const provenance = record.bibliographic_provenance;
  if (!Array.isArray(provenance)) return record;
  const authored = { ...record };
  delete authored.bibliographic_provenance;
  delete authored.bibliographic_status;
  for (const field of ["title", "author_or_issuer", "year"]) {
    const tag = field === "author_or_issuer" ? "issuer" : field;
    if (!provenance.includes(`${tag}:specification`)) delete authored[field];
  }
  return authored;
}

function enrich(record, context) {
  const { overrides, registryIndex, hostIssuers, repositoryIssuer } = context;
  // A record registered without a chosen source has nothing to transcribe from.
  // Marking it "not transcribed" would imply a source exists that was not read, so its
  // bibliographic fields are held at null and the task that would select one stays open.
  if (record.selection_status === "not_selected") {
    const held = { ...record, title: null, author_or_issuer: null, year: null };
    delete held.bibliographic_provenance;
    delete held.bibliographic_status;
    return held;
  }
  const authored = stripDerived(record);
  const override = overrides[authored.id] || null;
  const registered = registryMatch(authored, registryIndex);
  const provenance = [];

  let title = authored.title;
  if (title === undefined || title === null || title === UNRESOLVED) {
    if (registered?.title) {
      title = registered.title;
      provenance.push("title:repository_registry");
    } else if (override?.title) {
      title = override.title;
      provenance.push("title:doi_transcription");
    } else {
      title = UNRESOLVED;
      provenance.push("title:unresolved");
    }
  } else {
    provenance.push("title:specification");
  }

  let issuer = authored.author_or_issuer;
  if (issuer === undefined || issuer === null || issuer === UNRESOLVED) {
    const host = hostOf(authored.url);
    if (registered?.publisher) {
      issuer = registered.publisher;
      provenance.push("issuer:repository_registry");
    } else if (override?.author_or_issuer) {
      issuer = override.author_or_issuer;
      provenance.push("issuer:doi_transcription");
    } else if (host && hostIssuers[host]) {
      issuer = hostIssuers[host];
      provenance.push("issuer:registered_domain");
    } else if (!authored.url && authored.path) {
      issuer = repositoryIssuer;
      provenance.push("issuer:repository_path");
    } else {
      issuer = UNRESOLVED;
      provenance.push("issuer:unresolved");
    }
  } else {
    provenance.push("issuer:specification");
  }

  let year = authored.year;
  if (year === undefined || year === null) {
    const registeredYear = registered?.published_date
      ? Number(String(registered.published_date).slice(0, 4))
      : null;
    const derived = registeredYear
      ?? override?.year
      ?? yearFromId(authored.id)
      ?? yearFromUrl(authored.url);
    if (Number.isInteger(derived)) {
      year = derived;
      provenance.push("year:derived");
    } else {
      year = null;
      provenance.push("year:unresolved");
    }
  } else {
    provenance.push("year:specification");
  }

  const enriched = { ...authored, title, author_or_issuer: issuer, year };
  if (override?.container && enriched.container === undefined) {
    enriched.container = override.container;
  }
  enriched.bibliographic_provenance = provenance.sort();
  if (title === UNRESOLVED || issuer === UNRESOLVED || year === null) {
    enriched.bibliographic_status = UNRESOLVED;
  } else {
    delete enriched.bibliographic_status;
  }
  return enriched;
}

// Every record leaves this step with the same evidence field shape: a reference state, a
// local-evidence state, an explicit local_reference_path, an explicit
// retrieved_content_sha256, and bilingual limitations. The values are transcribed from
// evidence_contract; nothing here derives a hash, a local path, or a permission.
//
// The frozen two-state local-evidence contract is superseded here for the records that
// were never retrieved into this package: writing a retrieval-time SHA-256 for them would
// mean inventing one. The supersession, its reason, and the affected count are registered
// in evidence_contract.supersedes rather than applied silently.
function normalize(record, contract, failures) {
  const override = contract.overrides[record.id] ?? {};
  const byType = contract.by_source_type[record.source_type];
  if (!byType) {
    failures.push(`${record.id}: source_type ${record.source_type} has no evidence_contract.by_source_type entry`);
    return record;
  }

  const background = contract.background_only[record.id];
  const next = { ...record };

  next.reference_state = background ? "background_only" : "cited";
  next.local_evidence_state = override.local_evidence_state ?? byType.local_evidence_state;
  if (!contract.local_evidence_states[next.local_evidence_state]) {
    failures.push(`${record.id}: local_evidence_state ${next.local_evidence_state} is not defined in evidence_contract`);
  }
  next.limitations_zh = override.limitations_zh ?? byType.limitations_zh;
  next.limitations_en = override.limitations_en ?? byType.limitations_en;
  if (override.usage && !next.usage) next.usage = override.usage;

  // local_reference_path and retrieved_content_sha256 become explicit on every record:
  // a repository copy carries its own path, and every other state carries null.
  if (next.local_evidence_state === "repository_local_copy") {
    if (!record.path) {
      failures.push(`${record.id}: repository_local_copy requires a non-empty repository-relative path`);
      next.local_reference_path = null;
    } else {
      next.local_reference_path = record.path;
    }
  } else {
    next.local_reference_path = record.local_reference_path ?? null;
    if (next.local_reference_path !== null) {
      failures.push(`${record.id}: ${next.local_evidence_state} requires local_reference_path null`);
    }
  }

  const hash = record.retrieved_content_sha256 ?? null;
  next.retrieved_content_sha256 = hash;
  if (next.local_evidence_state === "url_only_not_cleared_with_retrieval_hash" && !hash) {
    failures.push(`${record.id}: url_only_not_cleared_with_retrieval_hash requires a retrieval-time SHA-256`);
  }
  if (next.local_evidence_state === "url_only_no_retrieval_hash" && hash) {
    failures.push(`${record.id}: url_only_no_retrieval_hash must not carry a retrieval-time SHA-256`);
  }

  if (background) {
    next.allowed_uses_zh = background.allowed_uses_zh;
    next.allowed_uses_en = background.allowed_uses_en;
    next.prohibited_inferences_zh = background.prohibited_inferences_zh;
    next.prohibited_inferences_en = background.prohibited_inferences_en;
  }

  for (const key of ["usage", "limitations_zh", "limitations_en"]) {
    if (typeof next[key] !== "string" || !next[key].trim()) {
      failures.push(`${record.id}: ${key} must be a non-empty string`);
    }
  }
  return next;
}

function main(argv) {
  const checkOnly = argv.includes("--check");
  const bibliography = readJson(BIBLIOGRAPHY);
  const current = readJson(SOURCES);
  const registryIndex = buildRegistryIndex(readJson(REPO_REGISTRY));

  const context = {
    overrides: bibliography.title_overrides.entries,
    registryIndex,
    hostIssuers: bibliography.host_issuers.map,
    repositoryIssuer: bibliography.repository_issuer.value,
  };

  const existing = Array.isArray(current.sources) ? current.sources : [];
  const byId = new Map(existing.map((record) => [record.id, record]));
  const observed = existing.length;

  const additions = [
    ...bibliography.additions.contextual,
    ...bibliography.additions.primary_public,
    ...bibliography.additions.meteorological,
  ];

  const failures = [];
  const added = [];
  for (const addition of additions) {
    if (byId.has(addition.id)) continue;
    byId.set(addition.id, addition);
    added.push(addition.id);
  }

  // The count contract is fixed against a 27-record checkpoint. If the file was changed
  // by anything other than this migration the target recomputes and the drift is
  // reported rather than absorbed.
  const contract = bibliography.count_contract;
  const alreadyMigrated = added.length === 0;
  const baseline = alreadyMigrated ? contract.closed_final_total - contract.additions : observed;
  const expectedTotal = baseline + contract.additions;
  if (baseline !== contract.observed_at_checkpoint) {
    failures.push(
      `sources.json held ${baseline} records before migration, not the ${contract.observed_at_checkpoint} `
      + `fixed at the checkpoint; the target recomputes to ${expectedTotal}`,
    );
  }

  const merged = Array.from(byId.values())
    .map((record) => enrich(record, context))
    .map((record) => normalize(record, bibliography.evidence_contract, failures));
  if (merged.length !== expectedTotal) {
    failures.push(`expected ${expectedTotal} records after migration, produced ${merged.length}`);
  }
  if (merged.length !== contract.closed_final_total && failures.length === 0) {
    failures.push(`closed final total is ${contract.closed_final_total}, produced ${merged.length}`);
  }

  const next = { ...current, sources: merged };
  const serialized = `${JSON.stringify(next, null, 2)}\n`;
  const changed = serialized !== fs.readFileSync(SOURCES, "utf8");
  if (changed && !checkOnly && failures.length === 0) {
    fs.writeFileSync(SOURCES, serialized, "utf8");
  }

  const unresolved = merged
    .filter((record) => record.bibliographic_status === UNRESOLVED)
    .map((record) => record.id)
    .sort();

  const report = {
    status: failures.length === 0 ? "PASS" : "FAIL",
    exit_code: failures.length === 0 ? (checkOnly && changed ? 1 : 0) : 1,
    mode: checkOnly ? "check" : "write",
    changed,
    records_before: observed,
    records_after: merged.length,
    closed_final_total: contract.closed_final_total,
    added_ids: added.sort(),
    unresolved_bibliography: unresolved,
    unresolved_count: unresolved.length,
    background_only_ids: merged.filter((r) => r.reference_state === "background_only").map((r) => r.id).sort(),
    local_evidence_state_counts: merged.reduce((acc, r) => {
      acc[r.local_evidence_state] = (acc[r.local_evidence_state] ?? 0) + 1;
      return acc;
    }, {}),
    failures,
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  return report.exit_code;
}

if (require.main === module) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    process.stdout.write(`${JSON.stringify({
      status: "FAIL",
      exit_code: 2,
      error_type: "build_error",
      error: error instanceof Error ? error.message : String(error),
    }, null, 2)}\n`);
    process.exitCode = 2;
  }
}

module.exports = { enrich, yearFromUrl, yearFromId };
