
window.PV=window.PV||{};
PV.parse=function(raw){
  let lines=raw.replace(/^\uFEFF/,'').split(/\r?\n/);
  const scenes=[];
  for(let idx=0;idx<lines.length;idx++){
    let line=lines[idx].trim();
    if(!line || line.startsWith('#')) continue;
    let parts=line.split('|');
    if(parts.length<3){
      console.warn('skip line '+idx);
      continue;
    }
    // format start | end | text | mood
    const startRaw=parts[0].trim();
    const endRaw=parts[1].trim();
    const moodRaw=parts[parts.length-1].trim().toLowerCase();
    const moods=['respectful','happy','informative','excited','calm','enthusiastic'];
    let mood='happy', text='';
    if(moods.includes(moodRaw)){
      text=parts.slice(2, parts.length-1).join('|').trim();
      mood=moodRaw;
    } else {
      text=parts.slice(2).join('|').trim();
    }
    function parseTime(s){
      s=s.replace(',','.').trim();
      if(s.includes(':')){
        const [m,sec]=s.split(':');
        return parseFloat(m)*60+parseFloat(sec);
      }
      return parseFloat(s);
    }
    let start=parseTime(startRaw), end=parseTime(endRaw);
    if(isNaN(start)) start=0;
    if(isNaN(end) || end<=start) end=start+0.5;
    if(!text) continue;
    // extract brand markers
    let hasMarker=text.includes('❝') && text.includes('❞');
    let cleanText=text.replace(/❝/g,'').replace(/❞/g,'');
    scenes.push({index:scenes.length, raw:text, text:cleanText, rawWithMarkers:text, hasMarker, start, end, mood});
  }
  scenes.sort((a,b)=>a.start-b.start);
  // trim overlaps
  for(let i=0;i<scenes.length-1;i++){
    if(scenes[i].end>scenes[i+1].start){
      console.warn('overlap trim '+i);
      scenes[i].end=scenes[i+1].start;
      if(scenes[i].end<=scenes[i].start) scenes[i].end=scenes[i].start+0.1;
    }
  }
  return scenes;
};
