'use strict';

/**
 * Module dependencies
 */

var _ = require('lodash'),
    config = require('./config'),
    express = require('express'),
    passport = require('passport'),
    expressValidator = require('express-validator'),
    RedisStore = require('connect-redis')(express),
    auth = require('./api/account/auth.js');

require('express-namespace'); // needed for any route

// expose app
var app = module.exports = express();

/** 
 * Bootstrap the database connection
 */
require('./dbconnect.js')(config.mongo);

/**
 * Template Configuration
 */
switch (config.server.tplEngine) {
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

// set views directory for server side templates
if (config.server.viewsDir) app.set('views', config.server.viewsDir);


/**
 * Express Configurations
 */

app.use(express.logger('dev')); // log requests to the console
app.use(express.bodyParser()); // extract data from the body of the request
app.use(expressValidator()); // middleware for form data validation
app.use(express.methodOverride());
app.use(express.session({
  secret: '1n@N2JX7m7AvkZIjMeVjmnU1dX6ehEnQp{}iaM1AQ${L%VTpWa[4TFqaQ#jHD8p&',
  store: new RedisStore()
}));
app.use(passport.initialize()); // middleware for authentication

// livereload middleware to insert livereload script snippet if not production
if ('local' === app.get('env') || 'development' === app.get('env')) {
  console.log('Adding livereload script');
  var lr = require('connect-livereload')({
    port: config.server.liveReloadPort
  });
  lr.middlewarePriority = -1;
  app.use(lr);
}

// Set the directory that express should serve static files from
if (config.server.staticDirs) {
  var staticDirs = _.isString(config.server.staticDirs) ? [config.server.staticDirs] : config.server.staticDirs;
  for (var i = staticDirs.length - 1; i >= 0; i--) {
    app.use(express.static(staticDirs[i]));
  }
}

// A standard error handler - picks up any left over errors and returns a nicely formatted server 500 error
app.use(express.errorHandler());

/**
 * Passport Configuration
 */
passport.use(auth.localStrategy());
passport.use(auth.googleStrategy());


/**
 * Bootstrap Routes
 */

require('./api/posts/routes')(app);
require('./api/account/routes')(app);

// Forward missing files to index.html
app.all('/*', function (req, res) {
  res.sendfile('index.html', { root: config.server.clientDir });
});


/**
 * Start Server * NOT NEEDED... handled by grunt-express *
 */
if ('prod' === app.get('env')) {
  var http = require('http');
  app.set('port', process.env.PORT || config.server.port);
  http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
}