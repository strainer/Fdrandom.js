require ('../dlib/mutil.js')
//~ Fdrandom=require ('../Fdrandom.min.js')
Fdrandom=require ('../Fdrandom.js')
require ('../dlib/Testprngs.js')
require ('../dlib/floatpresc.js')






var notverbose=false
var roughness=20000     //5@10
var reps=1, stren=40, accur=0//(Math.sqrt(stren)*10000)/roughness
//var tsreset=Fdrandom.dodo(11,11)
var tsfunc=Fdrandom.f47 

var ax=0.24999,ex=0.25,nx=1  //peak 0
var ay=31.999999,ey=32.0,ny=1

//ax=null;ex=null;nx=null; ay=null;ey=null;ny=null
stren=33; reps=2
//~ pr(Fdrandom.dodo())
//~ pr(Fdrandom.dodo())
//~ pr(Fdrandom.dodo())
//~ pr(Fdrandom.dodo())

//~ return

pr("math")
scanrange( Math.random,  Fdrandom.f48, 1,stren,accur, ax,ex,nx, ay,ey,ny, notverbose )
pr("f48")
scanrange( Fdrandom.f48,  Fdrandom.f48, 1,stren,accur, ax,ex,nx, ay,ey,ny, notverbose )
pr("--------------")




//~ scanrange( Fdrandom.fbm,  tsreset, reps,stren,accur, ax,ex,nx, ay,ey,ny, false )
//~ scanrange( Fdrandom.f53bm,  tsreset, reps,stren,accur, ax,ex,nx, ay,ey,ny, false )

//~ scanrange( Fdrandom.f48,  tsreset, reps,stren,accur, ax,ex,nx, ay,ey,ny, notverbose )
//~ scanrange( Fdrandom.i48,  tsreset, reps,stren,accur, ax,ex,nx, ay,ey,ny, notverbose )

//pr("~control~")

//~ var ax=15.96578140015061215,ex=15.972140015061215,nx=3
//~ var ax=1.0000000000000006,ex=1.12500000000007776,nx=16  //big sweep
return



//~ scanrange( Fdrandom.dodo,  tsreset, reps,stren,accur, ax,ex,nx, ay,ey,ny, notverbose )
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
