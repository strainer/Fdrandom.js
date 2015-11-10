/**
 * @author strainer
 */

//Fast deterministic random lib
//x=Fdrandom.d64();    Rsrc=Fdrandom.pot("seed231")    y=Rsrc.d64()

Testprngs = (function () { 

	_={}
	_.sa=522602, _.sb=5137,              /// prng states
  _.p=1, _.q=1, _.ld=0, _.us=0, _.s=1  /// prng states

/*
	var 
    fc24  = 2.328306367691e-10,    //these factors are inlined     
		fc53a = 2.3283064370469158e-10, 
		fc53b = 2.328281e-10,           			
		ftau  = fc53a*2*Math.PI,         
		uifac  = 4294967296,
		sifac  = 2147483648
*/
			       
	function pot(sd,_)
	{ 
    _.sa=522602, _.sb=5137,        
		_.p=0, _.q=0, _.ld=0, _.us=0, _.s=1
			
		if(typeof sd !== 'undefined') {
			if(typeof sd === 'string') {      //rough string hasher  
				var i=0, st=sd, n=(st.length) 
				 ,sd=0xabcdef^(st.charCodeAt(0))
			  while(i<n) { sd ^= (sd<<8)^(sd%(st.charCodeAt(i++))); }
			}
			_.sa+=((sd+0x7fffffff)>>>0)%11047 ///seeds in valid subrange
			_.sb+=((sd+0x7fffffff)>>>0)%1433  
			
			for( var i=0;i<8;i++)             
			{ _.sa^=((_.sa-1265948058)<<5); _.sa^=(_.sa >>>9)
				_.sb^=((_.sb-164904650) <<3); _.sb^=(_.sb >>>11)
      }
		}
		return rgenObject(_)
	}
	
	function i32() /// 2^63~pd integer value rand
	{ 
    _.s^= _.s<<13; _.s^= _.s>>>17; _.s^= _.s<<5;
		_.sa^=((_.sa-1265948058)<<5); _.sa^=(_.sa >>>9)
		//_.sb^=((_.sb-164904650) <<3); _.sb^=(_.sb >>>11)
		return (_.sa^_.s)                     
  }  	
	
	function shr3() 
	{ _.s^= _.s<<13; _.s^= _.s>>>17; _.s^= _.s<<5;
		return _.s;  }  		

	function i32p() 
	{ _.sb^=((_.sb-164904650) <<3); _.sb^=(_.sb >>>11)
		return _.sb;  }  	
	
	function i32q() /// 2^31~pd integer value rand
	{ _.sa^=((_.sa-1265948058)<<5); _.sa^=(_.sa >>>9)
		return _.sa   
	}
	
	function i32r() /// 2^31~pd integer value rand
	{ 
	  _.sa^=((_.sa)<<6)+1973037067; _.sa^=(_.sa >>>10)  //dh,p is 4294280630
		return _.sa   
	}  
	
	function i32s() /// 2^31~pd integer value rand
	{ 
	  //~ _.sa^=((_.sa)<<5)+1334203894; _.sa^=(_.sa >>>12) //dh,p is 4293793381  best
	  
	  //~ _.sa^=((_.sa)<<7)-384238065; _.sa^=(_.sa >>>8)  //very good! 42916..p 
	  //~ _.sa^=((_.sa)<<7)+1498916339; _.sa^=(_.sa >>>8)  //very good! 4293261794 p 
	  _.sa^=((_.sa)<<7)-446863772; _.sa^=(_.sa >>>8)  //sublime! 4294368480 p 
	  _.sc=(((_.sc)*216091)^718638423)
		//~ _.sa^=((_.sa)<<5)-286651577; _.sa^=(_.sa >>>12)      //dh,p is 4291738401 2nd  
	  //~ _.sa^=((_.sa)<<4)+1071027214; _.sa^=(_.sa >>>11)  //poor dh
		return _.sa^_.sc   
	}
	
	function tx1()
	{
	  _.s^= _.s<<13; _.s^= _.s>>>17; _.s^= _.s<<5;
		_.sa^=((_.sa)<<7)-446863772; _.sa^=(_.sa >>>8)
	  _.sc=(_.sc*13548387)^-781357407 // great craps , best vis *****
		return _.sc^_.sa^_.s;
	}	

	function tx2()
	{
	  _.sc=(_.sc*13548387)^-781357407 // great craps , best vis *****
		return _.sc;
	}
	
	function pat()
	{
	  _.sc=(_.sc*13559935)^3743229039 //
		return _.sc;
	}
	
	function cgrb() /// 2^31~pd integer value rand
	{ 
	  //~ _.sa=(((_.sa)*48271)&0x7FFFFFFF)  //doesnt work
	  //~ _.sa=(((_.sa)*48271)%2147483647)  //works, slow
	  //~ _.sa=(((_.sa)*366935)^2724747081)  //extra low craps score
	  //~ _.sa=(((_.sa)*387551)^1690811541)  //best craps 160000
	  //~ _.sa=(((_.sa)*335327)^457486149	)      //also best caps, highest discreps 2
	  //~ _.sa=(((_.sa)*335327)^2636078579	)      //150001 craps wins,
	  //~ _.sa=(((_.sa)*335327)^1857846599	)      //160000 craps
	  //~ _.sa=(((_.sa)*292859)^200591947	)      //133332 craps
	  //~ _.sa=(((_.sa)*308455)^3219957207	)      //100000
	  //~ _.sa=(((_.sa)*568103)^3281740407	)          //123075
	  //~ _.sa=(((_.sa)*553163)^298412079	)          //157143  best craps game cgr!!
	  //~ _.sa=(((_.sa)*934043)^2262420657	)  //145454
	  //~ _.sa=(((_.sa)*107827)^4224837337	)  //83333 plays craps!!
	  //~ _.sa=(((_.sa)*993467)^3986557501	)  //109092 has z-score 46.990
	  //~ _.sa=(((_.sa)*616235)^1275966707	)  //66667 plays craps
		/* has majestic bitmap !!!! */
		//~ _.sa=(((_.sa)*9204103)^1266210005	)  //102559 great craps, awesome chisums!
		//~ _.sa=(((_.sa)*8637447)^2337577883	)  //omg 102635 98585.86, super majestic
		//~ _.sa=(((_.sa)*9370435)^3192582271	)  //greatest yet! 99667    98585.86
		//~ _.sa=(((_.sa)*8771527)^1898384163	)  //awesome, with pval .36048, but deg freedom
		//~ _.sa=(((_.sa)*9357819)^1479236933	) //another topper  100717    98585.86
		//~ _.sa=(((_.sa)*9142763)^3566812511	) //yet another topper  102755  super bmp
		//~ _.sa=(((_.sa)*13559935)^3743229039	) //very intresting bmp pattern!!!
		//~ _.sa=(((_.sa)*13486163)^1412996821	) //slightly bmp pattern!!!
		//~ _.sa=(((_.sa)*13605703)^988560191	) // vgood craps
		//~ _.sa=(((_.sa)*13229323)^3962102927	) // vgood+ craps and irregular bmp
		//~ _.sa=(((_.sa)*13548387)^4024417647	) // best++ craps, only slight dimpling in bmp
		//~ _.sa=(((_.sa)*13548387)^3956116443	) // same best craps, no vis dimpling
		//~ _.sa=(((_.sa)*13229323)^3962102927	) // same best craps, no vis dimpling
		//~ _.sa=(((_.sa)*12636887)^1496668111	) // good tests, visual rift

    //~ _.sa=(((_.sa)*13548387)^2546619569	) // no vis rifts, fine craps
    //~ _.sa=(((_.sa)*13548387)^3956116443	) // no vis rifts, better craps
    //~ _.sa=(((_.sa)*13548387)^2471717159	) // smoothish w slight marbling
    _.sa=(_.sa*13548387)^3513609889 // great craps , best vis *****
    
		//~ _.sa=(((_.sa)*308455)^3283845511	)      //193750
	  //~ _.sa=(((_.sa)*308455)^3615150811	)      //174999
	  //~ _.sa=(((_.sa)*475135)^340915	)      //90910
	  //~ _.sa=(((_.sa)*475135)^2155673457	)      //90909
	  //~ _.sa=(((_.sa)*475135)^2152292333	)      //90909
	  //~ _.sa=(((_.sa)*216091)^718638423)  //works, full period
	  //~ _.sa=(((_.sa)*1664525)&0xffffffff)  //doesnt work, gets clipped
		return _.sa   
	}  

	function cgra() /// 2^31~pd integer value rand
	{ 
	  _.sc=(((_.sc)*69069+1)&0xffffffff)  //works, full period
		return _.sc   
	}  

  //~ _.sa=(((_.sa)*48271)&0x7FFFFFFF)  //doesnt work
	//~ _.sa=(((_.sa)*48271)%2147483647)  //works, slow
  //~ _.sa=(((_.sa)*1664525)&0xffffffff)  //doesnt work, gets clipped
		
	function t64() /// 2^63~pd, 52bit precision float, rand
	{ 
		return (((0x80000000)>>>0)+((0x80000000)>>>0)*2.328281e-10
		  )*2.3283064370469158e-10; 
  }  
  
	function t32() /// 2^63~pd, 32bit precision, float rand
	{ 
		return ((0x80000000)>>>0)*2.328306367691e-10;                      
	}	
		
	function rgenObject(_){
    _.pot=pot
		_.i32=i32,   _.shr3=shr3, _.cgra=cgra, _.cgrb=cgrb 
		_.i32p=i32p, _.i32q=i32q, _.i32r=i32r,_.i32s=i32s,  
    _.t64=t64,  _.t32=t32 , _.tx1=tx1, _.tx2=tx2, _.pat=pat
		return _
	}
	
	return rgenObject(_) 
}({}));