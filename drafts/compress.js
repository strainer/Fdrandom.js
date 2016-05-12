var UglifyJS = require('uglify-js');
var fs = require('fs');

var result = UglifyJS.minify('../Fdrandom.js', {
	mangle: true,
	compress: {
		properties:true,
		warnings:true,
		sequences: true,
		dead_code: true,
		conditionals: true,
		booleans: true,
		unused: true,
		if_return: true,
		join_vars: true,
		drop_console: true
	}
});

fs.writeFileSync('../Fdrandom.min.js', result.code);