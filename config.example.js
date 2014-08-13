'use strict';

// ## Configurations
// Setup your installations for various environments
var config, path;

// Module dependencies
path = require('path');

config = {};

// ## Development Environment Configurations
config.development = {
  firebase: {
    url: '',
    secret: ''
  },
  dirs: {
    views: path.resolve(__dirname, './app/views'),
    static: path.resolve(__dirname, './app/assets')
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
  firebase: {
    url: '',
    secret: ''
  },
  dirs: {
    views: path.resolve(__dirname, './app/views'),
    static: path.resolve(__dirname, './app/assets')
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