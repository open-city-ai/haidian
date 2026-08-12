/* gauge-tour.js — hand-written WebGL 1 viewer for the Jing-Zhang Gauge 3D tour.
   No third-party runtime library (no Three.js, no loader, no framework).
   Fully offline: reads only window.GAUGE_TOUR_DATA injected by the sibling
   local script gauge-tour-data.js. No network API of any kind is used.
   Keyboard: arrows orbit/tilt, 1/2/3 station views, 0 overview,
   Space auto-orbit, E height x1/x3 (conceptual, labelled), R reset.
   Honors prefers-reduced-motion; degrades to a text notice without WebGL. */
(function () {
  'use strict';

  var HOST_ID = 'gauge-tour';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else { fn(); }
  }

  /* ---------- tiny matrix helpers (column-major, GL style) ---------- */
  function mat4Identity() {
    return new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
  }
  function mat4Perspective(fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
    var m = new Float32Array(16);
    m[0] = f / aspect; m[5] = f;
    m[10] = (far + near) * nf; m[11] = -1;
    m[14] = 2 * far * near * nf;
    return m;
  }
  function mat4LookAt(eye, c, up) {
    var zx = eye[0]-c[0], zy = eye[1]-c[1], zz = eye[2]-c[2];
    var zl = Math.hypot(zx, zy, zz) || 1; zx/=zl; zy/=zl; zz/=zl;
    var xx = up[1]*zz - up[2]*zy, xy = up[2]*zx - up[0]*zz, xz = up[0]*zy - up[1]*zx;
    var xl = Math.hypot(xx, xy, xz) || 1; xx/=xl; xy/=xl; xz/=xl;
    var yx = zy*xz - zz*xy, yy = zz*xx - zx*xz, yz = zx*xy - zy*xx;
    var m = mat4Identity();
    m[0]=xx; m[4]=xy; m[8]=xz;
    m[1]=yx; m[5]=yy; m[9]=yz;
    m[2]=zx; m[6]=zy; m[10]=zz;
    m[12]=-(xx*eye[0]+xy*eye[1]+xz*eye[2]);
    m[13]=-(yx*eye[0]+yy*eye[1]+yz*eye[2]);
    m[14]=-(zx*eye[0]+zy*eye[1]+zz*eye[2]);
    return m;
  }
  function mat4Mul(a, b) {
    var o = new Float32Array(16);
    for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) {
      o[j*4+i] = a[i]*b[j*4] + a[4+i]*b[j*4+1] + a[8+i]*b[j*4+2] + a[12+i]*b[j*4+3];
    }
    return o;
  }

  /* ---------- shaders ---------- */
  var VS = [
    'attribute vec3 aPos;',
    'attribute vec3 aCol;',
    'uniform mat4 uMVP;',
    'uniform float uZScale;',
    'varying vec3 vCol;',
    'void main(){',
    '  vec3 p = vec3(aPos.x, aPos.y * uZScale, aPos.z);',
    '  gl_Position = uMVP * vec4(p, 1.0);',
    '  vCol = aCol;',
    '}'
  ].join('\n');
  var FS = [
    'precision mediump float;',
    'varying vec3 vCol;',
    'uniform float uFog;',
    'void main(){',
    '  gl_FragColor = vec4(vCol, 1.0);',
    '}'
  ].join('\n');

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error('shader: ' + gl.getShaderInfoLog(s));
    }
    return s;
  }

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  /* Expand {pos:int decimeters, col:paletteIdx, shade:0..100} into GL buffers.
     Data axes: x east, y north, z up  ->  GL: x east, y up, z south. */
  function buildInterleaved(part, palette, defaultShade) {
    var n = part.col.length;
    var out = new Float32Array(n * 6);
    var shade = part.shade || null;
    for (var i = 0; i < n; i++) {
      var px = part.pos[i*3] / 10, py = part.pos[i*3+1] / 10, pz = part.pos[i*3+2] / 10;
      var rgb = palette[part.col[i]];
      var s = shade ? shade[i] / 100 : defaultShade;
      out[i*6]   = px;
      out[i*6+1] = pz;      /* z-up -> y-up */
      out[i*6+2] = -py;     /* north -> -z */
      out[i*6+3] = rgb[0] * s;
      out[i*6+4] = rgb[1] * s;
      out[i*6+5] = rgb[2] * s;
    }
    return out;
  }

  function makeBuffer(gl, data) {
    var b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return { buf: b, count: data.length / 6 };
  }

  function init() {
    var host = document.getElementById(HOST_ID);
    if (!host) { return; }
    var lang = (host.getAttribute('data-lang') === 'en') ? 'en' : 'zh';
    var T = {
      zh: {
        fallback: '当前环境不支持 WebGL（或已被禁用）。三维巡览不可用，请参阅上方各节静态图件——两者由同一套 GeoJSON 生成，信息等价。',
        views: ['总览', '制标区 Gauge Works', '首装区 Proto Blocks', '量产区 Market Floor'],
        hReal: '高度 ×1（真实比例）', hEx: '高度 ×3（示意放大）',
        orbitOn: '环绕中（空格停止）', orbitOff: ''
      },
      en: {
        fallback: 'WebGL is unavailable (or disabled) in this environment. The 3D tour cannot start; please use the static figures in the sections above — they are generated from the same GeoJSON and carry the same information.',
        views: ['Overview', 'Gauge Works', 'Proto Blocks', 'Market Floor'],
        hReal: 'Height ×1 (true scale)', hEx: 'Height ×3 (exaggerated, illustrative)',
        orbitOn: 'Orbiting (Space to stop)', orbitOff: ''
      }
    }[lang];

    var data = window.GAUGE_TOUR_DATA;
    var canvas = host.querySelector('canvas');
    var hud = host.querySelector('.tour-hud');
    var badge = host.querySelector('.tour-badge');
    var fallbackBox = host.querySelector('.tour-fallback');

    function fail() {
      if (canvas) { canvas.style.display = 'none'; }
      if (fallbackBox) {
        fallbackBox.textContent = T.fallback;
        fallbackBox.style.display = 'block';
      }
    }
    if (!data || !canvas || !window.WebGLRenderingContext) { fail(); return; }

    var gl = null;
    try {
      gl = canvas.getContext('webgl', { antialias: true, alpha: false })
        || canvas.getContext('experimental-webgl');
    } catch (e) { gl = null; }
    if (!gl) { fail(); return; }

    canvas.addEventListener('webglcontextlost', function (e) {
      e.preventDefault(); fail();
    });

    var reduced = false;
    try {
      reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { reduced = false; }

    var palette = [];
    for (var i = 0; i < data.palette.length; i++) palette.push(hexToRgb(data.palette[i]));

    var prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { fail(); return; }
    gl.useProgram(prog);
    var aPos = gl.getAttribLocation(prog, 'aPos');
    var aCol = gl.getAttribLocation(prog, 'aCol');
    var uMVP = gl.getUniformLocation(prog, 'uMVP');
    var uZScale = gl.getUniformLocation(prog, 'uZScale');

    var ground = makeBuffer(gl, buildInterleaved(data.ground, palette, 1));
    var buildings = makeBuffer(gl, buildInterleaved(data.buildings, palette, 1));
    var lines = makeBuffer(gl, buildInterleaved(data.lines, palette, 0.85));

    var paper = hexToRgb('#F2F3F0');
    gl.clearColor(paper[0], paper[1], paper[2], 1);
    gl.enable(gl.DEPTH_TEST);

    /* ---------- camera state ---------- */
    var span = data.span || 8000;
    var HOME = { tx: 0, tz: 0, dist: span * 0.85, az: 0.6, el: 0.86 };
    var cam = null, target = null, anim = null, orbiting = false, zScale = 1;
    var viewIdx = 0;

    function clone(s) { return { tx: s.tx, tz: s.tz, dist: s.dist, az: s.az, el: s.el }; }
    cam = clone(HOME); target = clone(HOME);

    function viewFor(i) {
      if (i === 0) { return clone(HOME); }
      var c = data.cams[i - 1];
      return { tx: c.c[0], tz: -c.c[1], dist: Math.max(c.r * 2.2, 900), az: 0.8, el: 0.62 };
    }

    function setView(i, snap) {
      viewIdx = i;
      target = viewFor(i);
      if (snap || reduced) { cam = clone(target); anim = null; }
      updateHud();
      requestDraw();
    }

    function updateHud() {
      if (hud) {
        hud.textContent = T.views[viewIdx] + (orbiting ? ' · ' + T.orbitOn : '');
      }
      if (badge) {
        badge.textContent = (zScale === 1) ? T.hReal : T.hEx;
        badge.className = 'tour-badge' + (zScale === 1 ? '' : ' tour-badge-ex');
      }
    }

    /* ---------- render ---------- */
    var needDraw = true, rafPending = false;
    function requestDraw() {
      needDraw = true;
      if (!rafPending) { rafPending = true; requestAnimationFrame(frame); }
    }

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) { return; }
      var W = Math.round(w * dpr), H = Math.round(h * dpr);
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W; canvas.height = H;
        gl.viewport(0, 0, W, H);
      }
    }

    function drawPart(part, mode) {
      gl.bindBuffer(gl.ARRAY_BUFFER, part.buf);
      gl.enableVertexAttribArray(aPos);
      gl.enableVertexAttribArray(aCol);
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 24, 0);
      gl.vertexAttribPointer(aCol, 3, gl.FLOAT, false, 24, 12);
      gl.drawArrays(mode, 0, part.count);
    }

    function frame(ts) {
      rafPending = false;
      var animating = false;

      /* ease toward target */
      var k = reduced ? 1 : 0.12;
      ['tx', 'tz', 'dist', 'az', 'el'].forEach(function (f) {
        var d = target[f] - cam[f];
        if (Math.abs(d) > (f === 'dist' ? 0.5 : 0.0008)) {
          cam[f] += d * k; animating = true;
        } else { cam[f] = target[f]; }
      });
      if (orbiting && !reduced) { target.az += 0.0035; animating = true; }

      if (needDraw || animating) {
        needDraw = false;
        resize();
        var eye = [
          cam.tx + cam.dist * Math.cos(cam.el) * Math.sin(cam.az),
          cam.dist * Math.sin(cam.el),
          cam.tz + cam.dist * Math.cos(cam.el) * Math.cos(cam.az)
        ];
        var view = mat4LookAt(eye, [cam.tx, 0, cam.tz], [0, 1, 0]);
        var proj = mat4Perspective(0.66, canvas.width / Math.max(1, canvas.height), 10, span * 6);
        var mvp = mat4Mul(proj, view);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniformMatrix4fv(uMVP, false, mvp);
        gl.uniform1f(uZScale, 1.0);
        drawPart(ground, gl.TRIANGLES);
        gl.uniform1f(uZScale, zScale);
        drawPart(buildings, gl.TRIANGLES);
        gl.uniform1f(uZScale, 1.0);
        drawPart(lines, gl.LINES);
      }
      if (animating) { rafPending = true; requestAnimationFrame(frame); }
    }

    /* ---------- interaction ---------- */
    function clampEl(v) { return Math.min(1.45, Math.max(0.12, v)); }
    function clampDist(v) { return Math.min(span * 3, Math.max(220, v)); }

    canvas.addEventListener('keydown', function (e) {
      var used = true;
      switch (e.key) {
        case 'ArrowLeft': target.az -= 0.09; break;
        case 'ArrowRight': target.az += 0.09; break;
        case 'ArrowUp':
          if (e.shiftKey) { target.el = clampEl(target.el + 0.06); }
          else { target.dist = clampDist(target.dist * 0.88); }
          break;
        case 'ArrowDown':
          if (e.shiftKey) { target.el = clampEl(target.el - 0.06); }
          else { target.dist = clampDist(target.dist * 1.14); }
          break;
        case '0': setView(0); break;
        case '1': setView(1); break;
        case '2': setView(2); break;
        case '3': setView(3); break;
        case ' ':
          orbiting = !orbiting && !reduced;
          break;
        case 'e': case 'E':
          zScale = (zScale === 1) ? 3 : 1;
          break;
        case 'r': case 'R':
          orbiting = false; zScale = 1; setView(0, false);
          break;
        default: used = false;
      }
      if (used) {
        e.preventDefault();
        updateHud();
        requestDraw();
      }
    });

    var drag = null;
    canvas.addEventListener('mousedown', function (e) {
      drag = { x: e.clientX, y: e.clientY, az: target.az, el: target.el };
      e.preventDefault();
    });
    window.addEventListener('mousemove', function (e) {
      if (!drag) { return; }
      target.az = drag.az + (e.clientX - drag.x) * 0.006;
      target.el = clampEl(drag.el + (e.clientY - drag.y) * 0.005);
      requestDraw();
    });
    window.addEventListener('mouseup', function () { drag = null; });
    canvas.addEventListener('wheel', function (e) {
      target.dist = clampDist(target.dist * (e.deltaY > 0 ? 1.11 : 0.9));
      e.preventDefault();
      requestDraw();
    }, { passive: false });

    /* basic touch: one finger orbit, two finger pinch zoom */
    var touch = null;
    canvas.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        touch = { mode: 'orbit', x: e.touches[0].clientX, y: e.touches[0].clientY, az: target.az, el: target.el };
      } else if (e.touches.length === 2) {
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        touch = { mode: 'pinch', d: Math.hypot(dx, dy), dist: target.dist };
      }
      e.preventDefault();
    }, { passive: false });
    canvas.addEventListener('touchmove', function (e) {
      if (!touch) { return; }
      if (touch.mode === 'orbit' && e.touches.length === 1) {
        target.az = touch.az + (e.touches[0].clientX - touch.x) * 0.006;
        target.el = clampEl(touch.el + (e.touches[0].clientY - touch.y) * 0.005);
      } else if (touch.mode === 'pinch' && e.touches.length === 2) {
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        var d = Math.hypot(dx, dy) || 1;
        target.dist = clampDist(touch.dist * touch.d / d);
      }
      e.preventDefault();
      requestDraw();
    }, { passive: false });
    canvas.addEventListener('touchend', function () { touch = null; });

    var viewBtns = host.querySelectorAll('[data-tour-view]');
    Array.prototype.forEach.call(viewBtns, function (btn) {
      btn.addEventListener('click', function () {
        setView(parseInt(btn.getAttribute('data-tour-view'), 10) || 0);
        canvas.focus();
      });
    });

    window.addEventListener('resize', requestDraw);
    setView(0, true);
    updateHud();
    requestDraw();
  }

  ready(init);
})();
