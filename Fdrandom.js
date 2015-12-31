// Fdrandom.js - Fast deterministic random lib
/** @author Andrew Strain
 ** This is free and unencumbered software released into the public domain 
 ** in homage to human ingenuity against greed and hatred.
 */

var newFdrPot = function(){ return (function(){
  'use strict'

  var va,vl,vs,qr,us,rb,ju,U,sv,i
  plant(arguments) 
  sv=getstate()
  
  function plant(sd) {
    va=0; vl=1; vs=1; qr=0.0; us=0.0; rb=1.0e+15
    ju=1; U=[ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8 ]

    sow(arguments)
    
    for( i=0;i<98;i++ ) f48()
    va=irange(3206324,3259829)

    function sow(sd) {
      if(isFinite(sd)){ 
        i= (sd<=0)? Math.abs(sd)+1.23 : sd 
        while(i>16)     i=i*0.0019560471624266144
        while(i<1.0e-4) i=i*511.11110111111111111
        U[0]=i; f48()
        return
      }
      if(typeof sd === 'string'){
        for( i=0; i<sd.length; i++ )
        {  U[0]=( 65537-sd.charCodeAt(i) )/6464; f48() }
        return 
      }
      if((sd||i).length)
      {  for( i=0; i<sd.length; i++ ) sow(sd[i]); return }
       
      U[0]= U[0]*0.33 + 4.4 ; f48()
      return 
    }
  }

  function setstate(s) {
    for( var i=0;i<8;i++ ) U[i]=s[i]
    ju=s[8];  va=s[9];  vl=s[10] 
    vs=s[11]; qr=s[12]; us=s[13]; rb=s[14]; sv=s
  }

  function getstate() {
    return [ U[0],U[1],U[2],U[3],U[4],U[5],U[6],U[7], 
             ju, va, vl, vs, qr, us, rb ] 
  } 

  function pot() { return newFdrPot(arguments) }
  
  function repot(s) { 
    if (s) { plant(s) } else { setstate(sv) }
    return this 
  }
  
  function hot() {
    var glob=(1,eval)
    if(arguments.length===0 
     && typeof glob.FdrandomEntropy !== 'undefined'){ 
      return glob.FdrandomEntropy 
    }
    if(typeof(window)!=='undefined' 
     && (window.crypto||window.msCrypto)){ 
      var cO = window.crypto||window.msCrypto
      var ag=[cO.getRandomValues(new Uint32Array(8))] 
    }else{
      ag=[(new Date()).getTime()-1.332e+12, Math.random()] 
    }
    ag.push(arguments)
    return glob.FdrandomEntropy = newFdrPot(ag)
  }

  ///A redesign of J.Baagøe's Alea; a float-cut dual-lcg prng
  function f48() { 
    var c= 0.12810301030196883 * U[0] +
           15.378612015061215 * (1.0000000000000037-U[ju=(ju===7?1:ju+1)])
    return U[ju]= c-( (U[0]=c)>>>0 )
  }
  
  function dbl() { 
    return ( (( ((f48()*0x39b00000000)>>>4)*
            0.06249999650753)+f48())*5.960464477540047e-08 )
  }
  
  function f24() { return f48()*0.99999997019767 }

  function range(b,d)  { return ( f48()*(d-b) ) +b }
  
  function irange(b,d) { return Math.floor( (f48()*(d-b+1) )+b ) }
    
  function i32()  { return (f48()*0x1700000000)|0 }

  function ui32() { return (f48()*0x1700000000)>>>0 }
  
  function rbit() { 
    if( (rb*=2)>1.0e+15 ) rb= f48() +0.5 
    return rb&1
  }

  function rpole() { 
    if( (rb*=2)>1.0e+15 ) rb= f48() +1.5
    return (rb&2)-1
  } 
  
  function ilcg() ///flat lcg 
  { return vl = (vl*13229323)^3962102927  }

  function ishr2() ///flawed shift register
  { va^= (va<<7)+1498916339; return va^= va>>>8  }

  function uigless() 
  { return (( ui32()&ui32() )>>>0)  }
  function uigmore() 
  { return (( ui32()|ui32() )>>>0)  }
  function igbrist() 
  { return (( ui32()&ui32() )>>1) + (( ui32()|ui32() )>>1)  }
  function igmmode() 
  { return (( ui32()&ui32() )>>1) - (( ui32()|ui32() )>>1)  }
  
  function fgthorn(b,d){ 
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d
    return b+ (d-b)* 0.5* (1+ (f48()-f48())*f48() ) 
  }
  function fgwedge(b,d){ 
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d
    return b+ (d-b)* 0.5* 
    (1+ (Math.abs(f48()-f48())-Math.abs(f48()-f48()))) 
  }
  function fgnorm(b,d){
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d
    return b+ (d-b)* 0.2* (f48()+f48()+f48()+f48()+f48())
  }
  function fgteat(b,d){
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d
    return b+ (d-b)* 0.5* (0.5 + (0.5-f48())*f48()+f48()) 
  }
  function fgtrapez(b,d){
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d 
    return b+ (d-b)* (0.5+ 0.333333* (0.5+f48()-f48()*2)) 
  }
  function fgskip(c) ///simple low discrepancy 
  { qr+= ( c=c||f48()*0.666 )*0.5; qr+=(1-c)*f48(); return qr-= qr>>>0; }
  
  var psig,csig
  function usum(n,sig,mu) { 
    var sum= (((n=n||2)&1)==1)? 0.5 : 0
    for( var i=0;i<n;i++ ) sum=f48()-sum 
    
    if(sig === undefined) return sum
    if(sig !== psig) 
    {  psig=sig; csig= sig*2/n*Math.sqrt(n) } //doesnt nail it
    //sig wants converted to equivalent gaus for large n
    
    return (mu||0)+ sum*csig 
  }

  function gaus(sig,mu) { return nrml(f48,sig,mu) }
  
  function gausx(sig,mu){ return nrml(dbl,sig,mu) }
  
  var nml=0,havnml=0
  
  function nrml(func,sig,mu) /// G Marsaglias box muller polar method
  { var p,q,w
  
    if(havnml){ 
      havnml=0
      if(sig === undefined) return nml
      return nml*sig+(mu||0) 
    }else{
      do {
        p= 2*func()-1; q= 2*func()-1
        w= p*p + q*q
      } while( w>=1 )

      w = Math.sqrt(( -2.0*Math.log(w) ) /w)
      nml = p*w; havnml=1
      
      if(sig === undefined) return q*w 
      return q*w*sig+(mu||0);
    }
  }

  function mixof(Ai,Ao,od,c,e) {
    var joinr=1,So="",ob=0
    if(typeof Ai ==='string'){ Ai=Ai.split("") } else { joinr=0 }
    
    if(typeof Ao !=='number'){ 
      if(Ao === undefined){ od=1; Ao=[] }
      else{
        ob=Ao.length
        if(typeof Ao ==='string'){ 
          So=Ao; ob=0; joinr=1 
        } else joinr=0
        if(ob===0) Ao=new Array(od||0) 
      }
    }else{ 
      e=c; c=od; od=Ao||0; Ao=new Array(od) 
    }
    
    od+=ob
    c= c||0
    e= e||Ai.length-1 ; e++
    
    for( var i=ob;i<od;i++ ){
      Ao[i]= Ai[ c+( f48()*(e-c) )>>>0 ] 
    }
  
    return joinr? Ao=So+Ao.join("") : Ao
  }

  function mixup(Ai,Ao,c,e) {
    var joinr=0, So="", ob=0, i=0
    if(typeof Ai ==='string'){ Ai=Ai.split(""); joinr=1 }
    
    if(typeof Ao !=='string' && typeof Ao !=='object' ) 
    {  e=c; c=Ao; Ao=Ai }
    
    c= c||0
    e= e||Ai.length-1 ; e++
    
    if(typeof Ao ==='string'){
      So=Ao; joinr=1
      Ao=new Array(e-c); e-=c
      for( i=0;i<e;i++ ) Ao[i]= Ai[i+c]
      c=0; 
    }else{ //Ao is given array
      joinr=null
      ob=Ao.length

      if(ob===0) Ao=new Array(e-c)
      var jc=c-ob
      for( i=ob; i<ob+e-c; i++) Ao[i]= Ai[jc+i]
      c=ob; e=Ao.length;
    }

    var d,p,ep=e-1
    while( c<ep ){
      d= Math.floor( c+( f48()*(e-c) ) ) 
      p= Ao[c]; Ao[c++]=Ao[d]; Ao[d]=p
    }
  
    return joinr? Ao=So+Ao.join("") : Ao
  }
    
  return{
    pot: pot,  hot: hot,  repot:repot, 
    getstate: getstate,  setstate: setstate,
    
    next: f48,  f48: f48,  f24: f24, dbl: dbl, fxs: dbl, 
    i32: i32,  ui32: ui32,
    rbit: rbit, rndbit:rbit, rpole: rpole, rndsign:rpole,
    range: range,  irange: irange,
    
    gaus: gaus,  gausx: gausx,  usum: usum ,
  
    mixup: mixup,  mixof: mixof,
    ilcg: ilcg,  ishr2: ishr2,
    
    uigless: uigless,  uigmore: uigmore, 
    igbrist: igbrist,  igmmode: igmmode, 
    
    fgwedge: fgwedge,  fgtrapez: fgtrapez, fgnorm:fgnorm,
    fgthorn: fgthorn,  fgskip: fgskip, fgteat:fgteat
    
  }

}(arguments))}

//Export for node, amd, commonjs or global object
if (typeof exports !== 'undefined') 
{ if (typeof module !== 'undefined' && module.exports)
  { exports = module.exports = newFdrPot() }
  exports.Fdrandom = newFdrPot()
} else {
  if (typeof define === 'function' && define.amd) 
  { define( 'Fdrandom',[],function(){return newFdrPot()} ) }
  else
  { (1,eval)('this').Fdrandom = newFdrPot() } 
}