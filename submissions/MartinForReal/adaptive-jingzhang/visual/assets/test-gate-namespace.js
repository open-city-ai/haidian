#!/usr/bin/env node
"use strict";

// Are the four gate namespaces still four, and can a reader of the PDFs actually see the
// seven that a human has to adjudicate?
//
// A package like this accumulates gate-shaped things: seven design gates a person judges,
// four machine self-check identifiers, seventeen external-evidence dependencies, and one
// user-authorization event. The failure mode is not that one of them is wrong; it is that
// they quietly merge, so that a green self-check starts reading as "Safety passed" and a
// registered D row starts reading as "authorized". This test keeps them apart, and it
// keeps the seven human gates legible: it pins their ids, order, and bilingual names as
// literals here rather than importing them, so renaming them in the registry renames
// nothing in the expectation, and it re-extracts them from every published PDF rather
// than trusting the build report that claims to have drawn them.
//
// The D back-references get the same treatment. The registry publishes a list of the
// places inside the package that cite each gate; this test recomputes that list from the
// six registries and compares it literally, so the list cannot drift into decoration.
//
// Read-only. Usage: node test-gate-namespace.js

const contract = require("./key-area-contract.js");

const { readJson, readText, exists, pdfDocument, harness, cli } = contract;

const REGISTRY = "visual/assets/gate-registry.json";
const DRAWINGS_BUILDER = "visual/assets/build-drawings.js";

// The seven human-adjudicated gates, transcribed independently. The English failing clause
// is the frozen specification's own wording; the Chinese name is the published label. If
// the registry ever disagrees with any cell below, one of the two has been edited without
// the other and the disagreement is the finding.
const HUMAN_GATES = [
  {
    id: "G1",
    name_zh: "安全",
    name_en: "Safety",
    fails_if_en:
      "it introduces a foreseeable hazard to any person on foot, on a cycle, using a mobility aid, working on site, or responding to an emergency, without a mitigation that is in place before the pilot begins",
  },
  {
    id: "G2",
    name_zh: "权利",
    name_en: "Rights",
    fails_if_en:
      "it curtails an existing lawful right of access, use, tenure, livelihood, or assembly, or asserts a right the participant does not hold",
  },
  {
    id: "G3",
    name_zh: "遗产",
    name_en: "Heritage",
    fails_if_en:
      "it alters, obscures, encroaches upon, or pre-empts a decision about heritage fabric, heritage setting, or heritage interpretation without the responsible authority's determination",
  },
  {
    id: "G4",
    name_zh: "可负担",
    name_en: "Affordability",
    fails_if_en:
      "it raises the cost of daily life for existing residents, workers, or small operators, or creates displacement pressure, or transfers maintenance cost onto parties who did not consent",
  },
  {
    id: "G5",
    name_zh: "无障碍",
    name_en: "Accessibility",
    fails_if_en:
      "it fails to provide a continuous step-free route, an equivalent non-digital service path, or legible information for users with sensory or cognitive differences",
  },
  {
    id: "G6",
    name_zh: "隐私",
    name_en: "Privacy",
    fails_if_en:
      "it collects, retains, links, or exposes personal data, or enables identification or tracking, without a declared purpose, a declared retention limit, a declared steward, and an available non-participating alternative",
  },
  {
    id: "G7",
    name_zh: "人工复核",
    name_en: "Human Review",
    fails_if_en:
      "any decision above was made, ratified, or effectively determined by an automated process rather than by a named accountable human role",
  },
];

const HUMAN_GATE_HEADING_ZH = "七项不可交易门";
const HUMAN_GATE_HEADING_EN = "The seven non-tradeable gates";

const SELF_CHECK_IDS = [
  "DETERMINISTIC_VALIDATION",
  "SPATIAL_REVIEW",
  "VISUAL_PACKAGING",
  "PROFESSIONAL_EVIDENCE",
];

const EXTERNAL_GATE_IDS = Array.from({ length: 17 }, (unused, index) => `D${String(index + 1).padStart(2, "0")}`);
const AUTHORIZATION_GATE_ID = "H01";
const AUTHORIZATION_EVIDENCE_POINTER = "changelog.md#h01-批准与提交授权记录";

