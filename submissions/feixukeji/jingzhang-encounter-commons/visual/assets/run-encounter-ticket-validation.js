#!/usr/bin/env node
"use strict";

// Deterministic, offline Encounter Ticket contract replay.
// This is deliberately NOT a complete JSON Schema Draft 2020-12 implementation.
// It fail-closes on schema keywords outside the explicitly supported subset below,
// then adds project-specific chronology, data-minimisation, authorisation, rights,
// and scenario-inventory checks. Synthetic replay is not field-performance evidence.

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const assetDir = __dirname;
const inputNames = {
  ticket_schema: "encounter-ticket.schema.json",
  fixture_schema: "encounter-ticket.fixture.schema.json",
  positive_fixture: "encounter-ticket.example.json",
  expected_invalid: "encounter-ticket.expected-invalid.json",
  scenario_inventory: "encounter-ticket.scenarios.json",
  site_baseline: "site-baseline-audit.json"
};

const SUPPORTED_SCHEMA_KEYWORDS = new Set([
  "$schema", "$id", "$ref", "$defs", "title", "description",
  "type", "additionalProperties", "required", "properties",
  "const", "enum", "pattern", "format", "minimum", "maximum",
  "minLength", "minItems", "maxItems", "uniqueItems", "items",
  "anyOf", "allOf", "if", "then", "else"
]);
const ANNOTATION_KEYWORDS = new Set(["$schema", "$id", "title", "description"]);
const TICKET_SCHEMA_ID = "https://open-city.ai/schemas/jingzhang-encounter-ticket-0.2.json";
const REQUIRED_GROUPS = [
  "task", "access_and_exit", "space_time_capacity", "minimum_data",
  "human_host", "resources", "public_output", "review_decision"
];
const FIELD_WHITELIST = new Set([
  "task_role", "language_preference", "access_feature_requested", "time_slot"
]);
const PROHIBITED_FIELDS = new Set([
  "face", "contact_list", "precise_trajectory", "emotion", "health_record",
  "relationship_graph", "personal_score"
]);
const SPATIAL_BOOLEAN_KEYS = [
  "public_path", "separation", "duty_holder", "physical_stop",
  "ai_off_bypass", "restoration"
];
const SPATIAL_ROLE_SLOTS = [
  "authorised_venue_operator_acceptance",
  "named_test_lead_and_physical_stop",
  "access_and_safety_reviewer",
  "setup_and_restoration_steward"
];
const SPATIAL_COMPONENTS = [
  { component: "public_problem_threshold", count: 1 },
  { component: "controlled_test_bay", count: 3 },
  { component: "physical_emergency_stop", count: 1 },
  { component: "clear_ai_off_bypass_exit", count: 1 },
  { component: "strike_and_restoration_checklist", count: 1 }
];
const SPATIAL_CASES = [
  { case_id: "SPATIAL-PASS-01", public_path: true, separation: true, duty_holder: true, physical_stop: true, ai_off_bypass: true, restoration: true, expected: "pass" },
  { case_id: "SPATIAL-REJECT-NO-SEPARATION", public_path: true, separation: false, duty_holder: true, physical_stop: true, ai_off_bypass: true, restoration: true, expected: "reject" },
  { case_id: "SPATIAL-REJECT-NO-DUTY-HOLDER", public_path: true, separation: true, duty_holder: false, physical_stop: true, ai_off_bypass: true, restoration: true, expected: "reject" },
  { case_id: "SPATIAL-REJECT-BLOCKED-BYPASS", public_path: true, separation: true, duty_holder: true, physical_stop: true, ai_off_bypass: false, restoration: true, expected: "reject" },
  { case_id: "SPATIAL-REJECT-NO-RESTORATION", public_path: true, separation: true, duty_holder: true, physical_stop: true, ai_off_bypass: true, restoration: false, expected: "reject" }
];
const FIELD_RELEASE_BLOCKED = "blocked_pending_authorised_operator_site_walk_and_professional_review";

function readInput(name) {
  const filePath = path.join(assetDir, name);
  const bytes = fs.readFileSync(filePath);
  return {
    path: name,
    sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
    value: JSON.parse(bytes.toString("utf8"))
  };
}

function jsonType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (Number.isInteger(value)) return "integer";
  return typeof value;
}

function deepEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function addIssue(issues, code, at, message) {
  issues.push({ code, path: at, message });
}

