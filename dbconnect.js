'use strict';

var database = function (config, callback) {
  
  var mongoose = require('mongoose'),
      dbURI = config.user + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.dbName;

  // establish db connection
  mongoose.connect(dbURI);

  // retrieve the connection instance
  var db = mongoose.connection;

  // db connection error handling
  db.on('error', console.error.bind(console, 'connection error:'));

  // db connection success
  db.once('open', function () {
    console.log('Database Connection Opened');
    if(callback) callback();
  });
};

module.exports = database;