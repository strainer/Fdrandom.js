require ('../dlib/mutil.js')
//~ Fdrandom=require ('../Fdrandom.min.js')
Fdrandom=require ('../Fdrandom.min.js')
//~ Fdrandom=require ('./autoproto.js')
require ('../dlib/Testprngs.js')
require ('../dlib/floatpresc.js')

h=Fdrandom.hot()

Fd=p=Fdrandom.pot()
pp=Fdrandom.pot()
po=Fdrandom.pot()
q=Fdrandom.pot()
r=Fdrandom.pot()

d=h.aindex(10000000)
d=h.mixup(d)
return

pr(h.antisort([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],0,5,10000))
pr(h.antisort([0,0,0,0,0,5,5,5,5,5,5,11,11,11,11,11],0,5,10000))
pr(h.aresult())
return
/////////////////////////////////
/*
function avsamp(A,s)
{ sm=0; n=A.length; w=p.irange(0,n-s)
  for(i=0;i<s;i++) sm+=A[w+i]
  return sm/s
}


console.log("Mean error sampling (of mean)")
console.log("win-len    rnd-inx    rnd-inx     a-inx     ae/re")

dlen=10000,jn=30
for(wlen=1; wlen<100; wlen=wlen+1+(wlen/7)|0+(wlen/10)|0)
{
  raw=0,aso=0,mix=0
  for(j=0;j<jn;j++){
  
    sum=0
    //dat=h.mixof(p.bulk( 15,function(){return h.range(0,1000)} ),dlen)
    dat=h.bulk( dlen,function(){return h.range(0,1000)} )
    for(var i=0;i<dlen;i++)
    { sum+=dat[i] }
    ave=sum/dlen
    
    dsum=0
    for(x=0;x<500;x++)
    { dsum+=Math.abs(avsamp(dat,wlen)-ave)/ave }
    raw+=dsum/500

    h.mixup(dat)

    dsum=0
    for(x=0;x<500;x++)
    { dsum+=Math.abs(avsamp(dat,wlen)-ave)/ave }
    mix+=dsum/500
    
    p.antisort(dat,0,"pos")
    
    dsum=0
    for(x=0;x<500;x++)
    { dsum+=Math.abs(avsamp(dat,wlen)-ave)/ave }
    aso+=dsum/500
  }
    
  console.log("  ",wlen,"    ",(raw/jn).toFixed(4),"    ",(mix/jn).toFixed(4)
             ,"    ",(aso/jn).toFixed(4),"    ",(aso/raw).toFixed(4))
}

return

*/

/////////////////////////


//~ var dat=h.antisort( h.bulk( 100000,function(){return h.irange(0,100)} ) )




//~ if("bob"==="bob") pr("boo")

/*
var ss=0000000
var e=["to","be","or","not","to","be","that","is","the","question"]
var yyy=e.join(" ")
while(ss--){
  h.mixup(e)
  var y=h.antisort(false,e,[],0,3).join(" ")
  //pr(y)	
  if( y===yyy )
  { pr(ss,e); 
    
    var count=0;
    while(h.antisort(false,e,[],0,3).join(" ")!==yyy)
    { count++ }
    pr(count)

  } 
}

//pr(h.antisort(false,["the","be","that","not","to","be","or","is","to","question"],0,3))
*/

rough=Fd.mixof(Fd.bulk( 1000,function(){return Fd.irange(0,10000)} ),1000000)
antiq=Fd.antisort(rough,[])
pr(Fd.aresult())
pr(antiq[0])
return

var uu=[ 10, 20, 30, 40, 50, 60]
var tt=h.antisort(false,uu,[],10,"pos",10)
pr(tt)
pr(uu)
pr("res:",h.aresult())
pr("res:",h.aresult(tt))
return



function compA(Aa,Ab,sq){
  sq=sq||0
  if(Ab){
    console.log("checking elements..")
    for(var i=0;i<Aa.length;i++)
    { var c=Aa[i], p=0,q=0
      for(var i=0;i<Aa.length;i++){
        if(Aa[i]===c) p++
        if(Ab[i]===c) q++
      }
      if(p!=q) console.log(c,"differs")
    }
    console.log("elements checked") 
  }
  
  var df=Infinity
  for(var i=0;i<Aa.length;i++)
  { var c=Math.abs(Aa[i]-(Aa[(i+1)%Aa.length]-sq))
    if (c<df) df=c
  }
  console.log("diff",df)
}
 
 

