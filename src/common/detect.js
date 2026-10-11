
window.PV=window.PV||{};
PV.detect={
 scriptOf:function(text){
  // simple Bengali detection
  const bn=(text.match(/[\u0980-\u09FF]/g)||[]).length;
  const ar=(text.match(/[\u0600-\u06FF]/g)||[]).length;
  if(bn>ar) return 'bengali';
  if(ar>0) return 'arabic';
  return 'latin';
 },
 directionOf:function(script){ return ['arabic','urdu','persian','hebrew'].includes(script)?'rtl':'ltr'; }
};
