Fdrandom.js
===========
Fast deterministic random functions for javascript.

### Features

* Very efficient, high quality PRNG. 
* Single 6Kb Unlicensed source.
* Integer, single and double precision float values.
* Range, boolean, mixup, mixof functions.
* Distribution options: 
  *	Unbiased uniform distribution. 
  *	Gaussian distribution by Polar Box Muller method, 
  *	Normal approximated by Uniform Sum.   	
  *	Low discrepency Quasi random (more spaced apart)
  *	Miscellaneous Gaming distributions

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
f48      |   100   | Standard Number rands with 48bit resolution 
next     |   100   | Alias of f48 (0>0.9999999999999999)                  
fxs      |   50    | As f48 with 52 bits resolution (excessive)
f24      |   90    | Safe values for Float32array (0>0.99999994)
         |         |                               
i32      |   90    | 32 bit signed integer values
ui32     |   90    | 32 bit unsigned integer values
         |         |                               
rndbit   |   150   | 0 or 1 
range    |   90    | Uniformly distributed Numbers in range          
irange   |   70    | Uniformly distributed integers (inclusive)              
	
### Normal Distribution Prngs

Method	| Speed % | Notes                           
 :----- | :-----: | :------------------------------
gaus    |   20    | Fast high quality gaussians        
gausx   |   15    | Excess resolution employed           
usum    |n*8=     | Custom Uniform sum 

### Other Distributions

Method | Speed % | Notes                                  					
 :---- | :-----: | :-------------------------------------
f48ld  |   90    | low discrepancy floats (custom spaced)        
f48gz  |   80    | small value fluctuating game distribution 
ui32gl |   80    | unsigned 1/4 bit density game dist.       
ui32gh |   80    | unsigned 3/4 bit density game dist.      
ui32gx |   80    | signed game dist.      
ui32gy |   80    | signed game dist.      
i32lz  |  150    | a simple lcg (fails many rnd tests)  
i32sh  |   90    | a fast shift register generator 
           
### Other methods

Method | Speed % | Notes                                  					
 :---- | :-----: | :-------------------------------------
mixup  |  fast   | Randomize order of elements in an array or string        
mixof  |  fast   | Make a random mix of elements or chars length n   
pot    |         | Clone Fdrandom with a seed    
hot    |         | Clone Fdrandom using seeds from browser crypto  


Speed & Quality
---------------
The percentages in the above tables are very general as js engine
performance varies.

`Math.random` on Chrome has detectable statistical bias and only 
32 bits of resolution but is fast. 
`Math.random` on firefox is cryptographic but is slow.
`Fdrandom.f48` has no detectable bias across over 10^16 outputs
and each has at least 48 bits of resolution which are tested
as passing george marsaglias old but substantial diehard test suite.
It has yet to be tested by the most comprehensive means, 
but shows no issues so far.

Fdrandoms default method:`Fdrandom.f48` runs at approximately 
same speed as Chromes native Math.random and faster still on firefox. 
It runs considerably faster than Firefoxes native Math.random.
On Firefox even `gaus` runs about as fast as Math.random. 

The algorithm was developed informed by J.Baag�e's Alea PRNG
which seems to be the fastest form of high quality prng for 
javascript revealed to date. It uses different multipliers
in a slightly adjusted mechanism to output 16 more bits of 
resolution per number than Alea v0.8 while achieving similar
speed.

Seeding Pots
------------
`Fdrandom.pot(seed)` returns a clone of Fdrandom seeded by numbers
and strings in all elements of the object `seed` sent.
To maximally seed the prng requires 9 or 10 completely unpredicatable 
50 bit numbers or hundres of text characters. 
Practical seeding can be achieved by sending an array containing
public user strings, or private unique ids, or a single number or 
nothing depending on the level of uniqueness desired.

`Fdrandom.hot(seed)` returns an unpredictable clone which includes
seeds from browser crypto if available, and date and Math.random
if not available.

Seeding pots with same data or setting same state of course
produces identical random number streams.

Potmaking is a relatively slow operation (about 20,000 op/s) as
the Fdrandom object gets cloned for each pot. 

In performance critical contexts pots can be pre-initialised and 
recycled if required. Getting and Setting pot states is very fast. 
	
Precision/Types
---------------
i32 returns number values equivalent to signed 32 bit integers 
which can be reinterpreted as unsigned by the javascript idiom 
of `val>>>0` for 'unsigning'  , `val|0` 're-signs' 

ui32 methods return number values of unsigned int values

The equal distribution float type methods return the 'unit interval'
which should involve all possible values between 0 and 1 including both ends.
However math random libraries usually stop just short of 1, so
Fdrandom.js does too. This can help in formulas which need
to avoid zero, eg. `something/(1-unitrandom)` avoids the possibility of
division by zero when `unitrandom` cannot be 1.

`fxs` returns JS Numbers (double floats) with all 52 bits of
their maximum precision utilised.

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

Project Version
---------------
This is a belaboured but unfinnished release. Most functions have been tested 
and tweaked but some errors will have not been spotted yet and notes and tools
are in disarray.

Examples
--------
```javascript

p=Fdrandom.pot()

oneToTenFloat=  p.range(1,10)  //end is not (quite) inclusive
oneToTenInteger=p.irange(1,10) //end is inclusive
random0or1 = p.rndbit()

gaussiannormal=p.gaus()
gaussianmath=p.gaus(sigma,mu) //sigma is ~scale, mu is offset
uniformsum=p.usum(n)   //add n -0.5>0.5 randoms
uniformsum=p.usum(n,sigma,mu) //to scale and shift with sigma and mu

var inray=["a","b","c","d","e"] 
var instr="0123456789abcdef" 
var outray =[1,2,3]
var outstr ="

p.mixup(inray,2,4) //mixes up elements 2 to 4
p.mixup(instr,2,4) //mixes up chars at 2 to 4

//mixes up chars at 2 to 4 into newstr
var newstr=p.mixup(instr,"",2,4) 

//mixes up chars at 2 to 4 onto end of outray
p.mixup(instr,outray,2,4) 

//same onto end of outstr
p.mixup(instr,outstr,2,4) 

var hexstr=p.mixof(instr,"0x",8) 
var decstr=p.mixof(instr,"",8,0,9) 
...
```
