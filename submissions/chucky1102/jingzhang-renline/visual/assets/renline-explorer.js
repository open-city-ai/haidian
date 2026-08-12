/* RENLINE Explorer — 人字线漫游(概念示意 conceptual)
   Locally bundled interactive; zero external dependencies.
   Expects DOM: #rl-cv canvas, #rl-panel, #rl-lang, #rl-stitch, #rl-cards, #rl-fallback.
   Initial language from the canvas's data-lang attribute ("zh" | "en"). */
(function(){
'use strict';
function init(){
var cv=document.getElementById('rl-cv');
if(!cv||!cv.getContext){throw new Error('canvas unavailable');}
var ctx=cv.getContext('2d'),panel=document.getElementById('rl-panel');
var PAL={cream:'#FAF7F2',ink:'#3a362f',grey:'#9C9890',green:'#1E7F4F',blue:'#1F5FA8',red:'#B5442D',amber:'#B8860B'};
var I18N={
 zh:{content:'承载内容',cards:'关联场景卡',belt:'全带场景(不锚定单驿)',switchback:'折返点',
     status:{yellow:'黄·受控试点',cand:'预备态'},
     hint:'点击或用←→键浏览十驿;L 键或按钮切换语言。',
     dir:'↑ 爬升方向(以迭代换爬升)· 方块=折返点'},
 en:{content:'Programme',cards:'Scenario cards',belt:'Belt-wide scenarios (not anchored to one waypoint)',switchback:'switchback node',
     status:{yellow:'yellow · controlled pilot',cand:'candidate'},
     hint:'Click or use the arrow keys to browse the ten waypoints; press L or the button to switch language.',
     dir:'↑ climb direction (climb by iteration) · squares = switchback nodes'}};
var CARDS={
 T1:{zh:'绿脊自动接驳与无人配送走廊',en:'Autonomous shuttle & delivery corridor',s:'yellow'},
 T2:{zh:'具身机器人开放测试场',en:'Embodied-robot proving ground',s:'yellow'},
 T3:{zh:'市政设施AI体检',en:'Municipal-asset AI health check',s:'yellow'},
 C4:{zh:'K标AR历史层',en:'K-mark AR history layer',s:'cand'},
 C5:{zh:'开发者街面',en:'Developer streetfront',s:'cand'},
 C6:{zh:'多语言AI导览与无障碍副驾',en:'Multilingual guide & accessibility copilot',s:'yellow'},
 C7:{zh:'社区养老AI陪伴与基层诊疗辅助',en:'Elder-care companion & primary-care assistant',s:'yellow'},
 C8:{zh:'校企双向实习智能体匹配',en:'Campus-industry internship matching',s:'cand'},
 C9:{zh:'夜间经济智能治理',en:'Night-economy governance',s:'yellow'},
 C10:{zh:'智能体市集',en:'Agent marketplace',s:'cand'},
 C11:{zh:'生态传感与鸟类友好照明',en:'Eco sensing & bird-friendly lighting',s:'cand'},
 C12:{zh:'AI编钟共创',en:'AI chime co-creation',s:'cand'}};
var BELT=['T1','C6','C11'];
/* Ten waypoints on a switchback climb; coordinates are schematic only. */
var ST=[
 {k:'K0',zh:'南门户驿',en:'Southern Gateway',locZh:'西直门外大街北界·里程零点碑',locEn:'North edge of Xizhimenwai Ave · mileage-zero stone',cZh:'全带南入口标识、里程零点碑',cEn:'Southern belt gateway and mileage-zero stone',x:90,y:540,cards:[]},
 {k:'K1',zh:'钟声广场',en:'Bell Plaza',locZh:'大钟寺片区(折返点)',locEn:'Dazhongsi area (switchback node)',cZh:'敲钟仪式、AI编钟',cEn:'Bell ritual, AI chimes',x:400,y:480,cards:['C12'],sb:true},
 {k:'K2',zh:'大钟寺站驿',en:'Dazhongsi Station',locZh:'大钟寺站TOD缝合口',locEn:'Dazhongsi Station TOD stitching mouth',cZh:'市政AI体检、接驳换乘',cEn:'Municipal AI health check, transfers',x:300,y:430,cards:['T3']},
 {k:'K3',zh:'交大缝合口',en:'Jiaoda Stitch',locZh:'交大东路缝合街·北下关侧',locEn:'Jiaoda East stitching street, by Beixiaguan',cZh:'桥下空间活化、校园界面、养老诊疗辅助',cEn:'Under-viaduct activation, campus interface, elder care',x:190,y:380,cards:['C7']},
 {k:'K4',zh:'知春折返广场',en:'Zhichun Switchback Plaza',locZh:'知春路缝合街口(强割裂段·折返点)',locEn:'Zhichun stitching mouth (strong severance · switchback node)',cZh:'折返桥、AR历史层',cEn:'Switchback bridge, AR history layer',x:110,y:330,cards:['C4'],sb:true},
 {k:'K5',zh:'原点广场',en:'Origin Plaza',locZh:'AI原点社区中心·人字交点',locEn:'Center of AI Origin Community · the ren junction',cZh:'AI零公里碑·荣誉墙/折返墙、智能体市集、折返日、开发者街面',cEn:'AI kilometre-zero stone, honor & switchback walls, agent marketplace, developer streetfront',x:260,y:280,cards:['C10','C5'],origin:true},
 {k:'K6',zh:'赶考驿',en:'Examination Waypoint',locZh:'成府路缝合街·清华园车站旧址侧·五道口',locEn:'Chengfu stitch, by Qinghuayuan Station site, Wudaokou',cZh:'文化叙事动线衔接、夜间经济治理',cEn:'Heritage narrative link, night-economy governance',x:400,y:235,cards:['C9']},
 {k:'K7',zh:'学院路缝合广场',en:'Xueyuan Stitching Plaza',locZh:'学院路高校开放带',locEn:'University open belt on Xueyuan Rd',cZh:'校企实习匹配、围墙打开计划',cEn:'Internship matching, open-campus programme',x:530,y:195,cards:['C8']},
 {k:'K8',zh:'月泉驿',en:'Yuequan Waypoint',locZh:'月泉路缝合街·学清路口袋公园',locEn:'Yuequan stitch, Xueqing pocket park',cZh:'社区科普驿、生态传感',cEn:'Community science waypoint, eco sensing',x:640,y:160,cards:[]},
 {k:'K9',zh:'登顶广场',en:'Summit Plaza',locZh:'众智园北端(折返点·清河枢纽方向门户)',locEn:'North end of Zhongzhiyuan (switchback node, Qinghe gateway)',cZh:'人字塔、人字线大会、机器人测试场',cEn:'Ren Tower, RENLINE assembly, robot proving ground',x:560,y:95,cards:['T2'],sb:true}];
var STITCH=[
 {zh:'大钟寺缝',en:'Dazhongsi',x:320,y:520,pri:true},{zh:'交大东路缝',en:'Jiaoda East',x:245,y:408},
 {zh:'学院南路缝',en:'Xueyuan South',x:150,y:352},{zh:'知春路缝',en:'Zhichun Rd',x:85,y:295,pri:true},
 {zh:'成府路缝',en:'Chengfu Rd',x:300,y:268},{zh:'月泉路缝',en:'Yuequan Rd',x:575,y:205},
 {zh:'清河南缝',en:'Qinghe South',x:655,y:140,pri:true}];
var lang=cv.getAttribute('data-lang')==='en'?'en':'zh';
var sel=5,pulse=0,raf=null;
var mq=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
var reduced=mq.matches;
function layer(id){var el=document.getElementById(id);return !el||el.checked;}
function draw(){
  var W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
  ctx.strokeStyle='#EFEAE2';ctx.lineWidth=1;
  var x,y,i;
  for(x=0;x<W;x+=76){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(y=0;y<H;y+=75){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  var cols=[PAL.green,PAL.blue],leg=0;
  for(i=0;i<ST.length-1;i++){
    ctx.strokeStyle=cols[leg%2];ctx.lineWidth=12;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(ST[i].x,ST[i].y);ctx.lineTo(ST[i+1].x,ST[i+1].y);ctx.stroke();
    ctx.strokeStyle=PAL.cream;ctx.lineWidth=2.5;ctx.setLineDash([9,9]);
    ctx.beginPath();ctx.moveTo(ST[i].x,ST[i].y);ctx.lineTo(ST[i+1].x,ST[i+1].y);ctx.stroke();ctx.setLineDash([]);
    if(ST[i+1].sb)leg++;
  }
  if(layer('rl-stitch')){
    ctx.font='11px sans-serif';
    STITCH.forEach(function(s){ctx.strokeStyle=s.pri?PAL.red:PAL.amber;ctx.lineWidth=s.pri?2.5:1.5;
      ctx.beginPath();ctx.moveTo(s.x-9,s.y-9);ctx.lineTo(s.x+9,s.y+9);ctx.moveTo(s.x+9,s.y-9);ctx.lineTo(s.x-9,s.y+9);ctx.stroke();
      ctx.fillStyle=PAL.grey;ctx.fillText(lang==='zh'?s.zh:s.en,s.x+13,s.y+4);});
  }
  ST.forEach(function(s,idx){
    var r=s.origin?13:10;
    if(s.origin&&!reduced){ctx.beginPath();ctx.arc(s.x,s.y,r+6+4*Math.sin(pulse/22),0,7);ctx.strokeStyle='rgba(181,68,45,.45)';ctx.lineWidth=3;ctx.stroke();}
    ctx.beginPath();
    if(s.sb){ctx.fillStyle=PAL.cream;ctx.strokeStyle=PAL.ink;ctx.lineWidth=3;ctx.rect(s.x-r,s.y-r,2*r,2*r);ctx.fill();ctx.stroke();}
    else{ctx.fillStyle=PAL.cream;ctx.strokeStyle=s.origin?PAL.red:PAL.ink;ctx.lineWidth=s.origin?5:3;ctx.arc(s.x,s.y,r,0,7);ctx.fill();ctx.stroke();}
    if(idx===sel){ctx.beginPath();ctx.strokeStyle=PAL.blue;ctx.lineWidth=3;ctx.arc(s.x,s.y,r+7,0,7);ctx.stroke();}
    if(layer('rl-cards')&&s.cards.length){
      s.cards.forEach(function(c,j){var stt=CARDS[c].s;ctx.beginPath();ctx.arc(s.x+r+8+j*14,s.y-r-6,5,0,7);
        if(stt==='yellow'){ctx.fillStyle=PAL.amber;ctx.fill();}else{ctx.strokeStyle=PAL.green;ctx.lineWidth=2.5;ctx.stroke();}});
    }
    ctx.fillStyle=PAL.ink;ctx.font=(s.origin?'bold 15px':'13px')+' sans-serif';
    ctx.fillText(s.k+' '+(lang==='zh'?s.zh:s.en),s.x-r,s.y+r+17);
  });
  ctx.fillStyle=PAL.grey;ctx.font='12px sans-serif';
  ctx.fillText(I18N[lang].dir,16,24);
  if(!reduced){raf=window.requestAnimationFrame(function(){pulse++;draw();});}
}
function chip(c){var cd=CARDS[c],t=I18N[lang];
  return '<span class="rl-chip"><span class="rl-dot '+(cd.s==='yellow'?'rl-yellow':'rl-cand')+'"></span>'+c+' '+(lang==='zh'?cd.zh:cd.en)+' · '+t.status[cd.s]+'</span>';}
function renderPanel(){
  var t=I18N[lang],s=ST[sel];
  var h='<h3>'+s.k+' '+(lang==='zh'?s.zh:s.en)+(s.sb?' <span class="rl-chip">'+t.switchback+'</span>':'')+'</h3>';
  h+='<p class="rl-loc">'+(lang==='zh'?s.locZh:s.locEn)+'</p>';
  h+='<p><strong>'+t.content+':</strong>'+(lang==='zh'?s.cZh:s.cEn)+'</p>';
  if(s.cards.length){h+='<p><strong>'+t.cards+':</strong><br>'+s.cards.map(chip).join(' ')+'</p>';}
  h+='<p><strong>'+t.belt+':</strong><br>'+BELT.map(chip).join(' ')+'</p>';
  h+='<p class="rl-hint">'+t.hint+'</p>';
  panel.innerHTML=h;
}
function refresh(){renderPanel();if(raf)window.cancelAnimationFrame(raf);draw();}
cv.addEventListener('click',function(e){
  var r=cv.getBoundingClientRect(),px=(e.clientX-r.left)*cv.width/r.width,py=(e.clientY-r.top)*cv.height/r.height;
  ST.forEach(function(s,idx){if(Math.sqrt((s.x-px)*(s.x-px)+(s.y-py)*(s.y-py))<20){sel=idx;refresh();}});
});
cv.addEventListener('mousemove',function(e){
  var r=cv.getBoundingClientRect(),px=(e.clientX-r.left)*cv.width/r.width,py=(e.clientY-r.top)*cv.height/r.height;
  cv.style.cursor=ST.some(function(s){return Math.sqrt((s.x-px)*(s.x-px)+(s.y-py)*(s.y-py))<20;})?'pointer':'default';
});
cv.addEventListener('keydown',function(e){
  var k=e.key;
  if(k==='ArrowRight'||k==='ArrowUp'||k==='Right'||k==='Up'){sel=(sel+1)%ST.length;refresh();e.preventDefault();}
  if(k==='ArrowLeft'||k==='ArrowDown'||k==='Left'||k==='Down'){sel=(sel+ST.length-1)%ST.length;refresh();e.preventDefault();}
  if(k==='l'||k==='L'){toggleLang();}
});
function toggleLang(){lang=lang==='zh'?'en':'zh';
  var b=document.getElementById('rl-lang');if(b)b.textContent=lang==='zh'?'EN':'中';refresh();}
var lb=document.getElementById('rl-lang');if(lb){lb.textContent=lang==='zh'?'EN':'中';lb.addEventListener('click',toggleLang);}
['rl-stitch','rl-cards'].forEach(function(id){var el=document.getElementById(id);if(el)el.addEventListener('change',function(){refresh();});});
if(mq.addEventListener){mq.addEventListener('change',function(e){reduced=e.matches;refresh();});}
refresh();
}
function boot(){
  try{init();}
  catch(err){
    var fb=document.getElementById('rl-fallback');if(fb)fb.style.display='block';
    var live=document.getElementById('rl-live');if(live)live.style.display='none';
  }
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',boot);}else{boot();}
})();
