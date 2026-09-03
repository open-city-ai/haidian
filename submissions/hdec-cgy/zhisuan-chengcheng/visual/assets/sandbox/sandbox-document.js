window.JINGZHANG_SANDBOX_DOCUMENT = String.raw`<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="京张AI原生城市设计沙盘——参数驱动的城市空间推演平台">
  <title>京张 AI 原生城市设计沙盘</title>
  <link rel="stylesheet" href="../visual/assets/sandbox/styles.css">
</head>
<body>
  <div class="shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="返回沙盘首页">
        <span class="brand-mark"><i></i><i></i><i></i></span>
        <span><b>京张 AI 原生城市设计沙盘</b><small>JINGZHANG AI-NATIVE URBAN SANDBOX</small></span>
      </a>
      <div class="scenario-wrap">
        <span class="label">当前情景</span>
        <select id="scenarioSelect" aria-label="选择情景">
          <option value="base">基准情景</option>
          <option value="talent">人才集聚</option>
          <option value="open">开放共享</option>
          <option value="ai">AI 高增长</option>
          <option value="lowcarbon">低碳协同</option>
        </select>
      </div>
      <nav class="module-tabs" aria-label="推演模块">
        <button class="module-tab active" data-module="a"><span>A</span>人才与共享设施</button>
        <button class="module-tab" data-module="b"><span>B</span>创新交互与慢行</button>
        <button class="module-tab" data-module="c"><span>C</span>算力—能碳情景</button>
        <button class="module-tab" data-module="d"><span>D</span>科创企业分布</button>
      </nav>
      <div class="top-actions">
        <button class="icon-btn" id="resetBtn" title="重置参数">↺</button>
        <button class="outline-btn" id="compareBtn">◫ 情景对比</button>
        <button class="primary-btn" id="playBtn">▶ 自动推演</button>
      </div>
    </header>

    <main class="workspace">
      <aside class="control-panel glass">
        <div class="panel-title">
          <div><span class="eyebrow" id="moduleCode">MODULE A</span><h1 id="moduleTitle">人才与共享设施</h1></div>
          <button class="help-btn" title="参数说明">?</button>
        </div>
        <p class="panel-desc" id="moduleDesc">调整人群结构与开放策略，观察公共设施供需和空间选址的响应。</p>
        <div id="controls"></div>
        <div class="cause-card">
          <span class="cause-icon">✦</span>
          <div><b>参数正在驱动空间变化</b><p id="causeText">提高共享比例可释放既有空间，减少新增建设需求。</p></div>
        </div>
      </aside>

      <section class="map-stage">
        <div class="map-toolbar glass">
          <button class="active" data-layer="all">综合</button>
          <button data-layer="heat">热力</button>
          <button data-layer="network">网络</button>
          <button data-layer="nodes">节点</button>
        </div>
        <div class="map-meta glass"><span class="live-dot"></span><b>实时推演</b><small id="updateTime">已同步</small></div>
        <svg id="cityMap" class="legacy-map" viewBox="0 0 1000 700" role="img" aria-label="京张城市设计推演地图">
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#102d38"/><stop offset="1" stop-color="#0a1c27"/></linearGradient>
            <radialGradient id="heatA"><stop stop-color="#54e2bd" stop-opacity=".62"/><stop offset="1" stop-color="#54e2bd" stop-opacity="0"/></radialGradient>
            <radialGradient id="heatB"><stop stop-color="#ffb85c" stop-opacity=".7"/><stop offset="1" stop-color="#ffb85c" stop-opacity="0"/></radialGradient>
            <radialGradient id="heatC"><stop stop-color="#8c7cff" stop-opacity=".7"/><stop offset="1" stop-color="#8c7cff" stop-opacity="0"/></radialGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#91b5c1" stroke-opacity=".06"/></pattern>
            <clipPath id="mapClip"><rect x="90" y="80" width="820" height="540" rx="4"/></clipPath>
          </defs>
          <rect width="1000" height="700" fill="#07151e"/><rect width="1000" height="700" fill="url(#grid)"/>
          <g id="mapViewport" clip-path="url(#mapClip)"><g id="mapContent">
          <g id="osmTiles" class="osm-tiles layer-basemap"></g>
          <rect class="map-tint layer-basemap" x="90" y="80" width="820" height="540" rx="4"/>
          <g id="osmVectors" class="osm-vectors">
            <g class="osm-parks"></g><g class="osm-water"></g><g class="osm-roads-minor"></g><g class="osm-roads-major"></g><g class="osm-rail"></g><g class="osm-labels"></g>
          </g>
          <g id="siteGeometry" class="site-geometry"></g>
          <g id="coverageLayer" class="coverage-layer"><circle cx="255" cy="410" r="115"/><circle cx="520" cy="353" r="122"/><circle cx="755" cy="280" r="105"/></g>
          <g id="heatLayer" class="heat-layer"><circle cx="255" cy="410" r="160" fill="url(#heatA)"/><circle cx="520" cy="353" r="150" fill="url(#heatA)"/><circle cx="755" cy="280" r="135" fill="url(#heatA)"/></g>
          <g id="routeLayer" class="route-layer">
            <path id="route1" d="M120 520C250 475 337 420 520 353S690 321 820 180"/>
            <path id="route2" d="M190 260C312 296 395 370 520 353s173-30 300 85"/>
            <circle r="4"><animateMotion dur="5s" repeatCount="indefinite" path="M120 520C250 475 337 420 520 353S690 321 820 180"/></circle>
            <circle r="4"><animateMotion dur="7s" repeatCount="indefinite" path="M190 260C312 296 395 370 520 353s173-30 300 85"/></circle>
          </g>
          <g id="zoneLayer" class="zones">
            <g class="zone" data-zone="1" transform="translate(255 410)"><circle r="28"/><circle class="pulse" r="42"/><text y="5">01</text><g class="zone-label" transform="translate(-88 52)"><rect width="176" height="47" rx="10"/><text x="12" y="19">众智园 AI 自主创新加速区</text><text class="sub" x="12" y="36">覆盖率 86%</text></g></g>
            <g class="zone" data-zone="2" transform="translate(520 353)"><circle r="28"/><circle class="pulse" r="42"/><text y="5">02</text><g class="zone-label" transform="translate(-88 52)"><rect width="176" height="47" rx="10"/><text x="12" y="19">北京 AI 原点社区</text><text class="sub" x="12" y="36">缺口 2,480㎡</text></g></g>
            <g class="zone" data-zone="3" transform="translate(755 280)"><circle r="28"/><circle class="pulse" r="42"/><text y="5">03</text><g class="zone-label" transform="translate(-88 52)"><rect width="176" height="47" rx="10"/><text x="12" y="19">大钟寺 AI 产业聚集区</text><text class="sub" x="12" y="36">覆盖率 79%</text></g></g>
          </g>
          <g id="nodeLayer" class="node-layer"></g>
          <g id="referenceOverlay"></g>
          </g></g>
          <g class="north"><path d="M936 68l12-30 12 30-12-7z"/><text x="943" y="84">N</text></g>
        </svg>
        <div class="zoom-controls glass"><button id="zoomIn" title="放大">+</button><button id="zoomOut" title="缩小">−</button><button id="zoomReset" title="复位">⌂</button><span id="zoomLevel">100%</span></div>
        <div class="scene-controls glass"><button data-scene="3d">3D</button><button data-scene="2d" class="active">2D</button><button id="flyNorth">北部</button><button id="flyCentral">中部</button><button id="flySouth">南部</button></div>
        <div class="basemap-control glass"><span>底图</span><button data-basemap="dark">深色</button><button data-basemap="light" class="active">浅色</button><button data-basemap="minimal">极简</button><button data-basemap="grey">灰阶</button><button data-basemap="normal">标准</button></div>
        <div class="layer-control glass" id="layerControl">
          <div class="layer-head"><b>图层控制</b><button id="toggleLayers">−</button></div>
          <div class="layer-list">
            <label><input type="checkbox" data-map-layer="research" checked><i class="swatch research"></i>统筹研究范围</label>
            <label><input type="checkbox" data-map-layer="site" checked><i class="swatch site"></i>总体设计范围</label>
            <label><input type="checkbox" data-map-layer="key" checked><i class="swatch key"></i>重点区域 3 处</label>
            <label><input type="checkbox" data-map-layer="bbox" checked><i class="swatch bbox"></i>数据采集 bbox</label>
            <label><input type="checkbox" data-map-layer="check" checked><i class="swatch check"></i>OSM 交叉核验点</label>
            <label><input type="checkbox" data-map-layer="major"><i class="swatch major"></i>快速路 / 主干路</label>
            <label><input type="checkbox" data-map-layer="minor"><i class="swatch minor"></i>次干路 / 支路</label>
            <label><input type="checkbox" data-map-layer="rail"><i class="swatch rail"></i>轨交 / 铁路</label>
            <label><input type="checkbox" data-map-layer="water"><i class="swatch water"></i>河流 / 水系</label>
            <label><input type="checkbox" data-map-layer="parks"><i class="swatch parks"></i>绿地 / 公园</label>
            <label><input type="checkbox" data-map-layer="techpoi" checked><i class="swatch techpoi"></i>科技企业 POI</label>
            <label class="sub"><input type="radio" name="techpoi-source" value="all" checked><i class="swatch techpoi-all"></i>全部探索样本</label>
            <label class="sub"><input type="radio" name="techpoi-source" value="hc"><i class="swatch techpoi-hc"></i>高置信样本</label>
            <label><input type="checkbox" data-map-layer="university" checked><i class="swatch university"></i>高校探索点位</label>
          </div>
        </div>
        <div class="data-badge glass"><b>AI MAP · VECTOR BASE</b><span id="osmStats">正在载入本地 OSM 矢量图层…</span></div>
        <div class="legend glass" id="legend"><span><i class="dot boundary"></i>总体设计范围</span><span><i class="dot green"></i>服务覆盖</span><span><i class="dot orange"></i>设施缺口</span><span><i class="line"></i>推荐联系</span></div>
        <div class="techpoi-legend glass" id="techpoiLegend"><span><i class="techpoi-dot high"></i>核心 AI</span><span><i class="techpoi-dot medium"></i>AI 相关</span><span><i class="techpoi-dot low"></i>一般科技</span><span><i class="techpoi-dot none"></i>待判定</span></div>
        <div class="university-legend glass" id="universityLegend"><span><i class="uni-marker">🎓</i>高校及高等教育机构</span><span><i class="uni-cluster">🎓</i>高校集群</span></div>
        <div class="zone-detail glass" id="zoneDetail"><button>×</button><span class="eyebrow">PROV-KEY-002</span><h3>北京 AI 原点社区</h3><p>场地位置来自指定 site-package 临时 GeoJSON；建议在片区公共界面植入复合共享服务中心。</p><div><b>+14%</b><small>覆盖改善</small><b>1,200㎡</b><small>建议面积</small></div></div>
        <div class="feature-popup glass" id="featurePopup"><button>×</button><span class="eyebrow" id="featureId">MAP FEATURE</span><h3 id="featureTitle">地图要素</h3><p id="featureText"></p><small id="featureSource"></small></div>
      </section>

      <aside class="result-panel glass">
        <div class="result-head"><div><span class="eyebrow">LIVE OUTPUT</span><h2>推演结果</h2></div><span class="status-pill"><i></i>模型已同步</span></div>
        <div class="kpi-grid" id="kpiGrid"></div>
        <div class="chart-card">
          <div class="card-head"><div><b id="chartTitle">设施供需变化</b><small id="chartSub">需求与有效供给</small></div><span class="trend" id="trendBadge">↗ 动态</span></div>
          <canvas id="mainChart" width="560" height="210"></canvas>
        </div>
        <div class="recommend-card">
          <div class="card-head"><b>AI 设计建议</b><span>实时生成</span></div>
          <p id="recommendText">提高共享比例可有效释放既有设施潜力，建议优先在创新共享核心区补充夜间交流空间。</p>
          <div class="rec-tags" id="recTags"></div>
        </div>
        <div class="zone-compare" id="zoneCompare"></div>
      </aside>
    </main>

    <footer class="timeline glass">
      <div class="timeline-summary"><span class="live-dot"></span><div><b id="summaryTitle">空间响应已更新</b><small id="summaryText">共享设施有效供给随参数同步变化</small></div></div>
      <div class="time-track"><span>08:00</span><div><i id="timeProgress"></i><button id="timeHandle" aria-label="调整时间"></button></div><span>12:00</span><span>18:00</span><span>24:00</span></div>
      <div class="footer-metrics"><span>图层 <b id="layerCount">6</b></span><span>节点 <b id="nodeCount">12</b></span><span>响应 <b>0.3s</b></span></div>
    </footer>
  </div>

  <div class="compare-modal" id="compareModal" aria-hidden="true">
    <div class="modal-card glass"><button class="modal-close">×</button><span class="eyebrow">SCENARIO COMPARE</span><h2>基准情景 / 当前方案</h2><p>参数变化如何转译为空间响应</p><div id="compareRows"></div><button class="primary-btn modal-done">返回沙盘</button></div>
  </div>
  <div class="toast" id="toast"></div>
<script src="../visual/assets/sandbox/data/osm-data.js"></script>
<script src="../visual/assets/sandbox/data/site-geo-data.js"></script>
<script src="../visual/assets/sandbox/data/site-data.js"></script>
<script src="../visual/assets/sandbox/data/tech-poi-data.js"></script>
<script src="../visual/assets/sandbox/data/university-data.js"></script>
<script>
/* 离线数据适配层：从本地 GeoJSON 派生 app.js 所需的 TECH_POI / UNIVERSITY_POI，
   替代原 amap-map.js 的在线高德服务（竞赛离线规则：不加载任何远程脚本/接口）。 */
(function () {
  var typeGroupOf = {
    'Company': 'company',
    'University R&D': 'university',
    'Research Institute': 'institute',
    'Laboratory': 'institute',
    'Industrial Park': 'platform',
    'Innovation Center': 'platform',
    'Incubator': 'platform',
    'Accelerator': 'platform',
    'Other': 'other'
  };
  try {
    var geo = window.__TECH_POI_GEOJSON;
    if (geo && geo.features && geo.features.length) {
      window.__TECH_POI = geo.features.map(function (f) {
        var p = f.properties || {};
        return {
          name: p.name || '',
          type: p.entity_type || '',
          typeGroup: typeGroupOf[p.entity_type] || 'other',
          rel: p.ai_relevance || 'none',
          conf: p.confidence || '',
          industry: p.industry_category || ''
        };
      });
      window.dispatchEvent(new Event('tech-poi:loaded'));
    }
  } catch (e) { console.warn('tech POI offline adapter failed', e); }
  try {
    var uni = window.__UNIVERSITY_GEOJSON;
    if (uni && uni.features && uni.features.length) {
      window.__UNIVERSITY_POI = uni.features.map(function (f) {
        var p = f.properties || {};
        return { name: p.name || '', type: p.entity_type || '' };
      });
      window.dispatchEvent(new Event('university:loaded'));
    }
  } catch (e) { console.warn('university offline adapter failed', e); }
})();
</script>
<script src="../visual/assets/sandbox/app.js"></script>
</body>
</html>`;
