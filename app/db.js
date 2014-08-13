'use strict';

var Firebase = require('firebase');

var Config = require('../config/index.js');

var cfg = new Config().getSync();

console.log(cfg.firebase.url);

// Create a Firebase reference
var firebase = new Firebase(cfg.firebase.url);

// Authenticate
firebase.auth(cfg.firebase.secret, function (err, res) {
  if (err) {
    console.log('Login Failed!', err);
  }
  else {
    console.log('Authenticated successfully with payload', res.auth);
    console.log('Auth expires at:', new Date(res.expires * 1000));
  }
});

module.exports = firebase;