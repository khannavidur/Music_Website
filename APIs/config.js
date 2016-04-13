/* jshint multistr : true, node : true */
"use strict";

var 
    /* NPM THIRD PARTY */
    _                                       = require('lodash'),

    /* PROJECT INTERNALS*/
    config                                  = {

        /* 
            - NODE_ENV is to identify the environment of execution
            - should be set to 'production' for live
            - default value set as 'development'
        */
        ENVIRONMENT                         : _.get(process,'env.NODE_ENV','development'),

        /*
            The config that is common to all exwcution modes
        */
        COMMON                              : {
        },

        /*
            The config to be used during development
        */
        'development'                       : {
            BILL_BOARD_TOP_100_API_URL      : 'http://www.billboard.com/rss/charts/hot-100',
        },

        /*
            The config to be used during production
        */
        'production'                        : {
            
        }
    },
    load                                    = function(){
        var
            environment                     = _.get(config,'ENVIRONMENT','development'),
            configToLoad                    = _.get(config,'COMMON');
        /*
            Set the config to load as a combination of
            common config and the environment specific config
        */
        Object.keys(_.get(config,environment)).forEach(function(key){
            _.set(configToLoad,key,_.get(config,environment + '.' + key,''));
        });

        return configToLoad;
    };

module.exports = load();