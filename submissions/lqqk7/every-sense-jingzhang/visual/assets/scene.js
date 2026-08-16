/* EVERY SENSE JING-ZHANG - interactive scene "AI ON = AI OFF".
   Local 2.5D axonometric renderer on Canvas 2D. No network, no third-party
   runtime, no WebGL dependency. Data comes from assets/scene-data.js, which is
   generated from the package geometry/*.geojson.

   Reading order: geometry is projected to a local metre plane, the cross-spine
   axis is exaggerated for legibility (declared on screen), then an axonometric
   projection with painter's-algorithm ordering draws ground, key-area plinths,
   green and public slabs, routes, and the ten operating nodes.

   The two states never change node positions or reachability. Only the service
   channel changes: AI ON draws multimodal guidance flow, AI OFF draws fixed
   signage plates and staffed help points.

   A second, orthogonal dimension is the time of day: morning peak, daytime,
   evening, night. It shifts the lighting key of the picture and the scene
   description only. Lighting itself is a baseline service, so the night halos
   are drawn in both AI states. No readout depends on the period. */
(function () {
  'use strict';

  var K = 3.6;                       // cross-spine exaggeration factor
  var COS30 = Math.cos(Math.PI / 6);
  var SIN30 = 0.5;
  var Z_PLINTH = 130;
  var Z_SLAB = 46;
  var Z_ROAD = 26;
  var Z_NODE = 520;
  var C = {
    deep: '#10383d', teal: '#177c78', paper: '#f2efe7', coral: '#d76450',
    purple: '#6b5b95', gold: '#d6a13b', line: '#cbd3cf', ink: '#17383c',
    muted: '#68787b', white: '#ffffff'
  };
  var ACCENT = { teal: C.teal, purple: C.purple, gold: C.gold };

  /* Time-of-day keys. `wash` is a single translucent pass laid over the ground
     plane before the service overlay, so terrain tone shifts while routes,
     nodes and every label stay at full contrast. `day` is the neutral key and
     carries no wash: the daytime picture is byte-identical to the picture the
     scene drew before this dimension existed. */
  var PERIODS = {
    peak:    { bg: '#17414c', wash: 'rgba(224,172,84,0.10)',  lamp: 0 },
    day:     { bg: '#10383d', wash: null,                     lamp: 0 },
    evening: { bg: '#1c3138', wash: 'rgba(107,91,149,0.17)',  lamp: 0 },
    night:   { bg: '#08222a', wash: 'rgba(6,26,38,0.34)',     lamp: 1 }
  };

  var T = {
    zh: {
      loading: '场景准备中…',
      failed: '交互场景无法在当前环境运行，下方为静态视图。',
      onLabel: 'AI 开启', offLabel: 'AI 关闭',
      canvasOn: '轴测场景：AI 开启状态。主脊与低刺激替代线上显示多模态引导流光，十个独立完成节点全部可达。',
      canvasOff: '轴测场景：AI 关闭状态。主脊与低刺激替代线上显示固定导视牌面，每个节点旁显示人工求助点，十个独立完成节点全部可达。',
      statusOn: '已切换到 AI 开启。可独立完成节点 10 / 10，等价路径 2 条，重点区覆盖 3 / 3。',
      statusOff: '已切换到 AI 关闭。可独立完成节点 10 / 10，等价路径 2 条，重点区覆盖 3 / 3。读数与 AI 开启完全一致。',
      selected: '已选中 ', period: '。',
      closed: '已关闭场景卡。',
      exag: '横向 ×3.6 示意',
      north: '北',
      onChannel: 'AI 开启通道', offChannel: 'AI 关闭通道', handoff: '人工接管',
      gate: '闸门', area: '所在重点区',
      areas: {
        zhongzhiyuan_ai_acceleration_area: '众智园 AI 自主创新加速区',
        beijing_ai_origin_community: '北京 AI 原点社区',
        dazhongsi_ai_industry_cluster: '大钟寺 AI 产业集聚区'
      },
      short: {
        zhongzhiyuan_ai_acceleration_area: '众智园',
        beijing_ai_origin_community: '原点社区',
        dazhongsi_ai_industry_cluster: '大钟寺'
      },
      staticOn: '显示静态视图', staticOff: '返回交互场景',
      playOn: '播放引导流光', playOff: '暂停引导流光',
      reduced: '已按系统的“减少动效”设置停用动画。',
      periodNow: '当前时段：',
      periodSwitched: '已切换到时段：',
      periodInvariant: '时段只改变画面的光照基调与场景描述；节点位置、可达性与全部读数不变。'
    },
    en: {
      loading: 'Preparing the scene…',
      failed: 'The interactive scene cannot run in this environment; the static view is shown below.',
      onLabel: 'AI ON', offLabel: 'AI OFF',
      canvasOn: 'Axonometric scene, AI ON. The spine and the low-stimulation alternative route carry multimodal guidance flow, and all ten independent-completion nodes keep their declared coverage (declaration completeness, not a field-reachability conclusion).',
      canvasOff: 'Axonometric scene, AI OFF. The spine and the low-stimulation alternative route carry fixed signage plates, every node shows a staffed help point, and all ten independent-completion nodes keep their declared coverage (declaration completeness, not a field-reachability conclusion).',
      statusOn: 'Switched to AI ON. Independent-completion nodes 10 of 10, equivalent routes 2, key-area coverage 3 of 3.',
      statusOff: 'Switched to AI OFF. Independent-completion nodes 10 of 10, equivalent routes 2, key-area coverage 3 of 3. The readout is identical to AI ON.',
      selected: 'Selected ', period: '.',
      closed: 'Scenario card closed.',
      exag: 'cross-axis ×3.6, schematic',
      north: 'N',
      onChannel: 'AI-ON channel', offChannel: 'AI-OFF channel', handoff: 'Human handover',
      gate: 'Gate', area: 'Key area',
      areas: {
        zhongzhiyuan_ai_acceleration_area: 'Zhongzhiyuan AI Acceleration Area',
        beijing_ai_origin_community: 'Beijing AI Origin Community',
        dazhongsi_ai_industry_cluster: 'Dazhongsi AI Industry Cluster'
      },
      short: {
        zhongzhiyuan_ai_acceleration_area: 'Zhongzhiyuan',
        beijing_ai_origin_community: 'Origin Community',
        dazhongsi_ai_industry_cluster: 'Dazhongsi'
      },
      staticOn: 'Show static view', staticOff: 'Back to interactive scene',
      playOn: 'Play guidance flow', playOff: 'Pause guidance flow',
      reduced: 'Animation is disabled because the system asks for reduced motion.',
      periodNow: 'Current period: ',
      periodSwitched: 'Switched to period: ',
      periodInvariant: 'The period changes only the lighting key of the picture and the scene description; node positions, reachability and every readout stay unchanged.'
    }
  };

  /* ------------------------------------------------------------ projection */
  function pj(X, Y, z) {
    return [(X - Y) * COS30, -(X + Y) * SIN30 - (z || 0)];
  }
  function scaleRing(ring) {
    var out = [], i;
    for (i = 0; i < ring.length; i++) out.push([ring[i][0] * K, ring[i][1]]);
    return out;
  }
  function ccw(ring) {
    var a = 0, i, j;
    for (i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      a += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
    }
    return a >= 0 ? ring : ring.slice().reverse();
  }

  function Scene(root, data, lang) {
    this.root = root;
    this.data = data;
    this.lang = lang;
    this.t = T[lang] || T.zh;
    this.state = 'on';
    this.period = 'day';
    this.selected = null;
    this.phase = 0;
    this.playing = false;
    this.ready = false;
    this.hits = [];
    this.prep();
  }

  /* Pre-scale every ring once; keeps the draw loop allocation-free enough. */
  Scene.prototype.prep = function () {
    var d = this.data, i;
    this.boundary = ccw(scaleRing(d.boundary));
    this.areas = [];
    for (i = 0; i < d.keyAreas.length; i++) {
      this.areas.push({ src: d.keyAreas[i], ring: ccw(scaleRing(d.keyAreas[i].ring)) });
    }
    this.green = [];
    for (i = 0; i < d.green.length; i++) {
      this.green.push({ src: d.green[i], ring: ccw(scaleRing(d.green[i].ring)) });
    }
    this.pub = [];
    for (i = 0; i < d.public.length; i++) {
      this.pub.push({ src: d.public[i], ring: ccw(scaleRing(d.public[i].ring)) });
    }
    this.spine = scaleRing(d.spine.line);
    this.alt = scaleRing(d.alt.line);
    this.cross = [];
    for (i = 0; i < d.crossings.length; i++) this.cross.push(scaleRing(d.crossings[i].line));
    this.nodes = [];
    for (i = 0; i < d.nodes.length; i++) {
      var n = d.nodes[i];
      this.nodes.push({ src: n, X: n.x * K, Y: n.y });
    }
    /* Fit box: every ground ring plus the tallest element. */
    var pts = [], k;
    var rings = [this.boundary];
    for (i = 0; i < this.areas.length; i++) rings.push(this.areas[i].ring);
    for (i = 0; i < rings.length; i++) {
      for (k = 0; k < rings[i].length; k++) {
        pts.push(pj(rings[i][k][0], rings[i][k][1], 0));
        pts.push(pj(rings[i][k][0], rings[i][k][1], Z_NODE + 180));
      }
    }
    var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (i = 0; i < pts.length; i++) {
      if (pts[i][0] < x0) x0 = pts[i][0];
      if (pts[i][0] > x1) x1 = pts[i][0];
      if (pts[i][1] < y0) y0 = pts[i][1];
      if (pts[i][1] > y1) y1 = pts[i][1];
    }
    this.box = { x0: x0, x1: x1, y0: y0, y1: y1, w: x1 - x0, h: y1 - y0 };
    /* Metre length of one projected unit along the spine, for the scale bar. */
    this.spineDir = [0, 1];
  };

  Scene.prototype.fit = function (w, h) {
    var pad = Math.max(16, Math.round(w * 0.035));
    var s = Math.min((w - pad * 2) / this.box.w, (h - pad * 2) / this.box.h);
    this.s = s;
    this.ox = (w - this.box.w * s) / 2 - this.box.x0 * s;
    this.oy = (h - this.box.h * s) / 2 - this.box.y0 * s;
    this.w = w;
    this.h = h;
    this.dense = w < 620;
    this.fs = Math.max(9, Math.min(13, w / 92));
  };

  Scene.prototype.p = function (X, Y, z) {
    var q = pj(X, Y, z);
    return [this.ox + q[0] * this.s, this.oy + q[1] * this.s];
  };

  Scene.prototype.path = function (ctx, ring, z) {
    var i, q;
    ctx.beginPath();
    for (i = 0; i < ring.length; i++) {
      q = this.p(ring[i][0], ring[i][1], z);
      if (i === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]);
    }
    ctx.closePath();
  };

  /* Vertical side faces of a prism; only faces turned toward the camera. */
  Scene.prototype.sides = function (ctx, ring, z0, z1, fill) {
    var i, j, a, b, ex, ey, q0, q1, q2, q3;
    ctx.fillStyle = fill;
    for (i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      a = ring[j]; b = ring[i];
      ex = b[0] - a[0]; ey = b[1] - a[1];
      if (ey - ex >= 0) continue;               /* back face, skip */
      q0 = this.p(a[0], a[1], z0); q1 = this.p(b[0], b[1], z0);
      q2 = this.p(b[0], b[1], z1); q3 = this.p(a[0], a[1], z1);
      ctx.beginPath();
      ctx.moveTo(q0[0], q0[1]); ctx.lineTo(q1[0], q1[1]);
      ctx.lineTo(q2[0], q2[1]); ctx.lineTo(q3[0], q3[1]);
      ctx.closePath();
      ctx.fill();
    }
  };

  Scene.prototype.prism = function (ctx, ring, z0, z1, top, side, stroke) {
    this.sides(ctx, ring, z0, z1, side);
    this.path(ctx, ring, z1);
    ctx.fillStyle = top;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  Scene.prototype.stroke = function (ctx, poly, z, width, color, dash) {
    var i, q;
    ctx.save();
    ctx.beginPath();
    for (i = 0; i < poly.length; i++) {
      q = this.p(poly[i][0], poly[i][1], z);
      if (i === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]);
    }
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    if (dash) ctx.setLineDash(dash);
    ctx.stroke();
    ctx.restore();
  };

  /* Screen-space samples along a projected polyline, evenly spaced in pixels. */
  Scene.prototype.samples = function (poly, z, step, offset) {
    var pts = [], i, q, segs = [], total = 0, a, b, d;
    for (i = 0; i < poly.length; i++) { q = this.p(poly[i][0], poly[i][1], z); pts.push(q); }
    for (i = 1; i < pts.length; i++) {
      a = pts[i - 1]; b = pts[i];
      d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      segs.push({ a: a, b: b, d: d, at: total });
      total += d;
    }
    var out = [], t = (offset || 0) % step;
    if (t < 0) t += step;
    for (; t < total; t += step) {
      for (i = 0; i < segs.length; i++) {
        if (t >= segs[i].at && t <= segs[i].at + segs[i].d) {
          var u = segs[i].d ? (t - segs[i].at) / segs[i].d : 0;
          out.push({
            x: segs[i].a[0] + (segs[i].b[0] - segs[i].a[0]) * u,
            y: segs[i].a[1] + (segs[i].b[1] - segs[i].a[1]) * u,
            dx: (segs[i].b[0] - segs[i].a[0]) / (segs[i].d || 1),
            dy: (segs[i].b[1] - segs[i].a[1]) / (segs[i].d || 1)
          });
          break;
        }
      }
    }
    return out;
  };

  Scene.prototype.font = function (ctx, weight, size) {
    ctx.font = weight + ' ' + size + 'px "Source Han Sans SC","Noto Sans CJK SC",Arial,sans-serif';
  };

  Scene.prototype.label = function (ctx, text, x, y, align, weight, color, size, halo) {
    this.font(ctx, weight || 400, size || this.fs);
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 3.4;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = halo || 'rgba(16,56,61,0.92)';
    ctx.strokeText(text, x, y);
    ctx.fillStyle = color || '#eef4f2';
    ctx.fillText(text, x, y);
  };

  /* Text placement with a simple occupancy test so labels never overprint. */
  function Placer(w, h) { this.w = w; this.h = h; this.boxes = []; }
  Placer.prototype.free = function (r) {
    if (r.x0 < 4 || r.y0 < 4 || r.x1 > this.w - 4 || r.y1 > this.h - 4) return false;
    for (var i = 0; i < this.boxes.length; i++) {
      var o = this.boxes[i];
      if (!(r.x1 < o.x0 || r.x0 > o.x1 || r.y1 < o.y0 || r.y0 > o.y1)) return false;
    }
    return true;
  };
  Placer.prototype.take = function (r) { this.boxes.push(r); };

  /* Upright billboard plate anchored on the ground point. */
  function plate(ctx, x, y, w, h, fill, edge, bar) {
    ctx.fillStyle = fill;
    ctx.fillRect(x - w / 2, y - h, w, h);
    if (edge) { ctx.strokeStyle = edge; ctx.lineWidth = 1; ctx.strokeRect(x - w / 2 + 0.5, y - h + 0.5, w - 1, h - 1); }
    if (bar) { ctx.fillStyle = bar; ctx.fillRect(x - w / 2 + 2, y - h + 2.5, w - 4, 1.6); ctx.fillRect(x - w / 2 + 2, y - h + 6, w - 4, 1.6); }
  }

  Scene.prototype.draw = function (ctx) {
    var i, q, a, n, self = this;
    var s = this.s, dense = this.dense;
    var P = PERIODS[this.period] || PERIODS.day;
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.fillStyle = P.bg;
    ctx.fillRect(0, 0, this.w, this.h);

    /* Ground plate: provisional scope, drawn with a dashed edge on purpose. */
    this.path(ctx, this.boundary, 0);
    ctx.fillStyle = 'rgba(242,239,231,0.10)';
    ctx.fill();
    ctx.save();
    ctx.setLineDash([7, 6]);
    ctx.strokeStyle = 'rgba(168,203,197,0.85)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    /* Key-area plinths, far to near. */
    var areas = this.areas.slice().sort(function (p, q2) { return depth(q2.ring) - depth(p.ring); });
    for (i = 0; i < areas.length; i++) {
      a = areas[i];
      var acc = ACCENT[a.src.accent] || C.teal;
      this.prism(ctx, a.ring, 0, Z_PLINTH, tint(acc, 0.46), shade(acc, 0.68), 'rgba(242,239,231,0.6)');
    }

    /* Green slabs and public-space slabs sit on the plinth level. */
    for (i = 0; i < this.green.length; i++) {
      var g = this.green[i];
      var gz = g.src.type === 'low_stimulation_buffer' ? Z_SLAB + 4 : Z_SLAB;
      this.prism(ctx, g.ring, 0, gz, 'rgba(23,124,120,0.55)', 'rgba(16,56,61,0.85)', null);
    }
    for (i = 0; i < this.pub.length; i++) {
      var pb = this.pub[i];
      var isMark = !!pb.src.landmark;
      this.prism(ctx, pb.ring, 0, isMark ? Z_PLINTH + 90 : Z_SLAB + 30,
        isMark ? 'rgba(214,161,59,0.94)' : 'rgba(242,239,231,0.62)',
        isMark ? 'rgba(150,110,36,0.95)' : 'rgba(120,132,128,0.68)', null);
    }

    /* Routes. The spine and the low-stimulation alternative are the two
       equivalent paths; they are drawn in both states, unchanged. */
    for (i = 0; i < this.cross.length; i++) {
      this.stroke(ctx, this.cross[i], Z_ROAD, Math.max(1.6, 3 * s * 22), 'rgba(203,211,207,0.65)', [6, 5]);
    }
    this.stroke(ctx, this.spine, Z_ROAD, Math.max(3.5, 7000 * s * 0.0012), C.teal, null);
    this.stroke(ctx, this.alt, Z_ROAD, Math.max(2.4, 7000 * s * 0.0009), 'rgba(23,124,120,0.95)', [9, 7]);

    /* Time-of-day pass. The wash lands on the terrain only; the service
       overlay, the nodes and every label are drawn after it and keep full
       contrast, so legibility does not depend on the period. */
    if (P.wash) {
      ctx.fillStyle = P.wash;
      ctx.fillRect(0, 0, this.w, this.h);
    }
    if (P.lamp) this.lamps(ctx);

    /* State overlay on both routes. */
    if (this.state === 'on') {
      this.flow(ctx, this.spine, Z_ROAD, 26, '#5fd0c4');
      this.flow(ctx, this.alt, Z_ROAD, 34, 'rgba(95,208,196,0.75)');
    } else {
      this.signs(ctx, this.spine, Z_ROAD, 74);
      this.signs(ctx, this.alt, Z_ROAD, 96);
    }

    /* Nodes, far to near. */
    var order = this.nodes.slice().sort(function (p, q2) { return (q2.X + q2.Y) - (p.X + p.Y); });
    this.hits = [];
    for (i = 0; i < order.length; i++) this.node(ctx, order[i]);

    this.labels(ctx, areas);
    this.chrome(ctx);
    /* Restated in the picture so the argument survives a screenshot. */
    var eq = this.lang === 'en' ? 'AI ON  =  AI OFF' : 'AI ON  =  AI OFF';
    ctx.font = '800 ' + Math.round(this.fs * 1.35) + 'px Georgia,serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#a8cbc5';
    ctx.fillText(eq, 16, 14);
    ctx.font = '400 ' + Math.round(this.fs * 0.95) + 'px "Source Han Sans SC","Noto Sans CJK SC",Arial,sans-serif';
    ctx.fillStyle = 'rgba(168,203,197,0.8)';
    ctx.fillText(this.state === 'on' ? this.t.onLabel : this.t.offLabel, 16, 16 + this.fs * 1.6);
  };

  /* Labels are drawn last, off the band where possible, with leader lines. */
  Scene.prototype.labels = function (ctx, areas) {
    var self = this, i, q, pl = new Placer(this.w, this.h), fs = this.fs;
    var sel = this.selected && this.selected.id;
    /* Perpendicular to the spine on screen, pointing into the empty corner. */
    var a0 = this.p(0, 0, 0), a1 = this.p(0, -1000, 0);
    var dx = a1[0] - a0[0], dy = a1[1] - a0[1], dm = Math.hypot(dx, dy) || 1;
    var px2 = dy / dm, py2 = -dx / dm;
    var off = Math.max(60, this.h * 0.30);

    function measure(text, weight, size) {
      self.font(ctx, weight, size);
      return ctx.measureText(text).width;
    }

    /* Reserve the fixed chrome so no label lands on the title, the north
       arrow or the scale bar. */
    ctx.font = '800 ' + Math.round(fs * 1.35) + 'px Georgia,serif';
    var titleW = ctx.measureText('AI ON  =  AI OFF').width;
    pl.take({ x0: 8, y0: 6, x1: 20 + titleW, y1: 22 + fs * 3 });
    pl.take({ x0: this.w - 104, y0: 6, x1: this.w - 6, y1: 84 });
    var s0 = this.p(0, 0, 0), s1 = this.p(0, 1000, 0);
    var kpx = Math.hypot(s1[0] - s0[0], s1[1] - s0[1]);
    pl.take({ x0: 8, y0: this.h - 42, x1: 24 + kpx + 130, y1: this.h - 4 });
    function putAbs(text, cands, weight, size, color, halo, dry) {
      var wpx = measure(text, weight, size), j, c2, left, box, shift;
      for (j = 0; j < cands.length; j++) {
        c2 = { x: cands[j].x, y: cands[j].y, side: cands[j].side };
        left = c2.side === 'r' ? c2.x - wpx : c2.x;
        /* Keep the label inside the frame instead of dropping it. */
        shift = 0;
        if (left - 3 < 4) shift = 4 - (left - 3);
        else if (left + wpx + 3 > self.w - 4) shift = (self.w - 4) - (left + wpx + 3);
        c2.x += shift;
        left += shift;
        box = { x0: left - 3, y0: c2.y - size * 0.72, x1: left + wpx + 3, y1: c2.y + size * 0.72 };
        if (pl.free(box)) {
          pl.take(box);
          if (!dry) self.label(ctx, text, c2.x, c2.y, c2.side === 'r' ? 'right' : 'left', weight, color, size, halo);
          return c2;
        }
      }
      return null;
    }
    function put(text, ax, ay, offs, weight, size, color, halo) {
      var cands = [], j;
      for (j = 0; j < offs.length; j++) {
        cands.push({ x: ax + offs[j][0], y: ay + offs[j][1], side: offs[j][2] === 'r' ? 'r' : 'l' });
      }
      return putAbs(text, cands, weight, size, color, halo);
    }

    /* Key areas: anchored on the plinth, labelled clear of the band. Each
       label tries the empty corner first, then mirrors to the other side. */
    for (i = 0; i < areas.length; i++) {
      var c = centroid(areas[i].ring);
      q = this.p(c[0], c[1], Z_PLINTH);
      var nm = this.dense
        ? this.t.short[areas[i].src.area]
        : (this.lang === 'en' ? areas[i].src.en : areas[i].src.zh);
      var cu = this.lang === 'en' ? areas[i].src.cultureEn : areas[i].src.cultureZh;
      var nw = measure(nm, 800, fs);
      var cands = [], sg, k2, ax, ay, sd;
      for (sg = 1; sg >= -1; sg -= 2) {
        ax = q[0] + px2 * off * sg;
        ay = q[1] + py2 * off * sg;
        sd = sg > 0 ? (ax + nw > this.w - 10 ? 'r' : 'l') : 'r';
        for (k2 = 0; k2 < 5; k2++) {
          cands.push({ x: ax, y: ay + [0, -fs - 6, fs + 6, -2 * fs - 13, 2 * fs + 13][k2], side: sd });
        }
      }
      var got = putAbs(nm, cands, 800, fs, '#eef4f2', 'rgba(16,56,61,0.94)', true);
      if (got) {
        ctx.strokeStyle = 'rgba(168,203,197,0.55)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(q[0], q[1]);
        ctx.lineTo(got.x + (got.side === 'r' ? -5 : 5), got.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(q[0], q[1], 2.6, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT[areas[i].src.accent] || C.teal;
        ctx.fill();
        this.label(ctx, nm, got.x, got.y, got.side === 'r' ? 'right' : 'left', 800, '#eef4f2', fs, 'rgba(16,56,61,0.94)');
        if (!this.dense) {
          putAbs(cu, [{ x: got.x, y: got.y + fs + 4, side: got.side }],
            400, fs - 1, 'rgba(168,203,197,0.95)', 'rgba(16,56,61,0.94)');
        }
      }
    }

    /* Landmarks. */
    if (!this.dense) {
      for (i = 0; i < this.pub.length; i++) {
        if (!this.pub[i].src.landmark) continue;
        var cc = centroid(this.pub[i].ring);
        q = this.p(cc[0], cc[1], Z_PLINTH + 90);
        var lm = this.lang === 'en' ? this.pub[i].src.landmarkEn : this.pub[i].src.landmarkZh;
        put(lm, q[0], q[1] - 8, [[7, 0], [-7, 0, 'r'], [7, -fs - 3], [-7, -fs - 3, 'r']],
          800, fs - 1, '#5a3f07', 'rgba(246,240,225,0.96)', null);
      }
    }

    /* Node identifiers; the selected node always wins its place. */
    var hits = this.hits.slice();
    hits.sort(function (p, r) {
      return (p.node.src.id === sel ? -1 : 0) - (r.node.src.id === sel ? -1 : 0);
    });
    for (i = 0; i < hits.length; i++) {
      var ht = hits[i];
      var isSel = ht.node.src.id === sel;
      if (this.dense && !isSel) continue;
      put(ht.node.src.id, ht.x, ht.y - 1,
        [[12, 0], [-12, 0, 'r'], [12, -fs - 4], [-12, -fs - 4, 'r'], [12, fs + 4], [-12, fs + 4, 'r'], [0, -fs - 12]],
        800, fs - 1, isSel ? '#f6b0a2' : '#eef4f2', 'rgba(16,56,61,0.94)', null);
    }
  };

  Scene.prototype.flow = function (ctx, poly, z, step, color) {
    var pts = this.samples(poly, z, step, -this.phase), i, p2, len = Math.max(3, step * 0.22);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    for (i = 0; i < pts.length; i++) {
      p2 = pts[i];
      ctx.beginPath();
      ctx.moveTo(p2.x - p2.dx * len - p2.dy * len * 0.55, p2.y - p2.dy * len + p2.dx * len * 0.55);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p2.x - p2.dx * len + p2.dy * len * 0.55, p2.y - p2.dy * len - p2.dx * len * 0.55);
      ctx.stroke();
    }
    ctx.restore();
  };

  /* Night lighting. Lighting is a baseline service, not an AI feature, so the
     halos are drawn in both AI states: along both equivalent routes and at
     every node. They are the reason a fixed signage plate stays readable and a
     staffed help point stays findable when AI is off. */
  Scene.prototype.lamps = function (ctx) {
    function halo(x, y, r, a) {
      var g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(246,222,160,' + a + ')');
      g.addColorStop(0.55, 'rgba(214,161,59,' + (a * 0.34) + ')');
      g.addColorStop(1, 'rgba(214,161,59,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    var routes = [[this.spine, 92], [this.alt, 120]], i, k, pts, b;
    for (i = 0; i < routes.length; i++) {
      pts = this.samples(routes[i][0], Z_ROAD, routes[i][1], routes[i][1] / 2);
      for (k = 0; k < pts.length; k++) halo(pts[k].x, pts[k].y - 3, 12, 0.30);
    }
    for (i = 0; i < this.nodes.length; i++) {
      b = this.p(this.nodes[i].X, this.nodes[i].Y, 0);
      halo(b[0], b[1] - 4, 25, 0.44);
    }
  };

  Scene.prototype.signs = function (ctx, poly, z, step) {
    var pts = this.samples(poly, z, step, step / 2), i;
    for (i = 0; i < pts.length; i++) {
      ctx.strokeStyle = 'rgba(16,56,61,0.9)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(pts[i].x, pts[i].y);
      ctx.lineTo(pts[i].x, pts[i].y - 7);
      ctx.stroke();
      plate(ctx, pts[i].x, pts[i].y - 6, 13, 10, C.paper, C.deep, C.deep);
    }
  };

  Scene.prototype.node = function (ctx, n) {
    var base = this.p(n.X, n.Y, 0);
    var top = this.p(n.X, n.Y, Z_NODE);
    var sel = this.selected && this.selected.id === n.src.id;
    var r = sel ? 8.5 : 6.2;
    ctx.strokeStyle = sel ? C.coral : 'rgba(242,239,231,0.85)';
    ctx.lineWidth = sel ? 2.4 : 1.4;
    ctx.beginPath();
    ctx.moveTo(base[0], base[1]);
    ctx.lineTo(top[0], top[1]);
    ctx.stroke();
    /* Node cap is identical in both states: the node itself does not change. */
    ctx.beginPath();
    ctx.ellipse(top[0], top[1], r * 1.2247, r * 0.7071, 0, 0, Math.PI * 2);
    ctx.fillStyle = sel ? C.coral : C.teal;
    ctx.fill();
    ctx.strokeStyle = C.paper;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    if (this.state === 'on') {
      /* Multimodal guidance: three concentric channels above the node. */
      var j;
      ctx.strokeStyle = sel ? 'rgba(215,100,80,0.9)' : 'rgba(95,208,196,0.85)';
      ctx.lineWidth = 1.3;
      for (j = 1; j <= 3; j++) {
        ctx.beginPath();
        ctx.ellipse(top[0], top[1], r * 1.2247 + j * 5.2, (r * 0.7071 + j * 5.2) * 0.577, 0, Math.PI, Math.PI * 2);
        ctx.stroke();
      }
    } else {
      /* Staffed help point: coral diamond plus a fixed plate. */
      var hx = top[0] + 13, hy = top[1] - 2;
      ctx.beginPath();
      ctx.moveTo(hx, hy - 6); ctx.lineTo(hx + 5.5, hy); ctx.lineTo(hx, hy + 6); ctx.lineTo(hx - 5.5, hy);
      ctx.closePath();
      ctx.fillStyle = C.coral;
      ctx.fill();
      ctx.strokeStyle = C.paper;
      ctx.lineWidth = 1;
      ctx.stroke();
      plate(ctx, base[0] - 11, base[1] - 2, 12, 9, C.paper, C.deep, C.deep);
    }
    this.hits.push({ x: top[0], y: top[1], node: n });
  };

  /* North arrow, scale bar and the honest note about the exaggeration. */
  Scene.prototype.chrome = function (ctx) {
    var pad = 16, w = this.w, h = this.h;
    var ax = w - pad - 26, ay = pad + 30;
    var nDir = this.p(0, 1000, 0), oDir = this.p(0, 0, 0);
    var vx = nDir[0] - oDir[0], vy = nDir[1] - oDir[1], m = Math.hypot(vx, vy) || 1;
    vx /= m; vy /= m;
    ctx.strokeStyle = '#a8cbc5';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(ax - vx * 16, ay - vy * 16);
    ctx.lineTo(ax + vx * 16, ay + vy * 16);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ax + vx * 16, ay + vy * 16);
    ctx.lineTo(ax + vx * 8 - vy * 5, ay + vy * 8 + vx * 5);
    ctx.lineTo(ax + vx * 8 + vy * 5, ay + vy * 8 - vx * 5);
    ctx.closePath();
    ctx.fillStyle = '#a8cbc5';
    ctx.fill();
    ctx.font = '800 ' + Math.round(this.fs) + 'px "Source Han Sans SC","Noto Sans CJK SC",Arial,sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.t.north, ax + vx * 25, ay + vy * 25);

    /* 1 km along the spine (north-south), measured in projected pixels. */
    var k0 = this.p(0, 0, 0), k1 = this.p(0, 1000, 0);
    var kpx = Math.hypot(k1[0] - k0[0], k1[1] - k0[1]);
    var bx = pad, by = h - pad;
    ctx.strokeStyle = 'rgba(168,203,197,0.9)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(bx, by); ctx.lineTo(bx + kpx, by);
    ctx.moveTo(bx, by - 4); ctx.lineTo(bx, by + 4);
    ctx.moveTo(bx + kpx, by - 4); ctx.lineTo(bx + kpx, by + 4);
    ctx.stroke();
    ctx.font = '400 ' + Math.round(this.fs * 0.92) + 'px "Source Han Sans SC","Noto Sans CJK SC",Arial,sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'rgba(168,203,197,0.9)';
    ctx.fillText('1 km · ' + this.t.exag, bx, by - 7);
  };

  function depth(ring) {
    var c = centroid(ring);
    return c[0] + c[1];
  }
  function centroid(ring) {
    var x = 0, y = 0, i;
    for (i = 0; i < ring.length - 1; i++) { x += ring[i][0]; y += ring[i][1]; }
    var n = ring.length - 1;
    return [x / n, y / n];
  }
  function hex(c) {
    return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
  }
  function tint(c, a) { var v = hex(c); return 'rgba(' + v[0] + ',' + v[1] + ',' + v[2] + ',' + a + ')'; }
  function shade(c, f) {
    var v = hex(c);
    return 'rgb(' + Math.round(v[0] * f) + ',' + Math.round(v[1] * f) + ',' + Math.round(v[2] * f) + ')';
  }

  /* ------------------------------------------------------------------ boot */
  function boot() {
    var root = document.querySelector('.jz-scene');
    if (!root) return;
    if (!window.JZ_SCENE) {
      /* dataset failed to load: reveal the static fallback instead of an empty stage */
      root.setAttribute('data-view', 'static');
      var bar = root.querySelector('.jz-bar');
      if (bar) {
        var bs = bar.querySelectorAll('button');
        for (var bi = 0; bi < bs.length; bi++) bs[bi].disabled = true;
      }
      return;
    }
    var lang = root.getAttribute('data-lang') === 'en' ? 'en' : 'zh';
    var t = T[lang];
    var wrap = root.querySelector('.jz-canvaswrap');
    var canvas = root.querySelector('canvas');
    var stateBox = root.querySelector('.jz-state');
    var status = root.querySelector('.jz-status');
    var card = root.querySelector('.jz-card');
    var empty = root.querySelector('.jz-empty');
    var btnOn = root.querySelector('[data-jz="on"]');
    var btnOff = root.querySelector('[data-jz="off"]');
    var btnStatic = root.querySelector('[data-jz="static"]');
    var btnPlay = root.querySelector('[data-jz="play"]');
    var railButtons = root.querySelectorAll('.jz-rail button');
    var periodButtons = root.querySelectorAll('[data-jz-period]');
    var periodLabelEl = root.querySelector('.jz-plabel');
    var periodTextEl = root.querySelector('.jz-ptext');
    var periods = {};
    (function (list) {
      for (var j = 0; j < list.length; j++) periods[list[j].id] = list[j];
    })(window.JZ_SCENE.periods || []);
    var ctx;
    try {
      ctx = canvas.getContext('2d');
    } catch (e) { ctx = null; }
    if (!ctx) { fail(); return; }

    var scene = new Scene(root, window.JZ_SCENE, lang);
    var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var raf = 0, rendered = false, lastW = 0;

    function fail() {
      wrap.setAttribute('data-view', 'static');
      stateBox.textContent = t.failed;
      if (btnStatic) { btnStatic.disabled = true; btnStatic.setAttribute('aria-pressed', 'true'); }
    }

    function reduced() { return !!(mq && mq.matches); }

    function size() {
      var w = Math.max(240, Math.round(wrap.clientWidth));
      var h = Math.round(w / (w < 620 ? 1.24 : 1.72));
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scene.fit(w, h);
      lastW = w;
    }

    function paint() {
      try {
        scene.draw(ctx);
        wrap.setAttribute('data-ready', '1');
        rendered = true;
      } catch (e) {
        fail();
      }
    }

    function render() {
      size();
      paint();
    }

    function tick() {
      scene.phase += 0.55;
      paint();
      raf = window.requestAnimationFrame(tick);
    }

    function setPlaying(on) {
      scene.playing = on && !reduced();
      if (raf) { window.cancelAnimationFrame(raf); raf = 0; }
      if (scene.playing) raf = window.requestAnimationFrame(tick);
      if (btnPlay) {
        btnPlay.setAttribute('aria-pressed', scene.playing ? 'true' : 'false');
        btnPlay.textContent = scene.playing ? t.playOff : t.playOn;
      }
    }

    /* The canvas label carries both dimensions, and restates that the second
       one is presentational: a screen-reader user must not have to guess
       whether the period moved a node or a number. */
    function periodCopy(id) {
      var p = periods[id];
      return p ? p[lang] : null;
    }

    function applyAria() {
      var base = scene.state === 'on' ? t.canvasOn : t.canvasOff;
      var c = periodCopy(scene.period);
      if (!c) { canvas.setAttribute('aria-label', base); return; }
      canvas.setAttribute('aria-label',
        base + ' ' + t.periodNow + c.label + t.period + ' ' + t.periodInvariant);
    }

    function setPeriod(id, announce) {
      var j, c;
      if (!periods[id]) id = 'day';
      scene.period = id;
      root.setAttribute('data-period', id);
      for (j = 0; j < periodButtons.length; j++) {
        periodButtons[j].setAttribute('aria-pressed',
          periodButtons[j].getAttribute('data-jz-period') === id ? 'true' : 'false');
      }
      c = periodCopy(id);
      if (c) {
        if (periodLabelEl) periodLabelEl.textContent = c.label;
        if (periodTextEl) periodTextEl.textContent = c.text;
        if (announce !== false) {
          status.textContent = t.periodSwitched + c.label + t.period + ' ' + c.text;
        }
      }
      applyAria();
      if (rendered) paint();
    }

    function setState(next) {
      scene.state = next;
      btnOn.setAttribute('aria-pressed', next === 'on' ? 'true' : 'false');
      btnOff.setAttribute('aria-pressed', next === 'off' ? 'true' : 'false');
      applyAria();
      root.setAttribute('data-state', next);
      status.textContent = next === 'on' ? t.statusOn : t.statusOff;
      if (scene.selected) fillCard(scene.selected);
      if (rendered) paint();
    }

    function nodeById(id) {
      var i;
      for (i = 0; i < scene.nodes.length; i++) if (scene.nodes[i].src.id === id) return scene.nodes[i].src;
      return null;
    }

    function fillCard(n) {
      var loc = n[lang];
      card.querySelector('.jz-cid').textContent = n.id + ' · ' + n.s + ' · ' + t.gate + ' ' + n.gate;
      card.querySelector('.jz-cname').textContent = loc.name;
      card.querySelector('.jz-carea').textContent = t.areas[n.area] || n.area;
      card.querySelector('.jz-con').textContent = loc.on;
      card.querySelector('.jz-coff').textContent = loc.off;
      card.querySelector('.jz-chand').textContent = loc.hand;
      card.setAttribute('data-focus', scene.state);
    }

    function select(id, announce) {
      var n = nodeById(id);
      var i;
      scene.selected = n;
      for (i = 0; i < railButtons.length; i++) {
        railButtons[i].setAttribute('aria-pressed', railButtons[i].getAttribute('data-node') === id ? 'true' : 'false');
      }
      if (n) {
        fillCard(n);
        card.hidden = false;
        empty.hidden = true;
        if (announce !== false) status.textContent = t.selected + n.id + ' ' + n[lang].name + t.period;
      }
      if (rendered) paint();
    }

    function clearSelection(focusBack) {
      var i, id = scene.selected && scene.selected.id;
      scene.selected = null;
      card.hidden = true;
      empty.hidden = false;
      for (i = 0; i < railButtons.length; i++) railButtons[i].setAttribute('aria-pressed', 'false');
      status.textContent = t.closed;
      if (rendered) paint();
      if (focusBack && id) {
        for (i = 0; i < railButtons.length; i++) {
          if (railButtons[i].getAttribute('data-node') === id) { railButtons[i].focus(); break; }
        }
      }
    }

    btnOn.addEventListener('click', function () { setState('on'); });
    btnOff.addEventListener('click', function () { setState('off'); });
    for (var pi = 0; pi < periodButtons.length; pi++) {
      (function (b) {
        b.addEventListener('click', function () {
          setPeriod(b.getAttribute('data-jz-period'));
        });
      })(periodButtons[pi]);
    }
    for (var i = 0; i < railButtons.length; i++) {
      (function (b) {
        b.addEventListener('click', function () {
          if (b.getAttribute('aria-pressed') === 'true') clearSelection(false);
          else select(b.getAttribute('data-node'));
        });
      })(railButtons[i]);
    }
    card.querySelector('.jz-close').addEventListener('click', function () { clearSelection(true); });
    root.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && !card.hidden) {
        clearSelection(true);
        e.stopPropagation();
      }
    });
    canvas.addEventListener('click', function (e) {
      if (!rendered) return;
      var r = canvas.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top, best = null, bd = 20, d, k;
      for (k = 0; k < scene.hits.length; k++) {
        d = Math.hypot(scene.hits[k].x - x, scene.hits[k].y - y);
        if (d < bd) { bd = d; best = scene.hits[k]; }
      }
      if (best) select(best.node.src.id);
    });
    if (btnStatic) {
      btnStatic.addEventListener('click', function () {
        var on = wrap.getAttribute('data-view') === 'static';
        wrap.setAttribute('data-view', on ? 'live' : 'static');
        btnStatic.setAttribute('aria-pressed', on ? 'false' : 'true');
        btnStatic.textContent = on ? t.staticOn : t.staticOff;
        if (!on) setPlaying(false);
      });
    }
    if (btnPlay) {
      btnPlay.addEventListener('click', function () { setPlaying(!scene.playing); });
    }

    function applyReduced() {
      if (reduced()) {
        setPlaying(false);
        if (btnPlay) { btnPlay.disabled = true; btnPlay.textContent = t.playOn; }
        root.querySelector('.jz-reduced').textContent = t.reduced;
      } else {
        if (btnPlay) btnPlay.disabled = false;
        root.querySelector('.jz-reduced').textContent = '';
      }
    }
    if (mq) {
      if (mq.addEventListener) mq.addEventListener('change', applyReduced);
      else if (mq.addListener) mq.addListener(applyReduced);
    }
    applyReduced();
    setPeriod('day', false);
    setState('on');

    /* Lazy first paint: when the chapter approaches the viewport, or as a
       guard shortly after load. Nothing animates until the user asks. */
    function first() {
      if (rendered) return;
      render();
    }
    if (window.IntersectionObserver) {
      var io = new window.IntersectionObserver(function (entries) {
        for (var j = 0; j < entries.length; j++) {
          if (entries[j].isIntersecting) { first(); io.disconnect(); }
        }
      }, { rootMargin: '700px 0px' });
      io.observe(root);
    }
    window.setTimeout(first, 1200);
    window.addEventListener('resize', function () {
      if (!rendered) return;
      if (Math.abs(wrap.clientWidth - lastW) < 2) return;
      render();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
