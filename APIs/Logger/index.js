"use strict";

var
	L 			= require('logger'),
	logger 		= function(){

		/*
			Adding all the level options
		*/
		L.addLevel('verbos',1000,{fg:'blue'},'VERBOS');
		L.addLevel('info',2000,{fg:'yellow'},'INFO');
	    L.addLevel('log',3000,{fg:'magenta'},'LOG');
	    L.addLevel('error',4000,{fg:'red'},'ERROR');
	    L.addLevel('critical',5000,{fg:'red',bg:'yellow'},'CRITICAL');

	    /*
			Setting default level
	    */
	    L.setLevel("info");

	    return L;
	};

module.exports = logger();