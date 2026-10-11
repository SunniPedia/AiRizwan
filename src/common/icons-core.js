
window.PV=window.PV||{};
PV.iconsCore=function(){
  if(document.getElementById('pv-defs')) return;
  const svgNS='http://www.w3.org/2000/svg';
  const defsSvg=document.createElementNS(svgNS,'svg');
  defsSvg.id='pv-defs'; defsSvg.style.position='absolute'; defsSvg.style.width='0'; defsSvg.style.height='0'; defsSvg.setAttribute('aria-hidden','true');
  const defs=document.createElementNS(svgNS,'defs');
  defsSvg.appendChild(defs);
  document.body.appendChild(defsSvg);
  const add=(id, inner)=>{
    const sym=document.createElementNS(svgNS,'symbol');
    sym.id='ic-'+id; sym.setAttribute('viewBox','0 0 100 100');
    sym.innerHTML=inner;
    defs.appendChild(sym);
  };
  // ornaments and UI
  add('star8','<path d="M50 5 L57 35 L85 35 L62 53 L70 85 L50 66 L30 85 L38 53 L15 35 L43 35 Z" fill="var(--gold)" opacity="0.9"/>');
  add('diamond','<rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" fill="none" stroke="var(--gold)" stroke-width="4" rx="6"/>');
  add('floral','<circle cx="50" cy="50" r="10" fill="var(--gold)"/><path d="M50 10 Q60 30 50 40 Q40 30 50 10 M50 90 Q60 70 50 60 Q40 70 50 90 M10 50 Q30 60 40 50 Q30 40 10 50 M90 50 Q70 60 60 50 Q70 40 90 50" fill="var(--gold)" opacity="0.8"/>');
  add('knot','<path d="M30 30 C50 10 70 30 50 50 C30 70 50 90 70 70" fill="none" stroke="var(--gold)" stroke-width="4" stroke-linecap="round"/>');
  add('play-arrow','<path d="M35 20 L80 50 L35 80 Z" fill="var(--gold)"/>');
  add('download-arrow','<path d="M50 10 L50 70 M20 50 L50 80 L80 50 M10 85 L90 85" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>');
  add('ring-check','<circle cx="50" cy="50" r="35" fill="none" stroke="var(--accent)" stroke-width="5"/><path d="M30 50 L45 65 L70 35" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>');
  add('plus-badge','<circle cx="50" cy="50" r="35" fill="var(--gold)"/><path d="M50 25 L50 75 M25 50 L75 50" stroke="#000" stroke-width="6" stroke-linecap="round"/>');
};
