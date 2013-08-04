'use strict';

/**
 * Base Configuration File
 *
 * Should be considered production configurations. But do not put any sensitive information, such as 
 * api keys or db connection information, in here because this is version controlled.
 */

var
  path = require('path'),
  config = {};

config = {

  // Set the Template Engine
  // Currently supports jade, dustjs, ect, and html via ect
  tplEngine: 'ect',

  ports: {
    // The port that the web server is to listen to (i.e. http://localhost:3000)
    web: 3000,

    // The HTTPS port that the server is to listen to (i.e. https://localhost:8433)
    secure: 8433,

    // Port for livereload to run on
    liveReload: 35729
  },
  dirs: {
    // The "views" directory used for templates
    views: path.resolve(__dirname, '../../client'),

    // The directory from which we serve static files. If multiple, use an array.
    static: path.resolve(__dirname, '../views')
  }
};

module.exports = config;