var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
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

var fbMessenger = require('./routes/fbMessenger')(app, passport);
var users = require('./routes/users')(app, passport);
var admins = require('./routes/admins')(app, passport);
var analysts = require('./routes/analysts')(app, passport);
var routes = require('./routes/routes')(app, passport);
var graphRoute= require('./routes/graph')(app, passport);
var angular = require('./routes/angular')(app, passport);


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
