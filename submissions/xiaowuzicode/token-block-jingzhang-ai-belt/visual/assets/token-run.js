"use strict";
var TOKEN_BLOCK_DATA = {"bands":[{"anchor_en":"Dazhongsi AI industry cluster","anchor_zh":"大钟寺AI产业集聚区","en":"Arrival Yard","f0":0.0,"f1":0.125186,"id":"S1","km":1.22,"mx":-42.5446,"mz":0.212,"scenarios":[{"en":"Data-element service house","id":"SCEN-09","test":false,"zh":"数据要素会客厅"},{"en":"Intelligent-native retail street","id":"SCEN-10","test":false,"zh":"智能原生消费街区"}],"zh":"到发场"},{"anchor_en":"Xiaoyuehe scenario wing","anchor_zh":"小月河场景赋能翼","en":"Down Switch","f0":0.125186,"f1":0.376557,"id":"S2","km":2.45,"mx":-24.2263,"mz":-0.4259,"scenarios":[{"en":"AI+ health service navigation point","id":"SCEN-07","test":false,"zh":"AI+医疗健康服务导航点"},{"en":"Public safety and event operations review","id":"SCEN-11","test":false,"zh":"公共安全与活动运营复核"}],"zh":"下行道岔"},{"anchor_en":"Xueyuan Road link","anchor_zh":"学院路联络段","en":"Running Section","f0":0.376557,"f1":0.508635,"id":"S3","km":1.29,"mx":-5.5714,"mz":-0.9809,"scenarios":[{"en":"Bookable track segment","id":"SCEN-01","test":false,"zh":"可预约轨道段"},{"en":"Low-speed robot delivery validation","id":"SCEN-02","test":true,"zh":"低速机器人配送验证"},{"en":"Autonomous slow-mobility assessment","id":"SCEN-03","test":true,"zh":"自主慢行体验评估"}],"zh":"区间"},{"anchor_en":"Beijing AI origin community","anchor_zh":"北京AI原点社区","en":"Zero-Kilometre Station","f0":0.508635,"f1":0.623112,"id":"S4","km":1.11,"mx":6.4263,"mz":-0.8078,"scenarios":[{"en":"Open-source release hall","id":"SCEN-05","test":false,"zh":"开源发布厅"},{"en":"Global AI Week route start","id":"SCEN-12","test":false,"zh":"全球AI活动周步行路线起点"}],"zh":"零公里站"},{"anchor_en":"Zhongguancun technology service wing","anchor_zh":"中关村科技服务翼","en":"Up Switch","f0":0.623112,"f1":0.782916,"id":"S5","km":1.56,"mx":19.7598,"mz":-0.1279,"scenarios":[{"en":"AI cultural guide along the line","id":"SCEN-06","test":false,"zh":"沿线AI文化导览"},{"en":"Enterprise service copilot counter","id":"SCEN-08","test":false,"zh":"企业服务Copilot窗口"}],"zh":"上行道岔"},{"anchor_en":"Zhongzhiyuan acceleration area","anchor_zh":"众智园AI自主创新加速区","en":"Marshalling Yard","f0":0.782916,"f1":1.0,"id":"S6","km":2.11,"mx":38.0754,"mz":0.9337,"scenarios":[{"en":"Model safety red-team sandbox","id":"SCEN-04","test":true,"zh":"模型安全红队沙盒"}],"zh":"编组场"}],"bbox":{"x0":-48.703,"x1":48.703,"z0":-6.653,"z1":6.653},"cells":[{"band":"S1","cat":"广场用地 Square / platform","code":"1403","color":"#C8452D","h":0.61,"id":"LU-001","name_en":"Arrival Yard / Dazhongsi — Square","name_zh":"到发场·大钟寺·广场用地","ring":[[-48.6371,-1.1633],[-36.4573,-2.0105],[-36.4573,2.1796],[-48.7025,1.8425]],"role":"spine"},{"band":"S1","cat":"商业服务业 Commercial & services","code":"05","color":"#7A5EA8","h":1.7,"id":"LU-002","name_en":"Arrival Yard / Dazhongsi — Commercial and business services","name_zh":"到发场·大钟寺·商业服务业用地","ring":[[-36.4573,-6.0609],[-36.4573,-2.0105],[-48.7025,-1.1621],[-48.7025,-5.8002]],"role":"west_flank"},{"band":"S1","cat":"科研 Research & development","code":"0802","color":"#3B6EA5","h":1.89,"id":"LU-003","name_en":"Arrival Yard / Dazhongsi — Research and development","name_zh":"到发场·大钟寺·科研用地","ring":[[-48.7025,6.6532],[-48.7025,1.8425],[-36.4573,2.1796],[-36.4573,6.6532]],"role":"east_flank"},{"band":"S2","cat":"公园绿地 Park green","code":"1401","color":"#0F5C4A","h":0.4,"id":"LU-004","name_en":"Down Switch / Xiaoyuehe Scenario Wing — Park green","name_zh":"下行道岔·小月河场景赋能翼·公园绿地","ring":[[-36.4142,-2.0127],[-24.1912,-1.4772],[-11.9669,-1.9383],[-11.9669,0.0618],[-24.1912,0.6225],[-36.4573,2.1796]],"role":"spine"},{"band":"S2","cat":"城镇住宅 Urban residential","code":"0701","color":"#C9A227","h":1.26,"id":"LU-005","name_en":"Down Switch / Xiaoyuehe Scenario Wing — Urban residential","name_zh":"下行道岔·小月河场景赋能翼·城镇住宅用地","ring":[[-11.9669,-6.5821],[-11.9669,-1.9383],[-24.1912,-1.4772],[-36.4573,-2.0105],[-36.4573,-6.0609]],"role":"west_flank"},{"band":"S2","cat":"社区服务设施 Community services","code":"0702","color":"#C9A227","h":0.99,"id":"LU-006","name_en":"Down Switch / Xiaoyuehe Scenario Wing — Community service facilities","name_zh":"下行道岔·小月河场景赋能翼·城镇社区服务设施用地","ring":[[-19.7593,6.6532],[-36.4573,6.6532],[-36.4573,2.1796],[-24.1912,0.6225],[-11.9669,0.0618],[-11.9669,6.1755]],"role":"east_flank"},{"band":"S3","cat":"公园绿地 Park green","code":"1401","color":"#0F5C4A","h":0.4,"id":"LU-007","name_en":"Running Section / Xueyuan Road Link — Park green","name_zh":"区间·学院路联络段·公园绿地","ring":[[-11.7136,-1.9577],[0.8349,-2.9178],[0.8349,0.8753],[-11.9669,0.0618],[-11.9669,-1.9383]],"role":"spine"},{"band":"S3","cat":"教育 Education","code":"0804","color":"#3B6EA5","h":1.53,"id":"LU-008","name_en":"Running Section / Xueyuan Road Link — Education","name_zh":"区间·学院路联络段·教育用地","ring":[[-8.6273,-6.6532],[0.8349,-6.1855],[0.8349,-2.9178],[-11.9669,-1.9383],[-11.9669,-6.5821]],"role":"west_flank"},{"band":"S3","cat":"科研 Research & development","code":"0802","color":"#3B6EA5","h":1.89,"id":"LU-009","name_en":"Running Section / Xueyuan Road Link — Research and development","name_zh":"区间·学院路联络段·科研用地","ring":[[-11.9669,6.1755],[-11.9669,0.0618],[0.8349,0.8753],[0.8349,5.3908]],"role":"east_flank"},{"band":"S4","cat":"广场用地 Square / platform","code":"1403","color":"#C8452D","h":0.61,"id":"LU-010","name_en":"Zero-Kilometre Station / Beijing AI Origin Community — Square","name_zh":"零公里站·北京AI原点社区·广场用地","ring":[[1.0186,-2.9173],[11.9669,-2.547],[11.9669,1.3529],[0.8349,0.8753]],"role":"spine"},{"band":"S4","cat":"科研 Research & development","code":"0802","color":"#3B6EA5","h":1.89,"id":"LU-011","name_en":"Zero-Kilometre Station / Beijing AI Origin Community — Research and development","name_zh":"零公里站·北京AI原点社区·科研用地","ring":[[11.9669,-5.6351],[11.9669,-2.547],[0.8349,-2.9178],[0.8349,-6.1855]],"role":"west_flank"},{"band":"S4","cat":"社区服务设施 Community services","code":"0702","color":"#C9A227","h":0.99,"id":"LU-012","name_en":"Zero-Kilometre Station / Beijing AI Origin Community — Community service facilities","name_zh":"零公里站·北京AI原点社区·城镇社区服务设施用地","ring":[[8.0707,4.9473],[0.8349,5.3908],[0.8349,0.8753],[11.9669,1.3529],[11.9669,5.1108]],"role":"east_flank"},{"band":"S5","cat":"公园绿地 Park green","code":"1401","color":"#0F5C4A","h":0.4,"id":"LU-013","name_en":"Up Switch / Zhongguancun Technology Service Wing — Park green","name_zh":"上行道岔·中关村科技服务翼·公园绿地","ring":[[11.9683,-2.547],[27.5517,-1.9545],[27.5517,2.6366],[11.9669,1.3529]],"role":"spine"},{"band":"S5","cat":"商业服务业 Commercial & services","code":"05","color":"#7A5EA8","h":1.7,"id":"LU-014","name_en":"Up Switch / Zhongguancun Technology Service Wing — Commercial and business services","name_zh":"上行道岔·中关村科技服务翼·商业服务业用地","ring":[[25.8819,-4.9473],[27.5517,-4.8848],[27.5517,-1.9545],[11.9669,-2.547],[11.9669,-5.6351]],"role":"west_flank"},{"band":"S5","cat":"科技服务 Technology services","code":"0803","color":"#3B6EA5","h":1.62,"id":"LU-015","name_en":"Up Switch / Zhongguancun Technology Service Wing — Culture","name_zh":"上行道岔·中关村科技服务翼·文化用地","ring":[[11.9669,5.1108],[11.9669,1.3529],[27.5517,2.6366],[27.5517,5.7652]],"role":"east_flank"},{"band":"S6","cat":"广场用地 Square / platform","code":"1403","color":"#C8452D","h":0.61,"id":"LU-016","name_en":"Marshalling Yard / Zhongzhiyuan — Square","name_zh":"编组场·众智园·广场用地","ring":[[27.7563,-1.9298],[38.1967,-0.4588],[48.7025,-0.0225],[48.7025,2.5783],[38.1967,2.3398],[27.5517,2.6366],[27.5517,-1.9545]],"role":"spine"},{"band":"S6","cat":"科研 Research & development","code":"0802","color":"#3B6EA5","h":1.89,"id":"LU-017","name_en":"Marshalling Yard / Zhongzhiyuan — Research and development","name_zh":"编组场·众智园·科研用地","ring":[[48.7025,-4.0943],[48.7025,-0.0225],[38.1967,-0.4588],[27.5517,-1.9545],[27.5517,-4.8848]],"role":"west_flank"},{"band":"S6","cat":"防护绿地 Protective green","code":"1402","color":"#0F5C4A","h":0.32,"id":"LU-018","name_en":"Marshalling Yard / Zhongzhiyuan — Protective green","name_zh":"编组场·众智园·防护绿地","ring":[[27.5517,5.7652],[27.5517,2.6366],[38.1967,2.3398],[48.7025,2.5783],[48.7025,6.6532]],"role":"east_flank"}],"key_outlines":[{"band":"S6","ring":[[27.5517,-3.8384],[27.5517,5.5443],[48.1459,5.5443],[48.1459,-3.8384]]},{"band":"S4","ring":[[0.8349,-4.6914],[0.8349,4.6914],[11.9669,4.6914],[11.9669,-4.6914]]},{"band":"S1","ring":[[-43.1365,-4.6914],[-43.1365,6.3973],[-36.6354,6.3973],[-36.6354,-4.6914]]}],"legend":[{"c":"#0F5C4A","en":"Park green / spine","zh":"公园绿地 / 主脊"},{"c":"#C8452D","en":"Square / platform","zh":"广场·站台用地"},{"c":"#3B6EA5","en":"Research / education / tech services","zh":"科研·教育·科技服务"},{"c":"#7A5EA8","en":"Commercial & services","zh":"商业服务业"},{"c":"#C9A227","en":"Residential & community","zh":"住宅与社区服务"},{"c":"#E08A2E","en":"Switch / wings","zh":"道岔 / 两翼"},{"c":"#B9B4AC","en":"Provisional boundary","zh":"临时粗略边界"}],"line_length_m":9735.7,"links":[{"id":"CROSS-A","kind":"pedestrian","pts":[[-39.7637,-5.9905],[-39.129,0.1551],[-39.7969,6.312]]},{"id":"CROSS-B","kind":"pedestrian","pts":[[-26.9896,-6.2624],[-26.3272,-0.3102],[-26.9951,6.312]]},{"id":"CROSS-C","kind":"cycleway","pts":[[-11.9669,-6.312],[-11.299,-0.9383],[-11.9543,6.1748]]},{"id":"CROSS-D","kind":"pedestrian","pts":[[6.45,-5.9079],[7.0688,-0.8103],[6.52,5.0423]]},{"id":"CROSS-E","kind":"pedestrian","pts":[[19.8746,-5.2442],[20.4272,-0.1279],[19.8496,5.4418]]},{"id":"CROSS-F","kind":"cycleway","pts":[[38.2956,-4.4833],[38.795,0.9383],[38.1398,6.2097]]},{"id":"TRANSIT-1","kind":"transit_connection","pts":[[-43.2478,-3.6484],[-41.4667,0.19],[-39.6856,4.0284]]},{"id":"TRANSIT-2","kind":"transit_connection","pts":[[4.6198,-4.6487],[6.4009,-0.8103],[8.182,3.0281]]},{"id":"TRANSIT-3","kind":"transit_connection","pts":[[35.7894,-2.9315],[37.5705,0.9068],[39.3516,4.7452]]}],"palette":{"dim":"#7C8792","grid":"#DCD8D0","ink":"#12181F","living":"#C9A227","paper":"#F7F5F0","prov":"#B9B4AC","research":"#3B6EA5","service":"#7A5EA8","spine":"#0F5C4A","spine_glow":"#1FA07E","station":"#C8452D","switch":"#E08A2E"},"site_ring":[[-48.7025,-5.8002],[-48.7025,6.6532],[-19.7593,6.6532],[8.0707,4.9473],[48.7025,6.6532],[48.7025,-4.0943],[25.8819,-4.9473],[-8.6273,-6.6532]],"sources":{"constraints.geojson":"a2644841808d","key_areas.geojson":"cadd905b2f1a","land_use.geojson":"ddb8fd599ec0","public_space.geojson":"b3bf50b86b0d","roads.geojson":"7a9982a5946e","site_boundary.geojson":"f54c91eaaaa1"},"spine":[{"f":0.0,"x":-48.6371,"z":0.3398},{"f":0.125575,"x":-36.4142,"z":0.0835},{"f":0.376889,"x":-11.9683,"z":-0.9382},{"f":0.50767,"x":0.7639,"z":-1.0231},{"f":0.622839,"x":11.9683,"z":-0.597},{"f":0.782678,"x":27.5016,"z":0.3382},{"f":0.892706,"x":38.1967,"z":0.9405},{"f":1.0,"x":48.6371,"z":1.2774}],"stations":[{"area_zh":"大钟寺AI产业聚集区","band":"S1","en":"Arrival Yard","f":0.089757,"ha":72.0,"x":-39.886,"z":0.8529,"zh":"到发场"},{"area_zh":"北京AI原点社区","band":"S4","en":"Zero-Kilometre Station","f":0.56593,"ha":104.3,"x":6.4009,"z":0.0,"zh":"零公里站"},{"area_zh":"众智园AI自主创新加速区","band":"S6","en":"Marshalling Yard","f":0.889088,"ha":192.1,"x":37.8488,"z":0.853,"zh":"编组场"}],"switches":[{"band":"S2","en":"Down Switch","f":0.222407,"x":-26.9951,"z":-0.3102,"zh":"下行道岔"},{"band":"S5","en":"Up Switch","f":0.703009,"x":19.7593,"z":-0.1279,"zh":"上行道岔"}],"unit_note":"1 scene unit = 100 m; heights are symbolic, not volumes.","version":"1.2"};

