#!/usr/bin/env node
/**
 * Local structural audit for Jing-Zhang Civic Spine visible claims.
 * This script makes no network calls and does not certify official planning,
 * site performance, approval, publication, or score. It only checks that the
 * package-visible claims resolve to bundled evidence and declared limits.
 */
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const HERE = __dirname;
const ROOT = path.resolve(HERE, "..", "..");
const REGISTER = path.join(HERE, "civic-spine-claim-provenance.json");
const EVIDENCE = path.join(HERE, "civic-spine-claim-provenance-audit.json");
function readText(rel){ return fs.readFileSync(path.join(ROOT, rel), "utf8"); }
function readJson(rel){ return JSON.parse(readText(rel)); }
function sha256(rel){ return crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, rel))).digest("hex"); }
function getByPath(obj, dotted){ return dotted.split('.').reduce((v,k)=> v && v[k], obj); }
function check(id, pass, observed, expected){ return {id, status: pass ? "pass" : "fail", observed, expected}; }
function fileExists(rel){ return fs.existsSync(path.join(ROOT, rel)); }
function nonEmpty(v){ if(Array.isArray(v)) return v.length>0 && v.every(nonEmpty); return typeof v === 'string' ? v.trim().length>0 : v !== undefined && v !== null; }
function evaluate(){
  const register = JSON.parse(fs.readFileSync(REGISTER, "utf8"));
  const proposal = readText("proposal.md") + "\n" + readText("proposal.en.md");
  const visual = readText("visual/index.html") + "\n" + readText("visual/index.en.html");
  const metrics = readJson("metrics.json").metrics || {};
  const selfCheck = readJson("self_check.json");
  const claimResults = [];
  for(const claim of register.visible_claims){
    const checks = [];
    if(claim.required_files){
      checks.push(check("required_files", claim.required_files.every(fileExists), claim.required_files.filter(fileExists), claim.required_files));
    }
    if(claim.metric_id){
      const metric = metrics[claim.metric_id] || {};
      checks.push(check("metric_value", Math.abs(Number(metric.value) - Number(claim.expected_value)) < 1e-9, metric.value, claim.expected_value));
      checks.push(check("metric_precision_limit", String(metric.precision_note||"").includes("not an official") || String(metric.assumptions||[]).includes("Official boundary"), metric.precision_note || metric.assumptions, "explicit provisional/not-official limit"));
    }
    if(claim.display_tokens){
      checks.push(check("display_tokens", claim.display_tokens.every(t => visual.includes(t)), claim.display_tokens.filter(t => visual.includes(t)), claim.display_tokens));
    }
    if(claim.json_path){
      const obj = readJson(claim.json_path);
      if(claim.array_path){
        const arr = getByPath(obj, claim.array_path) || [];
        checks.push(check("array_count", Array.isArray(arr) && arr.length === claim.expected_count, Array.isArray(arr) ? arr.length : "not-array", claim.expected_count));
        if(claim.required_keys){
          const missing = [];
          for(const row of Array.isArray(arr) ? arr : []) for(const key of claim.required_keys){ if(!nonEmpty(row[key])) missing.push(`${row.id||row.name||row.group||"row"}.${key}`); }
          checks.push(check("required_keys", missing.length === 0, missing, []));
        }
      }
      if(claim.required_gate_statuses){
        const got = new Map((selfCheck.checks || []).map(x => [x.check_id, x.result]));
        const failed = claim.required_gate_statuses.filter(id => got.get(id) !== "pass");
        checks.push(check("gate_statuses", failed.length === 0, Object.fromEntries(got), "all pass"));
      }
    }
    if(claim.required_proposal_tokens){
      const lower = proposal.toLowerCase();
      const found = claim.required_proposal_tokens.filter(t => lower.includes(String(t).toLowerCase()));
      checks.push(check("proposal_tokens", found.length >= Math.min(claim.required_proposal_tokens.length, Math.max(1, claim.required_proposal_tokens.length-1)), found, claim.required_proposal_tokens));
    }
    checks.push(check("cannot_support_limits", Array.isArray(claim.cannot_support) && claim.cannot_support.length >= 2, claim.cannot_support, ">=2 explicit limits"));
    claimResults.push({id: claim.id, status: checks.every(c => c.status === "pass") ? "pass" : "fail", checks});
  }
  const pass = claimResults.every(x => x.status === "pass");
  return {
    schema_version: "1.0.0",
    audit_id: "CIVIC-SPINE-CLAIM-PROVENANCE-AUDIT-001",
    runner: "run-civic-spine-claim-provenance.js",
    status: pass ? "PASS" : "FAIL",
    claim_level: "local_structural_audit",
    operational_status: "not_authorized_not_run",
    package_hashes: {
      proposal_md: sha256("proposal.md"),
      metrics_json: sha256("metrics.json"),
      self_check_json: sha256("self_check.json"),
      register_json: crypto.createHash("sha256").update(fs.readFileSync(REGISTER)).digest("hex")
    },
    summary: {claims_checked: claimResults.length, claims_passed: claimResults.filter(x => x.status === "pass").length},
    claim_results: claimResults,
    not_proven: [
      "official boundary, redline, FAR, height, ownership, road engineering or utility approvals",
      "real-world AI safety, accessibility, traffic, emergency, business or public-acceptance performance",
      "gallery publication, award selection, government endorsement, Review Agent score or implementation approval"
    ]
  };
}
const evidence = evaluate();
if(process.argv.includes("--write")) fs.writeFileSync(EVIDENCE, JSON.stringify(evidence, null, 2)+"\n", "utf8");
if(process.argv.includes("--check") && evidence.status !== "PASS") process.exitCode = 1;
console.log(JSON.stringify(evidence, null, 2));
