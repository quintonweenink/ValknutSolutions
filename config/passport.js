var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var configAuth = require('./auth');

module.exports = function(passport){

passport.serializeUser(function(user, done){
		done(null, null);
	});

passport.deserializeUser(function(id, done){
			done(err, done);
	});

passport.use(new FacebookStrategy({
    clientID: configAuth.fb.appId,
    clientSecret: configAuth.fb.appSecret,
    callbackURL: configAuth.fb.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
  		process.nextTick(function(){
  			console.log("Access Token: " + accessToken + " Id: " + profile.id + " Last name: " + profile.displayName);
  		});
  		console.log("complete");
  }
));


};