function resolvePointer(document, pointer) {
  if (pointer === "#") return document;
  if (!pointer.startsWith("#/")) throw new Error(`unsupported local reference: ${pointer}`);
  return pointer.slice(2).split("/").reduce((node, rawToken) => {
    const token = rawToken.replace(/~1/g, "/").replace(/~0/g, "~");
    if (node === null || typeof node !== "object" || !Object.prototype.hasOwnProperty.call(node, token)) {
      throw new Error(`unresolved local reference: ${pointer}`);
    }
    return node[token];
  }, document);
}

function rfc3339(value) {
  if (typeof value !== "string") return false;
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-](\d{2}):(\d{2}))$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const offsetHour = match[7] === undefined ? 0 : Number(match[7]);
  const offsetMinute = match[8] === undefined ? 0 : Number(match[8]);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const monthDays = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return month >= 1 && month <= 12 && day >= 1 && day <= monthDays[month - 1]
    && hour <= 23 && minute <= 59 && second <= 59
    && offsetHour <= 23 && offsetMinute <= 59
    && Number.isFinite(Date.parse(value));
}

function scanSchemaKeywords(node, at, errors) {
  if (typeof node === "boolean") return;
  if (node === null || typeof node !== "object" || Array.isArray(node)) {
    errors.push(`${at}: schema node must be an object or boolean`);
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (!SUPPORTED_SCHEMA_KEYWORDS.has(key)) {
      errors.push(`${at}: unsupported schema keyword ${key}`);
      continue;
    }
    if (key === "format" && value !== "date-time") {
      errors.push(`${at}.format: unsupported format ${JSON.stringify(value)}`);
    } else if (key === "$ref") {
      if (typeof value !== "string") errors.push(`${at}.$ref: must be a string`);
      else if (!value.startsWith("#/") && value !== TICKET_SCHEMA_ID) {
        errors.push(`${at}.$ref: unsupported reference ${value}`);
      }
    } else if (key === "type") {
      const types = Array.isArray(value) ? value : [value];
      const allowedTypes = new Set(["null", "boolean", "object", "array", "number", "integer", "string"]);
      if (!types.length || types.some((type) => !allowedTypes.has(type))) {
        errors.push(`${at}.type: unsupported type declaration ${JSON.stringify(value)}`);
      }
    } else if (key === "properties" || key === "$defs") {
      if (value === null || typeof value !== "object" || Array.isArray(value)) {
        errors.push(`${at}.${key}: must be an object`);
      } else {
        for (const [childName, childSchema] of Object.entries(value)) {
          scanSchemaKeywords(childSchema, `${at}.${key}.${childName}`, errors);
        }
      }
    } else if (key === "additionalProperties") {
      if (typeof value !== "boolean") {
        errors.push(`${at}.additionalProperties: schema-valued additionalProperties is outside this runner's subset`);
      }
    } else if (["items", "if", "then", "else"].includes(key)) {
      if (typeof value === "boolean" || (value && typeof value === "object" && !Array.isArray(value))) {
        scanSchemaKeywords(value, `${at}.${key}`, errors);
      } else {
        errors.push(`${at}.${key}: unsupported schema form`);
      }
    } else if (["anyOf", "allOf"].includes(key)) {
      if (!Array.isArray(value)) errors.push(`${at}.${key}: must be an array`);
      else value.forEach((child, index) => scanSchemaKeywords(child, `${at}.${key}[${index}]`, errors));
    }
  }
}

