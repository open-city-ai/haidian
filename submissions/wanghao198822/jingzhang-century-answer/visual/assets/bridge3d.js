/* 人字之跃 · 本地离线三维示意（Three.js r160，UMD 版随包提供）
 * 几何取自断面 ZZY-1/ZZY-2 的设计目标值：抬升 H=6.0m、桥面净宽 9m、栏板 1.4m、
 * 单侧坡道两段并排各 62m×4m、中夹 1m 绿带、端头折返平台 4×9m、单侧占地 66×9m。
 * 概念示意：未经坐标配准，不表达真实场地的道路宽度与周边建筑。 */
(function () {
  "use strict";
  var STARTED = false;

  function build(container, reduced) {
    var W = container.clientWidth, Hpx = Math.max(360, Math.round(W * 0.52));
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, Hpx);
    renderer.setClearColor(0xEDEAE1, 1);
    container.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    // 雾原为 260-560：地面还只有 560x500 时靠它盖住地块边缘。地面已放大到 1500x1180，
    // 边缘早已在视野外，而这段雾会把「退到能看全整座桥」的那个距离整片洗白。推远。
    scene.fog = new THREE.Fog(0xEDEAE1, 620, 1400);
    var world = new THREE.Group();
    scene.add(world);

    var cam = new THREE.PerspectiveCamera(42, W / Hpx, 0.5, 1200);
    var camR = 190, camPhi = 0.62;
    function placeCam(yaw) {
      cam.position.set(Math.sin(yaw) * camR * Math.cos(camPhi), camR * Math.sin(camPhi),
                       Math.cos(yaw) * camR * Math.cos(camPhi));
      cam.lookAt(0, 4, 0);
    }

    scene.add(new THREE.HemisphereLight(0xffffff, 0x9a9e90, 0.85));
    var sun = new THREE.DirectionalLight(0xfff2dd, 1.35);
    sun.position.set(120, 160, 80);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    var sc = sun.shadow.camera;
    sc.left = -220; sc.right = 220; sc.top = 220; sc.bottom = -220;
    sc.near = 1; sc.far = 520;
    scene.add(sun);

    var M = {
      copper: new THREE.MeshStandardMaterial({ color: 0xA4632A, metalness: 0.45, roughness: 0.5 }),
      deckTop: new THREE.MeshStandardMaterial({ color: 0xC9A97C, roughness: 0.85 }),
      green: new THREE.MeshStandardMaterial({ color: 0x8C9A78, roughness: 1 }),
      green2: new THREE.MeshStandardMaterial({ color: 0x808E6C, roughness: 1 }),
      road: new THREE.MeshStandardMaterial({ color: 0x5C6167, roughness: 0.95 }),
      lane: new THREE.MeshStandardMaterial({ color: 0xE8E6DE, roughness: 0.9 }),
      tree: new THREE.MeshStandardMaterial({ color: 0x5E7355, roughness: 1 }),
      trunk: new THREE.MeshStandardMaterial({ color: 0x6B5138, roughness: 1 }),
      car: new THREE.MeshStandardMaterial({ color: 0xC6C7C4, roughness: 0.6 })
    };
    function box(w, h, d, mat, x, y, z, g) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      (g || world).add(m);
      return m;
    }

    /* —— 场地：中间 60m 环路，两侧绿地 —— */
    var ROAD_W = 60;
    box(1500, 0.4, ROAD_W, M.road, 0, -0.2, 0).castShadow = false;
    box(1500, 0.42, 560, M.green, 0, -0.21, -(ROAD_W / 2 + 280)).castShadow = false;
    box(1500, 0.42, 560, M.green2, 0, -0.21, (ROAD_W / 2 + 280)).castShadow = false;
    box(1500, 0.44, 1.2, M.lane, 0, -0.18, 0);                    // 中央分隔
    for (var i = 0; i < 70; i++) {                                // 车道虚线
      box(6, 0.44, 0.5, M.lane, -690 + i * 20, -0.18, -15);
      box(6, 0.44, 0.5, M.lane, -680 + i * 20, -0.18, 15);
    }

    /* —— 桥：Z 向跨路，桥面顶标高 6.0 —— */
    var H = 6.0, DECK_W = 9, SPAN = ROAD_W + 16;                  // 两端各出挑 8m 接平台
    var deck = box(DECK_W, 1.2, SPAN, M.copper, 0, H - 0.6, 0);   // 结构在桥面以下
    box(DECK_W - 0.4, 0.08, SPAN - 0.4, M.deckTop, 0, H + 0.04, 0);
    box(0.16, 1.4, SPAN, M.copper, -(DECK_W / 2 - 0.08), H + 0.7, 0);  // 栏板（桥面之上唯一构件）
    box(0.16, 1.4, SPAN, M.copper, (DECK_W / 2 - 0.08), H + 0.7, 0);

    /* —— 两端折返坡道：两段并排各 62×4，中夹 1m，端头折返平台 4×9 —— */
    var RUN = 62, RUN_W = 4, GAP = 1, TURN = 4;
    function rampAssembly(zEnd, dirX) {
      var g = new THREE.Group(); world.add(g);
      var zA = -(RUN_W + GAP) / 2, zB = (RUN_W + GAP) / 2;        // 平台层
      // 桥头平台（坡道终点 + 主跨支承 + 广场入口三合一）
      box(DECK_W, 1.2, TURN, M.copper, 0, H - 0.6, zEnd + Math.sign(zEnd) * TURN / 2);
      // 上行段：桥头 → 折返平台（6.0 → 3.0）
      var slope = Math.atan2(H / 2, RUN);
      var upper = box(RUN, 0.7, RUN_W, M.copper, dirX * RUN / 2, (H + H / 2) / 2 - 0.35 + 0.35, 0, g);
      upper.position.set(dirX * RUN / 2, (H + H / 2) / 2, zEnd + Math.sign(zEnd) * (TURN / 2) + (zA - 0) * 0 + zA * 0);
      upper.position.z = zEnd + Math.sign(zEnd) * TURN / 2 + zA * 0 + zA;
      upper.rotation.z = -dirX * slope;
      // 折返平台（4×9，标高 3.0）
      box(TURN, 0.7, RUN_W * 2 + GAP, M.copper, dirX * (RUN + TURN / 2), H / 2 - 0.35 + 0.35, zEnd + Math.sign(zEnd) * TURN / 2, g)
        .position.y = H / 2;
      // 回折段：折返平台 → 地面（3.0 → 0）
      var lower = box(RUN, 0.7, RUN_W, M.copper, dirX * RUN / 2, H / 4, 0, g);
      lower.position.set(dirX * RUN / 2, H / 4, zEnd + Math.sign(zEnd) * TURN / 2 + zB);
      lower.rotation.z = dirX * Math.atan2(H / 2, RUN);
      // 落地小场
      box(8, 0.3, RUN_W, M.deckTop, dirX * 3, 0.15, zEnd + Math.sign(zEnd) * TURN / 2 + zB, g);
      // 中夹绿带
      box(RUN, 0.5, GAP, M.green2, dirX * RUN / 2, 0.5, zEnd + Math.sign(zEnd) * TURN / 2, g);
    }
    rampAssembly(SPAN / 2, 1);      // 北端坡道向 +X 展开
    rampAssembly(-SPAN / 2, -1);    // 南端坡道向 -X 展开（「人」字落在两端折返本身，不落在俯视轮廓）

    /* —— 配景：树群与车流，纯尺度参照 —— */
    function tree(x, z, s) {
      var g = new THREE.Group();
      var tr = new THREE.Mesh(new THREE.CylinderGeometry(0.3 * s, 0.4 * s, 2.4 * s, 6), M.trunk);
      tr.position.y = 1.2 * s; tr.castShadow = true; g.add(tr);
      var cr = new THREE.Mesh(new THREE.SphereGeometry(2.4 * s, 12, 7), M.tree);
      cr.position.y = 3.1 * s; cr.scale.y = 0.55; cr.castShadow = true; g.add(cr);
      g.position.set(x, 0, z); world.add(g);
    }
    var rng = 9973;
    function rnd() { rng = (rng * 16807) % 2147483647; return rng / 2147483647; }
    for (var t = 0; t < 190; t++) {
      var x = (rnd() - 0.5) * 1100, z = (ROAD_W / 2 + 14) + rnd() * 330;
      if (Math.abs(x) < 78 && z < 78) continue;                    // 让开坡道
      tree(x, (t % 2 ? 1 : -1) * z, 0.8 + rnd() * 0.7);
    }
    for (var c = 0; c < 12; c++) {
      box(4.4, 1.4, 1.9, M.car, -240 + c * 42 + rnd() * 16, 0.9, c % 2 ? 8 + rnd() * 14 : -(8 + rnd() * 14));
    }

    /* —— 交互：拖拽旋转 + 滚轮缩放 + 慢速自转 —— */
    var yaw = 0.85, dragging = false, lastX = 0, lastY = 0, userTouched = false;
    placeCam(yaw);
    var el = renderer.domElement;
    el.style.cursor = "grab"; el.style.touchAction = "none";
    el.addEventListener("pointerdown", function (e) { dragging = true; userTouched = true; lastX = e.clientX; lastY = e.clientY; el.setPointerCapture(e.pointerId); el.style.cursor = "grabbing"; });
    el.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      yaw -= (e.clientX - lastX) * 0.005;
      camPhi = Math.min(1.25, Math.max(0.18, camPhi + (e.clientY - lastY) * 0.004));
      lastX = e.clientX; lastY = e.clientY; placeCam(yaw);
    });
    el.addEventListener("pointerup", function () { dragging = false; el.style.cursor = "grab"; });
    el.addEventListener("wheel", function (e) { e.preventDefault(); userTouched = true; camR = Math.min(420, Math.max(70, camR * (e.deltaY > 0 ? 1.08 : 0.93))); placeCam(yaw); }, { passive: false });

    /* —— 键盘操作（无障碍要求：不依赖鼠标即可旋转与缩放）—— */
    el.setAttribute("tabindex", "0");
    function onKey(e) {
      var k = e.key, step = 0.12, handled = true;
      if (k === "ArrowLeft") { yaw += step; }
      else if (k === "ArrowRight") { yaw -= step; }
      else if (k === "ArrowUp") { camPhi = Math.min(1.25, camPhi + 0.08); }
      else if (k === "ArrowDown") { camPhi = Math.max(0.18, camPhi - 0.08); }
      else if (k === "+" || k === "=") { camR = Math.max(70, camR * 0.9); }
      else if (k === "-" || k === "_") { camR = Math.min(420, camR * 1.1); }
      else { handled = false; }
      if (handled) { userTouched = true; placeCam(yaw); e.preventDefault(); }
    }
    container.addEventListener("keydown", onKey);
    el.addEventListener("keydown", onKey);

    var last = 0;
    function frame(ts) {
      if (!reduced && !userTouched) { yaw += 0.0022; placeCam(yaw); }
      renderer.render(scene, cam);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    window.addEventListener("resize", function () {
      var w2 = container.clientWidth, h2 = Math.max(360, Math.round(w2 * 0.52));
      renderer.setSize(w2, h2); cam.aspect = w2 / h2; cam.updateProjectionMatrix();
    });
  }

  window.initBridge3D = function (container) {
    if (STARTED || !window.THREE) return;
    STARTED = true;
    var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var poster = document.getElementById("b3d-poster");
    var state = document.getElementById("b3d-state");
    try {
      build(container, reduced);
      /* 成功：撤下静态兜底图，状态改为可交互提示 */
      container.classList.add("is-live");   // 舞台改由画布定高，不再按图签幅面
      if (poster) poster.style.display = "none";
      if (state) state.parentNode.removeChild(state);
    } catch (e) {
      /* 失败：保留静态兜底图，明确告知不可交互及原因 */
      if (state) state.textContent = (document.documentElement.lang === "en"
        ? "Static image only - interactive 3D unavailable in this browser"
        : "仅静态图 · 本浏览器无法运行可交互三维");
      container.setAttribute("role", "img");
      /* 三维起不来时，「拖拽或方向键旋转」这条操作提示还留在右下角，等于让人去做办不到的事；
         同时 aria-label 也还在说可以用方向键。两处一并改掉。 */
      var hint = container.querySelector(".hint3d");
      if (hint && hint.parentNode) hint.parentNode.removeChild(hint);
      container.removeAttribute("tabindex");
      container.setAttribute("aria-label", document.documentElement.lang === "en"
        ? "Static concept view of the Ren-Shaped Leap footbridge; interactive 3D is unavailable in this browser"
        : "人字之跃步行桥三维概念示意的静态图；本浏览器无法运行可交互三维");
    }
  };
})();
