
window.PV=window.PV||{};
PV.caption={
 wordsCache:[],
 build:function(scene){
  const lang=(window.PV.project&&PV.project.language)||'bn';
  const words=PV.segment.words(scene.text, lang);
  this.wordsCache=words;
  return words;
 },
 render:function(scene, words){
  const box=document.getElementById('caption-box');
  if(!box) return;
  box.innerHTML='';
  box.setAttribute('dir', PV.project.direction||'ltr');
  const isBrand=scene.text.includes(PV.project.brandName||'__none__') || scene.hasMarker;
  words.forEach((w,i)=>{
    const span=document.createElement('span');
    span.textContent=w+' ';
    span.className='word';
    span.dataset.idx=i;
    if(isBrand && PV.project.brandName && w && PV.project.brandName.includes(w)) span.classList.add('brand-word');
    // grapheme weight for timing
    const gCount=PV.segment.graphemes(w).length;
    span.dataset.weight=gCount+1;
    box.appendChild(span);
  });
 },
 seek:function(scene, t, isLast){
  const box=document.getElementById('caption-box');
  if(!box) return;
  const words=box.querySelectorAll('.word');
  const dur=scene.end-scene.start;
  // total weight
  let totalW=0; words.forEach(w=> totalW+=parseInt(w.dataset.weight||1));
  let cum=0;
  const lt=t-scene.start;
  words.forEach((w,i)=>{
    const wW=parseInt(w.dataset.weight||1);
    const st=0.15 + (cum/totalW)*Math.max(0.6, dur-0.55);
    const en=st+0.35;
    cum+=wW;
    const prog=PV.prog(t, scene.start+st, en-st);
    const enter=PV.easeOut(PV.clamp((lt-st)/0.3,0,1));
    const exit=PV.easeOut(PV.prog(lt, en-0.05, 0.14));
    const a=enter*(1-exit);
    if(t>=scene.start+st && t<=scene.end+0.5){
      w.style.opacity= (0.4+0.6*enter).toString();
      w.style.transform=`translateY(${ (1-enter)*12 - a*6 }px) scale(${1+0.07*a})`;
      w.style.color= a>0.2? 'var(--gold)': 'var(--cream)';
      w.style.textShadow= a>0.1? `0 0 ${34*a}px rgba(233,196,106,0.8)`:'none';
    } else if(t<scene.start+st){
      w.style.opacity='0'; w.style.transform='translateY(26px)';
    } else {
      w.style.opacity='1'; w.style.transform='translateY(0)'; w.style.color='var(--cream)'; w.style.textShadow='none';
    }
  });
  // equalizer
  const bars=document.querySelectorAll('.eq-bar');
  const lv=PV.audio.level(t);
  bars.forEach((b,i)=>{
    const wave=0.5+0.5*Math.abs(Math.sin(6*t+0.7*i));
    const shape=0.65+0.35*Math.sin(0.45*i+1);
    const h=6 + 40* PV.clamp(lv*1.15*wave*shape+0.04,0,1);
    b.style.height=h+'px';
  });
  // panel glow
  const panel=document.getElementById('caption-panel');
  if(panel){
    const blur=24+80*lv; const spread=4+14*lv;
    panel.style.boxShadow=`0 0 ${blur}px ${spread}px rgba(${PV.project.colors.mood[scene.mood]||[233,196,106]} / ${0.22+0.45*lv})`;
  }
  const ang=document.getElementById('caption-panel');
  if(ang){ ang.style.setProperty('--ang', (t*90)+'deg'); }
 },
 fit:function(){
  const box=document.getElementById('caption-box');
  const panel=document.getElementById('caption-panel');
  if(!box||!panel) return 72;
  const isA=document.body.dataset.theme==='infographic';
  let size=isA?72:64;
  const min=isA?40:34;
  box.style.fontSize=size+'px';
  // measure
  let attempts=0;
  while(attempts<20){
    const h=box.scrollHeight;
    const avail=panel.clientHeight - 100;
    if(h<=avail || size<=min) break;
    size-=2; box.style.fontSize=size+'px'; attempts++;
  }
  return size;
 }
};
