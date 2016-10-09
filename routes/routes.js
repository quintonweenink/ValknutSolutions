var express = require('express');
var models = require("../models");
var jwt = require('jsonwebtoken');

const authenticate = require('../controllers/auth/auth').authenticate

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
// ########### Please not this will not work due to the modules being moved around also I feel it best to move this into the model controller ######### [START]
			//Emailer code
			/*
			var emailSettings = {
				to: 'charljvv@gmail.com', // recipient
				subject: 'Test mail bro', // Subject line
				text: 'Test body mail', // plaintext body
			};

			email.emailer(emailSettings.to,emailSettings.subject,emailSettings.text);
			*/
// ########### Please not this will not work due to the modules being moved around also I feel it best to move this into the model controller ######### [END]

	function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('login_form');
}



};
