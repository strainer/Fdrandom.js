require ('../dlib/mutil.js')
//~ Fdrandom=require ('../Fdrandom.min.js')
Fdrandom=require ('./autoproto.js')
require ('../dlib/Testprngs.js')
require ('../dlib/floatpresc.js')

h=Fdrandom.hot()

p=Fdrandom.pot()
pp=Fdrandom.pot()
po=Fdrandom.pot()
q=Fdrandom.pot()
r=Fdrandom.pot()

//~ var v=1
//~ pr(p.antisort([1,2],v,0.5))
//~ pr(p.antisort([1,2],v,0.5))
//~ pr(p.antisort([1,2],v,0.5))
//~ pr(p.antisort([1,2,3],v,0.5))
//~ return
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

var br=po.mixof(nm,18)
var bs=po.mixof(br,1000000)
//~ pr(h.antisort(dfc))
//~ pr(h.mixup(dfc))
var yy=p.mixof(br,50)
var yy2=pp.mixof(br,50)
pr(yy)
pr(q.antisort(yy,[]))
pr()
pr(yy2)
var gg=r.aindex(yy2)

var uu= new Array(gg.length)
for (var e=0;e<gg.length;e++) { uu[e]=yy2[ gg[e] ] }
pr(uu)
pr()
pr(r.aindex(20))
return

p.antisort(q.mixof(br,1000000),0.0000)
p.antisort(q.mixof(br,1000000),0.0000)
p.antisort(q.mixof(br,1000000),0.0000)
bs=p.antisort(q.mixof(br,10000000),1,0)
pr(
[bs[0],bs[1],bs[2],bs[3],bs[4],bs[5],bs[6],bs[7],bs[8],bs[9],
bs[10],bs[11],bs[12],bs[13],bs[14],bs[15],bs[16],bs[17],bs[18],bs[19]]
)
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