function validateSchema(node, value, context, at = "$", issues = []) {
  if (node === true) return issues;
  if (node === false) {
    addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, "false schema rejects every value");
    return issues;
  }

  if (node.$ref) {
    if (node.$ref.startsWith("#")) {
      validateSchema(resolvePointer(context.rootSchema, node.$ref), value, context, at, issues);
    } else if (node.$ref === context.ticketSchema.$id) {
      validateSchema(context.ticketSchema, value, { ...context, rootSchema: context.ticketSchema }, at, issues);
    } else {
      addIssue(issues, "SCHEMA_REFERENCE_UNRESOLVED", at, `unsupported reference ${node.$ref}`);
    }
  }

  const actualType = jsonType(value);
  const expectedTypes = node.type === undefined ? [] : (Array.isArray(node.type) ? node.type : [node.type]);
  if (expectedTypes.length) {
    const typeMatch = expectedTypes.some((expected) => expected === actualType
      || (expected === "number" && (actualType === "integer" || actualType === "number")));
    if (!typeMatch) {
      addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, `expected ${expectedTypes.join("|")}, got ${actualType}`);
      return issues;
    }
  }

  if (Object.prototype.hasOwnProperty.call(node, "const") && !deepEqual(value, node.const)) {
    addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, "const mismatch");
  }
  if (node.enum && !node.enum.some((candidate) => deepEqual(candidate, value))) {
    addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, "enum mismatch");
  }

  if (typeof value === "string") {
    if (node.minLength !== undefined && value.length < node.minLength) {
      addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, `minLength ${node.minLength} not met`);
    }
    if (node.pattern !== undefined && !(new RegExp(node.pattern).test(value))) {
      addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, "pattern mismatch");
    }
    if (node.format === "date-time" && !rfc3339(value)) {
      addIssue(issues, "INVALID_DATE_FORMAT", at, "not a valid RFC 3339 date-time in the supported profile");
    }
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    if (node.minimum !== undefined && value < node.minimum) {
      addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, `minimum ${node.minimum} not met`);
    }
    if (node.maximum !== undefined && value > node.maximum) {
      addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, `maximum ${node.maximum} exceeded`);
    }
  }

  if (Array.isArray(value)) {
    if (node.minItems !== undefined && value.length < node.minItems) {
      addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, `minItems ${node.minItems} not met`);
    }
    if (node.maxItems !== undefined && value.length > node.maxItems) {
      addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, `maxItems ${node.maxItems} exceeded`);
    }
    if (node.uniqueItems && new Set(value.map((item) => JSON.stringify(item))).size !== value.length) {
      addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, "uniqueItems not met");
    }
    if (node.items !== undefined) {
      value.forEach((item, index) => validateSchema(node.items, item, context, `${at}[${index}]`, issues));
    }
  }

  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const required of node.required || []) {
      if (!Object.prototype.hasOwnProperty.call(value, required)) {
        addIssue(issues, "SCHEMA_VALIDATION_ERROR", `${at}.${required}`, "required property missing");
      }
    }
    if (node.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(node.properties || {}, key)) {
          addIssue(issues, "SCHEMA_VALIDATION_ERROR", `${at}.${key}`, "additional property forbidden");
        }
      }
    }
    for (const [key, childSchema] of Object.entries(node.properties || {})) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        validateSchema(childSchema, value[key], context, `${at}.${key}`, issues);
      }
    }
  }

  if (node.anyOf) {
    const passes = node.anyOf.filter((candidate) => {
      const branchIssues = [];
      validateSchema(candidate, value, context, at, branchIssues);
      return branchIssues.length === 0;
    }).length;
    if (passes === 0) addIssue(issues, "SCHEMA_VALIDATION_ERROR", at, "no anyOf branch matched");
  }
  if (node.allOf) {
    node.allOf.forEach((candidate) => validateSchema(candidate, value, context, at, issues));
  }
  if (node.if) {
    const conditionIssues = [];
    validateSchema(node.if, value, context, at, conditionIssues);
    if (conditionIssues.length === 0 && node.then) validateSchema(node.then, value, context, at, issues);
    if (conditionIssues.length > 0 && node.else) validateSchema(node.else, value, context, at, issues);
  }
  return issues;
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function sameSet(values, expected) {
  return Array.isArray(values) && values.length === expected.size
    && new Set(values).size === values.length && values.every((value) => expected.has(value));
}

