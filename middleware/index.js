'use strict';

var _, express, middleware, livereload, prerender;

// Module dependencies
_ = require('lodash');
express = require('express');
livereload = require('./livereload');
prerender = require('prerender-node');

middleware = function (server, config) {
  var viewEngine;
  
  // ## Views

  // views directory
  server.set('views', config.dirs.views);

  // view engine
  switch (config.viewEngine) {
    case 'jade':
      server.set('view engine', 'jade');
      break;
    case 'ect':
      viewEngine = require('ect')({watch: true, root: server.get('views')});
      server.engine('ect', viewEngine.render);
      server.set('view engine', 'ect');
      break;
    case 'html' :
      viewEngine = require('ect')({watch: true, root: server.get('views')});
      server.engine('html', viewEngine.render); // assign ect as the engine for html files
      server.set('view engine', 'html'); // set .html as the default extension
      break;
  }

  // ## Livereload 
  if (config.livereload) {
    livereload(server, config);
  }

  // ## Static Files
  
  // return the correct mime type for woff filess
  express.static.mime.define({'application/font-woff': ['woff']});

  // Set the directory(s) to serve static files from
  if (config.dirs.static) {
    var staticDirs, maxAge;
    staticDirs = [].concat(config.dirs.static);
    maxAge = 30 * 24 * 60 * 60 * 1000; // 30 day cache control in milliseconds 
    for (var i = staticDirs.length - 1; i >= 0; i--) {
      server.use(express.static(staticDirs[i], {maxAge: maxAge}));
    }
  }

  // ## Prerender
  if (config.prerender.token) server.use(prerender.set('prerenderToken', config.prerender.token));
};

module.exports = middleware;