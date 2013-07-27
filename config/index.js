'use strict';

/**
 * Loads configurations based on current NODE_ENV
 *
 * In any file where you want to access configurations use require('./path/to/config')
 * For example: 
 *    
 *    var config = require('./config');
 */

var env = process.env.NODE_ENV || 'local',
    config = require('./config.' + env);

module.exports = config;