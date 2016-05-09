// Fdrandom.js - Fast deterministic random lib
/** @author Andrew Strain
 ** This is free and unencumbered software released into the public domain 
 ** in homage to human ingenuity against greed and hatred.
 */

var newFdrPot = function(){ return (function(sd){
  'use strict'
  
  var va,vl,vs,qr,us,rb,ju,U,sv,i
  plant(sd) 
  
  sv=getstate()
    
  function plant(sd) {
    
    va=1000, vl=1, vs=1, qr=0.0, us=0.0, rb=2.0e+15
    ju=1, U=[ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8 ]

    sow(sd)
    
    for( i=0;i<98;i++ ) f48()
    va=irange(3206324,3259829)

    function sow(sd) {
      var t=typeof(sd) , r 
      
      if(t === 'string'){
        t=sd.length; if(t>va*100){ t=va*100; va-- }
        for( r=0; r<t; r++ )
        {  U[0]=( U[0]+65537-sd.charCodeAt(r) )/6474.10101; f48() }
        return 
      }
      
      if(va<0){ return }
      
      if(t === 'object')
      { va--
        if(sd.constructor === Array)
        { U[0]*=0.95; for( r=0; r<sd.length; r++ ){ sow(sd[r]) } return }
        if(sd === null) { U[0]*=0.97; return }
        U[0]*=0.93;
        for(r in sd) { sow(r);sow(sd[r]) } 
        return 
      }
      
      if(isFinite(sd)){
        r= (sd<=0)? Math.abs(sd)+1.234 : sd 
        while(r>16)     r=r*0.0019560471624266144
        while(r<1.0e-4) r=r*511.11110111111111111
        U[0]=U[0]*0.1 + r*0.8999999; f48() 
        return
      }
   
      if(t === 'boolean') { U[0]*=0.93; if(sd){ f48() } return }
      if(t === 'function'){ U[0]*=0.91; sow(sd.name); return }
      if(t === 'symbol')  { U[0]*=0.89 }

      f48(); return 
    }
  }

  function checkfloat() 
  { var p=newFdrPot([3,2],2450,"~fez",{c:0.1})
    for( i=0;i<1000000;i++,p.dbl() ){}
    return p.dbl() === 0.8410126021290781
  }
  
  function version() { return "v1.4.1" }

  function setstate(s) {
    for( i=0;i<8;i++ ) U[i]=s[i]
    ju=s[8];  va=s[9];  vl=s[10] 
    vs=s[11]; qr=s[12]; us=s[13]; rb=s[14]; sv=s
  }

  function getstate() {
    return [ U[0],U[1],U[2],U[3],U[4],U[5],U[6],U[7], 
             ju, va, vl, vs, qr, us, rb ] 
  } 

  function pot() { return newFdrPot(arguments) }
  
  function repot(s) { 
    if (s) { plant({"0":{"0":s}}) } else { setstate(sv) }
    return this 
  }
  
  function hot() {
    if(arguments.length===0 && typeof hotFdrandomPot === 'object'){ 
      return hotFdrandomPot 
    }
    if(typeof(window)!=='undefined' 
     && (window.crypto||window.msCrypto)){ 
      var cO = window.crypto||window.msCrypto
      var ag=[cO.getRandomValues(new Uint32Array(8))] 
    }else{
      ag=[(new Date()).getTime()-1.332e+12, Math.random()] 
    }
    ag.push(arguments)
    return hotFdrandomPot = newFdrPot(ag)
  }

  ///A redesign of J.Baagøe's Alea; a float-cut dual-lcg prng
  function f48() { 
    var c= 0.12810301030196883 * U[0] +
           15.378612015061215 * (1.0000000000000037-(U[ju=(ju===7?1:ju+1)]))
    return U[ju]= c-( (U[0]=c) >>>0 )
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
    if( rb<1.1258999e+15 ) return (rb*=2)&1
    return (rb= dbl() +0.5) &1 
  }

  function rpole() { 
    if( rb<1.1258999e+15 ) return ((rb*=2)&2)-1
    return ( (rb= dbl() +1.5) &2) -1
  } 
  
  function ilcg() ///flat lcg 
  { return vl = (vl*13229323)^3962102927  }

  function ishr2() ///flawed shift register
  { va^= (va<<7)+1498916339; return va^= va>>>8  }

  function ishp(){ 
    vl = (vl*13229323)^3962102927
    return vl^((vl<<7)+1498916339) 
  }

  function uigless() 
  { return (( ui32()&ui32() )>>>0)  }
  function uigmore() 
  { return (( ui32()|ui32() )>>>0)  }
  function igbrist() 
  { return (( ui32()&ui32() )>>1) + (( ui32()|ui32() )>>1)  }
  function igmmode() 
  { return (( ui32()&ui32() )>>1) - (( ui32()|ui32() )>>1)  }
  
  function gbowl(b,d){ 
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d; var c=f48()
    return b+ (d-b)* (1.5+(1.5-c*(c+f48()))*rpole())*0.33333333333333 
  }
  function gspire(b,d){ 
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d; 
    return b+ (d-b)*(0.5+(0.5-f48())*f48()) 
  }
  function gthorn(b,d){ 
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d
    return b+ (d-b)* 0.5* (1+ (f48()-f48())*f48() ) 
  }
  function gwedge(b,d){ 
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d
    return b+ (d-b)* 0.5* 
    (1+ (Math.abs(f48()-f48())-Math.abs(f48()-f48()))) 
  }
  function gnorm(b,d){
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d
    return b+ (d-b)* 0.2* (f48()+f48()+f48()+f48()+f48())
  } 
  function lrange(a,b,d){
    a= (a===undefined)?0.5:a; b= (b===undefined)?-1:b; d= (d===undefined)?1:d
    
    if(a>0.5){
      if (f48()>a*2-1) return f48()*(d-b) +b
    }else{
      if (f48()<a*2) return f48()*(d-b) +b
    }
    var c=(f48()*1.333+f48()+f48()*0.66666)*0.3333333-0.5
    c= (a>0.5)?c:((c>0)?0.5-c:-0.5-c)
    return b+ (d-b)* (c+0.5)
  }
  
  function gteat(b,d){
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d
    return b+ (d-b)* 0.5* (0.5 + (0.5-f48())*f48()+f48()) 
  }
  function gtrapez(b,d){
    b= (b===undefined)?-1:b; d= (d===undefined)?1:d 
    return b+ (d-b)* (0.5+ 0.333333* (0.5+f48()-f48()*2)) 
  }

  function gskip(c) ///simple low discrepancy 
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
  
  var nml=0
  
  function nrml(func,sig,mu) /// G Marsaglias box muller polar method
  { var p,q,w
  
    if(nml){ 
      q = nml ; nml=0
      if(sig) return q *sig +(mu||0)
      return q
    }else{
      do {
        p= 2*func()-1; q= 2*func()-1
        w= p*p + q*q
      } while( w>=1 )

      w = Math.sqrt(( -2.0*Math.log(w) ) /w)
      nml = p*w;
      
      if(sig) return q*w*sig+(mu||0)
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
    {
      c= c||0 ; e= 1+(e||(Ai.length-1))
			
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
    
    
  //options
  //by position or by value
  //if non numeric, by position
  //
  //csep or autosep
  //order inc or 0
  //loop limit or no
  //reuse output index
  //
  //

  
//  aindex(in array or length [,"index"][,source increment=1][,csep=auto][,maxloop=auto]) returns index of array antisorted by numeric value or element "index" if specified or non numeric . eg. for shuffling a playlist


  function aindex(Av,sq,sep,lim)
  {    
    if( typeof Av !=='object' ) //if sep dont mixup
    { Av= new Array(Av); sq=sq||1
	    for(var i=0;i<Av.length;i++) Av[i]=i
	  }else{ sq=sq||0 }
    
    var Ax= new Array(Av.length);
    for(var i=0;i<Av.length;i++){ Ax[i]=i }
    
    if(!sep) Ax=mixup(Ax) //??? this identicall but...
    
    var ne=Ax.length
    var nc=ne>50?50:ne-1
    var nd=ne>350?350:ne-1
    
    if(ne<1) return Ax
    if(ne==2){ if ((sq<0)^(Av[Ax[1]]>Av[Ax[0]])){ return [Ax[1],Ax[0]] }else{ return Ax } }
         
    var asep=false, bsep
    if( typeof sep ==='undefined' ){	    
			var kd=0; asep=true
			for(var i=1;i<nd;i++)
			{ kd+=Math.abs(Av[i-1]-Av[i])
				   +Math.abs(Av[i]-Av[(i+3)%ne])
				   +Math.abs(Av[i]-Av[(ne-i)%ne]) }    			
			sep=bsep=kd/(nd*9)
    }

    if(ne<10){ asep=false }
    
    var ov=ne*6+300000, ova=ov*0.33, ovb=ova*0.66
    sq=sq||0

    var tt=0,tq=0, swps=0 ,ovz=0 ; console.log("sq",sq,"sep",sep,"bsep",bsep,"ov",ov,"ova",ova,"ovb",ovb)

    var t=0, j=0, jr=0, jm=0, c=irange(1,ne-1), ch=ne+3, jm=0
		    
    while( ch>0 && ov>0 )  
    { 
	    var ib=c%ne, ic=ib+1, id=ib+2, ie=ib+3
	    if(ie>=ne){ ie=ie-ne,id=id%ne,ic=ic%ne }
	    
	    var stick=0 ,d=1	    
	    
	    if(asep){ sep=bsep*range(0.83333,1.2) }
	    
	    //console.log(ic,id,Ax[ic],Ax[id],Math.abs(Ax[ic]-Ax[id]+sq),sep)
	    if(Math.abs(Av[Ax[ic]]-Av[Ax[id]]+sq)<=sep)
	    { jm=irange(2,nd)+ic, jr=jm+nc, stick=1, d=-2   
        while ( stick && jm<jr )
        { j=jm%ne				 
				  if( Math.abs(Av[Ax[id]]-Av[Ax[j]]+sq)>sep 
				   && Math.abs(Av[Ax[(j+1)%ne]]-Av[Ax[ic]]+sq)>sep
				   && Math.abs(Av[Ax[ie]]-Av[Ax[j]]+sq)>sep*0.5
				  ){ //cd  jd
				  	swps++, stick=0, 
				  	t=Ax[ic], Ax[ic]=Ax[j], Ax[j]=t				  	
				  	if(jm-ic+2>ch){ ch=jm-ic+2 }
				  	tt++, tq+=(jm-jr+nc)/nc
				  }
				  jm++;
        }				
				if(stick)
				{ ovz++,d=3, ch=ne+4, t=Ax[id], Ax[id]=Ax[ib], Ax[ib]=t 
        }
        if(asep) { bsep*= (5-((jm-jr+nc-2.15)/nc))*0.2 } 
        
      }else{ //cd are good
				 
				if(ov<ova) {bsep*=0.99997} 
				
				if( ov>ovb && Math.abs(Av[Ax[ic]]-Av[Ax[ie]]+sq)<=sep*0.5-1.0e-100 )  
				{ stick=1, jm=irange(2,nd)+ic, jr=jm+nc     
					while ( stick && jm<jr )
					{ var j=jm%ne
			
						if(Math.abs(Av[Ax[id]]-Av[Ax[j]]+sq)>sep      //ce
						 &&Math.abs(Av[Ax[(j+1)%ne]]-Av[Ax[ie]]+sq)>sep
						 &&Math.abs(Av[Ax[ic]]-Av[Ax[j]]+sq)>sep*0.5)    //de
						{ 
							swps++,stick=0
							t=Ax[ie], Ax[ie]=Ax[j], Ax[j]=t
							if(jm-ic+2>ch){ ch=jm-ic+2 }
						}
						jm++
					}
				}
      }
	    c=c+d; ch=ch-d 
	    ov-- 
    }//checkpoints cleared
    		
    console.log("tq",tq/tt,"ovz",ovz,"ch",ch,"ov",ov,"sep",sep,"swps",swps)
    
    return Ax
  }

  function antisort(Ai,A,vd,sep,lim)
  { var c=0,e=Ai.length, Ao 
    if( typeof A !=='object' ) //if csep dont mixup
    { lim=sep, sep=vd, vd=A 
	    Ao= new Array(e)
	  }else{ Ao=A, c=A.length }
	  
	  var K=aindex(Ai,vd,sep,lim)
	  
	  for(var i=0;i<e;i++)
	  { Ao[c+i]=Ai[K[i]] }
    
    if( typeof A !=='object' ) Ai=Ao
    return Ao
  }
  
  function bulk(A,f,b,c,d)
  { if( typeof A !=='object' )  { A=new Array( isFinite(A)?A:1 )  }
    f=f||f48 
    var i=0,n=A.length
    while( i<n ) A[i++]=f(b,c,d);
    return A
  }
  
  return{
     pot: pot   ,hot: hot  ,repot: repot  ,reset: repot
    ,getstate: getstate    ,setstate:  setstate
    ,version: version      ,checkfloat: checkfloat 
    
    ,next: f48  ,f48: f48  ,dbl: dbl
    ,f24: f24   ,fxs: dbl 
    ,i32: i32   ,ui32: ui32
    
    ,rbit: rbit ,rndbit:rbit  ,rpole: rpole  ,rndsign:rpole
    ,range: range  ,irange: irange ,lrange:lrange
    
    ,gaus: gaus    ,gausx: gausx   ,usum: usum 
    
    ,mixup: mixup  ,mixof: mixof   ,antisort:antisort  ,aindex:aindex, bulk:bulk
    ,ilcg: ilcg    ,ishr2: ishr2   ,ishp:  ishp
    
    ,uigless: uigless  ,uigmore: uigmore 
    ,igbrist: igbrist  ,igmmode: igmmode 
    
    ,fgwedge: gwedge  ,fgtrapez: gtrapez  ,fgnorm:gnorm
    ,fgthorn: gthorn  ,fgskip:   gskip    ,fgteat:gteat
    
    ,gbowl: gbowl     ,gspire: gspire  ,gthorn: gthorn 
    ,gwedge: gwedge   ,gnorm: gnorm 
    ,gteat: gteat     ,gtrapez: gtrapez 
    ,gskip: gskip
  }

}(arguments))}

var hotFdrandomPot 

//Hopefuly exports to node, amd, commonjs or global object
if (typeof exports !== 'undefined') 
{ if (typeof module !== 'undefined' && module.exports)
  { exports = module.exports = newFdrPot({}) }
  else { exports.Fdrandom = newFdrPot({}) }
} else {
  if (typeof define === 'function' && define.amd) 
  { define( 'Fdrandom',[],function(){return newFdrPot({})} ) }
  else
  { (1,eval)('this').Fdrandom = newFdrPot({}) } 
}
