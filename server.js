'use strict';

/**
 * Module dependencies
 */

require('express-namespace');

var
  _ = require('lodash'),
  config = require('./config'),
  express = require('express'),
  app = express();


/** 
 * Bootstrap the database connection
 */
if (config.mongo) require('./dbconnect.js')(config.mongo);

/**
 * Template Configuration
 */
switch (config.tplEngine) {
case 'jade':
  app.set('view engine', 'jade');
  break;
case 'dust':
  // Dust doesn't play well with Angular because of the {} it uses for interpolation
  require('dustjs-linkedin');

  var cons = require('consolidate');
  
  app.engine('dust', cons.dust);
  app.set('view engine', 'dust');
  break;
case 'ect':
  var ect = require('ect')({watch: true, root : __dirname + '/views'});
  app.engine('ect', ect.render);
  app.set('view engine', 'ect');
  break;
case 'html' :
  var ect = require('ect')({watch: true, root : __dirname + '/views'});
  app.engine('html', ect.render); // assign ect as the engine for html files
  app.set('view engine', 'html'); // set .html as the default extension
  break;
}


/**
 * Express Configurations
 */

// set views directory for server side templates
app.set('views', config.dirs.views);

app.use(express.logger('dev')); // log requests to the console
app.use(express.bodyParser()); // extract data from the body of the request
app.use(express.methodOverride());

// livereload middleware to insert livereload script snippet if not production
// if ('local' === app.get('env') || 'development' === app.get('env')) {
//   console.log('Adding livereload script');
//   var lr = require('connect-livereload')({
//     port: config.server.liveReloadPort
//   });
//   lr.middlewarePriority = -1;
//   app.use(lr);
// }

// Set the directory(s) that express should serve static files from
if (config.dirs.static) {
  var
    staticDir = _.isString(config.dirs.static) ? [config.dirs.static] : config.dirs.static,
    maxAge = 30 * 24 * 60 * 60 * 1000; // 30 day cache control in milliseconds 
  for (var i = staticDir.length - 1; i >= 0; i--) {
    app.use(express.static(staticDir[i], {maxAge: maxAge}));
  }
}

// A standard error handler - picks up any left over errors and returns a nicely formatted server 500 error
app.use(express.errorHandler());


/**
 * Bootstrap Routes
 * ex. require('./app/example/routes')(app);
 */
require('./app/example/routes')(app);

// Forward missing files to index
app.all('/*', function (req, res) {
  // can be used instead of res.render() for single page applications
  // res.sendfile('index.html', { root: config.server.viewsDir });
  res.render('index.ect');
});


/**
 * Start Server * Only for Production * Local is handled by Grunt
 */
if ('production' === app.get('env')) {
  var http = require('http');
  app.set('port', process.env.PORT || config.ports.http);
  http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
}

  // expose app
module.exports = app;
