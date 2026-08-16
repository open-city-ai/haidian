/* 京张·智脉 三维交互场景（本地离线，Three.js r134 UMD）*/
(function () {
  var data = window.__JZ_SCENE__;
  var container = document.getElementById('jz-3d');
  var fallback = document.getElementById('jz-3d-fallback');
  if (!data || !container) return;

  function webglAvailable() {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  }

  if (!webglAvailable() || typeof THREE === 'undefined') {
    container.style.display = 'none';
    if (fallback) fallback.style.display = 'block';
    return;
  }

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);
  scene.fog = new THREE.Fog(0x0f172a, 8000, 26000);

  var camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 10, 50000);
  camera.position.set(4000, 6000, 8000);
  camera.lookAt(0, 0, 0);

  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  var light = new THREE.DirectionalLight(0xffffff, 1.1);
  light.position.set(5000, 9000, 5000);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x8899bb, 0.9));

  function buildPolygon(pts, color, height) {
    var shape = new THREE.Shape();
    pts.forEach(function (p, i) { if (i === 0) shape.moveTo(p[0], p[1]); else shape.lineTo(p[0], p[1]); });
    var geo = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false });
    var mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.85 });
    var mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0;
    return mesh;
  }

  function buildLine(pts, color) {
    var geo = new THREE.BufferGeometry().setFromPoints(pts.map(function (p) { return new THREE.Vector3(p[0], 30, p[1]); }));
    return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: new THREE.Color(color) }));
  }

  data.land.forEach(function (d) { d.pts.forEach(function (ring) { scene.add(buildPolygon(ring, d.color, 60)); }); });
  data.roads.forEach(function (d) { d.pts.forEach(function (line) { scene.add(buildLine(line, d.color)); }); });
  data.buildings.forEach(function (d) { d.pts.forEach(function (ring) { scene.add(buildPolygon(ring, d.color, d.h)); }); });
  data.keys.forEach(function (d) { d.pts.forEach(function (ring) {
    var pts = ring.map(function (p) { return new THREE.Vector3(p[0], 0, p[1]); });
    var geo = new THREE.BufferGeometry().setFromPoints(pts.concat([pts[0]]));
    scene.add(new THREE.LineLoop(geo, new THREE.LineBasicMaterial({ color: new THREE.Color(d.color) })));
  }); });

  var group = new THREE.Group();
  scene.children.forEach(function (c) { group.add(c); });
  scene.add(group);
  var bounds = new THREE.Box3().setFromObject(group);
  var center = bounds.getCenter(new THREE.Vector3());
  group.position.sub(center);
  camera.lookAt(0, 0, 0);
  camera.position.set(center.x, bounds.getSize(new THREE.Vector3()).y * 2, center.z + bounds.getSize(new THREE.Vector3()).z * 1.2);

  // 手动轨道控制：拖拽旋转、滚轮缩放
  var dragging = false, lastX = 0, lastY = 0, theta = 0, phi = Math.PI / 3, radius = camera.position.length();
  renderer.domElement.setAttribute('tabindex', '0');
  renderer.domElement.setAttribute('aria-label', '京张·智脉三维轴测场景，可用方向键旋转、加减号缩放');
  renderer.domElement.addEventListener('mousedown', function (e) { dragging = true; lastX = e.clientX; lastY = e.clientY; });
  window.addEventListener('mouseup', function () { dragging = false; });
  window.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    theta -= (e.clientX - lastX) * 0.005;
    phi = Math.max(0.3, Math.min(1.4, phi - (e.clientY - lastY) * 0.005));
    lastX = e.clientX; lastY = e.clientY;
  });
  renderer.domElement.addEventListener('wheel', function (e) {
    e.preventDefault();
    radius = Math.max(1500, Math.min(26000, radius * (e.deltaY > 0 ? 1.1 : 0.9)));
  }, { passive: false });
  renderer.domElement.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') theta -= 0.15;
    if (e.key === 'ArrowRight') theta += 0.15;
    if (e.key === 'ArrowUp') phi = Math.max(0.3, phi - 0.1);
    if (e.key === 'ArrowDown') phi = Math.min(1.4, phi + 0.1);
    if (e.key === '+' || e.key === '=') radius = Math.max(1500, radius * 0.9);
    if (e.key === '-') radius = Math.min(26000, radius * 1.1);
  });

  var auto = 0;
  function animate() {
    requestAnimationFrame(animate);
    if (!reduced && !dragging) { auto += 0.0008; }
    var t = theta + auto;
    camera.position.set(
      center.x + radius * Math.sin(phi) * Math.sin(t),
      center.y + radius * Math.cos(phi),
      center.z + radius * Math.sin(phi) * Math.cos(t)
    );
    camera.lookAt(center);
    renderer.render(scene, camera);
  }
  animate();
  window.addEventListener('resize', function () {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();
