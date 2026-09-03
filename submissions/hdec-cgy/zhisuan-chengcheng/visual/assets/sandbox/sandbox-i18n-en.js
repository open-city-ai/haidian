(function () {
  'use strict';
  var exact = {
    '京张 AI 原生城市设计沙盘': 'Jingzhang AI-Native Urban Design Sandbox',
    '当前情景': 'Current scenario', '基准情景': 'Baseline',
    '人才集聚': 'Talent concentration', '开放共享': 'Open sharing',
    'AI 高增长': 'High AI growth', '低碳协同': 'Low-carbon coordination',
    '科创企业分布': 'Technology-enterprise distribution',
    '情景对比': 'Compare scenarios', '自动推演': 'Auto simulation',
    '综合': 'Overview', '热力': 'Heatmap', '网络': 'Network', '节点': 'Nodes',
    '实时推演': 'Live simulation', '已同步': 'Synchronized',
    '图层控制': 'Layer control', '统筹研究范围': 'Coordinated study area',
    '总体设计范围': 'Overall design area', '重点区域 3 处': 'Three key areas',
    '快速路 / 主干路': 'Expressway / arterial', '次干路 / 支路': 'Secondary / local roads',
    '轨交 / 铁路': 'Metro / railway', '河流 / 水系': 'Rivers / water',
    '绿地 / 公园': 'Green space / parks', '科技企业 POI': 'Technology-enterprise POIs',
    '全部探索样本': 'All exploratory samples', '高置信样本': 'High-confidence sample',
    '高校探索点位': 'Exploratory university points',
    '探索性空间模式': 'Exploratory spatial patterns',
    '点位仅用于展示筛选、分类与空间聚集趋势；未经逐项核验，不显示数量、密度、排名或正式统计结论。': 'Points demonstrate filtering, classification and clustering patterns only. They are not item-by-item verified and do not present counts, densities, rankings or formal statistics.',
    '返回沙盘': 'Back to sandbox'
  };
  var partial = [['覆盖率 ', 'Coverage '], ['缺口 ', 'Gap '], ['图层 ', 'Layers '], ['节点 ', 'Nodes '], ['响应 ', 'Response '], ['建议面积', 'Suggested area'], ['覆盖改善', 'Coverage improvement']];
  function translate(value) {
    var key = value.trim();
    if (!key) return value;
    var out = exact[key] || key;
    partial.forEach(function (pair) { out = out.replace(pair[0], pair[1]); });
    return value.replace(key, out);
  }
  function visit(root) {
    if (!root) return;
    if (root.nodeType === 3) { root.nodeValue = translate(root.nodeValue); return; }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) ['title', 'aria-label', 'placeholder'].forEach(function (name) {
      if (root.hasAttribute(name)) root.setAttribute(name, translate(root.getAttribute(name)));
    });
    Array.prototype.forEach.call(root.childNodes, visit);
  }
  function apply() { visit(document.body); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
  new MutationObserver(function (records) { records.forEach(function (record) { Array.prototype.forEach.call(record.addedNodes || [], visit); }); }).observe(document.documentElement, { childList: true, subtree: true });
}());
