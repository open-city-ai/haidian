(() => {
  const raw = document.getElementById('guest-data');
  const data = JSON.parse(raw.textContent);
  const canvas = document.getElementById('gate-map');
  const ctx = canvas.getContext('2d');
  const detail = document.getElementById('gate-detail');
  const list = document.getElementById('gate-list');
  const colors = ['#F2C84B','#4F7A5B','#2B6F8A','#C95D4D'];
  const positions = data.scenarios.map((_, i) => ({x: 0.16 + (i % 4) * 0.22, y: 0.24 + Math.floor(i / 4) * 0.24}));
  let selected = 0;
  function resize() { const dpr = window.devicePixelRatio || 1; const r = canvas.getBoundingClientRect(); canvas.width = r.width*dpr; canvas.height = r.height*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); draw(); }
  function draw() { const w = canvas.clientWidth, h = canvas.clientHeight; ctx.clearRect(0,0,w,h); ctx.fillStyle='#1B2224'; ctx.fillRect(0,0,w,h); ctx.strokeStyle='#F2C84B'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(w*.14,h*.84); ctx.lineTo(w*.86,h*.14); ctx.stroke(); ctx.strokeStyle='#6F7B7E'; ctx.lineWidth=2; ctx.setLineDash([8,8]); ctx.beginPath(); ctx.moveTo(w*.1,h*.9); ctx.lineTo(w*.9,h*.1); ctx.stroke(); ctx.setLineDash([]); data.scenarios.forEach((s,i)=>{const p=positions[i]; const x=p.x*w,y=p.y*h; ctx.fillStyle=colors[i%4]; ctx.beginPath(); ctx.arc(x,y,i===selected?16:11,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#F7F3EA'; ctx.font='12px sans-serif'; ctx.textAlign='center'; ctx.fillText(String(i+1).padStart(2,'0'),x,y+4);}); }
  function select(i) { selected=i; const s=data.scenarios[i]; detail.innerHTML='<strong>'+s.title_zh+'</strong><span>'+s.area+' / '+s.persona+'</span><p>'+s.journey_zh+'</p><dl><dt>数据预算</dt><dd>'+s.data_zh+'</dd><dt>人工路径</dt><dd>'+s.fallback_zh+'</dd></dl>'; [...list.children].forEach((el,j)=>el.classList.toggle('active',j===i)); draw(); }
  data.scenarios.forEach((s,i)=>{const b=document.createElement('button'); b.type='button'; b.textContent=String(i+1).padStart(2,'0')+'  '+s.title_zh; b.addEventListener('click',()=>select(i)); list.appendChild(b);});
  canvas.addEventListener('click',e=>{const r=canvas.getBoundingClientRect(); const x=e.clientX-r.left,y=e.clientY-r.top; let best=0,dist=1e9; positions.forEach((p,i)=>{const d=(p.x*canvas.clientWidth-x)**2+(p.y*canvas.clientHeight-y)**2;if(d<dist){dist=d;best=i;}}); if(dist<1600)select(best);});
  window.addEventListener('resize',resize); select(0); resize();
})();
