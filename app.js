var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var xmlparser = require('express-xml-bodyparser')
//Passport
var passport = require('passport');
//Session
var session = require('express-session');
//Flash for passing session data
var flash = require('connect-flash');
//Json web token for authentication
var jwt = require('jsonwebtoken');
//config include for secret etc..
var configAuth = require('./config/auth');
//morgan for logging
var morgan = require('morgan');
//includes models for database
var models = require("./models");
models.sequelize.sync().then(function()
{

});
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(xmlparser())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/public',  express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.use(flash());
require('./config/passport')(passport);

//Set secret = secret in configAuth file
app.set('datSecret', configAuth.secret);

app.use(passport.initialize());
app.use(passport.session());

/**
 * Module dependencies.
 */

var debug = require('debug')('app:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('Client connected');
  // a user has visited our page - add them to the visitorsData object
  socket.on('disconnect', function() {
    console.log("Client disconnected");
    // a user has left our page - remove them from the visitorsData object
  });
});

exports.io = io;

var weChatBot = require('./routes/weChatBot')(app, passport)
var fbMessenger = require('./routes/fbMessenger')(app, passport);
var users = require('./routes/users')(app, passport, io);
var admins = require('./routes/admins')(app, passport);
var analysts = require('./routes/analysts')(app, passport);
var routes = require('./routes/routes')(app, passport);
var graphRoute= require('./routes/graph')(app, passport);
var liveGraphRoute = require('./routes/dynamicGraphs')(app, passport);
var angular = require('./routes/angular')(app, passport);
var location = require('./routes/location')(app, passport);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err.message);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err.message);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
