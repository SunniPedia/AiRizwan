
window.PV=window.PV||{};
PV.logo={
 el:null,
 init:function(logoPath, logoData){
  this.el=document.getElementById('logo-card');
  if(!this.el) return;
  const img=this.el.querySelector('img');
  if(img && logoData) img.src=logoData;
  else if(img && logoPath) img.src=logoPath;
 },
 seek:function(t, scene, allScenes){
  if(!this.el) return;
  const brandStart=allScenes.find(s=> s.text.includes(PV.project.brandName||'__none__') || s.hasMarker)?.start || 0;
  const brandEnd=allScenes.find(s=> s.text.includes(PV.project.brandName||'__none__'))?.end || (brandStart+5);
  const storeScene=allScenes.find(s=> PV.keywords.storeWords.bn.some(w=> s.text.toLowerCase().includes(w)));
  const storeStart=storeScene? storeScene.start: (allScenes[allScenes.length-2]?.start || allScenes[allScenes.length-1].start);
  const isA=document.body.dataset.theme==='infographic';
  let scale=1, y=0, opacity=1;
  const lv=PV.audio.level(t);
  if(t<brandStart){
    // before brand hidden in B
    if(!isA){ opacity=0; scale=0.2; }
    else { scale=0.2 + 0.8*PV.easeBack(PV.prog(t,0,0.9)); }
  } else if(t<brandEnd-0.4){
    scale=1 + 0.016*lv;
  } else if(t<storeStart){
    // shrink
    const p=PV.prog(t, brandEnd-0.4, 0.7);
    scale=1*(1-p)+0.62*p;
    y= -120*p;
    if(!isA){ y=0; scale=1*(1-p)+0.5*p; }
  } else {
    const p=PV.prog(t, storeStart, 0.8);
    if(isA){ scale=0.62*(1-p)+1*p; y=-120*(1-p); }
    else {
      // B returns only at last scene
      const last=allScenes[allScenes.length-1];
      if(t>=last.start){ const p2=PV.prog(t,last.start,0.8); scale=0.5*(1-p2)+0.78*p2; }
      else scale=0.5;
    }
  }
  this.el.style.transform=`translateY(${y}px) scale(${scale})`;
  this.el.style.opacity=opacity.toString();
  this.el.style.boxShadow=`0 0 ${30+90*lv}px rgba(233,196,106,${0.2+0.3*lv})`;
 }
};
