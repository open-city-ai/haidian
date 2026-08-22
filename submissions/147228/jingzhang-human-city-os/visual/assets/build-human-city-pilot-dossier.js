#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require(process.env.HUMAN_CITY_SHARP_MODULE || 'sharp');
const root = path.resolve(__dirname, '..', '..');
const figures = path.join(root, 'assets', 'figures');
const dossier = JSON.parse(fs.readFileSync(path.join(__dirname, 'human-city-pilot-dossier.json'), 'utf8'));
if (dossier.decision !== 'HOLD' || dossier.field_observation_count !== 0) throw new Error('Dossier must remain HOLD with zero field observations.');

const W=2400,H=1350;
const C={navy:'#10233f',ink:'#172033',paper:'#f4f1e8',white:'#fffdfa',muted:'#64748b',line:'#cbd5e1',green:'#16856b',greenSoft:'#dff1ea',blue:'#3f6fc4',blueSoft:'#e4ecfb',orange:'#d86f45',orangeSoft:'#f8e3da',gold:'#bd891e',goldSoft:'#f7edca',purple:'#7656a8',purpleSoft:'#ece6f5',red:'#b84646'};
const esc=(v)=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const text=(x,y,v,size,o={})=>`<text x="${x}" y="${y}" text-anchor="${o.anchor||'start'}" font-size="${size}" font-weight="${o.weight||400}" fill="${o.fill||C.ink}">${esc(v)}</text>`;
function wrap(x,y,v,size,limit,o={}){
  const source=String(v); const rows=[];
  if (/^[\x00-\xff\s]+$/.test(source)) { let row=''; for(const word of source.split(/\s+/)){const next=row?`${row} ${word}`:word;if(next.length>limit&&row){rows.push(row);row=word;}else row=next;}if(row)rows.push(row); }
  else { const chars=Array.from(source); for(let i=0;i<chars.length;i+=limit) rows.push(chars.slice(i,i+limit).join('')); }
  const gap=o.gap||Math.round(size*1.3); return rows.slice(0,o.maxRows||4).map((r,i)=>text(x,y+i*gap,r,size,o)).join('');
}
const rect=(x,y,w,h,o={})=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.radius??14}" fill="${o.fill??C.white}" stroke="${o.stroke??C.line}" stroke-width="${o.sw??2}"${o.dash?` stroke-dasharray="${o.dash}"`:''}/>`;
const line=(x1,y1,x2,y2,o={})=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.stroke||C.ink}" stroke-width="${o.sw||3}" stroke-linecap="round"${o.dash?` stroke-dasharray="${o.dash}"`:''}/>`;
function dim(x1,y1,x2,y2,label,vertical=false){let s=line(x1,y1,x2,y2,{sw:2});if(vertical){s+=line(x1-9,y1,x1+9,y1,{sw:2})+line(x2-9,y2,x2+9,y2,{sw:2})+text(x1-15,(y1+y2)/2+6,label,18,{anchor:'end',weight:700});}else{s+=line(x1,y1-9,x1,y1+9,{sw:2})+line(x2,y2-9,x2,y2+9,{sw:2})+text((x1+x2)/2,y1-9,label,18,{anchor:'middle',weight:700});}return s;}
const start=(title)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}"><rect width="${W}" height="${H}" fill="${C.paper}"/><g font-family="Arial, PingFang SC, Noto Sans CJK SC, sans-serif">`;
function header(code,titleValue,subtitle,lang){let s=text(72,63,code,18,{fill:C.green,weight:800})+text(2328,63,'V3.0 · DESIGN TARGET · HOLD',18,{anchor:'end',fill:C.orange,weight:800});s+=text(72,135,titleValue,lang==='zh'?48:42,{weight:760})+text(72,185,subtitle,lang==='zh'?22:18,{fill:C.muted})+line(72,220,2328,220,{stroke:C.line,sw:2});return s;}

