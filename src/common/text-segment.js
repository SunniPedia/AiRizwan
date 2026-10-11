
window.PV=window.PV||{};
PV.segment={
 words:function(text, lang){
  if(typeof Intl!=='undefined' && Intl.Segmenter){
    try{
      const seg=new Intl.Segmenter(lang||'bn',{granularity:'word'});
      const parts=[...seg.segment(text)];
      return parts.filter(p=>p.isWordLike).map(p=>p.segment);
    }catch(e){}
  }
  return text.split(/\s+/).filter(Boolean);
 },
 graphemes:function(text){
  if(typeof Intl!=='undefined' && Intl.Segmenter){
    try{
      const seg=new Intl.Segmenter('bn',{granularity:'grapheme'});
      return [...seg.segment(text)].map(s=>s.segment);
    }catch(e){}
  }
  return [...text];
 }
};
