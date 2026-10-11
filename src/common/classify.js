
window.PV=window.PV||{};
PV.classify=function(scene, allScenes, project, scenesJsonEntry){
  if(scenesJsonEntry && scenesJsonEntry.type) return scenesJsonEntry.type;
  const text=scene.text;
  const lower=text.toLowerCase();
  const isFirst=scene.index===0;
  const isLast=scene.index===allScenes.length-1;
  if(isFirst && (PV.keywords.greetings.bn.some(g=>text.includes(g)) || text.length<=25)) return 'greeting';
  if(isLast) return 'closing';
  if(PV.keywords.storeWords.bn.some(w=>lower.includes(w)) || lower.includes('play store') || lower.includes('install')){
    return 'store';
  }
  if(project.brandName && text.includes(project.brandName.replace('S2','').trim())) return 'brand';
  // numbers
  const nums=PV.numbers.detect(text);
  if(nums.length>0) return 'numbers';
  // list detection comma or এবং
  if(text.includes(',')||text.includes('،')||text.includes('এবং')||text.includes(' ও ')) return 'cards';
  return 'card';
};
