
window.PV=window.PV||{};
PV.hostSvg={
 build:function(){
  const layer=document.getElementById('host-layer');
  if(!layer) return;
  const cfg=PV.hostConfig;
  const skin=cfg.skin||'#c49a6c';
  const hair=cfg.hair||'#1a1a1a';
  const clothes=cfg.clothes||'#d6eaf8';
  layer.innerHTML=`
  <svg id="host-svg" viewBox="0 0 960 720" width="960" height="720" style="overflow:visible">
    <g id="host-torso" transform="translate(480 520)">
      <rect x="-180" y="-120" width="360" height="220" rx="40" fill="${clothes}" stroke="#000" stroke-width="3"/>
      ${cfg.stripes? '<g stroke="#a0c4d0" stroke-width="2" opacity="0.5"><path d="M-150 -100 L-130 100"/><path d="M-100 -100 L-80 100"/><path d="M-50 -100 L-30 100"/><path d="M0 -100 L20 100"/><path d="M50 -100 L70 100"/><path d="M100 -100 L120 100"/></g>':''}
    </g>
    <g id="host-head" transform="translate(480 300)">
      <ellipse cx="0" cy="0" rx="110" ry="130" fill="${skin}" stroke="#000" stroke-width="3"/>
      <g id="host-hair"><path d="M-115 -40 Q-80 -120 0 -130 Q80 -120 115 -40 Q100 -80 0 -100 Q-100 -80 -115 -40" fill="${hair}"/></g>
      <g id="host-eyebrows" transform="translate(0 -25)">
        <path id="host-brow-l" d="M-60 -10 Q-40 -20 -20 -10" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/>
        <path id="host-brow-r" d="M20 -10 Q40 -20 60 -10" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/>
      </g>
      <g id="host-eyes" transform="translate(0 -5)">
        <g id="host-eye-l" transform="translate(-40 0)"><ellipse cx="0" cy="0" rx="22" ry="18" fill="#fff" stroke="#000" stroke-width="2"/><circle id="host-pupil-l" cx="0" cy="2" r="8" fill="#2b1a0f"/><circle cx="3" cy="-3" r="3" fill="#fff" opacity="0.8"/></g>
        <g id="host-eye-r" transform="translate(40 0)"><ellipse cx="0" cy="0" rx="22" ry="18" fill="#fff" stroke="#000" stroke-width="2"/><circle id="host-pupil-r" cx="0" cy="2" r="8" fill="#2b1a0f"/><circle cx="3" cy="-3" r="3" fill="#fff" opacity="0.8"/></g>
        <g id="host-eyelids"><rect id="host-eyelid-l" x="-62" y="-18" width="44" height="6" fill="${skin}"/><rect id="host-eyelid-r" x="18" y="-18" width="44" height="6" fill="${skin}"/></g>
      </g>
      <g id="host-beard" transform="translate(0 55)"><path d="M-70 -10 Q-60 40 0 50 Q60 40 70 -10 Q50 20 0 25 Q-50 20 -70 -10" fill="#1a1a1a" opacity="0.9"/><path d="M-20 10 Q0 20 20 10" fill="none" stroke="#000" stroke-width="2"/></g>
      <g id="host-mouth" transform="translate(0 65)"><ellipse cx="0" cy="0" rx="18" ry="4" fill="#5a1a1a" stroke="#000" stroke-width="2"/></g>
      <g id="host-headphones"><path d="M-115 -20 Q-120 -90 0 -105 Q120 -90 115 -20" fill="none" stroke="${cfg.headphones}" stroke-width="14" stroke-linecap="round"/><rect x="-135" y="-30" width="35" height="55" rx="12" fill="${cfg.headphones}"/><rect x="100" y="-30" width="35" height="55" rx="12" fill="${cfg.headphones}"/></g>
    </g>
    <g id="host-arm-left" transform="translate(320 540)"><path d="M0 0 Q-20 40 0 80 L40 80 Q20 40 40 0 Z" fill="${skin}" stroke="#000" stroke-width="3"/><ellipse cx="20" cy="90" rx="28" ry="18" fill="${skin}" stroke="#000" stroke-width="3"/></g>
    <g id="host-arm-right" transform="translate(640 540)"><path d="M0 0 Q20 40 0 80 L-40 80 Q-20 40 -40 0 Z" fill="${skin}" stroke="#000" stroke-width="3"/><ellipse cx="-20" cy="90" rx="28" ry="18" fill="${skin}" stroke="#000" stroke-width="3"/></g>
    <g id="host-mic" transform="translate(360 380)"><path d="M0 0 Q-60 30 0 80" fill="none" stroke="#444" stroke-width="8" stroke-linecap="round"/><rect x="-15" y="70" width="30" height="40" rx="15" fill="#333"/><circle cx="0" cy="90" r="8" fill="#222"/></g>
  </svg>`;
 }
};
