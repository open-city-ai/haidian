/* EVERY SENSE JING-ZHANG - three-dimensional spine scene.
   Local WebGL view built with three.js r160 (MIT, vendored at
   assets/three.min.js, provenance in assets/three-license.json). No network,
   no loader, no remote asset: every mesh is extruded at runtime from
   window.JZ_SCENE, the same dataset the chapter 16 canvas reads, which is
   generated from the package geometry/*.geojson. Plan geometry and node
   positions are sourced from that dataset; extrusion heights, offsets,
   lights and camera parameters are presentation-layer settings defined here.

   Reading order: the local metre plane is scaled to world units, the
   cross-spine axis keeps the same x3.6 exaggeration the flat scene declares,
   and the site is extruded as a low-polygon massing: ground plate, road bands,
   green and public slabs, translucent key-area volumes, ten node columns with
   numbered plates.

   Discipline: nothing moves unless the reader asks. There is no auto-rotation
   and no idle animation; the frame loop runs only while an interaction or a
   camera flight is in progress and stops as soon as it settles. Reduced-motion
   settings turn the camera flights into instant cuts. Without WebGL, without
   three.js or without scripting the chapter falls back to the static image.

   The volumes are schematic extrusions for reading the spatial relationship.
   They are not a building design, and the geometry is provisional concept
   material, not a statutory boundary or an engineering alignment. */