function validateTicketSemantics(ticket, issues) {
  const task = ticket.task || {};
  const slot = ticket.space_time_capacity || {};
  const data = ticket.minimum_data || {};
  const host = ticket.human_host || {};
  const access = ticket.access_and_exit || {};
  const output = ticket.public_output || {};
  const review = ticket.review_decision || {};

  const chronology = [
    [task.issued_at, task.expires_at, "$.task", "ticket expiry must follow issue time"],
    [slot.starts_at, slot.ends_at, "$.space_time_capacity", "slot end must follow slot start"],
    [task.issued_at, slot.starts_at, "$.space_time_capacity.starts_at", "slot start must not precede ticket issue"],
    [slot.ends_at, task.expires_at, "$.task.expires_at", "ticket must not expire before slot end"],
    [task.issued_at, data.delete_by, "$.minimum_data.delete_by", "delete-by must follow ticket issue"],
    [slot.ends_at, data.delete_by, "$.minimum_data.delete_by", "delete-by must follow slot end"],
    [task.expires_at, review.review_due, "$.review_decision.review_due", "review must follow ticket expiry"],
    [slot.ends_at, review.review_due, "$.review_decision.review_due", "review must follow slot end"]
  ];
  for (const [earlier, later, at, message] of chronology) {
    if (rfc3339(earlier) && rfc3339(later) && Date.parse(earlier) >= Date.parse(later)) {
      addIssue(issues, "TIME_ORDER_INVALID", at, message);
    }
  }
  const performance = review.performance_results;
  if (performance && rfc3339(performance.window_start) && rfc3339(performance.window_end)
    && Date.parse(performance.window_start) >= Date.parse(performance.window_end)) {
    addIssue(issues, "TIME_ORDER_INVALID", "$.review_decision.performance_results", "performance window end must follow start");
  }

  const selectedNames = Array.isArray(data.fields) ? data.fields.map((field) => field && field.name) : [];
  if (new Set(selectedNames).size !== selectedNames.length) {
    addIssue(issues, "MINIMUM_DATA_FIELD_DUPLICATED", "$.minimum_data.fields", "field names must be unique");
  }
  for (let index = 0; index < selectedNames.length; index += 1) {
    const name = selectedNames[index];
    if (!FIELD_WHITELIST.has(name)) {
      addIssue(issues, "MINIMUM_DATA_FIELD_NOT_WHITELISTED", `$.minimum_data.fields[${index}].name`, `${name} is not whitelisted`);
    }
    if (PROHIBITED_FIELDS.has(name)) {
      addIssue(issues, "PROHIBITED_FIELD_SELECTED", `$.minimum_data.fields[${index}].name`, `${name} is prohibited`);
    }
  }
  if (!sameSet(data.prohibited_fields, PROHIBITED_FIELDS)) {
    addIssue(issues, "PROHIBITED_SET_INCOMPLETE", "$.minimum_data.prohibited_fields", "the exact seven-field prohibited set is required");
  }
  if (selectedNames.length === 0 && data.legal_basis_status !== "not_required") {
    addIssue(issues, "LEGAL_BASIS_STATE_INVALID", "$.minimum_data.legal_basis_status", "zero selected fields requires not_required");
  }
  if (selectedNames.length > 0 && data.legal_basis_status === "not_required") {
    addIssue(issues, "LEGAL_BASIS_STATE_INVALID", "$.minimum_data.legal_basis_status", "selected fields cannot use not_required");
  }
  if (data.legal_basis_status === "confirmed" && !nonEmptyString(data.legal_basis_ref)) {
    addIssue(issues, "LEGAL_BASIS_REFERENCE_REQUIRED", "$.minimum_data.legal_basis_ref", "confirmed legal basis requires a reference");
  }

  const routeRequirements = [
    [access.non_ai_equivalent, "$.access_and_exit.non_ai_equivalent"],
    [access.accessibility_route, "$.access_and_exit.accessibility_route"],
    [access.exit_route, "$.access_and_exit.exit_route"]
  ];
  for (const [route, at] of routeRequirements) {
    if (route && route.status === "verified" && !nonEmptyString(route.evidence_ref)) {
      addIssue(issues, "VERIFIED_EVIDENCE_REQUIRED", `${at}.evidence_ref`, "verified route requires evidence");
    }
  }
  if (slot.status === "verified" && !nonEmptyString(slot.capacity_evidence_ref)) {
    addIssue(issues, "VERIFIED_EVIDENCE_REQUIRED", "$.space_time_capacity.capacity_evidence_ref", "verified capacity requires evidence");
  }
  if (host.accepted === true && !nonEmptyString(host.duty_holder)) {
    addIssue(issues, "ACCEPTED_HOST_NAME_REQUIRED", "$.human_host.duty_holder", "acceptance requires a named duty holder");
  }

  if (task.authorisation_status === "authorized") {
    if (host.accepted !== true || !nonEmptyString(host.duty_holder)) {
      addIssue(issues, "AUTHORIZED_HOST_REQUIRED", "$.human_host", "authorization requires a named, accepting human duty holder");
    }
    const authorizationChecks = [
      [access.non_ai_equivalent && access.non_ai_equivalent.status === "verified", "non-AI equivalent"],
      [access.accessibility_route && access.accessibility_route.status === "verified", "accessibility route"],
      [access.exit_route && access.exit_route.status === "verified", "exit route"],
      [slot.status === "verified", "space/time/capacity"],
      [data.legal_basis_status === "confirmed", "legal basis"]
    ];
    for (const [passed, label] of authorizationChecks) {
      if (!passed) addIssue(issues, "AUTHORIZATION_PRECONDITION_UNMET", "$.task.authorisation_status", `${label} is not verified`);
    }
  }
  if (slot.status === "verified" && (task.authorisation_status !== "authorized"
    || host.accepted !== true || !nonEmptyString(host.duty_holder))) {
    addIssue(issues, "VERIFIED_CAPACITY_WITHOUT_AUTHORIZATION", "$.space_time_capacity.status", "verified capacity requires authorization and host acceptance");
  }

  if (output.publication_status === "published") {
    if (!Array.isArray(output.artifact_refs) || output.artifact_refs.length === 0) {
      addIssue(issues, "PUBLISHED_ARTIFACT_REQUIRED", "$.public_output.artifact_refs", "published output requires an artifact reference");
    }
    if (!["cleared", "restricted"].includes(output.rights_status)) {
      addIssue(issues, "PUBLISHED_RIGHTS_NOT_CLEARED", "$.public_output.rights_status", "published output requires cleared or restricted rights");
    }
  }
}

