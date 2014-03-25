'use strict';

// ## Module Dependencies
var pg = require('pg') // Postgres DB bindings
  , bookshelf = require('bookshelf'); // ORM

module.exports = function Model (dbconfig) {
  this._config = dbconfig;
};

/** 
 * Builds the connection string
 *
 * Format is postgres://user:password@host:port/dbname
 */
Model.prototype.getConnectionString = function () {
  var cfg = this._config;
  
  var auth = cfg.user + ':' + cfg.password
    , fullhost = cfg.host + ':' + cfg.port
    , conString = 'postgres://' + auth + '@' + fullhost + '/' + cfg.name;

  return conString;
};