var nm=[0,1,2,3,4,5,6,7,8,9,10,11,200,-1,-2,-3,-4,-5,-5,-5,-5]

var dfc=[-1,-2,1,-5,-1,-5,-5,-3,-5,-5,-5,-5,-5,11,0,-5,-4,-5,-4,-5,-5,-5,-5,-1,-5,0,1,8,-5,9,11,-5,-5,-5,-5,7,200,9,-5,-5,-5,5,-5,4,-1,2,4,-5,-5,3,1,7,4,9,-5,-5,-5,200,-5,-1,-5,3,9,-5,3,8,200,-5,-5,3,-5,-3,-4,10,1,9,-5,-5,0,-5,8,1,-4,-5,1,-5,11,-5,-3,1,-5,11,1,9,6,1,-5,6,200,5]

var br=po.mixof(nm,20)
var bs=po.mixof(br,1000000)

var sq=1
//~ var t=h.antisort(bs,0,4)
console.log("antisorting:")

for(i=0;i<3;i++)
{ var tt=h.aindex(true,1000) 
  if(!(h.aresult()>0)) pr(h.aresult())
}

//~ var tt=p.antisort(false,bs,[],0,"")
var tt=h.aindex(true,10000)
pr("res:",h.aresult())
pr("res:",h.aresult(tt))
var tt=h.aindex(true,100000)
pr("res:",h.aresult())
pr("res:",h.aresult(tt))
var tt=h.aindex(true,1000000)
pr("res:",h.aresult())
pr("res:",h.aresult(tt))
var tu=h.aindex(false,10000000,1,20)
pr("res:",h.aresult())
pr("res:",h.aresult(tu,1))


//~ compA(tt,bs)
//~ compA(tu,tt,sq)
return


//antisort([premix:boolean,] inArray or length [,outArray=inArray][,orderIncrement=auto][,sep="auto"][,bogoMilliSecTimeout=auto]) returns input array shuffled randomly with sequential elements separated by approx 10% numeric range or by 10% source-index-range if sep="" or data is not finite.

//aindex([premix:boolean,] Array [,orderIncrement=auto][,sep="auto"][,bogoMilliSecTimeout=auto]) returns index of array antisorted by numeric value or element "index" if specified or non numeric . eg. for shuffling a playlist




//~ pr(bs[0],bs[1],bs[2],bs[3],bs[4],bs[5],bs[6],bs[7],bs[8],bs[9])
pr(tt[0],tt[1],tt[2],tt[3],tt[4],tt[5],tt[6],tt[7],tt[8],tt[9])

pr(p.antisort([1,1,2,1,3,2,1,2,2,2,1,2]))
pr(p.antisort([1,1,2,1,3,2,1,2,2,2,1,2]))
pr(p.antisort([1,1,2,1,3,2,1,2,2,2,1,2]))
pr(p.antisort([1,1,2,1,3,2,1,2,2,2,1,2]))


//~ pr(p.antisort(false,[0,1,2,3,4,5,6,7,8,9],1,1.1))
return

 
//~ pr(p.antisort([1,1,2,1,3,2,1,2,2,2,1,2],0,2,1000))
//~ pr(p.antisort([1,1,2,1,3,2,1,2,2,2,1,2],0,2,1000))
//~ pr(p.antisort([1,1,2,1,3,2,1,2,2,2,1,2],0,2,1000))
//~ return
//~ pr(([]>0))
//~ h.aindex(1000,1,"",1000)
//~ pr(h.aresult())
//~ return

//~ pr(h.aindex(20))
//~ pr(h.aindex(20))
//~ pr(h.aindex(20))
//~ pr(h.aindex(100))
//~ 
//~ var t=h.aindex(1000000)
//~ pr(h.aresult())
//~ pr(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9])
//~ return

//antisort(inArray or length,[,outArray=inArray][,source increment=1][,sep=auto][,timeout=auto, set as bogoNanoSecs]) returns input array shuffled randomly with sequential elements moderately separated by approx 10% numeric range or by 10% source index if sep="" or input is nonfinite.


