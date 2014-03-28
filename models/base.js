'use strict';

/* jshint unused:false */

// ## Module Dependencies
var pg = require('pg') // Postgres DB bindings
  , bookshelf = require('bookshelf'); // ORM

var log = require('../utils/logger');

function Model (dbconfig) {
  this._config = dbconfig;
}

Model.prototype.getClient = function () {
  var params = this._config;
  params.ssl = true; // needed when trying to connect from local to heroku

  return new pg.Client(params);
};

Model.prototype.testConnection = function () {
  var client = this.getClient();
  client.connect();

  var query = client.query('SELECT $1::int AS numbor', ['1'], function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }

    log.info('Successful Database Connection Test');
  });

  // disconnect client manually
  query.on('end', client.end.bind(client));
};

module.exports = Model;