'use strict';

var livereload, log;

// Module Dependencies
log = require('../utils/logger');

livereload = function (server, config) {
  var lr;

  log.info('Adding livereload script');

  // Insert livereload script snippet at the bottom of the page
  lr = require('connect-livereload')({port: config.livereload});
  lr.middlewarePriority = -1;
  server.use(lr);
};

module.exports = livereload;