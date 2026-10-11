
window.PV=window.PV||{};
PV.audio={ envelope:null, fps:30, level:function(t){
  if(this.envelope && this.envelope.length){
    const idx=Math.floor(t*this.fps);
    if(idx>=0 && idx<this.envelope.length) return this.envelope[idx];
    return 0;
  }
  const s=Math.sin(t*3.1)*0.2 + Math.sin(t*7.7+1)*0.12;
  return Math.max(0,Math.min(1,0.38+s));
}};
window.setAudio=function(env,fps){ PV.audio.envelope=env; PV.audio.fps=fps||30; };
