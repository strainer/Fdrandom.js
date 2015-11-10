require ('../dlib/mutil.js')
require ('../dlib/Fdrandom.js')
require ('../dlib/Fdrandom_i.js')
require ('../dlib/Testprngs.js')
require ('../dlib/floatpresc.js')

pr(floatop.d2f(0.9999999999999999*0.99999997019767))
return

var ar = new Float32Array(1000);

var fc53=2.3283064370469157e-10  //.~99998 dubs

var fc53a=2.328281e-10  //
var fc53b=2.3283064370469158e-10  //
var fc32 =2.3283064370469158e-10 //
var fctau=2.3283064370469158e-10*2*Math.PI

//~ pr(0x7fffffff*fc32)
//~ pr(0x80000000*fc32)
//~ pr(0x100000000*fc32)
//~ pr(0xffffffff*fc32)
//~ pr(floatop.d2f(0xffffffff*2.328281e-10))

//~ pr(floatop.d2f(0xffffffff*2.32830636769e-10)) 
//largest value not producing 1 in f24 

//~ var a=0xffffffff|0xffffffff
//~ var b=0x80000000|0x80000000

//~ pr(b+2147483648)
//~ pr(b>>>0)


//~ pr(fctau)
//~ var sa=0,us=0

//~ pr((0xffffffff|0)+(0xffffffff|0))

//~ pr(0x7fffffff|0)
//~ pr(0x80000000|0)


//-2147483648 to 2147483647

/*
v=-34567
pr(v)
v=v>>>0
pr(v)
v=v|0
pr(v)

v=3743229039
v=v|0
pr(v)

v=0x7fffffff
pr(v)
v=0x80000000
pr(v|0)

pr(0xffffffff*2.328306367691e-10)
pr((0xffffffff +((0xffffffff|0)*3.32829e-10))*2.3283064370469158e-10)
*/


// for double precision generation 0..imax +1.
var f53l=2.328281e-10
var f53h=2.3283064370469158e-10
var vh=0xffffffff|0
var vl=0x7fffffff|0

var r1=( ( (vh+2147483648) +(vl+2147483648)*f53l) )*f53h; 
var r2=( ( (vh+2147483648) ) )*f53h; 
pr("::",r1)
pr("::",r2)


// for double precision generation by:
// (0.5 to imax+0.5'') +/- 0.5 to .49999''

var bq=0x80000000|0  //-0.5
var bqq=0x7fffffff   //0.49999
pr("bq",bq)
pr("bqq",bqq)
var bqf=2.328306436538696547e-10  //largest f that makes -0.5
var bqf=2.32830643653869616e-10   //smallest f that makes -0.5
var bqf=2.3283064365386963e-10    //both make 0.4999..767  is same number
pr(bq*bqf)
pr(bqq*bqf)

//unitary_interval = ( (bina+2147483648.5) +binb*facb)*faca
//  = ( (bina+2147483648.5) +binb*2.3283064365386963e-10)*2.328306436538696e-10

var cq=0x80000000|0   //-0.5
var cqq=0x7fffffff|0  //0.4999
pr("cq",cq)
pr("cqq",cqq)
var cqf=2.32830643653869615e-10  //largest f that makes 0.99999 
var cqf=2.32830643653869591e-10  //smallest f that makes 0.99999 
var cpf=2.328306436538696e-10    //is same number
																 
pr( ( (cqq+2147483648.5) +bqq*bqf )*cqf  )
pr( ( (cqq+2147483648.5) +bq*bqf )*cqf  )

pr(Math.PI*2*2.328306436538696e-10) //1.4629180792671594e-9


var aq=0x80000000|0  //-0.5
var aqq=0x7fffffff   //0.49999
pr("aq",bq)
pr("aqq",bqq)
pr("aq",(aqq+2147483648)*2.3283064370807971e-10)  //biggest not giving 1


//f32s factor  casts to float32 of less than 1, but has 32bits granularity 
var f32f=2.328306367691e-10
var sint_u=0x7ffffffd|0
var sint_l=0x80000000|0
var sint_h=0x7fffffff|0
pr("f32f U",(sint_u+2147483648)*2.328306367691e-10)
pr("f32f L",(sint_l+2147483648)*2.328306367691e-10)
pr("f32f H",(sint_h+2147483648)*2.328306367691e-10)

/*
///last factor to produce less than 1 for maxint and 0.5 for 1/2int
///use to produce best floats tailored for float32 arrays 
var fc24 =2.328306367691e-10
pr("f",floatop.d2f((0x7fffff00>>>0)*fc24)) //0.4999999403953552
pr("f",floatop.d2f((0x7fffff80>>>0)*fc24)) //0.4999999701976776
pr("f",floatop.d2f((0x7fffffff>>>0)*fc24)) //0.4999999701976776
pr("f",floatop.d2f((0x80000000>>>0)*fc24)) //0.5
pr("f",floatop.d2f((0x80000001>>>0)*fc24)) //0.5
pr("f",floatop.d2f((0x800000cf>>>0)*fc24)) //0.5000000596046448
pr("f",floatop.d2f((0x80000100>>>0)*fc24)) //0.5000000596046448
pr("f",floatop.d2f((0xffffffff>>>0)*fc24)) //0.9999999403953552
pr(1-1/Math.pow(2,24))                     //0.9999999403953552

*/

