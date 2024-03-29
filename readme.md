Fdrandom.js
===========
A fast deterministic random helper library for Javascript.

### Features

* A fast tested internal PRNG.  
* Many distribution options are illustrated on the [test page](http://strainer.github.io/Fdrandom.js/).
* Quasi random walks and fill patterns.
* String & array mix, shuffle and 'antisorting' functions.

Usage
-----
```javascript 
<script src='Fdrandom.js'></script>

double_value  = Fdrandom.next()     // 0 to 0.999999999999998
signed_int_value = Fdrandom.i32()   // -2147483648 to 2147483647
unsigned_int_value = Fdrandom.ui32()// 0 to 4294967295

let apot = Fdrandom.pot(seed) //a seeded clone of Fdrandom
int_val = apot.i32()
let hpot= Fdrandom.hotpot() //an unpredicatably seeded clone
arandhex = hpot.mixof("0123456789abcdef","0x",8)
```	
	
Method list	
-----------

### Equal Distribution Prngs

Method	 | Speed % | Notes                         
 :------ | :-----: | :----------------------------
random   |   100   | Standard randoms with 48bit resolution
f48      |   100   | Alias of random (0 to 0.999999999999998)  
dbl      |   50    | Same as next/f48 with 53 bits resolution
f24      |   90    | Safe values for Float32array (0 to 0.99999994)
  &nbsp; |         |                               
i32      |   80    | 32 bit signed integer values
ui32     |   80    | 32 bit unsigned integer values
  &nbsp; |         |                               
rbit     |   150   | 0 or 1 
rpole    |   140   | -1 or 1 
  &nbsp; |         |
range    |   90    | Uniformly distributed numbers in range          
irange   |   70    | Uniformly distributed integers (inclusive)              
vrange   |   30    | Middle/end loaded numbers in range
zrange   |   5     | Dynamically distributed numbers in range
	
### Normal Distribution Prngs

Method	| Speed % | Notes                           
 :----- | :-----: | :------------------------------
gaus    |   20    | Fast high quality gaussians        
cauchy  |   10    | Cauchy distribution           
usum    | 25@n=4  | Custom uniform sum 
gnorm   |   30    | Normal curve shaped game distribution 
gcauchy |   15    | Cauchy curve shaped game distribution 

### Other Distributions

Method | Speed % | Notes                                  					
 :---- | :-----: | :-------------------------------------
qskip  |   30    | Low discrepancy floats (custom spaced)        
qxskip |   20    | Curious discrepancy (see chart)        
qhop   |   10    | Curious discrepancy (see chart)
qtrip  |   10    | Curious discrepancy (see chart)
fillr1 |   30    | HQ Line staggered fill pattern        
fillr2 |   25    | HQ Square staggered fill pattern        
fillr3 |   20    | HQ Cube staggered fill pattern        
ggrad  |   50    | Linear gradient distribution 
ngrad  |   50    | Normal gradient distribution 
gspill |   50    | Linear with drop off distribution 
ghorn  |   50    | Like normal but peaked dist. 
gbands |   50    | Triangular approximation with bands. 
gpick  |   50    | Custom variance, sharp or smooth. 
gskew  |   50    | Smooth skewed range middle average. 
gbowl  |   50    | Bowl shaped distribution 
gthorn |   30    | Thorn shaped distribution 
gteat  |   30    | Teat shaped distribution  
gtrapez|   50    | Trapezoid distribution 
uigless|   50    | Unsigned 1/4 bit density game dist.       
uigmore|   50    | Unsigned 3/4 bit density game dist.      
igmmode|   50    | Signed multi modal game dist.      
igbrist|   50    | Signed bristly game dist.      
           
### Random Pick and Mix

Method | Speed % | Notes                                  					
 :---- | :-----: | :-------------------------------------
mixof  |  fast   | Make a mix of elements or chars length n   
mixup  |  fast   | Randomly mix up order of elements in an array or string        
antisort| medium | Specialy mix up order of elements in an array. 
aindex  | medium | Return an antisorting index of array      
aresult |        | Report the minimum delta achieved by antisort

### Instantiation

Method  |Speed % | Notes
 :----- | :-----:| :-------------------------------------
pot     | 0.005  | Clone and seed Fdrandom object (pot)    
hotpot  | 0.005  | Clone Fdrandom using seeds from browser crypto  
repot   | 5>0.5% | Resets or reseeds an existing pot
getstate|  5%    | Gets an array containing state of a pot
setstate|  5%    | Sets state of pot with array (no reseeding)
 &nbsp; |        | 
version |        | prints version
checkfloat|      | checks float math is compliant for expected output

### Helpers
Method | Notes
 :---- | :----------------
bulk   | returns an array filled with the supplied function
within | runs a generator up to n times
 
A compact api reference is [here](./fdrandom.api)

Speed & Quality
---------------
The percentages in the above tables are very rough as VM
performance varies. Fdrandoms default method:`f48` runs at about 
same speed as both Firefox and Chromes native Math.random in 2017.

`f48` and 'dbl' have no detectable bias across over 10^16 outputs and 
each has at least 48 bits of resolution which are tested as passing 
G Marsaglias old but quite substantial `diehard` test suite.

`Math.random` on Chrome had detectable statistical bias and only 
32 bits of resolution in 2016. Firefoxs `Math.random` was using its 
slow *cryptographic* PRNG but in 2017 is updated to a good quality
PRNG faster than fdrandoms. 

f48 algorithm is informed by J.Baagoe's PRNG `Alea` which 
seems to be the fastest form of high quality prng for vanilla
javascript to date. f48 uses different multipliers in a slightly adjusted 
mechanism to output 16 more bits of resolution per number than 
Alea v0.8 while achieving similar speed.

Seeding Pots
------------
`Fdrandom.repot(seed)` will reset or reseed a pot.  
`Fdrandom.pot(seed)` returns a clone of Fdrandom seeded by numbers
and strings in all elements of the object `seed`.
To maximally seed the prng requires 9 or 10 completely unpredicatable 
50 bit numbers or hundres of text characters. 
Practical seeding can be achieved by sending an array containing
public user strings, or private unique ids, or a single number or 
nothing depending on the level of uniqueness desired.
 
`Fdrandom.hotpot(seed)` returns an unpredictable clone which includes
seeds from browser crypto if available, and date and Math.random
if not available.
 
Seeding pots with same data or setting same state produces identical 
random number streams. Any difference in seeds should result in very 
different streams.

Seeding digests all elements of any array or object up 1000 deep 
and strings up to 100,000 char. It could be used with repot() to
effectively hash objects but is somewhat slow for that.

'Pot'ing is a relatively slow operation (about 50,000 op/s) as
the Fdrandom object gets cloned for each pot. 'Repot'ing with
a new seed is much faster. 'repot' without a seed resets to
first potted state and is very fast. 

`Fdrandom.hot()` (or `anypot.hot()`) is a static 'hot' (indeterminable)
instance for speed and convienience. Note that methods like gaus(), gskip(), 
zrange() and aresult() require an independant instance (pot or hotpot) for 
full continuity of results.

Precision/Types
---------------
`i32` returns number values equivalent to signed 32 bit integers  

`ui32` returns number values of unsigned int values

`f48`  alias `next` returns JS Numbers with 48 bits of precision in range 0 to 0.999999999999998 
                                   
`dbl` returns JS Numbers with all 53 bits of their mantissa utilised (0 to 0.999999999999999**9**).

`f24` is designed to be cast to float32 arrays sometime, this is the only reason 
to use it (for opengl etc). `f24` has 48 bits of precision but scales short of 1 
enough to not round-up when cast into float32 array. Because the float32 type only 
has 24 bits of practical precision, this can introduce a tiny but noticable bias to 
the sum of millions of output values.
	
Benchmarking and Testing
------------------------
Diehard reports for the generators are in the directory `reports`

The `drafts` directory contains messy code and node scripts used to discover and 
test the generators and methods.

Examples
--------
```javascript

p=Fdrandom.pot()

oneToTenFloat = p.range(1,10)    //end is not (quite) inclusive
oneToTenInteger=p.irange(1,10)   //end is inclusive

minusOneToOne_FlatDist =p.lrange(0,1,0.5) //loaded range. 
minusOneToOne_EndBias =p.lrange(0,1,0.4)  //First param sets a loading factor
twoToFive_MidBias = p.lrange(2,5,0.6) //0= High ends, 0.5=Flat, 1=High Mid

rangeInUnknownDist = p.zrange(0,1) //0to1 in a dynamicly changing distribution

random0or1 = p.rbit()   //random bit
random0or1 = p.rpole()  //random -1 or 1

gaussianNormal = p.gaus()
gaussianMath = p.gaus(stndev,mean) //default stndv=1, mean=0
uniformSum = p.usum(n)             //add n*( -0.5 > 0.5 ) randoms
uniformSum = p.usum(n,stndev,mean) //scale to stnd deviation and mean

cauchy = p.cauchy(scale,mean) //cauchy distribution tends towards excessive values 

limitedcauchy = p.within(-10,10,function(){return p.cauchy(scale,mean)},13) 
//'within' calls the callback up to 13 times, until value is in range.
//if never in range returns range(-10,10) 

normGame = gnorm()      //approx gaussian shape range -1 to 1
normGame = gnorm(2,4.5) //same shape range 2 to 4.5
cauchyGame = gcauchy(2,4.5) //cauchy shape range 2 to 4.5
oftenMid = gpick()      //sharp peak in middle, range -1 to 1
oftenMid = gpick(p,q)  //same shape over range p to q
oftenMid = gpick(p,q,s)  //s=sharpness : 0 flat, <0 sharper, >0 blunter  
```
See the [Charts](http://strainer.github.io/Fdrandom.js/) for gaming distributions

### Mixup/Pick:
```javascript
inray =["0","1","2","3","4","5","6","sha","la","la"] 
instr ="0123456789abcdef" 
outray=[1,2,3]
outstr=""

//mixup(in,[out=in],[in_start=0],[in_fin=len]) //mixes inplace or add to out

p.mixup(inray,2,4) //mixes up elements 2 to 4
p.mixup(instr,2,4) //mixes up chars at 2 to 4

//return in a string mixed up chars from 2 to 4
newstr = p.mixup(instr,"",2,4) 

//mixes up chars at 2 to 4 onto end of outray
p.mixup(instr,outray,2,4) 

//all inray mixed onto end of outstr
p.mixup(inray,outstr) 

//mixof (in,[out=intype],[n=1],[in_st=0],[in_fn=len])

hexstr = p.mixof(instr,"0x",8)   //like mixup but mix*of* 
decstr = p.mixof(inray,"",8,3,7) //string of 8 elements 3 to 7  
mxdarr = p.mixof(inray)          //1 element of all
mxdarr = p.mixof(instr,[],2)     //2 of instr as array

//eg. make a random uuid:
h=p.hot()
UUIDv4 = h.mixof(instr,8) +
   "-" + h.mixof(instr,4) + 
   "-4"+ h.mixof(instr,3) +
   "-" + h.mixof(instr,h.mixof("89ab",1),3) +
   "-" + h.mixof(instr,12); 

//antisorting
playShuffleIndex= p.aindex(medialist)    //antisorting index same length as input
playListCopied= p.antisort(medialist,[]) //a playlist shuffled by its antisort
hardShuffleIndex= p.aindex(100)          //a generic antisort-index 100 long

//bulk results in array
arrayOfFunc= p.bulk(100 ,p.irange ,1 ,6) //array of 100 dicerolls
...  
```

Antisorting 
-----------

While sorting entails moving the most similar items together into a simple 
incremental pattern, "antisorting" could mean the opposite - to arrange the most similar items to *not* be placed close to each other.

Functions `antisort` and `aindex` are designed for this: 
* `antisort(inarray, ..opts)` quasi-randomly shuffles arrays out of order. 
* `aindex(array or length, ..opts)` returns an 'antisorted index' for accessing arrays out of order.
 
The functions can re-arrange by elements input indices (which works on any pre-ordered arrays of the same length), or by elements numeric values such as song quality ratings, ages or sizes (which works on the particular distribution of those values). The output is quite randomly shuffled or indexed **except** items of similar value (or source position) are not placed next to each other. The algorithm used is basically a random shuffle followed by dithered checking and swapping values until all are separated.

File `antisort.md` contains more notes on antisorting. 

Version History
---------------
* 3.2.0 - Improve zrange, state resetting is changed.  
* 3.1.0 - Add ngrad distribution (half bell shape) 
* 3.0.0 - Add new quasi-random and game distributions and retire some. Faster gnorm. 
* 2.8.0 - object seeding tweaked 
* 2.7.0 - added 'R' fill patterns of Martin Roberts. From [Article](http://http://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/) 
* 2.6.0 - added cauchy and gcauchy functions, and 'within' helper
* 2.5.0 - tweaked zrange to have drifting average
* 2.4.0 - created zrange, a dynamic distribution generator
* 2.3.2 - improved usum. Made hot() static, added hotpot()s
* 2.3.0 - tweaked seeding slightly
* 2.2.0 - made hot pots non static and tweaked rbit and rpole
* 2.0.3 - improved aindex parameters
* 2.0.1 - augmented aresult()
* 2.0.0 - added antisorting
* 1.4.1 - revised seeding