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
 
//---------Logging Middleware-------------------//
//Authentication middleware to be added here
		 app.use(function(req, res, next) {
			console.log('Some loggin');
			next(); 
		});


//------------API routes------------------//
	app.route('/api/user')
	//User Post route
    .post(function(req, res) {
		res.json({ message: 'Post Test for /user' });
		//Logic for adding user
    })
	//User Get route
    .get(function(req, res) {
        res.json({ message: 'Get Test for /user' });
		//Logic for returning all users
    });
	
	
	//User Specific ID route
	app.route('/api/user/:user_id')
	
	//User ID Get route
    .get(function(req, res) {
        res.json({ message: 'Get Test for /user', 
					ID: req.params.user_id });
		//Logic for display specified user
    })
	
	//User ID update route
	.put(function(req, res) {
        res.json({ message: 'User updated!', 
					ID: req.params.user_id });
		//Logic for updating a user	
    })
	
	//User ID delete route
	.delete(function(req, res) {
		res.json({ message: 'User deleted!', 
					ID: req.params.user_id });
		//Logic for updating a user	
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