const NAMESPACE_METADATA_CONTRACT = {
  human_design_gate: {
    namespace: "G",
    heading_zh: HUMAN_GATE_HEADING_ZH,
    heading_en: HUMAN_GATE_HEADING_EN,
    adjudication: "human",
    checkable: false,
    order_is_canonical: true,
  },
  machine_self_check_gate: {
    namespace: "self_check",
    heading_zh: "四道自检门",
    heading_en: "The four self-check gates",
    adjudication: "machine",
  },
  human_authorization_gate: {
    namespace: "H",
    heading_zh: "人工授权门",
    heading_en: "Human authorization gate",
    adjudication: "human",
    checkable: false,
  },
  external_evidence_gate: {
    namespace: "D",
    heading_zh: "外部证据门",
    heading_en: "External evidence gates",
    adjudication: "external_professional_or_authority",
    checkable: false,
    state: "open",
  },
};

// D04 is the tenure gate, and A-TENURE-001 is the assumption that depends on it. The pair is
// named in the ledger, so it is pinned here rather than discovered.
const TENURE_GATE = "D04";
const TENURE_ASSUMPTION = "A-TENURE-001";

// Every place a named record may cite a gate. A gate id counts as cited when it is the whole
// value of a string, which is what a machine-readable field looks like; a gate id mentioned
// inside a sentence is prose and is deliberately not counted.
const BACKREFERENCE_SOURCES = [
  ["assumptions.json", (data) => (data.assumptions ?? []).map((record) => [record.id, record])],
  ["metrics.json", (data) => Object.entries(data.metrics ?? {})],
  ["standard_matrix.json", (data) => (data.standards ?? []).map((record) => [record.standard_id, record])],
  ["sources.json", (data) => (data.sources ?? []).map((record) => [record.id, record])],
  ["visual/assets/action-governance.json", (data) => (data.actions ?? []).map((record) => [record.id, record])],
  ["visual/assets/key-area-design.json", (data) => (data.areas ?? []).map((record) => [record.area_id, record])],
];

const PDFS = [
  { path: "drawings/a0-boards.pdf", language: "zh", pages: 4 },
  { path: "drawings/a0-boards.en.pdf", language: "en", pages: 4 },
  { path: "drawings/a3-booklet.pdf", language: "zh", pages: 16 },
  { path: "drawings/a3-booklet.en.pdf", language: "en", pages: 16 },
];

const DOCUMENT_TITLE_ZH = "京张应变：分歧图谱与可逆城市";
const DOCUMENT_TITLE_EN = "Adaptive Jing-Zhang: Disagreement Atlas and Reversible City";

// Human surfaces where a gate must never become a tickable item. The rule is about the
// subject of a checkbox, not about the word: a ledger line may legitimately say that some
// merged item was replaced by the independent gates D06-D11, and that sentence is a record
// of what was deleted, not a claim that those gates passed. What must never happen is a
// checkbox whose own subject is a gate.
const CHECKBOX_SURFACES = [
  "proposal.md",
  "proposal.en.md",
  "changelog.md",
  "report/proposal.html",
  "report/proposal.en.html",
  "visual/index.html",
  "visual/index.en.html",
];

// The ledger publishes the seventeen external gates as a table. Every row must be there and
// no row may carry a checkbox, which is the form the "open and checkbox-free" promise takes
// on the one surface that does use checkboxes for other things.
const GATE_TABLE_SURFACE = "changelog.md";

const CHECKBOX_SUBJECT = /^\s*(?:[-*]|\d+\.)\s*\[[ xX]\]\s*`?([A-Za-z][A-Za-z0-9_-]*)`?/;
const GATE_SUBJECT = /^(?:D(?:0[1-9]|1[0-7])|G[1-7])$/;
const CHECKBOX_ANYWHERE = /\[[ xX]\]/;
const EXTERNAL_GATE_EXACT = /^D(?:0[1-9]|1[0-7])$/;

