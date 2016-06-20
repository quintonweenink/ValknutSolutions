var express = require('express');


module.exports = function(app, passport){
	
	//--------------Facebook authentication-----------//
	app.get('/auth/facebook',
	  passport.authenticate('facebook', {scope: ['email']}));

	//Facebook callback to application (not retruning to here)
	app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }),
        function(req, res) {
        	console.log(res);
            res.send('#/info');
    	});
 


	//------------Our API routes------------------//
	app.get('/api/something', function(req,res){
		res.json({ message: 'hooray! welcome to our api!' });  
	});

	//-------------Angular Routes-----------------//
	  app.get('*', function(req, res) {
        res.sendfile('./public/views/pages/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


	
	function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('login_form');
}



};

