import java.util.Random;

class tmine implements Runnable
{ 
  static int ultima=80173;
  static long cnt=0L;
  int finale=0x7fffffff;
	int twv;
  int acan;
	
  public static void main(String[] args) /* main */
  { (new Thread( new tmine() )).start();
    (new Thread( new tmine() )).start();
    //(new Thread( new tmine(2) )).start();
    //(new Thread( new tmine(3) )).start();
    }                 

  public tmine()         /* constructor */
  { }

	public void run() {
    //System.out.println("Thread running with v="+twv);
    
		int weave=0,stitch=0,silk=1,as=0,woon,bs=0;
		int w1,w2;
		long cn;
		long zang1=0,zang2=0,zmax=0,zmin=0;
		boolean take=false;
		do{
		  bs=0;as=0;
			zang1=0;zang2=0;
			take=false;
      cn=lcount();
			weave=nextweave();
			woon=(weave^(weave>>18)^(weave>>12))&0x0fffff|0xc00000;
      w1=weave&0x7ffff;
			w2=(weave>>>19)*2+1;
			stitch=0; 
			silk=1;
      //woon=13548387;
			do{ 
			  stitch++;
			  bs=as;as=silk;
				silk= ((silk)*woon)^weave; 
				//silk^= silk<<13;silk^=silk>>>17;silk^=silk<<5;
				zang1+=Math.abs((long)(as-silk))+Math.abs((long)(bs-silk));
			}
			while(stitch<23000000);			

      //zang1=zang1>>>30;
      zang1=zang1>>>38;
			if(zang1==179678L){ take=true; }
      //~ zang1=zang1>>>42;
			//~ if(zang1==11229L){ take=true; }
			//~ if(zang1==44919L){ take=true; }
			//if(zang1==45997679L){ take=true; }
			//if(zang1==45997679L){ take=true; }

			if(take){
			do{ 
			  stitch++;
			  bs=as;as=silk;
				silk= ((silk)*woon)^weave; 
				//silk^= silk<<13;silk^=silk>>>17;silk^=silk<<5;
				//zang1+=(long)((as-silk)>>>1)+(long)((bs-silk)>>>1);
			}
			while(as!=silk&&stitch!=0&&silk!=1);			
		  }
			
			long st=stitch&0x0ffffffffL;
		
			if(silk==1&&(stitch==0 || (stitch&0x0ffffffffL)>0x0fdffffffL))
      {	System.out.print((weave&0x0ffffffffL)+","+woon+" has period:"+st+" zang"+zang1+" "
			  +Integer.toBinaryString(weave)+"\n"); }
		  else
		  { if(weave%20000==0){ System.out.print("("+(woon&0x0ffffffffL)+")\n "); } 
			}
			
		}while(true);  
  }	
	//1973037067  1071027214 has period 4293798719
	public static int nextweave()
	{
		 ultima^= ultima<<13;ultima^=ultima>>>17;ultima^=ultima<<5;
		 //ultima++;
		 return ultima;
	}
	public static long lcount()
	{
		 cnt++;
		 return cnt;
	}
	
	public static int binlog( int bits ) // returns 0 for bits=0
	{
		int log = 0;
		if( ( bits & 0xffff0000 ) != 0 ) { bits >>>= 16; log = 16; }
		if( bits >= 256 ) { bits >>>= 8; log += 8; }
		if( bits >= 16  ) { bits >>>= 4; log += 4; }
		if( bits >= 4   ) { bits >>>= 2; log += 2; }
		return log + ( bits >>> 1 );
	} 
}