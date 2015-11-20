// tools.js
// ========

var globav =1;
var gdone=2;

bench = function (meth, bentime, meth_nm, meth_arg) {
    
	if( typeof bentime==='undefined' ){ bentime=1 }
	if( typeof meth_nm==='undefined' ){ meth_nm=meth.name }
	bentime=bentime*22
	
	var qqtlen=1
	if(typeof meth_arg!=='undefined')
	{ qqtlen=1 }
	
  var tmstamp	
  if(typeof performance!=='undefined')
	{ tmstamp=performance }else{ tmstamp=Date }
		
	
	var i = 0, retv= 0,retvsum=0,donereps=0;
	var minret=0xffffffff>>>0, maxret=0
	var atm,btm,ctm,dtm,bdtm,qqtlen
	var ra=0,rb=0,rt=0
	
	for (var w=0;w<4;w++)
	{	
		var qreps=0,qtime=0,nreps=100000, repfac=1
		atm= tmstamp.now(); rt=9999999999999
		ctm = atm, dtm=0

		while(ctm-atm<bentime){
						
			if(typeof meth_arg !== 'undefined')
			{ for(i=0;i<nreps/10;i++)	
				{ var r=meth(meth_arg)
					if (r>maxret){ maxret=r}
					{ if (r<minret){ minret=r } }
				}			 
			}else{
				for(i=0;i<nreps/10;i++)	
				{ var r=meth(meth_arg) 
					if (r>maxret){ maxret=r }
					{ if (r<minret){ minret=r } }
				}
			}
			
			btm= tmstamp.now();
			
			if(typeof meth_arg !== 'undefined'){
			  for(i=0;i<nreps;i++)	{ retv+=meth(meth_arg) } 
			}else{
				for(i=0;i<nreps;i++)	{ retv+=meth() }
			}
			
			ctm= tmstamp.now();		
			
			bdtm=dtm; dtm=ctm-btm
			
			if (dtm==0){ nreps*=8; }
			else
			{
				if (nreps/(dtm)>(rt*0.9))
				{ qreps+=nreps*4;qtime+=dtm*4; }
				else 
				{ qreps+=nreps;qtime+=dtm; } //depreciates low counts
				
				retvsum+=retv;retv=0
				donereps+=nreps;
				
				rt=(qreps)/(qtime)
				//~ console.log(dtm+" "+nreps)
				var timeleft=(bentime-(ctm-atm))
				nreps =10+Math.floor(timeleft*rt*0.66);
				if (nreps>10000000*timeleft){ nreps=10000000*timeleft }
				//nreps=100+(nreps*repfac*0.7)>>>0
			}
		}
	  //~ console.log()
		if (rt>ra){ rb=ra; ra=rt }
		else{ if (rt>rb) { rb=rt } }
	}
	
	ops=Math.floor(((ra+rb)*qqtlen*1000)/2)/1000000
	console.log(meth_nm+" "+ops+" Mop/s "+donereps+
	  "  am  "+retvsum/donereps+"  "+((minret+maxret)/2)+" "+globav/gdone);
	if ((retvsum/donereps)>0.5){ globav+=1; }
	gdone++;
};

var firstrun=1

benchn = function(n,a,b,c,d){ 

  if(firstrun)
  { firstrun=false;
    var k=bench(Math.sqrt,b,c,d)	
	}
	
  for(var i=0;i<n;i++) { bench(a,b,c,d);} 
}

counthalf = function(f,p,p2,rs){

var inner=1000*rs 
var outer=1000*rs 

var overii=0;
var smores=0;
var mcnt=0;
for(var r=0;r<outer;r++){
	var ovri=0;	
	var cnt=0;
	
	for (var i=0;i<inner;i++)
	{ 
    var c=f(p,p2)
    cnt+=(c-0.5)		
	  if(c>=0.5){ ovri++ } 
	}
	smores+=ovri;
	mcnt+=cnt;
	
	//console.log(ovri/x+" outputs over 0.5")
	if ((ovri/inner)>=0.5){ overii++; }
}
console.log(":(s/2): "+ (overii*100)/outer+" "+ (smores*100)/(inner*outer)+" "+(mcnt/(inner*outer))
)
}