var f=[1,2,3,1,2,3,1,2,3]

//~ pr("original f:",f)
//~ pr("aindex of f:",h.aindex(f))
//~ pr("unchanged f:",f)
//~ pr("antisort of f",h.antisort(f,[]))
//~ pr("aresult",h.aresult())
//~ pr("unchanged f:",f)
//~ pr("antisorted f:",h.antisort(f))
//~ pr("changed f:",f)
//~ f=[1,2,1,2,1,2,1,2]
//~ pr("f is reset")
//~ return

//aindex(in [,"index"][,source increment=1][,sep=auto][,timeout=auto, set as bogoNanoSecs]) returns index of array antisorted by numeric value or element "index" if specified or non numeric . eg. for shuffling a playlist


//~ var v=-1
//~ pr(p.antisort([1,2],v,0.5))
//~ pr(p.antisort([1,2],v,0.5))
//~ pr(p.antisort([1,2],v,0.5))
//~ pr(p.antisort([1,2,3],v))
//~ pr(p.antisort([1,2,3],v))
//~ pr(p.antisort([1,2,3,4,5,6,7,8,9,10],v))
//~ return
//~ 
//~ pr(p.antisort([1,2,3],v,0.5))
//~ pr(p.antisort([1,2,3],v,0.5))
//~ pr(p.antisort([1,2,3],v,0.5))
//~ pr(p.antisort([1,2,3],v,0.5))
//~ pr(p.antisort([1,2,3],v,0.5))
//~ pr(p.antisort([1,2,3,4,5,6],v,0.5))
//~ pr(p.antisort([1,2,3,4,5,6],v,0.5))
//~ pr(p.antisort([1,2,3,4,5,6],v,0.5));return

var nm=[0,1,2,3,4,5,6,7,8,9,10,11,200,-1,-2,-3,-4,-5,-5,-5,-5]

var dfc=[-1,-2,1,-5,-1,-5,-5,-3,-5,-5,-5,-5,-5,11,0,-5,-4,-5,-4,-5,-5,-5,-5,-1,-5,0,1,8,-5,9,11,-5,-5,-5,-5,7,200,9,-5,-5,-5,5,-5,4,-1,2,4,-5,-5,3,1,7,4,9,-5,-5,-5,200,-5,-1,-5,3,9,-5,3,8,200,-5,-5,3,-5,-3,-4,10,1,9,-5,-5,0,-5,8,1,-4,-5,1,-5,11,-5,-3,1,-5,11,1,9,6,1,-5,6,200,5]

var br=po.mixof(nm,18000)
var bs=po.mixof(br,1000000)

//~ var t=h.antisort(bs,0,4)
var t=p.antisort(p.bulk( 100000,function(){return h.irange(0,100)} ),0,undefined,true)
pr(h.aresult())
pr(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9])
return

//~ pr(h.antisort(dfc))
//~ pr(h.mixup(dfc))
var yy=p.mixof(br,50)
var yy2=pp.mixof(br,50)
//~ pr(yy)
//~ pr(q.antisort(yy,[]))
//~ pr()
//~ pr(yy2)
//~ var gg=r.aindex(yy2)

//~ var uu= new Array(gg.length)
//~ for (var e=0;e<gg.length;e++) { uu[e]=yy2[ gg[e] ] }
//~ pr(uu)
//~ pr()
//~ pr(r.aindex(20))
//~ return

pr(p.antisort(q.mixof(br,1000000),0.0000)[0])
p.antisort(q.mixof(br,1000000),0.0000)
p.antisort(q.mixof(br,1000000),0.0000)
bs=p.antisort(q.mixof(br,1000),0,1)
pr(
[bs[0],bs[1],bs[2],bs[3],bs[4],bs[5],bs[6],bs[7],bs[8],bs[9],
bs[10],bs[11],bs[12],bs[13],bs[14],bs[15],bs[16],bs[17],bs[18],bs[19]]
)

var rr=p.aresult()
pr(rr)
//~ pr(h.antisort(bs))

return


h.antisort( h.bulk( 100000,function(){return h.irange(0,100)} ) )


