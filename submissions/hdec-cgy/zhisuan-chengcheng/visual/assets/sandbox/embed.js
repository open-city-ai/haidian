/* 沙盘嵌入引导：把 sandbox-document.js 携带的完整沙盘文档注入故事页的 #jzSandboxEmbed 容器，
   作为自动推演的实时预览；点击上方 CTA 遮罩仍通过 launcher.js 弹出全屏交互沙盘。
   样式使用 styles-embed.css（选择器全部限定在 #jzSandboxEmbed 内），不污染宿主页面。 */
(function () {
  function boot() {
    var host = document.getElementById('jzSandboxEmbed');
    var source = window.JINGZHANG_SANDBOX_DOCUMENT;
    if (!host || !source || host.getAttribute('data-embedded') === '1') return;
    host.setAttribute('data-embedded', '1');
    var bodyStart = source.indexOf('<body>');
    var scriptStart = source.indexOf('<script', bodyStart);
    if (bodyStart < 0 || scriptStart < 0) return;
    host.insertAdjacentHTML('beforeend', source.slice(bodyStart + 6, scriptStart));
    /* 复刻沙盘文档的脚本加载顺序：数据脚本 → 离线适配器（内联） → app.js。
       文档内 src 以 ../visual/ 前缀书写（弹窗基址为 visual/），在本页直接改为相对 visual/ 的路径。 */
    var re = /<script src="([^"]+)"><\/script>|<script>([\s\S]*?)<\/script>/g;
    var m;
    while ((m = re.exec(source.slice(scriptStart)))) {
      var s = document.createElement('script');
      s.async = false; /* 动态脚本默认乱序，必须锁定插入顺序：数据脚本 → 适配器 → app.js */
      if (m[1]) { s.src = m[1].replace('../visual/', ''); }
      else { s.textContent = m[2]; }
      document.body.appendChild(s);
    }
    if (document.documentElement.lang.toLowerCase().indexOf('en') === 0) {
      var i18n = document.createElement('script');
      i18n.src = 'assets/sandbox/sandbox-i18n-en.js';
      document.body.appendChild(i18n);
    }
    /* 视口 1180×680，超出宿主列宽时等比缩放 */
    function fit() {
      var wrap = host.parentElement;
      if (!wrap) return;
      var sc = Math.min(1, wrap.clientWidth / 1180);
      host.style.transform = 'scale(' + sc + ')';
      wrap.style.height = Math.round(680 * sc) + 'px';
    }
    fit();
    window.addEventListener('resize', fit);
  }
  function scheduleBoot() {
    var host = document.getElementById('jzSandboxEmbed');
    if (!host) return;
    /*
       The story page is also rendered headlessly for review screenshots.  Loading
       the complete map/POI sandbox before it is visible makes that static capture
       parse several large datasets it never displays.  Keep the same interactive
       experience for readers, but initialise only when the embed approaches the
       viewport.  This also leaves the document load event deterministic offline.
    */
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
        observer.disconnect();
        boot();
      }, { rootMargin: '240px 0px' });
      observer.observe(host);
      return;
    }
    window.setTimeout(boot, 0);
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', scheduleBoot); }
  else { scheduleBoot(); }
}());
