(function(){
  const palettes=[
    ['#07111d','#10263d','#24507b','#65b8ff','#ffc46b'],
    ['#0b0c17','#282039','#51468a','#aa96ff','#f3c889'],
    ['#081412','#15352f','#247461','#6dd9b2','#ffd080'],
    ['#160d0b','#422016','#8d4325','#ef8b4d','#ffd69a'],
    ['#07141c','#143644','#16758a','#57d2dc','#e7b870'],
    ['#100b18','#35184a','#752f73','#d96aad','#78bfff']
  ];
  function escapeHTML(value){
    return String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function hash(value){
    let result=2166136261;
    for(const char of value){result^=char.codePointAt(0);result=Math.imul(result,16777619)}
    return result>>>0;
  }
  function seededRandom(seed){
    let value=seed>>>0;
    return ()=>{
      value+=0x6D2B79F5;
      let number=value;
      number=Math.imul(number^number>>>15,number|1);
      number^=number+Math.imul(number^number>>>7,number|61);
      return ((number^number>>>14)>>>0)/4294967296;
    };
  }
  window.handleCoverImageError=function(image){
    const cover=image.closest('.cover-art');
    const layer=image.closest('.cover-custom-layer');
    if(layer) layer.remove();
    if(cover){
      cover.classList.remove('cover-art-custom');
      const signal=cover.querySelector('.cover-signal');
      const copy=cover.querySelector('.cover-default-copy');
      if(signal) signal.style.visibility='';
      if(copy) copy.style.visibility='';
    }
  };
  window.renderCover=function(item,index,titleHTML){
    const seed=hash(`${item.title}|${item.author}|${(item.tags||[]).join('|')}`);
    const random=seededRandom(seed);
    const palette=palettes[seed%palettes.length];
    const angle=`${(random()-.5)*5.5}deg`;
    const signalAngle=`${(random()-.5)*18}deg`;
    const signalTop=`${28+random()*34}%`;
    const tiles=Array.from({length:60},()=>{
      const color=palette[Math.floor(random()*palette.length)];
      const opacity=(.22+random()*.7).toFixed(2);
      const rotate=random()>.84?`${Math.floor(random()*4)*90}deg`:'0deg';
      const scale=(.88+random()*.2).toFixed(2);
      const flip=random()>.82?-1:1;
      const duration=`${(3.6+random()*4.8).toFixed(2)}s`;
      const delay=`-${(random()*5).toFixed(2)}s`;
      return `<span class="cover-tile" style="--tile-color:${color};--tile-opacity:${opacity};--tile-rotate:${rotate};--tile-scale:${scale};--tile-flip:${flip};--tile-duration:${duration};--tile-delay:${delay}"></span>`;
    }).join('');
    const author=escapeHTML(item.author||'open-city');
    const customCover=item.coverUrl?`<div class="cover-custom-layer" style="position:absolute;inset:0">
        <img src="${escapeHTML(item.coverUrl)}" alt="" loading="lazy" decoding="async" onerror="handleCoverImageError(this)" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
        <span aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 25%,#03070de8 100%)"></span>
        <div class="cover-copy"><div class="cover-kicker">@${author} · AGENT COVER</div><div class="cover-title">${titleHTML}</div></div>
      </div>`:'';
    return `<div class="cover-art${customCover?' cover-art-custom':''}" style="--cover-bg:${palette[0]};--cover-accent:${palette[palette.length-1]};--cover-angle:${angle};--signal-angle:${signalAngle};--signal-top:${signalTop}">
      <div class="cover-grid" aria-hidden="true">${tiles}</div>
      <span class="cover-signal" aria-hidden="true"${customCover?' style="visibility:hidden"':''}></span>
      ${customCover}
      <span class="cover-mark" aria-hidden="true">${String(index+1).padStart(2,'0')}</span>
      <div class="cover-copy cover-default-copy"${customCover?' style="visibility:hidden"':''}><div class="cover-kicker">@${author} · OPEN CITY PROPOSAL</div><div class="cover-title">${titleHTML}</div></div>
    </div>`;
  };
})();
