import java.util.Random;

class findlcp implements Runnable
{ 
  static int s_twist=524287;
  static long s_pot=0L;
  int finale=0x7fffffff;
	
  public static void main(String[] args){ /* main */
    (new Thread( new findlcp() )).start();
    (new Thread( new findlcp() )).start();
    //(new Thread( new findlcp() )).start();
    //(new Thread( new findlcp() )).start();
  }                 

  public findlcp() { }         /* constructor */

	public void run() {
    
		while(true)
		{
		
		long day=0;
		long season=2L;

		double runner=0.5d,vine=0.5d;    
		double spot=0;		
		
		double parX =(Math.random()+Math.random()*Math.random())*19.2786794564+1.123;
		double parY =((Math.random()+Math.random()*Math.random())+1)/4.2+0.211;
			
		do{ 
			runner = vine*parX + runner*parY;
			vine=vine-((int)vine);
			day++;
		}while( day!=season );			
		
		do{ 
			season+=season/2;
			spot=runner;
			
			do{ 
				runner = vine*parX + runner*parY;
				//System.out.println(vine+" "+runner);
				vine=runner-((int)runner);
				day++;
			}while( day!=season && spot!=runner);			
      
		}while( day<10000000000L && spot!=runner );			
		
		System.out.println("Days were "+
		((int)((Math.log(day)*Math.log(2))*100)/100)
		+" for "
				+parX+" and "+parY+ " "+runner); 
    }

  }	
	
	public static int nexttwist()
	{
		 //s_twist^= s_twist<<13; s_twist^=s_twist>>>17; s_twist^=s_twist<<5;
		 return 0;
	}
	
	public static long nextpot(){ return 0; }
	
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