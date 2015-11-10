floatop = (function () { //thanks stackoverflow.com/users/1615483/paul-s
  
	var aint =   new Uint32Array(1),
      bint =   new Uint32Array(2),
      afloat = new Float32Array(aint.buffer);
      bfloat = new Float64Array(bint.buffer);
		
	return {
		i2f: function (i) { aint[0] = i; return afloat[0]; },
		d2f: function (d) { afloat[0] = d; return afloat[0]; },
		f2i: function (f) { afloat[0] = f; return aint[0]; },
		
		i2d: function (i,i2)  { bint[0] = i,bint[1] = i2; return bfloat[0]; },
		ds: function()        { return bfloat[0]; },
		d2iM: function (d)    { bfloat[0] = d; return bint[0]; },
		d2iL: function (d)    { bfloat[0] = d; return bint[1]; },
	  
		id: function ()  { return bfloat[0]; },
		diM: function () { return bint[0]; },
		diL: function () { return bint[1]; },
	
		inc: function (f) { //normalisation may cnfnd
			afloat[0] = f; aint[0] = aint[0] + 1;
			return afloat[0];
		},
		dec: function (f) { //normalisation
			afloat[0] = f; aint[0] = aint[0] - 1;
			return afloat[0];
		}
	};
}());