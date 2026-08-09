"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const compiler = require("./commit-compiler.js");

const samples = JSON.parse(
  fs.readFileSync(path.join(__dirname, "city-commit-samples.json"), "utf8")
);
const results = samples.commits.map(compiler.compile);

assert.deepStrictEqual(results.map((item) => item.status), ["PASS", "HOLD", "REJECT"]);
assert(results[1].holds.some((item) => item.code === "AFFECTED_GROUP_SIGNOFF_REQUIRED"));
assert(results[1].holds.some((item) => item.code === "ROLLBACK_TEST_REQUIRED"));
assert(results[2].errors.some((item) => item.code === "HIGH_IMPACT_AUTOMATION_FORBIDDEN"));
assert(results[2].errors.some((item) => item.code === "NON_AI_ALTERNATIVE_REQUIRED"));
assert(results[2].errors.some((item) => item.code === "APPEAL_PATH_REQUIRED"));

process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
