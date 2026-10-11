
window.PV=window.PV||{};
PV.easeOut=x=>1-Math.pow(1-x,3);
PV.easeInOut=x=> x<0.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
PV.easeBack=x=>{ const c1=1.70158; const c3=c1+1; return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2); };
PV.clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
PV.prog=(t,s,d)=>{ if(d<=0) return t>=s?1:0; return PV.clamp((t-s)/d,0,1); };
