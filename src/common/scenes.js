
window.PV=window.PV||{};
PV.scenesBuilder={
 scenes:[],
 init:function(parsed, project, scenesJson){
  this.scenes=parsed;
  this.project=project;
  this.scenesJson=scenesJson;
  PV.iconAssign.reset();
  const area=document.getElementById('visual-area');
  if(!area) return;
  area.innerHTML='';
  parsed.forEach((sc,i)=>{
    const div=document.createElement('div');
    div.id='scene-'+i; div.className='scene-visual'; div.dataset.mood=sc.mood;
    const entry=(scenesJson||[]).find(e=> sc.text.startsWith(e.match));
    const type=PV.classify(sc, parsed, project, entry);
    sc._type=type; sc._entry=entry;
    let inner='';
    if(type==='greeting'){
      inner=`<div class="greeting-text">${sc.text}</div>`;
    } else if(type==='brand'){
      inner=`<div class="brand-hero">Brand</div>`;
    } else if(type==='cards'){
      const items=entry && entry.items? entry.items : (()=> {
        // split
        const parts=sc.text.split(/,|،|;| এবং | ও /).map(s=>s.trim()).filter(Boolean).slice(0,3);
        return parts.map(p=>{
          const label=p.length>30? p.split(' ').slice(-4).join(' ') : p;
          return {label, icon:PV.iconAssign.assign(label)};
        });
      })();
      inner='<div class="cards">'+items.map(it=>`<div class="card"><svg class="card-icon"><use href="#ic-${it.icon}"/></svg><div class="card-label">${it.label}</div></div>`).join('')+'</div>';
    } else if(type==='numbers'){
      const nums=entry && entry.numbers? entry.numbers : PV.numbers.detect(sc.text).slice(0,2).map(n=>({value:n.value,label:'',plus:false}));
      inner='<div class="numbers">'+nums.map((n,idx)=>`<div class="number-block"><div class="number" data-value="${n.value}" data-plus="${n.plus||false}">${PV.numbers.format(n.value, project.digits, project.grouping)}${n.plus?'+':''}</div><div class="number-label">${n.label||''}</div></div>`).join('')+'</div>';
    } else if(type==='store'){
      inner='<div id="store-badge-wrap"></div><div id="tap-ripple" class="tap-ripple"></div>';
    } else if(type==='closing'){
      const icons=(entry && entry.icons)||['open-book','heart','share'];
      inner='<div class="closing-icons">'+icons.map(ic=>`<div class="closing-icon"><svg><use href="#ic-${ic}"/></svg></div>`).join('')+'</div><div id="store-badge-wrap" class="closing-badge"></div>';
    } else {
      inner=`<div class="single-card"><div class="card"><div class="card-label">${sc.text.slice(0,60)}</div></div></div>`;
    }
    div.innerHTML=inner;
    area.appendChild(div);
  });
  // icons list populate
  PV.iconsList={}; document.querySelectorAll('symbol[id^="ic-"]').forEach(s=>{ PV.iconsList[s.id.replace('ic-','')]=true; });
 },
 seek:function(t, total){
  this.scenes.forEach((sc,i)=>{
    const el=document.getElementById('scene-'+i);
    if(!el) return;
    const visible=PV.timeline.isVisible(sc,t,total);
    const dur=sc.end-sc.start;
    const e=Math.min(0.45,0.4*dur);
    const x=Math.min(0.3,0.3*dur);
    let opacity=0, ty=40;
    if(visible){
      if(sc.index===this.scenes.length-1){
        // last never fades out
        if(t<sc.start+e){ const p=PV.prog(t,sc.start,e); opacity=PV.easeOut(p); ty=40*(1-p); }
        else opacity=1, ty=0;
      } else {
        if(t<sc.start+e){ const p=PV.prog(t,sc.start,e); opacity=PV.easeOut(p); ty=40*(1-p); }
        else if(t>sc.end-x){ const p=PV.prog(t,sc.end-x,x); opacity=1-PV.easeOut(p); }
        else opacity=1, ty=0;
      }
    }
    el.style.opacity=opacity.toString();
    el.style.transform=`translateY(${ty}px)`;
    el.style.display=opacity>0?'flex':'none';
    // count-up
    if(visible && sc._type==='numbers'){
      const nums=el.querySelectorAll('.number');
      nums.forEach(numEl=>{
        const target=parseInt(numEl.dataset.value||0);
        const p=PV.prog(t, sc.start+0.3, Math.min(Math.max(dur-0.8,0.8),3.2));
        const cur=Math.floor(target*PV.easeOut(p));
        const plus=numEl.dataset.plus==='true'?'+':'';
        numEl.textContent=PV.numbers.format(cur, PV.project.digits, PV.project.grouping)+plus;
      });
    }
    // cards stagger
    if(visible && sc._type==='cards'){
      const cards=el.querySelectorAll('.card');
      const n=cards.length;
      const stagger=PV.clamp((dur-1.0)/n,0.25,1.0);
      cards.forEach((c,j)=>{
        const p=PV.prog(t, sc.start+0.2+j*stagger, 0.6);
        const eBack=PV.easeBack(p);
        c.style.transform=`translateX(${(1-eBack)*80}px) scale(${0.8+0.2*eBack})`;
        c.style.opacity=eBack.toString();
      });
    }
  });
 },
 fit:function(){
  // uniform scale
  const area=document.getElementById('visual-area');
  if(!area) return;
  const maxW=area.clientWidth-40, maxH=area.clientHeight-40;
  document.querySelectorAll('.scene-visual').forEach(el=>{
    const w=el.scrollWidth, h=el.scrollHeight;
    const sx=maxW/w, sy=maxH/h;
    const s=Math.max(0.6, Math.min(1, Math.min(sx,sy)));
    el.dataset.fitScale=s;
  });
 }
};
