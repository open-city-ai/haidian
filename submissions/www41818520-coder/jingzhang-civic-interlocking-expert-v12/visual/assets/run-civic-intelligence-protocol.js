#!/usr/bin/env node
"use strict";
const fs=require("fs"),path=require("path"),here=__dirname;
const load=n=>JSON.parse(fs.readFileSync(path.join(here,n),"utf8"));
const proto=load("civic-intelligence-task-protocol.json"),contracts=load("implementation-contracts.json"),rights=load("public-rights-matrix.json"),claims=load("claim-provenance.json"),tabletop=load("tabletop-rehearsal.json");
const failures=[]; const check=(v,m)=>{if(!v)failures.push(m)};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
check(eq(proto.stages.map(x=>x.id),["sense","ask","plan","act","verify","learn"]),"six stages");
for(const s of proto.stages) for(const f of ["ai_role","human_role","ordinary_equivalent","evidence_output","stop_condition"]) check(s[f],`${s.id}.${f}`);
check(eq(proto.key_area_mapping.map(x=>x.key_area).sort(),["PROV-KEY-001","PROV-KEY-002","PROV-KEY-003"]),"three key areas");
check(eq(Object.keys(proto.gate_mapping),["G0","G1","G2","G3"]),"four gates");
check(Object.keys(proto.project_mapping).length===8,"eight projects");
check(contracts.first_issue_contracts.length===3,"three contracts");
for(const c of contracts.first_issue_contracts) for(const f of ["lead_entity","approval_prerequisites","timeline_zh","kpis","exit_rollback"]) check(c[f]&&c[f].length,`${c.id}.${f}`);
check(rights.rights.length===7,"seven rights");
check(claims.claims.length>=10,"ten claims");
const tabletopCases=tabletop.scenarios.flatMap(s=>tabletop.branches.map(b=>({scenario:s,branch:b.id,decision:b.expected})));
check(tabletopCases.length===tabletop.expected_case_count,"84 tabletop cases");
check(tabletopCases.filter(x=>x.decision==="stop").length===tabletop.expected_negative_count,"72 negative branches stop");
check(tabletop.branches.filter(x=>x.expected==="continue_to_human_review").length===1,"one baseline branch");
if(failures.length){console.error("FAIL\n - "+failures.join("\n - "));process.exit(1)}
console.log(`PASS stages=${proto.stages.length}/6 key_areas=3/3 gates=4/4 projects=8/8 contracts=${contracts.first_issue_contracts.length}/3 rights=${rights.rights.length}/7 claims=${claims.claims.length} tabletop=${tabletopCases.length}/84 negatives=${tabletop.expected_negative_count}/72`);
console.log("Structural traceability only; not field performance, safety, permission or official scoring.");