(function () {
  "use strict";
  var DATA = TOKEN_BLOCK_DATA;
  var P = DATA.palette;
  var stage = document.getElementById("stage");
  var labelHost = document.getElementById("labels");
  var overlay = document.getElementById("overlay");
  var ovTitle = document.getElementById("ov-title");
  var ovMsg = document.getElementById("ov-msg");
  var ovImg = document.getElementById("ov-img");
  var spin = document.getElementById("spin");
  var runBtn = document.getElementById("run");
  var resetBtn = document.getElementById("reset");
  var stateEl = document.getElementById("state");
  var bandBody = document.getElementById("band-body");
  var reduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- side panels that work with or without WebGL ---------- */
  var legend = document.getElementById("legend");
  DATA.legend.forEach(function (item) {
    var row = document.createElement("div");
    var sw = document.createElement("i");
    sw.className = "swatch" + (item.zh.indexOf("临时") === 0 ? " dash" : "");
    sw.style.background = item.zh.indexOf("临时") === 0 ? "transparent" : item.c;
    if (item.zh.indexOf("临时") === 0) { sw.style.borderTopColor = item.c; }
    var t = document.createElement("span");
    t.textContent = item.zh + " / " + item.en;
    row.appendChild(sw); row.appendChild(t); legend.appendChild(row);
  });
  document.getElementById("src-line").textContent =
    "数据来源 data: geometry/roads.geojson · land_use.geojson · key_areas.geojson · " +
    "public_space.geojson · constraints.geojson · site_boundary.geojson　|　" +
    "主脊长度 main line " + (DATA.line_length_m / 1000).toFixed(2) + " km（按提交几何计算 " +
    "computed from the submitted geometry）　|　three.js r160 (MIT), bundled locally　|　" +
    "本页无任何网络请求 no network requests";

  function bandById(id) {
    for (var i = 0; i < DATA.bands.length; i++) {
      if (DATA.bands[i].id === id) { return DATA.bands[i]; }
    }
    return null;
  }

  function renderBand(id) {
    var b = id ? bandById(id) : null;
    if (!b) {
      bandBody.innerHTML = '<p style="margin:0;font-size:12px;color:var(--dim)">' +
        '令牌未发出。发出后，令牌所在区间会在此显示名称与场景卡数量。<br>' +
        'No token on the line. Once a token is issued, the section it occupies is shown here ' +
        'with its scenario-card count.</p>';
      return;
    }
    var n = b.scenarios.length;
    var html = '<div class="band-hd"><span class="band-code" style="color:' + P.station +
      '">' + b.id + '</span><span class="band-zh">' + b.zh + '</span>' +
      '<span class="band-en">' + b.en + '</span></div>' +
      '<p class="band-meta">' + b.anchor_zh + ' / ' + b.anchor_en + '　·　区间长度 section ' +
      b.km.toFixed(2) + ' km</p>' +
      '<div class="count"><b style="color:' + P.station + '">' + n + '</b>' +
      '<span>个场景卡 scenario cards（本区间 in this section）</span></div><ul class="scen">';
    for (var i = 0; i < n; i++) {
      var s = b.scenarios[i];
      html += '<li class="' + (s.test ? "test" : "") + '">' + s.zh +
        (s.test ? '<span class="chip">产业测试 test scenario</span>' : "") +
        '<em>' + s.en + '</em></li>';
    }
    html += '</ul><p style="margin:8px 0 0;font-size:10.5px;color:var(--dim)">' +
      '场景为概念建议，须人工复核，未获批准运营。Scenarios are conceptual, require human review, ' +
      'and are not approved operations.</p>';
    bandBody.innerHTML = html;
  }
  renderBand(null);

  function fail(titleTxt, msgTxt) {
    spin.style.display = "none";
    ovTitle.textContent = titleTxt;
    ovMsg.textContent = msgTxt;
    ovImg.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NjAiIGhlaWdodD0iNTYwIiB2aWV3Qm94PSIwIDAgOTYwIDU2MCIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLEhpcmFnaW5vIFNhbnMgR0IsSGVpdGkgU0MsTWljcm9zb2Z0IFlhSGVpLEhlbHZldGljYSBOZXVlLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmIj48cmVjdCB3aWR0aD0iOTYwIiBoZWlnaHQ9IjU2MCIgZmlsbD0iI0Y3RjVGMCIvPjx0ZXh0IHg9IjQwIiB5PSI0NiIgZm9udC1zaXplPSIyMSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzEyMTgxRiI+5Lqs5byg5Luk54mMIMK3IOmdmeaAgeS/r+inhuWbvu+8iOS6pOS6kuWcuuaZr+eahOWbnumAgOeJiOacrO+8iTwvdGV4dD48dGV4dCB4PSI0MCIgeT0iNzAiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM3Qzg3OTIiPlRva2VuIEJsb2NrIOKAlCBzdGF0aWMgdG9wIHZpZXcsIGZhbGxiYWNrIGZvciB0aGUgaW50ZXJhY3RpdmUgc2NlbmU8L3RleHQ+PHRleHQgeD0iNDAiIHk9Ijk0IiBmb250LXNpemU9IjEyIiBmaWxsPSIjN0M4NzkyIj7ljZcgU291dGgg4oaQ44CA5Li757q/IE1haW4gbGluZeOAgOKGkiDljJcgTm9ydGjjgIDCt+OAgOWFreautSBTMeKAk1M2IC8g5LiJ56uZIDMgc3RhdGlvbnMgLyDkuKTlspQgMiBzd2l0Y2hlczwvdGV4dD48bGluZSB4MT0iNDAiIHkxPSIxMDgiIHgyPSI5MjAiIHkyPSIxMDgiIHN0cm9rZT0iI0RDRDhEMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBvbHlnb24gcG9pbnRzPSI0MC42LDE5OS42IDE1MC42MywxOTEuOTQgMTUwLjYzLDIyOS44IDQwLjAsMjI2Ljc1IiBmaWxsPSIjQzg0NTJEIiBmaWxsLW9wYWNpdHk9IjAuNzIiIHN0cm9rZT0iI0Y3RjVGMCIgc3Ryb2tlLXdpZHRoPSIwLjYiLz48cG9seWdvbiBwb2ludHM9IjE1MC42MywxNTUuMzUgMTUwLjYzLDE5MS45NCA0MC4wLDE5OS42MSA0MC4wLDE1Ny43IiBmaWxsPSIjN0E1RUE4IiBmaWxsLW9wYWNpdHk9IjAuNzIiIHN0cm9rZT0iI0Y3RjVGMCIgc3Ryb2tlLXdpZHRoPSIwLjYiLz48cG9seWdvbiBwb2ludHM9IjQwLjAsMjcwLjIxIDQwLjAsMjI2Ljc1IDE1MC42MywyMjkuOCAxNTAuNjMsMjcwLjIxIiBmaWxsPSIjM0I2RUE1IiBmaWxsLW9wYWNpdHk9IjAuNzIiIHN0cm9rZT0iI0Y3RjVGMCIgc3Ryb2tlLXdpZHRoPSIwLjYiLz48cG9seWdvbiBwb2ludHM9IjE1MS4wMiwxOTEuOTIgMjYxLjQ1LDE5Ni43NiAzNzEuODksMTkyLjU5IDM3MS44OSwyMTAuNjYgMjYxLjQ1LDIxNS43MyAxNTAuNjMsMjI5LjgiIGZpbGw9IiMwRjVDNEEiIGZpbGwtb3BhY2l0eT0iMC43MiIgc3Ryb2tlPSIjRjdGNUYwIiBzdHJva2Utd2lkdGg9IjAuNiIvPjxwb2x5Z29uIHBvaW50cz0iMzcxLjg5LDE1MC42NCAzNzEuODksMTkyLjU5IDI2MS40NSwxOTYuNzYgMTUwLjYzLDE5MS45NCAxNTAuNjMsMTU1LjM1IiBmaWxsPSIjQzlBMjI3IiBmaWxsLW9wYWNpdHk9IjAuNzIiIHN0cm9rZT0iI0Y3RjVGMCIgc3Ryb2tlLXdpZHRoPSIwLjYiLz48cG9seWdvbiBwb2ludHM9IjMwMS40OSwyNzAuMjEgMTUwLjYzLDI3MC4yMSAxNTAuNjMsMjI5LjggMjYxLjQ1LDIxNS43MyAzNzEuODksMjEwLjY2IDM3MS44OSwyNjUuOSIgZmlsbD0iI0M5QTIyNyIgZmlsbC1vcGFjaXR5PSIwLjcyIiBzdHJva2U9IiNGN0Y1RjAiIHN0cm9rZS13aWR0aD0iMC42Ii8+PHBvbHlnb24gcG9pbnRzPSIzNzQuMTgsMTkyLjQyIDQ4Ny41NCwxODMuNzUgNDg3LjU0LDIxOC4wMSAzNzEuODksMjEwLjY2IDM3MS44OSwxOTIuNTkiIGZpbGw9IiMwRjVDNEEiIGZpbGwtb3BhY2l0eT0iMC43MiIgc3Ryb2tlPSIjRjdGNUYwIiBzdHJva2Utd2lkdGg9IjAuNiIvPjxwb2x5Z29uIHBvaW50cz0iNDAyLjA2LDE1MC4wIDQ4Ny41NCwxNTQuMjIgNDg3LjU0LDE4My43NSAzNzEuODksMTkyLjU5IDM3MS44OSwxNTAuNjQiIGZpbGw9IiMzQjZFQTUiIGZpbGwtb3BhY2l0eT0iMC43MiIgc3Ryb2tlPSIjRjdGNUYwIiBzdHJva2Utd2lkdGg9IjAuNiIvPjxwb2x5Z29uIHBvaW50cz0iMzcxLjg5LDI2NS45IDM3MS44OSwyMTAuNjYgNDg3LjU0LDIxOC4wMSA0ODcuNTQsMjU4LjgxIiBmaWxsPSIjM0I2RUE1IiBmaWxsLW9wYWNpdHk9IjAuNzIiIHN0cm9rZT0iI0Y3RjVGMCIgc3Ryb2tlLXdpZHRoPSIwLjYiLz48cG9seWdvbiBwb2ludHM9IjQ4OS4yLDE4My43NSA1ODguMTEsMTg3LjEgNTg4LjExLDIyMi4zMyA0ODcuNTQsMjE4LjAxIiBmaWxsPSIjQzg0NTJEIiBmaWxsLW9wYWNpdHk9IjAuNzIiIHN0cm9rZT0iI0Y3RjVGMCIgc3Ryb2tlLXdpZHRoPSIwLjYiLz48cG9seWdvbiBwb2ludHM9IjU4OC4xMSwxNTkuMiA1ODguMTEsMTg3LjEgNDg3LjU0LDE4My43NSA0ODcuNTQsMTU0LjIyIiBmaWxsPSIjM0I2RUE1IiBmaWxsLW9wYWNpdHk9IjAuNzIiIHN0cm9rZT0iI0Y3RjVGMCIgc3Ryb2tlLXdpZHRoPSIwLjYiLz48cG9seWdvbiBwb2ludHM9IjU1Mi45MSwyNTQuOCA0ODcuNTQsMjU4LjgxIDQ4Ny41NCwyMTguMDEgNTg4LjExLDIyMi4zMyA1ODguMTEsMjU2LjI4IiBmaWxsPSIjQzlBMjI3IiBmaWxsLW9wYWNpdHk9IjAuNzIiIHN0cm9rZT0iI0Y3RjVGMCIgc3Ryb2tlLXdpZHRoPSIwLjYiLz48cG9seWdvbiBwb2ludHM9IjU4OC4xMywxODcuMSA3MjguOTEsMTkyLjQ1IDcyOC45MSwyMzMuOTMgNTg4LjExLDIyMi4zMyIgZmlsbD0iIzBGNUM0QSIgZmlsbC1vcGFjaXR5PSIwLjcyIiBzdHJva2U9IiNGN0Y1RjAiIHN0cm9rZS13aWR0aD0iMC42Ii8+PHBvbHlnb24gcG9pbnRzPSI3MTMuODMsMTY1LjQxIDcyOC45MSwxNjUuOTcgNzI4LjkxLDE5Mi40NSA1ODguMTEsMTg3LjEgNTg4LjExLDE1OS4yIiBmaWxsPSIjN0E1RUE4IiBmaWxsLW9wYWNpdHk9IjAuNzIiIHN0cm9rZT0iI0Y3RjVGMCIgc3Ryb2tlLXdpZHRoPSIwLjYiLz48cG9seWdvbiBwb2ludHM9IjU4OC4xMSwyNTYuMjggNTg4LjExLDIyMi4zMyA3MjguOTEsMjMzLjkzIDcyOC45MSwyNjIuMTkiIGZpbGw9IiMzQjZFQTUiIGZpbGwtb3BhY2l0eT0iMC43MiIgc3Ryb2tlPSIjRjdGNUYwIiBzdHJva2Utd2lkdGg9IjAuNiIvPjxwb2x5Z29uIHBvaW50cz0iNzMwLjc2LDE5Mi42NyA4MjUuMDgsMjA1Ljk2IDkyMC4wLDIwOS45IDkyMC4wLDIzMy40IDgyNS4wOCwyMzEuMjQgNzI4LjkxLDIzMy45MyA3MjguOTEsMTkyLjQ1IiBmaWxsPSIjQzg0NTJEIiBmaWxsLW9wYWNpdHk9IjAuNzIiIHN0cm9rZT0iI0Y3RjVGMCIgc3Ryb2tlLXdpZHRoPSIwLjYiLz48cG9seWdvbiBwb2ludHM9IjkyMC4wLDE3My4xMiA5MjAuMCwyMDkuOSA4MjUuMDgsMjA1Ljk2IDcyOC45MSwxOTIuNDUgNzI4LjkxLDE2NS45NyIgZmlsbD0iIzNCNkVBNSIgZmlsbC1vcGFjaXR5PSIwLjcyIiBzdHJva2U9IiNGN0Y1RjAiIHN0cm9rZS13aWR0aD0iMC42Ii8+PHBvbHlnb24gcG9pbnRzPSI3MjguOTEsMjYyLjE5IDcyOC45MSwyMzMuOTMgODI1LjA4LDIzMS4yNCA5MjAuMCwyMzMuNCA5MjAuMCwyNzAuMjEiIGZpbGw9IiMwRjVDNEEiIGZpbGwtb3BhY2l0eT0iMC43MiIgc3Ryb2tlPSIjRjdGNUYwIiBzdHJva2Utd2lkdGg9IjAuNiIvPjxwb2x5bGluZSBwb2ludHM9IjQwLjAsMTU3LjcgNDAuMCwyNzAuMjEgMzAxLjQ5LDI3MC4yMSA1NTIuOTEsMjU0LjggOTIwLjAsMjcwLjIxIDkyMC4wLDE3My4xMiA3MTMuODMsMTY1LjQxIDQwMi4wNiwxNTAuMCA0MC4wLDE1Ny43IiBmaWxsPSJub25lIiBzdHJva2U9IiNCOUI0QUMiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtZGFzaGFycmF5PSI2IDQiLz48cG9seWxpbmUgcG9pbnRzPSI0MC42LDIxMy4xOCAxNTEuMDIsMjEwLjg2IDM3MS44NywyMDEuNjMgNDg2LjksMjAwLjg2IDU4OC4xMywyMDQuNzEgNzI4LjQ2LDIxMy4xNiA4MjUuMDgsMjE4LjYgOTE5LjQsMjIxLjY1IiBmaWxsPSJub25lIiBzdHJva2U9IiMwRjVDNEEiIHN0cm9rZS13aWR0aD0iMi42IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48bGluZSB4MT0iNDAuNiIgeTE9IjI3NC4yMTEwNzUyOTMxMDMxIiB4Mj0iNDAuNiIgeTI9IjI4Mi4yMTEwNzUyOTMxMDMxIiBzdHJva2U9IiNCOUI0QUMiIHN0cm9rZS13aWR0aD0iMSIvPjx0ZXh0IHg9Ijk1LjY0IiB5PSIyOTIuMjExMDc1MjkzMTAzMSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzdDODc5MiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzEg5Yiw5Y+R5Zy6IMK3IDEuMjIga208L3RleHQ+PGxpbmUgeDE9IjE1MC42OCIgeTE9IjI3NC4yMTEwNzUyOTMxMDMxIiB4Mj0iMTUwLjY4IiB5Mj0iMjgyLjIxMTA3NTI5MzEwMzEiIHN0cm9rZT0iI0I5QjRBQyIgc3Ryb2tlLXdpZHRoPSIxIi8+PHRleHQgeD0iMjYxLjEzIiB5PSIyOTIuMjExMDc1MjkzMTAzMSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzdDODc5MiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzIg5LiL6KGM6YGT5bKUIMK3IDIuNDUga208L3RleHQ+PGxpbmUgeDE9IjM3MS41OCIgeTE9IjI3NC4yMTEwNzUyOTMxMDMxIiB4Mj0iMzcxLjU4IiB5Mj0iMjgyLjIxMTA3NTI5MzEwMzEiIHN0cm9rZT0iI0I5QjRBQyIgc3Ryb2tlLXdpZHRoPSIxIi8+PHRleHQgeD0iNDI5LjY2NDk5OTk5OTk5OTk2IiB5PSIyOTIuMjExMDc1MjkzMTAzMSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzdDODc5MiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzMg5Yy66Ze0IMK3IDEuMjkga208L3RleHQ+PGxpbmUgeDE9IjQ4Ny43NSIgeTE9IjI3NC4yMTEwNzUyOTMxMDMxIiB4Mj0iNDg3Ljc1IiB5Mj0iMjgyLjIxMTA3NTI5MzEwMzEiIHN0cm9rZT0iI0I5QjRBQyIgc3Ryb2tlLXdpZHRoPSIxIi8+PHRleHQgeD0iNTM4LjA2IiB5PSIyOTIuMjExMDc1MjkzMTAzMSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzdDODc5MiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzQg6Zu25YWs6YeM56uZIMK3IDEuMTEga208L3RleHQ+PGxpbmUgeDE9IjU4OC4zNyIgeTE9IjI3NC4yMTEwNzUyOTMxMDMxIiB4Mj0iNTg4LjM3IiB5Mj0iMjgyLjIxMTA3NTI5MzEwMzEiIHN0cm9rZT0iI0I5QjRBQyIgc3Ryb2tlLXdpZHRoPSIxIi8+PHRleHQgeD0iNjU4LjUyIiB5PSIyOTIuMjExMDc1MjkzMTAzMSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzdDODc5MiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzUg5LiK6KGM6YGT5bKUIMK3IDEuNTYga208L3RleHQ+PGxpbmUgeDE9IjcyOC42NyIgeTE9IjI3NC4yMTEwNzUyOTMxMDMxIiB4Mj0iNzI4LjY3IiB5Mj0iMjgyLjIxMTA3NTI5MzEwMzEiIHN0cm9rZT0iI0I5QjRBQyIgc3Ryb2tlLXdpZHRoPSIxIi8+PHRleHQgeD0iODI0LjAzNSIgeT0iMjkyLjIxMTA3NTI5MzEwMzEiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM3Qzg3OTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlM2IOe8lue7hOWcuiDCtyAyLjExIGttPC90ZXh0Pjxwb2x5Z29uIHBvaW50cz0iMjM2LjEyLDE5OC4zIDI0NS4xMiwyMDcuMyAyMzYuMTIsMjE2LjMgMjI3LjEyLDIwNy4zIiBmaWxsPSIjRTA4QTJFIiBzdHJva2U9IiMxMjE4MUYiIHN0cm9rZS13aWR0aD0iMSIvPjx0ZXh0IHg9IjIzNi4xMiIgeT0iMTM2IiBmb250LXNpemU9IjEyIiBmaWxsPSIjMTIxODFGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TMiDkuIvooYzpgZPlspQ8L3RleHQ+PGxpbmUgeDE9IjIzNi4xMiIgeTE9IjE0MCIgeDI9IjIzNi4xMiAiIHkyPSIxOTcuMyIgc3Ryb2tlPSIjRTA4QTJFIiBzdHJva2Utd2lkdGg9IjEiLz48cG9seWdvbiBwb2ludHM9IjY1OC41MSwxOTkuOTUgNjY3LjUxLDIwOC45NSA2NTguNTEsMjE3Ljk1IDY0OS41MSwyMDguOTUiIGZpbGw9IiNFMDhBMkUiIHN0cm9rZT0iIzEyMTgxRiIgc3Ryb2tlLXdpZHRoPSIxIi8+PHRleHQgeD0iNjU4LjUxIiB5PSIxMzYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMxMjE4MUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlM1IOS4iuihjOmBk+WylDwvdGV4dD48bGluZSB4MT0iNjU4LjUxIiB5MT0iMTQwIiB4Mj0iNjU4LjUxICIgeTI9IjE5OC45NSIgc3Ryb2tlPSIjRTA4QTJFIiBzdHJva2Utd2lkdGg9IjEiLz48Y2lyY2xlIGN4PSIxMTkuNjYiIGN5PSIyMTcuODEiIHI9IjgiIGZpbGw9IiNDODQ1MkQiIHN0cm9rZT0iI0Y3RjVGMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGxpbmUgeDE9IjExOS42NiIgeTE9IjIyNy44MSIgeDI9IjExOS42NiIgeTI9IjI5Ni4yMTEwNzUyOTMxMDMxIiBzdHJva2U9IiNDODQ1MkQiIHN0cm9rZS13aWR0aD0iMSIvPjx0ZXh0IHg9IjQwIiB5PSIzMTguMjExMDc1MjkzMTAzMSIgZm9udC1zaXplPSIxNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0M4NDUyRCIgdGV4dC1hbmNob3I9InN0YXJ0Ij5TMSDliLDlj5HlnLo8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjMzNy4yMTEwNzUyOTMxMDMxIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMTIxODFGIiB0ZXh0LWFuY2hvcj0ic3RhcnQiPkFycml2YWwgWWFyZDwvdGV4dD48dGV4dCB4PSI0MCIgeT0iMzU0LjIxMTA3NTI5MzEwMzEiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM3Qzg3OTIiIHRleHQtYW5jaG9yPSJzdGFydCI+5aSn6ZKf5a+6QUnkuqfkuJrogZrpm4bljLogwrcg5YWs5ZGK57qmIDcyLjAgaGE8L3RleHQ+PGNpcmNsZSBjeD0iNTM3LjgzIiBjeT0iMjEwLjExIiByPSI4IiBmaWxsPSIjQzg0NTJEIiBzdHJva2U9IiNGN0Y1RjAiIHN0cm9rZS13aWR0aD0iMiIvPjxsaW5lIHgxPSI1MzcuODMiIHkxPSIyMjAuMTEiIHgyPSI1MzcuODMiIHkyPSIyOTYuMjExMDc1MjkzMTAzMSIgc3Ryb2tlPSIjQzg0NTJEIiBzdHJva2Utd2lkdGg9IjEiLz48dGV4dCB4PSI1MzcuODMiIHk9IjMxOC4yMTEwNzUyOTMxMDMxIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjQzg0NTJEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TNCDpm7blhazph4znq5k8L3RleHQ+PHRleHQgeD0iNTM3LjgzIiB5PSIzMzcuMjExMDc1MjkzMTAzMSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzEyMTgxRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+WmVyby1LaWxvbWV0cmUgU3RhdGlvbjwvdGV4dD48dGV4dCB4PSI1MzcuODMiIHk9IjM1NC4yMTEwNzUyOTMxMDMxIiBmb250LXNpemU9IjExIiBmaWxsPSIjN0M4NzkyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7ljJfkuqxBSeWOn+eCueekvuWMuiDCtyDlhazlkYrnuqYgMTA0LjMgaGE8L3RleHQ+PGNpcmNsZSBjeD0iODIxLjk0IiBjeT0iMjE3LjgxIiByPSI4IiBmaWxsPSIjQzg0NTJEIiBzdHJva2U9IiNGN0Y1RjAiIHN0cm9rZS13aWR0aD0iMiIvPjxsaW5lIHgxPSI4MjEuOTQiIHkxPSIyMjcuODEiIHgyPSI4MjEuOTQiIHkyPSIyOTYuMjExMDc1MjkzMTAzMSIgc3Ryb2tlPSIjQzg0NTJEIiBzdHJva2Utd2lkdGg9IjEiLz48dGV4dCB4PSI5MjAiIHk9IjMxOC4yMTEwNzUyOTMxMDMxIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjQzg0NTJEIiB0ZXh0LWFuY2hvcj0iZW5kIj5TNiDnvJbnu4TlnLo8L3RleHQ+PHRleHQgeD0iOTIwIiB5PSIzMzcuMjExMDc1MjkzMTAzMSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzEyMTgxRiIgdGV4dC1hbmNob3I9ImVuZCI+TWFyc2hhbGxpbmcgWWFyZDwvdGV4dD48dGV4dCB4PSI5MjAiIHk9IjM1NC4yMTEwNzUyOTMxMDMxIiBmb250LXNpemU9IjExIiBmaWxsPSIjN0M4NzkyIiB0ZXh0LWFuY2hvcj0iZW5kIj7kvJfmmbrlm61BSeiHquS4u+WIm+aWsOWKoOmAn+WMuiDCtyDlhazlkYrnuqYgMTkyLjEgaGE8L3RleHQ+PGxpbmUgeDE9IjQwIiB5MT0iMzYyLjIxMTA3NTI5MzEwMzEiIHgyPSI5MjAiIHkyPSIzNjIuMjExMDc1MjkzMTAzMSIgc3Ryb2tlPSIjRENEOEQwIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI0MCIgeT0iMzc1LjIxMTA3NTI5MzEwMzEiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0iIzBGNUM0QSIvPjx0ZXh0IHg9IjU2IiB5PSIzODQuMjExMDc1MjkzMTAzMSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzEyMTgxRiI+5YWs5Zut57u/5ZywIC8g5Li76ISKPC90ZXh0PjxyZWN0IHg9IjE1NS4zOCIgeT0iMzc1LjIxMTA3NTI5MzEwMzEiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0iI0M4NDUyRCIvPjx0ZXh0IHg9IjE3MS4zOCIgeT0iMzg0LjIxMTA3NTI5MzEwMzEiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiMxMjE4MUYiPuW5v+WcusK356uZ5Y+w55So5ZywPC90ZXh0PjxyZWN0IHg9IjI1Ny4xMiIgeT0iMzc1LjIxMTA3NTI5MzEwMzEiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0iIzNCNkVBNSIvPjx0ZXh0IHg9IjI3My4xMiIgeT0iMzg0LjIxMTA3NTI5MzEwMzEiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiMxMjE4MUYiPuenkeeglMK35pWZ6IKywrfnp5HmioDmnI3liqE8L3RleHQ+PHJlY3QgeD0iMzc5LjMyIiB5PSIzNzUuMjExMDc1MjkzMTAzMSIgd2lkdGg9IjExIiBoZWlnaHQ9IjExIiBmaWxsPSIjN0E1RUE4Ii8+PHRleHQgeD0iMzk1LjMyIiB5PSIzODQuMjExMDc1MjkzMTAzMSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzEyMTgxRiI+5ZWG5Lia5pyN5Yqh5LiaPC90ZXh0PjxyZWN0IHg9IjQ2Ny40MTk5OTk5OTk5OTk5NiIgeT0iMzc1LjIxMTA3NTI5MzEwMzEiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgZmlsbD0iI0M5QTIyNyIvPjx0ZXh0IHg9IjQ4My40MTk5OTk5OTk5OTk5NiIgeT0iMzg0LjIxMTA3NTI5MzEwMzEiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiMxMjE4MUYiPuS9j+WuheS4juekvuWMuuacjeWKoTwvdGV4dD48cmVjdCB4PSI1NjkuMTYiIHk9IjM3NS4yMTEwNzUyOTMxMDMxIiB3aWR0aD0iMTEiIGhlaWdodD0iMTEiIGZpbGw9IiNFMDhBMkUiLz48dGV4dCB4PSI1ODUuMTYiIHk9IjM4NC4yMTEwNzUyOTMxMDMxIiBmb250LXNpemU9IjExIiBmaWxsPSIjMTIxODFGIj7pgZPlspQgLyDkuKTnv7w8L3RleHQ+PGxpbmUgeDE9IjY3MC45IiB5MT0iMzgwLjIxMTA3NTI5MzEwMzEiIHgyPSI2ODEuOSIgeTI9IjM4MC4yMTEwNzUyOTMxMDMxIiBzdHJva2U9IiNCOUI0QUMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iMyAyIi8+PHRleHQgeD0iNjg2LjkiIHk9IjM4NC4yMTEwNzUyOTMxMDMxIiBmb250LXNpemU9IjExIiBmaWxsPSIjMTIxODFGIj7kuLTml7bnspfnlaXovrnnlYw8L3RleHQ+PHRleHQgeD0iNDAiIHk9IjUzNCIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzdDODc5MiI+5qaC5b+156S65oSPIGNvbmNlcHR1YWwgwrcg6auY5bqm5LiO6Imy5b2p5Li656S65oSP56ym5Y+377yM6Z2e5bu6562R5L2T6YeP5oiW5o6n6KeE5oyH5qCHIC8gSGVpZ2h0cyBhbmQgY29sb3VycyBhcmUgc3ltYm9saWMsIG5vdCB2b2x1bWVzIG9yIHBsYW5uaW5nIGluZGljYXRvcnMuPC90ZXh0Pjx0ZXh0IHg9IjQwIiB5PSI1NTAiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM3Qzg3OTIiPuW6leWbvuS4uuS4tOaXtueyl+eVpei+ueeVjO+8iHByb3Zpc2lvbmFs77yJ77yM5LiN5b6X5L2c5Li65a6Y5pa557qi57q/5oiW57K+56Gu6Z2i56ev5L6d5o2uIC8gQmFzZSBib3VuZGFyeSBpcyBwcm92aXNpb25hbDsgbm90IGFuIG9mZmljaWFsIHJlZGxpbmUuPC90ZXh0Pjwvc3ZnPg==";
    ovImg.hidden = false;
    overlay.classList.remove("hidden");
    runBtn.disabled = true;
    resetBtn.disabled = true;
  }

  var THREE = window.THREE;
  if (!THREE) {
    fail("三维场景不可用 3D scene unavailable",
      "本地 three.js 未能载入（visual/assets/three-0.160.0.min.js 缺失或被拦截）；以下为静态俯视图。 " +
      "The locally bundled three.js could not load; the static top view is shown instead.");
    return;
  }
  try {
    var probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) { throw new Error("no webgl"); }
  } catch (e) {
    fail("浏览器不支持 WebGL / WebGL unavailable",
      "当前浏览器或设备未提供 WebGL 上下文，已切换为静态俯视图。 This browser or device provides no " +
      "WebGL context; the static top view is shown instead.");
    return;
  }

  /* ---------------------------------------------------------------- scene */
  var renderer, scene, camera;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch (e2) {
    fail("三维渲染初始化失败 renderer failed",
      "WebGL 渲染器初始化失败，已切换为静态俯视图。 The WebGL renderer failed to start; the static " +
      "top view is shown instead.");
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight, false);
  stage.insertBefore(renderer.domElement, labelHost);
  renderer.domElement.setAttribute("aria-hidden", "true");

  scene = new THREE.Scene();
  scene.background = new THREE.Color(P.paper);
  camera = new THREE.PerspectiveCamera(42, Math.max(stage.clientWidth, 1) /
    Math.max(stage.clientHeight, 1), 0.5, 900);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xa8a49b, 2.1));
  var sun = new THREE.DirectionalLight(0xffffff, 1.5);
  sun.position.set(40, 70, 30);
  scene.add(sun);
  var rim = new THREE.DirectionalLight(0xffffff, 0.5);
  rim.position.set(-50, 30, -40);
  scene.add(rim);

  var bb = DATA.bbox;
  var cx = (bb.x0 + bb.x1) / 2, cz = (bb.z0 + bb.z1) / 2;
  var spanX = bb.x1 - bb.x0, spanZ = bb.z1 - bb.z0;
  var center = new THREE.Vector3(cx, 0, cz);

  /* ground strip + a technical grid at 500 m spacing */
  var GW = spanX * 1.10, GD = spanZ * 2.4;
  var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(GW, GD),
    new THREE.MeshBasicMaterial({ color: 0xEFEBE4 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(cx, -0.02, cz);
  scene.add(ground);
  var gridPts = [];
  var STEP = 5; /* 5 scene units = 500 m */
  for (var gx = -Math.floor(GW / 2 / STEP) * STEP; gx <= GW / 2; gx += STEP) {
    gridPts.push(new THREE.Vector3(cx + gx, 0, cz - GD / 2),
                 new THREE.Vector3(cx + gx, 0, cz + GD / 2));
  }
  for (var gz = -Math.floor(GD / 2 / STEP) * STEP; gz <= GD / 2; gz += STEP) {
    gridPts.push(new THREE.Vector3(cx - GW / 2, 0, cz + gz),
                 new THREE.Vector3(cx + GW / 2, 0, cz + gz));
  }
  scene.add(new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(gridPts),
    new THREE.LineBasicMaterial({ color: new THREE.Color(P.grid),
      transparent: true, opacity: 0.75 })));

  function shapeFromRing(ring) {
    var s = new THREE.Shape();
    s.moveTo(ring[0][0], -ring[0][1]);
    for (var i = 1; i < ring.length; i++) { s.lineTo(ring[i][0], -ring[i][1]); }
    s.closePath();
    return s;
  }

  /* six section bands, extruded to symbolic heights */
  var bandGroups = {};
  DATA.bands.forEach(function (b) {
    var g = new THREE.Group();
    g.userData.base = 1;
    scene.add(g);
    bandGroups[b.id] = g;
  });
  var bandMats = {};
  DATA.cells.forEach(function (cell) {
    var geo = new THREE.ExtrudeGeometry(shapeFromRing(cell.ring),
      { depth: cell.h, bevelEnabled: false, curveSegments: 1 });
    geo.rotateX(-Math.PI / 2);
    var mat = new THREE.MeshLambertMaterial({
      color: new THREE.Color(cell.color), emissive: new THREE.Color(cell.color),
      emissiveIntensity: 0.0, flatShading: true
    });
    var mesh = new THREE.Mesh(geo, mat);
    bandGroups[cell.band].add(mesh);
    (bandMats[cell.band] = bandMats[cell.band] || []).push(mat);
    var edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25),
      new THREE.LineBasicMaterial({ color: new THREE.Color(P.ink),
        transparent: true, opacity: 0.16 }));
    bandGroups[cell.band].add(edges);
  });

  /* provisional outlines — dashed, low contrast, never a filled block */
  function dashedLoop(ring, colour, y, dash, gap) {
    var pts = ring.map(function (p) { return new THREE.Vector3(p[0], y, p[1]); });
    pts.push(pts[0].clone());
    var g = new THREE.BufferGeometry().setFromPoints(pts);
    var l = new THREE.Line(g, new THREE.LineDashedMaterial({
      color: new THREE.Color(colour), dashSize: dash, gapSize: gap,
      transparent: true, opacity: 0.9 }));
    l.computeLineDistances();
    scene.add(l);
    return l;
  }
  dashedLoop(DATA.site_ring, P.prov, 0.03, 0.55, 0.42);
  /* the three key areas float just above the symbolic massing so their provisional extent
     stays readable without ever becoming a filled block */
  DATA.key_outlines.forEach(function (k) { dashedLoop(k.ring, P.prov, 0.06, 0.32, 0.24); });

  /* east-west stitches and transit connectors, as thin context lines */
  DATA.links.forEach(function (lk) {
    var pts = lk.pts.map(function (p) { return new THREE.Vector3(p[0], 0.06, p[1]); });
    var mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(lk.kind === "transit_connection" ? P.dim : P.ink),
      transparent: true, opacity: lk.kind === "transit_connection" ? 0.5 : 0.35 });
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  });

  /* the main line: a glowing green spine, riding just clear of the section bands so the
     line always reads as the product */
  var SPINE_Y = 1.75;
  var spinePts = DATA.spine.map(function (p) { return new THREE.Vector3(p.x, SPINE_Y, p.z); });
  var curve = new THREE.CatmullRomCurve3(spinePts, false, "catmullrom", 0.02);
  var tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, Math.min(spinePts.length * 2, 600), 0.22, 8, false),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(P.spine_glow) }));
  scene.add(tube);
  var glow = new THREE.Mesh(
    new THREE.TubeGeometry(curve, Math.min(spinePts.length * 2, 600), 0.55, 8, false),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(P.spine_glow),
      transparent: true, opacity: 0.17 }));
  scene.add(glow);

  /* stations (red) and switches (orange diamonds) */
  var markers = [];
  DATA.stations.forEach(function (st) {
    /* a station is where the line opens: mark it on the line, not on the ground */
    var ring = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.92, 32),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(P.station),
        side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(st.x, SPINE_Y + 0.01, st.z);
    scene.add(ring);
    var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.7, 8),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(P.ink) }));
    mast.position.set(st.x, SPINE_Y + 0.85, st.z);
    scene.add(mast);
    var head = new THREE.Mesh(new THREE.SphereGeometry(0.48, 18, 14),
      new THREE.MeshLambertMaterial({ color: new THREE.Color(P.station),
        emissive: new THREE.Color(P.station), emissiveIntensity: 0.45 }));
    head.position.set(st.x, SPINE_Y + 1.9, st.z);
    scene.add(head);
    markers.push({ kind: "st", pos: new THREE.Vector3(st.x, SPINE_Y + 2.6, st.z),
      html: "<b>" + st.band + " " + st.zh + "</b> " + st.en, rank: 0 });
  });
  DATA.switches.forEach(function (sw) {
    var stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.1, 8),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(P.switch) }));
    stalk.position.set(sw.x, SPINE_Y + 0.55, sw.z);
    scene.add(stalk);
    var dia = new THREE.Mesh(new THREE.OctahedronGeometry(0.58),
      new THREE.MeshLambertMaterial({ color: new THREE.Color(P.switch),
        emissive: new THREE.Color(P.switch), emissiveIntensity: 0.3, flatShading: true }));
    dia.position.set(sw.x, SPINE_Y + 1.5, sw.z);
    scene.add(dia);
    markers.push({ kind: "sw", pos: new THREE.Vector3(sw.x, SPINE_Y + 2.2, sw.z),
      html: "<b>" + sw.band + " " + sw.zh + "</b> " + sw.en, rank: 1 });
  });
  DATA.bands.forEach(function (b) {
    markers.push({ kind: "band", pos: new THREE.Vector3(b.mx, 0.45, bb.z0 - 5.0),
      html: "<b>" + b.id + "</b> " + b.zh, rank: 3 });
  });
  markers.push({ kind: "dir", pos: new THREE.Vector3(bb.x0 - 4.5, 1.6, cz),
    html: "南 SOUTH", rank: 2 });
  markers.push({ kind: "dir", pos: new THREE.Vector3(bb.x1 + 4.5, 1.6, cz),
    html: "NORTH 北", rank: 2 });

  var labelEls = markers.map(function (m) {
    var el = document.createElement("div");
    el.className = "lab " + m.kind;
    el.innerHTML = m.html;
    labelHost.appendChild(el);
    return el;
  });

  /* the token itself */
  var token = new THREE.Group();
  var core = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xFFF3E0, transparent: true }));
  var halo = new THREE.Mesh(new THREE.SphereGeometry(0.82, 16, 12),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(P.station),
      transparent: true, opacity: 0.28 }));
  token.add(core); token.add(halo);
  token.visible = false;
  scene.add(token);

  /* ---------------------------------------------------------------- camera rig */
  var HOME = { theta: 0.72, phi: 0.86 };
  var cam = { theta: HOME.theta, phi: HOME.phi, radius: spanX };
  var fitRadius = spanX;

  /* Distance that just contains the corridor, recomputed on resize so the framing holds
     on a phone as well as on a wide screen. */
  function computeFit() {
    var d = new THREE.Vector3(
      Math.sin(cam.phi) * Math.cos(cam.theta),
      Math.cos(cam.phi),
      Math.sin(cam.phi) * Math.sin(cam.theta));
    var up = new THREE.Vector3(0, 1, 0);
    var right = new THREE.Vector3().crossVectors(d, up).normalize();
    var camUp = new THREE.Vector3().crossVectors(right, d).normalize();
    var tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    var tanH = tanV * camera.aspect;
    var need = 1;
    var top = 4.4;
    for (var i = 0; i < 8; i++) {
      var v = new THREE.Vector3(
        (i & 1) ? bb.x1 : bb.x0,
        (i & 2) ? top : 0,
        (i & 4) ? bb.z1 : bb.z0).sub(center);
      var along = v.dot(d);
      need = Math.max(need,
        along + Math.abs(v.dot(right)) / tanH,
        along + Math.abs(v.dot(camUp)) / tanV);
    }
    fitRadius = need * 1.02;
    return fitRadius;
  }

  function applyCamera() {
    cam.phi = Math.max(0.18, Math.min(1.45, cam.phi));
    cam.radius = Math.max(fitRadius * 0.22, Math.min(fitRadius * 1.9, cam.radius));
    camera.position.set(
      center.x + cam.radius * Math.sin(cam.phi) * Math.cos(cam.theta),
      center.y + cam.radius * Math.cos(cam.phi),
      center.z + cam.radius * Math.sin(cam.phi) * Math.sin(cam.theta));
    camera.lookAt(center);
  }

  var needsRender = true;
  function requestRender() { needsRender = true; }

  /* Labels are placed in priority order (stations, switches, compass, section codes) and a
     lower-priority label is dropped rather than allowed to overprint a higher one. */
  var labelOrder = markers.map(function (m, i) { return i; }).sort(function (a, b) {
    return (markers[a].rank - markers[b].rank) || (a - b);
  });
  function positionLabels() {
    var w = stage.clientWidth, h = stage.clientHeight;
    var v = new THREE.Vector3();
    var placed = [];
    for (var n = 0; n < labelOrder.length; n++) {
      var i = labelOrder[n];
      var el = labelEls[i];
      v.copy(markers[i].pos).project(camera);
      if (v.z > 1 || v.x < -1.25 || v.x > 1.25 || v.y < -1.25 || v.y > 1.25) {
        el.style.display = "none";
        continue;
      }
      el.style.display = "block";
      var x = (v.x * 0.5 + 0.5) * w, y = (-v.y * 0.5 + 0.5) * h;
      var lw = el.offsetWidth, lh = el.offsetHeight;
      var box = [x - lw / 2 - 3, y - lh - 3, x + lw / 2 + 3, y + 3];
      var clash = false;
      for (var q = 0; q < placed.length; q++) {
        var o = placed[q];
        if (!(box[2] <= o[0] || o[2] <= box[0] || box[3] <= o[1] || o[3] <= box[1])) {
          clash = true;
          break;
        }
      }
      if (clash) { el.style.display = "none"; continue; }
      placed.push(box);
      el.style.left = x.toFixed(1) + "px";
      el.style.top = y.toFixed(1) + "px";
    }
  }

  function resize() {
    var w = Math.max(stage.clientWidth, 1), h = Math.max(stage.clientHeight, 1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    var ratio = fitRadius > 0 ? cam.radius / fitRadius : 1;
    computeFit();
    cam.radius = fitRadius * ratio;
    requestRender();
    schedule();
  }
  window.addEventListener("resize", resize);

  /* ---------------------------------------------------------------- token run */
  var RUN_MS = 17000;          /* continuous mode: S1 -> S6 */
  var STEP_MS = 1900;          /* reduced-motion mode: dwell per section */
  var running = false, runStart = 0, activeBand = null, rafId = 0;
  var stepTimer = 0, stepIndex = 0;

  function highlight(id) {
    DATA.bands.forEach(function (b) {
      var on = (b.id === id);
      var g = bandGroups[b.id];
      g.userData.target = on ? 2.0 : 1.0;      /* symbolic emphasis, not a volume claim */
      g.userData.lift = 0.0;
      (bandMats[b.id] || []).forEach(function (m) { m.emissiveIntensity = on ? 0.34 : 0.0; });
    });
    requestRender();
  }

  function setState(txt, busy) {
    stateEl.textContent = txt;
    stateEl.className = busy ? "busy" : "";
  }

  function bandAt(f) {
    for (var i = 0; i < DATA.bands.length; i++) {
      var b = DATA.bands[i];
      if (f >= b.f0 && f <= b.f1) { return b.id; }
    }
    return f < DATA.bands[0].f0 ? DATA.bands[0].id : DATA.bands[DATA.bands.length - 1].id;
  }

  function pointAt(f) {
    var pts = DATA.spine;
    for (var i = 0; i < pts.length - 1; i++) {
      if (f <= pts[i + 1].f) {
        var span = pts[i + 1].f - pts[i].f;
        var t = span > 0 ? (f - pts[i].f) / span : 0;
        return new THREE.Vector3(
          pts[i].x + (pts[i + 1].x - pts[i].x) * t, SPINE_Y,
          pts[i].z + (pts[i + 1].z - pts[i].z) * t);
      }
    }
    var last = pts[pts.length - 1];
    return new THREE.Vector3(last.x, SPINE_Y, last.z);
  }

  function enterBand(id) {
    if (id === activeBand) { return; }
    activeBand = id;
    highlight(id);
    renderBand(id);
    var b = bandById(id);
    setState("令牌占用 " + b.id + " " + b.zh + "（" + b.scenarios.length + " 个场景卡）—— " +
      "其余区间此刻不得再发令牌。 Token occupies " + b.id + " " + b.en + " with " +
      b.scenarios.length + " scenario cards; no second token may be issued.", true);
  }

  function finishRun() {
    running = false;
    token.visible = false;
    highlight(null);
    activeBand = null;
    renderBand(null);
    runBtn.disabled = false;
    runBtn.textContent = "发一枚令牌 Send a token";
    setState("令牌已在编组场归还，全线空闲：可再发一枚。 Token returned at the Marshalling Yard — " +
      "line clear, another token may be issued.", false);
    requestRender();
  }

  function stepReduced() {
    if (stepIndex >= DATA.bands.length) { finishRun(); return; }
    var b = DATA.bands[stepIndex];
    var p = pointAt((b.f0 + b.f1) / 2);
    token.position.copy(p);
    token.visible = true;
    core.material.opacity = 1;
    halo.material.opacity = 0.28;
    enterBand(b.id);
    requestRender();
    stepIndex += 1;
    stepTimer = window.setTimeout(function () {
      core.material.opacity = 0.25;      /* fade out, then jump */
      halo.material.opacity = 0.07;
      requestRender();
      stepTimer = window.setTimeout(stepReduced, 260);
    }, STEP_MS);
  }

  function tick(now) {
    rafId = 0;
    if (running && !reduced) {
      var f = Math.min((now - runStart) / RUN_MS, 1);
      token.position.copy(pointAt(f));
      var pulse = 0.22 + 0.10 * Math.sin(now / 220);
      halo.material.opacity = pulse;
      enterBand(bandAt(f));
      needsRender = true;
      if (f >= 1) { finishRun(); }
    }
    var moving = false;
    DATA.bands.forEach(function (b) {
      var g = bandGroups[b.id];
      var target = g.userData.target || 1.0;
      var lift = g.userData.lift || 0.0;
      if (Math.abs(g.scale.y - target) > 0.004 || Math.abs(g.position.y - lift) > 0.004) {
        g.scale.y = reduced ? target : g.scale.y + (target - g.scale.y) * 0.16;
        g.position.y = reduced ? lift : g.position.y + (lift - g.position.y) * 0.16;
        moving = true;
      }
    });
    if (needsRender || moving || running) {
      applyCamera();
      renderer.render(scene, camera);
      positionLabels();
      needsRender = false;
    }
    if (running || moving) { schedule(); }
  }

  function schedule() {
    if (!rafId) { rafId = window.requestAnimationFrame(tick); }
  }

  function startRun() {
    if (running) {
      setState("同一时刻线上只允许一枚令牌——请等待当前令牌归还。 Only one token may occupy the line " +
        "at a time; wait until the current token is returned.", true);
      return;
    }
    running = true;
    runBtn.disabled = true;
    runBtn.textContent = "区间占用中 Section occupied";
    activeBand = null;
    if (reduced) {
      stepIndex = 0;
      token.visible = true;
      stepReduced();
    } else {
      runStart = (window.performance && performance.now) ? performance.now() : Date.now();
      token.visible = true;
      core.material.opacity = 1;
      schedule();
    }
    requestRender();
    schedule();
  }

  function resetView() {
    cam.theta = HOME.theta; cam.phi = HOME.phi;
    computeFit();
    cam.radius = fitRadius;
    requestRender();
    schedule();
  }

  /* ---------------------------------------------------------------- input */
  var dragging = false, lastX = 0, lastY = 0, pid = null;
  stage.addEventListener("pointerdown", function (e) {
    if (e.button !== undefined && e.button !== 0) { return; }
    dragging = true; pid = e.pointerId; lastX = e.clientX; lastY = e.clientY;
    stage.setPointerCapture && stage.setPointerCapture(pid);
    stage.focus();
  });
  stage.addEventListener("pointermove", function (e) {
    if (!dragging) { return; }
    cam.theta -= (e.clientX - lastX) * 0.006;
    cam.phi -= (e.clientY - lastY) * 0.005;
    lastX = e.clientX; lastY = e.clientY;
    requestRender(); schedule();
  });
  function endDrag() {
    dragging = false;
    if (pid !== null && stage.releasePointerCapture) {
      try { stage.releasePointerCapture(pid); } catch (err) { /* already released */ }
    }
    pid = null;
  }
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);
  stage.addEventListener("wheel", function (e) {
    e.preventDefault();
    cam.radius *= (e.deltaY > 0 ? 1.09 : 0.917);
    requestRender(); schedule();
  }, { passive: false });

  stage.addEventListener("keydown", function (e) {
    var k = e.key;
    var handled = true;
    if (k === "ArrowLeft") { cam.theta += 0.09; }
    else if (k === "ArrowRight") { cam.theta -= 0.09; }
    else if (k === "ArrowUp") { cam.phi -= 0.07; }
    else if (k === "ArrowDown") { cam.phi += 0.07; }
    else if (k === "+" || k === "=") { cam.radius *= 0.90; }
    else if (k === "-" || k === "_") { cam.radius *= 1.11; }
    else if (k === " " || k === "Spacebar" || k === "Enter") { startRun(); }
    else if (k === "r" || k === "R") { resetView(); }
    else { handled = false; }
    if (handled) { e.preventDefault(); requestRender(); schedule(); }
  });
  runBtn.addEventListener("click", startRun);
  resetBtn.addEventListener("click", resetView);

  /* ---------------------------------------------------------------- go */
  overlay.classList.add("hidden");
  resize();
  resetView();
  highlight(null);
  applyCamera();
  renderer.render(scene, camera);
  positionLabels();
  window.__tokenBlockReady = true;
}());
