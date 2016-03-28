
if(!Fdrandom.checkfloat()){
  document.getElementById('floatfail').style.display="block";	
}

var fnstats={}
var firstrun=1
var runstep=0
var vgsc=1024*4
var svgz=200
var svgsc=1
var opac = Math.sqrt(2000/vgsc)
var dtsz=1.1*svgz/256
var ddtsz=3.5*svgz/256
var bdtsz=5*svgz/256
var starttime


//var t1 = Date.now();
//var t2 = new Date().getTime();



var tlogger = document.getElementById('log')

var intervar
var Fd
var isHot

function gogo(){
  
  isHot = ('hot'===document.getElementById("seed").value)
  if ( isHot ) { Fd=Fdrandom.hot() } else { Fd=Fdrandom.pot() }
  
  d = document.getElementById("selectedsize").value;

  svgz=200; if (d==='large') svgz=384
  
	opac = Math.sqrt(2000/vgsc)
	dtsz=1.1*svgz/256
	ddtsz=3.5*svgz/256
	bdtsz=5*svgz/256
  
  var de = document.getElementById("log"); 
  de.outerHTML = ""; delete de

  var iDiv = document.createElement('div');
  iDiv.id = 'log';
  document.getElementById('dash').appendChild(iDiv);

  tlogger = iDiv
  runstep=0
  
  starttime=performance.now()
  
  intervar=setInterval(chartfuncs, 250)
}


function chartfuncs() {
  
	clearInterval(intervar)	
	
	var dur=3,reps=1
	var funz= [
	 [Math.random,"math.random "],
	 [Fd.next,"Fdrandom.next "],
	 [Fd.dbl,"Fdrandom.dbl "],
	 [Fd.f24,"f24 "],
	 [Fd.rndbit,"rndbit "],
	 [Fd.rndsign,"rndsign "],
	 [Fd.usum,"usum 1 ",1],
	 [Fd.usum,"usum 2 ",2],
	 [Fd.usum,"usum 3 ",3],
	 //~ [Fd.usum,"usum 4 ",4],
	 //~ [Fd.usum,"usum 5 ",5],
	 //~ [Fd.usum,"usum 6 ",6],
	 //~ [Fd.usum,"usum 7 ",7],
	 //~ [Fd.usum,"usum 8 ",8],
	 //~ [Fd.usum,"usum 16 ",16],
	 //~ [Fd.usum,"usum 32 ",32],
	 [Fd.gaus,"gaus "],
	 //~ [Fd.gausx,"gausx "],
	 [Fd.ui32,"ui32 "],
	 [Fd.i32,"i32 "],
	 [Fd.ilcg,"ilcg "],
	 [Fd.ishr2,"ishr2 "],
	 [Fd.ishp,"ishp "],
	 [Fd.gskip,"gskip "],
	 [Fd.gskip,"gskip 0.2",0.2],
	 [Fd.gskip,"gskip 0.8",0.8],
	 [Fd.gbowl,"gbowl "],
	 [Fd.gtrapez,"gtrapez "],
	 [Fd.gteat,"gteat "],
	 [Fd.gthorn,"gthorn "],
	 [Fd.gspire,"gspire "],
	 [Fd.gnorm,"gnorm "],
	 [Fd.lrange,"lrange 1.0",1.0],
	 [Fd.lrange,"lrange 0.90",0.90],
	 [Fd.lrange,"lrange 0.75",0.75],
	 [Fd.lrange,"lrange 0.63",0.63],
	 [Fd.lrange,"lrange 0.55",0.55],
	 [Fd.lrange,"lrange 0.50",0.50],
	 [Fd.lrange,"lrange 0.45",0.45],
	 [Fd.lrange,"lrange 0.37",0.37],
	 [Fd.lrange,"lrange 0.25",0.25],
	 [Fd.lrange,"lrange 0.10",0.10],
	 [Fd.lrange,"lrange 0",0],

	]
 			
	//~ funz= [ [Fdrandom.i32gx,"i32gx "] ]
	
	chartf(reps=1, funz[runstep][0], dur=2.5, funz[runstep][1], funz[runstep++][2] ) 
  //
  if(runstep<funz.length){ intervar=setInterval(chartfuncs, 250); }
  else
  {
	  var tottime=performance.now()-starttime
	  var pp=document.createElement('p')
	  pp.innerHTML="Total test time is "+(tottime/1000).toFixed(2)+" secs"
	  pp.style.textAlign="center"
	  pp.style.clear="both"
	  pp.style.margin="0 auto"
	  pp.style.width="25%"
	  tlogger.appendChild(pp)
	}
	
}

//~ var hot=Fdrandom.hot()
//~ var a=[]
//~ for(var t=0;t<1000000;t++)
//~ { a.push(1*hot.mixof("0123456789","0.",6)) } 
//~ nn=1000000
//~ for(var t=0;t<nn;t++)
//~ { a[t]=(t/nn) }
//~ hot.mixup(a)
//~ regurg(a)