function nodeBoard(lang){
  const zh=lang==='zh'; const titleValue=zh?'一个公共服务节点，三张可被追问的图':'One public-service node, three drawings that can be challenged';
  let s=start(titleValue)+header('HUMAN CITY OS / INCLUSIVE SERVICE NODE / 01',titleValue,zh?'ALT-C：普通入口、低位人工台和退出路径先于可撤回 AI 服务岛':'ALT-C: ordinary entry, low staffed desk and exit precede the removable AI island',lang);
  s+=rect(72,255,1045,930,{fill:C.white,stroke:C.green,sw:3,radius:24})+text(105,305,zh?'1:500 层级平面示意｜非打印比例':'1:500 PLAN-LEVEL SCHEMATIC · NOT PRINT SCALE',zh?25:20,{weight:760})+text(1080,305,zh?'未落位 30.0×18.0 m':'UNLOCATED 30.0×18.0 m',zh?17:15,{anchor:'end',fill:C.orange,weight:700});
  const px=130,py=370,pw=900,ph=540,scale=30;
  s+=rect(px,py,pw,ph,{fill:'#f9faf8',stroke:C.ink,sw:4,radius:0});
  s+=rect(px,py,2.4*scale,ph,{fill:C.purpleSoft,stroke:C.purple,sw:2,radius:0})+text(px+38,py+ph/2,zh?'2.4 m 维护':'2.4 m MAINT.',16,{anchor:'middle',fill:C.purple,weight:700});
  s+=rect(px,py+ph-3*scale,pw,3*scale,{fill:C.greenSoft,stroke:C.green,sw:3,radius:0})+text(px+pw/2,py+ph-34,zh?'3.0 m 连续普通路径｜BASE / BLACKOUT / CLOSEOUT 均开放':'3.0 m ORDINARY ROUTE · OPEN IN BASE / BLACKOUT / CLOSEOUT',zh?17:14,{anchor:'middle',fill:C.green,weight:700});
  s+=rect(px+105,py+48,6*scale,4*scale,{fill:C.blueSoft,stroke:C.blue,sw:3,radius:8})+wrap(px+195,py+90,zh?'低位人工服务与纸面回执 6×4 m':'LOW STAFFED DESK + PAPER 6×4 m',zh?17:14,zh?10:20,{anchor:'middle',fill:C.blue,weight:700,maxRows:3});
  s+=rect(px+105,py+205,4*scale,4*scale,{fill:C.goldSoft,stroke:C.gold,sw:3,radius:8})+wrap(px+165,py+248,zh?'电话与无设备办理 4×4 m':'PHONE + DEVICE-FREE 4×4 m',zh?16:13,zh?9:18,{anchor:'middle',fill:'#7c5c00',weight:700,maxRows:3});
  s+=rect(px+255,py+205,6*scale,4*scale,{fill:'#eef2f6',stroke:C.muted,sw:2,radius:8})+wrap(px+345,py+248,zh?'低刺激等候 6×4 m':'LOW-STIMULATION WAIT 6×4 m',zh?16:13,zh?10:20,{anchor:'middle',fill:C.muted,weight:700,maxRows:3});
  const ix=px+570,iy=py+95; s+=rect(ix-60,iy-60,8*scale,7*scale,{fill:C.orangeSoft,stroke:C.orange,sw:3,dash:'12 8',radius:10})+text(ix+60,iy-26,zh?'2.0 m 净空环':'2.0 m CLEAR RING',15,{anchor:'middle',fill:C.orange,weight:700});
  s+=rect(ix,iy,4*scale,3*scale,{fill:C.orange,stroke:C.ink,sw:3,radius:8})+wrap(ix+60,iy+40,zh?'可撤回 AI 岛 4×3 m':'REMOVABLE AI ISLAND 4×3 m',zh?16:13,zh?9:17,{anchor:'middle',fill:C.white,weight:700,maxRows:3});
  s+=`<circle cx="${px+385}" cy="${py+118}" r="${1.5*scale/2}" fill="none" stroke="${C.green}" stroke-width="3" stroke-dasharray="8 6"/>`+text(px+385,py+124,'Ø1.50 m',14,{anchor:'middle',fill:C.green,weight:700});
  s+=dim(px,py-24,px+pw,py-24,'30.0 m')+dim(px-24,py,px-24,py+ph,'18.0 m',true);
  s+=text(105,955,zh?'已消解冲突':'RESOLVED CONFLICTS',16,{fill:C.green,weight:800});
  const conflicts=zh?['人机零交叉：AI 岛为尽端支路','排队袋不占 3.0 m 普通路径','维护从西/北独立进入','线缆不跨越普通路径','停电只隔离 AI 岛']:['Zero ordinary-machine crossings','Queue pocket stays off 3.0 m route','Maintenance enters west/north','No cable crosses ordinary route','Blackout isolates AI island only'];
  conflicts.forEach((v,i)=>{const y=990+i*35;s+=`<circle cx="118" cy="${y-5}" r="7" fill="${i===4?C.orange:C.green}"/>`+text(140,y,v,zh?15:13,{weight:600});});
  s+=rect(105,1152,975,92,{fill:C.orangeSoft,stroke:C.orange,sw:2,radius:12})+wrap(132,1185,zh?'规范交叉校准：通道≥1.20 m（人员密集≥1.80 m）；手动门≥0.90 m / 自动门≥1.00 m。低位与回转另见浙江二次参照；均待专业复核。':'Cross-check: route >=1.20 m (crowded >=1.80 m); manual/automatic doors >=0.90/1.00 m. Low counter/turn: secondary Zhejiang reference. Professional review required.',zh?15:13,zh?52:82,{fill:C.ink,maxRows:2});

  s+=rect(1150,255,1178,455,{fill:C.white,stroke:C.blue,sw:3,radius:24})+text(1185,305,zh?'1:100 层级剖面示意｜非打印比例':'1:100 SECTION-LEVEL SCHEMATIC · NOT PRINT SCALE',zh?25:19,{weight:760});
  const sx=1200,base=625; s+=line(sx,base,2245,base,{stroke:C.ink,sw:5})+line(sx,base-255,2245,base-255,{stroke:C.ink,sw:3});
  s+=rect(sx+15,base-90,235,90,{fill:C.greenSoft,stroke:C.green,sw:2,radius:0})+text(sx+132,base-38,zh?'3.0 m 普通通行':'3.0 m ORDINARY',15,{anchor:'middle',fill:C.green,weight:700});
  s+=rect(sx+270,base-132,185,132,{fill:C.blueSoft,stroke:C.blue,sw:2,radius:0})+text(sx+362,base-82,zh?'0.75 m 低位台':'0.75 m LOW DESK',14,{anchor:'middle',fill:C.blue,weight:700})+text(sx+362,base-38,'0.75×0.65×0.45 m',12,{anchor:'middle',fill:C.blue});
  s+=`<circle cx="${sx+150}" cy="${base-165}" r="54" fill="none" stroke="${C.green}" stroke-width="3" stroke-dasharray="7 5"/>`+text(sx+150,base-161,'Ø1.50 m',13,{anchor:'middle',fill:C.green,weight:700});
  s+=rect(sx+540,base-155,320,155,{fill:C.orangeSoft,stroke:C.orange,sw:3,dash:'10 7',radius:4})+rect(sx+625,base-115,150,115,{fill:C.orange,stroke:C.ink,sw:2,radius:4})+text(sx+700,base-62,zh?'可撤 AI 岛':'REMOVABLE AI',14,{anchor:'middle',fill:C.white,weight:700});
  s+=rect(sx+900,base-120,125,120,{fill:C.purpleSoft,stroke:C.purple,sw:2,radius:0})+wrap(sx+962,base-82,zh?'2.4 m 维护/设备':'2.4 m MAINT.',13,zh?7:12,{anchor:'middle',fill:C.purple,weight:700,maxRows:2});
  s+=dim(sx-25,base-255,sx-25,base,'3.60 m',true)+text(1185,675,zh?'BLACKOUT：在设备脊断电断数；普通路径、人工、电话、纸面和双出口保持。':'BLACKOUT: isolate power/data at the utility spine; retain ordinary, staffed, phone, paper and both exits.',zh?15:14,{fill:C.orange,weight:700});

  s+=rect(1150,745,1178,500,{fill:C.white,stroke:C.gold,sw:3,radius:24})+text(1185,795,zh?'1:50 层级接口示意｜非打印比例':'1:50 INTERFACE-LEVEL SCHEMATIC · NOT PRINT SCALE',zh?25:19,{weight:760});
  const cards=zh?[
    ['低位人工台','台面 0.75 m｜膝部净空 0.75×0.65×0.45 m','轮椅回转 Ø1.50 m；前方不设门槛'],
    ['人工停用控制','操作中心 0.95 m｜标准校准 0.85–1.10 m','一键隔离 AI 岛，不切断人工/电话'],
    ['可拆设备接口','模块 1.20×0.60 m｜封闭退避槽 0.30 m','拆除→封口→恢复地面，不留绊倒线缆'],
    ['门与排队袋','门净宽目标 1.00 m｜排队袋 2.40×4.00 m','门扇、轮椅回转与疏散线不冲突']
  ]:[
    ['LOW STAFFED DESK','Surface 0.75 m · knee 0.75×0.65×0.45 m','Ø1.50 m turn; no threshold in front'],
    ['HUMAN STOP CONTROL','Centre 0.95 m · calibration 0.85–1.10 m','Isolate AI only; retain staff and phone'],
    ['REMOVABLE INTERFACE','Module 1.20×0.60 m · closed retreat 0.30 m','Remove, cap, restore floor; no loose cable'],
    ['DOOR + QUEUE POCKET','Door target 1.00 m · pocket 2.40×4.00 m','Door swing, turn and exit remain separate']
  ];
  cards.forEach((c,i)=>{const col=i%2,row=Math.floor(i/2),x=1185+col*555,y=835+row*176;s+=rect(x,y,520,145,{fill:i===2?C.orangeSoft:i===0?C.greenSoft:'#f7f8fa',stroke:i===2?C.orange:i===0?C.green:C.line,sw:2,radius:12})+text(x+22,y+33,c[0],zh?17:15,{fill:i===2?C.orange:i===0?C.green:C.ink,weight:800})+text(x+22,y+70,c[1],zh?15:14,{weight:700})+wrap(x+22,y+103,c[2],zh?14:13,zh?28:52,{fill:C.muted,maxRows:2});});
  s+=rect(1185,1190,1108,72,{fill:C.navy,stroke:C.navy,radius:12})+text(1212,1221,zh?'仍缺：入口/街道/建筑边与标高落位、消防/无障碍签字、公众走查、权属和市政点位。':'STILL MISSING: located entrance/street/building edges + levels, sign-offs, walkthrough, title and utilities.',zh?14:13,{fill:C.white,weight:700})+text(1212,1248,'verified_anchor_count=0 · field observations=0 · release_capacity=null · HOLD',14,{fill:'#a9c4db'});
  return s+'</g></svg>\n';
}

