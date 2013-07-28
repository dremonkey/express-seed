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
    path = require('path'),
    fs = require('fs'),
    fn = path.resolve(__dirname, 'config.' + env + '.js');

var exists = fs.existsSync(fn);
var config = exists ? require('./config.' + env) : require('./config.base');

module.exports = config;