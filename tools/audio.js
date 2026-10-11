
const {spawn,spawnSync}=require('child_process');
const fs=require('fs');
function probeDuration(file){
  return new Promise((res,rej)=>{
    const p=spawn('ffprobe',['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',file]);
    let out='';
    p.stdout.on('data',d=>out+=d);
    p.on('close',c=>{
      const v=parseFloat(out.trim());
      if(!isNaN(v)) res(v); else res(0);
    });
    p.on('error',()=>res(0));
  });
}
function analyzeAudio(file, fps, duration, start){
  return new Promise((res,rej)=>{
    // decode to raw and compute RMS per frame using ffmpeg -> node
    const totalFrames=Math.ceil(duration*fps);
    const args=['-ss',String(start),'-i',file,'-ac','1','-ar','22050','-f','s16le','-acodec','pcm_s16le','-'];
    const ff=spawn('ffmpeg',['-v','error',...args]);
    const chunks=[];
    ff.stdout.on('data',d=>chunks.push(d));
    ff.on('close',()=>{
      const buf=Buffer.concat(chunks);
      const samplesPerFrame=Math.floor(22050/fps);
      const envelope=[];
      let max=0;
      const rms=[];
      for(let i=0;i<totalFrames;i++){
        const off=i*samplesPerFrame*2;
        let sum=0,c=0;
        for(let j=0;j<samplesPerFrame;j++){
          const idx=off+j*2;
          if(idx+1>=buf.length) break;
          const s=buf.readInt16LE(idx)/32768;
          sum+=s*s; c++;
        }
        const r=c?Math.sqrt(sum/c):0;
        rms.push(r);
        if(r>max) max=r;
      }
      // 95th percentile normalization
      const sorted=[...rms].sort((a,b)=>a-b);
      const p95=sorted[Math.floor(sorted.length*0.95)]||max||1;
      let smooth=0;
      for(let i=0;i<rms.length;i++){
        let v=rms[i]/p95;
        v=Math.min(1,Math.max(0,v));
        const attack=0.6, release=0.18;
        if(v>smooth) smooth=smooth* (1-attack)+ v*attack; else smooth=smooth*(1-release)+v*release;
        envelope.push(smooth);
      }
      res(envelope);
    });
  });
}
function spawnEncoder(){}
module.exports={probeDuration,analyzeAudio};
