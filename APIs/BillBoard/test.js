"use strict";

(function(){

	var 
	    me               = require('./index.js'),
	    UTIL 			 = require('util'),
	    XMLPARSER        = require('xml2json'),
	    XML2JSON_OPTS    = {
        object          : true,
        reversible      : false,
        coerce          : false,
        sanitize        : false,
        trim            : true,
        arrayNotation   : true
    };

	me = new me({ L : require('../Logger/index.js')});

	me._callingRSS(function(response){
		//console.log(UTIL.inspect(response,true,100,true));
		console.log(response);
	});

})();