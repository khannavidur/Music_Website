/* jshint multistr : true, node : true */
"use strict";

/*
    To test the config.js file for APIs
*/
(function(){
    var
        testConfig  = require('../../APIs/config.js'),
        UTIL        = require('util');

    console.log('output -> ',UTIL.inspect(testConfig,true,10,true));
})();