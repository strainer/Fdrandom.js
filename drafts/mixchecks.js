require ('../dlib/mutil.js')
//~ Fdrandom=require ('../Fdrandom.min.js')
Fdrandom=require ('../Fdrandom.js')
require ('../dlib/Testprngs.js')
require ('../dlib/floatpresc.js')


//eg. make a random uuid:
var instr="0123456789abcdef"
h=Fdrandom.hot()
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
