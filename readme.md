Fdrandom.js
===========
Fast deterministic random functions for Javascript.

### Features

* Fast tested PRNG.  
* Integer, single and double precision float values.
* Range, loaded, boolean, mixup, mixof functions.
* Distribution options: 
  * Unbiased uniforms. 
  * Gaussian distribution by Box Muller polar method. 
  * Normal approximated by Uniform Sum.
  * Low discrepency / Quasi random (custom spaced walk)
  * Convenience gaming distributions
  * [Demo Charts](http://strainer.github.io/Fdrandom.js/)
	
Usage
-----
```javascript 
<script src='Fdrandom.js'></script>

double_value  = Fdrandom.next()     // 0 to 0.9999999999999999
signed_int_value = Fdrandom.i32()   // -2147483648 to 2147483647
unsigned_int_value = Fdrandom.ui32()// 0 to 4294967295

separate_seeded_generator = Fdrandom.pot(seed)
int_val = separate_seeded_generator.i32()
arandhex = Fdrandom.hot().mixof("0123456789abcdef","0x",8)
autoseeded = Fdrandom.hot()
```	
	
Method list	
-----------

### Equal Distribution Prngs

Method	 | Speed % | Notes                         
 :------ | :-----: | :----------------------------
next     |   100   | Standard randoms with 48bit resolution
f48      |   100   | Alias of next (0 to 0.9999999999999999)  
dbl      |   50    | As next/f48 with 53 bits resolution
f24      |   90    | Safe values for Float32array (0 to 0.99999994)
         |         |                               
i32      |   80    | 32 bit signed integer values
ui32     |   80    | 32 bit unsigned integer values
         |         |                               
rbit     |   150   | 0 or 1 
rpole    |   140   | -1 or 1 
         |         |
range    |   90    | Uniformly distributed numbers in range          
irange   |   70    | Uniformly distributed integers (inclusive)              
lrange   |   30    | Mid/end loaded numbers in range
	
### Normal Distribution Prngs

Method	| Speed % | Notes                           
 :----- | :-----: | :------------------------------
gaus    |   20    | Fast high quality gaussians        
gausx   |   15    | Possibly needless extra resolution employed           
usum    | 25@n=4  | Custom Uniform sum 

### Other Distributions

Method | Speed % | Notes                                  					
 :---- | :-----: | :-------------------------------------
gskip  |   90    | Low discrepancy floats (custom spaced)        
gnorm  |   30    | Normal curve shaped game distribution 
gload  |   30    | P=1 Normal, 0.5 Uniform, 0 'Anti'-normal 
gbowl  |   50    | Bowl shaped game distribution 
gspire |   50    | Spire shaped game distribution 
gthorn |   30    | Thorn shaped game distribution 
gwedge |   30    | Wedge shaped game distribution 
gteat  |   30    | Teat shaped game distribution  
gtrapez|   50    | Trapezoid game distribution 
uigless|   60    | Unsigned 1/4 bit density game dist.       
uigmore|   60    | Unsigned 3/4 bit density game dist.      
igmmode|   60    | Signed multi modal game dist.      
igbrist|   60    | Signed bristly game dist.      
ilcg   |  130    | A simple lcg (fails many rnd tests)  
ishr2  |   60    | A fast shift register generator 
           
### Other Methods

Method | Speed % | Notes                                  					
 :---- | :-----: | :-------------------------------------
mixup  |  fast   | Randomize order of elements in an array or string        
mixof  |  fast   | Make a random mix of elements or chars length n   
       |         |
pot    | 0.005   | Clone and seed Fdrandom object (pot)    
hot    | 0.005   | Clone Fdrandom using seeds from browser crypto  
repot  | 5>0.5%  | Resets or reseeds an existing pot
getstate|  5%    | Gets an array containg state of a pot
setstate|  5%    | Sets state of pot with array (no reseeding)
        |        | 
version |        | prints version
checkfloat|      | checks float math is compliant for expected output

Speed & Quality
---------------
The percentages in the above tables are very rough as js engine
performance varies.

`Math.random` on Chrome has detectable statistical bias and only 
32 bits of resolution but is fast. 
`Math.random` on firefox is cryptographic but is slow.
`Fdrandom.f48` has no detectable bias across over 10^16 outputs
and each has at least 48 bits of resolution which are tested
as passing G Marsaglias old but substantial diehard test suite.
It has yet to be tested by the most comprehensive means, 
but shows no issues so far.

Fdrandoms default method:`Fdrandom.f48` runs at approximately 
same speed as Chromes native Math.random and faster on firefox. 
It runs considerably faster than Firefoxes native Math.random.
On Firefox even gaussian normal generation runs about 
as fast as Math.random. 

f48 algorithm was developed informed by J.Baagøe's PRNG `Alea` 
which seems to be the fastest form of high quality prng for 
javascript to date. f48 uses different multipliers in a slightly 
adjusted mechanism to output 16 more bits of resolution per 
number than Alea v0.8 while achieving similar speed.

Seeding Pots
------------
`Fdrandom.repot(seed)` will reset or reseed a pot.  
`Fdrandom.pot(seed)` returns a clone of Fdrandom seeded by numbers
and strings in all elements of the object `seed`.
To maximally seed the prng requires 9 or 10 completely unpredicatable 
50 bit numbers or hundres of text characters; however is overkill. 
Practical seeding can be achieved by sending an array containing
public user strings, or private unique ids, or a single number or 
nothing depending on the level of uniqueness desired.

`Fdrandom.hot(seed)` returns an unpredictable clone which includes
seeds from browser crypto if available, and date and Math.random
if not available.
 
Seeding pots with same data or setting same state of course
produces identical random number streams. Any difference in seeds 
should result in completely unrelatable streams.

'Pot'ing is a relatively slow operation (about 20,000 op/s) as
the Fdrandom object gets cloned for each pot. 'Repot'ing with
a new seed is much faster. 'repot' without seed resets to
first potted state and is very fast. 
	
Precision/Types
---------------
`i32` returns number values equivalent to signed 32 bit integers 
which can be reinterpreted as unsigned by the javascript idiom 
of `val>>>0` for 'unsigning'  , `val|0` 're-signs' 

`ui32` returns number values of unsigned int values

The equal distribution float type methods return the 'unit interval'
which should involve all possible values between 0 and 1 including both ends.
However math random libraries usually stop just short of 1, so
Fdrandom.js does too. This can help in formulas which need
to avoid zero, eg. `something/(1-unitrandom)` avoids the possibility of
division by zero when `unitrandom` cannot be 1.

`dbl` returns JS Numbers (double precision float) with all 53 bits of
their mantissa utilised.

`f24` is designed to be cast to float32 arrays sometime, this 
is the only reason to use it (for opengl etc). `f24` actually 
has 48 bits of precision but stops short of 1 just enough to not
round to 1 when cast into float32 array. Because the float32 type 
only has 24 bits of practical precision, this can introduce a tiny 
but noticable bias to the sum of millions of output values.
	
Benchmarking and Testing
------------------------
Diehard reports for the constituent generators are in the directory `reports`

The `drafts` directory contains untidy code and node scripts
used to discover and test the generators and methods.

Examples
--------
```javascript

p=Fdrandom.pot()

oneToTenFloat=  p.range(1,10)  //end is not (quite) inclusive
oneToTenInteger=p.irange(1,10) //end is inclusive

MinusOneToOne_FlatDist=p.lrange(0.5) //loaded range first param 
MinusOneToOne_EndBias=p.lrange(0.4)  //sets a loading factor
TwoToFive_MidBias=p.lrange(0.6,2,5) //0= High ends, 0.5=Flat, 1=High Mid

random0or1 = p.rndbit()  //random bit

gaussiannormal=p.gaus()
gaussianmath=p.gaus(sigma,mu) //sigma is ~scale, mu is offset
uniformsum=p.usum(n)   //add n*( -0.5 > 0.5 ) randoms
uniformsum=p.usum(n,sigma,mu) //to scale and shift with sigma and mu
gausgame=p.usum(4,1)    //a quick rough approximation of gaussian

normgame=gnorm()       //approx gaussian shape range -1 to 1
normgame=gnorm(2,4.5)  //same shape range 2 to 4.5
oftenmid=gthorn()      //sharp peak in middle, range -1 to 1
oftenmid=gthorn(p,q)   //same shape over range p to q
                       //see [Charts](http://strainer.github.io/Fdrandom.js/) for gaming distributions

var inray=["0","1","2","3","4","5","6","7","8","9","sha","la","la"] 
var instr="0123456789abcdef" 
var outray =[1,2,3]
var outstr =""

p.mixup(inray,2,4) //mixes up elements 2 to 4
p.mixup(instr,2,4) //mixes up chars at 2 to 4

//puts into newstr, mixup of chars at 2 to 4
var newstr=p.mixup(instr,"",2,4) 

//mixes up chars at 2 to 4 onto end of outray
p.mixup(instr,outray,2,4) 

//all inray mixed onto end of outstr
p.mixup(inray,outstr) 

var hexstr=p.mixof(instr,"0x",8)   //like mixup but mix*of* 
var decstr=p.mixof(inray,"",8,0,9) //8 of 0 to 9  
var decchr=p.mixof(inray)          //1 of 0 to 9 as an element  

//no output object will add to end of input object (inray)
decstr=p.mixof(inray,8,0,9)    

//eg. make a random uuid:
h=p.hot()
UUIDv4 = h.mixof(instr,8) +
   "-" + h.mixof(instr,4) + 
   "-4"+ h.mixof(instr,3) +
   "-" + h.mixof(instr,h.mixof("89ab",1),3) +
   "-" + h.mixof(instr,12); 
...  
```