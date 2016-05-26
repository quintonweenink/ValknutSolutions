var express = require('express');


module.exports = function(app, passport){

	/* GET home page. */
	app.get('/', function(req, res, next) {
	  res.render('home');
	});

	/* GET about page. */
	app.get('/about', function(req, res, next) {
	  res.render('about', {message: 'Victory'});
	});

	app.get('/info', function(req, res, next){
		res.send('Something happend');
	});

	//Facebook authentication
	app.get('/auth/facebook',
	  passport.authenticate('facebook', {scope: ['email']}));

	//Fabook callback to application (not retruning to here)
	app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }),
        function(req, res) {
        	console.log(res);
            res.send('#/info');
    	});
 

};

