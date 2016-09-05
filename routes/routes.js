var express = require('express');

var models = require("../models");

var userController = require("../DBControllers/UserController");
var adminController = require("../DBControllers/AdminController");
var analystController = require("../DBControllers/AnalystController");
var pageController = require("../DBControllers/PageController");
var advertisementCotroller = require("../DBControllers/AdvertisementController");
var leadController = require("../DBControllers/LeadController");
var email = require("../email/email");
var jwt = require('jsonwebtoken');
var util = require('util');
var fs = require('fs');
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
function accessTokenCallback(req, res, pageAccessToken)
{
	var page = {
		page_id : req.body.page_id,
		page_name : req.body.page_name,
		page_access_token : pageAccessToken
	};
	var newPage = pageController.createPage(page)
	.then(function(pages){
		res.status(200).json(pages);
}).catch(function(error){
		 console.log("ops: " + error);
		 res.status(500).json({ error: 'error' });
 });
	console.log('Page created', JSON.stringify(newPage));
	res.status(200);
}
//API/pageAccessToken
app.route('/api/pageAccessToken')
	.post(function(req,res){
		fbControllers.extendAccessToken(req.body.page_access_token, function (token){
			accessTokenCallback(req, res, token.access_token);
		});
	});

//API/leads
function leadPageFound(page, value){
	var advertisement = {
		page_id: page.id,
		advertisement_id: '' + value.ad_id + ''
	};
	var newAdvertisement = advertisementCotroller.createAdvertisement(advertisement, function(id){
		fbControllers.getLeadData(value, page.pageAccessToken, id, fbControllers.facebookLeadCallback, fbControllers.userAddedCallback);

	//Debugging
	//console.log(JSON.stringify(newAdvertisement));
	});
}

function processLead(lead)
{
	for (var ent in lead)
	{
		var changes = lead[ent].changes;
		for (var ch in changes)
		{
			var value = changes[ch].value;
			//console.log(JSON.stringify(value.leadgen_id));

			models.Page.findOne({
				where: {pageID : '' + value.page_id + ''}
			})
				.then(function(page){
					//console.log("Page found: " + JSON.stringify(page));
					leadPageFound(page, value);
				});
		}
	}
}

app.route('/api/leads')
	.post(function(req, res){
		//console.log('Received lead from Facebook');

		processLead(req.body.entry);

		res.send('{"success" : true}');
	})
	.get(function(req, res){
		//Function to verify that this server is the one that needs to talk to Facebook
		//was only used once
		if (req.query['hub.verify_token'] == 'bleepBlop123')
			res.send(req.query['hub.challenge']);
		else {
			fs.readFile('./lead.json', function(err, data){
				if (err) throw err;
				res.send(data);
			});
		}
	});


	function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('login_form');
}



};
