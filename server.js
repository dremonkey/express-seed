'use strict';

// ## Module dependencies
var express = require('express');
var http = require('http');

var Config = require('./config/index.js');
var log = require('./utils/logger');
var middleware = require('./middleware');
var routes = require('./app/routes');

var cfg = new Config().getSync();

// Initializes the server
var server = express();

log.info('Using configurations for ' + process.env.NODE_ENV);
log.info('Configurations loaded... initializing the server');

// ## Middlesware
middleware(server, cfg);

// ## Initialize Routes
routes.api(server, cfg);

// Forward remaining requests to index
server.all('/*', function (req, res) {
  res.sendfile('index.html', {root: server.get('views')});
});

// Start the server
server.set('port', cfg.server.port);
http.createServer(server).listen(server.get('port'), function () {
  log.info('Express server listening on port ' + server.get('port'));
});

module.exports = server;
