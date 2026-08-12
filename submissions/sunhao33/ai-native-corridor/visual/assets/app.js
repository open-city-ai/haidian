/* Jing-Zhang AI Artery — Static SPA Controller (no external dependencies, no network) */
(function () {
  "use strict";

  /* ── Tab Navigation ── */
  function initTabs() {
    var nav = document.querySelector(".spa-nav");
    if (!nav) return;
    var tabs = [].slice.call(nav.querySelectorAll(".spa-tab"));
    var panels = [].slice.call(document.querySelectorAll(".spa-panel"));
    if (!tabs.length || !panels.length) return;

    function activate(id) {
      tabs.forEach(function (t) {
        t.classList.toggle("active", t.getAttribute("data-tab") === id);
      });
      panels.forEach(function (p) {
        p.classList.toggle("active", p.getAttribute("data-panel") === id);
      });
      if (history.replaceState) {
        history.replaceState(null, "", "#" + id);
      }
    }

    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        activate(t.getAttribute("data-tab"));
      });
    });

    /* Restore from hash */
    var hash = (location.hash || "").replace("#", "");
    var valid = tabs.some(function (t) { return t.getAttribute("data-tab") === hash; });
    activate(valid ? hash : tabs[0].getAttribute("data-tab"));
  }

  /* ── Scroll-triggered reveal ── */
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    [].forEach.call(document.querySelectorAll(".reveal"), function (el) {
      observer.observe(el);
    });
  }

  /* ── Counter animation ── */
  function animateCounters() {
    if (!("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var raw = el.getAttribute("data-count-to");
          if (raw === null) return;
          var target = parseFloat(raw);
          if (isNaN(target)) return;
          var duration = 1400;
          var start = performance.now();
          var decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
          function tick(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1.0);
            /* ease-out cubic */
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = target * eased;
            el.textContent =
              decimals > 0
                ? current.toFixed(decimals)
                : Math.round(current).toLocaleString();
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = raw.includes(".") ? target.toFixed(decimals) : Math.round(target).toLocaleString();
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );
    [].forEach.call(document.querySelectorAll("[data-count-to]"), function (el) {
      observer.observe(el);
    });
  }

  /* ── Metric bar fill ── */
  function initMetricBars() {
    if (!("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var bar = entry.target;
          bar.style.width = bar.getAttribute("data-fill") || "0%";
          observer.unobserve(bar);
        });
      },
      { threshold: 0.3 }
    );
    [].forEach.call(document.querySelectorAll(".metric-fill"), function (el) {
      observer.observe(el);
    });
  }

  /* ── Boot ── */
  function boot() {
    initTabs();
    initReveal();
    animateCounters();
    initMetricBars();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
