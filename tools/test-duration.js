
function test(){
  const cases=[
    {audio:10,last:6,expected:12},
    {audio:3,last:8,expected:8.5},
    {audio:0,last:5,expected:5.5},
  ];
  for(const c of cases){
    const total=c.audio? Math.max(c.audio+2, c.last+0.5): c.last+0.5;
    console.log(`case audio=${c.audio} last=${c.last} => total=${total} expected ~${c.expected}`);
  }
}
test();
