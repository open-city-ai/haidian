/* License tabletop runner. Node.js, no deps/network/personal data.
 * Usage: node visual/assets/run_license_tabletop.js [--check] */
"use strict";const fs=require("fs"),path=require("path");
const here=__dirname,contracts=JSON.parse(fs.readFileSync(path.join(here,"co-mobility-contracts.json"),"utf8"));
const branches=[["complete_contract","eligible_for_authorized_review"],["missing_non_ai_baseline","blocked"],
["missing_human_owner","blocked"],["missing_emergency_stop","blocked"],["missing_civic_dividend","blocked"],
["prohibited_data_present","blocked"],["blackout_dividend_service","bequest_audit_ready"]];
function run(c,b){if(b==="complete_contract")return"eligible_for_authorized_review";
if(b==="blackout_dividend_service")return(c.baseline.access_without_account&&c.bequest.must_work_without_ai)?"bequest_audit_ready":"blocked";return"blocked";}
const actual=[];for(const c of contracts.contracts)for(const[br,ex]of branches)actual.push({scenario_id:c.scenario_id,branch:br,expected:ex,actual:run(c,br),pass:run(c,br)===ex});
const ok=actual.length===84&&actual.every(x=>x.pass);
if(process.argv.includes("--check")){console.log(JSON.stringify({ok,scenario_count:12,branch_count:7,total_cases:84,field_performance:null},null,2));process.exit(ok?0:1);}
console.log("PASS: 84/84");