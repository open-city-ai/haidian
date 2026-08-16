/*
 * 百年京张 AI 创新带 · 生物黏菌路网交互演示
 * Centenary Jingzhang AI Innovation Belt · Bio-Physarum Network Interactive Demo
 *
 * 数据来源：assets/demo_data.json（概念路网 + OSM 实测地铁站 + 临时边界）
 * 性质：概念方案演示。路网为算法模拟生成（agent_generated_design），非实测测绘、非审批几何。
 * 无障碍属性（tactile/slope）为按路网层级推导的概念假设值，待实测校准。
 *
 * 路径规划：加权 Dijkstra，权重 = length_m × tactile 惩罚 × slope 惩罚。
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * 语言包
   * ------------------------------------------------------------------ */
  var translations = {
    zh: {
      panelTitle: '百年京张 AI 创新带 · 交互演示',
      panelSubtitle: '生物黏菌路网更新概念方案（Bio-Physarum）',
      btnStart: '设置起点',
      btnEnd: '设置终点',
      btnObstacle: '放置障碍',
      btnClear: '清除全部',
      btnFit: '复位视图',
      rfidLabel: 'RFID 无感通行层',
      coverageLabel: '地铁站 800m 覆盖圈',
      routeInfoTitle: '路径信息',
      routeDistance: '总长度',
      routeWeighted: '无障碍加权',
      routeEdges: '路段数',
      routeTactileOk: '触觉铺装覆盖',
      routeSlopeMax: '最大坡度',
      noRoute: '未找到可达路径（可能存在障碍阻断）',
      pickStart: '请在地图上点击路网节点作为起点',
      pickEnd: '请在地图上点击路网节点作为终点',
      pickObstacle: '请在地图上点击路段以放置障碍（再次点击取消）',
      snapped: '已吸附到节点',
      startMarker: '起点',
      endMarker: '终点',
      obstacleMarker: '障碍',
      legendTitle: '图例',
      legendSpine: '智脉主轴（新建）',
      legendBranch: '东西支脉',
      legendLoop: '慢行环路',
      legendFeeder: '站城接驳',
      legendGreen: '京张遗产绿廊',
      legendTransfer: '地铁接驳（概念）',
      legendStation: '地铁站（OSM 实测）',
      legendRoute: '推荐路径',
      legendKeyArea: '重点片区（临时范围）',
      legendSite: '总体设计范围（临时边界）',
      legendObstacle: '障碍路段',
      dataDisclaimer: '数据性质：路网为算法模拟概念方案（非实测/非审批几何）；地铁站坐标为 OSM 公开数据；片区与边界为公告推断临时范围。',
      hintDefault: '提示：点击「设置起点」后在路网上选点，再「设置终点」生成路径；可放置障碍观察重路由。',
      routeFrom: '从',
      routeTo: '到',
      conceptualNote: '概念',
      measuredNote: '实测',
      scenesToggle: '收起场景',
      scenesTitle: '十大地标场景',
    },
    en: {
      panelTitle: 'Centenary Jingzhang AI Belt · Interactive Demo',
      panelSubtitle: 'Bio-Physarum road network renewal (concept proposal)',
      btnStart: 'Set start',
      btnEnd: 'Set end',
      btnObstacle: 'Place obstacle',
      btnClear: 'Clear all',
      btnFit: 'Reset view',
      rfidLabel: 'RFID barrier-free layer',
      coverageLabel: '800m metro coverage',
      routeInfoTitle: 'Route info',
      routeDistance: 'Total length',
      routeWeighted: 'Access-weighted',
      routeEdges: 'Segments',
      routeTactileOk: 'Tactile paving',
      routeSlopeMax: 'Max slope',
      noRoute: 'No reachable route (obstacles may block the path)',
      pickStart: 'Click a network node on the map as the start',
      pickEnd: 'Click a network node on the map as the end',
      pickObstacle: 'Click a segment to place/remove an obstacle',
      snapped: 'Snapped to node',
      startMarker: 'Start',
      endMarker: 'End',
      obstacleMarker: 'Obstacle',
      legendTitle: 'Legend',
      legendSpine: 'Physarum spine (new)',
      legendBranch: 'E-W branch',
      legendLoop: 'Slow loop',
      legendFeeder: 'Station feeder',
      legendGreen: 'Jing-Zhang heritage green corridor',
      legendTransfer: 'Metro transfer (concept)',
      legendStation: 'Metro station (OSM)',
      legendRoute: 'Recommended route',
      legendKeyArea: 'Key area (provisional)',
      legendSite: 'Site boundary (provisional)',
      legendObstacle: 'Blocked segment',
      dataDisclaimer: 'Network = algorithm-generated concept (not surveyed / not approval geometry); stations = OSM public data; key areas & boundary = provisional ranges inferred from announcements.',
      hintDefault: 'Tip: click "Set start", pick a node, then "Set end" to route. Place obstacles to see re-routing.',
      routeFrom: 'From',
      routeTo: 'To',
      conceptualNote: 'concept',
      measuredNote: 'measured',
      scenesToggle: 'Hide scenes',
      scenesTitle: 'Ten Design Scenes',
    },
  };

  /* ------------------------------------------------------------------ *
   * 颜色与样式常量（品牌 VI 色板）
   * ------------------------------------------------------------------ */
  var COLORS = {
    primary_vein: '#0052D4',   // AI Pulse Blue —— 新建主轴
    station_feeder: '#0052D4',
    secondary_branch: '#00B4DB', // Bio-Physarum Green
    local_loop: '#7c8db5',       // 慢行环路（灰蓝）
    green_corridor: '#15803d',   // 遗产绿廊
    transfer_link: '#8C2B2B',    // Heritage Crimson（地铁接驳/概念）
    route: '#FF6B6B',            // 推荐路径高亮
    obstacle: '#111827',
    station: '#8C2B2B',
    keyArea: '#00B4DB',
    site: '#475569',
    heritage: '#8C2B2B',
  };

  var HIERARCHY_WEIGHT = {
    primary_vein: 4,
    station_feeder: 3.5,
    secondary_branch: 3,
    local_loop: 2,
    green_corridor: 2,
    transfer_link: 2.5,
  };

  var HIERARCHY_LABEL = {
    primary_vein: { zh: '智脉主轴', en: 'Physarum spine' },
    station_feeder: { zh: '站城接驳', en: 'Station feeder' },
    secondary_branch: { zh: '东西支脉', en: 'E-W branch' },
    local_loop: { zh: '慢行环路', en: 'Slow loop' },
    green_corridor: { zh: '遗产绿廊', en: 'Heritage green corridor' },
    transfer_link: { zh: '地铁接驳（概念）', en: 'Metro transfer (concept)' },
  };

  /* ------------------------------------------------------------------ *
   * 无障碍加权 Dijkstra
   * ------------------------------------------------------------------ */
  // 权重 = length_m × tactile 惩罚 × slope 惩罚
  // tactile=false 时按 1.4 惩罚（视障用户缺少触觉引导）
  // slope>0.03 时按 1.3 惩罚（轮椅通行阻力）
  function edgeWeight(edge) {
    var w = edge.length_m || 1;
    if (!edge.tactile) w *= 1.4;
    if ((edge.slope || 0) > 0.03) w *= 1.3;
    return w;
  }

  function dijkstra(nodes, edges, startId, endId, blockedEdges) {
    var byId = {};
    nodes.forEach(function (n) { byId[n.id] = n; });
    var adj = {};
    edges.forEach(function (e) {
      (adj[e.from] = adj[e.from] || []).push(e);
      (adj[e.to] = adj[e.to] || []).push(e);
    });

    var dist = {}, prev = {}, visited = {};
    dist[startId] = 0;
    var pq = [[0, startId]];

    function popMin() {
      var best = 0;
      for (var i = 1; i < pq.length; i++) if (pq[i][0] < pq[best][0]) best = i;
      return pq.splice(best, 1)[0];
    }

    while (pq.length) {
      var cur = popMin();
      var d = cur[0], u = cur[1];
      if (visited[u]) continue;
      visited[u] = true;
      if (u === endId) break;
      var neigh = adj[u] || [];
      for (var k = 0; k < neigh.length; k++) {
        var e = neigh[k];
        if (blockedEdges && blockedEdges.has(e.id)) continue;
        var v = e.from === u ? e.to : e.from;
        var nd = d + edgeWeight(e);
        if (nd < (dist[v] === undefined ? Infinity : dist[v])) {
          dist[v] = nd;
          prev[v] = { edge: e, from: u };
          pq.push([nd, v]);
        }
      }
    }

    if (dist[endId] === undefined) return null;
    // 回溯路径
    var edgesPath = [], nodePath = [endId];
    var curN = endId;
    while (curN !== startId) {
      var step = prev[curN];
      if (!step) return null;
      edgesPath.push(step.edge);
      nodePath.push(step.from);
      curN = step.from;
    }
    edgesPath.reverse();
    nodePath.reverse();
    return { edges: edgesPath, nodes: nodePath, weighted: dist[endId] };
  }

  /* ------------------------------------------------------------------ *
   * 全局状态
   * ------------------------------------------------------------------ */
  var DATA = null;
  var SCENES = null;
  var map = null;
  var state = {
    mode: null, // 'start' | 'end' | 'obstacle' | null
    startId: null,
    endId: null,
    blockedEdges: {},   // edgeId -> true
    showRfid: false,
    showCoverage: false,
    lang: 'zh',
  };

  var layers = {
    edges: null, nodes: null, keyAreas: null, site: null, heritage: null,
    subway: null, coverage: null, rfid: null, route: null, obstacles: null,
    markers: null,
  };

  var nodeById = {};
  var edgeById = {};

  function t(key) { return (translations[state.lang] && translations[state.lang][key]) || key; }

  function $(id) { return document.getElementById(id); }

  /* ------------------------------------------------------------------ *
   * 初始化
   * ------------------------------------------------------------------ */
  function init() {
    state.lang = (document.body && document.body.getAttribute('data-default-lang')) || 'zh';
    renderScenes();
    if (typeof L === 'undefined') {
      var m = $('map');
      if (m) m.innerHTML = '<div style="padding:2rem;font-family:sans-serif;color:#475569">' +
        (state.lang === 'zh' ? '地图组件（Leaflet）加载失败，请检查网络连接。' : 'Map library (Leaflet) failed to load. Check your network connection.') + '</div>';
      return;
    }
    fetch('assets/demo_data.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        DATA = data;
        buildIndexes();
        buildMap();
        buildUI();
        applyLang();
        renderAll();
        applyDefaultRoute();
      })
      .catch(function (err) {
        console.error('demo_data.json load failed', err);
        if ($('map')) $('map').innerHTML = '<div style="padding:2rem;font-family:sans-serif">' +
          (state.lang === 'zh' ? '演示数据加载失败' : 'Demo data failed to load') + '</div>';
      });
  }

  function buildIndexes() {
    nodeById = {};
    edgeById = {};
    DATA.nodes.forEach(function (n) { nodeById[n.id] = n; });
    DATA.edges.forEach(function (e) { edgeById[e.id] = e; });
  }

  function buildMap() {
    map = L.map('map', { zoomControl: true, preferCanvas: true });
    // 离线模式：不加载远程瓦片。概念路网/边界/片区为本地矢量覆盖层，独立渲染。
    // Offline mode: no remote tiles; the conceptual network renders as local vector overlays.
    var b = DATA.bounds;
    map.fitBounds([[b.south, b.west], [b.north, b.east]]);
  }

  /* ------------------------------------------------------------------ *
   * 渲染
   * ------------------------------------------------------------------ */
  function renderAll() {
    renderSiteBoundary();
    renderKeyAreas();
    renderHeritage();
    renderEdges();
    renderSubway();
    renderCoverage();
    renderRfid();
    renderNodes();
    renderRoute();
    renderObstacles();
  }

  function renderEdges() {
    if (layers.edges) map.removeLayer(layers.edges);
    var group = L.featureGroup();
    DATA.edges.forEach(function (e) {
      var a = nodeById[e.from], b = nodeById[e.to];
      if (!a || !b) return;
      var color = COLORS[e.hierarchy] || '#999';
      var line = L.polyline([[a.lat, a.lng], [b.lat, b.lng]], {
        color: color,
        weight: HIERARCHY_WEIGHT[e.hierarchy] || 2,
        opacity: 0.85,
        smoothFactor: 1,
        edgeId: e.id,
      });
      line.on('click', function () { onEdgeClick(e.id); });
      line.bindTooltip(edgeTooltip(e));
      group.addLayer(line);
    });
    layers.edges = group;
    group.addTo(map);
  }

  function edgeTooltip(e) {
    var lab = HIERARCHY_LABEL[e.hierarchy];
    if (!lab) return '';
    return (state.lang === 'zh') ? lab.zh : lab.en;
  }

  function renderNodes() {
    if (layers.nodes) map.removeLayer(layers.nodes);
    var group = L.featureGroup();
    DATA.nodes.forEach(function (n) {
      if (n.type === 'subway') return; // 地铁站单独渲染
      var isStart = n.id === state.startId;
      var isEnd = n.id === state.endId;
      var r = isStart || isEnd ? 7 : 5;
      var color = isStart ? '#FF6B6B' : (isEnd ? '#FF6B6B' : '#0052D4');
      var c = L.circleMarker([n.lat, n.lng], {
        radius: r, color: '#fff', weight: 1.5, fillColor: color, fillOpacity: 0.95,
      });
      c.on('click', function () { onNodeClick(n.id); });
      c.bindTooltip(n.name_zh || n.id);
      group.addLayer(c);
    });
    layers.nodes = group;
    group.addTo(map);
  }

  function renderSubway() {
    if (layers.subway) map.removeLayer(layers.subway);
    var group = L.featureGroup();
    DATA.nodes.forEach(function (n) {
      if (n.type !== 'subway') return;
      var icon = L.divIcon({
        className: 'subway-icon',
        html: '<div class="subway-dot"></div>',
        iconSize: [16, 16], iconAnchor: [8, 8],
      });
      var m = L.marker([n.lat, n.lng], { icon: icon });
      m.bindTooltip(n.name_zh + ' · ' + n.name_en);
      group.addLayer(m);
    });
    layers.subway = group;
    group.addTo(map);
  }

  function renderCoverage() {
    if (layers.coverage) map.removeLayer(layers.coverage);
    if (!state.showCoverage) { layers.coverage = null; return; }
    var group = L.featureGroup();
    DATA.nodes.forEach(function (n) {
      if (n.type !== 'subway') return;
      group.addLayer(L.circle([n.lat, n.lng], {
        radius: 800, color: '#00B4DB', weight: 1, fillColor: '#00B4DB',
        fillOpacity: 0.08, dashArray: '4 4',
      }));
    });
    layers.coverage = group;
    group.addTo(map);
  }

  function renderRfid() {
    if (layers.rfid) map.removeLayer(layers.rfid);
    if (!state.showRfid) { layers.rfid = null; return; }
    var group = L.featureGroup();
    DATA.nodes.forEach(function (n) {
      if (n.type !== 'subway') return;
      group.addLayer(L.circleMarker([n.lat, n.lng], {
        radius: 12, color: '#8C2B2B', weight: 1.5, fillColor: '#8C2B2B',
        fillOpacity: 0.12,
      }));
    });
    layers.rfid = group;
    group.addTo(map);
  }

  function renderKeyAreas() {
    if (layers.keyAreas) map.removeLayer(layers.keyAreas);
    var group = L.featureGroup();
    DATA.key_areas.forEach(function (ka) {
      var latlngs = ka.polygon.map(function (c) { return [c[1], c[0]]; });
      var poly = L.polygon(latlngs, {
        color: '#00B4DB', weight: 1.5, fillColor: '#00B4DB', fillOpacity: 0.05, dashArray: '6 4',
      });
      poly.bindTooltip(ka.name_zh);
      group.addLayer(poly);
    });
    layers.keyAreas = group;
    group.addTo(map);
  }

  function renderSiteBoundary() {
    if (layers.site) map.removeLayer(layers.site);
    var latlngs = DATA.site_boundary.polygon.map(function (c) { return [c[1], c[0]]; });
    var poly = L.polygon(latlngs, {
      color: '#475569', weight: 2, fill: false, dashArray: '8 6',
    });
    layers.site = poly;
    poly.addTo(map);
  }

  function renderHeritage() {
    if (layers.heritage) map.removeLayer(layers.heritage);
    var group = L.featureGroup();
    if (DATA.heritage_corridor && DATA.heritage_corridor.lines) {
      DATA.heritage_corridor.lines.forEach(function (ln) {
        var latlngs = ln.coordinates.map(function (c) { return [c[1], c[0]]; });
        var poly = L.polyline(latlngs, {
          color: '#15803d', weight: 3, dashArray: '10 6', opacity: 0.7,
        });
        poly.bindTooltip(ln.name_zh);
        group.addLayer(poly);
      });
    }
    layers.heritage = group;
    group.addTo(map);
  }

  function renderRoute() {
    if (layers.route) map.removeLayer(layers.route);
    if (!state.startId || !state.endId) return;
    var res = dijkstra(DATA.nodes, DATA.edges, state.startId, state.endId, state.blockedEdges);
    if (!res) {
      setRouteInfo(null);
      return;
    }
    var group = L.featureGroup();
    res.edges.forEach(function (e) {
      var a = nodeById[e.from], b = nodeById[e.to];
      group.addLayer(L.polyline([[a.lat, a.lng], [b.lat, b.lng]], {
        color: COLORS.route, weight: 6, opacity: 0.9,
      }));
    });
    layers.route = group;
    group.addTo(map);
    setRouteInfo(res);
  }

  function renderObstacles() {
    if (layers.obstacles) map.removeLayer(layers.obstacles);
    var group = L.featureGroup();
    Object.keys(state.blockedEdges).forEach(function (eid) {
      var e = edgeById[eid];
      if (!e) return;
      var a = nodeById[e.from], b = nodeById[e.to];
      group.addLayer(L.polyline([[a.lat, a.lng], [b.lat, b.lng]], {
        color: COLORS.obstacle, weight: 5, opacity: 0.7, dashArray: '3 6',
      }));
    });
    layers.obstacles = group;
    group.addTo(map);
  }

  function setRouteInfo(res) {
    var box = $('route-info');
    if (!box) return;
    if (!res) {
      if (state.startId && state.endId) {
        box.innerHTML = '<div class="route-title">' + t('routeInfoTitle') + '</div>' +
          '<div class="route-empty">' + t('noRoute') + '</div>';
      } else {
        box.innerHTML = '';
      }
      return;
    }
    var total = res.edges.reduce(function (s, e) { return s + (e.length_m || 0); }, 0);
    var tactileCount = res.edges.filter(function (e) { return e.tactile; }).length;
    var maxSlope = res.edges.reduce(function (m, e) { return Math.max(m, e.slope || 0); }, 0);
    var startName = nodeById[state.startId].name_zh || nodeById[state.startId].id;
    var endName = nodeById[state.endId].name_zh || nodeById[state.endId].id;
    box.innerHTML =
      '<div class="route-title">' + t('routeInfoTitle') + '</div>' +
      '<div class="route-row"><span>' + t('routeFrom') + '</span><b>' + startName + '</b></div>' +
      '<div class="route-row"><span>' + t('routeTo') + '</span><b>' + endName + '</b></div>' +
      '<div class="route-row"><span>' + t('routeDistance') + '</span><b>' + (total / 1000).toFixed(2) + ' km</b></div>' +
      '<div class="route-row"><span>' + t('routeWeighted') + '</span><b>' + (res.weighted / 1000).toFixed(2) + ' km</b></div>' +
      '<div class="route-row"><span>' + t('routeEdges') + '</span><b>' + res.edges.length + '</b></div>' +
      '<div class="route-row"><span>' + t('routeTactileOk') + '</span><b>' + tactileCount + '/' + res.edges.length + '</b></div>' +
      '<div class="route-row"><span>' + t('routeSlopeMax') + '</span><b>' + (maxSlope * 100).toFixed(1) + '%</b></div>';
  }

  /* ------------------------------------------------------------------ *
   * 交互
   * ------------------------------------------------------------------ */
  function onNodeClick(id) {
    var n = nodeById[id];
    if (state.mode === 'start') {
      state.startId = id;
      state.mode = null;
      flashStatus(t('startMarker') + ': ' + (n.name_zh || n.id));
      renderNodes(); renderRoute();
      setModeButtons();
    } else if (state.mode === 'end') {
      state.endId = id;
      state.mode = null;
      flashStatus(t('endMarker') + ': ' + (n.name_zh || n.id));
      renderNodes(); renderRoute();
      setModeButtons();
    }
  }

  function onEdgeClick(edgeId) {
    if (state.mode !== 'obstacle') return;
    if (state.blockedEdges[edgeId]) delete state.blockedEdges[edgeId];
    else state.blockedEdges[edgeId] = true;
    renderObstacles(); renderRoute();
  }

  function onMapClick(e) {
    if (state.mode !== 'start' && state.mode !== 'end') return;
    // 吸附到最近节点
    var best = null, bestD = Infinity;
    DATA.nodes.forEach(function (n) {
      var d = e.latlng.distanceTo(L.latLng(n.lat, n.lng));
      if (d < bestD) { bestD = d; best = n; }
    });
    if (best && bestD < 600) {
      onNodeClick(best.id);
    } else {
      flashStatus(state.lang === 'zh' ? '请点击路网附近的节点' : 'Please click near a network node');
    }
  }

  function flashStatus(msg) {
    var el = $('status-bar');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('flash');
    setTimeout(function () { el.classList.remove('flash'); }, 1600);
  }

  function setModeButtons() {
    ['start', 'end', 'obstacle'].forEach(function (m) {
      var b = $('btn-' + m);
      if (b) b.classList.toggle('active', state.mode === m);
    });
    var hint = $('hint');
    if (hint) {
      if (state.mode === 'start') hint.textContent = t('pickStart');
      else if (state.mode === 'end') hint.textContent = t('pickEnd');
      else if (state.mode === 'obstacle') hint.textContent = t('pickObstacle');
      else hint.textContent = t('hintDefault');
    }
  }

  function applyDefaultRoute() {
    // 预置一条演示路径：大钟寺站 -> 众智园枢纽
    var start = DATA.nodes.filter(function (n) { return n.id === 'SUB-01'; })[0];
    var end = DATA.nodes.filter(function (n) { return n.id === 'ZZ'; })[0];
    if (start && end) {
      state.startId = start.id;
      state.endId = end.id;
      renderNodes(); renderRoute();
    }
    state.showCoverage = true;
    renderCoverage();
    if ($('chk-coverage')) $('chk-coverage').checked = true;
  }

  /* ------------------------------------------------------------------ *
   * UI 绑定与语言
   * ------------------------------------------------------------------ */
  function buildUI() {
    var panel = $('control-panel');
    if (!panel) return;

    function btn(id, label, mode) {
      var el = $('btn-' + id);
      if (!el) return;
      el.textContent = t(label);
      el.addEventListener('click', function () {
        if (mode === 'clear') {
          state = { mode: null, startId: null, endId: null, blockedEdges: {}, showRfid: state.showRfid, showCoverage: state.showCoverage, lang: state.lang };
          renderNodes(); renderRoute(); renderObstacles(); setModeButtons();
          setRouteInfo(null);
          return;
        }
        if (mode === 'fit') {
          var b = DATA.bounds;
          map.fitBounds([[b.south, b.west], [b.north, b.east]]);
          return;
        }
        state.mode = state.mode === mode ? null : mode;
        setModeButtons();
      });
    }
    btn('start', 'btnStart', 'start');
    btn('end', 'btnEnd', 'end');
    btn('obstacle', 'btnObstacle', 'obstacle');
    btn('clear', 'btnClear', 'clear');
    btn('fit', 'btnFit', 'fit');

    var rfid = $('chk-rfid');
    if (rfid) rfid.addEventListener('change', function () {
      state.showRfid = rfid.checked; renderRfid();
    });
    var cov = $('chk-coverage');
    if (cov) cov.addEventListener('change', function () {
      state.showCoverage = cov.checked; renderCoverage();
    });

    var lang = $('lang-switch');
    if (lang) {
      lang.addEventListener('click', function () {
        state.lang = state.lang === 'zh' ? 'en' : 'zh';
        applyLang();
        renderAll();
      });
    }

    if (map) map.on('click', onMapClick);
  }

  function applyLang() {
    document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
    var el = $('lang-switch');
    if (el) el.textContent = state.lang === 'zh' ? 'EN' : '中';

    var ids = {
      'panel-title': 'panelTitle', 'panel-subtitle': 'panelSubtitle',
      'btn-start': 'btnStart', 'btn-end': 'btnEnd', 'btn-obstacle': 'btnObstacle',
      'btn-clear': 'btnClear', 'btn-fit': 'btnFit',
      'lbl-rfid': 'rfidLabel', 'lbl-coverage': 'coverageLabel',
      'legend-title': 'legendTitle', 'legend-spine': 'legendSpine', 'legend-branch': 'legendBranch',
      'legend-loop': 'legendLoop', 'legend-feeder': 'legendFeeder', 'legend-green': 'legendGreen',
      'legend-transfer': 'legendTransfer', 'legend-station': 'legendStation', 'legend-route': 'legendRoute',
      'legend-keyarea': 'legendKeyArea', 'legend-site': 'legendSite', 'legend-obstacle': 'legendObstacle',
      'data-disclaimer': 'dataDisclaimer',
    };
    Object.keys(ids).forEach(function (id) {
      var e = $(id);
      if (e) e.textContent = t(ids[id]);
    });
    setModeButtons();
    if (state.startId && state.endId) renderRoute();
    renderScenes();
  }

  /* ------------------------------------------------------------------ *
   * 十大地标场景卡（scenes.json）
   * ------------------------------------------------------------------ */
  function renderScenes() {
    var panel = $('scenes-panel');
    if (!panel) return;
    document.body.classList.add('scenes-visible');
    var titleEl = $('scenes-title');
    var toggleEl = $('scenes-toggle');

    function draw() {
      if (!SCENES) return;
      if (titleEl) titleEl.textContent = (state.lang === 'zh' ? SCENES.meta.title_zh : SCENES.meta.title_en) || t('scenesTitle');
      if (toggleEl) toggleEl.textContent = t('scenesToggle');
      var scroll = $('scenes-scroll');
      if (!scroll) return;
      scroll.innerHTML = '';
      SCENES.scenes.forEach(function (s) {
        var card = document.createElement('div');
        card.className = 'scene-card';
        card.style.setProperty('--scene-color', s.color);
        card.innerHTML =
          '<div class="scene-top"><span class="scene-icon">' + s.icon + '</span>' +
          '<span class="scene-index">' + s.index + '</span></div>' +
          '<h3>' + (state.lang === 'zh' ? s.name_zh : s.name_en) + '</h3>' +
          '<div class="scene-loc">' + (state.lang === 'zh' ? s.location_zh : s.location_en) + '</div>' +
          '<div class="scene-desc">' + (state.lang === 'zh' ? s.desc_zh : s.desc_en) + '</div>';
        scroll.appendChild(card);
      });
    }

    if (SCENES) { draw(); return; }
    fetch('assets/scenes.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { SCENES = data; draw(); })
      .catch(function () {
        // 场景数据缺失时优雅降级：隐藏场景条
        document.body.classList.remove('scenes-visible');
        panel.style.display = 'none';
      });

    if (toggleEl) {
      toggleEl.addEventListener('click', function () {
        panel.classList.toggle('collapsed');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