chartf = function(n,a,b,c,d){ 
	
  if(firstrun)
  { firstrun=false;
    var k=benchf(Math.sqrt,b,c,d)	
	}
	
	var cc=document.createElement('div')
	cc.style.float="left"
	if(svgz>200) { 
		var bwidth=window.screen["availWidth"]||0
		bwidth=((bwidth-svgz*2.1)/2)|0
		bwidth=(bwidth>0)?bwidth:0
		cc.style.margin="5px "+bwidth+"px"; }
	else
	{ cc.style.margin="5px 5px" }
	
	var rexx='<table style="margin-bottom: 2px; width:'+svgz*2+'px">';
	for(var i=0;i<n;i++) { rexx+=benchf(a,b,c,d); }
	rexx+= '</table>';
	
	cc.innerHTML +=rexx
	
	if ( !isHot ) Fd.repot()
	
	cc.appendChild(twodim_dist_canv(a,d))
	cc.appendChild(fltline_cnv(c,a,d))
	
	tlogger.appendChild(cc);
	
}


benchf = function (meth, bentime, meth_nm, meth_arg) {
		
	if( typeof bentime==='undefined' ){ bentime=1 }
	if( typeof meth_nm==='undefined' ){ meth_nm=meth.name }
	bentime=bentime*22
	
	var qqtlen=1
	if(typeof meth_arg!=='undefined')
	{ qqtlen=1 }		
	
	var i = 0, retv= 0,retvsum=0,donereps=0;
	var minret=0xffffffff>>>0, maxret=0
	var atm,btm,ctm,dtm,bdtm,qqtlen
	var ra=0,rb=0,rt=0
	
	for (var w=0;w<4;w++)
	{	
		var qreps=0,qtime=0,nreps=100000, repfac=1
		atm= performance.now(); rt=9999999999999
		ctm = atm, dtm=0

		while(ctm-atm<bentime){
						
			for(i=0;i<nreps/10;i++)	
			{ var r=meth(meth_arg) 
				//if (r>maxret){ maxret=r }
				//{ if (r<minret){ minret=r } }
			}
			
			
			btm= performance.now();
			
			if(typeof meth_arg !== 'undefined'){
				for(i=0;i<nreps;i++)	{ retv+=meth(meth_arg) } 
			}else{
				for(i=0;i<nreps;i++)	{ retv+=meth() }
			}
			
			ctm= performance.now();		
			
			bdtm=dtm; dtm=ctm-btm
			
			if (dtm==0){ donereps+=nreps; nreps*=8; }
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
	
	var rex='<tr>'
	rex+='<td><b>'+meth_nm+'</b></td>'
	rex+='<td>Mops:'+ops.toFixed(1)+'</td>'
	//~ rex+='<td>'+donereps.toFixed(0)+'</td>'
	rex+='<td>'+" avg:"+(retvsum/donereps).toFixed(fmtplace(retvsum/donereps))+'</td>'
	//rex+='<td>'+"  mid:"+((minret+maxret)/2).toFixed(7)+'</td>';
	rex+='</tr>';

  return rex;	
};

function fmtplace(i){
	var plc=Math.abs(6/((1-Math.abs(i))||1)) ;plc =(plc>5||plc<0)?5:plc
	return plc+1 
}
function fltline_cnv(fnm,func,d)
{
	var minval=fnstats.minval
	var maxval=fnstats.maxval
  var tval=fnstats.tval
  var fb=fnstats.fb
	
	if(Math.abs(minval*16)<1)
	{ minval=0; }
	if(Math.abs((minval-0x7fffffff)/100000)<1)
	{ minval=-(0x80000000); }
  if(Math.abs((maxval-1)*16)<1)
	{ maxval=1; }
  if(Math.abs((maxval-0x7ffffffff)/100000)<1)
	{ maxval=0x7fffffff; }  
	if(Math.abs((maxval-0xffffffff)/100000)<1)
	{ maxval=0xffffffff; }
	
	var g=Math.abs(minval/maxval)
	if(g>0.3&&g<3)
	{ maxval*=1.3;minval=-maxval }
	
	var dist=maxval-minval
	var mid=dist/2
	var widefac=svgz/dist
	var highfac=svgz/dist
  

	var canv = document.createElement('canvas');
	canv.id = "canvasid"+(cid);
	canv.class = "canvasclass"+(cid++);
	canv.height = svgsc*svgz; //get original canvas height
	canv.width = svgsc*svgz; // get original canvas width
  //~ canv.style.float="left";
  canv.style.background="#fff";
  
  var ctx = canv.getContext("2d");
		
  var sx=svgz/2, sy=mid*highfac
	var nn=vgsc*200, nw=50
	var hh=0

  ctx.globalAlpha=0.7;
  ctx.fillStyle = "#f00" 
	ctx.fillRect(sx,sy,bdtsz,bdtsz)
  
  ctx.globalAlpha=0.2;
  ctx.fillStyle = "#000" 
  
	mid=mid+minval
	var kw=widefac*275/(nn*tval/(maxval-mid))
	var kh=highfac*275/(nn*tval/(maxval-mid))
	for (i = 0; i < nn; i++) {
		
		sx+=(func(d)-mid)*kw + ((svgz*30)/nn)
		sy+=(func(d)-mid)*kh
		
		
		if(sx>(svgz)){sx=0}else if(sx<0){sx=svgz}
		if(sy<0){sy=svgz}else if(sy>svgz){sy=0}
		
		if ((i%nw)!=0){ continue }
	  
		ctx.fillRect(sx,sy,dtsz,dtsz)
    
	}
	
	ctx.globalAlpha=0.7;
  ctx.fillStyle = "#f00" 
  ctx.fillRect(sx,sy,bdtsz,bdtsz)
	
	
	ctx.globalAlpha=1;
	ctx.fillStyle = "#000"
	ctx.font="bold 18px sans-serif";
	ctx.textBaseline = 'top';
	ctx.lineWidth = 2.3;
	ctx.strokeStyle = 'white';
	var tfx=fmtplace(tval)
	var tfxa=fmtplace(Gminval)
	var tfxb=fmtplace(Gmaxval)
	ctx.strokeText(Gminval.toFixed(tfxa)+" min",2,3)
  ctx.fillText(Gminval.toFixed(tfxa)+" min",2,3)
	ctx.strokeText(Gmaxval.toFixed(tfxb)+" max",2,20)
  ctx.fillText(Gmaxval.toFixed(tfxb)+" max",2,20)
	ctx.strokeText(tval.toFixed(tfx)+" avg dlt",2,svgsc*svgz-18)
  ctx.fillText(tval.toFixed(tfx)+" avg dlt",2,svgsc*svgz-18)

	return canv
}


var cid=0;

function twodim_dist_canv(func,d)
{
	var minval=Infinity,maxval=-Infinity,tval=0,fb=0 
	for(var i=0;i<vgsc*8;i++)
	{ var f=func(d)
		if(f>maxval) { maxval=f }
		if(f<minval) { minval=f }
		tval+=Math.abs(f-fb)
		fb=f
	}
	
	tval=tval/(vgsc*8)

  fnstats.minval=minval,fnstats.maxval=maxval
  ,fnstats.tval=tval,fnstats.fb=fb
  
	var dist=maxval-minval
	var mid=dist/2
	var widefac=svgz/dist
	var highfac=svgz/dist

	var canv = document.createElement('canvas');
	canv.id = "canvasid"+(cid);
	canv.class = "canvasclass"+(cid++);
	canv.height = svgsc*svgz; //get original canvas height
	canv.width = svgsc*svgz; // get original canvas width
  canv.style.float="left";
  canv.style.background="#fff";
  
  var ctx = canv.getContext("2d");
	ctx.globalAlpha=0.4;
  
	mid=mid+minval
	
	var tcnt=0
	var distn=48
	var distel=svgz
	var dst=[]
	var colz=[ "#403","#080","#403","#080","#403","#080","#403",
	           "#052","#7a0033","#052","#7a0033","#052","#7a0033","#052", ]
	var colcn=0;
	
	for(i=0;i<distel;i++){ dst[i]=0; }
	
	for (i = 0; i < vgsc*6; i++) {
		var xx=(func(d)-minval)
		dst[((xx)/dist*(distel))>>>0]++
		var yy=(func(d)-minval)
		dst[((yy)/dist*(distel))>>>0]++
		tcnt+=2;

    colcn=(colcn==13)?0:colcn+1
    ctx.fillStyle = colz[colcn]
     
		ctx.fillRect(xx*widefac, yy*highfac, dtsz, dtsz);	
		
	}	

  for (i = 0; i < vgsc*31; i++)
  {
    var yy=(func(d)-minval)
		dst[((yy)/dist*(distel))>>>0]++
		tcnt++;
  }

  var gm=0
	
	for (i = 0; i < distel; i++)  gm=gm<dst[i]?dst[i]:gm 
	
	ctx.globalAlpha=1;
	
	for (i = 0; i < distel; i++) {
		
		xx= i*0.99
		yy= svgz- (dst[i]/gm)*svgz
		
		ctx.fillStyle = "#006"
		ctx.fillRect(xx,yy,ddtsz,ddtsz)
		
	}	
	
	ctx.fillStyle = "#000"
	ctx.font="bold 20px sans-serif";
	ctx.textBaseline = 'top';
	ctx.lineWidth = 2.3;
	ctx.strokeStyle = 'white';
	Gminval=minval
	Gmaxval=maxval
	//~ ctx.strokeText(" "+minval.toFixed(tfxa)+"  :  "+maxval.toFixed(tfxb),3,6);
	//~ ctx.fillText(" "+minval.toFixed(tfxa)+"  :  "+maxval.toFixed(tfxb),3,6);

	return canv
}