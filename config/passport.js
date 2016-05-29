var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var configAuth = require('./auth');

module.exports = function(passport){


//Added this working strategy
passport.use(new FacebookStrategy({
    clientID: configAuth.fb.appId,
    clientSecret: configAuth.fb.appSecret,
    callbackURL: configAuth.fb.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
  		//async request (non blocking)
  		process.nextTick(function(){
  			console.log("Access Token: " + accessToken + " Id: " + profile.id + " Last name: " + profile.displayName);
  			return "Access Token: " + accessToken + " Id: " + profile.id + " Last name: " + profile.displayName;
  		});
  }
));


};