
window.PV=window.PV||{};
PV.background={
 init:function(theme){
  const c=document.getElementById('bg-layer');
  if(!c) return;
 },
 seek:function(t, theme){
  const lv=PV.audio.level(t);
  const glow=document.getElementById('base-glow');
  if(glow) glow.style.opacity=(0.72+0.28*lv).toString();
  const stars=document.getElementById('bg-stars');
  if(stars){ stars.style.transform=`rotate(${t*2.2}deg)`; stars.style.opacity=(0.1+0.07*lv).toString(); }
  const fill=document.getElementById('progress-fill');
  if(fill && PV.timeline.total) fill.style.width=(PV.clamp(t/PV.timeline.total,0,1)*100)+'%';
 }
};
