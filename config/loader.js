'use strict';

// Loads configurations based on current NODE_ENV

var createConfig, fs, path, pexcf, pconf, loadConfig, log, when;

// Module Dependences
path = require('path');
fs = require('fs');
when =  require('when');
log = require('../utils/logger');

// File Paths
pexcf = path.resolve(__dirname, '../config.example.js');
pconf = path.resolve(__dirname, '../config.js');

createConfig = function () {

  var written;

  written = when.defer();

  // Copy from config.example.js => config.js
  fs.exists(pexcf, function checkTemplate (exists) {
    
    var read, write;

    log.info('Creating new config file...');

    if (!exists) {
      log.error('Could not find config.example.js for read');
    }

    // Copy config.example.js => config.js
    read = fs.createReadStream(pexcf);
    read.on('error', function (err) {
      log.error('Could not open config.example.js for read', err);
      return;
    });

    write = fs.createWriteStream(pconf);
    write.on('error', function (err) {
      log.error('Could not open config.js for write', err);
      return;
    });

    read.pipe(write);
    read.on('end', written.resolve);
  });

  return written.promise;
};

loadConfig = function () {
  
  var loaded, pending;

  loaded = when.defer();
  
  // Check for config file and copy from config.example.js if it doesn't
  fs.exists(pconf, function checkConfig (exists) {
    if (!exists) pending = createConfig();
    when(pending).then(loaded.resolve);
  });

  return loaded.promise;
};

module.exports = loadConfig;