'use strict';

var config, express, http, init, middleware, routes;

// Module dependencies
config = require('./config/index.js');
express = require('express');
middleware = require('./middleware');
http = require('http');
routes = require('./routes');

// Sets up the express server instance
// Instantiates the routes, middleware, and starts the http server
init = function (server) {

  var _config;

  // Retrieve the configuration object
  _config = config.get();

  // views directory
  server.set('views', _config.dirs.views);

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
    res.render('index.ect');
    // res.sendfile('index.html', {root: server.get('views')});
  });

  // ## Error Handler
  // Picks up any left over errors and returns a nicely formatted server 500 error
  server.use(express.errorHandler());

  function startServer () {
    server.set('port', _config.server.port);
    http.createServer(server).listen(server.get('port'), function () {
      console.log('Express server listening on port ' + server.get('port'));
    });
  }

  // Start the server
  startServer();
};

// Initializes the server
config.load().then(function () {
  console.log('Configurations loaded... initializing the server');
  init(express());
});