cthalf = function(f,p,p2,m){
//console.log(f(p,p2))
if(typeof m==='undefined'){ m=1; }

var s=1000*m, x=40*m 
var overii=0;
var mcnt=0,zcnt=0;
for(var r=0;r<x;r++){
	var ovri=0;	
	var cnt=0
	var df=0,av=0,bv=Math.random(),cv=Math.random(),zv=0
	for (var i=0;i<s;i++)
	{  
	  av=bv;bv=cv;cnt+=(df=(cv=f(p,p2))-0.5)
	  if(df>0.499){ ovri++; }
    zv+=Math.abs(bv-cv)+Math.abs(av-cv);		
  }
	
	var h=ovri/s
	if (h==0.001){ overii=overii+0.5; }
	else{ if (h>0.001){ overii=overii+1; } }
	
	zcnt+=zv/s
	mcnt+=cnt;
}
return [(overii)/(x),mcnt/(s*x),zcnt/x]
}

scanrange= function(fnc,reset,rept,ressq,acc, st,fn,dv,st2,fn2,dv2,mino)
{
  console.log("scanning total nums "+rept*ressq*ressq*400000*dv*dv2+
	 " of "+(dv*dv2)*rept+ "pots")
	 
	for(var jf=0;jf<=dv;jf++) 
	{ var q=st+jf*(fn-st)/dv
	  //~ console.log((jf/dv).toFixed(3),q)
	  var qsco=0;
		for(var jf2=0;jf2<=dv2;jf2++) 
	  { 
		  var q2=st2+jf2*(fn2-st2)/dv2
		  qsco+=findhalf(fnc,reset,rept,ressq,acc, q,q,q2,q2,mino) 
		}
		console.log("+] "+q+" : "+qsco+"\n")
	}
}

