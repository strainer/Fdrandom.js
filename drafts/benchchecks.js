require ('../dlib/mutil.js')
require ('../dlib/Fdrandom.js')
require ('../dlib/Testprngs.js')
require ('../dlib/floatpresc.js')
require ('../dlib/mini.js')


pr((false==null))
return

function dolp(f,x,a,b)
{ for(var i=0;i<x;i++){ pr(f(a,b)) } }


function testun(a)
{ if(a ===undefined ){ return 1 }else{ return 0 } }


var hot=Fdrandom.hot()
var a=[]
for(var t=0;t<10000;t++)
{ a.push(1*hot.mixof("0123456789","0.",5)) } 
regurg(a)
pr(regurg())

//~ return
//~ distrib(wpot.regurg, 10, 0, 1000000, 100000)


dieh=null
if (dieh){
  Fdrandom.resetr()
	//~ fname="x32" 33 46 48 50
	//~ savedata("o:/tmp/"+fname+"raw",Fdrandom.if32,20000000)
  //~ diehard("o:/tmp/"+fname+"raw","111111111111111")
  return
}

//~ compfunc(Fdrandom.f32,Fdrandom_i.f32)

//~ return
//winners 15.378612015061215  0.12810301030196883

scandev=true
if(scandev){ 

var minoutp=true
var roughness=20000     //5@10
var reps=3, stren=40, accur=0//(Math.sqrt(stren)*10000)/roughness
var tsreset=Fdrandom.resetr
var tsfunc=Fdrandom.f47  

var ax=15.378612015061215,ex=15.378612015061215,nx=1  //peak 0
var ay=0.12810301030196883,ey=0.12810301030196883,ny=1

//~ scanrange( Fdrandom.f48,  tsreset, reps,stren,accur, ax,ex,nx, ay,ey,ny, minoutp )

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
benchn(4,Math.random  ,10,"math ")
benchn(4,Fdrandom.rndbit  ,10,"rndbit ")
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

