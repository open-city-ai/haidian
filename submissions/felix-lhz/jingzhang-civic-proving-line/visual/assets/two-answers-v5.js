(() => {
  const node = document.getElementById('geometry-data'); const svg = document.getElementById('atlasSvg');
  if (!node || !svg) return;
  const geo = JSON.parse(node.textContent); const NS = 'http://www.w3.org/2000/svg';
  const all = geo.features.flatMap((f) => f.geometry?.type === 'Point' ? [f.geometry.coordinates] : f.geometry?.type === 'LineString' ? f.geometry.coordinates : f.geometry?.type === 'Polygon' ? f.geometry.coordinates.flat() : []);
  const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]); const b = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  const project = ([x, y]) => [150 + (x - b[0]) / (b[2] - b[0]) * 700, 90 + (b[3] - y) / (b[3] - b[1]) * 820];
  const family = (f) => { const id = String(f.id || f.properties?.id || ''); return /TRIAL|PLUGIN|CABINET|CONTROL/.test(id) ? 'ai' : /EVIDENCE|STAFF|EMERGENCY|UTILITY/.test(id) ? 'evidence' : 'baseline'; };
  const group = document.createElementNS(NS, 'g'); group.setAttribute('class', 'v5-geometry');
  for (const f of geo.features) { const g = f.geometry; const cls = `v5-object layer ${family(f)}`; let el;
    if (g.type === 'Point') { const [cx, cy] = project(g.coordinates); el = document.createElementNS(NS, 'circle'); Object.entries({ cx, cy, r: 7, class: cls }).forEach(([k, v]) => el.setAttribute(k, v)); }
    else { const coords = g.type === 'LineString' ? g.coordinates : g.coordinates[0]; el = document.createElementNS(NS, g.type === 'LineString' ? 'polyline' : 'polygon'); el.setAttribute('points', coords.map(project).map((p) => p.join(',')).join(' ')); el.setAttribute('class', cls); }
    el.dataset.geometryId = f.id || f.properties?.id; group.append(el);
  }
  svg.insertBefore(group, svg.querySelector('.station'));
  const updateMode = () => { const mode = document.body.dataset.mode; svg.querySelectorAll('.v5-object.ai').forEach((x) => x.classList.toggle('mode-muted', mode === 'baseline')); svg.querySelectorAll('.v5-object.baseline').forEach((x) => x.classList.toggle('mode-muted', mode === 'ai')); };
  document.querySelectorAll('[data-mode],[data-layer]').forEach((button) => button.addEventListener('click', () => requestAnimationFrame(updateMode))); updateMode();
})();