function deliveryBoard(lang){
  const zh=lang==='zh',dc=dossier.delivery_contract; const titleValue=zh?'从角色到退役：一份不假装已经落地的交付回执':'From roles to retirement: a delivery receipt that does not pretend to be built';
  let s=start(titleValue)+header('HUMAN CITY OS / DELIVERY RECEIPT / 02',titleValue,zh?'18 周条件式路径、数量×单价成本、RACI、SLA、保险与双回退':'Conditional 18-week path, quantity-rate cost, RACI, SLA, insurance and dual rollback',lang);
  s+=rect(72,255,1090,430,{fill:C.white,stroke:C.green,sw:3,radius:24})+text(105,305,zh?'18 周条件式依赖链｜全部 G0 通过后才起算':'CONDITIONAL 18-WEEK DEPENDENCY CHAIN · STARTS AFTER G0',zh?25:20,{weight:760});
  const labels=zh?['授权/权属','专业联审','竞争采购','普通路径先行','停用/公众走查','独立决定']:['AUTH/TITLE','REVIEWS','PROCURE','ROUTE FIRST','WALKTHROUGH','DECIDE'];
  dc.schedule.forEach((item,i)=>{const x=105+i*168,y=365;s+=rect(x,y,145,110,{fill:i<2?C.greenSoft:i<4?C.blueSoft:i===4?C.goldSoft:C.orangeSoft,stroke:i<2?C.green:i<4?C.blue:i===4?C.gold:C.orange,sw:2,radius:10})+text(x+72,y+31,item.id,14,{anchor:'middle',weight:800})+wrap(x+72,y+61,labels[i],zh?14:13,zh?6:12,{anchor:'middle',weight:700,maxRows:2});if(i<5)s+=line(x+145,y+55,x+168,y+55,{stroke:C.ink,sw:2});});
  s+=wrap(105,520,zh?'每阶段必须提交可签署的放行证据；任何无障碍、消防、隐私、同意或责任重大失败都退回 HOLD。':'Every stage needs signable release evidence; any critical accessibility, fire, privacy, consent or accountability failure returns to HOLD.',zh?15:14,zh?58:98,{fill:C.muted,maxRows:2});
  s+=rect(105,585,1020,70,{fill:C.navy,stroke:C.navy,radius:10})+text(130,617,zh?'采购：两阶段、性能导向、竞争性、公开数量与单价；无指定供应商。':'PROCUREMENT: two-stage, performance-based, competitive, open quantities + rates; no preferred supplier.',zh?15:14,{fill:C.white,weight:700})+text(130,642,zh?'付款节点：普通路径、停用、移交和退役证据通过后。':'PAYMENT: after accepted route, blackout, handover and closeout evidence.',zh?13:13,{fill:'#b8ccdd'});

  s+=rect(72,720,1090,520,{fill:C.white,stroke:C.orange,sw:3,radius:24})+text(105,770,zh?'数量 × 单价概念成本｜低置信，不是招标价':'QUANTITY × RATE CONCEPT COST · LOW CONFIDENCE, NOT TENDER',zh?24:19,{weight:760});
  const costRows=zh?[
    ['测绘/设计/专业复核','1 项','10–15 万'],['普通路径与可逆地面','180 ㎡ × 800–1200','14.4–21.6 万'],['人工/纸面服务装修','24 ㎡ × 4500–6500','10.8–15.6 万'],['可撤 AI 岛/离线接口','12 ㎡ × 1.2–1.8 万','14.4–21.6 万'],['导视/无障碍接口','1 项','8–12 万'],['测试/培训/恢复','1 项','8–12 万']
  ]:[
    ['Survey/design/reviews','1 package','CNY 100–150k'],['Route + reversible floor','180 sqm × 800–1200','CNY 144–216k'],['Staffed/paper fit-out','24 sqm × 4500–6500','CNY 108–156k'],['AI island/offline interface','12 sqm × 12–18k','CNY 144–216k'],['Wayfinding/accessibility','1 package','CNY 80–120k'],['Test/train/reinstate','1 package','CNY 80–120k']
  ];
  costRows.forEach((r,i)=>{const y=810+i*48;s+=text(108,y,r[0],zh?14:14,{weight:i<4?650:500})+text(565,y,r[1],zh?14:13,{fill:C.muted})+text(1040,y,r[2],zh?14:13,{anchor:'end',weight:700});});
  s+=line(105,1090,1125,1090,{stroke:C.line,sw:2})+text(108,1125,zh?'CAPEX +15% 预备金':'CAPEX +15% CONTINGENCY',16,{fill:C.orange,weight:800})+text(1125,1125,zh?'75.44–112.47 万元':'CNY 754,400–1,124,700',16,{anchor:'end',fill:C.orange,weight:800});
  s+=text(108,1162,zh?'月 OPEX：320 人时服务 + 维护 + 翻译/无障碍 + 数据/独立审计，再加 10% 预备金':'MONTHLY OPEX: 320 staff-hours + maintenance + translation/accessibility + data/audit, plus 10% reserve',zh?13:13,{fill:C.muted})+text(1125,1195,zh?'3.278–5.434 万元/月':'CNY 32,780–54,340 / month',16,{anchor:'end',fill:C.green,weight:800});

  s+=rect(1195,255,1133,535,{fill:C.white,stroke:C.gold,sw:3,radius:24})+text(1230,305,zh?'RACI 资产交接｜所有机构角色尚未确认':'RACI ASSET HANDOFF · EVERY ORGANISATION ROLE UNCONFIRMED',zh?24:18,{weight:760});
  const headers=zh?['资产','R 负责','A 问责','C 共审']:['ASSET','RESPONSIBLE','ACCOUNTABLE','CONSULTED']; const xs=[1230,1510,1765,2020];headers.forEach((h,i)=>s+=text(xs[i],345,h,zh?14:13,{fill:C.gold,weight:800}));
  const zhRows=[['普通路径/地面','现场施工角色','公共资产所有者','无障碍/消防'],['人工/电话/纸面','公共服务运营角色','服务委托角色','社区/无障碍'],['可撤回 AI 岛','样机供应角色','试点运营角色','数据/安全'],['日志/同意/投诉','数据保护角色','服务委托角色','独立复核'],['退役与恢复','维护/施工角色','公共资产所有者','运营/社区']];
  dc.raci.forEach((r,i)=>{const y=365+i*76;s+=rect(1222,y,1070,64,{fill:i%2?'#fbf8ef':'#f8fafb',stroke:C.line,sw:1,radius:7});const vals=zh?zhRows[i]:[r.asset,r.responsible,r.accountable,r.consulted];vals.forEach((v,j)=>s+=wrap(xs[j],y+23,v,zh?13:13,zh?[10,8,8,8][j]:[20,17,17,17][j],{weight:j===0?700:500,maxRows:2,gap:15}));});
  s+=text(1230,765,zh?'所有 A 角色须在采购前具名并签字；当前 status=role_unconfirmed。':'Every accountable role must be named and sign before procurement; status=role_unconfirmed.',zh?14:13,{fill:C.red,weight:700});

  s+=rect(1195,825,1133,415,{fill:C.navy,stroke:C.navy,sw:3,radius:24})+text(1230,875,zh?'五条 SLA｜全部是未观察设计目标':'FIVE SLA TARGETS · ALL UNOBSERVED DESIGN TARGETS',zh?23:18,{fill:C.white,weight:760});
  const slaZh=['普通路径 + 人工/电话/纸面服务始终可完成','停用触发后 2 分钟内隔离 AI 岛','投诉 1 工作日确认、5 工作日给状态','开闭场签署路径/电话/纸面/断电/维护检查','无障碍/消防/隐私/同意重大失败即归零'];
  dc.service_level_targets.forEach((item,i)=>{const y=920+i*52;s+=`<circle cx="1248" cy="${y-5}" r="15" fill="${i===4?C.red:C.green}"/>`+text(1248,y,String(i+1),12,{anchor:'middle',fill:C.white,weight:800})+wrap(1278,y-8,zh?slaZh[i]:item.target,zh?14:13,zh?48:82,{fill:C.white,maxRows:2,gap:16});});
  s+=line(1230,1182,2290,1182,{stroke:'#54708b',sw:2})+text(1230,1215,zh?'退役：断电拆岛、封接口、恢复地面、保留普通服务、通知公众、关闭投诉并归档。':'RETIRE: isolate/remove island, cap interfaces, restore floor, retain ordinary service, notify, close complaints, archive.',zh?13:13,{fill:'#f0ce7b',weight:700});
  s+=rect(72,1270,2256,55,{fill:C.orangeSoft,stroke:C.orange,sw:2,radius:10})+text(100,1304,zh?'预走查协议已写但未授权：五任务、0 招募、0 参与者、结果 null；具名所有者、正式几何、专业签字、成本、保险和独立决定仍缺。':'WALKTHROUGH PROTOCOL AUTHORED, NOT AUTHORISED: 5 tasks, 0 recruitment, 0 participants, result=null; owner, geometry, sign-offs, cost, insurance and decision remain missing.',zh?13:12,{fill:C.ink,weight:700});
  return s+'</g></svg>\n';
}

async function writePair(stem,builder){for(const lang of ['zh','en']){const suffix=lang==='zh'?'':'.en';const svg=builder(lang);const svgPath=path.join(figures,`${stem}${suffix}.svg`),pngPath=path.join(figures,`${stem}${suffix}.png`);fs.writeFileSync(svgPath,svg);await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(pngPath);process.stdout.write(`${path.relative(root,svgPath)}\n${path.relative(root,pngPath)}\n`);}}
async function main(){fs.mkdirSync(figures,{recursive:true});await writePair('human-city-pilot-node-dossier',nodeBoard);await writePair('human-city-pilot-delivery-receipt',deliveryBoard);}
main().catch((e)=>{console.error(e);process.exitCode=1;});
