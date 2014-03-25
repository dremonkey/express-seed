'use strict';

// ## Configurations
// Setup your installations for various environments
var config, path;

// Module dependencies
path = require('path');

config = {};

// ## Development Environment Configurations
config.development = {
  db: {
    name: '', // db name
    host: '', // db host
    user: '', // db username
    port: 5432, // db port
    password: '' // db password
  },
  dirs: {
    views: path.resolve(__dirname, './views'),
    static: path.resolve(__dirname, './assets')
  },
  livereload: 35729,
  server: {
    // Host to be passed to node's `net.Server#listen()`
    host: '127.0.0.1',

    // Port to be passed to node's `net.Server#listen()`
    port: process.env.PORT || 3000
  },
  viewEngine: 'ect'
};


// ## Production Environment Configurations
config.production = {
  db: {},
  dirs: {
    views: path.resolve(__dirname, './views'),
    static: path.resolve(__dirname, './assets')
  },
  livereload: false,
  server: {
    // Host to be passed to node's `net.Server#listen()`
    host: '127.0.0.1',

    // Port to be passed to node's `net.Server#listen()`
    port: process.env.PORT || 3000
  },
  viewEngine: 'ect'
};

module.exports = config;