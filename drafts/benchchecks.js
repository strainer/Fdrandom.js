require ('../dlib/mutil.js')
require ('../Fdrandom.js')
require ('../dlib/Testprngs.js')
require ('../dlib/floatpresc.js')

//~ pr(-1==null)

//~ Fdrandom=Fdrandom.repot(0.10000000000003)
//~ dolp(Fdrandom.f48,5)
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
h=Fdrandom.hot()
var t=0

for(var c=0;c<1000000;c++)
{ t+=h.rndbit() }

pr(t/1000000)


//~ checkperiod(Fdrandom.ishr2,1)

//~ dolx(Fdrandom.ishr2,100000)
//~ dolp(Fdrandom.ishr2,100)
return
//~ return
//~ if(!"false"){ pr("oops") }

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

//~ return

function dolp(f,x,a,b)
{ for(var i=0;i<x;i++){ pr(f(a,b)) } }

function dolx(f,x,a,b)
{ for(var i=0;i<x;i++){ f(a,b) } }


function testun(a)
{ if(a ===undefined ){ return 1 }else{ return 0 } }


//~ var hot=Fdrandom.hot()
//~ var a=[]
//~ for(var t=0;t<10000;t++)
//~ { a.push(1*hot.mixof("0123456789","0.",5)) } 
//~ regurg(a)
//~ pr(regurg())

//~ return
//~ distrib(wpot.regurg, 10, 0, 1000000, 100000)


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

//~ compfunc(Fdrandom.f32,Fdrandom_i.f32)

//~ return
//winners 15.378612015061215  0.12810301030196883

scandev=true
if(scandev){ 

var minoutp=true
var roughness=20000     //5@10
var reps=3, stren=30, accur=0//(Math.sqrt(stren)*10000)/roughness
var tsreset=Fdrandom.dodo(11,11)
var tsfunc=Fdrandom.f47  

var ax=0.24999,ex=0.25,nx=3  //peak 0
var ay=31.999999,ey=32.0,ny=3

//ax=null;ex=null;nx=null; ay=null;ey=null;ny=null
stren=9; reps=2
//~ pr(Fdrandom.dodo())
//~ pr(Fdrandom.dodo())
//~ pr(Fdrandom.dodo())
//~ pr(Fdrandom.dodo())

//~ return

//~ scanrange( Fdrandom.f48,  tsreset, 1,stren,accur, ax,ex,nx, ay,ey,ny, minoutp )
//~ scanrange( Fdrandom.dodo,  tsreset, reps,stren,accur, ax,ex,nx, ay,ey,ny, minoutp )
//~ pr(Fdrandom.dodo())
//~ pr(Fdrandom.dodo())
//~ pr(Fdrandom.dodo())
//~ pr(Fdrandom.dodo())
//~ pr(Fdrandom.dodo())

//~ return
//~ var reps=200000000 //1 minute each
//~ var reps=100000000 //1 minute each
//~ Fdrandom.resetr()

//~ pr("usumz")
//~ distrib(Fdrandom.usumz,10,-0.5,0.5,reps,20)

//~ pr("usum")
//~ distrib(Fdrandom.usum,10,-0.5,0.5,reps,20)
//~ pr("gaus")
//~ distrib(Fdrandom.gaus,10,-0.5,0.5,reps,0.065)
//~ distrib(Fdrandom.gaus,10,-0.5,0.5,reps,1)
//~ return
//~ pr("ui32")
//~ return
pr("~func~")
//~ pr(Fdrandom.hot().rndbit())
benchn(4,Math.random  ,10,"math ")
benchn(4,Fdrandom.f48  ,10,"f48 ")
benchn(4,Fdrandom.dodo  ,10,"dodo ")
//~ benchn(4,Math.random  ,10,"math ")
//~ benchn(4,Fdrandom.rndbit  ,10,"rndbit ")
//~ benchn(4,Fdrandom.f48  ,10,"f48 ")
//~ benchn(4,Fdrandom.i32  ,10,"i32 ")
//~ benchn(4,Fdrandom.ui32  ,10,"ui32 ")
//~ benchn(4,Fdrandom.f48ld  ,10,"f48ld ")
//~ benchn(4,Fdrandom.gausx  ,10,"gausx ")
//~ benchn(4,Fdrandom.gausx  ,10,"gausx ")
//~ benchn(4,Fdrandom.usum  ,10,"usum ",8)

return

//~ scanrange( Fdrandom.fbm,  tsreset, reps,stren,accur, ax,ex,nx, ay,ey,ny, false )
//~ scanrange( Fdrandom.f53bm,  tsreset, reps,stren,accur, ax,ex,nx, ay,ey,ny, false )

//~ scanrange( Fdrandom.f48,  tsreset, reps,stren,accur, ax,ex,nx, ay,ey,ny, minoutp )
//~ scanrange( Fdrandom.i48,  tsreset, reps,stren,accur, ax,ex,nx, ay,ey,ny, minoutp )

//pr("~control~")

//~ var ax=15.96578140015061215,ex=15.972140015061215,nx=3
//~ var ax=1.0000000000000006,ex=1.12500000000007776,nx=16  //big sweep
return
}

