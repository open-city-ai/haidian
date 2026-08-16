// The year, recomputed in the browser so the reader can disagree with FIG.30.
//
// This is a second implementation of `analysis/fig_year.py:profile`, not a
// reader of its answers. `analysis/calendar_parity_qa.py` runs it against the
// Python original on the arrangements shipped in `year_model.json`, and the
// build fails if the two ever disagree. A page that only replayed a stored
// result would prove nothing about the model it claims to demonstrate.
//
// Offline, no imports, no network. Keyboard first: the canvas is a control,
// and a control that needs a mouse is a control some readers do not have.
(function () {
  "use strict";
  var MONTHS_ZH = ["1月", "2月", "3月", "4月", "5月", "6月",
                   "7月", "8月", "9月", "10月", "11月", "12月"];
  var MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function months() {
    var lang = (typeof document !== "undefined" &&
                document.documentElement.getAttribute("lang")) || "zh";
    return lang.indexOf("en") === 0 ? MONTHS_EN : MONTHS_ZH;
  }
  var INK = "#2B3138", INK2 = "#676D74", RULE = "#CFC9BC";
  var BLUE = "#0A72A8", RED = "#C0392B", PAPER = "#F2EFE9";

  function profile(model, quarterOffsets, annualMonths) {
    var per = model.hours_per_session;
    var load = new Array(12).fill(0);
    var m;
    for (m = 0; m < 12; m++) load[m] += model.monthly_third_order_points * per.third;
    quarterOffsets.forEach(function (off) {
      for (m = off; m < 12; m += 3) load[m] += per.second;
    });
    annualMonths.forEach(function (month, i) {
      load[month] += i === 0 ? per.datum : per.first;
    });
    return load;
  }

  function ready(model, host) {
    var state = {
      q: model.published.quarter_offsets.slice(),
      a: model.published.annual_months.slice(),
      sel: 0
    };
    var MONTHS = months();
    var canvas = host.querySelector("canvas");
    var out = host.querySelector("[data-role=readout]");
    var table = host.querySelector("[data-role=table]");
    var reduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function draw() {
      var load = profile(model, state.q, state.a);
      var peak = Math.max.apply(null, load);
      var trough = Math.min.apply(null, load);
      var ref = Math.max(peak, model.naive.peak);
      var w = canvas.width, h = canvas.height, ctx = canvas.getContext("2d");
      ctx.fillStyle = PAPER; ctx.fillRect(0, 0, w, h);
      var x0 = 46, y0 = h - 46, bw = (w - x0 - 24) / 12;
      ctx.strokeStyle = RULE; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, y0 + 0.5); ctx.lineTo(w - 18, y0 + 0.5); ctx.stroke();
      // The published peak, as a line to beat.
      var py = y0 - (model.published.peak / ref) * (y0 - 28);
      ctx.strokeStyle = RED; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(x0, py); ctx.lineTo(w - 18, py); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = RED; ctx.font = "12px sans-serif";
      ctx.fillText(model.published.peak.toFixed(1) + " h", x0 + 2, py - 5);
      for (var m = 0; m < 12; m++) {
        var bh = (load[m] / ref) * (y0 - 28);
        var isAnnual = state.a.indexOf(m) >= 0;
        ctx.fillStyle = load[m] > model.published.peak ? RED : BLUE;
        ctx.globalAlpha = isAnnual ? 1 : 0.62;
        ctx.fillRect(x0 + m * bw + 3, y0 - bh, bw - 6, bh);
        ctx.globalAlpha = 1;
        ctx.fillStyle = INK2; ctx.font = "11px sans-serif";
        ctx.fillText(MONTHS[m], x0 + m * bw + 4, y0 + 16);
        if (isAnnual) {
          var which = state.a.indexOf(m);
          ctx.fillStyle = which === state.sel ? INK : INK2;
          ctx.font = (which === state.sel ? "bold " : "") + "11px sans-serif";
          ctx.fillText(which === 0 ? (MONTHS === MONTHS_EN ? "datum" : "基准")
                         : (MONTHS === MONTHS_EN ? "first" : "一等"),
                       x0 + m * bw + 4, y0 - bh - 6);
        }
      }
      ctx.fillStyle = INK; ctx.font = "12px sans-serif";
      ctx.fillText("h", 10, 34);
      var better = peak < model.published.peak - 1e-9;
      out.textContent =
        "峰值 " + peak.toFixed(1) + " h、谷值 " + trough.toFixed(1) +
        " h（差 " + (peak - trough).toFixed(1) + " h）。" +
        "peak " + peak.toFixed(1) + " h, trough " + trough.toFixed(1) + " h. " +
        (better
          ? "比已发布的排布更低。 Lower than the published arrangement."
          : peak > model.published.peak
            ? "高于已发布的 " + model.published.peak.toFixed(1) +
              " h。 Higher than the published " + model.published.peak.toFixed(1) + " h."
            : "与已发布的排布持平。 Level with the published arrangement.");
      var cells = load.map(function (v, i) {
        return "<tr><td>" + MONTHS[i] + "</td><td>" + v.toFixed(1) + "</td></tr>";
      }).join("");
      table.innerHTML = "<caption>逐月工时 Hours by month</caption>" +
        "<tr><th>月 Month</th><th>h</th></tr>" + cells;
    }

    function move(delta) {
      state.a[state.sel] = ((state.a[state.sel] + delta) % 12 + 12) % 12;
      draw();
    }

    host.querySelector("[data-role=prev]").addEventListener("click", function () { move(-1); });
    host.querySelector("[data-role=next]").addEventListener("click", function () { move(1); });
    host.querySelector("[data-role=which]").addEventListener("click", function () {
      state.sel = (state.sel + 1) % 3; draw();
    });
    host.querySelector("[data-role=reset]").addEventListener("click", function () {
      state.q = model.published.quarter_offsets.slice();
      state.a = model.published.annual_months.slice();
      state.sel = 0; draw();
    });
    host.querySelector("[data-role=naive]").addEventListener("click", function () {
      state.q = model.naive.quarter_offsets.slice();
      state.a = model.naive.annual_months.slice();
      state.sel = 0; draw();
    });
    canvas.setAttribute("tabindex", "0");
    canvas.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { move(-1); e.preventDefault(); }
      else if (e.key === "ArrowRight") { move(1); e.preventDefault(); }
      else if (e.key === "Tab" && !e.shiftKey) { return; }
      else if (e.key === " " || e.key === "Enter") {
        state.sel = (state.sel + 1) % 3; draw(); e.preventDefault();
      }
    });
    if (reduced) host.setAttribute("data-reduced-motion", "true");
    draw();
    host.removeAttribute("data-loading");
  }

  function boot() {
    var host = document.querySelector("[data-role=year-explorer]");
    if (!host) return;
    var raw = document.getElementById("year-model");
    if (!raw) { host.setAttribute("data-error", "true"); return; }
    var model;
    try { model = JSON.parse(raw.textContent); }
    catch (err) { host.setAttribute("data-error", "true"); return; }
    if (!host.querySelector("canvas") || !document.createElement("canvas").getContext) {
      host.setAttribute("data-error", "true");
      return;
    }
    ready(model, host);
  }
  // Guarded so the same file can be required under node by
  // `analysis/calendar_parity_qa.py`. Without this the module touches
  // `document` at load time and the gate that checks the model cannot even
  // import the model it is checking.
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else { boot(); }
  }

  if (typeof module !== "undefined" && module.exports) module.exports = { profile: profile };
})();
