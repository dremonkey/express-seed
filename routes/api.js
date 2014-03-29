'use strict';

// ## Module Dependencies
module.exports = function (server, config) {
  server.get('/api/example', function (req, res) {
    res.json({config:config});
  });
};