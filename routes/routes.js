var express = require('express');


module.exports = function(app, passport){
	
	  app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
	app.get('*', function(req, res) {
        res.sendfile('./public'); // load the single view file (angular will handle the page changes on the front-end)
    });

	/* GET home page. */
	app.get('/', function(req, res, next) {
	  res.render('home');
	});

	/* GET about page. */
	app.get('/about', function(req, res, next) {
	  res.render('about', {message: 'Victory'});
	});
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login'); 
    });
	
	    app.get('/login_form', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login_form', { message: req.flash('loginMessage') }); 
    });
	
	
	    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage') });
    });
	
	    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });

	app.get('/info', function(req, res, next){
		res.send('Something happend');
	});
	
	function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('login_form');
}

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

