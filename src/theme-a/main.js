
window.PV=window.PV||{};
window.init=function(raw, opts){
  PV.project=opts.project||{}; PV.project.colors=PV.project.colors||{bg:'#04210f',gold:'#e9c46a'};
  PV.timeline.scenes=PV.parse(raw);
  const total=PV.timeline.compute(PV.timeline.scenes, opts.audioDuration||0, opts.tailPad||0.5);
  document.body.dataset.theme='infographic';
  document.getElementById('app').innerHTML=`
    <div id="bg-layer"><div id="base-glow"></div><div id="bg-stars" style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 60%);"></div><div id="progress-bar"><div id="progress-fill"></div></div></div>
    <div id="logo-card"><img src="${opts.logoData||opts.logo||''}" /></div>
    <div id="visual-area"></div>
    <div id="caption-panel" style="--ang:0deg"><div class="ornament-line"><svg width="34" height="34"><use href="#ic-star8"/></svg><svg width="24" height="24"><use href="#ic-diamond"/></svg><svg width="34" height="34"><use href="#ic-star8"/></svg></div><div id="caption-box"></div><div class="eq" id="eq"></div></div>
  `;
  // icons
  PV.iconsCore(); PV.iconsTopic();
  // eq bars
  const eq=document.getElementById('eq');
  for(let i=0;i<30;i++){ const b=document.createElement('div'); b.className='eq-bar'; b.style.height='6px'; eq.appendChild(b); }
  PV.scenesBuilder.init(PV.timeline.scenes, PV.project, opts.scenes);
  PV.background.init('infographic');
  PV.logo.init(opts.logo, opts.logoData);
  if(opts.badge) PV.storeBadge.init(opts.badge);
  // build first caption
  if(PV.timeline.scenes[0]){ const w=PV.caption.build(PV.timeline.scenes[0]); PV.caption.render(PV.timeline.scenes[0], w); }
  return total;
};
window.fit=function(){ return PV.caption.fit(); };
window.seek=function(t){
  const total=PV.timeline.total;
  const scenes=PV.timeline.scenes;
  let cur=scenes[0];
  for(const s of scenes){ if(t>=s.start-0.01 && t<=s.end+0.01) cur=s; if(s.index===scenes.length-1 && t>=s.start) cur=s; }
  if(cur){
    // rebuild caption if scene changed
    const box=document.getElementById('caption-box');
    if(box && box.dataset.scene!=cur.index){
      const words=PV.caption.build(cur);
      PV.caption.render(cur, words);
      box.dataset.scene=cur.index;
    }
    PV.caption.seek(cur,t,cur.index===scenes.length-1);
  }
  PV.scenesBuilder.seek(t,total);
  PV.background.seek(t,'infographic');
  PV.logo.seek(t, cur, scenes);
  if(cur && cur._type==='store') PV.storeBadge.seek(t, cur);
};
window.setAudio=function(env,fps){ window.setAudio=window.setAudio||function(){}; PV.audio.envelope=env; PV.audio.fps=fps; };
