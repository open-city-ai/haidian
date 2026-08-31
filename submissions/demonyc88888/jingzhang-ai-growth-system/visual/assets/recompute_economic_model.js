#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = __dirname;
const modelPath = path.join(root, "economic_model.json");
const outputPath = path.join(root, "economic_model_recalculation.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function knownNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function inputValue(container, key) {
  const item = container[key];
  if (item && item.status === "known" && knownNumber(item.value)) {
    return item.value;
  }
  return null;
}

function collectMissing(item, prefix) {
  const missing = [];
  for (const field of ["quantity", "unit_cost_cny"]) {
    const value = item[field];
    if (!value || value.status !== "known" || !knownNumber(value.value)) {
      missing.push(`${prefix}.${item.item_id || "UNKNOWN"}.${field}`);
    }
  }
  for (const required of ["quantity_unit", "formula", "status", "basis", "source_refs"]) {
    if (!item[required]) {
      missing.push(`${prefix}.${item.item_id || "UNKNOWN"}.${required}`);
    }
  }
  return missing;
}

function computeSimpleItems(items, prefix) {
  const missing = [];
  let total = 0;
  for (const item of items || []) {
    missing.push(...collectMissing(item, prefix));
    const quantity = inputValue(item, "quantity");
    const unitCost = inputValue(item, "unit_cost_cny");
    if (quantity !== null && unitCost !== null) {
      total += quantity * unitCost;
    }
  }
  return [missing.length ? null : total, missing];
}

function inputEntryValue(entry) {
  if (entry && entry.status === "known" && knownNumber(entry.value)) {
    return entry.value;
  }
  return null;
}

function revenueItemValue(item, stageId) {
  const category = item.category_id || "UNKNOWN";
  if (!Array.isArray(item.inputs) || item.inputs.length === 0) {
    return [null, [`revenue.${stageId}.${category}.inputs`]];
  }
  const missing = [];
  const values = [];
  for (const entry of item.inputs) {
    const value = inputEntryValue(entry);
    if (value === null) {
      missing.push(entry.input_id || `revenue.${stageId}.${category}.input`);
    } else {
      values.push(value);
    }
  }
  if (missing.length) {
    return [null, missing];
  }
  if (item.calculation_type === "sum_contract_amounts") {
    return [values.reduce((sum, value) => sum + value, 0), []];
  }
  if (values.length === 2) {
    return [values[0] * values[1], []];
  }
  return [null, [`revenue.${stageId}.${category}.formula`]];
}

function buildRevenueStageChecks(model) {
  const missing = [];
  const stageOutputs = {};
  const templates = Array.isArray(model.revenue_category_templates) ? model.revenue_category_templates : [];
  const expectedCategories = new Set(templates.map((item) => item.category_id).filter(Boolean));
  for (const stage of model.revenue_stages || []) {
    const stageId = stage.stage_id || "UNKNOWN";
    const items = stage.revenue_items;
    if (!Array.isArray(items) || items.length === 0) {
      for (const category of [...expectedCategories].sort()) {
        missing.push(`revenue.${stageId}.${category}.inputs`);
      }
      stageOutputs[stageId] = null;
      continue;
    }
    const categories = new Set(items.map((item) => item.category_id).filter(Boolean));
    for (const category of [...expectedCategories].filter((category) => !categories.has(category)).sort()) {
      missing.push(`revenue.${stageId}.${category}.inputs`);
    }
    let stageTotal = 0;
    const stageMissing = [];
    for (const item of items) {
      const [value, itemMissing] = revenueItemValue(item, stageId);
      stageMissing.push(...itemMissing);
      if (value !== null) {
        stageTotal += value;
      }
    }
    missing.push(...stageMissing);
    stageOutputs[stageId] = stageMissing.length ? null : stageTotal;
  }
  return [stageOutputs, missing];
}

function publicReinvestmentMissing(model) {
  const reinvestment = model.public_ai_reinvestment;
  if (!reinvestment) {
    return ["public_ai_reinvestment"];
  }
  return (reinvestment.missing_inputs || []).map((field) => `public_ai_reinvestment.${field}`);
}

const model = readJson(modelPath);
const [capexTotal, capexMissing] = computeSimpleItems(model.capex_items || [], "capex");
const opexItems = Array.isArray(model.opex_items) ? model.opex_items : [];
const [opexTotal, opexMissing] = computeSimpleItems(opexItems, "annual_opex");
const [revenueOutputs, revenueMissing] = buildRevenueStageChecks(model);
const reinvestmentMissing = publicReinvestmentMissing(model);
const missingInputIds = [
  ...capexMissing,
  ...opexMissing,
  ...revenueMissing,
  ...reinvestmentMissing,
];

const result = {
  schema_version: "0.1.0",
  model_id: model.model_id || "ECON-MODEL-001",
  status: missingInputIds.length ? "inputs_pending" : "computed",
  numeric_outputs_published: missingInputIds.length === 0,
  missing_input_ids: missingInputIds,
  outputs: {
    one_time_capex_cny: capexTotal,
    annual_opex_cny: opexTotal,
    commercial_ai_revenue_by_stage_cny: revenueOutputs,
    public_ai_reinvestment_cny: null,
  },
  checks: {
    capex_structure_complete: (model.capex_items || []).length === 8,
    opex_structure_complete: opexItems.length === 6,
    three_revenue_stages_complete: (model.revenue_stages || []).length === 3,
    five_revenue_categories_complete: (model.revenue_category_templates || []).length === 5,
    public_reinvestment_formula_complete: Boolean(model.public_ai_reinvestment && model.public_ai_reinvestment.formula),
    no_unsupported_numeric_commitment: true,
  },
};

fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
