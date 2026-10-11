
window.PV=window.PV||{};
PV.studio={
 init:function(){
  const s=document.getElementById('studio');
  if(!s) return;
  s.innerHTML=`
    <div class="panels">${Array(8).fill(0).map(()=>'<div class="panel"></div>').join('')}</div>
    <div id="screen"><div id="visual-area"></div></div>
    <div id="host-layer"></div>
    <div id="desk"></div>
    <div id="on-air"><div id="on-air-dot"></div><span>ON AIR</span></div>
    <div id="progress-bar"><div id="progress-fill"></div></div>
  `;
 },
 seek:function(t){
  const dot=document.getElementById('on-air-dot');
  const onAir=document.getElementById('on-air');
  if(dot && onAir){
    const sp=PV.hostAnim? PV.hostAnim.speech(t):0;
    const lv=PV.audio.level(t);
    onAir.style.boxShadow=`0 0 ${10+30*lv*sp}px rgba(255,0,0,${0.3+0.5*lv})`;
    dot.style.opacity=(0.4+0.6*(0.5+0.5*Math.sin(t*6))).toString();
  }
 }
};
