
window.PV=window.PV||{};
PV.timeline={
 total:0, lastEnd:0, scenes:[],
 compute:function(scenes, audioDuration, tailPad){
  const last=scenes.length? scenes[scenes.length-1].end:0;
  this.lastEnd=last;
  this.scenes=scenes;
  let total;
  if(audioDuration>0){
    total=Math.max(audioDuration+tailPad, last+0.5);
  } else {
    total=last+tailPad;
  }
  this.total=total;
  return total;
 },
 isVisible:function(scene,t,total){
  const start=scene.start-0.01;
  let end=scene.end+0.01;
  if(scene.index===this.scenes.length-1) end=total+0.1;
  return t>=start && t<=end;
 },
 spokenWindow:function(scene){ return {s:scene.start, e:scene.end}; }
};