(function () {
  'use strict';

  var K = 3.6;          /* cross-spine exaggeration, same as the flat scene */
  var U = 0.01;         /* metres -> world units */
  var GROUND_H = 0.30;  /* schematic heights, chosen for legibility only */
  var GREEN_H = 0.14;
  var PUBLIC_H = 0.16;
  var MARK_H = 1.05;
  var POOL_Y = 0.48;    /* pools sit just clear of the slabs beneath them */
  var ROAD_Y = 0.52;    /* routes ride above every slab: a raised causeway */
  var ROAD_H = 0.11;
  var AREA_H = 2.30;
  var NODE_H = 2.80;
  var POLE_H = 1.60;

  var C = {
    deep: 0x10383d, teal: 0x177c78, paper: 0xf2efe7, coral: 0xd76450,
    purple: 0x6b5b95, gold: 0xd6a13b, flow: 0x53c4b8
  };
  var ACCENT = { teal: C.teal, purple: C.purple, gold: C.gold };

  var SKY = { day: 0xb7cac5, night: 0x08222a };

  var T = {
    zh: {
      loading: '三维场景准备中…',
      failed: '当前环境不支持 WebGL 或未启用脚本，三维场景无法运行，下方为静态后备视图；本章的空间关系亦已在第 16 章的二维交互场景与静态图中完整给出。',
      canvas: '三维主脊场景，可用鼠标拖拽旋转、滚轮缩放，或在聚焦后用方向键旋转、加减号缩放。',
      stOn: 'AI 开启：主脊与低刺激替代线的引导带点亮。',
      stOff: 'AI 关闭：引导带熄灭，固定导视与照明等底盘服务构件高亮，人工求助点出现。',
      lightDay: '白天光照。', lightNight: '夜间光照，照明构件发光。',
      statusOn: '已切换到 AI 开启。十个节点位置与已声明覆盖不变（声明完整度口径，非现场可达性结论），改变的只是完成同一件事的通道。',
      statusOff: '已切换到 AI 关闭。十个节点位置与已声明覆盖不变（声明完整度口径，非现场可达性结论）；固定导视、照明与人工求助点承担同一件事。',
      statusDay: '已切换到白天光照。照明构件保持在场，读数不变。',
      statusNight: '已切换到夜间光照。照明属于底盘服务，AI 开关两态都在，读数不变。',
      flew: '相机已移到 ', reset: '已恢复默认视角。',
      resetBtn: '恢复默认视角',
      gate: '闸门',
      areas: {
        zhongzhiyuan_ai_acceleration_area: '众智园 AI 自主创新加速区',
        beijing_ai_origin_community: '北京 AI 原点社区',
        dazhongsi_ai_industry_cluster: '大钟寺 AI 产业集聚区'
      },
      empty: '点击下方任一节点按钮，相机会移到该节点并在此显示它的编号、闸门与所在重点区。'
    },
    en: {
      loading: 'Preparing the three-dimensional scene…',
      failed: 'This environment has no WebGL or no scripting, so the three-dimensional scene cannot run and the static fallback view is shown below; the same spatial relationships are given in full by the two-dimensional interactive scene and the static images in chapter 16.',
      canvas: 'Three-dimensional spine scene. Drag to orbit and scroll to zoom, or focus the view and use the arrow keys to orbit and the plus and minus keys to zoom.',
      stOn: 'AI ON: the guidance bands on the spine and on the low-stimulation alternative route are lit.',
      stOff: 'AI OFF: the guidance bands go dark, the fixed signage and lighting baseline is highlighted, and staffed help points appear.',
      lightDay: 'Daylight.', lightNight: 'Night lighting, with the lighting constructs emitting.',
      statusOn: 'Switched to AI ON. Node positions and reachability are unchanged; only the channel for completing the same task changes.',
      statusOff: 'Switched to AI OFF. Node positions and reachability are unchanged; fixed signage, lighting and staffed help points carry the same task.',
      statusDay: 'Switched to daylight. The lighting constructs stay in place and the readout is unchanged.',
      statusNight: 'Switched to night lighting. Lighting is a baseline service present in both AI states, and the readout is unchanged.',
      flew: 'Camera moved to ', reset: 'Default view restored.',
      resetBtn: 'Reset view',
      gate: 'Gate',
      areas: {
        zhongzhiyuan_ai_acceleration_area: 'Zhongzhiyuan AI Acceleration Area',
        beijing_ai_origin_community: 'Beijing AI Origin Community',
        dazhongsi_ai_industry_cluster: 'Dazhongsi AI Industry Cluster'
      },
      empty: 'Choose any node button below: the camera moves to that node and its number, gate and key area appear here.'
    }
  };

  /* Site metres -> world units. North is -Z, so the default camera looks north
     up the spine. Height is the schematic axis and is declared as such. */
  function wx(mx) { return mx * K * U; }
  function wz(my) { return -my * U; }

  function ringShape(THREE, ring) {
    var pts = [], i, n = ring.length;
    if (n > 1 && ring[0][0] === ring[n - 1][0] && ring[0][1] === ring[n - 1][1]) n -= 1;
    for (i = 0; i < n; i++) pts.push(new THREE.Vector2(wx(ring[i][0]), -wz(ring[i][1])));
    return new THREE.Shape(pts);
  }

  /* Extrude a ground ring upward. Rotating the shape plane into XZ turns the
     extrusion depth into the height axis, so the slab already spans 0..h and
     only needs lifting to its base: it then occupies y0..y0 + h. */
  function slab(THREE, ring, y0, h) {
    var g = new THREE.ExtrudeGeometry(ringShape(THREE, ring), { depth: h, bevelEnabled: false });
    g.rotateX(-Math.PI / 2);
    g.translate(0, y0, 0);
    return g;
  }

  /* A road band: one box per segment, oriented along the segment. */
  function band(THREE, line, width, y0, h) {
    var parts = [], i, ax, az, bx, bz, dx, dz, len, box;
    for (i = 1; i < line.length; i++) {
      ax = wx(line[i - 1][0]); az = wz(line[i - 1][1]);
      bx = wx(line[i][0]); bz = wz(line[i][1]);
      dx = bx - ax; dz = bz - az;
      len = Math.sqrt(dx * dx + dz * dz);
      if (!len) continue;
      box = new THREE.BoxGeometry(len, h, width);
      box.rotateY(-Math.atan2(dz, dx));
      box.translate((ax + bx) / 2, y0 + h / 2, (az + bz) / 2);
      parts.push(box);
    }
    return parts;
  }

  function ringBox(ring) {
    var x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity, i, x, z;
    for (i = 0; i < ring.length; i++) {
      x = wx(ring[i][0]); z = wz(ring[i][1]);
      if (x < x0) x0 = x; if (x > x1) x1 = x;
      if (z < z0) z0 = z; if (z > z1) z1 = z;
    }
    return { x0: x0, x1: x1, z0: z0, z1: z1, cx: (x0 + x1) / 2, cz: (z0 + z1) / 2, w: x1 - x0, d: z1 - z0 };
  }

  /* Evenly spaced points along a polyline, in world units. */
  function along(line, step) {
    var out = [], i, ax, az, bx, bz, dx, dz, len, t;
    for (i = 1; i < line.length; i++) {
      ax = wx(line[i - 1][0]); az = wz(line[i - 1][1]);
      bx = wx(line[i][0]); bz = wz(line[i][1]);
      dx = bx - ax; dz = bz - az;
      len = Math.sqrt(dx * dx + dz * dz);
      for (t = step / 2; t < len; t += step) {
        out.push([ax + dx * (t / len), az + dz * (t / len)]);
      }
    }
    return out;
  }

  /* Numbered plate drawn on a canvas, used as a sprite texture. Bilingual by
     page language: the identifier is neutral, the gate word is localised. */
  function plateTexture(THREE, id, gate) {
    var w = 240, h = 104, r = 2, cv = document.createElement('canvas');
    cv.width = w * r; cv.height = h * r;
    var c = cv.getContext('2d');
    c.scale(r, r);
    c.fillStyle = '#f2efe7';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#177c78';
    c.fillRect(0, 0, w, 9);
    c.strokeStyle = '#10383d';
    c.lineWidth = 2;
    c.strokeRect(1, 1, w - 2, h - 2);
    c.fillStyle = '#17383c';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.font = '800 44px Georgia,serif';
    c.fillText(id, w / 2, 44);
    c.fillStyle = '#68787b';
    c.font = '700 24px "Source Han Sans SC","Noto Sans CJK SC",Arial,sans-serif';
    c.fillText(gate, w / 2, 80);
    var tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 1;
    return tex;
  }

  function build(THREE, data, t) {
    var root = new THREE.Group();
    var mats = {};
    var i, j, m, parts;

    mats.groundTop = new THREE.MeshLambertMaterial({ color: 0xe4e0d3 });
    mats.green = new THREE.MeshLambertMaterial({ color: 0x3f8b80 });
    mats.buffer = new THREE.MeshLambertMaterial({ color: 0x5aa89c });
    mats.publicSlab = new THREE.MeshLambertMaterial({ color: 0xf2efe7 });
    mats.mark = new THREE.MeshLambertMaterial({ color: C.gold });
    mats.spine = new THREE.MeshLambertMaterial({ color: C.teal });
    mats.alt = new THREE.MeshLambertMaterial({ color: 0x2f938d });
    mats.cross = new THREE.MeshLambertMaterial({ color: 0x9aa9a5 });
    mats.pillar = new THREE.MeshLambertMaterial({ color: C.paper });
    mats.cap = new THREE.MeshLambertMaterial({ color: C.teal });
    mats.capSel = new THREE.MeshLambertMaterial({ color: C.coral });
    mats.ring = new THREE.MeshLambertMaterial({ color: C.flow, emissive: C.flow, emissiveIntensity: 0.9 });
    mats.service = new THREE.MeshLambertMaterial({ color: C.gold });
    mats.help = new THREE.MeshLambertMaterial({ color: C.coral });
    /* Unlit pools of light on the ground: what the lighting baseline actually
       delivers after dark. Present in both AI states, because it is the floor,
       not an AI feature. */
    mats.pool = new THREE.MeshBasicMaterial({
      color: 0xf3daa0, transparent: true, opacity: 0.30, depthWrite: false
    });

    /* Ground plate, with a drawn edge: the flat scene marks the provisional
       scope with a dashed line, and the volume marks it with an outline. */
    var groundGeo = slab(THREE, data.boundary, 0, GROUND_H);
    root.add(new THREE.Mesh(groundGeo, mats.groundTop));
    root.add(new THREE.LineSegments(new THREE.EdgesGeometry(groundGeo),
      new THREE.LineBasicMaterial({ color: 0x6d8683 })));

    /* Green slabs and public slabs sit on the ground plate. */
    for (i = 0; i < data.green.length; i++) {
      root.add(new THREE.Mesh(slab(THREE, data.green[i].ring, GROUND_H, GREEN_H),
        data.green[i].type === 'low_stimulation_buffer' ? mats.buffer : mats.green));
    }
    for (i = 0; i < data.public.length; i++) {
      var pb = data.public[i], isMark = !!pb.landmark;
      root.add(new THREE.Mesh(slab(THREE, pb.ring, GROUND_H, isMark ? MARK_H : PUBLIC_H),
        isMark ? mats.mark : mats.publicSlab));
    }

    /* Road bands. The spine and the low-stimulation alternative are the two
       equivalent routes and are drawn in both AI states, unchanged. */
    function addBands(line, width, mat) {
      parts = band(THREE, line, width, ROAD_Y, ROAD_H);
      for (j = 0; j < parts.length; j++) root.add(new THREE.Mesh(parts[j], mat));
    }
    for (i = 0; i < data.crossings.length; i++) addBands(data.crossings[i].line, 0.55, mats.cross);
    addBands(data.spine.line, 1.25, mats.spine);
    addBands(data.alt.line, 0.85, mats.alt);

    /* Key-area volumes: translucent bodies with a drawn edge, so the areas
       read as extent rather than as buildings. */
    for (i = 0; i < data.keyAreas.length; i++) {
      var ka = data.keyAreas[i], b = ringBox(ka.ring);
      var acc = ACCENT[ka.accent] || C.teal;
      var box = new THREE.BoxGeometry(b.w, AREA_H, b.d);
      var fill = new THREE.MeshLambertMaterial({
        color: acc, transparent: true, opacity: 0.13, depthWrite: false, side: THREE.DoubleSide
      });
      m = new THREE.Mesh(box, fill);
      m.position.set(b.cx, GROUND_H + AREA_H / 2, b.cz);
      m.renderOrder = 2;
      root.add(m);
      var edge = new THREE.LineSegments(new THREE.EdgesGeometry(box),
        new THREE.LineBasicMaterial({ color: acc, transparent: true, opacity: 0.85 }));
      edge.position.copy(m.position);
      root.add(edge);
    }

    /* Baseline service constructs, in gold: fixed signage plates along both
       equivalent routes and a lighting pole at every node. They exist in both
       AI states; the AI-off state and the night state only make them brighter,
       because that is exactly the claim - lighting and fixed information are
       the floor, not an AI feature. */
    var service = new THREE.Group();
    var signGeo = new THREE.BoxGeometry(0.09, 0.62, 0.50);
    var poleGeo = new THREE.CylinderGeometry(0.07, 0.10, POLE_H, 6);
    var headGeo = new THREE.SphereGeometry(0.17, 8, 6);
    var pools = new THREE.Group();
    pools.renderOrder = 1;
    var poolSign = new THREE.CircleGeometry(0.78, 14);
    var poolNode = new THREE.CircleGeometry(1.55, 20);
    poolSign.rotateX(-Math.PI / 2);
    poolNode.rotateX(-Math.PI / 2);
    var signs = along(data.spine.line, 5.2).concat(along(data.alt.line, 6.6));
    for (i = 0; i < signs.length; i++) {
      m = new THREE.Mesh(signGeo, mats.service);
      m.position.set(signs[i][0] + 1.45, GROUND_H + 0.31, signs[i][1]);
      service.add(m);
      m = new THREE.Mesh(poolSign, mats.pool);
      m.position.set(signs[i][0] + 1.45, POOL_Y, signs[i][1]);
      pools.add(m);
    }
    root.add(service);
    root.add(pools);

    /* Nodes: column, cap, numbered plate, lighting pole, help marker, flow
       ring. The column and the cap never change between the two AI states. */
    var nodes = [];
    var colGeo = new THREE.CylinderGeometry(0.13, 0.19, NODE_H, 10);
    var capGeo = new THREE.CylinderGeometry(0.40, 0.40, 0.11, 14);
    var ringGeo = new THREE.TorusGeometry(0.78, 0.07, 5, 20);
    var helpGeo = new THREE.OctahedronGeometry(0.55);
    for (i = 0; i < data.nodes.length; i++) {
      var n = data.nodes[i];
      var px = wx(n.x), pz = wz(n.y);
      var grp = new THREE.Group();
      var col = new THREE.Mesh(colGeo, mats.pillar);
      col.position.set(px, GROUND_H + NODE_H / 2, pz);
      grp.add(col);
      var cap = new THREE.Mesh(capGeo, mats.cap);
      cap.position.set(px, GROUND_H + NODE_H + 0.05, pz);
      grp.add(cap);
      var ring = new THREE.Mesh(ringGeo, mats.ring);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(px, GROUND_H + NODE_H + 0.30, pz);
      grp.add(ring);
      var pole = new THREE.Mesh(poleGeo, mats.service);
      pole.position.set(px - 2.05, GROUND_H + POLE_H / 2, pz + 0.55);
      grp.add(pole);
      var head = new THREE.Mesh(headGeo, mats.service);
      head.position.set(px - 2.05, GROUND_H + POLE_H + 0.08, pz + 0.55);
      grp.add(head);
      m = new THREE.Mesh(poolNode, mats.pool);
      m.position.set(px - 2.05, POOL_Y, pz + 0.55);
      pools.add(m);
      var help = new THREE.Mesh(helpGeo, mats.help);
      help.position.set(px + 1.55, GROUND_H + 0.95, pz - 0.55);
      grp.add(help);
      var lift = (i % 3) * 0.78;
      if (lift) {
        var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, lift, 5), mats.pillar);
        mast.position.set(px, GROUND_H + NODE_H + 0.10 + lift / 2, pz);
        grp.add(mast);
      }
      var sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: plateTexture(THREE, n.id, t.gate + ' ' + n.gate),
        sizeAttenuation: false, depthTest: true, transparent: true
      }));
      sprite.center.set(0.5, 0);
      sprite.position.set(px, GROUND_H + NODE_H + 0.14 + lift, pz);
      grp.add(sprite);
      root.add(grp);
      nodes.push({ src: n, x: px, z: pz, cap: cap, ring: ring, help: help, sprite: sprite });
    }

    return { group: root, mats: mats, nodes: nodes, pools: pools };
  }

  function boot() {
    var host = document.querySelector('.j3-scene');
    if (!host) return;
    var missingData = !window.JZ_SCENE;
    var lang = host.getAttribute('data-lang') === 'en' ? 'en' : 'zh';
    var t = T[lang] || T.zh;
    var wrap = host.querySelector('.j3-canvaswrap');
    var canvas = host.querySelector('canvas');
    var stateBox = host.querySelector('.j3-state');
    var degrade = host.querySelector('.j3-degrade');
    var status = host.querySelector('.j3-status');
    var cardId = host.querySelector('.j3-cid');
    var cardName = host.querySelector('.j3-cname');
    var cardArea = host.querySelector('.j3-carea');
    var card = host.querySelector('.j3-card');
    var empty = host.querySelector('.j3-empty');
    var btnOn = host.querySelector('[data-j3="on"]');
    var btnOff = host.querySelector('[data-j3="off"]');
    var btnDay = host.querySelector('[data-j3="day"]');
    var btnNight = host.querySelector('[data-j3="night"]');
    var btnReset = host.querySelector('[data-j3="reset"]');
    var nodeButtons = host.querySelectorAll('.j3-rail button');
    var controls = host.querySelectorAll('.j3-bar button, .j3-rail button');

    var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    function reduced() { return !!(mq && mq.matches); }

    function fail() {
      wrap.setAttribute('data-view', 'static');
      if (stateBox) stateBox.textContent = '';
      if (degrade) { degrade.textContent = t.failed; degrade.hidden = false; }
      for (var k = 0; k < controls.length; k++) controls[k].disabled = true;
      if (canvas) canvas.removeAttribute('tabindex');
    }

    if (missingData) { fail(); return; }

    var THREE = window.THREE;
    if (!THREE) { fail(); return; }

    /* Ask the canvas for a context first and hand it to three, rather than
       letting three ask and log its own error: a browser without WebGL is a
       supported outcome here, not a fault, and it should degrade in silence. */
    var gl = null, attrs = { alpha: false, antialias: true };
    try {
      gl = canvas.getContext('webgl2', attrs) || canvas.getContext('webgl', attrs);
    } catch (e) { gl = null; }
    if (!gl) { fail(); return; }

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, context: gl, antialias: true, alpha: false });
    } catch (e) { renderer = null; }
    if (!renderer) { fail(); return; }
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

    var built, scene, camera, hemi, dir;
    try {
      built = build(THREE, window.JZ_SCENE, t);
      scene = new THREE.Scene();
      scene.add(built.group);
      hemi = new THREE.HemisphereLight(0xdfe9e5, 0x2a4a4d, 1.45);
      scene.add(hemi);
      dir = new THREE.DirectionalLight(0xffffff, 1.5);
      dir.position.set(-30, 46, 26);
      scene.add(dir);
      camera = new THREE.PerspectiveCamera(38, 16 / 9, 0.5, 1200);
    } catch (e) { fail(); return; }

    /* Default framing is measured, not guessed: every corner of the built
       extent is projected into the camera basis and the distance is the
       smallest one that keeps all eight inside the frustum. The framing then
       follows the data and the viewport, at any orbit angle. */
    var bounds = new THREE.Box3().setFromObject(built.group);
    var centre = bounds.getCenter(new THREE.Vector3());
    var HOME = { az: -1.02, pol: 0.80, dist: 120, tx: centre.x, ty: 0.9, tz: centre.z };
    var TAN_V = Math.tan(38 * Math.PI / 360);

    function fitDistance(az, pol, aspect) {
      var dirv = new THREE.Vector3(Math.sin(pol) * Math.sin(az), Math.cos(pol), Math.sin(pol) * Math.cos(az));
      var fwd = dirv.clone().negate();
      var right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
      var up = new THREE.Vector3().crossVectors(dirv, right).normalize();
      var tanH = TAN_V * aspect;
      var v = new THREE.Vector3(), d = 0, depth, a, b, c;
      var xs = [bounds.min.x, bounds.max.x], ys = [bounds.min.y, bounds.max.y], zs = [bounds.min.z, bounds.max.z];
      for (a = 0; a < 2; a++) for (b = 0; b < 2; b++) for (c = 0; c < 2; c++) {
        v.set(xs[a], ys[b], zs[c]);
        v.x -= HOME.tx; v.y -= HOME.ty; v.z -= HOME.tz;
        depth = v.dot(fwd);
        d = Math.max(d, Math.abs(v.dot(right)) / tanH - depth, Math.abs(v.dot(up)) / TAN_V - depth);
      }
      return d * 1.0;
    }

    var view = { az: HOME.az, pol: HOME.pol, dist: HOME.dist, tx: HOME.tx, ty: HOME.ty, tz: HOME.tz };
    var target = new THREE.Vector3();

    var state = 'on', light = 'day', selected = null;
    var raf = 0, pending = false, ready = false, lastW = 0, fly = null;

    function place() {
      var sp = Math.sin(view.pol), cp = Math.cos(view.pol);
      target.set(view.tx, view.ty, view.tz);
      camera.position.set(
        view.tx + view.dist * sp * Math.sin(view.az),
        view.ty + view.dist * cp,
        view.tz + view.dist * sp * Math.cos(view.az)
      );
      camera.lookAt(target);
    }

    /* Sprite plates keep a constant pixel size: with sizeAttenuation off the
       scale that yields P pixels is 2*P*tan(fov/2)/viewportHeight. */
    function sizeSprites() {
      var h = renderer.domElement.clientHeight || 1;
      var f = 2 * Math.tan(38 * Math.PI / 360) / h;
      var i, s = built.nodes;
      for (i = 0; i < s.length; i++) s[i].sprite.scale.set(46 * f, 20 * f, 1);
    }

    function resize() {
      var w = Math.max(240, Math.round(wrap.clientWidth));
      var h = Math.round(w / (w < 620 ? 1.15 : 1.68));
      var home = HOME.dist;
      renderer.setSize(w, h, true);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      HOME.dist = fitDistance(HOME.az, HOME.pol, camera.aspect);
      /* A reader who has not zoomed keeps the fitted framing across resizes. */
      if (Math.abs(view.dist - home) < 0.001) view.dist = HOME.dist;
      sizeSprites();
      lastW = w;
    }

    function frame() {
      pending = false;
      raf = 0;
      if (fly) {
        var now = (window.performance && window.performance.now ? window.performance.now() : Date.now());
        var u = Math.min(1, (now - fly.t0) / fly.dur);
        var e = u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
        var kk;
        for (kk in fly.to) if (Object.prototype.hasOwnProperty.call(fly.to, kk)) {
          view[kk] = fly.from[kk] + (fly.to[kk] - fly.from[kk]) * e;
        }
        if (u >= 1) fly = null;
      }
      place();
      try { renderer.render(scene, camera); } catch (err) { fail(); return; }
      ready = true;
      wrap.setAttribute('data-ready', '1');
      if (fly) draw();
    }

    /* One frame per request; the loop stops the moment nothing is pending. */
    function draw() {
      if (pending) return;
      pending = true;
      raf = window.requestAnimationFrame(frame);
    }

    function shortestAngle(from, to) {
      var d = (to - from) % (Math.PI * 2);
      if (d > Math.PI) d -= Math.PI * 2;
      if (d < -Math.PI) d += Math.PI * 2;
      return from + d;
    }

    function moveTo(to, announce) {
      var kk, from = {};
      if (to.az !== undefined) to.az = shortestAngle(view.az, to.az);
      for (kk in to) if (Object.prototype.hasOwnProperty.call(to, kk)) from[kk] = view[kk];
      if (reduced()) {
        for (kk in to) if (Object.prototype.hasOwnProperty.call(to, kk)) view[kk] = to[kk];
        fly = null;
      } else {
        fly = { from: from, to: to, dur: 850, t0: (window.performance && window.performance.now ? window.performance.now() : Date.now()) };
      }
      if (announce) status.textContent = announce;
      draw();
    }

    function ariaLabel() {
      canvas.setAttribute('aria-label',
        t.canvas + ' ' + (state === 'on' ? t.stOn : t.stOff) + ' ' +
        (light === 'day' ? t.lightDay : t.lightNight));
    }

    function applyState(announce) {
      var on = state === 'on', i;
      /* AI ON lights the guidance bands; AI OFF puts them out and lifts the
         gold baseline instead. The node columns and caps never move. */
      built.mats.spine.emissive.setHex(on ? C.flow : 0x000000);
      built.mats.spine.emissiveIntensity = on ? 0.55 : 0;
      built.mats.alt.emissive.setHex(on ? C.flow : 0x000000);
      built.mats.alt.emissiveIntensity = on ? 0.34 : 0;
      built.mats.service.emissive.setHex(C.gold);
      built.mats.service.emissiveIntensity =
        (on ? 0.08 : 0.62) + (light === 'night' ? 0.55 : 0);
      built.mats.help.emissive.setHex(C.coral);
      built.mats.help.emissiveIntensity = on ? 0 : (light === 'night' ? 0.45 : 0.12);
      for (i = 0; i < built.nodes.length; i++) {
        built.nodes[i].ring.visible = on;
        built.nodes[i].help.visible = !on;
      }
      host.setAttribute('data-state', state);
      btnOn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btnOff.setAttribute('aria-pressed', on ? 'false' : 'true');
      ariaLabel();
      if (announce) status.textContent = on ? t.statusOn : t.statusOff;
      if (ready) draw();
    }

    function applyLight(announce) {
      var night = light === 'night';
      scene.background = new THREE.Color(night ? SKY.night : SKY.day);
      hemi.color.setHex(night ? 0x1d454c : 0xdfe9e5);
      hemi.groundColor.setHex(night ? 0x05171c : 0x2a4a4d);
      hemi.intensity = night ? 0.42 : 1.45;
      dir.intensity = night ? 0.30 : 1.5;
      dir.color.setHex(night ? 0x9fc2c8 : 0xffffff);
      built.pools.visible = night;
      for (var q = 0; q < built.nodes.length; q++) {
        built.nodes[q].sprite.material.color.setHex(night ? 0xdde5e2 : 0xffffff);
      }
      host.setAttribute('data-light', light);
      btnDay.setAttribute('aria-pressed', night ? 'false' : 'true');
      btnNight.setAttribute('aria-pressed', night ? 'true' : 'false');
      applyState(false);
      if (announce) status.textContent = night ? t.statusNight : t.statusDay;
      if (ready) draw();
    }

    function selectNode(id, announce) {
      var i, n = null;
      for (i = 0; i < built.nodes.length; i++) {
        if (built.nodes[i].src.id === id) n = built.nodes[i];
        built.nodes[i].cap.material = built.nodes[i].src.id === id ? built.mats.capSel : built.mats.cap;
      }
      for (i = 0; i < nodeButtons.length; i++) {
        nodeButtons[i].setAttribute('aria-pressed',
          nodeButtons[i].getAttribute('data-node') === id ? 'true' : 'false');
      }
      selected = n;
      if (!n) return;
      cardId.textContent = n.src.id + ' · ' + n.src.s + ' · ' + t.gate + ' ' + n.src.gate;
      cardName.textContent = n.src[lang].name;
      cardArea.textContent = t.areas[n.src.area] || n.src.area;
      card.hidden = false;
      empty.hidden = true;
      moveTo({ tx: n.x, tz: n.z, ty: 1.5, dist: 21, pol: 0.88, az: view.az },
        announce === false ? null : t.flew + n.src.id + ' ' + n.src[lang].name + (lang === 'en' ? '.' : '。'));
    }

    /* ------------------------------------------------------------- controls */
    var drag = null;
    canvas.addEventListener('pointerdown', function (e) {
      if (!ready) return;
      canvas.focus();
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY };
      if (canvas.setPointerCapture) { try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } }
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      fly = null;
      view.az -= (e.clientX - drag.x) * 0.006;
      view.pol = Math.max(0.16, Math.min(1.46, view.pol - (e.clientY - drag.y) * 0.005));
      drag.x = e.clientX; drag.y = e.clientY;
      draw();
    });
    function endDrag(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      drag = null;
    }
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    function zoom(f) {
      fly = null;
      view.dist = Math.max(6, Math.min(HOME.dist * 2.4, view.dist * f));
      draw();
    }
    /* The wheel only zooms once the reader has taken hold of the view; before
       that the page keeps scrolling normally past the chapter. */
    canvas.addEventListener('wheel', function (e) {
      if (!ready || document.activeElement !== canvas) return;
      e.preventDefault();
      zoom(Math.exp(e.deltaY * 0.0012));
    }, { passive: false });

    canvas.addEventListener('keydown', function (e) {
      var k = e.key, step = 0.09;
      if (k === 'ArrowLeft') { fly = null; view.az -= step; }
      else if (k === 'ArrowRight') { fly = null; view.az += step; }
      else if (k === 'ArrowUp') { fly = null; view.pol = Math.max(0.16, view.pol - step * 0.7); }
      else if (k === 'ArrowDown') { fly = null; view.pol = Math.min(1.46, view.pol + step * 0.7); }
      else if (k === '+' || k === '=') zoom(0.88);
      else if (k === '-' || k === '_') zoom(1 / 0.88);
      else if (k === 'Home') { resetView(); return; }
      else return;
      e.preventDefault();
      draw();
    });

    function resetView() {
      moveTo({ az: HOME.az, pol: HOME.pol, dist: HOME.dist, tx: HOME.tx, ty: HOME.ty, tz: HOME.tz }, t.reset);
    }

    btnOn.addEventListener('click', function () { state = 'on'; applyState(true); });
    btnOff.addEventListener('click', function () { state = 'off'; applyState(true); });
    btnDay.addEventListener('click', function () { light = 'day'; applyLight(true); });
    btnNight.addEventListener('click', function () { light = 'night'; applyLight(true); });
    btnReset.addEventListener('click', resetView);
    for (var bi = 0; bi < nodeButtons.length; bi++) {
      (function (b) {
        b.addEventListener('click', function () { selectNode(b.getAttribute('data-node')); });
      })(nodeButtons[bi]);
    }

    canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); fail(); });

    applyLight(false);
    applyState(false);
    if (stateBox) stateBox.textContent = t.loading;

    /* First frame when the chapter approaches the viewport, or shortly after
       load as a guard. Entering the viewport draws exactly one frame: the
       scene never spins on its own. */
    function first() {
      if (ready) return;
      resize();
      draw();
    }
    if (window.IntersectionObserver) {
      var io = new window.IntersectionObserver(function (entries) {
        for (var j = 0; j < entries.length; j++) {
          if (entries[j].isIntersecting) { first(); io.disconnect(); }
        }
      }, { rootMargin: '700px 0px' });
      io.observe(host);
    }
    window.setTimeout(first, 1400);
    window.addEventListener('resize', function () {
      if (!ready) return;
      if (Math.abs(wrap.clientWidth - lastW) < 2) return;
      resize();
      draw();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
