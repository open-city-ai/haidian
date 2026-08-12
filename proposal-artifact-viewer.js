(() => {
  'use strict';

  const cache = new Map();
  const palette = ['#65b7ff', '#ffc46b', '#9d8cff', '#62d6a8', '#e08b78', '#75c7bd'];
  let config = null;
  let selectedIndex = -1;

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[ch]);

  function fileKind(path) {
    const lower = path.toLowerCase();
    if (/\.(?:png|jpe?g|webp|gif|svg)$/.test(lower)) return 'image';
    if (/\.(?:mp4|webm)$/.test(lower)) return 'video';
    if (/\.(?:mp3|m4a|ogg)$/.test(lower)) return 'audio';
    if (lower.endsWith('.geojson')) return 'geojson';
    if (lower.endsWith('.json')) return 'json';
    if (/\.(?:csv|tsv)$/.test(lower)) return 'table';
    if (/\.(?:md|markdown)$/.test(lower)) return 'markdown';
    if (/\.pdf$/.test(lower)) return 'pdf';
    if (/\.(?:html?|xhtml)$/.test(lower)) return 'html';
    if (/\.(?:txt|log|yml|yaml)$/.test(lower)) return 'text';
    return 'unknown';
  }

  function mediaMime(path) {
    const extension = String(path).toLowerCase().split('.').pop();
    return ({mp4:'video/mp4', webm:'video/webm', mp3:'audio/mpeg', m4a:'audio/mp4', ogg:'audio/ogg'})[extension] || '';
  }

  function safeMediaReference(value) {
    if (typeof value !== 'string' || !value || value.includes('\\')) return '';
    const parts = value.split('/');
    return parts.every(part => part && part !== '.' && part !== '..') ? value : '';
  }

  function mediaLink(path) {
    const safe = safeMediaReference(path);
    return safe ? config.url(safe) : '';
  }

  function hash(value) {
    let result = 2166136261;
    for (const ch of String(value)) {
      result ^= ch.charCodeAt(0);
      result = Math.imul(result, 16777619);
    }
    return result >>> 0;
  }

  function dataPattern(path) {
    const seed = hash(path);
    const accentLine = seed % 5;
    return Array.from({length: 5}, (_, index) => {
      const width = 48 + ((seed >>> (index * 3)) % 40);
      const indent = ((seed >>> (index * 2 + 1)) % 3) * 4;
      const tone = index === accentLine ? 'accent' : 'blue';
      return `<span class="data-line ${tone}" style="--data-width:${width}%;--data-indent:${indent}px"></span>`;
    }).join('');
  }

  function previewMarkup(item) {
    const path = item.path;
    const kind = fileKind(path);
    const url = config.url(path);
    if (kind === 'image') return `<img src="${escapeHTML(url)}" alt="" loading="lazy" decoding="async">`;
    if (kind === 'video') {
      const poster = mediaLink(item.poster);
      return poster
        ? `<img src="${escapeHTML(poster)}" alt="" loading="lazy" decoding="async"><span class="preview-media-badge">VIDEO</span>`
        : '<div class="preview-video"><span>VIDEO</span></div>';
    }
    if (kind === 'audio') return '<div class="preview-audio"><span>AUDIO</span><i></i><i></i><i></i><i></i></div>';
    if (kind === 'geojson') return '<div class="preview-grid"><span class="preview-caption">点击后绘制空间图层</span></div>';
    if (kind === 'json' || kind === 'table') return `<div class="preview-data">${dataPattern(path)}<span class="preview-caption">点击后读取结构化内容</span></div>`;
    if (kind === 'markdown' || kind === 'text') return '<div class="preview-document"><span></span><span></span><span></span><span></span><span></span><span class="preview-caption">点击后渲染文档</span></div>';
    if (kind === 'pdf') return '<div class="preview-pdf"></div>';
    if (kind === 'html') return '<div class="preview-web"></div>';
    return `<div class="preview-unknown">${escapeHTML(config.type(path))}</div>`;
  }

  function renderCards() {
    const root = document.getElementById('artifactGroups');
    if (!root || !config) return;
    root.innerHTML = Object.keys(config.groups).map(group => {
      const items = config.artifacts.filter(item => item.group === group);
      const cards = items.map(item => `<button class="artifact-card" type="button" data-artifact-path="${escapeHTML(item.path)}" title="站内查看 ${escapeHTML(item.path)}">
        <span class="artifact-preview">${previewMarkup(item)}</span>
        <span class="artifact-card-meta"><span class="artifact-card-type">${escapeHTML(config.type(item.path))}</span><span class="artifact-card-name">${escapeHTML(config.label(item.path))}</span><span class="artifact-card-action">查看 →</span></span>
      </button>`).join('');
      return `<section class="artifact-group"><div class="artifact-title"><span>${escapeHTML(config.groups[group].zh)}</span><span>${items.length}</span></div><div class="artifact-list">${cards || '<div class="artifact-empty">没有此类文件</div>'}</div></section>`;
    }).join('');
    root.querySelectorAll('[data-artifact-path]').forEach(button => {
      button.addEventListener('click', () => open(button.dataset.artifactPath));
    });
  }

  async function readText(path) {
    const key = `text:${path}`;
    if (!cache.has(key)) cache.set(key, config.fetchText(config.url(path)));
    return cache.get(key);
  }

  async function readJSON(path) {
    const key = `json:${path}`;
    if (!cache.has(key)) cache.set(key, config.fetchJSON(config.url(path)));
    return cache.get(key);
  }

  function coordinateSequences(geometry) {
    if (!geometry) return [];
    const coordinates = geometry.coordinates;
    if (geometry.type === 'Point') return [{coords: [coordinates], point: true}];
    if (geometry.type === 'MultiPoint') return (coordinates || []).map(point => ({coords: [point], point: true}));
    if (geometry.type === 'LineString') return [{coords: coordinates || [], closed: false}];
    if (geometry.type === 'MultiLineString') return (coordinates || []).map(line => ({coords: line, closed: false}));
    if (geometry.type === 'Polygon') return (coordinates || []).map(ring => ({coords: ring, closed: true}));
    if (geometry.type === 'MultiPolygon') return (coordinates || []).flatMap(polygon => polygon.map(ring => ({coords: ring, closed: true})));
    if (geometry.type === 'GeometryCollection') return (geometry.geometries || []).flatMap(coordinateSequences);
    return [];
  }

  function geoSvg(data, mini = false) {
    const features = Array.isArray(data?.features) ? data.features : [];
    const rendered = features.flatMap((feature, featureIndex) => coordinateSequences(feature.geometry).map(sequence => ({...sequence, featureIndex})));
    const points = rendered.flatMap(sequence => sequence.coords).filter(point => Array.isArray(point) && Number.isFinite(Number(point[0])) && Number.isFinite(Number(point[1]))).map(point => [Number(point[0]), Number(point[1])]);
    if (!points.length) return '<div class="preview-unknown">NO GEOMETRY</div>';
    let minX = Math.min(...points.map(point => point[0]));
    let maxX = Math.max(...points.map(point => point[0]));
    let minY = Math.min(...points.map(point => point[1]));
    let maxY = Math.max(...points.map(point => point[1]));
    if (minX === maxX) { minX -= 1; maxX += 1; }
    if (minY === maxY) { minY -= 1; maxY += 1; }
    const width = mini ? 420 : 1040;
    const height = mini ? 240 : 600;
    const pad = mini ? 18 : 46;
    const scale = Math.min((width - pad * 2) / (maxX - minX), (height - pad * 2) / (maxY - minY));
    const offsetX = (width - (maxX - minX) * scale) / 2;
    const offsetY = (height - (maxY - minY) * scale) / 2;
    const project = point => [offsetX + (Number(point[0]) - minX) * scale, height - offsetY - (Number(point[1]) - minY) * scale];
    const grid = Array.from({length: 9}, (_, index) => {
      const x = index * width / 8;
      const y = index * height / 8;
      return `<path class="map-grid" d="M${x.toFixed(1)} 0V${height}M0 ${y.toFixed(1)}H${width}"/>`;
    }).join('');
    const shapes = rendered.map(sequence => {
      const color = palette[sequence.featureIndex % palette.length];
      if (sequence.point) {
        const [x, y] = project(sequence.coords[0]);
        return `<circle class="map-point" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${mini ? 3 : 5}" style="fill:${color}"/>`;
      }
      const d = sequence.coords.map((point, index) => {
        const [x, y] = project(point);
        return `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
      }).join(' ') + (sequence.closed ? ' Z' : '');
      return `<path class="map-shape" d="${d}" style="stroke:${color};fill:${sequence.closed ? `${color}20` : 'none'}"/>`;
    }).join('');
    return `<svg class="mini-map" viewBox="0 0 ${width} ${height}" role="img" aria-label="GeoJSON 空间图层"><rect width="100%" height="100%" fill="#07101a"/>${grid}${shapes}</svg>`;
  }

  function recordSet(data) {
    if (Array.isArray(data)) return {name: 'records', rows: data};
    if (!data || typeof data !== 'object') return {name: 'value', rows: [{value: data}]};
    const preferred = ['metrics', 'sources', 'standards', 'items', 'assumptions', 'checks', 'files', 'risks', 'scenarios', 'features'];
    for (const key of preferred) {
      const value = data[key];
      if (Array.isArray(value)) return {name: key, rows: value};
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return {name: key, rows: Object.entries(value).map(([id, item]) => item && typeof item === 'object' ? {id, ...item} : {id, value: item})};
      }
    }
    const arrayEntry = Object.entries(data).find(([, value]) => Array.isArray(value));
    if (arrayEntry) return {name: arrayEntry[0], rows: arrayEntry[1]};
    const values = Object.values(data);
    if (values.length && values.every(value => value && typeof value === 'object' && !Array.isArray(value))) {
      return {name: 'entries', rows: Object.entries(data).map(([id, item]) => ({id, ...item}))};
    }
    return {name: 'fields', rows: Object.entries(data).map(([key, value]) => ({key, value}))};
  }

  function compactValue(value, limit = 240) {
    if (value === null) return 'null';
    if (value === undefined) return '';
    const output = typeof value === 'object' ? JSON.stringify(value) : String(value);
    return output.length > limit ? `${output.slice(0, limit)}…` : output;
  }

  function renderTable(rows, name = 'records') {
    const normalized = rows.map(row => row && typeof row === 'object' && !Array.isArray(row) ? row : {value: row});
    const columns = [...new Set(normalized.slice(0, 80).flatMap(row => Object.keys(row)))].slice(0, 10);
    if (!columns.length) return '<div class="artifact-section-note">没有可表格化的记录</div>';
    const head = columns.map(column => `<th>${escapeHTML(column)}</th>`).join('');
    const body = normalized.map(row => `<tr>${columns.map(column => `<td>${escapeHTML(compactValue(row[column]))}</td>`).join('')}</tr>`).join('');
    return `<div class="artifact-table-wrap"><table class="artifact-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div><div class="artifact-section-note">${escapeHTML(name)} · ${normalized.length} 条记录 · ${columns.length} 个可见字段</div>`;
  }

  function jsonTree(value, depth = 0, key = '') {
    const label = key ? `<span class="json-tree-key">${escapeHTML(key)}</span>` : '';
    if (value === null) return `<div>${label}${key ? ': ' : ''}<span class="json-tree-null">null</span></div>`;
    if (typeof value !== 'object') return `<div>${label}${key ? ': ' : ''}<span class="json-tree-value">${escapeHTML(compactValue(value, 1000))}</span></div>`;
    const entries = Array.isArray(value) ? value.map((item, index) => [String(index), item]) : Object.entries(value);
    const summary = `${label}${label ? ' · ' : ''}${Array.isArray(value) ? `${entries.length} items` : `${entries.length} fields`}`;
    return `<details ${depth < 1 ? 'open' : ''}><summary>${summary}</summary><div class="json-tree">${entries.map(([childKey, child]) => jsonTree(child, depth + 1, childKey)).join('')}</div></details>`;
  }

  function renderJSON(data) {
    const records = recordSet(data);
    const topKeys = data && typeof data === 'object' && !Array.isArray(data) ? Object.keys(data).length : 0;
    const scalarCount = data && typeof data === 'object' ? Object.values(data).filter(value => value === null || typeof value !== 'object').length : 1;
    return `<div class="artifact-render artifact-data-layout">
      <section class="artifact-summary"><div class="artifact-summary-card"><div class="artifact-summary-value">${records.rows.length}</div><div class="artifact-summary-label">结构化记录</div></div><div class="artifact-summary-card"><div class="artifact-summary-value">${topKeys}</div><div class="artifact-summary-label">顶层字段</div></div><div class="artifact-summary-card"><div class="artifact-summary-value">${scalarCount}</div><div class="artifact-summary-label">直接数值</div></div><div class="artifact-summary-card"><div class="artifact-summary-value">JSON</div><div class="artifact-summary-label">机器可读资料</div></div></section>
      <section class="artifact-section"><h3>数据表</h3>${renderTable(records.rows, records.name)}</section>
      <section class="artifact-section"><h3>完整数据树</h3><div class="artifact-section-note">展开任意节点查看层级与原始字段</div><div class="json-tree">${jsonTree(data)}</div></section>
    </div>`;
  }

  function geometryTypes(features) {
    return [...new Set(features.map(feature => feature?.geometry?.type).filter(Boolean))];
  }

  function renderGeoJSON(data) {
    const features = Array.isArray(data?.features) ? data.features : [];
    const types = geometryTypes(features);
    const rows = features.map(feature => ({id: feature.id || feature.properties?.id || '', geometry: feature.geometry?.type || '', ...(feature.properties || {})}));
    return `<div class="artifact-render artifact-map-layout">
      <section class="artifact-summary"><div class="artifact-summary-card"><div class="artifact-summary-value">${features.length}</div><div class="artifact-summary-label">空间要素</div></div><div class="artifact-summary-card"><div class="artifact-summary-value">${types.length}</div><div class="artifact-summary-label">几何类型</div></div><div class="artifact-summary-card"><div class="artifact-summary-value">${escapeHTML(data?.crs?.properties?.name || 'AUTO')}</div><div class="artifact-summary-label">坐标参考</div></div><div class="artifact-summary-card"><div class="artifact-summary-value">GEO</div><div class="artifact-summary-label">可复算图层</div></div></section>
      <section class="artifact-map-canvas">${geoSvg(data)}</section>
      <section class="artifact-section"><h3>图层属性</h3><div class="artifact-section-note">${escapeHTML(types.join(' · ') || '未声明几何类型')}</div>${renderTable(rows, 'features')}</section>
    </div>`;
  }

  function parseDelimited(text, delimiter) {
    const rows = [];
    let row = [], cell = '', quoted = false;
    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      if (char === '"' && quoted && text[index + 1] === '"') { cell += '"'; index += 1; continue; }
      if (char === '"') { quoted = !quoted; continue; }
      if (char === delimiter && !quoted) { row.push(cell); cell = ''; continue; }
      if ((char === '\n' || char === '\r') && !quoted) {
        if (char === '\r' && text[index + 1] === '\n') index += 1;
        row.push(cell); if (row.some(value => value !== '')) rows.push(row); row = []; cell = ''; continue;
      }
      cell += char;
    }
    row.push(cell); if (row.some(value => value !== '')) rows.push(row);
    const headers = rows.shift() || [];
    return rows.map(values => Object.fromEntries(headers.map((header, index) => [header || `column_${index + 1}`, values[index] || ''])));
  }

  function resolveLocalAsset(raw, currentPath) {
    try {
      const base = new URL(`https://artifact.invalid/${currentPath}`);
      const resolved = new URL(raw, base);
      if (resolved.origin !== base.origin) return '';
      const path = decodeURIComponent(resolved.pathname.replace(/^\//, ''));
      if (!path || path.split('/').some(part => part === '..')) return '';
      return config.url(path);
    } catch (error) { return ''; }
  }

  function inlineMarkdown(text, currentPath) {
    let output = escapeHTML(text);
    output = output.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, raw) => {
      const src = resolveLocalAsset(raw.replaceAll('&amp;', '&'), currentPath);
      return src ? `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" loading="lazy">` : escapeHTML(alt);
    });
    output = output.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (_, label, href) => `<a href="${escapeHTML(href.replaceAll('&amp;', '&'))}" target="_blank" rel="noopener">${label}</a>`);
    output = output.replace(/`([^`]+)`/g, '<code>$1</code>');
    output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    output = output.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return output;
  }

  function markdownToHTML(text, currentPath) {
    const clean = text.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
    const lines = clean.split(/\r?\n/);
    const html = [];
    let index = 0;
    const isSpecial = line => /^\s*(#{1,6}\s|```|>|[-*+]\s|\d+\.\s|\|)/.test(line);
    while (index < lines.length) {
      const line = lines[index];
      if (!line.trim()) { index += 1; continue; }
      if (line.trim().startsWith('```')) {
        const language = line.trim().slice(3);
        const code = []; index += 1;
        while (index < lines.length && !lines[index].trim().startsWith('```')) { code.push(lines[index]); index += 1; }
        index += 1; html.push(`<pre data-language="${escapeHTML(language)}"><code>${escapeHTML(code.join('\n'))}</code></pre>`); continue;
      }
      const heading = line.match(/^\s*(#{1,6})\s+(.+)$/);
      if (heading) { const level = Math.min(heading[1].length, 4); html.push(`<h${level}>${inlineMarkdown(heading[2], currentPath)}</h${level}>`); index += 1; continue; }
      if (line.trim().startsWith('|') && index + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[index + 1])) {
        const cells = value => value.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
        const headers = cells(line); index += 2; const rows = [];
        while (index < lines.length && lines[index].trim().startsWith('|')) { rows.push(cells(lines[index])); index += 1; }
        html.push(`<div class="artifact-table-wrap"><table><thead><tr>${headers.map(cell => `<th>${inlineMarkdown(cell, currentPath)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${headers.map((_, cellIndex) => `<td>${inlineMarkdown(row[cellIndex] || '', currentPath)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`); continue;
      }
      const listMatch = line.match(/^\s*([-*+]|\d+\.)\s+(.+)$/);
      if (listMatch) {
        const ordered = /\d+\./.test(listMatch[1]); const items = [];
        while (index < lines.length) {
          const match = lines[index].match(/^\s*([-*+]|\d+\.)\s+(.+)$/);
          if (!match || /\d+\./.test(match[1]) !== ordered) break;
          items.push(match[2]); index += 1;
        }
        const tag = ordered ? 'ol' : 'ul'; html.push(`<${tag}>${items.map(item => `<li>${inlineMarkdown(item, currentPath)}</li>`).join('')}</${tag}>`); continue;
      }
      if (line.trim().startsWith('>')) {
        const quotes = [];
        while (index < lines.length && lines[index].trim().startsWith('>')) { quotes.push(lines[index].replace(/^\s*>\s?/, '')); index += 1; }
        html.push(`<blockquote>${inlineMarkdown(quotes.join(' '), currentPath)}</blockquote>`); continue;
      }
      const paragraph = [line.trim()]; index += 1;
      while (index < lines.length && lines[index].trim() && !isSpecial(lines[index])) { paragraph.push(lines[index].trim()); index += 1; }
      html.push(`<p>${inlineMarkdown(paragraph.join(' '), currentPath)}</p>`);
    }
    return html.join('');
  }

  async function hydratePreview(element) {
    if (element.dataset.hydrated === 'true') return;
    element.dataset.hydrated = 'true';
    const path = element.dataset.previewPath;
    const kind = element.dataset.previewKind;
    try {
      if (kind === 'geojson') {
        const data = await readJSON(path);
        element.outerHTML = geoSvg(data, true);
      } else if (kind === 'json') {
        const data = await readJSON(path);
        const records = recordSet(data);
        element.insertAdjacentHTML('beforeend', `<div class="mini-data-stats"><span><strong>${records.rows.length}</strong><br>records</span><span>${escapeHTML(records.name)}</span></div>`);
        element.querySelector('.preview-caption')?.remove();
      } else if (kind === 'table') {
        const rows = parseDelimited(await readText(path), path.toLowerCase().endsWith('.tsv') ? '\t' : ',');
        element.insertAdjacentHTML('beforeend', `<div class="mini-data-stats"><span><strong>${rows.length}</strong><br>rows</span><span>TABLE</span></div>`);
        element.querySelector('.preview-caption')?.remove();
      } else if (kind === 'markdown' || kind === 'text') {
        const text = await readText(path);
        const heading = text.match(/^#{1,6}\s+(.+)$/m)?.[1] || text.split(/\r?\n/).find(line => line.trim()) || config.label(path);
        element.insertAdjacentHTML('beforeend', `<span class="preview-caption">${escapeHTML(heading.slice(0, 80))}</span>`);
        element.querySelectorAll('.preview-caption')[0]?.remove();
      }
    } catch (error) {
      element.querySelector('.preview-caption')?.replaceChildren('预览载入失败，可点击查看');
    }
  }

  function hydratePreviews() {
    const elements = [...document.querySelectorAll('[data-preview-path]')];
    if (!('IntersectionObserver' in window)) { elements.forEach(hydratePreview); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target); hydratePreview(entry.target);
    }), {rootMargin: '300px'});
    elements.forEach(element => observer.observe(element));
  }

  async function renderSelected(item) {
    const body = document.getElementById('artifactViewerBody');
    const path = item.path;
    const kind = fileKind(path);
    const url = config.url(path);
    if (kind === 'image') { body.innerHTML = `<div class="artifact-render image"><img src="${escapeHTML(url)}" alt="${escapeHTML(config.label(path))}"></div>`; return; }
    if (kind === 'video') {
      const poster = mediaLink(item.poster);
      const caption = mediaLink(item.caption);
      const transcript = mediaLink(item.transcript);
      const language = item.language === 'en' ? 'en' : 'zh';
      body.innerHTML = `<div class="artifact-render artifact-media"><video controls playsinline preload="metadata"${poster ? ` poster="${escapeHTML(poster)}"` : ''}><source src="${escapeHTML(url)}" type="${mediaMime(path)}">${caption ? `<track kind="captions" srclang="${language}" label="${language === 'zh' ? '中文字幕' : 'English captions'}" src="${escapeHTML(caption)}" default>` : ''}</video><div class="artifact-media-copy"><h2>${escapeHTML(item.title_zh || item.title_en || config.label(path))}</h2><p>${escapeHTML(item.description_zh || item.description_en || '')}</p>${transcript ? `<a href="${escapeHTML(transcript)}" target="_blank" rel="noopener">阅读文字稿 ↗</a>` : ''}</div></div>`;
      return;
    }
    if (kind === 'audio') {
      const transcript = mediaLink(item.transcript);
      body.innerHTML = `<div class="artifact-render artifact-media audio"><div class="artifact-media-copy"><span class="artifact-media-kicker">AUDIO · MUSIC · SOUND</span><h2>${escapeHTML(item.title_zh || item.title_en || config.label(path))}</h2><p>${escapeHTML(item.description_zh || item.description_en || '')}</p><audio controls preload="metadata"><source src="${escapeHTML(url)}" type="${mediaMime(path)}"></audio>${transcript ? `<a href="${escapeHTML(transcript)}" target="_blank" rel="noopener">阅读文字稿与授权说明 ↗</a>` : ''}</div></div>`;
      return;
    }
    if (kind === 'pdf') { body.innerHTML = `<iframe class="artifact-frame" src="${escapeHTML(url)}#view=FitH&pagemode=none" title="${escapeHTML(config.label(path))}"></iframe>`; return; }
    if (kind === 'html') { body.innerHTML = `<div class="artifact-render"><div class="artifact-sandbox-note">站内预览运行在隔离沙箱中；需要完整交互或下载时，可使用右上角“打开原文件”</div><iframe class="artifact-frame" src="${escapeHTML(url)}" sandbox="allow-scripts allow-forms allow-modals allow-popups" referrerpolicy="no-referrer" title="${escapeHTML(config.label(path))}"></iframe></div>`; return; }
    if (kind === 'geojson') { body.innerHTML = renderGeoJSON(await readJSON(path)); return; }
    if (kind === 'json') { body.innerHTML = renderJSON(await readJSON(path)); return; }
    if (kind === 'table') {
      const rows = parseDelimited(await readText(path), path.toLowerCase().endsWith('.tsv') ? '\t' : ',');
      body.innerHTML = `<div class="artifact-render artifact-data-layout"><section class="artifact-summary"><div class="artifact-summary-card"><div class="artifact-summary-value">${rows.length}</div><div class="artifact-summary-label">数据行</div></div><div class="artifact-summary-card"><div class="artifact-summary-value">${Object.keys(rows[0] || {}).length}</div><div class="artifact-summary-label">字段列</div></div></section><section class="artifact-section"><h3>结构化表格</h3>${renderTable(rows, 'table')}</section></div>`; return;
    }
    const text = await readText(path);
    if (kind === 'markdown') { body.innerHTML = `<article class="artifact-render artifact-document">${markdownToHTML(text, path)}</article>`; return; }
    body.innerHTML = `<article class="artifact-render artifact-document"><h1>${escapeHTML(config.label(path))}</h1><pre><code>${escapeHTML(text)}</code></pre></article>`;
  }

  async function open(path) {
    if (!config) return;
    selectedIndex = config.artifacts.findIndex(item => item.path === path);
    if (selectedIndex < 0) return;
    const item = config.artifacts[selectedIndex];
    const viewer = document.getElementById('artifactViewer');
    const body = document.getElementById('artifactViewerBody');
    document.getElementById('artifactViewerType').textContent = config.type(path);
    document.getElementById('artifactViewerTitle').textContent = config.label(path);
    document.getElementById('artifactViewerPath').textContent = path;
    const raw = document.getElementById('artifactRawLink'); raw.href = config.url(path);
    document.getElementById('artifactPrev').disabled = selectedIndex === 0;
    document.getElementById('artifactNext').disabled = selectedIndex === config.artifacts.length - 1;
    body.innerHTML = '<div class="artifact-loading">RENDERING ARTIFACT</div>';
    viewer.hidden = false; viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('artifact-viewer-open');
    document.getElementById('artifactViewerClose').focus({preventScroll: true});
    try { await renderSelected(item); }
    catch (error) { body.innerHTML = `<div class="artifact-error"><strong>这份文件暂时无法在站内渲染</strong><p>${escapeHTML(error.message)}</p><p>可以使用右上角“打开原文件”继续查看</p></div>`; }
  }

  function close() {
    const viewer = document.getElementById('artifactViewer');
    if (!viewer) return;
    viewer.hidden = true; viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('artifact-viewer-open');
  }

  function bindViewer() {
    document.getElementById('artifactViewerClose')?.addEventListener('click', close);
    document.getElementById('artifactPrev')?.addEventListener('click', () => selectedIndex > 0 && open(config.artifacts[selectedIndex - 1].path));
    document.getElementById('artifactNext')?.addEventListener('click', () => selectedIndex < config.artifacts.length - 1 && open(config.artifacts[selectedIndex + 1].path));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !document.getElementById('artifactViewer')?.hidden) { event.stopImmediatePropagation(); close(); } }, true);
  }

  function mount(options) {
    config = options;
    renderCards();
    bindViewer();
    return {open, close};
  }

  window.ProposalArtifactViewer = {mount, open, close, hydrate: hydratePreviews, fileKind};
})();