//~ pr(h.antisort(bg))
//~ pr(h.fill(10,h.f48))
//~ pr(h.fill([0,0],function(){return h.rpole()*2},1))
//~ pr(h.mingle(nm,3))


return



//eg. make a random uuid: 
var instr="0123456789abcdef"

UUIDv4 = h.mixof(instr,8) +
   "-" + h.mixof(instr,4) + 
   "-4"+ h.mixof(instr,3) +
   "-" + h.mixof(instr,h.mixof("wxyz",1),3) +
   "-" + h.mixof(instr,12); 
pr(UUIDv4)
//~ var po= h.mixup([1,2,3,4,5],3,4)

var hh=[1,2,3,4,5,6,7,8]
pr("inmix",h.mixup(hh,[]),hh)
pr("inmix",h.mixup(hh),hh)
pr("inmix",h.mixup(hh,[]),hh)
pr("inmix",h.mixup(hh),hh)
pr("inmix",h.mixup(hh,4),hh)
pr("inmix",h.mixup(hh,4),hh)

pr();pr("up out")
pr(h.mixup("123456789"    ,"",3))
pr(h.mixup("123456789"    ,"x",3))
pr(h.mixup("123456789"    ,["x"],3))
pr(h.mixup("123456789"    ,["x"]))
pr(h.mixup("123456789"    ,"x"))
pr(h.mixup([1,2,3,4,5,6,7,8,9],"",3))
pr(h.mixup([1,2,3,4,5,6,7,8,9],"x",3))
pr(h.mixup([1,2,3,4,5,6,7,8,9],["x"],3))
pr(h.mixup([1,2,3,4,5,6,7,8,9],["x"]))
pr(h.mixup([1,2,3,4,5,6,7,8,9],"x"))

pr();pr("up no-out")
pr(h.mixup([1,2,3,4,5,6,7,8,9]))
pr(h.mixup("123456789"))
pr(h.mixup("123456789"    ,3))
pr(h.mixup("123456789"    ,3,6))
pr(h.mixup([1,2,3,4,5,6,7,8,9],3))
pr(h.mixup([1,2,3,4,5,6,7,8,9],3,6))

pr();pr("of out")


//mixof (in,[out=intype],[n=1],[in_st=0],[in_fn=len])
//mixup (in,[out=in],[in_st=0],[in_fn=len])

pr(h.mixof("123456789"    ,"",3))
pr(h.mixof("123456789"    ,"",3,6))
pr(h.mixof("123456789"    ,"x",3))
pr(h.mixof("123456789"    ,"x",3,6))
pr(h.mixof("123456789"    ,["x"],3))
pr(h.mixof("123456789"    ,["x"],3,6))
pr(h.mixof("123456789"    ,["x"]))
pr(h.mixof([1,2,3,4,5,6,7,8,9],"",3))
pr(h.mixof([1,2,3,4,5,6,7,8,9],"",3,6))
pr(h.mixof([1,2,3,4,5,6,7,8,9],"x",3))
pr(h.mixof([1,2,3,4,5,6,7,8,9],"x",3,6))
pr(h.mixof([1,2,3,4,5,6,7,8,9],["x"],3))
pr(h.mixof([1,2,3,4,5,6,7,8,9],["x"],3,6))
pr(h.mixof([1,2,3,4,5,6,7,8,9],["x"]))
pr(h.mixof([1,2,3,4,5,6,7,8,9]),[])
pr(h.mixof([1,2,3,4,5,6,7,8,9]),"")
pr(h.mixof([1,2,3,4,5,6,7,8,9]))
pr(h.mixof([1,2,3,4,5,6,7,8,9]))
pr(h.mixof([1,2,3,4,5,6,7,8,9]))
pr(h.mixof([1,2,3,4,5,6,7,8,9]))
pr(h.mixof([1,2,3,4,5,6,7,8,9],4))

pr();pr("of no-out")

pr(h.mixof("123456789"    ,3))
pr(h.mixof("123456789"    ,3))
pr(h.mixof("123456789"    ,3))
pr(h.mixof([1,2,3,4,5,6,7,8,9],3))
pr(h.mixof([1,2,3,4,5,6,7,8,9],3))
pr(h.mixof([1,2,3,4,5,6,7,8,9],3))

return