function collectGateValues(node, found) {
  if (typeof node === "string") {
    if (EXTERNAL_GATE_EXACT.test(node)) found.add(node);
    return found;
  }
  if (Array.isArray(node)) {
    for (const item of node) collectGateValues(item, found);
    return found;
  }
  if (node && typeof node === "object") {
    for (const value of Object.values(node)) collectGateValues(value, found);
    return found;
  }
  return found;
}

function computeBackreferences(fail) {
  const computed = new Map(EXTERNAL_GATE_IDS.map((id) => [id, []]));
  for (const [file, pick] of BACKREFERENCE_SOURCES) {
    if (!exists(file)) {
      fail(`${file} does not exist, so gate back-references cannot be recomputed`);
      continue;
    }
    for (const [recordId, record] of pick(readJson(file))) {
      if (typeof recordId !== "string" || !recordId) {
        fail(`${file} holds a record with no usable identifier, so its gate citations cannot be located`);
        continue;
      }
      for (const gate of collectGateValues(record, new Set())) {
        computed.get(gate).push(`${file}#${recordId}`);
      }
    }
  }
  for (const list of computed.values()) list.sort();
  return computed;
}

function namespaceMetadataFailures(registry) {
  const failures = [];
  for (const [section, expectedFields] of Object.entries(NAMESPACE_METADATA_CONTRACT)) {
    const actualSection = registry?.[section];
    if (!actualSection || typeof actualSection !== "object" || Array.isArray(actualSection)) {
      failures.push(`${section} must be an object carrying its namespace metadata`);
      continue;
    }
    for (const [field, expected] of Object.entries(expectedFields)) {
      const actual = actualSection[field];
      if (!Object.is(actual, expected)) {
        failures.push(`${section}.${field} is ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
      }
    }
  }
  return failures;
}

function run() {
  return harness(
    "KA-GATE",
    "the four gate namespaces stay separate, the seven human gates are published verbatim and extractable from every PDF, and every D back-reference is recomputed rather than asserted",
    (fail) => {
      if (!exists(REGISTRY)) return fail(`${REGISTRY} does not exist; the package publishes no gate namespace authority`);
      const registry = readJson(REGISTRY);
      for (const problem of namespaceMetadataFailures(registry)) fail(problem);

      const namespaceMetadataMutations = [];
      for (const [section, expectedFields] of Object.entries(NAMESPACE_METADATA_CONTRACT)) {
        for (const [field, expected] of Object.entries(expectedFields)) {
          const mutantValue = typeof expected === "boolean" ? !expected : `${expected}__MUTATED`;
          const mutant = {
            ...registry,
            [section]: { ...registry[section], [field]: mutantValue },
          };
          const label = `${section}.${field}`;
          const caught = namespaceMetadataFailures(mutant).some((problem) => problem.startsWith(`${label} `));
          if (!caught) fail(`namespace metadata validator did not catch mutation at ${label}`);
          namespaceMetadataMutations.push(label);
        }
      }

      // ---- the seven human gates -------------------------------------------------
      const human = registry.human_design_gate;
      if (!human || !Array.isArray(human.gates)) {
        return fail(`${REGISTRY} publishes no human_design_gate.gates list`);
      }
      if (human.namespace !== "G") fail(`human_design_gate.namespace is ${JSON.stringify(human.namespace)}, expected "G"`);
      if (human.adjudication !== "human") {
        fail(`human_design_gate.adjudication is ${JSON.stringify(human.adjudication)}, expected "human"`);
      }
      if (human.checkable !== false) fail("human_design_gate.checkable must be false; these gates are adjudicated, not ticked");
      if (human.order_is_canonical !== true) fail("human_design_gate.order_is_canonical must be true");
      if (human.heading_zh !== HUMAN_GATE_HEADING_ZH) {
        fail(`human_design_gate.heading_zh is ${JSON.stringify(human.heading_zh)}, expected ${JSON.stringify(HUMAN_GATE_HEADING_ZH)}`);
      }
      if (human.heading_en !== HUMAN_GATE_HEADING_EN) {
        fail(`human_design_gate.heading_en is ${JSON.stringify(human.heading_en)}, expected ${JSON.stringify(HUMAN_GATE_HEADING_EN)}`);
      }
      for (const field of ["semantics_provenance_zh", "semantics_provenance_en", "applies_to_zh", "applies_to_en"]) {
        if (typeof human[field] !== "string" || !human[field].trim()) {
          fail(`human_design_gate.${field} must be a non-empty string`);
        }
      }

      const publishedOrder = human.gates.map((gate) => gate.id).join(",");
      const expectedOrder = HUMAN_GATES.map((gate) => gate.id).join(",");
      if (publishedOrder !== expectedOrder) {
        fail(`human_design_gate.gates order is ${publishedOrder}, expected ${expectedOrder}`);
      }
      const publishedGates = new Map(human.gates.map((gate) => [gate.id, gate]));
      for (const expectedGate of HUMAN_GATES) {
        const gate = publishedGates.get(expectedGate.id);
        if (!gate) {
          fail(`${expectedGate.id} is missing from human_design_gate.gates`);
          continue;
        }
        for (const field of ["name_zh", "name_en", "fails_if_en"]) {
          if (gate[field] !== expectedGate[field]) {
            fail(`${expectedGate.id}.${field} is ${JSON.stringify(gate[field])}, expected ${JSON.stringify(expectedGate[field])}`);
          }
        }
        if (typeof gate.fails_if_zh !== "string" || !gate.fails_if_zh.trim()) {
          fail(`${expectedGate.id}.fails_if_zh must be a non-empty string`);
        }
        for (const banned of ["checked", "checkbox", "- [ ]", "- [x]"]) {
          if (JSON.stringify(gate).includes(banned)) fail(`${expectedGate.id} carries checkbox language ${JSON.stringify(banned)}`);
        }
      }

      // ---- namespace separation --------------------------------------------------
      const selfCheck = registry.machine_self_check_gate;
      if (!selfCheck || !Array.isArray(selfCheck.ids)) {
        fail(`${REGISTRY} publishes no machine_self_check_gate.ids list`);
      } else if (selfCheck.ids.join(",") !== SELF_CHECK_IDS.join(",")) {
        fail(`machine_self_check_gate.ids is ${selfCheck.ids.join(",")}, expected ${SELF_CHECK_IDS.join(",")}`);
      }
      const authorization = registry.human_authorization_gate;
      const authorizationGates = authorization && Array.isArray(authorization.gates) ? authorization.gates : [];
  if (authorizationGates.length !== 1 || authorizationGates[0].id !== AUTHORIZATION_GATE_ID) {
    fail(`human_authorization_gate must publish exactly ${AUTHORIZATION_GATE_ID}`);
  } else {
    if (authorizationGates[0].state !== "closed") {
      fail(`${AUTHORIZATION_GATE_ID}.state is ${JSON.stringify(authorizationGates[0].state)}, expected "closed"`);
    }
    if (authorizationGates[0].evidence_pointer !== AUTHORIZATION_EVIDENCE_POINTER) {
      fail(`${AUTHORIZATION_GATE_ID}.evidence_pointer is ${JSON.stringify(authorizationGates[0].evidence_pointer)}, expected ${JSON.stringify(AUTHORIZATION_EVIDENCE_POINTER)}`);
    }
    const changelog = readText("changelog.md");
    if (!changelog.includes("### H01 批准与提交授权记录")) {
      fail(`${AUTHORIZATION_EVIDENCE_POINTER} does not resolve to the recorded H01 approval heading`);
    }
    if (authorization.checkable !== false) fail("human_authorization_gate.checkable must be false");
  }
      for (const field of ["namespace_separation_zh", "namespace_separation_en"]) {
        if (typeof registry[field] !== "string" || !registry[field].trim()) {
          fail(`${REGISTRY}.${field} must be a non-empty string`);
        }
      }

      const namespaces = [
        ["human_design_gate", HUMAN_GATES.map((gate) => gate.id)],
        ["machine_self_check_gate", SELF_CHECK_IDS],
        ["external_evidence_gate", EXTERNAL_GATE_IDS],
        ["human_authorization_gate", [AUTHORIZATION_GATE_ID]],
      ];
      for (let left = 0; left < namespaces.length; left += 1) {
        for (let right = left + 1; right < namespaces.length; right += 1) {
          const overlap = namespaces[left][1].filter((id) => namespaces[right][1].includes(id));
          if (overlap.length > 0) {
            fail(`${namespaces[left][0]} and ${namespaces[right][0]} share the identifiers ${overlap.join(",")}`);
          }
        }
      }

      // ---- the seventeen external evidence gates ---------------------------------
      const external = registry.external_evidence_gate;
      if (!external || !Array.isArray(external.gates)) {
        return fail(`${REGISTRY} publishes no external_evidence_gate.gates list`);
      }
      if (external.checkable !== false) fail("external_evidence_gate.checkable must be false");
      if (external.state !== "open") fail(`external_evidence_gate.state is ${JSON.stringify(external.state)}, expected "open"`);
      const externalOrder = external.gates.map((gate) => gate.id).join(",");
      if (externalOrder !== EXTERNAL_GATE_IDS.join(",")) {
        fail(`external_evidence_gate.gates order is ${externalOrder}, expected ${EXTERNAL_GATE_IDS.join(",")}`);
      }
      for (const gate of external.gates) {
        if (gate.checkable !== false) fail(`${gate.id}.checkable must be false`);
        if (gate.state !== "open") fail(`${gate.id}.state is ${JSON.stringify(gate.state)}, expected "open"`);
      }

      // ---- back-references, recomputed -------------------------------------------
      const computed = computeBackreferences(fail);
      let backreferenceCount = 0;
      for (const gate of external.gates) {
        const published = Array.isArray(gate.backreferences) ? gate.backreferences : null;
        if (!published) {
          fail(`${gate.id} publishes no backreferences array`);
          continue;
        }
        backreferenceCount += published.length;
        const expectedList = computed.get(gate.id) ?? [];
        if (published.join("|") !== expectedList.join("|")) {
          const missing = expectedList.filter((entry) => !published.includes(entry));
          const extra = published.filter((entry) => !expectedList.includes(entry));
          fail(
            `${gate.id} backreferences do not match the registries: missing ${JSON.stringify(missing)}, extra ${JSON.stringify(extra)}`,
          );
        }
        if (new Set(published).size !== published.length) fail(`${gate.id} backreferences repeat an entry`);
      }
      for (const field of [
        "backreference_rule_zh",
        "backreference_rule_en",
        "backreference_is_not_evidence_zh",
        "backreference_is_not_evidence_en",
      ]) {
        if (typeof external[field] !== "string" || !external[field].trim()) {
          fail(`external_evidence_gate.${field} must be a non-empty string`);
        }
      }

      // The tenure pair is named in the ledger, so both halves have to exist and agree.
      const tenureGate = external.gates.find((gate) => gate.id === TENURE_GATE);
      const tenureEntry = `assumptions.json#${TENURE_ASSUMPTION}`;
      if (tenureGate && !(tenureGate.backreferences ?? []).includes(tenureEntry)) {
        fail(`${TENURE_GATE} does not back-reference ${tenureEntry}`);
      }
      if (exists("assumptions.json")) {
        const assumption = (readJson("assumptions.json").assumptions ?? []).find((record) => record.id === TENURE_ASSUMPTION);
        if (!assumption) {
          fail(`assumptions.json holds no ${TENURE_ASSUMPTION} record for ${TENURE_GATE}`);
        } else if (!collectGateValues(assumption, new Set()).has(TENURE_GATE)) {
          fail(`${TENURE_ASSUMPTION} does not cite ${TENURE_GATE} in a machine-readable field`);
        }
      }

      // ---- no gate becomes a tickable item on a human surface --------------------
      for (const surface of CHECKBOX_SURFACES) {
        if (!exists(surface)) {
          fail(`${surface} does not exist`);
          continue;
        }
        readText(surface)
          .split("\n")
          .forEach((line, index) => {
            const subject = line.match(CHECKBOX_SUBJECT);
            if (subject && GATE_SUBJECT.test(subject[1])) {
              fail(`${surface}:${index + 1} makes ${subject[1]} a tickable item: ${line.trim()}`);
            }
          });
      }

      // The ledger's D table is the surface where the promise is most easily broken, so the
      // seventeen rows are located individually and checked for checkbox syntax.
      if (exists(GATE_TABLE_SURFACE)) {
        const ledger = readText(GATE_TABLE_SURFACE).split("\n");
        for (const gateId of EXTERNAL_GATE_IDS) {
          const rowStart = `| \`${gateId}\` |`;
          const rows = ledger.filter((line) => line.startsWith(rowStart));
          if (rows.length !== 1) {
            fail(`${GATE_TABLE_SURFACE} publishes ${rows.length} table rows for ${gateId}, expected exactly 1`);
            continue;
          }
          if (CHECKBOX_ANYWHERE.test(rows[0])) fail(`${GATE_TABLE_SURFACE} gives ${gateId} a checkbox in its table row`);
        }
      }

      // ---- the drawings take their gate wording from the registry ----------------
      if (!exists(DRAWINGS_BUILDER)) {
        fail(`${DRAWINGS_BUILDER} does not exist`);
      } else if (!readText(DRAWINGS_BUILDER).includes("gate-registry.json")) {
        fail(`${DRAWINGS_BUILDER} does not read gate-registry.json, so the drawn gate list has a second authority`);
      }

      // ---- every PDF actually shows the seven gates ------------------------------
      const pdfDetail = {};
      for (const document of PDFS) {
        if (!exists(document.path)) {
          fail(`${document.path} does not exist`);
          continue;
        }
        const parsed = pdfDocument(document.path);
        if (parsed.pages !== document.pages) {
          fail(`${document.path} has ${parsed.pages} pages, expected ${document.pages}`);
        }
        if (parsed.media_boxes.length !== 1) {
          fail(`${document.path} mixes ${parsed.media_boxes.length} media boxes; every sheet must share one`);
        }
        if (parsed.font_file2 < 1) fail(`${document.path} embeds no font program`);
        if (parsed.to_unicode < 1) fail(`${document.path} carries no ToUnicode map, so its text cannot be extracted`);
        if (parsed.cmap_conflicts.length > 0) {
          fail(`${document.path} has conflicting ToUnicode entries: ${parsed.cmap_conflicts.join("; ")}`);
        }
        if (parsed.unmapped_glyphs.length > 0) {
          fail(`${document.path} shows ${parsed.unmapped_glyphs.length} glyphs that no ToUnicode map covers`);
        }

        const title = document.language === "zh" ? DOCUMENT_TITLE_ZH : DOCUMENT_TITLE_EN;
        if (!parsed.text.includes(title)) {
          fail(`${document.path} does not carry the canonical ${document.language} title ${JSON.stringify(title)}`);
        }
        const heading = document.language === "zh" ? HUMAN_GATE_HEADING_ZH : HUMAN_GATE_HEADING_EN;
        if (!parsed.text.includes(heading)) {
          fail(`${document.path} does not carry the gate heading ${JSON.stringify(heading)}`);
        }
        const missingGates = [];
        for (const gate of HUMAN_GATES) {
          const label = document.language === "zh" ? gate.name_zh : gate.name_en;
          if (!parsed.text.includes(gate.id) || !parsed.text.includes(label)) missingGates.push(gate.id);
        }
        if (missingGates.length > 0) {
          fail(`${document.path} does not publish the gates ${missingGates.join(",")} in extractable text`);
        }
        pdfDetail[document.path] = { pages: parsed.pages, runs: parsed.runs, characters: parsed.text.length };
      }

      return {
        human_gates: HUMAN_GATES.length,
        self_check_ids: SELF_CHECK_IDS.length,
        external_gates: EXTERNAL_GATE_IDS.length,
        namespace_metadata_mutations_caught: namespaceMetadataMutations,
        backreferences: backreferenceCount,
        pdfs: pdfDetail,
      };
    },
  );
}

if (require.main === module) cli(run());

module.exports = { run };
