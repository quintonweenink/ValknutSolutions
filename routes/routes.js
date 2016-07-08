var express = require('express');

var models = require("../models");

var userController = require("../DBControllers/UserController");

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
			console.log('Middleware LOG');
			next();
		});
//------------API routes------------------//
//Need to test here
	app.route('/api/user')
	//User Post route
    .post(function(req, res) {
			/*var verify = req.body.hub_verify_token;
			var challenge = req.body.hub_challenge;
			if (verify == 'abc123')
			{
				res.write(challenge);
			}*/

			res.json(false);
			/*var newUser = {
				firstName: 'Charl',
				lastName: 'lelelel',
				contactNumber : '0121212',
				mobileNumber : '09312123',
				maritalStatus : 'Married',
				dateOfBirth : '1994/01/01 20:00',
				gender : 'male',
				location : 'Test',
				email : 'email@email.com'
		};
			userController.createUser(newUser)
			.then(function(users){
        res.json(users.dataValues);
    }) .catch(function(error){
         console.log("ops: " + error);
         res.status(500).json({ error: 'error' });
     });*/
	})
	//User Get route
    .get(function(req, res) {
			/*if (req.params.hub_verify_token == 'bleepBlop123')
			{
				console.log('Token verified');
				res.write(req.params.hub_challenge);
			}*/
			models.User.findAll().then(function(users){
				res.json(users);
		});
		//Logic for returning all users
    });


	//User Specific ID route
	app.route('/api/user/:user_id')
	//User ID Get route
    .get(function(req, res) {
		models.User.findById(req.params.user_id).then(function(user){
		res.json(user);
		});
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
