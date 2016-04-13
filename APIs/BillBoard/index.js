/* jshint multistr : true, node : true */
"use strict";

var 
    /* NODE INTERNAL */
    HTTP                = require('http'),
    UTIL                = require('util'),

    /* NPM THIRD PARTY */
    XMLPARSER           = require('xml2json'),
    _                   = require('lodash'),

    /* PROJECT INTERNALS */
    L                   = require('../Logger/index.js'),
    CONFIG              = require('../config.js'),

    /* GLOBAL */
    XML2JSON_OPTS       = {
        object          : true,
        reversible      : false,
        coerce          : false,
        sanitize        : false,
        trim            : true,
        arrayNotation   : true
    };


function me(){
    var
        self = this;

    self.CONFIG             = CONFIG;
    self.data               = '';
    self.billBoardTop100    = [];
}

/*
* curl -i -XGET 'http://www.billboard.com/rss/charts/hot-100'
*/

me.prototype.start = function(cb){
    var
        self = this;

    L.log('start','Begin Fetch data from BillBoard  RSS Feed');

    self._callingRSS(function(error){
        if(error){
            return cb(error,null);
        }else{
            L.log('start','formatting data to send');
            self.data.forEach(function(data){
                var object = {
                    title               : _.get(data,'chart_item_title.0',''),
                    artist              : _.get(data,'artist.0',''),
                    rank_this_week      : _.get(data,'rank_this_week.0',''),
                    rank_last_week      : _.get(data,'rank_last_week.0',''),
                };

                self.billBoardTop100.push(object);
            });
            return cb(null,self.billBoardTop100);
        }
    });
};

me.prototype._callingRSS = function(callback){
    var
        self                = this,
        billboardURL        = _.get(self,'CONFIG.BILL_BOARD_TOP_100_API_URL','');

    L.log('_callingRSS','trying to hit bill board rss API');
        
    HTTP.get(billboardURL,function(response){

        //data comes in buffer
        response.on('data',function(data){
            L.log('_callingRSS','receiving data');
            self.data += data.toString();
        });


        //completely received data
        response.on('end',function(){
            L.log('_callingRSS','data received');            
            try{
                self.data = XMLPARSER.toJson(self.data,XML2JSON_OPTS);
                self.data = _.get(self,'data.rss.0.channel.0.item',[]);
                return callback();
            } catch(error){
                L.error('_callingRSS','Parsing error : ',error);
                return callback(error);
            }
        });

    });
};

/*
    FLOW :
        - Make a http get request to the rss feed url
        - Data comes as a buffer to make it to string and append it to a global var
        - when data completely received its in xml so we parse it as json
        - process the json data and format it into an array of objects
        - Each object in the array contains the following
            title
            artist
            rank_this_week
            rank_last_week
*/

module.exports =  me;