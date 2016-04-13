/* jshint multistr : true, node : true */
"use strict";

/*
    To test the BillBoard API
*/
(function(){
    var
        feed = require('../../APIs/BillBoard/index.js'),
        UTIL = require('util');

    feed = new feed();

    feed.start(function(error,response){
        if(error)
            console.log('error : ',error);
        if(response)
            console.log('API response : ',UTIL.inspect(response,true,100,true));
        process.exit(0);
    });
})();