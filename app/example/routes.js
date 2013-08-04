'use strict';

var routes = function (app) {
  app.get('/example', function (req, res) {
    res.json({test:'example output'});
  });
};

module.exports = routes;