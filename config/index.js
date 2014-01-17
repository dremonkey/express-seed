'use strict';

var _config, get, load, loader;

loader = require('./loader');

load = function () {
  return loader().then(function () {
    var env = process.env.NODE_ENV || 'development';

    // Cache the config.js object so we can
    // retrieve it later using get()
    _config = require('../config.js')[env];
  });
};

get = function () {
  return _config;
};

module.exports.get = get;
module.exports.load = load;
