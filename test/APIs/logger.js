/* jshint multistr : true, node : true */
"use strict";

/*
    To test the Logger API
*/
(function(){
    var
        L = require('../../APIs/Logger/index.js');
     
    L.verbos('hello','this','is','verbos');
    L.info('hello','this','is','info');
    L.log('hello','this','is','log');
    L.error('hello','this','is','error');
    L.critical('hello','this','is','critical');
})();