function validateTicket(ticket, ticketSchema) {
  const issues = [];
  validateSchema(ticketSchema, ticket, { rootSchema: ticketSchema, ticketSchema }, "$", issues);
  validateTicketSemantics(ticket, issues);
  return issues;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function applyMutations(base, mutations) {
  const result = clone(base);
  for (const mutation of mutations) {
    if (mutation.op !== "replace" || typeof mutation.path !== "string" || !mutation.path.startsWith("/")) {
      throw new Error(`unsupported mutation ${JSON.stringify(mutation)}`);
    }
    const tokens = mutation.path.slice(1).split("/").map((token) => token.replace(/~1/g, "/").replace(/~0/g, "~"));
    const finalToken = tokens.pop();
    const parent = tokens.reduce((node, token) => {
      if (node === null || typeof node !== "object" || !Object.prototype.hasOwnProperty.call(node, token)) {
        throw new Error(`mutation path does not exist: ${mutation.path}`);
      }
      return node[token];
    }, result);
    if (parent === null || typeof parent !== "object" || !Object.prototype.hasOwnProperty.call(parent, finalToken)) {
      throw new Error(`mutation target does not exist: ${mutation.path}`);
    }
    parent[finalToken] = clone(mutation.value);
  }
  return result;
}

function pushAssertion(assertions, id, passed, detail) {
  assertions.push({ id, passed: Boolean(passed), detail });
}

function spatialDecision(testCase) {
  return SPATIAL_BOOLEAN_KEYS.every((key) => testCase[key] === true) ? "pass" : "reject";
}

function main() {
  const loaded = {};
  for (const [key, name] of Object.entries(inputNames)) loaded[key] = readInput(name);
  const ticketSchema = loaded.ticket_schema.value;
  const fixtureSchema = loaded.fixture_schema.value;
  const fixture = loaded.positive_fixture.value;
  const negatives = loaded.expected_invalid.value;
  const scenarios = loaded.scenario_inventory.value;
  const siteBaseline = loaded.site_baseline.value;
  const assertions = [];
  const fatalErrors = [];

  const schemaKeywordErrors = [];
  scanSchemaKeywords(ticketSchema, "ticket_schema", schemaKeywordErrors);
  scanSchemaKeywords(fixtureSchema, "fixture_schema", schemaKeywordErrors);
  pushAssertion(assertions, "supported_schema_keyword_subset", schemaKeywordErrors.length === 0,
    schemaKeywordErrors.length ? schemaKeywordErrors : "all schema keywords are in the runner's declared subset");

  const groupSetMatches = sameSet(ticketSchema.required, new Set(REQUIRED_GROUPS))
    && ticketSchema.type === "object" && ticketSchema.additionalProperties === false
    && REQUIRED_GROUPS.every((group) => ticketSchema.properties && ticketSchema.properties[group]
      && ticketSchema.properties[group].type === "object"
      && ticketSchema.properties[group].additionalProperties === false
      && sameSet(ticketSchema.properties[group].required,
        new Set(Object.keys(ticketSchema.properties[group].properties || {}))))
    && Array.isArray(ticketSchema.allOf) && ticketSchema.allOf.length === 10;
  pushAssertion(assertions, "eight_closed_contract_groups", groupSetMatches,
    "root and all eight required groups must be closed objects");
  pushAssertion(assertions, "draft_and_contract_identity",
    ticketSchema.$schema === "https://json-schema.org/draft/2020-12/schema"
      && ticketSchema.$id === TICKET_SCHEMA_ID,
    { draft: ticketSchema.$schema, id: ticketSchema.$id });

  const schemaWhitelist = ticketSchema.$defs && ticketSchema.$defs.minimum_data_field
    && ticketSchema.$defs.minimum_data_field.properties.name.enum;
  const schemaProhibited = ticketSchema.properties && ticketSchema.properties.minimum_data
    && ticketSchema.properties.minimum_data.properties.prohibited_fields.items.enum;
  pushAssertion(assertions, "schema_field_whitelist_exact", sameSet(schemaWhitelist, FIELD_WHITELIST), schemaWhitelist);
  pushAssertion(assertions, "schema_prohibited_set_exact", sameSet(schemaProhibited, PROHIBITED_FIELDS), schemaProhibited);

  const fixtureIssues = [];
  validateSchema(fixtureSchema, fixture,
    { rootSchema: fixtureSchema, ticketSchema }, "$", fixtureIssues);
  pushAssertion(assertions, "fixture_envelope_valid", fixtureIssues.length === 0, fixtureIssues);
  pushAssertion(assertions, "three_positive_tickets",
    fixture.synthetic_fixture === true
      && fixture.evidence_status === "schema_example_only_not_real_operation"
      && fixture.fixture_version === "0.2"
      && Array.isArray(fixture.tickets) && fixture.tickets.length === 3,
    "exactly three explicitly synthetic 0.2 tickets are required");

  const positiveResults = Array.isArray(fixture.tickets) ? fixture.tickets.map((ticket, index) => {
    const issues = validateTicket(ticket, ticketSchema);
    const expectedScenario = `S${String(index + 1).padStart(2, "0")}`;
    if (ticket.task && ticket.task.authorisation_status !== "not_authorized") {
      addIssue(issues, "SYNTHETIC_FIXTURE_AUTHORIZATION_FORBIDDEN", "$.task.authorisation_status",
        "synthetic examples must remain not_authorized");
    }
    if (!ticket.task || ticket.task.public_task_id !== `SYNTHETIC-${expectedScenario}`) {
      addIssue(issues, "SYNTHETIC_SCENARIO_BINDING_INVALID", "$.task.public_task_id",
        `ticket ${index} must bind to ${expectedScenario}`);
    }
    return {
      ticket_id: ticket.task && ticket.task.ticket_id,
      scenario_id: expectedScenario,
      status: issues.length ? "FAIL" : "PASS",
      issue_count: issues.length,
      issues
    };
  }) : [];
  pushAssertion(assertions, "all_positive_tickets_pass",
    positiveResults.length === 3 && positiveResults.every((result) => result.status === "PASS"),
    positiveResults.map((result) => ({ ticket_id: result.ticket_id, status: result.status, issue_count: result.issue_count })));

  const expectedNegativeCodes = [
    "INVALID_DATE_FORMAT", "TIME_ORDER_INVALID", "PROHIBITED_FIELD_SELECTED",
    "AUTHORIZED_HOST_REQUIRED", "PUBLISHED_RIGHTS_NOT_CLEARED"
  ];
  const negativeEnvelopePassed = negatives.synthetic_fixture === true
    && negatives.evidence_status === "expected_invalid_cases_only_not_real_operation"
    && negatives.fixture_version === "0.2"
    && negatives.base_ticket_ref === "encounter-ticket.example.json#/tickets/0"
    && Array.isArray(negatives.cases) && negatives.cases.length === 5
    && new Set(negatives.cases.map((testCase) => testCase.case_id)).size === 5
    && negatives.cases.map((testCase) => testCase.expected_code).join("|") === expectedNegativeCodes.join("|")
    && negatives.cases.every((testCase) => Array.isArray(testCase.mutations) && testCase.mutations.length > 0);
  pushAssertion(assertions, "negative_fixture_envelope", negativeEnvelopePassed,
    "five unique, mutation-backed controls with the fixed expected-code sequence are required");

  const baseTicket = fixture.tickets && fixture.tickets[0];
  const negativeResults = Array.isArray(negatives.cases) ? negatives.cases.map((testCase) => {
    let issues = [];
    try {
      const candidate = applyMutations(baseTicket, testCase.mutations);
      issues = validateTicket(candidate, ticketSchema);
    } catch (error) {
      issues = [{ code: "RUNNER_FIXTURE_ERROR", path: "$", message: error.message }];
    }
    const observedCodes = [...new Set(issues.map((issue) => issue.code))].sort();
    const expectedObserved = observedCodes.includes(testCase.expected_code);
    return {
      case_id: testCase.case_id,
      expected_code: testCase.expected_code,
      observed_codes: observedCodes,
      status: issues.length > 0 && expectedObserved ? "REJECTED_AS_EXPECTED" : "FAIL",
      issues
    };
  }) : [];
  pushAssertion(assertions, "five_negative_controls_rejected_with_expected_code",
    negativeResults.length === 5 && negativeResults.every((result) => result.status === "REJECTED_AS_EXPECTED"),
    negativeResults.map((result) => ({ case_id: result.case_id, status: result.status, observed_codes: result.observed_codes })));

  const scenarioRows = Array.isArray(scenarios.scenarios) ? scenarios.scenarios : [];
  const expectedScenarioIds = Array.from({ length: 12 }, (_, index) => `S${String(index + 1).padStart(2, "0")}`);
  const syntheticRows = scenarioRows.filter((row) => row.status === "synthetic_validated");
  const templateRows = scenarioRows.filter((row) => row.status === "template_pending_authorisation");
  const scenarioContractPassed = scenarios.schema_version === "0.2"
    && scenarios.evidence_status === "scenario_contract_coverage_inventory_not_field_validation"
    && scenarios.ticket_schema_ref === "encounter-ticket.schema.json"
    && scenarios.synthetic_fixture_ref === "encounter-ticket.example.json"
    && scenarios.field_validation_performed === false
    && scenarioRows.map((row) => row.scenario_id).join("|") === expectedScenarioIds.join("|")
    && new Set(scenarioRows.map((row) => row.scenario_id)).size === 12
    && syntheticRows.length === 3 && templateRows.length === 9
    && scenarioRows.every((row) => row.authorisation_status === "not_authorized"
      && row.field_validation_performed === false)
    && syntheticRows.every((row, index) => row.scenario_id === expectedScenarioIds[index]
      && row.ticket_ref === `encounter-ticket.example.json#/tickets/${index}`)
    && templateRows.every((row) => row.ticket_ref === null);
  pushAssertion(assertions, "scenario_inventory_3_plus_9", scenarioContractPassed,
    { total: scenarioRows.length, synthetic_validated: syntheticRows.length,
      template_pending_authorisation: templateRows.length, field_validation_performed: scenarios.field_validation_performed });

  const spatialFixture = siteBaseline.controlled_test_spatial_fixture || {};
  const spatialTargets = spatialFixture.design_targets || {};
  const spatialCases = Array.isArray(spatialFixture.synthetic_cases) ? spatialFixture.synthetic_cases : [];
  const spatialTicket = fixture.tickets && fixture.tickets[0];
  const ticketStart = spatialTicket && spatialTicket.space_time_capacity
    && spatialTicket.space_time_capacity.starts_at;
  const ticketEnd = spatialTicket && spatialTicket.space_time_capacity
    && spatialTicket.space_time_capacity.ends_at;
  const ticketDurationMinutes = rfc3339(ticketStart) && rfc3339(ticketEnd)
    ? (Date.parse(ticketEnd) - Date.parse(ticketStart)) / 60000 : null;
  const ticketCapacity = spatialTicket && spatialTicket.space_time_capacity
    && spatialTicket.space_time_capacity.capacity;

  pushAssertion(assertions, "spatial_fixture_identity_and_evidence_boundary",
    spatialFixture.fixture_id === "S01-ZZY-SPATIAL-01"
      && spatialFixture.ticket_ref === "encounter-ticket.example.json#/tickets/0"
      && spatialFixture.synthetic_only === true
      && spatialFixture.field_performance === false
      && nonEmptyString(spatialFixture.evidence_boundary),
    {
      fixture_id: spatialFixture.fixture_id,
      ticket_ref: spatialFixture.ticket_ref,
      synthetic_only: spatialFixture.synthetic_only,
      field_performance: spatialFixture.field_performance
    });
  pushAssertion(assertions, "spatial_fixture_ticket_and_time_binding",
    spatialTargets.session_minutes === 90
      && spatialTargets.candidate_capacity === 12
      && spatialTargets.venue_block_hours === 4
      && ticketDurationMinutes === spatialTargets.session_minutes
      && ticketCapacity === spatialTargets.candidate_capacity,
    {
      session_minutes: spatialTargets.session_minutes,
      ticket_duration_minutes: ticketDurationMinutes,
      candidate_capacity: spatialTargets.candidate_capacity,
      ticket_capacity: ticketCapacity,
      venue_block_hours: spatialTargets.venue_block_hours
    });
  pushAssertion(assertions, "spatial_fixture_exact_roles_and_components",
    deepEqual(spatialTargets.role_slots, SPATIAL_ROLE_SLOTS)
      && deepEqual(spatialTargets.components, SPATIAL_COMPONENTS),
    { role_slots: spatialTargets.role_slots, components: spatialTargets.components });
  pushAssertion(assertions, "spatial_fixture_exact_cases",
    deepEqual(spatialCases, SPATIAL_CASES),
    spatialCases.map((testCase) => ({ case_id: testCase.case_id, expected: testCase.expected })));

  const spatialRuleMasks = Array.from({ length: 64 }, (_, mask) => {
    const probe = Object.fromEntries(SPATIAL_BOOLEAN_KEYS.map((key, index) => [key, Boolean(mask & (1 << index))]));
    return spatialDecision(probe);
  });
  pushAssertion(assertions, "spatial_fixture_pass_iff_all_six_conditions_true",
    spatialRuleMasks.filter((decision) => decision === "pass").length === 1
      && spatialRuleMasks[63] === "pass"
      && spatialRuleMasks.slice(0, 63).every((decision) => decision === "reject"),
    { required_true_conditions: SPATIAL_BOOLEAN_KEYS, exhaustive_boolean_combinations_checked: 64 });

  const spatialResults = spatialCases.map((testCase) => {
    const observed = spatialDecision(testCase);
    return {
      case_id: testCase.case_id,
      expected: testCase.expected,
      observed,
      status: observed === testCase.expected ? (observed === "pass" ? "PASS" : "REJECTED_AS_EXPECTED") : "FAIL"
    };
  });
  const spatialPassCount = spatialResults.filter((result) => result.observed === "pass").length;
  const spatialRejectCount = spatialResults.filter((result) => result.observed === "reject").length;
  pushAssertion(assertions, "spatial_fixture_one_pass_four_expected_rejects",
    spatialResults.length === 5
      && spatialPassCount === 1
      && spatialRejectCount === 4
      && spatialResults.every((result) => result.status !== "FAIL"),
    spatialResults);
  pushAssertion(assertions, "spatial_fixture_field_release_remains_blocked",
    spatialFixture.field_release_status === FIELD_RELEASE_BLOCKED,
    { field_release_status: spatialFixture.field_release_status });

  const failedAssertions = assertions.filter((assertion) => !assertion.passed);
  fatalErrors.push(...failedAssertions.map((assertion) => `${assertion.id} failed`));
  const status = fatalErrors.length === 0 ? "PASS" : "FAIL";
  const output = {
    runner: "run-encounter-ticket-validation.js",
    runner_version: "0.3.0",
    status,
    evidence_boundary: {
      synthetic_only: true,
      field_performance: false,
      statement: "Deterministic offline synthetic contract replay only; PASS is not evidence of authorization, safety, public acceptance, or field/operational performance."
    },
    coverage: {
      full_json_schema_draft_2020_12_implementation: false,
      current_schema_keyword_subset_fail_closed: true,
      supported_keywords: [...SUPPORTED_SCHEMA_KEYWORDS].sort(),
      annotation_keywords_not_asserted: [...ANNOTATION_KEYWORDS].sort(),
      semantic_checks: [
        "RFC3339-profile date-time syntax and chronology",
        "minimum-data field whitelist and exact prohibited-field set",
        "legal-basis, verified-evidence, host and authorization conditions",
        "publication artifact and rights conditions",
        "three synthetic-positive plus five expected-invalid fixtures",
        "twelve-scenario inventory split into three synthetic and nine pending templates",
        "S01 Zhongzhiyuan synthetic spatial fixture: exact roles, components, ticket binding, six-condition decision rule, expected rejects, and blocked field release"
      ]
    },
    inputs: Object.values(loaded).map(({ path: inputPath, sha256 }) => ({ path: inputPath, sha256 })),
    assertions,
    positive_results: positiveResults,
    negative_results: negativeResults,
    scenario_summary: {
      total: scenarioRows.length,
      synthetic_validated: syntheticRows.length,
      template_pending_authorisation: templateRows.length,
      field_validation_performed: false
    },
    spatial_fixture_summary: {
      fixture_id: spatialFixture.fixture_id,
      ticket_ref: spatialFixture.ticket_ref,
      synthetic_only: spatialFixture.synthetic_only,
      field_performance: spatialFixture.field_performance,
      decision_rule: `pass iff ${SPATIAL_BOOLEAN_KEYS.join(" && ")} are all true`,
      session_minutes: spatialTargets.session_minutes,
      candidate_capacity: spatialTargets.candidate_capacity,
      venue_block_hours: spatialTargets.venue_block_hours,
      role_slots: spatialTargets.role_slots,
      components: spatialTargets.components,
      results: spatialResults,
      pass_count: spatialPassCount,
      expected_reject_count: spatialRejectCount,
      field_release_status: spatialFixture.field_release_status,
      evidence_boundary: spatialFixture.evidence_boundary
    },
    errors: fatalErrors
  };
  output.replay_digest_sha256 = crypto.createHash("sha256")
    .update(JSON.stringify(output)).digest("hex");
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  process.exitCode = status === "PASS" ? 0 : 1;
}

try {
  main();
} catch (error) {
  const output = {
    runner: "run-encounter-ticket-validation.js",
    runner_version: "0.3.0",
    status: "FAIL",
    evidence_boundary: {
      synthetic_only: true,
      field_performance: false,
      statement: "Runner failure; no validation or field-performance claim may be inferred."
    },
    errors: [{ code: "RUNNER_FATAL", message: error && error.message ? error.message : String(error) }]
  };
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  process.exitCode = 1;
}
