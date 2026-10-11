
window.PV=window.PV||{};
PV.hostAnim={
 speech:function(t){
  const scenes=PV.timeline.scenes;
  for(const s of scenes){
    if(t>=s.start && t<=s.end) return 1;
    if(t>=s.start-0.3 && t<s.start) return PV.clamp((t-(s.start-0.3))/0.3,0,1);
    if(t>s.end && t<=s.end+0.3) return PV.clamp(1-(t-s.end)/0.3,0,1);
  }
  return 0;
 },
 seek:function(t){
  const sp=this.speech(t);
  const lv=PV.audio.level(t);
  const head=document.getElementById('host-head');
  const mouth=document.getElementById('host-mouth');
  const torso=document.getElementById('host-torso');
  const armR=document.getElementById('host-arm-right');
  const brows=document.getElementById('host-eyebrows');
  const pupilsL=document.getElementById('host-pupil-l');
  const pupilsR=document.getElementById('host-pupil-r');
  if(head){
    const ty=Math.sin(t*1.7)*1.5 - 3.5*sp*0.2;
    const rot=Math.sin(t*0.8)*1.4 + sp*Math.sin(t*2.3)*0.9;
    head.setAttribute('transform',`translate(480 ${300+ty}) rotate(${rot})`);
  }
  if(torso){ torso.setAttribute('transform',`translate(480 ${520+ Math.sin(t*1.6)*2.2 + 3*lv*sp})`); }
  if(mouth){
    // simple mouth open based on sp and lv
    const m=sp*(0.3+0.7*Math.abs(Math.sin(t*13))* (0.75+0.25*lv));
    const rx=18*(1+0.18*m); const ry=4*(0.1+0.9*Math.max(0.15,m));
    const el=mouth.querySelector('ellipse'); if(el){ el.setAttribute('rx',rx); el.setAttribute('ry',ry); }
  }
  if(armR){
    const wave=0.5+0.5*Math.sin(t*1.1);
    const ang=-(5+36*sp*(0.35+0.65*wave*(0.5+0.5*lv)));
    armR.setAttribute('transform',`translate(640 540) rotate(${ang})`);
  }
  if(brows){ brows.setAttribute('transform',`translate(0 ${-25 - (2+6*lv*sp)})`); }
  // blink
  const blinkPhase=(t%5.3);
  const isBlink= (blinkPhase>3.4 && blinkPhase<3.56) || (t%3.4<0.16);
  const eyelidL=document.getElementById('host-eyelid-l');
  const eyelidR=document.getElementById('host-eyelid-r');
  if(eyelidL){
    eyelidL.style.transform=isBlink? 'scaleY(5)':'scaleY(1)';
    eyelidR.style.transform=isBlink? 'scaleY(5)':'scaleY(1)';
  }
  if(pupilsL){ pupilsL.setAttribute('cx', (Math.sin(t*0.3)*2).toString()); }
  if(pupilsR){ pupilsR.setAttribute('cx', (Math.sin(t*0.3)*2).toString()); }
 }
};