function prres(fmst,flst,sc){
	pr("\nSteps of ",fmst,flst,"by step",sc)
	pr( "Mmax ,Lmax :",(0xffffffff*fmst)+((0xffffffff>>>0)*flst) )
	pr( "Mmax ,Lmin1:",(0xffffffff*fmst)+((0x0>>>0+sc)*flst) )
	pr( "Mmin0,Lmax :",(0x0*fmst)+((0xffffffff>>>0)*flst) )
	pr( "Mmin0,Lmin1:",(0x0*fmst)+((0x0>>>0+sc)*flst) )
	pr("Max, Lmax to Lmax -7n")
	pr( (0xffffffff*fmst)+(((0xffffffff>>>0)-0*sc)*flst) )
	pr( (0xffffffff*fmst)+(((0xffffffff>>>0)-1*sc)*flst) )
	pr( (0xffffffff*fmst)+(((0xffffffff>>>0)-2*sc)*flst) )
	pr( (0xffffffff*fmst)+(((0xffffffff>>>0)-3*sc)*flst) )

	pr("\nMMax,Lmin+3 to MMax-1,LMax-3")
	
	pr( (0xffffffff*fmst)+(((0x00000000>>>0)+3*sc)*flst) )
	pr( (0xffffffff*fmst)+(((0x00000000>>>0)+2*sc)*flst) )
	pr( (0xffffffff*fmst)+(((0x00000000>>>0)+1*sc)*flst) )
	pr( (0xffffffff*fmst)+(((0x00000000>>>0)+0*sc)*flst) )
	pr("--step--")
	pr( (0xfffffffe*fmst)+(((0xffffffff>>>0)-0*sc)*flst) )
	pr( (0xfffffffe*fmst)+(((0xffffffff>>>0)-1*sc)*flst) )
	pr( (0xfffffffe*fmst)+(((0xffffffff>>>0)-2*sc)*flst) )
	pr( (0xfffffffe*fmst)+(((0xffffffff>>>0)-3*sc)*flst) )
	
}

/*
var fmstx=1.008790286847754e-13
var flstx=fmstx*fmstx

var fmst=1   /0x100000001
var flst=fmst/0x100000001 
//~ prres(fmst,flst,1000000000)
*/

//nudges on +0s : +(0xffffffff>>32)^1*nudge
//~ var op =((0xffffffff>>32)*2.328306e-10)
//~ pr(op)

//javascript returns 0 to 1-nudge

//~ var pf=(0xffffffff*2.328306e-10)
//~ pr(pf)
//~ var p= (0xffffffff*2.328306e-10)+((0xffffffff>>>0)*0.4370807973e-16)

//~ pr((2.3283064370469158e-10)/6)
//~ pr((0xffffffff>>>0)*2.3283064370469158e-10)
//~ pr((0xffffffff>>>0)*2.3283064370469158e-10)
//~ pr((0xffffffff>>>0)*2.328306437048e-10)
//~ pr((0xffffffff>>>0)*6)
//~ pr(25769803771*3.8805107284115265e-11)
//~ pr(25769803770*3.8805107284115265e-11) //this one
//~ pr(25769803769*3.8805107284115265e-11)
//~ pr(25769803768*3.8805107284115265e-11)
//~ pr(p)
//~ var fmst=2.328306e-10 , flst=0.4370807973e-16

//~ pr("rough "+Math.sqrt(fmst*flst))
//~ pr(fmst/flst)
//~ pr(1/fmst)
//~ pr((1/fmst)*(1/fmst))
//~ pr(1/((1/fmst)*(1/fmst))) //flst theory 5.421008829636001e-20

//~ var flstb=5.421008829636001e-20
//~ var pd= (0xffffffff*fmst)+((0xffffffff>>>0)*flstb)
//~ pr(pd)
//~ var pe=(0xffffffff>>>0)*flstb
//~ pr(pe)
//~ var pd=(0xffffffff>>>0)*flst
//~ pr(pd)
//~ pr("--")


//~ prres(fmstx,flstx)


//~ pr( (0xffffffff*fmst)+((0xfffffffa>>>0)*flst) )
//~ var px= ((0xffffffff>>>0)*0.4370807973e-16)
//~ //pr(px)
//~ var py= ((0x0000ffff>>>0)*0.4370807973e-16)
//~ //pr(py)
//~ var g=4.370807973e-17
//~ //pr(g)
//~ var q= Math.log(1-p)
//~ //pr(q)
//~ var qf= Math.log(1-pf)
//~ //pr(qf)



//~ pr("d",(0xffffffff>>>0)*ffac2) //
//~ pr("f",floatop.d2f((0xffffffff>>>0)*ffac2)) //0.9999..
//~ pr("f",floatop.d2f((0xfffffff0>>>0)*ffac2)) //0.9999..
//~ pr("f",floatop.d2f((0xffffff00>>>0)*ffac2)) //0.9999..
//~ pr("f",floatop.d2f((0xfffffe00>>>0)*ffac2)) //0.9999..
//~ pr("f",floatop.d2f((0xfffffd00>>>0)*ffac2)) //0.9999..
//~ pr("f",floatop.d2f((0xfffffc00>>>0)*ffac2)) //0.9999..

//pr(ffac2)


