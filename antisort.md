Antisorting
-----------

As sorting implies moving the most similar items together into a simple 
incremental pattern, "antisorting" could mean the opposite - moving items out of a simple pattern ensuring the most similar items are *not placed close to each other*.

Functions `antisort` and `aindex` are designed for this: 
* `antisort(inarray, ..opts)` 'super-shuffles' arrays out of order. 
* `aindex(array or length, ..opts)` returns an 'antisorted index' for accessing arrays out of order.
 
The functions can re-arrange arrays by their elements initial indices or by elements numeric values such as song quality ratings, ages or sizes. The output will be quite randomly shuffled or indexed **except** items of similar value (or initial position) will not be located next to each other after the antisort. The algorithm used is basically a random shuffle followed by fuzzy checking and swapping values until all are clear.

The minimum distance ensured between consecutive values is generated automatically and works out as approximately 9% of the total range. Half the 'immediate-neighbour' distance is also ensured between '2-doors-away' neighbours. 
So for an antisort of a simple list running 0 to 100 eg `antiList=pot.aindex(100)`, the auto-minimum-separation between consecutive elements will be 8 or 9, and min-separation between '2-away' elements will be 4 or 5. The minimum separation drops when the input values are less diverse (or smaller).  

For diverse values the functions do not take much longer than a standard shuffle, to antisort a few million awkward values takes a second or two and will time-out if data is not diverse enough to be separated by its fuzzy process.

```
antisort([1,1,1,1,2,2,2,2]) //will return [1,2,1,2,1,2,1,2] or [2,1,2,1...]
antisort([1,1,1,2,2,2,2,2]) //will timeout trying to fit the extra 2
```

`aresult()` returns the approximate value of the minimum separation achieved by the previous antisort. If '2-away' separation was not achieved `aresult()` returns a negative value of '1-away' separation (negated). If no separation was achieved it returns 0.

```
/* Examples of aresult() */
k= p.antisort(vals,[])   //2nd param is an output array (to not overwrite input)
approx= p.aresult()      //this recalls approx min separation tracked by algorithm
exact= p.aresult(k,vals) //this computes the exact min separation achieved
h= p.aindex(vals.length) 
exact= p.aresult(h)  //dont pass index array to compute result of inplace antisort. 
```
 
The intended step increment of the input order can be set eg `-10` for `[50,40,30,20,10]` (to avoid 30,20,.. in result). Default is +1 for positional a-sorting (1,2,3,4,5 all collide) 

The target separation can be forced instead of automatic:
```
  q=p.antisort(array,stepInc,sepTarget)
  q=p.aindex(songsSortedByNumberByAlbum,1,albumLength*2)
```
Setting over 10% separation risks failure and timeout. If sepTarget is `"pos"` numeric values are ignored and the array is antisorted by its positions.

Timeout can be set in 'bogoMilliSeconds':
``` 
\\tries to separate inpos by 30 for about 1 second on a modest cpu.
q=p.aindex(numericArray,0,"pos",30,1000)`
\\ same with auto separation.
q=p.aindex(numericArray,0,"pos","auto",1000)`
```
Functions parameters are specified in the plain text `Fdrandom.api`

### A small test of effect on sampling:

When numeric data is antisorted its distribution over position is somewhat smoothed.

Summarizing test code in: `drafts/antidist.js`

For a small test 10,000 random repetitions of 150 random numbers are generated: 
```
tdata=h.mixof( h.bulk(  150, h.range, 0, 1000 }  ), 10000 )
//and sorted... 
tdata.sort( function(a, b){return a-b} )
```
This creates some unevenly distributed sorted test data, its sum and average is calculated. Then the average of n randomly chosen samples is calculated, many times, and the error between the random-sampling-average / full-average is calculated. Then `tdata` is antisorted by position and the same small-window-sample-errors are calculated.   

Output:

| window-len | rand-smp-err | asort-win-err |   aw/rs %  |
| :--------: | :----------: | :-----------: | :---------:|
|      2     |    0.3346    |    0.2964     |    88.6    |
|      3     |    0.2683    |    0.2225     |    82.9    |
|      4     |    0.2334    |    0.1853     |    79.4    |
|      5     |    0.2077    |    0.1619     |    78.0    |
|      7     |    0.1743    |    0.1324     |    76.0    |
|     11     |    0.1392    |    0.1029     |    73.9    |
|     23     |    0.0951    |    0.0693     |    72.8    |
|     59     |    0.0603    |    0.0433     |    71.9    |
|     95     |    0.0468    |    0.0345     |    73.8    |
|    220     |    0.0309    |    0.0238     |    77.0    |
|    447     |    0.0210    |    0.0167     |    79.7    |
|    767     |    0.0160    |    0.0135     |    84.1    |
|   1790     |    0.0098    |    0.0087     |    88.4    |
|   3967     |    0.0056    |    0.0055     |    97.9    |
|   6813     |    0.0032    |    0.0029     |    88.9    |

In this test case estimation of mean was up to 30% more accurate when
selecting samples by a-index than by random. Put another way about 25%
fewer aindex-accessed samples where required to achieve the same
accuracy as randomly-accessed samples. This relationship held for
the test case until sample sizes where surprisingly large (over 100)

Besides this statistical curiosity, a more reliably mixed up shuffle function 
can surely have its uses. 

Charts of the antisort functions typical distribution are included at the bottom of the [test charts page](http://strainer.github.io/Fdrandom.js/), where the results 1 and 2-away separation and lack of other basic patterning is confirmed. 

Public Domain Project - Andrew Strain 2016