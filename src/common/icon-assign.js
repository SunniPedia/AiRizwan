
window.PV=window.PV||{};
PV.iconAssign={
 used:new Set(), order:[],
 score:function(label, icon){
  const keywords=PV.iconMap[icon]||[];
  const low=label.toLowerCase();
  let s=0;
  for(const kw of keywords){ if(low.includes(kw.toLowerCase())) s+=10; }
  // bonus for exact
  if(low===icon) s+=5;
  return s;
 },
 assign:function(label){
  let best=null,bestScore=-1;
  for(const icon of Object.keys(PV.iconMap)){
    const sc=this.score(label,icon);
    if(sc>bestScore && !this.used.has(icon)){ best=icon; bestScore=sc; }
  }
  if(!best){
    // try any icon not used
    const all=Object.keys(PV.iconsList||{});
    for(const ic of all){ if(!this.used.has(ic)){ best=ic; break; } }
  }
  if(!best) best='star8';
  this.used.add(best); this.order.push(best);
  return best;
 },
 reset:function(){ this.used.clear(); this.order=[]; }
};
PV.iconsList={}; // filled after icons defined
