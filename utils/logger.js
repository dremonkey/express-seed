'use strict';

// ## Improves on console.log

var log, colors;

// Module Dependencies
colors = require('colors');

log = {
  info: function (info, context) {
    console.log('\nInfo:'.blue, info.blue);
    if (context) console.log(context.white);
    console.log(''); // add a new line
  },
  warn: function (warn, context) {
    console.log('\nWarning:'.yellow, warn.yellow);
    if (context) console.log(context.white);
    console.log(''); // add a new line
  },
  error: function (err, context) {
    var stack = err ? err.stack : null;
    if (err) {
      err = err.message || err || 'An unknown error occurred.';
    } else {
      err = 'An unknown error occurred.';
    }

    console.error('\nERROR:'.red, err.red);
    if (context) console.log(context.white);
    console.error(''); // add a new line
    if (stack) console.error(stack, '\n');
  }
};

module.exports = log;