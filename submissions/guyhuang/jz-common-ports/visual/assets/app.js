(()=>{
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>[...c.querySelectorAll(s)];

  $$('[data-layer]').forEach((button)=>button.addEventListener('click',()=>{
    const key=button.dataset.layer;
    const on=button.getAttribute('aria-pressed')!=='true';
    button.setAttribute('aria-pressed',String(on));
    $$(`[data-layer-group="${key}"]`).forEach((group)=>{
      if(on) group.removeAttribute('hidden'); else group.setAttribute('hidden','');
    });
  }));

  function activateTab(tab,moveFocus=false){
    const tablist=tab.closest('[role="tablist"]');
    const tabs=$$('[role="tab"]',tablist);
    const panelId=tab.getAttribute('aria-controls');
    tabs.forEach((item)=>{
      const selected=item===tab;
      item.setAttribute('aria-selected',String(selected));
      item.setAttribute('aria-pressed',String(selected));
      item.tabIndex=selected?0:-1;
      const panel=$(`#${item.getAttribute('aria-controls')}`);
      if(panel){panel.hidden=!selected;panel.setAttribute('aria-hidden',String(!selected));}
    });
    if(moveFocus) tab.focus();
    const panel=$(`#${panelId}`);
    if(panel) panel.setAttribute('aria-hidden','false');
  }
  $$('[role="tab"]').forEach((tab)=>{
    tab.addEventListener('click',()=>activateTab(tab,false));
    tab.addEventListener('keydown',(event)=>{
      const tabs=$$('[role="tab"]',tab.closest('[role="tablist"]'));
      const index=tabs.indexOf(tab);
      let next=null;
      if(event.key==='ArrowRight') next=tabs[(index+1)%tabs.length];
      if(event.key==='ArrowLeft') next=tabs[(index-1+tabs.length)%tabs.length];
      if(event.key==='Home') next=tabs[0];
      if(event.key==='End') next=tabs[tabs.length-1];
      if(next){event.preventDefault();activateTab(next,true);}
    });
  });

  const filters={port:'all',phase:'all',persona:'all'};
  function applyFilters(){
    $$('.scenario').forEach((card)=>{
      const port=filters.port==='all'||card.dataset.port===filters.port;
      const phase=filters.phase==='all'||card.dataset.phase===filters.phase;
      const persona=filters.persona==='all'||(card.dataset.personas||'').split(',').includes(filters.persona);
      card.hidden=!(port&&phase&&persona);
    });
    const out=$('#scenario-count');
    if(out) out.textContent=String($$('.scenario:not([hidden])').length);
  }
  $$('[data-filter-kind]').forEach((button)=>button.addEventListener('click',()=>{
    const kind=button.dataset.filterKind;
    filters[kind]=button.dataset.filterValue;
    $$(`[data-filter-kind="${kind}"]`).forEach((item)=>item.setAttribute('aria-pressed',String(item===button)));
    applyFilters();
  }));
  applyFilters();
})();
