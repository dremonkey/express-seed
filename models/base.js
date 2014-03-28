'use strict';

/* jshint unused:false */

// ## Module Dependencies
var pg = require('pg') // Postgres DB bindings
  , bookshelf = require('bookshelf'); // ORM

function Model (dbconfig) {
  this._config = dbconfig;
}

/** 
 * Builds the connection string
 *
 * Format is postgres://user:password@host:port/dbname
 */
Model.prototype.getConnectionString = function () {
  var config = this._config;
  
  var auth = config.user + ':' + config.password
    , fullhost = config.host + ':' + config.port
    , connectString = 'postgres://' + auth + '@' + fullhost + '/' + config.name;

  return connectString;
};

Model.prototype.testConnection = function () {
  var connectString = this.getConnectionString();

  console.log('**** connectString');
  console.log(connectString);

  pg.connect(connectString, function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    client.query('SELECT $1::int AS numbor', ['1'], function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }

      console.log(result.rows[0].numbor);
    });
  });
};

module.exports = Model;