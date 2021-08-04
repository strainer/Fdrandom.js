 // Fdrandom.js - Fast deterministic random methods
/** @author Andrew Strain
 ** This is free and unencumbered software released into the public domain 
 ** in small tribute to human ingenuity against greed and destruction.
 */

var newFdrandom = function(){ //factory
  
  var FdrHotPot    //a static instance for indeterminables

  return (function(sd){ 
  'use strict'
  
  var sqrt=Math.sqrt,abs=Math.abs
  var nml,va,vl,qr,qg,rb,ga,gb,ua,ub,uc,us,ju,U,sv,i
  
  plant(sd) 
  
  sv=getstate()
    
  function plant(sd) {   //constructor
        
    va=1000, vl=1, ga=3, gb=4, nml=qr=qg=ua=ub=uc=-0, us=-0.1, rb=2.0e+15
    ju=1, U=[ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8 ]

    sow(sd)
    
    for( i=0;i<98;i++ ) f48()    //warms up state to hide seed
    va=irange(3206324,3259829)   //ishr2's seed
    
    // fillr constants coordinated for r2
    ua=0.5+U[0]*0.75487766624669
    ub=0.5+U[0]*0.56984029099805
    ua=ua-(ua>>>0) ; ub=ub-(ub>>>0) 
    
    function sow(sd) {      //digests seed objects recursively
      var t=typeof(sd) , r 
      
      if(t === 'string'){
        t=sd.length; if(t>va*100){ t=va*100; va-- }
        for( r=0; r<t; r++ )
        {  U[0]=( U[0]+65537-sd.charCodeAt(r) )/6474.10101; f48() }
        return 
      }
      
      if(va<0){ return }    //va used to count out the process
      
      if(t === 'object')
      { va--
        if(sd.constructor === Array)
        { U[0]*=0.95; for( r=0; r<sd.length; r++ ){ sow(sd[r]) } return }
        if(sd === null) { U[0]*=0.97; return }
        U[0]*=0.93;
        for(r in sd) if(sd.hasOwnProperty(r)){ sow(r);sow(sd[r]) } 
        return 
      }
      
      if(t === 'boolean') { U[0]*=0.93; if(sd){ f48() } return }

      if(isFinite(sd)){
        r= sd<=0? 1.234020348919-sd : sd 
        r= modp(r,15.034271450894242661)
        U[0]=U[0]*0.1 + r*0.8999999; f48() 
        return
      }
   
      if(t === 'function'){ U[0]*=0.91; sow(sd.name); return }
      if(t === 'symbol')  { U[0]*=0.89 }

      f48(); return 
    }
  }

  function checkfloat() 
  { var p=newFdrandom([3,2],2450,"~fez",{c:0.1})
    for( i=0;i<1000000;i++ ){ p.dbl() }
    return p.dbl() === 0.6630336428202791
  }

  function getstate() {
    return [ U[0],U[1],U[2],U[3],U[4],U[5],U[6],U[7] 
            ,ju, va, vl, qr, qg, rb, ga, gb, ua, ub, uc, us, nml ] 
  } 
  
  function setstate(s) {
    for( i=0;i<8;i++ ) U[i]=s[i]
    ju=s[8];  va=s[9];  vl=s[10]; qr=s[11]; qg=s[12]; rb=s[13]; 
    ga=s[14]; gb=s[15]; ua=s[16]; ub=s[17]; uc= s[18]; us=s[19];
    nml=s[20]; sv=s
  }

  function pot() { return newFdrandom(arguments) }
  
  function repot(s) { 
    if (s===undefined) { setstate(sv) } else { plant({"0":{"0":s}}) }
    return this 
  }
  
  function hotpot() {
    if(typeof(window)!=='undefined' 
     && (window.crypto||window.msCrypto)){ 
      var cO = window.crypto||window.msCrypto
      var ag=[cO.getRandomValues(new Uint32Array(8))] 
    }else{
      ag=[(new Date()).getTime()-1.332e+12, Math.random()] 
    }
    ag.push(arguments)
    return newFdrandom(ag)
  }

  function hot() {
    if(!FdrHotPot){ FdrHotPot=hotpot() }
    return FdrHotPot
  }
    
  ///A modified J.Baagoe's Alea; float cast dual lcg prng
  function f48() { 
    var c= 0.12810301030196883 * U[0] +
           15.378612015061215 * (1.0000000000000037-(U[ju=(ju===7?1:ju+1)]))
    return U[ju]= c-( (U[0]=c) >>>0 )
  } //20 msb of the magic numbers were mined with scanrandom.js

  function dbl() { 
    return ( (( ((f48()*0x39b00000000)>>>4)* //saves 4bits of entropy
            0.06249999650753)+f48())*5.960464477540047e-08 )
  } 
  
  function f24() { return f48()*0.99999997019767 }

  function range(b,d)  { return ( f48()*(d-b) ) +b }
  
  function irange(b,d) { return Math.floor( (f48()*(d-b+1) )+b ) }
    
  function i32()  { return (f48()*0x1700000000)|0 }

  function ui32() { return (f48()*0x1700000000)>>>0 }
  
  function rbit() { 
    if( rb<2147483648 ) return (rb*=2)&1 
    return (rb= dbl() +0.5) &1 
  }
  function rpole() { 
    if( rb<2147483648 ) return ((rb*=2)&2)-1
    return ( (rb= dbl() +1.5) &2) -1
  } 
  
  function ilcg(){ ///flat lcg , bugged cycle
    return vl = (vl*13229323)^3962102927
  }
  function ishr2(){ ///flawed shift register
    va^= (va<<7)+1498916339; return va^= va>>>8
  }
  function ishp(){ ///the two combined for interest
    vl = (vl*13229323)^3962102927
    return vl^((vl<<7)+1498916339) 
  }
    
  function uigless() ///odd integer prngs
  { return (( ui32()&ui32() )>>>0)  }
  function uigmore()
  { return (( ui32()|ui32() )>>>0)  }
  function igbrist()
  { return (( ui32()&ui32() )>>1) + (( ui32()|ui32() )>>1)  }
  function igmmode()
  { return (( ui32()&ui32() )>>1) - (( ui32()|ui32() )>>1)  }
  
  function lrange(a,b,d){ return vrange(b,d,a) } //old param version
  
  function vrange(b,d,a){ //default -1 to 1
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d
    a= (a===undefined)?0.5:a
    if(a>0.5){  //load middle of dist
      if (f48()>a*2-1) return f48()*(d-b) +b //return flat
    }else{      //load the ends
      if (f48()<a*2) return f48()*(d-b) +b   //return flat
    }
    var c=(f48()*1.333+f48()+f48()*0.66666)*0.3333333-0.5
    c= (a>0.5)?c: (c>0)?0.5-c:-0.5-c   //transform if load ends
    return b+ (d-b)* (c+0.5)
  }

  function zrange(b,d,c){ ///a fluctuating combination of distributions 
                           
    c= (c===undefined)?1:Math.sqrt(c)
    var dists=[gbowl,gbands,gtrapez,gnorm,gcauchy,ghorn] 

    var e=f48(),x=us*0.001 ,cf=c*0.002  //us is 0>1000 
    
    if(us>1000){ //gb was strong, becomes ga
      us=modp(us,1000) ,ga=gb ,ua=ub
      if(ga>7){gb=irange(0,7)}else{gb=irange(0,9)}
      ub=f48()	
    }else{      //ga was strong
      if( us<0 ){
        if(ga<0){ ga=irange(0,8); ua=f48() }
        us=modp(us,1000) ,gb=ga ,ub=ua
        if(gb>7){ga=irange(0,7)}else{ga=irange(0,9)}
        ua=f48()
      }
    }

    us+=(e-0.3333)*c
    ua+=(f48()-0.5)*cf
    ua=ua>1?1:ua<0?0:ua
    ub-=(f48()-0.5)*cf
    ub=ub>1?1:ub<0?0:ub

    if(ga<6){ var gaa=dists[ga](-1+ua,ua) }
    else{
      if(ga<8){ gaa=gskip(0,-1+ua,ua) }
      else{ gaa=vrange(-1+ua*0.85 ,ua*0.85+0.15 ,ub*0.7) }
    }
    
    if(gb<6){ var gbb=dists[gb](-1+ub,ub) }
    else{
      if(gb<8){ gbb=qskip(-1+ub,ub,0.5) }
      else{ gbb=vrange(-1+ub*0.85 ,ub*0.85+0.15 ,ua*0.7) }
    }
    
    return ufit(b,d, (gbb*x -gaa*x + gaa)*0.5+0.5 )
  }

  function ufit(b,d,x){
    b= b===undefined?0:b
    return b+x*( (d===undefined?1:d)-b ) 
  }
  function wfit(b,d,x){
    b= b===undefined?-1:b 
    return b+x*( (d===undefined?1:d)-b ) 
  }

  function qskip(b,d,c){
    qr+= ( c=c||f48()*0.66666666 )*0.5; qr+=(1-c)*f48() 
    return ufit(b,d, qr-= qr>>>0) 
  }
  function gskip(c,b,d){
    qg+= ( c=c||f48()*0.66666666 )*0.5; qg+=(1-c)*f48() 
    return ufit(b,d, qg-= qg>>>0) 
  }
  function qxskip(b,d,c){
    c= (c===undefined)?0.5:c
    return (qskip(b,d,c)+gskip(c,b,d))*0.5
  }
  
  function qhop(b,d,c){
    c=c||f48()*0.5
    qr+= c*0.5 + (1-c)*f48() 
    var x= qr-= qr>>>0
    qr+= c*0.5 + (1-c)*f48()
    return ufit(b,d, (1+x- (qr-= qr>>>0))*0.5 )
  }
  function qtrip(b,d,c){
    c= (c===undefined)?0.5:c
    var g=c*0.5
    qr+=(1-c)*f48()+g ; var x= qr-= qr>>>0
    qr+=(1-c)*f48()+g ; x-= qr-= qr>>>0
    qr+=(1-c)*f48()+g ; x+= qr-= qr>>>0
    qr+=(1-c)*f48()+g ; x-= qr-= qr>>>0

    d= (d===undefined)?1:d 
    return ufit(b,d, x*0.3333333333+0.5)
  }
  function dev2(b,d){ //!
    var c = sqrt(f48())+sqrt(f48())
    return ufit(b,d, (1.333333333-c)*0.75)
  }
      
  function ngrad(b,d){
    var c=f48()*0.5
    c = sqrt(sqrt(c)) + 0.21*c*c*sqrt(c) 
    return ufit(b,d,  1-c*1.138926841352 )
  }

  function gnorm(b,d){
    var h=false,c=f48()
    if(c>0.5) c=1-c ,h=true 

    c = sqrt(sqrt(c)) + 0.21*c*c*sqrt(c)
    
    return wfit(b,d,  (h? c:1.756039042532-c )*0.569463420676 )
  }
    
  function gskew(b,d){
    return ufit(b,d, (1.333333333-(sqrt(f48())+sqrt(f48())))*0.75 )
  }

  function gspill(b,d,p){
    p= (p===undefined)? 1:p*p*4
    return ufit(b,d, (f48()*p)/(f48()+p))
  }
  
  function ggrad(b,d){
    return ufit(b,d,  1-sqrt(f48()) )
  }

  function gthorn(b,d){ 
    return wfit(b,d, 0.5* (1+ (f48()-f48())*f48() ) ) 
  }
  function gwedge(b,d){ 
    return wfit(b,d, 0.5*(1+ (abs(f48()-f48())-abs(f48()-f48())))) 
  }
  function gcauchy(b,d){
    var c=gnorm(); c=abs(c)<0.0625? rpole()*0.5:c
    return wfit(b,d,  0.5 + 0.03125*gnorm()/c ) 
  }

  function ghorn(b,d){
    var c=f48()
    if( c>0.5) c= sqrt(sqrt(1-c))
    else c =1.6817928305074-sqrt(sqrt(c))
    return wfit(b,d,  c*0.59460355750137 )
  }
  
  function gbands(b,d){
    var c=f48()
    if(c>0.842105263) c-=0.2631578947
    if(c>0.47368421) c-=0.4210526316   //max 0.47368421
    return wfit(b,d, c*2.1111111134) 
  } 

  function gbowl(b,d){
    var h=false,c=f48()
    if(c>0.5) c=1-c ,h=true 
    c = sqrt(sqrt(c))
    
    return wfit(b,d, (0.840896415253+(h? c:-c))*0.5946035575)
  }
   
  function gpick(b,d,p){
    p= (p===undefined)?-0.4:p
    var pop=1.4142135623731+0.5*p //2*sqrt(sqrt(0.5))+0.5*0.5*sqrt(0.5)*2*p

    var h=false,c=f48() 
    if(c>0.5) c=1-c ,h=true 

    c = sqrt(c) + p*c*c 
    return wfit(b,d, (h? c:pop-c )/pop )
  }
     
  function gteat(b,d){
    return wfit(b,d, 0.5* (0.5 + (0.5-f48())*f48()+f48())) 
  }
  function gtrapez(b,d){
    return wfit(b,d, 0.5+0.33333333*(0.5+f48()-f48()*2)) 
  }
 
  /// fill sequences of Martin Roberts. extremelearning.com.au
  function fillr1(b,d){
    ua+=0.61803398874989 
    return wfit(b,d, ua-=ua>>>0) 
  }
  
  function fillr2(b,d){
    b=(b===undefined)?-1:b; d=(d===undefined)?1:d;

    ua+=0.75487766624669 ; ua-=ua>>>0
    ub+=0.56984029099805 ; ub-=ub>>>0 
    return [ (ua*(d-b))+b , (ub*(d-b))+b ]
  }

  function fillr3(b,d){
    b=(b===undefined)?-1:b; d=(d===undefined)?1:d;

    if(uc==-0.1){ //must init state for 3d 
      ua=U[0]+U[1]*0.81917251339616
      ub=U[0]+U[1]*0.67104360670379
      uc=U[0]+U[1]*0.54970047790197
      ua=ua-(ua>>>0) ; ub=ub-(ub>>>0) ; uc=uc-(us>>>0) 
    } 
    ua+=0.81917251339616 ; ua-=ua>>>0
    ub+=0.67104360670379 ; ub-=ub>>>0
    uc+=0.54970047790197 ; uc-=uc>>>0
    
    return [ (ua*(d-b))+b, (ub*(d-b))+b, (uc*(d-b))+b ]
  } 
  
  var psig,csig
  function usum(n,scale,mean) { 
    var sum= (((n=n||2)&1)==1)? 0.5 : 0
    for( var i=0;i<n;i++ ) sum=f48()-sum 
    
    if(scale === undefined) return sum
    if(scale !== psig) //cache csig value for scale 
    {  psig=scale; csig= scale*3.47/sqrt(n) } //approx 1/100th accurate
    
    return (mean||0)+ sum*csig 
  }

  function gaus(scale,mean) { return nrml(f48,scale,mean) }
  
  function gausx(scale,mean){ return nrml(dbl,scale,mean) }
  
  function cauchy(scale,mean){ return (mean||0)+(scale||1)*nrml(f48)/(nrml(f48)||0.5) }
  
  function nrml(func,scale,mean) /// G Marsaglias box muller polar method
  { var p,q,w
  
    if(nml){ 
      q = nml ; nml=0
      if(scale) return q *scale +(mean||0)
      return q
    }else{
      do {
        p= 2*func()-1; q= 2*func()-1
        w= p*p + q*q
      } while( w>=1 )

      w = sqrt(( -2.0*Math.log(w) ) /w)
      nml = p*w
      
      if(scale) return q*w*scale+(mean||0)
      return q*w 
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
        if(ob===0) Ao=new Array(od||1) 
      }
    }else{ 
      e=c; c=od; od=Ao||1; Ao=new Array(od) 
    }
    
    od =(od||1)+ob
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
    { e=1+(c||(Ai.length-1)) ; c=Ao||0; Ao=Ai }
    else
    { c= c||0 ; e= 1+(e||(Ai.length-1))
      if(typeof Ao ==='string'){
        So=Ao; joinr=1
        Ao=new Array(e-c); e-=c
        for( i=0;i<e;i++ ) Ao[i]= Ai[i+c]
        c=0; 
      }else{
        joinr=null
        ob=Ao.length

        if(ob===0) Ao=new Array(e-c)
        var jc=c-ob
        for( i=ob; i<ob+e-c; i++) Ao[i]= Ai[jc+i]
        c=ob; e=Ao.length
      }
    }

    var d,p,ep=e-1
    while( c<ep ){ 
      d= Math.floor( c+( f48()*(e-c) ) ) 
      p= Ao[c]; Ao[c++]=Ao[d]; Ao[d]=p
    }
  
    return joinr? Ao=So+Ao.join("") : Ao
  }
      
  function aindex(mx,Ai,sq,sep,lim,x){  //Behold....
    var Av,i
    if( typeof mx !=='boolean')
    { x=lim,lim=sep,sep=sq,sq=Ai,Ai=mx,mx=true }
    if( typeof Ai !=='object' || (isNaN(parseFloat(Ai[0])) || !isFinite(Ai[0]))
     ||(typeof sep ==='string' && sep==="pos")){ 
      Av= new Array((Ai>0)?Ai:Ai.length)
      if( typeof sq ==='undefined') sq=1
      if(sep ==="pos"){ sep=lim,lim=x }
      for( i=0;i<Av.length;i++ ) Av[i]=i
    }else{ Av=Ai,sq=sq||0 }
    
    var ne=Av.length, nc=ne>50?50:ne-1, nd=ne>350?350:ne-1

    var Ax= new Array(ne); for(var i=0;i<ne;i++) Ax[i]=i
        
    if(ne<1) return Ax   //handle diminutive arrays
    if(mx) mixup(Ax)
    if(ne==2){ 
      if ((sq<0)^(Av[Ax[1]]>Av[Ax[0]]))
      { return [Ax[1],Ax[0]] }else{ return Ax } 
    }
         
    var autosep=false, bsep=(sep===0)?"zero":sep, csep=sep*0.5
    if( typeof sep ==='undefined' || sep==="auto" ){ 
      var kd=0, np=(ne*0.33)|0, nq=1+(ne*0.66)|0 
      for( i=0;i<nd;i++){
        kd+=abs(Av[i]-Av[(np+i)%ne])
          + abs(Av[(np+i)%ne]-Av[(nq+i)%ne])
          + abs(Av[(ne+nq-i)%ne]-Av[(ne-i)%ne]) 
      } 
      autosep=true, sep=bsep=kd/(nd*10), csep=sep*0.5
    }
    if(ne<10) autosep=false
    if(!lim){ lim=(ne+500000)*0.001 }
    var ti=lim*8000, te=ti*0.3 
    
    var t=0, j=0, jr=0, jm=0, c=irange(1,ne-1), ch=ne+3, jm=0, lw=false
    
    while( ch>0 && ti>0 ) { 
      
      var ib=modp((c=c<0?c+ne:c),ne), ic=ib+1, id=ib+2, ie=ib+3
      if(ie>=ne){ ie=ie-ne,id=modp(id,ne),ic=modp(ic,ne) }
      
      var stick=0 ,d=1 
      
      if(autosep){ sep=bsep*range(0.83333,1.2),csep=sep*0.5 }

      if(abs(Av[Ax[ic]]-Av[Ax[id]]+sq)<sep){  //1-away collision 
        jm=irange(2,nd)+ic, jr=jm+nc, stick=1, d=-2, lw=ti<te
        while ( stick && jm<jr ){ 
          j=modp(jm,ne) 
          if( abs(Av[Ax[id]]-Av[Ax[j]]+sq)>=sep 
           && abs(Av[Ax[(j+1)%ne]]-Av[Ax[ic]]+sq)>=sep
           && (lw || abs(Av[Ax[ie]]-Av[Ax[j]]+sq)>=csep) 
          ){ 
            stick=0, t=Ax[ic], Ax[ic]=Ax[j], Ax[j]=t 
            if(jm-ic+2>ch){ ch=jm-ic+2 }
          }
          jm++;
        } 
        var f=(jm-jr+nc)*0.5; ti-=f
        if(stick){ t=Ax[ib], Ax[ib]=Ax[ic], Ax[ic]=t }
        if(autosep) { bsep*= (66-((f-2)/nc))*0.0151466 } 
        
      }else{ //1-away good, check 2-away
        if( ti>te && abs(Av[Ax[ic]]-Av[Ax[ie]]+sq)<csep ) 
        { stick=1, jm=irange(2,nd)+ic, jr=jm+nc 
          while ( stick && jm<jr ){ 
            j=modp(jm,ne)
            if(abs(Av[Ax[id]]-Av[Ax[j]]+sq)>=sep
             &&abs(Av[Ax[(j+1)%ne]]-Av[Ax[ie]]+sq)>=sep
             &&abs(Av[Ax[ic]]-Av[Ax[j]]+sq)>=csep)
            { 
              stick=0,t=Ax[ie], Ax[ie]=Ax[j], Ax[j]=t
              if(jm-ic+2>ch){ ch=jm-ic+2 }
            }
            jm++
          }
          ti-=(jm-jr+nc)*0.5
        }
      }
      c=c+d, ch=ch-d, ti-- 
    }
    
    if(autosep){ us=(ti>te)?bsep*0.81:(ti<1)?0:-bsep*0.8 }
    else{ us=(ti>te)?bsep:(ti<1)?0:-bsep }
    
    return Ax
  }
  
  function aresult(A,Av,sq){ 
    if(!A) { return us }
    var c, n=A.length, df=Infinity
    if( typeof Av !=='object' ){
      for(i=0;i<n;i++)
      { c=abs(A[i]-A[(i+1)%n]+(Av||0)); if(c<df)df=c }
    }else{
      for(i=0;i<n;i++)
      { c=abs(Av[A[i]]-Av[A[(i+1)%n]]+(sq||0)); if(c<df)df=c }
    }
    return (us>0||us==="zero")?df:-df 
  }

  function antisort(mx,Ai,A,sq,sep,lim,x){
    if( typeof mx !=='boolean')
    { x=lim,lim=sep,sep=sq,sq=A,A=Ai,Ai=mx,mx=true }
    var c=0, e=Ai.length, Ao=[], K
    if( typeof A !=='object' )
    { x=lim,lim=sep,sep=sq,sq=A,Ao= new Array(e) }
    else{ Ao=A, c=A.length }
    
    K=aindex(mx,Ai,sq,sep,lim,x)
   
    for(i=0;i<e;i++) Ao[c+i]=Ai[K[i]]
    if( typeof A !=='object' ){ for(i=0;i<e;i++) Ai[i]=Ao[c+i] }
    return Ao
  }
    
  function modp(a,b){ return a-Math.floor(a/b)*b }
  
  function bulk(A,f,b,c,d){
    if( typeof A !=='object' ){ A=new Array( parseInt(A)||1 )  }
    var i=0,n=A.length; f=f||f48 
    while( i<n ) A[i++]=f(b,c,d);
    return A
  }

  function within(a,e,fn,n){
    var r; n=n||5
    while(n--){
      r =fn()
      if(r>=a&&r<=e){ return r }
    }
    return range(a,e)
  }
  
  return{
     pot: pot   ,hot: hot  ,hotpot: hotpot
    ,repot: repot          ,reset: repot
    ,getstate: getstate    ,setstate: setstate 
    ,checkfloat: checkfloat	
   
    ,random:f48 ,f48: f48   ,next:f48 
    ,f24: f24   ,fxs: dbl   ,dbl: dbl
    ,i32: i32   ,ui32: ui32
    
    ,rbit: rbit ,rpole: rpole
    ,range: range  ,irange: irange 
    ,lrange:lrange ,zrange: zrange, vrange: vrange
    
    ,cauchy:cauchy  ,gaus: gaus  ,gausx: gausx  ,usum: usum
    
    ,uigless: uigless  ,uigmore: uigmore 
    ,igbrist: igbrist  ,igmmode: igmmode 
    ,ilcg: ilcg     ,ishr2: ishr2    ,ishp: ishp
        
    ,gbowl: gbowl    ,gspire: gpick  ,gthorn: gthorn 
    ,gwedge: gwedge  ,gnorm: gnorm   ,gcauchy: gcauchy 
    ,gskip: gskip    ,gteat: gteat   ,gtrapez: gtrapez 
        
    ,qskip:qskip   ,qxskip:qxskip,   qhop:qhop   ,qtrip:qtrip
    ,qr1fill: fillr1  ,qr2fill: fillr2  ,qr3fill: fillr3
    ,fillr1: fillr1  ,fillr2: fillr2  ,fillr3: fillr3
    
    ,gspill :gspill  ,ggrad :ggrad  ,ngrad: ngrad  ,gskew :gskew 
    ,gbands :gbands  ,ghorn :ghorn  ,gpick :gpick 
    
    ,mixup: mixup    ,mixof: mixof
    ,aindex: aindex  ,aresult: aresult  ,antisort: antisort 

    ,bulk:bulk  ,within:within ,dev2:dev2
    ,version: function(){ return "v3.3.0" } 
  }
}(arguments))}
  
if(typeof module!=='undefined' && module.exports) module.exports = newFdrandom()
else if(typeof window!=='undefined') window.Fdrandom = newFdrandom()
else console.log("Fdrandom.js did not import")