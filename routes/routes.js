var express = require('express');

var models = require("../models");

function createUser(newUser)
{
			models.User.create({
							// firstName: req.body.text,
							// lastname: req.body.done,
							// age : req.body.age,
							// location : req.body.location
							firstName: newUser.firstName,
							lastName: 'Test',
							contactNumber : '012121212',
							mobileNumber : '08200000',
							maritalStatus : 'Married',
							dateOfBirth : '1994/03/07 01:00',
							gender : 'male',
							location : 'Test',
							email : 'Test@test.com'
					}).then(function(users){
				res.json(users.dataValues);
		}).catch(function(error){
				console.log("ops: " + error);
				res.status(500).json({ error: 'error' });
		});
}

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
//Need to test here
	app.route('/api/user')
	//User Post route
    .post(function(req, res) {
			/*
					var newUser = new models.User;
					newUser.firstName = 'Test';

					createUser(newUser)
			*/
			models.User.create({
			        // firstName: req.body.text,
			        // lastname: req.body.done,
							// age : req.body.age,
							// location : req.body.location
							firstName: 'Test',
							lastName: 'Test',
							contactNumber : '012121212',
							mobileNumber : '08200000',
							maritalStatus : 'Married',
							dateOfBirth : '1994/03/07 01:00',
							gender : 'male',
							location : 'Test',
							email : 'Test@test.com'
			    }).then(function(users){
        res.json(users.dataValues);
    }).catch(function(error){
        console.log("ops: " + error);
        res.status(500).json({ error: 'error' });
    });
	})
	//User Get route
    .get(function(req, res) {
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
