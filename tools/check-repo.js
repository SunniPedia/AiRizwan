
const fs=require('fs');
function fail(msg){ console.error('CHECK FAIL: '+msg); process.exit(1); }
const srcFiles=[];
function walk(d){
  if(!fs.existsSync(d)) return;
  for(const f of fs.readdirSync(d)){
    const p=require('path').join(d,f);
    const s=fs.statSync(p);
    if(s.isDirectory()) walk(p); else srcFiles.push(p);
  }
}
walk('src'); walk('tools');
let emojiRegex=/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/u;
for(const file of srcFiles){
  if(file.endsWith('.js')||file.endsWith('.css')||file.endsWith('.html')||file.endsWith('.json')){
    const txt=fs.readFileSync(file,'utf8');
    if(emojiRegex.test(txt) && !file.includes('timestamps')){
      console.log('::warning:: potential emoji in '+file);
    }
    if(/setTimeout|setInterval|requestAnimationFrame|Math\.random/.test(txt)){
      // allow in render/tools but not in src
      if(file.startsWith('src/')) fail(`forbidden API in ${file}`);
    }
  }
}
console.log('check-repo ok');
