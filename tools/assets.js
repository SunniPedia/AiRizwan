
const fs=require('fs'),path=require('path');
function findAssets(){
  const root='.';
  const files=fs.readdirSync(root);
  const assetsFiles=fs.existsSync('assets')? fs.readdirSync('assets'): [];
  let logo=null,badge=null,audio=null,hostRef=null;
  const all=[...files.map(f=>path.join('.',f)), ...assetsFiles.map(f=>path.join('assets',f))];
  for(const f of all){
    const low=f.toLowerCase();
    if(low.endsWith('.png')||low.endsWith('.jpg')||low.endsWith('.jpeg')||low.endsWith('.webp')){
      const base=path.basename(low);
      if(base.includes('logo') && !logo) logo=f;
      if((base.includes('google')||base.includes('play')||base.includes('app-store')||base.includes('store')||base.includes('badge')) && !badge) {
        // detect badge by name containing play or store badge
        if(base.includes('play')||base.includes('badge')||base.includes('store')) badge=f;
      }
      if((base.includes('body')||base.includes('host')||base.includes('presenter')||base.includes('character')||base.includes('reference')) && !hostRef) hostRef=f;
    }
    if(low.endsWith('.mp3')||low.endsWith('.wav')||low.endsWith('.m4a')||low.endsWith('.aac')){
      if(!audio) audio=f;
    }
  }
  // also check root for logo fallback
  if(!logo && fs.existsSync('assets/logo.png')) logo='assets/logo.png';
  if(!badge && fs.existsSync('assets/google-play-badge.png')) badge='assets/google-play-badge.png';
  // build data url for logo
  let logoData=null;
  try{
    if(logo && fs.existsSync(logo)){
      const buf=fs.readFileSync(logo);
      const ext=path.extname(logo).slice(1)||'png';
      logoData=`data:image/${ext};base64,${buf.toString('base64')}`;
    }
  }catch(e){}
  return {logo,badge,audio,hostRef,logoData};
}
module.exports={findAssets};
