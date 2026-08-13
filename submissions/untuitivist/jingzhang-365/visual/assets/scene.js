(function () {
  'use strict';
  const host = document.getElementById('scene3d');
  const fallback = document.getElementById('scene-fallback');
  if (!host || !window.THREE) {
    if (fallback) fallback.hidden = false;
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch (error) {
    if (fallback) fallback.hidden = false;
    host.dataset.error = 'webgl-unavailable';
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0xe9eee9, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xe9eee9, 58, 118);
  const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 220);
  camera.position.set(50, 42, 57);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x6f7a73, 2.5));
  const sun = new THREE.DirectionalLight(0xffffff, 3.0);
  sun.position.set(30, 55, 22);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -70;
  sun.shadow.camera.right = 70;
  sun.shadow.camera.top = 70;
  sun.shadow.camera.bottom = -70;
  scene.add(sun);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(150, 120),
    new THREE.MeshStandardMaterial({ color: 0xdce3dc, roughness: 0.96, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const makeMaterial = (color, roughness) => new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.08 });
  const material = {
    rail: makeMaterial(0x37443e, 0.55),
    timber: makeMaterial(0xa6885f, 0.82),
    pale: makeMaterial(0xf1f3ef, 0.9),
    screen: new THREE.MeshStandardMaterial({ color: 0xc94b3f, emissive: 0x43130f, roughness: 0.35 }),
    green: makeMaterial(0x2d7d5d, 0.88),
    blue: makeMaterial(0x356f9a, 0.78),
    gold: makeMaterial(0xc3922e, 0.7),
    person: makeMaterial(0x1e2924, 0.85)
  };

  function boxMesh(size, position, mat, cast) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), mat);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.castShadow = cast !== false;
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  }

  const stateObjects = { screens: [], canopies: [], people: [], seats: [], lockers: [] };
  const railLength = 92;
  boxMesh([1.0, 0.18, railLength], [-2.2, 0.12, 0], material.rail);
  boxMesh([1.0, 0.18, railLength], [2.2, 0.12, 0], material.rail);
  for (let z = -44; z <= 44; z += 4) boxMesh([7.5, 0.12, 0.5], [0, 0.04, z], material.timber, false);
  boxMesh([6.2, 0.08, railLength], [0, 0.2, 0], material.green, false);

  const areaPositions = [[-20, 0, 18], [0, 0, 0], [20, 0, -18]];
  const areaColors = [material.blue, material.green, material.gold];
  areaPositions.forEach((position, areaIndex) => {
    const [cx, , cz] = position;
    boxMesh([26, 0.35, 18], [cx, 0.15, cz], material.pale, false);
    boxMesh([25.5, 0.08, 4.0], [cx, 0.37, cz], areaColors[areaIndex], false);
    boxMesh([4.0, 0.08, 17.5], [cx, 0.38, cz], areaColors[areaIndex], false);
    const local = [[-8, -5], [8, -5], [-8, 5], [8, 5]];
    local.forEach((offset, scenarioIndex) => {
      const x = cx + offset[0];
      const z = cz + offset[1];
      boxMesh([5.4, 0.22, 3.8], [x, 0.52, z], areaColors[areaIndex]);
      for (let moduleIndex = 0; moduleIndex < 3; moduleIndex += 1) {
        const mx = x - 1.7 + moduleIndex * 1.7;
        boxMesh([1.25, 0.45, 2.2], [mx, 0.85, z], material.timber);
        const postA = boxMesh([0.12, 3.0, 0.12], [mx - 0.5, 2.4, z - 0.8], material.rail);
        const postB = boxMesh([0.12, 3.0, 0.12], [mx + 0.5, 2.4, z - 0.8], material.rail);
        const canopy = boxMesh([1.4, 0.16, 2.0], [mx, 3.9, z], areaColors[areaIndex]);
        canopy.userData.baseY = canopy.position.y;
        stateObjects.canopies.push(canopy);
        const screen = boxMesh([0.9, 1.2, 0.10], [mx, 2.25, z + 1.1], material.screen);
        screen.userData.baseY = screen.position.y;
        stateObjects.screens.push(screen);
        const seat = boxMesh([1.0, 0.25, 0.45], [mx, 0.75, z + 1.1], material.timber);
        stateObjects.seats.push(seat);
        const locker = boxMesh([0.7, 1.35, 0.65], [mx, 1.22, z - 1.05], material.blue);
        stateObjects.lockers.push(locker);
        [postA, postB].forEach(item => { item.userData.fixed = true; });
      }
      for (let personIndex = 0; personIndex < 5; personIndex += 1) {
        const angle = personIndex * 1.256 + scenarioIndex * 0.3;
        const px = x + Math.cos(angle) * 2.0;
        const pz = z + Math.sin(angle) * 1.4;
        const body = new THREE.Group();
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 0.75, 8), material.person);
        torso.position.y = 0.65;
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), material.person);
        head.position.y = 1.18;
        body.add(torso, head);
        body.position.set(px, 0.42, pz);
        body.userData.index = personIndex;
        scene.add(body);
        stateObjects.people.push(body);
      }
    });
  });

  for (let z = -40; z <= 40; z += 7) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.8, 8), material.timber);
    trunk.position.y = 1.0;
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 1), material.green);
    crown.position.y = 2.35;
    tree.add(trunk, crown);
    tree.position.set(z % 14 === 0 ? -5.5 : 5.5, 0, z);
    scene.add(tree);
  }

  let state = 'everyday';
  const stateSettings = {
    event: { color: 0xc94b3f, people: 1.0, screens: 1.0, canopyY: 3.9, seats: 0.35, lockers: 0.45 },
    everyday: { color: 0x247a5a, people: 0.58, screens: 0.28, canopyY: 3.25, seats: 1.0, lockers: 0.75 },
    care: { color: 0x2c6b9a, people: 0.18, screens: 0.0, canopyY: 2.55, seats: 0.55, lockers: 1.0 }
  };
  function applyState(nextState) {
    state = nextState;
    const settings = stateSettings[state];
    stateObjects.screens.forEach(item => { item.visible = settings.screens > 0; item.scale.y = Math.max(settings.screens, 0.01); });
    stateObjects.canopies.forEach(item => { item.position.y = settings.canopyY; item.scale.x = state === 'care' ? 0.55 : 1; });
    stateObjects.people.forEach(item => { item.visible = (item.userData.index / 5) < settings.people; });
    stateObjects.seats.forEach(item => { item.visible = settings.seats > 0.5 || item.position.x % 2 > 0; });
    stateObjects.lockers.forEach(item => { item.scale.y = 0.65 + settings.lockers * 0.35; item.material = state === 'care' ? material.blue : material.pale; });
    document.documentElement.style.setProperty('--state', '#' + settings.color.toString(16).padStart(6, '0'));
    host.dataset.state = state;
  }
  window.JZ365Scene = { setState: applyState, renderer, scene, camera };
  applyState(state);

  let pointerDown = false;
  let previousX = 0;
  let targetRotation = -0.12;
  let rotation = targetRotation;
  renderer.domElement.addEventListener('pointerdown', event => { pointerDown = true; previousX = event.clientX; renderer.domElement.setPointerCapture(event.pointerId); });
  renderer.domElement.addEventListener('pointermove', event => {
    if (!pointerDown) return;
    targetRotation += (event.clientX - previousX) * 0.006;
    previousX = event.clientX;
  });
  renderer.domElement.addEventListener('pointerup', () => { pointerDown = false; });
  renderer.domElement.addEventListener('wheel', event => {
    event.preventDefault();
    camera.position.multiplyScalar(event.deltaY > 0 ? 1.04 : 0.96);
    const distance = camera.position.length();
    if (distance < 50) camera.position.multiplyScalar(50 / distance);
    if (distance > 105) camera.position.multiplyScalar(105 / distance);
  }, { passive: false });

  function resize() {
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(host);
  resize();
  function animate(time) {
    rotation += (targetRotation - rotation) * 0.08;
    scene.rotation.y = rotation + Math.sin(time * 0.00012) * 0.015;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();
