'use strict';

/**
 * Example configuration file.
 */

var config = require('./config.base'),
    path = require('path');

config.mongo = {
  dbName: 'dbName',
  host: 'dbHost',
  port: 'dbPort',
  user: 'dbUser',
  password: 'dbPassword'
};

config.staticDirs = [
  path.resolve(__dirname, '../../client'),
  path.resolve(__dirname, '../../.tmp')
];

module.exports = config;