require ('../dlib/mutil.js')
//~ Fdrandom=require ('../Fdrandom.min.js')
Fdrandom=require ('../Fdrandom.js')
require ('../dlib/Testprngs.js')
require ('../dlib/floatpresc.js')


p=Fdrandom.pot()
q=Fdrandom.pot()
h=Fdrandom.hot()

pr(h.gskip(0,1,256))

pr(h.checkfloat())
return

k=0
for(i=0;i<100000000;i++)
{ k+=h.rbit() }
pr(k)
return


function reppr(f,x,a,b)
{ for(var i=0;i<x;i++){ pr(f(a,b)) } }

function repsi(f,x,a,b)
{ for(var i=0;i<x;i++){ f(a,b) } }



//~ reppr(Fdrandom.ilcg,100)
//~ var y=0
//~ for(var i=0;i<10000;i++)
//~ { y=Fdrandom.hot().f48()-y }

//~ a=Fdrandom.rarray()

//~ console.log(a)

//~ pr(Fdrandom.pot(0.00000000000007).next())
//~ return

//~ h=Fdrandom.hot()
//~ if(0) pr("issssssssssss")
//~ pr(h.mixof(["can","sha","i a","hey"],9))
//~ pr(h.mixof("asqwpuhgvoksqw jdiecn eufhfh fuowhfc sxkceebczsla","",30))

//~ return

//~ var t=0

//~ for(var c=0;c<1000000;c++)
//~ { t+=h.rbit() }

//~ pr(t/1000000)



//~ checkperiod(Fdrandom.ishr2,1)

//~ repsi(Fdrandom.ishr2,100000)

//mix func tests
/*
instr="0123456789abcdef"
h=Fdrandom.hot()
UUIDv4 = h.mixof(instr,8) +
   "-" + h.mixof(instr,4) + 
   "-4"+ h.mixof(instr,3) +
   "-" + h.mixof(instr,h.mixof("89ab",1),3) +
   "-" + h.mixof(instr,12);
   
pr(UUIDv4)

pr(h.mixup("abcdef",0,2))
pr(h.mixup("abcdef","QQ",0,2))
pr(h.mixup("abcdef",[9,1],0,2))

pr(h.mixof("abcdefg",1))
pr(h.mixof("abcdefg",1))

return
*/


/*
var hot=Fdrandom.hot()
var a=[]
for(var t=0;t<10000;t++)
{ a.push(1*hot.mixof("0123456789","0.",5)) } 
regurg(a)
pr(regurg())

distrib(wpot.regurg, 10, 0, 1000000, 100000)

return
*/

//~ compfunc(Fdrandom.f32,Fdrandom_i.f32)

benchn(4,Math.random  ,10,"math ")
benchn(4,Fdrandom.f48  ,10,"f48 ")
benchn(4,Fdrandom.rbit  ,10,"rbit ")








//run ex-repo diehard tests
/*
dieh=0
if (dieh){
  //~ Fdrandom.resetr()
  fname="dod"
  savedata("o:/tmp/"+fname+"raw"
  ,function(){ return (Fdrandom.dodo()*0x100000000)>>>0 } 
  ,20000000)
  diehard("o:/tmp/"+fname+"raw","111111111111111")
  return
}
*/


// p(no collision) = 1- ( n^2 / 2M ) 
// n is instances, M is states
// 
// f48 state space approx 2^350 
// extreme unlikely brithday collision, p 0.999999999999999
// 0.999999999999999 = 1 - (n^2/ 14*2^50)
// 0.0000000000000001 = (n^2/ 14*2^50)
// 0.0000000000000001 * 14*2^50 =  n^2
// math.sqrt(0.0000000000000001 * math.pow(2,350)) =  n = 4.8e+044




//~ pr("-")
//~ Fdrandom=Fdrandom.repot(0.10000000000004)
//~ console.log(arguments)

//~ pr(Infinity&1)
//~ pr(Fdrandom.rndsign())
//~ return

//~ Fdrandom.f48(Fdrandom.hot().dodo())
//~ pr(Fdrandom.usum(100000000))
//~ distrib(Fdrandom.gaus, 10, -1,1, 1000)
//~ distrib(Fdrandom.dodo, 10, -1,1, 1000)

//~ distrib(Fdrandom.ui32, 10, 0, 1000000, 100000)

//~ return