findhalf =function(fnc,reset,rept,ressq,acc, r0,r1,r2,r3,mino)
{  
  var acca=10,accb=1,accc=1
  var sums=0,sumsn=0,tsums=0;	
  var ps=[
	    [0.25,0.5]
	   ];
	 
	var gn=0,ga=0,gb=0; 
	var pi=0;
	var p,p2
	for (var g=0;g<rept;g++)
	{
	  pi=(pi+1); pi=pi%ps.length
	  //reset();
		
	  //~ var p=  ps[pi][0] + ((Math.random()+Math.random()+Math.random()-1.5)/(100))
	  p=  r0 + Math.random()*(r1-r0)
	  p2=  r2 + Math.random()*(r3-r2)
	  //var p2= ps[pi][1]// + ((Math.random()+Math.random()+Math.random()-1.5)/(3*30000))
	  //~ var p2= ps[pi][1] + ((Math.random()+Math.random()+Math.random()-1.5)/(3*4))
		
		var o=cthalf(fnc,p,p2,ressq)
		if( (Math.abs(o[0]-0.5)<(25*acca/acc)) 
		  && (Math.abs(o[1])<(accb/acc))
			&& (Math.abs(o[2]-0.66666666666)<(accc/acc)))
		{ 
		  //~ console.log(
			//~ "\n-> "
			//~ +o[0].toFixed(5)+" : "
			//~ +o[1].toFixed(5)+" : "
			//~ +o[2].toFixed(5)) 
      
			var va=0,vb=0,vz=0,vc=8, oa="",ob="",oc=""
			var uva=0,uvb=0,uvz=0
			
      for(var e=0;e<vc;e++){
				o=cthalf(fnc,p,p2,ressq) ;
				var ta=(0.5-o[0]),tb=o[1],tz=0.66666666666-o[2]
				va+=ta 
				vb+=tb
				vz+=tz
				
				uva+=ta+Math.abs(ta);uvb+=tb+Math.abs(tb); uvz+=tz+Math.abs(tz)
				
				oa+=" "+(ta/250).toFixed(6)+","
			  ob+=" "+tb.toFixed(6)+","
			  oc+=" "+tz.toFixed(6)+","
      }			
			if(va>0){ va+=Math.abs(uva-va)/2}
			else{va-=Math.abs(uva-va)/2}
			if(vb>0){ vb+=Math.abs(uvb-vb)/2}
			else{vb-=Math.abs(uvb-vb)/2}
			if(vz>0){ vz+=Math.abs(uvz-vz)/2}
			else{vz-=Math.abs(uvz-vz)/2}
			if( (Math.abs(va/vc)<(acca*25*2/acc)) 
				&& (Math.abs(vb/vc)<(accb*2/acc))
				&& (Math.abs(vz/vc)<(accc*2/acc)))
      { ga+=p;gb+=p2;gn++;
        if(!mino){
				console.log(oa); console.log(ob); console.log(oc);
				console.log("-> "+(va/(vc*250)).toFixed(7)+" "+(vb/vc).toFixed(7)+" "+(vz/vc).toFixed(7))}	
				var ss=Math.floor(Math.sqrt(1/(Math.abs(va/(vc*250)))+Math.sqrt(Math.abs(vb/vc))+Math.sqrt(Math.abs(vz/vc))))
				sums+=ss;sumsn++; tsums+=ss;
				console.log("["+p+","+p2+"] "+ss)			
			}			
		}
	}
	if(!mino&&(ga/gn>0)){console.log(ga/gn,gb/gn)}
	if((sumsn>2)){console.log("-] "+(sums/(sumsn+1)).toFixed(3))//+" "+(sums/sumsn).toFixed(3)+" "+sums) 
	}
	return tsums
}


compfunc = function(ma,mb,n){

  var ra,rb
	if(typeof n==='undefined'){ n=10 }
	for(var i=0;i<n;i++){
    ra=ma();rb=mb()
    if(ra!=rb)
    { console.log("problem with",ma.name,"and",mb.name,"at",i,"iterations"); 
		  return}    
	}
  console.log("Fine agree",ma.name,"and",mb.name,"for",n,"iterations");
}

function fnl(num, length) {
  var r = "" + num;
  while (r.length < length) {
      r = " " + r;
  }
  return r;
}

distrib =function(f,rs, ai,ei, n, a,b,c) //func rs  st fn divs
{
  var dv=(ei-ai)/rs
	
	var dist=[]
	for(var i=0;i<rs;i++) { dist[i]=0; }
	
	for(var i=0; i<n; i++)
	{
	  var p=f(a,b,c)-ai
		dist[Math.floor(p/dv)]++
	}

  var ot="",oh=""
	for(var i=0; i<rs; i++)
  { 
	  oh+=fnl(((ai+dv*(i+0.5))*100/dv).toFixed(2),9)
	  ot+=fnl((dist[i]*100/n).toFixed(4),9) }
	
	var lv=0,hv=0
	for(var i=0; i<((rs-1)/2); i++)
	{
	  lv+=dist[i]; hv+=dist[rs-1-i]
	}
	console.log(oh)
	console.log(ot)
	console.log((lv*100/n).toFixed(7),(hv*100/n).toFixed(7),((lv-hv)*100/n).toFixed(7))

}


checkperiod = function(f,t)
{
  while(t>0)
  {
  	checkperiod2(f,f(),f())
		t-=1
	}
}

checkperiod2 = function(f,s,s2)
{
	console.log("checking period of",f.name," (go for tea...)")
	var t=1
	for(;t<500000000;t++){
		//sa=522602
		if(f()==s) { 	
		  console.log("1 strike")
			if(typeof s2==='undefined'){ break; }
		  else { if(f()==s2){ console.log("2 strikes"); break } }
			t++
		}
	}
	console.log("funcs period from seed",s," is "+t)
}

