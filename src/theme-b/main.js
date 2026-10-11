
window.PV=window.PV||{};
window.init=function(raw, opts){
  PV.project=opts.project||{}; PV.project.colors=PV.project.colors||{mood:{}};
  PV.timeline.scenes=PV.parse(raw);
  const total=PV.timeline.compute(PV.timeline.scenes, opts.audioDuration||0, opts.tailPad||2);
  document.body.dataset.theme='podcast';
  document.getElementById('app').innerHTML=`
    <div id="bg-layer"><div id="base-glow"></div><div id="bg-stars"></div></div>
    <div id="studio"></div>
    <div id="logo-card"><img src="${opts.logoData||opts.logo||''}" /></div>
    <div id="caption-panel"><div id="caption-box"></div><div class="eq" id="eq"></div></div>
  `;
  PV.iconsCore(); PV.iconsTopic();
  PV.studio.init();
  PV.hostSvg.build();
  const eq=document.getElementById('eq');
  for(let i=0;i<40;i++){ const b=document.createElement('div'); b.className='eq-bar'; b.style.height='4px'; eq.appendChild(b); }
  PV.scenesBuilder.init(PV.timeline.scenes, PV.project, opts.scenes);
  PV.background.init('podcast');
  PV.logo.init(opts.logo, opts.logoData);
  if(opts.badge) PV.storeBadge.init(opts.badge);
  if(PV.timeline.scenes[0]){ const w=PV.caption.build(PV.timeline.scenes[0]); PV.caption.render(PV.timeline.scenes[0],w); }
  return total;
};
window.fit=function(){ return PV.caption.fit(); };
window.seek=function(t){
  const total=PV.timeline.total; const scenes=PV.timeline.scenes;
  let cur=scenes[0];
  for(const s of scenes){ if(t>=s.start-0.01 && t<=s.end+0.01) cur=s; if(s.index===scenes.length-1 && t>=s.start) cur=s; }
  if(cur){
    const box=document.getElementById('caption-box');
    if(box && box.dataset.scene!=cur.index){ const words=PV.caption.build(cur); PV.caption.render(cur,words); box.dataset.scene=cur.index; }
    PV.caption.seek(cur,t,cur.index===scenes.length-1);
  }
  PV.scenesBuilder.seek(t,total);
  PV.background.seek(t,'podcast');
  PV.studio.seek(t);
  PV.hostAnim.seek(t);
  PV.logo.seek(t,cur,scenes);
  if(cur && cur._type==='store') PV.storeBadge.seek(t,cur);
};
window.setAudio=function(env,fps){ PV.audio.envelope=env; PV.audio.fps=fps; };
