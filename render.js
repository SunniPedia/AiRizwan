const fs=require('fs');
const path=require('path');
const env=require('./tools/env');
const {probeDuration,analyzeAudio}=require('./tools/audio');
const {setupPage}=require('./tools/browser');
const {spawnEncoder}=require('./tools/encoder');
const {findAssets}=require('./tools/assets');
async function main(){
 try{
  const cfg=env.parse();
  console.log(`Theme ${cfg.theme} width ${cfg.width} fps ${cfg.fps} out ${cfg.out}`);
  const assets=findAssets();
  let audioDur=0;
  if(assets.audio){
    audioDur=await probeDuration(assets.audio);
    console.log(`Audio duration ${audioDur}s file ${assets.audio}`);
  }
  const raw=fs.readFileSync('timestamps.txt','utf8');
  const projectJson=JSON.parse(fs.readFileSync('config/project.json','utf8'));
  let scenesJson=null;
  try{ scenesJson=JSON.parse(fs.readFileSync('config/scenes.json','utf8')); }catch(e){}
  const {page,browser}=await setupPage(cfg, assets, raw, projectJson, scenesJson, audioDur);
  const total=await page.evaluate(()=> window.PV.timeline.total);
  const lastEnd=await page.evaluate(()=> window.PV.timeline.lastEnd);
  console.log(`Duration total=${total} audioDur=${audioDur} lastEnd=${lastEnd} tail=${projectJson.endPad||2}`);
  if(audioDur>0 && Math.abs(audioDur-lastEnd)>1){
    console.log(`::warning::Audio ${audioDur}s vs last timestamp ${lastEnd}s diff >1s total chosen ${total}`);
  }
  const start=Math.max(0,cfg.start||0);
  const end=cfg.end? Math.min(cfg.end,total): total;
  const duration=end-start;
  const frames=Math.ceil(duration*cfg.fps);
  console.log(`Rendering ${frames} frames from ${start} to ${end} duration ${duration}`);
  let envelope=null;
  if(assets.audio){
    envelope=await analyzeAudio(assets.audio, cfg.fps, duration, start);
    await page.evaluate(({env,fps})=>{ window.setAudio(env,fps); }, {env:envelope,fps:cfg.fps});
  } else {
    await page.evaluate(({env,fps})=>{ window.setAudio(env,fps); }, {env:null,fps:cfg.fps});
  }
  await page.evaluate(async()=>{ await document.fonts.ready; });
  const outDir=path.dirname(cfg.out);
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir,{recursive:true});
  const ff=spawnEncoder(cfg.out, cfg.fps, duration, assets.audio? {audio:assets.audio,start,volume:cfg.audioVolume,fadeOut:cfg.fadeOut,endPad:projectJson.endPad,total:total,audioDur}: null);
  for(let i=0;i<frames;i++){
    const t=start + i/cfg.fps;
    await page.evaluate(({tt})=> window.seek(tt), {tt:t});
    const buf=await page.screenshot({type:'jpeg',quality:95});
    const ok=ff.stdin.write(buf);
    if(!ok) await new Promise(r=>ff.stdin.once('drain',r));
    if(i%60===0) console.log(`frame ${i}/${frames} t=${t.toFixed(2)}`);
  }
  ff.stdin.end();
  await new Promise((res,rej)=>{ ff.on('close',code=> code===0?res():rej(new Error('ffmpeg '+code))); });
  await browser.close();
  console.log(`Done ${cfg.out} duration ${duration}`);
 }catch(e){ console.error(e); process.exit(1); }
}
main();