//~ bench2(Fdrandom.d64)
//~ bench2(Fdrandom.f32,5)
//~ bench2(Fdrandom.i32,50)
//~ bench2(Fdrandom.i32q)


pr = function() {
  var args = Array.prototype.slice.call(arguments);
  var result = args.join(" ");
  console.log(result);
}

if (typeof require !=="undefined") var filestreams = require('fs'); //nodejs

savedata =function(fname,fn,n)
{
  var resu = new Uint32Array(n)
	var k,q=0

	for(i=0;i<n;i++) 
	{ k=fn()
		resu[i]=k
		q+=k }

  var ws = filestreams.createWriteStream(fname);
  var b=new Buffer(resu)
	a=ws.write(b);
  ws.end();
  pr(fname+" saved",a/1024,"Kb")
	pr("Mean val was "+q/n)
}

savedata2 =function(fname,fn,fn2,n)
{
  var resu = new Uint32Array(n)
	var k,q=0

	for(i=0;i<n;) 
	{ 
		k=(fn()-fn2())>>>0
		resu[i++]=k
		//~ k=fn2()
		//~ resu[i++]=k
		q+=k }

  var ws = filestreams.createWriteStream(fname);
  var b=new Buffer(resu)
	a=ws.write(b);
  ws.end();
  pr(fname+" saved",a/1024,"Kb")
	pr("Mean val was "+q/n)
}



function heredoc (f) {
    return f.toString().match(/\/\*\s*([\s\S]*?)\s*\*\//m)[1];
};


cmd_exec= function(cmd, args, cb_stdout, cb_end) {
  var spawn = require('child_process').spawn,
    child = spawn(cmd, args),
    me = this;
  me.exit = 0;  // Send a cb to set 1 when cmd exits
  child.stdout.on('data', function (data) { cb_stdout(me, data) });
  child.stdout.on('end', function () { cb_end(me) });
}


diehard=function(rfile,tb){

  rfile=rfile.split("/").join("\\")
  var nf=rfile.split(".")[0]
  console.log(rfile+".n:00:Diehard results")
	if(typeof tb==='undefined'){ tb="000011110000000"; }
  var txt = rfile+"\r\n"+nf+".txt\r\n"+tb+"\r\n\r\n"	
  var targs="o:/tmp/dharg"
  filestreams.writeFile(targs,txt);
	
	var cmd='O:\\tmp\\dhrd.bat' 
	var p=''
	f = new cmd_exec(cmd, [p], 
		function (m, data) {m.stdout += data.toString();},
		function (m) {m.exit = 1;}
	);

	function log_console() {
		console.log(f.stdout);
	}
  setTimeout(log_console,3500);

}



imaginefish= function()
{
  foodmerc=0.1   //base food contamination level, static
	
	fishmerc=0     //contamination levels of fishes, dynamic
	medfishmerc=0
	bigfishmerc=0
	
	eatfactor=20 // guessing animals might eat 1/20th of their weight each day
  
	halflifedays=14
	lifefactor=Math.pow(0.5,1/halflifedays) //convert halflife to feedtimefac
  feedday=0
	
	while(feedday<500)
	{
	  fishmerc=(fishmerc+foodmerc/eatfactor)*lifefactor
		medfishmerc=(medfishmerc+fishmerc/eatfactor)*lifefactor
		bigfishmerc=(bigfishmerc+medfishmerc/eatfactor)*lifefactor
	  console.log(feedday, foodmerc, fishmerc, medfishmerc, bigfishmerc)
		feedday=feedday+1
	}
}


var As,Ai
regurg= function(A)
{
	if(As==null||A!=null){ As=A; Ai=0; return NaN}
	if(As!=null&&Ai==As.length){ Ai=0; }
	return As[Ai++]
}


//~ imaginefish()