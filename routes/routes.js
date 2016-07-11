var express = require('express');

var models = require("../models");

var userController = require("../DBControllers/UserController");
var adminController = require("../DBControllers/AdminController");
var analystController = require("../DBControllers/AnalystController");
var email = require("../email/email");
var jwt = require('jsonwebtoken');
var util = require('util');
var fbControllers = require("../fbControllers/fbController.js");

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

			app.route('/api/authenticate')
			//User Post route
		  .post(function(req, res) {
				models.Admin.find({
					where: {
				        email: req.body.email
				     }
			}).then(function(admin){
				if (!admin)
				{
				      res.json({ success: false, message: 'Authentication failed. User not found.' });
				}
				else if(admin)
				{
					if(admin.password!= req.body.password)
					{
						res.json({ success: false, message: 'Authentication failed. Wrong password.' });
					}
					else
					{

						var tempUser = { userName: admin.email};
						var token = jwt.sign(tempUser, app.get('datSecret'), {
						expiresIn: '1000h' // expires in 24 hours
						});
		        // return the information including token as JSON
		        	res.json({
		          	success: true,
		          	token: token
		        	});
					}
				}
			});

			});


//---------Logging Middleware-------------------//
app.use(function(req, res, next) {
console.log('Authentication will be done here');
next();
});
// app.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   // decode token
//   if (token) {
//
//     // verifies secret and checks exp
//     jwt.verify(token, app.get('datSecret'), function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//
//   } else {
//
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//     });
//
//   }
// });

//Emailer code
/*
var emailSettings = {
	to: 'charljvv@gmail.com', // recipient
	subject: 'Test mail bro', // Subject line
	text: 'Test body mail', // plaintext body
};

email.emailer(emailSettings.to,emailSettings.subject,emailSettings.text);
*/

//------------API routes------------------//
//API/leads
app.route('/api/leads')
	.post(function(req, res){
		console.log('Post req body: ', util.inspect(req.body, {showHidden: false, depth: null}));
		//var body = req.body;
		//console.log(body);
		res.send(req.body);
		//fbControllers.getLeadData(req.body['entry.leadgen_id'], "EAANpDqrgoMIBAGpGcnnxn5mre6PlnZAs1yHZB4KboGiwJwEOP0uXmtZCHRNap1L5QRgvQI4mr30BmWijCVO7wQJZCj5F78FKAuiEZCFOGZB1sCKYOYJ0N6elJLEFQZAoWqm6o9iCwKmaHenVG8OwOIlAOgtzLFlvit4b9ZBmksBeYZCHsSIGhjyje");
/*Post req body:  { entry:
					 { ad_id: 6052031692189,
							leadgen_id: 1743060585951007,
			time: 1468247310 },]*/

		/*Data returned from an api call to fb api through graph api explorer
		{
"created_time": "2016-07-11T14:28:29+0000",
"id": "1743060585951007",
"field_data": [
	{
		"name": "first_name",
		"values": [
			"Kevin"
		]
	},
	{
		"name": "last_name",
		"values": [
			"Heritage"
		]
	},
	{
		"name": "email",
		"values": [
			"kheritage222@gmail.com"
		]
	},
	{
		"name": "city",
		"values": [
			"Pretoria"
		]
	},
	{
		"name": "date_of_birth",
		"values": [
			"06/06/1994"
		]
	},
	{
		"name": "gender",
		"values": [
			"male"
		]
	},
	{
		"name": "marital_status",
		"values": [
			"sin"
		]
	},
	{
		"name": "phone_number",
		"values": [
			"+27767405640"
		]
	}
]
}*/
	})
	.get(function(req, res){
		if (req.query['hub.verify_token'] == 'bleepBlop123')
			res.send(req.query['hub.challenge']);
	});

//Need to test here
	app.route('/api/user')
	//User Post route
    .post(function(req, res) {

			var newUser = {
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
			var id = req.params.user_id;
			console.log(id);
	userController.deleteUserByID(id).then(function(user){
		res.json({ message: 'User deleted!',
					ID: req.params.user_id });
				});
		//Logic for updating a user
	});


	app.route('/api/admin')
	//User Post route
    .post(function(req, res) {
			var newAdmin = {
				email: 'a',
				password: 'lelelel'
		};
			adminController.createAdmin(newAdmin)
			.then(function(admin){
        res.json(admin.dataValues);
    }) .catch(function(error){
         console.log("ops: " + error);
         res.status(500).json({ error: 'error' });
     });
	})
	//User Get route
    .get(function(req, res) {
			models.Admin.findAll().then(function(users){
				res.json(users);
		});
		//Logic for returning all users
	});


	app.route('/api/analyst')
	//User Post route
    .post(function(req, res) {
			var newAnalyst = {
				email: 'a',
				password: 'lelelel'
		};
			analystController.createAnalyst(newAnalyst)
			.then(function(analyst){
        res.json(analyst.dataValues);
    }) .catch(function(error){
         console.log("ops: " + error);
         res.status(500).json({ error: 'error' });
     });
	})
	//User Get route
    .get(function(req, res) {
			models.Analyst.findAll().then(function(users){
				res.json(users);
		});
		//Logic for returning all users
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
