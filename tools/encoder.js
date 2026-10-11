
const {spawn}=require('child_process');
function spawnEncoder(outPath, fps, duration, audioInfo){
  const args=['-y','-f','image2pipe','-r',String(fps),'-vcodec','mjpeg','-i','-'];
  if(audioInfo && audioInfo.audio){
    args.push('-ss',String(audioInfo.start||0),'-i',audioInfo.audio);
    args.push('-map','0:v','-map','1:a');
    // af filters
    let af=[];
    if((audioInfo.start||0)===0) af.push('afade=t=in:st=0:d=1.5');
    if(audioInfo.fadeOut && audioInfo.fadeOut>0){
      const st=Math.max(0,(audioInfo.audioDur||duration)-audioInfo.fadeOut);
      af.push(`afade=t=out:st=${st}:d=${audioInfo.fadeOut}`);
    }
    af.push(`volume=${audioInfo.volume||1}`);
    af.push(`apad=whole_dur=${duration}`);
    args.push('-af',af.join(','));
    args.push('-c:a','aac','-b:a','192k');
  }
  args.push('-c:v','libx264','-crf','18','-preset','medium','-pix_fmt','yuv420p','-movflags','+faststart','-r',String(fps),'-t',String(duration),outPath);
  console.log('ffmpeg',args.join(' '));
  const ff=spawn('ffmpeg',args,{stdio:['pipe','pipe','pipe']});
  ff.stderr.on('data',d=>{ /* console.log(d.toString()); */ });
  return ff;
}
module.exports={spawnEncoder};
