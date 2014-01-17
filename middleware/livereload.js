'use strict';

var livereload;

livereload = function (server, config) {
  var lr;
  console.log('Adding livereload script');

  // Insert livereload script snippet at the bottom of the page
  lr = require('connect-livereload')({port: config.livereload});
  lr.middlewarePriority = -1;
  server.use(lr);
};

module.exports = livereload;