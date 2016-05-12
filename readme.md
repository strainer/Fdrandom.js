Fdrandom.js
===========
Fast deterministic random functions for Javascript.

### Features

* Fast tested PRNG.  
* Integer, single and double precision float values.
* Range, loaded, boolean, mix and antisort functions.
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
lrange   |   30    | Middle/end loaded numbers in range
	
### Normal Distribution Prngs

Method	| Speed % | Notes                           
 :----- | :-----: | :------------------------------
gaus    |   20    | Fast high quality gaussians        
gausx   |   15    | Possibly needless extra resolution employed           
usum    | 25@n=4  | Custom uniform sum 

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
ishr2  |   60    | A fast flawed shift register generator 
           
### Other Methods

Method | Speed % | Notes                                  					
 :---- | :-----: | :-------------------------------------
mixup  |  fast   | Randomize order of elements in an array or string        
mixof  |  fast   | Make a random mix of elements or chars length n   
antisort| medium | Special staggered random shuffle. 
aindex  | medium | Return an antisorting index of array      
aresult |        | Report the minimum delta achieved by previous antisort
        |        |
pot     | 0.005  | Clone and seed Fdrandom object (pot)    
hot     | 0.005  | Clone Fdrandom using seeds from browser crypto  
repot   | 5>0.5% | Resets or reseeds an existing pot
getstate|  5%    | Gets an array containg state of a pot
setstate|  5%    | Sets state of pot with array (no reseeding)
        |        | 
version |        | prints version
checkfloat|      | checks float math is compliant for expected output

Speed & Quality
---------------
The percentages in the above tables are very rough as js engine
performance varies.

Fdrandoms default method:`Fdrandom.f48` runs at about 
same speed as Chromes native Math.random. On Firefox it runs faster 
than native Math.random.

`Fdrandom.f48` has no detectable bias across over 10^16 outputs
and each has at least 48 bits of resolution which are tested
as passing G Marsaglias old but substantial diehard test suite.
It has yet to be tested by the most comprehensive means, 
but shows no issues so far.

`Math.random` on Chrome has detectable statistical bias and only 
32 bits of resolution. Firefoxs `Math.random` has cryptographic 
quality but is slow.

f48 algorithm is informed by J.Baagoe's PRNG `Alea` which 
seems to be the fastest form of high quality prng for javascript 
to date. f48 uses different multipliers in a slightly adjusted 
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
 
`Fdrandom.hot(seed)` returns an unpredictable clone which includes
seeds from browser crypto if available, and date and Math.random
if not available.
 
Seeding pots with same data or setting same state produces identical 
random number streams. Any difference in seeds should result in completely 
unrelatable streams.

Seeding digests all elements of any array or object up 1000 deep 
and strings up to 100,000 char so might be used with repot() to
effectively hash objects.

'Pot'ing is a relatively slow operation (about 50,000 op/s) as
the Fdrandom object gets cloned for each pot. 'Repot'ing with
a new seed is much faster. 'repot' without seed resets to
first potted state and is very fast. 

Precision/Types
---------------
`i32` returns number values equivalent to signed 32 bit integers  

`ui32` returns number values of unsigned int values

`f48`  alias `next` returns JS Numbers (double precision float) with 
48 bits of precision in range 0 to 0.9999999999999999

`dbl` returns JS Numbers with all 53 bits of their mantissa utilised.

`f24` is designed to be cast to float32 arrays sometime, this 
is the only reason to use it (for opengl etc). `f24` actually 
has 48 bits of precision but scales short of 1 enough to not
round up when cast into float32 array. Because the float32 type 
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

oneToTenFloat = p.range(1,10)  //end is not (quite) inclusive
oneToTenInteger=p.irange(1,10) //end is inclusive

minusOneToOne_FlatDist =p.lrange(0.5) //loaded range. 
minusOneToOne_EndBias =p.lrange(0.4) //First param sets a loading factor
twoToFive_MidBias = p.lrange(0.6,2,5) //0= High ends, 0.5=Flat, 1=High Mid

random0or1 = p.rbit()  //random bit

gaussianNormal = p.gaus()
gaussianMath = p.gaus(sigma,mu) //sigma is ~scale, mu is offset
uniformSum = p.usum(n)   //add n*( -0.5 > 0.5 ) randoms
uniformSum = p.usum(n,sigma,mu) //to scale and shift with sigma and mu
gausGame = p.usum(4,1)    //a quick rough approximation of gaussian

normGame = gnorm()      //approx gaussian shape range -1 to 1
normGame = gnorm(2,4.5) //same shape range 2 to 4.5
oftenMid = gthorn()     //sharp peak in middle, range -1 to 1
oftenMid = gthorn(p,q)  //same shape over range p to q
```
see [Charts](http://strainer.github.io/Fdrandom.js/) for gaming distributions
```
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

mediaShuffleIndex=p.aindex(medialist) //an antisorting index length of input
mediaList=p.antisort(medialist,[])    //medialist shuffled by its antisort
hardShuffleIndex =p.aindex(100)  //100 long antisorting index for small window sampling

//bulk(in_array|length[,function=f48][,param1][,param2][,param3]) returns array of func(,,)
arrayOfFunc= p.bulk(100 ,p.irange ,1 ,6) //array of 100 dicerolls

...  
```

Antisorting
-----------

`aHardShuffleIndex = p.aindex(orderedListLength)`

As much as sorting involves moving most similar items together into a simple 
incremental pattern; "antisorting" could be moving items out of a simple pattern 
and ensuring the most similar members are not placed close to each other.

An obvious use for this is media playlist shuffling.
It might also be used to tweak the sampling of ordered data when using a small
window/sample size.
 
Functions `antisort` and `aindex` are designed for this: 
 `antisort` hard-shuffles arrays out of order. 
 `aindex` returns an 'antisorted index' for accessing arrays out of order.

They can work on the indices of elements (which assumes they are already sorted)
or on the elements numeric values (such as song number, song quality, age, size)
The array will be quite randomly shuffled and items of similar value (or position)
will not be placed next to each other.

The minimum distance ensured between consecutive values is generated automatically and works out as approximately 9% of the total range. Also, half the 'immediate-neighbour' distance is ensured between '2-doors-away' neighbours. 
So for an antisort of a simple list 0 to 100, the min separation between consecutive elements would be 9 or 10 ,and between 2-away elements will be 4 or 5.

The functions can try to antisort any array of numeric values, but the minimum separation
drops when the values are less diverse. The algorithm is basically a random shuffle
followed by fuzzy checking and swapping values until all are clear. It takes a second or two to antisort a few million awkward values and will time out if data is not diverse enough to be separated by its fuzzy process.

`aresult` returns the approximate value of the minimum separation achieved by the 
previous antisort. If '2-away' separation was abandoned aresult() returns negative value of '1-away'. If no separation was achieved it returns 0.

The intented step of the input can be set eg -10 for `[50,40,30,20,10]` (avoid 30,20 in result). Default is 1 for index antishuffling (1,2,3,4,5 all collide) 

The target separation can be forced:

`q=p.antisort(array,step,septarget)`
`q=p.aindex(songsSortedByNumberByAlbum,1,albumLength*2)`

Setting over 10% separation risks failure and timeout. If septarget is an empty string `""` numeric values are ignored and the array it antisorted by its positions.

These functions parameters are specified in the plain text Fdrandom.api. Charts of its typical distribution are included at the bottom of the [test charts](http://strainer.github.io/Fdrandom.js/) page. 

Version History
---------------
1.9.0 - Added antisorting
1.4.1 - Revised seeding