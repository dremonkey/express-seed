'use strict';

// ## Module Dependencies
var Model = require('../models/base');

module.exports = function (server, config) {
  server.get('/api/example', function (req, res) {
    var model = new Model(config.db);
    model.testConnection();

    res.json({config:config});
  });
};