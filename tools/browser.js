const {chromium}=require('playwright');
async function setupPage(cfg, assets, raw, projectJson, scenesJson, audioDur){
  const browser=await chromium.launch({args:['--no-sandbox']});
  const designW=cfg.theme==='infographic'?1080:1920;
  const designH=cfg.theme==='infographic'?1920:1080;
  const scale=cfg.width/designW;
  const context=await browser.newContext({viewport:{width:designW,height:designH},deviceScaleFactor:scale});
  const page=await context.newPage();
  page.on('pageerror',e=>console.log('pageerror',e));
  page.on('console',m=>console.log('browser:',m.text()));
  const htmlFile=cfg.theme==='infographic'?'index-infographic.html':'index-podcast.html';
  const fileUrl='file://'+require('path').resolve(htmlFile);
  await page.goto(fileUrl);
  await page.waitForTimeout(800);
  const tailPad=projectJson.endPad!=null? projectJson.endPad : (cfg.endPad||2);
  // FIX: pass single object to evaluate, not two args
  await page.evaluate(({rawT,opts})=>{
    return window.init(rawT,opts);
  }, {rawT:raw, opts:{project:projectJson,scenes:scenesJson,badge:assets.badge||null,logo:assets.logo||null,logoData:assets.logoData||null,audioDuration:audioDur||0,tailPad}});
  await page.evaluate(async()=>{ await document.fonts.ready; if(window.fit) window.fit(); });
  return {page,browser};
}
module.exports={setupPage};
