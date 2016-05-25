var express = require('express');


module.exports = function(app, passport){

	/* GET home page. */
	app.get('/', function(req, res, next) {
	  res.render('home');
	});

	/* GET about page. */
	app.get('/about', function(req, res, next) {
	  res.render('about');
	});

	app.get('/info', function(req, res, next){
		res.send('Something happend');
	});

	app.get('/auth/facebook',
	  passport.authenticate('facebook', {scope: ['email']}));

	app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }),
        function(req, res) {
        	console.log(res);
            //res.send('#/info');
        });
 

};

