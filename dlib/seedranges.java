import java.io.*;
import java.util.*;

public final class seedranges
{ 
  public static void main(String[] args)/* main */
  { seedranges strt = new seedranges(args); 
    System.exit(1); }     

  public seedranges(String[] args)
  { 
		/*
		va^= (va<<7)+1498916339; va^= va>>>8   //p is 4294368480 
		vb^= (vb<<6)+1973037067; vb^= vb>>>10  //p is 4294280630
		vc^= (vc<<5)+1334203894; vc^= vc>>>12  //p is 4293793381  	  
    */
		
		long dyL;
		long year=4294967296L;
		long longseason=4294280630L;
		int bseed=0;
		int cseed=0;       
		long pot=0L;
		
		do{		
			
			int vine=cseed;			
			int day=0;
			int season=(int)(year-longseason);
      
			do{ 
				vine^= (vine<<6)+1973037067; vine^=(vine >>>10);
			  day++;			
			}while( day!=season && vine!=cseed );
						
      dyL=(((long)day)&0x0ffffffffL);			
			
			if(dyL<season) //short growth - output seedling interval
			{ System.out.println("pot:"+pot+" cseed:"+cseed+" period:"+dyL
				 +" invl:"+(cseed-bseed)+"  bin:"+Integer.toBinaryString(cseed)); 
				bseed=cseed; }
      
      cseed++; pot++; 			
      
    }while(pot<0x100000000L);    
  }
}
