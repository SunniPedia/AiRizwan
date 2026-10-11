
window.PV=window.PV||{};
PV.palette={
 derive:function(logoData, projectColors){
  // simplified: if logoData exists sample not possible without canvas taint? we use data url so ok
  try{
    if(projectColors && projectColors.bg) return projectColors;
    if(!logoData) return projectColors;
    // fallback return projectColors
    return projectColors;
  }catch(e){ return projectColors; }
 }
};
