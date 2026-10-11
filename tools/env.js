
function parse(){
  const theme=(process.env.THEME||'podcast').toLowerCase();
  const fps=parseInt(process.env.FPS||'30',10);
  const width=parseInt(process.env.WIDTH|| (theme==='infographic'?'1080':'1920'),10);
  const out=process.env.OUT||`out/video-${theme}.mp4`;
  const start=process.env.START? parseFloat(process.env.START):0;
  const end=process.env.END? parseFloat(process.env.END):0;
  const audioVolume=parseFloat(process.env.AUDIO_VOLUME||'1.0');
  const fadeOut=parseFloat(process.env.AUDIO_FADE_OUT||'0.5');
  const endPad=parseFloat(process.env.END_PAD|| (process.env.AUDIO?'2.0':'0.5'));
  return {theme,fps,width,out,start: isNaN(start)?0:start,end: isNaN(end)||end===0?0:end,audioVolume,fadeOut,endPad};
}
module.exports={parse};
