require ('../dlib/mutil.js')
Fdrandom=require ('../Fdrandom.min.js')

h=Fdrandom.hot()

function avsamp(A,s)
{ sm=0; n=A.length; w=h.irange(0,n-s)
	for(i=0;i<s;i++) sm+=A[w+i]
	return sm/s
}

console.log("Mean error sampling (of mean)")
console.log("window-len  rand-smp-err  asort-win-err  aw/rs%")

dlen=10000,jn=100
for(wlen=1; wlen<10000; wlen=wlen+1+(wlen/5)|0+((wlen*Math.sqrt(wlen+40)/40)|0))
{
  raw=0,aso=0,mix=0
  for(j=0;j<jn;j++){
  
    sum=0
    dat=h.mixof(h.bulk( 150,h.range,0,1000 ),dlen)
    dat.sort(function(a, b){return a-b})
    det=h.mixup(dat,[])
    
    for(var i=0;i<dlen;i++)
    { sum+=dat[i] }
    ave=sum/dlen
    
    dsum=0
    for(x=0;x<500;x++)
    { dsum+=Math.abs(avsamp(det,wlen)-ave)/ave }
    raw+=dsum/500
    
    h.antisort(dat,0)
    
    dsum=0
    for(x=0;x<500;x++)
    { dsum+=Math.abs(avsamp(dat,wlen)-ave)/ave }
    aso+=dsum/500
  }
    
  console.log("  ",wlen
             ,"       ",(raw/jn).toFixed(4)
             ,"      ",(aso/jn).toFixed(4)
             ,"      ",(aso*100/raw).toFixed(1)
             )
}
