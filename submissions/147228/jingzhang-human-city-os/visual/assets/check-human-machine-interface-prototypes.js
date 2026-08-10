#!/usr/bin/env node
/*
 * Offline structural check for the two non-scaled Human City OS interface
 * prototypes. It verifies references and fail-closed traceability only; it
 * does not contact an external system or claim field performance.
 */
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "../..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(packageRoot, relativePath), "utf8"));
const writeJson = (relativePath, value) => fs.writeFileSync(path.join(packageRoot, relativePath), `${JSON.stringify(value, null, 2)}\n`, "utf8");

const interfaces = readJson("visual/assets/human-machine-interface-prototypes.json");
const journey = readJson("visual/assets/human-city-ordinary-journey.json");
const readiness = readJson("visual/assets/data-readiness-register.json");
const cache = new Map();
const checks = [];

function check(id, passed, detail) {
  checks.push({ id, status: passed ? "PASS" : "FAIL", detail });
  return passed;
}

function getFeature(reference) {
  const [relativePath, featureId] = reference.split("#");
  if (!relativePath || !featureId) return null;
  if (!cache.has(relativePath)) cache.set(relativePath, readJson(relativePath));
  const collection = cache.get(relativePath);
  return (collection.features || []).find((feature) => (feature.properties || {}).id === featureId) || null;
}

const journeySteps = new Set((journey.steps || []).map((item) => item.step_id));
const journeyTriggers = new Set((journey.triggers || []).map((item) => item.id));
const readinessIds = new Set((readiness.records || []).map((item) => item.register_id));
const requiredPrototypeIds = new Set(["SECTION-A-HUMAN-SERVICE", "SECTION-B-BOUNDED-TEST"]);

check("INTERFACE_PROTOTYPE_COUNT", Array.isArray(interfaces.prototypes) && interfaces.prototypes.length === 2, "Exactly two concept interface prototypes are declared.");
check("INTERFACE_PROTOTYPE_IDS", (interfaces.prototypes || []).every((item) => requiredPrototypeIds.has(item.prototype_id)), "Both required prototype identifiers are present.");
check("INTERFACE_CLAIM_BOUNDARY", interfaces.claim_level === "conceptual_spatial_interface" && interfaces.operational_status === "not_authorized_not_run", "The asset remains a conceptual, unrun spatial interface.");

for (const prototype of interfaces.prototypes || []) {
  const prefix = prototype.prototype_id || "UNKNOWN";
  check(`${prefix}_LAYER_COUNT`, Array.isArray(prototype.interface_layers) && prototype.interface_layers.length === 4, "Each prototype has four readable interface layers.");
  check(`${prefix}_JOURNEY_STEPS`, (prototype.journey_step_ids || []).every((id) => journeySteps.has(id)), "Every mapped journey step resolves in the ordinary-person contract.");
  check(`${prefix}_TRIGGERS`, (prototype.trigger_ids || []).every((id) => journeyTriggers.has(id)), "Every mapped trigger resolves in the ordinary-person contract.");
  check(`${prefix}_READINESS`, (prototype.data_readiness_ids || []).every((id) => readinessIds.has(id)), "Every mapped data-readiness gate resolves in the register.");
  check(`${prefix}_SPATIAL_ANCHORS`, (prototype.spatial_anchor_refs || []).every((reference) => Boolean(getFeature(reference))), "Every spatial anchor resolves against package GeoJSON.");
  check(`${prefix}_FALLBACKS`, (prototype.interface_layers || []).every((layer) => layer.label_zh && layer.label_en && layer.human_priority_zh && layer.human_priority_en && layer.stop_or_fallback_zh && layer.stop_or_fallback_en), "Every layer provides bilingual priority and fail-closed fallback wording.");
}

const negativeReference = "geometry/public_space.geojson#NOT-AN-INTERFACE-ANCHOR";
check("NEGATIVE_UNRESOLVED_ANCHOR", getFeature(negativeReference) === null, "A fabricated spatial anchor fails closed instead of being treated as a valid interface location.");
const forbiddenTerms = ["dimension_m", "capacity_persons", "operator_name", "permit_number", "investment_amount"];
const serialized = JSON.stringify(interfaces);
check("NO_UNSUPPORTED_IMPLEMENTATION_FIELDS", forbiddenTerms.every((term) => !serialized.includes(`\"${term}\"`)), "No engineering dimension, capacity, operator, permit, or investment field is introduced.");

const failed = checks.filter((item) => item.status === "FAIL");
const evidence = {
  schema_version: "1.0.0",
  evidence_id: "HUMAN-CITY-INTERFACE-PROTOTYPES-EVIDENCE-001",
  status: failed.length ? "FAIL" : "PASS",
  claim_level: "offline_structural_trace",
  operational_status: "not_authorized_not_run",
  performance_results: null,
  environment: {
    network_calls: 0,
    personal_data: false,
    external_systems: "none",
    state_changes: "deterministic bundled evidence file only"
  },
  summary: {
    prototype_count: (interfaces.prototypes || []).length,
    total_checks: checks.length,
    passed_checks: checks.length - failed.length,
    failed_checks: failed.length,
    expected_negative_sample: "unresolved spatial anchor must FAIL"
  },
  checks,
  limits_zh: "PASS 只证明本包中接口原型、空间锚点、服务链、资料门和停止措辞的引用能离线解析；不证明现实断面、人员值守、可访问性、运行安全、许可、投资或实施绩效。",
  limits_en: "PASS proves only that prototype, spatial-anchor, journey, readiness-gate, and fallback references resolve offline within this package; it does not prove a real section, staffing, accessibility, operational safety, permit, investment, or delivery performance."
};

writeJson("visual/assets/human-machine-interface-prototypes-evidence.json", evidence);
console.log(JSON.stringify(evidence, null, 2));
process.exitCode = failed.length ? 1 : 0;
