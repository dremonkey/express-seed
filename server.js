'use strict';

var config, express, http, init, log, middleware, routes;

// Module dependencies
config = require('./config/index.js');
express = require('express');
http = require('http');
log = require('./utils/logger');
middleware = require('./middleware');
routes = require('./routes');

// Sets up the express server instance
// Instantiates the routes, middleware, and starts the http server
init = function (server) {

  var _config;

  // Retrieve the configuration object
  _config = config.get();

  // log requests to the console
  server.use(express.logger('dev'));

  // extract data from the body of the request
  server.use(express.bodyParser());

  server.use(express.methodOverride());

  // ## Middleware
  middleware(server, _config);

  // ## Initialize Routes
  routes.api(server);

  // Forward remaining requests to index
  server.all('/*', function (req, res) {
    res.sendfile('index.html', {root: server.get('views')});
  });

  // ## Error Handler
  // Picks up any left over errors and returns a nicely formatted server 500 error
  server.use(express.errorHandler());

  function startServer () {
    server.set('port', _config.server.port);
    http.createServer(server).listen(server.get('port'), function () {
      log.info('Express server listening on port ' + server.get('port'));
    });
  }

  // Start the server
  startServer();
};

// Initializes the server
config.load().then(function () {
  log.info('Configurations loaded... initializing the server');
  init(express());
});