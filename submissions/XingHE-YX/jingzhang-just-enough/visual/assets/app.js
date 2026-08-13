(() => {
  'use strict';
  const slider = document.querySelector('[data-model-scale]');
  const canvas = document.querySelector('[data-mode-canvas]');
  const modeName = document.querySelector('[data-mode-name]');
  const description = document.getElementById('mode-description');
  const error = document.querySelector('[data-canvas-error]');
  if (!slider || !canvas || !modeName || !description) return;
  const language = document.documentElement.dataset.language || 'zh';
  const copy = {
    zh: [
      ['远端增强', '可获得更频繁的内容更新，但原始数据仍不默认远传；公共服务必须保留本地和人工路径。'],
      ['恰好本地', '签名内容包、近端推理、免账号使用。只部署足以完成明确公共任务的能力。'],
      ['人工 / 传统', '纸质地图、机械标牌、电话和值班人员构成完整等价服务，而不是失效后的残余。']
    ],
    en: [
      ['Connected enhancement', 'Content can update more often, but raw data still does not travel by default; local and staffed paths remain.'],
      ['Just-enough local', 'Signed content packs, near-edge inference, and no-account use provide only the capability a bounded public task needs.'],
      ['Human / conventional', 'Paper maps, mechanical signs, telephones, and staff form a complete equivalent service, not a residue after failure.']
    ]
  };
  const draw = () => {
    const ctx = canvas.getContext('2d');
    if (!ctx) { if (error) error.style.display = 'block'; return; }
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const w = rect.width, h = rect.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#17262d'; ctx.fillRect(0, 0, w, h);
    const mode = Number(slider.value);
    const center = w * .5;
    ctx.strokeStyle = '#d8dcda'; ctx.lineWidth = 5;
    for (const dx of [-45, 45]) {
      ctx.beginPath(); ctx.moveTo(center + dx, 32); ctx.lineTo(center + dx, h - 35); ctx.stroke();
    }
    ctx.strokeStyle = '#657076'; ctx.lineWidth = 2;
    for (let y = 55; y < h - 30; y += 38) {
      ctx.beginPath(); ctx.moveTo(center - 64, y); ctx.lineTo(center + 64, y); ctx.stroke();
    }
    const sizes = [88, 58, 30];
    const glow = [24, 14, 6];
    ctx.shadowColor = '#e7a93b'; ctx.shadowBlur = glow[mode];
    ctx.fillStyle = '#e7a93b';
    const s = sizes[mode]; ctx.fillRect(center - s / 2, h * .48 - s / 2, s, s);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#f4dca7'; ctx.font = '700 14px Arial'; ctx.textAlign = 'center';
    const labels = language === 'en' ? ['REMOTE', 'LOCAL', 'HUMAN'] : ['远端', '本地', '人工'];
    ctx.fillText(labels[mode], center, h * .48 + 5);
    const dataWidth = [w * .66, w * .35, w * .12][mode];
    ctx.fillStyle = '#2f62a8'; ctx.fillRect((w - dataWidth) / 2, h - 68, dataWidth, 9);
    ctx.fillStyle = '#aeb9bd'; ctx.font = '13px Arial';
    const boundary = language === 'en' ? 'CONCEPTUAL DATA REACH' : '概念性数据触达范围';
    ctx.fillText(boundary, center, h - 25);
  };
  const update = () => {
    const mode = Number(slider.value);
    modeName.textContent = copy[language][mode][0];
    description.textContent = copy[language][mode][1];
    document.body.dataset.mode = String(mode);
    draw();
  };
  slider.addEventListener('input', update);
  window.addEventListener('resize', draw, {passive:true});
  update();
})();
