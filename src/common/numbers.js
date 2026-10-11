
window.PV=window.PV||{};
PV.numbers={
 bnDigits:{'০':0,'১':1,'২':2,'৩':3,'৪':4,'৫':5,'৬':6,'৭':7,'৮':8,'৯':9},
 convertDigits:function(s){
  let v=0; let has=false;
  for(const ch of s){
    if(ch>='0'&&ch<='9'){ v=v*10+(ch.charCodeAt(0)-48); has=true; }
    else if(this.bnDigits[ch]!==undefined){ v=v*10+this.bnDigits[ch]; has=true; }
  }
  return has?v:null;
 },
 detect:function(text){
  const re=/[0-9০-৯]+/g;
  const arr=[]; let m;
  while((m=re.exec(text))!==null){
    const val=PV.numbers.convertDigits(m[0]);
    if(val!==null) arr.push({raw:m[0],value:val,index:m.index});
  }
  return arr;
 },
 format:function(num, digits, grouping){
  let s='';
  if(digits==='bengali'){
    const map=['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    s=String(num).split('').map(ch=> ch>='0'&&ch<='9'? map[ch.charCodeAt(0)-48]:ch).join('');
  } else s=String(num);
  if(grouping==='lakh'){
    // simple lakh grouping for latin digits, for bengali keep as is
    if(digits!=='bengali'){
      // format 270335 -> 2,70,335
      let str=String(num);
      if(str.length>3){
        let last3=str.slice(-3);
        let rest=str.slice(0,-3);
        let out='';
        while(rest.length>2){
          out=','+rest.slice(-2)+out;
          rest=rest.slice(0,-2);
        }
        if(rest) out=rest+out;
        s=out+','+last3;
        if(digits==='bengali'){
          const map=['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
          s=s.split('').map(ch=> ch>='0'&&ch<='9'? map[ch.charCodeAt(0)-48]:ch).join('');
        }
      }
    }
  } else if(grouping!=='none'){
    // international
  }
  return s;
 }
};
