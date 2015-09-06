"use strict";

var 
	HTTP 			 = require("http"),
	XMLPARSER        = require('xml2json'),
	billboardURL     = "http://www.billboard.com/rss/charts/hot-100",
	_                = require('lodash'),
	L 				 = null,
	XML2JSON_OPTS    = {
        object          : true,
        reversible      : false,
        coerce          : false,
        sanitize        : false,
        trim            : true,
        arrayNotation   : true
    };


function me(opts){
	var self = this;
    self.L   = (opts.L) ? opts.L : require('../Logger/index.js');
    self._L  = self.L;
    L        = self.L;
}

/*
* curl -i -XGET "http://www.billboard.com/rss/charts/hot-100"
*/

me.prototype._callingRSS = function(callback){
	var dataToBeSent ='';
	HTTP.get(billboardURL,function(response){
		
		//data comes in buffer
		response.on('data',function(data){
			dataToBeSent = dataToBeSent + data.toString();						
		});

		//
		response.on('end',function(){

			try{
				dataToBeSent = XMLPARSER.toJson(dataToBeSent,XML2JSON_OPTS);
			} catch(error){
				//console.log("error" +error);
			}
          
			/*	
			*  FORMAT OF JSON
			*	{ rss: 
			*	   [ { version: '2.0',
			*	       'xml:base': 'http://www.billboard.com/charts/hot-100',
			*	       'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
			*	       'xmlns:c': 'http://s.opencalais.com/1/pred/',
			*	       'xmlns:sys': 'http://s.opencalais.com/1/type/sys/',
			*	       'xmlns:lid': 'http://s.opencalais.com/1/type/lid/',
			*	       'xmlns:cat': 'http://s.opencalais.com/1/type/cat/',
			*	       'xmlns:resolved': 'http://s.opencalais.com/1/type/er/',
			*	       'xmlns:cgeo': 'http://s.opencalais.com/1/type/er/Geo/',
			*	       'xmlns:eventfact': 'http://s.opencalais.com/1/type/em/r/',
			*	       'xmlns:entity': 'http://s.opencalais.com/1/type/em/e/',
			*	       'xmlns:cld': 'http://s.opencalais.com/1/linkeddata/pred/',
			*	       'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
			*	       'xmlns:foaf': 'http://xmlns.com/foaf/0.1/',
			*	       'xmlns:og': 'http://ogp.me/ns#',
			*	       'xmlns:rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
			*	       'xmlns:sioc': 'http://rdfs.org/sioc/ns#',
			*	       'xmlns:sioct': 'http://rdfs.org/sioc/types#',
			*	       'xmlns:skos': 'http://www.w3.org/2004/02/skos/core#',
			*	       'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema#',
			*	       channel: [Object] } ] }
			*
			*		required data at  :- channel[0].item[0-99]
			*
			*/

			//L.log("response",_.get(dataToBeSent,"rss.0.channel.0.item",null)); //to log response from rss feed
		    return callback(_.get(dataToBeSent,"rss.0.channel.0.item",null));
		})

		

		
			 
    });
};


module.exports =  me;

