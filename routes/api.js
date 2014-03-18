'use strict';

module.exports = function (server, config) {
  server.get('/api/example', function (req, res) {
    res.json({test:'example output'});
  });
};