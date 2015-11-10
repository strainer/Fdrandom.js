import java.util.Random;

class findtwists implements Runnable
{ 
  static int s_twist=1;
  static long s_pot=0L;
  int finale=0x7fffffff;
	
  public static void main(String[] args){ /* main */
    (new Thread( new findtwists() )).start();
    (new Thread( new findtwists() )).start();
    (new Thread( new findtwists() )).start();
    (new Thread( new findtwists() )).start();
  }                 

  public findtwists() { }         /* constructor */

	public void run() {
    
		int twist=0,day=0,vine=0;
		long pot,dy;
		do{
		
      pot=nextpot();
			twist=nexttwist();
      day=0; 
			vine=0;

			do{ 
			  //~ vine^= ((vine)<<7)+twist; vine^=vine>>>12; //2100157915
			  //~ vine^= ((vine)<<5)+twist; vine^=vine>>>12; //2689,-2083867428
			  vine^= ((vine)<<4)+twist; vine^=vine>>>14;     //2689,-2083867428
				day++;
			}
			while( day!=0 && vine!=0 );			
		  
		  dy=day&0x0ffffffffL;
      
      if (day==0 || (day&0x0ffffffffL)>0x0feffffffL)
      {	System.out.print("\n"+Integer.toBinaryString(twist)+":"
			    +twist+" has period "+dy+"\n"); 
			}else{ 
			  if((day&0x0ffffffffL)>0xc0000000L) 
			  { System.out.print("("+pot+","+twist+") "); } 
			}
		}while(pot!=0x100000000L);  
  
  }	
	
	public static int nexttwist()
	{
		 s_twist^= s_twist<<13; s_twist^=s_twist>>>17; s_twist^=s_twist<<5;
		 return s_twist;
	}
	
	public static long nextpot(){ return ++s_pot; }
	
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