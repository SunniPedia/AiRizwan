
window.PV=window.PV||{};
PV.storeBadge={
 init:function(badgePath){
  const wrap=document.getElementById('store-badge-wrap');
  if(!wrap) return;
  if(badgePath){
    const img=document.createElement('img');
    img.id='store-badge-img'; img.src=badgePath; img.style.width='100%'; img.style.display='block';
    wrap.innerHTML=''; wrap.appendChild(img);
    // app name
    if(PV.project.brandName){
      const nameEl=document.createElement('div'); nameEl.textContent=PV.project.brandName; nameEl.className='app-name';
      wrap.appendChild(nameEl);
    }
  } else {
    wrap.innerHTML='<div class="neutral-btn"><svg width="40" height="40" viewBox="0 0 100 100"><use href="#ic-play-arrow"/></svg><span>'+ (PV.project.brandName||'Install') +'</span></div>';
  }
 },
 seek:function(t, scene){
  const wrap=document.getElementById('store-badge-wrap');
  if(!wrap) return;
  const p=PV.prog(t, scene.start+0.4, 0.6);
  const scale=0.4+0.6*PV.easeBack(p);
  wrap.style.transform=`scale(${scale})`;
  wrap.style.opacity=p.toString();
  // tap ripple
  const ripple=document.getElementById('tap-ripple');
  if(ripple){
    const cycle=(t - (scene.start+2)) % 1.3;
    const rp=PV.clamp(cycle/0.6,0,1);
    ripple.style.transform=`scale(${1+rp*1.5})`;
    ripple.style.opacity=(1-rp).toString();
  }
 }
};
