#!/usr/bin/env node
"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sorted(values) {
  return [...values].sort((left, right) => left.localeCompare(right));
}

function verify() {
  const matrixRelative = "visual/assets/service_touchpoint_matrix.json";
  const matrixText = read(matrixRelative);
  const matrix = JSON.parse(matrixText);
  const publicSpace = JSON.parse(read("geometry/public_space.geojson"));
  const nodes = publicSpace.features.filter(
    (feature) => feature.properties.layer === "SCENARIO_NODE",
  );
  const nodeById = new Map(nodes.map((feature) => [feature.properties.id, feature.properties]));

  assert(matrix.items.length === 12, "matrix must contain exactly 12 scenario nodes");
  assert(
    JSON.stringify(sorted(matrix.items.map((item) => item.id))) ===
      JSON.stringify(sorted(nodeById.keys())),
    "matrix scenario IDs must exactly match geometry/public_space.geojson",
  );

  const bilingualFields = [
    "name",
    "area_name",
    "problem",
    "spatial_response",
    "evidence_to_collect",
    "public_value",
  ];
  const governanceFields = [
    "accountable_role",
    "non_ai_equivalent",
    "redress_channel",
    "stop_condition",
    "expansion_gate",
  ];
  for (const item of matrix.items) {
    for (const stem of bilingualFields) {
      assert(item[`${stem}_zh`]?.trim(), `${item.id} is missing ${stem}_zh`);
      assert(item[`${stem}_en`]?.trim(), `${item.id} is missing ${stem}_en`);
    }
    for (const field of governanceFields) {
      assert(
        item[field] === nodeById.get(item.id)[field],
        `${item.id} ${field} must match the scenario-node source`,
      );
    }
  }

  const digest = crypto.createHash("sha256").update(matrixText).digest("hex");
  for (const relativePath of ["visual/index.html", "visual/index.en.html"]) {
    const html = read(relativePath);
    const coverageLabels = relativePath.endsWith(".en.html")
      ? ["Task coverage", "Self-check status", "Sources", "Assumptions"]
      : ["任务覆盖", "自检状态", "来源", "假设"];
    for (const label of coverageLabels) {
      assert(html.includes(`<span>${label}</span>`), `${relativePath} is missing coverage label: ${label}`);
    }
    assert(!html.includes("&#x27;"), `${relativePath} contains a literal apostrophe entity`);
    const embedded = html.match(
      /<script type="application\/json" id="touchpoint-data">([\s\S]*?)<\/script>/,
    );
    assert(embedded, `${relativePath} is missing embedded touchpoint data`);
    assert(
      JSON.stringify(JSON.parse(embedded[1])) === JSON.stringify(matrix),
      `${relativePath} embedded data differs from the matrix`,
    );
    assert(
      html.includes(`name="touchpoint-matrix-sha256" content="${digest}"`),
      `${relativePath} matrix checksum is stale`,
    );
    assert(!/(?:src|href)=["']https?:\/\//i.test(html), `${relativePath} has a remote dependency`);
  }

  return {
    ok: true,
    scenario_nodes: nodes.length,
    languages: ["zh", "en"],
    visuals_verified: 2,
  };
}

try {
  process.stdout.write(`${JSON.stringify(verify())}\n`);
} catch (error) {
  process.stderr.write(`Touchpoint verification failed: ${error.message}\n`);
  process.exitCode = 1;
}
