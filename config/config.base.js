'use strict';

var path = require('path'),
    config = {};

// webserver config
config.server = {

  // Set the Template Engine
  // Currently supports jade, dustjs, ect, and html via ect
  tplEngine: 'ect',

  // * NOT USED LOCALLY *
  // The port that the server is to listen to (http://localhost:3000 for instance)
  port: 3000,
  
  // The HTTPS port that the server is to listen to (https://localhost:8433 for instance)
  securePort: 8433,

  liveReloadPort: 35729,

  // Client side application directory
  clientDir: path.resolve(__dirname, '../../client/app'),
  
  // * NOT USED LOCALLY *
  // The directory from which we serve static files - all paths relative to this file. If multiple, use an array.
  staticDirs: path.resolve(__dirname, '../../client'),

  // The "views" directory used for server side templates - set to null for a single page application
  viewsDir: path.resolve(__dirname, '../views')
};

module.exports = config;