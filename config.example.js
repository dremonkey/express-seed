'use strict';

// ## Configurations
// Setup your installations for various environments
var config, path;

// Module dependencies
path = require('path');

config = {};

// ## Development Environment Configurations
config.development = {
  db: {},
  dirs: {
    views: path.resolve(__dirname, './views'),
    static: path.resolve(__dirname, './assets')
  },
  livereload: 35729,
  prerender: {
    token: ''
  },
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
  prerender: {
    token: ''
  },
  server: {
    // Host to be passed to node's `net.Server#listen()`
    host: '127.0.0.1',

    // Port to be passed to node's `net.Server#listen()`
    port: process.env.PORT || 3000
  },
  viewEngine: 'ect'
};

module.exports = config;